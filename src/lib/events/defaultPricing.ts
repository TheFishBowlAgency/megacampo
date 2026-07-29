import type { EventPricingPackage, EventPricingTab } from "./types";

const DEFAULT_PACKAGES: EventPricingPackage[] = [
  {
    id: "commando",
    name: "COMMANDO",
    price: "29,95",
    popular: true,
    features: [
      "200 BOLAS",
      "MARCADOR DE PAINTBALL",
      "BOTIJA DE AR COMPRIMIDO",
      "MÁSCARA DE PROTEÇÃO",
      "ACESSO AOS 12 CENÁRIOS",
      "MÍNIMO 8 PESSOAS",
    ],
  },
  {
    id: "ranger",
    name: "RANGER",
    price: "34,95",
    popular: false,
    features: [
      "200 BOLAS",
      "MARCADOR DE PAINTBALL",
      "BOTIJA DE AR COMPRIMIDO",
      "MÁSCARA DE PROTEÇÃO",
      "FARDA CAMUFLADA",
      "ACESSO AOS 12 CENÁRIOS",
      "MÍNIMO 8 PESSOAS",
    ],
  },
  {
    id: "swat",
    name: "SWAT",
    price: "49,95",
    popular: false,
    features: [
      "500 BOLAS",
      "MARCADOR DE PAINTBALL",
      "BOTIJA DE AR COMPRIMIDO",
      "MÁSCARA DE PROTEÇÃO",
      "FARDA CAMUFLADA",
      "ACESSO AOS 12 CENÁRIOS",
      "MÍNIMO 8 PESSOAS",
    ],
  },
  {
    id: "elite",
    name: "ELITE",
    price: "69,95",
    popular: false,
    features: [
      "1000 BOLAS",
      "MARCADOR DE PAINTBALL",
      "BOTIJA DE AR COMPRIMIDO",
      "MÁSCARA DE PROTEÇÃO",
      "FARDA CAMUFLADA",
      "CARREGADOR DE POTES",
      "ACESSO AOS 12 CENÁRIOS",
      "MÍNIMO 8 PESSOAS",
    ],
  },
];

export const DEFAULT_EVENT_PRICING_TABS: EventPricingTab[] = [
  {
    id: "paintball",
    label: "PAINTBALL",
    packages: DEFAULT_PACKAGES,
  },
  {
    id: "soft-paintball",
    label: "SOFT PAINTBALL",
    packages: DEFAULT_PACKAGES,
  },
  {
    id: "cooperacao",
    label: "JOGOS DE COOPERAÇÃO",
    packages: DEFAULT_PACKAGES,
  },
];
