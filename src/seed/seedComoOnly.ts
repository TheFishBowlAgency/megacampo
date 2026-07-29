import { getPayload } from "payload";

import config from "@payload-config";

import { runComoSeed } from "./seedComo";

async function main(): Promise<void> {
  const payload = await getPayload({ config });

  try {
    await runComoSeed(payload);
    process.exit(0);
  } catch (error) {
    console.error("Como seed failed:", error);
    process.exit(1);
  }
}

void main();
