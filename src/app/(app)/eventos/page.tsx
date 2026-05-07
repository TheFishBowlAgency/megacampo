import { Header } from "@/components/header";
import { ActivityChoiceSection, PricingSection } from "@/components/eventos";
import { FAQSection, Footer, TestimonialsSection } from "@/components/landing";
import { PageHero } from "@/components/layout";

export default function EventosPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero title="Evento de empresa" />
        <ActivityChoiceSection />
        <PricingSection />
        <TestimonialsSection
          heading="O que dizem os nossos clientes?"
          subheading="Descubra o que dizem quem já viveu a aventura."
        />
        <FAQSection id="faq-eventos" heading="Perguntas frequentes" />
        <Footer />
      </main>
    </>
  );
}
