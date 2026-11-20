import { useTranslation } from "react-i18next";

import { toList } from "../utils/translation";

/**
 * Reads an array from i18next without assuming the translation exists.
 * A missing or malformed key returns [] instead of crashing the page on .map().
 */
export const useTranslatedList = <T,>(key: string): T[] => {
  const { t } = useTranslation();
  return toList<T>(t(key, { returnObjects: true }));
};
