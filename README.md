# e2e-fixtures

Test applications for the end-to-end run of the panel's Applications module
(`php artisan p:applications:e2e`). Every directory is one application; the command
creates it from this repository with the directory as the root.

Each application answers `GET /` with a marker `e2e:<fixture>:<version>`.

| Directory | Stack | Notes |
|---|---|---|
| `node-express` | Node.js, npm, Express | |
| `bun` | Bun | |
| `python-fastapi` | Python, FastAPI | |
| `php-mariadb` | PHP | needs MariaDB, answers only when the database is reachable |
| `go` | Go modules | |
| `java` | Java 21, Maven (no wrapper), Spring Boot | builds the largest jar into `app.jar` |
| `dotnet` | .NET 10, ASP.NET Core minimal API | published to `out/` |
| `ruby` | Ruby, Bundler, Sinatra on Puma (`config.ru`) | |
| `rust` | Rust, cargo, tiny_http | release binary copied to `./app` |
| `deno` | Deno 2, `deno task start` | |
| `static` | static HTML | nothing to build, so no broken variant |
| `dockerfile` | Dockerfile | needs `APPLICATIONS_DOCKERFILE_ENABLED=true` |
| `compose` | docker-compose: `web` and `api` (Node.js), PostgreSQL, Redis, Mailpit | not run by `p:applications:e2e`: with `APPLICATIONS_COMPOSE=true` deploy the folder into a pool from the wizard ("Deploy the whole docker-compose"); `/` of `web` answers `e2e:compose:v1 web` and the reply of `api` with `db=ok cache=ok`. Only on `main` |
| `compose-healthcheck` | docker-compose: `web` and `api` (Node.js), PostgreSQL, Redis | like `compose`, but every `depends_on` waits for `service_healthy`: `api` has a healthcheck (`/health`, 200 only with `db=ok cache=ok`), `web` waits for it. Not run by `p:applications:e2e`. Only on `main` |

Branches simulate pushes:

- `main`: version `v1`.
- `e2e-update`: version `v2` with a new dependency in every application.
- `e2e-broken`: the install or build fails; the running `v2` must keep answering.

Keep the three branches in sync when changing an application.

## Hard projects

Realistic applications built the way deployments broke (or could break) in practice.
They only exist on `main` and run the `deploy` and `delete` scenarios. Each answers
`GET /` with `e2e:<fixture>:v1` and the state of its services, and with HTTP 500
(without the marker) as soon as one check fails, so a half-working deployment does not
pass. Lock files are committed for every package manager.

| Directory | Stack | What it catches |
|---|---|---|
| `laravel-vite` | Laravel 12, MariaDB, Redis, Vite built by yarn | `packageManager: yarn@1.22.22` with `yarn.lock` in a PHP project; `build:production` must win over `build`; no `storage/` in the repository; `database/schema/mysql-schema.sql` is loaded by `migrate` through the `mysql` client before the later migration alters its table; `@vite` fails without `public/build/manifest.json`; the cache check uses the `redis` store |
| `next-prisma` | Next.js 15, Prisma 6, PostgreSQL | `prisma generate` in `build`, `prisma migrate deploy` in `start` from devDependencies (needs dev dependencies installed and the Prisma engines on the runtime image), `DATABASE_URL` from the linked service, a page rendered per request |
| `pnpm-monorepo` | pnpm 9 workspaces, Express | `packageManager: pnpm@9.15.9` (corepack fetches another pnpm than the image's), no root scripts: `packages/shared` (TypeScript) must be built before `apps/web` starts with `pnpm --filter` |
| `django-postgres` | Django 5.2, PostgreSQL, Redis, gunicorn, WhiteNoise | `SECRET_KEY` missing from `.env.example` (signing fails without one), `CompressedManifestStaticFilesStorage` needs `collectstatic` (otherwise `{% static %}` answers 500), migrations at start, `DATABASE_URL`/`REDIS_URL` from the linked services |
| `node-peer-deps` | Node.js, npm, React 18, Express | `@testing-library/react-hooks@8` wants React 17: `npm ci` fails with `ERESOLVE` unless the committed `.npmrc` (`legacy-peer-deps=true`) is honoured |
