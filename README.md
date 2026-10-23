# Value Property AG — Website

Mehrseitige Next.js-Website (App Router) mit Strategie-Seite, Team-Profil, einer
vollständigen Investment-Analyse (Tragbarkeits- und Renditemodell nach Schweizer
Bankenstandard) und einem Kontaktformular mit E-Mail-Versand.

## Lokal starten (via Claude Code oder Terminal)

```bash
npm install
npm run dev
```

Danach [http://localhost:3000](http://localhost:3000) öffnen.

## Deploy auf Vercel

```bash
npm install -g vercel   # falls noch nicht vorhanden
vercel
```

Oder: Repo auf GitHub pushen und in Vercel importieren (empfohlen für automatische
Deploys bei jedem Push auf `main`).

## Environment Variables (Vercel → Project → Settings → Environment Variables)

| Variable | Zweck | Pflicht |
| --- | --- | --- |
| `RESEND_API_KEY` | E-Mail-Versand des Kontaktformulars über [Resend](https://resend.com) (kostenloser Account reicht). Ohne diesen Key wird eine Anfrage nur ins Server-Log geschrieben, das Formular funktioniert aber trotzdem fehlerfrei. | empfohlen |
| `NEXT_PUBLIC_SITE_URL` | Vollständige Domain (z. B. `https://www.valueproperty.ch`) für Sitemap, `robots.txt` und Open-Graph-Links. Fällt ohne diese Variable auf die von Vercel zugewiesene `*.vercel.app`-Domain zurück. | empfohlen, sobald eine eigene Domain verbunden ist |

Hinweis zu Resend: Ohne eine im Resend-Konto verifizierte eigene Domain funktioniert
der gemeinsame Test-Absender `onboarding@resend.dev` nur für Zustellungen an die
E-Mail-Adresse, mit der das Resend-Konto erstellt wurde. Für den produktiven Versand
an weitere Adressen eine eigene Domain bei Resend verifizieren und den Absender in
`app/api/lead/route.ts` anpassen.

## Rechtliches

`/impressum` und `/datenschutz` sind als eigene Seiten vorhanden. Im Impressum fehlt
aktuell die Handelsregister-/UID-Nummer, da die Eintragung noch nicht erfolgt ist —
nach Abschluss der Eintragung in `app/impressum/page.tsx` ergänzen.

## Design-System

- Farben, Typografie und das Skyline-Signaturmotiv sind in `app/globals.css`
  und `app/components/Skyline.tsx` zentral definiert.
- Schriften: [Fraunces](https://fonts.google.com/specimen/Fraunces) (Display)
  und [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) (Fliesstext),
  eingebunden über `next/font/google` — kein manuelles Font-Hosting nötig.
- Favicon/App-Icon (`app/icon.png`, `app/apple-icon.png`) und Social-Preview-Bild
  (`public/og-image.png`) sind aus dem Logo abgeleitet.

## Investment-Analyse

`app/rechner/Calculator.tsx` bildet das vollständige Tragbarkeits- und Renditemodell
ab, wie es Banken und institutionelle Investoren für die Finanzierung von Schweizer
Mehrfamilienhäusern verwenden: kalkulatorische Tragbarkeit (Bank-Stresstest),
effektive Tragbarkeit (Marktzins + reale Bewirtschaftungskosten), NOI, ROI, ROE,
Cash-on-Cash-Rendite, Ertragswert, Amortisationsdauer und Leerstand. Alle Annahmen
sind frei editierbar, es gibt kein E-Mail-Gate.

## Struktur

```
app/
  layout.tsx            Grundgerüst, Fonts, Metadaten, JSON-LD, Nav/Footer
  robots.ts              robots.txt
  sitemap.ts              sitemap.xml
  icon.png / apple-icon.png  Favicon / App-Icon
  globals.css            Design-Tokens
  page.tsx               Startseite (Hero, Strategie, Marktumfeld, FAQ)
  team/page.tsx            Gründerprofil & Werte
  rechner/page.tsx          Investment-Analyse (Server-Wrapper)
  rechner/Calculator.tsx     Investment-Analyse (Client, vollständiges Modell)
  kontakt/page.tsx            Kontaktseite
  kontakt/ContactForm.tsx      Kontaktformular (Client)
  impressum/page.tsx            Impressum
  datenschutz/page.tsx            Datenschutzerklärung
  api/lead/route.ts                Kontaktformular-Endpunkt (Resend-Versand)
  not-found.tsx                     404-Seite
  error.tsx                          Fehlerseite
  components/Nav.tsx                  Navigation inkl. mobilem Menü
  components/Footer.tsx                Footer inkl. Rechtlichem
  components/Skyline.tsx                Wiederkehrendes Signaturmotiv
public/
  logo.png                Aus dem Businessplan-PDF extrahiertes Logo
  og-image.png              Social-Preview-Bild
```
