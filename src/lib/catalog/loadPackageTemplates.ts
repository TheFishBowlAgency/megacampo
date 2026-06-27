import config from "@payload-config";
import { getPayload } from "payload";

import type { Package } from "@/payload-types";

import { type PackageDoc, toPackageDoc } from "./packageDoc";

export async function loadPackageTemplates(
  rootPackage: Package,
): Promise<Map<string, PackageDoc>> {
  const payload = await getPayload({ config });
  const byId = new Map<string, PackageDoc>();
  const pending = new Set<string>();

  const queueTemplate = (value: Package["templatePackage"]) => {
    if (!value) return;
    const id = typeof value === "string" ? value : value.id;
    pending.add(id);
  };

  queueTemplate(rootPackage.templatePackage);

  while (pending.size > 0) {
    const batch = [...pending];
    pending.clear();

    const { docs } = await payload.find({
      collection: "packages",
      where: {
        id: {
          in: batch,
        },
      },
      depth: 3,
      limit: batch.length,
      pagination: false,
    });

    for (const doc of docs) {
      byId.set(doc.id, toPackageDoc(doc));
      queueTemplate(doc.templatePackage);
    }
  }

  return byId;
}
