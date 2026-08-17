import { ArrowRight, CalendarDays } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PageHero from "../../components/PageHero/PageHero";
import { useTranslatedList } from "../../hooks/useTranslatedList";
import type { NewsItem } from "../../types/content";
import "../sharedPages.css";
import { HERO_IMAGES } from "../../config/heroImages";

const News = () => {
  const { t } = useTranslation();
  const plannedItems = useTranslatedList<NewsItem>("news.planned.items");

  return (
    <main>
      <PageHero
        eyebrow={t("news.hero.eyebrow")}
        title={t("news.hero.title")}
        text={t("news.hero.text")} image={HERO_IMAGES.news} />

      <section className="content-section">
        <div className="site-container">
          <div className="empty-news">
            <div>
              <div className="section-eyebrow section-eyebrow--light">
                <span />NEWSROOM
              </div>
              <h2>{t("news.empty.title")}</h2>
              <p>{t("news.empty.text")}</p>
            </div>

            <NavLink className="button button--white" to="/project">
              {t("news.empty.button")}
              <ArrowRight size={18} />
            </NavLink>
          </div>
        </div>
      </section>

      <section className="content-section content-section--soft">
        <div className="site-container">
          <div className="section-heading">
            <div>
              <div className="section-eyebrow">
                <span />{t("news.planned.eyebrow")}
              </div>
              <h2>{t("news.planned.title")}</h2>
            </div>
          </div>

          <div className="cards-3">
            {plannedItems.map((item) => (
              <article className="info-card" key={item.year}>
                <div className="info-card__icon">
                  <CalendarDays size={24} />
                </div>
                <span className="team-card__role">{item.year}</span>
                <h3 className="news-card-title">{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default News;
