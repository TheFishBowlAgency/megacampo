import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { EventSimpleDetailContent } from "@/components/eventos";
import { getEventBySlug } from "@/lib/events/getEventBySlug";
import { getAllEventSlugs, getEventsCopy } from "@/lib/events/getEvents";
import { getHome } from "@/lib/home/getHome";
import { getRequestLocale } from "@/i18n/site";

export interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const [event, copy, home] = await Promise.all([
    getEventBySlug(slug, locale),
    getEventsCopy(locale),
    getHome(locale),
  ]);
  if (!event) notFound();

  return (
    <>
      <Header />
      <EventSimpleDetailContent
        event={event}
        copy={copy}
        cta={{
          heading: home.cta.heading,
          buttonText: home.cta.button.label,
          href: home.cta.button.href || event.reserveHref,
        }}
        faq={{
          heading: home.faq.heading,
          items: home.faq.items,
        }}
      />
    </>
  );
}
