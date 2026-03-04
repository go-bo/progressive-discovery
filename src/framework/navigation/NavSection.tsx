import React from 'react';
import styled from '@emotion/styled';
import { getStateColor } from '@rippling/pebble/theme';
import { StyledTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import { NavItem } from './NavItem';
import { NavSectionData } from './types';

interface NavSectionProps {
  section: NavSectionData;
  isCollapsed: boolean;
  theme: StyledTheme;
  showDividerBefore?: boolean;
  onHelpClick?: () => void;
  isFirstSection?: boolean;
  afterLabel?: React.ReactNode;
}

const StyledNavSection = styled.div<{ isFirstSection?: boolean }>`
  padding: ${({ theme, isFirstSection }) =>
    `${isFirstSection ? (theme as StyledTheme).space250 : '0'} ${(theme as StyledTheme).space200} 0`};
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const NavSectionLabel = styled.div<{ isCollapsed: boolean }>`
  ${({ theme }) => (theme as StyledTheme).typestyleLabelMedium700};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: ${({ theme }) => `12px ${(theme as StyledTheme).space200} 0`};
  padding: 12px 0 4px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  display: flex;
  align-items: center;
  opacity: ${({ isCollapsed }) => (isCollapsed ? 0 : 1)};
  transition: opacity 200ms ease;
  white-space: nowrap;
  overflow: hidden;
`;

const ClickableSectionLabel = styled.button<{ isCollapsed: boolean }>`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  font-weight: 400;
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: ${({ theme }) => `12px ${(theme as StyledTheme).space200} 0`};
  padding: 12px 0 4px;
  border: none;
  border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: 0;
  background: transparent;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  opacity: ${({ isCollapsed }) => (isCollapsed ? 0 : 1)};
  transition: color 150ms ease;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;

  &:hover {
    color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  }
`;

export const NavSection: React.FC<NavSectionProps> = ({ 
  section, 
  isCollapsed, 
  theme,
  showDividerBefore = false,
  onHelpClick,
  isFirstSection = false,
  afterLabel,
}) => {
  return (
    <StyledNavSection theme={theme} isFirstSection={isFirstSection}>
      {section.label && (
        section.labelOnClick ? (
          <ClickableSectionLabel
            theme={theme}
            isCollapsed={isCollapsed}
            onClick={section.labelOnClick}
          >
            {section.label}
            <Icon type={Icon.TYPES.CHEVRON_RIGHT} size={12} color={theme.colorOnSurfaceVariant} />
          </ClickableSectionLabel>
        ) : (
          <NavSectionLabel theme={theme} isCollapsed={isCollapsed}>
            {section.label}
          </NavSectionLabel>
        )
      )}
      {afterLabel}
      {section.items.map(item => (
        <NavItem 
          key={item.id} 
          item={item} 
          isCollapsed={isCollapsed} 
          theme={theme}
          onClick={item.id === 'help' ? onHelpClick : undefined}
        />
      ))}
    </StyledNavSection>
  );
};

