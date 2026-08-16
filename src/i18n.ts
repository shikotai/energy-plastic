import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en/translation.json";
import kk from "./locales/kk/translation.json";
import ru from "./locales/ru/translation.json";
import type { SiteLanguage } from "./config/site";

const supportedLanguages: SiteLanguage[] = ["ru", "kk", "en"];

const getInitialLanguage = (): SiteLanguage => {
  try {
    const saved = localStorage.getItem("energy-plastic-language");
    if (saved === "kz") return "kk"; // migration from older language switches
    if (supportedLanguages.includes(saved as SiteLanguage)) return saved as SiteLanguage;
  } catch {
    // Storage can be blocked by browser privacy settings. Russian remains the safe default.
  }
  return "ru";
};

void i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    kk: { translation: kk },
    en: { translation: en },
  },
  lng: getInitialLanguage(),
  fallbackLng: "ru",
  supportedLngs: supportedLanguages,
  load: "languageOnly",
  returnNull: false,
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (language: string) => {
  const normalized = supportedLanguages.includes(language as SiteLanguage)
    ? (language as SiteLanguage)
    : "ru";

  document.documentElement.lang = normalized;

  try {
    localStorage.setItem("energy-plastic-language", normalized);
  } catch {
    // Persisting the language is optional; rendering must never depend on it.
  }
});

export default i18n;
