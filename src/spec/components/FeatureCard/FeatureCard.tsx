import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';

// ── Types ───────────────────────────────────────────────

export interface FeatureCardAction {
  label?: string;
  onClick?: () => void;
}

export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  size?: 'hero' | 'compact';
  iconVariant?: 'neutral' | 'accent';
  visual?: React.ReactNode;
  primaryAction?: FeatureCardAction;
  secondaryAction?: FeatureCardAction;
  onClick?: () => void;
}

// ── Shared ──────────────────────────────────────────────

const IconCircle = styled.div<{ variant: 'hero' | 'compact'; iconVariant?: 'neutral' | 'accent' }>`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  background: ${({ variant, iconVariant, theme }) => {
    if (variant === 'hero') return (theme as StyledTheme).colorPrimary;
    if (iconVariant === 'accent') return (theme as StyledTheme).colorPrimaryContainer;
    return (theme as StyledTheme).colorSurfaceContainerLow;
  }};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: ${({ variant, iconVariant, theme }) => {
    if (variant === 'hero') return (theme as StyledTheme).colorOnPrimary;
    if (iconVariant === 'accent') return (theme as StyledTheme).colorOnPrimaryContainer;
    return 'inherit';
  }};
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const SecondaryLink = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorPrimary};

  &:hover {
    text-decoration: underline;
  }
`;

// ── Hero variant ────────────────────────────────────────

const VisualContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 200ms ease, filter 200ms ease;
`;

const HeroRoot = styled.div`
  display: flex;
  max-width: 820px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  overflow: hidden;
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};

  &:hover ${VisualContent} {
    transform: translateY(-4px);
    filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.12));
  }
`;

const HeroContent = styled.div`
  flex: 1;
  min-width: 0;
  padding: ${({ theme }) => (theme as StyledTheme).space500};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  justify-content: space-between;
`;

const HeroTextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const HeroTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const HeroDescription = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  line-height: 1.5;
  flex: 1;
`;

const VisualPanel = styled.div`
  flex: 1;
  min-width: 0;
  aspect-ratio: 3 / 2;
  background: ${({ theme }) => (theme as StyledTheme).colorPrimaryVariant};
  border: 4px solid ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-top-right-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  border-bottom-right-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

// ── Compact variant ─────────────────────────────────────

const CompactRoot = styled.div`
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  padding: ${({ theme }) => (theme as StyledTheme).space500};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  cursor: pointer;
  transition: border-color 150ms ease, box-shadow 150ms ease;

  &:hover {
    border-color: ${({ theme }) => (theme as StyledTheme).colorOutline};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  }
`;

const CompactTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const CompactDescription = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  line-height: 1.5;
`;

// ── Component ───────────────────────────────────────────

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  size = 'hero',
  iconVariant,
  visual,
  primaryAction,
  secondaryAction,
  onClick,
}) => {
  const { theme } = usePebbleTheme();
  const compactIconColor = iconVariant === 'accent' ? theme.colorOnPrimaryContainer : undefined;

  if (size === 'compact') {
    return (
      <CompactRoot theme={theme} onClick={onClick}>
        <IconCircle theme={theme} variant="compact" iconVariant={iconVariant}>
          <Icon type={icon} size={18} color={compactIconColor} />
        </IconCircle>
        <CompactTitle theme={theme}>{title}</CompactTitle>
        <CompactDescription theme={theme}>{description}</CompactDescription>
        {(primaryAction?.label || secondaryAction?.label) && (
          <ActionRow theme={theme}>
            {primaryAction?.label && (
              <Button
                appearance={Button.APPEARANCES.OUTLINE}
                size={Button.SIZES.S}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  primaryAction.onClick?.();
                }}
              >
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction?.label && (
              <SecondaryLink
                theme={theme}
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  secondaryAction.onClick?.();
                }}
              >
                {secondaryAction.label}
              </SecondaryLink>
            )}
          </ActionRow>
        )}
      </CompactRoot>
    );
  }

  return (
    <HeroRoot theme={theme}>
      <HeroContent theme={theme}>
        <IconCircle theme={theme} variant="hero">
          <Icon type={icon} size={20} color={theme.colorOnPrimary} />
        </IconCircle>
        <HeroTextBlock theme={theme}>
          <HeroTitle theme={theme}>{title}</HeroTitle>
          <HeroDescription theme={theme}>{description}</HeroDescription>
        </HeroTextBlock>
        {(primaryAction?.label || secondaryAction?.label) && (
          <ActionRow theme={theme}>
            {primaryAction?.label && (
              <Button
                appearance={Button.APPEARANCES.OUTLINE}
                size={Button.SIZES.S}
                onClick={primaryAction.onClick}
              >
                {primaryAction.label}
              </Button>
            )}
            {secondaryAction?.label && (
              <SecondaryLink theme={theme} onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </SecondaryLink>
            )}
          </ActionRow>
        )}
      </HeroContent>
      <VisualPanel theme={theme}>
        <VisualContent>
          {visual ?? (
            <Icon type={icon} size={48} color={theme.colorOnPrimary} />
          )}
        </VisualContent>
      </VisualPanel>
    </HeroRoot>
  );
};

export default FeatureCard;
