import type { Footer, Header, Media } from "@/payload-types";
import { isSiteLocale, type SiteLocale } from "@/i18n/site";

import { DEFAULT_FOOTER, DEFAULT_HEADER, DEFAULT_LOGO_SRC } from "./defaults";
import type {
  FooterContent,
  HeaderContent,
  LanguageOption,
  NavLink,
  SocialLink,
} from "./types";

function resolveMediaUrl(
  image: Header["image"] | Footer["image"],
): string | undefined {
  if (!image || typeof image === "string") {
    return undefined;
  }

  return (image as Media).url ?? undefined;
}

function mapNavLinks(
  links:
    | { label?: string | null; href?: string | null; id?: string | null }[]
    | null
    | undefined,
): NavLink[] {
  return (
    links
      ?.filter(
        (link): link is { label: string; href: string; id?: string | null } =>
          Boolean(link?.label && link?.href),
      )
      .map((link) => ({ label: link.label, href: link.href })) ?? []
  );
}

export function mapHeaderGlobal(doc: Header | null | undefined): HeaderContent {
  if (!doc) {
    return DEFAULT_HEADER;
  }

  const navLinks = mapNavLinks(doc.navLinks);
  const mobileNavLinks = mapNavLinks(doc.mobileNavLinks);
  const resolvedNav = navLinks.length > 0 ? navLinks : DEFAULT_HEADER.navLinks;

  const languages =
    doc.languages
      ?.filter(
        (
          lang,
        ): lang is NonNullable<typeof lang> & {
          code: SiteLocale;
          label: string;
        } => Boolean(lang?.code && lang?.label && isSiteLocale(lang.code)),
      )
      .map(
        (lang): LanguageOption => ({
          code: lang.code,
          label: lang.label,
        }),
      ) ?? [];

  return {
    logoSrc: resolveMediaUrl(doc.image) ?? DEFAULT_LOGO_SRC,
    logoAlt: doc.logoAlt?.trim() || DEFAULT_HEADER.logoAlt,
    topBar: {
      contactLabel:
        doc.topBar?.contactLabel?.trim() || DEFAULT_HEADER.topBar.contactLabel,
      phone: doc.topBar?.phone?.trim() || DEFAULT_HEADER.topBar.phone,
    },
    navLinks: resolvedNav,
    mobileNavLinks:
      mobileNavLinks.length > 0
        ? mobileNavLinks
        : DEFAULT_HEADER.mobileNavLinks,
    labels: {
      languageSelectAria:
        doc.labels?.languageSelectAria?.trim() ||
        DEFAULT_HEADER.labels.languageSelectAria,
      openMenuAria:
        doc.labels?.openMenuAria?.trim() || DEFAULT_HEADER.labels.openMenuAria,
      closeMenuAria:
        doc.labels?.closeMenuAria?.trim() ||
        DEFAULT_HEADER.labels.closeMenuAria,
      menuAria: doc.labels?.menuAria?.trim() || DEFAULT_HEADER.labels.menuAria,
      searchAria:
        doc.labels?.searchAria?.trim() || DEFAULT_HEADER.labels.searchAria,
      cartAria: doc.labels?.cartAria?.trim() || DEFAULT_HEADER.labels.cartAria,
      bagLabel: doc.labels?.bagLabel?.trim() || DEFAULT_HEADER.labels.bagLabel,
      searchLabel:
        doc.labels?.searchLabel?.trim() || DEFAULT_HEADER.labels.searchLabel,
      cartHref: doc.labels?.cartHref?.trim() || DEFAULT_HEADER.labels.cartHref,
    },
    languages: languages.length > 0 ? languages : DEFAULT_HEADER.languages,
    promoMessage: doc.promoMessage?.trim() || DEFAULT_HEADER.promoMessage,
    seo: {
      title: doc.seo?.title?.trim() || DEFAULT_HEADER.seo.title,
      description:
        doc.seo?.description?.trim() || DEFAULT_HEADER.seo.description,
    },
  };
}

export function mapFooterGlobal(doc: Footer | null | undefined): FooterContent {
  if (!doc) {
    return DEFAULT_FOOTER;
  }

  const hoursRows =
    doc.hours?.rows
      ?.filter(
        (row): row is { label: string; value: string; id?: string | null } =>
          Boolean(row?.label && row?.value),
      )
      .map((row) => ({ label: row.label, value: row.value })) ?? [];

  const socialLinks =
    doc.social?.links
      ?.filter(
        (
          link,
        ): link is {
          platform: SocialLink["platform"];
          url: string;
          id?: string | null;
        } =>
          (link?.platform === "facebook" || link?.platform === "instagram") &&
          Boolean(link?.url),
      )
      .map((link) => ({ platform: link.platform, url: link.url })) ?? [];

  const legalLinks =
    doc.legalLinks
      ?.filter(
        (link): link is { label: string; href: string; id?: string | null } =>
          Boolean(link?.label && link?.href),
      )
      .map((link) => ({ label: link.label, href: link.href })) ?? [];

  return {
    logoSrc: resolveMediaUrl(doc.image) ?? DEFAULT_LOGO_SRC,
    logoAlt: doc.logoAlt?.trim() || DEFAULT_FOOTER.logoAlt,
    contact: {
      title: doc.contact?.title?.trim() || DEFAULT_FOOTER.contact.title,
      phoneFixed:
        doc.contact?.phoneFixed?.trim() || DEFAULT_FOOTER.contact.phoneFixed,
      phoneMobile:
        doc.contact?.phoneMobile?.trim() || DEFAULT_FOOTER.contact.phoneMobile,
      phoneFixedNote:
        doc.contact?.phoneFixedNote?.trim() ||
        DEFAULT_FOOTER.contact.phoneFixedNote,
      phoneMobileNote:
        doc.contact?.phoneMobileNote?.trim() ||
        DEFAULT_FOOTER.contact.phoneMobileNote,
      email: doc.contact?.email?.trim() || DEFAULT_FOOTER.contact.email,
      addressLine1:
        doc.contact?.addressLine1?.trim() ||
        DEFAULT_FOOTER.contact.addressLine1,
      addressLine2:
        doc.contact?.addressLine2?.trim() ||
        DEFAULT_FOOTER.contact.addressLine2,
    },
    hours: {
      title: doc.hours?.title?.trim() || DEFAULT_FOOTER.hours.title,
      rows: hoursRows.length > 0 ? hoursRows : DEFAULT_FOOTER.hours.rows,
    },
    social: {
      title: doc.social?.title?.trim() || DEFAULT_FOOTER.social.title,
      links: socialLinks.length > 0 ? socialLinks : DEFAULT_FOOTER.social.links,
    },
    legalLinks: legalLinks.length > 0 ? legalLinks : DEFAULT_FOOTER.legalLinks,
  };
}
