## CITJS Photo App

A simple photo galleries app built with Next.js, Prisma, Chakra UI, SWR, and Uploadcare.

### Tech Stack

- Next.js 15 (Turbopack)
- TypeScript
- Prisma (PostgreSQL)
- Chakra UI
- SWR
- Uploadcare React Uploader

### Prerequisites

- Node.js 18+
- A PostgreSQL database (or a compatible connection string)
- Uploadcare account for public/secret keys

### Environment Variables

Create a `.env` file in the project root:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"
UPLOADCARE_PUBLIC_KEY="your_uploadcare_public_key"
UPLOADCARE_SECRET_KEY="your_uploadcare_secret_key"
```

### Install

```bash
npm install
```

### Database

- Generate client: `npm run postinstall` (runs automatically) or `npx prisma generate`
- Apply migrations: `npm run db:migrate:prod` (or `npx prisma migrate deploy`)
- Reset and seed (local only): `npm run db:reset` and `npm run db:seed`

### Development

```bash
npm run dev
```

Open http://localhost:3000

### Build and Start

```bash
npm run build
npm run start
```

### Features

- Create galleries
- Upload images to Uploadcare from the gallery page
- View gallery images in a responsive grid
- Delete photos (removes from Uploadcare and DB)

### Key Commands

- `npm run dev` – start dev server
- `npm run build` – Prisma generate + Next build
- `npm run start` – start production server
- `npm run db:seed` – seed sample data
- `npm run db:migrate:prod` – apply migrations in prod
- `npm run db:reset` – reset DB and re-seed locally

### Configuration Notes

- Next Image remote patterns are configured in `next.config.ts` for Uploadcare CDN.
- If you see a Turbopack workspace root warning about multiple lockfiles, either remove extra lockfiles or set `turbopack.root` in `next.config.ts`.
- Prisma `package.json#prisma` configuration is deprecated; consider migrating to a dedicated Prisma config file in future updates.

### Project Structure (high level)

- `pages/` – Next pages and API routes
- `components/` – UI components
- `lib/` – client/server utilities and API wrappers
- `prisma/` – schema and migrations
- `middleware/` – request utilities (Prisma injection, method guard)

### Uploadcare

- Public signing endpoint: `POST /api/photos/sign`
- Client uploader: `components/PhotoUploader/`
- Photos persist via `POST /api/galleries/[id]/photos/create`

### Troubleshooting

- Ensure all env vars are set. Uploadcare helpers will throw if keys are missing.
- For multiple lockfile warnings, remove redundant lockfiles or configure `turbopack.root`.
- If uploads fail, verify Uploadcare keys and that the Next Image remote pattern matches your CDN hostname.
