import { ArrowUpRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { SITE_CONTACTS } from "../../config/site";
import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <NavLink className="footer__logo" to="/">ENERGY <span>PLASTIC</span></NavLink>
          <p>{t("footer.description")}</p>
        </div>

        <div className="footer__column">
          <h3>{t("footer.navigation")}</h3>
          <NavLink to="/about">{t("nav.about")}</NavLink>
          <NavLink to="/technology">{t("nav.technology")}</NavLink>
          <NavLink to="/solutions">{t("nav.solutions")}</NavLink>
          <NavLink to="/project">{t("nav.project")}</NavLink>
        </div>

        <div className="footer__column">
          <h3>{t("footer.contacts")}</h3>
          <a href={`mailto:${SITE_CONTACTS.email}`}>
            {SITE_CONTACTS.email} <ArrowUpRight size={15} />
          </a>
          {SITE_CONTACTS.phones.map((phone) => (
            <a key={phone} href={`tel:${phone.replace(/\s/g, "")}`}>{phone}</a>
          ))}
        </div>
      </div>

      <div className="footer__bottom">
        <span>© {new Date().getFullYear()} {t("footer.rights")}</span>
        <span>Materials • Safety • Technology</span>
      </div>
    </footer>
  );
};

export default Footer;
