import React, { useState } from 'react';
import styled from '@emotion/styled';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import Chip from '@rippling/pebble/Chip';
import Breadcrumb from '@rippling/pebble/Breadcrumb';
import Avatar from '@rippling/pebble/Avatar';
import AvatarList from '@rippling/pebble/AvatarList';
import ProgressBar from '@rippling/pebble/ProgressBar';
import Atoms from '@rippling/pebble/Atoms';
import Input from '@rippling/pebble/Inputs';
import Label from '@rippling/pebble/Label';
import Status from '@rippling/pebble/Status';
import Drawer from '@rippling/pebble/Drawer';
import { 
  ProgressiveDiscoveryLayout,
} from '@/explorations/nav-home-sketch/ProgressiveDiscoveryLayout';
import type { BasementSection, BasementItem } from '@/explorations/nav-home-sketch/Basement';
import { BASEMENT_WIDTH } from '@/explorations/nav-home-sketch/Basement';
import { UserRole } from '@/framework/shell/ProfileDropdown';
import { AIComposer } from '@/components/AIComposer';

/**
 * Offsite 2026 Demo
 *
 * New pane-based navigation architecture:
 * - Basement: Global anchors (far left rail)
 * - Pane A: Contextual navigation (resizable)
 * - Pane B: Main content area
 * - Pane C: Expansion panel (AI/Help/Context)
 * 
 * This demo explores progressive platform discovery - showing users
 * a curated view based on their lifecycle, relevance, and context.
 */

// Skeleton shimmer animation (paused for now)
// const shimmer = keyframes`
//   0% {
//     background-position: -200% 0;
//   }
//   100% {
//     background-position: 200% 0;
//   }
// `;

// Dashboard Container
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
`;

// Welcome Header
const WelcomeHeader = styled.div`
  text-align: left;
  padding: ${({ theme }) => (theme as StyledTheme).space400} 0;
`;

const WelcomeDate = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space100};
`;

const WelcomeGreeting = styled.h1`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
  font-size: 28px;
`;

// Stats Row
const StatsRow = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  flex-wrap: wrap;
`;

const StatPill = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  padding: ${({ theme }) => `${(theme as StyledTheme).space200} ${(theme as StyledTheme).space400}`};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

// Widget Grid
const WidgetGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// Widget Card
const WidgetCard = styled.div<{ span?: number }>`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space500};
  min-height: 200px;
  display: flex;
  flex-direction: column;
  grid-column: ${({ span }) => span ? `span ${span}` : 'span 1'};
`;

const WidgetHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space400};
`;

const WidgetTitle = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const WidgetTitleText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLargeEmphasized};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const WidgetContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

// Skeleton Elements
const SkeletonBase = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerMd};
`;

const SkeletonLine = styled(SkeletonBase)<{ width?: string; height?: string }>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '12px'};
`;

const SkeletonCircle = styled(SkeletonBase)<{ size?: string }>`
  width: ${({ size }) => size || '40px'};
  height: ${({ size }) => size || '40px'};
  border-radius: 50%;
  flex-shrink: 0;
`;

const SkeletonRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const SkeletonTextGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

// Task Row Skeleton
const TaskRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => (theme as StyledTheme).space200} 0;
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  
  &:last-child {
    border-bottom: none;
  }
`;

const TaskCheckbox = styled(SkeletonBase)`
  width: 18px;
  height: 18px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerSm};
  flex-shrink: 0;
`;

const TaskBadge = styled(SkeletonBase)`
  width: 60px;
  height: 20px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
`;

// Tabs skeleton
const SkeletonTabs = styled.div`
  display: flex;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space200};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space300};
`;

const SkeletonTab = styled(SkeletonBase)<{ active?: boolean }>`
  width: 70px;
  height: 14px;
  opacity: ${({ active }) => active ? 1 : 0.5};
`;

// People Grid
const PeopleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const PersonCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

// ============================================
// PANE A - Contextual Navigation Components
// ============================================

const PaneAContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const PaneAHeader = styled.div`
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space200};
`;

const PaneATitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const PaneASection = styled.div<{ hasDivider?: boolean }>`
  margin-top: ${({ theme }) => (theme as StyledTheme).space300};
  padding-top: ${({ hasDivider, theme }) => hasDivider ? (theme as StyledTheme).space300 : '0'};
  border-top: ${({ hasDivider, theme }) => 
    hasDivider ? `1px solid ${(theme as StyledTheme).colorOutlineVariant}` : 'none'};
`;

const PaneASectionLabel = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: ${({ theme }) => `${(theme as StyledTheme).space200} ${(theme as StyledTheme).space300}`};
`;

// Collapsible Section Components
const CollapsibleSectionHeader = styled.button<{ isExpanded?: boolean }>`
  display: flex;
  align-items: center;
  gap: 14px; /* 12px caret + 14px gap = 26px, matches 16px icon + 10px gap */
  width: 100%;
  padding: ${({ theme }) => `${(theme as StyledTheme).space200} ${(theme as StyledTheme).space300}`};
  background: transparent;
  border: none;
  cursor: pointer;
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.8px;
  
  &:hover {
    color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  }
`;

const CollapsibleCaret = styled.span<{ isExpanded?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 12px;
  height: 12px;
  font-size: 8px;
  transition: transform 150ms ease;
  transform: ${({ isExpanded }) => isExpanded ? 'rotate(90deg)' : 'rotate(0deg)'};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const CollapsibleSectionContent = styled.div<{ isExpanded?: boolean }>`
  display: ${({ isExpanded }) => isExpanded ? 'block' : 'none'};
`;

interface CollapsiblePaneASectionProps {
  label: string;
  defaultExpanded?: boolean;
  hasDivider?: boolean;
  children: React.ReactNode;
}

const CollapsiblePaneASection: React.FC<CollapsiblePaneASectionProps> = ({ 
  label, 
  defaultExpanded = true, 
  hasDivider = false,
  children 
}) => {
  const { theme } = usePebbleTheme();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <PaneASection theme={theme} hasDivider={hasDivider}>
      <CollapsibleSectionHeader 
        theme={theme} 
        isExpanded={isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <CollapsibleCaret theme={theme} isExpanded={isExpanded}>▶</CollapsibleCaret>
        {label}
      </CollapsibleSectionHeader>
      <CollapsibleSectionContent isExpanded={isExpanded}>
        {children}
      </CollapsibleSectionContent>
    </PaneASection>
  );
};

const NavItem = styled.button<{ isActive?: boolean; isGated?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => `${(theme as StyledTheme).space200} ${(theme as StyledTheme).space300}`};
  background: ${({ isActive, theme }) => 
    isActive ? (theme as StyledTheme).colorSurfaceContainerLow : 'transparent'};
  border: none;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  cursor: pointer;
  transition: background-color 150ms ease;
  opacity: ${({ isGated }) => isGated ? 0.5 : 1};

  &:hover {
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

const NavItemLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px; /* 16px icon + 10px gap = 26px, matches 12px caret + 14px gap */
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  
  /* Override Pebble Icon's default color */
  span[data-icon] {
    color: ${({ theme }) => (theme as StyledTheme).colorOnSurface} !important;
  }
`;

const NavItemLabel = styled.span<{ isActive?: boolean }>`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLarge};
  font-weight: ${({ isActive }) => isActive ? 500 : 400};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const NavItemChevron = styled.div`
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  opacity: 0.5;
  display: flex;
  align-items: center;
`;

// NavItemBadge - use Atoms.Badge with PRIMARY_LIGHT appearance

const GatedBadge = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerHigh};
  padding: 2px 8px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
`;

// Unpurchased SKU Page styling
const SkuPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const SkuPageIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  background-color: ${({ theme }) => (theme as StyledTheme).colorPrimaryContainer};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SkuPageTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const SkuPageDescription = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  line-height: 1.5;
`;

const SkuPageBenefits = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const SkuPageBenefit = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const SkuPageActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  margin-top: ${({ theme }) => (theme as StyledTheme).space200};
`;

// ============================================
// PANE A CONTENT - Time (During Trial)
// ============================================
interface TimeNavContentProps {
  isPreview?: boolean;
}

const TimeNavContent: React.FC<TimeNavContentProps> = ({ isPreview = false }) => {
  const { theme } = usePebbleTheme();
  const [activeItem, setActiveItem] = useState('overview');
  
  // Don't show active state when previewing
  const getIsActive = (item: string) => !isPreview && activeItem === item;

  return (
    <PaneAContainer theme={theme}>
      {/* Overview at top */}
      <PaneASection theme={theme}>
        <NavItem theme={theme} isActive={getIsActive('overview')} onClick={() => setActiveItem('overview')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.APP_MANAGEMENT_OUTLINE} size={16} />
            <NavItemLabel theme={theme} isActive={getIsActive('overview')}>Time Overview</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
        {/* My Time - single page for personal time features */}
        <NavItem theme={theme} isActive={getIsActive('my-time')} onClick={() => setActiveItem('my-time')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.USER_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>My Time</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
      </PaneASection>

      {/* Admin tools - flat list, no section header */}
      <PaneASection theme={theme} hasDivider>
        <NavItem theme={theme} isActive={getIsActive('approvals')} onClick={() => setActiveItem('approvals')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.CHECK_CIRCLE_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Approvals</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
        <NavItem theme={theme} isActive={getIsActive('attendance')} onClick={() => setActiveItem('attendance')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.REPORT_CHECKLIST_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Attendance</NavItemLabel>
          </NavItemLeft>
          <Atoms.Badge text="Activate" appearance={Atoms.Badge.APPEARANCES.PRIMARY_LIGHT} size={Atoms.Badge.SIZES.S} />
        </NavItem>
        <NavItem theme={theme} isActive={getIsActive('scheduling')} onClick={() => setActiveItem('scheduling')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.CALENDAR_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Scheduling</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
        <NavItem theme={theme} isActive={getIsActive('timesheets')} onClick={() => setActiveItem('timesheets')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.RECEIPT_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Timesheets</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
        <NavItem theme={theme} isActive={getIsActive('time-off-admin')} onClick={() => setActiveItem('time-off-admin')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.UNLIMITED_PTO_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Time Off</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
        <NavItem theme={theme} isActive={getIsActive('people')} onClick={() => setActiveItem('people')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.USERS_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>People</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
        <NavItem theme={theme} isActive={getIsActive('timeclock')} onClick={() => setActiveItem('timeclock')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.TIME_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Manage Timeclock</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
      </PaneASection>

      {/* Settings */}
      <PaneASection theme={theme} hasDivider>
        <PaneASectionLabel theme={theme}>Settings</PaneASectionLabel>
        <NavItem theme={theme} isActive={getIsActive('policies')} onClick={() => setActiveItem('policies')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.SETTINGS_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Policies</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
      </PaneASection>
    </PaneAContainer>
  );
};

// ============================================
// PANE A CONTENT - Payroll (Nav Preview - Gated)
// ============================================
interface PayrollNavPreviewProps {
  activeItem: string;
  onItemChange: (item: string) => void;
  isPreview?: boolean;
}

const PayrollNavPreview: React.FC<PayrollNavPreviewProps> = ({ activeItem, onItemChange, isPreview = false }) => {
  const { theme } = usePebbleTheme();
  
  // Don't show active state when previewing
  const getIsActive = (item: string) => !isPreview && activeItem === item;

  return (
    <PaneAContainer theme={theme}>
      {/* Overview at top */}
      <PaneASection theme={theme}>
        <NavItem 
          theme={theme} 
          isActive={getIsActive('overview')}
          onClick={() => onItemChange('overview')}
        >
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.APP_MANAGEMENT_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Overview</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
      </PaneASection>

      {/* Other nav items */}
      <PaneASection theme={theme} hasDivider>
        <NavItem 
          theme={theme} 
          isActive={getIsActive('payruns')}
          onClick={() => onItemChange('payruns')}
        >
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.PLAY_CIRCLE_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Pay Runs</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
        <NavItem 
          theme={theme} 
          isActive={getIsActive('people')}
          onClick={() => onItemChange('people')}
        >
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.USERS_STACKED_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>People</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
        <NavItem 
          theme={theme} 
          isActive={getIsActive('taxes')}
          onClick={() => onItemChange('taxes')}
        >
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.TAX_WITHHOLDING_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Taxes</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
      </PaneASection>
    </PaneAContainer>
  );
};

// ============================================
// PANE A CONTENT - Tools
// ============================================
interface ToolsNavContentProps {
  isPreview?: boolean;
}

const ToolsNavContent: React.FC<ToolsNavContentProps> = ({ isPreview = false }) => {
  const { theme } = usePebbleTheme();
  const [activeItem, setActiveItem] = useState('reports');
  
  // Don't show active state when previewing
  const getIsActive = (item: string) => !isPreview && activeItem === item;

  return (
    <PaneAContainer theme={theme}>
      <PaneASection theme={theme}>
        <NavItem theme={theme} isActive={getIsActive('reports')} onClick={() => setActiveItem('reports')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.CHART_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Reports</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
        <NavItem theme={theme} isActive={getIsActive('workflows')} onClick={() => setActiveItem('workflows')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.WORKFLOW_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Workflows</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
      </PaneASection>
    </PaneAContainer>
  );
};

// ============================================
// PANE A CONTENT - To-Do Filter Sidebar
// ============================================
interface ToDoNavContentProps {
  isPreview?: boolean;
}

const ToDoNavContent: React.FC<ToDoNavContentProps> = ({ isPreview = false }) => {
  const { theme } = usePebbleTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Don't show active state when previewing
  const getIsActive = (filter: string) => !isPreview && activeFilter === filter;

  const viewOptions = [
    { label: 'Needs my attention', value: 'needs-attention' },
    { label: 'All items', value: 'all-items' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <PaneAContainer theme={theme}>
      {/* View mode select */}
      <div style={{ marginBottom: '16px', paddingLeft: '4px', paddingRight: '4px', paddingTop: '12px', borderBottom: `1px solid ${theme.colorOutlineVariant}`, paddingBottom: '16px' }}>
        <Input.Select
          list={viewOptions}
          defaultValue="needs-attention"
          size={Input.Select.SIZES.S}
        />
      </div>

      {/* Main filters */}
      <NavItem theme={theme} isActive={getIsActive('all')} onClick={() => setActiveFilter('all')}>
        <NavItemLabel theme={theme} isActive={getIsActive('all')}>All</NavItemLabel>
        <Atoms.Badge text="16" appearance={Atoms.Badge.APPEARANCES.PRIMARY_DARK} size={Atoms.Badge.SIZES.S} />
      </NavItem>
      <NavItem theme={theme} isActive={getIsActive('critical')} onClick={() => setActiveFilter('critical')}>
        <NavItemLabel theme={theme} isActive={getIsActive('critical')}>Critical</NavItemLabel>
        <Atoms.Badge text="2" appearance={Atoms.Badge.APPEARANCES.PRIMARY_DARK} size={Atoms.Badge.SIZES.S} />
      </NavItem>

      {/* Approvals section */}
      <PaneASection theme={theme} hasDivider>
        <PaneASectionLabel theme={theme}>Approvals</PaneASectionLabel>
        <NavItem theme={theme} isActive={getIsActive('approvals')} onClick={() => setActiveFilter('approvals')}>
          <NavItemLabel theme={theme} isActive={getIsActive('approvals')}>All Approvals</NavItemLabel>
          <Atoms.Badge text="8" appearance={Atoms.Badge.APPEARANCES.NEUTRAL} size={Atoms.Badge.SIZES.S} />
        </NavItem>
        <NavItem theme={theme}>
          <NavItemLabel theme={theme}>HR Management</NavItemLabel>
          <Atoms.Badge text="3" appearance={Atoms.Badge.APPEARANCES.NEUTRAL} size={Atoms.Badge.SIZES.S} />
        </NavItem>
        <NavItem theme={theme}>
          <NavItemLabel theme={theme}>Time and Attendance</NavItemLabel>
          <Atoms.Badge text="2" appearance={Atoms.Badge.APPEARANCES.NEUTRAL} size={Atoms.Badge.SIZES.S} />
        </NavItem>
        <NavItem theme={theme}>
          <NavItemLabel theme={theme}>Reimbursements</NavItemLabel>
          <Atoms.Badge text="3" appearance={Atoms.Badge.APPEARANCES.NEUTRAL} size={Atoms.Badge.SIZES.S} />
        </NavItem>
      </PaneASection>

      {/* Tasks section */}
      <PaneASection theme={theme} hasDivider>
        <PaneASectionLabel theme={theme}>Tasks</PaneASectionLabel>
        <NavItem theme={theme} isActive={getIsActive('tasks')} onClick={() => setActiveFilter('tasks')}>
          <NavItemLabel theme={theme} isActive={getIsActive('tasks')}>All Tasks</NavItemLabel>
          <Atoms.Badge text="8" appearance={Atoms.Badge.APPEARANCES.NEUTRAL} size={Atoms.Badge.SIZES.S} />
        </NavItem>
        <NavItem theme={theme}>
          <NavItemLabel theme={theme}>Documents</NavItemLabel>
          <Atoms.Badge text="2" appearance={Atoms.Badge.APPEARANCES.NEUTRAL} size={Atoms.Badge.SIZES.S} />
        </NavItem>
        <NavItem theme={theme}>
          <NavItemLabel theme={theme}>Learning Management</NavItemLabel>
          <Atoms.Badge text="2" appearance={Atoms.Badge.APPEARANCES.NEUTRAL} size={Atoms.Badge.SIZES.S} />
        </NavItem>
        <NavItem theme={theme}>
          <NavItemLabel theme={theme}>Miscellaneous</NavItemLabel>
          <Atoms.Badge text="2" appearance={Atoms.Badge.APPEARANCES.NEUTRAL} size={Atoms.Badge.SIZES.S} />
        </NavItem>
        <NavItem theme={theme}>
          <NavItemLabel theme={theme}>Payroll</NavItemLabel>
          <Atoms.Badge text="2" appearance={Atoms.Badge.APPEARANCES.NEUTRAL} size={Atoms.Badge.SIZES.S} />
        </NavItem>
      </PaneASection>
    </PaneAContainer>
  );
};

// ============================================
// PANE A CONTENT - Explore (Discovery Hub)
// ============================================
interface ExploreNavContentProps {
  isPreview?: boolean;
  activeItem?: string;
  onItemChange?: (item: string) => void;
}

const ExploreNavContent: React.FC<ExploreNavContentProps> = ({ 
  isPreview = false, 
  activeItem = 'recommended',
  onItemChange 
}) => {
  const { theme } = usePebbleTheme();
  
  const handleItemChange = (item: string) => {
    onItemChange?.(item);
  };
  
  // Don't show active state when previewing
  const getIsActive = (item: string) => !isPreview && activeItem === item;

  return (
    <PaneAContainer theme={theme}>
      {/* Recommended at top - links to personalized explore page */}
      <PaneASection theme={theme}>
        <NavItem theme={theme} isActive={getIsActive('recommended')} onClick={() => handleItemChange('recommended')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.STAR_OUTLINE} size={16} />
            <NavItemLabel theme={theme} isActive={getIsActive('recommended')}>Recommended for you</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
      </PaneASection>

      {/* Products Section */}
      <PaneASection theme={theme} hasDivider>
        <PaneASectionLabel theme={theme}>Products</PaneASectionLabel>
        <NavItem theme={theme} isActive={getIsActive('hr')} onClick={() => handleItemChange('hr')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.USER_CIRCLE_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>HR</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
        <NavItem theme={theme} isActive={getIsActive('payroll')} onClick={() => handleItemChange('payroll')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.STACKED_COINS_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Payroll</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
        <NavItem theme={theme} isActive={getIsActive('it')} onClick={() => handleItemChange('it')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.LAPTOP_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>IT</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
        <NavItem theme={theme} isActive={getIsActive('finance')} onClick={() => handleItemChange('finance')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.CREDIT_CARD_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Finance</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
        <NavItem theme={theme} isActive={getIsActive('global')} onClick={() => handleItemChange('global')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.GLOBE_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Global</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
      </PaneASection>

      {/* Platform Section */}
      <PaneASection theme={theme} hasDivider>
        <PaneASectionLabel theme={theme}>Platform</PaneASectionLabel>
        <NavItem theme={theme} isActive={getIsActive('workflow-studio')} onClick={() => handleItemChange('workflow-studio')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.WORKFLOW_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Workflow Studio</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
        <NavItem theme={theme} isActive={getIsActive('analytics')} onClick={() => handleItemChange('analytics')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.CHART_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Analytics</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
        <NavItem theme={theme} isActive={getIsActive('policies')} onClick={() => handleItemChange('policies')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.SHIELD_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Policies</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
        <NavItem theme={theme} isActive={getIsActive('permissions')} onClick={() => handleItemChange('permissions')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.LOCK_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Permissions</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
      </PaneASection>

      {/* App Studio Section */}
      <PaneASection theme={theme} hasDivider>
        <PaneASectionLabel theme={theme}>App Studio</PaneASectionLabel>
        <NavItem theme={theme} isActive={getIsActive('integrations')} onClick={() => handleItemChange('integrations')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.PUZZLE_PIECE_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Integrations</NavItemLabel>
          </NavItemLeft>
          <Atoms.Badge text="600+" appearance={Atoms.Badge.APPEARANCES.INFO_LIGHT} size={Atoms.Badge.SIZES.S} />
        </NavItem>
        <NavItem theme={theme} isActive={getIsActive('custom-apps')} onClick={() => handleItemChange('custom-apps')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.GRID_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>Custom Apps</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
        <NavItem theme={theme} isActive={getIsActive('app-marketplace')} onClick={() => handleItemChange('app-marketplace')}>
          <NavItemLeft theme={theme}>
            <Icon type={Icon.TYPES.STORE_OUTLINE} size={16} />
            <NavItemLabel theme={theme}>App Marketplace</NavItemLabel>
          </NavItemLeft>
          <NavItemChevron theme={theme}><Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} /></NavItemChevron>
        </NavItem>
      </PaneASection>
    </PaneAContainer>
  );
};

// ============================================
// PANE B - To-Do List
// ============================================
const ToDoContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const ToDoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${(theme as StyledTheme).space400} ${(theme as StyledTheme).space600}`};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const ToDoSearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  padding: ${({ theme }) => `${(theme as StyledTheme).space200} ${(theme as StyledTheme).space300}`};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  width: 280px;
`;

const ToDoActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ToDoTable = styled.div`
  flex: 1;
  overflow-y: auto;
