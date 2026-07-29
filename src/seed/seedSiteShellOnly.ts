import { getPayload } from "payload";

import config from "@payload-config";

import { runSiteShellSeed } from "./seedSiteShell";

async function main(): Promise<void> {
  const payload = await getPayload({ config });

  try {
    await runSiteShellSeed(payload);
    process.exit(0);
  } catch (error) {
    console.error("Site shell seed failed:", error);
    process.exit(1);
  }
}

void main();
