# Virtual Rain Gauge (Web PWA)

Installable Progressive Web App port of the mobile Virtual Rain Gauge. Uses the same API and map tiles as `rain_gauge_app`.

## Features

- Satellite map with Last week / Growing Season / Crop Year precipitation overlays
- Tap the map for point precipitation values
- Daily and season comparison charts
- Dynamic legend from the API
- Instructions / credits
- Soft update banner when a newer app version is required
- Installable on Android Chrome (Add to Home screen / Install app)

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

Output is in `dist/`.

## API

Configured in `src/config/apiConfig.js` → `https://api.realfield.ca/`

## Deploy

### Vercel (recommended)

1. Import this folder as a Vercel project (root = this directory).
2. Build command: `npm run build`
3. Output directory: `dist`
4. `vercel.json` already rewrites SPA routes to `index.html`.
5. Optionally attach custom domain `raingauge.realfield.ca`.

Or CLI:

```bash
npx vercel --prod
```

### Google Cloud Run

```bash
gcloud run deploy raingauge-web \
  --source . \
  --region northamerica-northeast1 \
  --allow-unauthenticated
```

Or build/push the included `Dockerfile` and deploy the image. The container serves `dist` on `$PORT` (8080).

**Do not use Firebase for this app** — the older portal lives in `raingauge-app.web.app`.

## Install on Android

1. Open the **HTTPS** site in Chrome.
2. Menu → **Install app** or **Add to Home screen**.
3. Launch from the home screen for a fullscreen (standalone) experience.

HTTPS is required for install prompts (Vercel / Cloud Run provide this).

## Version

App version is in `src/config/version.js` and `package.json`. Keep them in sync when releasing.
