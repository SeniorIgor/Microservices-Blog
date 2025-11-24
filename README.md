# Microservices App (TypeScript • Express • React • npm Workspaces)

This monorepo contains a small microservices setup built with **TypeScript**, **Express**, **React**, and **npm workspaces**.

---

## 📦 Project Structure

```
project/
  client/      # React + Vite frontend
  posts/       # Posts service (Express + TypeScript)
  comments/    # Comments service (Express + TypeScript)
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
- Shared **TypeScript** and **ESLint** config
- React frontend + two Express microservices
- Git hooks enabled (**pre-commit**, **commit-msg**)
