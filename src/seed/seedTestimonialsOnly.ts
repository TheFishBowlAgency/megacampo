import { getPayload } from "payload";

import config from "@payload-config";

import { runTestimonialsSeed } from "./seedTestimonials";

async function main(): Promise<void> {
  const payload = await getPayload({ config });

  try {
    await runTestimonialsSeed(payload);
    process.exit(0);
  } catch (error) {
    console.error("Testimonials seed failed:", error);
    process.exit(1);
  }
}

void main();
