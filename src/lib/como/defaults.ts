import { DEFAULT_HOME } from "@/lib/home/defaults";

import type { ComoContent } from "./types";

export const DEFAULT_COMO: ComoContent = {
  hero: {
    heading: "Visita o Megacampo",
    description:
      "Vem jogar em 12 mapas cinematográficos. Quer sejas iniciante ou profissional, temos atividades para todas as idades e níveis de experiência.",
    cta: {
      label: "Reserva já",
      href: "/#reservas",
    },
  },
  howItWorks: {
    heading: "COMO FUNCIONA?",
    steps: [
      {
        stepLabel: "Primeiro passo",
        title: "Escolhe a tua experiência",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud.",
        link: {
          label: "Ver mais",
          href: "/eventos",
        },
        icon: "hand",
      },
      {
        stepLabel: "Segundo passo",
        title: "Planeia a tua visita",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud.",
        link: {
          label: "Ver mais",
          href: "/cenarios",
        },
        icon: "checklist",
      },
      {
        stepLabel: "Terceiro passo",
        title: "Marca a tua visita",
        description:
          "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud.",
        link: {
          label: "Ver mais",
          href: "/#reservas",
        },
        icon: "calendar",
      },
    ],
  },
  cta: {
    heading: "Pronto para uma aventura?",
    button: {
      label: "Reserva já",
      href: "/#reservas",
    },
  },
  faq: {
    heading: "Perguntas frequentes",
    items: DEFAULT_HOME.faq.items,
  },
};
