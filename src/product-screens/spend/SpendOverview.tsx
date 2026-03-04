import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import type { LifecyclePhase } from '@/framework/navigation/types';

// ============================================================================
// Styled Components
// ============================================================================

const PageContent = styled.div`
  padding: ${({ theme }) => (theme as StyledTheme).space600};
`;

const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space600};
`;

const PageTitle = styled.h1`
  ${({ theme }) => (theme as StyledTheme).typestyleV2DisplaySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const BalanceCard = styled.div`
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space600};
`;

const BalanceRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space400};
`;

const BalanceLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const BalanceLabel = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const BalanceAmount = styled.div`
  font-size: 28px;
  font-weight: 500;
  line-height: 32px;
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const BalancePending = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const BalanceRight = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => (theme as StyledTheme).space600};
`;

const BalanceMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const BalanceMetaLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const BalanceMetaValue = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMediumEmphasized};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const BalanceActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space200};
  position: relative;
`;

const ProgressFill = styled.div<{ percent: number }>`
  height: 100%;
  width: ${({ percent }) => percent}%;
  background: ${({ theme }) => (theme as StyledTheme).colorSuccess};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
`;

const ProgressLabels = styled.div`
  display: flex;
  justify-content: space-between;
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const SectionCard = styled.div`
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space600};
  overflow: hidden;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => (theme as StyledTheme).space500};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const SectionTitle = styled.h2`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const SectionMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => (theme as StyledTheme).space400} ${({ theme }) => (theme as StyledTheme).space500};
`;

const FilterChip = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  padding: ${({ theme }) => `${(theme as StyledTheme).space100} ${(theme as StyledTheme).space300}`};
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

const FilterLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => (theme as StyledTheme).space500};
`;

const ChartTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0 0 ${({ theme }) => (theme as StyledTheme).space400} 0;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ChartBars = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 2px;
  flex: 1;
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space300};
`;

const ChartBarGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  flex: 1;
`;

const ChartBar = styled.div<{ height: number; color: string }>`
  width: 100%;
  height: ${({ height }) => height}px;
  background: ${({ color }) => color};
  border-radius: 2px 2px 0 0;
`;

const ChartLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  font-size: 10px;
  margin-top: ${({ theme }) => (theme as StyledTheme).space100};
`;

const GettingStartedCard = styled.div`
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space600};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space600};
`;

const GettingStartedHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space400};
`;

const GettingStartedTitle = styled.h2`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const GettingStartedSubtitle = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0 0 ${({ theme }) => (theme as StyledTheme).space400} 0;
`;

const GettingStartedSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const GettingStartedStep = styled.div<{ completed?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => (theme as StyledTheme).space300} ${({ theme }) => (theme as StyledTheme).space400};
  background: ${({ theme, completed }) =>
    completed
      ? (theme as StyledTheme).colorSurfaceContainerLow
      : (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  opacity: ${({ completed }) => (completed ? 0.6 : 1)};
`;

const StepNumber = styled.div<{ completed?: boolean }>`
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  background: ${({ theme, completed }) =>
    completed
      ? (theme as StyledTheme).colorSuccess
      : (theme as StyledTheme).colorPrimary};
  color: ${({ theme }) => (theme as StyledTheme).colorOnPrimary};
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  flex-shrink: 0;
`;

const StepContent = styled.div`
  flex: 1;
`;

const StepTitle = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMediumEmphasized};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const StepDescription = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const GettingStartedProgress = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ProgressBarSmall = styled.div`
  width: 120px;
  height: 4px;
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  overflow: hidden;
`;

const ProgressFillSmall = styled.div<{ percent: number }>`
  height: 100%;
  width: ${({ percent }) => percent}%;
  background: ${({ theme }) => (theme as StyledTheme).colorSuccess};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  transition: width 300ms ease;
`;

// ============================================================================
// Data
// ============================================================================

const chartData = [
  { label: 'Jan 12', bars: [{ h: 20, c: '#8B1A7A' }, { h: 5, c: '#E8A030' }] },
  { label: 'Jan 19', bars: [{ h: 120, c: '#8B1A7A' }, { h: 40, c: '#E8A030' }] },
  { label: 'Jan 26', bars: [{ h: 100, c: '#8B1A7A' }, { h: 45, c: '#E8A030' }] },
  { label: 'Feb 2', bars: [{ h: 80, c: '#8B1A7A' }, { h: 15, c: '#E8A030' }] },
  { label: 'Feb 9', bars: [{ h: 90, c: '#8B1A7A' }, { h: 30, c: '#E8A030' }] },
  { label: 'Feb 16', bars: [{ h: 30, c: '#8B1A7A' }, { h: 10, c: '#E8A030' }] },
];

const gettingStartedSteps = [
  { title: 'Connect your bank account', description: 'Link a business account to fund corporate cards.', completed: true },
  { title: 'Issue corporate cards', description: 'Create virtual or physical cards for employees.', completed: false },
  { title: 'Set spending limits', description: 'Define per-card and per-employee spend limits.', completed: false },
  { title: 'Configure approval workflows', description: 'Set up expense and bill approval chains.', completed: false },
];

// ============================================================================
// Component
// ============================================================================

interface SpendOverviewProps {
  lifecyclePhase: LifecyclePhase;
}

