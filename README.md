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

The build script also guarantees that `dist/.htaccess` and `dist/404.html` exist for SPA routing.

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
  components/
    ErrorBoundary/
    Footer/
    Layout/
    NavigationHeader/
    PageHero/
    ScrollToTop/
    SectionCTA/
  config/
    site.ts             # routes, language options, project contacts
  hooks/
    useTranslatedList.ts
  locales/
    ru/
    kk/
    en/
  pages/
  types/
    content.ts
  utils/
    translation.ts
```

## Routing / white-screen fix

The previous version kept `.htaccess` only in the project root. Vite builds do not guarantee that this file reaches `dist`, which can break direct visits, refreshes, or browser-history navigation on nested routes after Plesk deployment.

This version stores the rewrite file in `public/.htaccess` and additionally runs `scripts/ensure-spa-files.mjs` after every production build.

When deploying to Plesk, upload the contents of `dist/`, including the hidden `.htaccess` file.

## Content note

The technical/project content is based on the provided project presentation. Contact details are kept in one place: `src/config/site.ts`.

Before public launch, confirm that those project contacts are officially assigned to Energy Plastic.


## Branding updates

- Energy Plastic logo integrated into the header and footer.
- Science Fund logo added to the Project page as the funding source.
- Contact email updated to `energyplastic.kz@gmail.com`.


## Hero photography

Page hero images are configured in `src/config/heroImages.ts`. Source/credit references are listed in `HERO-IMAGE-SOURCES.md`.
