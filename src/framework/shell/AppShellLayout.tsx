import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { usePebbleTheme, StyledTheme } from '@/utils/theme';
import Page from '@rippling/pebble/Page';
import Tabs from '@rippling/pebble/Tabs';
import { TopNavBar } from './TopNavBar';
import { Sidebar } from '@/framework/navigation/Sidebar';
import type { SidebarNudge } from '@/framework/navigation/Sidebar';
import { ExpansionPanel, ExpansionPanelType } from './ExpansionPanel';
import { DecagonChatWidget } from './DecagonChatWidget';
import { NavSectionData, LifecyclePhase } from '@/framework/navigation/types';

// Prevent body scroll when using AppShellLayout
const usePreventBodyScroll = () => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);
};

interface AppShellLayoutProps {
  children: React.ReactNode;

  // Page config
  pageTitle: string;
  pageTabs?: string[];
  defaultActiveTab?: number;
  onTabChange?: (index: number) => void;
  pageActions?: React.ReactNode;
  pageBreadcrumbs?: React.ReactNode;

  // Navigation config
  mainNavSections: NavSectionData[];
  platformNavSection?: NavSectionData;

  // Top nav config
  companyName?: string;
  userInitial?: string;
  searchPlaceholder?: string;
  onLogoClick?: () => void;
  showNotificationBadge?: boolean;
  notificationCount?: number;

  // Lifecycle phase
  lifecyclePhase?: LifecyclePhase;
  onLifecyclePhaseChange?: (phase: LifecyclePhase) => void;

  // Sidebar nudge
  sidebarNudge?: SidebarNudge;
}

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurface};
  overflow: hidden;
`;

const MainContent = styled.main<{ sidebarCollapsed: boolean; expansionPanelWidth: number; isResizing: boolean }>`
  position: fixed;
  left: ${({ sidebarCollapsed }) => (sidebarCollapsed ? '60px' : '266px')};
  top: 56px;
  right: ${({ expansionPanelWidth }) => expansionPanelWidth}px;
  bottom: 0;
  transition: ${({ isResizing }) => isResizing ? 'left 200ms ease' : 'left 200ms ease, right 250ms ease-out'};
  overflow-y: auto;
  overflow-x: hidden;
`;

const PageContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PageHeaderContainer = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  padding: 0;
  display: flex;
  flex-direction: column;
`;

const BreadcrumbWrap = styled.div`
  padding-top: ${({ theme }) => (theme as StyledTheme).space600};
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ContentBreadcrumbWrap = styled.div`
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space200};
`;

const PageHeaderWrapper = styled.div`
  padding-left: ${({ theme }) => (theme as StyledTheme).space1400};
  padding-right: ${({ theme }) => (theme as StyledTheme).space1400};

  /* Adjust spacing on Page.Header content */
  & > div {
    margin-bottom: 0 !important;
  }

  /* Target the inner Content component */
  & div[class*='Content'] {
    margin-top: ${({ theme }) => (theme as StyledTheme).space1000} !important; /* 40px */
    margin-bottom: ${({ theme }) => (theme as StyledTheme).space200} !important; /* 8px */
  }
`;

const PageHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  margin-top: -12px;
`;

const TabsWrapper = styled.div`
  padding: 0 ${({ theme }) => (theme as StyledTheme).space1400};

  /* Remove box shadow from tabs */
  & > div,
  & div[class*='StyledScroll'],
  & div[class*='StyledTabContainer'] {
    box-shadow: none !important;
  }
`;

const PageContent = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurface};
  padding: ${({ theme }) =>
    `${(theme as StyledTheme).space800} ${(theme as StyledTheme).space1400}`};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
