import type { Package } from "@/payload-types";

import type { PackageDoc } from "./resolvePackageConfig";

export function toPackageDoc(pkg: Package): PackageDoc {
  return {
    id: pkg.id,
    name: pkg.name,
    slug: pkg.slug,
    basePriceCents: pkg.basePriceCents,
    templatePackage: pkg.templatePackage ?? null,
    templateOverrides: pkg.templateOverrides ?? null,
    extraGroupConfigs: pkg.extraGroupConfigs ?? null,
  };
}

export type { PackageDoc };
