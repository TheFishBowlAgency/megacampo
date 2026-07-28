import {
  DEFAULT_ACTIVITY_FEATURES,
  FALLBACK_ACTIVITY_FEATURES,
} from "@/lib/activities/landingDefaults";
import type {
  ActivityDef,
  CategoryDef,
  OptionDef,
  OptionGroupDef,
} from "./helpers";

const DEFAULT_HIGHLIGHTS = FALLBACK_ACTIVITY_FEATURES;

export const ACTIVITIES: ActivityDef[] = [
  {
    key: "paintball",
    title: "Paintball",
    sort: 1,
    highlights: DEFAULT_ACTIVITY_FEATURES.paintball,
  },
  {
    key: "soft-paintball",
    title: "Soft Paintball",
    sort: 2,
    highlights: DEFAULT_ACTIVITY_FEATURES["soft-paintball"],
  },
  {
    key: "mini-paintball",
    title: "Mini Paintball",
    sort: 3,
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    key: "airsoft",
    title: "Airsoft",
    sort: 4,
    highlights: DEFAULT_ACTIVITY_FEATURES.airsoft,
  },
  {
    key: "laser-tag",
    title: "Laser Tag",
    sort: 5,
    highlights: DEFAULT_ACTIVITY_FEATURES["laser-tag"],
  },
  {
    key: "multi-activities",
    title: "Multi-Activities",
    sort: 6,
    highlights: DEFAULT_HIGHLIGHTS,
  },
];

export const CATEGORIES: CategoryDef[] = [
  {
    key: "paintball:paintball-group",
    activityKey: "paintball",
    title: "Paintball Group",
    sort: 1,
    highlights: DEFAULT_ACTIVITY_FEATURES.paintball,
  },
  {
    key: "paintball:birthday-party",
    activityKey: "paintball",
    title: "Birthday Party",
    sort: 2,
    highlights: DEFAULT_ACTIVITY_FEATURES.paintball,
  },
  {
    key: "paintball:stag-hen-party",
    activityKey: "paintball",
    title: "Stag-Hen Party",
    sort: 3,
    highlights: DEFAULT_ACTIVITY_FEATURES.paintball,
  },
  {
    key: "soft-paintball:paintball-group",
    activityKey: "soft-paintball",
    title: "Paintball Group",
    sort: 1,
    highlights: DEFAULT_ACTIVITY_FEATURES["soft-paintball"],
  },
  {
    key: "soft-paintball:birthday-party",
    activityKey: "soft-paintball",
    title: "Birthday Party",
    sort: 2,
    highlights: DEFAULT_ACTIVITY_FEATURES["soft-paintball"],
  },
  {
    key: "soft-paintball:stag-hen-party",
    activityKey: "soft-paintball",
    title: "Stag-Hen Party",
    sort: 3,
    highlights: DEFAULT_ACTIVITY_FEATURES["soft-paintball"],
  },
];

export const OPTION_GROUPS: OptionGroupDef[] = [
  { key: "paintballs", title: "Paintballs", sort: 1 },
  { key: "apparel", title: "Apparel", sort: 2 },
  { key: "marker", title: "Marker", sort: 3 },
  { key: "goggles", title: "Goggles", sort: 4 },
  { key: "gloves", title: "Gloves", sort: 5 },
  { key: "meal", title: "Meal", sort: 6 },
  { key: "private-lounge", title: "Private Lounge", sort: 7 },
  { key: "biodegradable-bbs", title: "Biodegradable BBs", sort: 8 },
  { key: "games", title: "Games", sort: 9 },
  { key: "activity-count", title: "Activities", sort: 10 },
];

