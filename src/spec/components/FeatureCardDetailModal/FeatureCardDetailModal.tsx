import React from 'react';
import styled from '@emotion/styled';
import Modal from '@rippling/pebble/Modal';
import Button from '@rippling/pebble/Button';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';

// ── Types ───────────────────────────────────────────────

export interface FeatureCardDetailConfig {
  icon: string;
  title: string;
  description: string;
  modalDescription?: string;
  benefits: string[];
  ctaLabel: string;
}

export interface FeatureCardDetailModalProps {
  isVisible: boolean;
  feature: FeatureCardDetailConfig | null;
  onCancel: () => void;
  onCtaClick: () => void;
}

// ── Styled ──────────────────────────────────────────────

const ModalBody = styled.div`
  padding: ${({ theme }) => (theme as StyledTheme).space400};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space500};
`;

const VisualPlaceholder = styled.div`
  width: 100%;
  height: 140px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
`;

const Description = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyMedium};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
  line-height: 1.5;
`;

const BenefitsList = styled.ul`
  margin: 0;
  padding-left: ${({ theme }) => (theme as StyledTheme).space500};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
`;

const BenefitItem = styled.li`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  line-height: 1.4;
`;

// ── Component ───────────────────────────────────────────

export const FeatureCardDetailModal: React.FC<FeatureCardDetailModalProps> = ({
  isVisible,
  feature,
  onCancel,
  onCtaClick,
}) => {
  const { theme } = usePebbleTheme();

  if (!feature) return null;

  return (
    <Modal
      isVisible={isVisible}
      onCancel={onCancel}
      title={feature.title}
      aria-modal="true"
    >
      <ModalBody theme={theme}>
        <VisualPlaceholder theme={theme}>Screenshot or illustration for {feature.title}</VisualPlaceholder>
        <Description theme={theme}>{feature.modalDescription ?? feature.description}</Description>
        {feature.benefits.length > 0 && (
          <BenefitsList theme={theme}>
            {feature.benefits.map((benefit, idx) => (
              <BenefitItem key={idx} theme={theme}>{benefit}</BenefitItem>
            ))}
          </BenefitsList>
        )}
      </ModalBody>
      <Modal.Footer>
        <Button
          appearance={Button.APPEARANCES.OUTLINE}
          onClick={onCancel}
          size={Button.SIZES.M}
        >
          Close
        </Button>
        <Button
          appearance={Button.APPEARANCES.PRIMARY}
          onClick={onCtaClick}
          size={Button.SIZES.M}
        >
          {feature.ctaLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FeatureCardDetailModal;
