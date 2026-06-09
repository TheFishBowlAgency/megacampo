import {
  group,
  opt,
  type GroupConfig,
  type PackageDef,
} from "./helpers";
import { PARTY_SNACK_OVERRIDE, PARTY_SNACK_OVERRIDE_DEFAULT } from "./optionCatalog";

const MEAL_STANDARD: GroupConfig = group("meal", 6, [
  opt("meal:not-included", 0, { default: true }),
  opt("meal:coffee-break", 8.95),
  opt("meal:lunch", 15),
]);

const MEAL_ELITE: GroupConfig = group("meal", 6, [
  opt("meal:not-included", 0, { default: true }),
  opt("meal:lunch", 15),
  opt("meal:coffee-break", 8.95),
]);

const MEAL_IMMORTAL: GroupConfig = group("meal", 6, [
  opt("meal:coffee-break", 0, { default: true }),
  opt("meal:lunch", 15),
]);

const MARKER_CLASSIC_PRO: GroupConfig = group("marker", 3, [
  opt("marker:classic", 0, { default: true }),
  opt("marker:pro", 7),
]);

const GOGGLES_CLASSIC_PRO: GroupConfig = group("goggles", 4, [
  opt("goggles:classic", 0, { default: true }),
  opt("goggles:pro", 9),
]);

const GLOVES_STANDARD: GroupConfig = group("gloves", 5, [
  opt("gloves:not-included", 0, { default: true }),
  opt("gloves:gloves", 3),
]);

const COMMANDO_EXTRAS: GroupConfig[] = [
  group("paintballs", 1, [
    opt("paintballs:200", 0, { default: true }),
    opt("paintballs:500", 13),
    opt("paintballs:1000", 31),
    opt("paintballs:unlimited", 56),
  ]),
  group("apparel", 2, [
    opt("apparel:not-included", 0, { default: true }),
    opt("apparel:vest", 2),
    opt("apparel:camo-overalls", 6),
    opt("apparel:camo-overalls-vest", 8),
  ]),
  MARKER_CLASSIC_PRO,
  GOGGLES_CLASSIC_PRO,
  GLOVES_STANDARD,
  MEAL_STANDARD,
];

const SWAT_EXTRAS: GroupConfig[] = [
  group("paintballs", 1, [
    opt("paintballs:500", 0, { default: true }),
    opt("paintballs:1000", 18),
    opt("paintballs:unlimited", 43),
  ]),
  group("apparel", 2, [opt("apparel:camo-overalls-vest", 0, { default: true })]),
  MARKER_CLASSIC_PRO,
  GOGGLES_CLASSIC_PRO,
  GLOVES_STANDARD,
  MEAL_STANDARD,
];

const ELITE_EXTRAS: GroupConfig[] = [
  group("paintballs", 1, [
    opt("paintballs:1000", 0, { default: true }),
    opt("paintballs:unlimited", 25),
  ]),
  group("apparel", 2, [opt("apparel:camo-overalls-vest", 0, { default: true })]),
  MARKER_CLASSIC_PRO,
  GOGGLES_CLASSIC_PRO,
  GLOVES_STANDARD,
  MEAL_ELITE,
];

const IMMORTAL_EXTRAS: GroupConfig[] = [
  group("paintballs", 1, [opt("paintballs:unlimited", 0, { default: true })]),
  group("apparel", 2, [opt("apparel:camo-overalls-vest", 0, { default: true })]),
  group("marker", 3, [opt("marker:pro", 0, { default: true })]),
  group("goggles", 4, [opt("goggles:pro", 0, { default: true })]),
  group("gloves", 5, [opt("gloves:gloves", 0, { default: true })]),
  MEAL_IMMORTAL,
];

const MINI_MEAL: GroupConfig = group("meal", 6, [
  opt("meal:not-included", 0, { default: true }),
  opt("meal:snack", 9.95),
  opt("meal:lunch", 10.95),
]);

const PRIVATE_LOUNGE: GroupConfig = group("private-lounge", 7, [
  opt("private-lounge:not-included", 0, { default: true }),
  opt("private-lounge:lounge", 45),
]);

