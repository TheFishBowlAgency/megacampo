import config from "@payload-config";
import { getPayload } from "payload";

import { mapFooterGlobal, mapHeaderGlobal } from "./mapGlobals";
import type { FooterContent, HeaderContent } from "./types";

export type SiteShell = {
  header: HeaderContent;
  footer: FooterContent;
};

export async function getSiteShell(): Promise<SiteShell> {
  const payload = await getPayload({ config });

  const [headerDoc, footerDoc] = await Promise.all([
    payload.findGlobal({ slug: "header", depth: 1 }),
    payload.findGlobal({ slug: "footer", depth: 1 }),
  ]);

  return {
    header: mapHeaderGlobal(headerDoc),
    footer: mapFooterGlobal(footerDoc),
  };
}
