# FREDDIESHOTIT

Portfolio & booking website for **Frederick Akwafo** — *FREDDIE DESIGN PALACE* (graphic design & brand identity) and *FREDDIE SHOT IT* (documentary photography).

Built with **React 19 + Vite + TypeScript + Tailwind CSS v4**. Built by **EKO PIXELS**.

## Features

- Editorial portfolio, services, about, experience and FAQ pages (hash-based routing)
- Dual-discipline booking form (design + photography) with calendar handoff (Google Calendar / `.ics`)
- Light / dark theme with system-preference detection
- **Studio Admin Portal** at `#/admin` — sign in to manage site settings, appearance and the booking inquiries inbox

## Run locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev      # start dev server on http://localhost:3000
npm run build    # production build to dist/
npm run preview  # preview the production build
npm run lint     # TypeScript type-check
```

## Admin portal

Open `#/admin` (e.g. `http://localhost:3000/#/admin`).
Default password: `freddie2026` — change it under **Account → Security** on first sign-in.

Settings and inquiries are stored in the browser (localStorage) in this version. Moving them to a shared backend (Supabase) so leads reach the photographer across devices is the next step.
