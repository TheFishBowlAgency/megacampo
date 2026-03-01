/**
 * Category data for the /reservas/[slug] listing pages
 * and /reservas/[slug]/[productSlug] detail pages.
 */

export interface CategoryProduct {
  id: string;
  name: string;
  price: string;
  slug: string;
  imageSrc?: string;
}

export interface ProductExtra {
  id: string;
  name: string;
  price: string;
  imageSrc?: string;
}

export interface TimePeriod {
  label: string;
  value: string;
}

export const TIME_PERIODS: TimePeriod[] = [
  { label: "Manhã: 9h30-13h", value: "morning" },
  { label: "Tarde: 14h00-17h30", value: "afternoon" },
];

const PAINTBALL_EXTRAS: ProductExtra[] = [
  { id: "500-bolas", name: "500 Bolas", price: "35,00" },
  { id: "1000-bolas", name: "1000 Bolas", price: "55,00" },
  { id: "granada-tinta", name: "Granada de Tinta", price: "12,00" },
  { id: "fumo", name: "Granada de Fumo", price: "10,00" },
];

export interface Category {
  slug: string;
  name: string;
  products: CategoryProduct[];
  extras?: ProductExtra[];
}

const PAINTBALL_PRODUCTS: CategoryProduct[] = [
  { id: "commando", name: "Commando", price: "29,95", slug: "commando" },
  { id: "ranger", name: "Ranger", price: "34,95", slug: "ranger" },
  { id: "swat", name: "Swat", price: "49,95", slug: "swat" },
  { id: "elite", name: "Elite", price: "69,95", slug: "elite" },
];

export const CATEGORIES: Category[] = [
  {
    slug: "paintball",
    name: "Mega Paintball",
    products: PAINTBALL_PRODUCTS,
    extras: PAINTBALL_EXTRAS,
  },
  { slug: "insuflaveis", name: "Mega Insufláveis", products: [] },
  { slug: "aventura", name: "Mega Aventura", products: [] },
  { slug: "laser-tag", name: "Mega Laser Tag", products: [] },
  { slug: "airsoft", name: "Mega Airsoft", products: [] },
  { slug: "eventos", name: "Eventos", products: [] },
  { slug: "extras", name: "Mega Extras", products: [] },
];

export function getCategoryBySlug(slug: string): Category | null {
  return CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export function getProductBySlug(
  categorySlug: string,
  productSlug: string,
): { category: Category; product: CategoryProduct } | null {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return null;
  const product = category.products.find((p) => p.slug === productSlug);
  if (!product) return null;
  return { category, product };
}

export function getAllCategorySlugs(): string[] {
  return CATEGORIES.map((c) => c.slug);
}

export function getAllProductParams(): { slug: string; productSlug: string }[] {
  return CATEGORIES.flatMap((c) =>
    c.products.map((p) => ({ slug: c.slug, productSlug: p.slug })),
  );
}
