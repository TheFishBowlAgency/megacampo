import type { Payload } from "payload";

import type { SiteLocale } from "@/i18n/site";
import { DEFAULT_FOOTER, DEFAULT_HEADER } from "@/lib/site/defaults";
import type { HeaderContent, NavLink } from "@/lib/site/types";

const LOJA_HREF = "https://www.estrategopaintball.com/";

const HEADER_BY_LOCALE: Record<
  SiteLocale,
  {
    contactLabel: string;
    navLinks: NavLink[];
    labels: HeaderContent["labels"];
    promoMessage: string;
    seo: HeaderContent["seo"];
  }
> = {
  pt: {
    contactLabel: "Contacta-nos:",
    navLinks: DEFAULT_HEADER.navLinks,
    labels: DEFAULT_HEADER.labels,
    promoMessage: DEFAULT_HEADER.promoMessage,
    seo: DEFAULT_HEADER.seo,
  },
  en: {
    contactLabel: "Contact us:",
    navLinks: [
      { label: "ACTIVITIES", href: "/#actividades" },
      { label: "THE PARK", href: "/cenarios" },
      { label: "HOW IT WORKS", href: "/como" },
      { label: "EVENTS", href: "/eventos" },
      { label: "STORE", href: LOJA_HREF },
      { label: "CONTACTS", href: "/#contactos" },
    ],
    labels: {
      languageSelectAria: "Select language",
      openMenuAria: "Open menu",
      closeMenuAria: "Close menu",
      menuAria: "Menu",
      searchAria: "Search",
      cartAria: "Cart",
      bagLabel: "Cart",
      searchLabel: "Search",
      cartHref: "/carrinho",
    },
    promoMessage: "20% online discount on all extras",
    seo: {
      title: "Megacampo | The largest paintball park on the Iberian Peninsula",
      description:
        "Experience 12 maps across 60 hectares. Paintball, airsoft, lasertag. Bookings and events.",
    },
  },
  es: {
    contactLabel: "Contáctanos:",
    navLinks: [
      { label: "ACTIVIDADES", href: "/#actividades" },
      { label: "EL PARQUE", href: "/cenarios" },
      { label: "CÓMO FUNCIONA", href: "/como" },
      { label: "EVENTOS", href: "/eventos" },
      { label: "TIENDA", href: LOJA_HREF },
      { label: "CONTACTOS", href: "/#contactos" },
    ],
    labels: {
      languageSelectAria: "Seleccionar idioma",
      openMenuAria: "Abrir menú",
      closeMenuAria: "Cerrar menú",
      menuAria: "Menú",
      searchAria: "Buscar",
      cartAria: "Carrito",
      bagLabel: "Carrito",
      searchLabel: "Buscar",
      cartHref: "/carrinho",
    },
    promoMessage: "20% de descuento online en todos los extras",
    seo: {
      title: "Megacampo | El mayor parque de paintball de la Península Ibérica",
      description:
        "Experiencia 12 mapas en 60 hectáreas. Paintball, airsoft, lasertag. Reservas y eventos.",
    },
  },
};

function headerNavNeedsSync(
  navLinks:
    | { label?: string | null; href?: string | null }[]
    | null
    | undefined,
  expected: { label: string; href: string }[],
): boolean {
  if (!navLinks?.length) return true;
  if (navLinks.length !== expected.length) return true;

  return expected.some((link, index) => {
    const current = navLinks[index];
    return (
      (current?.label ?? "").toUpperCase() !== link.label.toUpperCase() ||
      (current?.href ?? "") !== link.href
    );
  });
}

