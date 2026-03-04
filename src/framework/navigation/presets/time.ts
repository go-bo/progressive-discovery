import Icon from '@rippling/pebble/Icon';
import type { NavSectionData, LifecyclePhase } from '../types';

interface TimeNavParams {
  isActive: (page: string) => boolean;
  onNavigate: (page: string) => void;
  lifecyclePhase: LifecyclePhase;
}

export function getTimeMainSections({ isActive, onNavigate, lifecyclePhase }: TimeNavParams): NavSectionData[] {
  const timeSection: NavSectionData = {
    items: [
      {
        id: 'time-overview',
        label: 'Time Overview',
        icon: isActive('time-overview') ? Icon.TYPES.COMBO_CHART_FILLED : Icon.TYPES.COMBO_CHART_OUTLINE,
        isActive: isActive('time-overview'),
        onClick: () => onNavigate('time-overview'),
      },
      { id: 'my-time', label: 'My Time', icon: Icon.TYPES.USER_OUTLINE },
    ],
  };

  const timeAdminSection: NavSectionData = {
    items: [
      { id: 'approvals', label: 'Approvals', icon: Icon.TYPES.TASKS_OUTLINE },
      { id: 'schedules', label: 'Schedules', icon: Icon.TYPES.CALENDAR_OUTLINE },
      { id: 'timesheets', label: 'Timesheets', icon: Icon.TYPES.OVERTIME_POLICY_OUTLINE },
      { id: 'time-off', label: 'Time Off', icon: Icon.TYPES.LEAVE_MANAGEMENT_OUTLINED },
      { id: 'people', label: 'People', icon: Icon.TYPES.USERS_OUTLINE },
      { id: 'timeclock-management', label: 'Timeclock Management', icon: Icon.TYPES.REASSIGN_COMPUTER_OUTLINE },
      { id: 'time-settings', label: 'Time Settings', icon: Icon.TYPES.SETTINGS_OUTLINE },
    ],
  };

  const showBadges = lifecyclePhase === 'trial';
  const recommendedSection: NavSectionData = {
    dividerBefore: true,
    items: [
      {
        id: 'payroll',
        label: 'Payroll',
        icon: isActive('payroll') ? Icon.TYPES.DOLLAR_CIRCLE_FILLED : Icon.TYPES.DOLLAR_CIRCLE_OUTLINE,
        ...(showBadges ? { badge: { text: 'Recommended', variant: 'primary' as const } } : {}),
        isActive: isActive('payroll'),
        onClick: () => onNavigate('payroll'),
      },
    ],
  };

  const sections: NavSectionData[] = [timeSection, timeAdminSection];

  if (lifecyclePhase !== 'onboarded') {
    sections.push(recommendedSection);
  }

  return sections;
}
