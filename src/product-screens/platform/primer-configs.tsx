import React from 'react';
import styled from '@emotion/styled';
import Icon from '@rippling/pebble/Icon';
import { StyledTheme } from '@/utils/theme';
import type { FeatureCardGridItem, FeatureCardDetailConfig, TemplateRecipe, DiscoverySlotVariant, SecondaryDiscoveryItem } from '@/spec';

// ── Types ────────────────────────────────────────────────

export interface PrimerPageConfig {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  heroSecondaryText?: string;
  heroVisual?: React.ReactNode;
  heroVisualWidth?: number;
  fullPage?: boolean;
  fullPageTitle?: string;
  fullPageIconFilled?: string;
  defaultVariant: DiscoverySlotVariant;
  template?: {
    linkLabel: string;
    recipes: TemplateRecipe[];
  };
  capability?: {
    separatorLabel: string;
    features: FeatureCardDetailConfig[];
  };
  unlock?: {
    category: string;
    categorySubtitle?: string;
    items: FeatureCardGridItem[];
  };
  secondaryDiscovery?: {
    label: string;
    items: SecondaryDiscoveryItem[];
  };
}

// ── Hero Visuals ─────────────────────────────────────────

const FRAME_RADIUS = '16px';
const VISUAL_WIDTH = 370;

const VisualFrame = styled.div`
  width: ${VISUAL_WIDTH}px;
  height: 350px;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceDim};
  border: 6px solid ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-radius: ${FRAME_RADIUS};
  box-shadow: 0 0 0 1px ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space1000};
  padding-right: ${({ theme }) => (theme as StyledTheme).space800};
  box-sizing: border-box;
`;

const VisualList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const VisualRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space300};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
`;

const VisualRowName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const VisualRowMeta = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const VisualLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin-top: ${({ theme }) => (theme as StyledTheme).space200};
  text-align: right;
`;

const VisualWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: ${VISUAL_WIDTH}px !important;
  min-width: ${VISUAL_WIDTH}px !important;
  max-width: ${VISUAL_WIDTH}px !important;
  flex-shrink: 0;
  box-sizing: border-box;
`;

// ── Shared visual primitives ─────────────────────────────

const Narrative = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  line-height: 1.35;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space200};
`;

const CategoryLabel = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  letter-spacing: 0.4px;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space100};
`;

const BarRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 80px;
  padding-top: ${({ theme }) => (theme as StyledTheme).space200};
`;

const Bar = styled.div<{ $h: number; $accent?: boolean }>`
  flex: 1;
  height: ${({ $h }) => $h}%;
  min-height: 4px;
  border-radius: 3px 3px 0 0;
  background: ${({ theme, $accent }) => $accent
    ? (theme as StyledTheme).colorOnSurface
    : (theme as StyledTheme).colorSurfaceContainerHigh};
  opacity: ${({ $accent }) => $accent ? 1 : 0.6};
`;

const BarLabels = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
`;

const BarLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  font-size: 10px;
`;

const StatRow = styled.div`
  display: flex;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  margin-top: ${({ theme }) => (theme as StyledTheme).space200};
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
`;

const StatValue = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const StatLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  font-size: 10px;
`;

// Funnel primitives (Documents)
const FunnelStep = styled.div<{ $width: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: ${({ $width }) => $width}%;
  padding: ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space300};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
`;

const FunnelStack = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  width: 100%;
`;

// ── Reports — featured recipe visual ─────────────────────

const FEATURED_RECIPES = [
  { icon: Icon.TYPES.USERS_OUTLINE, title: 'Headcount by department', description: 'Current employee count by department and location.' },
  { icon: Icon.TYPES.LEAVE_MANAGEMENT_OUTLINED, title: 'Time off balances', description: 'Accrued, used, and remaining PTO.' },
  { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Payroll summary', description: 'Total payroll costs with tax breakdowns.' },
  { icon: Icon.TYPES.HEART_OUTLINE, title: 'Benefits enrollment', description: 'Enrollment rates and plan distribution.' },
  { icon: Icon.TYPES.CREDIT_CARD_OUTLINE, title: 'Spend by category', description: 'Expense totals by category and period.' },
  { icon: Icon.TYPES.LAPTOP_OUTLINE, title: 'IT asset inventory', description: 'Devices by type, status, and owner.' },
];

const RecipeVisualRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  padding: ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space300};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
`;

const RecipeVisualIcon = styled.div`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerMd};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RecipeVisualText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
`;

const RecipeVisualTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RecipeVisualDesc = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.3;
`;

export const ReportsVisual: React.FC<{ theme: StyledTheme }> = ({ theme }) => (
  <VisualWrapper theme={theme}>
    <VisualFrame theme={theme}>
      <VisualList theme={theme}>
        {FEATURED_RECIPES.map((r) => (
          <RecipeVisualRow key={r.title} theme={theme}>
            <RecipeVisualIcon theme={theme}>
              <Icon type={r.icon} size={13} />
            </RecipeVisualIcon>
            <RecipeVisualText theme={theme}>
              <RecipeVisualTitle theme={theme}>{r.title}</RecipeVisualTitle>
              <RecipeVisualDesc theme={theme}>{r.description}</RecipeVisualDesc>
            </RecipeVisualText>
          </RecipeVisualRow>
        ))}
      </VisualList>
    </VisualFrame>
    <VisualLabel theme={theme}>Report templates</VisualLabel>
  </VisualWrapper>
);

// ── Data Catalog — object inventory ──────────────────────

const CATALOG_OBJECTS = [
  { name: 'Employees', type: 'Core', records: '245' },
  { name: 'Pay runs', type: 'Payroll', records: '12' },
  { name: 'Policies', type: 'Core', records: '8' },
  { name: 'Time off requests', type: 'Time', records: '34' },
  { name: 'Departments', type: 'Org', records: '18' },
  { name: 'Benefits enrollments', type: 'Benefits', records: '89' },
  { name: 'Custom fields', type: 'Core', records: '156' },
  { name: 'Job postings', type: 'Recruiting', records: '23' },
  { name: 'Comp bands', type: 'Comp', records: '41' },
  { name: 'Documents', type: 'Docs', records: '312' },
  { name: 'Approval workflows', type: 'Workflows', records: '7' },
  { name: 'Training assignments', type: 'Learning', records: '204' },
];

export const DataCatalogVisual: React.FC<{ theme: StyledTheme }> = ({ theme }) => (
  <VisualWrapper theme={theme}>
    <VisualFrame theme={theme}>
      <VisualList theme={theme}>
        {CATALOG_OBJECTS.map((obj) => (
          <VisualRow key={obj.name} theme={theme}>
            <VisualRowName theme={theme}>{obj.name}</VisualRowName>
            <VisualRowMeta theme={theme}>{obj.type} · {obj.records} records</VisualRowMeta>
          </VisualRow>
        ))}
      </VisualList>
    </VisualFrame>
    <VisualLabel theme={theme}>Data catalog preview</VisualLabel>
  </VisualWrapper>
);

// ── Documents — pipeline funnel ──────────────────────────

const FUNNEL_STEPS = [
  { label: 'Templates created', count: 24, width: 100 },
  { label: 'Packets sent', count: 18, width: 82 },
  { label: 'Signatures collected', count: 14, width: 64 },
  { label: 'Completed', count: 11, width: 48 },
];

export const DocumentsVisual: React.FC<{ theme: StyledTheme }> = ({ theme }) => (
  <VisualWrapper theme={theme}>
    <VisualFrame theme={theme}>
      <CategoryLabel theme={theme}>Document pipeline</CategoryLabel>
      <Narrative theme={theme}>11 of 24 packets fully completed this quarter</Narrative>
      <FunnelStack theme={theme}>
        {FUNNEL_STEPS.map(step => (
          <FunnelStep key={step.label} theme={theme} $width={step.width}>
            <VisualRowName theme={theme} style={{ fontSize: 11 }}>{step.label}</VisualRowName>
            <VisualRowMeta theme={theme}>{step.count}</VisualRowMeta>
          </FunnelStep>
        ))}
      </FunnelStack>
      <StatRow theme={theme}>
        <Stat><StatValue theme={theme}>46%</StatValue><StatLabel theme={theme}>completion rate</StatLabel></Stat>
        <Stat><StatValue theme={theme}>2.1d</StatValue><StatLabel theme={theme}>avg time to sign</StatLabel></Stat>
      </StatRow>
    </VisualFrame>
    <VisualLabel theme={theme}>Document funnel</VisualLabel>
  </VisualWrapper>
);

// ── Data Pipelines — sync cadence + health ───────────────

const SYNC_BARS = [60, 75, 85, 90, 95, 80, 70];
const SYNC_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const DataPipelinesVisual: React.FC<{ theme: StyledTheme }> = ({ theme }) => (
  <VisualWrapper theme={theme}>
    <VisualFrame theme={theme}>
      <CategoryLabel theme={theme}>Sync health · last 7 days</CategoryLabel>
      <Narrative theme={theme}>12,450 records exported — 30% faster than last week</Narrative>
      <BarRow theme={theme}>
        {SYNC_BARS.map((h, i) => (
          <Bar key={i} theme={theme} $h={h} $accent={i === 4} />
        ))}
      </BarRow>
      <BarLabels>
        {SYNC_DAYS.map((d, i) => <BarLabel key={i} theme={theme}>{d}</BarLabel>)}
      </BarLabels>
      <StatRow theme={theme}>
        <Stat><StatValue theme={theme}>12.4k</StatValue><StatLabel theme={theme}>records last sync</StatLabel></Stat>
        <Stat><StatValue theme={theme}>3</StatValue><StatLabel theme={theme}>active pipelines</StatLabel></Stat>
      </StatRow>
    </VisualFrame>
    <VisualLabel theme={theme}>Pipeline activity</VisualLabel>
  </VisualWrapper>
);

// ── Approvals — request velocity + resolution ────────────

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const APPROVAL_BARS = [40, 65, 80, 55, 30];

export const ApprovalsVisual: React.FC<{ theme: StyledTheme }> = ({ theme }) => (
  <VisualWrapper theme={theme}>
    <VisualFrame theme={theme}>
      <CategoryLabel theme={theme}>Approval velocity</CategoryLabel>
      <Narrative theme={theme}>Avg approval time dropped from 3 days to 1 this month</Narrative>
      <BarRow theme={theme}>
        {APPROVAL_BARS.map((h, i) => (
          <Bar key={i} theme={theme} $h={h} $accent={i === 3 || i === 4} />
        ))}
      </BarRow>
      <BarLabels>
        {DAYS.map(d => <BarLabel key={d} theme={theme}>{d}</BarLabel>)}
      </BarLabels>
      <StatRow theme={theme}>
        <Stat><StatValue theme={theme}>1.1d</StatValue><StatLabel theme={theme}>avg resolution</StatLabel></Stat>
        <Stat><StatValue theme={theme}>5</StatValue><StatLabel theme={theme}>waiting 48h+</StatLabel></Stat>
      </StatRow>
    </VisualFrame>
    <VisualLabel theme={theme}>Approval trends</VisualLabel>
  </VisualWrapper>
);

// ── Developer — API calls + webhook fire rate ────────────

const API_BARS = [50, 55, 70, 85, 95, 75, 60];

export const DeveloperVisual: React.FC<{ theme: StyledTheme }> = ({ theme }) => (
  <VisualWrapper theme={theme}>
    <VisualFrame theme={theme}>
      <CategoryLabel theme={theme}>API & webhook activity</CategoryLabel>
      <Narrative theme={theme}>Your webhook fired 1,247 times this week — up 40%</Narrative>
      <BarRow theme={theme}>
        {API_BARS.map((h, i) => (
          <Bar key={i} theme={theme} $h={h} $accent={i === 4} />
        ))}
      </BarRow>
      <BarLabels>
        {SYNC_DAYS.map((d, i) => <BarLabel key={i} theme={theme}>{d}</BarLabel>)}
      </BarLabels>
      <StatRow theme={theme}>
        <Stat><StatValue theme={theme}>1,247</StatValue><StatLabel theme={theme}>webhook fires</StatLabel></Stat>
        <Stat><StatValue theme={theme}>3.2k</StatValue><StatLabel theme={theme}>API calls</StatLabel></Stat>
      </StatRow>
    </VisualFrame>
    <VisualLabel theme={theme}>Developer activity</VisualLabel>
  </VisualWrapper>
);

// ── Workflow Studio — run frequency + impact ─────────────

const WF_BARS = [25, 40, 70, 55, 90, 60, 45];

export const WorkflowStudioVisual: React.FC<{ theme: StyledTheme }> = ({ theme }) => (
  <VisualWrapper theme={theme}>
    <VisualFrame theme={theme}>
      <CategoryLabel theme={theme}>Workflow runs · last 7 days</CategoryLabel>
      <Narrative theme={theme}>Onboarding workflow ran 47 times — est. 94 hours saved</Narrative>
      <BarRow theme={theme}>
        {WF_BARS.map((h, i) => (
          <Bar key={i} theme={theme} $h={h} $accent={i === 4} />
        ))}
      </BarRow>
      <BarLabels>
        {SYNC_DAYS.map((d, i) => <BarLabel key={i} theme={theme}>{d}</BarLabel>)}
      </BarLabels>
      <StatRow theme={theme}>
        <Stat><StatValue theme={theme}>47</StatValue><StatLabel theme={theme}>total runs</StatLabel></Stat>
        <Stat><StatValue theme={theme}>94h</StatValue><StatLabel theme={theme}>est. saved</StatLabel></Stat>
      </StatRow>
    </VisualFrame>
    <VisualLabel theme={theme}>Workflow impact</VisualLabel>
  </VisualWrapper>
);

// ── Object Permissions — permission profiles list ────────

const PERMISSION_PROFILES = [
  { name: 'HR Admin', access: 'Full access', fields: '142 fields' },
  { name: 'Manager', access: 'Read + team', fields: '86 fields' },
  { name: 'Finance', access: 'Payroll only', fields: '34 fields' },
  { name: 'Recruiter', access: 'Candidates', fields: '28 fields' },
  { name: 'IT Admin', access: 'Devices + apps', fields: '51 fields' },
  { name: 'Employee', access: 'Self only', fields: '18 fields' },
  { name: 'Auditor', access: 'Read only', fields: '96 fields' },
  { name: 'Contractor', access: 'Limited', fields: '12 fields' },
];

export const ObjectPermissionsVisual: React.FC<{ theme: StyledTheme }> = ({ theme }) => (
  <VisualWrapper theme={theme}>
    <VisualFrame theme={theme}>
      <VisualList theme={theme}>
        {PERMISSION_PROFILES.map((p) => (
          <VisualRow key={p.name} theme={theme}>
            <VisualRowName theme={theme}>{p.name}</VisualRowName>
            <VisualRowMeta theme={theme}>{p.access} · {p.fields}</VisualRowMeta>
          </VisualRow>
        ))}
      </VisualList>
    </VisualFrame>
    <VisualLabel theme={theme}>Permission profiles</VisualLabel>
  </VisualWrapper>
);

// ── Activity Log — recent event list ─────────────────────

const ACTIVITY_EVENTS = [
  { actor: 'Sarah K.', action: 'Updated payroll settings', time: '2h ago' },
  { actor: 'Mike R.', action: 'Added new employee', time: '3h ago' },
  { actor: 'Lisa T.', action: 'Modified permissions', time: '5h ago' },
  { actor: 'James W.', action: 'Exported SOC 2 report', time: '6h ago' },
  { actor: 'Anna P.', action: 'Changed security policy', time: '1d ago' },
  { actor: 'David L.', action: 'Logged in from new device', time: '1d ago' },
  { actor: 'Karen M.', action: 'Created approval chain', time: '1d ago' },
  { actor: 'Tom B.', action: 'Ran payroll', time: '2d ago' },
  { actor: 'Rachel S.', action: 'Updated benefits plan', time: '2d ago' },
  { actor: 'Chris D.', action: 'Revoked app access', time: '2d ago' },
  { actor: 'Nina F.', action: 'Added work location', time: '3d ago' },
  { actor: 'Alex J.', action: 'Changed MFA policy', time: '3d ago' },
];

export const ActivityLogVisual: React.FC<{ theme: StyledTheme }> = ({ theme }) => (
  <VisualWrapper theme={theme}>
    <VisualFrame theme={theme}>
      <VisualList theme={theme}>
        {ACTIVITY_EVENTS.map((evt) => (
          <VisualRow key={evt.actor} theme={theme}>
            <VisualRowName theme={theme}>{evt.actor}</VisualRowName>
            <VisualRowMeta theme={theme}>{evt.action} · {evt.time}</VisualRowMeta>
          </VisualRow>
        ))}
      </VisualList>
    </VisualFrame>
    <VisualLabel theme={theme}>Activity log preview</VisualLabel>
  </VisualWrapper>
);

// ── Flow Configuration — customization health ────────────

const FLOW_CONFIG_ROWS = [
  { name: 'Hiring flow', status: 'Customized', fields: '14 fields' },
  { name: 'Onboarding flow', status: 'Customized', fields: '22 fields' },
  { name: 'Offboarding flow', status: 'Default', fields: '8 fields' },
  { name: 'Role change flow', status: 'Default', fields: '6 fields' },
  { name: 'Benefits enrollment', status: 'Customized', fields: '10 fields' },
  { name: 'Document rules', status: 'Customized', fields: '5 rules' },
  { name: 'Custom questions', status: '3 added', fields: '3 fields' },
  { name: 'Device settings', status: 'Default', fields: '4 fields' },
  { name: 'Tax forms', status: 'Customized', fields: '2 states' },
  { name: 'Work authorization', status: 'Default', fields: '6 fields' },
  { name: 'EEO reporting', status: 'Default', fields: '4 fields' },
  { name: 'Emergency contacts', status: 'Required', fields: '3 fields' },
];

export const FlowConfigVisual: React.FC<{ theme: StyledTheme }> = ({ theme }) => (
  <VisualWrapper theme={theme}>
    <VisualFrame theme={theme}>
      <VisualList theme={theme}>
        {FLOW_CONFIG_ROWS.map((row) => (
          <VisualRow key={row.name} theme={theme}>
            <VisualRowName theme={theme}>{row.name}</VisualRowName>
            <VisualRowMeta theme={theme}>{row.status} · {row.fields}</VisualRowMeta>
          </VisualRow>
        ))}
      </VisualList>
    </VisualFrame>
    <VisualLabel theme={theme}>Flow configuration</VisualLabel>
  </VisualWrapper>
);

// ── Permissions — role profiles ──────────────────────────

const PERMISSION_ROLES = [
  { name: 'Super Admin', level: 'Full access', features: 'All features' },
  { name: 'HR Admin', level: 'Full HR access', features: '24 features' },
  { name: 'Manager', level: 'Team only', features: '12 features' },
  { name: 'Finance', level: 'Finance & payroll', features: '8 features' },
  { name: 'Recruiter', level: 'Hiring tools', features: '6 features' },
  { name: 'IT Admin', level: 'IT & devices', features: '10 features' },
  { name: 'Benefits Admin', level: 'Benefits only', features: '5 features' },
  { name: 'Employee', level: 'Self-service', features: '4 features' },
  { name: 'Contractor', level: 'Limited', features: '3 features' },
  { name: 'Auditor', level: 'Read-only', features: '18 features' },
  { name: 'Payroll Admin', level: 'Payroll access', features: '7 features' },
  { name: 'Custom Role', level: 'Custom', features: '9 features' },
];

export const PermissionsVisual: React.FC<{ theme: StyledTheme }> = ({ theme }) => (
  <VisualWrapper theme={theme}>
    <VisualFrame theme={theme}>
      <VisualList theme={theme}>
        {PERMISSION_ROLES.map((role) => (
          <VisualRow key={role.name} theme={theme}>
            <VisualRowName theme={theme}>{role.name}</VisualRowName>
            <VisualRowMeta theme={theme}>{role.level} · {role.features}</VisualRowMeta>
          </VisualRow>
        ))}
      </VisualList>
    </VisualFrame>
    <VisualLabel theme={theme}>Permission profiles</VisualLabel>
  </VisualWrapper>
);

// ── Saved Supergroups — group inventory ──────────────────

const SUPERGROUP_ROWS = [
  { name: 'Engineering', criteria: 'Dept = Engineering', members: '64', apps: '8 apps' },
  { name: 'US Full-Time', criteria: 'Country = US, Type = FT', members: '189', apps: '12 apps' },
  { name: 'Managers', criteria: 'Is Manager = Yes', members: '31', apps: '5 apps' },
  { name: 'Sales Team', criteria: 'Dept = Sales', members: '42', apps: '6 apps' },
  { name: 'Remote Workers', criteria: 'Location = Remote', members: '78', apps: '4 apps' },
  { name: 'New Hires (90d)', criteria: 'Start < 90 days', members: '14', apps: '3 apps' },
  { name: 'Finance & Accounting', criteria: 'Dept in Finance, Acct', members: '18', apps: '4 apps' },
  { name: 'Contractors', criteria: 'Type = Contractor', members: '23', apps: '2 apps' },
  { name: 'HIPAA Access', criteria: 'Custom: HIPAA = Yes', members: '9', apps: '3 apps' },
  { name: 'Executives', criteria: 'Level >= VP', members: '7', apps: '6 apps' },
  { name: 'EU Employees', criteria: 'Country in EU', members: '34', apps: '5 apps' },
  { name: 'On Leave', criteria: 'Status = Leave', members: '5', apps: '1 app' },
];

export const SupergroupsVisual: React.FC<{ theme: StyledTheme }> = ({ theme }) => (
  <VisualWrapper theme={theme}>
    <VisualFrame theme={theme}>
      <VisualList theme={theme}>
        {SUPERGROUP_ROWS.map((g) => (
          <VisualRow key={g.name} theme={theme}>
            <VisualRowName theme={theme}>{g.name}</VisualRowName>
            <VisualRowMeta theme={theme}>{g.members} members · {g.apps}</VisualRowMeta>
          </VisualRow>
        ))}
      </VisualList>
    </VisualFrame>
    <VisualLabel theme={theme}>Saved groups</VisualLabel>
  </VisualWrapper>
);

// ── Chat — channel list ──────────────────────────────────

const CHAT_CHANNELS = [
  { name: '#general', type: 'Public', members: '245 members' },
  { name: '#engineering', type: 'Supergroup', members: '64 members' },
  { name: '#announcements', type: 'Broadcast', members: '245 members' },
  { name: '#sales', type: 'Supergroup', members: '42 members' },
  { name: '#remote-workers', type: 'Supergroup', members: '78 members' },
  { name: '#leadership', type: 'Broadcast', members: '12 members' },
  { name: '#finance', type: 'Supergroup', members: '18 members' },
  { name: '#new-hires', type: 'Supergroup', members: '14 members' },
  { name: '#it-support', type: 'Public', members: '245 members' },
  { name: '#benefits-questions', type: 'Public', members: '189 members' },
  { name: '#social', type: 'Public', members: '156 members' },
  { name: '#managers', type: 'Supergroup', members: '31 members' },
];

export const ChatVisual: React.FC<{ theme: StyledTheme }> = ({ theme }) => (
  <VisualWrapper theme={theme}>
    <VisualFrame theme={theme}>
      <VisualList theme={theme}>
        {CHAT_CHANNELS.map((ch) => (
          <VisualRow key={ch.name} theme={theme}>
            <VisualRowName theme={theme}>{ch.name}</VisualRowName>
            <VisualRowMeta theme={theme}>{ch.type} · {ch.members}</VisualRowMeta>
          </VisualRow>
        ))}
      </VisualList>
    </VisualFrame>
    <VisualLabel theme={theme}>Chat channels</VisualLabel>
  </VisualWrapper>
);

export { VISUAL_WIDTH };

// ── Page Configs ─────────────────────────────────────────

export const PRIMER_PAGE_CONFIGS: Record<string, PrimerPageConfig> = {
  // ─── Reports ────────────────────────────────────────────
  'reports': {
    heroTitle: 'Answer any question about your data',
    heroSubtitle: 'Build dashboards and scheduled reports from every object in Rippling. Filter, join, and export with confidence.',
    heroCta: 'Create a report',
    defaultVariant: 'template',
    template: {
      linkLabel: 'Start with a template',
      recipes: [
        // Time
        { icon: Icon.TYPES.LEAVE_MANAGEMENT_OUTLINED, title: 'Time off balances', description: 'Accrued, used, and remaining PTO across the company.', requiredSku: 'time' },
        { icon: Icon.TYPES.OVERTIME_POLICY_OUTLINE, title: 'Overtime analysis', description: 'Hours over threshold by employee, team, and pay period.', requiredSku: 'time' },
        { icon: Icon.TYPES.CALENDAR_OUTLINE, title: 'Timesheet completion rate', description: 'Percentage of timesheets submitted on time by team and week.', requiredSku: 'time' },
        // Payroll
        { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Payroll summary report', description: 'Total payroll costs by period with tax breakdowns.', requiredSku: 'payroll' },
        { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Tax liability summary', description: 'Federal, state, and local tax obligations by period.', requiredSku: 'payroll' },
        { icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE, title: 'Payroll variance report', description: 'Period-over-period changes in gross pay, deductions, and net pay.', requiredSku: 'payroll' },
        // Spend
        { icon: Icon.TYPES.CREDIT_CARD_OUTLINE, title: 'Spend by category', description: 'Expense totals by category, department, and period.', requiredSku: 'spend' },
        { icon: Icon.TYPES.CREDIT_CARD_OUTLINE, title: 'Vendor spend analysis', description: 'Top vendors ranked by total spend with trend lines.', requiredSku: 'spend' },
        { icon: Icon.TYPES.CREDIT_CARD_OUTLINE, title: 'Expense policy violations', description: 'Flagged submissions that exceeded limits or missed receipts.', requiredSku: 'spend' },
        // Benefits
        { icon: Icon.TYPES.HEART_OUTLINE, title: 'Benefits enrollment status', description: 'Enrollment rates and plan distribution across your workforce.', requiredSku: 'benefits' },
        { icon: Icon.TYPES.HEART_OUTLINE, title: 'Plan cost comparison', description: 'Employer vs. employee cost breakdown by plan type.', requiredSku: 'benefits' },
        { icon: Icon.TYPES.HEART_OUTLINE, title: 'Benefits eligibility audit', description: 'Employees approaching or missing eligibility windows.', requiredSku: 'benefits' },
        // IT
        { icon: Icon.TYPES.LAPTOP_OUTLINE, title: 'IT asset inventory', description: 'Devices by type, status, and assigned employee.', requiredSku: 'it' },
        { icon: Icon.TYPES.LAPTOP_OUTLINE, title: 'License utilization', description: 'SaaS license usage and cost per seat across tools.', requiredSku: 'it' },
        { icon: Icon.TYPES.LAPTOP_OUTLINE, title: 'App access audit', description: 'Who has access to which apps, and when they last logged in.', requiredSku: 'it' },
        // Talent
        { icon: Icon.TYPES.USERS_OUTLINE, title: 'Headcount by department', description: 'Current employee count broken down by department and location.', requiredSku: 'talent' },
        { icon: Icon.TYPES.USERS_OUTLINE, title: 'New hires & terminations', description: 'Hiring and attrition trends over time by department.', requiredSku: 'talent' },
        { icon: Icon.TYPES.USERS_OUTLINE, title: 'Offer acceptance rate', description: 'Acceptance vs. decline ratio by role, level, and recruiter.', requiredSku: 'talent' },
      ],
    },
    capability: {
      separatorLabel: 'How reports work',
      features: [
        { icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE, title: 'Build from any object', description: 'Query employees, payroll, time, benefits, and custom objects.', benefits: ['Full object coverage', 'Join across tables', 'Calculated fields'], ctaLabel: 'Create report' },
        { icon: Icon.TYPES.CALENDAR_OUTLINE, title: 'Schedule & share', description: 'Set recurring delivery to email or Slack.', benefits: ['Daily, weekly, monthly', 'Auto-email to stakeholders', 'CSV and PDF export'], ctaLabel: 'Schedule report' },
        { icon: Icon.TYPES.FILTER, title: 'Filter & segment', description: 'Slice data by department, location, role, or custom fields.', benefits: ['Dynamic filters', 'Saved views', 'Drill-down'], ctaLabel: 'Explore filters' },
        { icon: Icon.TYPES.SHARE_OUTLINE, title: 'Export & integrate', description: 'Push to BI tools or download for offline analysis.', benefits: ['API access', 'Warehouse sync', 'Bulk export'], ctaLabel: 'Set up export' },
      ],
    },
    unlock: {
      category: 'Reports unlock visibility across your stack',
      categorySubtitle: 'Every Rippling module produces data. Reports let you combine it all.',
      items: [
        { id: 'headcount', icon: Icon.TYPES.USERS_FILLED, title: 'Headcount analytics', description: 'Track growth, attrition, and composition across departments and locations.', primaryAction: { label: 'View template', onClick: () => {} } },
        { id: 'comp', icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Compensation intelligence', description: 'Analyze pay equity, band adherence, and total compensation costs.', primaryAction: { label: 'View template', onClick: () => {} } },
        { id: 'compliance', icon: Icon.TYPES.SHIELD_FILLED, title: 'Compliance readiness', description: 'Generate audit-ready reports for SOC 2, GDPR, and internal reviews.', primaryAction: { label: 'View template', onClick: () => {} } },
      ],
    },
  },

  // ─── Data Catalog ───────────────────────────────────────
  'data-catalog': {
    heroTitle: "Your company's data, organized and discoverable",
    heroSubtitle: 'Browse every object in Rippling—employees, policies, pay runs. See fields, relationships, and metadata. The catalog powers reports, pipelines, and integrations.',
    heroCta: 'Open data catalog',
    fullPage: true,
    fullPageTitle: 'Data Catalog',
    fullPageIconFilled: Icon.TYPES.TABLE_COLUMN_FILLED,
    defaultVariant: 'unlock',
    template: {
      linkLabel: 'or start with a template',
      recipes: [
        { icon: Icon.TYPES.USERS_OUTLINE, title: 'Headcount by department', description: 'Current employee count broken down by department and location.' },
        { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Payroll summary report', description: 'Total payroll costs by period with tax breakdowns.' },
        { icon: Icon.TYPES.LEAVE_MANAGEMENT_OUTLINED, title: 'Time off balances', description: 'Accrued, used, and remaining PTO across the company.' },
      ],
    },
    capability: {
      separatorLabel: 'How the catalog works',
      features: [
        { icon: Icon.TYPES.TABLE_COLUMN_OUTLINE, title: 'Browse objects', description: 'See every data object and its fields.', benefits: ['Full schema visibility', 'Field types & descriptions', 'Record counts'], ctaLabel: 'Browse' },
        { icon: Icon.TYPES.LINK_HORIZONTAL, title: 'Explore relationships', description: 'Understand how objects connect.', benefits: ['Foreign keys', 'One-to-many maps', 'Graph view'], ctaLabel: 'Explore' },
        { icon: Icon.TYPES.SEARCH_OUTLINE, title: 'Search metadata', description: 'Find any field or object instantly.', benefits: ['Full-text search', 'Filter by type', 'Tag support'], ctaLabel: 'Search' },
        { icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE, title: 'Power downstream', description: 'Feed reports, pipelines, and permissions.', benefits: ['Reports integration', 'Pipeline source', 'Permission basis'], ctaLabel: 'Learn more' },
      ],
    },
    unlock: {
      category: 'The catalog powers your entire data stack',
      categorySubtitle: 'From ad-hoc reports to warehouse syncs—everything starts with understanding your data.',
      items: [
        { id: 'reports', icon: Icon.TYPES.REPORT_FILLED, title: 'Reports', description: 'Build dashboards and scheduled reports from every object. Filter, join, and export with confidence.', primaryAction: { label: 'Create report', onClick: () => {} } },
        { id: 'pipelines', icon: Icon.TYPES.LINK_HORIZONTAL, title: 'Data pipelines', description: 'Sync to Snowflake, BigQuery, or your data warehouse. Know exactly which fields map where.', primaryAction: { label: 'Set up pipeline', onClick: () => {} } },
        { id: 'permissions', icon: Icon.TYPES.SHIELD_FILLED, title: 'Data permissions', description: 'Control who sees sensitive fields. Field-level access keeps PII and financial data protected.', primaryAction: { label: 'Manage permissions', onClick: () => {} } },
      ],
    },
  },

  // ─── Documents ──────────────────────────────────────────
  'documents': {
    heroTitle: 'Manage employee documents and acknowledgments',
    heroSubtitle: 'Send policies, collect signatures, automate onboarding packets, and track compliance—all in one place.',
    heroCta: 'Open Documents',
    defaultVariant: 'capability',
    template: {
      linkLabel: 'Start with a document template',
      recipes: [
        { icon: Icon.TYPES.FILE_OUTLINE, title: 'Offer letter', description: 'Standard offer letter with merge fields for name, title, compensation, and start date.' },
        { icon: Icon.TYPES.FILE_OUTLINE, title: 'NDA', description: 'Non-disclosure agreement for new hires and contractors.' },
        { icon: Icon.TYPES.FILE_OUTLINE, title: 'Employee handbook', description: 'Company policies acknowledgment form for annual distribution.' },
      ],
    },
    capability: {
      separatorLabel: 'How documents work?',
      features: [
        { icon: Icon.TYPES.SIGNATURE_OUTLINE, title: 'Send & collect signatures', description: 'Send any document for e-signature. Track who\'s opened, signed, or pending.', benefits: ['Legally binding e-signatures', 'Track completion status', 'Resend easily'], ctaLabel: 'Send a document' },
        { icon: Icon.TYPES.DOCUMENT_OUTLINE, title: 'Create templates', description: 'Build reusable templates for policies, agreements, and onboarding forms.', benefits: ['Reuse across employees', 'Merge fields from HR data', 'Version control'], ctaLabel: 'Create template' },
        { icon: Icon.TYPES.PROVISION_USERS_ONBOARD_OUTLINE, title: 'Automate onboarding', description: 'Bundle documents into packets that trigger automatically when someone is hired.', benefits: ['Trigger on hire date', 'Pre-fill from profile', 'Reduce manual follow-up'], ctaLabel: 'Set up packet' },
        { icon: Icon.TYPES.SEARCH_OUTLINE, title: 'Track compliance', description: 'Monitor completion across your org. Export audit trails for compliance reviews.', benefits: ['Audit trail for signatures', 'Expiration alerts', 'Compliance reports'], ctaLabel: 'View compliance' },
      ],
    },
    unlock: {
      category: 'Documents connect to your entire workflow',
      categorySubtitle: 'Works with Workflows, Approvals, and Reports.',
      items: [
        { id: 'workflows', icon: Icon.TYPES.THUNDERBOLT_OUTLINE, title: 'Workflow Studio', description: 'Trigger document packets from workflow automations.', primaryAction: { label: 'Explore', onClick: () => {} } },
        { id: 'approvals', icon: Icon.TYPES.CHECKBOX_WITHCHECK_OUTLINE, title: 'Approvals', description: 'Route documents through approval chains before delivery.', primaryAction: { label: 'Explore', onClick: () => {} } },
        { id: 'reports', icon: Icon.TYPES.REPORT_FILLED, title: 'Reports', description: 'Generate compliance reports from document completion data.', primaryAction: { label: 'Explore', onClick: () => {} } },
      ],
    },
  },

  // ─── Flow Configuration ────────────────────────────────
  'flow-configuration': {
    heroTitle: 'Customize what you collect at every employee milestone',
    heroSubtitle: 'Define which fields, questions, and requirements appear during hiring, onboarding, and offboarding. Make your flows match how your company actually works.',
    heroCta: 'Configure your flows',
    heroSecondaryText: 'View flow configuration',
    defaultVariant: 'capability',
    capability: {
      separatorLabel: 'What you can configure',
      features: [
        {
          icon: Icon.TYPES.PROVISION_USERS_ONBOARD_OUTLINE,
          title: 'Hiring flow',
          description: 'Add fields and questions that candidates and managers complete when someone is hired.',
          benefits: ['Custom questions per role', 'Required vs optional fields', 'Conditional logic by department'],
          ctaLabel: 'Edit hiring flow',
        },
        {
          icon: Icon.TYPES.FEEDBACK_FORM_OUTLINE,
          title: 'Onboarding flow',
          description: 'Control what new employees see and complete in their first week.',
          benefits: ['Bank details & tax forms', 'Device assignment', 'Document packets by role'],
          ctaLabel: 'Edit onboarding flow',
        },
        {
          icon: Icon.TYPES.PROVISION_USERS_OFFBOARD_OUTLINE,
          title: 'Termination flow',
          description: 'Define offboarding steps and capture the right information when someone leaves.',
          benefits: ['Exit interview fields', 'Equipment return checklist', 'Access revocation triggers'],
          ctaLabel: 'Edit termination flow',
        },
        {
          icon: Icon.TYPES.EDIT_OUTLINE,
          title: 'Field settings',
          description: 'Mark fields as required, optional, or hidden — and add your own custom questions.',
          benefits: ['Per-field visibility rules', 'Custom question types', 'Use in reports and workflows'],
          ctaLabel: 'Manage fields',
        },
      ],
    },
    unlock: {
      category: 'Works with Documents and Approvals',
      categorySubtitle: 'Flows feed into document delivery and approval routing automatically.',
      items: [
        { id: 'documents', icon: Icon.TYPES.FILE_OUTLINE, title: 'Documents', description: 'Document packets trigger based on flow configuration — offer letters, NDAs, and policies route to the right people.', primaryAction: { label: 'Explore', onClick: () => {} } },
        { id: 'approvals', icon: Icon.TYPES.CHECKBOX_WITHCHECK_OUTLINE, title: 'Approvals', description: 'Approval chains gate flow steps — managers sign off before onboarding completes.', primaryAction: { label: 'Explore', onClick: () => {} } },
        { id: 'workflows', icon: Icon.TYPES.THUNDERBOLT_OUTLINE, title: 'Workflow Studio', description: 'Trigger automations from flow events — provision apps, assign training, notify teams.', primaryAction: { label: 'Explore', onClick: () => {} } },
      ],
    },
  },

  // ─── Data Pipelines ─────────────────────────────────────
  'data-pipelines': {
    heroTitle: 'Move your Rippling data to where you need it',
    heroSubtitle: 'Sync employee, payroll, and HR data to Snowflake, BigQuery, or your data warehouse. Know exactly which fields map where.',
    heroCta: 'Set up your first pipeline',
    defaultVariant: 'template',
    template: {
      linkLabel: 'Start with a prebuilt sync',
      recipes: [
        // Time
        { icon: Icon.TYPES.OVERTIME_POLICY_OUTLINE, title: 'Time & attendance sync', description: 'Sync hours worked, overtime, and leave balances.', requiredSku: 'time' },
        { icon: Icon.TYPES.LEAVE_MANAGEMENT_OUTLINED, title: 'Leave accrual sync', description: 'Export PTO accrual rules and running balances.', requiredSku: 'time' },
        { icon: Icon.TYPES.CALENDAR_OUTLINE, title: 'Timesheet data sync', description: 'Push daily timesheet entries to your warehouse for labor analytics.', requiredSku: 'time' },
        // Payroll
        { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Payroll data sync', description: 'Export pay run data, deductions, and tax information.', requiredSku: 'payroll' },
        { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Tax filing sync', description: 'Push tax filing data to your accounting platform.', requiredSku: 'payroll' },
        { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Compensation data sync', description: 'Sync salary bands, bonuses, and equity grants for comp analytics.', requiredSku: 'payroll' },
        // Spend
        { icon: Icon.TYPES.CREDIT_CARD_OUTLINE, title: 'Expense data sync', description: 'Export expense reports, receipts, and category breakdowns.', requiredSku: 'spend' },
        { icon: Icon.TYPES.CREDIT_CARD_OUTLINE, title: 'Vendor payment sync', description: 'Push vendor payment history and outstanding invoices.', requiredSku: 'spend' },
        { icon: Icon.TYPES.CREDIT_CARD_OUTLINE, title: 'Budget actuals sync', description: 'Sync department budgets vs. actuals to your finance tools.', requiredSku: 'spend' },
        // Benefits
        { icon: Icon.TYPES.HEART_OUTLINE, title: 'Benefits enrollment sync', description: 'Export enrollment status and plan selections.', requiredSku: 'benefits' },
        { icon: Icon.TYPES.HEART_OUTLINE, title: 'Carrier feed sync', description: 'Push enrollment data directly to insurance carriers.', requiredSku: 'benefits' },
        { icon: Icon.TYPES.HEART_OUTLINE, title: 'Plan cost sync', description: 'Sync employer and employee premium contributions.', requiredSku: 'benefits' },
        // IT
        { icon: Icon.TYPES.LAPTOP_OUTLINE, title: 'IT asset sync', description: 'Sync device inventory and assignment data.', requiredSku: 'it' },
        { icon: Icon.TYPES.LAPTOP_OUTLINE, title: 'App provisioning sync', description: 'Export app access grants and revocations by employee.', requiredSku: 'it' },
        { icon: Icon.TYPES.LAPTOP_OUTLINE, title: 'Device lifecycle sync', description: 'Push device age, warranty, and replacement schedules.', requiredSku: 'it' },
        // Talent
        { icon: Icon.TYPES.USERS_OUTLINE, title: 'Employee directory sync', description: 'Sync core employee fields to your warehouse on a daily schedule.', requiredSku: 'talent' },
        { icon: Icon.TYPES.USERS_OUTLINE, title: 'Org structure sync', description: 'Export departments, teams, and reporting hierarchies.', requiredSku: 'talent' },
        { icon: Icon.TYPES.USERS_OUTLINE, title: 'Recruiting pipeline sync', description: 'Push candidate stages, offers, and hire data to your BI tools.', requiredSku: 'talent' },
      ],
    },
    capability: {
      separatorLabel: 'How pipelines work',
      features: [
        { icon: Icon.TYPES.SWAP, title: 'Configure sync', description: 'Choose objects, fields, and destination.', benefits: ['Visual field mapper', 'Incremental sync', 'Full refresh option'], ctaLabel: 'Create pipeline' },
        { icon: Icon.TYPES.CALENDAR_OUTLINE, title: 'Schedule runs', description: 'Set frequency from real-time to daily.', benefits: ['Cron scheduling', 'Manual trigger', 'Retry on failure'], ctaLabel: 'Configure' },
        { icon: Icon.TYPES.SEARCH_OUTLINE, title: 'Monitor health', description: 'Track sync status, row counts, and errors.', benefits: ['Run history', 'Error alerts', 'Row-level logging'], ctaLabel: 'View status' },
        { icon: Icon.TYPES.LOCK_OUTLINE, title: 'Enforce security', description: 'Respect data permissions in pipeline output.', benefits: ['PII filtering', 'Role-based access', 'Encryption in transit'], ctaLabel: 'Review settings' },
      ],
    },
    unlock: {
      category: 'Pipelines feed your entire analytics stack',
      items: [
        { id: 'warehouse', icon: Icon.TYPES.CONNECT_DATABASE_OUTLINE, title: 'Data warehouse', description: 'Land clean, normalized HR data in your warehouse for BI and analytics.', primaryAction: { label: 'Set up', onClick: () => {} } },
        { id: 'bi-tools', icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE, title: 'BI tools', description: 'Power Tableau, Looker, or Mode dashboards directly from Rippling data.', primaryAction: { label: 'Connect', onClick: () => {} } },
        { id: 'custom', icon: Icon.TYPES.E_CODE_EMBED, title: 'Custom integrations', description: 'Feed internal tools and microservices with structured Rippling data.', primaryAction: { label: 'Explore API', onClick: () => {} } },
      ],
    },
  },

  // ─── Object Permissions (data-permissions) ──────────────
  'data-permissions': {
    heroTitle: 'Control exactly who sees sensitive data',
    heroSubtitle: 'Set field-level access rules, protect PII, and define role-based visibility across every object in Rippling.',
    heroCta: 'Create a permission set',
    defaultVariant: 'template',
    template: {
      linkLabel: 'Start with a preset',
      recipes: [
        { icon: Icon.TYPES.KEY, title: 'Employee data read-only', description: 'Give a role read-only access to core employee fields for viewers and auditors.' },
        { icon: Icon.TYPES.KEY, title: 'HR admin access', description: 'Full read and write on employee, pay, and time off objects for HR administrators.' },
        { icon: Icon.TYPES.KEY, title: 'Finance payroll access', description: 'Read-only access to payroll and tax data for the finance team.' },
      ],
    },
    capability: {
      separatorLabel: 'How permissions work',
      features: [
        { icon: Icon.TYPES.KEY, title: 'Field-level access', description: 'Control visibility down to individual fields per role.', benefits: ['Granular control', 'Per-object rules', 'Inherit or override'], ctaLabel: 'Configure' },
        { icon: Icon.TYPES.USERS_OUTLINE, title: 'Role-based sets', description: 'Assign permission sets to roles for scalable access.', benefits: ['Role templates', 'Bulk assignment', 'Audit trail'], ctaLabel: 'Create set' },
        { icon: Icon.TYPES.SHIELD_OUTLINE, title: 'PII protection', description: 'Automatically mask sensitive fields for unauthorized roles.', benefits: ['SSN masking', 'Salary hiding', 'Address redaction'], ctaLabel: 'Review PII' },
        { icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE, title: 'Access reports', description: 'Audit who can see what across the entire platform.', benefits: ['Permission matrix', 'Change history', 'Export for compliance'], ctaLabel: 'Run audit' },
      ],
    },
    unlock: {
      category: 'Permissions shape your entire platform',
      items: [
        { id: 'reports', icon: Icon.TYPES.REPORT_FILLED, title: 'Reports', description: 'Determines which fields and objects each role can report on. Prevent finance data from appearing in manager dashboards.', primaryAction: { label: 'Configure', onClick: () => {} } },
        { id: 'data-catalog', icon: Icon.TYPES.TABLE_COLUMN_OUTLINE, title: 'Data Catalog', description: 'Controls field visibility for every user who browses your catalog.', primaryAction: { label: 'Configure', onClick: () => {} } },
        { id: 'data-pipelines', icon: Icon.TYPES.SWAP, title: 'Data Pipelines', description: 'Enforces data boundaries in pipeline outputs — PII never leaves without rules.', primaryAction: { label: 'Configure', onClick: () => {} } },
      ],
    },
  },

  // ─── Workflow Studio ────────────────────────────────────
  'workflow-studio': {
    heroTitle: 'Automate processes that span HR, IT, and Finance',
    heroSubtitle: 'Build custom workflows with triggers, conditions, and actions across every Rippling module. Set it once and let it run.',
    heroCta: 'Build a workflow',
    defaultVariant: 'template',
    template: {
      linkLabel: 'Start with a recipe',
      recipes: [
        // Time
        { icon: Icon.TYPES.LEAVE_MANAGEMENT_OUTLINED, title: 'PTO request to manager approval', description: 'Route time-off requests to the right manager automatically.', requiredSku: 'time' },
        { icon: Icon.TYPES.OVERTIME_POLICY_OUTLINE, title: 'Overtime threshold alert', description: 'Notify managers when an employee approaches overtime limits.', requiredSku: 'time' },
        { icon: Icon.TYPES.CALENDAR_OUTLINE, title: 'Timesheet submission reminder', description: 'Nudge employees who haven\'t submitted timesheets by the deadline.', requiredSku: 'time' },
        // Payroll
        { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Pay change notification', description: 'Notify employees and finance when compensation adjustments take effect.', requiredSku: 'payroll' },
        { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Payroll review reminder', description: 'Alert payroll admins to review and approve before the run deadline.', requiredSku: 'payroll' },
        { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Bonus approval workflow', description: 'Route one-time bonus requests through manager and finance approval.', requiredSku: 'payroll' },
        // Spend
        { icon: Icon.TYPES.CREDIT_CARD_OUTLINE, title: 'Expense approval chain', description: 'Route expenses above a threshold to Finance for review.', requiredSku: 'spend' },
        { icon: Icon.TYPES.CREDIT_CARD_OUTLINE, title: 'Budget threshold alert', description: 'Alert department leads when spending nears the quarterly budget.', requiredSku: 'spend' },
        { icon: Icon.TYPES.CREDIT_CARD_OUTLINE, title: 'Receipt compliance check', description: 'Flag expense reports missing required receipts before approval.', requiredSku: 'spend' },
        // Benefits
        { icon: Icon.TYPES.HEART_OUTLINE, title: 'Benefits enrollment reminder', description: 'Send reminders to employees who haven\'t completed open enrollment.', requiredSku: 'benefits' },
        { icon: Icon.TYPES.HEART_OUTLINE, title: 'Life event enrollment trigger', description: 'Open a benefits enrollment window when a life event is reported.', requiredSku: 'benefits' },
        { icon: Icon.TYPES.HEART_OUTLINE, title: 'Plan change notification', description: 'Notify HR when an employee switches plans outside open enrollment.', requiredSku: 'benefits' },
        // IT
        { icon: Icon.TYPES.LAPTOP_OUTLINE, title: 'IT provisioning on hire', description: 'Auto-create accounts and assign devices when a new hire is added.', requiredSku: 'it' },
        { icon: Icon.TYPES.LAPTOP_OUTLINE, title: 'Termination offboarding checklist', description: 'Revoke access, collect equipment, and deactivate accounts on exit.', requiredSku: 'it' },
        { icon: Icon.TYPES.LAPTOP_OUTLINE, title: 'Device return reminder', description: 'Remind departing employees to return company devices before their last day.', requiredSku: 'it' },
        // Talent
        { icon: Icon.TYPES.PROVISION_USERS_ONBOARD_OUTLINE, title: 'New hire onboarding sequence', description: 'Trigger a multi-step checklist the moment a new employee is added.', requiredSku: 'talent' },
        { icon: Icon.TYPES.NOTIFICATION_OUTLINE, title: 'Role change notification', description: 'Alert stakeholders when an employee\'s role, team, or manager changes.', requiredSku: 'talent' },
        { icon: Icon.TYPES.CALENDAR_OUTLINE, title: 'Work anniversary reminder', description: 'Send congratulations to managers on employee milestones.', requiredSku: 'talent' },
      ],
    },
    capability: {
      separatorLabel: 'How Workflow Studio works',
      features: [
        { icon: Icon.TYPES.THUNDERBOLT_OUTLINE, title: 'Triggers', description: 'Start workflows from events like hire, termination, or data change.', benefits: ['Event-based triggers', 'Scheduled triggers', 'Manual triggers'], ctaLabel: 'Add trigger' },
        { icon: Icon.TYPES.FILTER, title: 'Conditions', description: 'Branch logic based on department, role, or any field.', benefits: ['If/else branching', 'AND/OR logic', 'Dynamic values'], ctaLabel: 'Add condition' },
        { icon: Icon.TYPES.SETTINGS_OUTLINE, title: 'Actions', description: 'Send emails, create tasks, update fields, or call APIs.', benefits: ['50+ action types', 'Multi-step chains', 'Error handling'], ctaLabel: 'Add action' },
        { icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE, title: 'Monitor & debug', description: 'Track every execution with full run history and error details.', benefits: ['Run history', 'Step-by-step logs', 'Retry failed runs'], ctaLabel: 'View runs' },
      ],
    },
    unlock: {
      category: 'Workflows automate your entire platform',
      items: [
        { id: 'onboarding', icon: Icon.TYPES.PROVISION_USERS_ONBOARD_OUTLINE, title: 'Onboarding', description: 'Chain together document delivery, IT provisioning, and training assignment.', primaryAction: { label: 'View recipes', onClick: () => {} } },
        { id: 'approvals', icon: Icon.TYPES.CHECKBOX_WITHCHECK_OUTLINE, title: 'Approvals', description: 'Route any request through dynamic approval chains.', primaryAction: { label: 'View recipes', onClick: () => {} } },
        { id: 'offboarding', icon: Icon.TYPES.USERS_OUTLINE, title: 'Offboarding', description: 'Revoke access, collect equipment, and process final pay automatically.', primaryAction: { label: 'View recipes', onClick: () => {} } },
      ],
    },
  },

  // ─── Approvals ──────────────────────────────────────────
  'approvals': {
    heroTitle: 'Standardize how decisions get made',
    heroSubtitle: 'Define who approves what, in which order, with automated routing and a full audit trail.',
    heroCta: 'Set up an approval chain',
    defaultVariant: 'template',
    template: {
      linkLabel: 'Start with a template',
      recipes: [
        { icon: Icon.TYPES.LEAVE_MANAGEMENT_OUTLINED, title: 'PTO approval chain', description: 'Route time-off requests to the direct manager with auto-escalation.' },
        { icon: Icon.TYPES.CREDIT_CARD_OUTLINE, title: 'Expense approval', description: 'Route expenses above threshold to Finance, then VP.' },
        { icon: Icon.TYPES.FILE_OUTLINE, title: 'Document approval', description: 'Require legal sign-off before sending offer letters.' },
      ],
    },
    capability: {
      separatorLabel: 'How approval chains work',
      features: [
        { icon: Icon.TYPES.HIERARCHY_HORIZONTAL_OUTLINE, title: 'Define the chain', description: 'Set who approves in what order. Support for parallel approvers, fallbacks, and escalations.', benefits: ['Sequential & parallel', 'Fallback approvers', 'Escalation rules'], ctaLabel: 'Create chain' },
        { icon: Icon.TYPES.USERS_OUTLINE, title: 'Set delegation rules', description: 'Configure what happens when an approver is out of office. Auto-reassign or escalate.', benefits: ['OOO delegation', 'Auto-reassign', 'Escalation timeout'], ctaLabel: 'Configure' },
        { icon: Icon.TYPES.THUNDERBOLT_OUTLINE, title: 'Automate routing', description: 'Trigger chains automatically from Workflow Studio, Documents, or HR actions.', benefits: ['Event-driven triggers', 'Condition-based routing', 'Dynamic approvers'], ctaLabel: 'Set up trigger' },
        { icon: Icon.TYPES.SEARCH_OUTLINE, title: 'Audit every decision', description: 'Every approval and rejection is logged with timestamp, context, and actor.', benefits: ['Full audit trail', 'Decision timestamps', 'Export for compliance'], ctaLabel: 'View log' },
      ],
    },
    unlock: {
      category: 'Approvals power decision-making across Rippling',
      categorySubtitle: 'Powers Workflow Studio, Documents, and HR changes.',
      items: [
        { id: 'workflows', icon: Icon.TYPES.THUNDERBOLT_OUTLINE, title: 'Workflow Studio', description: 'Insert approval gates into any automated workflow.', primaryAction: { label: 'Explore', onClick: () => {} } },
        { id: 'documents', icon: Icon.TYPES.FILE_OUTLINE, title: 'Documents', description: 'Require sign-off before documents are sent or shared.', primaryAction: { label: 'Explore', onClick: () => {} } },
        { id: 'hr-changes', icon: Icon.TYPES.USERS_OUTLINE, title: 'HR changes', description: 'Gate role changes, comp adjustments, and terminations.', primaryAction: { label: 'Explore', onClick: () => {} } },
      ],
    },
  },

  // ─── Developer ──────────────────────────────────────────
  'developer': {
    heroTitle: 'Extend Rippling with custom integrations',
    heroSubtitle: 'Create API credentials, configure webhooks, and build OAuth apps that connect Rippling to your internal and third-party tools.',
    heroCta: 'Create an app',
    defaultVariant: 'template',
    template: {
      linkLabel: 'Start with a starter',
      recipes: [
        { icon: Icon.TYPES.E_CODE_EMBED, title: 'Employee sync webhook', description: 'Receive real-time events when employees are created or updated.' },
        { icon: Icon.TYPES.E_CODE_EMBED, title: 'Payroll export script', description: 'Pull payroll data via REST API on a scheduled basis.' },
        { icon: Icon.TYPES.E_CODE_EMBED, title: 'Custom dashboard app', description: 'Build an OAuth app that reads Rippling data for internal dashboards.' },
      ],
    },
    capability: {
      separatorLabel: 'What you can build',
      features: [
        { icon: Icon.TYPES.E_CODE_EMBED, title: 'REST API', description: 'Query and write Rippling data programmatically. Full object coverage with versioned endpoints.', benefits: ['Full CRUD access', 'Versioned endpoints', 'Pagination & filtering'], ctaLabel: 'View docs' },
        { icon: Icon.TYPES.NOTIFICATION_OUTLINE, title: 'Webhooks', description: 'Receive real-time events when employees are hired, terminated, or updated.', benefits: ['Real-time events', 'Configurable filters', 'Retry logic'], ctaLabel: 'Create webhook' },
        { icon: Icon.TYPES.LOCK_OUTLINE, title: 'OAuth apps', description: 'Build apps that authenticate as your users with scoped permissions.', benefits: ['Scoped permissions', 'Token management', 'User consent flow'], ctaLabel: 'Register app' },
        { icon: Icon.TYPES.REFRESH_OUTLINE, title: 'Sandbox environment', description: 'Test your integration safely before pointing at production.', benefits: ['Mirror of production', 'Safe to experiment', 'Reset anytime'], ctaLabel: 'Launch sandbox' },
      ],
    },
    unlock: {
      category: 'Developer tools connect Rippling to everything',
      items: [
        { id: 'internal-tools', icon: Icon.TYPES.CUSTOM_APPS_OUTLINE, title: 'Internal tools', description: 'Feed Rippling data into your internal dashboards, portals, and scripts.', primaryAction: { label: 'Explore API', onClick: () => {} } },
        { id: 'integrations', icon: Icon.TYPES.INTEGRATED_APPS_OUTLINE, title: 'Third-party integrations', description: 'Build custom connectors to any SaaS tool your company uses.', primaryAction: { label: 'Browse examples', onClick: () => {} } },
        { id: 'automation', icon: Icon.TYPES.THUNDERBOLT_OUTLINE, title: 'Custom automation', description: 'Trigger external actions from Rippling events via webhooks.', primaryAction: { label: 'Set up webhook', onClick: () => {} } },
      ],
    },
  },

  // ─── Sandbox ────────────────────────────────────────────
  'sandbox': {
    heroTitle: 'Test changes safely before they go live',
    heroSubtitle: 'Mirror your production environment to validate payroll runs, workflow changes, and configurations without touching real data.',
    heroCta: 'Set up your sandbox',
    defaultVariant: 'capability',
    template: {
      linkLabel: 'Start with a test scenario',
      recipes: [
        { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Test payroll run', description: 'Run a full payroll calculation against mirrored employee data.' },
        { icon: Icon.TYPES.THUNDERBOLT_OUTLINE, title: 'Test workflow', description: 'Validate trigger logic and actions without affecting real employees.' },
        { icon: Icon.TYPES.SETTINGS_OUTLINE, title: 'Test configuration', description: 'Experiment with permission sets and approval chains.' },
      ],
    },
    capability: {
      separatorLabel: 'What you can do here',
      features: [
        { icon: Icon.TYPES.REFRESH_OUTLINE, title: 'Mirror production', description: 'Clone your live environment with anonymized data.', benefits: ['Full schema copy', 'Anonymized PII', 'Reset anytime'], ctaLabel: 'Create mirror' },
        { icon: Icon.TYPES.THUNDERBOLT_OUTLINE, title: 'Run tests', description: 'Execute workflows, payroll, and approvals safely.', benefits: ['No real impact', 'Full execution logs', 'Side-by-side comparison'], ctaLabel: 'Run test' },
        { icon: Icon.TYPES.CHECKBOX_WITHCHECK_OUTLINE, title: 'Validate & promote', description: 'Review results and promote changes to production.', benefits: ['Diff view', 'One-click promote', 'Rollback support'], ctaLabel: 'Review changes' },
        { icon: Icon.TYPES.SHARE_OUTLINE, title: 'Share sandbox', description: 'Invite teammates to review before going live.', benefits: ['Shareable link', 'Role-based access', 'Comment thread'], ctaLabel: 'Invite team' },
      ],
    },
    unlock: {
      category: 'What you can safely test',
      items: [
        { id: 'payroll', icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Payroll runs', description: 'Run full payroll calculations against mirrored employee data. Catch errors before payday.', primaryAction: { label: 'Test payroll', onClick: () => {} } },
        { id: 'workflows', icon: Icon.TYPES.THUNDERBOLT_OUTLINE, title: 'Workflows & automations', description: 'Validate trigger logic, conditions, and actions without affecting real employees.', primaryAction: { label: 'Test workflows', onClick: () => {} } },
        { id: 'config', icon: Icon.TYPES.SETTINGS_OUTLINE, title: 'Configuration changes', description: 'Experiment with permission sets, approval chains, and settings before promoting to production.', primaryAction: { label: 'Explore settings', onClick: () => {} } },
      ],
    },
  },

  // ─── Activity Log ───────────────────────────────────────
  'activity-log': {
    heroTitle: 'See exactly what happened, when, and who did it',
    heroSubtitle: 'A complete, filterable audit trail of every action in Rippling — changes, logins, and configurations — with the context to act on what you find.',
    heroCta: 'Open activity log',
    heroSecondaryText: 'Configure alerts',
    defaultVariant: 'capability',
    capability: {
      separatorLabel: 'What you can do here',
      features: [
        {
          icon: Icon.TYPES.FILTER,
          title: 'Filter & search',
          description: 'Find any action by user, date, object, or event type.',
          benefits: ['Search by actor or role', 'Filter by date range', 'Narrow by object or event type'],
          ctaLabel: 'Open filters',
        },
        {
          icon: Icon.TYPES.SHARE_OUTLINE,
          title: 'Export for compliance',
          description: 'Download logs for SOC 2, GDPR, or security audits.',
          benefits: ['SOC 2 audit-ready format', 'GDPR data export', 'CSV and PDF download'],
          ctaLabel: 'Export logs',
        },
        {
          icon: Icon.TYPES.NOTIFICATION_OUTLINE,
          title: 'Set up alerts',
          description: 'Get notified when sensitive actions happen in real time.',
          benefits: ['Real-time notifications', 'Custom trigger rules', 'Slack and email delivery'],
          ctaLabel: 'Configure alerts',
        },
        {
          icon: Icon.TYPES.HIERARCHY_HORIZONTAL_OUTLINE,
          title: 'Trace any change',
          description: 'Follow a change from who made it to what it affected.',
          benefits: ['Full change lineage', 'Actor identification', 'Downstream impact view'],
          ctaLabel: 'Trace a change',
        },
      ],
    },
    unlock: {
      category: 'Feeds into compliance and security reports',
      categorySubtitle: 'Activity data powers audit-ready reports across Rippling.',
      items: [
        { id: 'reports', icon: Icon.TYPES.REPORT_FILLED, title: 'Reports', description: 'Generate compliance and security audit reports powered by activity log data.', primaryAction: { label: 'View reports', onClick: () => {} } },
        { id: 'security', icon: Icon.TYPES.SHIELD_FILLED, title: 'Security', description: 'Feed login and access events into your security monitoring and alerting.', primaryAction: { label: 'View security', onClick: () => {} } },
        { id: 'permissions', icon: Icon.TYPES.KEY, title: 'Permissions', description: 'Audit who changed access controls and when with full traceability.', primaryAction: { label: 'Review permissions', onClick: () => {} } },
      ],
    },
  },

  // ─── Permissions ──────────────────────────────────────────
  'permissions': {
    heroTitle: 'Define who can do what across Rippling',
    heroSubtitle: 'Create permission profiles, control feature access, and assign roles — so every person has exactly the access they need, and nothing they don\'t.',
    heroCta: 'Create a role',
    heroSecondaryText: 'Review current permissions',
    defaultVariant: 'capability',
    template: {
      linkLabel: 'Start with a profile template',
      recipes: [
        { icon: Icon.TYPES.KEY, title: 'HR administrator', description: 'Full access to people, payroll, benefits, and time management for the HR team.' },
        { icon: Icon.TYPES.KEY, title: 'Department manager', description: 'View and approve requests for direct reports — time off, expenses, and role changes.' },
        { icon: Icon.TYPES.KEY, title: 'Finance user', description: 'Read-only access to payroll, billing, and expense data for the finance team.' },
        { icon: Icon.TYPES.KEY, title: 'IT administrator', description: 'Manage devices, app provisioning, SSO, and security policies.' },
        { icon: Icon.TYPES.KEY, title: 'Recruiter', description: 'Access to hiring workflows, candidate data, and offer letter management.' },
        { icon: Icon.TYPES.KEY, title: 'Read-only auditor', description: 'View-only access across the platform for compliance and audit reviews.' },
      ],
    },
    capability: {
      separatorLabel: 'How permissions work',
      features: [
        {
          icon: Icon.TYPES.KEY,
          title: 'Permission profiles',
          description: 'Create reusable profiles that bundle feature access, data visibility, and approval authority into one assignable role.',
          benefits: ['Reusable across users', 'Clone and customize', 'Full audit trail on changes'],
          ctaLabel: 'Create profile',
        },
        {
          icon: Icon.TYPES.SETTINGS_OUTLINE,
          title: 'Feature access',
          description: 'Control which Rippling features each profile can see and use — from payroll to reports to app management.',
          benefits: ['Per-feature toggles', 'Read vs write vs admin', 'Scoped to modules'],
          ctaLabel: 'Configure access',
        },
        {
          icon: Icon.TYPES.USERS_OUTLINE,
          title: 'User assignment',
          description: 'Assign profiles to individuals or groups. Change a profile once and every assigned user updates automatically.',
          benefits: ['Assign by role or group', 'Bulk assignment', 'Instant propagation'],
          ctaLabel: 'Assign users',
        },
        {
          icon: Icon.TYPES.SEARCH_OUTLINE,
          title: 'Audit & review',
          description: 'See who has access to what, when it was granted, and who made the change.',
          benefits: ['Permission matrix view', 'Change history', 'Export for compliance'],
          ctaLabel: 'Run review',
        },
      ],
    },
    unlock: {
      category: 'Permissions protect every part of Rippling',
      categorySubtitle: 'Roles you define here govern access across data, security, and audit.',
      items: [
        { id: 'data-permissions', icon: Icon.TYPES.SHIELD_FILLED, title: 'Data Permissions', description: 'Roles here determine which fields and objects each user can see — field-level visibility layered on top.', primaryAction: { label: 'Configure', onClick: () => {} } },
        { id: 'security', icon: Icon.TYPES.LOCK_OUTLINE, title: 'Security', description: 'Permission profiles feed into SSO, MFA, and session policies for each access tier.', primaryAction: { label: 'Configure', onClick: () => {} } },
        { id: 'activity-log', icon: Icon.TYPES.AUDIT_OBSERVATION_OUTLINE, title: 'Activity Log', description: 'Every permission change is logged — who granted access, when, and to whom.', primaryAction: { label: 'View log', onClick: () => {} } },
      ],
    },
  },

  // ─── Saved Supergroups ─────────────────────────────────
  'saved-supergroups': {
    heroTitle: 'Define your employee groups once. Use them everywhere.',
    heroSubtitle: 'Build named, reusable groups based on any employee criteria. Apply the same group to IT app access, permissions, approvals, and policies — without redefining it each time.',
    heroCta: 'Create a group',
    heroSecondaryText: 'Browse groups',
    defaultVariant: 'unlock',
    capability: {
      separatorLabel: 'How saved groups work',
      features: [
        {
          icon: Icon.TYPES.USERS_OUTLINE,
          title: 'Define criteria',
          description: 'Build a group from any combination of department, location, role, employment type, or custom fields.',
          benefits: ['Dynamic membership', 'AND / OR logic', 'Custom field support'],
          ctaLabel: 'Create group',
        },
        {
          icon: Icon.TYPES.LINK_HORIZONTAL,
          title: 'Attach to policies',
          description: 'Use a group across IT apps, permissions, approvals, and HR policies. Update the group and every attachment follows.',
          benefits: ['One change, everywhere', 'Cross-module reuse', 'No duplicate rules'],
          ctaLabel: 'Browse uses',
        },
        {
          icon: Icon.TYPES.REFRESH_OUTLINE,
          title: 'Auto-update membership',
          description: 'Members are added and removed automatically as employee data changes — no manual list maintenance.',
          benefits: ['Always current', 'Trigger on data change', 'Zero maintenance'],
          ctaLabel: 'View members',
        },
        {
          icon: Icon.TYPES.SEARCH_OUTLINE,
          title: 'Audit usage',
          description: 'See everywhere a group is referenced — which apps, policies, and permission sets depend on it.',
          benefits: ['Impact analysis', 'Dependency map', 'Safe deletion check'],
          ctaLabel: 'View usage',
        },
      ],
    },
    unlock: {
      category: 'Saved groups power your entire access layer',
      categorySubtitle: 'Define a group once. Attach it to apps, data rules, and policies — it stays in sync automatically.',
      items: [
        {
          id: 'it-apps',
          icon: Icon.TYPES.INTEGRATED_APPS_OUTLINE,
          title: 'IT app access',
          description: 'Control who can use Salesforce, Slack, GitHub, or any app by attaching a saved group.',
          primaryAction: { label: 'Manage IT access', onClick: () => {} },
        },
        {
          id: 'data-permissions',
          icon: Icon.TYPES.SHIELD_FILLED,
          title: 'Object permissions',
          description: 'Apply field-level data visibility rules to an entire group at once.',
          primaryAction: { label: 'Manage permissions', onClick: () => {} },
        },
        {
          id: 'approvals',
          icon: Icon.TYPES.CHECKBOX_WITHCHECK_OUTLINE,
          title: 'Approvals & policies',
          description: 'Route approval chains and HR policies to the right employees using group membership.',
          primaryAction: { label: 'Set up approvals', onClick: () => {} },
        },
      ],
    },
  },

  // ─── Chat ──────────────────────────────────────────────
  'chat': {
    heroTitle: 'Team communication that already knows your org.',
    heroSubtitle:
      'Rippling Chat is built into your workforce platform — no separate app, no manual member management. Channels stay current as employees join teams, change roles, or leave, powered by Saved Groups.',
    heroCta: 'Set up Chat',
    fullPage: true,
    fullPageTitle: 'Chat',
    fullPageIconFilled: Icon.TYPES.MESSAGE_FILLED,
    defaultVariant: 'capability',
    capability: {
      separatorLabel: 'What makes Rippling Chat different',
      features: [
        {
          icon: Icon.TYPES.USER_GROUP_CHECKED_OUTLINE,
          title: 'Supergroup channels',
          description: 'Membership updates automatically with your org.',
          benefits: ['Criteria-based membership rules', 'Syncs with role and team changes', 'No manual adds or removes'],
          ctaLabel: 'Create a supergroup channel',
        },
        {
          icon: Icon.TYPES.V2_SEND,
          title: 'Broadcast channels',
          description: 'Read-only announcements for leadership.',
          benefits: ['One-way communication', 'Company-wide distribution', 'Members can react but not reply'],
          ctaLabel: 'Create a broadcast channel',
        },
        {
          icon: Icon.TYPES.BAR_CHART_OUTLINE,
          title: 'Analytics',
          description: 'Track adoption and engagement at a glance.',
          benefits: ['Message volume by channel', 'Active user trends', 'Engagement metrics over time'],
          ctaLabel: 'View analytics',
        },
        {
          icon: Icon.TYPES.CONNECT_CLOUD_OUTLINE,
          title: 'Integrated membership',
          description: 'Channels stay current via Saved Groups and Approvals.',
          benefits: ['Saved Groups power auto-membership', 'Approval workflows for join requests', 'No separate user management'],
          ctaLabel: 'View integrations',
        },
      ],
    },
  },
};

// Pages that get the Platform Primer treatment (used by platform-primer-demo to decide rendering)
export const PRIMER_PAGE_IDS = new Set(Object.keys(PRIMER_PAGE_CONFIGS));

export function isPrimerFullPage(pageId: string): boolean {
  return PRIMER_PAGE_CONFIGS[pageId]?.fullPage === true;
}
