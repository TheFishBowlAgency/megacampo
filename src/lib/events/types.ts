export type EventosCopy = {
  heroTitle: string;
  heroBackgroundImageSrc?: string;
  sectionHeading: string;
  cardLinkLabel: string;
  /** Back link on simple event detail */
  backLabel: string;
  /** Share row label on simple event detail */
  shareLabel: string;
};

export type EventActivityChoice = {
  id: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  features: string[];
  ageNote?: string;
  href: string;
};

export type EventCardItem = {
  id: string;
  slug: string;
  title: string;
  /** Simple detail page (listing → Ver mais) */
  href: string;
  /** Packages / Evento Empresa template (home → Ver pacotes) */
  packagesHref: string;
  imageSrc?: string;
  description?: string;
};

export type EventPricingPackage = {
  id: string;
  name: string;
  price: string;
  popular?: boolean;
  features: string[];
};

export type EventPricingTab = {
  id: string;
  label: string;
  packages: EventPricingPackage[];
};

export type EventQuote = {
  id: string;
  name: string;
  quote: string;
  imageSrc?: string;
  featured?: boolean;
  stars?: number;
};

export type EventDetail = {
  id: string;
  slug: string;
  title: string;
  imageSrc?: string;
  /** Short blurb on listing cards + simple detail lead */
  description: string;
  /** Longer body copy on simple detail (Lexical JSON or plain string) */
  body: unknown;
  activityHeading: string;
  activityDescription: string;
  activityChoices: EventActivityChoice[];
  reserveHref: string;
  reserveLabel: string;
  packagesHref: string;
  pricingTabs: EventPricingTab[];
  testimonialsHeading: string;
  testimonials: EventQuote[];
};
