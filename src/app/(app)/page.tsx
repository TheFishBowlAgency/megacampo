import { Header } from "@/components/header";
import {
  AdventureSection,
  CTASection,
  EventTypesSection,
  FAQSection,
  Footer,
  Hero,
  KeyFeatures,
  MapsSection,
  MoreThanPaintballSection,
  SafetySection,
  TestimonialsSection,
} from "@/components/landing";
import { getActivities } from "@/lib/activities/getActivities";
import { getHome } from "@/lib/home/getHome";
import { getRequestLocale } from "@/i18n/site";

export default async function HomePage() {
  const locale = await getRequestLocale();
  const [home, activities] = await Promise.all([
    getHome(locale),
    getActivities(),
  ]);

  return (
    <>
      <Header />
      <main>
        <Hero content={home.hero} />
        <KeyFeatures items={home.keyFeatures.items} />
        <AdventureSection
          heading={home.adventure.heading}
          showAllLabel={home.adventure.showAllLabel}
          activities={activities}
        />
        <MapsSection content={home.maps} />
        <EventTypesSection
          heading={home.eventTypes.heading}
          description={home.eventTypes.description}
          cardLinkLabel={home.eventTypes.cardLinkLabel}
          events={home.eventTypes.events}
        />
        <MoreThanPaintballSection content={home.moreThanPaintball} />
        <SafetySection content={home.safety} />
        <TestimonialsSection
          heading={home.testimonials.heading}
          subheading={home.testimonials.description}
          images={home.testimonials.images}
          prevLabel={home.testimonials.prevLabel}
          nextLabel={home.testimonials.nextLabel}
        />
        <CTASection
          heading={home.cta.heading}
          buttonText={home.cta.button.label}
          href={home.cta.button.href}
        />
        <FAQSection heading={home.faq.heading} items={home.faq.items} />
        <Footer />
      </main>
    </>
  );
}
