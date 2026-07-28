import type { SiteLocale } from "@/i18n/site";

export type NavLink = {
  label: string;
  href: string;
};

export type LanguageOption = {
  code: SiteLocale;
  label: string;
};

export type HeaderLabels = {
  languageSelectAria: string;
  openMenuAria: string;
  closeMenuAria: string;
  menuAria: string;
  searchAria: string;
  cartAria: string;
  bagLabel: string;
  searchLabel: string;
  cartHref: string;
};

export type HeaderSeo = {
  title: string;
  description: string;
};

export type HeaderContent = {
  logoSrc: string;
  logoAlt: string;
  topBar: {
    contactLabel: string;
    phone: string;
  };
  navLinks: NavLink[];
  mobileNavLinks: NavLink[];
  labels: HeaderLabels;
  languages: LanguageOption[];
  promoMessage: string;
  seo: HeaderSeo;
};

export type HoursRow = {
  label: string;
  value: string;
};

export type SocialLink = {
  platform: "facebook" | "instagram";
  url: string;
};

export type FooterContent = {
  logoSrc: string;
  logoAlt: string;
  contact: {
    title: string;
    phoneFixed: string;
    phoneMobile: string;
    phoneFixedNote: string;
    phoneMobileNote: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
  };
  hours: {
    title: string;
    rows: HoursRow[];
  };
  social: {
    title: string;
    links: SocialLink[];
  };
  legalLinks: NavLink[];
};
