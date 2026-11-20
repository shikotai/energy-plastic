import routes from "./routes.json";

export type SiteLanguage = "ru" | "kk" | "en";

export const SITE_LANGUAGES: Array<{ code: SiteLanguage; label: string }> = [
  { code: "ru", label: "RU" },
  { code: "kk", label: "KZ" },
  { code: "en", label: "EN" },
];

export type SiteRoute = {
  path: string;
  /** Used for `nav.<key>` and `seo.<key>` translation keys. */
  key: string;
  changefreq: string;
  priority: string;
};

/**
 * Single source of truth for public pages. The same JSON file is read by
 * scripts/postbuild.mjs to generate sitemap.xml and per-page HTML metadata.
 */
export const SITE_ROUTES: readonly SiteRoute[] = routes;

export const SITE_CONTACTS = {
  phones: ["+7 701 407 2274", "+7 705 220 1028"],
  email: "energyplastic.kz@gmail.com",
} as const;
