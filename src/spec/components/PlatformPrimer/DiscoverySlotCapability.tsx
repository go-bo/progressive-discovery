import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Separator } from '@rippling/pebble/Atoms';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import { FeatureCard, FeatureCardDetailModal } from '@/spec';
import type { FeatureCardDetailConfig } from '@/spec';

export interface DiscoverySlotCapabilityProps {
  separatorLabel: string;
  features: FeatureCardDetailConfig[];
  onCta?: () => void;
}

const CapabilityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  width: 100%;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const DiscoverySlotCapability: React.FC<DiscoverySlotCapabilityProps> = ({
  separatorLabel,
  features,
  onCta,
}) => {
  const { theme } = usePebbleTheme();
  const [selectedFeature, setSelectedFeature] = useState<FeatureCardDetailConfig | null>(null);

  return (
    <>
      <div style={{ width: '100%', alignSelf: 'stretch' }}>
        <Separator>{separatorLabel}</Separator>
      </div>

      <CapabilityGrid theme={theme}>
        {features.map((feat, idx) => (
          <FeatureCard
            key={idx}
            icon={feat.icon}
            title={feat.title}
            description={feat.description}
            size="compact"
            iconVariant="neutral"
            onClick={() => setSelectedFeature(feat)}
          />
        ))}
      </CapabilityGrid>

      <FeatureCardDetailModal
        isVisible={!!selectedFeature}
        feature={selectedFeature}
        onCancel={() => setSelectedFeature(null)}
        onCtaClick={() => {
          onCta?.();
          setSelectedFeature(null);
        }}
      />
    </>
  );
};
