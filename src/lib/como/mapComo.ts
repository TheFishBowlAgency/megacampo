import type { Como as ComoGlobal } from "@/payload-types";

import { DEFAULT_COMO } from "./defaults";
import type { ComoContent, ComoStepIcon } from "./types";

const STEP_ICONS: ComoStepIcon[] = ["hand", "checklist", "calendar"];

function isStepIcon(value: unknown): value is ComoStepIcon {
  return (
    typeof value === "string" && STEP_ICONS.includes(value as ComoStepIcon)
  );
}

export function mapComoGlobal(doc: ComoGlobal | null | undefined): ComoContent {
  if (!doc) {
    return DEFAULT_COMO;
  }

  const steps =
    doc.howItWorks?.steps
      ?.filter(
        (step) =>
          step?.stepLabel &&
          step?.title &&
          step?.description &&
          step?.link?.label &&
          step?.link?.href &&
          isStepIcon(step.icon),
      )
      .map((step) => ({
        stepLabel: step.stepLabel!,
        title: step.title!,
        description: step.description!,
        link: {
          label: step.link!.label!,
          href: step.link!.href!,
        },
        icon: step.icon as ComoStepIcon,
      })) ?? [];

  const faqItems =
    doc.faq?.items
      ?.filter((item) => item?.question && item?.answer)
      .map((item) => ({
        question: item.question!,
        answer: item.answer!,
      })) ?? [];

  return {
    hero: {
      heading: doc.hero?.heading?.trim() || DEFAULT_COMO.hero.heading,
      description:
        doc.hero?.description?.trim() || DEFAULT_COMO.hero.description,
      cta: {
        label: doc.hero?.cta?.label?.trim() || DEFAULT_COMO.hero.cta.label,
        href: doc.hero?.cta?.href?.trim() || DEFAULT_COMO.hero.cta.href,
      },
    },
    howItWorks: {
      heading:
        doc.howItWorks?.heading?.trim() || DEFAULT_COMO.howItWorks.heading,
      steps: steps.length > 0 ? steps : DEFAULT_COMO.howItWorks.steps,
    },
    cta: {
      heading: doc.cta?.heading?.trim() || DEFAULT_COMO.cta.heading,
      button: {
        label: doc.cta?.button?.label?.trim() || DEFAULT_COMO.cta.button.label,
        href: doc.cta?.button?.href?.trim() || DEFAULT_COMO.cta.button.href,
      },
    },
    faq: {
      heading: doc.faq?.heading?.trim() || DEFAULT_COMO.faq.heading,
      items: faqItems.length > 0 ? faqItems : DEFAULT_COMO.faq.items,
    },
  };
}
