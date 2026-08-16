import { Factory, FlaskConical, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import PageHero from "../../components/PageHero/PageHero";
import SectionCTA from "../../components/SectionCTA/SectionCTA";
import { useTranslatedList } from "../../hooks/useTranslatedList";
import type { Metric, TextCard } from "../../types/content";
import "../sharedPages.css";

const About = () => {
  const { t } = useTranslation();
  const principles = useTranslatedList<TextCard>("about.principles");
  const stats = useTranslatedList<Metric>("about.focus.stats");
  const icons = [FlaskConical, ShieldCheck, Factory];

  return (
    <main>
      <PageHero eyebrow={t("about.hero.eyebrow")} title={t("about.hero.title")} text={t("about.hero.text")} />

      <section className="content-section">
        <div className="site-container two-column two-column--center">
          <div className="copy-block">
            <div className="section-eyebrow"><span />{t("about.mission.eyebrow")}</div>
            <h2>{t("about.mission.title")}</h2>
            <p>{t("about.mission.text")}</p>
          </div>
          <div className="dark-panel">
            <span className="dark-panel__label">MATERIALS → SAFETY → INDUSTRY</span>
            <div className="dark-panel__big">EP</div>
            <p>{t("about.mission.panel")}</p>
          </div>
        </div>
      </section>

      <section className="content-section content-section--soft">
        <div className="site-container">
          <div className="section-heading">
            <div>
              <div className="section-eyebrow"><span />{t("about.principlesEyebrow")}</div>
              <h2>{t("about.principlesTitle")}</h2>
            </div>
          </div>
          <div className="cards-3">
            {principles.map((item, index) => {
              const Icon = icons[index] ?? FlaskConical;
              return <article className="info-card" key={item.title}><div className="info-card__icon"><Icon size={24} /></div><h3>{item.title}</h3><p>{item.text}</p></article>;
            })}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="site-container two-column">
          <div className="copy-block">
            <div className="section-eyebrow"><span />{t("about.focus.eyebrow")}</div>
            <h2>{t("about.focus.title")}</h2>
            <p>{t("about.focus.text")}</p>
          </div>
          <div className="stats-grid stats-grid--single">
            {stats.map((stat) => <div className="stat-card" key={stat.value}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
          </div>
        </div>
      </section>
      <SectionCTA />
    </main>
  );
};
export default About;
