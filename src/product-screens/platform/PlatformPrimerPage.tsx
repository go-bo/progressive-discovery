import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import Icon from '@rippling/pebble/Icon';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import { PlatformPrimer } from '@/spec';
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

export interface PlatformPrimerPageProps {
  pageId: string;
  onNavigate?: (page: string) => void;
}

export const PlatformPrimerPage: React.FC<PlatformPrimerPageProps> = ({ pageId, onNavigate }) => {
  const { theme } = usePebbleTheme();
  const { discoverySlotVariant, purchasedProducts } = useUserState();

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
      size="md"
    />
  );
};

export default PlatformPrimerPage;
