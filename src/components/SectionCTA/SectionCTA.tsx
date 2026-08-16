import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./SectionCTA.css";

const SectionCTA = () => {
  const { t } = useTranslation();

  return (
    <section className="section-cta">
      <div className="site-container">
        <div className="section-cta__box">
          <div>
            <div className="section-eyebrow section-eyebrow--light">
              <span />{t("home.cta.eyebrow")}
            </div>
            <h2>{t("home.cta.title")}</h2>
            <p>{t("home.cta.text")}</p>
          </div>

          <NavLink className="button button--white" to="/contacts">
            {t("home.cta.button")} <ArrowRight size={18} />
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default SectionCTA;
