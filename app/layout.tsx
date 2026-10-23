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

// Bis eine eigene Domain verbunden ist, auf NEXT_PUBLIC_SITE_URL (Vercel Environment
// Variable) oder die von Vercel zugewiesene Domain zurückfallen.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const title = "Value Property AG — Value-Add Immobilien Schweiz";
const description =
  "Value Property AG hebt das Ertragspotenzial unterbewerteter Schweizer Mehrfamilienhäuser gezielt an und realisiert den Mehrwert über einen geplanten Exit.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s",
  },
  description,
  keywords: [
    "Value Property AG",
    "Value-Add Immobilien",
    "Mehrfamilienhaus Schweiz",
    "Immobilieninvestition Schweiz",
    "Rendite-Rechner Immobilien",
    "Ertragswert",
  ],
  authors: [{ name: "Value Property AG" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: "Value Property AG",
    title,
    description,
    url: "/",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Value Property AG" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${display.variable} ${body.variable}`}>
      <body>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: "Value Property AG",
              description,
              url: siteUrl,
              image: `${siteUrl}/logo.png`,
              address: {
                "@type": "PostalAddress",
                streetAddress: "Baarerstrasse 112",
                postalCode: "6300",
                addressLocality: "Zug",
                addressCountry: "CH",
              },
              telephone: "+41 76 230 86 31",
              email: "evinsariaratnam@gmail.com",
              founder: { "@type": "Person", name: "Evins Ariaratnam" },
            }),
          }}
        />
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
