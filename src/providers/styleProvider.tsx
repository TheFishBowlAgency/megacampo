import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { system } from "@/theme";
import type { FooterContent, HeaderContent } from "@/lib/site/types";
import type { SiteLocale } from "@/i18n/site";
import { CartProvider } from "./CartProvider";
import { LocaleProvider } from "./LocaleProvider";
import { SiteShellProvider } from "./SiteShellProvider";

export default function StyleProvider({
  children,
  initialLocale,
  header,
  footer,
}: {
  children: React.ReactNode;
  initialLocale: SiteLocale;
  header: HeaderContent;
  footer: FooterContent;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      storageKey="megacampo-theme"
    >
      <ChakraProvider value={system}>
        <LocaleProvider initialLocale={initialLocale}>
          <SiteShellProvider header={header} footer={footer}>
            <CartProvider>{children}</CartProvider>
          </SiteShellProvider>
        </LocaleProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
}
