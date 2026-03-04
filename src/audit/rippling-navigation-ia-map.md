# Rippling Sidebar Navigation - Complete IA Map

> **Purpose**: Canonical audit of all sidebar navigation structures across Rippling  
> **Use Case**: Reference for refining navigation (e.g., adding accordions to group items)  
> **Last Updated**: February 2026

---

## Global Top-Level Structure

```
┌─────────────────────────────────────────┐
│  SECTION 1: Global                      │
├─────────────────────────────────────────┤
│  • Org Chart                            │
├─────────────────────────────────────────┤
│  SECTION 2: Products (User's SKUs)      │
├─────────────────────────────────────────┤
│  • Favorites                            │
│  • Time                                 │
│  • Benefits                             │
│  • Payroll                              │
│  • Finance (Spend)                      │
│  • Talent                               │
│  • IT                                   │
│  • Custom Apps                          │
├─────────────────────────────────────────┤
│  SECTION 3: Platform                    │
├─────────────────────────────────────────┤
│  • Data                                 │
│  • Tools                                │
│  • Company Settings                     │
│  • App Shop                             │
│  • Help                                 │
└─────────────────────────────────────────┘
```

---

## Product Verticals (Section 2)

### ⏱️ Time (`time_products`)

**Identifier**: `STANDALONE_APPS.TIME_PRODUCTS`  
**Config**: `app/products/hr/UnifiedTimeProducts/containers/MainPage/TimeProductsNavigation.constants.ts`

| Item | Path | Conditional |
|------|------|-------------|
| My Time | `/time-products/dashboard/my-time` | Primary |
| Overview | `/time-products/dashboard/overview` | Admin |
| Approvals | `/time-products/dashboard/approvals` | Badge support |
| **Schedules** | `/time-products/dashboard/schedules` | If scheduling enabled |
| **Timecards** | `/time-products/dashboard/timecards` | → "Timesheets" if Project Lake |
| **Attendance** | `/time-products/dashboard/attendance` | |
| **Time Off** | `/time-products/dashboard/time-off` | |
| Kiosk Management | `/time-products/dashboard/kiosk-management` | Admin |
| Policies | `/time-products/dashboard/policies` | Hidden for standalone |
| People | `/time-products/dashboard/people` | Admin + permissions |
| Settings | `/time-products/dashboard/settings` | Admin |
| Forecast & Labor | Override link | If forecasting access |

---

### 🏥 Benefits (`insurance_benefits`)

**Identifier**: `STANDALONE_APPS.BENEFITS`  
**Config**: `app/products/hr/GlobalBenefits/containers/Navigation/AdminNavBar/hooks/useInsuranceNavLinks.ts`

| Item | Path | Conditional |
|------|------|-------------|
| **Overview** | `/overview` | |
| ↳ Current Benefits | `?coverageType=Current` | |
| ↳ Upcoming Benefits | `?coverageType=Future` | |
| ↳ Past Benefits | `?coverageType=Expired` | |
| **Employees** | `/enrollments/employees` | Admin |
| ↳ Current Enrollments | | |
| ↳ Recent Updates | | |
| Deductions | `/deductions` | Test companies only |
| Enrollment Events | Dynamic | Per active event |
| EOI | `/enrollments/eoi` | If EOI tab enabled |
| Additional Materials | `/overview/materials` | |
| Change Legal Entity | `/overview/changeLegalEntity` | Multi-entity |
| **Settings** | `/settings/*` | Admin |
| ↳ Deduction Syncing | | |
| ↳ Tax Settings | | If enabled |
| ↳ Global Benefits Settings | | Non-EOR |
| ↳ Bank Account | | If allowed |
| ↳ Email Notification | | If allowed |
| ↳ New Hire Preview | | If enabled |
| ↳ Class Code Settings | | If allowed |

---

### 💰 Payroll (`finance`)

**Identifier**: `STANDALONE_APPS.PAYROLL`  
**Config**: `app/products/finance/Payroll/containers/dashboard/payrollDashboard/`

#### Admin View

