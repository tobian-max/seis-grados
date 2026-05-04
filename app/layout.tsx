import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space",
  display: "block",
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
    <html lang="es" className={spaceGrotesk.variable}>
      <body style={{ fontFamily: "var(--font-space, 'Space Grotesk', sans-serif)" }}>
        {children}
      </body>
    </html>
  );
}
