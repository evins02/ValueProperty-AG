"use client";

import { useState } from "react";

type Inputs = {
  kaufpreis: number;
  wohnungen: number;
  mieteProEinheit: number;
  eigenmittelQuote: number;
};

const DEFAULTS: Inputs = {
  kaufpreis: 4_000_000,
  wohnungen: 16,
  mieteProEinheit: 1_600,
  eigenmittelQuote: 0.3,
};

// Vereinfachtes, öffentliches Modell — bewusst nicht identisch mit dem internen
// Underwriting-Modell der Value Property AG. Dient als erste Indikation.
const ZINSSATZ = 0.045; // kalkulatorischer Zins inkl. Sicherheitspuffer
const BEWIRTSCHAFTUNGSKOSTEN_SATZ = 0.25; // Pauschale: Verwaltung, Unterhalt, Versicherung

function chf(n: number) {
  return new Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 }).format(n);
}
function pct(n: number) {
  return new Intl.NumberFormat("de-CH", { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
}

export default function Calculator() {
  const [stage, setStage] = useState<"form" | "result">("form");
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const nettomiete = inputs.wohnungen * inputs.mieteProEinheit * 12;
  const bewirtschaftungskosten = nettomiete * BEWIRTSCHAFTUNGSKOSTEN_SATZ;
  const noi = nettomiete - bewirtschaftungskosten;
  const fremdkapital = inputs.kaufpreis * (1 - inputs.eigenmittelQuote);
  const kapitaldienst = fremdkapital * ZINSSATZ;
  const cashflow = noi - kapitaldienst;
  const nettorendite = inputs.kaufpreis > 0 ? cashflow / inputs.kaufpreis : 0;
  const eigenmittel = inputs.kaufpreis * inputs.eigenmittelQuote;
  const roi = inputs.kaufpreis > 0 ? noi / inputs.kaufpreis : 0;

  async function showResult(e: React.FormEvent) {
    e.preventDefault();
    setStage("result");
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "calculator_result", inputs }),
    }).catch(() => {});
  }

  return (
    <div className="card" style={{ maxWidth: 640, margin: "0 auto" }}>
      {stage === "form" && (
        <form onSubmit={showResult}>
          <h2 style={{ fontSize: 22, marginBottom: 20 }}>Objektangaben</h2>
          <div className="field">
            <label htmlFor="kaufpreis">Kaufpreis (CHF)</label>
            <input
              id="kaufpreis"
              type="number"
              min={0}
              step={10000}
              value={inputs.kaufpreis}
              onChange={(e) => setInputs({ ...inputs, kaufpreis: Number(e.target.value) })}
            />
          </div>
          <div className="field">
            <label htmlFor="wohnungen">Anzahl Wohnungen</label>
            <input
              id="wohnungen"
              type="number"
              min={1}
              value={inputs.wohnungen}
              onChange={(e) => setInputs({ ...inputs, wohnungen: Number(e.target.value) })}
            />
          </div>
          <div className="field">
            <label htmlFor="miete">Durchschnittsmiete pro Einheit (CHF/Monat)</label>
            <input
              id="miete"
              type="number"
              min={0}
              step={50}
              value={inputs.mieteProEinheit}
              onChange={(e) => setInputs({ ...inputs, mieteProEinheit: Number(e.target.value) })}
            />
          </div>
          <div className="field">
            <label htmlFor="eigenmittel">
              Eigenmittel-Quote: {pct(inputs.eigenmittelQuote)}
            </label>
            <input
              id="eigenmittel"
              type="range"
              min={0.2}
              max={0.5}
              step={0.01}
              value={inputs.eigenmittelQuote}
              onChange={(e) => setInputs({ ...inputs, eigenmittelQuote: Number(e.target.value) })}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: 8 }}>
            Ergebnis anzeigen
          </button>
        </form>
      )}

      {stage === "result" && (
        <>
          <h2 style={{ fontSize: 22, marginBottom: 4 }}>Ihr Rendite-Check</h2>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 24 }}>
            Vereinfachte Indikation auf Basis Ihrer Angaben — keine Anlageberatung.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 24 }}>
            {[
              ["Nettomiete p.a.", chf(nettomiete)],
              ["NOI", chf(noi)],
              ["Eigenmittel", chf(eigenmittel)],
              ["Cashflow n. Finanzierung", chf(cashflow)],
              ["Nettorendite", pct(nettorendite)],
              ["ROI", pct(roi)],
            ].map(([label, value]) => (
              <div key={label} style={{ borderTop: "2px solid var(--gold-500)", paddingTop: 10 }}>
                <div style={{ fontSize: 12.5, color: "var(--ink-soft)" }}>{label}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "var(--navy-950)" }}>{value}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>
            Interessiert an einer vertieften Prüfung Ihres Objekts? Schreiben Sie uns direkt über die{" "}
            <a href="/kontakt" style={{ color: "var(--sky-500)", fontWeight: 600 }}>
              Kontaktseite
            </a>
            .
          </p>
          <button type="button" className="btn btn-ghost" onClick={() => setStage("form")} style={{ marginTop: 8 }}>
            Werte anpassen
          </button>
        </>
      )}
    </div>
  );
}
