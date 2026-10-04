# Kronos

Winner at **CodeDay Dehradun**.

Kronos is a time capsule app: write a message, choose when it unlocks, and keep it private or public. Sign in with Google to create capsules, follow others, and explore public ones after they are delivered.

**Live:** [https://kronos-red.vercel.app](https://kronos-red.vercel.app)

Fork of [kronos-doon/kronos](https://github.com/kronos-doon/kronos).

## Run locally

You need Node.js 20+, [pnpm](https://pnpm.io/), PostgreSQL (`DATABASE_URL`), and Google OAuth for NextAuth (`AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_SECRET`).

```bash
pnpm install
pnpm exec prisma migrate deploy
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command      | Description              |
| ------------ | ------------------------ |
| `pnpm dev`   | Dev server (Turbopack)   |
| `pnpm build` | Production build         |
| `pnpm start` | Production server        |
| `pnpm lint`  | ESLint                   |

`pnpm install` runs `prisma generate` via the `prepare` script.