function paintballGroupPackages(activityKey: "paintball" | "soft-paintball"): PackageDef[] {
  const categoryKey = `${activityKey}:paintball-group`;
  const isSoft = activityKey === "soft-paintball";
  const suffix = isSoft ? " Soft" : "";

  const basePackages: PackageDef[] = [
    {
      key: `${activityKey}:commando`,
      activityKey,
      categoryKey,
      name: `Commando${suffix}`,
      basePriceEur: 29.95,
      sort: 1,
      ...(isSoft
        ? { templateKey: "paintball:commando" }
        : { extraGroups: COMMANDO_EXTRAS }),
    },
    {
      key: `${activityKey}:swat`,
      activityKey,
      categoryKey,
      name: `SWAT${suffix}`,
      basePriceEur: 49.95,
      sort: 2,
      ...(isSoft ? { templateKey: "paintball:swat" } : { extraGroups: SWAT_EXTRAS }),
    },
    {
      key: `${activityKey}:elite`,
      activityKey,
      categoryKey,
      name: `Elite${suffix}`,
      basePriceEur: 69.95,
      sort: 3,
      ...(isSoft ? { templateKey: "paintball:elite" } : { extraGroups: ELITE_EXTRAS }),
    },
    {
      key: `${activityKey}:immortal`,
      activityKey,
      categoryKey,
      name: `Immortal${suffix}`,
      basePriceEur: 99.95,
      sort: 4,
      ...(isSoft
        ? { templateKey: "paintball:immortal" }
        : { extraGroups: IMMORTAL_EXTRAS }),
    },
  ];

  return basePackages;
}

function paintballBirthdayPackages(activityKey: "paintball" | "soft-paintball"): PackageDef[] {
  const categoryKey = `${activityKey}:birthday-party`;
  const isSoft = activityKey === "soft-paintball";

  return [
    {
      key: `${activityKey}:commando-party`,
      activityKey,
      categoryKey,
      name: isSoft ? "Commando Soft Party" : "Commando Party",
      basePriceEur: 30.95,
      sort: 1,
      templateKey: isSoft ? "soft-paintball:commando" : "paintball:commando",
      templateOverrides: [PARTY_SNACK_OVERRIDE],
    },
    {
      key: `${activityKey}:swat-party`,
      activityKey,
      categoryKey,
      name: isSoft ? "SWAT Soft Party" : "SWAT Party",
      basePriceEur: 50.95,
      sort: 2,
      templateKey: isSoft ? "soft-paintball:swat" : "paintball:swat",
      templateOverrides: [PARTY_SNACK_OVERRIDE],
    },
    {
      key: `${activityKey}:elite-party`,
      activityKey,
      categoryKey,
      name: isSoft ? "Elite Soft Party" : "Elite Party",
      basePriceEur: 70.95,
      sort: 3,
      templateKey: isSoft ? "soft-paintball:elite" : "paintball:elite",
      templateOverrides: [PARTY_SNACK_OVERRIDE],
    },
    {
      key: `${activityKey}:immortal-party`,
      activityKey,
      categoryKey,
      name: isSoft ? "Immortal Soft Party" : "Immortal Party",
      basePriceEur: 100.95,
      sort: 4,
      templateKey: isSoft ? "soft-paintball:immortal" : "paintball:immortal",
      templateOverrides: [PARTY_SNACK_OVERRIDE_DEFAULT],
    },
  ];
}

function paintballStagHenPackages(activityKey: "paintball" | "soft-paintball"): PackageDef[] {
  const categoryKey = `${activityKey}:stag-hen-party`;
  const isSoft = activityKey === "soft-paintball";

  return [
    {
      key: `${activityKey}:commando-stag-hen`,
      activityKey,
      categoryKey,
      name: isSoft ? "Commando Soft Stag-Hen" : "Commando Stag-Hen",
      basePriceEur: 34.95,
      sort: 1,
      templateKey: isSoft ? "soft-paintball:commando" : "paintball:commando",
    },
    {
      key: `${activityKey}:swat-stag-hen`,
      activityKey,
      categoryKey,
      name: isSoft ? "SWAT Soft Stag-Hen" : "SWAT Stag-Hen",
      basePriceEur: 54.95,
      sort: 2,
      templateKey: isSoft ? "soft-paintball:swat" : "paintball:swat",
    },
    {
      key: `${activityKey}:elite-stag-hen`,
      activityKey,
      categoryKey,
      name: isSoft ? "Elite Soft Stag-Hen" : "Elite Stag-Hen",
      basePriceEur: 74.95,
      sort: 3,
      templateKey: isSoft ? "soft-paintball:elite" : "paintball:elite",
    },
    {
      key: `${activityKey}:immortal-stag-hen`,
      activityKey,
      categoryKey,
      name: isSoft ? "Immortal Soft Stag-Hen" : "Immortal Stag-Hen",
      basePriceEur: 104.95,
      sort: 4,
      templateKey: isSoft ? "soft-paintball:immortal" : "paintball:immortal",
    },
  ];
}

