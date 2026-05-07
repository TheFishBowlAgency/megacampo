import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing";
import { getCategoryBySlug, getAllCategorySlugs } from "@/data/categories";
import { CategoryPageContent } from "./CategoryPageContent";

export interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

function CategoryFallback() {
  return (
    <>
      <Header />
      <main>
        <div
          style={{
            minHeight: "40vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          A carregar…
        </div>
      </main>
      <Footer />
    </>
  );
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  return (
    <Suspense fallback={<CategoryFallback />}>
      <CategoryPageContent category={category} />
    </Suspense>
  );
}
