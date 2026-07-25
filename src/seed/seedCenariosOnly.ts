import { getPayload } from "payload";

import config from "@payload-config";

import { runCenariosSeed } from "./seedCenarios";

async function main(): Promise<void> {
  const payload = await getPayload({ config });

  try {
    await runCenariosSeed(payload);
    process.exit(0);
  } catch (error) {
    console.error("Cenarios seed failed:", error);
    process.exit(1);
  }
}

void main();