`;

const ToDoTableHeader = styled.div`
  display: grid;
  grid-template-columns: 40px 120px 180px 1fr 140px 100px 100px 40px;
  padding: ${({ theme }) => `${(theme as StyledTheme).space300} ${(theme as StyledTheme).space600}`};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurface};
  position: sticky;
  top: 0;
`;

const ToDoTableHeaderCell = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ToDoTableRow = styled.div`
  display: grid;
  grid-template-columns: 40px 120px 180px 1fr 140px 100px 100px 40px;
  padding: ${({ theme }) => `${(theme as StyledTheme).space300} ${(theme as StyledTheme).space600}`};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  align-items: center;
  
  &:hover {
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

const ToDoCheckbox = styled.div`
  width: 18px;
  height: 18px;
  border: 2px solid ${({ theme }) => (theme as StyledTheme).colorOutline};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerSm};
`;

const ToDoRequester = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ToDoAvatar = styled.div<{ color?: string }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ color, theme }) => color || (theme as StyledTheme).colorPrimaryContainer};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnPrimaryContainer};
  flex-shrink: 0;
`;

const ToDoRequesterInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ToDoRequesterName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  font-weight: 500;
`;

const ToDoRequesterRole = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ToDoDetails = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const ToDoTaskType = styled.div`
  display: flex;
  flex-direction: column;
`;

const ToDoTaskTypeName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const ToDoTaskTypeLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ToDoDueDate = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const CriticalBadge = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorError};
  background-color: ${({ theme }) => (theme as StyledTheme).colorErrorContainer};
  padding: 2px 8px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
`;

// Sample to-do data
const TODO_ITEMS = [
  { date: 'Jan 21, 2025', requester: 'Payroll Team', role: '', details: 'Submit amendment for MI state Wh filing', taskType: 'Payroll', taskLabel: 'Task', dueDate: 'Jan 25, 2025', critical: true, color: '#6B4C9A' },
  { date: 'Jan 18, 2025', requester: 'Payroll Team', role: '', details: 'Submit amendment for CA state UI filing', taskType: 'Payroll', taskLabel: 'Task', dueDate: 'Jan 22, 2025', critical: true, color: '#6B4C9A' },
  { date: 'Jan 2, 2025', requester: 'Onboarding Team', role: '', details: 'Take new hire Sarah Kim out to lunch', taskType: 'Miscellaneous', taskLabel: 'Task', dueDate: 'Jan 16, 2025', color: '#4A9B8C' },
  { date: 'Jan 8, 2025', requester: 'Lisa Thompson', role: 'HR Director', details: 'Increase Robert Wilson\'s PTO balance to 20 days', taskType: 'HR Management', taskLabel: 'Approvals', dueDate: '--', color: '#4A7C9B' },
  { date: 'Jan 9, 2025', requester: 'David Park', role: 'Product Manager', details: '8h 30m time entry on Oct 25', taskType: 'Time and Attendance', taskLabel: 'Approvals', dueDate: '--', color: '#9B7C4A' },
  { date: 'Jan 10, 2025', requester: 'Emily Rodriguez', role: 'Marketing Manager', details: 'Reimburse $30.00 (Alaska Airlines)', taskType: 'Reimbursements', taskLabel: 'Approvals', dueDate: '--', color: '#4A9B6B' },
  { date: 'Jan 11, 2025', requester: 'Michael Chen', role: 'Engineering Manager', details: 'Increase Jennifer Lee\'s salary to $95,000', taskType: 'HR Management', taskLabel: 'Approvals', dueDate: '--', color: '#9B4A6B' },
  { date: 'Jan 12, 2025', requester: 'Sarah Johnson', role: 'Project Manager', details: '13h 57m time entry on Oct 26 - 27', taskType: 'Time and Attendance', taskLabel: 'Approvals', dueDate: '--', color: '#6B9B4A' },
];

const ToDoListContent: React.FC = () => {
  const { theme } = usePebbleTheme();

  return (
    <ToDoContainer theme={theme}>
      {/* Header with search and actions */}
      <ToDoHeader theme={theme}>
        <ToDoSearchBar theme={theme}>
          <Icon type={Icon.TYPES.SEARCH} size={16} color={theme.colorOnSurfaceVariant} />
          <span style={{ color: theme.colorOnSurfaceVariant, ...theme.typestyleV2BodySmall }}>Search...</span>
        </ToDoSearchBar>
        <ToDoActions theme={theme}>
          <Button.Icon icon={Icon.TYPES.GRID_OUTLINE} appearance={Button.APPEARANCES.GHOST} size={Button.SIZES.XS} aria-label="Grid view" />
          <Button.Icon icon={Icon.TYPES.FILTER_OUTLINE} appearance={Button.APPEARANCES.GHOST} size={Button.SIZES.XS} aria-label="Filter" />
          <Button appearance={Button.APPEARANCES.GHOST} size={Button.SIZES.XS} icon={Icon.TYPES.COLUMNS_OUTLINE}>Split</Button>
          <Button appearance={Button.APPEARANCES.OUTLINE} size={Button.SIZES.XS}>Viewing: Default</Button>
        </ToDoActions>
      </ToDoHeader>

      {/* Table */}
      <ToDoTable theme={theme}>
        <ToDoTableHeader theme={theme}>
          <ToDoTableHeaderCell theme={theme}></ToDoTableHeaderCell>
          <ToDoTableHeaderCell theme={theme}>Requested on</ToDoTableHeaderCell>
          <ToDoTableHeaderCell theme={theme}>Requested by</ToDoTableHeaderCell>
          <ToDoTableHeaderCell theme={theme}>Details</ToDoTableHeaderCell>
          <ToDoTableHeaderCell theme={theme}>Task type</ToDoTableHeaderCell>
          <ToDoTableHeaderCell theme={theme}>Due date</ToDoTableHeaderCell>
          <ToDoTableHeaderCell theme={theme}></ToDoTableHeaderCell>
          <ToDoTableHeaderCell theme={theme}></ToDoTableHeaderCell>
        </ToDoTableHeader>

        {TODO_ITEMS.map((item, index) => (
          <ToDoTableRow key={index} theme={theme}>
            <ToDoCheckbox theme={theme} />
            <ToDoDueDate theme={theme}>{item.date}</ToDoDueDate>
            <ToDoRequester theme={theme}>
              <ToDoAvatar theme={theme} color={item.color}>
                {item.requester.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </ToDoAvatar>
              <ToDoRequesterInfo theme={theme}>
                <ToDoRequesterName theme={theme}>{item.requester}</ToDoRequesterName>
                {item.role && <ToDoRequesterRole theme={theme}>{item.role}</ToDoRequesterRole>}
              </ToDoRequesterInfo>
            </ToDoRequester>
            <ToDoDetails theme={theme}>
              {item.details}
              {item.critical && <CriticalBadge theme={theme} style={{ marginLeft: '8px' }}>Critical</CriticalBadge>}
            </ToDoDetails>
            <ToDoTaskType theme={theme}>
              <ToDoTaskTypeName theme={theme}>{item.taskType}</ToDoTaskTypeName>
              <ToDoTaskTypeLabel theme={theme}>{item.taskLabel}</ToDoTaskTypeLabel>
            </ToDoTaskType>
            <ToDoDueDate theme={theme}>{item.dueDate}</ToDoDueDate>
            <div></div>
            <Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} color={theme.colorOnSurfaceVariant} />
          </ToDoTableRow>
        ))}
      </ToDoTable>
    </ToDoContainer>
  );
};

// ============================================
// PANE B - Explore Content
// ============================================
const ExploreContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  height: 100%;
  overflow-y: auto;
`;

const ExploreMain = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
  max-width: 720px;
`;

const ExploreRightRail = styled.div`
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const ExploreTitle = styled.h1`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
  font-size: 32px;
`;

const ExploreSectionTitle = styled.h2`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const ExploreActionList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ExploreActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => (theme as StyledTheme).space300} 0;
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  
  &:last-child {
    border-bottom: none;
  }
`;

const ExploreActionLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const ExploreActionIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExploreActionText = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ExploreActionTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const ExploreActionSubtext = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ExploreActionRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ExploreFeatureCard = styled.div`
  display: flex;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  overflow: hidden;
`;

const ExploreFeatureLeft = styled.div`
  flex: 1;
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const ExploreFeatureRight = styled.div`
  flex: 1;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExploreFeatureIcon = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExploreFeatureTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLargeEmphasized};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const ExploreFeatureDescription = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  line-height: 1.5;
`;

const RightRailWidget = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space500};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const RightRailTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLargeEmphasized};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const RightRailDescription = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
`;

const RightRailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const RightRailListItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  padding: ${({ theme }) => (theme as StyledTheme).space200};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  
  &:hover {
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

const ExploreContent: React.FC = () => {
  const { theme } = usePebbleTheme();

  return (
    <ExploreContainer theme={theme}>
      <ExploreMain theme={theme}>
        <ExploreTitle theme={theme}>Recommended for you</ExploreTitle>

        {/* Get more from Time section */}
        <div>
          <ExploreSectionTitle theme={theme}>Get more from Time</ExploreSectionTitle>
          <ExploreActionList theme={theme}>
            <ExploreActionRow theme={theme}>
              <ExploreActionLeft theme={theme}>
                <ExploreActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.CALENDAR_OUTLINE} size={16} />
                </ExploreActionIcon>
                <ExploreActionText theme={theme}>
                  <ExploreActionTitle theme={theme}>Create a schedule</ExploreActionTitle>
                  <ExploreActionSubtext theme={theme}>·</ExploreActionSubtext>
                  <ExploreActionSubtext theme={theme}>Coordinate shifts and availability</ExploreActionSubtext>
                </ExploreActionText>
              </ExploreActionLeft>
              <ExploreActionRight theme={theme}>
                <Icon type={Icon.TYPES.CHECK_CIRCLE_OUTLINE} size={20} color={theme.colorSuccess} />
                <Button.Icon icon={Icon.TYPES.CHEVRON_RIGHT} appearance={Button.APPEARANCES.GHOST} size={Button.SIZES.XS} aria-label="Go" />
              </ExploreActionRight>
            </ExploreActionRow>

            <ExploreActionRow theme={theme}>
              <ExploreActionLeft theme={theme}>
                <ExploreActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.FLIGHT_OUTLINE} size={16} />
                </ExploreActionIcon>
                <ExploreActionText theme={theme}>
                  <ExploreActionTitle theme={theme}>Track absences</ExploreActionTitle>
                  <ExploreActionSubtext theme={theme}>·</ExploreActionSubtext>
                  <ExploreActionSubtext theme={theme}>Manage time off and leave</ExploreActionSubtext>
                </ExploreActionText>
              </ExploreActionLeft>
              <ExploreActionRight theme={theme}>
                <Button appearance={Button.APPEARANCES.OUTLINE} size={Button.SIZES.XS}>Activate</Button>
                <Button.Icon icon={Icon.TYPES.CHEVRON_RIGHT} appearance={Button.APPEARANCES.GHOST} size={Button.SIZES.XS} aria-label="Go" />
              </ExploreActionRight>
            </ExploreActionRow>

            <ExploreActionRow theme={theme}>
              <ExploreActionLeft theme={theme}>
                <ExploreActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.DOLLAR_CIRCLE_OUTLINE} size={16} />
                </ExploreActionIcon>
                <ExploreActionText theme={theme}>
                  <ExploreActionTitle theme={theme}>Pay your team</ExploreActionTitle>
                  <ExploreActionSubtext theme={theme}>·</ExploreActionSubtext>
                  <ExploreActionSubtext theme={theme}>Run payroll with synced time data</ExploreActionSubtext>
                </ExploreActionText>
              </ExploreActionLeft>
              <ExploreActionRight theme={theme}>
                <Button appearance={Button.APPEARANCES.OUTLINE} size={Button.SIZES.XS}>Learn more</Button>
                <Button.Icon icon={Icon.TYPES.CHEVRON_RIGHT} appearance={Button.APPEARANCES.GHOST} size={Button.SIZES.XS} aria-label="Go" />
              </ExploreActionRight>
            </ExploreActionRow>
          </ExploreActionList>
        </div>

        {/* Discover more section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.space400 }}>
          <ExploreSectionTitle theme={theme}>Discover more</ExploreSectionTitle>

          <ExploreFeatureCard theme={theme}>
            <ExploreFeatureLeft theme={theme}>
              <ExploreFeatureIcon theme={theme}>
                <Icon type={Icon.TYPES.FILE_OUTLINE} size={16} />
              </ExploreFeatureIcon>
              <ExploreFeatureTitle theme={theme}>Store employee records</ExploreFeatureTitle>
              <ExploreFeatureDescription theme={theme}>
                Keep I-9s, tax forms, and signed contracts in one place
              </ExploreFeatureDescription>
              <Button appearance={Button.APPEARANCES.GHOST} size={Button.SIZES.XS}>Explore</Button>
            </ExploreFeatureLeft>
            <ExploreFeatureRight theme={theme}>
              <WidgetCard theme={theme} style={{ width: '100%', minHeight: 'auto', padding: theme.space400 }}>
                <TaskRow theme={theme}><SkeletonLine theme={theme} width="60px" height="12px" /><SkeletonLine theme={theme} width="50px" height="12px" /><TaskBadge theme={theme} /></TaskRow>
                <TaskRow theme={theme}><SkeletonLine theme={theme} width="80px" height="12px" /><SkeletonLine theme={theme} width="40px" height="12px" /><TaskBadge theme={theme} /></TaskRow>
                <TaskRow theme={theme}><SkeletonLine theme={theme} width="70px" height="12px" /><SkeletonLine theme={theme} width="55px" height="12px" /><TaskBadge theme={theme} /></TaskRow>
              </WidgetCard>
            </ExploreFeatureRight>
          </ExploreFeatureCard>

          <ExploreFeatureCard theme={theme}>
            <ExploreFeatureLeft theme={theme}>
              <ExploreFeatureIcon theme={theme}>
                <Icon type={Icon.TYPES.CREDIT_CARD_OUTLINE} size={16} />
              </ExploreFeatureIcon>
              <ExploreFeatureTitle theme={theme}>Manage company spend</ExploreFeatureTitle>
              <ExploreFeatureDescription theme={theme}>
                Corporate cards, expenses, and reimbursements in one place
              </ExploreFeatureDescription>
              <Button appearance={Button.APPEARANCES.GHOST} size={Button.SIZES.XS}>Explore</Button>
            </ExploreFeatureLeft>
            <ExploreFeatureRight theme={theme}>
              <WidgetCard theme={theme} style={{ width: '100%', minHeight: 'auto', padding: theme.space400 }}>
                <SkeletonLine theme={theme} width="100%" height="80px" />
              </WidgetCard>
            </ExploreFeatureRight>
          </ExploreFeatureCard>

          <ExploreFeatureCard theme={theme}>
            <ExploreFeatureLeft theme={theme}>
              <ExploreFeatureIcon theme={theme}>
                <Icon type={Icon.TYPES.HEART_OUTLINE} size={16} />
              </ExploreFeatureIcon>
              <ExploreFeatureTitle theme={theme}>Offer great benefits</ExploreFeatureTitle>
              <ExploreFeatureDescription theme={theme}>
                Health, dental, vision, and more for your team
              </ExploreFeatureDescription>
              <Button appearance={Button.APPEARANCES.GHOST} size={Button.SIZES.XS}>Explore</Button>
            </ExploreFeatureLeft>
            <ExploreFeatureRight theme={theme}>
              <WidgetCard theme={theme} style={{ width: '100%', minHeight: 'auto', padding: theme.space400 }}>
                <PeopleGrid theme={theme}>
                  <SkeletonCircle theme={theme} size="32px" />
                  <SkeletonCircle theme={theme} size="32px" />
                  <SkeletonCircle theme={theme} size="32px" />
                  <SkeletonCircle theme={theme} size="32px" />
                </PeopleGrid>
              </WidgetCard>
            </ExploreFeatureRight>
          </ExploreFeatureCard>
        </div>
      </ExploreMain>

      <ExploreRightRail theme={theme}>
        <RightRailWidget theme={theme}>
          <RightRailTitle theme={theme}>What customers like you add next</RightRailTitle>
          <RightRailDescription theme={theme}>
            Based on companies similar to yours
          </RightRailDescription>
          <RightRailList theme={theme}>
            <RightRailListItem theme={theme}>
              <Icon type={Icon.TYPES.DOLLAR_CIRCLE_OUTLINE} size={20} />
              <span style={{ ...theme.typestyleV2BodySmall }}>Payroll</span>
            </RightRailListItem>
            <RightRailListItem theme={theme}>
              <Icon type={Icon.TYPES.HEART_OUTLINE} size={20} />
              <span style={{ ...theme.typestyleV2BodySmall }}>Benefits</span>
            </RightRailListItem>
            <RightRailListItem theme={theme}>
              <Icon type={Icon.TYPES.LAPTOP_OUTLINE} size={20} />
              <span style={{ ...theme.typestyleV2BodySmall }}>IT Management</span>
            </RightRailListItem>
          </RightRailList>
        </RightRailWidget>
      </ExploreRightRail>
    </ExploreContainer>
  );
};

// ============================================
// Payroll Upsell Nudge Banner
const PayrollNudgeBanner = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  background-color: ${({ theme }) => (theme as StyledTheme).colorPrimaryVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  position: relative;
`;

const NudgeIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  flex-shrink: 0;
`;

const NudgeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
  flex: 1;
  min-width: 0;
`;

const NudgeTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  font-weight: 535;
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const NudgeDescription = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const NudgeActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  flex-shrink: 0;
`;

const NudgeDismiss = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  
  &:hover {
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

// PANE B - Time Overview (Skeleton)
// ============================================
const TimeOverviewContent: React.FC = () => {
  const { theme } = usePebbleTheme();
  const [showPayrollNudge, setShowPayrollNudge] = useState(true);

  return (
    <DashboardContainer theme={theme}>
      {/* Header area */}
      <WelcomeHeader theme={theme}>
        <WelcomeDate theme={theme}>Your workforce at a glance</WelcomeDate>
        <WelcomeGreeting theme={theme}>Time Overview</WelcomeGreeting>
      </WelcomeHeader>

      {/* Stats Row - Time specific */}
      <StatsRow theme={theme}>
        <StatPill theme={theme}>
          <Icon type={Icon.TYPES.TIME_OUTLINE} size={16} />
          <span>32 hrs this week</span>
        </StatPill>
        <StatPill theme={theme}>
          <Icon type={Icon.TYPES.CHECKBOX_WITHCHECK_OUTLINE} size={16} />
          <span>3 pending approvals</span>
        </StatPill>
        <StatPill theme={theme}>
          <Icon type={Icon.TYPES.FLIGHT_OUTLINE} size={16} />
          <span>12 PTO days left</span>
        </StatPill>
      </StatsRow>

      {/* Payroll Upsell Nudge - COMMENTED OUT (say "turn on payroll nudge" to enable) */}
      {/* {showPayrollNudge && (
        <PayrollNudgeBanner theme={theme}>
          <NudgeDismiss theme={theme} onClick={() => setShowPayrollNudge(false)} aria-label="Dismiss">
            <Icon type={Icon.TYPES.CLOSE} size={16} />
          </NudgeDismiss>
          <NudgeIconWrapper theme={theme}>
            <Icon type={Icon.TYPES.STACKED_COINS_OUTLINE} size={20} color={theme.colorPrimary} />
          </NudgeIconWrapper>
          <NudgeContent theme={theme}>
            <NudgeTitle theme={theme}>Skip the export — run payroll directly from your time data</NudgeTitle>
            <NudgeDescription theme={theme}>
              We noticed you export scheduling data frequently. With Rippling Payroll, approved timecards flow directly into payroll — no downloads, no uploads, no reconciliation.
            </NudgeDescription>
          </NudgeContent>
          <NudgeActions theme={theme}>
            <Button
              appearance={Button.APPEARANCES.PRIMARY}
              size={Button.SIZES.XS}
            >
              See how it works
            </Button>
          </NudgeActions>
        </PayrollNudgeBanner>
      )} */}

      {/* Widget Grid - Time specific */}
      <WidgetGrid theme={theme}>
        {/* Today's Schedule Widget */}
        <WidgetCard theme={theme}>
          <WidgetHeader theme={theme}>
            <WidgetTitle theme={theme}>
              <WidgetTitleText theme={theme}>Today's schedule</WidgetTitleText>
            </WidgetTitle>
          </WidgetHeader>
          <WidgetContent theme={theme}>
            <SkeletonRow theme={theme}>
              <SkeletonLine theme={theme} width="60px" height="14px" />
              <SkeletonLine theme={theme} width="100%" height="40px" />
            </SkeletonRow>
            <SkeletonRow theme={theme}>
              <SkeletonLine theme={theme} width="60px" height="14px" />
              <SkeletonLine theme={theme} width="100%" height="40px" />
            </SkeletonRow>
            <SkeletonRow theme={theme}>
              <SkeletonLine theme={theme} width="60px" height="14px" />
              <SkeletonLine theme={theme} width="100%" height="40px" />
            </SkeletonRow>
          </WidgetContent>
        </WidgetCard>

        {/* Pending Approvals Widget */}
        <WidgetCard theme={theme}>
          <WidgetHeader theme={theme}>
            <WidgetTitle theme={theme}>
              <WidgetTitleText theme={theme}>Pending approvals</WidgetTitleText>
            </WidgetTitle>
            <SkeletonLine theme={theme} width="60px" height="14px" />
          </WidgetHeader>
          <WidgetContent theme={theme}>
            <TaskRow theme={theme}>
              <SkeletonCircle theme={theme} size="32px" />
              <SkeletonTextGroup theme={theme}>
                <SkeletonLine theme={theme} width="70%" height="14px" />
                <SkeletonLine theme={theme} width="40%" height="10px" />
              </SkeletonTextGroup>
              <TaskBadge theme={theme} />
            </TaskRow>
            <TaskRow theme={theme}>
              <SkeletonCircle theme={theme} size="32px" />
              <SkeletonTextGroup theme={theme}>
                <SkeletonLine theme={theme} width="60%" height="14px" />
                <SkeletonLine theme={theme} width="50%" height="10px" />
              </SkeletonTextGroup>
              <TaskBadge theme={theme} />
            </TaskRow>
            <TaskRow theme={theme}>
              <SkeletonCircle theme={theme} size="32px" />
              <SkeletonTextGroup theme={theme}>
                <SkeletonLine theme={theme} width="80%" height="14px" />
                <SkeletonLine theme={theme} width="35%" height="10px" />
              </SkeletonTextGroup>
              <TaskBadge theme={theme} />
            </TaskRow>
          </WidgetContent>
        </WidgetCard>

        {/* Recent Timecards */}
        <WidgetCard theme={theme}>
          <WidgetHeader theme={theme}>
            <WidgetTitle theme={theme}>
              <WidgetTitleText theme={theme}>Recent timecards</WidgetTitleText>
            </WidgetTitle>
          </WidgetHeader>
          <WidgetContent theme={theme}>
            <SkeletonTabs theme={theme}>
              <SkeletonTab theme={theme} active />
              <SkeletonTab theme={theme} />
              <SkeletonTab theme={theme} />
            </SkeletonTabs>
            <TaskRow theme={theme}>
              <TaskCheckbox theme={theme} />
              <SkeletonLine theme={theme} width="50%" height="14px" />
              <SkeletonLine theme={theme} width="60px" height="14px" />
            </TaskRow>
            <TaskRow theme={theme}>
              <TaskCheckbox theme={theme} />
              <SkeletonLine theme={theme} width="65%" height="14px" />
              <SkeletonLine theme={theme} width="60px" height="14px" />
            </TaskRow>
            <TaskRow theme={theme}>
              <TaskCheckbox theme={theme} />
              <SkeletonLine theme={theme} width="45%" height="14px" />
              <SkeletonLine theme={theme} width="60px" height="14px" />
            </TaskRow>
          </WidgetContent>
        </WidgetCard>

        {/* Team Attendance */}
        <WidgetCard theme={theme}>
          <WidgetHeader theme={theme}>
            <WidgetTitle theme={theme}>
              <WidgetTitleText theme={theme}>Team attendance</WidgetTitleText>
            </WidgetTitle>
          </WidgetHeader>
          <WidgetContent theme={theme}>
            <PeopleGrid theme={theme}>
              <PersonCard theme={theme}>
                <SkeletonCircle theme={theme} size="32px" />
                <SkeletonTextGroup theme={theme}>
                  <SkeletonLine theme={theme} width="70px" height="12px" />
                  <SkeletonLine theme={theme} width="50px" height="10px" />
                </SkeletonTextGroup>
              </PersonCard>
              <PersonCard theme={theme}>
                <SkeletonCircle theme={theme} size="32px" />
                <SkeletonTextGroup theme={theme}>
                  <SkeletonLine theme={theme} width="60px" height="12px" />
                  <SkeletonLine theme={theme} width="45px" height="10px" />
                </SkeletonTextGroup>
              </PersonCard>
              <PersonCard theme={theme}>
                <SkeletonCircle theme={theme} size="32px" />
                <SkeletonTextGroup theme={theme}>
                  <SkeletonLine theme={theme} width="80px" height="12px" />
                  <SkeletonLine theme={theme} width="55px" height="10px" />
                </SkeletonTextGroup>
              </PersonCard>
              <PersonCard theme={theme}>
                <SkeletonCircle theme={theme} size="32px" />
                <SkeletonTextGroup theme={theme}>
                  <SkeletonLine theme={theme} width="65px" height="12px" />
                  <SkeletonLine theme={theme} width="40px" height="10px" />
                </SkeletonTextGroup>
              </PersonCard>
            </PeopleGrid>
          </WidgetContent>
        </WidgetCard>
      </WidgetGrid>
    </DashboardContainer>
  );
};

