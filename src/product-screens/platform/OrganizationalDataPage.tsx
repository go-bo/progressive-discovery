import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import Avatar from '@rippling/pebble/Avatar';
import TableBasic from '@rippling/pebble/TableBasic';
import { DiscoveryPageLayout, PlatformPrimer } from '@/spec';
import type { FeatureCardDetailConfig, FeatureCardGridItem } from '@/spec';
import owlImg from '@/assets/owl.png';
import dolphinImg from '@/assets/dolphin.png';
import otterImg from '@/assets/otter.png';
import eagleImg from '@/assets/eagle.png';
import bearImg from '@/assets/bear.png';

// ── Layout ──────────────────────────────────────────────

const PageContainer = styled(DiscoveryPageLayout)`
  gap: ${({ theme }) => (theme as StyledTheme).space600};
`;

// ── Section Card ─────────────────────────────────────

const SectionCard = styled.div`
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  padding: ${({ theme }) => (theme as StyledTheme).space500};
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space300};
`;

const SectionHeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

const SectionTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const SectionSubtitle = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  line-height: 1.4;
`;

const SectionContent = styled.div`
  padding: 0 ${({ theme }) => (theme as StyledTheme).space500};
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space500};
`;

// ── Information key-value rows ────────────────────────

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  padding: ${({ theme }) => (theme as StyledTheme).space300} 0;
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const InfoValue = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const InfoEditWrap = styled.div`
  flex-shrink: 0;
`;

// ── Table wrapper ────────────────────────────────────

const TableWrapper = styled.div`
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  overflow: hidden;
`;

// ── Org Chart Preview (placeholder hero visual) ──────────

const ORG_CHART_PEOPLE = [
  { name: 'Wise Owl', title: 'CEO', count: '7 · 5,576', img: owlImg },
  { name: 'Strong Bear', title: 'COO', count: '14 · 2,367', img: bearImg },
  { name: 'Smart Dolphin', title: 'CFO', count: '9 · 189', img: dolphinImg },
  { name: 'Global Otter', title: 'Global Director', count: '10 · 36', img: otterImg },
  { name: 'Sharp Eagle', title: 'General Counsel', count: '10 · 36', img: eagleImg },
];

const ORG_CHART_RADIUS = '16px';

const OrgChartFrame = styled.div`
  width: 420px;
  height: 350px;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceDim};
  border: 6px solid ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-radius: ${ORG_CHART_RADIUS};
  outline: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  outline-offset: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  box-sizing: border-box;
`;

const OrgChartTree = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space800};
`;

const OrgChartRow = styled.div`
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => (theme as StyledTheme).space800};
`;

const OrgChartCardWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const OrgChartCard = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space300};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  min-width: 140px;
`;

const OrgChartCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const OrgChartCardName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const OrgChartCardTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const OrgChartCardCount = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin-top: 2px;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const OrgChartAvatar = styled.img`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  object-fit: cover;
  flex-shrink: 0;
`;

const OrgChartAddIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const OrgChartConnectorV = styled.div<{ $h?: number }>`
  width: 2px;
  height: ${({ $h }) => $h ?? 16}px;
  background: ${({ theme }) => (theme as StyledTheme).colorOutline};
  flex-shrink: 0;
`;

const OrgChartTBranch = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
`;

const OrgChartControls = styled.div`
  position: absolute;
  bottom: ${({ theme }) => (theme as StyledTheme).space300};
  right: ${({ theme }) => (theme as StyledTheme).space300};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const OrgChartControlBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerSm};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerHigh};
  }
`;

const OrgChartLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin-top: ${({ theme }) => (theme as StyledTheme).space200};
  text-align: right;
`;

const OrgChartWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 420px !important;
  min-width: 420px !important;
  max-width: 420px !important;
  flex-shrink: 0;
  box-sizing: border-box;
`;

