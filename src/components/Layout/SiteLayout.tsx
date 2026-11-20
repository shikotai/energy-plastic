import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";

import { useScrollReveal } from "../../hooks/useScrollReveal";
import Footer from "../Footer/Footer";
import NavigationHeader from "../NavigationHeader/NavigationHeader";
import "./SiteLayout.css";

const SiteLayout = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useScrollReveal("#main-content", [pathname]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setShowBackToTop(window.scrollY > window.innerHeight * 1.2);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">{t("a11y.skipToContent")}</a>
      <div className="scroll-progress" aria-hidden="true" />

      <NavigationHeader />

      <div id="main-content" className="page-transition" key={pathname} tabIndex={-1}>
        <Outlet />
      </div>

      <Footer />

      <button
        type="button"
        className={`back-to-top ${showBackToTop ? "back-to-top--visible" : ""}`}
        onClick={scrollToTop}
        aria-label={t("a11y.backToTop")}
        tabIndex={showBackToTop ? 0 : -1}
      >
        <ArrowUp size={20} />
      </button>
    </div>
  );
};

export default SiteLayout;
