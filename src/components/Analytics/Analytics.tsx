import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const GA_ID = (import.meta.env.VITE_GA_ID || "").trim();
const YANDEX_METRIKA_ID = Number(import.meta.env.VITE_YANDEX_METRIKA_ID || 0);

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    ym?: (...args: unknown[]) => void;
  }
}

const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    if (GA_ID && !document.getElementById("energy-plastic-ga")) {
      const gaScript = document.createElement("script");
      gaScript.id = "energy-plastic-ga";
      gaScript.async = true;
      gaScript.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
      document.head.appendChild(gaScript);

      window.dataLayer = window.dataLayer || [];
      window.gtag = (...args: unknown[]) => {
        window.dataLayer?.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", GA_ID, { send_page_view: false });
    }

    if (YANDEX_METRIKA_ID && !document.getElementById("energy-plastic-yandex-metrika")) {
      const metrikaInit = document.createElement("script");
      metrikaInit.id = "energy-plastic-yandex-metrika";
      metrikaInit.textContent = `
        (function(m,e,t,r,i,k,a){
          m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
          m[i].l=1*new Date();
          k=e.createElement(t),a=e.getElementsByTagName(t)[0];
          k.async=1;k.src=r;a.parentNode.insertBefore(k,a)
        })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
        ym(${YANDEX_METRIKA_ID}, "init", {
          clickmap: true,
          trackLinks: true,
          accurateTrackBounce: true,
          webvisor: true
        });
      `;
      document.head.appendChild(metrikaInit);
    }
  }, []);

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}`;
    const pageUrl = window.location.href;

    if (GA_ID && window.gtag) {
      window.gtag("event", "page_view", {
        page_path: pagePath,
        page_location: pageUrl,
        page_title: document.title,
      });
    }

    if (YANDEX_METRIKA_ID && window.ym) {
      window.ym(YANDEX_METRIKA_ID, "hit", pageUrl, {
        title: document.title,
      });
    }
  }, [location.pathname, location.search]);

  return null;
};

export default Analytics;
