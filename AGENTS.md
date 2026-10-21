# AGENTS.md

## What this is
- Single-file Express 5 API: everything (server, MongoDB client, routes) lives in `index.js`. No folders, no route modules.
- ESM only (`"type": "module"`) — use `import`, not `require`.
- Not a git repo, and no workspace/monorepo config links anything: this package is standalone. Sibling dirs under `../` (e.g. `product-client`, `simple-crud-server`) are unrelated practice projects — do not modify them from here.

## Commands
- Run: `node index.js` — there is **no `npm start` script**; `npm start` fails with "Missing script".
- Server listens on hardcoded port **4000**.
- `npm test` is the stock placeholder (`exit 1`) and always fails. There are no tests, linters, formatters, or typecheckers configured — do not try to run them or invent steps for them.

## Environment
- `.env` at repo root is loaded via `import "dotenv/config"` at the top of `index.js`.
- Required var: `MONGODB_URI` (only one). There is no fallback — if it is missing, `new MongoClient(undefined)` fails at connect time.

## Gotchas in `index.js`
- No body-parsing middleware is mounted, so `POST /products` currently reads `req.body` as `undefined`. Add `app.use(express.json())` before that route if request bodies matter.
- `connectToMongoDB()` is called without `await` at module load; the HTTP server starts even when the DB connection fails (errors are only `console.dir`-logged). Don't assume a failed connect crashes the process.
- MongoDB usage is the raw `MongoClient` driver (no ODM, no collection helpers yet) — new DB code should follow that pattern unless the task says otherwise.
