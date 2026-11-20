import aboutImage from "../assets/hero/about.webp";
import contactsImage from "../assets/hero/contacts.webp";
import newsImage from "../assets/hero/news.webp";
import solutionsImage from "../assets/hero/solutions.webp";
import teamImage from "../assets/hero/team.webp";
import technologyImage from "../assets/hero/technology.webp";

export type HeroImage = {
  src: string;
  objectPosition?: string;
  sourcePage: string;
  credit: string;
};

/**
 * Hero photography is kept in one place so images can be swapped later
 * without editing individual page components.
 *
 * The photos are stored locally in src/assets/hero (WebP, 1400×950), so the
 * site does not depend on an external image host. They come from Pexels and
 * are free to use; `sourcePage` and `credit` are kept for attribution.
 */
export const HERO_IMAGES: Record<
  "about" | "technology" | "solutions" | "project" | "team" | "news" | "contacts",
  HeroImage
> = {
  about: {
    src: aboutImage,
    objectPosition: "center",
    sourcePage: "https://www.pexels.com/photo/laboratory-interior-3735741/",
    credit: "Polina Tankilevitch / Pexels",
  },
  technology: {
    src: technologyImage,
    objectPosition: "center",
    sourcePage: "https://www.pexels.com/photo/close-up-shot-of-black-wires-9754820/",
    credit: "Jonathan Cooper / Pexels",
  },
  solutions: {
    src: solutionsImage,
    objectPosition: "center",
    sourcePage: "https://www.pexels.com/photo/metal-cables-in-a-metal-box-12951628/",
    credit: "Alex Urezkov / Pexels",
  },
  project: {
    src: technologyImage,
    objectPosition: "center",
    sourcePage: "https://www.pexels.com/photo/close-up-shot-of-black-wires-9754820/",
    credit: "Jonathan Cooper / Pexels",
  },
  team: {
    src: teamImage,
    objectPosition: "center",
    sourcePage: "https://www.pexels.com/photo/photo-of-different-laboratory-equipment-s-7722612/",
    credit: "Tara Winstead / Pexels",
  },
  news: {
    src: newsImage,
    objectPosition: "center",
    sourcePage: "https://www.pexels.com/photo/power-distribution-substation-18468536/",
    credit: "Robert So / Pexels",
  },
  contacts: {
    src: contactsImage,
    objectPosition: "center",
    sourcePage: "https://www.pexels.com/photo/high-voltage-lines-5235481/",
    credit: "Maor Attias / Pexels",
  },
};