// ============================================
// PANE B - Payroll Overview (Empty State with Readiness Widget)
// ============================================

// Payroll Readiness Widget - shows Time data connection
const ReadinessWidget = styled.div`
  background: linear-gradient(135deg, 
    ${({ theme }) => (theme as StyledTheme).colorPrimaryContainer} 0%, 
    ${({ theme }) => (theme as StyledTheme).colorSurfaceBright} 100%);
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorPrimary}33;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const ReadinessHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const ReadinessHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ReadinessIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  background-color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ReadinessTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const ReadinessDescription = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  opacity: 0.7;
  margin: 0;
`;

const ReadinessStats = styled.div`
  display: flex;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
  padding: ${({ theme }) => (theme as StyledTheme).space400} 0;
  border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const ReadinessStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const ReadinessStatValue = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const ReadinessStatLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  opacity: 0.7;
`;

const ReadinessActions = styled.div`
  display: flex;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

// Gated/Empty widget overlay
const GatedWidgetCard = styled(WidgetCard)`
  position: relative;
  opacity: 0.6;
  
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: ${({ theme }) => (theme as StyledTheme).colorSurface}66;
    border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
    pointer-events: none;
  }
`;

interface PayrollSkuPageContentProps {
  onLearnMore: () => void;
}

const PayrollSkuPageContent: React.FC<PayrollSkuPageContentProps> = ({ onLearnMore }) => {
  const { theme } = usePebbleTheme();

  return (
    <DashboardContainer theme={theme}>
      {/* Header area */}
      <WelcomeHeader theme={theme}>
        <WelcomeDate theme={theme}>Ready when you are</WelcomeDate>
        <WelcomeGreeting theme={theme}>Payroll Overview</WelcomeGreeting>
      </WelcomeHeader>

      {/* Payroll Readiness Widget - The upsell integrated with Time data */}
      <ReadinessWidget theme={theme}>
        <ReadinessHeader theme={theme}>
          <ReadinessHeaderLeft theme={theme}>
            <ReadinessTitle theme={theme}>Your Time data is ready for Payroll</ReadinessTitle>
            <ReadinessDescription theme={theme}>
              Hours tracked in Time sync directly to pay runs—no double entry, no errors.
            </ReadinessDescription>
          </ReadinessHeaderLeft>
          <ReadinessIcon theme={theme}>
            <Icon type={Icon.TYPES.DOLLAR_CIRCLE_OUTLINE} size={24} color={theme.colorOnPrimary} />
          </ReadinessIcon>
        </ReadinessHeader>

        <ReadinessStats theme={theme}>
          <ReadinessStat theme={theme}>
            <ReadinessStatValue theme={theme}>5</ReadinessStatValue>
            <ReadinessStatLabel theme={theme}>Employees tracked</ReadinessStatLabel>
          </ReadinessStat>
          <ReadinessStat theme={theme}>
            <ReadinessStatValue theme={theme}>168 hrs</ReadinessStatValue>
            <ReadinessStatLabel theme={theme}>This pay period</ReadinessStatLabel>
          </ReadinessStat>
          <ReadinessStat theme={theme}>
            <ReadinessStatValue theme={theme}>$0</ReadinessStatValue>
            <ReadinessStatLabel theme={theme}>Overtime</ReadinessStatLabel>
          </ReadinessStat>
        </ReadinessStats>

        <ReadinessActions theme={theme}>
          <Button 
            appearance={Button.APPEARANCES.PRIMARY} 
            size={Button.SIZES.M}
          >
            Get Payroll
          </Button>
          <Button 
            appearance={Button.APPEARANCES.GHOST} 
            size={Button.SIZES.M}
            onClick={onLearnMore}
          >
            Learn more
          </Button>
        </ReadinessActions>
      </ReadinessWidget>

      {/* Gated Widget Grid - Shows what they'd get */}
      <WidgetGrid theme={theme}>
        {/* Upcoming Pay Run - Gated */}
        <GatedWidgetCard theme={theme}>
          <WidgetHeader theme={theme}>
            <WidgetTitle theme={theme}>
              <WidgetTitleText theme={theme}>Upcoming pay run</WidgetTitleText>
            </WidgetTitle>
          </WidgetHeader>
          <WidgetContent theme={theme}>
            <SkeletonLine theme={theme} width="100%" height="60px" />
            <SkeletonRow theme={theme} style={{ marginTop: '16px' }}>
              <SkeletonTextGroup theme={theme}>
                <SkeletonLine theme={theme} width="80px" height="10px" />
                <SkeletonLine theme={theme} width="120px" height="20px" />
              </SkeletonTextGroup>
              <SkeletonTextGroup theme={theme}>
                <SkeletonLine theme={theme} width="80px" height="10px" />
                <SkeletonLine theme={theme} width="100px" height="20px" />
              </SkeletonTextGroup>
            </SkeletonRow>
          </WidgetContent>
        </GatedWidgetCard>

        {/* Recent Pay Runs - Gated */}
        <GatedWidgetCard theme={theme}>
          <WidgetHeader theme={theme}>
            <WidgetTitle theme={theme}>
              <WidgetTitleText theme={theme}>Recent pay runs</WidgetTitleText>
            </WidgetTitle>
          </WidgetHeader>
          <WidgetContent theme={theme}>
            <TaskRow theme={theme}>
              <SkeletonLine theme={theme} width="80px" height="14px" />
              <SkeletonLine theme={theme} width="100px" height="14px" />
              <TaskBadge theme={theme} />
            </TaskRow>
            <TaskRow theme={theme}>
              <SkeletonLine theme={theme} width="80px" height="14px" />
              <SkeletonLine theme={theme} width="90px" height="14px" />
              <TaskBadge theme={theme} />
            </TaskRow>
            <TaskRow theme={theme}>
              <SkeletonLine theme={theme} width="80px" height="14px" />
              <SkeletonLine theme={theme} width="110px" height="14px" />
              <TaskBadge theme={theme} />
            </TaskRow>
          </WidgetContent>
        </GatedWidgetCard>

        {/* Tax Documents - Gated */}
        <GatedWidgetCard theme={theme}>
          <WidgetHeader theme={theme}>
            <WidgetTitle theme={theme}>
              <WidgetTitleText theme={theme}>Tax documents</WidgetTitleText>
            </WidgetTitle>
          </WidgetHeader>
          <WidgetContent theme={theme}>
            <SkeletonRow theme={theme}>
              <SkeletonLine theme={theme} width="40px" height="40px" />
              <SkeletonTextGroup theme={theme}>
                <SkeletonLine theme={theme} width="60px" height="14px" />
                <SkeletonLine theme={theme} width="100px" height="10px" />
              </SkeletonTextGroup>
            </SkeletonRow>
            <SkeletonRow theme={theme}>
              <SkeletonLine theme={theme} width="40px" height="40px" />
              <SkeletonTextGroup theme={theme}>
                <SkeletonLine theme={theme} width="70px" height="14px" />
                <SkeletonLine theme={theme} width="90px" height="10px" />
              </SkeletonTextGroup>
            </SkeletonRow>
          </WidgetContent>
        </GatedWidgetCard>

        {/* Employee Compensation - Gated */}
        <GatedWidgetCard theme={theme}>
          <WidgetHeader theme={theme}>
            <WidgetTitle theme={theme}>
              <WidgetTitleText theme={theme}>Employee compensation</WidgetTitleText>
            </WidgetTitle>
          </WidgetHeader>
          <WidgetContent theme={theme}>
            <TaskRow theme={theme}>
              <SkeletonCircle theme={theme} size="32px" />
              <SkeletonLine theme={theme} width="50%" height="14px" />
              <SkeletonLine theme={theme} width="70px" height="14px" />
            </TaskRow>
            <TaskRow theme={theme}>
              <SkeletonCircle theme={theme} size="32px" />
              <SkeletonLine theme={theme} width="45%" height="14px" />
              <SkeletonLine theme={theme} width="70px" height="14px" />
            </TaskRow>
            <TaskRow theme={theme}>
              <SkeletonCircle theme={theme} size="32px" />
              <SkeletonLine theme={theme} width="55%" height="14px" />
              <SkeletonLine theme={theme} width="70px" height="14px" />
            </TaskRow>
          </WidgetContent>
        </GatedWidgetCard>
      </WidgetGrid>
    </DashboardContainer>
  );
};

// ============================================
// PANE B - Payroll SKU Detail Page (Full Unpurchased SKU Page)
// ============================================

// Styled components for the SKU Detail Page
const SkuDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space800};
  max-width: 1240px;
  margin: 0 auto;
`;

const SkuDetailHero = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space800};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  flex-wrap: wrap;
`;

const SkuDetailHeroLeft = styled.div`
  flex: 1;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const SkuDetailHeroRight = styled.div`
  flex: 1;
  min-width: 380px;
  max-width: 480px;
`;

const SkuDetailBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  padding: ${({ theme }) => `${(theme as StyledTheme).space100} ${(theme as StyledTheme).space300}`};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  width: fit-content;
`;

const SkuDetailTitle = styled.h1`
  ${({ theme }) => (theme as StyledTheme).typestyleV2DisplaySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
  font-size: 36px;
  line-height: 1.2;
`;

const SkuDetailDescription = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  max-width: 480px;
  line-height: 1.5;
`;

const SkuDetailActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  margin-top: ${({ theme }) => (theme as StyledTheme).space200};
`;

const SkuDetailSubtext = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

// Payroll Readiness Card
const PayrollReadinessCard = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space500};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const ReadinessCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const ReadinessCardHeaderTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const ReadinessCardTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLargeEmphasized};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const ReadinessCardSubtitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ReadinessProgressRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const ReadinessProgressPercent = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  flex-shrink: 0;
`;

const ReadinessSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ReadinessSectionLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ReadinessRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => (theme as StyledTheme).space200} 0;
`;

const ReadinessRowLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ReadinessRowTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const ReadinessRowSubtext = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ReadinessRowRight = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const PaychecksReadyRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding-top: ${({ theme }) => (theme as StyledTheme).space300};
  border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const PaychecksInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaychecksTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMediumEmphasized};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const PaychecksSubtext = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

// Features Section
const FeaturesSectionTitle = styled.h2`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const FeatureCard = styled.div`
  display: flex;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
`;

