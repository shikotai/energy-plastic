import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import BrandLogo from "../BrandLogo/BrandLogo";
import scienceFundLogo from "../../assets/science-fund-logo.png";

import {
  SITE_LANGUAGES,
  SITE_ROUTES,
  type SiteLanguage,
} from "../../config/site";

import "./NavigationHeader.css";

const NavigationHeader = () => {
  const { t, i18n } = useTranslation();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    onScroll();

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const changeLanguage = (language: SiteLanguage) => {
    void i18n.changeLanguage(language);
    setMenuOpen(false);
  };

  const resolvedLanguage = (
    i18n.resolvedLanguage || i18n.language
  ) as SiteLanguage;

  const languageButtons = SITE_LANGUAGES.map(({ code, label }) => (
    <button
      key={code}
      type="button"
      className={resolvedLanguage === code ? "active" : ""}
      onClick={() => changeLanguage(code)}
    >
      {label}
    </button>
  ));

  return (
    <header
      className={`site-header ${
        scrolled ? "site-header--scrolled" : ""
      }`}
    >
      <div className="site-header__inner">
        <div className="header-brands">
          <NavLink
            className="brand"
            to="/"
            onClick={() => setMenuOpen(false)}
            aria-label="Energy Plastic"
          >
            <BrandLogo
              className="brand__logo"
              surface="light"
            />
          </NavLink>

          <div className="science-fund-logo">
            <span
              className="science-fund-logo__divider"
              aria-hidden="true"
            />

            <a
              href="https://science-fund.kz/"
              target="_blank"
              rel="noopener noreferrer"
              className="science-fund-logo__link"
              aria-label="Science Fund"
            >
              <img
                src={scienceFundLogo}
                alt="Science Fund"
              />
            </a>
          </div>
        </div>

        <nav
          className={`main-nav ${
            menuOpen ? "main-nav--open" : ""
          }`}
        >
          {SITE_ROUTES.map(
            ({ path, translationKey, end }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                className={({
                  isActive,
                }: {
                  isActive: boolean;
                }) => (isActive ? "active" : "")}
                onClick={() => setMenuOpen(false)}
              >
                {t(translationKey)}
              </NavLink>
            )
          )}

          <div className="language-switcher language-switcher--mobile">
            {languageButtons}
          </div>
        </nav>

        <div className="site-header__actions">
          <div className="language-switcher">
            {languageButtons}
          </div>

          <button
            className="menu-button"
            type="button"
            aria-label={
              menuOpen
                ? t("nav.closeMenu")
                : t("nav.openMenu")
            }
            onClick={() =>
              setMenuOpen((value) => !value)
            }
          >
            {menuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavigationHeader;