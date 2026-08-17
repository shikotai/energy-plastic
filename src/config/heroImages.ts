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
 * The photos below are served by Pexels and are listed as free to use on
 * their source pages. `sourcePage` and `credit` are kept here for easy
 * attribution/reference during future site maintenance.
 */
export const HERO_IMAGES: Record<
  "about" | "technology" | "solutions" | "project" | "team" | "news" | "contacts",
  HeroImage
> = {
  about: {
    src: "https://images.pexels.com/photos/3735741/pexels-photo-3735741.jpeg?auto=compress&cs=tinysrgb&w=1400&h=950&fit=crop",
    objectPosition: "center",
    sourcePage: "https://www.pexels.com/photo/laboratory-interior-3735741/",
    credit: "Polina Tankilevitch / Pexels",
  },
  technology: {
    src: "https://images.pexels.com/photos/6129873/pexels-photo-6129873.jpeg?auto=compress&cs=tinysrgb&w=1400&h=950&fit=crop",
    objectPosition: "center",
    sourcePage: "https://www.pexels.com/photo/close-up-photo-of-laboratory-glass-samples-6129873/",
    credit: "RDNE Stock project / Pexels",
  },
  solutions: {
    src: "https://images.pexels.com/photos/12951628/pexels-photo-12951628.jpeg?auto=compress&cs=tinysrgb&w=1400&h=950&fit=crop",
    objectPosition: "center",
    sourcePage: "https://www.pexels.com/photo/metal-cables-in-a-metal-box-12951628/",
    credit: "Alex Urezkov / Pexels",
  },
  project: {
    src: "https://images.pexels.com/photos/9754820/pexels-photo-9754820.jpeg?auto=compress&cs=tinysrgb&w=1400&h=950&fit=crop",
    objectPosition: "center",
    sourcePage: "https://www.pexels.com/photo/close-up-shot-of-black-wires-9754820/",
    credit: "Jonathan Cooper / Pexels",
  },
  team: {
    src: "https://images.pexels.com/photos/7722612/pexels-photo-7722612.jpeg?auto=compress&cs=tinysrgb&w=1400&h=950&fit=crop",
    objectPosition: "center",
    sourcePage: "https://www.pexels.com/photo/photo-of-different-laboratory-equipment-s-7722612/",
    credit: "Tara Winstead / Pexels",
  },
  news: {
    src: "https://images.pexels.com/photos/18468536/pexels-photo-18468536.jpeg?auto=compress&cs=tinysrgb&w=1400&h=950&fit=crop",
    objectPosition: "center",
    sourcePage: "https://www.pexels.com/photo/power-distribution-substation-18468536/",
    credit: "Robert So / Pexels",
  },
  contacts: {
    src: "https://images.pexels.com/photos/5235481/pexels-photo-5235481.jpeg?auto=compress&cs=tinysrgb&w=1400&h=950&fit=crop",
    objectPosition: "center",
    sourcePage: "https://www.pexels.com/photo/high-voltage-lines-5235481/",
    credit: "Maor Attias / Pexels",
  },
};
