# Microservices App (TypeScript • Express • React • npm Workspaces)

This monorepo contains a small microservices setup built with **TypeScript**, **Express**, **React**, and **npm workspaces**.

---

## 📦 Project Structure

```text
project/
  client/      # React + Vite frontend
  posts/       # Posts service (Express + TypeScript)
  comments/    # Comments service (Express + TypeScript)
  query/       # Query service (Express + TypeScript)
  event-bus/   # Event bus for cross-service communication
  moderation/  # Moderation service
```

---

## 🔧 Node & npm Versions

This project uses fixed versions to ensure consistent linting, formatting, and TypeScript behavior:

```
Node: 24.11.1
npm: 11.6.2
```

Use **nvm** to install and activate the correct version:

```bash
nvm install 24.11.1
nvm use 24.11.1
```

---

## 🚀 Installation

Install all dependencies for every workspace:

```bash
npm install
```

---

## 🧪 Type Checking

Run TypeScript checks for the entire project:

```bash
npm run type-check
```

---

## 🧼 Linting

Run ESLint across all services:

```bash
npm run lint
```

To auto-fix formatting issues:

```bash
npm run lint:fix
```

---

## ▶️ Development

Run each service in its own terminal:

### Posts service

```bash
cd posts
npm run dev
```

### Comments service

```bash
cd comments
npm run dev
```

### Query service

```bash
cd query
npm run dev
```

### Event Bus

```bash
cd event-bus
npm run dev
```

### Moderation service

```bash
cd moderation
npm run dev
```

### Client (React + Vite)

```bash
cd client
npm run dev
```

---

## 📝 Commit Convention

The project uses **Conventional Commits** enforced by Commitlint + Husky.

Example commit messages:

```
feat: add new comments route
fix(posts): handle missing data
chore: update dependencies
```

---

## ✔ Summary

- Monorepo powered by **npm workspaces**
- Shared **TypeScript**, **ESLint**, and **Prettier** configuration
- React frontend + multiple Express microservices
- Git hooks enabled (**pre-commit**, **commit-msg**)
