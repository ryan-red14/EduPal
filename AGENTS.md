<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Base44 Dev Environment

- **Frontend-only Next.js 16 app** (no backend, database, or external services — no secrets needed).
- Runs via `docker compose -f docker-compose.base44.yml up -d` on port 3000.
- **Must use `--webpack` flag** for the dev server: Turbopack (the Next.js 16 default) crashes on `next/font/google` with a "next/font/google queries have exactly one entry" error. The compose file already passes `--webpack`.
- `next.config.ts` sets `allowedDevOrigins` to the preview origin so dev assets/HMR are not blocked.
- The root route `/` redirects to `/dashboard`.
- No `.env` files are required.
