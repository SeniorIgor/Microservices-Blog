# Microservices Blog -- Nx Monorepo (TypeScript • Express • React)

This repository is a small blog microservices system implemented as an
**Nx + npm workspaces** monorepo. It contains multiple Express services,
a React + Vite frontend, and a shared TypeScript library used across all
services.

---

## 🧱 Tech Stack

- Node.js / TypeScript
- Express for backend services
- React + Vite for the frontend (`apps/client`)
- Nx for running tasks across the monorepo
- npm workspaces for dependency & package management
- ESLint + Prettier for code style and linting
- Husky + commitlint for git hooks and commit message checks

---

## 📁 Monorepo Structure

The repository uses `apps/*` for runnable applications and `packages/*`
for shared libraries.

    .
    ├── apps/
    │   ├── client/        # React + Vite frontend (@org/client)
    │   ├── posts/         # Posts service (Express + TS) (@org/posts)
    │   ├── comments/      # Comments service (Express + TS) (@org/comments)
    │   ├── query/         # Query service for aggregated read model (@org/query)
    │   ├── event-bus/     # Event Bus for cross-service communication (@org/event-bus)
    │   └── moderation/    # Moderation service (@org/moderation)
    │
    ├── packages/
    │   └── shared/        # Shared types, constants, and utils (@org/shared)
    │       ├── src/constants/   # SERVICE_PORTS, ROUTES, SERVICE_URLS, etc.
    │       ├── src/types/       # Post, Comment, EventItem, Query types…
    │       └── src/utils/       # sendAnEvent, setTimeout helper, etc.
    │
    ├── nx.json             # Nx workspace config
    ├── tsconfig.base.json  # Root TS config + path aliases
    ├── package.json        # Root scripts and workspaces
    └── .eslintrc.cjs       # Shared ESLint config

---

## ⚙️ Requirements

The root `package.json` currently specifies:

```json
"engines": {
  "node": "24.11.1",
  "npm": "11.6.2"
}
```

Use these versions or adjust according to your system.

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

Installs dependencies for all workspaces.

---

## 🧩 Shared Library: @org/shared

Imported as:

```ts
import { SERVICE_PORTS, SERVICE_URLS, sendAnEvent, type EventItem } from '@org/shared';
```

### Provides:

#### Ports (env-overridable)

    SERVICE_PORTS.posts       // 4000 → POSTS_PORT
    SERVICE_PORTS.comments    // 4001 → COMMENTS_PORT
    SERVICE_PORTS.query       // 4002 → QUERY_PORT
    SERVICE_PORTS.moderation  // 4003 → MODERATION_PORT
    SERVICE_PORTS.eventBus    // 4005 → EVENT_BUS_PORT

#### Base URLs & routes

    SERVICE_URLS.posts.list()
    SERVICE_URLS.eventBus.create()

#### Types

- Post
- Comment
- EventItem

#### Utils

- sendAnEvent(event)

> ℹ️ `@org/shared` is a **library**, not a runnable service.

---

## 🧪 Root Scripts

### Build

```bash
npm run build
npm run build:affected
```

### Development

```bash
npm run dev:all
```

### Lint

```bash
npm run lint
npm run lint:fix
npm run lint:affected
npm run lint:fix:affected
```

### Type Check

```bash
npm run type-check
npm run type-check:affected
```

Husky hooks use `:affected` versions.

---

## 🧷 Running Individual Apps

### Using Nx

```bash
npx nx run client:dev
npx nx run posts:dev
npx nx run comments:dev
npx nx run query:dev
npx nx run event-bus:dev
npx nx run moderation:dev
```

### Using npm workspaces

```bash
npm run dev --workspace @org/client
npm run dev --workspace @org/posts
npm run dev --workspace @org/comments
npm run dev --workspace @org/query
npm run dev --workspace @org/event-bus
npm run dev --workspace @org/moderation
```

---

## 🌐 Ports & Environment Variables

Default ports: - Posts: 4000 - Comments: 4001 - Query: 4002 -
Moderation: 4003 - Event Bus: 4005

Override for .env.local:

```bash
POSTS_URL=http://localhost:4000
COMMENTS_URL=http://localhost:4001
QUERY_URL=http://localhost:4002
MODERATION_URL=http://localhost:4003
EVENT_BUS_URL=http://localhost:4005

POSTS_PORT=4000
COMMENTS_PORT=4001
QUERY_PORT=4002
MODERATION_PORT=4003
EVENT_BUS_PORT=4005
```

Override for /apps/client/.env.local:

```bash
VITE_POSTS_URL=http://localhost:4000
VITE_COMMENTS_URL=http://localhost:4001
VITE_QUERY_URL=http://localhost:4002
```

---

## 🧹 Linting, Type Checking & Formatting

Global configuration: - `.eslintrc.cjs` - `tsconfig.base.json`

Run manually:

```bash
npm run lint
npm run type-check
```

Husky Hooks: - `pre-commit`: type-check + lint affected - `commit-msg`:
commitlint

---

## 🗺️ Nx Workspace Tools

Dependency graph:

```bash
npx nx graph
```

List projects:

```bash
npx nx list --projects
```

---

## ✅ Summary

- Nx + npm workspaces monorepo
- Multiple Express microservices
- React + Vite frontend
- `@org/shared` for cross-service types/constants/utils
- Centralized build, dev, lint, and type-check commands
- Husky + commitlint included for clean commits
