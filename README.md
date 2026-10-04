# Kronos

Kronos is a Next.js app for creating time capsules: write a message, choose when it unlocks, and share it privately or publicly. Sign in with Google to manage your feed, follow other users, and explore delivered public capsules.

## Prerequisites

- Node.js 20+
- [pnpm](https://pnpm.io/)
- PostgreSQL (via `DATABASE_URL`)
- Google OAuth credentials for NextAuth (`AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_SECRET`)

## Setup

```bash
pnpm install
pnpm exec prisma migrate deploy
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command       | Description                          |
| ------------- | ------------------------------------ |
| `pnpm dev`    | Start the dev server (Turbopack)     |
| `pnpm build`  | Production build                     |
| `pnpm start`  | Run the production server            |
| `pnpm lint`   | Run ESLint                           |

`pnpm install` runs `prisma generate` via the `prepare` script.
