import React from 'react';
import styled from '@emotion/styled';
import { StyledTheme, usePebbleTheme } from '@/utils/theme';
import Icon from '@rippling/pebble/Icon';
import { DiscoveryPageLayout, CapabilityItem } from '@/product-screens/shared';

// ── Layout (same skeleton as PlatformOverviewPage) ────

const PageContainer = styled(DiscoveryPageLayout)`
  gap: ${({ theme }) => (theme as StyledTheme).space600};
`;

const PageHero = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => (theme as StyledTheme).space200};
  padding-top: ${({ theme }) => (theme as StyledTheme).space400};
`;

const PageTitle = styled.h1`
  ${({ theme }) => (theme as StyledTheme).typestyleV2DisplaySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
  font-size: 28px;
  line-height: 1.2;
`;

const PageSubtitle = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodyLarge};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  line-height: 1.5;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => (theme as StyledTheme).space400};
`;

// ── Section Card ─────────────────────────────────────

const SectionCard = styled.div`
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceBright};
  border: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCorner2xl};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => (theme as StyledTheme).space400};
  padding: ${({ theme }) => (theme as StyledTheme).space500};
  padding-bottom: 0;
`;

const SectionIconWrap = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => (theme as StyledTheme).shapeCornerLg};
  background: ${({ theme }) => (theme as StyledTheme).colorSurfaceContainerLow};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const SectionInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

const SectionTitle = styled.h2`
  ${({ theme }) => (theme as StyledTheme).typestyleV2TitleSmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurface};
  margin: 0;
`;

const SectionSubtitle = styled.p`
  ${({ theme }) => (theme as StyledTheme).typestyleV2BodySmall};
  color: ${({ theme }) => (theme as StyledTheme).colorOnSurfaceVariant};
  margin: 0;
  line-height: 1.4;
`;

// ── Setting Rows ─────────────────────────────────────

const SettingsList = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => (theme as StyledTheme).space300} ${({ theme }) => (theme as StyledTheme).space500};
  padding-bottom: ${({ theme }) => (theme as StyledTheme).space500};
  gap: 2px;
  flex: 1;
`;

const SettingRow = styled.div`
  padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => (theme as StyledTheme).colorOutlineVariant};
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

// ── Data ─────────────────────────────────────────────

interface SettingItem {
  icon: string;
  label: string;
  description: string;
  page: string;
}

interface SettingsSection {
  title: string;
  subtitle: string;
  icon: string;
  items: SettingItem[];
}

