import React, { useState, useRef, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { getStateColor } from '@rippling/pebble/theme';
import { StyledTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Atoms from '@rippling/pebble/Atoms';
import { NavItemData } from './types';

interface NavItemProps {
  item: NavItemData;
  isCollapsed: boolean;
  theme: StyledTheme;
  onClick?: () => void;
}

const NavItemWrapper = styled.div`
  position: relative;
`;

const StyledNavItem = styled.button<{ isActive?: boolean; isFlyoutOpen?: boolean }>`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 2px;
  padding-right: ${({ theme }) => (theme as StyledTheme).space200};
  background-color: ${({ isActive, isFlyoutOpen, theme }) =>
    isActive
      ? (theme as StyledTheme).colorSurfaceContainerLow
      : isFlyoutOpen
        ? getStateColor((theme as StyledTheme).colorSurfaceBright, 'hover')
        : 'transparent'};
  border: none;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLarge};
  font-weight: ${({ isActive }) => (isActive ? 600 : 400)};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  text-align: left;
  cursor: pointer;
  transition: all 0.1s ease-in-out 0s;
  overflow: hidden;

  &:hover {
    background-color: ${({ isActive, theme }) =>
      isActive
        ? (theme as StyledTheme).colorSurfaceContainerLow
        : getStateColor((theme as StyledTheme).colorSurfaceBright, 'hover')};
  }

  &:active {
    background-color: ${({ theme }) =>
      getStateColor((theme as StyledTheme).colorSurfaceBright, 'active')};
  }
`;

const NavItemIcon = styled.div`
  padding: ${({ theme }) => (theme as StyledTheme).space200};
  padding-left: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const NavItemText = styled.div<{ isCollapsed: boolean }>`
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: ${({ isCollapsed }) => (isCollapsed ? 0 : 1)};
  transition: opacity 200ms ease;
`;

const BadgeWrapper = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const FlyoutContainer = styled.div`
  position: fixed;
  z-index: 100;
  min-width: 240px;
  max-width: 280px;
  max-height: 70vh;
  overflow-y: auto;
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: ${({ theme }) => (theme as StyledTheme).space200} 0;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
    border-radius: 2px;
  }
`;

const FlyoutGroupLabel = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  padding: ${({ theme }) => `${(theme as StyledTheme).space200} ${(theme as StyledTheme).space400} ${(theme as StyledTheme).space100}`};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const FlyoutDivider = styled.div`
  height: 1px;
  margin: ${({ theme }) => `${(theme as StyledTheme).space100} ${(theme as StyledTheme).space300}`};
  background: ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const FlyoutItem = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => `${(theme as StyledTheme).space200} ${(theme as StyledTheme).space400}`};
  background: none;
  border: none;
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  cursor: pointer;
  text-align: left;
  border-radius: 0;
  transition: background 100ms ease;

  &:hover {
    background: ${({ theme }) =>
      getStateColor((theme as StyledTheme).colorSurfaceBright, 'hover')};
  }
