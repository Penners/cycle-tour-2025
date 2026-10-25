# Cycle Tour 2025

An interactive map and journal of a 2025 bike tour: day-by-day routes from Strava, overnight pins, geotagged photos, an elevation profile, historical weather, and train, ferry and flight legs drawn differently from the riding.

Built on the framework from [cycle-tour-2026](https://github.com/Penners/cycle-tour-2026) and [cycle-trip-2024](https://github.com/Penners/cycle-trip-2024): Next.js (App Router), Leaflet and free, keyless basemaps. The code in `scripts/` and `src/` is shared with the other tour sites, and every tour detail lives in [scripts/tour.config.mjs](scripts/tour.config.mjs), so improve the code in one repo and copy it across. `npm run framework:check` lists anything that has drifted.

## Run it

```sh
npm install
npm run dev
```

The site only needs what's committed: `src/data/tour.json`, `public/photos/`, `content/`. The raw inputs (Strava exports and original photos) are deliberately **not** in the repo.

## Adding the tour

1. **Rides:** export each activity from Strava as `.tcx` into `gpxdata/`, either with *Export Original* on each activity or from a bulk account export. Rides are grouped into days by local start date, so a day split across several recordings just works.
2. **Photos:** copy phone photos into `photos/`. They're placed by EXIF GPS. Filenames can be Pixel `PXL_YYYYMMDD_HHMMSSmmm` (UTC) or `IMG_YYYYMMDD_HHMMSSmmm` (the camera's clock; see `CAMERA_CLOCK`). A photo without GPS is placed where the track was when it was taken.
3. **Config:** fill in [scripts/tour.config.mjs](scripts/tour.config.mjs). Each field has an example there, and the 2024 and 2026 repos have complete ones.
   - `TOUR`: title, from → to, dates, riders, intro.
   - `TIMEZONE_OFFSET_HOURS` and `TIME_ZONE`: the local offset during the trip, and the same zone by name for the site's clock times.
   - `RECORDINGS`: `"strava"` for Strava exports (distance and climbing counted as Strava does), `"phone"` for patchy raw phone GPS (despiked and smoothed hard). `FILL_GAPS`: route the unrecorded stretches (below).
   - `stays`: one per night, with exact coordinates. A saved Google Maps list is a handy source.
   - `transfers`: trains (`from`/`to`, optional `via`), ferries (a hand-drawn `path`) and flights (`from`/`to`), each with approximate `depart`/`arrive` times.
   - `dayTitles`: a title and subtitle per day, plus an optional `noRide` note for a day without riding. Days with rides but no entry get a plain date title.
4. **Words:** write [content/journal.md](content/journal.md), one `### **Tuesday, 2 September 2025**` section per day, and photo captions in [content/captions.json](content/captions.json). Add `"hidden": true` to leave a photo out, or `"lat"`/`"lon"` to pin a photo whose GPS is wrong.
5. **Build the data**, then run the site:

   ```sh
   npm run data:photos   # resize photos + read GPS (slow first time; skips existing)
   npm run data:rail     # train legs along real railways (when transfers change)
   npm run data:routes   # fill any gaps between recordings (only fetches what's missing)
   npm run data:weather  # hourly historical weather along the route
   npm run data          # assemble src/data/tour.json
   npm run dev
   ```

## How it fits together

```
gpxdata/*.tcx ─► tracks.mjs ─► npm run data:routes ─► data/routes/  (bike routes for gaps, cached)
tour.config.mjs ─► npm run data:rail ─► data/rail/                    (train lines, cached)
route + stays ─► npm run data:weather ─► data/weather.json            (Open-Meteo archive, cached)
photos/*.jpg ─► npm run data:photos ─► public/photos/ + data/photos.json

all of the above + content/captions.json ─► npm run data ─► src/data/tour.json
content/journal.md ─► read at build time, split into days
```

- **Gaps.** [scripts/tracks.mjs](scripts/tracks.mjs) treats each day as a chain: last night's stay, then rides and transfers in time order, then tonight's stay. A gap between one link's end and the next one's start (say, from the campsite to where Strava was switched on) is routed along cycle paths with [BRouter](https://brouter.de) and joined into the ride. Gaps over 20 km are reported rather than guessed, since they usually mean a missing train or ferry in the config. With good Strava data there'll be little to fill.
- **Weather.** For each day: the daytime high, the overnight low at the stay, rain, wind and gusts, the headwind actually ridden into (wind against the direction of travel, sampled every minute), cloud cover and sunshine.
- **Raw GPS.** In `npm run dev`, a **Show raw GPS** toggle overlays exactly what was recorded. It isn't shipped in production builds.

## Enriching the data with an AI coding assistant

The [cycle-tour-2026 README](https://github.com/Penners/cycle-tour-2026#enriching-the-data-with-an-ai-coding-assistant) has workflows that work well with this repo:
- **Facts:** fact-check the journal against the tracks, and name places with Nominatim.
- **Photos:** order events with photo timestamps, and caption from labelled contact sheets.
- **Weather:** check memories of headwinds and sunburn against the weather data, as was done for 2024.

## Basemaps

All free with no API key: OpenFreeMap (Streets / Light / Dark, vector tiles via MapLibre GL), CyclOSM, OpenTopoMap and Esri satellite. See [src/lib/tiles.ts](src/lib/tiles.ts). MapLibre's web worker is copied into `public/maplibre/` on `postinstall`.

## Deploying

Vercel, zero config: push the repo and import it. All pages are static. Node 24 LTS is pinned in `.nvmrc` and `package.json`.
