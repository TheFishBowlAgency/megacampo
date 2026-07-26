import type { FooterContent, HeaderContent } from "./types";

export const DEFAULT_LOGO_SRC = "/logo.png";

export const DEFAULT_HEADER: HeaderContent = {
  logoSrc: DEFAULT_LOGO_SRC,
  logoAlt: "Megacampo",
  topBar: {
    contactLabel: "Contacta-nos:",
    phone: "+351 913 402 013",
  },
  navLinks: [
    { label: "ACTIVIDADES", href: "/#actividades" },
    { label: "O PARQUE", href: "/cenarios" },
    { label: "COMO", href: "/como" },
    { label: "EVENTOS", href: "/eventos" },
    { label: "LOJA", href: "#loja" },
    { label: "BLOG", href: "/blog" },
    { label: "RESERVAS", href: "/#reservas" },
    { label: "CONTACTOS", href: "/#contactos" },
  ],
};

export const DEFAULT_FOOTER: FooterContent = {
  logoSrc: DEFAULT_LOGO_SRC,
  logoAlt: "Megacampo",
  contact: {
    title: "CONTACTA-NOS",
    phoneFixed: "+351 214 876 088",
    phoneMobile: "+351 913 402 013",
    phoneFixedNote: "*Chamada para rede fixa nacional",
    phoneMobileNote: "**Chamada para rede móvel nacional",
    email: "info@megacampo.com",
    addressLine1: "Avenida do Megacampo, Lugar da Romã",
    addressLine2: "Sobral da Abalheira, 2640-615 Mafra",
  },
  hours: {
    title: "HORÁRIO",
    rows: [
      { label: "Manhã:", value: "9h30 - 13h00" },
      { label: "Tarde:", value: "14h00 - 17h30" },
    ],
  },
  social: {
    title: "SEGUE-NOS",
    links: [
      { platform: "facebook", url: "https://facebook.com" },
      { platform: "instagram", url: "https://instagram.com" },
    ],
  },
  legalLinks: [
    { label: "TERMOS DE UTILIZAÇÃO", href: "/termos" },
    { label: "POLÍTICA DE PRIVACIDADE", href: "/privacidade" },
  ],
};

export function getCopyrightText(year = new Date().getFullYear()): string {
  return `© Copyright ${year} by Megacampo`;
}
