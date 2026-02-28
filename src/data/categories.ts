/**
 * Category data for the /reservas/[slug] listing pages.
 */

export interface CategoryProduct {
  id: string;
  name: string;
  price: string;
  slug: string;
  imageSrc?: string;
}

export interface Category {
  slug: string;
  name: string;
  products: CategoryProduct[];
}

const PAINTBALL_PRODUCTS: CategoryProduct[] = [
  { id: "commando", name: "Commando", price: "29,95", slug: "commando" },
  { id: "ranger", name: "Ranger", price: "34,95", slug: "ranger" },
  { id: "swat", name: "Swat", price: "49,95", slug: "swat" },
  { id: "elite", name: "Elite", price: "69,95", slug: "elite" },
];

export const CATEGORIES: Category[] = [
  { slug: "paintball", name: "Mega Paintball", products: PAINTBALL_PRODUCTS },
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

export function getAllCategorySlugs(): string[] {
  return CATEGORIES.map((c) => c.slug);
}
