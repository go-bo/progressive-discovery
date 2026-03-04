# Navigation

The navigation system controls what users see in the sidebar and how they move between products and platform surfaces.

## Nav States

| State | Description |
|-------|-------------|
| **Product Sidebar** | Product-specific navigation for the active product (e.g., Time sidebar with schedule, timesheet, approvals) |
| **Global Home** | Top-level view organized by product verticals, showing all available products and platform surfaces |
| **Collapsed** | Minimal rail showing icons only, maximizing content area |

## Lifecycle Behavior

Navigation adapts based on the user's lifecycle phase:

- **Trial** -- Sidebar shows the trial product only. Global home highlights the trial product and teases others.
- **Post-Trial** -- Sidebar expands to include purchased products. Global home promotes cross-sell opportunities.
- **Onboarded** -- Full navigation. Discovery surfaces reduce as the user has explored the platform.

<!-- TODO: Detail the specific nav items shown/hidden per phase -->

## Presets

Navigation presets define the sidebar content for each product context:

- **Time** -- Schedule, Timesheet, Approvals, Reports
- **Spend** -- Cards, Expenses, Bills, Reimbursements
- **Home** -- Global home with product verticals and platform surfaces
- **Platform** -- Workflows, Reports, Org Chart, App Directory, Settings

<!-- TODO: Define preset configurations -->
