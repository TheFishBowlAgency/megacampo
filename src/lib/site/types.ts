export type NavLink = {
  label: string;
  href: string;
};

export type HeaderContent = {
  logoSrc: string;
  logoAlt: string;
  topBar: {
    contactLabel: string;
    phone: string;
  };
  navLinks: NavLink[];
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
