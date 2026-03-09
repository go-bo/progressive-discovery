import React, { useMemo, useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import TableBasic from '@rippling/pebble/TableBasic';
import Label from '@rippling/pebble/Label';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import { PlatformPrimer, PrimerCompactModule } from '@/spec';
import { useUserState } from '@/framework/user-model';
import { PLATFORM_PAGES } from './platformPages';
import {
  PRIMER_PAGE_CONFIGS,
  DataCatalogVisual,
  ReportsVisual,
  DocumentsVisual,
  DataPipelinesVisual,
  ApprovalsVisual,
  DeveloperVisual,
  WorkflowStudioVisual,
  ObjectPermissionsVisual,
  ActivityLogVisual,
  FlowConfigVisual,
  PermissionsVisual,
  SupergroupsVisual,
  ChatVisual,
  VISUAL_WIDTH,
} from './primer-configs';

// ── App identity eyebrow (full-page primers) ─────────────

const AppEyebrow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space200};
  width: fit-content;
`;

const AppIconBox = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  background: ${({ theme }) => (theme as StyledTheme).colorPrimaryContainer};
  color: ${({ theme }) => (theme as StyledTheme).colorOnPrimaryContainer};
  flex-shrink: 0;
`;

const AppName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const VISUAL_COMPONENTS: Record<string, React.FC<{ theme: any }>> = {
  'data-catalog': DataCatalogVisual,
  'reports': ReportsVisual,
  'documents': DocumentsVisual,
  'data-pipelines': DataPipelinesVisual,
  'approvals': ApprovalsVisual,
  'developer': DeveloperVisual,
  'workflow-studio': WorkflowStudioVisual,
  'data-permissions': ObjectPermissionsVisual,
  'activity-log': ActivityLogVisual,
  'flow-configuration': FlowConfigVisual,
  'permissions': PermissionsVisual,
  'saved-supergroups': SupergroupsVisual,
  'chat': ChatVisual,
};

// ── Reports "Shared with me" tab data ────────────────────

const SHARED_REPORTS = [
  { name: 'What % of objects are vs are not supported in our API?', sharedBy: 'Callen Raventt', updatedAt: 'October 10, 2025' },
  { name: 'Which initiatives are over budget?', sharedBy: 'Callen Raventt', updatedAt: 'October 28, 2025' },
  { name: 'Which initiatives have budget remaining?', sharedBy: 'Callen Raventt', updatedAt: 'October 28, 2025' },
  { name: 'What products make up the API priority buckets?', sharedBy: 'Callen Raventt', updatedAt: 'October 10, 2025' },
  { name: 'Pushed In-Quarter Top Asks - PLT Product Leadership', sharedBy: 'Tomer Schwartz', updatedAt: 'July 14, 2025' },
  { name: 'Total GA Launches - PLT PMC', sharedBy: 'Brian Mazzaferi', updatedAt: 'July 14, 2025' },
  { name: 'Sales Top Asks - Delivered by Quarter: PLT Product Leadership', sharedBy: 'Tomer Schwartz', updatedAt: 'July 14, 2025' },
  { name: 'UKI Top Asks - Open by Target Quarter', sharedBy: 'Brian Mazzaferi', updatedAt: 'November 20, 2025' },
  { name: 'Active recruiting pipeline milestones by department report', sharedBy: 'Sandeep Batchu', updatedAt: 'October 10, 2025' },
  { name: 'Quarterly headcount forecast vs actuals', sharedBy: 'Callen Raventt', updatedAt: 'December 2, 2025' },
];

const AiPromptBox = styled.div`
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const AiPromptLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const AiPromptInput = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  padding: ${({ theme }) => (theme as StyledTheme).space200} 0;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => (theme as StyledTheme).space400} 0 ${({ theme }) => (theme as StyledTheme).space200};
`;

const SectionTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const ReportNameCell = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const ReportName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const ReportSharedBy = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const TableWrap = styled.div`
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  overflow: hidden;
`;

const TabPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  width: 100%;
  padding: ${({ theme }) => (theme as StyledTheme).space400} 0;
`;

// ── FTUX Popover Callout ─────────────────────────────────

const ftuxFadeDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FtuxAnchor = styled.div`
  position: relative;
