# Energy Plastic website

React + TypeScript + Vite website for Energy Plastic.

## Stack

- React 19
- TypeScript
- Vite 8
- React Router 7
- i18next + react-i18next
- lucide-react
- custom CSS

## Run locally

```powershell
npm install
npm run dev
```

Production build:

```powershell
npm run build
```

The build also generates per-page HTML, `404.html`, `sitemap.xml`, `robots.txt` and copies `.htaccess` (see `scripts/postbuild.mjs`).

## Pages

- `/` — Home
- `/about` — About
- `/technology` — Technology
- `/solutions` — Solutions
- `/project` — Project
- `/team` — Team
- `/news` — News
- `/contacts` — Contacts

## Translations

All visible website content is available in:

- `src/locales/ru/translation.json`
- `src/locales/kk/translation.json`
- `src/locales/en/translation.json`

Russian remains the fallback language. Translation arrays are read through `useTranslatedList`, so a malformed/missing array cannot crash a page during a language change.

## Project structure

```text
src/
  components/          # one folder per component: Component.tsx + Component.css
    Analytics/         # GA4 + Yandex Metrika (SPA page views)
    SEO/               # client-side <head> updates on navigation / language change
    Layout/            # header, page transition, skip link, progress bar, back-to-top
    ...
  config/
    routes.json        # public pages (menu, sitemap, per-page HTML)
    site.ts            # languages, contacts
    seo.ts             # site URL, OG image, helpers
    heroImages.ts
  hooks/
    useScrollReveal.ts # scroll-reveal animations (IntersectionObserver)
    useTranslatedList.ts
  locales/{ru,kk,en}/translation.json   # all texts, incl. `seo.*` titles/descriptions
  pages/<Page>/        # page component + page-only CSS
  styles/
    base.css           # tokens, reset, layout primitives, buttons
    content-blocks.css # blocks shared by inner pages (cards, panels, lists)
    animations.css     # keyframes, entrances, ambient motion, reduced-motion
scripts/
  postbuild.mjs        # per-page HTML, 404.html, sitemap.xml, robots.txt, .htaccess
docs/                  # SEO, semantic core, content notes
```

## Deploy (Plesk)

```powershell
npm ci
npm run build
```

Upload **the contents of `dist/`**, including the hidden `.htaccess`, to the site root (`httpdocs`).
Production settings live in `.env.production`; see `docs/SEO-SETUP.md` for analytics and webmaster panels.

## Animations

All motion is CSS (`src/styles/animations.css`) plus a small IntersectionObserver hook for scroll reveal.
Content stays visible without JavaScript, and everything is disabled for visitors with
"reduce motion" enabled in their OS.

## Hero photography

Page hero images are configured in `src/config/heroImages.ts`. Source/credit references are listed in `docs/HERO-IMAGE-SOURCES.md`.
