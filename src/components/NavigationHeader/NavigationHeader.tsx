import { useEffect, useState, type CSSProperties } from "react";
import { Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import BrandLogo from "../BrandLogo/BrandLogo";
import scienceFundLogo from "../../assets/science-fund-logo.png";
import { SITE_LANGUAGES, SITE_ROUTES, type SiteLanguage } from "../../config/site";
import "./NavigationHeader.css";

const NavigationHeader = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Header shadow on scroll: passive listener, at most one state update per frame.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 20);
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

  // Close the mobile menu after navigation (covers back/forward too).
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const changeLanguage = (language: SiteLanguage) => {
    void i18n.changeLanguage(language);
    closeMenu();
  };

  const currentLanguage = (i18n.resolvedLanguage || i18n.language) as SiteLanguage;

  const languageButtons = SITE_LANGUAGES.map(({ code, label }) => (
    <button
      key={code}
      type="button"
      lang={code}
      className={currentLanguage === code ? "active" : ""}
      aria-pressed={currentLanguage === code}
      onClick={() => changeLanguage(code)}
    >
      {label}
    </button>
  ));

  return (
    <header className={`site-header ${scrolled ? "site-header--scrolled" : ""}`}>
      <div className="site-header__inner">
        <div className="header-brands">
          <NavLink
            className="header-brand-block"
            to="/"
            onClick={closeMenu}
            aria-label="Energy Plastic"
          >
            <BrandLogo className="brand__logo" surface="light" />
            <span className="header-brand-label">{t("nav.energyPlastic")}</span>
          </NavLink>

          <span className="header-brand-divider" aria-hidden="true" />

          <a
            href="https://science-fund.kz/"
            target="_blank"
            rel="noopener noreferrer"
            className="header-brand-block header-brand-block--science"
            aria-label="Science Fund"
          >
            <img className="science-fund-logo__image" src={scienceFundLogo} alt="" />
            <span className="header-brand-label">{t("nav.scienceFund")}</span>
          </a>
        </div>

        <nav id="site-main-nav" className={`main-nav ${menuOpen ? "main-nav--open" : ""}`}>
          {SITE_ROUTES.map(({ path, key }, index) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) => (isActive ? "active" : "")}
              style={{ "--nav-index": index } as CSSProperties}
              onClick={closeMenu}
            >
              {t(`nav.${key}`)}
            </NavLink>
          ))}
          <div className="language-switcher language-switcher--mobile">{languageButtons}</div>
        </nav>

        <div className="site-header__actions">
          <div className="language-switcher">{languageButtons}</div>
          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={menuOpen}
            aria-controls="site-main-nav"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;
