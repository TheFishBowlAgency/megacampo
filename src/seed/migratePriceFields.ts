import { getPayload } from "payload";
import type { MongooseAdapter } from "@payloadcms/db-mongodb";

import config from "@payload-config";
import { euroToCents } from "@/lib/pricing/cents";

type LegacyGroupExtraDoc = {
  _id: { toString(): string };
  name?: string;
  priceEur?: number | null;
  priceCents?: number | null;
};

async function migrateGroupExtras(): Promise<void> {
  const payload = await getPayload({ config });
  const connection = (payload.db as MongooseAdapter).connection;
  const collection = connection?.db?.collection("group-extras");

  if (!collection) {
    throw new Error("Could not access group-extras MongoDB collection.");
  }

  const docs = (await collection
    .find({})
    .toArray()) as unknown as LegacyGroupExtraDoc[];

  let migrated = 0;

  for (const doc of docs) {
    if (doc.priceCents != null) {
      continue;
    }

    if (doc.priceEur == null) {
      console.warn(`Skipping group extra ${doc._id}: no price found`);
      continue;
    }

    await payload.update({
      collection: "group-extras",
      id: String(doc._id),
      data: {
        priceCents: euroToCents(doc.priceEur),
      },
      overrideAccess: true,
    });

    migrated += 1;
    console.log(
      `Migrated group extra "${doc.name ?? doc._id}": ${doc.priceEur} EUR -> ${euroToCents(doc.priceEur)} cents`,
    );
  }

  console.log(`Group extras migration complete (${migrated} updated).`);
}

async function main(): Promise<void> {
  try {
    await migrateGroupExtras();
    process.exit(0);
  } catch (error) {
    console.error("Price field migration failed:", error);
    process.exit(1);
  }
}

void main();