| Item | Path | Conditional |
|------|------|-------------|
| Overview | `/payroll/dashboard/overview` | |
| People | `/payroll/dashboard/people` | |
| ↳ Missing Details | | Context-based |
| ↳ Payroll Ready | | Context-based |
| ↳ Signatory Status | | Context-based |
| Reimbursements | `/payroll/dashboard/paytypes` | |
| ↳ Manage Reimbursements | | |
| ↳ Recurring Reimbursements | | |
| Deductions | `/payroll/dashboard/deductions` | If `canViewDeductionTable` |
| Settings | `/payroll/dashboard/settings` | |

#### Employee View (My Pay)

| Item | Path | Conditional |
|------|------|-------------|
| Pay | `/pay` | |
| Bank Accounts | `/bankaccount` | |
| ↳ US Payroll Bank Accounts | | If both US + GP |
| ↳ Global Payroll Bank Accounts | | If both US + GP |
| Taxes | `/taxes` | |
| Settings | `/settings` | US only |
| Exemptions | `/exemptions` | US only, if enabled |
| ↳ Active Tax Exemptions | | |
| ↳ Expired Tax Exemptions | | |
| ↳ Deleted Tax Exemptions | | |
| ↳ Tax Exemption Requests | | |
| Tasks | `/tasks` | Global Payroll only |

---

### 💳 Finance / Spend (`spend`)

**Identifier**: `STANDALONE_APPS.SPEND`  
**Config**: `app/products/finance/SpendManagement/external/SpendStandalone/hooks/useGetSpendStandalonelinks.ts`

#### Core Items

| Item | Path | Conditional |
|------|------|-------------|
| **My Finances** | `/my-finances` | Employee view |
| **Tasks** | `/approvals` | Badge support |
| ↳ Expenses | | |
| ↳ Virtual Card Requests | | |
| ↳ Transactions | | |
| ↳ Card Limit Change Requests | | |
| ↳ Bill Requests | | |
| ↳ Bill Submissions | | |
| **Travel** | `/travel` | If travel enabled |
| **Cards** | `/cards` | |
| ↳ Team Cards | | Admin |
| ↳ Card Groups | | Admin |
| ↳ My Cards | | |
| **Reimbursements** | `/expenses` | |
| ↳ Team Reimbursements | | Admin |
| ↳ Batch Reimbursements | | Full admin |
| ↳ My Reimbursements | | |
| **Expense Reports** | `/expense_reports` | |
| **Bills** | `/bills` | Admin |
| **Procurement** | `/procurement` | Admin |
| **Transactions** | `/transactions` | |
| ↳ All Team Transactions | | Admin |
| ↳ Needs Review | | Admin |
| ↳ Out of Pocket | | Admin |
| ↳ Banking Transactions | | If enabled |
| **Settings** | `/settings` | Admin |

#### Additional Admin Items

| Item | Path |
|------|------|
| Overview | `/overview` |
| Vendors | `/vendors` |
| Accounting | `/accounting` |
| Policies | `/policies` |
| People | `/people` |
| Card Statements | `/statements` |

---

### ⭐ Talent (`talent`)

**Identifier**: `STANDALONE_APPS.TALENT`  
**Config**: `app/products/hr/TalentOverview/components/TalentNavBar.tsx`

| Item | Path | Conditional |
|------|------|-------------|
| Overview | `/overview` | Dynamic sub-tabs |
| ↳ ATS | | If installed |
| ↳ Performance | | If installed |
| ↳ One-on-Ones | | If installed |
| ↳ Feedback | | If installed |
| ↳ Goals | | If installed |
| Alerts | `/alerts` | |
| Tasks | `/tasks` | |

---

### 🖥️ IT (`it_management`)

**Identifier**: `STANDALONE_APPS.IT_MANAGEMENT`  
**Config**: `app/products/it/IT/routes/it.routes.tsx`

#### Main IT Nav

