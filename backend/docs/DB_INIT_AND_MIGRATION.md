# Database Initialization and Migration Guide

This document explains how to initialize, migrate, and seed the backend database.

## Prerequisites

- Node.js and npm installed
- `.env` file configured with a valid `DATABASE_URL`
- The MySQL database must be reachable from your machine

Example:

```dotenv
DATABASE_URL="mysql://root:password@23.251.151.121:3306/education_platform"
```

## Available Commands

Run all commands from the `backend` folder.

### Initialize database

```bash
npm run db:init
```

This runs:

1. `prisma migrate deploy`
2. `prisma db seed`

Use this when you want to apply all pending migrations and load seed data.

### Apply migrations only

```bash
npm run db:migrate
```

This applies all pending Prisma migrations without seeding.

### Run seed only

```bash
npm run db:seed
```

This loads the seed data defined in `prisma/seed.ts`.

### Reset the database

```bash
npm run db:reset
```

This drops and recreates the database schema using Prisma migrate reset.

Warning: this removes existing data.

## Recommended Workflow

### First-time setup

1. Check `.env` and confirm `DATABASE_URL` is correct.
2. Run `npm run db:init`.
3. Start the backend.

### After schema changes

1. Update `prisma/schema.prisma`.
2. Create a migration.
3. Run `npm run db:migrate`.
4. If needed, rerun `npm run db:seed`.

### Fresh local reset

1. Run `npm run db:reset`.
2. Run `npm run db:init` if the reset does not seed the data you need.

## Windows Prisma Note

On this project, `prisma generate` can fail on Windows with a query engine rename error. For that reason, `npm run db:init` intentionally skips `prisma generate` and uses the stable path:

```bash
prisma migrate deploy && prisma db seed
```

If you need to regenerate the Prisma client manually, run:

```bash
npx prisma generate
```

If that fails on Windows, close any process using Prisma, then try again.

## Seed Data

The seed script creates:

- School
- Admin user
- Teacher user
- Student user
- Parent user
- Parent-child relationship
- Class and enrollment
- Sample curriculum data
- Sample progress record
- Sample mental health record
- Forbidden keyword entry

## Troubleshooting

### Database connection fails

- Confirm `DATABASE_URL` is correct
- Confirm the database host is reachable
- Check firewall and Cloud SQL access rules

### Migration runs but seed fails

- Verify required tables exist
- Make sure the database user has insert permissions
- Re-run `npm run db:seed` after fixing the issue

### Prisma generate fails on Windows

- Stop the backend process
- Close editors or terminals using the Prisma client
- Retry `npx prisma generate`

## Current Working Commands

```bash
npm run db:migrate
npm run db:seed
npm run db:init
npm run db:reset
```
