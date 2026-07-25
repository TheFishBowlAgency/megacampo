import { getPayload } from "payload";

import config from "@payload-config";

import { runHomeSeed } from "./seedHome";

async function main(): Promise<void> {
  const payload = await getPayload({ config });

  try {
    await runHomeSeed(payload);
    process.exit(0);
  } catch (error) {
    console.error("Home seed failed:", error);
    process.exit(1);
  }
}

void main();
