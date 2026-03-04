import React, { useState, useCallback } from 'react';
import styled from '@emotion/styled';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Tip from '@rippling/pebble/Tip';

const DiagramRoot = styled.div`
  padding: ${({ theme }) => (theme as StyledTheme).space500};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const RowLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  white-space: nowrap;
  position: absolute;
  right: 100%;
  margin-right: ${({ theme }) => (theme as StyledTheme).space300};
`;

const ProductsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  justify-content: center;
  position: relative;
`;


const NodeCardWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NodeCard = styled.div<{ active?: boolean; previewing?: boolean; recommended?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  padding: ${({ theme }) => `${(theme as StyledTheme).space200} ${(theme as StyledTheme).space400}`};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  border: 1px solid ${({ active, previewing, theme }) =>
    active
      ? (theme as StyledTheme).colorOnPrimaryContainer
      : previewing
        ? (theme as StyledTheme).colorPrimary
        : (theme as StyledTheme).colorOutlineVariant};
  background: ${({ active, previewing, theme }) =>
    active
      ? (theme as StyledTheme).colorPrimaryContainer
      : previewing
        ? (theme as StyledTheme).colorPrimaryContainer
        : (theme as StyledTheme).colorSurfaceBright};
  min-width: 100px;
  justify-content: center;
  position: relative;
  transition: all 150ms ease;
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};

  ${({ active, previewing }) => !active && !previewing && `
    opacity: 0.6;
    &:hover {
      opacity: 0.85;
    }
  `}
`;

const NodeLabel = styled.span<{ active?: boolean; previewing?: boolean }>`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ active, previewing, theme }) =>
    active || previewing
      ? (theme as StyledTheme).colorOnPrimaryContainer
      : (theme as StyledTheme).colorOnSurface};
`;

const InstalledBadge = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnPrimaryContainer};
  opacity: 0.7;
  font-size: 10px;
`;

const RecommendedDot = styled.span`
  width: 6px;
  height: 6px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  background: ${({ theme }) => (theme as StyledTheme).colorWarning};
  flex-shrink: 0;
`;

const ToggleIcon = styled.span<{ previewing?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 150ms ease;
  ${({ previewing }) => previewing && 'transform: rotate(45deg);'}
`;

const HConnector = styled.div`
  width: 24px;
  height: 1px;
  background: ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const Connector = styled.div`
  width: 1px;
  height: 20px;
  background: ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const ToolsGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ToolsGroupLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ToolsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  justify-content: center;
`;

const ToolNode = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  padding: ${({ theme }) => `${(theme as StyledTheme).space200} ${(theme as StyledTheme).space400}`};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
`;

const ToolLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const CountBadge = styled.span<{ highlighted?: boolean }>`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ highlighted, theme }) =>
    highlighted
      ? (theme as StyledTheme).colorOnPrimaryContainer
      : (theme as StyledTheme).colorOnSurfaceVariant};
  background: ${({ highlighted, theme }) =>
    highlighted
      ? (theme as StyledTheme).colorPrimaryContainer
      : (theme as StyledTheme).colorSurfaceContainerLow};
  padding: 1px 6px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  min-width: 18px;
  text-align: center;
  transition: all 150ms ease;
`;

interface PlatformDiagramPlaceholderProps {
  activeProducts?: string[];
}

interface ProductDef {
  name: string;
  icon: string;
  recommended?: string;
  baseCounts: { reports: number; workflows: number; policies: number };
}

const ALL_PRODUCTS: ProductDef[] = [
  { name: 'Time', icon: Icon.TYPES.LEAVE_MANAGEMENT_OUTLINED, baseCounts: { reports: 3, workflows: 2, policies: 1 } },
  { name: 'Payroll', icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, recommended: 'Time', baseCounts: { reports: 2, workflows: 2, policies: 1 } },
  { name: 'IT', icon: Icon.TYPES.REASSIGN_COMPUTER_OUTLINE, baseCounts: { reports: 2, workflows: 1, policies: 1 } },
  { name: 'Spend', icon: Icon.TYPES.CREDIT_CARD_OUTLINE, baseCounts: { reports: 2, workflows: 2, policies: 1 } },
];

