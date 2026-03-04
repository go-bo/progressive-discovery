/**
 * App Shell Components
 * 
 * Reusable components for building Rippling-style app shell layouts.
 * 
 * @example
 * ```tsx
 * import { AppShellLayout } from '@/framework/shell';
 * 
 * <AppShellLayout
 *   pageTitle="My App"
 *   pageTabs={['Tab 1', 'Tab 2']}
 *   mainNavSections={navSections}
 * >
 *   {children}
 * </AppShellLayout>
 * ```
 */

export { AppShellLayout } from './AppShellLayout';
export { TopNavBar } from './TopNavBar';
export { SearchBar } from './SearchBar';
export { ProfileDropdown } from './ProfileDropdown';
export { ExpansionPanel } from './ExpansionPanel';
export type { ExpansionPanelType } from './ExpansionPanel';

// Navigation components re-exported from @/framework/navigation
export { Sidebar, NavSection, NavItem } from '@/framework/navigation';
export * from '@/framework/navigation/types';
