import { Box } from "@chakra-ui/react";
import { Header } from "@/components/header";
import { EventQuoteTestimonials } from "@/components/eventos";
import { FAQSection, Footer, KeyFeatures } from "@/components/landing";
import { PageHero } from "@/components/layout";
import { ProductPricingSection } from "@/components/product/ProductPricingSection";
import { getActivityFeatures } from "@/lib/activities/landingDefaults";
import type { PackageCardItem } from "@/lib/catalog/types";
import type { EventQuote } from "@/lib/events/types";
import { DEFAULT_TESTIMONIALS_HEADING } from "@/lib/testimonials/defaults";

export interface ActivityPackagesPageContentProps {
  title: string;
  description?: string | null;
  packages: PackageCardItem[];
  activitySlug: string;
  /** When set, package cards link to the 3-level atividades path. */
  categorySlug?: string;
  testimonials?: EventQuote[];
  testimonialsHeading?: string;
}

export function ActivityPackagesPageContent({
  title,
  description,
  packages,
  activitySlug,
  categorySlug,
  testimonials,
  testimonialsHeading = DEFAULT_TESTIMONIALS_HEADING,
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
        <EventQuoteTestimonials
          heading={testimonialsHeading}
          quotes={testimonials}
        />
        <FAQSection
          id={`faq-${activitySlug}${categorySlug ? `-${categorySlug}` : ""}`}
          heading="Perguntas frequentes"
        />
        <Footer />
      </main>
    </>
  );
}
