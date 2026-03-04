import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Avatar from '@rippling/pebble/Avatar';
import Label from '@rippling/pebble/Label';

// ============================================
// Types
// ============================================

export type PreviewType = 'documents' | 'benefits' | 'spend';

// ============================================
// Styled Components — Documents Preview
// ============================================

const PreviewCard = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  width: 100%;
  max-width: 280px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const PreviewCardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space300};
`;

const PreviewCardUser = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const PreviewCardUserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PreviewCardUserName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  font-weight: 500;
`;

const PreviewCardUserRole = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  font-size: 11px;
`;

const PreviewTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const PreviewTableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => (theme as StyledTheme).space200} 0;
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const PreviewTableHeaderText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const PreviewTableRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => (theme as StyledTheme).space200} 0;
`;

const PreviewTableRowLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const PreviewTableRowIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerSm};
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PreviewTableRowText = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  font-size: 12px;
`;

const PreviewTableRowStatus = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  font-size: 12px;
`;

// ============================================
// Styled Components — Benefits Preview
// ============================================

const BenefitsPreviewCard = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  width: 100%;
  max-width: 280px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const BenefitsSidebar = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  padding-right: ${({ theme }) => (theme as StyledTheme).space300};
  border-right: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  width: 40px;
`;

const BenefitsSidebarItem = styled.div<{ isActive?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerSm};
  background-color: ${({ isActive, theme }) =>
    isActive ? (theme as StyledTheme).colorPrimaryContainer : 'transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BenefitsContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const BenefitsTitle = styled.h4`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
  font-weight: 500;
`;

const BenefitsChart = styled.div`
  display: flex;
  align-items: flex-end;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
  height: 60px;
`;

const BenefitsChartBar = styled.div<{ height: number; color: string }>`
  width: 24px;
  height: ${({ height }) => height}%;
  background-color: ${({ color }) => color};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerSm} ${({ theme }) => (theme as StyledTheme).shapeCornerSm} 0 0;
`;

// ============================================
// Styled Components — Spend Preview
// ============================================

const SpendPreviewCard = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  width: 100%;
  max-width: 280px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
`;

const SpendHeader = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space300};
`;

const SpendChart = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  height: 100px;
  padding: ${({ theme }) => (theme as StyledTheme).space200} 0;
`;

const SpendBar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const SpendBarFill = styled.div<{ height: number }>`
  width: 32px;
  height: ${({ height }) => height}px;
  background-color: #7C3AED;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerSm} ${({ theme }) => (theme as StyledTheme).shapeCornerSm} 0 0;
`;

const SpendBarLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  font-size: 10px;
`;

// ============================================
// Preview Components
// ============================================

export const DocumentsPreview: React.FC = () => {
  const { theme } = usePebbleTheme();

  return (
    <PreviewCard theme={theme}>
      <PreviewCardHeader theme={theme}>
        <PreviewCardUser theme={theme}>
          <Avatar
            image="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
            size={Avatar.SIZES.S}
          />
          <PreviewCardUserInfo theme={theme}>
            <PreviewCardUserName theme={theme}>John Appleseed</PreviewCardUserName>
            <PreviewCardUserRole theme={theme}>Account Executive</PreviewCardUserRole>
          </PreviewCardUserInfo>
        </PreviewCardUser>
      </PreviewCardHeader>
      <PreviewTable theme={theme}>
        <PreviewTableHeader theme={theme}>
          <PreviewTableHeaderText theme={theme}>Documents</PreviewTableHeaderText>
          <PreviewTableHeaderText theme={theme}>Status</PreviewTableHeaderText>
        </PreviewTableHeader>
        <PreviewTableRow theme={theme}>
          <PreviewTableRowLeft theme={theme}>
            <PreviewTableRowIcon theme={theme}>
              <Icon type={Icon.TYPES.FILE_OUTLINE} size={12} />
            </PreviewTableRowIcon>
            <PreviewTableRowText theme={theme}>2026 W-2</PreviewTableRowText>
          </PreviewTableRowLeft>
          <PreviewTableRowStatus theme={theme}>Delivered</PreviewTableRowStatus>
        </PreviewTableRow>
        <PreviewTableRow theme={theme}>
          <PreviewTableRowLeft theme={theme}>
            <PreviewTableRowIcon theme={theme}>
              <Icon type={Icon.TYPES.FILE_OUTLINE} size={12} />
            </PreviewTableRowIcon>
            <PreviewTableRowText theme={theme}>Global Handbook</PreviewTableRowText>
          </PreviewTableRowLeft>
          <PreviewTableRowStatus theme={theme}>Signed</PreviewTableRowStatus>
        </PreviewTableRow>
        <PreviewTableRow theme={theme}>
          <PreviewTableRowLeft theme={theme}>
            <PreviewTableRowIcon theme={theme}>
              <Icon type={Icon.TYPES.FILE_OUTLINE} size={12} />
            </PreviewTableRowIcon>
            <PreviewTableRowText theme={theme}>Security policy</PreviewTableRowText>
          </PreviewTableRowLeft>
          <PreviewTableRowStatus theme={theme}>Complete</PreviewTableRowStatus>
        </PreviewTableRow>
      </PreviewTable>
    </PreviewCard>
  );
};

export const BenefitsPreview: React.FC = () => {
  const { theme } = usePebbleTheme();

  return (
    <BenefitsPreviewCard theme={theme}>
      <div style={{ display: 'flex', gap: theme.space300 }}>
        <BenefitsSidebar theme={theme}>
          <BenefitsSidebarItem theme={theme} isActive>
            <Icon type={Icon.TYPES.HOME_OUTLINE} size={14} />
          </BenefitsSidebarItem>
          <BenefitsSidebarItem theme={theme}>
            <Icon type={Icon.TYPES.BANK_OUTLINE} size={14} />
          </BenefitsSidebarItem>
          <BenefitsSidebarItem theme={theme}>
            <Icon type={Icon.TYPES.DOLLAR_CIRCLE_OUTLINE} size={14} />
          </BenefitsSidebarItem>
          <BenefitsSidebarItem theme={theme}>
            <Icon type={Icon.TYPES.HEART_OUTLINE} size={14} />
          </BenefitsSidebarItem>
        </BenefitsSidebar>
        <BenefitsContent theme={theme}>
          <BenefitsTitle theme={theme}>My Benefits</BenefitsTitle>
          <div style={{ display: 'flex', gap: theme.space300 }}>
            <div style={{ flex: 1 }}>
              <Label size={Label.SIZES.S}>Healthcare</Label>
              <BenefitsChart theme={theme}>
                <BenefitsChartBar theme={theme} height={40} color="#FFB74D" />
                <BenefitsChartBar theme={theme} height={60} color="#FFB74D" />
                <BenefitsChartBar theme={theme} height={80} color="#FFB74D" />
                <BenefitsChartBar theme={theme} height={50} color="#FFB74D" />
                <BenefitsChartBar theme={theme} height={70} color="#FFB74D" />
              </BenefitsChart>
            </div>
          </div>
        </BenefitsContent>
      </div>
    </BenefitsPreviewCard>
  );
};

export const SpendChartPreview: React.FC = () => {
  const { theme } = usePebbleTheme();

  return (
    <SpendPreviewCard theme={theme}>
      <SpendHeader theme={theme}>Spending by team</SpendHeader>
      <SpendChart theme={theme}>
        <SpendBar theme={theme}>
          <SpendBarFill theme={theme} height={40} />
          <SpendBarLabel theme={theme}>Jan</SpendBarLabel>
        </SpendBar>
        <SpendBar theme={theme}>
          <SpendBarFill theme={theme} height={55} />
          <SpendBarLabel theme={theme}>Feb</SpendBarLabel>
        </SpendBar>
        <SpendBar theme={theme}>
          <SpendBarFill theme={theme} height={70} />
          <SpendBarLabel theme={theme}>Mar</SpendBarLabel>
        </SpendBar>
        <SpendBar theme={theme}>
          <SpendBarFill theme={theme} height={85} />
          <SpendBarLabel theme={theme}>Apr</SpendBarLabel>
        </SpendBar>
        <SpendBar theme={theme}>
          <SpendBarFill theme={theme} height={95} />
          <SpendBarLabel theme={theme}>May</SpendBarLabel>
        </SpendBar>
      </SpendChart>
    </SpendPreviewCard>
  );
};

// ============================================
// Unified Preview Renderer
// ============================================

export const ProductPreview: React.FC<{ type: PreviewType }> = ({ type }) => {
  switch (type) {
    case 'documents':
      return <DocumentsPreview />;
    case 'benefits':
      return <BenefitsPreview />;
    case 'spend':
      return <SpendChartPreview />;
  }
};

/**
 * Maps a product ID to its preview type.
 * Used by both ExplorePage and PayrollSkuPage for consistent rendering.
 */
export const getPreviewType = (productId: string): PreviewType => {
  switch (productId) {
    case 'employee-records':
      return 'documents';
    case 'benefits':
      return 'benefits';
    default:
      return 'spend';
  }
};

export default ProductPreview;




