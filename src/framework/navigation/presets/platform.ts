import Icon from '@rippling/pebble/Icon';
import type { NavSectionData, SubmenuGroupData } from '../types';

// Map: section id -> page ids that belong to it (overview + children). Used to set parent nav active when on a child page.
const PLATFORM_SECTION_PAGES: Record<string, string[]> = {
  'data': ['data-overview', 'reports', 'data-catalog', 'data-permissions', 'data-pipelines', 'data-transformations'],
  'tools': ['tools-overview', 'app-studio', 'approvals', 'chat', 'developer', 'documents', 'inbox', 'notification-center', 'recipes', 'workflow-studio'],
  'company-settings': ['company-settings-overview', 'flow-configuration', 'organizational-data', 'permissions', 'saved-supergroups', 'security', 'billing', 'branding', 'company-info', 'departments', 'notifications', 'teams', 'work-locations'],
};

export function isPlatformSectionActive(sectionId: string, activePage: string): boolean {
  const pages = PLATFORM_SECTION_PAGES[sectionId];
  return pages ? pages.includes(activePage) : false;
}

interface PlatformNavParams {
  isActive: (page: string) => boolean;
  /** Current page - used to set parent section (Data/Tools/Company) active when on a child page */
  activePage?: string;
  onNavigate: (page: string) => void;
}

function dataSubmenuGroups(onNavigate: (page: string) => void): SubmenuGroupData[] {
  return [{
    items: [
      { id: 'reports', label: 'Reports', icon: Icon.TYPES.CHART_3_UNEVEN_VERTICAL_BARS_OUTLINE, onClick: () => onNavigate('reports') },
      { id: 'data-catalog', label: 'Catalog', icon: Icon.TYPES.TABLE_COLUMN_OUTLINE, onClick: () => onNavigate('data-catalog') },
      { id: 'data-permissions', label: 'Object Permissions', icon: Icon.TYPES.KEY, onClick: () => onNavigate('data-permissions') },
      { id: 'data-pipelines', label: 'Data Pipelines', icon: Icon.TYPES.SWAP, onClick: () => onNavigate('data-pipelines') },
      { id: 'data-transformations', label: 'Transformations', icon: Icon.TYPES.REFRESH_OUTLINE, onClick: () => onNavigate('data-transformations') },
    ],
  }];
}

function toolsSubmenuGroups(onNavigate: (page: string) => void): SubmenuGroupData[] {
  return [{
    items: [
      { id: 'app-studio', label: 'App Studio', icon: Icon.TYPES.CUSTOM_APPS_OUTLINE, onClick: () => onNavigate('app-studio') },
      { id: 'approvals', label: 'Approvals', icon: Icon.TYPES.CHECKBOX_WITHCHECK_OUTLINE, onClick: () => onNavigate('approvals') },
      { id: 'chat', label: 'Chat', icon: Icon.TYPES.MESSAGE_OUTLINE, onClick: () => onNavigate('chat') },
      { id: 'developer', label: 'Developer', icon: Icon.TYPES.E_CODE_EMBED, onClick: () => onNavigate('developer') },
      { id: 'documents', label: 'Documents', icon: Icon.TYPES.FILE_OUTLINE, onClick: () => onNavigate('documents') },
      { id: 'inbox', label: 'Inbox', icon: Icon.TYPES.INBOX_OUTLINE, onClick: () => onNavigate('inbox') },
      { id: 'notification-center', label: 'Notification Center', icon: Icon.TYPES.NOTIFICATION_OUTLINE, onClick: () => onNavigate('notification-center') },
      { id: 'recipes', label: 'Recipes', icon: Icon.TYPES.RECIPES_OUTLINE, onClick: () => onNavigate('recipes') },
      { id: 'workflow-studio', label: 'Workflow Studio', icon: Icon.TYPES.THUNDERBOLT_OUTLINE, onClick: () => onNavigate('workflow-studio') },
    ],
  }];
}

function companySettingsSubmenuGroups(onNavigate: (page: string) => void): SubmenuGroupData[] {
  return [{
    items: [
      { id: 'company-settings-overview', label: 'Company Settings', icon: Icon.TYPES.SETTINGS_OUTLINE, onClick: () => onNavigate('company-settings-overview') },
      { id: 'flow-configuration', label: 'Flow Configuration', icon: Icon.TYPES.FILTER, onClick: () => onNavigate('flow-configuration') },
      { id: 'organizational-data', label: 'Organizational Data', icon: Icon.TYPES.TABLE_COLUMN_OUTLINE, onClick: () => onNavigate('organizational-data') },
      { id: 'permissions', label: 'Permissions', icon: Icon.TYPES.KEY, onClick: () => onNavigate('permissions') },
      { id: 'saved-supergroups', label: 'Saved Supergroups', icon: Icon.TYPES.REFRESH_OUTLINE, onClick: () => onNavigate('saved-supergroups') },
      { id: 'security', label: 'Security', icon: Icon.TYPES.LOCK_OUTLINE, onClick: () => onNavigate('security') },
    ],
  }];
}

export function getPlatformSection({ isActive, activePage, onNavigate }: PlatformNavParams): NavSectionData {
  return {
    label: 'Platform',
    labelOnClick: () => onNavigate('platform-overview'),
    items: [
      {
        id: 'data',
        label: 'Data',
        icon: Icon.TYPES.CONNECT_DATABASE_OUTLINE,
        isActive: activePage ? isPlatformSectionActive('data', activePage) : isActive('data-overview'),
        hasSubmenu: true,
        submenuGroups: dataSubmenuGroups(onNavigate),
        onClick: () => onNavigate('data-overview'),
      },
      {
        id: 'tools',
        label: 'Tools',
        icon: Icon.TYPES.TOOLS_OUTLINE,
        isActive: activePage ? isPlatformSectionActive('tools', activePage) : isActive('tools-overview'),
        hasSubmenu: true,
        submenuGroups: toolsSubmenuGroups(onNavigate),
        onClick: () => onNavigate('tools-overview'),
      },
      {
        id: 'company-settings',
        label: 'Company Settings',
        icon: Icon.TYPES.COG_GLOBE_OUTLINE,
        isActive: activePage ? isPlatformSectionActive('company-settings', activePage) : isActive('company-settings-overview'),
        hasSubmenu: true,
        submenuGroups: companySettingsSubmenuGroups(onNavigate),
        onClick: () => onNavigate('company-settings-overview'),
      },
      {
        id: 'app-shop',
        label: 'App directory',
        icon: isActive('app-shop') ? Icon.TYPES.APPS_FILLED : Icon.TYPES.APPS_OUTLINE,
        isActive: isActive('app-shop'),
        onClick: () => onNavigate('app-shop'),
      },
    ],
  };
}
