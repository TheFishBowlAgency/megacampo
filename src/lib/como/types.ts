export type CtaLink = {
  label: string;
  href: string;
};

export type ComoStep = {
  stepLabel: string;
  title: string;
  description: string;
  link: CtaLink;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ComoContent = {
  hero: {
    heading: string;
    description: string;
    backgroundImageSrc?: string;
    cta: CtaLink;
  };
  howItWorks: {
    heading: string;
    steps: ComoStep[];
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