`;

export const NavItem: React.FC<NavItemProps> = ({ item, isCollapsed, theme, onClick }) => {
  const [isFlyoutOpen, setIsFlyoutOpen] = useState(false);
  const [flyoutPosition, setFlyoutPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const itemRef = useRef<HTMLDivElement>(null);
  const flyoutRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const hasDropdown = item.hasSubmenu && item.submenuGroups && item.submenuGroups.length > 0;

  const clearCloseTimeout = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  }, []);

  const openFlyout = useCallback(() => {
    if (!itemRef.current || !hasDropdown) return;
    clearCloseTimeout();
    const rect = itemRef.current.getBoundingClientRect();
    setFlyoutPosition({
      top: rect.top,
      left: rect.right + 4,
    });
    setIsFlyoutOpen(true);
  }, [hasDropdown, clearCloseTimeout]);

  const scheduleClose = useCallback(() => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => setIsFlyoutOpen(false), 150);
  }, [clearCloseTimeout]);

  const handleMouseEnter = useCallback(() => {
    if (!hasDropdown) return;
    openFlyout();
  }, [hasDropdown, openFlyout]);

  const handleMouseLeave = useCallback(() => {
    if (!hasDropdown || !isFlyoutOpen) return;
    scheduleClose();
  }, [hasDropdown, isFlyoutOpen, scheduleClose]);

  const handleFlyoutMouseEnter = useCallback(() => {
    clearCloseTimeout();
  }, [clearCloseTimeout]);

  const handleFlyoutMouseLeave = useCallback(() => {
    scheduleClose();
  }, [scheduleClose]);

  // Close on outside click
  useEffect(() => {
    if (!isFlyoutOpen) return;
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        itemRef.current?.contains(target) ||
        flyoutRef.current?.contains(target)
      ) return;
      setIsFlyoutOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isFlyoutOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => clearCloseTimeout();
  }, [clearCloseTimeout]);

  // Reposition flyout if it would overflow the viewport
  useEffect(() => {
    if (!isFlyoutOpen || !flyoutRef.current) return;
    const flyoutRect = flyoutRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    if (flyoutRect.bottom > viewportHeight - 16) {
      setFlyoutPosition(prev => ({
        ...prev,
        top: Math.max(16, viewportHeight - flyoutRect.height - 16),
      }));
    }
  }, [isFlyoutOpen]);

  const getBadgeAppearance = (variant?: string) => {
    switch (variant) {
      case 'primary': return Atoms.Badge.APPEARANCES.PRIMARY_LIGHT;
      case 'info': return Atoms.Badge.APPEARANCES.INFO_LIGHT;
      case 'success': return Atoms.Badge.APPEARANCES.SUCCESS_LIGHT;
      case 'warning': return Atoms.Badge.APPEARANCES.WARNING_LIGHT;
      case 'error': return Atoms.Badge.APPEARANCES.ERROR_LIGHT;
      default: return Atoms.Badge.APPEARANCES.PRIMARY_LIGHT;
    }
  };

  const handleItemClick = () => {
    if (hasDropdown) {
      if (onClick || item.onClick) {
        setIsFlyoutOpen(false);
        (onClick || item.onClick)?.();
      } else if (isFlyoutOpen) {
        setIsFlyoutOpen(false);
      } else {
        openFlyout();
      }
      return;
    }
    (onClick || item.onClick)?.();
  };

  return (
    <NavItemWrapper
      ref={itemRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StyledNavItem
        theme={theme}
        isActive={item.isActive}
        isFlyoutOpen={isFlyoutOpen}
        onClick={handleItemClick}
      >
        <NavItemIcon theme={theme}>
          <Icon type={item.icon} size={20} color={theme.colorOnSurface} />
        </NavItemIcon>
        <NavItemText theme={theme} isCollapsed={isCollapsed}>
          {item.label}
        </NavItemText>
        {!isCollapsed && (item.badge || item.hasSubmenu) && (
          <BadgeWrapper theme={theme}>
            {item.badge && (
              <Atoms.Badge
                appearance={getBadgeAppearance(item.badge.variant)}
                text={item.badge.text}
              />
            )}
            {item.hasSubmenu && (
              <Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} color={theme.colorOnSurface} />
            )}
          </BadgeWrapper>
        )}
      </StyledNavItem>

      {isFlyoutOpen && hasDropdown && (
        <FlyoutContainer
          ref={flyoutRef}
          theme={theme}
          style={{ top: flyoutPosition.top, left: flyoutPosition.left }}
          onMouseEnter={handleFlyoutMouseEnter}
          onMouseLeave={handleFlyoutMouseLeave}
        >
          {item.submenuGroups!.map((group, gi) => (
            <React.Fragment key={gi}>
              {gi > 0 && <FlyoutDivider theme={theme} />}
              {group.label && <FlyoutGroupLabel theme={theme}>{group.label}</FlyoutGroupLabel>}
              {group.items.map(sub => (
                <FlyoutItem
                  key={sub.id}
                  theme={theme}
                  onClick={() => {
                    setIsFlyoutOpen(false);
                    sub.onClick?.();
                  }}
                >
                  {sub.icon && <Icon type={sub.icon} size={16} color={theme.colorOnSurfaceVariant} />}
                  {sub.label}
                </FlyoutItem>
              ))}
            </React.Fragment>
          ))}
        </FlyoutContainer>
      )}
    </NavItemWrapper>
  );
};

