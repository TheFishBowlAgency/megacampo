import type { Footer, Header, Media } from "@/payload-types";

import { DEFAULT_FOOTER, DEFAULT_HEADER, DEFAULT_LOGO_SRC } from "./defaults";
import type { FooterContent, HeaderContent, SocialLink } from "./types";

function resolveMediaUrl(
  image: Header["image"] | Footer["image"],
): string | undefined {
  if (!image || typeof image === "string") {
    return undefined;
  }

  return (image as Media).url ?? undefined;
}

export function mapHeaderGlobal(doc: Header | null | undefined): HeaderContent {
  if (!doc) {
    return DEFAULT_HEADER;
  }

  const navLinks =
    doc.navLinks
      ?.filter(
        (link): link is { label: string; href: string; id?: string | null } =>
          Boolean(link?.label && link?.href),
      )
      .map((link) => ({ label: link.label, href: link.href })) ?? [];

  return {
    logoSrc: resolveMediaUrl(doc.image) ?? DEFAULT_LOGO_SRC,
    logoAlt: doc.logoAlt?.trim() || DEFAULT_HEADER.logoAlt,
    topBar: {
      contactLabel:
        doc.topBar?.contactLabel?.trim() || DEFAULT_HEADER.topBar.contactLabel,
      phone: doc.topBar?.phone?.trim() || DEFAULT_HEADER.topBar.phone,
    },
    navLinks: navLinks.length > 0 ? navLinks : DEFAULT_HEADER.navLinks,
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
