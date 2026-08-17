import {
  ArrowDownRight,
  ArrowRight,
  Building2,
  Check,
  Factory,
  Flame,
  FlaskConical,
  Gauge,
  Hospital,
  ShieldCheck,
  Sparkles,
  TrainFront,
  Zap,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import type { CSSProperties } from "react";

import { toList } from "../../utils/translation";


import "./Home.css";

const Home = () => {
  const { t } = useTranslation();

  const applicationCards = [
    {
      key: "energy",
      icon: Zap,
      className: "application-card--energy",
    },
    {
      key: "transport",
      icon: TrainFront,
      className: "application-card--transport",
    },
    {
      key: "public",
      icon: Hospital,
      className: "application-card--public",
    },
    {
      key: "industry",
      icon: Factory,
      className: "application-card--industry",
    },
  ] as const;

  const roadmapYears = ["y2026", "y2027", "y2028"] as const;

  return (
    <main className="home-page" id="top">
        <section className="hero">
          <div className="hero__ambient hero__ambient--one" />
          <div className="hero__ambient hero__ambient--two" />

          <div className="site-container hero__grid">
            <div className="hero__content">
              <div className="section-eyebrow">
                <span />
                {t("home.hero.eyebrow")}
              </div>

              <h1>{t("home.hero.title")}</h1>
              <p className="hero__lead">{t("home.hero.text")}</p>

              <div className="hero__actions">
                <NavLink className="button button--primary" to="/technology">
                  {t("home.hero.primary")}
                  <ArrowDownRight size={18} />
                </NavLink>

                <NavLink className="button button--ghost" to="/project">
                  {t("home.hero.secondary")}
                  <ArrowRight size={18} />
                </NavLink>
              </div>

              <div className="hero__badges">
                <div className="hero-badge">
                  <strong>{t("home.hero.badge1")}</strong>
                  <span>{t("home.hero.badgeLabels.trl")}</span>
                </div>
                <div className="hero-badge">
                  <strong>{t("home.hero.badge2")}</strong>
                  <span>{t("home.hero.badgeLabels.thermal")}</span>
                </div>
                <div className="hero-badge">
                  <strong>{t("home.hero.badge3")}</strong>
                  <span>{t("home.hero.badgeLabels.local")}</span>
                </div>
              </div>
            </div>

            <div className="hero__visual" aria-hidden="true">
              <div className="material-orbit material-orbit--outer" />
              <div className="material-orbit material-orbit--inner" />

              <div className="hero__visual-label hero__visual-label--top">
                <FlaskConical size={16} />
                MICROCAPSULE TECHNOLOGY
              </div>

              <div className="capsule capsule--1" />
              <div className="capsule capsule--2" />
              <div className="capsule capsule--3" />
              <div className="capsule capsule--4" />
              <div className="capsule capsule--5" />
              <div className="capsule capsule--6" />

              <div className="cable-model">
                <div className="cable-model__shadow" />
                <div className="cable-model__body">
                  <div className="cable-model__stripe" />
                </div>
                <div className="cable-model__cut">
                  <div className="core core--1" />
                  <div className="core core--2" />
                  <div className="core core--3" />
                  <div className="core core--4" />
                </div>
              </div>

              <div className="hero__visual-label hero__visual-label--bottom">
                <ShieldCheck size={16} />
                FIRE-SAFE MATERIALS
              </div>
            </div>
          </div>

          <div className="hero__rail" aria-hidden="true">
            <span>POLYMER</span>
            <i />
            <span>MICROCAPSULE</span>
            <i />
            <span>CABLE</span>
            <i />
            <span>INFRASTRUCTURE</span>
          </div>
        </section>

        <section className="intro section" id="about">
          <div className="site-container">
            <div className="section-heading section-heading--wide">
              <div>
                <div className="section-eyebrow">
                  <span />
                  {t("home.intro.eyebrow")}
                </div>
                <h2>{t("home.intro.title")}</h2>
              </div>
              <p>{t("home.intro.text")}</p>
            </div>

            <div className="intro-grid">
              <article className="feature-card">
                <div className="feature-card__icon">
                  <Flame size={24} />
                </div>
                <span className="feature-card__number">01</span>
                <h3>{t("home.intro.cards.fire.title")}</h3>
                <p>{t("home.intro.cards.fire.text")}</p>
              </article>

              <article className="feature-card">
                <div className="feature-card__icon">
                  <ShieldCheck size={24} />
                </div>
                <span className="feature-card__number">02</span>
                <h3>{t("home.intro.cards.smoke.title")}</h3>
                <p>{t("home.intro.cards.smoke.text")}</p>
              </article>

              <article className="feature-card feature-card--green">
                <div className="feature-card__icon">
                  <Building2 size={24} />
                </div>
                <span className="feature-card__number">03</span>
                <h3>{t("home.intro.cards.local.title")}</h3>
                <p>{t("home.intro.cards.local.text")}</p>
              </article>
            </div>
          </div>
        </section>

        <section className="technology section" id="technology">
          <div className="site-container technology__grid">
            <div className="technology__visual">
              <div className="micro-field">
                {Array.from({ length: 28 }).map((_, index) => (
                  <span
                    key={index}
                    style={
                      {
                        "--i": index,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>

              <div className="technology__capsule">
                <span className="technology__capsule-core" />
              </div>

              <div className="technology__annotation technology__annotation--a">
                <span>UF / PMMA</span>
                {t("home.technology.shellLabel")}
              </div>

              <div className="technology__annotation technology__annotation--b">
                <span>FUNCTIONAL CORE</span>
                {t("home.technology.coreLabel")}
              </div>
            </div>

            <div className="technology__content">
              <div className="section-eyebrow section-eyebrow--light">
                <span />
                {t("home.technology.eyebrow")}
              </div>

              <h2>{t("home.technology.title")}</h2>
              <p className="technology__lead">{t("home.technology.text")}</p>

              <div className="technology-steps">
                {(["one", "two", "three"] as const).map((step) => (
                  <div className="technology-step" key={step}>
                    <span>{t(`home.technology.steps.${step}.number`)}</span>
                    <div>
                      <h3>{t(`home.technology.steps.${step}.title`)}</h3>
                      <p>{t(`home.technology.steps.${step}.text`)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="technology-stats">
                <div>
                  <strong>{t("home.technology.stat1Value")}</strong>
                  <span>{t("home.technology.stat1Label")}</span>
                </div>

                <div>
                  <strong>{t("home.technology.stat2Value")}</strong>
                  <span>{t("home.technology.stat2Label")}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="solution section" id="solutions">
          <div className="site-container solution__grid">
            <div className="solution__content">
              <div className="section-eyebrow">
                <span />
                {t("home.solution.eyebrow")}
              </div>

              <h2>{t("home.solution.title")}</h2>
              <p className="solution__lead">{t("home.solution.text")}</p>

              <div className="solution-features">
                {(["one", "two", "three", "four"] as const).map((feature) => (
                  <div className="solution-feature" key={feature}>
                    <span>
                      <Check size={15} />
                    </span>
                    {t(`home.solution.features.${feature}`)}
                  </div>
                ))}
              </div>

              <p className="solution__note">
                <Gauge size={16} />
                {t("home.solution.note")}
              </p>
            </div>

            <div className="solution__product" aria-hidden="true">
              <div className="product-gridlines" />
              <span className="product-caption product-caption--top">LSLTx</span>
              <span className="product-caption product-caption--side">AVVGng(A)</span>

              <div className="product-cable">
                <div className="product-cable__body">
                  <span>ENERGY PLASTIC</span>
                </div>

                <div className="product-cable__face">
                  <div className="product-core product-core--a" />
                  <div className="product-core product-core--b" />
                  <div className="product-core product-core--c" />
                  <div className="product-core product-core--d" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="applications section" id="applications">
          <div className="site-container">
            <div className="section-heading">
              <div>
                <div className="section-eyebrow">
                  <span />
                  {t("home.applications.eyebrow")}
                </div>
                <h2>{t("home.applications.title")}</h2>
              </div>
            </div>

            <div className="applications-grid">
              {applicationCards.map(({ key, icon: Icon, className }) => (
                <article className={`application-card ${className}`} key={key}>
                  <div className="application-card__top">
                    <Icon size={26} />
                    <ArrowRight size={20} />
                  </div>
                  <div>
                    <h3>{t(`home.applications.items.${key}.title`)}</h3>
                    <p>{t(`home.applications.items.${key}.text`)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="roadmap section" id="roadmap">
          <div className="site-container">
            <div className="section-heading section-heading--wide">
              <div>
                <div className="section-eyebrow">
                  <span />
                  {t("home.roadmap.eyebrow")}
                </div>
                <h2>{t("home.roadmap.title")}</h2>
              </div>

              <div className="roadmap__status">
                <Sparkles size={18} />
                <span>LAB → PILOT → INDUSTRY</span>
              </div>
            </div>

            <div className="roadmap-grid">
              {roadmapYears.map((year, index) => {
                const items = toList<string>(
                  t(`home.roadmap.years.${year}.items`, { returnObjects: true }),
                );

                return (
                  <article
                    className={`roadmap-card ${index === 0 ? "roadmap-card--active" : ""}`}
                    key={year}
                  >
                    <span className="roadmap-card__year">
                      {t(`home.roadmap.years.${year}.year`)}
                    </span>
                    <h3>{t(`home.roadmap.years.${year}.title`)}</h3>

                    <ul>
                      {items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="site-container">
            <div className="cta__box">
              <div className="cta__orb cta__orb--one" />
              <div className="cta__orb cta__orb--two" />

              <div className="cta__content">
                <div className="section-eyebrow section-eyebrow--light">
                  <span />
                  {t("home.cta.eyebrow")}
                </div>
                <h2>{t("home.cta.title")}</h2>
                <p>{t("home.cta.text")}</p>
              </div>

              <NavLink className="button button--white" to="/contacts">
                {t("home.cta.button")}
                <ArrowRight size={18} />
              </NavLink>
            </div>
          </div>
        </section>
    </main>
  );
};

export default Home;
