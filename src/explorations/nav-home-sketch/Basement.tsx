import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';

export interface BasementItem {
  id: string;
  label: string;
  icon: string; // Icon.TYPES value
  isActive?: boolean;
  badge?: number;
}

export interface BasementSection {
  items: BasementItem[];
}

interface BasementProps {
  /** Items above the divider (platform primitives like Home, Activity) */
  topSection: BasementSection;
  /** Items below the divider (product verticals like Time, Payroll) */
  middleSection: BasementSection;
  /** Tools section (Reports, Workflows, etc.) - appears below middle section with divider */
  toolsSection?: BasementSection;
  /** The "Explore" item pinned to bottom */
  exploreItem?: BasementItem;
  /** Currently selected item ID */
  activeItemId?: string;
  /** Callback when an item is clicked */
  onItemClick?: (itemId: string) => void;
  /** Callback when Explore is clicked */
  onExploreClick?: () => void;
  /** Callback when hovering over an item (for preview) */
  onItemHover?: (itemId: string | null) => void;
  /** Mouse enter handler (for hover expand) */
  onMouseEnter?: () => void;
  /** Mouse leave handler (for hover expand) */
  onMouseLeave?: () => void;
  theme: StyledTheme;
}

const BASEMENT_WIDTH = 58;

const BasementContainer = styled.aside`
  position: fixed;
  left: 0;
  top: 56px;
  bottom: 0;
  width: ${BASEMENT_WIDTH}px;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-right: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  display: flex;
  flex-direction: column;
  z-index: 50;
  overflow-y: auto;
  overflow-x: hidden;

  /* Hide scrollbar */
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const BasementContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px 8px 24px;
  gap: 8px;
`;

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const MiddleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1; /* Push platform section to bottom */
`;

const PlatformSection = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const BottomSection = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BasementItemWrapper = styled.button<{ isActive?: boolean; isExplore?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ isActive }) => (isActive ? '2px' : '0px')};
  padding: 6px 16px;
  padding-bottom: ${({ isExplore }) => (isExplore ? '8px' : '6px')};
  width: 100%;
  background: none;
  border: none;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  cursor: pointer;
  transition: background-color 150ms ease;

  &:hover {
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }

  &:active {
    background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerHigh};
  }
`;

const IconWrapper = styled.div<{ isActive?: boolean; isExplore?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  background-color: ${({ isActive, isExplore, theme }) => {
    if (isExplore) return (theme as StyledTheme).colorPrimaryContainer;
    if (isActive) return (theme as StyledTheme).colorSurfaceContainerHigh;
    return 'transparent';
  }};
  transition: background-color 150ms ease;
`;

const ItemLabel = styled.span<{ isActive?: boolean }>`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  font-weight: ${({ isActive }) => (isActive ? 535 : 400)};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  text-align: center;
  white-space: nowrap;
`;

export const Basement: React.FC<BasementProps> = ({
  topSection,
  middleSection,
  toolsSection,
  exploreItem,
  activeItemId,
  onItemClick,
  onExploreClick,
  onItemHover,
  onMouseEnter,
  onMouseLeave,
  theme,
}) => {
  const renderItem = (item: BasementItem, isExplore = false) => {
    const isActive = item.id === activeItemId;
    // Use filled icon for active state (convention: replace _OUTLINE with empty string)
    const iconType = isActive && item.icon.includes('OUTLINE')
      ? item.icon.replace('_OUTLINE', '')
      : item.icon;

    return (
      <BasementItemWrapper
        key={item.id}
        theme={theme}
        isActive={isActive}
        isExplore={isExplore}
        onClick={() => {
          if (isExplore) {
            onExploreClick?.();
          } else {
            onItemClick?.(item.id);
          }
        }}
        onMouseEnter={() => onItemHover?.(isExplore ? 'explore' : item.id)}
        onMouseLeave={() => onItemHover?.(null)}
      >
        <IconWrapper theme={theme} isActive={isActive} isExplore={isExplore}>
          <Icon
            type={iconType as any}
            size={20}
            color={isExplore ? theme.colorOnPrimaryContainer : theme.colorOnSurface}
          />
        </IconWrapper>
        <ItemLabel theme={theme} isActive={isActive}>
          {item.label}
        </ItemLabel>
      </BasementItemWrapper>
    );
  };

  return (
    <BasementContainer theme={theme} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <BasementContent>
        {/* Top Section - Platform primitives (Home, Activity) */}
        <TopSection theme={theme}>
          {topSection.items.map((item) => renderItem(item))}
        </TopSection>

        {/* Middle Section - Product verticals (Time, Payroll, etc.) */}
        <MiddleSection>
          {middleSection.items.map((item) => renderItem(item))}
        </MiddleSection>

        {/* Platform Section - Tools, anchored to bottom */}
        <PlatformSection theme={theme}>
          {/* Tools */}
          {toolsSection && toolsSection.items.length > 0 && (
            toolsSection.items.map((item) => renderItem(item))
          )}

          {/* Explore (pinned at very bottom) */}
          {exploreItem && (
            <BottomSection>
              {renderItem(exploreItem, true)}
            </BottomSection>
          )}
        </PlatformSection>
      </BasementContent>
    </BasementContainer>
  );
};

export { BASEMENT_WIDTH };

