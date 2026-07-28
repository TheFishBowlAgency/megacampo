import { FAQSection, Footer } from "@/components/landing";
import { PageHero } from "@/components/layout";
import type { EventDetail } from "@/lib/events/types";

import { ActivityChoiceSection } from "./ActivityChoiceSection";
import { EventQuoteTestimonials } from "./EventQuoteTestimonials";
import { PricingSection } from "./PricingSection";

type EventDetailContentProps = {
  event: EventDetail;
};

export function EventDetailContent({ event }: EventDetailContentProps) {
  return (
    <main>
      <PageHero title={event.title} backgroundImageSrc={event.imageSrc} />
      <ActivityChoiceSection
        heading={event.activityHeading}
        description={event.activityDescription}
        activities={event.activityChoices}
      />
      <PricingSection
        tabs={event.pricingTabs}
        reserveHref={event.reserveHref}
      />
      <EventQuoteTestimonials
        heading={event.testimonialsHeading}
        quotes={event.testimonials}
      />
      <FAQSection id="faq-eventos" heading="Perguntas frequentes" />
      <Footer />
    </main>
  );
}
