import type { Metadata } from "next";
import { Anton, Roboto } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { getRequestLocale } from "@/i18n/site";
import { DEFAULT_HEADER } from "@/lib/site/defaults";
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

export async function generateMetadata(): Promise<Metadata> {
  try {
    const locale = await getRequestLocale();
    const { header } = await getSiteShell(locale);
    return {
      title: header.seo.title,
      description: header.seo.description,
      other: {
        google: "notranslate",
      },
    };
  } catch {
    return {
      title: DEFAULT_HEADER.seo.title,
      description: DEFAULT_HEADER.seo.description,
      other: {
        google: "notranslate",
      },
    };
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const { header, footer } = await getSiteShell(locale);

  return (
    <html
      lang={locale}
      translate="no"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
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
