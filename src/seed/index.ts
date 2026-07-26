import { getPayload } from "payload";

import config from "@payload-config";

import { runBlogSeed } from "./seedBlog";
import { runCatalogSeed } from "./seedCatalog";
import { runCenariosSeed } from "./seedCenarios";
import { runComoSeed } from "./seedComo";
import { runHomeSeed } from "./seedHome";
import { runSiteShellSeed } from "./seedSiteShell";
import { runTestimonialsSeed } from "./seedTestimonials";

async function main(): Promise<void> {
  const payload = await getPayload({ config });

  try {
    await runSiteShellSeed(payload);
    await runTestimonialsSeed(payload);
    await runHomeSeed(payload);
    await runBlogSeed(payload);
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
