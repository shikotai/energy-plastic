import "./PageHero.css";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  text: string;
};

const PageHero = ({ eyebrow, title, text }: PageHeroProps) => (
  <section className="page-hero">
    <div className="site-container page-hero__grid">
      <div className="page-hero__content">
        <div className="section-eyebrow"><span />{eyebrow}</div>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>

      <div className="page-hero__visual" aria-hidden="true">
        <div className="page-hero__orb page-hero__orb--a" />
        <div className="page-hero__orb page-hero__orb--b" />
        <div className="page-hero__gridlines" />
        <span>ENERGY PLASTIC</span>
      </div>
    </div>
  </section>
);

export default PageHero;
