import React from 'react';
import styled from '@emotion/styled';
import { Outlet, NavLink, Link } from 'react-router-dom';
import { usePebbleTheme, StyledTheme } from '@/utils/theme';

/**
 * Design Specs Layout
 *
 * Sidebar navigation for Components, Patterns, Templates.
 * Each item links to its own spec view so content can breathe.
 */

const SIDEBAR_ITEMS = {
  components: [
    { id: 'feature-card', label: 'FeatureCard' },
    { id: 'page-hero-banner', label: 'PageHeroBanner' },
    { id: 'discovery-page-layout', label: 'DiscoveryPageLayout' },
    { id: 'capability-item', label: 'CapabilityItem' },
  ],
  patterns: [
    { id: 'hub-with-right-rail', label: 'HubWithRightRail' },
    { id: 'feature-card-grid', label: 'FeatureCardGrid' },
    { id: 'value-props-grid', label: 'ValuePropsGrid' },
  ],
  templates: [
    { id: 'unpurchased-sku-page', label: 'UnpurchasedSkuPage' },
    { id: 'platform-empty-state', label: 'PlatformEmptyState' },
    { id: 'feature-activation', label: 'FeatureActivation' },
  ],
} as const;

const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurface};
`;

const Sidebar = styled.aside`
  width: 260px;
  flex-shrink: 0;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-right: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  padding: ${({ theme }) => (theme as StyledTheme).space600} 0;
  overflow-y: auto;
`;

const SidebarHeader = styled.div`
  padding: 0 ${({ theme }) => (theme as StyledTheme).space600};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space600};
`;

const SidebarTitle = styled.h1`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const SidebarDescription = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: ${({ theme }) => (theme as StyledTheme).space200} 0 0;
  line-height: 1.4;
`;

const BackLink = styled(Link)`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  text-decoration: none;
  display: inline-block;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space400};

  &:hover {
    text-decoration: underline;
  }
`;

const SectionLabel = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: ${({ theme }) => `${(theme as StyledTheme).space400} ${(theme as StyledTheme).space600} ${(theme as StyledTheme).space200}`};
`;

const NavLinkStyled = styled(NavLink)`
  display: block;
  padding: ${({ theme }) => `${(theme as StyledTheme).space200} ${(theme as StyledTheme).space600}`};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  text-decoration: none;
  border-radius: 0 ${({ theme }) => (theme as StyledTheme).shapeCornerLg} ${({ theme }) => (theme as StyledTheme).shapeCornerLg} 0;
  border-left: 3px solid transparent;
  margin-left: ${({ theme }) => (theme as StyledTheme).space600};
  transition: background 100ms ease, color 100ms ease;

  &:hover {
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
    color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  }

  &.active {
    font-weight: 600;
    color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
    border-left-color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  }
`;

const ContentArea = styled.main`
  flex: 1;
  min-width: 0;
  padding: ${({ theme }) => (theme as StyledTheme).space800} ${({ theme }) => (theme as StyledTheme).space1000};
  overflow-y: auto;
`;

const DesignSpecsLayout: React.FC = () => {
  const { theme } = usePebbleTheme();

  return (
    <Layout theme={theme}>
      <Sidebar theme={theme}>
        <SidebarHeader theme={theme}>
          <BackLink theme={theme} to="/">← Back to Playground</BackLink>
          <SidebarTitle theme={theme}>Design Specs</SidebarTitle>
          <SidebarDescription theme={theme}>
            Components, patterns, and templates. Click to view each spec.
          </SidebarDescription>
        </SidebarHeader>

        <SectionLabel theme={theme}>Components</SectionLabel>
        {SIDEBAR_ITEMS.components.map(({ id, label }) => (
          <NavLinkStyled
            key={id}
            theme={theme}
            to={`/design-specs/components/${id}`}
            end={false}
          >
            {label}
          </NavLinkStyled>
        ))}

        <SectionLabel theme={theme}>Patterns</SectionLabel>
        {SIDEBAR_ITEMS.patterns.map(({ id, label }) => (
          <NavLinkStyled
            key={id}
            theme={theme}
            to={`/design-specs/patterns/${id}`}
          >
            {label}
          </NavLinkStyled>
        ))}

        <SectionLabel theme={theme}>Templates</SectionLabel>
        {SIDEBAR_ITEMS.templates.map(({ id, label }) => (
          <NavLinkStyled
            key={id}
            theme={theme}
            to={`/design-specs/templates/${id}`}
          >
            {label}
          </NavLinkStyled>
        ))}
      </Sidebar>

      <ContentArea theme={theme}>
        <Outlet />
      </ContentArea>
    </Layout>
  );
};

export default DesignSpecsLayout;
