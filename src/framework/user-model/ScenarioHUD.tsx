import React, { useState, useEffect, useCallback } from 'react';
import styled from '@emotion/styled';
import { useNavigate, useLocation } from 'react-router-dom';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import { useUserState } from './UserContext';
import type { LifecyclePhase, UserRole, ProductId } from './types';

const HUD_WIDTH = 320;

const HUDContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: ${HUD_WIDTH}px;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  z-index: 9999;
  overflow: hidden;
  transition: all 200ms ease;
  transform: ${({ isOpen }) => isOpen ? 'translateY(0)' : 'translateY(calc(100% - 40px))'};
`;

const HUDHeader = styled.button`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 16px;
  background: #000;
  border: none;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.3px;
`;

const HUDBody = styled.div`
  padding: 14px 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const HUDSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const HUDLabel = styled.div`
  font-size: 10px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.45);
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

const OptionRow = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;

const OptionChip = styled.button<{ isSelected: boolean }>`
  font-size: 12px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 999px;
  border: 1px solid ${({ isSelected }) =>
    isSelected ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.15)'};
  background: ${({ isSelected }) =>
    isSelected ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
  color: ${({ isSelected }) =>
    isSelected ? '#fff' : 'rgba(255, 255, 255, 0.6)'};
  cursor: pointer;
  transition: all 120ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #fff;
  }
`;

const HUDFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
`;

const FooterLink = styled.button`
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.4);
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px 0;
  transition: color 120ms ease;

  &:hover {
    color: rgba(255, 255, 255, 0.7);
  }
`;

const LIFECYCLE_OPTIONS: { value: LifecyclePhase; label: string }[] = [
  { value: 'trial', label: 'Trial' },
  { value: 'post-trial', label: 'Post-Trial' },
  { value: 'onboarded', label: 'Onboarded' },
];

const ROLE_OPTIONS: { value: UserRole; label: string }[] = [
  { value: 'hr-admin', label: 'HR Admin' },
  { value: 'employee', label: 'Employee' },
];

const PRODUCT_OPTIONS: { value: ProductId; label: string }[] = [
  { value: 'time', label: 'Time' },
  { value: 'spend', label: 'Spend' },
  { value: 'payroll', label: 'Payroll' },
  { value: 'benefits', label: 'Benefits' },
  { value: 'talent', label: 'Talent' },
  { value: 'it', label: 'IT' },
];

const PRODUCT_VIEW_OPTIONS: { value: ProductId | 'home'; label: string; route: string }[] = [
  { value: 'home', label: 'Home', route: '/' },
  { value: 'time', label: 'Time', route: '/time' },
  { value: 'spend', label: 'Spend', route: '/spend' },
];

function useCurrentProductView(): ProductId | 'home' | null {
  const { pathname } = useLocation();
  const match = PRODUCT_VIEW_OPTIONS.find(opt => opt.route === pathname);
  return match?.value ?? null;
}

const HIDE_DURATION_MS = 60_000;

export const ScenarioHUD: React.FC = () => {
  const { theme } = usePebbleTheme();
  const navigate = useNavigate();
  const currentView = useCurrentProductView();
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const {
    lifecyclePhase,
    userRole,
    purchasedProducts,
    setLifecyclePhase,
    setUserRole,
    setActiveProduct,
    togglePurchasedProduct,
    resetToDefaults,
  } = useUserState();

  const handleProductViewChange = (value: ProductId | 'home', route: string) => {
    setActiveProduct(value);
    navigate(route);
  };

  const handleHide = useCallback(() => {
    setIsHidden(true);
    setIsOpen(false);
  }, []);

  useEffect(() => {
    if (!isHidden) return;
    const timer = setTimeout(() => setIsHidden(false), HIDE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [isHidden]);

  if (isHidden) return null;

  return (
    <HUDContainer isOpen={isOpen}>
      <HUDHeader onClick={() => setIsOpen(!isOpen)}>
        <span>Scenario Controls</span>
        <Icon
          type={isOpen ? Icon.TYPES.CHEVRON_DOWN : Icon.TYPES.CHEVRON_UP}
          size={14}
          color="#fff"
        />
      </HUDHeader>
      <HUDBody>
        <HUDSection>
          <HUDLabel>Lifecycle Phase</HUDLabel>
          <OptionRow>
            {LIFECYCLE_OPTIONS.map(opt => (
              <OptionChip
                key={opt.value}
                isSelected={lifecyclePhase === opt.value}
                onClick={() => setLifecyclePhase(opt.value)}
              >
                {opt.label}
              </OptionChip>
            ))}
          </OptionRow>
        </HUDSection>

        <HUDSection>
          <HUDLabel>User Role</HUDLabel>
          <OptionRow>
            {ROLE_OPTIONS.map(opt => (
              <OptionChip
                key={opt.value}
                isSelected={userRole === opt.value}
                onClick={() => setUserRole(opt.value)}
              >
                {opt.label}
              </OptionChip>
            ))}
          </OptionRow>
        </HUDSection>

        <HUDSection>
          <HUDLabel>Product View</HUDLabel>
          <OptionRow>
            {PRODUCT_VIEW_OPTIONS.map(opt => (
              <OptionChip
                key={opt.value}
                isSelected={currentView === opt.value}
                onClick={() => handleProductViewChange(opt.value, opt.route)}
              >
                {opt.label}
              </OptionChip>
            ))}
          </OptionRow>
        </HUDSection>

        <HUDSection>
          <HUDLabel>Purchased Products</HUDLabel>
          <OptionRow>
            {PRODUCT_OPTIONS.map(opt => (
              <OptionChip
                key={opt.value}
                isSelected={purchasedProducts.includes(opt.value)}
                onClick={() => togglePurchasedProduct(opt.value)}
              >
                {opt.label}
              </OptionChip>
            ))}
          </OptionRow>
        </HUDSection>

        <HUDFooter>
          <FooterLink onClick={resetToDefaults}>Reset defaults</FooterLink>
          <FooterLink onClick={handleHide}>Hide for 1 min</FooterLink>
        </HUDFooter>
      </HUDBody>
    </HUDContainer>
  );
};

export default ScenarioHUD;
