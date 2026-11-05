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

Branches simulate pushes:

- `main`: version `v1`.
- `e2e-update`: version `v2` with a new dependency in every application.
- `e2e-broken`: the install or build fails; the running `v2` must keep answering.

Keep the three branches in sync when changing an application.
