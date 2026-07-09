# Value Property AG — Website

Mehrseitige Next.js-Website (App Router) mit Strategie-Seite, Team-Profil, einem
Rendite-Rechner mit E-Mail-Gate und einem Kontaktformular.

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
Deploys bei jedem Push).

## Wichtig vor dem Live-Schalten: Leads werden noch nicht gespeichert

`app/api/lead/route.ts` schreibt eingehende Leads (Rechner-Freischaltung,
Rechner-Ergebnis, Kontaktformular) aktuell nur ins Server-Log
(Vercel Dashboard → Deployments → Functions → Logs). Das reicht zum Testen,
aber **nicht für den produktiven Betrieb** — Vercel Functions haben kein
persistentes Dateisystem, Logs sind nicht das richtige Werkzeug für Lead-Daten.

Vor dem Live-Gang eine der folgenden Optionen anbinden (Kommentar mit
Beispielcode steht bereits in der Datei):

1. **E-Mail-Benachrichtigung** über [Resend](https://resend.com) oder Postmark
   (API-Key als Vercel Environment Variable `RESEND_API_KEY`).
2. **Persistente Speicherung** über Vercel Postgres, Supabase oder Airtable.
3. **Webhook** an ein bestehendes CRM.

Claude Code kann das direkt anbinden, sobald du dich für eine Option entschieden
und den API-Key beim jeweiligen Anbieter erstellt hast.

## Design-System

- Farben, Typografie und das Skyline-Signaturmotiv sind in `app/globals.css`
  und `app/components/Skyline.tsx` zentral definiert.
- Schriften: [Fraunces](https://fonts.google.com/specimen/Fraunces) (Display)
  und [IBM Plex Sans](https://fonts.google.com/specimen/IBM+Plex+Sans) (Fliesstext),
  eingebunden über `next/font/google` — kein manuelles Font-Hosting nötig.
- Der Rendite-Rechner (`app/rechner/Calculator.tsx`) nutzt bewusst ein
  **vereinfachtes, öffentliches Modell** (pauschale Bewirtschaftungskosten,
  ein einzelner Zinssatz) — nicht das interne Underwriting-Modell aus dem
  Businessplan-Anhang. So bleibt die tatsächliche Kalkulationslogik der
  Value Property AG intern.

## Struktur

```
app/
  layout.tsx          Grundgerüst, Fonts, Nav/Footer
  globals.css          Design-Tokens
  page.tsx             Startseite (Hero, Strategie, Marktumfeld)
  team/page.tsx         Gründerprofil
  rechner/page.tsx       Rendite-Check (Server-Wrapper)
  rechner/Calculator.tsx  Rendite-Check (Client, E-Mail-Gate + Berechnung)
  kontakt/page.tsx        Kontaktseite
  kontakt/ContactForm.tsx  Kontaktformular (Client)
  api/lead/route.ts        Lead-Endpunkt (siehe TODO oben)
  components/Nav.tsx
  components/Footer.tsx
  components/Skyline.tsx   Wiederkehrendes Signaturmotiv
public/
  logo.png              Aus dem Businessplan-PDF extrahiertes Logo
```
