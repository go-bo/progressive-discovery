import React, { useState } from 'react';
import styled from '@emotion/styled';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import Button from '@rippling/pebble/Button';
import Avatar from '@rippling/pebble/Avatar';
import Tabs from '@rippling/pebble/Tabs';
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

const TilesContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space600};
`;

const StatusTile = styled.div`
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  padding: 12px 16px;
  cursor: pointer;
  transition: box-shadow 150ms ease;
  min-height: 80px;
  max-width: 170px;
  width: 170px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-shrink: 0;
  
  &:hover {
    box-shadow: ${({ theme }) => (theme as StyledTheme).shadowSm};
  }
`;

const TileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const TileLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const TileValue = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const TileNumber = styled.span`
  font-size: 28px;
  font-weight: 500;
  line-height: 32px;
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const AvatarStack = styled.div`
  display: flex;
  align-items: center;
`;

const StackedAvatar = styled.div<{ index: number }>`
  margin-left: ${({ index }) => index > 0 ? '-6px' : '0'};
  position: relative;
  z-index: ${({ index }) => 10 - index};
`;

const OverflowCount = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin-left: 4px;
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerFull};
  padding: 2px 6px;
  font-size: 11px;
`;

const ControlsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => (theme as StyledTheme).space400};
`;

const TabsWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const DateControls = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const TodayButton = styled.button`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  padding: ${({ theme }) => `${(theme as StyledTheme).space200} ${(theme as StyledTheme).space300}`};
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

const DatePicker = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const TimezoneSelect = styled.button`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
  
  &:hover {
    color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  }
`;

const TableContainer = styled.div`
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  overflow: hidden;
`;

const ScheduleHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const ScheduleSelect = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  background: transparent;
  border: none;
  cursor: pointer;
  
  &:hover {
    color: ${({ theme }) => (theme as StyledTheme).colorPrimary};
  }
`;

const TableHeaderRow = styled.div`
  display: grid;
  grid-template-columns: 200px 100px 1fr;
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
`;

const TableHeaderCell = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  padding: ${({ theme }) => (theme as StyledTheme).space300};
  text-transform: uppercase;
`;

const TimelineHeader = styled.div`
  display: flex;
  padding: ${({ theme }) => (theme as StyledTheme).space300};
`;

const TimeSlot = styled.div`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  width: 40px;
  text-align: center;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 200px 100px 1fr;
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
`;

const EmployeeCell = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding: ${({ theme }) => (theme as StyledTheme).space300};
`;

const EmployeeName = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const StatusCell = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => (theme as StyledTheme).space300};
`;

const TimelineCell = styled.div`
  position: relative;
  padding: ${({ theme }) => (theme as StyledTheme).space300};
`;

const TimelineBar = styled.div<{ start: number; width: number }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ start }) => start}%;
  width: ${({ width }) => width}%;
  height: 24px;
  background: ${({ theme }) => (theme as StyledTheme).colorPrimaryContainer};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerSm};
`;

const CurrentTimeLine = styled.div<{ position: number }>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: ${({ position }) => position}%;
  width: 2px;
  background: ${({ theme }) => (theme as StyledTheme).colorError};
  z-index: 10;
`;

const CollapsibleGroup = styled.div`
  border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const CollapsibleHeader = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  width: 100%;
  padding: ${({ theme }) => (theme as StyledTheme).space300};
  background: transparent;
  border: none;
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  cursor: pointer;
  
  &:hover {
    background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  }
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
// Sample Data
// ============================================================================

