import type { Payload } from "payload";

import { DEFAULT_FOOTER, DEFAULT_HEADER } from "@/lib/site/defaults";

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

export async function runSiteShellSeed(payload: Payload): Promise<void> {
  const existingHeader = await payload.findGlobal({
    slug: "header",
    depth: 0,
  });

  const needsDesktopNav = headerNavNeedsSync(
    existingHeader.navLinks,
    DEFAULT_HEADER.navLinks,
  );
  const needsMobileNav = headerNavNeedsSync(
    existingHeader.mobileNavLinks,
    DEFAULT_HEADER.mobileNavLinks,
  );
  const needsLabels = !existingHeader.labels?.bagLabel;
  const needsLanguages = !existingHeader.languages?.length;
  const needsSeo = !existingHeader.seo?.title;
  const needsPromo = !existingHeader.promoMessage?.trim();

  if (
    needsDesktopNav ||
    needsMobileNav ||
    needsLabels ||
    needsLanguages ||
    needsSeo ||
    needsPromo
  ) {
    await payload.updateGlobal({
      slug: "header",
      data: {
        logoAlt: existingHeader.logoAlt || DEFAULT_HEADER.logoAlt,
        topBar: {
          contactLabel:
            existingHeader.topBar?.contactLabel ||
            DEFAULT_HEADER.topBar.contactLabel,
          phone: existingHeader.topBar?.phone || DEFAULT_HEADER.topBar.phone,
        },
        navLinks: needsDesktopNav
          ? DEFAULT_HEADER.navLinks
          : existingHeader.navLinks,
        mobileNavLinks: needsMobileNav
          ? DEFAULT_HEADER.mobileNavLinks
          : existingHeader.mobileNavLinks,
        labels: needsLabels
          ? DEFAULT_HEADER.labels
          : {
              languageSelectAria:
                existingHeader.labels?.languageSelectAria ||
                DEFAULT_HEADER.labels.languageSelectAria,
              openMenuAria:
                existingHeader.labels?.openMenuAria ||
                DEFAULT_HEADER.labels.openMenuAria,
              closeMenuAria:
                existingHeader.labels?.closeMenuAria ||
                DEFAULT_HEADER.labels.closeMenuAria,
              menuAria:
                existingHeader.labels?.menuAria ||
                DEFAULT_HEADER.labels.menuAria,
              searchAria:
                existingHeader.labels?.searchAria ||
                DEFAULT_HEADER.labels.searchAria,
              cartAria:
                existingHeader.labels?.cartAria ||
                DEFAULT_HEADER.labels.cartAria,
              bagLabel:
                existingHeader.labels?.bagLabel ||
                DEFAULT_HEADER.labels.bagLabel,
              searchLabel:
                existingHeader.labels?.searchLabel ||
                DEFAULT_HEADER.labels.searchLabel,
              cartHref:
                existingHeader.labels?.cartHref ||
                DEFAULT_HEADER.labels.cartHref,
            },
        languages: needsLanguages
          ? DEFAULT_HEADER.languages
          : existingHeader.languages,
        promoMessage: needsPromo
          ? DEFAULT_HEADER.promoMessage
          : existingHeader.promoMessage,
        seo: needsSeo
          ? DEFAULT_HEADER.seo
          : {
              title: existingHeader.seo?.title || DEFAULT_HEADER.seo.title,
              description:
                existingHeader.seo?.description ||
                DEFAULT_HEADER.seo.description,
            },
      },
    });
    payload.logger.info("Synced header global to site defaults");
  } else {
    payload.logger.info("Header global already up to date — skipped");
  }

  const existingFooter = await payload.findGlobal({
    slug: "footer",
    depth: 0,
  });

  const footerNeedsSeed =
    !existingFooter.hours?.rows?.length ||
    !existingFooter.social?.links?.length ||
    !existingFooter.legalLinks?.length;

  if (footerNeedsSeed) {
    await payload.updateGlobal({
      slug: "footer",
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
    payload.logger.info("Seeded footer global");
  } else {
    payload.logger.info("Footer global already populated — skipped");
  }
}
