import config from "@payload-config";
import { getPayload } from "payload";

import type { SiteLocale } from "@/i18n/site";
import { localeQuery } from "./localeQuery";
import { mapFooterGlobal, mapHeaderGlobal } from "./mapGlobals";
import type { FooterContent, HeaderContent } from "./types";

export type SiteShell = {
  header: HeaderContent;
  footer: FooterContent;
};

export async function getSiteShell(locale: SiteLocale): Promise<SiteShell> {
  const payload = await getPayload({ config });
  const localeOpts = localeQuery(locale);

  const [headerDoc, footerDoc] = await Promise.all([
    payload.findGlobal({ slug: "header", depth: 1, ...localeOpts }),
    payload.findGlobal({ slug: "footer", depth: 1, ...localeOpts }),
  ]);

  return {
    header: mapHeaderGlobal(headerDoc),
    footer: mapFooterGlobal(footerDoc),
  };
}
