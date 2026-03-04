import React, { useState } from 'react';
import styled from '@emotion/styled';
import { usePebbleTheme, StyledTheme } from '@/utils/theme';
import Page from '@rippling/pebble/Page';
import Tabs from '@rippling/pebble/Tabs';
import { TopNavBar } from '@/framework/shell/TopNavBar';
import { UserRole } from '@/framework/shell/ProfileDropdown';
import { Basement, BasementSection, BasementItem, BASEMENT_WIDTH } from './Basement';
import { PaneA, DEFAULT_PANE_WIDTH } from './PaneA';
import { ExpansionPanel, ExpansionPanelType } from '@/framework/shell/ExpansionPanel';
import { DecagonChatWidget } from '@/framework/shell/DecagonChatWidget';

export interface ProgressiveDiscoveryLayoutProps {
  children: React.ReactNode;

  // Page config
  pageTitle?: string;
  pageTabs?: string[];
  defaultActiveTab?: number;
  onTabChange?: (index: number) => void;
  pageActions?: React.ReactNode;
  /** Hide the page header container (title, tabs, actions) */
  hidePageHeader?: boolean;

  // Basement config
  basementTopSection: BasementSection;
  basementMiddleSection: BasementSection;
  basementToolsSection?: BasementSection;
  basementExploreItem?: BasementItem;
  activeBasementItemId?: string;
  onBasementItemClick?: (itemId: string) => void;
  onExploreClick?: () => void;
  /** Currently hovered basement item (for Pane A preview when collapsed) */
  hoveredBasementItemId?: string | null;
  /** Callback when hovering over a basement item */
  onBasementItemHover?: (itemId: string | null) => void;

  // Pane A config
  paneAContent?: React.ReactNode;
  /** Custom default width for Pane A */
  paneADefaultWidth?: number;
  /** Header title for Pane A */
  paneAHeaderTitle?: string;
  /** Force Pane A to be collapsed (e.g., for Home screen) - still allows hover preview */
  forcePaneACollapsed?: boolean;

  // Top nav config
  companyName?: string;
  userInitial?: string;
  userName?: string;
  userRole?: UserRole;
  onRoleChange?: (role: UserRole) => void;
  searchPlaceholder?: string;
  onLogoClick?: () => void;
  showNotificationBadge?: boolean;
  notificationCount?: number;
}

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurface};
  overflow: hidden;
`;

const PanesWrapper = styled.div`
  position: fixed;
  left: ${BASEMENT_WIDTH}px;
  top: 56px;
  right: 0;
  bottom: 0;
  display: flex;
  overflow: hidden;
`;

const PaneB = styled.main<{ expansionPanelWidth: number; isResizing: boolean }>`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurface};
  border-right: ${({ expansionPanelWidth }) =>
    expansionPanelWidth > 0 ? 'none' : `1px solid`};
  border-color: ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  margin-right: ${({ expansionPanelWidth }) => expansionPanelWidth}px;
  transition: ${({ isResizing }) =>
    isResizing ? 'none' : 'margin-right 250ms ease-out'};
  overflow: hidden;
`;

const PaneBScroll = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
`;

const PageHeaderContainer = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
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
    margin-top: ${({ theme }) => (theme as StyledTheme).space1000} !important;
    margin-bottom: ${({ theme }) => (theme as StyledTheme).space200} !important;
  }
`;

const PageHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
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
  flex: 1;
`;

