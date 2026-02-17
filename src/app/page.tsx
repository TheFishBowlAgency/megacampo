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

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <KeyFeatures />
        <AdventureSection />
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
