import type { HeroImage } from "../../config/heroImages";
import "./PageHero.css";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  text: string;
  image?: HeroImage;
};

const PageHero = ({ eyebrow, title, text, image }: PageHeroProps) => (
  <section className="page-hero">
    <div className="site-container page-hero__grid">
      <div className="page-hero__content">
        <div className="section-eyebrow"><span />{eyebrow}</div>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>

      <div className={`page-hero__visual ${image ? "page-hero__visual--image" : ""}`}>
        {image ? (
          <>
            <img
              className="page-hero__image"
              src={image.src}
              alt=""
              style={{ objectPosition: image.objectPosition || "center" }}
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
            />
            <div className="page-hero__image-overlay" aria-hidden="true" />
            <div className="page-hero__image-grid" aria-hidden="true" />
            <span className="page-hero__image-label">ENERGY PLASTIC</span>
          </>
        ) : (
          <>
            <div className="page-hero__orb page-hero__orb--a" />
            <div className="page-hero__orb page-hero__orb--b" />
            <div className="page-hero__gridlines" />
            <span className="page-hero__fallback-label">ENERGY PLASTIC</span>
          </>
        )}
      </div>
    </div>
  </section>
);

export default PageHero;
