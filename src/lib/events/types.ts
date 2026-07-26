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

export type EventDetail = {
  id: string;
  slug: string;
  title: string;
  imageSrc?: string;
  /** Short blurb on listing cards + simple detail lead */
  description: string;
  /** Longer body copy on simple detail */
  body: string;
  activityHeading: string;
  activityDescription: string;
  reserveHref: string;
  packagesHref: string;
};
