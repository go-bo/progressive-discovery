import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import { AppShellLayout } from '@/framework/shell';
import { getTimeMainSections } from '@/framework/navigation/presets/time';
import { getPlatformSection } from '@/framework/navigation/presets/platform';
import { TimeOverview } from '@/product-screens/time/TimeOverview';
import { PayrollSkuPage, ExplorePage, PlatformOverviewPage } from '@/product-screens/shared';
import Breadcrumb from '@rippling/pebble/Breadcrumb';
import {
  PlatformEmptyState,
  PLATFORM_PAGES,
  isPlatformPage,
  getPageMeta,
  getPageTabs,
  getBreadcrumbItems,
  DataOverviewPage,
  ToolsOverviewPage,
  CompanySettingsOverviewPage,
  OrganizationalDataPage,
  PlatformPrimerPage,
  PRIMER_PAGE_IDS,
  isPrimerFullPage,
} from '@/product-screens/platform';
import { useUserState } from '@/framework/user-model';
import type { LifecyclePhase } from '@/framework/navigation/types';
import type { SidebarNudge } from '@/framework/navigation';

/**
 * Platform Primer Demo
 *
 * Isolated sandbox for iterating on the Platform Data page.
 * Lands on data-catalog by default; uses PlatformPrimerDataPage
 * so changes don't affect Time/Spend demos.
 */

const PLATFORM_PRIMER_PAGES = new Set([
  'time-overview',
  'payroll',
  'platform-overview',
  'app-shop',
  'data-overview',
  'tools-overview',
  'company-settings-overview',
  'departments',
  ...Object.keys(PLATFORM_PAGES),
]);

const DEFAULT_PAGE = 'data-catalog';

const ORG_DATA_TAB_ALIASES: Record<string, number> = {
  'departments': 1,
};

