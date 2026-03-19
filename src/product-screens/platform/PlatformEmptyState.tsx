import React, { useState } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import Input from '@rippling/pebble/Inputs';
import ActionCard from '@rippling/pebble/ActionCard';
import Animation from '@rippling/pebble/Animation';
import { Separator } from '@rippling/pebble/Atoms';
import { DiscoveryPageLayout, PageHeroBanner, FeatureCard, FeatureCardDetailModal } from '@/spec';
import type { FeatureCardDetailConfig } from '@/spec';

interface PlatformEmptyStateProps {
  pageId: string;
  title: string;
  icon?: string;
  onNavigate?: (page: string) => void;
  onCtaClick?: () => void;
}

const PAGE_CATEGORY: Record<string, { label: string; page: string }> = {
  'reports': { label: 'Data', page: 'data-overview' },
  'data-catalog': { label: 'Data', page: 'data-overview' },
  'data-permissions': { label: 'Data', page: 'data-overview' },
  'data-pipelines': { label: 'Data', page: 'data-overview' },
  'data-transformations': { label: 'Data', page: 'data-overview' },
  'app-studio': { label: 'Tools', page: 'tools-overview' },
  'approvals': { label: 'Tools', page: 'tools-overview' },
  'chat': { label: 'Tools', page: 'tools-overview' },
  'developer': { label: 'Tools', page: 'tools-overview' },
  'documents': { label: 'Tools', page: 'tools-overview' },
  'inbox': { label: 'Tools', page: 'tools-overview' },
  'notification-center': { label: 'Tools', page: 'tools-overview' },
  'recipes': { label: 'Tools', page: 'tools-overview' },
  'workflow-studio': { label: 'Tools', page: 'tools-overview' },
  'sandbox': { label: 'Tools', page: 'tools-overview' },
  'activity-log': { label: 'Tools', page: 'tools-overview' },
  'billing': { label: 'Company Settings', page: 'company-settings-overview' },
  'branding': { label: 'Company Settings', page: 'company-settings-overview' },
  'company-info': { label: 'Company Settings', page: 'company-settings-overview' },
  'flow-configuration': { label: 'Company Settings', page: 'company-settings-overview' },
  'organizational-data': { label: 'Company Settings', page: 'company-settings-overview' },
  'saved-supergroups': { label: 'Company Settings', page: 'company-settings-overview' },
  'departments': { label: 'Company Settings', page: 'company-settings-overview' },
  'notifications': { label: 'Company Settings', page: 'company-settings-overview' },
  'permissions': { label: 'Company Settings', page: 'company-settings-overview' },
  'security': { label: 'Company Settings', page: 'company-settings-overview' },
  'teams': { label: 'Company Settings', page: 'company-settings-overview' },
  'work-locations': { label: 'Company Settings', page: 'company-settings-overview' },
};

export function getPageMeta(pageId: string) {
  return PAGE_META[pageId] ?? { headline: 'This page is coming soon.', subtext: 'Get started to explore.', cta: 'Get started', headerCta: 'Get started', columns: ['Name', 'Type', 'Status', 'Created'] };
}

// Page tabs (from IA map) - tabs shown in the page header for pages that have them
const PAGE_TABS: Record<string, string[]> = {
  'reports': ['Recent', 'All reports', 'My reports', 'Shared with me', 'Report permissions'],
  'data-catalog': ['All objects', 'Custom objects'],
  'data-pipelines': ['Pipelines', 'Sync history'],
  'documents': ['People', 'Templates', 'Rules', 'Bulk upload'],
  'developer': ['Functions', 'Settings manager', 'Webhooks', 'API tokens', 'Packages'],
  'approvals': ['Need my review', 'My requests', 'Reviewed', 'All requests', 'Approval policies'],
  'inbox': ['Pending', 'Resolved'],
  'recipes': ['All', 'Active', 'Drafts'],
  'workflow-studio': ['Dashboard', 'Analytics', 'Tags'],
  'organizational-data': ['Company information', 'Departments', 'Job information', 'Employee lifecycle'],
  'notification-center': ['Alerts'],
  'activity-log': ['All events', 'Logins', 'Changes', 'Alerts'],
  'data-permissions': ['Permission overview', 'Feature access', 'Users overview', 'Admins to migrate'],
  'permissions': ['Permission profiles', 'Feature access', 'User permissions'],
  'billing': ['Invoices', 'Payment methods', 'Subscription'],
  'departments': ['Departments', 'Headcount'],
  'flow-configuration': ['Hiring', 'Onboarding', 'Offboarding'],
  'saved-supergroups': ['Saved groups', 'Recommendations'],
};

