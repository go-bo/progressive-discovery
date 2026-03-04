import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';

// ── Types ───────────────────────────────────────────────

export interface CapabilityItemProps {
  icon: string;
  title: string;
  description?: string;
  size?: 'compact' | 'default' | 'relaxed' | 'valueProp';
  iconVariant?: 'neutral' | 'accent' | 'bare' | 'warm';
  trailing?: 'chevron' | React.ReactNode;
  onClick?: () => void;
}

// ── Icon container variants ──────────────────────────────

const CONTAINER_SIZES = { compact: 24, default: 36, relaxed: 40, valueProp: 64 } as const;
const ICON_SIZES = { compact: 18, default: 18, relaxed: 20, valueProp: 24 } as const;

const IconContainer = styled.div<{ variant: 'neutral' | 'accent' | 'bare' | 'warm'; size: keyof typeof CONTAINER_SIZES }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ size, variant }) => (variant === 'bare' && size === 'compact' ? 24 : CONTAINER_SIZES[size])}px;
  height: ${({ size, variant }) => (variant === 'bare' && size === 'compact' ? 24 : CONTAINER_SIZES[size])}px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  background: ${({ variant, theme }) =>
    variant === 'accent'
      ? (theme as StyledTheme).colorPrimaryContainer
      : variant === 'warm'
        ? (theme as StyledTheme).colorSecondaryContainer
        : variant === 'bare'
          ? 'transparent'
          : (theme as StyledTheme).colorSurfaceContainerLow};
  color: ${({ variant, theme }) =>
    variant === 'accent' || variant === 'warm'
      ? (theme as StyledTheme).colorPrimary
      : (theme as StyledTheme).colorOnSurfaceVariant};
`;

// ── Content ──────────────────────────────────────────────

const Root = styled.div<{ clickable?: boolean; size?: keyof typeof CONTAINER_SIZES }>`
  display: flex;
  align-items: ${({ size }) => (size === 'valueProp' ? 'flex-start' : 'center')};
  gap: ${({ theme, size }) =>
    size === 'valueProp' ? (theme as StyledTheme).space400 : (theme as StyledTheme).space300};
  ${({ clickable }) => clickable && 'cursor: pointer;'}
`;

const Content = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const Title = styled.span<{ size?: keyof typeof CONTAINER_SIZES }>`
  ${({ theme, size }) =>
    size === 'valueProp'
      ? (theme as StyledTheme).typestyleV2BodyLargeEmphasized
      : (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  font-weight: ${({ size }) => (size === 'valueProp' ? undefined : 500)};
`;

const Description = styled.span<{ size?: keyof typeof CONTAINER_SIZES }>`
  ${({ theme, size }) =>
    size === 'valueProp'
      ? (theme as StyledTheme).typestyleV2BodyMedium
      : (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  line-height: ${({ size }) => (size === 'valueProp' ? 1.5 : 1.4)};
`;

const Chevron = styled.span`
  flex-shrink: 0;
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

// ── Component ────────────────────────────────────────────

export const CapabilityItem: React.FC<CapabilityItemProps> = ({
  icon,
  title,
  description,
  size = 'default',
  iconVariant = 'neutral',
  trailing,
  onClick,
}) => {
  const { theme } = usePebbleTheme();
  const iconSize = ICON_SIZES[size];
  const iconColor = iconVariant === 'accent' || iconVariant === 'warm' ? theme.colorPrimary : undefined;

  return (
    <Root theme={theme} size={size} clickable={!!onClick} onClick={onClick} role={onClick ? 'button' : undefined}>
      <IconContainer theme={theme} variant={iconVariant} size={size}>
        <Icon type={icon} size={iconSize} color={iconColor} />
      </IconContainer>
      <Content theme={theme}>
        <Title theme={theme} size={size}>{title}</Title>
        {description && <Description theme={theme} size={size}>{description}</Description>}
      </Content>
      {trailing === 'chevron' && (
        <Chevron theme={theme}>
          <Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} color={theme.colorOnSurfaceVariant} />
        </Chevron>
      )}
      {trailing && trailing !== 'chevron' && trailing}
    </Root>
  );
};