const statusTiles = [
  { label: 'Clocked In', value: 0, avatars: [] as { name: string; image: string }[], overflow: 9 },
  { label: 'Clocked Out', value: 4, avatars: [
    { name: 'Kyle Beard', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
    { name: 'Michelle Shields', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face' },
    { name: 'Andre Lang', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
    { name: 'Emily Burgess', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
  ], overflow: 0 },
  { label: 'Out Today', value: 2, avatars: [
    { name: 'Sara Johns', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face' },
    { name: 'Nancy Stuart', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face' },
  ], overflow: 0 },
  { label: 'On Break', value: 7, avatars: [
    { name: 'Andrew Jenkins', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
    { name: 'Erin Brennan', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face' },
    { name: 'Ronald Bradford', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face' },
  ], overflow: 4 },
];

const employees = [
  { name: 'Kyle Beard', status: 'Working', shift: { start: 35, width: 30 } },
  { name: 'Michelle Shields', status: 'Working', shift: { start: 35, width: 30 } },
  { name: 'Andre Lang', status: 'Break', shift: { start: 30, width: 35 } },
  { name: 'Andrew Jenkins', status: 'Working', shift: { start: 35, width: 30 } },
  { name: 'Erin Brennan', status: 'Working', shift: { start: 40, width: 25 } },
  { name: 'Sara Johns', status: 'Off', shift: null },
  { name: 'Emily Burgess', status: 'Working', shift: { start: 35, width: 30 } },
  { name: 'Catherine Leblanc', status: 'Working', shift: { start: 35, width: 30 } },
  { name: 'Ronald Bradford', status: 'Working', shift: { start: 30, width: 35 } },
  { name: 'Nancy Stuart', status: 'Off', shift: null },
];

const timeSlots = ['12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
const amPm = ['AM', 'AM', 'AM', 'AM', 'AM', 'AM', 'AM', 'AM', 'AM', 'AM', 'AM', 'AM', 'PM', 'PM', 'PM', 'PM', 'PM', 'PM', 'PM', 'PM', 'PM', 'PM', 'PM', 'PM'];

const gettingStartedSteps = [
  { title: 'Add your employees', description: 'Import or add team members to get started.', completed: true },
  { title: 'Set up pay schedules', description: 'Define weekly, biweekly, or monthly schedules.', completed: true },
  { title: 'Configure time-off policies', description: 'Set PTO accrual rules and approval workflows.', completed: false },
  { title: 'Enable time tracking', description: 'Turn on clock-in/out for hourly employees.', completed: false },
];

// ============================================================================
// Component
// ============================================================================

interface TimeOverviewProps {
  lifecyclePhase: LifecyclePhase;
}

export const TimeOverview: React.FC<TimeOverviewProps> = ({ lifecyclePhase }) => {
  const { theme } = usePebbleTheme();
  const [activeTab, setActiveTab] = useState(0);

  const completedSteps = gettingStartedSteps.filter(s => s.completed).length;

  return (
    <PageContent theme={theme}>
      <PageHeader theme={theme}>
        <PageTitle theme={theme}>Time Overview</PageTitle>
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
            Complete these steps to set up Time for your team.
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

      <TilesContainer theme={theme}>
        {statusTiles.map((tile, index) => (
          <StatusTile key={index} theme={theme}>
            <TileHeader theme={theme}>
              <TileLabel theme={theme}>{tile.label}</TileLabel>
              <Icon type={Icon.TYPES.CHEVRON_RIGHT} size={12} color={(theme as StyledTheme).colorOnSurfaceVariant} />
            </TileHeader>
            <TileValue theme={theme}>
              <TileNumber theme={theme}>{tile.value}</TileNumber>
              {tile.avatars.length > 0 && (
                <AvatarStack theme={theme}>
                  {tile.avatars.slice(0, 4).map((avatar, i) => (
                    <StackedAvatar key={i} index={i} theme={theme}>
                      <Avatar image={avatar.image} size={Avatar.SIZES.XS} isCompact />
                    </StackedAvatar>
                  ))}
                  {tile.overflow > 0 && (
                    <OverflowCount theme={theme}>+{tile.overflow}</OverflowCount>
                  )}
                </AvatarStack>
              )}
            </TileValue>
          </StatusTile>
        ))}
      </TilesContainer>

      <ControlsRow theme={theme}>
        <TabsWrapper theme={theme}>
          <Tabs activeIndex={activeTab} onChange={(index) => setActiveTab(Number(index))}>
            <Tabs.Tab title="Timeline" />
            <Tabs.Tab title="Schedule" />
            <Tabs.Tab title="Timecards" />
          </Tabs>
        </TabsWrapper>
        <DateControls theme={theme}>
          <TodayButton theme={theme}>Today</TodayButton>
          <DatePicker theme={theme}>
            <Button.Icon icon={Icon.TYPES.CHEVRON_LEFT} size={Button.SIZES.XS} appearance={Button.APPEARANCES.GHOST} aria-label="Previous" />
            <span>02/05/2026</span>
            <Button.Icon icon={Icon.TYPES.CHEVRON_RIGHT} size={Button.SIZES.XS} appearance={Button.APPEARANCES.GHOST} aria-label="Next" />
          </DatePicker>
          <TimezoneSelect theme={theme}>
            EST (UTC-5) - America
            <Icon type={Icon.TYPES.CHEVRON_DOWN} size={12} />
          </TimezoneSelect>
        </DateControls>
      </ControlsRow>

      <TableContainer theme={theme}>
        <ScheduleHeader theme={theme}>
          <Icon type={Icon.TYPES.CHEVRON_DOWN} size={16} />
          <ScheduleSelect theme={theme}>
            East Bay Schedule (Test)
          </ScheduleSelect>
        </ScheduleHeader>
        
        <TableHeaderRow theme={theme}>
          <TableHeaderCell theme={theme}>Employee</TableHeaderCell>
          <TableHeaderCell theme={theme}>Status</TableHeaderCell>
          <TimelineHeader theme={theme}>
            {timeSlots.map((slot, i) => (
              <TimeSlot key={i} theme={theme}>
                {slot}
                <br />
                <span style={{ fontSize: '9px' }}>{amPm[i]}</span>
              </TimeSlot>
            ))}
          </TimelineHeader>
        </TableHeaderRow>
        
        {employees.map((employee, index) => (
          <TableRow key={index} theme={theme}>
            <EmployeeCell theme={theme}>
              <Avatar title={employee.name} size={Avatar.SIZES.S} isCompact />
              <EmployeeName theme={theme}>{employee.name}</EmployeeName>
            </EmployeeCell>
            <StatusCell theme={theme}>
            </StatusCell>
            <TimelineCell theme={theme}>
              {employee.shift && (
                <TimelineBar 
                  theme={theme} 
                  start={employee.shift.start} 
                  width={employee.shift.width} 
                />
              )}
              <CurrentTimeLine theme={theme} position={58} />
            </TimelineCell>
          </TableRow>
        ))}

        <CollapsibleGroup theme={theme}>
          <CollapsibleHeader theme={theme}>
            <Icon type={Icon.TYPES.CHEVRON_RIGHT} size={16} />
            Jan23demo
          </CollapsibleHeader>
        </CollapsibleGroup>
      </TableContainer>
    </PageContent>
  );
};

export default TimeOverview;
