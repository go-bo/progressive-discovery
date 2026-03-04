import React from 'react';
import styled from '@emotion/styled';
import { useParams, useLocation, Navigate } from 'react-router-dom';
import { usePebbleTheme, StyledTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import {
  FeatureCard,
  PageHeroBanner,
  DiscoveryPageLayout,
  PlatformHubTemplate,
  FeatureCardGrid,
  ValuePropsGrid,
  CapabilityItem,
  HubWidget,
  HubWidgetHeader,
  HubWidgetTitle,
  HubWidgetDesc,
} from '@/spec';

const SpecBlock = styled.div`
  width: 100%;
`;

const SpecHeader = styled.div`
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space600};
`;

const SpecTitle = styled.h2`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0 0 ${({ theme }) => (theme as StyledTheme).space200} 0;
`;

const SpecDescription = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  line-height: 1.5;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const PlaceholderVisual = styled.div`
  width: 100%;
  height: 120px;
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const TemplatePlaceholder = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
`;

const SampleContentBlock = styled.div`
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const VariantSection = styled.div`
  margin-top: ${({ theme }) => (theme as StyledTheme).space800};
`;

const VariantLabel = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space300};
`;

const validItems: Record<string, Record<string, boolean>> = {
  components: { 'feature-card': true, 'page-hero-banner': true, 'discovery-page-layout': true, 'capability-item': true },
  patterns: { 'hub-with-right-rail': true, 'feature-card-grid': true, 'value-props-grid': true },
  templates: { 'unpurchased-sku-page': true, 'platform-empty-state': true, 'feature-activation': true },
};

const DesignSpecsContent: React.FC = () => {
  const { item } = useParams<{ item: string }>();
  const { pathname } = useLocation();
  const category = pathname.includes('/components/') ? 'components' : pathname.includes('/patterns/') ? 'patterns' : pathname.includes('/templates/') ? 'templates' : null;
  const { theme } = usePebbleTheme();

  if (!category || !item || !validItems[category]?.[item]) {
    return <Navigate to="/design-specs/components/feature-card" replace />;
  }

  const renderSpec = () => {
    if (category === 'components') {
      if (item === 'feature-card') {
        return (
          <DiscoveryPageLayout size="lg" theme={theme}>
            <SpecHeader theme={theme}>
              <SpecTitle theme={theme}>FeatureCard</SpecTitle>
              <SpecDescription theme={theme}>
                Reusable card for features. Two size variants: hero (highlighted features) and compact (grids).
              </SpecDescription>
            </SpecHeader>

            <VariantSection theme={theme}>
              <VariantLabel theme={theme}>Size: hero</VariantLabel>
              <SpecDescription theme={theme} style={{ marginBottom: theme.space400 }}>
                Large card for featured content. Supports optional visual, primary and secondary actions.
              </SpecDescription>
              <FeatureCard
                icon={Icon.TYPES.CHECKBOX_WITHCHECK_OUTLINE}
                title="Hero feature"
                description="A hero-sized feature card with primary action."
                size="hero"
                visual={<PlaceholderVisual theme={theme}>Visual</PlaceholderVisual>}
                primaryAction={{ label: 'Explore', onClick: () => {} }}
                secondaryAction={{ label: 'Learn more', onClick: () => {} }}
              />
            </VariantSection>

            <VariantSection theme={theme}>
              <VariantLabel theme={theme}>Size: compact</VariantLabel>
              <SpecDescription theme={theme} style={{ marginBottom: theme.space400 }}>
                Smaller card for grids. Variations: with primary action, with primary + secondary, or clickable (onClick).
              </SpecDescription>
              <CardGrid theme={theme}>
                <div>
                  <VariantLabel theme={theme}>With primary action</VariantLabel>
                  <FeatureCard
                    icon={Icon.TYPES.CREDIT_CARD_OUTLINE}
                    title="Get started"
                    description="Compact card with a primary CTA."
                    size="compact"
                    primaryAction={{ label: 'Get started', onClick: () => {} }}
                  />
                </div>
                <div>
                  <VariantLabel theme={theme}>With primary + secondary</VariantLabel>
                  <FeatureCard
                    icon={Icon.TYPES.BAR_CHART_OUTLINE}
                    title="Reporting"
                    description="Card with main and secondary actions."
                    size="compact"
                    primaryAction={{ label: 'Explore', onClick: () => {} }}
                    secondaryAction={{ label: 'Learn more', onClick: () => {} }}
                  />
                </div>
                <div>
                  <VariantLabel theme={theme}>Clickable (onClick)</VariantLabel>
                  <FeatureCard
                    icon={Icon.TYPES.TABLE_COLUMN_FILLED}
                    title="Catalog"
                    description="Entire card is clickable, no action buttons."
                    size="compact"
                    onClick={() => {}}
                  />
                </div>
              </CardGrid>
            </VariantSection>
          </DiscoveryPageLayout>
        );
      }
      if (item === 'page-hero-banner') {
        return (
          <DiscoveryPageLayout size="lg" theme={theme}>
            <SpecHeader theme={theme}>
              <SpecTitle theme={theme}>PageHeroBanner</SpecTitle>
              <SpecDescription theme={theme}>
                Hero section for SKU or product pages. Optional badge, primary CTA, secondary text.
              </SpecDescription>
            </SpecHeader>

            <VariantSection theme={theme}>
              <VariantLabel theme={theme}>Layout: side-by-side</VariantLabel>
              <SpecDescription theme={theme} style={{ marginBottom: theme.space400 }}>
                Content and visual sit side by side. Default layout.
              </SpecDescription>
              <PageHeroBanner
                badge={<span>New</span>}
                title="Unlock powerful reporting"
                subtitle="Connect your data sources and build custom dashboards in minutes."
                primaryAction={{ label: 'Get started', onClick: () => {} }}
                secondaryText="No credit card required"
                layout="side-by-side"
                visual={<PlaceholderVisual theme={theme}>Hero visual</PlaceholderVisual>}
              />
            </VariantSection>

            <VariantSection theme={theme}>
              <VariantLabel theme={theme}>Layout: stacked</VariantLabel>
              <SpecDescription theme={theme} style={{ marginBottom: theme.space400 }}>
                Content stacked above visual, centered. For narrower viewports or emphasis.
              </SpecDescription>
              <PageHeroBanner
                title="Start from a template"
                subtitle="Pick a pre-built configuration and customize to your needs."
                primaryAction={{ label: 'Browse templates', onClick: () => {} }}
                layout="stacked"
                visual={<PlaceholderVisual theme={theme}>Visual</PlaceholderVisual>}
              />
            </VariantSection>
          </DiscoveryPageLayout>
        );
      }
      if (item === 'discovery-page-layout') {
        return (
          <DiscoveryPageLayout size="lg" theme={theme}>
            <SpecHeader theme={theme}>
              <SpecTitle theme={theme}>DiscoveryPageLayout</SpecTitle>
              <SpecDescription theme={theme}>
                Constrained-width layout for discovery pages. Controls max-width and spacing between sections.
              </SpecDescription>
            </SpecHeader>

            <VariantSection theme={theme}>
              <VariantLabel theme={theme}>Size: sm (800px)</VariantLabel>
              <DiscoveryPageLayout size="sm" theme={theme}>
                <SampleContentBlock theme={theme}>Narrow layout for focused content</SampleContentBlock>
              </DiscoveryPageLayout>
            </VariantSection>

            <VariantSection theme={theme}>
              <VariantLabel theme={theme}>Size: md (1040px)</VariantLabel>
              <DiscoveryPageLayout size="md" theme={theme}>
                <SampleContentBlock theme={theme}>Default width for most discovery pages</SampleContentBlock>
              </DiscoveryPageLayout>
            </VariantSection>

            <VariantSection theme={theme}>
              <VariantLabel theme={theme}>Size: lg (1240px)</VariantLabel>
              <DiscoveryPageLayout size="lg" theme={theme}>
                <SampleContentBlock theme={theme}>Wide layout for dashboard-style pages</SampleContentBlock>
              </DiscoveryPageLayout>
            </VariantSection>
          </DiscoveryPageLayout>
        );
      }
      if (item === 'capability-item') {
        return (
          <DiscoveryPageLayout size="lg" theme={theme}>
            <SpecHeader theme={theme}>
              <SpecTitle theme={theme}>CapabilityItem</SpecTitle>
              <SpecDescription theme={theme}>
                Icon + title + description for platform capabilities. Used in right rail widgets, settings lists.
              </SpecDescription>
            </SpecHeader>
            <VariantSection theme={theme}>
              <VariantLabel theme={theme}>Size: default, Icon: neutral</VariantLabel>
              <CapabilityItem icon={Icon.TYPES.USERS_OUTLINE} title="Headcount by department" description="Current employee count broken down by department" />
            </VariantSection>
            <VariantSection theme={theme}>
              <VariantLabel theme={theme}>Size: compact, Icon: bare, Trailing: chevron</VariantLabel>
              <CapabilityItem icon={Icon.TYPES.OFFICE_OUTLINE} title="Company Information" description="Legal name, EIN, address, and entity details" size="compact" iconVariant="bare" trailing="chevron" onClick={() => {}} />
            </VariantSection>
            <VariantSection theme={theme}>
              <VariantLabel theme={theme}>Icon: accent</VariantLabel>
              <CapabilityItem icon={Icon.TYPES.PHONE_OUTLINE} title="Talk to a Rippling expert" description="One of our specialists will help you set up" iconVariant="accent" trailing={<span style={{ color: theme.colorPrimary, fontWeight: 500 }}>Book a call →</span>} />
            </VariantSection>
          </DiscoveryPageLayout>
        );
      }
    }

    if (category === 'patterns' && item === 'hub-with-right-rail') {
      return (
        <DiscoveryPageLayout size="lg" theme={theme}>
          <SpecHeader theme={theme}>
            <SpecTitle theme={theme}>HubWithRightRail (PlatformHubTemplate)</SpecTitle>
            <SpecDescription theme={theme}>
              Section-level pattern: hero FeatureCards paired with a right rail (300px). Use FeatureCardGrid as children for card grids below.
            </SpecDescription>
          </SpecHeader>
          <PlatformHubTemplate
            title="Platform hub example"
            subtitle="Hero FeatureCards (size=hero) alongside right rail widgets."
            heroFeatures={[
              {
                id: '1',
                icon: Icon.TYPES.BAR_CHART_OUTLINE,
                title: "Reports",
                description: "Build custom reports from any data across your account. Schedule recurring exports or run on demand.",
                ctaLabel: "Explore",
                onCtaClick: () => {},
              },
              {
                id: '2',
                icon: Icon.TYPES.THUNDERBOLT_FILLED,
                title: "Workflow Studio",
                description: "Build automations with a visual drag-and-drop builder. Chain triggers, conditions, and actions.",
                ctaLabel: "Explore",
                onCtaClick: () => {},
              },
              {
                id: '3',
                icon: Icon.TYPES.FILE_FILLED,
                title: "Documents",
                description: "Store, send, and e-sign documents. Automate offer letters, NDAs, and onboarding packets.",
                ctaLabel: "Explore",
                onCtaClick: () => {},
              },
            ]}
            rightRail={
              <HubWidget theme={theme}>
                <HubWidgetHeader theme={theme}>
                  <HubWidgetTitle theme={theme}>Quick links</HubWidgetTitle>
                  <HubWidgetDesc theme={theme}>Jump to common tasks.</HubWidgetDesc>
                </HubWidgetHeader>
                <CapabilityItem icon={Icon.TYPES.HELP_OUTLINE} title="Help center" description="Find answers and guides." />
              </HubWidget>
              }
            />
        </DiscoveryPageLayout>
      );
    }

    if (category === 'patterns' && item === 'feature-card-grid') {
      return (
        <DiscoveryPageLayout size="lg" theme={theme}>
          <SpecHeader theme={theme}>
            <SpecTitle theme={theme}>FeatureCardGrid</SpecTitle>
            <SpecDescription theme={theme}>
              Optional section label + subtitle, then a 3-column grid of compact FeatureCards. Use below HubWithRightRail.
            </SpecDescription>
          </SpecHeader>
          <FeatureCardGrid
            category="Productivity"
            categorySubtitle="Stay on top of tasks, approvals, and alerts"
            items={[
              { id: '1', icon: Icon.TYPES.CHECKBOX_WITHCHECK_OUTLINE, title: "Inbox", description: "Approvals, tasks, and notifications.", primaryAction: { label: "Open", onClick: () => {} } },
              { id: '2', icon: Icon.TYPES.CHECKBOX_WITHCHECK_OUTLINE, title: "Approvals", description: "Manage approval chains.", primaryAction: { label: "View", onClick: () => {} } },
              { id: '3', icon: Icon.TYPES.BAR_CHART_OUTLINE, title: "Reports", description: "View and export data.", primaryAction: { label: "Explore", onClick: () => {} } },
            ]}
          />
          <FeatureCardGrid
            category="Administration"
            categorySubtitle="Audit activity and manage APIs"
            items={[
              { id: '4', icon: Icon.TYPES.V2_KEY_FILLED, title: "Activity Log", description: "Track every action in Rippling.", primaryAction: { label: "View log", onClick: () => {} } },
              { id: '5', icon: Icon.TYPES.E_CODE_EMBED, title: "Developer", description: "API access and webhooks.", primaryAction: { label: "View docs", onClick: () => {} } },
            ]}
          />
        </DiscoveryPageLayout>
      );
    }

    if (category === 'patterns' && item === 'value-props-grid') {
      return (
        <DiscoveryPageLayout size="lg" theme={theme}>
          <SpecHeader theme={theme}>
            <SpecTitle theme={theme}>ValuePropsGrid</SpecTitle>
            <SpecDescription theme={theme}>
              Uppercase section label + optional subtitle, then a 2- or 3-column grid of value props (icon + title + description). Use for unpurchased SKU "includes" sections.
            </SpecDescription>
          </SpecHeader>
          <ValuePropsGrid
            title="Payroll includes"
            items={[
              { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Auto-sync approved hours', description: 'Approved timecards flow directly into your payrun—no CSV exports, no manual entry, no re-keying errors.' },
              { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Overtime calculated automatically', description: "You approve hours, we do the math. California double-time, weekly thresholds, state-specific rules—all handled." },
              { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'One source of truth', description: 'Schedules, timecards, and paychecks all in one system.' },
              { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Close payroll in minutes', description: 'Customers using Time + Payroll close 2-3 days faster.' },
              { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Tax filings handled', description: 'Workers see approved hours match paychecks.' },
              { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Catch problems before payday', description: 'Flag missing punches, unapproved overtime, or schedule conflicts.' },
            ]}
            columns={2}
            iconVariant="warm"
          />
          <VariantSection theme={theme}>
            <VariantLabel theme={theme}>3-column, neutral icons</VariantLabel>
            <ValuePropsGrid
              title="What you get"
              subtitle="All features included with your plan"
              items={[
                { icon: Icon.TYPES.CHECKBOX_WITHCHECK_OUTLINE, title: 'Feature A', description: 'Description for feature A.' },
                { icon: Icon.TYPES.CHECKBOX_WITHCHECK_OUTLINE, title: 'Feature B', description: 'Description for feature B.' },
                { icon: Icon.TYPES.CHECKBOX_WITHCHECK_OUTLINE, title: 'Feature C', description: 'Description for feature C.' },
              ]}
              columns={3}
              iconVariant="neutral"
            />
          </VariantSection>
        </DiscoveryPageLayout>
      );
    }

    if (category === 'templates') {
      const templateDescs: Record<string, string> = {
        'unpurchased-sku-page': 'Full-page treatment when a user navigates to a product they haven\'t purchased. Hero, value proposition, readiness card, discover more.',
        'platform-empty-state': 'Minimal empty states for platform surfaces. Template-driven or blank slate variants.',
        'feature-activation': 'Introduces a capability within a purchased product. Value framing, template previews, primary and secondary CTAs.',
      };
      return (
        <DiscoveryPageLayout size="lg" theme={theme}>
          <SpecHeader theme={theme}>
            <SpecTitle theme={theme}>{item.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}</SpecTitle>
            <SpecDescription theme={theme}>
              {templateDescs[item] ?? 'Template documentation.'}
            </SpecDescription>
          </SpecHeader>
          <TemplatePlaceholder theme={theme}>
            Template spec documented in <code>src/spec/templates/{item}/README.md</code>. Component extraction planned.
          </TemplatePlaceholder>
        </DiscoveryPageLayout>
      );
    }

    return null;
  };

  return (
    <SpecBlock theme={theme}>
      {renderSpec()}
    </SpecBlock>
  );
};

export default DesignSpecsContent;
