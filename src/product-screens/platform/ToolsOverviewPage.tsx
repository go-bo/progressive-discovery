import React from 'react';
import styled from '@emotion/styled';
import Icon from '@rippling/pebble/Icon';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import {
  DiscoveryPageLayout,
  PlatformHubTemplate,
  FeatureCardGrid,
  CapabilityItem,
  HubWidget,
  HubWidgetHeader,
  HubWidgetTitle,
  HubWidgetDesc,
  DISCOVER_PRODUCTS,
} from '@/product-screens/shared';
import type { HubHeroFeature, FeatureCardGridItem } from '@/product-screens/shared';

const DiscoverToolsSection = styled.div`
  margin-top: ${({ theme }) => (theme as StyledTheme).space800};
`;

interface ToolsOverviewPageProps {
  onNavigate?: (page: string) => void;
}

const buildHero = (onNavigate?: (page: string) => void): HubHeroFeature[] => [
  {
    id: 'workflow-studio',
    icon: Icon.TYPES.THUNDERBOLT_FILLED,
    title: 'Workflow Studio',
    description: 'Build advanced automations with a visual drag-and-drop builder. Chain together triggers, conditions, and actions across any Rippling app or connected integration.',
    ctaLabel: 'Explore',
    onCtaClick: () => onNavigate?.('workflow-studio'),
    secondaryAction: {},
  },
  {
    id: 'documents',
    icon: Icon.TYPES.FILE_FILLED,
    title: 'Documents',
    description: 'Store, send, and e-sign documents. Automate offer letters, NDAs, and onboarding packets with templates and approval flows.',
    ctaLabel: 'Explore',
    onCtaClick: () => onNavigate?.('documents'),
    secondaryAction: {},
  },
  {
    id: 'recipes',
    icon: Icon.TYPES.RECIPES_FILLED,
    title: 'Recipes',
    description: 'Automate multi-step processes across Rippling. Trigger actions when employees are hired, terminated, promoted, or when custom conditions are met — no code required.',
    ctaLabel: 'Explore',
    onCtaClick: () => onNavigate?.('recipes'),
    secondaryAction: {},
  },
];

const TOOLS_SUITE_ITEMS: FeatureCardGridItem[] = [
  ...DISCOVER_PRODUCTS.map((p) => ({
    id: p.id,
    icon: p.icon,
    title: p.title,
    description: p.description,
    primaryAction: { label: 'Learn more' },
  })),
  {
    id: 'payroll',
    icon: Icon.TYPES.PAYROLL_FILLED,
    title: 'Run payroll',
    description: 'Process payroll, tax filings, and pay stubs in one place',
    primaryAction: { label: 'Learn more' },
  },
  {
    id: 'recruiting',
    icon: Icon.TYPES.RECRUITING_FILLED,
    title: 'Hire with Rippling',
    description: 'Source, screen, and onboard candidates in one system',
    primaryAction: { label: 'Learn more' },
  },
];

export const ToolsOverviewPage: React.FC<ToolsOverviewPageProps> = ({ onNavigate }) => {
  const { theme } = usePebbleTheme();

  return (
    <DiscoveryPageLayout size="lg">
      <PlatformHubTemplate
        title="Tools"
      subtitle="Automate, track, and manage everything across your Rippling apps"
      heroFeatures={buildHero(onNavigate)}
      rightRail={
        <>
          <HubWidget theme={theme}>
            <HubWidgetHeader theme={theme} compact>
              <HubWidgetTitle theme={theme}>Productivity</HubWidgetTitle>
              <HubWidgetDesc theme={theme}>Stay on top of tasks, approvals, and alerts</HubWidgetDesc>
            </HubWidgetHeader>
            <CapabilityItem
              icon={Icon.TYPES.INBOX_OUTLINE}
              title="Inbox"
              description="Approvals, tasks, and notifications across all Rippling apps"
              size="default"
              iconVariant="neutral"
              trailing="chevron"
              onClick={() => onNavigate?.('inbox')}
            />
            <CapabilityItem
              icon={Icon.TYPES.NOTIFICATION_OUTLINE}
              title="Notification Center"
              description="Configure how and when your team receives alerts"
              size="default"
              iconVariant="neutral"
              trailing="chevron"
              onClick={() => onNavigate?.('notification-center')}
            />
            <CapabilityItem
              icon={Icon.TYPES.CHECKBOX_WITHCHECK_OUTLINE}
              title="Approvals"
              description="Manage approval chains for time off, expenses, and documents"
              size="default"
              iconVariant="neutral"
              trailing="chevron"
              onClick={() => onNavigate?.('approvals')}
            />
          </HubWidget>

          <HubWidget theme={theme}>
            <HubWidgetHeader theme={theme} compact>
              <HubWidgetTitle theme={theme}>Administration</HubWidgetTitle>
              <HubWidgetDesc theme={theme}>Audit activity, manage APIs, and test changes</HubWidgetDesc>
            </HubWidgetHeader>
            <CapabilityItem
              icon={Icon.TYPES.SEARCH_OUTLINE}
              title="Activity Log"
              description="Track every action taken in Rippling"
              size="default"
              iconVariant="neutral"
              trailing="chevron"
              onClick={() => onNavigate?.('activity-log')}
            />
            <CapabilityItem
              icon={Icon.TYPES.E_CODE_EMBED}
              title="Developer"
              description="API access, webhooks, and developer tools"
              size="default"
              iconVariant="neutral"
              trailing="chevron"
              onClick={() => onNavigate?.('developer')}
            />
            <CapabilityItem
              icon={Icon.TYPES.SANDBOX_OUTLINE}
              title="Sandbox"
              description="Test configuration changes before production"
              size="default"
              iconVariant="neutral"
              trailing="chevron"
              onClick={() => onNavigate?.('sandbox')}
            />
          </HubWidget>
        </>
      }
    >
      <DiscoverToolsSection theme={theme}>
        <FeatureCardGrid
          category="Tools power all Rippling products"
          categorySubtitle="Explore other Rippling products that amplify the impact of your workflows and automations."
          items={TOOLS_SUITE_ITEMS}
          iconVariant="accent"
          viewAllLink={{ label: 'View all products', onClick: () => onNavigate?.('app-shop') }}
        />
      </DiscoverToolsSection>
    </PlatformHubTemplate>
    </DiscoveryPageLayout>
  );
};
