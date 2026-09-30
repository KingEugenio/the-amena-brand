# THE AMENA BRAND

Editorial & fine-art wedding photography studio site with a storefront, journal, and a full admin CMS — backed by a small Express API with JSON-file persistence. Built with **React 19 + Vite + TypeScript + Tailwind CSS v4 + Express**. Built by **EKO PIXELS**.

## Run locally

**Prerequisites:** Node.js 18+

```bash
npm install
npm run dev      # Express + Vite (middleware) on http://localhost:3000
npm run build    # builds the client and bundles the server to dist/
npm run start    # run the production server (after build)
npm run lint     # type-check
```

## Admin CMS

Open `/#/admin` (e.g. `http://localhost:3000/#/admin`).
Default credentials:

- Email: `admin@theamenabrand.com`
- Password: `AmenaAtelier2026!`

Change them under **Admin → Settings**. Manage products, collections, journal posts, FAQs, enquiries, media and brand/content settings. Data is stored as JSON files in `data/`.

## Booking / enquiries

Enquiries submitted from the site are saved via the API and appear under **Admin → Enquiries**. After submitting, clients can add the session to **Google Calendar** or download an `.ics` file.
