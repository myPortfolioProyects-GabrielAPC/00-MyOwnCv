import type { Metadata } from "next";
import { Anta, Cantarell, IBM_Plex_Mono } from "next/font/google";
import { AnchorScroll } from "@/components/layout/anchor-scroll";
import { LocaleProvider } from "@/components/layout/locale-provider";
import { Navbar } from "@/components/layout/navbar";
import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";

const anta = Anta({
  variable: "--font-anta",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const cantarell = Cantarell({
  variable: "--font-cantarell",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gabriel Peñaranda | Cloud & AI Software Engineer",
  description:
    "Portfolio of Gabriel Augusto Peñaranda Caldas, Cloud & AI Software Engineer based in Lima, Peru.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${anta.variable} ${cantarell.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AnchorScroll />
          <LocaleProvider>
            <Navbar />
            {children}
          </LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
