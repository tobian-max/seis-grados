import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "6 Grados Business Solutions",
  description:
    "Mentoría ejecutiva, consultoría comercial y conferencias internacionales para que tú y tu equipo operen al máximo nivel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${dmSans.variable} ${playfair.variable}`}>
      <body style={{ fontFamily: "var(--font-dm-sans, 'DM Sans', sans-serif)" }}>
        {children}
      </body>
    </html>
  );
}
