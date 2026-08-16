import { useTranslation } from "react-i18next";

/**
 * Reads an array from i18next without assuming the translation exists.
 * A missing or malformed key returns [] instead of crashing the page on .map().
 */
export const useTranslatedList = <T,>(key: string): T[] => {
  const { t } = useTranslation();
  const value = t(key, { returnObjects: true });
  return Array.isArray(value) ? (value as T[]) : [];
};
