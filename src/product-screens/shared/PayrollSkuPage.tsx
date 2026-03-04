import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import Button from '@rippling/pebble/Button';
import Icon from '@rippling/pebble/Icon';
import ProgressBar from '@rippling/pebble/ProgressBar';
import AvatarList from '@rippling/pebble/AvatarList';
import { DISCOVER_PRODUCTS } from './discoverProducts';
import {
  DiscoveryPageLayout,
  PageHeroBanner,
  ValuePropsGrid,
  PlatformHubTemplate,
  HubWidget,
  HubWidgetTitle,
  HubWidgetLink,
} from '@/spec';

// ── Page container ──────────────────────────────────────

const SkuDetailContainer = styled(DiscoveryPageLayout)`
`;

// ── Hero section (uses PageHeroBanner) ──────────────────

// ── Payroll Readiness Card ──────────────────────────────

const PayrollReadinessCard = styled.div`
  background-color: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  padding: ${({ theme }) => (theme as StyledTheme).space500};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

const ReadinessCardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const ReadinessCardHeaderTop = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const ReadinessCardTitle = styled.h3`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLargeEmphasized};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const ReadinessCardSubtitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ReadinessProgressRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
`;

const ReadinessProgressPercent = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  flex-shrink: 0;
`;

const ReadinessSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ReadinessSectionLabel = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2LabelSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ReadinessRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => (theme as StyledTheme).space200} 0;
`;

const ReadinessRowLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const ReadinessRowTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space100};
`;

const ReadinessRowSubtext = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const ReadinessRowRight = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

const PaychecksReadyRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => (theme as StyledTheme).space300};
  padding-top: ${({ theme }) => (theme as StyledTheme).space300};
  border-top: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
`;

const PaychecksInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const PaychecksTitle = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMediumEmphasized};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
`;

const PaychecksSubtext = styled.span`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
`;

// ── Component ───────────────────────────────────────────