const OrgChartPlaceholder: React.FC<{ theme: StyledTheme }> = ({ theme }) => (
  <OrgChartWrapper theme={theme}>
  <OrgChartFrame theme={theme}>
    <OrgChartTree theme={theme} style={{ position: 'relative' }}>
      {/* LINE 1: One vertical line from root down the center of the whole chart */}
      <div style={{ position: 'absolute', left: '50%', top: 46, bottom: 29, width: 1, background: theme.colorOutline, transform: 'translateX(-50%)', zIndex: 0 }} />

      {/* Root card */}
      <OrgChartRow theme={theme} style={{ position: 'relative', zIndex: 1 }}>
        <OrgChartCardWrap theme={theme}>
          <OrgChartCard theme={theme}>
            <OrgChartAvatar theme={theme} src={ORG_CHART_PEOPLE[0].img} alt={ORG_CHART_PEOPLE[0].name} />
            <OrgChartCardContent theme={theme}>
              <OrgChartCardName theme={theme}>{ORG_CHART_PEOPLE[0].name}</OrgChartCardName>
              <OrgChartCardTitle theme={theme}>{ORG_CHART_PEOPLE[0].title}</OrgChartCardTitle>
            </OrgChartCardContent>
          </OrgChartCard>
        </OrgChartCardWrap>
      </OrgChartRow>

      {/* Level 2 row */}
      <OrgChartRow theme={theme} style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: theme.colorOutline, zIndex: 0 }} />
        <OrgChartCardWrap theme={theme} style={{ position: 'relative', zIndex: 1 }}>
          <OrgChartCard theme={theme}>
            <OrgChartAvatar theme={theme} src={ORG_CHART_PEOPLE[1].img} alt={ORG_CHART_PEOPLE[1].name} />
            <OrgChartCardContent theme={theme}>
              <OrgChartCardName theme={theme}>{ORG_CHART_PEOPLE[1].name}</OrgChartCardName>
              <OrgChartCardTitle theme={theme}>{ORG_CHART_PEOPLE[1].title}</OrgChartCardTitle>
            </OrgChartCardContent>
          </OrgChartCard>
        </OrgChartCardWrap>
        <OrgChartCardWrap theme={theme} style={{ position: 'relative', zIndex: 1 }}>
          <OrgChartCard theme={theme}>
            <OrgChartAvatar theme={theme} src={ORG_CHART_PEOPLE[2].img} alt={ORG_CHART_PEOPLE[2].name} />
            <OrgChartCardContent theme={theme}>
              <OrgChartCardName theme={theme}>{ORG_CHART_PEOPLE[2].name}</OrgChartCardName>
              <OrgChartCardTitle theme={theme}>{ORG_CHART_PEOPLE[2].title}</OrgChartCardTitle>
            </OrgChartCardContent>
          </OrgChartCard>
        </OrgChartCardWrap>
      </OrgChartRow>

      {/* Level 3 row */}
      <OrgChartRow theme={theme} style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: theme.colorOutline, zIndex: 0 }} />
        <OrgChartCardWrap theme={theme} style={{ position: 'relative', zIndex: 1 }}>
          <OrgChartCard theme={theme}>
            <OrgChartAvatar theme={theme} src={ORG_CHART_PEOPLE[3].img} alt={ORG_CHART_PEOPLE[3].name} />
            <OrgChartCardContent theme={theme}>
              <OrgChartCardName theme={theme}>{ORG_CHART_PEOPLE[3].name}</OrgChartCardName>
              <OrgChartCardTitle theme={theme}>{ORG_CHART_PEOPLE[3].title}</OrgChartCardTitle>
            </OrgChartCardContent>
          </OrgChartCard>
        </OrgChartCardWrap>
        <OrgChartCardWrap theme={theme} style={{ position: 'relative', zIndex: 1 }}>
          <OrgChartCard theme={theme}>
            <OrgChartAvatar theme={theme} src={ORG_CHART_PEOPLE[4].img} alt={ORG_CHART_PEOPLE[4].name} />
            <OrgChartCardContent theme={theme}>
              <OrgChartCardName theme={theme}>{ORG_CHART_PEOPLE[4].name}</OrgChartCardName>
              <OrgChartCardTitle theme={theme}>{ORG_CHART_PEOPLE[4].title}</OrgChartCardTitle>
            </OrgChartCardContent>
          </OrgChartCard>
        </OrgChartCardWrap>
      </OrgChartRow>
    </OrgChartTree>
  </OrgChartFrame>
  </OrgChartWrapper>
);