| Item | Path | Conditional |
|------|------|-------------|
| Get Started | `/it/get-started` | Setup |
| Overview | `/it/overview` | |
| IT People | `/it/it-people` | |
| Integrations | `/it/integrations/*` | |
| Third Party Access | `/it/third-party-access/*` | |
| Access Reviews | `/it/access-reviews-flow/:reviewId/*` | |
| Hardware | `/it/hardware` | |
| Hardware Employee | `/it/hardware/employee` | Employee view |
| RPass | `/it/rpass` | |
| Device Store | `/it/device-store` | |
| My IT | `/it/my-it` | Employee view |
| Approvals | `/it/approvals` | Badge support |
| Automations | `/it/automations` | |

#### IT Management Sub-Nav

| Item | Path | Conditional |
|------|------|-------------|
| Overview | `/it-management/overview` | |
| People | `/it-management/people` | |
| Requests | `/it-management/requests` | Badge |
| Tasks | `/it-management/tasks` | Device manager only |
| Activity Logs | `/it-management/activity-logs` | |
| Policies | `/it-management/policies` | |

---

### 👥 HR Management (`hr_management`)

**Identifier**: `STANDALONE_APPS.HR_MANAGEMENT`  
**Config**: `app/core/components/navigation/StandaloneNavigation/HRManagementStandAloneNavigation.tsx`

| Item | Path | Conditional |
|------|------|-------------|
| Backend-powered | Via `useSideNavData()` | Dynamic |
| Org Chart | `/org-chart` | If accessible |
| Employment Verifications | `/apps/employment-verifications` | |

---

### 🧩 Custom Apps (`custom_apps`)

**Identifier**: `STANDALONE_APPS.CUSTOM_APPS`  
**Config**: `app/core/actions/Navigation.ts`

| Item | Path | Conditional |
|------|------|-------------|
| Dynamic per company | Fetched from backend | Per installed app |

---

## Platform Section (Section 3)

### 📊 Data (`data`)

**Identifier**: `STANDALONE_APPS.DATA`  
**Conditional**: `isDataAppEnabled` feature flag

| Item | Path | Icon |
|------|------|------|
| Catalog | `/data/catalog` | `TABLE_COLUMN_OUTLINE` |
| Object Permissions | `/data/permissions` | `KEY` |
| Data Pipelines | `/data/pipelines` | `SWAP` |
| Transformations | `/data/transformations` | |

---

### 🔧 Tools (`tools`)

**Identifier**: `STANDALONE_APPS.TOOLS`  
**Default Route**: `/activity-log`

| Item | Path | Conditional |
|------|------|-------------|
| Activity Log | `/activity-log` | |
| Approvals | `/approvals` | |
| Developer | `/developer` | |
| Documents | `/documents/overview` | |
| Inbox | `/inbox` | |
| Notification Center | `/notification-center` | |
| Recipes | `/recipes/dashboard` | |
| Reports | `/reports` | |
| Sandbox | `/sandbox/dashboard` | If enabled |
| Workflow Studio | `/custom-workflows` | |
| Chat | | If enabled |
| Checklist | | |
| App Manager | | |
| Booking | | If enabled |

---

### ⚙️ Company Settings (`settings`)

**Identifier**: `STANDALONE_APPS.SETTINGS`

#### Company Settings (`/company-settings`)

| Item | Path |
|------|------|
| Info Collected / Flow Config | `/company-settings/info-collected` |
| Notifications | `/company-settings/notifications` |
| Billing | `/company-settings/billing` |
| Payment Methods | `/company-settings/payment-methods` |
| Audit Logs | `/company-settings/audit-logs` |
| Branding | `/company-settings/branding` |
| Security | `/company-settings/security` |
| API Access | `/company-settings/api-access` |
| Risk Verification | `/company-settings/risk-verification` |
| Data Import | `/company-settings/employee-census-resume` |

#### Organizational Data (`/company-details`)

| Item | Path |
|------|------|
| Information | `/company-details/information` |
| Work Email Domains | `/company-details/work-email-domains` |
| Teams | `/company-details/teams` |
| Levels | `/company-details/levels` |
| Entities | `/company-details/entities` |
| Titles | `/company-details/titles` |
| Departments | `/company-details/departments` |
| Work Locations | `/company-details/work-locations` |

