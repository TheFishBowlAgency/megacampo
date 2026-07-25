export type ScenarioCardItem = {
  id: string;
  title: string;
  href: string;
  imageSrc?: string;
};

export type CenariosContent = {
  hero: {
    /** Multi-line title; newlines become separate visual lines. */
    heading: string;
    description: string;
  };
  section: {
    heading: string;
    description: string;
  };
  scenarios: ScenarioCardItem[];
};
