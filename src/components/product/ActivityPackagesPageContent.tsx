import { Box } from "@chakra-ui/react";
import { Header } from "@/components/header";
import { EventQuoteTestimonials } from "@/components/eventos";
import { FAQSection, Footer } from "@/components/landing";
import { PageHero } from "@/components/layout";
import { ProductHighlightStrip } from "@/components/product/ProductHighlightStrip";
import { ProductPricingSection } from "@/components/product/ProductPricingSection";
import type { PackageCardItem } from "@/lib/catalog/types";
import type { EventQuote } from "@/lib/events/types";
import { DEFAULT_TESTIMONIALS_HEADING } from "@/lib/testimonials/defaults";

export interface ActivityPackagesPageContentProps {
  title: string;
  /** Banner title — defaults to `title` when there's no distinct category name (e.g. flat activities). */
  heroTitle?: string;
  description?: string | null;
  /** CMS highlight chips under the hero. */
  highlights: string[];
  /** CMS hero underlay (category → activity). Empty → solid `bg.hero` grey. */
  heroBackgroundImageSrc?: string;
  packages: PackageCardItem[];
  activitySlug: string;
  /** When set, package cards link to the 3-level atividades path. */
  categorySlug?: string;
  testimonials?: EventQuote[];
  testimonialsHeading?: string;
}

export function ActivityPackagesPageContent({
  title,
  heroTitle,
  description,
  highlights,
  heroBackgroundImageSrc,
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
          title={heroTitle ?? title}
          backgroundImageSrc={heroBackgroundImageSrc}
        />
        <ProductHighlightStrip
          highlights={highlights.map((label) => ({ label }))}
        />
        <Box bg="#fff">
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
