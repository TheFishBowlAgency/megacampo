import { notFound } from "next/navigation";
import {
  getActivityBySlug,
  getAllActivitySlugs,
} from "@/lib/activities/getActivityBySlug";
import {
  getReservasProductsByActivitySlug,
  getReservasSidebarItems,
} from "@/lib/reservas/getReservasProducts";
import { CategoryPageContent } from "./CategoryPageContent";

export interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllActivitySlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [activity, products, sidebarItems] = await Promise.all([
    getActivityBySlug(slug),
    getReservasProductsByActivitySlug(slug),
    getReservasSidebarItems(),
  ]);

  if (!activity) notFound();

  return (
    <CategoryPageContent
      category={{
        slug: activity.slug,
        name: activity.title,
        products,
      }}
      sidebarItems={sidebarItems}
    />
  );
}
