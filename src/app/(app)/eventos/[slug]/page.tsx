import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { EventSimpleDetailContent } from "@/components/eventos";
import { getEventBySlug } from "@/lib/events/getEventBySlug";
import { getAllEventSlugs } from "@/lib/events/getEvents";

export interface EventPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  return (
    <>
      <Header />
      <EventSimpleDetailContent event={event} />
    </>
  );
}