export function getPageTabs(pageId: string): string[] | undefined {
  return PAGE_TABS[pageId];
}

const OVERVIEW_BREADCRUMB_LABELS: Record<string, string> = {
  'tools-overview': 'Tools',
  'data-overview': 'Data',
  'company-settings-overview': 'Company Settings',
};

export function getBreadcrumbItems(pageId: string, title: string) {
  const overviewLabel = OVERVIEW_BREADCRUMB_LABELS[pageId];
  if (overviewLabel) {
    return [
      { title: 'Platform', value: 'platform-overview' },
      { title: overviewLabel, value: pageId },
    ];
  }
  const category = PAGE_CATEGORY[pageId];
  return [
    { title: 'Platform', value: 'platform-overview' },
    ...(category ? [{ title: category.label, value: category.page }] : []),
    { title, value: pageId },
  ];
}

// ── Page meta (micro-education: what it's for, what you can do) ──

const PAGE_META: Record<string, { headline: string; subtext: string; cta: string; headerCta: string; columns: string[] }> = {
  'reports': {
    headline: 'Turn your data into actionable insights.',
    subtext: 'Build reports on headcount, payroll, time off, and more. Schedule them or export on demand.',
    cta: 'Create first report',
    headerCta: 'Create report',
    columns: ['Name', 'Type', 'Created by', 'Last run'],
  },
  'data-catalog': {
    headline: 'Your company\'s data, organized and discoverable.',
    subtext: 'Browse every object in Rippling—employees, policies, pay runs. See fields, relationships, and metadata.',
    cta: 'Explore catalog',
    headerCta: 'Explore catalog',
    columns: ['Name', 'Type', 'Records', 'Last updated'],
  },
  'data-permissions': {
    headline: 'Control who sees and edits your sensitive data.',
    subtext: 'Set read, write, and delete access per object. Protect employee and financial data with field-level permissions.',
    cta: 'Create first permission',
    headerCta: '',
    columns: ['Role', 'Object', 'Access level', 'Modified'],
  },
  'data-pipelines': {
    headline: 'Keep your data warehouse and BI tools in sync.',
    subtext: 'Connect Rippling to Snowflake, BigQuery, Tableau, and more. Real-time or scheduled—no code required.',
    cta: 'Create first pipeline',
    headerCta: 'Create pipeline',
    columns: ['Name', 'Source', 'Destination', 'Status'],
  },
  'data-transformations': {
    headline: 'Shape data for downstream systems.',
    subtext: 'Transform, merge, and filter data before it reaches your warehouse or BI tool.',
    cta: 'Create first transformation',
    headerCta: 'Create transformation',
    columns: ['Name', 'Input', 'Output', 'Last run'],
  },
  'app-studio': {
    headline: 'Build custom apps that fit your workflow.',
    subtext: 'Create internal tools, dashboards, and workflows—all powered by your Rippling data.',
    cta: 'Create first app',
    headerCta: 'Create app',
    columns: ['Name', 'Status', 'Created by', 'Last updated'],
  },
  'approvals': {
    headline: 'Centralize approvals across Rippling.',
    subtext: 'Time off, expenses, documents, and custom requests—all in one place. Route to the right approvers.',
    cta: 'View pending approvals',
    headerCta: 'View pending approvals',
    columns: ['Request', 'Requester', 'Status', 'Submitted'],
  },
  'chat': {
    headline: 'Message your team without leaving Rippling.',
    subtext: 'Direct messages, channels, and shared context—all in one place.',
    cta: 'Start a conversation',
    headerCta: 'Start a conversation',
    columns: ['Channel', 'Members', 'Last message', 'Created'],
  },
  'developer': {
    headline: 'Connect Rippling to your systems.',
    subtext: 'API keys for custom integrations, webhooks for real-time events. Build what you need.',
    cta: 'Create first API key',
    headerCta: 'Create API key',
    columns: ['Name', 'Type', 'Status', 'Created'],
  },
  'documents': {
    headline: 'No employee documents yet',
    subtext: "You can't send documents to people until you create a document. Add a template or upload a file to get started.",
    cta: 'Create first document',
    headerCta: '',
    columns: ['Employee', 'Employee Status', 'Documents', 'Envelopes', 'Notices'],
  },
  'inbox': {
    headline: 'One place for all your Rippling tasks.',
    subtext: 'Approvals, notifications, and action items—across every app. Never miss a request.',
    cta: 'Open inbox',
    headerCta: 'Open inbox',
    columns: ['Subject', 'From', 'Status', 'Date'],
  },
  'notification-center': {
    headline: 'Control how and when your team gets notified.',
    subtext: 'Email, Slack, SMS, or in-app. Choose the channel for each event type.',
    cta: 'Configure notifications',
    headerCta: 'Configure notifications',
    columns: ['Event', 'Channel', 'Recipients', 'Status'],
  },
  'recipes': {
    headline: 'Automate common workflows—no code required.',
    subtext: 'New hire setup, offboarding, timesheet reminders. Trigger on hire, termination, or custom conditions.',
    cta: 'Create first recipe',
    headerCta: 'Create recipe',
    columns: ['Name', 'Trigger', 'Status', 'Last run'],
  },
  'workflow-studio': {
    headline: 'Automate repetitive work across Rippling.',
    subtext: 'Trigger actions when roles change, contracts renew, employees onboard, and more.',
    cta: 'Create first workflow',
    headerCta: 'Create workflow',
    columns: ['Name', 'Trigger', 'Status', 'Last run'],
  },
  'sandbox': {
    headline: 'Test changes safely before they go live.',
    subtext: 'Mirror your production environment to validate payroll, workflows, and configurations without touching real data.',
    cta: 'Set up sandbox',
    headerCta: 'Create sandbox',
    columns: ['Name', 'Status', 'Last refresh', 'Created'],
  },
  'activity-log': {
    headline: 'See exactly what happened, when, and who did it.',
    subtext: 'A complete, filterable audit trail of every action in Rippling — changes, logins, and configurations.',
    cta: 'Explore the activity log',
    headerCta: 'Configure alerts',
    columns: ['Event', 'Actor', 'Object', 'Timestamp'],
  },
  'billing': {
    headline: 'Manage your Rippling subscription.',
    subtext: 'View invoices, update payment methods, and see your plan details.',
    cta: 'View billing',
    headerCta: 'View billing',
    columns: ['Invoice', 'Amount', 'Status', 'Date'],
  },
  'branding': {
    headline: 'Make Rippling feel like your company.',
    subtext: 'Logo, colors, and login screens—customized for your brand.',
    cta: 'Customize branding',
    headerCta: 'Customize branding',
    columns: ['Asset', 'Type', 'Updated by', 'Modified'],
  },
  'company-info': {
    headline: 'Your company\'s legal identity in one place.',
    subtext: 'Legal name, address, EIN, and registration details.',
    cta: 'Update company info',
    headerCta: 'Update company info',
    columns: ['Field', 'Value', 'Updated by', 'Modified'],
  },
  'flow-configuration': {
    headline: 'Configure data collection flows.',
    subtext: 'Control what information is collected and when across onboarding and other flows.',
    cta: 'Configure flow',
    headerCta: '',
    columns: ['Flow', 'Status', 'Last updated'],
  },
  'organizational-data': {
    headline: 'Manage organizational structure data.',
    subtext: 'Departments, teams, locations, and hierarchy data across Rippling.',
    cta: 'Get started',
    headerCta: '',
    columns: ['Type', 'Records', 'Status'],
  },
  'saved-supergroups': {
    headline: 'Define your employee groups once. Use them everywhere.',
    subtext: 'Build named, reusable groups based on any employee criteria. Apply the same group to IT app access, permissions, approvals, and policies.',
    cta: 'Create a group',
    headerCta: 'Create group',
    columns: ['Name', 'Criteria', 'Members', 'Created'],
  },
  'departments': {
    headline: 'Organize your workforce by department.',
    subtext: 'Create departments and sub-departments. Use them for reporting, approvals, and permissions.',
    cta: 'Create first department',
    headerCta: 'Create department',
    columns: ['Name', 'Head', 'Headcount', 'Created'],
  },
  'notifications': {
    headline: 'Decide what triggers notifications and who receives them.',
    subtext: 'Configure event types, channels, and recipients across Rippling.',
    cta: 'Configure notifications',
    headerCta: 'Configure notifications',
    columns: ['Event', 'Channel', 'Recipients', 'Status'],
  },
  'permissions': {
    headline: 'Define who can do what in Rippling.',
    subtext: 'Create roles, assign permissions, and manage access across apps and features.',
    cta: 'Create first role',
    headerCta: 'Create role',
    columns: ['Role', 'Members', 'Access level', 'Modified'],
  },
  'security': {
    headline: 'Secure your company\'s Rippling account.',
    subtext: 'SSO, MFA, password policies, and session management.',
    cta: 'Configure security',
    headerCta: 'Configure security',
    columns: ['Policy', 'Type', 'Status', 'Modified'],
  },
  'teams': {
    headline: 'Create teams that work across departments.',
    subtext: 'Project teams, committees, task forces—with their own membership and permissions.',
    cta: 'Create first team',
    headerCta: 'Create team',
    columns: ['Name', 'Lead', 'Members', 'Created'],
  },
  'work-locations': {
    headline: 'Manage where your people work.',
    subtext: 'Office locations, remote policies, time zones. Use for reporting and compliance.',
    cta: 'Create first location',
    headerCta: 'Create location',
    columns: ['Name', 'Address', 'Employees', 'Timezone'],
  },
};

