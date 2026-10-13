import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { SITE_CONTACTS } from "../../config/site";
import { getSiteOrigin, SEO_ROUTES, SITE_NAME } from "../../config/seo";

const ensureMeta = (
  selector: string,
  attributes: Record<string, string>,
  content: string,
) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    Object.entries(attributes).forEach(([key, value]) => element?.setAttribute(key, value));
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const ensureCanonical = (href: string) => {
  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }

  canonical.href = href;
};

const PageSEO = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const normalizedPath = location.pathname !== "/" ? location.pathname.replace(/\/+$/, "") : "/";
    const route = SEO_ROUTES[normalizedPath];
    const origin = getSiteOrigin();
    const canonicalUrl = `${origin}${normalizedPath === "/" ? "/" : normalizedPath}`;
    const language = (i18n.resolvedLanguage || i18n.language || "ru").split("-")[0];

    document.documentElement.lang = language;

    const title = route ? `${t(route.titleKey)} | ${SITE_NAME}` : `404 | ${SITE_NAME}`;
    const description = route
      ? t(route.descriptionKey)
      : "Energy Plastic";

    document.title = title;

    ensureMeta('meta[name="description"]', { name: "description" }, description);
    ensureMeta('meta[name="robots"]', { name: "robots" }, route ? "index, follow" : "noindex, nofollow");

    ensureMeta('meta[property="og:title"]', { property: "og:title" }, title);
    ensureMeta('meta[property="og:description"]', { property: "og:description" }, description);
    ensureMeta('meta[property="og:type"]', { property: "og:type" }, "website");
    ensureMeta('meta[property="og:site_name"]', { property: "og:site_name" }, SITE_NAME);
    ensureMeta('meta[property="og:url"]', { property: "og:url" }, canonicalUrl);

    ensureMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary");
    ensureMeta('meta[name="twitter:title"]', { name: "twitter:title" }, title);
    ensureMeta('meta[name="twitter:description"]', { name: "twitter:description" }, description);

    if (route) ensureCanonical(canonicalUrl);

    const graph: Record<string, unknown>[] = [
      {
        "@type": "Organization",
        "@id": `${origin}/#organization`,
        name: SITE_NAME,
        url: `${origin}/`,
        email: SITE_CONTACTS.email,
        telephone: SITE_CONTACTS.phones,
      },
      {
        "@type": "WebSite",
        "@id": `${origin}/#website`,
        url: `${origin}/`,
        name: SITE_NAME,
        publisher: { "@id": `${origin}/#organization` },
        inLanguage: language,
      },
    ];

    if (route && normalizedPath !== "/") {
      graph.push({
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t("nav.home"),
            item: `${origin}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: route.labelKey ? t(route.labelKey) : title,
            item: canonicalUrl,
          },
        ],
      });
    }

    let structuredData = document.getElementById("energy-plastic-structured-data") as HTMLScriptElement | null;
    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "energy-plastic-structured-data";
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }

    structuredData.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@graph": graph,
    });
  }, [i18n.language, i18n.resolvedLanguage, location.pathname, t]);

  return null;
};

export default PageSEO;
