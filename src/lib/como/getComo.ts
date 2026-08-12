import config from "@payload-config";
import { getPayload } from "payload";

import type { SiteLocale } from "@/i18n/site";
import { localeQuery } from "@/lib/site/localeQuery";

import { mapComoGlobal } from "./mapComo";
import type { ComoContent } from "./types";

export async function getComo(locale: SiteLocale): Promise<ComoContent> {
  const payload = await getPayload({ config });
  const doc = await payload.findGlobal({
    slug: "como",
    depth: 1,
    ...localeQuery(locale),
  });
  return mapComoGlobal(doc);
}
