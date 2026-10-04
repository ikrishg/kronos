<div align="center">

# Kronos

🏆 WINNER CODEDAY DEHRADUN 🏆

Write a message, pick a delivery date, and keep it private or public—follow people and read their capsules after they unlock.

<p><a href="https://kronos-sineveritas.vercel.app">https://kronos-sineveritas.vercel.app</a></p>

</div>

Fork of [kronos-doon/kronos](https://github.com/kronos-doon/kronos).

## Run locally

Node.js 20+, [pnpm](https://pnpm.io/), PostgreSQL (`DATABASE_URL`), and Google OAuth for NextAuth (`AUTH_GOOGLE_ID`, `AUTH_GOOGLE_SECRET`, `AUTH_SECRET`).

```bash
pnpm install
pnpm exec prisma migrate deploy
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command      | Description            |
| ------------ | ---------------------- |
| `pnpm dev`   | Dev server (Turbopack) |
| `pnpm build` | Production build       |
| `pnpm start` | Production server      |
| `pnpm lint`  | ESLint                 |

`pnpm install` runs `prisma generate` via the `prepare` script.