const FeatureIcon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  background: linear-gradient(145deg, #f5e6d3, #ffe4c4);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const FeatureContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const FeatureTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLargeEmphasized};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const FeatureDescription = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  line-height: 1.5;
`;

const PayrollSkuDetailPage: React.FC = () => {
  const { theme } = usePebbleTheme();

  // Sample roles for AvatarList
  const paycheckRoles = [
    { id: '1', fullName: 'Sarah Chen' },
    { id: '2', fullName: 'Michael Park' },
    { id: '3', fullName: 'Emily Rodriguez' },
    { id: '4', fullName: 'David Kim' },
    { id: '5', fullName: 'Lisa Thompson' },
    { id: '6', fullName: 'James Wilson' },
    { id: '7', fullName: 'Anna Martinez' },
    { id: '8', fullName: 'Robert Johnson' },
    { id: '9', fullName: 'Jennifer Lee' },
    { id: '10', fullName: 'Chris Brown' },
    // ... representing 32 total employees
    ...Array.from({ length: 22 }, (_, i) => ({ 
      id: `${i + 11}`, 
      fullName: `Employee ${i + 11}` 
    })),
  ];

  const features = [
    {
      title: 'Auto-sync approved hours',
      description: 'Approved timecards flow directly into your payrun—no CSV exports, no manual entry, no re-keying errors.',
    },
    {
      title: 'Overtime calculated automatically',
      description: "You approve hours, we do the math. California double-time, weekly thresholds, state-specific rules—all handled.",
    },
    {
      title: 'One source of truth',
      description: 'Schedules, timecards, and paychecks all in one system. No more reconciling with a separate payroll provider.',
    },
    {
      title: 'Close payroll in minutes, not days',
      description: 'Customers using Time + Payroll close 2-3 days faster. Most of the work is done when you approve timecards.',
    },
    {
      title: 'Tax filings handled',
      description: 'Workers see their approved hours match their paychecks—fewer "why is my pay wrong?" questions.',
    },
    {
      title: 'Catch problems before payday',
      description: 'Flag missing punches, unapproved overtime, or schedule conflicts before they become payroll errors.',
    },
  ];

  return (
    <SkuDetailContainer theme={theme}>
      {/* Hero Section */}
      <SkuDetailHero theme={theme}>
        <SkuDetailHeroLeft theme={theme}>
          <SkuDetailBadge theme={theme}>
            <Icon type={Icon.TYPES.FX_OUTLINE} size={14} />
            No more time card entry
          </SkuDetailBadge>
          
          <SkuDetailTitle theme={theme}>
            Turn tracked time into payroll — automatically
          </SkuDetailTitle>
          
          <SkuDetailDescription theme={theme}>
            You already track hours in Rippling. Now automatically approve time, control labor costs, and run payroll with confidence — no exports, no double entry, no surprises.
          </SkuDetailDescription>
          
          <SkuDetailActions theme={theme}>
            <Button 
              appearance={Button.APPEARANCES.PRIMARY} 
              size={Button.SIZES.M}
            >
              Finish payroll setup
            </Button>
            <SkuDetailSubtext theme={theme}>
              Takes ~10 minutes. No charge until your first pay run.
            </SkuDetailSubtext>
          </SkuDetailActions>
        </SkuDetailHeroLeft>

        <SkuDetailHeroRight theme={theme}>
          <PayrollReadinessCard theme={theme}>
            <ReadinessCardHeader theme={theme}>
              <ReadinessCardHeaderTop theme={theme}>
                <div>
                  <ReadinessCardTitle theme={theme}>Payroll readiness</ReadinessCardTitle>
                  <ReadinessCardSubtitle theme={theme}>Based on existing Time data</ReadinessCardSubtitle>
                </div>
                <Button.Icon
                  icon={Icon.TYPES.MORE_VERTICAL}
                  appearance={Button.APPEARANCES.GHOST}
                  size={Button.SIZES.XS}
                  aria-label="More options"
                />
              </ReadinessCardHeaderTop>
              <ReadinessProgressRow theme={theme}>
                <div style={{ flex: 1 }}>
                  <ProgressBar completedPercent={90} appearance={ProgressBar.APPEARANCES.PRIMARY} />
                </div>
                <ReadinessProgressPercent theme={theme}>90%</ReadinessProgressPercent>
              </ReadinessProgressRow>
            </ReadinessCardHeader>

            <ReadinessSection theme={theme}>
              <ReadinessSectionLabel theme={theme}>
                <Icon type={Icon.TYPES.CALENDAR_OUTLINE} size={14} />
                Last pay period
              </ReadinessSectionLabel>
              
              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECK_CIRCLE} size={18} color={theme.colorSuccess} />
                  <ReadinessRowTitle theme={theme}>
                    Schedules
                    <Icon type={Icon.TYPES.INFO_OUTLINE} size={14} color={theme.colorOnSurfaceVariant} />
                  </ReadinessRowTitle>
                </ReadinessRowLeft>
                <ReadinessRowRight theme={theme}>Last updated Dec 10</ReadinessRowRight>
              </ReadinessRow>
              <ReadinessRowSubtext theme={theme} style={{ marginLeft: '26px' }}>Completed</ReadinessRowSubtext>

              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECK_CIRCLE} size={18} color={theme.colorSuccess} />
                  <ReadinessRowTitle theme={theme}>
                    Timecards
                    <Icon type={Icon.TYPES.INFO_OUTLINE} size={14} color={theme.colorOnSurfaceVariant} />
                  </ReadinessRowTitle>
                </ReadinessRowLeft>
                <ReadinessRowRight theme={theme}>45 approved</ReadinessRowRight>
              </ReadinessRow>
              <ReadinessRowSubtext theme={theme} style={{ marginLeft: '26px' }}>Completed</ReadinessRowSubtext>

              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECKBOX_OUTLINE} size={18} color={theme.colorOnSurfaceVariant} />
                  <ReadinessRowTitle theme={theme}>
                    Payroll
                    <Icon type={Icon.TYPES.INFO_OUTLINE} size={14} color={theme.colorOnSurfaceVariant} />
                  </ReadinessRowTitle>
                </ReadinessRowLeft>
                <Button appearance={Button.APPEARANCES.OUTLINE} size={Button.SIZES.XS}>Enable</Button>
              </ReadinessRow>
              <ReadinessRowSubtext theme={theme} style={{ marginLeft: '26px' }}>Finish setup to connect banking and compliance</ReadinessRowSubtext>
            </ReadinessSection>

            <PaychecksReadyRow theme={theme}>
              <AvatarList
                roles={paycheckRoles}
                limit={5}
                size={AvatarList.SIZES.S}
                type={AvatarList.TYPES.TEXT}
                modalTitle="Employees ready for payroll"
              />
              <PaychecksInfo theme={theme}>
                <PaychecksTitle theme={theme}>32 paychecks ready to run</PaychecksTitle>
                <PaychecksSubtext theme={theme}>374 approved hours · ~$12,340 total</PaychecksSubtext>
              </PaychecksInfo>
            </PaychecksReadyRow>
          </PayrollReadinessCard>
        </SkuDetailHeroRight>
      </SkuDetailHero>

      {/* Features Section */}
      <div>
        <FeaturesSectionTitle theme={theme}>Payroll includes</FeaturesSectionTitle>
        <FeaturesGrid theme={theme}>
          {features.map((feature, index) => (
            <FeatureCard key={index} theme={theme}>
              <FeatureIcon theme={theme}>
                <Icon type={Icon.TYPES.DOLLAR_CIRCLE_OUTLINE} size={24} color="#8B6914" />
              </FeatureIcon>
              <FeatureContent theme={theme}>
                <FeatureTitle theme={theme}>{feature.title}</FeatureTitle>
                <FeatureDescription theme={theme}>{feature.description}</FeatureDescription>
              </FeatureContent>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </div>
    </SkuDetailContainer>
  );
};

// ============================================
// PANE B - Payroll Sub-Pages (Locked UI Pattern)
// ============================================

const LockedPageContainer = styled.div`
  padding: ${({ theme }) => (theme as StyledTheme).space800};
  max-width: 900px;
`;

const LockedPageHeader = styled.div`
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space600};
`;

const LockedPageTitle = styled.h1`
  ${({ theme }) => (theme as StyledTheme).typestyleV2DisplaySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0 0 ${({ theme }) => (theme as StyledTheme).space200} 0;
`;

const LockedPageSubtitle = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  opacity: 0.7;
  margin: 0;
`;

const DataReadyCard = styled.div`
  background: linear-gradient(135deg, 
    ${({ theme }) => (theme as StyledTheme).colorPrimaryContainer}40,
    ${({ theme }) => (theme as StyledTheme).colorSurfaceBright});
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorPrimary}40;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space600};
`;

const DataReadyTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0 0 ${({ theme }) => (theme as StyledTheme).space200} 0;
`;

const DataReadyDescription = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  opacity: 0.7;
  margin: 0 0 ${({ theme }) => (theme as StyledTheme).space400} 0;
`;

const DataReadyStats = styled.div`
  display: flex;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
  flex-wrap: wrap;
`;

const DataReadyStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const DataReadyStatValue = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const DataReadyStatLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  opacity: 0.7;
`;

const LockedUIPreview = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  opacity: 0.5;
  pointer-events: none;
`;

const LockedUITitle = styled.h4`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0 0 ${({ theme }) => (theme as StyledTheme).space400} 0;
`;

const LockedUIPlaceholder = styled.div`
  height: 120px;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
`;

// Pay Runs Detail Page
const PayrollPayRunsDetail: React.FC = () => {
  const { theme } = usePebbleTheme();

  return (
    <LockedPageContainer theme={theme}>
      <LockedPageHeader theme={theme}>
        <LockedPageTitle theme={theme}>Pay Runs</LockedPageTitle>
        <LockedPageSubtitle theme={theme}>
          Run payroll with confidence—your time data is already here.
        </LockedPageSubtitle>
      </LockedPageHeader>

      <DataReadyCard theme={theme}>
        <DataReadyTitle theme={theme}>Your Time data is ready for payroll</DataReadyTitle>
        <DataReadyDescription theme={theme}>
          Approved timecards sync directly to pay runs—no exports, no manual entry.
        </DataReadyDescription>
        <DataReadyStats theme={theme}>
          <DataReadyStat theme={theme}>
            <DataReadyStatValue theme={theme}>168 hrs</DataReadyStatValue>
            <DataReadyStatLabel theme={theme}>This pay period</DataReadyStatLabel>
          </DataReadyStat>
          <DataReadyStat theme={theme}>
            <DataReadyStatValue theme={theme}>45</DataReadyStatValue>
            <DataReadyStatLabel theme={theme}>Timecards approved</DataReadyStatLabel>
          </DataReadyStat>
          <DataReadyStat theme={theme}>
            <DataReadyStatValue theme={theme}>$0</DataReadyStatValue>
            <DataReadyStatLabel theme={theme}>Overtime this period</DataReadyStatLabel>
          </DataReadyStat>
        </DataReadyStats>
      </DataReadyCard>

      <LockedUIPreview theme={theme}>
        <LockedUITitle theme={theme}>Run Payroll Preview</LockedUITitle>
        <LockedUIPlaceholder theme={theme} />
      </LockedUIPreview>
    </LockedPageContainer>
  );
};

// People Detail Page
const PayrollPeopleDetail: React.FC = () => {
  const { theme } = usePebbleTheme();

  return (
    <LockedPageContainer theme={theme}>
      <LockedPageHeader theme={theme}>
        <LockedPageTitle theme={theme}>People</LockedPageTitle>
        <LockedPageSubtitle theme={theme}>
          Your team is already in Rippling—no re-entry required.
        </LockedPageSubtitle>
      </LockedPageHeader>

      <DataReadyCard theme={theme}>
        <DataReadyTitle theme={theme}>Employee data ready for payroll</DataReadyTitle>
        <DataReadyDescription theme={theme}>
          Names, addresses, tax info, and bank details are already on file from onboarding.
        </DataReadyDescription>
        <DataReadyStats theme={theme}>
          <DataReadyStat theme={theme}>
            <DataReadyStatValue theme={theme}>5</DataReadyStatValue>
            <DataReadyStatLabel theme={theme}>Active employees</DataReadyStatLabel>
          </DataReadyStat>
          <DataReadyStat theme={theme}>
            <DataReadyStatValue theme={theme}>100%</DataReadyStatValue>
            <DataReadyStatLabel theme={theme}>Direct deposit enrolled</DataReadyStatLabel>
          </DataReadyStat>
          <DataReadyStat theme={theme}>
            <DataReadyStatValue theme={theme}>5</DataReadyStatValue>
            <DataReadyStatLabel theme={theme}>W-4s on file</DataReadyStatLabel>
          </DataReadyStat>
        </DataReadyStats>
      </DataReadyCard>

      <LockedUIPreview theme={theme}>
        <LockedUITitle theme={theme}>Employee Directory Preview</LockedUITitle>
        <LockedUIPlaceholder theme={theme} />
      </LockedUIPreview>
    </LockedPageContainer>
  );
};

// Taxes Detail Page
const PayrollTaxesDetail: React.FC = () => {
  const { theme } = usePebbleTheme();

  return (
    <LockedPageContainer theme={theme}>
      <LockedPageHeader theme={theme}>
        <LockedPageTitle theme={theme}>Taxes</LockedPageTitle>
        <LockedPageSubtitle theme={theme}>
          Stay compliant from day one—tax info is already collected.
        </LockedPageSubtitle>
      </LockedPageHeader>

      <DataReadyCard theme={theme}>
        <DataReadyTitle theme={theme}>Tax compliance ready</DataReadyTitle>
        <DataReadyDescription theme={theme}>
          Federal and state withholdings auto-calculated based on employee W-4s already in Rippling.
        </DataReadyDescription>
        <DataReadyStats theme={theme}>
          <DataReadyStat theme={theme}>
            <DataReadyStatValue theme={theme}>5</DataReadyStatValue>
            <DataReadyStatLabel theme={theme}>W-4s on file</DataReadyStatLabel>
          </DataReadyStat>
          <DataReadyStat theme={theme}>
            <DataReadyStatValue theme={theme}>CA</DataReadyStatValue>
            <DataReadyStatLabel theme={theme}>State tax configured</DataReadyStatLabel>
          </DataReadyStat>
          <DataReadyStat theme={theme}>
            <DataReadyStatValue theme={theme}>Auto</DataReadyStatValue>
            <DataReadyStatLabel theme={theme}>Overtime rules</DataReadyStatLabel>
          </DataReadyStat>
        </DataReadyStats>
      </DataReadyCard>

      <LockedUIPreview theme={theme}>
        <LockedUITitle theme={theme}>Tax Documents Preview</LockedUITitle>
        <LockedUIPlaceholder theme={theme} />
      </LockedUIPreview>
    </LockedPageContainer>
  );
};

// ============================================
// PANE B - HR SKU Detail Page
// ============================================
const HRSkuDetailPage: React.FC = () => {
  const { theme } = usePebbleTheme();

  const employeeRoles = [
    { id: '1', fullName: 'Sarah Chen' },
    { id: '2', fullName: 'Michael Park' },
    { id: '3', fullName: 'Emily Rodriguez' },
    { id: '4', fullName: 'David Kim' },
    { id: '5', fullName: 'Lisa Thompson' },
  ];

  const features = [
    {
      title: 'Centralized employee records',
      description: 'All employee data—from onboarding documents to performance reviews—lives in one place. No more scattered spreadsheets.',
      icon: Icon.TYPES.FILE_OUTLINE,
    },
    {
      title: 'Automated compliance',
      description: 'Stay ahead of I-9 deadlines, harassment training, and policy acknowledgments with automated reminders and tracking.',
      icon: Icon.TYPES.SHIELD_OUTLINE,
    },
    {
      title: 'Performance management',
      description: 'Run performance cycles, 360 reviews, and goal tracking—all connected to your employee data.',
      icon: Icon.TYPES.CHART_OUTLINE,
    },
    {
      title: 'Learning & development',
      description: 'Assign training courses, track completions, and ensure compliance certifications stay current.',
      icon: Icon.TYPES.GRADUATION_CAP_OUTLINE,
    },
    {
      title: 'Recruiting & ATS',
        description: 'Post jobs, track candidates, and convert them to employees—no duplicate data entry when they get hired.',
      icon: Icon.TYPES.USERS_OUTLINE,
    },
    {
      title: 'Compensation bands',
      description: 'Set pay bands, track equity, and ensure pay equity across your organization with built-in analytics.',
      icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE,
    },
  ];

  return (
    <SkuDetailContainer theme={theme}>
      {/* Hero Section */}
      <SkuDetailHero theme={theme}>
        <SkuDetailHeroLeft theme={theme}>
          <SkuDetailBadge theme={theme}>
            <Icon type={Icon.TYPES.USER_CIRCLE_OUTLINE} size={14} />
            Your team is already here
          </SkuDetailBadge>
          
          <SkuDetailTitle theme={theme}>
            From tracking time to managing careers
          </SkuDetailTitle>
          
          <SkuDetailDescription theme={theme}>
            Your employees are already in Rippling. Now manage their entire lifecycle—from onboarding documents to performance reviews to offboarding—without switching systems.
          </SkuDetailDescription>
          
          <SkuDetailActions theme={theme}>
            <Button 
              appearance={Button.APPEARANCES.PRIMARY} 
              size={Button.SIZES.M}
            >
              Explore HR Suite
            </Button>
            <SkuDetailSubtext theme={theme}>
              Extends your existing employee data
            </SkuDetailSubtext>
          </SkuDetailActions>
        </SkuDetailHeroLeft>

        <SkuDetailHeroRight theme={theme}>
          <PayrollReadinessCard theme={theme}>
            <ReadinessCardHeader theme={theme}>
              <ReadinessCardHeaderTop theme={theme}>
                <div>
                  <ReadinessCardTitle theme={theme}>HR readiness</ReadinessCardTitle>
                  <ReadinessCardSubtitle theme={theme}>Based on existing employee data</ReadinessCardSubtitle>
                </div>
                <Button.Icon
                  icon={Icon.TYPES.MORE_VERTICAL}
                  appearance={Button.APPEARANCES.GHOST}
                  size={Button.SIZES.XS}
                  aria-label="More options"
                />
              </ReadinessCardHeaderTop>
              <ReadinessProgressRow theme={theme}>
                <div style={{ flex: 1 }}>
                  <ProgressBar completedPercent={75} appearance={ProgressBar.APPEARANCES.PRIMARY} />
                </div>
                <ReadinessProgressPercent theme={theme}>75%</ReadinessProgressPercent>
              </ReadinessProgressRow>
            </ReadinessCardHeader>

            <ReadinessSection theme={theme}>
              <ReadinessSectionLabel theme={theme}>
                <Icon type={Icon.TYPES.USER_CIRCLE_OUTLINE} size={14} />
                Employee foundation
              </ReadinessSectionLabel>
              
              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECK_CIRCLE} size={18} color={theme.colorSuccess} />
                  <ReadinessRowTitle theme={theme}>Basic profiles</ReadinessRowTitle>
                </ReadinessRowLeft>
                <ReadinessRowRight theme={theme}>5 employees</ReadinessRowRight>
              </ReadinessRow>

              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECK_CIRCLE} size={18} color={theme.colorSuccess} />
                  <ReadinessRowTitle theme={theme}>Work schedules</ReadinessRowTitle>
                </ReadinessRowLeft>
                <ReadinessRowRight theme={theme}>From Time</ReadinessRowRight>
              </ReadinessRow>

              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECKBOX_OUTLINE} size={18} color={theme.colorOnSurfaceVariant} />
                  <ReadinessRowTitle theme={theme}>Documents & I-9s</ReadinessRowTitle>
                </ReadinessRowLeft>
                <Button appearance={Button.APPEARANCES.OUTLINE} size={Button.SIZES.XS}>Set up</Button>
              </ReadinessRow>
            </ReadinessSection>

            <PaychecksReadyRow theme={theme}>
              <AvatarList
                roles={employeeRoles}
                limit={5}
                size={AvatarList.SIZES.S}
                type={AvatarList.TYPES.TEXT}
                modalTitle="Employees"
              />
              <PaychecksInfo theme={theme}>
                <PaychecksTitle theme={theme}>5 employees ready to manage</PaychecksTitle>
                <PaychecksSubtext theme={theme}>Profiles, schedules, and time data on file</PaychecksSubtext>
              </PaychecksInfo>
            </PaychecksReadyRow>
          </PayrollReadinessCard>
        </SkuDetailHeroRight>
      </SkuDetailHero>

      {/* Features Section */}
      <div>
        <FeaturesSectionTitle theme={theme}>HR Suite includes</FeaturesSectionTitle>
        <FeaturesGrid theme={theme}>
          {features.map((feature, index) => (
            <FeatureCard key={index} theme={theme}>
              <FeatureIcon theme={theme}>
                <Icon type={feature.icon} size={24} color="#8B6914" />
              </FeatureIcon>
              <FeatureContent theme={theme}>
                <FeatureTitle theme={theme}>{feature.title}</FeatureTitle>
                <FeatureDescription theme={theme}>{feature.description}</FeatureDescription>
              </FeatureContent>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </div>
    </SkuDetailContainer>
  );
};

// ============================================
// PANE B - IT SKU Detail Page
// ============================================
const ITSkuDetailPage: React.FC = () => {
  const { theme } = usePebbleTheme();

  const userRoles = [
    { id: '1', fullName: 'Sarah Chen' },
    { id: '2', fullName: 'Michael Park' },
    { id: '3', fullName: 'Emily Rodriguez' },
    { id: '4', fullName: 'David Kim' },
    { id: '5', fullName: 'Lisa Thompson' },
  ];

  const features = [
    {
      title: 'Single sign-on (SSO)',
      description: 'One login for every app. Employees already in Rippling get instant access to the tools they need—no password chaos.',
      icon: Icon.TYPES.LOCK_OUTLINE,
    },
    {
      title: 'Device management',
      description: 'Deploy, configure, and secure macOS and Windows devices. Ship laptops that arrive ready to work.',
      icon: Icon.TYPES.LAPTOP_OUTLINE,
    },
    {
      title: 'Identity & access',
      description: 'Provision and deprovision app access automatically when employees join, move, or leave your company.',
      icon: Icon.TYPES.SHIELD_OUTLINE,
    },
    {
      title: 'Inventory management',
      description: 'Track every laptop, monitor, and accessory. Know what is deployed, stored, or needs retrieval.',
      icon: Icon.TYPES.STORE_OUTLINE,
    },
    {
      title: 'Zero-touch deployment',
      description: 'New hires unbox their laptop and it is already configured with their apps, settings, and security policies.',
      icon: Icon.TYPES.ROCKET_OUTLINE,
    },
    {
      title: 'Endpoint protection',
      description: 'Enforce disk encryption, screen lock, and password policies across all devices automatically.',
      icon: Icon.TYPES.SHIELD_OUTLINE,
    },
  ];

  return (
    <SkuDetailContainer theme={theme}>
      {/* Hero Section */}
      <SkuDetailHero theme={theme}>
        <SkuDetailHeroLeft theme={theme}>
          <SkuDetailBadge theme={theme}>
            <Icon type={Icon.TYPES.LAPTOP_OUTLINE} size={14} />
            Secure what you already have
          </SkuDetailBadge>
          
          <SkuDetailTitle theme={theme}>
            Your users are in — now secure their access
          </SkuDetailTitle>
          
          <SkuDetailDescription theme={theme}>
            Every person tracking time in Rippling is a user who needs app access, a device, and security policies. Manage identity, devices, and access from the same place you manage their time.
          </SkuDetailDescription>
          
          <SkuDetailActions theme={theme}>
            <Button 
              appearance={Button.APPEARANCES.PRIMARY} 
              size={Button.SIZES.M}
            >
              Explore IT Suite
            </Button>
            <SkuDetailSubtext theme={theme}>
              SSO, device management, and identity—powered by your employee data
            </SkuDetailSubtext>
          </SkuDetailActions>
        </SkuDetailHeroLeft>

        <SkuDetailHeroRight theme={theme}>
          <PayrollReadinessCard theme={theme}>
            <ReadinessCardHeader theme={theme}>
              <ReadinessCardHeaderTop theme={theme}>
                <div>
                  <ReadinessCardTitle theme={theme}>IT readiness</ReadinessCardTitle>
                  <ReadinessCardSubtitle theme={theme}>Based on existing user data</ReadinessCardSubtitle>
                </div>
                <Button.Icon
                  icon={Icon.TYPES.MORE_VERTICAL}
                  appearance={Button.APPEARANCES.GHOST}
                  size={Button.SIZES.XS}
                  aria-label="More options"
                />
              </ReadinessCardHeaderTop>
              <ReadinessProgressRow theme={theme}>
                <div style={{ flex: 1 }}>
                  <ProgressBar completedPercent={60} appearance={ProgressBar.APPEARANCES.PRIMARY} />
                </div>
                <ReadinessProgressPercent theme={theme}>60%</ReadinessProgressPercent>
              </ReadinessProgressRow>
            </ReadinessCardHeader>

            <ReadinessSection theme={theme}>
              <ReadinessSectionLabel theme={theme}>
                <Icon type={Icon.TYPES.USERS_OUTLINE} size={14} />
                User foundation
              </ReadinessSectionLabel>
              
              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECK_CIRCLE} size={18} color={theme.colorSuccess} />
                  <ReadinessRowTitle theme={theme}>User accounts</ReadinessRowTitle>
                </ReadinessRowLeft>
                <ReadinessRowRight theme={theme}>5 active users</ReadinessRowRight>
              </ReadinessRow>

              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECK_CIRCLE} size={18} color={theme.colorSuccess} />
                  <ReadinessRowTitle theme={theme}>Email verified</ReadinessRowTitle>
                </ReadinessRowLeft>
                <ReadinessRowRight theme={theme}>5 of 5</ReadinessRowRight>
              </ReadinessRow>

              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECKBOX_OUTLINE} size={18} color={theme.colorOnSurfaceVariant} />
                  <ReadinessRowTitle theme={theme}>Devices enrolled</ReadinessRowTitle>
                </ReadinessRowLeft>
                <Button appearance={Button.APPEARANCES.OUTLINE} size={Button.SIZES.XS}>Enroll</Button>
              </ReadinessRow>
            </ReadinessSection>

            <PaychecksReadyRow theme={theme}>
              <AvatarList
                roles={userRoles}
                limit={5}
                size={AvatarList.SIZES.S}
                type={AvatarList.TYPES.TEXT}
                modalTitle="Users"
              />
              <PaychecksInfo theme={theme}>
                <PaychecksTitle theme={theme}>5 users ready for SSO</PaychecksTitle>
                <PaychecksSubtext theme={theme}>Connect apps with one click</PaychecksSubtext>
              </PaychecksInfo>
            </PaychecksReadyRow>
          </PayrollReadinessCard>
        </SkuDetailHeroRight>
      </SkuDetailHero>

      {/* Features Section */}
      <div>
        <FeaturesSectionTitle theme={theme}>IT Suite includes</FeaturesSectionTitle>
        <FeaturesGrid theme={theme}>
          {features.map((feature, index) => (
            <FeatureCard key={index} theme={theme}>
              <FeatureIcon theme={theme}>
                <Icon type={feature.icon} size={24} color="#8B6914" />
              </FeatureIcon>
              <FeatureContent theme={theme}>
                <FeatureTitle theme={theme}>{feature.title}</FeatureTitle>
                <FeatureDescription theme={theme}>{feature.description}</FeatureDescription>
              </FeatureContent>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </div>
    </SkuDetailContainer>
  );
};

// ============================================
// PANE B - Finance SKU Detail Page
// ============================================
const FinanceSkuDetailPage: React.FC = () => {
  const { theme } = usePebbleTheme();

  const employeeRoles = [
    { id: '1', fullName: 'Sarah Chen' },
    { id: '2', fullName: 'Michael Park' },
    { id: '3', fullName: 'Emily Rodriguez' },
    { id: '4', fullName: 'David Kim' },
    { id: '5', fullName: 'Lisa Thompson' },
  ];

  const features = [
    {
      title: 'Corporate cards',
      description: 'Issue cards with built-in spend controls. Limits, categories, and approvals tied to employee roles and departments.',
      icon: Icon.TYPES.CREDIT_CARD_OUTLINE,
    },
    {
      title: 'Expense management',
      description: 'Employees submit expenses, managers approve, and reimbursements flow through the same system as payroll.',
      icon: Icon.TYPES.RECEIPT_OUTLINE,
    },
    {
      title: 'Bill pay',
      description: 'Pay vendors with approval workflows that match your org chart. No more chasing down signatures.',
      icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE,
    },
    {
      title: 'Headcount planning',
      description: 'Model hiring plans with real comp data. See how headcount changes impact your labor costs in real-time.',
      icon: Icon.TYPES.USERS_OUTLINE,
    },
    {
      title: 'Real-time labor costs',
      description: 'Your time data already shows hours worked. Now see exactly what that costs by department, project, or location.',
      icon: Icon.TYPES.CHART_OUTLINE,
    },
    {
      title: 'Travel & booking',
      description: 'Book flights and hotels with policy enforcement built in. Receipts auto-attach to expense reports.',
      icon: Icon.TYPES.FLIGHT_OUTLINE,
    },
  ];

  return (
    <SkuDetailContainer theme={theme}>
      {/* Hero Section */}
      <SkuDetailHero theme={theme}>
        <SkuDetailHeroLeft theme={theme}>
          <SkuDetailBadge theme={theme}>
            <Icon type={Icon.TYPES.CREDIT_CARD_OUTLINE} size={14} />
            Track spend like you track time
          </SkuDetailBadge>
          
          <SkuDetailTitle theme={theme}>
            See where every dollar goes — starting with labor
          </SkuDetailTitle>
          
          <SkuDetailDescription theme={theme}>
            You already know what your team works on. Now track what they spend. Corporate cards, expenses, and labor costs—all connected to the same employee data.
          </SkuDetailDescription>
          
          <SkuDetailActions theme={theme}>
            <Button 
              appearance={Button.APPEARANCES.PRIMARY} 
              size={Button.SIZES.M}
            >
              Explore Finance Suite
            </Button>
            <SkuDetailSubtext theme={theme}>
              Cards, expenses, and spend analytics
            </SkuDetailSubtext>
          </SkuDetailActions>
        </SkuDetailHeroLeft>

        <SkuDetailHeroRight theme={theme}>
          <PayrollReadinessCard theme={theme}>
            <ReadinessCardHeader theme={theme}>
              <ReadinessCardHeaderTop theme={theme}>
                <div>
                  <ReadinessCardTitle theme={theme}>Finance readiness</ReadinessCardTitle>
                  <ReadinessCardSubtitle theme={theme}>Based on existing data</ReadinessCardSubtitle>
                </div>
                <Button.Icon
                  icon={Icon.TYPES.MORE_VERTICAL}
                  appearance={Button.APPEARANCES.GHOST}
                  size={Button.SIZES.XS}
                  aria-label="More options"
                />
              </ReadinessCardHeaderTop>
              <ReadinessProgressRow theme={theme}>
                <div style={{ flex: 1 }}>
                  <ProgressBar completedPercent={70} appearance={ProgressBar.APPEARANCES.PRIMARY} />
                </div>
                <ReadinessProgressPercent theme={theme}>70%</ReadinessProgressPercent>
              </ReadinessProgressRow>
            </ReadinessCardHeader>

            <ReadinessSection theme={theme}>
              <ReadinessSectionLabel theme={theme}>
                <Icon type={Icon.TYPES.TIME_OUTLINE} size={14} />
                Labor cost foundation
              </ReadinessSectionLabel>
              
              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECK_CIRCLE} size={18} color={theme.colorSuccess} />
                  <ReadinessRowTitle theme={theme}>Hours tracked</ReadinessRowTitle>
                </ReadinessRowLeft>
                <ReadinessRowRight theme={theme}>168 hrs this period</ReadinessRowRight>
              </ReadinessRow>

              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECK_CIRCLE} size={18} color={theme.colorSuccess} />
                  <ReadinessRowTitle theme={theme}>Departments set</ReadinessRowTitle>
                </ReadinessRowLeft>
                <ReadinessRowRight theme={theme}>3 departments</ReadinessRowRight>
              </ReadinessRow>

              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECKBOX_OUTLINE} size={18} color={theme.colorOnSurfaceVariant} />
                  <ReadinessRowTitle theme={theme}>Expense policies</ReadinessRowTitle>
                </ReadinessRowLeft>
                <Button appearance={Button.APPEARANCES.OUTLINE} size={Button.SIZES.XS}>Configure</Button>
              </ReadinessRow>
            </ReadinessSection>

            <PaychecksReadyRow theme={theme}>
              <AvatarList
                roles={employeeRoles}
                limit={5}
                size={AvatarList.SIZES.S}
                type={AvatarList.TYPES.TEXT}
                modalTitle="Employees"
              />
              <PaychecksInfo theme={theme}>
                <PaychecksTitle theme={theme}>5 employees ready for cards</PaychecksTitle>
                <PaychecksSubtext theme={theme}>~$8,200 labor costs this period</PaychecksSubtext>
              </PaychecksInfo>
            </PaychecksReadyRow>
          </PayrollReadinessCard>
        </SkuDetailHeroRight>
      </SkuDetailHero>

      {/* Features Section */}
      <div>
        <FeaturesSectionTitle theme={theme}>Finance Suite includes</FeaturesSectionTitle>
        <FeaturesGrid theme={theme}>
          {features.map((feature, index) => (
            <FeatureCard key={index} theme={theme}>
              <FeatureIcon theme={theme}>
                <Icon type={feature.icon} size={24} color="#8B6914" />
              </FeatureIcon>
              <FeatureContent theme={theme}>
                <FeatureTitle theme={theme}>{feature.title}</FeatureTitle>
                <FeatureDescription theme={theme}>{feature.description}</FeatureDescription>
              </FeatureContent>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </div>
    </SkuDetailContainer>
  );
};

// ============================================
// PANE B - Global SKU Detail Page
// ============================================
const GlobalSkuDetailPage: React.FC = () => {
  const { theme } = usePebbleTheme();

  const employeeRoles = [
    { id: '1', fullName: 'Sarah Chen' },
    { id: '2', fullName: 'Michael Park' },
    { id: '3', fullName: 'Carlos Mendez' },
    { id: '4', fullName: 'Priya Sharma' },
    { id: '5', fullName: 'Yuki Tanaka' },
  ];

  const features = [
    {
      title: 'Global payroll',
      description: 'Pay employees in 50+ countries through local entities. Taxes, compliance, and currency conversion handled.',
      icon: Icon.TYPES.GLOBE_OUTLINE,
    },
    {
      title: 'Employer of Record (EOR)',
      description: 'Hire anywhere without setting up a legal entity. We are the employer on paper, you manage the work.',
      icon: Icon.TYPES.BUILDING_OUTLINE,
    },
    {
      title: 'Contractor payments',
      description: 'Pay international contractors in their local currency. 1099s and compliance handled automatically.',
      icon: Icon.TYPES.USERS_OUTLINE,
    },
    {
      title: 'Global benefits',
      description: 'Offer competitive benefits packages tailored to each country—health insurance, pensions, and statutory benefits.',
      icon: Icon.TYPES.HEART_OUTLINE,
    },
    {
      title: 'Multi-currency support',
      description: 'Track labor costs across currencies. See your global spend in your base currency with real-time conversion.',
      icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE,
    },
    {
      title: 'Country-specific compliance',
      description: 'Work permits, visa tracking, and local labor laws—managed for every country where you have people.',
      icon: Icon.TYPES.SHIELD_OUTLINE,
    },
  ];

  return (
    <SkuDetailContainer theme={theme}>
      {/* Hero Section */}
      <SkuDetailHero theme={theme}>
        <SkuDetailHeroLeft theme={theme}>
          <SkuDetailBadge theme={theme}>
            <Icon type={Icon.TYPES.GLOBE_OUTLINE} size={14} />
            Go global from here
          </SkuDetailBadge>
          
          <SkuDetailTitle theme={theme}>
            Pay and manage your team anywhere in the world
          </SkuDetailTitle>
          
          <SkuDetailDescription theme={theme}>
            Ready to hire globally? Use the same system you use for your domestic team. Global payroll, EOR, and contractor payments—all connected to your existing employee data.
          </SkuDetailDescription>
          
          <SkuDetailActions theme={theme}>
            <Button 
              appearance={Button.APPEARANCES.PRIMARY} 
              size={Button.SIZES.M}
            >
              Explore Global Suite
            </Button>
            <SkuDetailSubtext theme={theme}>
              Hire in 50+ countries · No entity required
            </SkuDetailSubtext>
          </SkuDetailActions>
        </SkuDetailHeroLeft>

        <SkuDetailHeroRight theme={theme}>
          <PayrollReadinessCard theme={theme}>
            <ReadinessCardHeader theme={theme}>
              <ReadinessCardHeaderTop theme={theme}>
                <div>
                  <ReadinessCardTitle theme={theme}>Global readiness</ReadinessCardTitle>
                  <ReadinessCardSubtitle theme={theme}>Based on your current team</ReadinessCardSubtitle>
                </div>
                <Button.Icon
                  icon={Icon.TYPES.MORE_VERTICAL}
                  appearance={Button.APPEARANCES.GHOST}
                  size={Button.SIZES.XS}
                  aria-label="More options"
                />
              </ReadinessCardHeaderTop>
              <ReadinessProgressRow theme={theme}>
                <div style={{ flex: 1 }}>
                  <ProgressBar completedPercent={50} appearance={ProgressBar.APPEARANCES.PRIMARY} />
                </div>
                <ReadinessProgressPercent theme={theme}>50%</ReadinessProgressPercent>
              </ReadinessProgressRow>
            </ReadinessCardHeader>

            <ReadinessSection theme={theme}>
              <ReadinessSectionLabel theme={theme}>
                <Icon type={Icon.TYPES.GLOBE_OUTLINE} size={14} />
                Expansion foundation
              </ReadinessSectionLabel>
              
              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECK_CIRCLE} size={18} color={theme.colorSuccess} />
                  <ReadinessRowTitle theme={theme}>US team active</ReadinessRowTitle>
                </ReadinessRowLeft>
                <ReadinessRowRight theme={theme}>5 employees</ReadinessRowRight>
              </ReadinessRow>

              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECK_CIRCLE} size={18} color={theme.colorSuccess} />
                  <ReadinessRowTitle theme={theme}>Time tracking live</ReadinessRowTitle>
                </ReadinessRowLeft>
                <ReadinessRowRight theme={theme}>Ready for global</ReadinessRowRight>
              </ReadinessRow>

              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECKBOX_OUTLINE} size={18} color={theme.colorOnSurfaceVariant} />
                  <ReadinessRowTitle theme={theme}>First global hire</ReadinessRowTitle>
                </ReadinessRowLeft>
                <Button appearance={Button.APPEARANCES.OUTLINE} size={Button.SIZES.XS}>Add employee</Button>
              </ReadinessRow>
            </ReadinessSection>

            <PaychecksReadyRow theme={theme}>
              <AvatarList
                roles={employeeRoles}
                limit={5}
                size={AvatarList.SIZES.S}
                type={AvatarList.TYPES.TEXT}
                modalTitle="Team"
              />
              <PaychecksInfo theme={theme}>
                <PaychecksTitle theme={theme}>Ready to expand globally</PaychecksTitle>
                <PaychecksSubtext theme={theme}>Hire in 50+ countries instantly</PaychecksSubtext>
              </PaychecksInfo>
            </PaychecksReadyRow>
          </PayrollReadinessCard>
        </SkuDetailHeroRight>
      </SkuDetailHero>

      {/* Features Section */}
      <div>
        <FeaturesSectionTitle theme={theme}>Global Suite includes</FeaturesSectionTitle>
        <FeaturesGrid theme={theme}>
          {features.map((feature, index) => (
            <FeatureCard key={index} theme={theme}>
              <FeatureIcon theme={theme}>
                <Icon type={feature.icon} size={24} color="#8B6914" />
              </FeatureIcon>
              <FeatureContent theme={theme}>
                <FeatureTitle theme={theme}>{feature.title}</FeatureTitle>
                <FeatureDescription theme={theme}>{feature.description}</FeatureDescription>
              </FeatureContent>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </div>
    </SkuDetailContainer>
  );
};

// ============================================
// PANE B - Agentic Home Content
// ============================================

const GradientSparkle: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7B2D8E" />
        <stop offset="50%" stopColor="#C2185B" />
        <stop offset="100%" stopColor="#E040A0" />
      </linearGradient>
    </defs>
    <path d="M18 2 C18 2 20.5 12 22.5 14.5 C24.5 17 34 18 34 18 C34 18 24.5 19 22.5 21.5 C20.5 24 18 34 18 34 C18 34 15.5 24 13.5 21.5 C11.5 19 2 18 2 18 C2 18 11.5 17 13.5 14.5 C15.5 12 18 2 18 2Z" fill="url(#sparkleGrad)" />
    <path d="M28 4 C28 4 29 8 30 9 C31 10 35 11 35 11 C35 11 31 12 30 13 C29 14 28 18 28 18 C28 18 27 14 26 13 C25 12 21 11 21 11 C21 11 25 10 26 9 C27 8 28 4 28 4Z" fill="url(#sparkleGrad)" opacity="0.6" />
  </svg>
);