`;

export const AppShellLayout: React.FC<AppShellLayoutProps> = ({
  children,
  pageTitle,
  pageTabs,
  defaultActiveTab = 0,
  onTabChange,
  pageActions,
  pageBreadcrumbs,
  mainNavSections,
  platformNavSection,
  companyName = 'Acme, Inc.',
  userInitial = 'A',
  searchPlaceholder = 'Search or jump to...',
  onLogoClick,
  showNotificationBadge = false,
  notificationCount = 0,
  lifecyclePhase,
  onLifecyclePhaseChange,
  sidebarNudge,
}) => {
  usePreventBodyScroll();
  const { theme, mode: currentMode } = usePebbleTheme();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState(defaultActiveTab);

  useEffect(() => {
    if (pageTabs?.length) {
      setActiveTab(defaultActiveTab ?? 0);
    }
  }, [defaultActiveTab, pageTabs]);

  const [adminMode, setAdminMode] = useState(true);
  const [expansionPanelType, setExpansionPanelType] = useState<ExpansionPanelType>(null);
  const [expansionPanelHistory, setExpansionPanelHistory] = useState<ExpansionPanelType[]>([]);
  const [expansionPanelWidth, setExpansionPanelWidth] = useState(0);
  const [isExpansionPanelResizing, setIsExpansionPanelResizing] = useState(false);
  const [isDecagonOpen, setIsDecagonOpen] = useState(false);
  const [decagonPayload, setDecagonPayload] = useState<string | null>(null);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    onTabChange?.(index);
  };

  const handleToggleExpansionPanel = (type: ExpansionPanelType) => {
    // Close Decagon if opening AI Assistant
    if (type === 'ai' && isDecagonOpen) {
      setIsDecagonOpen(false);
    }
    
    // If panel is already open with this type, close it (toggle behavior)
    if (expansionPanelType === type) {
      setExpansionPanelType(null);
      setExpansionPanelWidth(0);
      setExpansionPanelHistory([]);
    } else if (expansionPanelType !== null && type !== null) {
      // Switching between panel types - add current to history
      setExpansionPanelHistory(prev => [...prev, expansionPanelType]);
      setExpansionPanelType(type);
    } else {
      // Opening fresh panel
      setExpansionPanelType(type);
      setExpansionPanelHistory([]);
    }
  };

  const handleCloseExpansionPanel = () => {
    setExpansionPanelType(null);
    setExpansionPanelWidth(0);
    setExpansionPanelHistory([]);
  };

  const handleNavigateBack = () => {
    if (expansionPanelHistory.length > 0) {
      const previousType = expansionPanelHistory[expansionPanelHistory.length - 1];
      setExpansionPanelHistory(prev => prev.slice(0, -1));
      setExpansionPanelType(previousType);
    }
  };

  const handleExpansionPanelWidthChange = (width: number) => {
    setExpansionPanelWidth(width);
  };

  const handleOpenSupportChat = () => {
    handleCloseExpansionPanel();
    setIsDecagonOpen(true);
  };

  const handleCloseDecagon = () => {
    setIsDecagonOpen(false);
    setDecagonPayload(null);
  };

  const handleCreateTicket = (summary: string) => {
    handleCloseExpansionPanel();
    setDecagonPayload(summary);
    setIsDecagonOpen(true);
  };

  const handleNavigateToBenefits = () => {
    console.log('Navigate to My Benefits page');
  };

  return (
    <AppContainer theme={theme}>
      {/* Top Navigation */}
      <TopNavBar
        companyName={companyName}
        userInitial={userInitial}
        adminMode={adminMode}
        currentMode={currentMode as 'light' | 'dark'}
        searchPlaceholder={searchPlaceholder}
        onAdminModeToggle={() => setAdminMode(!adminMode)}
        onLogoClick={onLogoClick}
        showNotificationBadge={showNotificationBadge}
        notificationCount={notificationCount}
        onOpenAIPanel={() => handleToggleExpansionPanel('ai')}
        onOpenHelpPanel={() => handleToggleExpansionPanel('help')}
        onOpenSupportChat={handleOpenSupportChat}
        lifecyclePhase={lifecyclePhase}
        onLifecyclePhaseChange={onLifecyclePhaseChange}
        theme={theme}
      />

      {/* Left Sidebar */}
      <Sidebar
        mainSections={mainNavSections}
        platformSection={platformNavSection}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        onOpenHelpPanel={() => handleToggleExpansionPanel('help')}
        nudge={sidebarNudge}
        theme={theme}
      />

      {/* Main Content Area */}
      <MainContent 
        theme={theme} 
        sidebarCollapsed={sidebarCollapsed}
        expansionPanelWidth={expansionPanelWidth}
        isResizing={isExpansionPanelResizing}
      >
        <PageContentContainer theme={theme}>
          {/* White page header bar - only when page has title or tabs */}
          {(pageTitle || (pageTabs && pageTabs.length > 0)) && (
            <PageHeaderContainer theme={theme}>
              {pageTitle && (
                <PageHeaderWrapper theme={theme}>
                  {pageBreadcrumbs && (
                    <BreadcrumbWrap theme={theme}>{pageBreadcrumbs}</BreadcrumbWrap>
                  )}
                  <Page.Header
                    title={pageTitle}
                    shouldBeUnderlined={false}
                    size={Page.Header.SIZES.FLUID}
                    actions={
                      pageActions ? (
                        <PageHeaderActions theme={theme}>{pageActions}</PageHeaderActions>
                      ) : undefined
                    }
                  />
                </PageHeaderWrapper>
              )}

              {pageTabs && pageTabs.length > 0 && (
                <TabsWrapper theme={theme}>
                  <Tabs.LINK
                    activeIndex={activeTab}
                    onChange={index => handleTabChange(Number(index))}
                  >
                    {pageTabs.map((tab, index) => (
                      <Tabs.Tab key={`tab-${index}`} title={tab} />
                    ))}
                  </Tabs.LINK>
                </TabsWrapper>
              )}
            </PageHeaderContainer>
          )}

          {/* Page Content - breadcrumbs at top when no page header (e.g. Tools, Data overview) */}
          <PageContent theme={theme}>
            {pageBreadcrumbs && !pageTitle && !(pageTabs && pageTabs.length > 0) && (
              <ContentBreadcrumbWrap theme={theme}>{pageBreadcrumbs}</ContentBreadcrumbWrap>
            )}
            {children}
          </PageContent>
        </PageContentContainer>
      </MainContent>

      {/* Expansion Panel (AI/Help) */}
      <ExpansionPanel
        isOpen={expansionPanelType !== null}
        panelType={expansionPanelType}
        onClose={handleCloseExpansionPanel}
        onWidthChange={handleExpansionPanelWidthChange}
        onResizingChange={setIsExpansionPanelResizing}
        canGoBack={expansionPanelHistory.length > 0}
        previousPanelType={expansionPanelHistory[expansionPanelHistory.length - 1] || null}
        onNavigateBack={handleNavigateBack}
        onSwitchToAI={() => handleToggleExpansionPanel('ai')}
        onCreateTicket={handleCreateTicket}
        onNavigateToBenefits={handleNavigateToBenefits}
        theme={theme}
      />

      {/* Decagon Support Chat Widget */}
      <DecagonChatWidget
        isOpen={isDecagonOpen}
        onClose={handleCloseDecagon}
        onStartNewChat={() => {
          setDecagonPayload(null);
          setIsDecagonOpen(false);
          setTimeout(() => setIsDecagonOpen(true), 100);
        }}
        theme={theme}
        isConversationClosed={!decagonPayload}
        initialMessage={decagonPayload}
        onInitialMessageSent={() => {}}
      />
    </AppContainer>
  );
};
