export type GroupExtraDef = {
  key: string;
  name: string;
  priceEur: number;
  sort: number;
};

export const GROUP_EXTRAS: GroupExtraDef[] = [
  { key: "paintballs-500", name: "500 Bolas", priceEur: 30, sort: 1 },
  { key: "paintballs-1000", name: "1000 Bolas", priceEur: 50, sort: 2 },
  { key: "paintballs-2000", name: "2000 Bolas", priceEur: 90, sort: 3 },
  { key: "private-lounge", name: "Lounge Privado", priceEur: 45, sort: 4 },
  {
    key: "transport-minibus",
    name: "Transporte Ida e Volta Minibus",
    priceEur: 180,
    sort: 5,
  },
];

export const FULL_GROUP_EXTRA_KEYS = GROUP_EXTRAS.map((extra) => extra.key);

export const TRANSPORT_ONLY_EXTRA_KEYS = ["transport-minibus"];

export const CATEGORY_GROUP_EXTRA_KEYS: Record<string, string[]> = {
  "paintball:paintball-group": FULL_GROUP_EXTRA_KEYS,
  "paintball:birthday-party": FULL_GROUP_EXTRA_KEYS,
  "paintball:stag-hen-party": FULL_GROUP_EXTRA_KEYS,
  "soft-paintball:paintball-group": FULL_GROUP_EXTRA_KEYS,
  "soft-paintball:birthday-party": FULL_GROUP_EXTRA_KEYS,
  "soft-paintball:stag-hen-party": FULL_GROUP_EXTRA_KEYS,
};

export const ACTIVITY_GROUP_EXTRA_KEYS: Record<string, string[]> = {
  "laser-tag": TRANSPORT_ONLY_EXTRA_KEYS,
  airsoft: TRANSPORT_ONLY_EXTRA_KEYS,
  "multi-activities": TRANSPORT_ONLY_EXTRA_KEYS,
};
