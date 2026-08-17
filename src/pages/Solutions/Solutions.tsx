import { Check, Factory, Hospital, TrainFront, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import PageHero from "../../components/PageHero/PageHero";
import SectionCTA from "../../components/SectionCTA/SectionCTA";
import { useTranslatedList } from "../../hooks/useTranslatedList";
import "../sharedPages.css";
import { HERO_IMAGES } from "../../config/heroImages";

const Solutions = () => {
 const {t}=useTranslation();
 const features=useTranslatedList<string>("solutions.main.features");
 const uses=useTranslatedList<string>("solutions.use.items");
 const icons=[Zap,TrainFront,Hospital,Factory,Factory,Factory];
 return <main>
  <PageHero eyebrow={t("solutions.hero.eyebrow")} title={t("solutions.hero.title")} text={t("solutions.hero.text")} image={HERO_IMAGES.solutions} />
  <section className="content-section"><div className="site-container two-column two-column--center"><div className="copy-block"><div className="section-eyebrow"><span />{t("solutions.main.eyebrow")}</div><h2>{t("solutions.main.title")}</h2><p>{t("solutions.main.text")}</p><ul className="check-list">{features.map(feature=><li key={feature}><span className="check-list__icon"><Check size={14}/></span>{feature}</li>)}</ul></div><div className="dark-panel"><span className="dark-panel__label">CABLE SOLUTION</span><div className="dark-panel__big dark-panel__big--medium">LSLTx</div><p>{t("solutions.main.panel")}</p></div></div></section>
  <section className="content-section content-section--soft"><div className="site-container two-column two-column--center"><div className="dark-panel"><span className="dark-panel__label">MATERIAL PLATFORM</span><div className="dark-panel__big">µ</div><p>{t("solutions.materials.panel")}</p></div><div className="copy-block"><div className="section-eyebrow"><span />{t("solutions.materials.eyebrow")}</div><h2>{t("solutions.materials.title")}</h2><p>{t("solutions.materials.text")}</p></div></div></section>
  <section className="content-section"><div className="site-container"><div className="section-heading"><div><div className="section-eyebrow"><span />{t("solutions.use.eyebrow")}</div><h2>{t("solutions.use.title")}</h2></div></div><div className="cards-3">{uses.map((use,index)=>{const Icon=icons[index]??Factory;return <article className="info-card" key={use}><div className="info-card__icon"><Icon size={24}/></div><h3>{use}</h3><p>{t("solutions.use.cardText")}</p></article>})}</div></div></section>
  <SectionCTA />
 </main>;
};
export default Solutions;
