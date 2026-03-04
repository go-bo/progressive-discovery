# Framework

The progressive discovery framework provides the reusable building blocks that power all product experiences across lifecycle phases.

## Architecture

| Layer | Role |
|-------|------|
| **Shell** | Page layout with defined zones (top bar, sidebar, content, expansion panel) |
| **Navigation** | Sidebar states and global home that adapt to lifecycle phase |
| **Treatments** | Page-level templates for specific discovery moments |
| **Patterns** | Shared UI components used across treatments and screens |
| **User Model** | Lifecycle phase, role, and product state that the framework responds to |

## How It Works

The framework provides reusable pieces. Scenarios assemble them.

A scenario picks a lifecycle phase and product context from the user model, renders the shell with the appropriate navigation state, and fills the content area with treatments and product screens. The framework doesn't own any specific product flow -- it provides the vocabulary that product flows are written in.

<!-- TODO: Add diagram showing framework assembly flow -->
