# Abdul Halim — Portfolio (Classic Final Fantasy theme)

Personal portfolio styled after SNES/PS1-era Final Fantasy menus.

**Stack:** Next.js (App Router) · Tailwind CSS v4 · GSAP

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Where things live

- `src/app/globals.css` — FF theme tokens, menu box, cursor, blink and wipe styles
- `src/app/layout.tsx` — fonts, metadata, sound toggle, screen transition between routes
- `src/app/page.tsx` — home: the title screen only
- `src/app/about`, `src/app/projects`, `src/app/contact` — each section is its own game screen
- `src/components/TitleScreen.tsx` — hero as a game title screen
- `src/components/ff/GameScreen.tsx` — shared screen frame: window, Cancel/Esc back to title, Next button, command menu
- `src/components/ff/` — other FF primitives (MenuBox, HandPointer, ScreenLink, FieldMenu, SoundToggle)
- `src/lib/sfx.ts` — menu sound effects; drop your own files in `public/sfx/` and register them there
- `public/cursors/` — pixel-art pointing-glove cursor

## Journal: live music & workouts

The `/journal` screen shows the last song played (Spotify, scrobbled through Last.fm)
and the latest workout from an Amazfit watch (Zepp, synced to Intervals.icu).
Secrets stay on the server (`src/app/api/*`); the browser only gets display-safe fields (no location or route map).

1. `cp .env.example .env.local`
2. Music: connect Spotify to Last.fm at last.fm/settings/applications, create an API account at last.fm/api/account/create,
   then fill `LASTFM_API_KEY` and `LASTFM_USERNAME`.
3. Workouts: connect Amazfit in intervals.icu Settings, create an API key under "Developer Settings",
   then fill `INTERVALS_API_KEY`.
4. Add the same variables to the Vercel project's Environment Variables and redeploy.

Without these variables the screen still works and shows "not connected yet".