export const ProgressiveDiscoveryLayout: React.FC<ProgressiveDiscoveryLayoutProps> = ({
  children,
  pageTitle,
  pageTabs,
  defaultActiveTab = 0,
  onTabChange,
  pageActions,
  hidePageHeader = false,
  basementTopSection,
  basementMiddleSection,
  basementToolsSection,
  basementExploreItem,
  activeBasementItemId,
  onBasementItemClick,
  onExploreClick,
  hoveredBasementItemId,
  onBasementItemHover,
  paneAContent,
  paneADefaultWidth,
  paneAHeaderTitle,
  forcePaneACollapsed = false,
  companyName = 'Acme, Inc.',
  userInitial = 'A',
  userName,
  userRole,
  onRoleChange,
  searchPlaceholder = 'Search or jump to...',
  onLogoClick,
  showNotificationBadge = false,
  notificationCount = 0,
}) => {
  const { theme, mode: currentMode } = usePebbleTheme();
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const [adminMode, setAdminMode] = useState(false);
  
  // Expansion Panel (Pane C) state
  const [expansionPanelType, setExpansionPanelType] = useState<ExpansionPanelType>(null);
  const [expansionPanelHistory, setExpansionPanelHistory] = useState<ExpansionPanelType[]>([]);
  const [expansionPanelWidth, setExpansionPanelWidth] = useState(0);
  const [isExpansionPanelResizing, setIsExpansionPanelResizing] = useState(false);
  const [isDecagonOpen, setIsDecagonOpen] = useState(false);
  const [decagonPayload, setDecagonPayload] = useState<string | null>(null);

  // Pane A state
  const [paneAWidth, setPaneAWidth] = useState(DEFAULT_PANE_WIDTH);
  const [isPaneAResizing, setIsPaneAResizing] = useState(false);
  const [isPaneACollapsed, setIsPaneACollapsed] = useState(false);
  const [isPaneAHovering, setIsPaneAHovering] = useState(false);

  // Handle basement item hover
  const handleBasementItemHover = (itemId: string | null) => {
    if (onBasementItemHover) {
      onBasementItemHover(itemId);
    }
  };

  // Handle basement item click - immediately clear hover state for instant pin
  const handleBasementItemClick = (itemId: string) => {
    // Immediately clear hover state so Pane A pins instantly
    setIsPaneAHovering(false);
    // Call the parent handler
    onBasementItemClick?.(itemId);
  };

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    onTabChange?.(index);
  };

  const handleToggleExpansionPanel = (type: ExpansionPanelType) => {
    // Close Decagon if opening AI Assistant
    if (type === 'ai' && isDecagonOpen) {
      setIsDecagonOpen(false);
    }
    
    if (expansionPanelType === type) {
      setExpansionPanelType(null);
      setExpansionPanelWidth(0);
      setExpansionPanelHistory([]);
    } else if (expansionPanelType !== null && type !== null) {
      setExpansionPanelHistory(prev => [...prev, expansionPanelType]);
      setExpansionPanelType(type);
    } else {
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
    // For the prototype, just log - could navigate to a benefits view
    console.log('Navigate to My Benefits page');
  };

  return (
    <AppContainer theme={theme}>
      {/* Top Navigation */}
      <TopNavBar
        companyName={companyName}
        userInitial={userInitial}
        userName={userName}
        adminMode={adminMode}
        currentMode={currentMode as 'light' | 'dark'}
        userRole={userRole}
        searchPlaceholder={searchPlaceholder}
        onAdminModeToggle={() => setAdminMode(!adminMode)}
        onRoleChange={onRoleChange}
        onLogoClick={onLogoClick}
        showNotificationBadge={showNotificationBadge}
        notificationCount={notificationCount}
        onOpenAIPanel={() => handleToggleExpansionPanel('ai')}
        onOpenHelpPanel={() => handleToggleExpansionPanel('help')}
        onOpenSupportChat={handleOpenSupportChat}
        theme={theme}
      />

      {/* Basement (far left rail) */}
      <Basement
        topSection={basementTopSection}
        middleSection={basementMiddleSection}
        toolsSection={basementToolsSection}
        exploreItem={basementExploreItem}
        activeItemId={activeBasementItemId}
        onItemClick={handleBasementItemClick}
        onExploreClick={onExploreClick}
        onItemHover={handleBasementItemHover}
        onMouseEnter={(forcePaneACollapsed || isPaneACollapsed) ? () => setIsPaneAHovering(true) : undefined}
        onMouseLeave={() => {
          if (forcePaneACollapsed || isPaneACollapsed) {
            setIsPaneAHovering(false);
          }
          handleBasementItemHover(null);
        }}
        theme={theme}
      />

      {/* Panes Wrapper (everything to the right of basement) */}
      <PanesWrapper>
        {/* Pane A - Contextual Navigation */}
        <PaneA
          headerTitle={paneAHeaderTitle}
          onWidthChange={setPaneAWidth}
          onResizingChange={setIsPaneAResizing}
          defaultWidth={paneADefaultWidth}
          isCollapsed={forcePaneACollapsed || isPaneACollapsed}
          onCollapseChange={(collapsed) => {
            // Only allow manual collapse changes when not force-collapsed
            if (!forcePaneACollapsed) {
              setIsPaneACollapsed(collapsed);
              if (!collapsed) {
                setIsPaneAHovering(false);
              }
            }
          }}
          isHovering={isPaneAHovering && !!paneAContent}
          onHoverChange={setIsPaneAHovering}
          theme={theme}
        >
          {paneAContent}
        </PaneA>

        {/* Pane B - Main Content */}
        <PaneB
          theme={theme}
          expansionPanelWidth={expansionPanelWidth}
          isResizing={isExpansionPanelResizing}
        >
          <PaneBScroll>
            {/* Page Header with Actions and Tabs */}
            {!hidePageHeader && (
              <PageHeaderContainer theme={theme}>
                <PageHeaderWrapper theme={theme}>
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

                {/* Tabs integrated in header */}
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

            {/* Page Content */}
            <PageContent theme={theme}>{children}</PageContent>
          </PaneBScroll>
        </PaneB>
      </PanesWrapper>

      {/* Pane C - Expansion Panel (AI/Help) */}
      <ExpansionPanel
        isOpen={expansionPanelType !== null}
        panelType={expansionPanelType}
        onClose={handleCloseExpansionPanel}
        onWidthChange={setExpansionPanelWidth}
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

