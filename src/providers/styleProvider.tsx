import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { system } from '@/theme';
import { CartProvider } from './CartProvider';
import { LocaleProvider } from './LocaleProvider';
import type { SiteLocale } from '@/i18n/site';

export default function StyleProvider({
  children,
  initialLocale,
}: {
  children: React.ReactNode;
  initialLocale: SiteLocale;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      storageKey="megacampo-theme"
    >
      <ChakraProvider value={system}>
        <LocaleProvider initialLocale={initialLocale}>
          <CartProvider>{children}</CartProvider>
        </LocaleProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
}