const MINI_TERMINATOR_EXTRAS: GroupConfig[] = [
  group("paintballs", 1, [
    opt("paintballs:80", 0, { default: true }),
    opt("paintballs:250", 2),
    opt("paintballs:unlimited", 5),
  ]),
  group("apparel", 2, [
    opt("apparel:vest", 0, { default: true }),
    opt("apparel:camo-overalls-vest", 6),
  ]),
  MINI_MEAL,
  PRIVATE_LOUNGE,
];

const MINI_TERMINATOR_ELITE_EXTRAS: GroupConfig[] = [
  group("paintballs", 1, [
    opt("paintballs:250", 0, { default: true }),
    opt("paintballs:unlimited", 5),
  ]),
  group("apparel", 2, [
    opt("apparel:vest", 0, { default: true }),
    opt("apparel:camo-overalls-vest", 6),
  ]),
  MINI_MEAL,
  PRIVATE_LOUNGE,
];

const AIRSOFT_EXTRAS: GroupConfig[] = [
  group("biodegradable-bbs", 1, [
    opt("biodegradable-bbs:bring-my-own", 0, { default: true }),
    opt("biodegradable-bbs:1000-020g", 4.95),
    opt("biodegradable-bbs:1000-025g", 5.95),
    opt("biodegradable-bbs:4000-028g", 23.95),
  ]),
  group("apparel", 2, [
    opt("apparel:not-included", 0, { default: true }),
    opt("apparel:vest", 2),
    opt("apparel:camo-overalls", 6),
    opt("apparel:camo-overalls-and-vest", 8),
  ]),
  group("goggles", 4, [
    opt("goggles:not-included", 0, { default: true }),
    opt("goggles:classic-lowercase", 5),
    opt("goggles:pro-lowercase", 10),
  ]),
  group("gloves", 5, [
    opt("gloves:not-included", 0, { default: true }),
    opt("gloves:gloves", 3),
  ]),
  group("meal", 6, [
    opt("meal:not-included", 0, { default: true }),
    opt("meal:coffee-break", 8.95),
    opt("meal:lunch", 14.95),
  ]),
  PRIVATE_LOUNGE,
];

const LASER_TAG_EXTRAS: GroupConfig[] = [
  group("games", 1, [
    opt("games:5", 0, { default: true }),
    opt("games:6", 3),
    opt("games:7", 5.5),
  ]),
  group("meal", 6, [
    opt("meal:not-included", 0, { default: true }),
    opt("meal:snack", 9.95),
    opt("meal:lunch", 14.95),
  ]),
  PRIVATE_LOUNGE,
];

const MULTI_ACTIVITIES_EXTRAS: GroupConfig[] = [
  group("activity-count", 1, [
    opt("activity-count:4", 0, { default: true }),
    opt("activity-count:5", 3),
    opt("activity-count:6", 5.5),
  ]),
  group("meal", 6, [
    opt("meal:not-included", 0, { default: true }),
    opt("meal:snack", 9.95),
    opt("meal:lunch", 14.95),
  ]),
  PRIVATE_LOUNGE,
];

export const PACKAGES: PackageDef[] = [
  ...paintballGroupPackages("paintball"),
  ...paintballBirthdayPackages("paintball"),
  ...paintballStagHenPackages("paintball"),
  ...paintballGroupPackages("soft-paintball"),
  ...paintballBirthdayPackages("soft-paintball"),
  ...paintballStagHenPackages("soft-paintball"),
  {
    key: "mini-paintball:terminator",
    activityKey: "mini-paintball",
    name: "Terminator",
    basePriceEur: 25.95,
    sort: 1,
    extraGroups: MINI_TERMINATOR_EXTRAS,
  },
  {
    key: "mini-paintball:terminator-elite",
    activityKey: "mini-paintball",
    name: "Terminator Elite",
    basePriceEur: 27.95,
    sort: 2,
    extraGroups: MINI_TERMINATOR_ELITE_EXTRAS,
  },
  {
    key: "airsoft:airsoft",
    activityKey: "airsoft",
    name: "Airsoft",
    basePriceEur: 10,
    sort: 1,
    extraGroups: AIRSOFT_EXTRAS,
  },
  {
    key: "laser-tag:laser-tag",
    activityKey: "laser-tag",
    name: "Laser Tag",
    basePriceEur: 27.95,
    sort: 1,
    extraGroups: LASER_TAG_EXTRAS,
  },
  {
    key: "multi-activities:multi-activities",
    activityKey: "multi-activities",
    name: "Multi-Activities",
    basePriceEur: 29.95,
    sort: 1,
    extraGroups: MULTI_ACTIVITIES_EXTRAS,
  },
];
