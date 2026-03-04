import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import { AppShellLayout } from '@/framework/shell';
import { getSpendMainSections } from '@/framework/navigation/presets/spend';
import { getPlatformSection } from '@/framework/navigation/presets/platform';
import { SpendOverview } from '@/product-screens/spend/SpendOverview';
import { PayrollSkuPage, ExplorePage, PlatformOverviewPage } from '@/product-screens/shared';
import Breadcrumb from '@rippling/pebble/Breadcrumb';
import { PlatformEmptyState, PLATFORM_PAGES, isPlatformPage, getPageMeta, getPageTabs, getBreadcrumbItems, DataOverviewPage, ToolsOverviewPage, CompanySettingsOverviewPage, OrganizationalDataPage, DataCatalogPage } from '@/product-screens/platform';
import { useUserState } from '@/framework/user-model';
import type { LifecyclePhase } from '@/framework/navigation/types';
import type { SidebarNudge } from '@/framework/navigation';

const SPEND_DEMO_PAGES = new Set([
  'finance-overview', 'payroll', 'platform-overview', 'app-shop',
  'data-overview', 'tools-overview', 'company-settings-overview',
  ...Object.keys(PLATFORM_PAGES),
]);

const DEFAULT_PAGE = 'finance-overview';

const SpendDemo: React.FC = () => {
  const { page } = useParams<{ page?: string }>();
  const navigate = useNavigate();
  const [activePage, setActivePageState] = useState<string>(() =>
    page && SPEND_DEMO_PAGES.has(page) ? page : DEFAULT_PAGE,
  );
  const [organizationalDataTabIndex, setOrganizationalDataTabIndex] = useState(0);
  const { lifecyclePhase, setLifecyclePhase } = useUserState();

  useEffect(() => {
    if (!page || page === '') {
      setActivePageState(DEFAULT_PAGE);
    } else if (SPEND_DEMO_PAGES.has(page) && page !== activePage) {
      setActivePageState(page);
    }
  }, [page]);

  const setActivePage = (pageId: string) => {
    setActivePageState(pageId);
    if (pageId === DEFAULT_PAGE) {
      navigate('/spend', { replace: true });
    } else {
      navigate(`/spend/${pageId}`, { replace: true });
    }
  };

  const isActive = (p: string) => activePage === p;

  const handleLifecyclePhaseChange = (phase: LifecyclePhase) => {
    setLifecyclePhase(phase);
    if (phase === 'onboarded' && (activePage === 'payroll' || activePage === 'platform-overview')) {
      setActivePage('finance-overview');
    }
  };

  const mainNavSections = getSpendMainSections({ isActive, onNavigate: setActivePage, lifecyclePhase });
  const platformSection = getPlatformSection({ isActive, activePage, onNavigate: setActivePage });

  const platformPage = PLATFORM_PAGES[activePage];

  const trialNudge: SidebarNudge | undefined = useMemo(() =>
    lifecyclePhase === 'trial'
      ? { icon: Icon.TYPES.THUNDERBOLT_OUTLINE, text: 'Explore the platform', onClick: () => setActivePage('platform-overview') }
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
  // TODO: set to false to turn on breadcrumbs on 3rd-level detail views (workflow-studio, documents, etc.)
  const HIDE_BREADCRUMBS_ON_DETAIL_VIEWS = true;
  const showBreadcrumbs =
    (activePage in overviewPages) ||
    (isPlatformPageActive && !HIDE_BREADCRUMBS_ON_DETAIL_VIEWS);
  const isFullPagePlaceholder = activePage === 'data-catalog';
  const showPageHeader = isPlatformPageActive && !isFullPagePlaceholder;

  return (
    <AppShellLayout
      pageTitle={showPageHeader ? platformPage!.title : ''}
      pageTabs={showPageHeader ? getPageTabs(activePage) : undefined}
      defaultActiveTab={showPageHeader && getPageTabs(activePage)
        ? activePage === 'organizational-data'
          ? organizationalDataTabIndex
          : 0
        : undefined}
      onTabChange={activePage === 'organizational-data' ? setOrganizationalDataTabIndex : undefined}
      pageBreadcrumbs={showBreadcrumbs && !isFullPagePlaceholder ? (
        <Breadcrumb
          items={getBreadcrumbItems(activePage, overviewTitle ?? platformPage?.title ?? '')}
          active={activePage}
          onClick={(item) => { if (item.value !== activePage) setActivePage(item.value); }}
          noMargin
        />
      ) : undefined}
      pageActions={showPageHeader && pageMeta?.headerCta ? (
        <Button
          appearance={Button.APPEARANCES.PRIMARY}
          size={Button.SIZES.M}
          icon={{ type: Icon.TYPES.ADD_CIRCLE_OUTLINE, alignment: Button.ICON_ALIGNMENTS.LEFT }}
        >
          {pageMeta.headerCta}
        </Button>
      ) : undefined}
      mainNavSections={mainNavSections}
      platformNavSection={platformSection}
      companyName="Cooper-Haley"
      userInitial="C"
      showNotificationBadge
      notificationCount={9}
      lifecyclePhase={lifecyclePhase}
      onLifecyclePhaseChange={handleLifecyclePhaseChange}
      sidebarNudge={trialNudge}
    >
      {activePage === 'finance-overview' && <SpendOverview lifecyclePhase={lifecyclePhase} />}
      {activePage === 'payroll' && <PayrollSkuPage />}
      {activePage === 'platform-overview' && <PlatformOverviewPage />}
      {activePage === 'app-shop' && <ExplorePage />}
      {activePage === 'data-overview' && <DataOverviewPage onNavigate={setActivePage} />}
      {activePage === 'data-catalog' && <DataCatalogPage onNavigate={setActivePage} />}
      {activePage === 'tools-overview' && <ToolsOverviewPage onNavigate={setActivePage} />}
      {activePage === 'company-settings-overview' && <CompanySettingsOverviewPage onNavigate={setActivePage} />}
      {activePage === 'organizational-data' && (
        <OrganizationalDataPage onNavigate={setActivePage} activeTabIndex={organizationalDataTabIndex} />
      )}
      {isPlatformPage(activePage) && platformPage && activePage !== 'organizational-data' && activePage !== 'data-catalog' && (
        <PlatformEmptyState pageId={platformPage.id} title={platformPage.title} icon={platformPage.icon} onNavigate={setActivePage} />
      )}
    </AppShellLayout>
  );
};

export default SpendDemo;
