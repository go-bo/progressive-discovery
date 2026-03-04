/**
 * Shared types for App Shell components
 */

export interface SubmenuItemData {
  id: string;
  label: string;
  icon?: string;
  onClick?: () => void;
}

export interface SubmenuGroupData {
  label?: string;
  items: SubmenuItemData[];
}

export interface NavItemData {
  id: string;
  label: string;
  icon: string;
  hasSubmenu?: boolean;
  submenuGroups?: SubmenuGroupData[];
  isActive?: boolean;
  badge?: { text: string; variant: 'primary' | 'info' | 'success' | 'warning' | 'error' };
  onClick?: () => void;
}

export interface NavSectionData {
  label?: string;
  labelOnClick?: () => void;
  items: NavItemData[];
  dividerBefore?: boolean;
}

export interface AppShellConfig {
  companyName?: string;
  userInitial?: string;
  showAdminMode?: boolean;
  searchPlaceholder?: string;
  logoClickHandler?: () => void;
}

/**
 * Lifecycle phases for Progressive Platform Discovery
 *
 * - trial:      Baseline — main product nav + platform. No recommended section.
 *               Getting Started module shown on overview page.
 * - post-trial: Recommended section appears (Payroll "Featured", Recipe Templates).
 *               Upgrade badges visible. Getting Started removed.
 * - onboarded:  Recommended section & badges removed. Fully settled state.
 */
export type LifecyclePhase = 'trial' | 'post-trial' | 'onboarded';

