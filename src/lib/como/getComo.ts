import config from "@payload-config";
import { getPayload } from "payload";

import { mapComoGlobal } from "./mapComo";
import type { ComoContent } from "./types";

export async function getComo(): Promise<ComoContent> {
  const payload = await getPayload({ config });
  const doc = await payload.findGlobal({ slug: "como", depth: 0 });
  return mapComoGlobal(doc);
}
