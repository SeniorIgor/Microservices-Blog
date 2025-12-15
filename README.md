# Microservices Blog (Nx Monorepo)

An **event-driven blog** built as an **Nx + npm workspaces** monorepo.

- **Frontend:** React + Vite (`apps/client`)
- **Backend:** TypeScript + Express microservices (`apps/*`)
- **Communication:** Event Bus (fan-out)
- **Shared code:** `@org/shared`
- **Tooling:** Nx, ESLint, Prettier, Husky, commitlint
- **Containers:** Docker, Skaffold, Kubernetes, Nginx

---

## Architecture overview

This project demonstrates a classic microservices architecture using an event-driven approach.

**Services:**

- `posts` – creates posts
- `comments` – creates comments
- `moderation` – validates comments
- `query` – maintains an aggregated read model
- `event-bus` – distributes events
- `client` – React UI

**Flow:**

1. Post created → `PostCreated`
2. Comment added → `CommentCreated`
3. Moderation validates → `CommentModerated`
4. Comment updated → `CommentUpdated`
5. Query service builds read model for UI

---

## Repository structure

```
.
├── apps/
│   ├── client/
│   ├── posts/
│   ├── comments/
│   ├── moderation/
│   ├── query/
│   └── event-bus/
│
├── packages/
│   └── shared/
│
├── infra/
│   └── k8s/
│
├── Dockerfile.base
├── skaffold.yaml
├── nx.json
├── tsconfig.base.json
└── package.json
```

---

## Tech stack

- Node.js **24**
- TypeScript
- Express
- React 18 + Vite
- Nx 22 + npm workspaces
- tsup
- Docker, Kubernetes, Skaffold
- Nginx (production client)

---

## Requirements

```
Node: 24.11.1
npm: 11.6.2
```

---

## Environment variables (IMPORTANT)

This project relies on **explicit `.env.local` files** for local development.

### Root `.env.local` (backend services)

Create this file at the **repo root**:

```bash
.env.local
```

Example:

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

These values are consumed by `@org/shared` to:

- build service-to-service URLs
- configure Express listen ports

> ℹ️ Ports are required for **local (non-k8s) development only**.

---

### Client `.env.local`

Create this file at:

```bash
apps/client/.env.local
```

Example:

```bash
VITE_POSTS_URL=http://localhost:4000
VITE_COMMENTS_URL=http://localhost:4001
VITE_QUERY_URL=http://localhost:4002
```

These variables are:

- injected at **build time** by Vite
- required for both `vite dev` and `vite preview`

---

## Local development (no Kubernetes)

### Install dependencies

```
npm ci
```

### Run all services in dev mode

```
npm run dev
```

### Build and run (production-like)

```
npm run build
npm run start
```

---

## Nx usage

```
npx nx graph
npx nx run posts:dev
npx nx run client:dev
```

---

## Kubernetes + Skaffold

### Prerequisites

- Docker Desktop / Minikube
- kubectl
- skaffold
- NGINX Ingress Controller
- `/etc/hosts` → `posts.com`

### Build base image

```
docker build -f Dockerfile.base -t seniorigortyapkin/blog-base .
```

### Start dev loop

```
skaffold dev
```

### Access

- UI: http://posts.com
- APIs routed via Ingress

---

## Shared library (`@org/shared`)

Exports:

- Event types
- Service URLs and ports
- Helpers for sending events

---

## Notes

- Client is served by Nginx in Kubernetes
- Backend services listen on port 80 in cluster
- NodePort service exists for debugging only

---

## License

MIT
