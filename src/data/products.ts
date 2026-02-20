/**
 * Product (activity) data for detail pages.
 * Used by /atividades/[slug].
 */

export interface ProductHighlight {
  label: string;
}

export interface ProductPackage {
  id: string;
  name: string;
  price: string;
  perPersonLabel?: string;
  popular?: boolean;
  features: string[];
  ctaLabel?: string;
}

export interface ProductTestimonial {
  id: string;
  clientName: string;
  rating: number;
  text: string;
  /** Desktop: use as large featured card when true */
  featured?: boolean;
}

export interface ProductFAQItem {
  question: string;
  answer: string;
}

export interface ProductData {
  slug: string;
  title: string;
  highlights: ProductHighlight[];
  sectionTitle: string;
  sectionDescription: string;
  packages: ProductPackage[];
  testimonialsHeading: string;
  testimonials: ProductTestimonial[];
  faqHeading: string;
  faqItems: ProductFAQItem[];
}

const PAINTBALL_PACKAGES: ProductPackage[] = [
  {
    id: "commando",
    name: "COMMANDO",
    price: "29,95",
    perPersonLabel: "Por pessoa",
    popular: true,
    features: [
      "200 BOLAS",
      "MARCADOR DE PAINTBALL",
      "BOTIJA DE AR COMPRIMIDO",
      "MÁSCARA DE PROTEÇÃO",
      "FARDA CAMUFLADA",
      "ACESSO AOS 12 CENÁRIOS",
      "MÍNIMO 2 PESSOAS",
    ],
    ctaLabel: "RESERVA JÁ",
  },
  {
    id: "ranger",
    name: "RANGER",
    price: "34,95",
    perPersonLabel: "Por pessoa",
    popular: false,
    features: [
      "300 BOLAS",
      "MARCADOR DE PAINTBALL",
      "BOTIJA DE AR COMPRIMIDO",
      "MÁSCARA DE PROTEÇÃO",
      "FARDA CAMUFLADA",
      "ACESSO AOS 12 CENÁRIOS",
      "MÍNIMO 3 PESSOAS",
    ],
    ctaLabel: "RESERVA JÁ",
  },
  {
    id: "swat",
    name: "SWAT",
    price: "49,95",
    perPersonLabel: "Por pessoa",
    popular: false,
    features: [
      "500 BOLAS",
      "MARCADOR DE PAINTBALL",
      "BOTIJA DE AR COMPRIMIDO",
      "MÁSCARA DE PROTEÇÃO",
      "FARDA CAMUFLADA",
      "ACESSO AOS 12 CENÁRIOS",
      "MÍNIMO 5 PESSOAS",
    ],
    ctaLabel: "RESERVA JÁ",
  },
  {
    id: "elite",
    name: "ELITE",
    price: "69,95",
    perPersonLabel: "Por pessoa",
    popular: false,
    features: [
      "1000 BOLAS",
      "MARCADOR DE PAINTBALL",
      "BOTIJA DE AR COMPRIMIDO",
      "MÁSCARA DE PROTEÇÃO",
      "FARDA CAMUFLADA",
      "ACESSO AOS 12 CENÁRIOS",
      "CARREGADOR DE POTES",
      "MÍNIMO 8 PESSOAS",
    ],
    ctaLabel: "RESERVA JÁ",
  },
];

const DEFAULT_FAQ_ITEMS: ProductFAQItem[] = [
  {
    question: "Qual o número mínimo de jogadores?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. O número mínimo varia consoante a atividade.",
  },
  {
    question: "Dói muito levar com bolas de paintball?",
    answer:
      "As bolas de paintball podem causar um pequeno desconforto no momento do impacto, mas a sensação é passageira. Usamos equipamento de proteção adequado para minimizar qualquer desconforto.",
  },
  {
    question: "Qual é a idade mínima para jogar?",
    answer:
      "A idade mínima é 10 anos, acompanhados por um adulto responsável. Recomendamos verificar as condições específicas da atividade na reserva.",
  },
  {
    question: "O que está incluído no preço?",
    answer:
      "Equipamento completo (marcador, máscara, fato), bolas de paintball e monitor durante a atividade. Consulte o pacote escolhido para a lista detalhada.",
  },
  {
    question: "Podemos trazer comida/bebida? Há barbecue?",
    answer:
      "Sim. Temos zonas de piquenique e barbecues disponíveis mediante reserva. Contacte-nos para mais informações.",
  },
  {
    question: "O que acontece se chover?",
    answer:
      "As atividades realizam-se na mesma. Em condições extremas, reagendamos sem custos adicionais.",
  }
];

const PAINTBALL_TESTIMONIALS: ProductTestimonial[] = [
  {
    id: "1",
    clientName: "NOME DO CLIENTE",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    featured: true,
  },
  {
    id: "2",
    clientName: "NOME DO CLIENTE",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    featured: false,
  },
  {
    id: "3",
    clientName: "NOME DO CLIENTE",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor.",
    featured: false,
  },
  {
    id: "4",
    clientName: "NOME DO CLIENTE",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    featured: false,
  },
];

export const PRODUCTS: Record<string, ProductData> = {
  paintball: {
    slug: "paintball",
    title: "PAINTBALL",
    highlights: [
      { label: "12 MAPAS" },
      { label: "30 MINUTOS DE LASER" },
      { label: "+20.000 VISITANTES" },
    ],
    sectionTitle: "PAINTBALL É CONNOSCO",
    sectionDescription:
      "De aniversários a grandes eventos de empresa, temos experiencias à medida para o teu grupo!",
    packages: PAINTBALL_PACKAGES,
    testimonialsHeading: "O QUE DIZEM OS NOSSOS CLIENTES?",
    testimonials: PAINTBALL_TESTIMONIALS,
    faqHeading: "PERGUNTAS FREQUENTES",
    faqItems: DEFAULT_FAQ_ITEMS,
  },
};

export function getProductBySlug(slug: string): ProductData | null {
  return PRODUCTS[slug] ?? null;
}

export function getAllProductSlugs(): string[] {
  return Object.keys(PRODUCTS);
}
