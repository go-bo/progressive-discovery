import Icon from '@rippling/pebble/Icon';

export interface DiscoverProduct {
  id: string;
  icon: string;
  productName: string;
  title: string;
  description: string;
}

export const DISCOVER_PRODUCTS: DiscoverProduct[] = [
  {
    id: 'employee-records',
    icon: Icon.TYPES.FILE_FILLED,
    productName: 'HRIS',
    title: 'Store employee records',
    description: 'Keep I-9s, tax forms, and signed contracts in one place',
  },
  {
    id: 'benefits',
    icon: Icon.TYPES.HEART_FILLED,
    productName: 'Benefits',
    title: 'Offer health benefits',
    description: 'Health, dental, vision, and more for your team',
  },
  {
    id: 'spend',
    icon: Icon.TYPES.CREDIT_CARD_FILLED,
    productName: 'Spend',
    title: 'Issue corporate cards',
    description: 'Control company spending with smart corporate cards',
  },
  {
    id: 'it',
    icon: Icon.TYPES.REASSIGN_COMPUTER_FILLED,
    productName: 'IT Cloud',
    title: 'Manage devices & apps',
    description: 'Provision laptops, manage software, and secure endpoints',
  },
];
