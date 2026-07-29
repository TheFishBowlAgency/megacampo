export const SITE_LOCALES = ["pt", "en", "es"] as const;

export type SiteLocale = (typeof SITE_LOCALES)[number];

export const SITE_LOCALE_COOKIE = "megacampo-locale";

export const siteCopy = {
  pt: {
    package: {
      mostPopular: "O MAIS POPULAR",
      perPerson: "Por pessoa",
      reserve: "RESERVA JÁ",
    },
  },
  en: {
    package: {
      mostPopular: "MOST POPULAR",
      perPerson: "Per person",
      reserve: "BOOK NOW",
    },
  },
  es: {
    package: {
      mostPopular: "EL MÁS POPULAR",
      perPerson: "Por persona",
      reserve: "RESERVA YA",
    },
  },
} as const satisfies Record<
  SiteLocale,
  {
    package: {
      mostPopular: string;
      perPerson: string;
      reserve: string;
    };
  }
>;

export function isSiteLocale(value: string | undefined): value is SiteLocale {
  return SITE_LOCALES.includes(value as SiteLocale);
}

export function resolveSiteLocale(value: string | undefined): SiteLocale {
  return isSiteLocale(value) ? value : "pt";
}

/** First visit (no cookie): prefer browser language, default Portuguese. */
export function detectSiteLocale(options: {
  cookie?: string;
  acceptLanguage?: string | null;
}): SiteLocale {
  if (isSiteLocale(options.cookie)) {
    return options.cookie;
  }

  const languages = (options.acceptLanguage ?? "")
    .toLowerCase()
    .split(",")
    .map((part) => part.trim().split(";")[0]?.split("-")[0])
    .filter(Boolean);

  for (const language of languages) {
    if (isSiteLocale(language)) {
      return language;
    }
  }

  return "pt";
}