// ── Featured recipes (optional section) ──────────────────

interface SuggestedRecipe {
  icon: string;
  title: string;
  description: string;
  type: 'workflow' | 'report';
}

// Page-specific templates that answer each page's primary CTA. Omit pages where no good template fits.
const PAGE_RECIPES: Record<string, SuggestedRecipe[]> = {
  'reports': [
    { icon: Icon.TYPES.USERS_OUTLINE, title: 'Headcount by department', description: 'Current employee count broken down by department and location.', type: 'report' },
    { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Payroll summary report', description: 'Total payroll costs by period with tax breakdowns.', type: 'report' },
    { icon: Icon.TYPES.LEAVE_MANAGEMENT_OUTLINED, title: 'Time off balances', description: 'Accrued, used, and remaining PTO across the company.', type: 'report' },
  ],
  'data-pipelines': [
    { icon: Icon.TYPES.DATA_TRANSFER_OUTLINE, title: 'Warehouse sync', description: 'Automatically sync employee data to your data warehouse nightly.', type: 'workflow' },
    { icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE, title: 'Pipeline health report', description: 'Monitor sync success rates and data freshness.', type: 'report' },
  ],
  'data-permissions': [
    { icon: Icon.TYPES.KEY, title: 'Employee data read-only', description: 'Give a role read-only access to core employee fields for viewers and auditors.', type: 'report' },
    { icon: Icon.TYPES.KEY, title: 'HR admin access', description: 'Full read and write on employee, pay, and time off objects for HR administrators.', type: 'report' },
    { icon: Icon.TYPES.KEY, title: 'Finance payroll access', description: 'Read-only access to payroll and tax data for the finance team.', type: 'report' },
  ],
  'recipes': [
    { icon: Icon.TYPES.NOTIFICATION_OUTLINE, title: 'New hire onboarding', description: 'Automatically provision apps, send welcome emails, and assign training on day one.', type: 'workflow' },
    { icon: Icon.TYPES.DATA_TRANSFER_OUTLINE, title: 'Offboarding checklist', description: 'Revoke access, collect equipment, and process final pay when an employee leaves.', type: 'workflow' },
    { icon: Icon.TYPES.HOURGLASS_CHECKED_OUTLINE, title: 'Late timesheet reminder', description: 'Nudge employees who haven\'t submitted timesheets by Friday.', type: 'workflow' },
  ],
  'workflow-studio': [
    { icon: Icon.TYPES.DATA_TRANSFER_OUTLINE, title: 'Role change propagation', description: 'When a role changes, update app permissions and team memberships automatically.', type: 'workflow' },
    { icon: Icon.TYPES.NOTIFICATION_OUTLINE, title: 'Contract renewal reminder', description: 'Alert stakeholders 60 days before vendor contracts auto-renew.', type: 'workflow' },
    { icon: Icon.TYPES.LEAVE_MANAGEMENT_OUTLINED, title: 'Time off approval routing', description: 'Route PTO requests to the right manager based on department and approval thresholds.', type: 'workflow' },
  ],
  'notification-center': [
    { icon: Icon.TYPES.DATA_TRANSFER_OUTLINE, title: 'Slack notification relay', description: 'Mirror critical Rippling alerts to a dedicated Slack channel.', type: 'workflow' },
  ],
  'permissions': [
    { icon: Icon.TYPES.KEY, title: 'HR administrator', description: 'Full access to people, payroll, and benefits for HR team members.', type: 'report' },
    { icon: Icon.TYPES.KEY, title: 'Department manager', description: 'View and approve requests for your department only.', type: 'report' },
  ],
  'security': [
    { icon: Icon.TYPES.SHIELD_OUTLINE, title: 'MFA required for admins', description: 'Require multi-factor authentication for all users with admin access.', type: 'report' },
    { icon: Icon.TYPES.NOTIFICATION_OUTLINE, title: 'Suspicious login alert', description: 'Flag logins from new devices or unusual locations.', type: 'workflow' },
  ],
};

// Link label for footer CTA (only used when page has recipes)
const RECIPES_LINK_LABELS: Record<string, string> = {
  'reports': 'or start with a template',
  'data-pipelines': 'or start with a template',
  'data-permissions': 'or start with a template',
  'permissions': 'or start with a template',
  'security': 'or start with a template',
  'recipes': 'or start with a recipe',
  'workflow-studio': 'or start with a recipe',
  'notification-center': 'or start with a recipe',
};

// ── Layout ───────────────────────────────────────────────

const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CenteredBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space500};
  width: 100%;
  max-width: 1120px;
