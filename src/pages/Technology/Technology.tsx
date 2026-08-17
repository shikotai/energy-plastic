import { Check, Flame, FlaskConical, Gauge, Layers3, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";

import PageHero from "../../components/PageHero/PageHero";
import SectionCTA from "../../components/SectionCTA/SectionCTA";
import { useTranslatedList } from "../../hooks/useTranslatedList";
import type { TextCard } from "../../types/content";
import "../sharedPages.css";

const Technology = () => {
  const { t } = useTranslation();

  const steps = useTranslatedList<TextCard>("technology.how.steps");
  const research = useTranslatedList<string>("technology.research.items");
  const standards = useTranslatedList<string>("technology.standards.labels");
  const icons = [FlaskConical, ShieldCheck, Layers3, Gauge];

  return (
    <main>
      <PageHero eyebrow={t("technology.hero.eyebrow")} title={t("technology.hero.title")} text={t("technology.hero.text")} />

      <section className="content-section">
        <div className="site-container two-column">
          <div className="copy-block">
            <div className="section-eyebrow"><span />{t("technology.how.eyebrow")}</div>
            <h2>{t("technology.how.title")}</h2>
          </div>

          <div className="process-list">
            {steps.map((step, index) => {
              const Icon = icons[index];
              return (
                <article className="process-item" key={step.title}>
                  <div className="process-item__number">{String(index + 1).padStart(2, "0")}</div>
                  <div>
                    <Icon size={21} color="#138552" />
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="content-section content-section--dark">
        <div className="site-container two-column two-column--center">
          <div className="dark-panel">
            <span className="dark-panel__label">{t("technology.research.panelLabel")}</span>
            <div className="dark-panel__big">{t("technology.research.panelValue")}</div>
            <p>{t("technology.research.panel")}</p>
          </div>

          <div className="copy-block">
            <div className="section-eyebrow section-eyebrow--light"><span />{t("technology.research.eyebrow")}</div>
            <h2>{t("technology.research.title")}</h2>
            <ul className="check-list">
              {research.map((item) => (
                <li key={item}>
                  <span className="check-list__icon"><Check size={14} /></span>
                  <span style={{ color: "rgba(255,255,255,.72)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="content-section content-section--soft">
        <div className="site-container two-column two-column--center">
          <div className="copy-block">
            <div className="section-eyebrow"><span />{t("technology.standards.eyebrow")}</div>
            <h2>{t("technology.standards.title")}</h2>
            <p>{t("technology.standards.text")}</p>
            <div className="chips">{standards.map((label) => <span className="chip" key={label}>{label}</span>)}</div>
          </div>

          <div className="cards-3" style={{ gridTemplateColumns: "1fr" }}>
            <article className="info-card">
              <div className="info-card__icon"><Flame size={24} /></div>
              <h3>{t("technology.monitoring.burnTitle")}</h3>
              <p>{t("technology.monitoring.burnText")}</p>
            </article>
            <article className="info-card">
              <div className="info-card__icon"><ShieldCheck size={24} /></div>
              <h3>{t("technology.monitoring.stabilityTitle")}</h3>
              <p>{t("technology.monitoring.stabilityText")}</p>
            </article>
          </div>
        </div>
      </section>

      <SectionCTA />
    </main>
  );
};

export default Technology;
