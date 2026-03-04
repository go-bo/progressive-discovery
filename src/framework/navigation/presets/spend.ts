import Icon from '@rippling/pebble/Icon';
import type { NavSectionData, LifecyclePhase } from '../types';

interface SpendNavParams {
  isActive: (page: string) => boolean;
  onNavigate: (page: string) => void;
  lifecyclePhase: LifecyclePhase;
}

export function getSpendMainSections({ isActive, onNavigate, lifecyclePhase }: SpendNavParams): NavSectionData[] {
  const financeSection: NavSectionData = {
    items: [
      {
        id: 'finance-overview',
        label: 'Finance Overview',
        icon: isActive('finance-overview') ? Icon.TYPES.COMBO_CHART_FILLED : Icon.TYPES.COMBO_CHART_OUTLINE,
        isActive: isActive('finance-overview'),
        onClick: () => onNavigate('finance-overview'),
      },
      { id: 'my-finances', label: 'My Finances', icon: Icon.TYPES.USER_OUTLINE },
    ],
  };

  const financeAdminSection: NavSectionData = {
    items: [
      { id: 'tasks', label: 'Tasks', icon: Icon.TYPES.TASKS_OUTLINE, badge: { text: '543', variant: 'primary' as const } },
      { id: 'cards', label: 'Cards', icon: Icon.TYPES.CREDIT_CARD_OUTLINE },
      { id: 'reimbursements', label: 'Reimbursements', icon: Icon.TYPES.RECEIPT_OUTLINE },
      { id: 'expense-reports', label: 'Expense reports', icon: Icon.TYPES.FILE_OUTLINE },
      { id: 'bills', label: 'Bills', icon: Icon.TYPES.DOCUMENT_OUTLINE },
      { id: 'transactions', label: 'Transactions', icon: Icon.TYPES.DATA_TRANSFER_OUTLINE },
      { id: 'statements', label: 'Statements', icon: Icon.TYPES.FILE_OUTLINE },
      { id: 'accounting', label: 'Accounting', icon: Icon.TYPES.BANK_OUTLINE },
    ],
  };

  const financeManagementSection: NavSectionData = {
    items: [
      { id: 'people', label: 'People', icon: Icon.TYPES.USERS_OUTLINE },
      { id: 'vendors', label: 'Vendors', icon: Icon.TYPES.BUILDING_OUTLINE },
      { id: 'policies', label: 'Policies', icon: Icon.TYPES.SHIELD_OUTLINE },
      { id: 'settings', label: 'Settings', icon: Icon.TYPES.SETTINGS_OUTLINE },
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

  const sections: NavSectionData[] = [financeSection, financeAdminSection, financeManagementSection];

  if (lifecyclePhase !== 'onboarded') {
    sections.push(recommendedSection);
  }

  return sections;
}
