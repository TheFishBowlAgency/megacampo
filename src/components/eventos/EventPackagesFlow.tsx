"use client";

import { useState } from "react";

import type { EventActivityChoice, EventPricingTab } from "@/lib/events/types";

import { ActivityChoiceSection } from "./ActivityChoiceSection";
import { PricingSection } from "./PricingSection";

type EventPackagesFlowProps = {
  activityHeading: string;
  activityDescription: string;
  activities: EventActivityChoice[];
  tabs: EventPricingTab[];
  reserveHref: string;
};

function resolveTabId(
  activity: EventActivityChoice,
  tabs: EventPricingTab[],
): string {
  const byId = tabs.find((tab) => tab.id === activity.id);
  if (byId) return byId.id;

  const byLabel = tabs.find(
    (tab) => tab.label.toUpperCase() === activity.title.toUpperCase(),
  );
  if (byLabel) return byLabel.id;

  return tabs[0]?.id ?? activity.id;
}

export function EventPackagesFlow({
  activityHeading,
  activityDescription,
  activities,
  tabs,
  reserveHref,
}: EventPackagesFlowProps) {
  const safeTabs = tabs.length > 0 ? tabs : [];
  const [activeTabId, setActiveTabId] = useState(
    safeTabs[0]?.id ?? "paintball",
  );

  return (
    <>
      <ActivityChoiceSection
        heading={activityHeading}
        description={activityDescription}
        activities={activities}
        onActivitySelect={(activity) => {
          setActiveTabId(resolveTabId(activity, safeTabs));
        }}
      />
      <PricingSection
        tabs={safeTabs}
        reserveHref={reserveHref}
        activeTabId={activeTabId}
        onActiveTabChange={setActiveTabId}
      />
    </>
  );
}
