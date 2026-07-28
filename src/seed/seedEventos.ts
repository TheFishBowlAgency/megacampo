import type { Payload } from "payload";

import { DEFAULT_EVENT_LISTING } from "@/lib/events/defaults";

async function ensureEventosGlobal(payload: Payload): Promise<void> {
  const existing = await payload.findGlobal({ slug: "eventos", depth: 0 });

  const needsHero = !existing.hero?.heading;
  const needsDetail =
    !existing.detail?.backLabel?.trim() || !existing.detail?.shareLabel?.trim();

  if (!needsHero && !needsDetail) {
    payload.logger.info("Eventos global already populated — skipped");
    return;
  }

  await payload.updateGlobal({
    slug: "eventos",
    data: {
      ...(needsHero
        ? {
            hero: {
              heading: DEFAULT_EVENT_LISTING.heroTitle,
            },
            section: {
              heading: DEFAULT_EVENT_LISTING.sectionHeading,
              cardLinkLabel: DEFAULT_EVENT_LISTING.cardLinkLabel,
            },
          }
        : {}),
      detail: {
        backLabel:
          existing.detail?.backLabel?.trim() || DEFAULT_EVENT_LISTING.backLabel,
        shareLabel:
          existing.detail?.shareLabel?.trim() ||
          DEFAULT_EVENT_LISTING.shareLabel,
      },
    },
  });

  payload.logger.info("Seeded eventos global");
}

export async function runEventosSeed(payload: Payload): Promise<void> {
  await ensureEventosGlobal(payload);
}
