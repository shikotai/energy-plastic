export type SeoRouteConfig = {
  titleKey: string;
  descriptionKey: string;
  labelKey?: string;
};

export const SEO_ROUTES: Record<string, SeoRouteConfig> = {
  "/": {
    titleKey: "home.hero.title",
    descriptionKey: "home.hero.text",
    labelKey: "nav.home",
  },
  "/about": {
    titleKey: "about.hero.title",
    descriptionKey: "about.hero.text",
    labelKey: "nav.about",
  },
  "/technology": {
    titleKey: "technology.hero.title",
    descriptionKey: "technology.hero.text",
    labelKey: "nav.technology",
  },
  "/solutions": {
    titleKey: "solutions.hero.title",
    descriptionKey: "solutions.hero.text",
    labelKey: "nav.solutions",
  },
  "/project": {
    titleKey: "project.hero.title",
    descriptionKey: "project.hero.text",
    labelKey: "nav.project",
  },
  "/team": {
    titleKey: "team.hero.title",
    descriptionKey: "team.hero.text",
    labelKey: "nav.team",
  },
  "/news": {
    titleKey: "news.hero.title",
    descriptionKey: "news.hero.text",
    labelKey: "nav.news",
  },
  "/contacts": {
    titleKey: "contacts.hero.title",
    descriptionKey: "contacts.hero.text",
    labelKey: "nav.contacts",
  },
};

export const SITE_NAME = "Energy Plastic";

export const configuredSiteUrl = (import.meta.env.VITE_SITE_URL || "")
  .trim()
  .replace(/\/+$/, "");

export const getSiteOrigin = () => {
  if (configuredSiteUrl) return configuredSiteUrl;
  if (typeof window !== "undefined") return window.location.origin;
  return "";
};
