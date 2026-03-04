import React from 'react';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import { usePebbleTheme } from '@/utils/theme';
import {
  DiscoveryPageLayout,
  PlatformHubTemplate,
  CapabilityItem,
  HubWidget, HubWidgetHeader, HubWidgetTitle, HubWidgetDesc,
} from '@/product-screens/shared';
import type { HubHeroFeature } from '@/product-screens/shared';

interface DataOverviewPageProps {
  onNavigate?: (page: string) => void;
}

const buildFeatures = (onNavigate?: (page: string) => void): HubHeroFeature[] => [
  {
    id: 'reports',
    icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_FILLED,
    title: 'Reports',
    description: 'Build custom reports from any data across Rippling — employee demographics, payroll totals, time off balances, and more. Schedule recurring reports or export on demand.',
    ctaLabel: 'Explore',
    onCtaClick: () => onNavigate?.('reports'),
    secondaryAction: {},
  },
  {
    id: 'data-catalog',
    icon: Icon.TYPES.TABLE_COLUMN_FILLED,
    title: 'Catalog',
    description: 'Browse every data object in your Rippling account. See fields, relationships, and metadata for employees, policies, pay runs, and custom objects.',
    ctaLabel: 'Explore',
    onCtaClick: () => onNavigate?.('data-catalog'),
    secondaryAction: {},
  },
  {
    id: 'data-pipelines',
    icon: Icon.TYPES.SWAP,
    title: 'Data Pipelines',
    description: 'Sync data between Rippling and external systems like your data warehouse, BI tools, or HRIS. Set up real-time or scheduled syncs with no code.',
    ctaLabel: 'Explore',
    onCtaClick: () => onNavigate?.('data-pipelines'),
    secondaryAction: {},
  },
  {
    id: 'data-permissions',
    icon: Icon.TYPES.V2_KEY_FILLED,
    title: 'Object Permissions',
    description: 'Control exactly who can read, write, or delete each data object. Set field-level permissions to protect sensitive employee and financial data.',
    ctaLabel: 'Explore',
    onCtaClick: () => onNavigate?.('data-permissions'),
    secondaryAction: {},
  },
];

export const DataOverviewPage: React.FC<DataOverviewPageProps> = ({ onNavigate }) => {
  const { theme } = usePebbleTheme();

  return (
    <DiscoveryPageLayout size="lg">
      <PlatformHubTemplate
        title="Data & Reporting"
      subtitle="Your single source of truth — report on, export, and pipe any data across Rippling"
      heroFeatures={buildFeatures(onNavigate)}
      rightRail={
        <>
          <HubWidget theme={theme}>
            <HubWidgetHeader theme={theme}>
              <HubWidgetTitle theme={theme}>Popular reports</HubWidgetTitle>
              <HubWidgetDesc theme={theme}>Commonly used by companies like yours</HubWidgetDesc>
            </HubWidgetHeader>
            <CapabilityItem icon={Icon.TYPES.USERS_OUTLINE} title="Headcount by department" description="Current employee count broken down by department" />
            <CapabilityItem icon={Icon.TYPES.DOLLAR_CIRCLE_OUTLINE} title="Payroll summary" description="Total payroll costs by period with tax breakdowns" />
            <CapabilityItem icon={Icon.TYPES.LEAVE_MANAGEMENT_OUTLINED} title="Time off balances" description="Accrued, used, and remaining PTO across the company" />
          </HubWidget>

          <HubWidget theme={theme}>
            <HubWidgetHeader theme={theme}>
              <HubWidgetTitle theme={theme}>Getting started with Data</HubWidgetTitle>
              <HubWidgetDesc theme={theme}>
                Your Rippling data is already structured and ready. Start by creating your first report or browsing the catalog.
              </HubWidgetDesc>
            </HubWidgetHeader>
            <Button size={Button.SIZES.S} onClick={() => onNavigate?.('reports')}>
              Create a report
            </Button>
          </HubWidget>
        </>
      }
    />
    </DiscoveryPageLayout>
  );
};
