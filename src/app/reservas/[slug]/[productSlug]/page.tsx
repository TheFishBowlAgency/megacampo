import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing";
import { getProductBySlug, getAllProductParams } from "@/data/categories";
import { ProductDetailContent } from "./ProductDetailContent";

export interface ProductPageProps {
  params: Promise<{ slug: string; productSlug: string }>;
}

export function generateStaticParams() {
  return getAllProductParams();
}

function ProductFallback() {
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

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug, productSlug } = await params;
  const result = getProductBySlug(slug, productSlug);
  if (!result) notFound();

  return (
    <Suspense fallback={<ProductFallback />}>
      <ProductDetailContent
        category={result.category}
        product={result.product}
      />
    </Suspense>
  );
}
