import {
  ACTIVITY_CARD_IMAGE_AIRSOFT,
  ACTIVITY_CARD_IMAGE_LASERTAG,
  ACTIVITY_CARD_IMAGE_PAINTBALL,
} from "@/data/activityCardMedia";
import { slugify } from "@/lib/slugify";

import type { CenariosContent, ScenarioCardItem } from "./types";

const SCENARIO_PLACEHOLDER_IMAGES = [
  ACTIVITY_CARD_IMAGE_PAINTBALL,
  ACTIVITY_CARD_IMAGE_AIRSOFT,
  ACTIVITY_CARD_IMAGE_LASERTAG,
] as const;

const SCENARIO_TITLES = [
  "IRAQUE",
  "WILD WEST",
  "FORTE APACHE",
  "VIETNAME",
  "STONEHENGE",
  "TRINCHEIRAS",
  "TEMPLO PERDIDO",
  "BIDDONBALL",
  "CONGO",
  "SUP'AIR BALL",
  "SUP'AIR BALL 2",
  "DESERTO",
] as const;

export const DEFAULT_SCENARIOS: ScenarioCardItem[] = SCENARIO_TITLES.map(
  (title, index) => {
    const slug = slugify(title);
    return {
      id: slug,
      title,
      href: `#${slug}`,
      imageSrc: SCENARIO_PLACEHOLDER_IMAGES[index % 3],
    };
  },
);

/** Fallback card images by scenario slug when Media is not set. */
export const SCENARIO_IMAGE_FALLBACKS: Record<string, string> =
  Object.fromEntries(
    DEFAULT_SCENARIOS.map((scenario) => [
      scenario.id,
      scenario.imageSrc ?? SCENARIO_PLACEHOLDER_IMAGES[0],
    ]),
  );

export const DEFAULT_CENARIOS: CenariosContent = {
  hero: {
    heading: "MAPAS\nMUNDIALMENTE\nFAMOSOS",
    description: "Experiência 12 mapas em 40 hectares de cenários imersivos!",
  },
  section: {
    heading: "CADA MAPA UMA AVENTURA",
    description:
      "De aniversários a grandes eventos de empresa, temos experiências à medida para o teu grupo!",
  },
  scenarios: DEFAULT_SCENARIOS,
};
