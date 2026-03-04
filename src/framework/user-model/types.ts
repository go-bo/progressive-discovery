export type LifecyclePhase = 'trial' | 'post-trial' | 'onboarded';

export type UserRole = 'employee' | 'hr-admin';

export type ProductId = 'time' | 'spend' | 'payroll' | 'benefits' | 'talent' | 'it';

export interface UserState {
  lifecyclePhase: LifecyclePhase;
  userRole: UserRole;
  activeProduct: ProductId | 'home';
  purchasedProducts: ProductId[];
}

export const DEFAULT_USER_STATE: UserState = {
  lifecyclePhase: 'post-trial',
  userRole: 'hr-admin',
  activeProduct: 'home',
  purchasedProducts: ['time'],
};