`;

// ── Featured recipes section ──────────────────────────────

const recipeReveal = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FeaturedRecipesSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  width: 100%;
`;

const FeaturedRecipesStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  width: 100%;
  max-width: 1120px;
`;

const RecipeSuggestionRow = styled.button<{ $delay: number }>`
  display: flex;
  align-items: flex-start;
  flex: 1 1 300px;
  max-width: 350px;
  min-width: 0;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => (theme as StyledTheme).space300} ${({ theme }) => (theme as StyledTheme).space400};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border: none;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  cursor: pointer;
  text-align: left;
  transition: background-color 120ms ease, box-shadow 120ms ease;

  animation: ${recipeReveal} 120ms cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: ${({ $delay }) => $delay}ms;

  &:hover {
    background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerHigh};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  }
`;

const RecipeIconCircle = styled.div`
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RecipeTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`;

const RecipeRowTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const RecipeRowDescription = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  line-height: 1.4;
`;

const ViewAllLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  padding: 0 0 ${({ theme }) => (theme as StyledTheme).space200} 0;
  cursor: pointer;
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};

  &:hover {
    color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
    text-decoration: underline;
  }
`;

// ── Feature card detail configs (Documents & Flow Configuration) ──

const DOCUMENTS_FEATURES: FeatureCardDetailConfig[] = [
  {
    icon: Icon.TYPES.SIGNATURE_OUTLINE,
    title: 'Send and Collect Signatures',
    description: 'Send documents for e-signature.',
    modalDescription: 'Send documents for e-signature and track completion across your workforce. Recipients receive a secure link to review and sign—no printing or scanning required. You\'ll get notified when documents are complete, and you can resend reminders or new copies at any time.',
    benefits: ['Legally binding e-signatures', 'Track completion status', 'Resend easily'],
    ctaLabel: 'Send a document',
  },
  {
    icon: Icon.TYPES.DOCUMENT_OUTLINE,
    title: 'Create Templates',
    description: 'Build reusable document templates.',
    modalDescription: 'Build reusable document templates that pull in employee data automatically. Add merge fields for name, title, start date, and more—they\'ll populate when you send. Save time by creating once and reusing for every new hire, policy update, or recurring form.',
    benefits: ['Reuse across employees', 'Merge fields from HR data', 'Version control'],
    ctaLabel: 'Create template',
  },
  {
    icon: Icon.TYPES.PROVISION_USERS_ONBOARD_OUTLINE,
    title: 'Automate Onboarding',
    description: 'Streamline new hire paperwork.',
    modalDescription: 'Streamline new hire paperwork with automated document packets. Trigger a bundle of forms and policies when someone is hired, based on their role, location, or department. Documents are sent automatically with pre-filled data, so HR spends less time chasing signatures.',
    benefits: ['Trigger on hire date', 'Pre-fill from profile', 'Reduce manual follow-up'],
    ctaLabel: 'Set up onboarding packet',
  },
  {
    icon: Icon.TYPES.SEARCH_OUTLINE,
    title: 'Track Compliance',
    description: 'Monitor completion & audits.',
    modalDescription: 'Monitor completion status and maintain an audit trail for compliance. See who\'s signed what, when, and from where. Set expiration dates for policies that need to be re-signed periodically, and run reports for audits or internal reviews.',
    benefits: ['Audit trail for signatures', 'Expiration alerts', 'Compliance reports'],
    ctaLabel: 'View compliance',
  },
];

// ── Documents empty state (hero + features + CTAs) ────────

const DocumentsPageContainer = styled(DiscoveryPageLayout)`
  gap: ${({ theme }) => (theme as StyledTheme).space600};
  padding-top: ${({ theme }) => (theme as StyledTheme).space1000};
`;

const DocumentsFlowVisual = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  width: 280px;
  flex-shrink: 0;
`;

const DocumentsFlowStep = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const DocumentsFeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const DocumentsCtaRow = styled.div`
  display: none; /* TODO: set to flex to show CTA row */
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const DocumentsFooter = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  text-align: center;
`;

// ── Documents empty table (People tab layout) – legacy ────

const DocumentsCard = styled.div`
  width: 100%;
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const DocumentsToolbar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  padding: ${({ theme }) => (theme as StyledTheme).space500};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
`;

const DocumentsToolbarRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const DocumentsSectionTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const DocumentsSearchWrapper = styled.div`
  flex: 1;
  min-width: 0;
  max-width: 360px;
`;

const DocumentsActionsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const DocumentsEmptyTable = styled.div`
  display: flex;
  flex-direction: column;
`;

const DocumentsTableHeader = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 48px;
  padding: 0;
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const DocumentsTableHeaderCell = styled.div<{ $align?: 'left' | 'center' }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
  padding: ${({ theme }) => (theme as StyledTheme).space300} ${({ theme }) => (theme as StyledTheme).space400};
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  justify-content: ${({ $align }) => ($align === 'center' ? 'center' : 'flex-start')};
`;

const DocumentsTableBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => (theme as StyledTheme).space500};
  min-height: 400px;
  padding: ${({ theme }) => (theme as StyledTheme).space600};
`;

