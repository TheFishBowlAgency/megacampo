import {
  ACTIVITY_CARD_IMAGE_AIRSOFT,
  ACTIVITY_CARD_IMAGE_LASERTAG,
  ACTIVITY_CARD_IMAGE_PAINTBALL,
} from "@/data/activityCardMedia";
import { BANNER_SECTION_UNDERLAY_URL } from "@/data/bannerMedia";
import { DEFAULT_EVENTS } from "@/lib/events/defaults";

import type { HomeContent } from "./types";

export const DEFAULT_HOME: HomeContent = {
  hero: {
    heading: "O MAIOR PARQUE DE PAINTBALL DA PENÍNSULA IBÉRICA",
    description:
      "Joga em 12 mapas cinematográficos. Quer sejas iniciante ou profissional, temos atividades para todas as idades e níveis de experiência.",
    cta: {
      label: "RESERVA JÁ",
      href: "#actividades",
    },
    backgroundImageSrc: BANNER_SECTION_UNDERLAY_URL,
  },
  keyFeatures: {
    items: [
      "+30 ANOS DE EXPERIÊNCIA",
      "12 MAPAS",
      "30 MINUTOS DE LISBOA",
      "+20.000 VISITANTES",
      "40 HECTARES",
    ],
  },
  adventure: {
    heading: "ESCOLHE A TUA AVENTURA",
    showAllLabel: "VER TODAS",
  },
  maps: {
    heading: "MAPAS MUNDIALMENTE FAMOSOS",
    description: "Experiência 12 mapas em 40 hectares de cenários imersivos!",
    cta: {
      label: "VER MAPAS",
      href: "/cenarios",
    },
    backgroundImageSrc: BANNER_SECTION_UNDERLAY_URL,
  },
  eventTypes: {
    heading: "WHAT TYPE OF EVENT DO YOU WANT TO ORGANIZE?",
    description:
      "De aniversários a grandes eventos de empresa, temos experiências à medida para o teu grupo!",
    cardLinkLabel: "Ver pacotes",
    events: DEFAULT_EVENTS,
  },
  moreThanPaintball: {
    heading: "MUCH MORE THAN A PAINTBALL FIELD",
    description:
      "Depois da batalha, há sempre espaço para descansar, comer e rir das melhores jogadas",
    imageSrc: ACTIVITY_CARD_IMAGE_AIRSOFT,
    features: [
      { label: "ESPAÇOS EXTERIORES AMPLOS E ZONAS VERDES", icon: "tree" },
      { label: "ZONA DE BARBECUE", icon: "grill" },
      { label: "BALNEÁRIOS E DUCHES", icon: "shower" },
      { label: "ESTACIONAMENTO GRATUITO", icon: "parking" },
      { label: "ÁREAS DE DESCANSO E SOMBRA", icon: "coffee" },
    ],
  },
  safety: {
    heading: "DESIGNED FOR YOUR SAFETY",
    description:
      "30 anos de experiência a receber milhares de jogadores seguindo regras claras, equipamento certificado e monitores profissionais.",
    imageSrc: ACTIVITY_CARD_IMAGE_PAINTBALL,
    items: [
      { label: "BRIEFING DE SEGURANÇA", icon: "briefing" },
      { label: "EQUIPAMENTO DE PROTEÇÃO VERIFICADO", icon: "shield" },
      { label: "MONITORES EXPERIENTES", icon: "person" },
      {
        label: "REGRAS AJUSTADAS À IDADE E EXPERIÊNCIA",
        icon: "rules",
      },
    ],
  },
  testimonials: {
    heading: "MILHARES DE CLIENTES APROVAM O MEGACAMPO",
    description:
      "Para muitos jogadores, a melhor experiência de paintball que já viveram.",
    images: [
      {
        src: ACTIVITY_CARD_IMAGE_PAINTBALL,
        alt: "Jogador de paintball no Megacampo",
      },
      {
        src: ACTIVITY_CARD_IMAGE_AIRSOFT,
        alt: "Participante de airsoft no Megacampo",
      },
      {
        src: ACTIVITY_CARD_IMAGE_LASERTAG,
        alt: "Lasertag ao ar livre no Megacampo",
      },
      {
        src: ACTIVITY_CARD_IMAGE_PAINTBALL,
        alt: "Experiência paintball no Megacampo",
      },
      {
        src: ACTIVITY_CARD_IMAGE_AIRSOFT,
        alt: "Equipa de airsoft no Megacampo",
      },
      {
        src: ACTIVITY_CARD_IMAGE_LASERTAG,
        alt: "Grupo de lasertag no Megacampo",
      },
    ],
    prevLabel: "Anterior",
    nextLabel: "Seguinte",
  },
  cta: {
    heading: "PRONTO PARA UMA AVENTURA?",
    button: {
      label: "RESERVA JÁ",
      href: "#actividades",
    },
  },
  faq: {
    heading: "PERGUNTAS FREQUENTES",
    items: [
      {
        question: "Qual o número mínimo de jogadores?",
        answer:
          "O número mínimo depende da atividade. Para paintball e airsoft são necessários pelo menos 8 jogadores. Para laser tag e soft paintball, o mínimo é de 6 jogadores.",
      },
      {
        question: "Dói muito levar com bolas de paintball?",
        answer:
          "Não. As bolas de paintball são feitas de gelatina e tinta biodegradável. O impacto é semelhante a um estalar de dedos. Todo o equipamento de proteção é fornecido.",
      },
      {
        question: "Qual é a idade mínima para jogar?",
        answer:
          "Depende da atividade: Laser Tag a partir dos 5 anos, Soft Paintball (.50cal) a partir dos 9 anos, Paintball (.68cal) a partir dos 12 anos, e Airsoft a partir dos 16 anos.",
      },
      {
        question: "O que está incluído no preço?",
        answer:
          "Equipamento completo (marcadora, máscara, fato de proteção), munições base, seguro, briefing de segurança e monitor durante toda a atividade.",
      },
      {
        question: "Podemos trazer comida/bebida? Há barbecue?",
        answer:
          "Sim! Temos zonas de piquenique e barbecues disponíveis. Podem trazer a vossa própria comida e bebida. Também temos um café com snacks e bebidas no parque.",
      },
      {
        question: "O que acontece se chover?",
        answer:
          "As atividades realizam-se na mesma — a chuva torna a experiência ainda mais divertida! Em condições meteorológicas extremas, reagendamos sem custos adicionais.",
      },
    ],
  },
};

/** Fallback card images by event slug when Media is not set. */
export const EVENT_IMAGE_FALLBACKS: Record<string, string> = {
  "festas-de-aniversario": ACTIVITY_CARD_IMAGE_LASERTAG,
  "despedida-de-solteiro-a": ACTIVITY_CARD_IMAGE_PAINTBALL,
  "evento-de-empresa": ACTIVITY_CARD_IMAGE_AIRSOFT,
  "grupos-e-escolas": ACTIVITY_CARD_IMAGE_PAINTBALL,
};
