import type { Metadata } from "next";
import { rubik } from "@/config/fonts";

import "./globals.css";
import { Providers } from "@/components";

export const metadata: Metadata = {
  title: "Teslo | Shop",
  description: "Una tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
