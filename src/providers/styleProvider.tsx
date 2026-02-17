import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { system } from "@/theme";

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
      <ChakraProvider value={system}>{children}</ChakraProvider>
    </ThemeProvider>
  );
}
