import config from "@payload-config";
import { getPayload } from "payload";

import { mapCenariosGlobal, mapScenarioDocs } from "./mapCenarios";
import type { CenariosContent } from "./types";

export async function getCenarios(): Promise<CenariosContent> {
  const payload = await getPayload({ config });

  const [doc, { docs }] = await Promise.all([
    payload.findGlobal({ slug: "cenarios", depth: 1 }),
    payload.find({
      collection: "scenarios",
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: "sort",
      depth: 1,
      limit: 100,
      pagination: false,
    }),
  ]);

  return mapCenariosGlobal(doc, mapScenarioDocs(docs));
}
