import { ArrowLeft } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PageHero from "../../components/PageHero/PageHero";
import "../sharedPages.css";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <main>
      <PageHero
        eyebrow="404"
        title={t("notFound.title")}
        text={t("notFound.text")}
      />

      <section className="content-section not-found-actions">
        <div className="site-container">
          <NavLink className="button button--primary" to="/">
            <ArrowLeft size={18} />
            {t("notFound.button")}
          </NavLink>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
