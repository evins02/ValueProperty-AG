import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

const display = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Value Property AG — Value-Add Immobilien Schweiz",
  description:
    "Value Property AG hebt das Ertragspotenzial unterbewerteter Schweizer Mehrfamilienhäuser gezielt an und realisiert den Mehrwert über einen geplanten Exit.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${display.variable} ${body.variable}`}>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
