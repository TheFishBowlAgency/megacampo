import type { Payload } from "payload";

import { DEFAULT_COMO } from "@/lib/como/defaults";

export async function runComoSeed(payload: Payload): Promise<void> {
  const existing = await payload.findGlobal({
    slug: "como",
    depth: 0,
  });

  if (existing.hero?.heading) {
    payload.logger.info("Como global already populated — skipped");
    return;
  }

  await payload.updateGlobal({
    slug: "como",
    data: {
      hero: DEFAULT_COMO.hero,
      howItWorks: {
        heading: DEFAULT_COMO.howItWorks.heading,
        steps: DEFAULT_COMO.howItWorks.steps.map((step) => ({
          stepLabel: step.stepLabel,
          title: step.title,
          description: step.description,
          link: step.link,
          icon: step.icon,
        })),
      },
      cta: DEFAULT_COMO.cta,
      faq: DEFAULT_COMO.faq,
    },
  });

  payload.logger.info("Seeded como global");
}
