import { ArrowUpRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import BrandLogo from "../BrandLogo/BrandLogo";
import scienceFundLogo from "../../assets/science-fund-logo.png";

import { SITE_CONTACTS } from "../../config/site";

import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__logos">
            <NavLink
              className="footer__logo"
              to="/"
              aria-label="Energy Plastic"
            >
              <BrandLogo
                className="footer__brand-logo"
                surface="dark"
              />
            </NavLink>

            <div className="footer__science-fund">
              <span
                className="footer__logo-divider"
                aria-hidden="true"
              />

              <a
                href="https://science-fund.kz/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__science-fund-link"
                aria-label="Science Fund"
              >
                <img
                  src={scienceFundLogo}
                  alt="Science Fund"
                />
              </a>
            </div>
          </div>

          <p>{t("footer.description")}</p>
        </div>

        <div className="footer__column">
          <h3>{t("footer.navigation")}</h3>

          <NavLink to="/about">
            {t("nav.about")}
          </NavLink>

          <NavLink to="/technology">
            {t("nav.technology")}
          </NavLink>

          <NavLink to="/solutions">
            {t("nav.solutions")}
          </NavLink>

          <NavLink to="/project">
            {t("nav.project")}
          </NavLink>
        </div>

        <div className="footer__column">
          <h3>{t("footer.contacts")}</h3>

          <a href={`mailto:${SITE_CONTACTS.email}`}>
            {SITE_CONTACTS.email}
            <ArrowUpRight size={15} />
          </a>

          {SITE_CONTACTS.phones.map((phone) => (
            <a
              key={phone}
              href={`tel:${phone.replace(/\s/g, "")}`}
            >
              {phone}
            </a>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <span>
          © {new Date().getFullYear()}{" "}
          {t("footer.rights")}
        </span>

        <span>
          Materials • Safety • Technology
        </span>
      </div>
    </footer>
  );
};

export default Footer;