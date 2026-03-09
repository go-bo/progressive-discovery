import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import {
  PlatformPrimer,
  type FeatureCardGridItem,
  type FeatureCardDetailConfig,
  type TemplateRecipe,
} from '@/spec';
import { useUserState } from '@/framework/user-model';

/**
 * Platform Primer Data Page
 *
 * Uses the PlatformPrimer spec component with Hero + Discovery Slot.
 * Discovery slot variant is controlled by Scenario HUD when on /platform-primer.
 */

// ── Data Catalog Preview (placeholder hero visual) ───────

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

const FRAME_RADIUS = '16px';
const CATALOG_VISUAL_WIDTH = 370;

const CatalogFrame = styled.div`
  width: ${CATALOG_VISUAL_WIDTH}px;
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

const CatalogList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const CatalogRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space300};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
`;

const CatalogRowName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const CatalogRowMeta = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const CatalogLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin-top: ${({ theme }) => (theme as StyledTheme).space200};
  text-align: right;
`;

const CatalogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: ${CATALOG_VISUAL_WIDTH}px !important;
  min-width: ${CATALOG_VISUAL_WIDTH}px !important;
  max-width: ${CATALOG_VISUAL_WIDTH}px !important;
  flex-shrink: 0;
  box-sizing: border-box;
`;

const DataCatalogPlaceholder: React.FC<{ theme: StyledTheme }> = ({ theme }) => (
  <CatalogWrapper theme={theme}>
    <CatalogFrame theme={theme}>
      <CatalogList theme={theme}>
        {CATALOG_OBJECTS.map((obj) => (
          <CatalogRow key={obj.name} theme={theme}>
            <CatalogRowName theme={theme}>{obj.name}</CatalogRowName>
            <CatalogRowMeta theme={theme}>{obj.type} · {obj.records} records</CatalogRowMeta>
          </CatalogRow>
        ))}
      </CatalogList>
    </CatalogFrame>
    <CatalogLabel theme={theme}>Data catalog preview</CatalogLabel>
  </CatalogWrapper>
);

// ── Discovery slot content configs ───────────────────────

const UNLOCK_ITEMS: FeatureCardGridItem[] = [
  {
    id: 'reports',
    icon: Icon.TYPES.REPORT_FILLED,
    title: 'Reports',
    description: 'Build dashboards and scheduled reports from every object. Filter, join, and export with confidence.',
    primaryAction: { label: 'Create report', onClick: () => {} },
  },
  {
    id: 'pipelines',
    icon: Icon.TYPES.LINK_HORIZONTAL,
    title: 'Data pipelines',
    description: 'Sync to Snowflake, BigQuery, or your data warehouse. Know exactly which fields map where.',
    primaryAction: { label: 'Set up pipeline', onClick: () => {} },
  },
  {
    id: 'permissions',
    icon: Icon.TYPES.SHIELD_FILLED,
    title: 'Data permissions',
    description: 'Control who sees sensitive fields. Field-level access keeps PII and financial data protected.',
    primaryAction: { label: 'Manage permissions', onClick: () => {} },
  },
];

const TEMPLATE_RECIPES: TemplateRecipe[] = [
  { icon: Icon.TYPES.USERS_OUTLINE, title: 'Headcount by department', description: 'Current employee count broken down by department and location.' },
  { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Payroll summary report', description: 'Total payroll costs by period with tax breakdowns.' },
  { icon: Icon.TYPES.LEAVE_MANAGEMENT_OUTLINED, title: 'Time off balances', description: 'Accrued, used, and remaining PTO across the company.' },
];

const CAPABILITY_FEATURES: FeatureCardDetailConfig[] = [
  {
    icon: Icon.TYPES.SIGNATURE_OUTLINE,
    title: 'Send & Collect Signatures',
    description: 'Send documents for e-signature.',
    modalDescription: 'Send documents for e-signature and track completion across your workforce. Recipients receive a secure link to review and sign—no printing or scanning required.',
    benefits: ['Legally binding e-signatures', 'Track completion status', 'Resend easily'],
    ctaLabel: 'Send a document',
  },
  {
    icon: Icon.TYPES.DOCUMENT_OUTLINE,
    title: 'Create Templates',
    description: 'Build reusable document templates.',
    modalDescription: 'Build reusable document templates that pull in employee data automatically. Add merge fields for name, title, start date, and more.',
    benefits: ['Reuse across employees', 'Merge fields from HR data', 'Version control'],
    ctaLabel: 'Create template',
  },
  {
    icon: Icon.TYPES.PROVISION_USERS_ONBOARD_OUTLINE,
    title: 'Automate Onboarding',
    description: 'Streamline new hire paperwork.',
    modalDescription: 'Streamline new hire paperwork with automated document packets. Trigger a bundle of forms and policies when someone is hired.',
    benefits: ['Trigger on hire date', 'Pre-fill from profile', 'Reduce manual follow-up'],
    ctaLabel: 'Set up onboarding packet',
  },
  {
    icon: Icon.TYPES.SEARCH_OUTLINE,
    title: 'Track Compliance',
    description: 'Monitor completion & audits.',
    modalDescription: 'Monitor completion status and maintain an audit trail for compliance.',
    benefits: ['Audit trail for signatures', 'Expiration alerts', 'Compliance reports'],
    ctaLabel: 'View compliance',
  },
];

// ── Component ────────────────────────────────────────────

export interface PlatformPrimerDataPageProps {
  onNavigate?: (page: string) => void;
}

export const PlatformPrimerDataPage: React.FC<PlatformPrimerDataPageProps> = ({ onNavigate }) => {
  const { theme } = usePebbleTheme();
  const { discoverySlotVariant } = useUserState();

  return (
    <PlatformPrimer
      hero={{
        title: "Your company's data, organized and discoverable",
        subtitle: "Browse every object in Rippling—employees, policies, pay runs. See fields, relationships, and metadata. The catalog powers reports, pipelines, and integrations.",
        primaryAction: { label: 'Explore data catalog', onClick: () => onNavigate?.('data-catalog') },
        visual: <DataCatalogPlaceholder theme={theme} />,
        layout: 'side-by-side',
        titleSize: 'title',
        visualMinWidth: CATALOG_VISUAL_WIDTH,
        visualMaxWidth: CATALOG_VISUAL_WIDTH,
      }}
      discoverySlotVariant={discoverySlotVariant ?? 'unlock'}
      discoverySlotTemplate={{
        linkLabel: 'or start with a template',
        recipes: TEMPLATE_RECIPES,
        onViewAll: () => onNavigate?.('data-overview'),
      }}
      discoverySlotCapability={{
        separatorLabel: 'How do documents work?',
        features: CAPABILITY_FEATURES,
        onCta: () => onNavigate?.('documents'),
      }}
      discoverySlotUnlock={{
        category: 'The catalog powers your entire data stack',
        categorySubtitle: 'From ad-hoc reports to warehouse syncs—everything starts with understanding your data.',
        items: UNLOCK_ITEMS,
        iconVariant: 'accent',
      }}
      size="md"
    />
  );
};

export default PlatformPrimerDataPage;
