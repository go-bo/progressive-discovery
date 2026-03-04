import React, { useState, useCallback, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { StyledTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';

interface PaneAProps {
  /** Content to render inside the pane */
  children?: React.ReactNode;
  /** Header title for the pane */
  headerTitle?: string;
  /** Callback when width changes during resize */
  onWidthChange?: (width: number) => void;
  /** Callback when resize starts/stops */
  onResizingChange?: (isResizing: boolean) => void;
  /** Custom default width (overrides DEFAULT_PANE_WIDTH) */
  defaultWidth?: number;
  /** Whether the pane is collapsed */
  isCollapsed?: boolean;
  /** Callback when collapse state changes */
  onCollapseChange?: (collapsed: boolean) => void;
  /** Whether the pane is in hover/overlay mode */
  isHovering?: boolean;
  /** Callback for hover state changes (for overlay mode) */
  onHoverChange?: (hovering: boolean) => void;
  /** Theme object */
  theme: StyledTheme;
}

// Constants
const MIN_PANE_WIDTH = 200;
const DEFAULT_PANE_WIDTH = MIN_PANE_WIDTH; // Start at minimum width
const MAX_PANE_WIDTH = 400;

const slideIn = keyframes`
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const PaneContainer = styled.div<{ 
  width: number; 
  isResizing: boolean;
  isCollapsed: boolean;
  isHovering: boolean;
}>`
  position: ${({ isHovering }) => isHovering ? 'absolute' : 'relative'};
  left: ${({ isHovering }) => isHovering ? '0' : 'auto'};
  top: ${({ isHovering }) => isHovering ? '0' : 'auto'};
  width: ${({ width, isCollapsed, isHovering }) => 
    isCollapsed && !isHovering ? '0' : `${width}px`};
  min-width: ${({ isCollapsed, isHovering }) => 
    isCollapsed && !isHovering ? '0' : `${MIN_PANE_WIDTH}px`};
  max-width: ${MAX_PANE_WIDTH}px;
  height: 100%;
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-right: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  overflow: ${({ isCollapsed, isHovering }) => 
    isCollapsed && !isHovering ? 'hidden' : 'visible'};
  z-index: ${({ isHovering }) => isHovering ? '100' : '1'};
  box-shadow: ${({ isHovering, theme }) => 
    isHovering ? `2px 0 8px rgba(0, 0, 0, 0.08)` : 'none'};
  animation: ${({ isHovering }) => isHovering ? slideIn : 'none'} 150ms ease-out;
`;

const PaneHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => (theme as StyledTheme).space300} ${({ theme }) => (theme as StyledTheme).space300};
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space100};
`;

const PaneHeaderTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  padding-left: 8px;
`;

const PaneContent = styled.div`
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 0 8px 16px;

  /* Hide scrollbar for cleaner look */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
    border-radius: 3px;
  }
`;

const ResizeHandle = styled.div`
  position: absolute;
  right: -4px;
  top: 0;
  bottom: 0;
  width: 8px;
  cursor: col-resize;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    left: 3px;
    top: 0;
    bottom: 0;
    width: 2px;
    background-color: transparent;
    transition: background-color 150ms ease;
  }

  &:hover::after {
    background-color: ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  }
`;

const EmptyState = styled.div`
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  text-align: left;
`;

export const PaneA: React.FC<PaneAProps> = ({
  children,
  headerTitle,
  onWidthChange,
  onResizingChange,
  defaultWidth,
  isCollapsed = false,
  onCollapseChange,
  isHovering = false,
  onHoverChange,
  theme,
}) => {
  const effectiveDefaultWidth = defaultWidth ?? DEFAULT_PANE_WIDTH;
  const [paneWidth, setPaneWidth] = useState(effectiveDefaultWidth);
  const [isResizing, setIsResizing] = useState(false);
  const onWidthChangeRef = useRef(onWidthChange);

  // Keep the ref updated
  onWidthChangeRef.current = onWidthChange;

  // Update width when defaultWidth prop changes
  useEffect(() => {
    setPaneWidth(effectiveDefaultWidth);
    onWidthChangeRef.current?.(effectiveDefaultWidth);
  }, [effectiveDefaultWidth]);

  // Handle mouse move during resize
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Calculate new width based on mouse position relative to the basement
    // PaneA starts at BASEMENT_WIDTH (58px), so width = mouseX - 58
    const BASEMENT_WIDTH = 58;
    const newWidth = e.clientX - BASEMENT_WIDTH;
    const clampedWidth = Math.min(MAX_PANE_WIDTH, Math.max(MIN_PANE_WIDTH, newWidth));
    setPaneWidth(clampedWidth);
    onWidthChangeRef.current?.(clampedWidth);
  }, []);

  // Handle mouse up to stop resizing
  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    onResizingChange?.(false);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  }, [onResizingChange]);

  // Add/remove event listeners for resize
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    onResizingChange?.(true);
  };

  const handleCollapse = () => {
    onCollapseChange?.(true);
  };

  const handlePin = () => {
    onCollapseChange?.(false);
  };

  // Don't render anything if collapsed and not hovering
  if (isCollapsed && !isHovering) {
    return null;
  }

  return (
    <PaneContainer 
      theme={theme} 
      width={paneWidth} 
      isResizing={isResizing}
      isCollapsed={isCollapsed}
      isHovering={isHovering}
      onMouseEnter={isHovering ? () => onHoverChange?.(true) : undefined}
      onMouseLeave={isHovering ? () => onHoverChange?.(false) : undefined}
    >
      <PaneHeader theme={theme}>
        <PaneHeaderTitle theme={theme}>
          {headerTitle || ''}
        </PaneHeaderTitle>
        {isHovering ? (
          <Button.Icon
            icon={Icon.TYPES.COLLAPSE_PANEL_OUTLINE}
            size={Button.SIZES.S}
            appearance={Button.APPEARANCES.GHOST}
            aria-label="Pin sidebar open"
            tip="Pin sidebar open"
            onClick={handlePin}
          />
        ) : (
          <Button.Icon
            icon={Icon.TYPES.PIN_LEFT}
            size={Button.SIZES.S}
            appearance={Button.APPEARANCES.GHOST}
            aria-label="Collapse sidebar"
            tip="Collapse sidebar"
            onClick={handleCollapse}
          />
        )}
      </PaneHeader>
      
      <PaneContent theme={theme}>
        {children || (
          <EmptyState theme={theme}>
            Pane A
          </EmptyState>
        )}
      </PaneContent>

      {/* Resize Handle - only show when not in hover mode */}
      {!isHovering && (
        <ResizeHandle theme={theme} onMouseDown={handleResizeStart} />
      )}
    </PaneContainer>
  );
};

export { DEFAULT_PANE_WIDTH, MIN_PANE_WIDTH, MAX_PANE_WIDTH };

