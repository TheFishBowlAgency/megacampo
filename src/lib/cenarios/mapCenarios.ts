import type { Cenario as CenariosGlobal, Scenario } from "@/payload-types";

import { DEFAULT_CENARIOS, DEFAULT_SCENARIOS } from "./defaults";
import { mapScenarioToCardItem } from "./mapScenario";
import type { CenariosContent, ScenarioCardItem } from "./types";

export function mapScenarioDocs(
  docs: Scenario[] | null | undefined,
): ScenarioCardItem[] {
  if (!docs || docs.length === 0) {
    return DEFAULT_SCENARIOS;
  }

  const cards = docs
    .filter((doc) => doc.isActive !== false)
    .map(mapScenarioToCardItem);

  return cards.length > 0 ? cards : DEFAULT_SCENARIOS;
}

export function mapCenariosGlobal(
  doc: CenariosGlobal | null | undefined,
  scenarios: ScenarioCardItem[],
): CenariosContent {
  if (!doc) {
    return {
      ...DEFAULT_CENARIOS,
      scenarios,
    };
  }

  return {
    hero: {
      heading: doc.hero?.heading?.trim() || DEFAULT_CENARIOS.hero.heading,
      description:
        doc.hero?.description?.trim() || DEFAULT_CENARIOS.hero.description,
    },
    section: {
      heading: doc.section?.heading?.trim() || DEFAULT_CENARIOS.section.heading,
      description:
        doc.section?.description?.trim() ||
        DEFAULT_CENARIOS.section.description,
    },
    scenarios,
  };
}
