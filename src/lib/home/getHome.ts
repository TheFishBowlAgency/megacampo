import config from "@payload-config";
import { getPayload } from "payload";

import { mapHomeGlobal } from "./mapHome";
import type { HomeContent } from "./types";

export async function getHome(): Promise<HomeContent> {
  const payload = await getPayload({ config });
  const doc = await payload.findGlobal({ slug: "home", depth: 2 });
  return mapHomeGlobal(doc);
}