export const SpendOverview: React.FC<SpendOverviewProps> = ({ lifecyclePhase }) => {
  const { theme } = usePebbleTheme();
  const completedSteps = gettingStartedSteps.filter(s => s.completed).length;

  return (
    <PageContent theme={theme}>
      <PageHeader theme={theme}>
        <PageTitle theme={theme}>Finance Overview</PageTitle>
        <Button appearance={Button.APPEARANCES.PRIMARY}>
          <Icon type={Icon.TYPES.ADD} size={16} />
          Create new
        </Button>
      </PageHeader>

      {lifecyclePhase === 'trial' && (
        <GettingStartedCard theme={theme}>
          <GettingStartedHeader theme={theme}>
            <GettingStartedTitle theme={theme}>Getting started</GettingStartedTitle>
            <GettingStartedProgress theme={theme}>
              <span>{completedSteps} of {gettingStartedSteps.length}</span>
              <ProgressBarSmall theme={theme}>
                <ProgressFillSmall theme={theme} percent={(completedSteps / gettingStartedSteps.length) * 100} />
              </ProgressBarSmall>
            </GettingStartedProgress>
          </GettingStartedHeader>
          <GettingStartedSubtitle theme={theme}>
            Complete these steps to set up Spend Management for your company.
          </GettingStartedSubtitle>
          <GettingStartedSteps theme={theme}>
            {gettingStartedSteps.map((step, i) => (
              <GettingStartedStep key={i} theme={theme} completed={step.completed}>
                <StepNumber theme={theme} completed={step.completed}>
                  {step.completed ? (
                    <Icon type={Icon.TYPES.CHECK} size={14} color={(theme as StyledTheme).colorOnPrimary} />
                  ) : (
                    i + 1
                  )}
                </StepNumber>
                <StepContent>
                  <StepTitle theme={theme}>{step.title}</StepTitle>
                  <StepDescription theme={theme}>{step.description}</StepDescription>
                </StepContent>
                {!step.completed && (
                  <Button appearance={Button.APPEARANCES.OUTLINE} size={Button.SIZES.S}>
                    Start
                  </Button>
                )}
              </GettingStartedStep>
            ))}
          </GettingStartedSteps>
        </GettingStartedCard>
      )}

      <BalanceCard theme={theme}>
        <BalanceRow theme={theme}>
          <BalanceLeft theme={theme}>
            <BalanceLabel theme={theme}>
              Company balance
              <Icon type={Icon.TYPES.INFO_CIRCLE_OUTLINE} size={14} color={(theme as StyledTheme).colorOnSurfaceVariant} />
            </BalanceLabel>
            <BalanceAmount theme={theme}>-$1,654,409.81 USD</BalanceAmount>
            <BalancePending theme={theme}>
              Includes pending transactions: $0.00 USD
            </BalancePending>
          </BalanceLeft>
          <BalanceRight theme={theme}>
            <BalanceMeta theme={theme}>
              <BalanceMetaLabel theme={theme}>Billing cycle</BalanceMetaLabel>
              <BalanceMetaValue theme={theme}>Monthly</BalanceMetaValue>
            </BalanceMeta>
            <BalanceMeta theme={theme}>
              <BalanceMetaLabel theme={theme}>Due date</BalanceMetaLabel>
              <BalanceMetaValue theme={theme}>Feb 23, 2026</BalanceMetaValue>
            </BalanceMeta>
            <BalanceMeta theme={theme}>
              <BalanceMetaLabel theme={theme}>Available to spend</BalanceMetaLabel>
              <BalanceMetaValue theme={theme}>$2,154,409.81</BalanceMetaValue>
            </BalanceMeta>
            <BalanceActions theme={theme}>
              <Button appearance={Button.APPEARANCES.OUTLINE} size={Button.SIZES.S}>
                Statements
              </Button>
              <Button appearance={Button.APPEARANCES.PRIMARY} size={Button.SIZES.S}>
                Make a payment
              </Button>
            </BalanceActions>
          </BalanceRight>
        </BalanceRow>
        <ProgressBar theme={theme}>
          <ProgressFill theme={theme} percent={33} />
        </ProgressBar>
        <ProgressLabels theme={theme}>
          <span>Auto-debit at 75%</span>
          <span>Total limit: $500,000.00 USD</span>
        </ProgressLabels>
      </BalanceCard>

      <SectionCard theme={theme}>
        <SectionHeader theme={theme}>
          <SectionTitle theme={theme}>Spend Management Overview</SectionTitle>
          <SectionMeta theme={theme}>
            1 minute ago
            <Icon type={Icon.TYPES.HISTORY} size={16} color={(theme as StyledTheme).colorOnSurfaceVariant} />
          </SectionMeta>
        </SectionHeader>
        <FilterRow theme={theme}>
          <FilterLabel theme={theme}>Views</FilterLabel>
          <FilterChip theme={theme}>
            <Icon type={Icon.TYPES.FILE_OUTLINE} size={14} />
            New
          </FilterChip>
          <FilterLabel theme={theme}>Purchase date</FilterLabel>
          <FilterChip theme={theme}>
            Select a filter...
          </FilterChip>
          <Button.Icon icon={Icon.TYPES.ADD} size={Button.SIZES.XS} appearance={Button.APPEARANCES.GHOST} aria-label="Add filter" />
        </FilterRow>
      </SectionCard>

      <SectionCard theme={theme}>
        <ChartPlaceholder theme={theme}>
          <ChartTitle theme={theme}>
            Spend by type (Last 30 days)
            <Icon type={Icon.TYPES.WARNING_TRIANGLE_OUTLINE} size={16} color={(theme as StyledTheme).colorWarning} />
          </ChartTitle>
          <ChartBars theme={theme}>
            {chartData.map((group, i) => (
              <ChartBarGroup key={i}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  {group.bars.map((bar, j) => (
                    <ChartBar key={j} height={bar.h} color={bar.c} />
                  ))}
                </div>
                <ChartLabel theme={theme}>{group.label}</ChartLabel>
              </ChartBarGroup>
            ))}
          </ChartBars>
        </ChartPlaceholder>
      </SectionCard>
    </PageContent>
  );
};

export default SpendOverview;