`;

const FtuxPopover = styled.div`
  position: absolute;
  bottom: calc(100% + 10px);
  left: -12px;
  z-index: 50;
  animation: ${ftuxFadeDown} 350ms cubic-bezier(0.16, 1, 0.3, 1) both;
  animation-delay: 500ms;
`;

const FtuxCaret = styled.div`
  position: absolute;
  bottom: -6px;
  left: 32px;
  width: 12px;
  height: 12px;
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-right: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  transform: rotate(45deg);
`;

const FtuxCard = styled.div`
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  padding: ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space200} ${({ theme }) => (theme as StyledTheme).space300};
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  white-space: nowrap;
`;

const FtuxIconCircle = styled.div`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerMd};
  background: ${({ theme }) => (theme as StyledTheme).colorPrimaryContainer};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const FtuxMessage = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  flex: 1;
  min-width: 0;
`;

export interface PlatformPrimerPageProps {
  pageId: string;
  onNavigate?: (page: string) => void;
  activeTabIndex?: number;
}

export const PlatformPrimerPage: React.FC<PlatformPrimerPageProps> = ({ pageId, onNavigate, activeTabIndex }) => {
  const { theme } = usePebbleTheme();
  const { discoverySlotVariant, purchasedProducts, heroPresentationMode } = useUserState();
  const [ftuxVisible, setFtuxVisible] = useState(false);
  const [ftuxPermanentlyDismissed, setFtuxPermanentlyDismissed] = useState(false);

  useEffect(() => {
    if (pageId === 'reports' && activeTabIndex === 3 && !ftuxPermanentlyDismissed) {
      setFtuxVisible(true);
    } else {
      setFtuxVisible(false);
    }
  }, [pageId, activeTabIndex, ftuxPermanentlyDismissed]);

  const config = PRIMER_PAGE_CONFIGS[pageId];
  if (!config) return null;

  const VisualComponent = VISUAL_COMPONENTS[pageId];
  const visual = VisualComponent ? <VisualComponent theme={theme} /> : undefined;

  const filteredRecipes = useMemo(() => {
    if (!config.template) return [];
    return config.template.recipes.filter(
      r => !r.requiredSku || purchasedProducts.includes(r.requiredSku as any),
    );
  }, [config.template, purchasedProducts]);

  // Reports: "Shared with me" tab (index 3)
  if (pageId === 'reports' && activeTabIndex === 3) {
    return (
      <TabPageContainer theme={theme}>
        <AiPromptBox theme={theme}>
          <AiPromptLabel theme={theme}>
            <Icon type={Icon.TYPES.THUNDERBOLT_OUTLINE} size={16} />
            What would you like to analyze?
          </AiPromptLabel>
          <AiPromptInput theme={theme}>Ask, @search, or create…</AiPromptInput>
        </AiPromptBox>

        <FtuxAnchor>
          <SectionHeader theme={theme}>
            <SectionTitle theme={theme}>Shared with me · {SHARED_REPORTS.length}</SectionTitle>
          </SectionHeader>

          {ftuxVisible && (
            <FtuxPopover>
              <FtuxCard theme={theme}>
                <FtuxIconCircle theme={theme}>
                  <Icon type={Icon.TYPES.THUNDERBOLT_OUTLINE} size={16} color={theme.colorOnPrimaryContainer} />
                </FtuxIconCircle>
                <FtuxMessage theme={theme}>
                  Reports your teammates share with you appear here.
                </FtuxMessage>
                <Button.Icon
                  icon={Icon.TYPES.CLOSE}
                  aria-label="Dismiss"
                  appearance={Button.APPEARANCES.GHOST}
                  size={Button.SIZES.S}
                  onClick={() => {
                    setFtuxVisible(false);
                    setFtuxPermanentlyDismissed(true);
                  }}
                />
              </FtuxCard>
              <FtuxCaret theme={theme} />
            </FtuxPopover>
          )}
        </FtuxAnchor>

        <TableWrap theme={theme}>
          <TableBasic>
            <TableBasic.THead>
              <TableBasic.Tr>
                <TableBasic.Th>Report Name</TableBasic.Th>
                <TableBasic.Th>Updated at</TableBasic.Th>
                <TableBasic.Th>Sharing</TableBasic.Th>
              </TableBasic.Tr>
            </TableBasic.THead>
            <TableBasic.TBody>
              {SHARED_REPORTS.map((report, i) => (
                <TableBasic.Tr key={i}>
                  <TableBasic.Td>
                    <ReportNameCell theme={theme}>
                      <ReportName theme={theme}>{report.name}</ReportName>
                      <ReportSharedBy theme={theme}>Shared by {report.sharedBy}</ReportSharedBy>
                    </ReportNameCell>
                  </TableBasic.Td>
                  <TableBasic.Td>Updated on {report.updatedAt}</TableBasic.Td>
                  <TableBasic.Td>
                    <Label appearance={Label.APPEARANCES.INFO} size={Label.SIZES.S}>Shared with me</Label>
                  </TableBasic.Td>
                </TableBasic.Tr>
              ))}
            </TableBasic.TBody>
          </TableBasic>
        </TableWrap>
      </TabPageContainer>
    );
  }

  // Compact module for non-primary tabs (e.g., reports "All reports", "My reports", etc.)
  const showCompact = pageId === 'reports' && activeTabIndex !== undefined && activeTabIndex > 0;
  if (showCompact) {
    const compactRecipes = filteredRecipes.slice(0, 3).map(r => ({
      icon: r.icon,
      title: r.title,
      description: r.description,
    }));

    const compactTips = config.capability?.features.slice(0, 3).map(f => ({
      text: `${f.title} — ${f.description.replace(/\.$/, '').toLowerCase()}`,
    }));

    return (
      <div style={{ padding: `${theme.space600} 0` }}>
        <PrimerCompactModule
          statusLabel={`${filteredRecipes.length} report templates available`}
          statusIcon={Icon.TYPES.BAR_CHART_OUTLINE}
          title="Build dashboards and scheduled reports from any Rippling data."
          subtitle="Filter, join, and export with confidence."
          cta="Start using reports"
          onCtaClick={() => onNavigate?.(pageId)}
          templateLabel={config.template ? 'Start with a template' : undefined}
          recipes={compactRecipes}
          maxRecipes={3}
          tipsLabel={config.capability ? 'How reports power your workflow' : undefined}
          tips={compactTips}
        />
      </div>
    );
  }

  const pageInfo = PLATFORM_PAGES[pageId];
  const eyebrow = config.fullPage && pageInfo ? (
    <AppEyebrow theme={theme}>
      <AppIconBox theme={theme}>
        <Icon type={config.fullPageIconFilled ?? pageInfo.icon} size={18} color={theme.colorOnPrimaryContainer} />
      </AppIconBox>
      <AppName theme={theme}>{config.fullPageTitle ?? pageInfo.title}</AppName>
    </AppEyebrow>
  ) : undefined;

  return (
    <PlatformPrimer
      hero={{
        title: config.heroTitle,
        subtitle: config.heroSubtitle,
        primaryAction: { label: config.heroCta, onClick: () => onNavigate?.(pageId) },
        secondaryText: config.heroSecondaryText,
        eyebrow,
        visual,
        layout: visual ? 'side-by-side' : 'stacked',
        titleSize: 'title',
        ...(visual ? { visualMinWidth: VISUAL_WIDTH, visualMaxWidth: VISUAL_WIDTH } : {}),
      }}
      discoverySlotVariant={discoverySlotVariant ?? config.defaultVariant}
      discoverySlotTemplate={config.template ? {
        linkLabel: config.template.linkLabel,
        recipes: filteredRecipes,
        onViewAll: () => onNavigate?.(pageId),
      } : undefined}
      discoverySlotCapability={config.capability ? {
        separatorLabel: config.capability.separatorLabel,
        features: config.capability.features,
        onCta: () => onNavigate?.(pageId),
      } : undefined}
      discoverySlotUnlock={config.unlock ? {
        category: config.unlock.category,
        categorySubtitle: config.unlock.categorySubtitle,
        items: config.unlock.items,
        iconVariant: 'accent',
      } : undefined}
      secondaryDiscovery={config.secondaryDiscovery}
      heroPresentationMode={heroPresentationMode !== 'hero' ? heroPresentationMode : (config.defaultHeroPresentationMode ?? heroPresentationMode)}
      heroIcon={pageInfo?.icon}
      size="md"
    />
  );
};

export default PlatformPrimerPage;
