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
| `static` | static HTML | nothing to build, so no broken variant |
| `dockerfile` | Dockerfile | needs `APPLICATIONS_DOCKERFILE_ENABLED=true` |

Branches simulate pushes:

- `main`: version `v1`.
- `e2e-update`: version `v2` with a new dependency in every application.
- `e2e-broken`: the install or build fails; the running `v2` must keep answering.

Keep the three branches in sync when changing an application.
