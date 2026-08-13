import { FAQSection, Footer } from "@/components/landing";
import { PageHero } from "@/components/layout";
import type { EventDetail } from "@/lib/events/types";

import { EventPackagesFlow } from "./EventPackagesFlow";
import { EventQuoteTestimonials } from "./EventQuoteTestimonials";

type EventDetailContentProps = {
  event: EventDetail;
};

export function EventDetailContent({ event }: EventDetailContentProps) {
  return (
    <main>
      <PageHero title={event.title} backgroundImageSrc={event.imageSrc} />
      <EventPackagesFlow
        activityHeading={event.activityHeading}
        activityDescription={event.activityDescription}
        activities={event.activityChoices}
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
