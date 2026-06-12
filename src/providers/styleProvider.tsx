import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';
import { system } from '@/theme';
import { CartProvider } from './CartProvider';

export default function StyleProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      storageKey="megacampo-theme"
    >
      <ChakraProvider value={system}>
        <CartProvider>{children}</CartProvider>
      </ChakraProvider>
    </ThemeProvider>
  );
}
