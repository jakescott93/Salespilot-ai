/**
 * Content model for the VELMONT sites.
 *
 * Everything a future CMS will own is typed here and supplied from
 * `src/content/*.ts`. Components render this model; swapping the source
 * for a headless CMS later means replacing the imports, not the pages.
 */

export type House = "automotive" | "horology";

export interface HeroMedia {
  /** Optional CMS-managed media. When absent, the composed scene renders. */
  imageSrc?: string;
  videoSrc?: string;
  alt?: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Mandate {
  index: string;
  maker: string;
  model: string;
  details: string[];
  status: string;
}

export interface ProcessStep {
  index: string;
  title: string;
  copy: string;
}

export interface HouseContent {
  house: House;
  descriptor: string;
  path: string;
  nav: NavItem[];
  cta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  hero: {
    media: HeroMedia;
    headline: string[];
    support: string;
  };
  difference: {
    headline: string[];
    intro: string;
    capabilities: string[];
  };
  mandates: {
    label: string;
    note: string;
    items: Mandate[];
  };
  process: {
    label: string;
    steps: ProcessStep[];
  };
  privateSection: {
    headline: string;
    intro: string;
    points: string[];
    cta: string;
  };
  trust: {
    headline: string[];
    points: { title: string; copy: string }[];
  };
  /**
   * Verified-proof placeholders. Left intentionally empty at launch —
   * populated only once claims (press, partners, accreditations) are real.
   */
  proof: { label: string; items: string[] };
}
