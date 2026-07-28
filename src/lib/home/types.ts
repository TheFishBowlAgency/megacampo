import type { EventCardItem } from "@/lib/events/types";

export type CtaLink = {
  label: string;
  href: string;
};

export type ParkFeatureIcon =
  | "tree"
  | "grill"
  | "shower"
  | "parking"
  | "coffee";
export type SafetyIcon = "briefing" | "shield" | "person" | "rules";

export type GalleryImage = {
  src: string;
  alt: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type HomeContent = {
  hero: {
    heading: string;
    description: string;
    cta: CtaLink;
    backgroundImageSrc: string;
  };
  keyFeatures: {
    items: string[];
  };
  adventure: {
    heading: string;
    showAllLabel: string;
  };
  maps: {
    heading: string;
    description: string;
    cta: CtaLink;
    backgroundImageSrc: string;
  };
  eventTypes: {
    heading: string;
    description: string;
    cardLinkLabel: string;
    events: EventCardItem[];
  };
  moreThanPaintball: {
    heading: string;
    description: string;
    imageSrc: string;
    features: { label: string; icon: ParkFeatureIcon }[];
  };
  safety: {
    heading: string;
    description: string;
    imageSrc: string;
    items: { label: string; icon: SafetyIcon }[];
  };
  testimonials: {
    heading: string;
    description: string;
    images: GalleryImage[];
    prevLabel: string;
    nextLabel: string;
  };
  cta: {
    heading: string;
    button: CtaLink;
  };
  faq: {
    heading: string;
    items: FaqItem[];
  };
};
