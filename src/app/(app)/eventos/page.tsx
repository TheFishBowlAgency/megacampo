import { Header } from "@/components/header";
import { EventsListingSection } from "@/components/eventos";
import { Footer } from "@/components/landing";
import { PageHero } from "@/components/layout";
import { getEvents, getEventsCopy } from "@/lib/events/getEvents";
import { getRequestLocale } from "@/i18n/site";

export default async function EventosPage() {
  const locale = await getRequestLocale();
  const [events, copy] = await Promise.all([
    getEvents(locale),
    getEventsCopy(locale),
  ]);

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={copy.heroTitle}
          backgroundImageSrc={copy.heroBackgroundImageSrc}
        />
        <EventsListingSection
          heading={copy.sectionHeading}
          cardLinkLabel={copy.cardLinkLabel}
          events={events}
        />
        <Footer />
      </main>
    </>
  );
}