#### Additional Settings

| Item | Path |
|------|------|
| Permissions | `/permissions/overview` |
| Saved Supergroups | `/group-manager/dashboard` |
| Custom Translations | `/custom-translations/install` |
| Flow Configuration | `/configurability` |
| Security | `/company-security` |
| API Tokens | `/api-tokens` |

---

### 🛒 App Shop

| Property | Value |
|----------|-------|
| Path | `/app-shop` |
| Icon | `APPS_OUTLINE` |
| Conditional | Always shown (unless IT trial) |

---

### ❓ Help

| Property | Value |
|----------|-------|
| Path | `/help` |
| Icon | `HELP_OUTLINE` |
| Conditional | Hidden for IT trial / self-serve without contract |

---

## Summary: All Sidebar Navs to Audit

| # | Nav Identifier | Display Name | Approx Items | Config Location |
|---|----------------|--------------|--------------|-----------------|
| 1 | `time_products` | Time | ~12 | `UnifiedTimeProducts/` |
| 2 | `insurance_benefits` | Benefits | ~15 | `GlobalBenefits/` |
| 3 | `finance` | Payroll | ~14 | `Payroll/` |
| 4 | `spend` | Finance | ~16 | `SpendManagement/` |
| 5 | `talent` | Talent | ~5 | `TalentOverview/` |
| 6 | `it_management` | IT | ~18 | `IT/` |
| 7 | `hr_management` | HR | Dynamic | Backend-powered |
| 8 | `custom_apps` | Custom Apps | Dynamic | Backend-powered |
| 9 | `data` | Data | 4 | `HubPlatform/` |
| 10 | `tools` | Tools | ~12 | `HubPlatform/` |
| 11 | `settings` | Company Settings | ~20 | `HubPlatform/` |
| 12 | Global nav | Org Chart, Favorites, App Shop, Help | 4 | `Navigation.ts` |

**Total: 12 distinct sidebar navigation contexts**

---

## Key Files Reference

### Navigation Configuration
- `app/core/actions/Navigation.ts` — Global nav structure
- `app/core/components/navigation/StandaloneNavigation/constants.ts` — Identifiers
- `app/core/components/navigation/StandaloneNavigation/index.tsx` — Base component

### Route Definitions
- `app/routes/routerV6/authenticated.routes.tsx` — Main routes
- `app/products/platform/HubPlatform/routes-v6/hubPlatform.base.routes.tsx` — Platform routes

### Data Fetching
- `app/core/components/navigation/StandaloneNavigation/useSideNavData.ts` — Backend nav data

---

## Conditional Logic Patterns

1. **Permission checks** — Admin vs employee view
2. **Feature flags** — `isDataAppEnabled`, `isProjectLakeEnabled`, etc.
3. **Installation state** — Which SKUs/products are purchased
4. **Country/region** — US vs Global Payroll features
5. **Company type** — Standalone, trial, PEO, EOR
6. **User role/privileges** — `insurance_admin`, `payroll_admin`, etc.

---

## Accordion Grouping Opportunities

Based on this audit, potential accordion groups:

### Time
- **Overview** (My Time, Overview)
- **Scheduling** (Schedules, Timecards, Attendance)
- **Requests** (Time Off, Approvals)
- **Admin** (Policies, People, Settings)

### Benefits
- **Coverage** (Overview, Current/Upcoming/Past)
- **Enrollments** (Employees, EOI, Events)
- **Settings** (All settings sub-items)

### Finance/Spend
- **My Stuff** (My Finances, My Cards, My Expenses)
- **Team Management** (Tasks, Team transactions, Approvals)
- **Operations** (Bills, Procurement, Vendors)
- **Admin** (Policies, People, Settings)

### Platform Tools
- **Workflows** (Recipes, Workflow Studio, Automations)
- **Data & Reporting** (Reports, Activity Log)
- **Communication** (Inbox, Notification Center, Chat)
- **Development** (Developer, Sandbox, App Manager)

---

*Generated from codebase analysis*
