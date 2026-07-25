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
import { getComo } from "@/lib/como/getComo";
import type { ComoStepIcon } from "@/lib/como/types";
import type { ReactNode } from "react";

const STEP_ICONS: Record<ComoStepIcon, ReactNode> = {
  hand: <HandPointingIcon />,
  checklist: <ChecklistIcon />,
  calendar: <CalendarCheckIcon />,
};

export default async function ComoPage() {
  const como = await getComo();

  const steps: HowItWorksStep[] = como.howItWorks.steps.map((step, index) => ({
    stepNumber: index + 1,
    stepLabel: step.stepLabel,
    title: step.title,
    description: step.description,
    linkText: step.link.label,
    href: step.link.href,
    icon: STEP_ICONS[step.icon],
  }));

  return (
    <>
      <Header />
      <main>
        <PageHero
          title={como.hero.heading}
          subtitle={como.hero.description}
          cta={{ label: como.hero.cta.label, href: como.hero.cta.href }}
          heroBg="bg.hero"
          titleTextStyle="h1.molot"
        />

        <HowItWorksSection heading={como.howItWorks.heading} steps={steps} />

        <CTASection
          heading={como.cta.heading}
          buttonText={como.cta.button.label}
          href={como.cta.button.href}
        />

        <FAQSection
          id="faq"
          heading={como.faq.heading}
          variant="subtle"
          items={como.faq.items}
        />
        <Footer />
      </main>
    </>
  );
}