const PlatformPrimerDemo: React.FC = () => {
  const { page } = useParams<{ page?: string }>();
  const navigate = useNavigate();
  const [activePage, setActivePageState] = useState(() => {
    if (page && page in ORG_DATA_TAB_ALIASES) return 'organizational-data';
    return page && PLATFORM_PRIMER_PAGES.has(page) ? page : DEFAULT_PAGE;
  });
  const [organizationalDataTabIndex, setOrganizationalDataTabIndex] = useState(() =>
    page && page in ORG_DATA_TAB_ALIASES ? ORG_DATA_TAB_ALIASES[page] : 0,
  );
  const [reportsTabIndex, setReportsTabIndex] = useState(0);
  const { lifecyclePhase, setLifecyclePhase } = useUserState();

  useEffect(() => {
    if (!page || page === '') {
      setActivePageState(DEFAULT_PAGE);
    } else if (page in ORG_DATA_TAB_ALIASES) {
      setActivePageState('organizational-data');
      setOrganizationalDataTabIndex(ORG_DATA_TAB_ALIASES[page]);
    } else if (PLATFORM_PRIMER_PAGES.has(page) && page !== activePage) {
      setActivePageState(page);
    }
  }, [page]);

  const setActivePage = (pageId: string) => {
    setActivePageState(pageId);
    if (pageId === DEFAULT_PAGE) {
      navigate('/platform-primer', { replace: true });
    } else {
      navigate(`/platform-primer/${pageId}`, { replace: true });
    }
  };

  const isActive = (p: string) => activePage === p;

  const handleLifecyclePhaseChange = (phase: LifecyclePhase) => {
    setLifecyclePhase(phase);
    if (phase === 'onboarded' && (activePage === 'payroll' || activePage === 'platform-overview')) {
      setActivePage(DEFAULT_PAGE);
    }
  };

  const mainNavSections = getTimeMainSections({ isActive, onNavigate: setActivePage, lifecyclePhase });
  const platformSection = getPlatformSection({ isActive, activePage, onNavigate: setActivePage });

  const platformPage = PLATFORM_PAGES[activePage];

  const trialNudge: SidebarNudge | undefined = useMemo(
    () =>
      lifecyclePhase === 'trial'
        ? {
            icon: Icon.TYPES.THUNDERBOLT_OUTLINE,
            text: 'Explore the platform',
            onClick: () => setActivePage('platform-overview'),
          }
        : undefined,
    [lifecyclePhase],
  );

  const isPlatformPageActive = platformPage && isPlatformPage(activePage);
  const pageMeta = isPlatformPageActive ? getPageMeta(activePage) : null;

  const overviewPages: Record<string, string> = {
    'tools-overview': 'Tools',
    'data-overview': 'Data',
    'company-settings-overview': 'Company Settings',
  };
  const overviewTitle = overviewPages[activePage];
  const HIDE_BREADCRUMBS_ON_DETAIL_VIEWS = true;
  const showBreadcrumbs =
    activePage in overviewPages ||
    (isPlatformPageActive && !HIDE_BREADCRUMBS_ON_DETAIL_VIEWS);

  const isPrimerPage = PRIMER_PAGE_IDS.has(activePage);
  const isFullPagePrimer = isPrimerPage && isPrimerFullPage(activePage);
  const showPageHeader = isPlatformPageActive && !isFullPagePrimer;

  return (
    <AppShellLayout
      pageTitle={showPageHeader ? platformPage!.title : ''}
      pageTabs={showPageHeader ? getPageTabs(activePage) : undefined}
      defaultActiveTab={
        showPageHeader && getPageTabs(activePage)
          ? activePage === 'organizational-data'
            ? organizationalDataTabIndex
            : activePage === 'reports'
              ? reportsTabIndex
              : 0
          : undefined
      }
      onTabChange={
        activePage === 'organizational-data'
          ? setOrganizationalDataTabIndex
          : activePage === 'reports'
            ? setReportsTabIndex
            : undefined
      }
      pageBreadcrumbs={
        showBreadcrumbs ? (
          <Breadcrumb
            items={getBreadcrumbItems(activePage, overviewTitle ?? platformPage?.title ?? '')}
            active={activePage}
            onClick={(item) => {
              if (item.value !== activePage) setActivePage(item.value);
            }}
            noMargin
          />
        ) : undefined
      }
      pageActions={
        showPageHeader && pageMeta?.headerCta ? (
          <Button
            appearance={Button.APPEARANCES.PRIMARY}
            size={Button.SIZES.M}
            icon={{ type: Icon.TYPES.ADD_CIRCLE_OUTLINE, alignment: Button.ICON_ALIGNMENTS.LEFT }}
          >
            {pageMeta.headerCta}
          </Button>
        ) : undefined
      }
      mainNavSections={mainNavSections}
      platformNavSection={platformSection}
      companyName="Acme, Inc."
      userInitial="A"
      showNotificationBadge
      notificationCount={2}
      lifecyclePhase={lifecyclePhase}
      onLifecyclePhaseChange={handleLifecyclePhaseChange}
      sidebarNudge={trialNudge}
    >
      {activePage === 'time-overview' && <TimeOverview lifecyclePhase={lifecyclePhase} />}
      {activePage === 'payroll' && <PayrollSkuPage />}
      {activePage === 'platform-overview' && <PlatformOverviewPage />}
      {activePage === 'app-shop' && <ExplorePage />}
      {activePage === 'data-overview' && <DataOverviewPage onNavigate={setActivePage} />}
      {isPrimerPage && (
        <PlatformPrimerPage
          pageId={activePage}
          onNavigate={setActivePage}
          activeTabIndex={activePage === 'reports' ? reportsTabIndex : undefined}
        />
      )}
      {activePage === 'tools-overview' && <ToolsOverviewPage onNavigate={setActivePage} />}
      {activePage === 'company-settings-overview' && (
        <CompanySettingsOverviewPage onNavigate={setActivePage} />
      )}
      {activePage === 'organizational-data' && (
        <OrganizationalDataPage
          onNavigate={setActivePage}
          activeTabIndex={organizationalDataTabIndex}
        />
      )}
      {isPlatformPage(activePage) &&
        platformPage &&
        activePage !== 'organizational-data' &&
        !isPrimerPage && (
          <PlatformEmptyState
            pageId={platformPage.id}
            title={platformPage.title}
            icon={platformPage.icon}
            onNavigate={setActivePage}
          />
        )}
    </AppShellLayout>
  );
};

export default PlatformPrimerDemo;
