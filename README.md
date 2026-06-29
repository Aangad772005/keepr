# Keepr

A Google Keep–style task keeper: quick-add tasks, tag each one with a category through a pill-style picker (styled after the tool-selector popovers in ChatGPT/Claude), and see everything synced live across every device you sign into.

Built as a installable Progressive Web App (PWA) backed by a real Postgres database, so it works like a native app and your tasks follow you between phone, tablet, and desktop.

## Stack

- **React 18 + TypeScript + Vite** — frontend
- **Tailwind CSS** — styling
- **vite-plugin-pwa** — installable, offline-capable PWA
- **Supabase** — Postgres database, auth (magic-link email), and realtime sync

## Features

- Add tasks with an expanding note-style composer
- Tag a task with a category (Work, Personal, Urgent, Ideas) via a pill button + popover, before adding — same interaction pattern as the "tools" menu in modern AI chat UIs
- Filter the board by category
- Mark tasks done, delete tasks
- Realtime sync: changes on one device appear instantly on others
- Installable on iOS/Android/desktop as a standalone app

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com).
2. In your project, go to **SQL Editor → New query**, paste the contents of [`supabase/schema.sql`](./supabase/schema.sql), and run it. This creates the `tasks` table, locks it down with Row Level Security so users can only see their own tasks, and turns on realtime sync.
3. Go to **Project Settings → API** and copy your **Project URL** and **anon public key**.
4. In **Authentication → Providers**, make sure **Email** is enabled (it is by default). This project uses magic-link sign-in, so no password setup is needed.
5. In **Authentication → URL Configuration**, add your local dev URL (`http://localhost:5173`) and your eventual production URL to the redirect allow list.

### 3. Configure environment variables

```bash
cp .env.example .env
```

Fill in the two values from step 2.3 above:

```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

### 4. Run it

```bash
npm run dev
```

Open the printed local URL, enter your email, and click the magic link sent to your inbox. You'll land back in the app signed in.

### 5. Build for production

```bash
npm run build
npm run preview   # sanity-check the production build locally
```

Deploy the `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages, etc). Once deployed over HTTPS, the app becomes installable as a PWA — look for an "Install" prompt in the browser address bar, or "Add to Home Screen" on mobile.

## Project structure

```
src/
  components/
    Composer.tsx       # the add-task input + category picker + Add button
    CategoryPicker.tsx  # the pill button & popover (the "signature" UI piece)
    TaskCard.tsx        # individual task in the grid
    TaskGrid.tsx        # masonry-style grid of tasks, empty state
    SignIn.tsx          # magic-link email sign-in screen
  hooks/
    useAuth.ts          # Supabase auth session state
    useTasks.ts         # task CRUD + realtime subscription
  types/
    index.ts            # Task, Category types + category definitions
  lib/
    supabase.ts          # Supabase client init
supabase/
  schema.sql             # run this once in your Supabase SQL editor
```

## Customizing categories

Categories live in [`src/types/index.ts`](./src/types/index.ts) as a single array — add, remove, or rename entries there. Each category also needs a matching color pair in [`tailwind.config.js`](./tailwind.config.js) under `theme.extend.colors.cat`, and a Tailwind class mapping in [`TaskCard.tsx`](./src/components/TaskCard.tsx)'s `CAT_STYLES`. The database's `check` constraint in `schema.sql` will also need updating if you change category IDs.

## License

MIT — do whatever you want with it.
# keepr
