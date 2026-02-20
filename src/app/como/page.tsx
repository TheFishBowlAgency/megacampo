import { Header } from "@/components/header";
import { FAQSection, CTASection, Footer } from "@/components/landing";
import { PageHero } from "@/components/layout";
import {
  HowItWorksSection,
  HandPointingIcon,
  ChecklistIcon,
  CalendarCheckIcon,
} from "@/components/como";
import type { HowItWorksStep } from "@/components/como";

const HERO_TITLE = "Visita o Megacampo";
const HERO_SUBTITLE =
  "Vem jogar em 12 mapas cinematográficos. Quer sejas iniciante ou profissional, temos atividades para todas as idades e níveis de experiência.";

const STEPS: HowItWorksStep[] = [
  {
    stepNumber: 1,
    stepLabel: "Primeiro passo",
    title: "Escolhe a tua experiência",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    linkText: "Ver mais",
    href: "/eventos",
    icon: <HandPointingIcon />,
  },
  {
    stepNumber: 2,
    stepLabel: "Segundo passo",
    title: "Planeia a tua visita",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    linkText: "Ver mais",
    href: "/cenarios",
    icon: <ChecklistIcon />,
  },
  {
    stepNumber: 3,
    stepLabel: "Terceiro passo",
    title: "Marca a tua visita",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    linkText: "Ver mais",
    href: "/#reservas",
    icon: <CalendarCheckIcon />,
  },
];

export default function ComoPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title={HERO_TITLE}
          subtitle={HERO_SUBTITLE}
          cta={{ label: "Reserva já", href: "/#reservas" }}
        />

        <HowItWorksSection steps={STEPS} />

        <CTASection
          heading="Pronto para uma aventura?"
          buttonText="Reserva já"
          href="/#reservas"
        />

        <FAQSection id="faq" heading="Perguntas frequentes" variant="subtle" />
        <Footer />
      </main>
    </>
  );
}
