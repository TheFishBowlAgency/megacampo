import { Box } from "@chakra-ui/react";
import { Header } from "@/components/header";
import { EventQuoteTestimonials } from "@/components/eventos";
import { FAQSection, Footer, KeyFeatures } from "@/components/landing";
import { PageHero } from "@/components/layout";
import { ProductPricingSection } from "@/components/product/ProductPricingSection";
import { getActivityFeatures } from "@/lib/activities/landingDefaults";
import type { PackageCardItem } from "@/lib/catalog/types";

export interface ActivityPackagesPageContentProps {
  title: string;
  description?: string | null;
  packages: PackageCardItem[];
  activitySlug: string;
  /** When set, package cards link to the 3-level atividades path. */
  categorySlug?: string;
}

export function ActivityPackagesPageContent({
  title,
  description,
  packages,
  activitySlug,
  categorySlug,
}: ActivityPackagesPageContentProps) {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title={title}
          heroBg="bg.hero"
          titleTextStyle="h1.molot"
          minH={{ base: "320px", md: "480px", xl: "800px" }}
        />
        <KeyFeatures items={getActivityFeatures(activitySlug)} />
        <Box bg="bg.subtle">
          <ProductPricingSection
            sectionTitle={title}
            sectionDescription={description ?? ""}
            packages={packages}
            activitySlug={activitySlug}
            categorySlug={categorySlug}
          />
        </Box>
        <EventQuoteTestimonials />
        <FAQSection
          id={`faq-${activitySlug}${categorySlug ? `-${categorySlug}` : ""}`}
          heading="Perguntas frequentes"
        />
        <Footer />
      </main>
    </>
  );
}
