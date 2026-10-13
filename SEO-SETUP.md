# Energy Plastic SEO / analytics setup

The project now has route-aware metadata, canonical URLs, Open Graph/Twitter metadata, Schema.org Organization/WebSite/BreadcrumbList markup, and optional SPA analytics support.

## 1. Production domain

Set the public URL in an environment file used for production builds:

```env
VITE_SITE_URL=https://your-domain.kz
```

If `VITE_SITE_URL` is not set, browser metadata falls back to the current `window.location.origin`, but the sitemap still needs an explicit production domain.

## 2. robots.txt + sitemap.xml

Once the exact public domain is known, run:

```bash
npm run seo:generate -- --site=https://your-domain.kz
```

This generates:

- `public/robots.txt`
- `public/sitemap.xml`

Then run the normal production build:

```bash
npm run build
```

Both files will be copied to `dist/` by Vite.

## 3. Google Analytics 4

Create a GA4 web data stream and place the measurement ID in the production environment:

```env
VITE_GA_ID=G-XXXXXXXXXX
```

The React integration tracks SPA route changes as page views.

## 4. Yandex Metrika

Create a counter and set:

```env
VITE_YANDEX_METRIKA_ID=123456789
```

The React integration initializes Metrika and sends hits when React Router changes the route.

## 5. Google Search Console

Create a property for the final domain. If Google gives an HTML verification meta tag, send its `content` value to ChatGPT so it can be inserted directly into `index.html` before the final deployment.

After verification, submit:

```text
https://your-domain.kz/sitemap.xml
```

## 6. Yandex Webmaster

Do the same with the Yandex verification value. After the site is verified, submit the same sitemap URL.

## 7. SSL

SSL is handled at hosting/Plesk level. Ensure the production site redirects HTTP to HTTPS and the certificate covers the final domain.