const SECTIONS: SettingsSection[] = [
  {
    title: 'Company',
    subtitle: 'Manage your organization\'s core information and structure',
    icon: Icon.TYPES.OFFICE_OUTLINE,
    items: [
      { icon: Icon.TYPES.OFFICE_OUTLINE, label: 'Company Information', description: 'Legal name, EIN, address, and entity details', page: 'company-info' },
      { icon: Icon.TYPES.DEPARTMENTS_OUTLINE, label: 'Departments', description: 'Create and manage departments and teams', page: 'departments' },
      { icon: Icon.TYPES.OFFICE_OUTLINE, label: 'Work Locations', description: 'Office addresses and remote work policies', page: 'work-locations' },
      { icon: Icon.TYPES.USERS_OUTLINE, label: 'Teams & Levels', description: 'Organizational hierarchy, titles, and levels', page: 'teams-levels' },
      { icon: Icon.TYPES.EMAIL_OUTLINE, label: 'Work Email Domains', description: 'Verified email domains for your company', page: 'email-domains' },
    ],
  },
  {
    title: 'Access & Security',
    subtitle: 'Control who can access what and how your data is protected',
    icon: Icon.TYPES.LOCK_OUTLINE,
    items: [
      { icon: Icon.TYPES.KEY, label: 'Permissions', description: 'Role-based access controls and admin permissions', page: 'permissions' },
      { icon: Icon.TYPES.LOCK_OUTLINE, label: 'Security', description: 'SSO, MFA, session policies, and password requirements', page: 'security' },
      { icon: Icon.TYPES.AUDIT_OBSERVATION_OUTLINE, label: 'Audit Logs', description: 'Track admin actions and changes across your account', page: 'audit-logs' },
      { icon: Icon.TYPES.USERS_OUTLINE, label: 'Saved Supergroups', description: 'Reusable employee groups for policies and permissions', page: 'supergroups' },
    ],
  },
  {
    title: 'Configuration',
    subtitle: 'Customize how Rippling works for your company',
    icon: Icon.TYPES.SETTINGS_OUTLINE,
    items: [
      { icon: Icon.TYPES.NOTIFICATION_OUTLINE, label: 'Notifications', description: 'Email, Slack, and in-app notification preferences', page: 'notifications' },
      { icon: Icon.TYPES.PAINT_ROLLER_OUTLINE, label: 'Branding', description: 'Logo, colors, and custom branding for your portal', page: 'branding' },
      { icon: Icon.TYPES.SETTINGS_OUTLINE, label: 'Flow Configuration', description: 'Customize onboarding, offboarding, and other employee flows', page: 'flow-configuration' },
      { icon: Icon.TYPES.GLOBE_OUTLINE, label: 'Custom Translations', description: 'Translate Rippling into your team\'s preferred language', page: 'translations' },
    ],
  },
  {
    title: 'Billing & Integrations',
    subtitle: 'Manage your subscription and connected services',
    icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE,
    items: [
      { icon: Icon.TYPES.DOLLAR_CIRCLE_OUTLINE, label: 'Billing', description: 'Subscription plan, invoices, and payment history', page: 'billing' },
      { icon: Icon.TYPES.CREDIT_CARD_OUTLINE, label: 'Payment Methods', description: 'Bank accounts and cards on file', page: 'payment-methods' },
      { icon: Icon.TYPES.E_CODE_EMBED, label: 'API Access', description: 'API tokens and third-party integration credentials', page: 'api-access' },
      { icon: Icon.TYPES.UPLOAD, label: 'Data Import', description: 'Import employee data from CSV or another system', page: 'data-import' },
    ],
  },
];

// ── Component ────────────────────────────────────────

interface CompanySettingsOverviewPageProps {
  onNavigate?: (page: string) => void;
}

export const CompanySettingsOverviewPage: React.FC<CompanySettingsOverviewPageProps> = ({ onNavigate }) => {
  const { theme } = usePebbleTheme();

  return (
    <PageContainer theme={theme} size="md">
      <PageHero theme={theme}>
        <PageTitle theme={theme}>Company Settings</PageTitle>
        <PageSubtitle theme={theme}>
          Configure your organization, security, and account preferences
        </PageSubtitle>
      </PageHero>

      <CardGrid theme={theme}>
        {SECTIONS.map((section) => (
          <SectionCard key={section.title} theme={theme}>
            <SectionHeader theme={theme}>
              <SectionIconWrap theme={theme}>
                <Icon type={section.icon} size={22} color={(theme as StyledTheme).colorOnSurfaceVariant} />
              </SectionIconWrap>
              <SectionInfo>
                <SectionTitle theme={theme}>{section.title}</SectionTitle>
                <SectionSubtitle theme={theme}>{section.subtitle}</SectionSubtitle>
              </SectionInfo>
            </SectionHeader>

            <SettingsList theme={theme}>
              {section.items.map((item) => (
                <SettingRow key={item.page} theme={theme} onClick={() => onNavigate?.(item.page)}>
                  <CapabilityItem icon={item.icon} title={item.label} description={item.description} size="compact" iconVariant="bare" trailing="chevron" />
                </SettingRow>
              ))}
            </SettingsList>
          </SectionCard>
        ))}
      </CardGrid>
    </PageContainer>
  );
};
