import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { EventDetailContent } from "@/components/eventos";
import { getEventBySlug } from "@/lib/events/getEventBySlug";
import { getAllEventSlugs } from "@/lib/events/getEvents";
import { getRequestLocale } from "@/i18n/site";

export interface EventPackagesPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function EventPackagesPage({
  params,
}: EventPackagesPageProps) {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const event = await getEventBySlug(slug, locale);
  if (!event) notFound();

  return (
    <>
      <Header />
      <EventDetailContent event={event} />
    </>
  );
}
