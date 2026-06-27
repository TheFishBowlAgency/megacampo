export interface PackageCardFeature {
  id: string;
  label: string;
}

/** Package card shown on category pricing grids. */
export interface PackageCardItem {
  id: string;
  /** URL segment for the package detail page, e.g. "commando". */
  slug: string;
  name: string;
  price: string;
  perPersonLabel?: string;
  popular?: boolean;
  features: PackageCardFeature[];
  ctaLabel?: string;
}
