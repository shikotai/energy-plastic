import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * Google Analytics 4 + Yandex Metrika for a single-page app.
 * Counters are enabled by VITE_GA_ID / VITE_YANDEX_METRIKA_ID (see .env.production).
 * Both are initialised once; every route change is reported as a page view.
 */

const GA_ID = (import.meta.env.VITE_GA_ID || "").trim();
const YANDEX_METRIKA_ID = Number(import.meta.env.VITE_YANDEX_METRIKA_ID || 0) || 0;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    ym?: ((...args: unknown[]) => void) & { a?: unknown[]; l?: number };
  }
}

const loadScript = (src: string) => {
  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
};

const initAnalytics = () => {
  if (GA_ID && !window.gtag) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // GA expects the native `arguments` object, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", GA_ID, { send_page_view: false });
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`);
  }

  if (YANDEX_METRIKA_ID && !window.ym) {
    const ym = ((...args: unknown[]) => {
      (ym.a = ym.a || []).push(args);
    }) as NonNullable<Window["ym"]>;
    ym.l = Date.now();
    window.ym = ym;
    loadScript("https://mc.yandex.ru/metrika/tag.js");
    // `defer: true` — the first hit is sent manually below, avoiding a double count.
    window.ym(YANDEX_METRIKA_ID, "init", {
      defer: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    });
  }
};

const Analytics = () => {
  const { pathname, search } = useLocation();
  const previousUrl = useRef<string | null>(null);

  useEffect(() => {
    if (!GA_ID && !YANDEX_METRIKA_ID) return;
    initAnalytics();
  }, []);

  useEffect(() => {
    if (!GA_ID && !YANDEX_METRIKA_ID) return;

    // Let PageSEO update document.title first.
    const timer = window.setTimeout(() => {
      const url = window.location.href;
      if (previousUrl.current === url) return; // StrictMode double-invoke guard
      const referer = previousUrl.current ?? document.referrer;
      previousUrl.current = url;

      window.gtag?.("event", "page_view", {
        page_location: url,
        page_path: `${pathname}${search}`,
        page_title: document.title,
      });
      window.ym?.(YANDEX_METRIKA_ID, "hit", url, { title: document.title, referer });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [pathname, search]);

  return null;
};

export default Analytics;
