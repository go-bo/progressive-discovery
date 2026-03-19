import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import { DiscoveryPageLayout, PageHeroBanner, FeatureCardGrid } from '@/spec';
import type { FeatureCardGridItem } from '@/spec';

// ── Layout ──────────────────────────────────────────────

/* Hero needs min 802px (400 content + 32 gap + 370 visual) – scroll when narrow (e.g. expansion panel open) */
const HERO_MIN_WIDTH = 802;

const PageContainer = styled(DiscoveryPageLayout)`
  gap: ${({ theme }) => (theme as StyledTheme).space600};
`;

const HeroScrollWrap = styled.div`
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  padding: 0;
`;

const HeroInner = styled.div`
  min-width: ${HERO_MIN_WIDTH}px;
`;

// ── Data Catalog Preview (placeholder hero visual) ───────

const CATALOG_OBJECTS = [
  { name: 'Employee', type: 'Core', records: '245' },
  { name: 'Accounting Integrations', type: 'Finance', records: '3' },
  { name: 'Audit Log', type: 'Platform', records: '12,408' },
  { name: 'Billing', type: 'Finance', records: '48' },
  { name: 'Compliance 360', type: 'HR', records: '17' },
  { name: 'Documents', type: 'Platform', records: '312' },
  { name: 'Employee Lifecycle', type: 'HR', records: '1,204' },
  { name: 'Filing Factory', type: 'Payroll', records: '89' },
  { name: 'Functions', type: 'Developer', records: '14' },
  { name: 'Google Workspace', type: 'IT', records: '156' },
  { name: 'IT Activity Log', type: 'IT', records: '2,341' },
  { name: 'IT Management', type: 'IT', records: '67' },
];

const FRAME_RADIUS = '16px';

/* Data catalog visual: 370px wide, 350px tall */
const CATALOG_VISUAL_WIDTH = 370;
const CATALOG_VISUAL_HEIGHT = 350;

const CatalogFrame = styled.div`
  width: ${CATALOG_VISUAL_WIDTH}px;
  height: ${CATALOG_VISUAL_HEIGHT}px;
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
  </CatalogWrapper>
);

// ── Feature card data ───────────────────────────────────

const DATA_CATALOG_POWER_ITEMS: FeatureCardGridItem[] = [
  {
    id: 'reports',
    icon: Icon.TYPES.REPORT_FILLED,
    title: 'Reports',
    description: 'Build dashboards and scheduled reports from every object. Filter, join, and export with confidence.',
    primaryAction: { label: 'View reports', onClick: () => {} },
  },
  {
    id: 'workflows',
    icon: Icon.TYPES.REPORT_CHECKLIST_FILLED,
    title: 'Workflows',
    description: 'Trigger automations from data changes — route approvals, provision access, and notify stakeholders.',
    primaryAction: { label: 'View workflows', onClick: () => {} },
  },
  {
    id: 'activity-log',
    icon: Icon.TYPES.AUDIT_OBSERVATION_OUTLINE,
    title: 'Activity Log',
    description: 'See exactly what changed, when, and who did it — a full audit trail across every object.',
    primaryAction: { label: 'View activity', onClick: () => {} },
  },
];

// ── Component ────────────────────────────────────────────

export interface DataCatalogPageProps {
  onNavigate?: (page: string) => void;
}

export const DataCatalogPage: React.FC<DataCatalogPageProps> = ({ onNavigate }) => {
  const { theme } = usePebbleTheme();

  return (
    <PageContainer theme={theme} size="md">
      <HeroScrollWrap theme={theme}>
        <HeroInner>
        <PageHeroBanner
          layout="side-by-side"
          titleSize="title"
          title="Your company's data, organized and discoverable"
          subtitle="Browse every object in Rippling—employees, policies, pay runs. See fields, relationships, and metadata. The catalog powers reports, pipelines, and integrations."
          primaryAction={{ label: 'Explore data catalog', onClick: () => onNavigate?.('data-catalog') }}
          visual={<DataCatalogPlaceholder theme={theme} />}
          visualMinWidth={CATALOG_VISUAL_WIDTH}
          visualMaxWidth={CATALOG_VISUAL_WIDTH}
        />
        </HeroInner>
      </HeroScrollWrap>
      <FeatureCardGrid
        category="The catalog powers your entire data stack"
        categorySubtitle="From ad-hoc reports to warehouse syncs—everything starts with understanding your data."
        iconVariant="accent"
        items={DATA_CATALOG_POWER_ITEMS}
      />
    </PageContainer>
  );
};

export default DataCatalogPage;
