import { getPayload } from "payload";

import config from "@payload-config";

import { runBlogSeed } from "./seedBlog";

async function main(): Promise<void> {
  const payload = await getPayload({ config });

  try {
    await runBlogSeed(payload);
    process.exit(0);
  } catch (error) {
    console.error("Blog seed failed:", error);
    process.exit(1);
  }
}

void main();
