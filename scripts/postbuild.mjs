/**
 * Runs after `vite build`.
 *
 * 1. Generates one static HTML file per public route (dist/about.html, ...)
 *    with the final <title>, description, canonical, Open Graph, Twitter and
 *    Schema.org JSON-LD already in the markup, plus a <noscript> fallback.
 *    Crawlers that do not execute JavaScript therefore see correct metadata.
 * 2. Generates dist/404.html (noindex) for unknown URLs.
 * 3. Generates dist/sitemap.xml and dist/robots.txt for the production domain.
 * 4. Copies the Apache rewrite rules (.htaccess) into dist/.
 *
 * Configuration comes from .env.production (or real environment variables):
 *   VITE_SITE_URL, VITE_GOOGLE_SITE_VERIFICATION, VITE_YANDEX_VERIFICATION
 */
import { copyFile, readFile, writeFile } from "node:fs/promises";
import { loadEnv } from "vite";

const DIST = "dist";
const FALLBACK_SITE_URL = "https://energy-plastic.kz";
const SITE_NAME = "Energy Plastic";
const LANG = "ru";

const env = loadEnv("production", process.cwd(), "");
const siteUrl = (env.VITE_SITE_URL || FALLBACK_SITE_URL).trim().replace(/\/+$/, "");
if (!/^https:\/\//.test(siteUrl)) {
  console.error(`postbuild: VITE_SITE_URL must start with https:// (got "${siteUrl}")`);
  process.exit(1);
}

const readJson = async (path) => JSON.parse(await readFile(path, "utf8"));
const routes = await readJson("src/config/routes.json");
const ru = await readJson(`src/locales/${LANG}/translation.json`);
const template = await readFile(`${DIST}/index.html`, "utf8");

const SITE_CONTACTS = {
  phones: ["+7 701 407 2274", "+7 705 220 1028"],
  email: "energyplastic.kz@gmail.com",
};

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const get = (object, path) => path.split(".").reduce((acc, key) => acc?.[key], object);

const pageUrl = (path) => `${siteUrl}${path}`;
const ogImage = `${siteUrl}/og-image.png`;

const structuredData = (route, title, description) => {
  const graph = [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: SITE_NAME,
      url: `${siteUrl}/`,
      logo: `${siteUrl}/icon-512.png`,
      image: ogImage,
      email: SITE_CONTACTS.email,
      telephone: SITE_CONTACTS.phones[0],
      contactPoint: SITE_CONTACTS.phones.map((telephone) => ({
        "@type": "ContactPoint",
        telephone,
        email: SITE_CONTACTS.email,
        contactType: "customer support",
        areaServed: "KZ",
        availableLanguage: ["ru", "kk", "en"],
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: SITE_NAME,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: LANG,
    },
  ];

  if (route) {
    graph.push({
      "@type": "WebPage",
      "@id": `${pageUrl(route.path)}#webpage`,
      url: pageUrl(route.path),
      name: title,
      description,
      inLanguage: LANG,
      isPartOf: { "@id": `${siteUrl}/#website` },
    });
  }

  if (route && route.path !== "/") {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: get(ru, "nav.home"), item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: get(ru, `nav.${route.key}`), item: pageUrl(route.path) },
      ],
    });
  }

  // "<" is escaped so the JSON can never close the <script> tag early.
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
};

const verificationTags = [
  env.VITE_GOOGLE_SITE_VERIFICATION &&
    `<meta name="google-site-verification" content="${escapeHtml(env.VITE_GOOGLE_SITE_VERIFICATION.trim())}" />`,
  env.VITE_YANDEX_VERIFICATION &&
    `<meta name="yandex-verification" content="${escapeHtml(env.VITE_YANDEX_VERIFICATION.trim())}" />`,
].filter(Boolean);

