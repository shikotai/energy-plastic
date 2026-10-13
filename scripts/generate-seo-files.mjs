import { writeFile } from "node:fs/promises";

const args = Object.fromEntries(
  process.argv.slice(2).map((arg) => {
    const [key, ...rest] = arg.replace(/^--/, "").split("=");
    return [key, rest.join("=")];
  }),
);

const rawSiteUrl = args.site || process.env.SITE_URL || process.env.VITE_SITE_URL || "";
const siteUrl = rawSiteUrl.trim().replace(/\/+$/, "");

if (!/^https:\/\//i.test(siteUrl)) {
  console.error("SEO files were not generated. Use: npm run seo:generate -- --site=https://your-domain.kz");
  process.exit(1);
}

const routes = [
  ["/", "weekly", "1.0"],
  ["/about", "monthly", "0.8"],
  ["/technology", "monthly", "0.9"],
  ["/solutions", "monthly", "0.9"],
  ["/project", "monthly", "0.9"],
  ["/team", "monthly", "0.6"],
  ["/news", "weekly", "0.8"],
  ["/contacts", "monthly", "0.7"],
];

const urls = routes
  .map(([path, changefreq, priority]) => `  <url>\n    <loc>${siteUrl}${path}</loc>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`)
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

await writeFile("public/sitemap.xml", sitemap, "utf8");
await writeFile("public/robots.txt", robots, "utf8");

console.log(`Generated public/sitemap.xml and public/robots.txt for ${siteUrl}`);