const ViewAllLink = styled.button`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  background: none;
  border: none;
  padding: ${({ theme }) => (theme as StyledTheme).space200} 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

// ── Data ─────────────────────────────────────────────

const INFO_ROWS = [
  { label: 'Company Name', value: 'Acme Corporation' },
  { label: 'Legal Name', value: 'Acme Corporation, Inc.' },
  { label: 'EIN', value: '12-3456789' },
  { label: 'Industry', value: 'Technology - Software' },
  { label: 'Company Size', value: '50-200 employees' },
];

const EMAIL_DOMAINS = [
  { domain: 'acme.com', status: 'Verified', primary: 'Yes' },
  { domain: 'acmecorp.com', status: 'Verified', primary: 'No' },
];

const ENTITIES = [
  { name: 'Acme Corp US', type: 'Corporation', country: 'United States', employees: 145 },
  { name: 'Acme Corp UK', type: 'Ltd', country: 'United Kingdom', employees: 32 },
  { name: 'Acme Corp DE', type: 'GmbH', country: 'Germany', employees: 18 },
  { name: 'Acme Corp FR', type: 'SAS', country: 'France', employees: 12 },
  { name: 'Acme Corp JP', type: 'KK', country: 'Japan', employees: 8 },
];

const WORK_LOCATIONS = [
  { location: 'HQ - San Francisco', address: '123 Market St, SF, CA', type: 'Office', employees: 85 },
  { location: 'NYC Office', address: '456 Broadway, NY, NY', type: 'Office', employees: 42 },
  { location: 'London Office', address: '10 Liverpool St, London', type: 'Office', employees: 32 },
  { location: 'Berlin Office', address: 'Friedrichstr 123, Berlin', type: 'Office', employees: 18 },
  { location: 'Tokyo Office', address: '1-2-3 Shibuya, Tokyo', type: 'Office', employees: 8 },
];

const JOB_TITLES = [
  { title: 'Software Engineer', department: 'Engineering', level: 'L3', salaryBand: '$120k–$180k', headcount: 42 },
  { title: 'Product Manager', department: 'Product', level: 'L4', salaryBand: '$140k–$200k', headcount: 12 },
  { title: 'Sales Representative', department: 'Sales', level: 'L2', salaryBand: '$80k–$120k + OTE', headcount: 28 },
  { title: 'HR Business Partner', department: 'People', level: 'L4', salaryBand: '$100k–$150k', headcount: 6 },
  { title: 'Accountant', department: 'Finance', level: 'L3', salaryBand: '$85k–$130k', headcount: 8 },
];

const JOB_LEVELS = [
  { level: 'L1', name: 'Individual Contributor I', typicalRange: 'Entry-level' },
  { level: 'L2', name: 'Individual Contributor II', typicalRange: 'Early career' },
  { level: 'L3', name: 'Individual Contributor III', typicalRange: 'Mid-level' },
  { level: 'L4', name: 'Senior Individual Contributor', typicalRange: 'Senior' },
  { level: 'L5', name: 'Staff / Principal', typicalRange: 'Staff+' },
];

const EMPLOYEE_STATUSES = [
  { status: 'Active', description: 'Currently employed and working', count: 228 },
  { status: 'On Leave', description: 'Paid or unpaid leave', count: 12 },
  { status: 'Terminated', description: 'No longer employed', count: 34 },
];

const ONBOARDING_STAGES = [
  { stage: 'Pre-boarding', tasks: 8, avgDays: 7 },
  { stage: 'Day 1', tasks: 5, avgDays: 1 },
  { stage: 'Week 1', tasks: 12, avgDays: 7 },
  { stage: 'Month 1', tasks: 15, avgDays: 30 },
];

const OFFBOARDING_REASONS = [
  { reason: 'Resignation', count: 18 },
  { reason: 'End of contract', count: 6 },
  { reason: 'Retirement', count: 2 },
  { reason: 'Termination', count: 8 },
];


// ── Tab Primers ──────────────────────────────────────

interface TabPrimerConfig {
  title: string;
  subtitle: string;
  cta: string;
  separatorLabel: string;
  variant?: 'capability' | 'unlock';
  features?: FeatureCardDetailConfig[];
  unlockItems?: FeatureCardGridItem[];
  unlockSubtitle?: string;
  layout?: 'side-by-side' | 'stacked';
  visual?: boolean;
}

const TAB_PRIMERS: Record<number, TabPrimerConfig> = {
  0: {
    title: 'Your company\'s foundation in Rippling',
    subtitle: 'Company information, legal entities, and work locations. This data powers payroll, compliance, and employee records across every module.',
    cta: 'Open company information',
    separatorLabel: 'What\'s managed here',
    features: [
      {
        icon: Icon.TYPES.OFFICE_OUTLINE,
        title: 'Company details',
        description: 'Legal name, EIN, industry, and company size.',
        benefits: ['Feeds into tax filings', 'Required for compliance reporting', 'Used across all modules'],
        ctaLabel: 'View company details',
      },
      {
        icon: Icon.TYPES.LOCATION_OUTLINE,
        title: 'Work locations',
        description: 'Physical offices and remote work settings.',
        benefits: ['Powers tax jurisdiction calculations', 'Drives location-based policies', 'Feeds into compliance'],
        ctaLabel: 'View locations',
      },
      {
        icon: Icon.TYPES.EMAIL_OUTLINE,
        title: 'Email domains',
        description: 'Verified domains for employee work emails.',
        benefits: ['Used for provisioning', 'SSO and security settings', 'Email routing'],
        ctaLabel: 'View domains',
      },
      {
        icon: Icon.TYPES.HIERARCHY_HORIZONTAL_OUTLINE,
        title: 'Legal entities',
        description: 'Subsidiaries and legal structures across countries.',
        benefits: ['Required for global payroll', 'Drives entity-specific compliance', 'Supports multi-entity reporting'],
        ctaLabel: 'View entities',
      },
    ],
  },
  1: {
    title: 'Departments power everything',
    subtitle: 'Departments are the single most leveraged piece of org data — nearly every product area reads from them to power automation, reporting, and access control.',
    cta: 'Open departments',
    separatorLabel: 'What adding departments unlocks',
    unlockSubtitle: 'Every department you define feeds into HR, IT, Finance, and Platform — automating access, routing decisions, and driving reports across the board.',
    variant: 'unlock',
    layout: 'side-by-side',
    visual: true,
    unlockItems: [
      {
        id: 'it-access',
        icon: Icon.TYPES.LAPTOP_OUTLINE,
        title: 'Automated IT provisioning',
        description: 'Auto-provision apps and tools by department — new hires get the right access from day one.',
      },
      {
        id: 'headcount-spend',
        icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE,
        title: 'Headcount, budgets & spend',
        description: 'Plan hires, allocate budgets, and track payroll and expenses at the department level with GL mapping.',
      },
      {
        id: 'policies-workflows',
        icon: Icon.TYPES.CUSTOMIZE_POLICY_FILLED,
        title: 'Policies, approvals & reporting',
        description: 'Route approvals, target policies, build dynamic Supergroups, and filter any report by department.',
      },
    ],
  },
  2: {
    title: 'Standardize roles, levels, and compensation bands',
    subtitle: 'Define job titles, career levels, and salary bands that apply consistently across departments. This data feeds into offer letters, reviews, and comp reporting.',
    cta: 'Open job information',
    separatorLabel: 'What you can define',
    features: [
      {
        icon: Icon.TYPES.BRIEFCASE_OUTLINE,
        title: 'Job titles',
        description: 'Standard titles by department with salary bands.',
        benefits: ['Consistent across offer letters', 'Feeds into compensation reports', 'Used for benchmarking'],
        ctaLabel: 'View job titles',
      },
      {
        icon: Icon.TYPES.BAR_CHART_OUTLINE,
        title: 'Job levels',
        description: 'Career progression framework from IC to Staff+.',
        benefits: ['Defines career ladders', 'Structures compensation bands', 'Drives promotion workflows'],
        ctaLabel: 'View job levels',
      },
      {
        icon: Icon.TYPES.DEPARTMENTS_OUTLINE,
        title: 'Department mapping',
        description: 'Link titles and levels to specific departments.',
        benefits: ['Department-specific titles', 'Org-wide consistency', 'Headcount planning'],
        ctaLabel: 'View mapping',
      },
      {
        icon: Icon.TYPES.SHARE_OUTLINE,
        title: 'Compensation bands',
        description: 'Salary ranges tied to levels and roles.',
        benefits: ['Pay equity analysis', 'Offer letter defaults', 'Budget planning inputs'],
        ctaLabel: 'View bands',
      },
    ],
  },
  3: {
    title: 'Configure how employees move through your company',
    subtitle: 'Define employee statuses, onboarding stages, and offboarding reasons. These settings shape what happens when someone joins, changes roles, or leaves.',
    cta: 'Open employee lifecycle',
    separatorLabel: 'What you can configure',
    features: [
      {
        icon: Icon.TYPES.CHECK_CIRCLE_OUTLINE,
        title: 'Employee statuses',
        description: 'Active, on leave, terminated — with headcount tracking.',
        benefits: ['Drives payroll eligibility', 'Controls system access', 'Powers headcount reports'],
        ctaLabel: 'View statuses',
      },
      {
        icon: Icon.TYPES.PROVISION_USERS_ONBOARD_OUTLINE,
        title: 'Onboarding stages',
        description: 'Pre-boarding through month 1 task checklists.',
        benefits: ['Automated task assignment', 'Completion tracking', 'New hire experience'],
        ctaLabel: 'View stages',
      },
      {
        icon: Icon.TYPES.PROVISION_USERS_OFFBOARD_OUTLINE,
        title: 'Offboarding reasons',
        description: 'Separation codes for compliance and reporting.',
        benefits: ['Required for unemployment filings', 'Attrition analytics', 'Exit interview routing'],
        ctaLabel: 'View reasons',
      },
      {
        icon: Icon.TYPES.HIERARCHY_HORIZONTAL_OUTLINE,
        title: 'Lifecycle transitions',
        description: 'What triggers when status changes happen.',
        benefits: ['Automatic access revocation', 'Document collection', 'Workflow triggers'],
        ctaLabel: 'View transitions',
      },
    ],
  },
};

// ── Component ────────────────────────────────────────

export interface OrganizationalDataPageProps {
  onNavigate?: (page: string) => void;
  activeTabIndex?: number;
}

export const OrganizationalDataPage: React.FC<OrganizationalDataPageProps> = ({ activeTabIndex = 0 }) => {
  const { theme } = usePebbleTheme();
  const [dismissedTabs, setDismissedTabs] = useState<Set<number>>(new Set());

  const dismissTab = useCallback((tabIndex: number) => {
    setDismissedTabs(prev => new Set([...prev, tabIndex]));
  }, []);

  const primerConfig = TAB_PRIMERS[activeTabIndex];
  const showPrimer = primerConfig && !dismissedTabs.has(activeTabIndex);

  if (showPrimer) {
    const variant = primerConfig.variant ?? 'capability';
    const heroVisual = primerConfig.visual ? <OrgChartPlaceholder theme={theme} /> : undefined;

    return (
      <PlatformPrimer
        hero={{
          title: primerConfig.title,
          subtitle: primerConfig.subtitle,
          primaryAction: { label: primerConfig.cta, onClick: () => dismissTab(activeTabIndex) },
          layout: primerConfig.layout ?? 'stacked',
          titleSize: 'title',
          visual: heroVisual,
          ...(heroVisual ? { visualMinWidth: 420, visualMaxWidth: 420 } : {}),
        }}
        discoverySlotVariant={variant}
        discoverySlotCapability={variant === 'capability' && primerConfig.features ? {
          separatorLabel: primerConfig.separatorLabel,
          features: primerConfig.features,
          onCta: () => dismissTab(activeTabIndex),
        } : undefined}
        discoverySlotUnlock={variant === 'unlock' && primerConfig.unlockItems ? {
          category: primerConfig.separatorLabel,
          categorySubtitle: primerConfig.unlockSubtitle,
          items: primerConfig.unlockItems,
          iconVariant: 'accent',
        } : undefined}
        size="md"
      />
    );
  }

  return (
    <PageContainer theme={theme} size="md">
      {activeTabIndex === 0 && (
        <>
          {/* Information */}
          <SectionCard theme={theme}>
            <SectionHeader theme={theme}>
              <SectionHeaderLeft>
                <SectionTitle theme={theme}>Information</SectionTitle>
                <SectionSubtitle theme={theme}>Basic company information and legal details</SectionSubtitle>
              </SectionHeaderLeft>
            </SectionHeader>
            <SectionContent theme={theme}>
              {INFO_ROWS.map((row) => (
                <InfoRow key={row.label} theme={theme}>
                  <InfoLabel theme={theme}>{row.label}</InfoLabel>
                  <InfoValue theme={theme}>{row.value}</InfoValue>
                  <InfoEditWrap theme={theme}>
                    <Button
                      appearance={Button.APPEARANCES.GHOST}
                      size={Button.SIZES.S}
                      onClick={() => {}}
                    >
                      Edit
                    </Button>
                  </InfoEditWrap>
                </InfoRow>
              ))}
            </SectionContent>
          </SectionCard>

          {/* Work Email Domains */}
          <SectionCard theme={theme}>
            <SectionHeader theme={theme}>
              <SectionHeaderLeft>
                <SectionTitle theme={theme}>Work Email Domains</SectionTitle>
                <SectionSubtitle theme={theme}>Domains used for employee work emails</SectionSubtitle>
              </SectionHeaderLeft>
              <Button
                appearance={Button.APPEARANCES.OUTLINE}
                size={Button.SIZES.S}
                icon={Icon.TYPES.ADD}
                onClick={() => {}}
              >
                Add Domain
              </Button>
            </SectionHeader>
            <SectionContent theme={theme}>
              <SectionSubtitle theme={theme} style={{ marginBottom: theme.space200 }}>
                {EMAIL_DOMAINS.length} items
              </SectionSubtitle>
              <TableWrapper theme={theme}>
                <TableBasic>
                  <TableBasic.THead>
                    <TableBasic.Tr>
                      <TableBasic.Th>Domain</TableBasic.Th>
                      <TableBasic.Th>Status</TableBasic.Th>
                      <TableBasic.Th>Primary</TableBasic.Th>
                    </TableBasic.Tr>
                  </TableBasic.THead>
                  <TableBasic.TBody>
                    {EMAIL_DOMAINS.map((row) => (
                      <TableBasic.Tr key={row.domain}>
                        <TableBasic.Td>{row.domain}</TableBasic.Td>
                        <TableBasic.Td>{row.status}</TableBasic.Td>
                        <TableBasic.Td>{row.primary}</TableBasic.Td>
                      </TableBasic.Tr>
                    ))}
                  </TableBasic.TBody>
                </TableBasic>
              </TableWrapper>
            </SectionContent>
          </SectionCard>

          {/* Entities */}
          <SectionCard theme={theme}>
            <SectionHeader theme={theme}>
              <SectionHeaderLeft>
                <SectionTitle theme={theme}>Entities</SectionTitle>
                <SectionSubtitle theme={theme}>Legal entities within your organization</SectionSubtitle>
              </SectionHeaderLeft>
              <Button
                appearance={Button.APPEARANCES.OUTLINE}
                size={Button.SIZES.S}
                icon={Icon.TYPES.ADD}
                onClick={() => {}}
              >
                Add Entity
              </Button>
            </SectionHeader>
            <SectionContent theme={theme}>
              <SectionSubtitle theme={theme} style={{ marginBottom: theme.space200 }}>
                {ENTITIES.length} items
              </SectionSubtitle>
              <TableWrapper theme={theme}>
                <TableBasic>
                  <TableBasic.THead>
                    <TableBasic.Tr>
                      <TableBasic.Th>Entity Name</TableBasic.Th>
                      <TableBasic.Th>Type</TableBasic.Th>
                      <TableBasic.Th>Country</TableBasic.Th>
                      <TableBasic.Th>Employees</TableBasic.Th>
                    </TableBasic.Tr>
                  </TableBasic.THead>
                  <TableBasic.TBody>
                    {ENTITIES.map((row) => (
                      <TableBasic.Tr key={row.name}>
                        <TableBasic.Td>{row.name}</TableBasic.Td>
                        <TableBasic.Td>{row.type}</TableBasic.Td>
                        <TableBasic.Td>{row.country}</TableBasic.Td>
                        <TableBasic.Td>{row.employees}</TableBasic.Td>
                      </TableBasic.Tr>
                    ))}
                  </TableBasic.TBody>
                </TableBasic>
              </TableWrapper>
              <ViewAllLink theme={theme}>View all {ENTITIES.length} items</ViewAllLink>
            </SectionContent>
          </SectionCard>

          {/* Work Locations */}
          <SectionCard theme={theme}>
            <SectionHeader theme={theme}>
              <SectionHeaderLeft>
                <SectionTitle theme={theme}>Work Locations</SectionTitle>
                <SectionSubtitle theme={theme}>Physical office locations and remote work settings</SectionSubtitle>
              </SectionHeaderLeft>
              <Button
                appearance={Button.APPEARANCES.OUTLINE}
                size={Button.SIZES.S}
                icon={Icon.TYPES.ADD}
                onClick={() => {}}
              >
                Add Location
              </Button>
            </SectionHeader>
            <SectionContent theme={theme}>
              <SectionSubtitle theme={theme} style={{ marginBottom: theme.space200 }}>
                {WORK_LOCATIONS.length} items
              </SectionSubtitle>
              <TableWrapper theme={theme}>
                <TableBasic>
                  <TableBasic.THead>
                    <TableBasic.Tr>
                      <TableBasic.Th>Location</TableBasic.Th>
                      <TableBasic.Th>Address</TableBasic.Th>
                      <TableBasic.Th>Type</TableBasic.Th>
                      <TableBasic.Th>Employees</TableBasic.Th>
                    </TableBasic.Tr>
                  </TableBasic.THead>
                  <TableBasic.TBody>
                    {WORK_LOCATIONS.map((row) => (
                      <TableBasic.Tr key={row.location}>
                        <TableBasic.Td>{row.location}</TableBasic.Td>
                        <TableBasic.Td>{row.address}</TableBasic.Td>
                        <TableBasic.Td>{row.type}</TableBasic.Td>
                        <TableBasic.Td>{row.employees}</TableBasic.Td>
                      </TableBasic.Tr>
                    ))}
                  </TableBasic.TBody>
                </TableBasic>
              </TableWrapper>
              <ViewAllLink theme={theme}>View all {WORK_LOCATIONS.length} items</ViewAllLink>
            </SectionContent>
          </SectionCard>
        </>
      )}

      {activeTabIndex === 1 && (
        <>
          {/* Org Structure data view — placeholder for when primer is dismissed */}
          <SectionCard theme={theme}>
            <SectionHeader theme={theme}>
              <SectionHeaderLeft>
                <SectionTitle theme={theme}>Departments</SectionTitle>
                <SectionSubtitle theme={theme}>Organizational units and team structure</SectionSubtitle>
              </SectionHeaderLeft>
              <Button
                appearance={Button.APPEARANCES.OUTLINE}
                size={Button.SIZES.S}
                icon={Icon.TYPES.ADD}
                onClick={() => {}}
              >
                Add Department
              </Button>
            </SectionHeader>
            <SectionContent theme={theme}>
              <OrgChartPlaceholder theme={theme} />
            </SectionContent>
          </SectionCard>
        </>
      )}

      {activeTabIndex === 2 && (
        <>
          {/* Job Titles */}
          <SectionCard theme={theme}>
            <SectionHeader theme={theme}>
              <SectionHeaderLeft>
                <SectionTitle theme={theme}>Job Titles</SectionTitle>
                <SectionSubtitle theme={theme}>Standard job titles and compensation bands by department</SectionSubtitle>
              </SectionHeaderLeft>
              <Button
                appearance={Button.APPEARANCES.OUTLINE}
                size={Button.SIZES.S}
                icon={Icon.TYPES.ADD}
                onClick={() => {}}
              >
                Add Job Title
              </Button>
            </SectionHeader>
            <SectionContent theme={theme}>
              <SectionSubtitle theme={theme} style={{ marginBottom: theme.space200 }}>
                {JOB_TITLES.length} job titles
              </SectionSubtitle>
              <TableWrapper theme={theme}>
                <TableBasic>
                  <TableBasic.THead>
                    <TableBasic.Tr>
                      <TableBasic.Th>Title</TableBasic.Th>
                      <TableBasic.Th>Department</TableBasic.Th>
                      <TableBasic.Th>Level</TableBasic.Th>
                      <TableBasic.Th>Salary Band</TableBasic.Th>
                      <TableBasic.Th>Headcount</TableBasic.Th>
                    </TableBasic.Tr>
                  </TableBasic.THead>
                  <TableBasic.TBody>
                    {JOB_TITLES.map((row) => (
                      <TableBasic.Tr key={row.title}>
                        <TableBasic.Td>{row.title}</TableBasic.Td>
                        <TableBasic.Td>{row.department}</TableBasic.Td>
                        <TableBasic.Td>{row.level}</TableBasic.Td>
                        <TableBasic.Td>{row.salaryBand}</TableBasic.Td>
                        <TableBasic.Td>{row.headcount}</TableBasic.Td>
                      </TableBasic.Tr>
                    ))}
                  </TableBasic.TBody>
                </TableBasic>
              </TableWrapper>
              <ViewAllLink theme={theme}>View all {JOB_TITLES.length} job titles</ViewAllLink>
            </SectionContent>
          </SectionCard>

          {/* Job Levels */}
          <SectionCard theme={theme}>
            <SectionHeader theme={theme}>
              <SectionHeaderLeft>
                <SectionTitle theme={theme}>Job Levels</SectionTitle>
                <SectionSubtitle theme={theme}>Level definitions and career progression framework</SectionSubtitle>
              </SectionHeaderLeft>
              <Button
                appearance={Button.APPEARANCES.OUTLINE}
                size={Button.SIZES.S}
                icon={Icon.TYPES.ADD}
                onClick={() => {}}
              >
                Add Level
              </Button>
            </SectionHeader>
            <SectionContent theme={theme}>
              <TableWrapper theme={theme}>
                <TableBasic>
                  <TableBasic.THead>
                    <TableBasic.Tr>
                      <TableBasic.Th>Level</TableBasic.Th>
                      <TableBasic.Th>Name</TableBasic.Th>
                      <TableBasic.Th>Typical Range</TableBasic.Th>
                    </TableBasic.Tr>
                  </TableBasic.THead>
                  <TableBasic.TBody>
                    {JOB_LEVELS.map((row) => (
                      <TableBasic.Tr key={row.level}>
                        <TableBasic.Td>{row.level}</TableBasic.Td>
                        <TableBasic.Td>{row.name}</TableBasic.Td>
                        <TableBasic.Td>{row.typicalRange}</TableBasic.Td>
                      </TableBasic.Tr>
                    ))}
                  </TableBasic.TBody>
                </TableBasic>
              </TableWrapper>
            </SectionContent>
          </SectionCard>
        </>
      )}

      {activeTabIndex === 3 && (
        <>
          {/* Employee Statuses */}
          <SectionCard theme={theme}>
            <SectionHeader theme={theme}>
              <SectionHeaderLeft>
                <SectionTitle theme={theme}>Employee Statuses</SectionTitle>
                <SectionSubtitle theme={theme}>Status definitions and current headcount by status</SectionSubtitle>
              </SectionHeaderLeft>
              <Button
                appearance={Button.APPEARANCES.OUTLINE}
                size={Button.SIZES.S}
                icon={Icon.TYPES.ADD}
                onClick={() => {}}
              >
                Add Status
              </Button>
            </SectionHeader>
            <SectionContent theme={theme}>
              <TableWrapper theme={theme}>
                <TableBasic>
                  <TableBasic.THead>
                    <TableBasic.Tr>
                      <TableBasic.Th>Status</TableBasic.Th>
                      <TableBasic.Th>Description</TableBasic.Th>
                      <TableBasic.Th>Count</TableBasic.Th>
                    </TableBasic.Tr>
                  </TableBasic.THead>
                  <TableBasic.TBody>
                    {EMPLOYEE_STATUSES.map((row) => (
                      <TableBasic.Tr key={row.status}>
                        <TableBasic.Td>{row.status}</TableBasic.Td>
                        <TableBasic.Td>{row.description}</TableBasic.Td>
                        <TableBasic.Td>{row.count}</TableBasic.Td>
                      </TableBasic.Tr>
                    ))}
                  </TableBasic.TBody>
                </TableBasic>
              </TableWrapper>
            </SectionContent>
          </SectionCard>

          {/* Onboarding */}
          <SectionCard theme={theme}>
            <SectionHeader theme={theme}>
              <SectionHeaderLeft>
                <SectionTitle theme={theme}>Onboarding Stages</SectionTitle>
                <SectionSubtitle theme={theme}>Default onboarding checklist stages and typical completion times</SectionSubtitle>
              </SectionHeaderLeft>
              <Button
                appearance={Button.APPEARANCES.OUTLINE}
                size={Button.SIZES.S}
                icon={Icon.TYPES.ADD}
                onClick={() => {}}
              >
                Add Stage
              </Button>
            </SectionHeader>
            <SectionContent theme={theme}>
              <TableWrapper theme={theme}>
                <TableBasic>
                  <TableBasic.THead>
                    <TableBasic.Tr>
                      <TableBasic.Th>Stage</TableBasic.Th>
                      <TableBasic.Th>Tasks</TableBasic.Th>
                      <TableBasic.Th>Avg. Days</TableBasic.Th>
                    </TableBasic.Tr>
                  </TableBasic.THead>
                  <TableBasic.TBody>
                    {ONBOARDING_STAGES.map((row) => (
                      <TableBasic.Tr key={row.stage}>
                        <TableBasic.Td>{row.stage}</TableBasic.Td>
                        <TableBasic.Td>{row.tasks}</TableBasic.Td>
                        <TableBasic.Td>{row.avgDays}</TableBasic.Td>
                      </TableBasic.Tr>
                    ))}
                  </TableBasic.TBody>
                </TableBasic>
              </TableWrapper>
            </SectionContent>
          </SectionCard>

          {/* Offboarding Reasons */}
          <SectionCard theme={theme}>
            <SectionHeader theme={theme}>
              <SectionHeaderLeft>
                <SectionTitle theme={theme}>Offboarding Reasons</SectionTitle>
                <SectionSubtitle theme={theme}>Termination and separation reason codes for reporting</SectionSubtitle>
              </SectionHeaderLeft>
              <Button
                appearance={Button.APPEARANCES.OUTLINE}
                size={Button.SIZES.S}
                icon={Icon.TYPES.ADD}
                onClick={() => {}}
              >
                Add Reason
              </Button>
            </SectionHeader>
            <SectionContent theme={theme}>
              <TableWrapper theme={theme}>
                <TableBasic>
                  <TableBasic.THead>
                    <TableBasic.Tr>
                      <TableBasic.Th>Reason</TableBasic.Th>
                      <TableBasic.Th>Count</TableBasic.Th>
                    </TableBasic.Tr>
                  </TableBasic.THead>
                  <TableBasic.TBody>
                    {OFFBOARDING_REASONS.map((row) => (
                      <TableBasic.Tr key={row.reason}>
                        <TableBasic.Td>{row.reason}</TableBasic.Td>
                        <TableBasic.Td>{row.count}</TableBasic.Td>
                      </TableBasic.Tr>
                    ))}
                  </TableBasic.TBody>
                </TableBasic>
              </TableWrapper>
              <ViewAllLink theme={theme}>View all offboarding records</ViewAllLink>
            </SectionContent>
          </SectionCard>
        </>
      )}
    </PageContainer>
  );
};

export default OrganizationalDataPage;
