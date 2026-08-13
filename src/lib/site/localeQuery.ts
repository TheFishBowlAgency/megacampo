import type { SiteLocale } from "@/i18n/site";

/** Shared Payload Local API locale options for content reads. */
export function localeQuery(locale: SiteLocale) {
  return {
    locale,
    fallbackLocale: "pt" as const,
  };
}