// Shared "Need help getting started?" support strip – used by documents, workflow-studio, etc.
const HelpSupportStrip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const HelpSupportList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space500};
`;

const HelpSupportPill = styled.a`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  text-decoration: none;
  cursor: pointer;
  padding: ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space400};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
`;

// ── Component ───────────────────────────────────────────

export const PlatformEmptyState: React.FC<PlatformEmptyStateProps> = ({ pageId, title, icon, onNavigate, onCtaClick }) => {
  const { theme } = usePebbleTheme();
  const meta = getPageMeta(pageId);
  const iconType = icon || Icon.TYPES.SETTINGS_OUTLINE;
  const recipes = PAGE_RECIPES[pageId] ?? [];
  const [selectedFeature, setSelectedFeature] = useState<FeatureCardDetailConfig | null>(null);

  const linkLabel = RECIPES_LINK_LABELS[pageId] ?? 'or start with a template';

  if (pageId === 'documents') {
    const handleCta = onCtaClick ?? (() => {});
    return (
      <PageBody theme={theme}>
        <DocumentsPageContainer theme={theme} size="lg">
          <PageHeroBanner
            layout="side-by-side"
            titleSize="title"
            title="Manage documents and signatures"
            subtitle="Send documents, collect and track signatures, automate distribution, and track compliance — all in one place."
            primaryAction={{ label: 'Send your first document', onClick: handleCta }}
            visual={
              <DocumentsFlowVisual theme={theme}>
                <DocumentsFlowStep theme={theme}>
                  <Icon type={Icon.TYPES.DOCUMENT_OUTLINE} size={24} />
                </DocumentsFlowStep>
                <Icon type={Icon.TYPES.CHEVRON_RIGHT} size={20} color={theme.colorOnSurfaceVariant} />
                <DocumentsFlowStep theme={theme}>
                  <Icon type={Icon.TYPES.FILE_CHECK_OUTLINE} size={24} />
                </DocumentsFlowStep>
                <Icon type={Icon.TYPES.CHEVRON_RIGHT} size={20} color={theme.colorOnSurfaceVariant} />
                <DocumentsFlowStep theme={theme}>
                  <Icon type={Icon.TYPES.USER_OUTLINE} size={24} />
                </DocumentsFlowStep>
              </DocumentsFlowVisual>
            }
            visualMinWidth={280}
            visualMaxWidth={280}
          />

          <div style={{ width: '100%', alignSelf: 'stretch' }}>
            <Separator>How do documents work?</Separator>
          </div>

          <DocumentsFeatureGrid theme={theme}>
            {DOCUMENTS_FEATURES.map((feat, idx) => (
              <FeatureCard
                key={idx}
                icon={feat.icon}
                title={feat.title}
                description={feat.description}
                size="compact"
                iconVariant="neutral"
                onClick={() => setSelectedFeature(feat)}
              />
            ))}
          </DocumentsFeatureGrid>

          <HelpSupportStrip theme={theme}>
            <HelpSupportList theme={theme}>
              <HelpSupportPill theme={theme} href="#">Folder management</HelpSupportPill>
              <HelpSupportPill theme={theme} href="#">Bulk upload documents</HelpSupportPill>
              <HelpSupportPill theme={theme} href="#">Set up document signatories</HelpSupportPill>
              <HelpSupportPill theme={theme} href="#">Document activity history</HelpSupportPill>
            </HelpSupportList>
          </HelpSupportStrip>

          <DocumentsCtaRow theme={theme}>
            <Button
              appearance={Button.APPEARANCES.PRIMARY}
              size={Button.SIZES.M}
              onClick={handleCta}
            >
              Send a Document
            </Button>
            <Button
              appearance={Button.APPEARANCES.OUTLINE}
              size={Button.SIZES.M}
              onClick={handleCta}
            >
              Create Template
            </Button>
            <Button
              appearance={Button.APPEARANCES.OUTLINE}
              size={Button.SIZES.M}
              onClick={handleCta}
            >
              Set Up Onboarding Packet
            </Button>
          </DocumentsCtaRow>

          <DocumentsFooter theme={theme}>
            Works with Workflows, Approvals, and Reports.
          </DocumentsFooter>
        </DocumentsPageContainer>

        <FeatureCardDetailModal
          isVisible={!!selectedFeature}
          feature={selectedFeature}
          onCancel={() => setSelectedFeature(null)}
          onCtaClick={() => { handleCta(); setSelectedFeature(null); }}
        />
      </PageBody>
    );
  }

  return (
    <PageBody theme={theme}>
      <CenteredBlock theme={theme}>
        <ActionCard
          icon={iconType}
          iconColor={theme.colorOnSurfaceVariant}
          title={meta.headline}
          caption={meta.subtext}
          primaryAction={{
            title: meta.cta,
            onClick: onCtaClick ?? (() => {}),
          }}
          alignment={ActionCard.CONTENT_ALIGNMENT.CENTER}
        />

        {recipes.length > 0 && (
          <FeaturedRecipesSection theme={theme}>
            <ViewAllLink theme={theme} onClick={() => onNavigate?.('platform-overview')}>
              {linkLabel}
              <Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} />
            </ViewAllLink>
            <FeaturedRecipesStack theme={theme}>
              {recipes.map((recipe, idx) => (
                <RecipeSuggestionRow
                  key={idx}
                  theme={theme}
                  $delay={idx * 60}
                  onClick={() => onNavigate?.('platform-overview')}
                >
                  <RecipeIconCircle theme={theme}>
                    <Icon type={recipe.icon} size={16} />
                  </RecipeIconCircle>
                  <RecipeTextBlock theme={theme}>
                    <RecipeRowTitle theme={theme}>{recipe.title}</RecipeRowTitle>
                    <RecipeRowDescription theme={theme}>{recipe.description}</RecipeRowDescription>
                  </RecipeTextBlock>
                </RecipeSuggestionRow>
              ))}
            </FeaturedRecipesStack>
          </FeaturedRecipesSection>
        )}

        {pageId === 'workflow-studio' && (
          <>
            <div style={{ width: '100%', alignSelf: 'stretch' }}>
              <Separator>Need help getting started?</Separator>
            </div>
            <HelpSupportStrip theme={theme}>
              <HelpSupportList theme={theme}>
                <HelpSupportPill theme={theme} href="#">How Workflow Studio works</HelpSupportPill>
                <HelpSupportPill theme={theme} href="#">Watch 2min overview</HelpSupportPill>
                <HelpSupportPill theme={theme} href="#">Building your first workflow</HelpSupportPill>
              </HelpSupportList>
            </HelpSupportStrip>
          </>
        )}
      </CenteredBlock>
    </PageBody>
  );
};

export default PlatformEmptyState;
