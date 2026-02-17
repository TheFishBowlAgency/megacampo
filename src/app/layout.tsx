import type { Metadata } from "next";
import { Anton, Roboto } from "next/font/google";
import "./globals.css";
import { StyleProvider } from "@/providers";

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400", "500", "600", "800"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Megacampo | O maior parque de paintball da Península Ibérica",
  description:
    "Experiência 12 mapas em 60 hectares. Paintball, airsoft, lasertag. Reservas e eventos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${anton.variable} ${roboto.variable}`}>
        <StyleProvider>{children}</StyleProvider>
      </body>
    </html>
  );
}