const buildHead = (route) => {
  const key = route ? route.key : "notFound";
  const title = get(ru, `seo.${key}.title`);
  const description = get(ru, `seo.${key}.description`);
  if (!title || !description) throw new Error(`postbuild: missing seo.${key} in ${LANG} translation`);
  const url = route ? pageUrl(route.path) : `${siteUrl}/404`;

  return [
    `<title>${escapeHtml(title)}</title>`,
    `<meta name="description" content="${escapeHtml(description)}" />`,
    `<meta name="robots" content="${route ? "index, follow, max-image-preview:large" : "noindex, follow"}" />`,
    route && `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="ru_RU" />`,
    `<meta property="og:locale:alternate" content="kk_KZ" />`,
    `<meta property="og:locale:alternate" content="en_US" />`,
    `<meta property="og:title" content="${escapeHtml(title)}" />`,
    `<meta property="og:description" content="${escapeHtml(description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    ...verificationTags,
    `<script type="application/ld+json" id="structured-data">${structuredData(route, title, description)}</script>`,
  ]
    .filter(Boolean)
    .map((line) => `    ${line}`)
    .join("\n");
};

/** Plain-HTML version of the page essentials for clients without JavaScript. */
const buildNoscript = (route) => {
  const key = route ? route.key : "notFound";
  const heading = route ? get(ru, `${route.key}.hero.title`) : get(ru, "notFound.title");
  const text = route ? get(ru, `${route.key}.hero.text`) : get(ru, "notFound.text");
  const links = routes
    .map((item) => `<li><a href="${item.path}">${escapeHtml(get(ru, `nav.${item.key}`))}</a></li>`)
    .join("");

  return `<noscript>
      <main data-page="${key}" style="max-width:860px;margin:120px auto 60px;padding:0 24px;font-family:system-ui,sans-serif;line-height:1.6;color:#17231c">
        <h1>${escapeHtml(heading)}</h1>
        <p>${escapeHtml(text)}</p>
        <nav aria-label="${escapeHtml(get(ru, "footer.navigation"))}"><ul>${links}</ul></nav>
        <p><a href="mailto:${SITE_CONTACTS.email}">${SITE_CONTACTS.email}</a> · ${SITE_CONTACTS.phones.join(" · ")}</p>
      </main>
    </noscript>`;
};

const renderPage = (route) => {
  // Remove the generic tags from index.html; route-specific ones replace them.
  const html = template
    .replace(/\s*<title>[\s\S]*?<\/title>/, "")
    .replace(/\s*<meta name="description"[^>]*>/, "")
    .replace("</head>", `${buildHead(route)}\n  </head>`)
    .replace(/<div id="root"><\/div>/, `<div id="root"></div>\n    ${buildNoscript(route)}`);

  if (!html.includes('<script type="application/ld+json"') || !html.includes("<noscript>")) {
    throw new Error("postbuild: failed to inject SEO markup into index.html template");
  }
  return html;
};

for (const route of routes) {
  const file = route.path === "/" ? "index.html" : `${route.path.slice(1)}.html`;
  await writeFile(`${DIST}/${file}`, renderPage(route), "utf8");
}
await writeFile(`${DIST}/404.html`, renderPage(null), "utf8");

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (route) => `  <url>
    <loc>${pageUrl(route.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
await writeFile(`${DIST}/sitemap.xml`, sitemap, "utf8");

const robots = `User-agent: *
Allow: /
Disallow: /404.html
Clean-param: utm_source&utm_medium&utm_campaign&utm_content&utm_term&yclid&gclid&fbclid /

Sitemap: ${siteUrl}/sitemap.xml
`;
await writeFile(`${DIST}/robots.txt`, robots, "utf8");

await copyFile("public/.htaccess", `${DIST}/.htaccess`);

console.log(
  `postbuild: ${routes.length} pages + 404.html, sitemap.xml, robots.txt and .htaccess written for ${siteUrl}` +
    (verificationTags.length ? ` (${verificationTags.length} verification tag(s))` : ""),
);
