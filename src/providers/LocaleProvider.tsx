'use client';

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';

import {
  resolveSiteLocale,
  SITE_LOCALE_COOKIE,
  siteCopy,
  type SiteLocale,
} from '@/i18n/site';

interface LocaleContextValue {
  locale: SiteLocale;
  setLocale: (locale: SiteLocale) => void;
  copy: (typeof siteCopy)[SiteLocale];
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: SiteLocale;
}) {
  const router = useRouter();
  const [locale, setLocaleState] = useState<SiteLocale>(initialLocale);

  const setLocale = useCallback(
    (nextLocale: SiteLocale) => {
      setLocaleState(nextLocale);
      document.documentElement.lang = nextLocale;
      document.cookie = `${SITE_LOCALE_COOKIE}=${nextLocale};path=/;max-age=31536000;samesite=lax`;
      router.refresh();
    },
    [router],
  );

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      copy: siteCopy[locale],
    }),
    [locale, setLocale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useSiteLocale() {
  const context = useContext(LocaleContext);

  if (!context) {
    throw new Error('useSiteLocale must be used within LocaleProvider');
  }

  return context;
}

export { resolveSiteLocale };