// Agentic Home Styled Components
const AgenticHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
  max-width: 800px;
`;

const ContextHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ContextGreeting = styled.h1`
  ${({ theme }) => (theme as StyledTheme).typestyleV2DisplaySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
  font-weight: 500;
`;

const ContextSubtext = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
`;

const PrioritySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const SectionLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ActionCard = styled.div<{ urgency?: 'critical' | 'high' | 'normal' }>`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme, urgency }) => 
    urgency === 'critical' ? (theme as StyledTheme).colorError :
    urgency === 'high' ? (theme as StyledTheme).colorWarning :
    (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  cursor: pointer;
  transition: all 150ms ease;
  
  &:hover {
    border-color: ${({ theme }) => (theme as StyledTheme).colorOutline};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
`;

const ActionCardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const ActionCardLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  flex: 1;
`;

const ActionIconWrapper = styled.div<{ variant?: 'warning' | 'error' | 'success' | 'primary' | 'neutral' }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  background-color: ${({ theme, variant }) => 
    variant === 'error' ? (theme as StyledTheme).colorErrorContainer :
    variant === 'warning' ? (theme as StyledTheme).colorWarningContainer :
    variant === 'success' ? (theme as StyledTheme).colorSuccessContainer :
    variant === 'primary' ? (theme as StyledTheme).colorPrimaryContainer :
    (theme as StyledTheme).colorSurfaceContainerLow};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ActionCardContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const ActionCardTitle = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLargeEmphasized};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin-bottom: 2px;
`;

const ActionCardDescription = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ActionCardMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin-top: ${({ theme }) => (theme as StyledTheme).space100};
`;

const ActionCardActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  margin-top: ${({ theme }) => (theme as StyledTheme).space100};
`;

const BatchCard = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  overflow: hidden;
`;

const BatchHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
`;

const BatchHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const BatchTitle = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLargeEmphasized};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const BatchCount = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerHigh};
  padding: 2px 8px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
`;

const BatchItems = styled.div`
  display: flex;
  flex-direction: column;
`;

const BatchItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => (theme as StyledTheme).space300} ${({ theme }) => (theme as StyledTheme).space400};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  
  &:last-child {
    border-bottom: none;
  }
`;

const BatchItemContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const BatchItemTitle = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const BatchItemMeta = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const BatchFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => (theme as StyledTheme).space300} ${({ theme }) => (theme as StyledTheme).space400};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
`;

const SuggestionCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => (theme as StyledTheme).space300} ${({ theme }) => (theme as StyledTheme).space400};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px dashed ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerXl};
  cursor: pointer;
  transition: all 150ms ease;
  
  &:hover {
    border-style: solid;
    border-color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

const SuggestionIconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerMd};
  background-color: ${({ theme }) => (theme as StyledTheme).colorPrimaryContainer};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const SuggestionContent = styled.div`
  flex: 1;
`;

const SuggestionTitle = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const SuggestionReason = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const TeamAwarenessCard = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
`;

const TeamAwarenessHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space300};
`;

const TeamAwarenessTitle = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLargeEmphasized};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const TeamMemberRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => (theme as StyledTheme).space200} 0;
`;

const TeamMemberInfo = styled.div`
  flex: 1;
`;

