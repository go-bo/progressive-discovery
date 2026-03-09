import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import { DiscoveryPageLayout } from '../DiscoveryPageLayout/DiscoveryPageLayout';
import { PageHeroBanner } from '../PageHeroBanner/PageHeroBanner';
import { DiscoverySlotTemplate } from './DiscoverySlotTemplate';
import type { TemplateRecipe } from './DiscoverySlotTemplate';
import { DiscoverySlotCapability } from './DiscoverySlotCapability';
import type { FeatureCardDetailConfig } from '../FeatureCardDetailModal/FeatureCardDetailModal';
import { DiscoverySlotUnlock } from './DiscoverySlotUnlock';
import { DiscoverySlotSecondary } from './DiscoverySlotSecondary';
import type { SecondaryDiscoveryItem } from './DiscoverySlotSecondary';
import type { FeatureCardGridItem } from '../../patterns/FeatureCardGrid/FeatureCardGrid';

export type DiscoverySlotVariant = 'template' | 'capability' | 'unlock';

export interface PlatformPrimerHeroProps {
  title: string;
  subtitle: string;
  primaryAction?: { label: string; onClick?: () => void };
  secondaryText?: string;
  eyebrow?: React.ReactNode;
  visual?: React.ReactNode;
  layout?: 'side-by-side' | 'stacked';
  titleSize?: 'display' | 'title';
  visualMinWidth?: number;
  visualMaxWidth?: number;
}

export interface PlatformPrimerProps {
  hero: PlatformPrimerHeroProps;
  discoverySlotVariant: DiscoverySlotVariant;
  discoverySlotTemplate?: {
    linkLabel: string;
    recipes: TemplateRecipe[];
    onViewAll?: () => void;
  };
  discoverySlotCapability?: {
    separatorLabel: string;
    features: FeatureCardDetailConfig[];
    onCta?: () => void;
  };
  discoverySlotUnlock?: {
    category: string;
    categorySubtitle?: string;
    items: FeatureCardGridItem[];
    iconVariant?: 'neutral' | 'accent';
  };
  secondaryDiscovery?: {
    label: string;
    items: SecondaryDiscoveryItem[];
  };
  size?: 'sm' | 'md' | 'lg';
}

const PageContainer = styled(DiscoveryPageLayout)`
  gap: ${({ theme }) => (theme as StyledTheme).space600};
`;

const HeroScrollWrap = styled.div`
  width: 100%;
  min-width: 0;
  overflow-x: auto;
  padding: 0;
`;

const HERO_MIN_WIDTH = 802;

const HeroInner = styled.div`
  min-width: ${HERO_MIN_WIDTH}px;
`;

export const PlatformPrimer: React.FC<PlatformPrimerProps> = ({
  hero,
  discoverySlotVariant,
  discoverySlotTemplate,
  discoverySlotCapability,
  discoverySlotUnlock,
  secondaryDiscovery,
  size = 'md',
}) => {
  const { theme } = usePebbleTheme();

  const renderHero = () => {
    const {
      title,
      subtitle,
      primaryAction,
      secondaryText,
      eyebrow,
      visual,
      layout = 'side-by-side',
      titleSize = 'title',
      visualMinWidth,
      visualMaxWidth,
    } = hero;

    return (
      <PageHeroBanner
        layout={layout}
        titleSize={titleSize}
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        primaryAction={primaryAction}
        secondaryText={secondaryText}
        visual={visual}
        visualMinWidth={visualMinWidth}
        visualMaxWidth={visualMaxWidth}
      />
    );
  };

  const renderDiscoverySlot = () => {
    switch (discoverySlotVariant) {
      case 'template':
        if (discoverySlotTemplate) {
          return (
            <DiscoverySlotTemplate
              linkLabel={discoverySlotTemplate.linkLabel}
              recipes={discoverySlotTemplate.recipes}
              onViewAll={discoverySlotTemplate.onViewAll}
            />
          );
        }
        return null;
      case 'capability':
        if (discoverySlotCapability) {
          return (
            <DiscoverySlotCapability
              separatorLabel={discoverySlotCapability.separatorLabel}
              features={discoverySlotCapability.features}
              onCta={discoverySlotCapability.onCta}
            />
          );
        }
        return null;
      case 'unlock':
        if (discoverySlotUnlock) {
          return (
            <DiscoverySlotUnlock
              category={discoverySlotUnlock.category}
              categorySubtitle={discoverySlotUnlock.categorySubtitle}
              items={discoverySlotUnlock.items}
              iconVariant={discoverySlotUnlock.iconVariant}
            />
          );
        }
        return null;
      default:
        return null;
    }
  };

  return (
    <PageContainer theme={theme} size={size}>
      <HeroScrollWrap theme={theme}>
        <HeroInner>
          {renderHero()}
        </HeroInner>
      </HeroScrollWrap>
      {renderDiscoverySlot()}
      {secondaryDiscovery && (
        <DiscoverySlotSecondary
          label={secondaryDiscovery.label}
          items={secondaryDiscovery.items}
        />
      )}
    </PageContainer>
  );
};
