import { SITE_ROUTES, type SiteRoute } from "./site";

export const SITE_NAME = "Energy Plastic";
export const OG_IMAGE_PATH = "/og-image.png";

export const OG_LOCALES: Record<string, string> = {
  ru: "ru_RU",
  kk: "kk_KZ",
  en: "en_US",
};

export const configuredSiteUrl = (import.meta.env.VITE_SITE_URL || "")
  .trim()
  .replace(/\/+$/, "");

export const getSiteOrigin = () => {
  if (configuredSiteUrl) return configuredSiteUrl;
  if (typeof window !== "undefined") return window.location.origin;
  return "";
};

export const findRoute = (pathname: string): SiteRoute | undefined => {
  const normalized = pathname !== "/" ? pathname.replace(/\/+$/, "") : "/";
  return SITE_ROUTES.find((route) => route.path === normalized);
};
