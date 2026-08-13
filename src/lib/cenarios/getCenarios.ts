import config from "@payload-config";
import { getPayload } from "payload";

import type { SiteLocale } from "@/i18n/site";
import { localeQuery } from "@/lib/site/localeQuery";

import { mapCenariosGlobal, mapScenarioDocs } from "./mapCenarios";
import type { CenariosContent } from "./types";

export async function getCenarios(
  locale: SiteLocale,
): Promise<CenariosContent> {
  const payload = await getPayload({ config });
  const localeOpts = localeQuery(locale);

  const [doc, { docs }] = await Promise.all([
    payload.findGlobal({ slug: "cenarios", depth: 1, ...localeOpts }),
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
      ...localeOpts,
    }),
  ]);

  return mapCenariosGlobal(doc, mapScenarioDocs(docs));
}
