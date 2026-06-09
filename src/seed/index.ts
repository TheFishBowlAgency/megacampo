import { getPayload } from "payload";

import config from "@payload-config";

import { runCatalogSeed } from "./seedCatalog";

async function main(): Promise<void> {
  const payload = await getPayload({ config });

  try {
    await runCatalogSeed(payload);
    process.exit(0);
  } catch (error) {
    console.error("Catalog seed failed:", error);
    process.exit(1);
  }
}

void main();
