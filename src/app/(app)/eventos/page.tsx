import { Header } from "@/components/header";
import { EventsListingSection } from "@/components/eventos";
import { Footer } from "@/components/landing";
import { PageHero } from "@/components/layout";
import { DEFAULT_EVENT_LISTING } from "@/lib/events/defaults";
import { getEvents } from "@/lib/events/getEvents";

export default async function EventosPage() {
  const events = await getEvents();

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={DEFAULT_EVENT_LISTING.heroTitle}
          titleTextStyle="h1.molot"
          minH={{ base: "320px", md: "480px", xl: "800px" }}
        />
        <EventsListingSection
          heading={DEFAULT_EVENT_LISTING.sectionHeading}
          cardLinkLabel={DEFAULT_EVENT_LISTING.cardLinkLabel}
          events={events}
        />
        <Footer />
      </main>
    </>
  );
}
