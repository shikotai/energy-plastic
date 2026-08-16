import { Factory, Flame, ShieldCheck } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/PageHero/PageHero";
import SectionCTA from "../../components/SectionCTA/SectionCTA";
import { useTranslatedList } from "../../hooks/useTranslatedList";
import type { Metric, TimelineItem } from "../../types/content";
import "../sharedPages.css";
import "./Project.css";

const Project = () => {
 const {t}=useTranslation();
 const market=useTranslatedList<Metric>("project.market.items");
 const roadmap=useTranslatedList<TimelineItem>("project.roadmap.items");
 const channels=useTranslatedList<Metric>("project.business.channels");
 return <main>
  <PageHero eyebrow={t("project.hero.eyebrow")} title={t("project.hero.title")} text={t("project.hero.text")}/>
  <section className="content-section"><div className="site-container cards-3 project-summary"><article className="info-card"><div className="info-card__icon"><ShieldCheck size={24}/></div><h3>{t("project.goal.title")}</h3><p>{t("project.goal.text")}</p></article><article className="info-card"><div className="info-card__icon"><Flame size={24}/></div><h3>{t("project.problem.title")}</h3><p>{t("project.problem.text")}</p></article><article className="info-card info-card--green"><div className="info-card__icon"><Factory size={24}/></div><h3>{t("project.local.title")}</h3><p>{t("project.local.text")}</p></article></div></section>
  <section className="content-section content-section--soft"><div className="site-container"><div className="section-heading"><div><div className="section-eyebrow"><span />{t("project.market.eyebrow")}</div><h2>{t("project.market.title")}</h2></div></div><div className="stats-grid project-market-grid">{market.map(item=><div className="stat-card" key={item.value}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div></div></section>
  <section className="content-section"><div className="site-container"><div className="section-heading"><div><div className="section-eyebrow"><span />{t("project.roadmap.eyebrow")}</div><h2>{t("project.roadmap.title")}</h2></div></div><div className="timeline-list project-timeline">{roadmap.map(item=><article className="timeline-card" key={item.year}><span className="timeline-card__year">{item.year}</span><h3>{item.title}</h3><ul>{item.items.map(line=><li key={line}>{line}</li>)}</ul></article>)}</div></div></section>
  <section className="content-section content-section--dark"><div className="site-container"><div className="section-heading"><div><div className="section-eyebrow section-eyebrow--light"><span />{t("project.business.eyebrow")}</div><h2>{t("project.business.title")}</h2></div></div><div className="project-channel-grid">{channels.map(item=><div className="stat-card" key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>)}</div></div></section>
  <SectionCTA />
 </main>;
};
export default Project;
