import Icon from '@rippling/pebble/Icon';
import type { ProductId } from '@/framework/user-model/types';

export type RecipeType = 'workflow' | 'report' | 'policy';
export type RecipeStatus = 'active' | 'not_enabled' | 'triggered';

export interface RecipeRow {
  title: string;
  description: string;
  icon: string;
  type: RecipeType;
  status: RecipeStatus;
  triggeredText?: string;
}

export interface ProblemBlock {
  icon: string;
  title: string;
  products: ProductId[];
  recipes: RecipeRow[];
}

export const ALL_PROBLEM_BLOCKS: ProblemBlock[] = [
  // ── Time ──────────────────────────────────────────────
  {
    icon: Icon.TYPES.OUT_OF_POLICY_OUTLINE,
    title: 'Prevent payroll errors before they happen',
    products: ['time'],
    recipes: [
      { title: 'Overtime hours report', description: 'Surface employees approaching or exceeding weekly hour limits.', icon: Icon.TYPES.OVERTIME_POLICY_OUTLINE, type: 'report', status: 'active' },
      { title: 'Break compliance policy', description: 'Enforce meal and rest break requirements by jurisdiction.', icon: Icon.TYPES.SHIELD_OUTLINE, type: 'policy', status: 'active' },
      { title: 'Late timesheet reminder', description: "Nudge employees who haven't submitted timesheets by the deadline.", icon: Icon.TYPES.HOURGLASS_CHECKED_OUTLINE, type: 'workflow', status: 'not_enabled' },
      { title: 'Payroll variance report', description: 'Flag unusual payroll changes before the run is finalized.', icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE, type: 'report', status: 'not_enabled' },
    ],
  },
  {
    icon: Icon.TYPES.CALENDAR_OUTLINE,
    title: 'Never leave a shift uncovered',
    products: ['time'],
    recipes: [
      { title: 'Shift coverage report', description: 'Show understaffed shifts across locations and departments.', icon: Icon.TYPES.COMBO_CHART_OUTLINE, type: 'report', status: 'active' },
      { title: 'Minimum staffing policy', description: 'Enforce minimum headcount per shift and location.', icon: Icon.TYPES.SHIELD_OUTLINE, type: 'policy', status: 'not_enabled' },
      { title: 'Open shift notification', description: 'Notify eligible employees when a shift becomes available.', icon: Icon.TYPES.NOTIFICATION_OUTLINE, type: 'workflow', status: 'not_enabled' },
      { title: 'Unassigned shift escalation', description: 'Escalate to managers when a shift is still unassigned 12 hours out.', icon: Icon.TYPES.DATA_TRANSFER_OUTLINE, type: 'workflow', status: 'not_enabled' },
    ],
  },
  {
    icon: Icon.TYPES.TASKS_OUTLINE,
    title: 'Eliminate timecard errors before payroll',
    products: ['time'],
    recipes: [
      { title: 'Timecard exception report', description: 'Flag missed punches, short shifts, and anomalies before payroll.', icon: Icon.TYPES.HISTORY, type: 'report', status: 'active' },
      { title: 'Rounding & grace period policy', description: 'Standardize clock-in rounding rules across the organization.', icon: Icon.TYPES.SHIELD_OUTLINE, type: 'policy', status: 'active' },
      { title: 'Missed clock-in reminder', description: "Nudge employees who haven't clocked in 15 minutes after shift start.", icon: Icon.TYPES.NOTIFICATION_OUTLINE, type: 'workflow', status: 'active' },
      { title: 'Manager approval reminder', description: 'Remind managers to review and approve pending timecards.', icon: Icon.TYPES.TASKS_OUTLINE, type: 'workflow', status: 'not_enabled' },
    ],
  },

  // ── Spend ─────────────────────────────────────────────
  {
    icon: Icon.TYPES.CREDIT_CARD_OUTLINE,
    title: 'Prevent unauthorized spend before it happens',
    products: ['spend'],
    recipes: [
      { title: 'Spend limit policy', description: 'Enforce per-card and per-employee transaction limits.', icon: Icon.TYPES.SHIELD_OUTLINE, type: 'policy', status: 'active' },
      { title: 'Out-of-policy spend report', description: 'Surface transactions that violate company spending policies.', icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE, type: 'report', status: 'active' },
      { title: 'Missing receipt reminder', description: 'Nudge cardholders to upload receipts within 48 hours.', icon: Icon.TYPES.NOTIFICATION_OUTLINE, type: 'workflow', status: 'not_enabled' },
      { title: 'Suspicious transaction alert', description: 'Flag unusual spending patterns for manager review.', icon: Icon.TYPES.DATA_TRANSFER_OUTLINE, type: 'workflow', status: 'not_enabled' },
    ],
  },
  {
    icon: Icon.TYPES.RECEIPT_OUTLINE,
    title: 'Close the books faster every month',
    products: ['spend'],
    recipes: [
      { title: 'Uncategorized expense report', description: 'Show all transactions without an accounting category assigned.', icon: Icon.TYPES.COMBO_CHART_OUTLINE, type: 'report', status: 'active' },
      { title: 'Auto-categorization policy', description: 'Automatically tag transactions by merchant category code.', icon: Icon.TYPES.SHIELD_OUTLINE, type: 'policy', status: 'not_enabled' },
      { title: 'Month-end reconciliation reminder', description: 'Notify finance team when open items remain at month-end.', icon: Icon.TYPES.HOURGLASS_CHECKED_OUTLINE, type: 'workflow', status: 'active' },
      { title: 'Expense report aging report', description: 'Track how long expense reports have been waiting for approval.', icon: Icon.TYPES.HISTORY, type: 'report', status: 'not_enabled' },
    ],
  },
  {
    icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE,
    title: 'Keep vendor costs under control',
    products: ['spend'],
    recipes: [
      { title: 'Vendor spend analysis report', description: 'Break down spend by vendor to identify consolidation opportunities.', icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE, type: 'report', status: 'active' },
      { title: 'Vendor approval policy', description: 'Require approval before paying new vendors over a set threshold.', icon: Icon.TYPES.SHIELD_OUTLINE, type: 'policy', status: 'active' },
      { title: 'Duplicate payment detection', description: 'Flag bills that match existing payments to prevent double-pay.', icon: Icon.TYPES.DATA_TRANSFER_OUTLINE, type: 'workflow', status: 'not_enabled' },
      { title: 'Contract renewal reminder', description: 'Alert stakeholders 60 days before vendor contracts auto-renew.', icon: Icon.TYPES.NOTIFICATION_OUTLINE, type: 'workflow', status: 'not_enabled' },
    ],
  },

  // ── Payroll ────────────────────────────────────────────
  {
    icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE,
    title: 'Eliminate payroll surprises',
    products: ['payroll'],
    recipes: [
      { title: 'Pre-payroll audit report', description: 'Catch missing tax info, unsigned documents, and unverified bank accounts before you run payroll.', icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE, type: 'report', status: 'active' },
      { title: 'New hire payroll readiness', description: 'Alert payroll admins when a new hire is missing data required to issue a paycheck.', icon: Icon.TYPES.NOTIFICATION_OUTLINE, type: 'workflow', status: 'not_enabled' },
      { title: 'Payroll change log report', description: 'Track salary changes, bonus additions, and deduction modifications across pay periods.', icon: Icon.TYPES.HISTORY, type: 'report', status: 'not_enabled' },
    ],
  },

  // ── Benefits ──────────────────────────────────────────
  {
    icon: Icon.TYPES.HEART_FILLED,
    title: 'Keep benefits enrollment on track',
    products: ['benefits'],
    recipes: [
      { title: 'Enrollment status report', description: 'See which employees have completed, started, or skipped open enrollment.', icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE, type: 'report', status: 'active' },
      { title: 'Life event change workflow', description: 'Trigger enrollment windows automatically when qualifying life events occur.', icon: Icon.TYPES.DATA_TRANSFER_OUTLINE, type: 'workflow', status: 'active' },
      { title: 'Enrollment deadline reminder', description: 'Nudge employees who haven\'t completed enrollment as the window closes.', icon: Icon.TYPES.NOTIFICATION_OUTLINE, type: 'workflow', status: 'not_enabled' },
    ],
  },

  // ── IT ─────────────────────────────────────────────────
  {
    icon: Icon.TYPES.REASSIGN_COMPUTER_OUTLINE,
    title: 'Secure devices and access from day one',
    products: ['it'],
    recipes: [
      { title: 'Unmanaged device report', description: 'Identify company devices missing MDM enrollment or security agents.', icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE, type: 'report', status: 'active' },
      { title: 'Offboarding access revocation', description: 'Automatically deprovision apps and disable devices when an employee is terminated.', icon: Icon.TYPES.DATA_TRANSFER_OUTLINE, type: 'workflow', status: 'active' },
      { title: 'Stale account cleanup', description: 'Flag SaaS accounts that haven\'t been used in 90 days.', icon: Icon.TYPES.SEARCH, type: 'report', status: 'not_enabled' },
    ],
  },

  // ── Cross-product (Time + Payroll) ─────────────────────
  {
    icon: Icon.TYPES.SWAP,
    title: 'Connect time tracking to payroll seamlessly',
    products: ['time', 'payroll'],
    recipes: [
      { title: 'Timecard-to-payroll sync report', description: 'Verify all approved timecards were included in the latest pay run.', icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE, type: 'report', status: 'active' },
      { title: 'Overtime cost projection', description: 'Forecast overtime payroll costs based on current scheduling patterns.', icon: Icon.TYPES.COMBO_CHART_OUTLINE, type: 'report', status: 'not_enabled' },
    ],
  },

  // ── Cross-product (Spend + Payroll) ────────────────────
  {
    icon: Icon.TYPES.RECEIPT_OUTLINE,
    title: 'Unify expense and payroll reporting',
    products: ['spend', 'payroll'],
    recipes: [
      { title: 'Total compensation report', description: 'Combine salary, reimbursements, and card spend into one view per employee.', icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE, type: 'report', status: 'not_enabled' },
      { title: 'Reimbursement-to-payroll workflow', description: 'Automatically add approved expense reimbursements to the next pay run.', icon: Icon.TYPES.DATA_TRANSFER_OUTLINE, type: 'workflow', status: 'not_enabled' },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────

export function getBlocksForProducts(purchasedProducts: ProductId[]): ProblemBlock[] {
  return ALL_PROBLEM_BLOCKS.filter(block =>
    block.products.some(p => purchasedProducts.includes(p)),
  );
}

const PRODUCT_LABELS: Record<ProductId, string> = {
  time: 'Time',
  spend: 'Spend',
  payroll: 'Payroll',
  benefits: 'Benefits',
  talent: 'Talent',
  it: 'IT',
};

export function getProductLabel(id: ProductId): string {
  return PRODUCT_LABELS[id];
}

export function getPlatformOverviewHeader(purchasedProducts: ProductId[]): { title: string; subtitle: string } {
  const labels = purchasedProducts.map(p => PRODUCT_LABELS[p]);

  if (labels.length === 0) {
    return {
      title: 'Explore the Rippling platform',
      subtitle: 'Pre-built reports, workflows, and policies to get the most out of Rippling.',
    };
  }

  if (labels.length === 1) {
    return {
      title: `Strengthen your ${labels[0]} operations`,
      subtitle: `Pre-built reports, workflows, and policies tailored to ${labels[0]}.`,
    };
  }

  const last = labels.pop();
  const joined = `${labels.join(', ')} & ${last}`;
  return {
    title: `Get more from ${joined}`,
    subtitle: `Recommended reports, workflows, and policies based on your ${joined} package.`,
  };
}