async function syncHeaderLocale(
  payload: Payload,
  locale: SiteLocale,
): Promise<void> {
  const copy = HEADER_BY_LOCALE[locale];
  const existing = await payload.findGlobal({
    slug: "header",
    depth: 0,
    locale,
    fallbackLocale: false,
  });

  const needsDesktopNav = headerNavNeedsSync(existing.navLinks, copy.navLinks);
  const needsMobileNav = headerNavNeedsSync(
    existing.mobileNavLinks,
    copy.navLinks,
  );
  const needsContact =
    (existing.topBar?.contactLabel ?? "").trim() !== copy.contactLabel;
  const needsLabels = !existing.labels?.bagLabel;
  const needsLanguages = locale === "pt" && !existing.languages?.length;
  const needsSeo =
    !existing.seo?.title ||
    (existing.seo.title ?? "").trim() !== copy.seo.title;
  const needsPromo =
    !(existing.promoMessage ?? "").trim() ||
    (existing.promoMessage ?? "").trim() !== copy.promoMessage;

  if (
    !(
      needsDesktopNav ||
      needsMobileNav ||
      needsContact ||
      needsLabels ||
      needsLanguages ||
      needsSeo ||
      needsPromo
    )
  ) {
    payload.logger.info(`Header (${locale}) already up to date — skipped`);
    return;
  }

  await payload.updateGlobal({
    slug: "header",
    locale,
    data: {
      logoAlt: existing.logoAlt || DEFAULT_HEADER.logoAlt,
      topBar: {
        contactLabel: copy.contactLabel,
        phone: existing.topBar?.phone || DEFAULT_HEADER.topBar.phone,
      },
      navLinks:
        needsDesktopNav || needsMobileNav ? copy.navLinks : existing.navLinks,
      mobileNavLinks:
        needsDesktopNav || needsMobileNav
          ? copy.navLinks
          : existing.mobileNavLinks,
      labels: {
        languageSelectAria: copy.labels.languageSelectAria,
        openMenuAria: copy.labels.openMenuAria,
        closeMenuAria: copy.labels.closeMenuAria,
        menuAria: copy.labels.menuAria,
        searchAria: copy.labels.searchAria,
        cartAria: copy.labels.cartAria,
        bagLabel: copy.labels.bagLabel,
        searchLabel: copy.labels.searchLabel,
        cartHref: existing.labels?.cartHref || copy.labels.cartHref,
      },
      ...(needsLanguages ? { languages: DEFAULT_HEADER.languages } : {}),
      promoMessage: copy.promoMessage,
      seo: copy.seo,
    },
  });

  payload.logger.info(`Synced header global (${locale})`);
}