export const OPTIONS: OptionDef[] = [
  {
    key: "paintballs:200",
    groupKey: "paintballs",
    label: "200 Paintballs",
    sort: 1,
  },
  {
    key: "paintballs:500",
    groupKey: "paintballs",
    label: "500 Paintballs",
    sort: 2,
  },
  {
    key: "paintballs:1000",
    groupKey: "paintballs",
    label: "1000 Paintballs",
    sort: 3,
  },
  {
    key: "paintballs:unlimited",
    groupKey: "paintballs",
    label: "Unlimited",
    sort: 4,
  },
  {
    key: "paintballs:80",
    groupKey: "paintballs",
    label: "80 Paintballs",
    sort: 5,
  },
  {
    key: "paintballs:250",
    groupKey: "paintballs",
    label: "250 Paintballs",
    sort: 6,
  },

  {
    key: "apparel:not-included",
    groupKey: "apparel",
    label: "Not Included",
    sort: 1,
  },
  { key: "apparel:vest", groupKey: "apparel", label: "Vest", sort: 2 },
  {
    key: "apparel:camo-overalls",
    groupKey: "apparel",
    label: "Cammo Overalls",
    sort: 3,
  },
  {
    key: "apparel:camo-overalls-vest",
    groupKey: "apparel",
    label: "Cammo Overalls & Vest",
    sort: 4,
  },
  {
    key: "apparel:camo-overalls-and-vest",
    groupKey: "apparel",
    label: "Camo Overalls and Vest",
    sort: 5,
  },

  {
    key: "marker:classic",
    groupKey: "marker",
    label: "Classic Marker",
    sort: 1,
  },
  { key: "marker:pro", groupKey: "marker", label: "Pro Marker", sort: 2 },

  {
    key: "goggles:classic",
    groupKey: "goggles",
    label: "Classic Goggles",
    sort: 1,
  },
  { key: "goggles:pro", groupKey: "goggles", label: "Pro Goggles", sort: 2 },
  {
    key: "goggles:not-included",
    groupKey: "goggles",
    label: "Not Included",
    sort: 3,
  },
  {
    key: "goggles:classic-lowercase",
    groupKey: "goggles",
    label: "Classic goggles",
    sort: 4,
  },
  {
    key: "goggles:pro-lowercase",
    groupKey: "goggles",
    label: "Pro goggles",
    sort: 5,
  },

  {
    key: "gloves:not-included",
    groupKey: "gloves",
    label: "Not Included",
    sort: 1,
  },
  { key: "gloves:gloves", groupKey: "gloves", label: "Gloves", sort: 2 },

  {
    key: "meal:not-included",
    groupKey: "meal",
    label: "Not Included",
    sort: 1,
  },
  {
    key: "meal:coffee-break",
    groupKey: "meal",
    label: "Coffee Break",
    sort: 2,
    defaultPriceEur: 8.95,
  },
  { key: "meal:lunch", groupKey: "meal", label: "Lunch", sort: 3 },
  {
    key: "meal:snack",
    groupKey: "meal",
    label: "Snack",
    sort: 4,
    defaultPriceEur: 9.95,
  },

  {
    key: "private-lounge:not-included",
    groupKey: "private-lounge",
    label: "Not Included",
    sort: 1,
    pricingUnit: "per_booking",
  },
  {
    key: "private-lounge:lounge",
    groupKey: "private-lounge",
    label: "Private Lounge",
    sort: 2,
    pricingUnit: "per_booking",
    defaultPriceEur: 45,
  },

  {
    key: "biodegradable-bbs:bring-my-own",
    groupKey: "biodegradable-bbs",
    label: "Bring My Own",
    sort: 1,
  },
  {
    key: "biodegradable-bbs:1000-020g",
    groupKey: "biodegradable-bbs",
    label: "1000 BBs 0.20 G",
    sort: 2,
  },
  {
    key: "biodegradable-bbs:1000-025g",
    groupKey: "biodegradable-bbs",
    label: "1000 BBs 0.25 G",
    sort: 3,
  },
  {
    key: "biodegradable-bbs:4000-028g",
    groupKey: "biodegradable-bbs",
    label: "4000 BBs 0.28 G",
    sort: 4,
  },

  { key: "games:5", groupKey: "games", label: "5 Games", sort: 1 },
  { key: "games:6", groupKey: "games", label: "6 Games", sort: 2 },
  { key: "games:7", groupKey: "games", label: "7 Games", sort: 3 },

  {
    key: "activity-count:4",
    groupKey: "activity-count",
    label: "4 Activities",
    sort: 1,
  },
  {
    key: "activity-count:5",
    groupKey: "activity-count",
    label: "5 Activities",
    sort: 2,
  },
  {
    key: "activity-count:6",
    groupKey: "activity-count",
    label: "6 Activities",
    sort: 3,
  },
];

export const PARTY_SNACK_OVERRIDE = {
  type: "replaceOption" as const,
  groupKey: "meal",
  fromOptionKey: "meal:coffee-break",
  toOptionKey: "meal:snack",
  priceEur: 9.95,
};

export const PARTY_SNACK_OVERRIDE_DEFAULT = {
  ...PARTY_SNACK_OVERRIDE,
  isDefault: true,
};
