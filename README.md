# Jira Clone

A monorepo project for building a Jira clone application using pnpm workspaces.

## Project Structure

```
JiraClone/
├── apps/
│   ├── web/          # NextJS frontend application
│   └── api/          # NestJS backend API
├── packages/
│   ├── shared/       # Shared types and utilities
│   └── config/       # Shared ESLint and TypeScript configurations (optional)
└── pnpm-workspace.yaml
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- pnpm >= 8.0.0

### Installation

Install all dependencies:

```bash
pnpm install
```

### Development

Run the web application:

```bash
pnpm dev:web
```

Run the API server:

```bash
pnpm dev:api
```

### Build

Build all applications:

```bash
pnpm build
```

Build individual applications:

```bash
pnpm build:web
pnpm build:api
```

## Workspace Packages

### Apps

- **@jira-clone/web**: NextJS frontend application
- **@jira-clone/api**: NestJS backend API

### Packages

- **@jira-clone/shared**: Shared types and utilities used across apps
- **@jira-clone/config**: Shared ESLint and TypeScript configurations

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: NestJS 11, TypeScript
- **Package Manager**: pnpm
- **Monorepo**: pnpm workspaces
