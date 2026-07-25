import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { Anton, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { detectSiteLocale, SITE_LOCALE_COOKIE } from "@/i18n/site";
import { getSiteShell } from "@/lib/site/getSiteShell";
import { StyleProvider } from "@/providers";

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

const molot = localFont({
  src: "../../../public/fonts/martimmolina.ttf",
  variable: "--font-molot",
  display: "swap",
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
  other: {
    google: "notranslate",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const headerStore = await headers();
  const locale = detectSiteLocale({
    cookie: cookieStore.get(SITE_LOCALE_COOKIE)?.value,
    acceptLanguage: headerStore.get("accept-language"),
  });
  const { header, footer } = await getSiteShell();

  return (
    <html
      lang={locale}
      translate="no"
      suppressHydrationWarning
      className={`${anton.variable} ${molot.variable} ${roboto.variable} notranslate`}
    >
      <body>
        <StyleProvider initialLocale={locale} header={header} footer={footer}>
          {children}
        </StyleProvider>
      </body>
    </html>
  );
}