export const PayrollSkuPage: React.FC = () => {
  const { theme } = usePebbleTheme();

  const paycheckRoles = [
    { id: '1', fullName: 'Sarah Chen' },
    { id: '2', fullName: 'Michael Park' },
    { id: '3', fullName: 'Emily Rodriguez' },
    { id: '4', fullName: 'David Kim' },
    { id: '5', fullName: 'Lisa Thompson' },
    { id: '6', fullName: 'James Wilson' },
    { id: '7', fullName: 'Anna Martinez' },
    { id: '8', fullName: 'Robert Johnson' },
    { id: '9', fullName: 'Jennifer Lee' },
    { id: '10', fullName: 'Chris Brown' },
    ...Array.from({ length: 22 }, (_, i) => ({
      id: `${i + 11}`,
      fullName: `Employee ${i + 11}`,
    })),
  ];

  const payrollIncludes = [
    { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Auto-sync approved hours', description: 'Approved timecards flow directly into your payrun—no CSV exports, no manual entry, no re-keying errors.' },
    { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Overtime calculated automatically', description: "You approve hours, we do the math. California double-time, weekly thresholds, state-specific rules—all handled." },
    { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'One source of truth', description: 'Schedules, timecards, and paychecks all in one system. No more reconciling with a separate payroll provider.' },
    { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Close payroll in minutes, not days', description: 'Customers using Time + Payroll close 2-3 days faster. Most of the work is done when you approve timecards.' },
    { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Tax filings handled', description: 'Workers see their approved hours match their paychecks—fewer "why is my pay wrong?" questions.' },
    { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, title: 'Catch problems before payday', description: 'Flag missing punches, unapproved overtime, or schedule conflicts before they become payroll errors.' },
  ];

  return (
    <SkuDetailContainer theme={theme}>
      <PageHeroBanner
        layout="side-by-side"
        badge={<><Icon type={Icon.TYPES.FX_OUTLINE} size={14} /> No more time card entry</>}
        title="Turn tracked time into payroll — automatically"
        subtitle="You already track hours in Rippling. Now automatically approve time, control labor costs, and run payroll with confidence — no exports, no double entry, no surprises."
        primaryAction={{ label: 'Finish payroll setup' }}
        secondaryText="Takes ~10 minutes. No charge until your first pay run."
        visual={
          <PayrollReadinessCard theme={theme}>
            <ReadinessCardHeader theme={theme}>
              <ReadinessCardHeaderTop theme={theme}>
                <div>
                  <ReadinessCardTitle theme={theme}>Payroll readiness</ReadinessCardTitle>
                  <ReadinessCardSubtitle theme={theme}>Based on existing Time data</ReadinessCardSubtitle>
                </div>
                <Button.Icon
                  icon={Icon.TYPES.MORE_VERTICAL}
                  appearance={Button.APPEARANCES.GHOST}
                  size={Button.SIZES.S}
                  aria-label="More options"
                />
              </ReadinessCardHeaderTop>
              <ReadinessProgressRow theme={theme}>
                <div style={{ flex: 1 }}>
                  <ProgressBar completedPercent={90} appearance={ProgressBar.APPEARANCES.PRIMARY} />
                </div>
                <ReadinessProgressPercent theme={theme}>90%</ReadinessProgressPercent>
              </ReadinessProgressRow>
            </ReadinessCardHeader>

            <ReadinessSection theme={theme}>
              <ReadinessSectionLabel theme={theme}>
                <Icon type={Icon.TYPES.CALENDAR_OUTLINE} size={14} />
                Last pay period
              </ReadinessSectionLabel>
              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECK_CIRCLE} size={18} color={theme.colorSuccess} />
                  <ReadinessRowTitle theme={theme}>
                    Schedules
                    <Icon type={Icon.TYPES.INFO_OUTLINE} size={14} color={theme.colorOnSurfaceVariant} />
                  </ReadinessRowTitle>
                </ReadinessRowLeft>
                <ReadinessRowRight theme={theme}>Last updated Dec 10</ReadinessRowRight>
              </ReadinessRow>
              <ReadinessRowSubtext theme={theme} style={{ marginLeft: '26px' }}>Completed</ReadinessRowSubtext>
              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECK_CIRCLE} size={18} color={theme.colorSuccess} />
                  <ReadinessRowTitle theme={theme}>
                    Timecards
                    <Icon type={Icon.TYPES.INFO_OUTLINE} size={14} color={theme.colorOnSurfaceVariant} />
                  </ReadinessRowTitle>
                </ReadinessRowLeft>
                <ReadinessRowRight theme={theme}>45 approved</ReadinessRowRight>
              </ReadinessRow>
              <ReadinessRowSubtext theme={theme} style={{ marginLeft: '26px' }}>Completed</ReadinessRowSubtext>
              <ReadinessRow theme={theme}>
                <ReadinessRowLeft theme={theme}>
                  <Icon type={Icon.TYPES.CHECKBOX_OUTLINE} size={18} color={theme.colorOnSurfaceVariant} />
                  <ReadinessRowTitle theme={theme}>
                    Payroll
                    <Icon type={Icon.TYPES.INFO_OUTLINE} size={14} color={theme.colorOnSurfaceVariant} />
                  </ReadinessRowTitle>
                </ReadinessRowLeft>
                <Button appearance={Button.APPEARANCES.OUTLINE} size={Button.SIZES.S}>Enable</Button>
              </ReadinessRow>
              <ReadinessRowSubtext theme={theme} style={{ marginLeft: '26px' }}>Finish setup to connect banking and compliance</ReadinessRowSubtext>
            </ReadinessSection>

            <PaychecksReadyRow theme={theme}>
              <AvatarList
                roles={paycheckRoles}
                limit={5}
                size={AvatarList.SIZES.S}
                type={AvatarList.TYPES.TEXT}
                modalTitle="Employees ready for payroll"
              />
              <PaychecksInfo theme={theme}>
                <PaychecksTitle theme={theme}>32 paychecks ready to run</PaychecksTitle>
                <PaychecksSubtext theme={theme}>374 approved hours · ~$12,340 total</PaychecksSubtext>
              </PaychecksInfo>
            </PaychecksReadyRow>
          </PayrollReadinessCard>
        }
      />

      <ValuePropsGrid title="Payroll includes" items={payrollIncludes} columns={2} iconVariant="warm" />

      <PlatformHubTemplate
        title="Discover more products"
        subtitle="Go beyond time tracking with Rippling's full platform"
        heroFeatures={DISCOVER_PRODUCTS.map((p) => ({
          id: p.id,
          icon: p.icon,
          title: p.title,
          description: p.description,
          ctaLabel: 'Learn more',
        }))}
        rightRail={
          <HubWidget theme={theme}>
            <HubWidgetTitle theme={theme}>Explore the platform</HubWidgetTitle>
            <HubWidgetLink theme={theme} href="#" style={{ display: 'flex', alignItems: 'center', gap: theme.space100 }}>
              View all products <Icon type={Icon.TYPES.ARROW_RIGHT} size={14} />
            </HubWidgetLink>
          </HubWidget>
        }
      />
    </SkuDetailContainer>
  );
};

export default PayrollSkuPage;
