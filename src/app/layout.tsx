import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LocaleProvider } from "@/hooks/locale-provider";
import { getLocale } from "@/i18/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SASS Starter Kit",
  description: "A starter kit for SASS projects",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = getLocale();
  return (
    <html lang="en">
      <body className={inter.className}>
        <LocaleProvider value={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
