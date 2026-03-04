# Progressive Discovery Framework

## Overview

A framework for helping self-serve trial users discover product value, bundling opportunities, and platform capabilities. It defines reusable UI structures, navigation patterns, and lifecycle-aware treatments that guide users from first trial through full platform adoption.

## The Three Lifecycle Phases

- **Trial** -- User is evaluating a single product. The experience focuses on activation and demonstrating core value.
- **Post-Trial** -- User has converted on one product. The experience shifts to cross-sell and platform awareness.
- **Onboarded** -- User has adopted the platform. Discovery surfaces reduce and the product experience takes over.

## Framework Components

| Component | Purpose |
|-----------|---------|
| **Shell** | Layout zones: top bar, sidebar, content area, expansion panel |
| **Navigation** | Lifecycle-aware sidebar and global home states |
| **Treatments** | Reusable page templates for discovery moments |
| **Patterns** | Shared UI components (cards, CTAs, discovery surfaces) |
| **User Model** | Lifecycle phase, role, and product state that drives the experience |

## Quick Start

```bash
yarn install
yarn dev
```

Dev server runs at `http://localhost:4201`.

## Repo Structure

```
src/
  framework/        Core framework pieces (shell, nav, treatments, patterns, user model)
  product-screens/  Product-specific content screens (time, spend, platform)
  scenarios/        Assembled demos composing framework + product screens
  explorations/     Self-contained future vision prototypes
  archive/          Preserved legacy demos
```
