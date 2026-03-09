import React from 'react';
import { FeatureCardGrid } from '@/spec';
import type { FeatureCardGridItem } from '@/spec';

export interface DiscoverySlotUnlockProps {
  category: string;
  categorySubtitle?: string;
  items: FeatureCardGridItem[];
  iconVariant?: 'neutral' | 'accent';
}

export const DiscoverySlotUnlock: React.FC<DiscoverySlotUnlockProps> = ({
  category,
  categorySubtitle,
  items,
  iconVariant = 'accent',
}) => {
  return (
    <FeatureCardGrid
      category={category}
      categorySubtitle={categorySubtitle}
      iconVariant={iconVariant}
      items={items}
    />
  );
};
