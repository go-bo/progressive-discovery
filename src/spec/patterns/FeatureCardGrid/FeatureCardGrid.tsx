import React from 'react';
import styled from '@emotion/styled';
import Icon from '@rippling/pebble/Icon';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import { FeatureCard, type FeatureCardAction } from '@/spec';

// ── Types ───────────────────────────────────────────────

export interface FeatureCardGridItem {
  id: string;
  icon: string;
  title: string;
  description: string;
  onClick?: () => void;
  primaryAction?: FeatureCardAction;
  secondaryAction?: FeatureCardAction;
}

export interface FeatureCardGridProps {
  category?: string;
  categorySubtitle?: string;
  iconVariant?: 'neutral' | 'accent';
  items: FeatureCardGridItem[];
  viewAllLink?: { label: string; onClick?: () => void };
}

// ── Styles ───────────────────────────────────────────────

const GridSectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
  margin-top: ${({ theme }) => (theme as StyledTheme).space200};
`;

const GridCategoryLabel = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const GridCategorySubtitle = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const ViewAllLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
  background: transparent;
  border: none;
  padding: ${({ theme }) => (theme as StyledTheme).space400} 0 0 0;
  cursor: pointer;
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorPrimary};

  &:hover {
    text-decoration: underline;
  }
`;

// ── Component ────────────────────────────────────────────

export const FeatureCardGrid: React.FC<FeatureCardGridProps> = ({
  category,
  categorySubtitle,
  iconVariant,
  items,
  viewAllLink,
}) => {
  const { theme } = usePebbleTheme();

  return (
    <>
      {category && (
        <GridSectionHeader theme={theme}>
          <GridCategoryLabel theme={theme}>{category}</GridCategoryLabel>
          {categorySubtitle && (
            <GridCategorySubtitle theme={theme}>{categorySubtitle}</GridCategorySubtitle>
          )}
        </GridSectionHeader>
      )}
      <CardGrid theme={theme}>
        {items.map((item) => (
          <FeatureCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            description={item.description}
            size="compact"
            iconVariant={iconVariant}
            onClick={item.onClick}
            primaryAction={item.primaryAction}
            secondaryAction={item.secondaryAction}
          />
        ))}
      </CardGrid>
      {viewAllLink && (
        <ViewAllLink theme={theme} onClick={viewAllLink.onClick}>
          {viewAllLink.label}
          <Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} />
        </ViewAllLink>
      )}
    </>
  );
};
