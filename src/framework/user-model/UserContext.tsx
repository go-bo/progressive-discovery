import React, { createContext, useContext, useState, useCallback } from 'react';
import type { UserState, LifecyclePhase, UserRole, ProductId, DiscoverySlotVariant } from './types';
import { DEFAULT_USER_STATE } from './types';

interface UserContextValue extends UserState {
  setLifecyclePhase: (phase: LifecyclePhase) => void;
  setUserRole: (role: UserRole) => void;
  setActiveProduct: (product: ProductId | 'home' | 'platform-primer') => void;
  togglePurchasedProduct: (product: ProductId) => void;
  setDiscoverySlotVariant: (variant: DiscoverySlotVariant | null) => void;
  resetToDefaults: () => void;
}

const UserContext = createContext<UserContextValue | null>(null);

export function UserProvider({ children, initialState }: { children: React.ReactNode; initialState?: Partial<UserState> }) {
  const [state, setState] = useState<UserState>({
    ...DEFAULT_USER_STATE,
    ...initialState,
  });

  const setLifecyclePhase = useCallback((phase: LifecyclePhase) => {
    setState(prev => ({ ...prev, lifecyclePhase: phase }));
  }, []);

  const setUserRole = useCallback((role: UserRole) => {
    setState(prev => ({ ...prev, userRole: role }));
  }, []);

  const setActiveProduct = useCallback((product: ProductId | 'home' | 'platform-primer') => {
    setState(prev => ({ ...prev, activeProduct: product }));
  }, []);

  const togglePurchasedProduct = useCallback((product: ProductId) => {
    setState(prev => ({
      ...prev,
      purchasedProducts: prev.purchasedProducts.includes(product)
        ? prev.purchasedProducts.filter(p => p !== product)
        : [...prev.purchasedProducts, product],
    }));
  }, []);

  const setDiscoverySlotVariant = useCallback((discoverySlotVariant: DiscoverySlotVariant | null) => {
    setState(prev => ({ ...prev, discoverySlotVariant }));
  }, []);

  const resetToDefaults = useCallback(() => {
    setState({ ...DEFAULT_USER_STATE, ...initialState });
  }, [initialState]);

  return (
    <UserContext.Provider value={{
      ...state,
      setLifecyclePhase,
      setUserRole,
      setActiveProduct,
      togglePurchasedProduct,
      setDiscoverySlotVariant,
      resetToDefaults,
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserState() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserState must be used within a UserProvider');
  }
  return context;
}

export { UserContext };
