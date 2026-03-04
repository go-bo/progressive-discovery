import React, { useState } from 'react';
import styled from '@emotion/styled';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import Tabs from '@rippling/pebble/Tabs';
import { FeatureCard, type FeatureCardAction } from '@/spec';

// ── Types ───────────────────────────────────────────────

export interface HubHeroFeature {
  id: string;
  icon: string;
  title: string;
  description: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  secondaryAction?: FeatureCardAction;
  visual?: React.ReactNode;
}

export interface HubTab {
  id: string;
  label: string;
}

export interface PlatformHubTemplateProps {
  title: string;
  subtitle: string;
  heroFeatures?: HubHeroFeature[];
  rightRail?: React.ReactNode;
  tabs?: HubTab[];
  activeTabIndex?: number;
  onTabChange?: (index: number) => void;
  children?: React.ReactNode;
}

// ── Layout ──────────────────────────────────────────────

const HubContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
  width: 100%;
`;

const HubMain = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space500};
`;

const HubHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const HubTitle = styled.h1`
  ${({ theme }) => (theme as StyledTheme).typestyleV2DisplaySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
  font-size: 32px;
  font-weight: 600;
`;

const HubSubtitle = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
`;

const TabsWrap = styled.div`
  margin-top: ${({ theme }) => (theme as StyledTheme).space300};
`;

const HubRightRail = styled.div`
  flex: 1 1 0;
  min-width: 0;
  max-width: 400px;
  align-self: flex-start;
  position: sticky;
  top: ${({ theme }) => (theme as StyledTheme).space600};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

// ── Right Rail primitives (exported for consumers) ──────

export const HubWidget = styled.div`
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space500};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

export const HubWidgetHeader = styled.div<{ compact?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme, compact }) => (compact ? 0 : (theme as StyledTheme).space200)};
`;

export const HubWidgetTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLargeEmphasized};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

export const HubWidgetDesc = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  line-height: 1.4;
`;

export const HubWidgetLink = styled.a`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const HubWidgetAccent = styled.div`
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space500};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

// ── Template Component ──────────────────────────────────

export const PlatformHubTemplate: React.FC<PlatformHubTemplateProps> = ({
  title,
  subtitle,
  heroFeatures,
  rightRail,
  tabs,
  activeTabIndex,
  onTabChange,
  children,
}) => {
  const { theme } = usePebbleTheme();
  const [internalIndex, setInternalIndex] = useState(0);
  const controlled = activeTabIndex !== undefined;
  const handleChange = (index: string | number) => {
    const idx = typeof index === 'number' ? index : parseInt(index, 10);
    if (onTabChange) onTabChange(idx);
    if (!controlled) setInternalIndex(idx);
  };

  return (
    <>
      <HubHeader theme={theme}>
        <HubTitle theme={theme}>{title}</HubTitle>
        <HubSubtitle theme={theme}>{subtitle}</HubSubtitle>
        {tabs && tabs.length > 0 && (
          <TabsWrap theme={theme}>
            <Tabs
              defaultActiveIndex={0}
              {...(controlled ? { activeIndex: activeTabIndex } : { activeIndex: internalIndex })}
              onChange={handleChange}
            >
              {tabs.map((tab) => (
                <Tabs.Tab key={tab.id} title={tab.label} />
              ))}
            </Tabs>
          </TabsWrap>
        )}
      </HubHeader>

      <HubContainer theme={theme}>
        <HubMain theme={theme}>
          {heroFeatures?.map((feature) => (
            <FeatureCard
              key={feature.id}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              size="hero"
              visual={feature.visual}
              primaryAction={feature.onCtaClick ? {
                label: feature.ctaLabel ?? 'Explore',
                onClick: feature.onCtaClick,
              } : undefined}
              secondaryAction={feature.secondaryAction}
            />
          ))}
        </HubMain>

        {rightRail && <HubRightRail theme={theme}>{rightRail}</HubRightRail>}
      </HubContainer>

      {children}
    </>
  );
};
