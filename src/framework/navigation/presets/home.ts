import Icon from '@rippling/pebble/Icon';
import type { NavSectionData } from '../types';

interface HomeNavParams {
  isActive: (page: string) => boolean;
  onNavigate: (page: string) => void;
}

/**
 * Global home state navigation.
 * Product verticals shown with chevrons for hover/expand behavior.
 * Placeholder -- to be built out with actual product vertical nav.
 */
export function getHomeMainSections({ isActive, onNavigate }: HomeNavParams): NavSectionData[] {
  const favoritesSection: NavSectionData = {
    items: [
      { id: 'home', label: 'Home', icon: Icon.TYPES.HOME_OUTLINE, isActive: isActive('home'), onClick: () => onNavigate('home') },
    ],
  };

  const productsSection: NavSectionData = {
    label: 'Products',
    items: [
      { id: 'time', label: 'Time', icon: Icon.TYPES.CLOCK_OUTLINE, hasSubmenu: true, onClick: () => onNavigate('time') },
      { id: 'spend', label: 'Spend', icon: Icon.TYPES.CREDIT_CARD_OUTLINE, hasSubmenu: true, onClick: () => onNavigate('spend') },
      { id: 'payroll', label: 'Payroll', icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, hasSubmenu: true, onClick: () => onNavigate('payroll') },
      { id: 'benefits', label: 'Benefits', icon: Icon.TYPES.HEART_OUTLINE, hasSubmenu: true, onClick: () => onNavigate('benefits') },
      { id: 'talent', label: 'Talent', icon: Icon.TYPES.CHART_VERTICAL_OUTLINE, hasSubmenu: true, onClick: () => onNavigate('talent') },
      { id: 'it', label: 'IT', icon: Icon.TYPES.DESKTOP_OUTLINE, hasSubmenu: true, onClick: () => onNavigate('it') },
    ],
  };

  return [favoritesSection, productsSection];
}