export async function runSiteShellSeed(payload: Payload): Promise<void> {
  for (const locale of ["pt", "en", "es"] as const) {
    await syncHeaderLocale(payload, locale);
  }

  const existingFooter = await payload.findGlobal({
    slug: "footer",
    depth: 0,
    locale: "pt",
  });

  const footerNeedsSeed =
    !existingFooter.hours?.rows?.length ||
    !existingFooter.social?.links?.length ||
    !existingFooter.legalLinks?.length;

  if (footerNeedsSeed) {
    await payload.updateGlobal({
      slug: "footer",
      locale: "pt",
      data: {
        logoAlt: existingFooter.logoAlt || DEFAULT_FOOTER.logoAlt,
        contact: {
          title: existingFooter.contact?.title || DEFAULT_FOOTER.contact.title,
          phoneFixed:
            existingFooter.contact?.phoneFixed ||
            DEFAULT_FOOTER.contact.phoneFixed,
          phoneMobile:
            existingFooter.contact?.phoneMobile ||
            DEFAULT_FOOTER.contact.phoneMobile,
          phoneFixedNote:
            existingFooter.contact?.phoneFixedNote ||
            DEFAULT_FOOTER.contact.phoneFixedNote,
          phoneMobileNote:
            existingFooter.contact?.phoneMobileNote ||
            DEFAULT_FOOTER.contact.phoneMobileNote,
          email: existingFooter.contact?.email || DEFAULT_FOOTER.contact.email,
          addressLine1:
            existingFooter.contact?.addressLine1 ||
            DEFAULT_FOOTER.contact.addressLine1,
          addressLine2:
            existingFooter.contact?.addressLine2 ||
            DEFAULT_FOOTER.contact.addressLine2,
        },
        hours: {
          title: existingFooter.hours?.title || DEFAULT_FOOTER.hours.title,
          rows: existingFooter.hours?.rows?.length
            ? existingFooter.hours.rows
            : DEFAULT_FOOTER.hours.rows,
        },
        social: {
          title: existingFooter.social?.title || DEFAULT_FOOTER.social.title,
          links: existingFooter.social?.links?.length
            ? existingFooter.social.links
            : DEFAULT_FOOTER.social.links,
        },
        legalLinks: existingFooter.legalLinks?.length
          ? existingFooter.legalLinks
          : DEFAULT_FOOTER.legalLinks,
      },
    });
    payload.logger.info("Seeded footer global (pt)");
  } else {
    payload.logger.info("Footer global already populated — skipped");
  }

  await payload.updateGlobal({
    slug: "footer",
    locale: "en",
    data: {
      contact: {
        title: "CONTACT US",
        phoneFixed:
          existingFooter.contact?.phoneFixed ||
          DEFAULT_FOOTER.contact.phoneFixed,
        phoneMobile:
          existingFooter.contact?.phoneMobile ||
          DEFAULT_FOOTER.contact.phoneMobile,
        phoneFixedNote: "*Call to national landline",
        phoneMobileNote: "**Call to national mobile network",
        email: existingFooter.contact?.email || DEFAULT_FOOTER.contact.email,
        addressLine1:
          existingFooter.contact?.addressLine1 ||
          DEFAULT_FOOTER.contact.addressLine1,
        addressLine2:
          existingFooter.contact?.addressLine2 ||
          DEFAULT_FOOTER.contact.addressLine2,
      },
      hours: {
        title: "OPENING HOURS",
        rows: [
          { label: "Morning:", value: "9h30 - 13h00" },
          { label: "Afternoon:", value: "14h00 - 17h30" },
        ],
      },
      social: {
        title: "FOLLOW US",
        links: existingFooter.social?.links?.length
          ? existingFooter.social.links
          : DEFAULT_FOOTER.social.links,
      },
      legalLinks: [
        { label: "TERMS OF USE", href: "/termos" },
        { label: "PRIVACY POLICY", href: "/privacidade" },
      ],
    },
  });
  payload.logger.info("Synced footer copy (en)");

  await payload.updateGlobal({
    slug: "footer",
    locale: "es",
    data: {
      contact: {
        title: "CONTÁCTANOS",
        phoneFixed:
          existingFooter.contact?.phoneFixed ||
          DEFAULT_FOOTER.contact.phoneFixed,
        phoneMobile:
          existingFooter.contact?.phoneMobile ||
          DEFAULT_FOOTER.contact.phoneMobile,
        phoneFixedNote: "*Llamada a red fija nacional",
        phoneMobileNote: "**Llamada a red móvil nacional",
        email: existingFooter.contact?.email || DEFAULT_FOOTER.contact.email,
        addressLine1:
          existingFooter.contact?.addressLine1 ||
          DEFAULT_FOOTER.contact.addressLine1,
        addressLine2:
          existingFooter.contact?.addressLine2 ||
          DEFAULT_FOOTER.contact.addressLine2,
      },
      hours: {
        title: "HORARIO",
        rows: [
          { label: "Mañana:", value: "9h30 - 13h00" },
          { label: "Tarde:", value: "14h00 - 17h30" },
        ],
      },
      social: {
        title: "SÍGUENOS",
        links: existingFooter.social?.links?.length
          ? existingFooter.social.links
          : DEFAULT_FOOTER.social.links,
      },
      legalLinks: [
        { label: "TÉRMINOS DE USO", href: "/termos" },
        { label: "POLÍTICA DE PRIVACIDAD", href: "/privacidade" },
      ],
    },
  });
  payload.logger.info("Synced footer copy (es)");
}
