import config from "@payload-config";
import { getPayload } from "payload";

import type { SiteLocale } from "@/i18n/site";
import { localeQuery } from "@/lib/site/localeQuery";

import { mapHomeGlobal } from "./mapHome";
import type { HomeContent } from "./types";

export async function getHome(locale: SiteLocale): Promise<HomeContent> {
  const payload = await getPayload({ config });
  const doc = await payload.findGlobal({
    slug: "home",
    depth: 2,
    ...localeQuery(locale),
  });
  return mapHomeGlobal(doc);
}
