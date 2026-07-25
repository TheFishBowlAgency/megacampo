export type CtaLink = {
  label: string;
  href: string;
};

export type ComoStepIcon = "hand" | "checklist" | "calendar";

export type ComoStep = {
  stepLabel: string;
  title: string;
  description: string;
  link: CtaLink;
  icon: ComoStepIcon;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ComoContent = {
  hero: {
    heading: string;
    description: string;
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