const TeamMemberName = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const TeamMemberStatus = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const UrgencyDot = styled.span<{ urgency: 'critical' | 'high' | 'normal' }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ theme, urgency }) => 
    urgency === 'critical' ? (theme as StyledTheme).colorError :
    urgency === 'high' ? (theme as StyledTheme).colorWarning :
    (theme as StyledTheme).colorSuccess};
`;

// Agentic Home - Two Column Layout
const AgenticHomeLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 520px) 1fr;
  gap: ${({ theme }) => (theme as StyledTheme).space800};
  min-height: calc(100vh - 120px);
  padding-left: 50px;
  
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
  }
`;

const ComposerColumnFixed = styled.div`
  position: sticky;
  top: 24px;
  align-self: start;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
  max-width: 520px;
`;

const WorkflowsScrollContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space800};
  overflow-y: auto;
  max-height: calc(100vh - 120px);
  padding-right: ${({ theme }) => (theme as StyledTheme).space400};
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space800};
`;


const ComposerCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
  padding-top: ${({ theme }) => (theme as StyledTheme).space600};
`;

const ComposerGreeting = styled.h1`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
  font-size: 28px;
  font-weight: 600;
`;

const ComposerSubtext = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
`;

const SuggestionPromptList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
  margin-top: ${({ theme }) => (theme as StyledTheme).space200};
`;

const SuggestionPromptItem = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  background: none;
  border: none;
  padding: ${({ theme }) => (theme as StyledTheme).space200} 0;
  cursor: pointer;
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  text-align: left;
  
  &:hover {
    color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  }
`;

const PromptArrow = styled.span`
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  font-size: 18px;
  flex-shrink: 0;
`;

const QuickActionsSectionLabel = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelExtraSmallWide};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  text-transform: uppercase;
`;

const QuickActionsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  flex-wrap: wrap;
  margin-top: ${({ theme }) => (theme as StyledTheme).space200};
`;

const QuickActionButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  padding: ${({ theme }) => (theme as StyledTheme).space300};
  background: transparent;
  border: none;
  cursor: pointer;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  transition: background-color 150ms ease;
  min-width: 72px;
  
  &:hover {
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

const QuickActionIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const QuickActionLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const IntentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const IntentSectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const IntentSectionLabel = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelExtraSmallWide};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  text-transform: uppercase;
`;

const IntentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

// Status Card - Clean status display with progress footer
const StatusCard = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurface};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner3xl};
  padding: ${({ theme }) => (theme as StyledTheme).space400} 0 6px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  transition: all 150ms ease;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

const StatusCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: 0 ${({ theme }) => (theme as StyledTheme).space400};
`;

const StatusCardTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
  flex: 1;
`;

const StatusCardTaskList = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const StatusTaskItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 32px;
  padding-right: 4px;
  cursor: pointer;
  
  .task-details-btn {
    opacity: 0;
    transition: opacity 150ms ease;
  }
  
  &:hover .task-details-btn {
    opacity: 1;
  }
`;

const StatusTaskItemContent = styled.div<{ status: 'done' | 'in-progress' | 'pending' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLarge};
  color: ${({ theme, status }) => 
    status === 'done' ? (theme as StyledTheme).colorOnSurfaceVariant :
    (theme as StyledTheme).colorOnSurface};
  ${({ status }) => status === 'done' && 'text-decoration: line-through;'}
`;

// Task item component with hover "View Details" button
interface TaskItemProps {
  status: 'done' | 'in-progress' | 'pending';
  children: React.ReactNode;
  theme: StyledTheme;
  taskName?: string;
  onTaskClick?: (taskName: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ status, children, theme, taskName, onTaskClick }) => {
  const handleClick = () => {
    if (onTaskClick && taskName) {
      onTaskClick(taskName);
    }
  };
  
  return (
    <StatusTaskItemWrapper theme={theme} onClick={handleClick}>
      <StatusTaskItemContent theme={theme} status={status}>
        {children}
      </StatusTaskItemContent>
      <span className="task-details-btn">
        <Button size={Button.SIZES.XS} appearance={Button.APPEARANCES.OUTLINE}>View Details</Button>
      </span>
    </StatusTaskItemWrapper>
  );
};


const StatusRadio = styled.div<{ status: 'done' | 'in-progress' | 'pending' }>`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid ${({ theme, status }) => 
    status === 'done' ? (theme as StyledTheme).colorSuccess :
    status === 'in-progress' ? (theme as StyledTheme).colorInfo :
    (theme as StyledTheme).colorOutline};
  background-color: ${({ theme, status }) => 
    status === 'done' ? (theme as StyledTheme).colorSuccess :
    status === 'in-progress' ? (theme as StyledTheme).colorInfo :
    'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  
  ${({ status }) => status === 'in-progress' && `
    &::after {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: white;
    }
  `}
`;

const StatusCardFooter = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  padding: 5px ${({ theme }) => (theme as StyledTheme).space400};
`;

const StatusProgressBar = styled.div`
  flex: 1;
  height: 6px;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceDim};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  overflow: hidden;
`;

const StatusProgressFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${({ percent }) => percent}%;
  background-color: ${({ theme }) => (theme as StyledTheme).colorInfo};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  transition: width 300ms ease;
`;

const StatusProgressLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorInfo};
  min-width: 40px;
  text-align: right;
`;

// Agent running footer
const AgentRunningFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: 5px ${({ theme }) => (theme as StyledTheme).space400};
`;

const AgentRunningLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const AgentSparkle = styled.span`
  font-size: 16px;
`;

const AgentProgressMini = styled.div`
  width: 60px;
  height: 6px;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceDim};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 40%;
    background-color: ${({ theme }) => (theme as StyledTheme).colorInfo};
    border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
    animation: agentProgress 1.5s ease-in-out infinite;
  }
  
  @keyframes agentProgress {
    0% { left: 0; width: 30%; }
    50% { left: 30%; width: 40%; }
    100% { left: 60%; width: 30%; }
  }
`;

// Human handoff footer
const HandoffFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: 5px ${({ theme }) => (theme as StyledTheme).space400};
`;

const HandoffLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const HandoffButton = styled.button`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  background-color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  color: ${({ theme }) => (theme as StyledTheme).colorOnPrimary};
  border: none;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  padding: 8px 16px;
  cursor: pointer;
  transition: opacity 150ms ease;
  
  &:hover {
    opacity: 0.9;
  }
`;

// Removed: TaskReviewButton, StatusTaskItemWithAction, StatusTaskItemLeft
// All task items now use TaskItem component with hover "Task Details" button

// Agentic Home Component
interface AgenticHomeContentProps {
  userName?: string;
  userRole?: 'hr-admin' | 'employee';
}

// Focused workflow view styled components
const FocusedWorkflowContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
`;

const FocusedWorkflowHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space200};
`;

const FocusedWorkflowTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const FocusedWorkflowSubtitle = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
`;

const PeerReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const PeerReviewItem = styled.div<{ isCompleted?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => (theme as StyledTheme).space300} ${({ theme }) => (theme as StyledTheme).space400};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  cursor: pointer;
  transition: all 150ms ease;
  opacity: ${({ isCompleted }) => isCompleted ? 0.6 : 1};
  
  &:hover {
    border-color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
    background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

const PeerReviewInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const PeerReviewName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const PeerReviewRole = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const PeerReviewStatus = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

// Rich text editor styled components
const ReviewEditorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  height: 100%;
`;

const ReviewEditorHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space400};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const ReviewEditorPeerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  flex: 1;
`;

const ReviewEditorPeerDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewEditorPeerName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const ReviewEditorPeerRole = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ReviewEditorToolbar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
  padding: ${({ theme }) => (theme as StyledTheme).space200};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
`;

const ToolbarButton = styled.button<{ isActive?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerMd};
  background: ${({ isActive, theme }) => isActive ? (theme as StyledTheme).colorSurfaceContainerHigh : 'transparent'};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  cursor: pointer;
  transition: all 150ms ease;
  
  &:hover {
    background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerHigh};
  }
`;

const ToolbarDivider = styled.div`
  width: 1px;
  height: 20px;
  background: ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  margin: 0 ${({ theme }) => (theme as StyledTheme).space100};
`;

const ReviewEditorContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ReviewSectionLabel = styled.label`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ReviewTextArea = styled.textarea`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  padding: ${({ theme }) => (theme as StyledTheme).space300};
  resize: none;
  min-height: 120px;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  }
  
  &::placeholder {
    color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  }
