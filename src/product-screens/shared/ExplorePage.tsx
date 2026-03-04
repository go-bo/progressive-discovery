import React from 'react';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import { usePebbleTheme } from '@/utils/theme';
import { StyledTheme } from '@/utils/theme';
import styled from '@emotion/styled';
import { DISCOVER_PRODUCTS } from './discoverProducts';
import {
  DiscoveryPageLayout,
  PlatformHubTemplate,
  CapabilityItem,
  HubWidget, HubWidgetHeader, HubWidgetTitle, HubWidgetDesc,
  HubWidgetLink, HubWidgetAccent,
} from '@/spec';
import type { HubHeroFeature } from '@/spec';

const ExpertLink = styled.a`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  text-decoration: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

const heroFeatures: HubHeroFeature[] = DISCOVER_PRODUCTS.map((card) => ({
  id: card.id,
  icon: card.icon,
  title: card.title,
  description: card.description,
  ctaLabel: 'Learn more',
  onCtaClick: () => {},
  secondaryAction: {},
}));

export const ExplorePage: React.FC = () => {
  const { theme } = usePebbleTheme();

  return (
    <DiscoveryPageLayout size="lg">
      <PlatformHubTemplate
      title="Rippling at a glance"
      subtitle="Go beyond time tracking with Rippling's full platform"
      tabs={[
        { id: 'recommended', label: 'Recommended for you' },
        { id: 'products', label: 'Our products (A-Z)' },
        { id: 'integrations', label: '3rd party integrations' },
      ]}
      heroFeatures={heroFeatures}
      rightRail={
        <>
          <HubWidget theme={theme}>
            <HubWidgetHeader theme={theme}>
              <HubWidgetTitle theme={theme}>Recommended workflows</HubWidgetTitle>
              <HubWidgetDesc theme={theme}>Based on your products</HubWidgetDesc>
            </HubWidgetHeader>
            <CapabilityItem icon={Icon.TYPES.OVERTIME_POLICY_OUTLINE} title="Send alert" description="When employee approaches overtime limit" trailing={<Button appearance={Button.APPEARANCES.OUTLINE} size={Button.SIZES.XS}>Configure</Button>} />
            <CapabilityItem icon={Icon.TYPES.REPORTS_OUTLINE} title="Generate report" description="Every month with approved timecards" trailing={<Button appearance={Button.APPEARANCES.OUTLINE} size={Button.SIZES.XS}>Configure</Button>} />
            <CapabilityItem icon={Icon.TYPES.SWAP} title="Offer open shifts" description="Send an email to your team when a shift opens up" trailing={<Button appearance={Button.APPEARANCES.OUTLINE} size={Button.SIZES.XS}>Configure</Button>} />
            <HubWidgetLink theme={theme}>More workflows</HubWidgetLink>
          </HubWidget>

          <HubWidgetAccent theme={theme}>
            <CapabilityItem icon={Icon.TYPES.PHONE_OUTLINE} title="Talk to a Rippling expert" description="One of our onboarding specialists will help you set up payroll" iconVariant="accent" trailing={<ExpertLink theme={theme}>Book a call <Icon type={Icon.TYPES.ARROW_RIGHT} size={16} /></ExpertLink>} />
          </HubWidgetAccent>
        </>
      }
    />
    </DiscoveryPageLayout>
  );
};

export default ExplorePage;
