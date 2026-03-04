import ThemeModeProvider from "@/theme/ThemeProvider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Design tokens",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeModeProvider>
          {children}
        </ThemeModeProvider>
      </body>
    </html>
  );
}
