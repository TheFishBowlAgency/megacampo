import { getPayload } from "payload";

import config from "@payload-config";

import { runCatalogSeed } from "./seedCatalog";
import { runCenariosSeed } from "./seedCenarios";
import { runComoSeed } from "./seedComo";
import { runHomeSeed } from "./seedHome";
import { runSiteShellSeed } from "./seedSiteShell";

async function main(): Promise<void> {
  const payload = await getPayload({ config });

  try {
    await runSiteShellSeed(payload);
    await runHomeSeed(payload);
    await runComoSeed(payload);
    await runCenariosSeed(payload);
    await runCatalogSeed(payload);
    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
}

void main();
