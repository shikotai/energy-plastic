export type SiteLanguage = "ru" | "kk" | "en";

export const SITE_LANGUAGES: Array<{ code: SiteLanguage; label: string }> = [
  { code: "ru", label: "RU" },
  { code: "kk", label: "KZ" },
  { code: "en", label: "EN" },
];

export const SITE_ROUTES = [
  { path: "/", translationKey: "nav.home", end: true },
  { path: "/about", translationKey: "nav.about", end: false },
  { path: "/technology", translationKey: "nav.technology", end: false },
  { path: "/solutions", translationKey: "nav.solutions", end: false },
  { path: "/project", translationKey: "nav.project", end: false },
  { path: "/team", translationKey: "nav.team", end: false },
  { path: "/news", translationKey: "nav.news", end: false },
  { path: "/contacts", translationKey: "nav.contacts", end: false },
] as const;

export const SITE_CONTACTS = {
  phones: ["+7 701 407 2274", "+7 705 220 1028"],
  email: "Dd_511@mail.com",
} as const;
