import Icon from '@rippling/pebble/Icon';

export interface PlatformPageConfig {
  id: string;
  title: string;
  icon: string;
}

export const PLATFORM_PAGES: Record<string, PlatformPageConfig> = {
  // Data
  'reports': { id: 'reports', title: 'Reports', icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE },
  'data-catalog': { id: 'data-catalog', title: 'Catalog', icon: Icon.TYPES.TABLE_COLUMN_OUTLINE },
  'data-permissions': { id: 'data-permissions', title: 'Object Permissions', icon: Icon.TYPES.KEY },
  'data-pipelines': { id: 'data-pipelines', title: 'Data Pipelines', icon: Icon.TYPES.SWAP },
  'data-transformations': { id: 'data-transformations', title: 'Transformations', icon: Icon.TYPES.REFRESH_OUTLINE },
  // Tools
  'app-studio': { id: 'app-studio', title: 'App Studio', icon: Icon.TYPES.CUSTOM_APPS_OUTLINE },
  'approvals': { id: 'approvals', title: 'Approvals', icon: Icon.TYPES.CHECKBOX_WITHCHECK_OUTLINE },
  'chat': { id: 'chat', title: 'Chat', icon: Icon.TYPES.MESSAGE_OUTLINE },
  'developer': { id: 'developer', title: 'Developer', icon: Icon.TYPES.E_CODE_EMBED },
  'documents': { id: 'documents', title: 'Documents', icon: Icon.TYPES.FILE_OUTLINE },
  'inbox': { id: 'inbox', title: 'Inbox', icon: Icon.TYPES.INBOX_OUTLINE },
  'notification-center': { id: 'notification-center', title: 'Notification Center', icon: Icon.TYPES.NOTIFICATION_OUTLINE },
  'recipes': { id: 'recipes', title: 'Recipes', icon: Icon.TYPES.RECIPES_OUTLINE },
  'workflow-studio': { id: 'workflow-studio', title: 'Workflow Studio', icon: Icon.TYPES.THUNDERBOLT_OUTLINE },
  'sandbox': { id: 'sandbox', title: 'Sandbox', icon: Icon.TYPES.SANDBOX_OUTLINE },
  'activity-log': { id: 'activity-log', title: 'Activity Log', icon: Icon.TYPES.AUDIT_OBSERVATION_OUTLINE },
  // Company Settings
  'billing': { id: 'billing', title: 'Billing', icon: Icon.TYPES.CREDIT_CARD_OUTLINE },
  'branding': { id: 'branding', title: 'Branding', icon: Icon.TYPES.PAINT_ROLLER_OUTLINE },
  'company-info': { id: 'company-info', title: 'Company Information', icon: Icon.TYPES.OFFICE_OUTLINE },
  'departments': { id: 'departments', title: 'Departments', icon: Icon.TYPES.DEPARTMENTS_OUTLINE },
  'flow-configuration': { id: 'flow-configuration', title: 'Flow Configuration', icon: Icon.TYPES.FILTER },
  'notifications': { id: 'notifications', title: 'Notifications', icon: Icon.TYPES.NOTIFICATION_OUTLINE },
  'organizational-data': { id: 'organizational-data', title: 'Organizational Data', icon: Icon.TYPES.TABLE_COLUMN_OUTLINE },
  'permissions': { id: 'permissions', title: 'Permissions', icon: Icon.TYPES.KEY },
  'saved-supergroups': { id: 'saved-supergroups', title: 'Saved Supergroups', icon: Icon.TYPES.USER_GROUP_CHECKED_OUTLINE },
  'security': { id: 'security', title: 'Security', icon: Icon.TYPES.LOCK_OUTLINE },
  'teams': { id: 'teams', title: 'Teams', icon: Icon.TYPES.USERS_OUTLINE },
  'work-locations': { id: 'work-locations', title: 'Work Locations', icon: Icon.TYPES.LOCATION_OUTLINE },
};

export function isPlatformPage(pageId: string): boolean {
  return pageId in PLATFORM_PAGES;
}
