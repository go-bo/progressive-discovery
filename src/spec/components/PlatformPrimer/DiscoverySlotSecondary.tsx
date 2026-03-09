import React from 'react';
import styled from '@emotion/styled';
import Icon from '@rippling/pebble/Icon';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';

export interface SecondaryDiscoveryItem {
  icon: string;
  title: string;
  note: string;
  onClick?: () => void;
}

export interface DiscoverySlotSecondaryProps {
  label: string;
  items: SecondaryDiscoveryItem[];
}

const Strip = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => (theme as StyledTheme).space400} 0 0;
  border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const StripLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ItemRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
`;

const Item = styled.button<{ clickable: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  background: none;
  border: none;
  padding: 0;
  cursor: ${({ clickable }) => (clickable ? 'pointer' : 'default')};
  text-align: left;
`;

const ItemIconWrap = styled.div`
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerMd};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const ItemText = styled.span`
  display: flex;
  align-items: baseline;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const ItemTitle = styled.span<{ clickable: boolean }>`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ clickable, theme }) =>
    clickable ? (theme as StyledTheme).colorPrimary : (theme as StyledTheme).colorOnSurface};

  ${Item}:hover & {
    text-decoration: ${({ clickable }) => (clickable ? 'underline' : 'none')};
  }
`;

const ItemNote = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

export const DiscoverySlotSecondary: React.FC<DiscoverySlotSecondaryProps> = ({
  label,
  items,
}) => {
  const { theme } = usePebbleTheme();

  return (
    <Strip theme={theme}>
      <StripLabel theme={theme}>{label}</StripLabel>
      <ItemRow theme={theme}>
        {items.map((item, idx) => {
          const clickable = !!item.onClick;
          return (
            <Item
              key={idx}
              theme={theme}
              clickable={clickable}
              as={clickable ? 'button' : 'div'}
              onClick={item.onClick}
            >
              <ItemIconWrap theme={theme}>
                <Icon type={item.icon} size={14} />
              </ItemIconWrap>
              <ItemText theme={theme}>
                <ItemTitle theme={theme} clickable={clickable}>{item.title}</ItemTitle>
                <ItemNote theme={theme}>{item.note}</ItemNote>
              </ItemText>
            </Item>
          );
        })}
      </ItemRow>
    </Strip>
  );
};
