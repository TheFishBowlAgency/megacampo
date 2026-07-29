import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Figma step illustrations for Como (nodes 608:16980 / 16983 / 17006).
 * Icons are code-owned — not CMS-driven.
 */
export function HandPointingIcon({ alt = "" }: { alt?: string }) {
  return (
    <Image
      src="/images/como/step-hand.png"
      alt={alt}
      width={219}
      height={296}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  );
}

export function ChecklistIcon({ alt = "" }: { alt?: string }) {
  return (
    <Image
      src="/images/como/step-checklist.png"
      alt={alt}
      width={296}
      height={296}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  );
}

export function CalendarCheckIcon({ alt = "" }: { alt?: string }) {
  return (
    <Image
      src="/images/como/step-calendar.png"
      alt={alt}
      width={296}
      height={296}
      style={{ width: "100%", height: "100%", objectFit: "contain" }}
    />
  );
}

const STEP_ICON_COMPONENTS = [
  HandPointingIcon,
  ChecklistIcon,
  CalendarCheckIcon,
] as const;

/** Resolve the Figma icon for a step by 0-based index (cycles past 3). */
export function getComoStepIcon(index: number): ReactNode {
  const Icon = STEP_ICON_COMPONENTS[index % STEP_ICON_COMPONENTS.length];
  return <Icon />;
}