export const PlatformDiagramPlaceholder: React.FC<PlatformDiagramPlaceholderProps> = ({
  activeProducts = ['Time'],
}) => {
  const { theme } = usePebbleTheme();
  const [previewProducts, setPreviewProducts] = useState<string[]>([]);

  const isInstalled = useCallback((name: string) => activeProducts.includes(name), [activeProducts]);

  const togglePreview = useCallback((name: string) => {
    if (isInstalled(name)) return;
    setPreviewProducts(prev =>
      prev.includes(name) ? prev.filter(p => p !== name) : [...prev, name],
    );
  }, [isInstalled]);

  const effectiveProducts = [...activeProducts, ...previewProducts];

  const totals = ALL_PRODUCTS.reduce(
    (acc, p) => {
      if (effectiveProducts.includes(p.name)) {
        acc.reports += p.baseCounts.reports;
        acc.workflows += p.baseCounts.workflows;
        acc.policies += p.baseCounts.policies;
      }
      return acc;
    },
    { reports: 0, workflows: 0, policies: 0 },
  );

  const hasPreview = previewProducts.length > 0;

  return (
    <DiagramRoot theme={theme}>
      <ProductsRow theme={theme}>
        <RowLabel theme={theme}>Based on</RowLabel>
        {ALL_PRODUCTS.map((product, idx) => {
          const installed = isInstalled(product.name);
          const previewing = previewProducts.includes(product.name);
          const isRecommended = !installed && product.recommended && activeProducts.includes(product.recommended);

          const node = (
            <NodeCardWrap key={product.name}>
              {idx > 0 && <HConnector theme={theme} style={{ position: 'absolute', right: '100%', top: '50%', width: 24 }} />}
              <NodeCard
                theme={theme}
                active={installed}
                previewing={previewing}
                onClick={() => togglePreview(product.name)}
              >
                <Icon
                  type={product.icon}
                  size={14}
                  color={(installed || previewing)
                    ? (theme as StyledTheme).colorOnPrimaryContainer
                    : (theme as StyledTheme).colorOnSurfaceVariant}
                />
                <NodeLabel theme={theme} active={installed} previewing={previewing}>
                  {product.name}
                </NodeLabel>
                {installed && <InstalledBadge theme={theme}>✓</InstalledBadge>}
                {isRecommended && !previewing && <RecommendedDot theme={theme} />}
                {!installed && (
                  <ToggleIcon previewing={previewing}>
                    <Icon
                      type={Icon.TYPES.PLUS}
                      size={12}
                      color={previewing
                        ? (theme as StyledTheme).colorOnPrimaryContainer
                        : (theme as StyledTheme).colorOnSurfaceVariant}
                    />
                  </ToggleIcon>
                )}
              </NodeCard>
            </NodeCardWrap>
          );

          if (isRecommended && !previewing) {
            return (
              <React.Fragment key={product.name}>
                {idx > 0 && <HConnector theme={theme} />}
                <Tip content={`Pairs best with ${product.recommended}`} placement={Tip.PLACEMENTS.TOP}>
                  {node}
                </Tip>
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={product.name}>
              {idx > 0 && <HConnector theme={theme} />}
              {node}
            </React.Fragment>
          );
        })}
      </ProductsRow>

      <Connector theme={theme} />

      <ToolsGroup theme={theme}>
        <ToolsGroupLabel theme={theme}>Recommendations</ToolsGroupLabel>
        <ToolsRow theme={theme}>
          <ToolNode theme={theme}>
            <Icon type={Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE} size={14} />
            <ToolLabel theme={theme}>Reports</ToolLabel>
            <CountBadge theme={theme} highlighted={hasPreview}>{totals.reports}</CountBadge>
          </ToolNode>
          <ToolNode theme={theme}>
            <Icon type={Icon.TYPES.THUNDERBOLT_OUTLINE} size={14} />
            <ToolLabel theme={theme}>Workflows</ToolLabel>
            <CountBadge theme={theme} highlighted={hasPreview}>{totals.workflows}</CountBadge>
          </ToolNode>
          <ToolNode theme={theme}>
            <Icon type={Icon.TYPES.SHIELD_OUTLINE} size={14} />
            <ToolLabel theme={theme}>Policies</ToolLabel>
            <CountBadge theme={theme} highlighted={hasPreview}>{totals.policies}</CountBadge>
          </ToolNode>
        </ToolsRow>
      </ToolsGroup>

      <Connector theme={theme} />
    </DiagramRoot>
  );
};
