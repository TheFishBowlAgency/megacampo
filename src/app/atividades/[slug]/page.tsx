import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/landing";
import { PageHero } from "@/components/layout";
import {
  ProductHighlightStrip,
  ProductPricingSection,
  ProductTestimonialsSection,
} from "@/components/product";
import { FAQSection } from "@/components/landing";
import { getProductBySlug, getAllProductSlugs } from "@/data/products";

export interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  return (
    <>
      <Header />
      <main>
        <PageHero title={product.title} />
        <ProductHighlightStrip highlights={product.highlights} />
        <ProductPricingSection
          sectionTitle={product.sectionTitle}
          sectionDescription={product.sectionDescription}
          packages={product.packages}
        />
        <ProductTestimonialsSection
          heading={product.testimonialsHeading}
          testimonials={product.testimonials}
        />
        <FAQSection
          id="faq"
          heading={product.faqHeading}
          variant="default"
          items={product.faqItems}
        />
        <Footer />
      </main>
    </>
  );
}
