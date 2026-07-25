import type { Payload } from "payload";

import { DEFAULT_FOOTER, DEFAULT_HEADER } from "@/lib/site/defaults";

export async function runSiteShellSeed(payload: Payload): Promise<void> {
  const existingHeader = await payload.findGlobal({
    slug: "header",
    depth: 0,
  });

  if (!existingHeader.navLinks?.length) {
    await payload.updateGlobal({
      slug: "header",
      data: {
        logoAlt: DEFAULT_HEADER.logoAlt,
        topBar: {
          contactLabel: DEFAULT_HEADER.topBar.contactLabel,
          phone: DEFAULT_HEADER.topBar.phone,
        },
        navLinks: DEFAULT_HEADER.navLinks,
      },
    });
    payload.logger.info("Seeded header global");
  } else {
    payload.logger.info("Header global already populated — skipped");
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
