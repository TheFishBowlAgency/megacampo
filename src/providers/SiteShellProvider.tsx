"use client";

import { createContext, useContext, useMemo } from "react";

import { DEFAULT_FOOTER, DEFAULT_HEADER } from "@/lib/site/defaults";
import type { FooterContent, HeaderContent } from "@/lib/site/types";

type SiteShellContextValue = {
  header: HeaderContent;
  footer: FooterContent;
};

const SiteShellContext = createContext<SiteShellContextValue>({
  header: DEFAULT_HEADER,
  footer: DEFAULT_FOOTER,
});

export function SiteShellProvider({
  children,
  header,
  footer,
}: {
  children: React.ReactNode;
  header: HeaderContent;
  footer: FooterContent;
}) {
  const value = useMemo(() => ({ header, footer }), [header, footer]);

  return (
    <SiteShellContext.Provider value={value}>
      {children}
    </SiteShellContext.Provider>
  );
}

export function useSiteShell(): SiteShellContextValue {
  return useContext(SiteShellContext);
}

export function useHeaderContent(): HeaderContent {
  return useSiteShell().header;
}

export function useFooterContent(): FooterContent {
  return useSiteShell().footer;
}