`;

const ReviewEditorFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: ${({ theme }) => (theme as StyledTheme).space400};
  border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const AgenticHomeContent: React.FC<AgenticHomeContentProps> = ({ userName = 'Jordan', userRole = 'hr-admin' }) => {
  const { theme } = usePebbleTheme();
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [taskDescription, setTaskDescription] = useState('');
  const [focusedWorkflow, setFocusedWorkflow] = useState<string | null>(null);
  const [completedReviews, setCompletedReviews] = useState<string[]>([]);
  const [editingPeerId, setEditingPeerId] = useState<string | null>(null);
  
  // Compensation workflow state
  const [editingViolationId, setEditingViolationId] = useState<string | null>(null);
  const [resolvedViolations, setResolvedViolations] = useState<string[]>([]);
  
  // Policy violation data
  const policyViolations = [
    { 
      id: '1', 
      employeeName: 'Marcus Johnson', 
      role: 'Senior Software Engineer',
      department: 'Engineering',
      currentComp: '$185,000',
      proposedComp: '$215,000',
      recommendedComp: '$198,000',
      percentIncrease: '16.2%',
      bandSource: 'Career Ladder',
      bandName: 'L5 Engineering',
      bandRange: '$165,000 - $198,000',
      policy: 'Max increase per cycle: 12%',
      policyReason: 'Proposed increase exceeds maximum single-cycle adjustment of 12%',
      managerNote: 'Critical retention risk - received competing offer'
    },
    { 
      id: '2', 
      employeeName: 'Sarah Chen', 
      role: 'Product Manager II',
      department: 'Product',
      currentComp: '$142,000',
      proposedComp: '$175,000',
      recommendedComp: '$162,000',
      percentIncrease: '23.2%',
      bandSource: 'Compensation Product',
      bandName: 'PM Level 2 - Bay Area',
      bandRange: '$138,000 - $162,000',
      policy: 'Band maximum exceeded',
      policyReason: 'Proposed compensation exceeds band ceiling by $13,000',
      managerNote: 'Promotion to PM III pending Q2'
    },
    { 
      id: '3', 
      employeeName: 'David Park', 
      role: 'Staff Designer',
      department: 'Design',
      currentComp: '$168,000',
      proposedComp: '$195,000',
      recommendedComp: '$185,000',
      percentIncrease: '16.1%',
      bandSource: 'Career Ladder',
      bandName: 'Design IC5',
      bandRange: '$160,000 - $185,000',
      policy: 'Band maximum + cycle limit exceeded',
      policyReason: 'Two policy violations: exceeds band max and 12% cycle limit',
      managerNote: 'Market adjustment - design salaries up 18% YoY'
    },
  ];
  
  const currentEditingViolation = policyViolations.find(v => v.id === editingViolationId);
  
  const handleStartCompWorkflow = () => {
    setFocusedWorkflow('comp-changes');
  };
  
  const handleViolationClick = (violationId: string) => {
    setEditingViolationId(violationId);
  };
  
  const handleBackToViolationList = () => {
    setEditingViolationId(null);
  };
  
  const handleResolveViolation = (violationId: string, action: 'approve' | 'adjust' | 'reject') => {
    if (!resolvedViolations.includes(violationId)) {
      setResolvedViolations([...resolvedViolations, violationId]);
    }
    setEditingViolationId(null);
  };
  
  // Peer review data with pre-filled content
  const [reviewContents, setReviewContents] = useState<Record<string, { strengths: string; growth: string; summary: string }>>({
    '1': {
      strengths: 'Alex consistently delivers high-quality code and is a great collaborator. Their technical expertise in React and TypeScript has been invaluable to the team.',
      growth: 'Could benefit from more proactive communication during complex projects. Sometimes waits too long to raise blockers.',
      summary: ''
    },
    '2': {
      strengths: 'Jordan brings exceptional creativity to every project. Their design systems work has significantly improved our product consistency.',
      growth: 'Would benefit from deeper technical understanding of implementation constraints.',
      summary: ''
    },
    '3': {
      strengths: 'Morgan is an excellent people manager who creates psychological safety. Team morale has improved significantly under their leadership.',
      growth: 'Could delegate more effectively to develop team members skills.',
      summary: ''
    },
    '4': {
      strengths: 'Taylor is our go-to person for complex architectural decisions. Their code reviews are thorough and educational.',
      growth: 'Sometimes over-engineers solutions. Could focus more on shipping MVPs.',
      summary: ''
    },
    '5': {
      strengths: 'Casey conducts incredibly insightful user research. Their findings have directly shaped our product roadmap.',
      growth: 'Could improve on synthesizing findings into actionable recommendations faster.',
      summary: ''
    },
  });
  
  // Peer review data
  const peerReviewees = [
    { id: '1', name: 'Alex Chen', role: 'Senior Engineer', avatar: 'AC' },
    { id: '2', name: 'Jordan Smith', role: 'Product Designer', avatar: 'JS' },
    { id: '3', name: 'Morgan Lee', role: 'Engineering Manager', avatar: 'ML' },
    { id: '4', name: 'Taylor Kim', role: 'Staff Engineer', avatar: 'TK' },
    { id: '5', name: 'Casey Rivera', role: 'UX Researcher', avatar: 'CR' },
  ];
  
  const handleStartPeerReviews = () => {
    setFocusedWorkflow('peer-reviews');
  };
  
  const handleBackToWorkflows = () => {
    setFocusedWorkflow(null);
    setEditingPeerId(null);
  };
  
  const handlePeerReviewClick = (peerId: string) => {
    setEditingPeerId(peerId);
  };
  
  const handleBackToPeerList = () => {
    setEditingPeerId(null);
  };
  
  const handleSaveReview = () => {
    if (editingPeerId && !completedReviews.includes(editingPeerId)) {
      setCompletedReviews([...completedReviews, editingPeerId]);
    }
    setEditingPeerId(null);
  };
  
  const handleReviewContentChange = (peerId: string, field: 'strengths' | 'growth' | 'summary', value: string) => {
    setReviewContents(prev => ({
      ...prev,
      [peerId]: {
        ...prev[peerId],
        [field]: value
      }
    }));
  };
  
  const currentEditingPeer = peerReviewees.find(p => p.id === editingPeerId);
  
  // Get time-aware greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleComposerSubmit = (value: string) => {
    console.log('Submitted:', value);
  };

  const handleTaskClick = (taskName: string) => {
    setSelectedTask(taskName);
    setTaskDescription(`This task involves completing "${taskName}". You can add notes or modify the task details here.`);
  };

  const handleCloseTaskModal = () => {
    setSelectedTask(null);
    setTaskDescription('');
  };

  return (
    <>
    <AgenticHomeLayout theme={theme}>
      {/* Left Column - Fixed Composer */}
      <ComposerColumnFixed theme={theme}>
        <ComposerCard theme={theme}>
          {focusedWorkflow ? (
            <ComposerGreeting theme={theme}>
              {focusedWorkflow === 'peer-reviews' ? 'Complete peer reviews' : 
               focusedWorkflow === 'comp-changes' ? 'Approve compensation changes' : 
               `${getGreeting()}, ${userName}`}
            </ComposerGreeting>
          ) : (
            <>
              <GradientSparkle size={36} />
              <div>
                <ComposerGreeting theme={theme}>{getGreeting()}, {userName}</ComposerGreeting>
                <ComposerSubtext theme={theme}>What can I help you with?</ComposerSubtext>
              </div>
              <SuggestionPromptList theme={theme}>
                <SuggestionPromptItem theme={theme} onClick={() => handleComposerSubmit('Review open enrollment elections')}>
                  <PromptArrow theme={theme}>&#8627;</PromptArrow>
                  Review open enrollment elections
                </SuggestionPromptItem>
                <SuggestionPromptItem theme={theme} onClick={() => handleComposerSubmit('Approve pending benefit changes')}>
                  <PromptArrow theme={theme}>&#8627;</PromptArrow>
                  Approve pending benefit changes
                </SuggestionPromptItem>
                <SuggestionPromptItem theme={theme} onClick={() => handleComposerSubmit('Run benefits utilization report')}>
                  <PromptArrow theme={theme}>&#8627;</PromptArrow>
                  Run benefits utilization report
                </SuggestionPromptItem>
              </SuggestionPromptList>
            </>
          )}
          
          <AIComposer
            mode="global"
            theme={theme}
            placeholder="What would you like to get done?"
            showContextShelf={false}
            capabilities={['attachments', 'context']}
            onSubmit={handleComposerSubmit}
          />
        </ComposerCard>
        
        {/* Quick Actions - Context Aware */}
        <QuickActionsRow theme={theme}>
          {focusedWorkflow === 'comp-changes' && editingViolationId ? (
            // Context: Viewing specific policy violation
            <>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.CHART_OUTLINE} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>Market data</QuickActionLabel>
              </QuickActionButton>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.USERS_OUTLINE} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>Team context</QuickActionLabel>
              </QuickActionButton>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.TIME_OUTLINE} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>Comp history</QuickActionLabel>
              </QuickActionButton>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.SPARKLE_OUTLINE} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>AI analysis</QuickActionLabel>
              </QuickActionButton>
            </>
          ) : focusedWorkflow === 'comp-changes' ? (
            // Context: Policy violations list
            <>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.SPARKLE_OUTLINE} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>Auto-resolve all</QuickActionLabel>
              </QuickActionButton>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.CHEVRON_DOWN} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>Sort by severity</QuickActionLabel>
              </QuickActionButton>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.DOLLAR_CIRCLE_OUTLINE} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>Budget impact</QuickActionLabel>
              </QuickActionButton>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.FILE_OUTLINE} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>Export report</QuickActionLabel>
              </QuickActionButton>
            </>
          ) : focusedWorkflow === 'peer-reviews' && editingPeerId ? (
            // Context: Editing a specific peer review
            <>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.SPARKLE_OUTLINE} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>AI suggestions</QuickActionLabel>
              </QuickActionButton>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.TIME_OUTLINE} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>Past feedback</QuickActionLabel>
              </QuickActionButton>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.USERS_OUTLINE} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>Compare peers</QuickActionLabel>
              </QuickActionButton>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.CHEVRON_RIGHT} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>Skip to next</QuickActionLabel>
              </QuickActionButton>
            </>
          ) : focusedWorkflow === 'peer-reviews' ? (
            // Context: Peer review list view
            <>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.CHEVRON_DOWN} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>Sort by priority</QuickActionLabel>
              </QuickActionButton>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.CALENDAR_OUTLINE} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>Review deadline</QuickActionLabel>
              </QuickActionButton>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.HELP_OUTLINE} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>Writing tips</QuickActionLabel>
              </QuickActionButton>
            </>
          ) : (
            // Default: Home view quick actions
            <>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.TIME_OUTLINE} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>Clock in</QuickActionLabel>
              </QuickActionButton>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.CALENDAR_OUTLINE} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>Request PTO</QuickActionLabel>
              </QuickActionButton>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.RECEIPT_OUTLINE} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>Submit expense</QuickActionLabel>
              </QuickActionButton>
              <QuickActionButton theme={theme}>
                <QuickActionIcon theme={theme}>
                  <Icon type={Icon.TYPES.HELP_OUTLINE} size={24} color={theme.colorOnSurfaceVariant} />
                </QuickActionIcon>
                <QuickActionLabel theme={theme}>Get help</QuickActionLabel>
              </QuickActionButton>
            </>
          )}
        </QuickActionsRow>
      </ComposerColumnFixed>
      
      {/* Right Column - Scrollable Workflows */}
      <WorkflowsScrollContainer theme={theme}>
        {focusedWorkflow === 'comp-changes' ? (
          editingViolationId && currentEditingViolation ? (
            // Detail view for individual policy violation
            <FocusedWorkflowContainer theme={theme}>
              <FocusedWorkflowHeader theme={theme}>
                <Button.Icon 
                  icon={Icon.TYPES.ARROW_LEFT} 
                  aria-label="Back to violations list"
                  appearance={Button.APPEARANCES.GHOST}
                  size={Button.SIZES.S}
                  onClick={handleBackToViolationList}
                />
                <div style={{ flex: 1 }}>
                  <FocusedWorkflowTitle theme={theme}>{currentEditingViolation.employeeName}</FocusedWorkflowTitle>
                  <FocusedWorkflowSubtitle theme={theme}>{currentEditingViolation.role} · {currentEditingViolation.department}</FocusedWorkflowSubtitle>
                </div>
                {resolvedViolations.includes(editingViolationId) && (
                  <Status text="Resolved" appearance={Status.APPEARANCES.SUCCESS} size={Status.SIZES.S} />
                )}
              </FocusedWorkflowHeader>
              
              {/* Compensation Details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Current vs Proposed */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1fr 1fr 1fr', 
                  gap: '12px',
                  padding: '16px',
                  background: theme.colorSurfaceContainerLow,
                  borderRadius: theme.shapeCorner2xl
                }}>
                  <div>
                    <div style={{ ...theme.typestyleV2LabelSmall, color: theme.colorOnSurfaceVariant, marginBottom: '4px' }}>Current</div>
                    <div style={{ ...theme.typestyleV2TitleMedium, color: theme.colorOnSurface }}>{currentEditingViolation.currentComp}</div>
                  </div>
                  <div>
                    <div style={{ ...theme.typestyleV2LabelSmall, color: theme.colorOnSurfaceVariant, marginBottom: '4px' }}>Proposed</div>
                    <div style={{ ...theme.typestyleV2TitleMedium, color: theme.colorError }}>{currentEditingViolation.proposedComp}</div>
                    <div style={{ ...theme.typestyleV2BodySmall, color: theme.colorError }}>+{currentEditingViolation.percentIncrease}</div>
                  </div>
                  <div>
                    <div style={{ ...theme.typestyleV2LabelSmall, color: theme.colorOnSurfaceVariant, marginBottom: '4px' }}>Recommended</div>
                    <div style={{ ...theme.typestyleV2TitleMedium, color: theme.colorSuccess }}>{currentEditingViolation.recommendedComp}</div>
                  </div>
                </div>
                
                {/* Band Source */}
                <div style={{ 
                  padding: '16px',
                  background: theme.colorSurfaceBright,
                  border: `1px solid ${theme.colorOutlineVariant}`,
                  borderRadius: theme.shapeCorner2xl
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Icon type={Icon.TYPES.CHART_OUTLINE} size={16} color={theme.colorOnSurfaceVariant} />
                    <span style={{ ...theme.typestyleV2LabelMedium, color: theme.colorOnSurfaceVariant }}>Band Source</span>
                  </div>
                  <div style={{ ...theme.typestyleV2TitleSmall, color: theme.colorOnSurface, marginBottom: '4px' }}>
                    {currentEditingViolation.bandSource}: {currentEditingViolation.bandName}
                  </div>
                  <div style={{ ...theme.typestyleV2BodySmall, color: theme.colorOnSurfaceVariant }}>
                    Range: {currentEditingViolation.bandRange}
                  </div>
                </div>
                
                {/* Policy Violation */}
                <div style={{ 
                  padding: '16px',
                  background: theme.colorErrorContainer,
                  borderRadius: theme.shapeCorner2xl
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Icon type={Icon.TYPES.ALERT_OUTLINE} size={16} color={theme.colorError} />
                    <span style={{ ...theme.typestyleV2LabelMedium, color: theme.colorError }}>Policy Violation</span>
                  </div>
                  <div style={{ ...theme.typestyleV2TitleSmall, color: theme.colorOnSurface, marginBottom: '4px' }}>
                    {currentEditingViolation.policy}
                  </div>
                  <div style={{ ...theme.typestyleV2BodySmall, color: theme.colorOnSurfaceVariant }}>
                    {currentEditingViolation.policyReason}
                  </div>
                </div>
                
                {/* Manager Note */}
                <div style={{ 
                  padding: '16px',
                  background: theme.colorSurfaceBright,
                  border: `1px solid ${theme.colorOutlineVariant}`,
                  borderRadius: theme.shapeCorner2xl
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <Icon type={Icon.TYPES.MESSAGE_OUTLINE} size={16} color={theme.colorOnSurfaceVariant} />
                    <span style={{ ...theme.typestyleV2LabelMedium, color: theme.colorOnSurfaceVariant }}>Manager Justification</span>
                  </div>
                  <div style={{ ...theme.typestyleV2BodyMedium, color: theme.colorOnSurface }}>
                    "{currentEditingViolation.managerNote}"
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div style={{ 
                display: 'flex', 
                gap: '12px', 
                marginTop: '24px',
                paddingTop: '16px',
                borderTop: `1px solid ${theme.colorOutlineVariant}`
              }}>
                <Button 
                  size={Button.SIZES.S} 
                  appearance={Button.APPEARANCES.OUTLINE}
                  onClick={() => handleResolveViolation(editingViolationId, 'reject')}
                  style={{ flex: 1 }}
                >
                  Reject change
                </Button>
                <Button 
                  size={Button.SIZES.S} 
                  appearance={Button.APPEARANCES.OUTLINE}
                  onClick={() => handleResolveViolation(editingViolationId, 'approve')}
                  style={{ flex: 1 }}
                >
                  Approve as-is
                </Button>
                <Button 
                  size={Button.SIZES.S} 
                  appearance={Button.APPEARANCES.PRIMARY}
                  onClick={() => handleResolveViolation(editingViolationId, 'adjust')}
                  style={{ flex: 1 }}
                >
                  Apply {currentEditingViolation.recommendedComp}
                </Button>
              </div>
            </FocusedWorkflowContainer>
          ) : (
            // List view of all policy violations
            <FocusedWorkflowContainer theme={theme}>
              <FocusedWorkflowHeader theme={theme}>
                <Button.Icon 
                  icon={Icon.TYPES.ARROW_LEFT} 
                  aria-label="Back to workflows"
                  appearance={Button.APPEARANCES.GHOST}
                  size={Button.SIZES.S}
                  onClick={handleBackToWorkflows}
                />
                <div>
                  <FocusedWorkflowTitle theme={theme}>Resolve policy violations</FocusedWorkflowTitle>
                  <FocusedWorkflowSubtitle theme={theme}>17 changes require review before approval</FocusedWorkflowSubtitle>
                </div>
              </FocusedWorkflowHeader>
              
              <PeerReviewList theme={theme}>
                {policyViolations.map((violation) => (
                  <PeerReviewItem 
                    key={violation.id} 
                    theme={theme}
                    isCompleted={resolvedViolations.includes(violation.id)}
                    onClick={() => handleViolationClick(violation.id)}
                  >
                    <PeerReviewInfo theme={theme}>
                      <Avatar name={violation.employeeName} size={Avatar.SIZES.M} />
                      <div>
                        <PeerReviewName theme={theme}>{violation.employeeName}</PeerReviewName>
                        <PeerReviewRole theme={theme}>
                          {violation.currentComp} → {violation.proposedComp} ({violation.percentIncrease})
                        </PeerReviewRole>
                      </div>
                    </PeerReviewInfo>
                    <PeerReviewStatus theme={theme}>
                      {resolvedViolations.includes(violation.id) ? (
                        <Status text="Resolved" appearance={Status.APPEARANCES.SUCCESS} size={Status.SIZES.S} />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <Label appearance={Label.APPEARANCES.DANGER} size={Label.SIZES.S}>{violation.policy}</Label>
                          <Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} color={theme.colorOnSurfaceVariant} />
                        </div>
                      )}
                    </PeerReviewStatus>
                  </PeerReviewItem>
                ))}
              </PeerReviewList>
              
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ ...theme.typestyleV2BodySmall, color: theme.colorOnSurfaceVariant }}>
                  {resolvedViolations.length} of {policyViolations.length} resolved (showing 3 of 17)
                </span>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Button size={Button.SIZES.S} appearance={Button.APPEARANCES.OUTLINE} onClick={handleBackToWorkflows}>
                    Save progress
                  </Button>
                  <Button 
                    size={Button.SIZES.S} 
                    appearance={Button.APPEARANCES.PRIMARY}
                    disabled={resolvedViolations.length < policyViolations.length}
                  >
                    Continue to approval
                  </Button>
                </div>
              </div>
            </FocusedWorkflowContainer>
          )
        ) : focusedWorkflow === 'peer-reviews' ? (
          editingPeerId && currentEditingPeer ? (
            // Rich text editor view for individual peer review
            <ReviewEditorContainer theme={theme}>
              <ReviewEditorHeader theme={theme}>
                <Button.Icon 
                  icon={Icon.TYPES.ARROW_LEFT} 
                  aria-label="Back to peer list"
                  appearance={Button.APPEARANCES.GHOST}
                  size={Button.SIZES.S}
                  onClick={handleBackToPeerList}
                />
                <ReviewEditorPeerInfo theme={theme}>
                  <Avatar name={currentEditingPeer.name} size={Avatar.SIZES.L} />
                  <ReviewEditorPeerDetails theme={theme}>
                    <ReviewEditorPeerName theme={theme}>{currentEditingPeer.name}</ReviewEditorPeerName>
                    <ReviewEditorPeerRole theme={theme}>{currentEditingPeer.role}</ReviewEditorPeerRole>
                  </ReviewEditorPeerDetails>
                </ReviewEditorPeerInfo>
                {completedReviews.includes(editingPeerId) && (
                  <Status text="Submitted" appearance={Status.APPEARANCES.SUCCESS} size={Status.SIZES.S} />
                )}
              </ReviewEditorHeader>
              
              <ReviewEditorToolbar theme={theme}>
                <ToolbarButton theme={theme} title="Bold">
                  <span style={{ fontWeight: 'bold', fontSize: '14px' }}>B</span>
                </ToolbarButton>
                <ToolbarButton theme={theme} title="Italic">
                  <span style={{ fontStyle: 'italic', fontSize: '14px' }}>I</span>
                </ToolbarButton>
                <ToolbarButton theme={theme} title="Underline">
                  <span style={{ textDecoration: 'underline', fontSize: '14px' }}>U</span>
                </ToolbarButton>
                <ToolbarDivider theme={theme} />
                <ToolbarButton theme={theme} title="Bullet list">
                  <Icon type={Icon.TYPES.CHECKBOX_WITHCHECK_OUTLINE} size={16} />
                </ToolbarButton>
                <ToolbarButton theme={theme} title="Numbered list">
                  <Icon type={Icon.TYPES.DOCUMENT_OUTLINE} size={16} />
                </ToolbarButton>
                <ToolbarDivider theme={theme} />
                <ToolbarButton theme={theme} title="AI Assist">
                  <Icon type={Icon.TYPES.SPARKLE_OUTLINE} size={16} />
                </ToolbarButton>
              </ReviewEditorToolbar>
              
              <ReviewEditorContent theme={theme}>
                <ReviewSection theme={theme}>
                  <ReviewSectionLabel theme={theme}>Strengths & Contributions</ReviewSectionLabel>
                  <ReviewTextArea 
                    theme={theme}
                    value={reviewContents[editingPeerId]?.strengths || ''}
                    onChange={(e) => handleReviewContentChange(editingPeerId, 'strengths', e.target.value)}
                    placeholder="What did this person do well? What are their key strengths?"
                  />
                </ReviewSection>
                
                <ReviewSection theme={theme}>
                  <ReviewSectionLabel theme={theme}>Areas for Growth</ReviewSectionLabel>
                  <ReviewTextArea 
                    theme={theme}
                    value={reviewContents[editingPeerId]?.growth || ''}
                    onChange={(e) => handleReviewContentChange(editingPeerId, 'growth', e.target.value)}
                    placeholder="Where could this person improve? What development areas would you suggest?"
                  />
                </ReviewSection>
                
                <ReviewSection theme={theme}>
                  <ReviewSectionLabel theme={theme}>Overall Summary (Optional)</ReviewSectionLabel>
                  <ReviewTextArea 
                    theme={theme}
                    value={reviewContents[editingPeerId]?.summary || ''}
                    onChange={(e) => handleReviewContentChange(editingPeerId, 'summary', e.target.value)}
                    placeholder="Any additional thoughts or overall assessment..."
                    style={{ minHeight: '80px' }}
                  />
                </ReviewSection>
              </ReviewEditorContent>
              
              <ReviewEditorFooter theme={theme}>
                <Button size={Button.SIZES.S} appearance={Button.APPEARANCES.GHOST} onClick={handleBackToPeerList}>
                  Cancel
                </Button>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <Button size={Button.SIZES.S} appearance={Button.APPEARANCES.OUTLINE} onClick={handleBackToPeerList}>
                    Save draft
                  </Button>
                  <Button size={Button.SIZES.S} appearance={Button.APPEARANCES.PRIMARY} onClick={handleSaveReview}>
                    {completedReviews.includes(editingPeerId) ? 'Update review' : 'Submit review'}
                  </Button>
                </div>
              </ReviewEditorFooter>
            </ReviewEditorContainer>
          ) : (
            // Peer list view
            <FocusedWorkflowContainer theme={theme}>
              <FocusedWorkflowHeader theme={theme}>
                <Button.Icon 
                  icon={Icon.TYPES.ARROW_LEFT} 
                  aria-label="Back to workflows"
                  appearance={Button.APPEARANCES.GHOST}
                  size={Button.SIZES.S}
                  onClick={handleBackToWorkflows}
                />
                <div>
                  <FocusedWorkflowTitle theme={theme}>Refine and submit</FocusedWorkflowTitle>
                  <FocusedWorkflowSubtitle theme={theme}>Review each team member and submit your feedback</FocusedWorkflowSubtitle>
                </div>
              </FocusedWorkflowHeader>
              
              <PeerReviewList theme={theme}>
                {peerReviewees.map((peer) => (
                  <PeerReviewItem 
                    key={peer.id} 
                    theme={theme}
                    isCompleted={completedReviews.includes(peer.id)}
                    onClick={() => handlePeerReviewClick(peer.id)}
                  >
                    <PeerReviewInfo theme={theme}>
                      <Avatar name={peer.name} size={Avatar.SIZES.M} />
                      <div>
                        <PeerReviewName theme={theme}>{peer.name}</PeerReviewName>
                        <PeerReviewRole theme={theme}>{peer.role}</PeerReviewRole>
                      </div>
                    </PeerReviewInfo>
                    <PeerReviewStatus theme={theme}>
                      {completedReviews.includes(peer.id) ? (
                        <Status text="Submitted" appearance={Status.APPEARANCES.SUCCESS} size={Status.SIZES.S} />
                      ) : (
                        <Button size={Button.SIZES.XS} appearance={Button.APPEARANCES.OUTLINE}>Review</Button>
                      )}
                    </PeerReviewStatus>
                  </PeerReviewItem>
                ))}
              </PeerReviewList>
              
              <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <Button size={Button.SIZES.S} appearance={Button.APPEARANCES.OUTLINE} onClick={handleBackToWorkflows}>
                  Save draft
                </Button>
                <Button 
                  size={Button.SIZES.S} 
                  appearance={Button.APPEARANCES.PRIMARY}
                  disabled={completedReviews.length < peerReviewees.length}
                >
                  Submit all reviews
                </Button>
              </div>
            </FocusedWorkflowContainer>
          )
        ) : (
        <>
        {/* YOUR TURN Section */}
        <IntentColumn theme={theme}>
          <IntentSectionHeader theme={theme}>
            <IntentSectionLabel theme={theme}>Your turn</IntentSectionLabel>
            <Button size={Button.SIZES.XS} appearance={Button.APPEARANCES.GHOST}>+ Create workflow</Button>
          </IntentSectionHeader>
          
          <IntentGrid theme={theme}>
            {userRole === 'hr-admin' ? (
              <>
                {/* HR ADMIN: Approve Compensation Changes */}
                <StatusCard theme={theme}>
                  <StatusCardHeader theme={theme}>
                    <StatusCardTitle theme={theme}>Approve compensation changes</StatusCardTitle>
                    <Status text="Your turn" appearance={Status.APPEARANCES.PRIMARY} size={Status.SIZES.S} />
                  </StatusCardHeader>
                  <StatusCardTaskList theme={theme}>
                    <TaskItem status="done" theme={theme} taskName="Review 112 flagged changes" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="done">
                        <Icon type={Icon.TYPES.CHECK} size={12} color="white" />
                      </StatusRadio>
                      Review 112 flagged changes
                    </TaskItem>
                    <TaskItem status="in-progress" theme={theme} taskName="Approve 3,256 in-band" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="in-progress" />
                      Approve 3,256 in-band
                    </TaskItem>
                    <TaskItem status="pending" theme={theme} taskName="Resolve 17 policy violations" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Resolve 17 policy violations
                    </TaskItem>
                  </StatusCardTaskList>
                  <HandoffFooter theme={theme}>
                    <HandoffLabel theme={theme}>3,482 changes ready</HandoffLabel>
                    <Button size={Button.SIZES.XS} appearance={Button.APPEARANCES.PRIMARY} onClick={handleStartCompWorkflow}>Review</Button>
                  </HandoffFooter>
                </StatusCard>
              </>
            ) : (
              <>
                {/* EMPLOYEE: Complete peer reviews */}
                <StatusCard theme={theme}>
                  <StatusCardHeader theme={theme}>
                    <StatusCardTitle theme={theme}>Complete peer reviews</StatusCardTitle>
                    <Status text="Your turn" appearance={Status.APPEARANCES.PRIMARY} size={Status.SIZES.S} />
                  </StatusCardHeader>
                  <StatusCardTaskList theme={theme}>
                    <TaskItem status="done" theme={theme} taskName="Gather insights" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="done">
                        <Icon type={Icon.TYPES.CHECK} size={12} color="white" />
                      </StatusRadio>
                      Gather insights
                    </TaskItem>
                    <TaskItem status="done" theme={theme} taskName="Draft reviews" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="done">
                        <Icon type={Icon.TYPES.CHECK} size={12} color="white" />
                      </StatusRadio>
                      Draft reviews
                    </TaskItem>
                    <TaskItem status="in-progress" theme={theme} taskName="Refine and submit" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="in-progress" />
                      Refine and submit
                    </TaskItem>
                  </StatusCardTaskList>
                  <HandoffFooter theme={theme}>
                    <HandoffLabel theme={theme}>{completedReviews.length} of {peerReviewees.length} complete</HandoffLabel>
                    <Button size={Button.SIZES.XS} appearance={Button.APPEARANCES.PRIMARY} onClick={handleStartPeerReviews}>Start</Button>
                  </HandoffFooter>
                </StatusCard>
        </>
      )}
            
            {userRole === 'hr-admin' ? (
              <>
                {/* HR ADMIN: Close payroll */}
                <StatusCard theme={theme}>
                  <StatusCardHeader theme={theme}>
                    <StatusCardTitle theme={theme}>Close payroll</StatusCardTitle>
                    <Status text="Your turn" appearance={Status.APPEARANCES.PRIMARY} size={Status.SIZES.S} />
                  </StatusCardHeader>
                  <StatusCardTaskList theme={theme}>
                    <TaskItem status="pending" theme={theme} taskName="Validate timecards" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Validate timecards
                    </TaskItem>
                    <TaskItem status="pending" theme={theme} taskName="Process PTO requests" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Process PTO requests
                    </TaskItem>
                    <TaskItem status="pending" theme={theme} taskName="Review payroll draft" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Review payroll draft
                    </TaskItem>
                  </StatusCardTaskList>
                  <HandoffFooter theme={theme}>
                    <HandoffLabel theme={theme}>Ready to run payroll</HandoffLabel>
                    <Button size={Button.SIZES.XS} appearance={Button.APPEARANCES.PRIMARY}>Start</Button>
                  </HandoffFooter>
                </StatusCard>
                
                {/* HR ADMIN: Time corrections */}
                <StatusCard theme={theme}>
                  <StatusCardHeader theme={theme}>
                    <StatusCardTitle theme={theme}>Team time corrections</StatusCardTitle>
                    <Status text="Your turn" appearance={Status.APPEARANCES.PRIMARY} size={Status.SIZES.S} />
                  </StatusCardHeader>
                  <StatusCardTaskList theme={theme}>
                    <TaskItem status="pending" theme={theme} taskName="Fix missing punch - Jordan" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Fix missing punch - Jordan
                    </TaskItem>
                    <TaskItem status="pending" theme={theme} taskName="Approve overtime - Alex" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Approve overtime - Alex
                    </TaskItem>
                    <TaskItem status="pending" theme={theme} taskName="Finalize corrections" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Finalize corrections
                    </TaskItem>
                  </StatusCardTaskList>
                  <HandoffFooter theme={theme}>
                    <HandoffLabel theme={theme}>3 items need attention</HandoffLabel>
                    <Button size={Button.SIZES.XS} appearance={Button.APPEARANCES.PRIMARY}>Review all</Button>
                  </HandoffFooter>
                </StatusCard>
                
                {/* HR ADMIN: Approve expense reports */}
                <StatusCard theme={theme}>
                  <StatusCardHeader theme={theme}>
                    <StatusCardTitle theme={theme}>Approve expense reports</StatusCardTitle>
                    <Status text="Your turn" appearance={Status.APPEARANCES.PRIMARY} size={Status.SIZES.S} />
                  </StatusCardHeader>
                  <StatusCardTaskList theme={theme}>
                    <TaskItem status="pending" theme={theme} taskName="Sarah Chen - $847.50" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Sarah Chen - $847.50
                    </TaskItem>
                    <TaskItem status="pending" theme={theme} taskName="Mike Johnson - $234.00" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Mike Johnson - $234.00
                    </TaskItem>
                    <TaskItem status="pending" theme={theme} taskName="Lisa Park - $1,205.75" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Lisa Park - $1,205.75
                    </TaskItem>
                  </StatusCardTaskList>
                  <HandoffFooter theme={theme}>
                    <HandoffLabel theme={theme}>$2,287.25 pending approval</HandoffLabel>
                    <Button size={Button.SIZES.XS} appearance={Button.APPEARANCES.PRIMARY}>Approve all</Button>
                  </HandoffFooter>
                </StatusCard>
              </>
            ) : (
              <>
                {/* EMPLOYEE: Design offsite trip planner */}
                <StatusCard theme={theme}>
                  <StatusCardHeader theme={theme}>
                    <StatusCardTitle theme={theme}>Design offsite trip planner</StatusCardTitle>
                    <Status text="Your turn" appearance={Status.APPEARANCES.PRIMARY} size={Status.SIZES.S} />
                  </StatusCardHeader>
                  <StatusCardTaskList theme={theme}>
                    <TaskItem status="pending" theme={theme} taskName="Find hotel" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Find hotel
                    </TaskItem>
                    <TaskItem status="pending" theme={theme} taskName="Find flight" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Find flight
                    </TaskItem>
                    <TaskItem status="pending" theme={theme} taskName="Open expense report" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Open expense report
                    </TaskItem>
                  </StatusCardTaskList>
                  <HandoffFooter theme={theme}>
                    <HandoffLabel theme={theme}>Offsite: Mar 10-12</HandoffLabel>
                    <Button size={Button.SIZES.XS} appearance={Button.APPEARANCES.PRIMARY}>Start</Button>
                  </HandoffFooter>
                </StatusCard>
                
                {/* EMPLOYEE: View schedule */}
                <StatusCard theme={theme}>
                  <StatusCardHeader theme={theme}>
                    <StatusCardTitle theme={theme}>View next week schedule</StatusCardTitle>
                    <Status text="Your turn" appearance={Status.APPEARANCES.PRIMARY} size={Status.SIZES.S} />
                  </StatusCardHeader>
                  <StatusCardTaskList theme={theme}>
                    <TaskItem status="done" theme={theme} taskName="Mon 9am-5pm" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="done">
                        <Icon type={Icon.TYPES.CHECK} size={12} color="white" />
                      </StatusRadio>
                      Mon 9am-5pm
                    </TaskItem>
                    <TaskItem status="done" theme={theme} taskName="Tue-Thu 10am-6pm" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="done">
                        <Icon type={Icon.TYPES.CHECK} size={12} color="white" />
                      </StatusRadio>
                      Tue-Thu 10am-6pm
                    </TaskItem>
                    <TaskItem status="pending" theme={theme} taskName="Confirm availability" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Confirm availability
                    </TaskItem>
                  </StatusCardTaskList>
                  <HandoffFooter theme={theme}>
                    <HandoffLabel theme={theme}>32 hours scheduled</HandoffLabel>
                    <Button size={Button.SIZES.XS} appearance={Button.APPEARANCES.PRIMARY}>View full</Button>
                  </HandoffFooter>
                </StatusCard>
                
                {/* EMPLOYEE: Submit expense */}
                <StatusCard theme={theme}>
                  <StatusCardHeader theme={theme}>
                    <StatusCardTitle theme={theme}>Submit expense report</StatusCardTitle>
                    <Status text="Your turn" appearance={Status.APPEARANCES.PRIMARY} size={Status.SIZES.S} />
                  </StatusCardHeader>
                  <StatusCardTaskList theme={theme}>
                    <TaskItem status="done" theme={theme} taskName="Upload receipts (3)" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="done">
                        <Icon type={Icon.TYPES.CHECK} size={12} color="white" />
                      </StatusRadio>
                      Upload receipts (3)
                    </TaskItem>
                    <TaskItem status="pending" theme={theme} taskName="Add description" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Add description
                    </TaskItem>
                    <TaskItem status="pending" theme={theme} taskName="Submit for reimbursement" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Submit for reimbursement
                    </TaskItem>
                  </StatusCardTaskList>
                  <HandoffFooter theme={theme}>
                    <HandoffLabel theme={theme}>$156.80 to submit</HandoffLabel>
                    <Button size={Button.SIZES.XS} appearance={Button.APPEARANCES.PRIMARY}>Submit</Button>
                  </HandoffFooter>
                </StatusCard>
              </>
            )}
          </IntentGrid>
        </IntentColumn>
        
        {/* AGENT'S TURN Section */}
        <IntentColumn theme={theme}>
          <IntentSectionHeader theme={theme}>
            <IntentSectionLabel theme={theme}>Agent's turn</IntentSectionLabel>
          </IntentSectionHeader>
          
          <IntentGrid theme={theme}>
            {userRole === 'hr-admin' ? (
              <>
                {/* HR ADMIN: Design offsite trip planner */}
                <StatusCard theme={theme}>
                  <StatusCardHeader theme={theme}>
                    <StatusCardTitle theme={theme}>Design offsite trip planner</StatusCardTitle>
                  </StatusCardHeader>
                  <StatusCardTaskList theme={theme}>
                    <TaskItem status="done" theme={theme} taskName="Find hotel" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="done">
                        <Icon type={Icon.TYPES.CHECK} size={12} color="white" />
                      </StatusRadio>
                      Find hotel
                    </TaskItem>
                    <TaskItem status="in-progress" theme={theme} taskName="Find roundtrip flights" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="in-progress" />
                      Find roundtrip flights
                    </TaskItem>
                    <TaskItem status="pending" theme={theme} taskName="In-policy review" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      In-policy review
                    </TaskItem>
                  </StatusCardTaskList>
                  <AgentRunningFooter theme={theme}>
                    <AgentRunningLabel theme={theme}>
                      <AgentSparkle>✨</AgentSparkle>
                      Agent is running..
                    </AgentRunningLabel>
                    <AgentProgressMini theme={theme} />
                  </AgentRunningFooter>
                </StatusCard>
                
                {/* HR ADMIN: Generate quarterly report */}
                <StatusCard theme={theme}>
                  <StatusCardHeader theme={theme}>
                    <StatusCardTitle theme={theme}>Generate Q4 headcount report</StatusCardTitle>
                  </StatusCardHeader>
                  <StatusCardTaskList theme={theme}>
                    <TaskItem status="done" theme={theme} taskName="Gather department data" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="done">
                        <Icon type={Icon.TYPES.CHECK} size={12} color="white" />
                      </StatusRadio>
                      Gather department data
                    </TaskItem>
                    <TaskItem status="in-progress" theme={theme} taskName="Calculate turnover metrics" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="in-progress" />
                      Calculate turnover metrics
                    </TaskItem>
                    <TaskItem status="pending" theme={theme} taskName="Format report" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Format report
                    </TaskItem>
                  </StatusCardTaskList>
                  <AgentRunningFooter theme={theme}>
                    <AgentRunningLabel theme={theme}>
                      <AgentSparkle>✨</AgentSparkle>
                      Agent is running..
                    </AgentRunningLabel>
                    <AgentProgressMini theme={theme} />
                  </AgentRunningFooter>
                </StatusCard>
                
                {/* HR ADMIN: Benefits enrollment reminder */}
                <StatusCard theme={theme}>
                  <StatusCardHeader theme={theme}>
                    <StatusCardTitle theme={theme}>Send benefits enrollment reminders</StatusCardTitle>
                  </StatusCardHeader>
                  <StatusCardTaskList theme={theme}>
                    <TaskItem status="done" theme={theme} taskName="Identify incomplete enrollments" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="done">
                        <Icon type={Icon.TYPES.CHECK} size={12} color="white" />
                      </StatusRadio>
                      Identify incomplete enrollments
                    </TaskItem>
                    <TaskItem status="done" theme={theme} taskName="Draft reminder emails" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="done">
                        <Icon type={Icon.TYPES.CHECK} size={12} color="white" />
                      </StatusRadio>
                      Draft reminder emails
                    </TaskItem>
                    <TaskItem status="in-progress" theme={theme} taskName="Send to 12 employees" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="in-progress" />
                      Send to 12 employees
                    </TaskItem>
                  </StatusCardTaskList>
                  <AgentRunningFooter theme={theme}>
                    <AgentRunningLabel theme={theme}>
                      <AgentSparkle>✨</AgentSparkle>
                      Agent is running..
                    </AgentRunningLabel>
                    <AgentProgressMini theme={theme} />
                  </AgentRunningFooter>
                </StatusCard>
                
                {/* HR ADMIN: Sync payroll to accounting */}
                <StatusCard theme={theme}>
                  <StatusCardHeader theme={theme}>
                    <StatusCardTitle theme={theme}>Sync payroll to QuickBooks</StatusCardTitle>
                  </StatusCardHeader>
                  <StatusCardTaskList theme={theme}>
                    <TaskItem status="done" theme={theme} taskName="Export payroll journal" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="done">
                        <Icon type={Icon.TYPES.CHECK} size={12} color="white" />
                      </StatusRadio>
                      Export payroll journal
                    </TaskItem>
                    <TaskItem status="done" theme={theme} taskName="Map GL accounts" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="done">
                        <Icon type={Icon.TYPES.CHECK} size={12} color="white" />
                      </StatusRadio>
                      Map GL accounts
                    </TaskItem>
                    <TaskItem status="in-progress" theme={theme} taskName="Push to QuickBooks" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="in-progress" />
                      Push to QuickBooks
                    </TaskItem>
                  </StatusCardTaskList>
                  <AgentRunningFooter theme={theme}>
                    <AgentRunningLabel theme={theme}>
                      <AgentSparkle>✨</AgentSparkle>
                      Agent is running..
                    </AgentRunningLabel>
                    <AgentProgressMini theme={theme} />
                  </AgentRunningFooter>
                </StatusCard>
              </>
            ) : (
              <>
                {/* EMPLOYEE: PTO approval tracking */}
                <StatusCard theme={theme}>
                  <StatusCardHeader theme={theme}>
                    <StatusCardTitle theme={theme}>Track PTO approval</StatusCardTitle>
                  </StatusCardHeader>
                  <StatusCardTaskList theme={theme}>
                    <TaskItem status="done" theme={theme} taskName="Request submitted" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="done">
                        <Icon type={Icon.TYPES.CHECK} size={12} color="white" />
                      </StatusRadio>
                      Request submitted
                    </TaskItem>
                    <TaskItem status="in-progress" theme={theme} taskName="Awaiting manager approval" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="in-progress" />
                      Awaiting manager approval
                    </TaskItem>
                    <TaskItem status="pending" theme={theme} taskName="Calendar sync" onTaskClick={handleTaskClick}>
                      <StatusRadio theme={theme} status="pending" />
                      Calendar sync
                    </TaskItem>
                  </StatusCardTaskList>
                  <AgentRunningFooter theme={theme}>
                    <AgentRunningLabel theme={theme}>
                      <AgentSparkle>✨</AgentSparkle>
                      Agent is running..
                    </AgentRunningLabel>
                    <AgentProgressMini theme={theme} />
                  </AgentRunningFooter>
                </StatusCard>
              </>
            )}
          </IntentGrid>
        </IntentColumn>
        </>
        )}
      </WorkflowsScrollContainer>
    </AgenticHomeLayout>
    
    {/* Task Details Modal */}
    <Drawer
      isVisible={!!selectedTask}
      onCancel={handleCloseTaskModal}
      title={selectedTask || 'Task Details'}
      width={400}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: '16px' }}>
        <div>
          <Label style={{ marginBottom: '8px' }}>Description</Label>
          <Input.TextArea
            value={taskDescription}
            onChange={(value: string) => setTaskDescription(value)}
            placeholder="Add task description..."
            rows={4}
          />
        </div>
        <div>
          <Label style={{ marginBottom: '8px' }}>Status</Label>
          <Input.Select
            list={[
              { label: 'Pending', value: 'pending' },
              { label: 'In Progress', value: 'in-progress' },
              { label: 'Done', value: 'done' },
            ]}
            value="pending"
            onChange={() => {}}
          />
        </div>
        <div>
          <Label style={{ marginBottom: '8px' }}>Notes</Label>
          <Input.TextArea
            placeholder="Add any additional notes..."
            rows={3}
          />
        </div>
      </div>
      <Drawer.Footer>
        <Button appearance={Button.APPEARANCES.OUTLINE} onClick={handleCloseTaskModal}>Cancel</Button>
        <Button appearance={Button.APPEARANCES.PRIMARY} onClick={handleCloseTaskModal}>Save Changes</Button>
      </Drawer.Footer>
    </Drawer>
    </>
  );
};

// Legacy Dashboard Content (keeping for reference)
interface DashboardContentProps {
  userName?: string;
  userRole?: 'hr-admin' | 'employee';
}

const DashboardContent: React.FC<DashboardContentProps> = ({ userName, userRole }) => {
  // Now returns the Agentic Home
  return <AgenticHomeContent userName={userName} userRole={userRole} />;
};

const Offsite2026Demo: React.FC = () => {
  // Track which basement item is active
  const [activeBasementItem, setActiveBasementItem] = useState('home');
  // Track which item is being hovered in basement (for Pane A preview)
  const [hoveredBasementItem, setHoveredBasementItem] = useState<string | null>(null);
  // Track which payroll sub-item is selected (overview, payruns, people, taxes)
  const [payrollSubItem, setPayrollSubItem] = useState('overview');
  // Track which explore sub-item is selected (recommended, hr, it, finance, global, etc.)
  const [exploreSubItem, setExploreSubItem] = useState('recommended');
  // Track current user role (HR Admin or Employee)
  const [userRole, setUserRole] = useState<UserRole>('hr-admin');
  
  // Compute user display values based on role
  const getUserDisplayInfo = () => {
    if (userRole === 'hr-admin') {
      return {
        name: 'Jordan',
        initial: 'J',
        fullName: 'Jordan Smith',
      };
    } else {
      return {
        name: 'Sarah',
        initial: 'S',
        fullName: 'Sarah Chen',
      };
    }
  };
  
  const userInfo = getUserDisplayInfo();

  // Basement: Top section (platform primitives)
  const basementTopSection: BasementSection = {
    items: [
      { id: 'home', label: 'Home', icon: Icon.TYPES.HOME_OUTLINE },
      { id: 'todo', label: 'To-Do', icon: Icon.TYPES.TASKS_OUTLINE },
    ],
  };

  // Basement: Middle section (product verticals)
  const basementMiddleSection: BasementSection = {
    items: [
      { id: 'time', label: 'Time', icon: Icon.TYPES.TIME_OUTLINE },
      { id: 'payroll', label: 'Payroll', icon: Icon.TYPES.STACKED_COINS_OUTLINE },
    ],
  };

  // Basement: Tools section (below product verticals)
  const basementToolsSection: BasementSection = {
    items: [
      { id: 'tools', label: 'Tools', icon: Icon.TYPES.TOOLS_OUTLINE },
    ],
  };

  // Basement: Explore item (pinned to bottom)
  const basementExploreItem: BasementItem = {
    id: 'explore',
    label: 'Explore',
    icon: Icon.TYPES.COMPASS_OUTLINE,
  };

  const handleBasementItemClick = (itemId: string) => {
    setActiveBasementItem(itemId);
    // Reset payroll sub-item to overview when switching to payroll
    if (itemId === 'payroll') {
      setPayrollSubItem('overview');
    }
    // Reset explore sub-item to recommended when switching to explore
    if (itemId === 'explore') {
      setExploreSubItem('recommended');
    }
  };

  const handleExploreClick = () => {
    setActiveBasementItem('explore');
    setExploreSubItem('recommended');
  };

  // Items that have Pane A content
  const itemsWithPaneA = ['todo', 'time', 'payroll', 'tools', 'explore'];

  // Determine Pane A content based on active basement item
  const getPaneAContent = () => {
    // Only use hovered item if it has Pane A content, otherwise use active item
    const hoveredHasPaneA = hoveredBasementItem && itemsWithPaneA.includes(hoveredBasementItem);
    const targetItem = hoveredHasPaneA ? hoveredBasementItem : activeBasementItem;
    // isPreview is true when we're showing content for a hovered item (not the active one)
    const isPreview = hoveredHasPaneA && hoveredBasementItem !== activeBasementItem;
    
    switch (targetItem) {
      case 'todo':
        return <ToDoNavContent isPreview={isPreview} />;
      case 'time':
        return <TimeNavContent isPreview={isPreview} />;
      case 'payroll':
        return <PayrollNavPreview activeItem={payrollSubItem} onItemChange={setPayrollSubItem} isPreview={isPreview} />;
      case 'tools':
        return <ToolsNavContent isPreview={isPreview} />;
      case 'explore':
        return <ExploreNavContent isPreview={isPreview} activeItem={exploreSubItem} onItemChange={setExploreSubItem} />;
      case 'home':
      default:
        return null;
    }
  };

  // Determine Pane B content based on active basement item
  const getPaneBContent = () => {
    switch (activeBasementItem) {
      case 'todo':
        return <ToDoListContent />;
      case 'time':
        return <TimeOverviewContent />;
      case 'payroll':
        // Show content based on selected payroll sub-item
        switch (payrollSubItem) {
          case 'payruns':
            return <PayrollPayRunsDetail />;
          case 'people':
            return <PayrollPeopleDetail />;
          case 'taxes':
            return <PayrollTaxesDetail />;
          case 'overview':
          default:
            return <PayrollSkuDetailPage />;
        }
      case 'tools':
        return <DashboardContent userName={userInfo.name} userRole={userRole} />; // Placeholder - shows dashboard for now
      case 'explore':
        // Show content based on selected explore sub-item
        switch (exploreSubItem) {
          case 'hr':
            return <HRSkuDetailPage />;
          case 'it':
            return <ITSkuDetailPage />;
          case 'finance':
            return <FinanceSkuDetailPage />;
          case 'global':
            return <GlobalSkuDetailPage />;
          case 'payroll':
            return <PayrollSkuDetailPage />;
          case 'recommended':
          default:
        return <ExploreContent />;
        }
      case 'home':
      default:
        return <DashboardContent userName={userInfo.name} userRole={userRole} />;
    }
  };

  // Determine Pane A default width based on active basement item
  const getPaneADefaultWidth = () => {
    // Only use hovered item if it has Pane A content
    const hoveredHasPaneA = hoveredBasementItem && itemsWithPaneA.includes(hoveredBasementItem);
    const targetItem = hoveredHasPaneA ? hoveredBasementItem : activeBasementItem;
    switch (targetItem) {
      case 'todo':
        return 250;
      default:
        return 250;
    }
  };

  const getPaneAHeaderTitle = () => {
    // Only use hovered item if it has Pane A content
    const hoveredHasPaneA = hoveredBasementItem && itemsWithPaneA.includes(hoveredBasementItem);
    const targetItem = hoveredHasPaneA ? hoveredBasementItem : activeBasementItem;
    switch (targetItem) {
      case 'todo':
        return 'To-Do';
      case 'time':
        return 'Time';
      case 'payroll':
        return 'Payroll';
      case 'tools':
        return 'Tools';
      case 'explore':
        return 'Explore';
      default:
        return '';
    }
  };

  return (
    <>
      <ProgressiveDiscoveryLayout
        hidePageHeader
        basementTopSection={basementTopSection}
        basementMiddleSection={basementMiddleSection}
        basementToolsSection={basementToolsSection}
        basementExploreItem={basementExploreItem}
        activeBasementItemId={activeBasementItem}
        onBasementItemClick={handleBasementItemClick}
        onExploreClick={handleExploreClick}
        hoveredBasementItemId={hoveredBasementItem}
        onBasementItemHover={setHoveredBasementItem}
        paneAContent={getPaneAContent()}
        paneADefaultWidth={getPaneADefaultWidth()}
        paneAHeaderTitle={getPaneAHeaderTitle()}
        forcePaneACollapsed={!getPaneAContent()}
        companyName="Acme, Inc."
        userName={userInfo.fullName}
        userInitial={userInfo.initial}
        userRole={userRole}
        onRoleChange={setUserRole}
        showNotificationBadge
        notificationCount={2}
      >
        {getPaneBContent()}
      </ProgressiveDiscoveryLayout>
    </>
  );
};

export default Offsite2026Demo;
