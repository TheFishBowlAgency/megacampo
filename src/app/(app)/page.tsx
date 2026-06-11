import { Header } from '@/components/header';
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
} from '@/components/landing';
import { getActivities } from '@/lib/activities/getActivities';

export default async function Home() {
  const activities = await getActivities();

  return (
    <>
      <Header />
      <main>
        <Hero />
        <KeyFeatures />
        <AdventureSection activities={activities} />
        <MapsSection />
        <EventTypesSection />
        <MoreThanPaintballSection />
        <SafetySection />
        <TestimonialsSection />
        <CTASection />
        <FAQSection />
        <Footer />
      </main>
    </>
  );
}
