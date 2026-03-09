import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import Button from '@rippling/pebble/Button';

// ── Types ───────────────────────────────────────────────

export interface PageHeroBannerProps {
  layout?: 'side-by-side' | 'stacked';
  titleSize?: 'display' | 'title';
  eyebrow?: React.ReactNode;
  badge?: React.ReactNode;
  title: string;
  subtitle: string;
  primaryAction?: { label: string; onClick?: () => void };
  secondaryText?: string;
  visual?: React.ReactNode;
  visualMinWidth?: number;
  visualMaxWidth?: number;
  children?: React.ReactNode;
}

// ── Shared ──────────────────────────────────────────────

const Badge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  padding: ${({ theme }) => `${(theme as StyledTheme).space100} ${(theme as StyledTheme).space300}`};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  width: fit-content;
`;

const Title = styled.h1<{ stacked?: boolean; titleSize?: 'display' | 'title' }>`
  ${({ theme, titleSize }) =>
    titleSize === 'title'
      ? (theme as StyledTheme).typestyleV2TitleLarge
      : (theme as StyledTheme).typestyleV2DisplaySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
  ${({ stacked, titleSize }) =>
    titleSize !== 'title' && `font-size: ${stacked ? '28px' : '36px'};`}
  line-height: 1.2;
  ${({ stacked }) => stacked && 'text-align: center;'}
`;

const Subtitle = styled.p<{ stacked?: boolean }>`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  max-width: ${({ stacked }) => (stacked ? '640px' : '480px')};
  line-height: 1.5;
  ${({ stacked }) => stacked && 'text-align: center;'}
`;

const Actions = styled.div<{ stacked?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ stacked }) => (stacked ? 'center' : 'flex-start')};
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  margin-top: ${({ theme }) => (theme as StyledTheme).space200};
`;

const SecondaryText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

// ── Side-by-side layout ─────────────────────────────────

const SideBySideRoot = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space800};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  flex-wrap: wrap;
`;

const SideBySideContent = styled.div`
  flex: 1;
  min-width: 400px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const SideBySideVisual = styled.div<{ visualMinWidth?: number; visualMaxWidth?: number }>`
  flex: 0 0 ${({ visualMaxWidth }) => `${visualMaxWidth ?? 480}px`};
  width: ${({ visualMaxWidth }) => `${visualMaxWidth ?? 480}px`};
  min-width: ${({ visualMinWidth }) => `${visualMinWidth ?? 380}px`};
  max-width: ${({ visualMaxWidth }) => `${visualMaxWidth ?? 480}px`};
`;

// ── Stacked layout ──────────────────────────────────────

const StackedRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
`;

const StackedContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  text-align: center;
`;

const StackedVisual = styled.div`
  width: 100%;
  max-width: 600px;
`;

// ── Component ───────────────────────────────────────────

export const PageHeroBanner: React.FC<PageHeroBannerProps> = ({
  layout = 'side-by-side',
  titleSize,
  eyebrow,
  badge,
  title,
  subtitle,
  primaryAction,
  secondaryText,
  visual,
  visualMinWidth,
  visualMaxWidth,
  children,
}) => {
  const { theme } = usePebbleTheme();
  const stacked = layout === 'stacked';

  if (stacked) {
    return (
      <StackedRoot theme={theme}>
        <StackedContent theme={theme}>
          {eyebrow}
          {badge && <Badge theme={theme}>{badge}</Badge>}
          <Title theme={theme} stacked titleSize={titleSize}>{title}</Title>
          <Subtitle theme={theme} stacked>{subtitle}</Subtitle>
          {primaryAction && (
            <Actions theme={theme} stacked>
              <Button appearance={Button.APPEARANCES.PRIMARY} size={Button.SIZES.M} onClick={primaryAction.onClick}>
                {primaryAction.label}
              </Button>
              {secondaryText && <SecondaryText theme={theme}>{secondaryText}</SecondaryText>}
            </Actions>
          )}
          {children}
        </StackedContent>
        {visual && <StackedVisual>{visual}</StackedVisual>}
      </StackedRoot>
    );
  }

  return (
    <SideBySideRoot theme={theme}>
      <SideBySideContent theme={theme}>
        {eyebrow}
        {badge && <Badge theme={theme}>{badge}</Badge>}
        <Title theme={theme} titleSize={titleSize}>{title}</Title>
        <Subtitle theme={theme}>{subtitle}</Subtitle>
        {primaryAction && (
          <Actions theme={theme}>
            <Button appearance={Button.APPEARANCES.PRIMARY} size={Button.SIZES.M} onClick={primaryAction.onClick}>
              {primaryAction.label}
            </Button>
            {secondaryText && <SecondaryText theme={theme}>{secondaryText}</SecondaryText>}
          </Actions>
        )}
        {children}
      </SideBySideContent>
      {visual && <SideBySideVisual theme={theme} visualMinWidth={visualMinWidth} visualMaxWidth={visualMaxWidth}>{visual}</SideBySideVisual>}
    </SideBySideRoot>
  );
};
