import type { Media, Scenario } from "@/payload-types";

import { SCENARIO_IMAGE_FALLBACKS } from "./defaults";
import type { ScenarioCardItem } from "./types";

function resolveMediaUrl(image: Scenario["image"]): string | undefined {
  if (!image || typeof image === "string") {
    return undefined;
  }

  return (image as Media).url ?? undefined;
}

export function mapScenarioToCardItem(scenario: Scenario): ScenarioCardItem {
  return {
    id: scenario.id,
    title: scenario.title.toUpperCase(),
    href: `#${scenario.slug}`,
    imageSrc:
      resolveMediaUrl(scenario.image) ??
      SCENARIO_IMAGE_FALLBACKS[scenario.slug],
  };
}
