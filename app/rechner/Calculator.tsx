"use client";

import { useState } from "react";

type Inputs = {
  // Objekt & Kaufpreis
  kaufpreisLand: number;
  werkpreis: number;
  kaufpreisParkplatz1: number;
  kaufpreisParkplatz2: number;
  kaufpreisBastelraum: number;
  mehrkosten: number;
  belehnungsbasisBank: number;
  gvWert: number;
  // Mieterträge
  nettomieteIst: number;
  nettomieteNachhaltig: number;
  nettomieteSollMarkt: number;
  // Finanzierung — kalkulatorisch (Bank-Stresstest)
  eigenkapitalQuoteKalk: number;
  zinsHyp1Kalk: number;
  zinsHyp2Kalk: number;
  amortisationJahre: number;
  // Finanzierung — effektiv (Marktbedingungen)
  eigenkapitalQuoteEff: number;
  zinsHyp1Eff: number;
  zinsHyp2Eff: number;
  // Laufende Nebenkosten (gemeinsam für kalk. und eff.)
  nkLaufendProzent: number;
  // Bewirtschaftungskosten — effektiv
  leerstandsrisikoProzent: number;
  betriebskostenProzent: number;
  unterhaltProzent: number;
  instandsetzungProzent: number;
  // Einmalige Kaufnebenkosten
  schuldbriefProzent: number;
  notarProzent: number;
  handaenderungProzent: number;
};

// Standardannahmen für eine Beispiel-Liegenschaft. Entspricht dem bankenüblichen
// Tragbarkeits- und Renditemodell für Schweizer Mehrfamilienhäuser — nicht die
// Kennzahlen eines konkreten Objekts.
const DEFAULTS: Inputs = {
  kaufpreisLand: 0,
  werkpreis: 4_000_000,
  kaufpreisParkplatz1: 0,
  kaufpreisParkplatz2: 0,
  kaufpreisBastelraum: 0,
  mehrkosten: 0,
  belehnungsbasisBank: 3_900_000,
  gvWert: 3_800_000,
  nettomieteIst: 195_000,
  nettomieteNachhaltig: 195_000,
  nettomieteSollMarkt: 340_000,
  eigenkapitalQuoteKalk: 35,
  zinsHyp1Kalk: 4.5,
  zinsHyp2Kalk: 4.5,
  amortisationJahre: 15,
  eigenkapitalQuoteEff: 20,
  zinsHyp1Eff: 2.0,
  zinsHyp2Eff: 2.0,
  nkLaufendProzent: 0.8,
  leerstandsrisikoProzent: 1,
  betriebskostenProzent: 5,
  unterhaltProzent: 1,
  instandsetzungProzent: 1,
  schuldbriefProzent: 0.28,
  notarProzent: 0.09,
  handaenderungProzent: 0.5,
};

function chf(n: number) {
  return new Intl.NumberFormat("de-CH", { style: "currency", currency: "CHF", maximumFractionDigits: 0 }).format(
    Number.isFinite(n) ? n : 0
  );
}
function pct(n: number) {
  return new Intl.NumberFormat("de-CH", { style: "percent", minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(
    Number.isFinite(n) ? n : 0
  );
}
function years(n: number) {
  return Number.isFinite(n) && n > 0 ? `${n.toFixed(1)} Jahre` : "—";
}

function computeModel(i: Inputs) {
  const totalKaufpreis =
    i.kaufpreisLand + i.werkpreis + i.kaufpreisParkplatz1 + i.kaufpreisParkplatz2 + i.kaufpreisBastelraum + i.mehrkosten;
  // Niederstwertprinzip: die Bank finanziert auf Basis des tieferen Werts.
  const belehnungsbasis = Math.min(totalKaufpreis, i.belehnungsbasisBank || totalKaufpreis);

  // --- Finanzierung kalkulatorisch (Bank-Stresstest mit kalkulatorischem Zins) ---
  const eigenkapitalKalk = (belehnungsbasis * i.eigenkapitalQuoteKalk) / 100;
  const fremdkapitalKalk = (belehnungsbasis * (100 - i.eigenkapitalQuoteKalk)) / 100;
  const hyp1Kalk = belehnungsbasis * 0.65;
  const hyp2Kalk = Math.max(fremdkapitalKalk - hyp1Kalk, 0);
  const zinsHyp1KalkBetrag = (hyp1Kalk * i.zinsHyp1Kalk) / 100;
  const zinsHyp2KalkBetrag = (hyp2Kalk * i.zinsHyp2Kalk) / 100;
  const amortisationKalkBetrag = i.amortisationJahre > 0 ? hyp2Kalk / i.amortisationJahre : 0;
  const nkLaufendBetrag = (totalKaufpreis * i.nkLaufendProzent) / 100;
  const jahresbelastungKalk = zinsHyp1KalkBetrag + zinsHyp2KalkBetrag + amortisationKalkBetrag + nkLaufendBetrag;

  // --- Finanzierung effektiv (Marktzins) ---
  const eigenkapitalEff = (belehnungsbasis * i.eigenkapitalQuoteEff) / 100;
  const fremdkapitalEff = (belehnungsbasis * (100 - i.eigenkapitalQuoteEff)) / 100;
  const hyp1Eff = belehnungsbasis * 0.65;
  const hyp2Eff = Math.max(fremdkapitalEff - hyp1Eff, 0);
  const zinsHyp1EffBetrag = (hyp1Eff * i.zinsHyp1Eff) / 100;
  const zinsHyp2EffBetrag = (hyp2Eff * i.zinsHyp2Eff) / 100;
  const amortisationEffBetrag = i.amortisationJahre > 0 ? hyp2Eff / i.amortisationJahre : 0;
  const jahresbelastungEff = zinsHyp1EffBetrag + zinsHyp2EffBetrag + amortisationEffBetrag + nkLaufendBetrag;

  // --- Bewirtschaftungskosten effektiv (Basis: Soll-/Marktmiete bzw. GV-Wert) ---
  const leerstandsrisikoBetrag = (i.gvWert * i.leerstandsrisikoProzent) / 100;
  const betriebskostenBetrag = (i.nettomieteSollMarkt * i.betriebskostenProzent) / 100;
  const unterhaltBetrag = (i.gvWert * i.unterhaltProzent) / 100;
  const instandsetzungBetrag = (i.gvWert * i.instandsetzungProzent) / 100;
  const bewirtschaftungskosten = leerstandsrisikoBetrag + betriebskostenBetrag + unterhaltBetrag + instandsetzungBetrag;

  // --- Einmalige Kaufnebenkosten ---
  const schuldbriefBetrag = (belehnungsbasis * i.schuldbriefProzent) / 100;
  const notarBetrag = (belehnungsbasis * i.notarProzent) / 100;
  const handaenderungBetrag = (belehnungsbasis * i.handaenderungProzent) / 100;
  const einmaligeNebenkosten = schuldbriefBetrag + notarBetrag + handaenderungBetrag;

  // --- NOI & freier Cashflow ---
  const noi = i.nettomieteSollMarkt - bewirtschaftungskosten;
  const freeCashflowEff = noi - jahresbelastungEff;

  // --- Tragbarkeits-Check (reine Finanzierung, ohne Bewirtschaftungskosten) ---
  const ueberschussKalkNachhaltig = i.nettomieteNachhaltig - jahresbelastungKalk;
  const ueberschussEffNachhaltig = i.nettomieteNachhaltig - jahresbelastungEff;

  // --- Kennzahlen ---
  const bruttorenditeIst = belehnungsbasis > 0 ? i.nettomieteIst / belehnungsbasis : 0;
  const bruttorenditeSoll = belehnungsbasis > 0 ? i.nettomieteSollMarkt / belehnungsbasis : 0;
  const nettorenditeSoll = totalKaufpreis > 0 ? freeCashflowEff / totalKaufpreis : 0;
  const roi = totalKaufpreis + einmaligeNebenkosten > 0 ? noi / (totalKaufpreis + einmaligeNebenkosten) : 0;
  const roe = eigenkapitalKalk > 0 ? i.nettomieteIst / eigenkapitalKalk : 0;
  const ertragswert = bruttorenditeIst > 0 ? noi / bruttorenditeIst : 0;
  const cashOnCash = eigenkapitalEff > 0 ? freeCashflowEff / eigenkapitalEff : 0;
  const amortisationsdauerIst = i.nettomieteIst > 0 ? belehnungsbasis / i.nettomieteIst : 0;
  const amortisationsdauerSoll = i.nettomieteSollMarkt > 0 ? belehnungsbasis / i.nettomieteSollMarkt : 0;
  const leerstandProzent =
    i.nettomieteNachhaltig > 0 && i.nettomieteNachhaltig !== i.nettomieteIst
      ? ((i.nettomieteNachhaltig - i.nettomieteIst) / i.nettomieteNachhaltig) * 100
      : 0;

  return {
    totalKaufpreis,
    belehnungsbasis,
    eigenkapitalKalk,
    fremdkapitalKalk,
    hyp1Kalk,
    hyp2Kalk,
    zinsHyp1KalkBetrag,
    zinsHyp2KalkBetrag,
    amortisationKalkBetrag,
    nkLaufendBetrag,
    jahresbelastungKalk,
    eigenkapitalEff,
    fremdkapitalEff,
    hyp1Eff,
    hyp2Eff,
    zinsHyp1EffBetrag,
    zinsHyp2EffBetrag,
    amortisationEffBetrag,
    jahresbelastungEff,
    leerstandsrisikoBetrag,
    betriebskostenBetrag,
    unterhaltBetrag,
    instandsetzungBetrag,
    bewirtschaftungskosten,
    schuldbriefBetrag,
    notarBetrag,
    handaenderungBetrag,
    einmaligeNebenkosten,
    noi,
    freeCashflowEff,
    ueberschussKalkNachhaltig,
    ueberschussEffNachhaltig,
    bruttorenditeIst,
    bruttorenditeSoll,
    nettorenditeSoll,
    roi,
    roe,
    ertragswert,
    cashOnCash,
    amortisationsdauerIst,
    amortisationsdauerSoll,
    leerstandProzent,
  };
}

function Field({
  label,
  value,
  onChange,
  step = 1,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  suffix?: string;
}) {
  return (
    <div className="field">
      <label>
        {label}
        {suffix ? ` (${suffix})` : ""}
      </label>
      <input type="number" value={value} step={step} onChange={(e) => onChange(Number(e.target.value))} />
    </div>
  );
}

function FieldGrid({ children }: { children: React.ReactNode }) {
  return <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>{children}</div>;
}

function StatusBadge({ ok }: { ok: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 12px",
        borderRadius: 2,
        fontSize: 12.5,
        fontWeight: 600,
        background: ok ? "rgba(76, 175, 80, 0.18)" : "rgba(229, 115, 115, 0.2)",
        color: ok ? "#a5d6a7" : "#ef9a9a",
      }}
    >
      {ok ? "Selbsttragend" : "Nicht selbsttragend"}
    </span>
  );
}

const GLOSSAR: [string, string][] = [
  ["Kapitalisierungssatz", "Wenn er höher ist als der Marktzins, erzielt die Investition mehr Rendite, als die Finanzierung kostet."],
  ["Ertragswert", "Wenn er höher ist als der Kaufpreis, ist das Objekt unterbewertet."],
  ["Cash-on-Cash-Rendite", "Der Überschuss auf das eingesetzte Eigenkapital nach allen Kosten."],
  ["Net Operating Income (NOI)", "Die Nettomietzinseinnahmen abzüglich der Bewirtschaftungskosten (Finanzierungskosten exklusive)."],
  ["ROE", "Gesamtrendite auf das eingesetzte Eigenkapital."],
  ["ROI", "Der NOI im Verhältnis zum Kaufpreis plus einmalige Nebenkosten beim Kauf."],
  ["Amortisationsdauer", "Die Zeit, bis der Cashflow die Gesamtinvestition zurückgeholt hat."],
];

export default function Calculator() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);
  const m = computeModel(inputs);

  function set<K extends keyof Inputs>(key: K) {
    return (v: number) => setInputs((prev) => ({ ...prev, [key]: v }));
  }

  const kpis: [string, string][] = [
    ["NOI (Net Operating Income)", chf(m.noi)],
    ["Freier Cashflow (NOI – Finanzierung eff.)", chf(m.freeCashflowEff)],
    ["Nettorendite bei Soll-Miete", pct(m.nettorenditeSoll)],
    ["Cash-on-Cash-Rendite", pct(m.cashOnCash)],
    ["ROI", pct(m.roi)],
    ["ROE", pct(m.roe)],
    ["Bruttorendite IST", pct(m.bruttorenditeIst)],
    ["Bruttorendite Soll", pct(m.bruttorenditeSoll)],
    ["Ertragswert", chf(m.ertragswert)],
    ["Amortisationsdauer (IST-Miete)", years(m.amortisationsdauerIst)],
    ["Amortisationsdauer (Soll-Miete)", years(m.amortisationsdauerSoll)],
    ["Leerstand", `${m.leerstandProzent.toFixed(2)} %`],
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* TRAGBARKEITS-STATUS */}
      <div className="card" style={{ background: "var(--navy-950)", color: "#fff", border: "none" }}>
        <div style={{ fontSize: 13, color: "#9fb3c4", marginBottom: 16 }}>Tragbarkeits-Check (nachhaltige Miete)</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <span style={{ fontSize: 14.5, fontWeight: 600 }}>Kalkulatorisch (Bank-Stresstest)</span>
              <StatusBadge ok={m.ueberschussKalkNachhaltig > 0} />
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22 }}>{chf(m.ueberschussKalkNachhaltig)}</div>
            <p style={{ fontSize: 13, color: "#9fb3c4", marginTop: 4, marginBottom: 0 }}>
              Überschuss/Manko bei kalkulatorischem Zins ({inputs.zinsHyp1Kalk}%) ggü. Jahresbelastung.
            </p>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
              <span style={{ fontSize: 14.5, fontWeight: 600 }}>Effektiv (Marktbedingungen)</span>
              <StatusBadge ok={m.ueberschussEffNachhaltig > 0} />
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22 }}>{chf(m.ueberschussEffNachhaltig)}</div>
            <p style={{ fontSize: 13, color: "#9fb3c4", marginTop: 4, marginBottom: 0 }}>
              Überschuss/Manko bei effektivem Marktzins ({inputs.zinsHyp1Eff}%) ggü. Jahresbelastung.
            </p>
          </div>
        </div>
      </div>

      {/* KPI-DASHBOARD */}
      <div>
        <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 16, fontWeight: 600 }}>Kennzahlen</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 18 }}>
          {kpis.map(([label, value]) => (
            <div key={label} className="card" style={{ padding: 20, borderTop: "2px solid var(--gold-500)" }}>
              <div style={{ fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 6 }}>{label}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 21, color: "var(--navy-950)" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* EINGABEN */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 24 }}>
        <div className="card">
          <h3 style={{ fontSize: 18, marginBottom: 16 }}>Objekt &amp; Kaufpreis</h3>
          <FieldGrid>
            <Field label="Kaufpreis Land" value={inputs.kaufpreisLand} onChange={set("kaufpreisLand")} step={10000} />
            <Field label="Werkpreis Wohnung/Haus" value={inputs.werkpreis} onChange={set("werkpreis")} step={10000} />
            <Field label="Kaufpreis Parkplatz 1" value={inputs.kaufpreisParkplatz1} onChange={set("kaufpreisParkplatz1")} step={1000} />
            <Field label="Kaufpreis Parkplatz 2" value={inputs.kaufpreisParkplatz2} onChange={set("kaufpreisParkplatz2")} step={1000} />
            <Field label="Kaufpreis Bastelraum" value={inputs.kaufpreisBastelraum} onChange={set("kaufpreisBastelraum")} step={1000} />
            <Field label="Evtl. Mehrkosten" value={inputs.mehrkosten} onChange={set("mehrkosten")} step={1000} />
            <Field label="Belehnungsbasis Bank (Schätzwert)" value={inputs.belehnungsbasisBank} onChange={set("belehnungsbasisBank")} step={10000} />
            <Field label="Amtlicher Wert (GV-Wert)" value={inputs.gvWert} onChange={set("gvWert")} step={10000} />
          </FieldGrid>
          <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 12, marginBottom: 0 }}>
            Total Kaufpreis: <strong>{chf(m.totalKaufpreis)}</strong> · Belehnungsbasis (Niederstwertprinzip):{" "}
            <strong>{chf(m.belehnungsbasis)}</strong>
          </p>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 18, marginBottom: 16 }}>Mieterträge</h3>
          <FieldGrid>
            <Field label="Nettomieteinnahmen IST p.a." value={inputs.nettomieteIst} onChange={set("nettomieteIst")} step={1000} />
            <Field label="Nettomieteinnahmen nachhaltig p.a." value={inputs.nettomieteNachhaltig} onChange={set("nettomieteNachhaltig")} step={1000} />
            <Field label="Soll-/Marktmiete p.a. (Benchmark)" value={inputs.nettomieteSollMarkt} onChange={set("nettomieteSollMarkt")} step={1000} />
          </FieldGrid>
          <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 12, marginBottom: 0 }}>
            Die Soll-/Marktmiete bildet das nach Aufwertung erzielbare Mietniveau ab (Value-Add-These) — nicht die
            aktuelle Ist-Miete.
          </p>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 18, marginBottom: 16 }}>Finanzierung — kalkulatorisch (Bank-Stresstest)</h3>
          <FieldGrid>
            <Field label="Eigenkapital-Quote" value={inputs.eigenkapitalQuoteKalk} onChange={set("eigenkapitalQuoteKalk")} step={1} suffix="%" />
            <Field label="Zins 1. Hypothek (kalk.)" value={inputs.zinsHyp1Kalk} onChange={set("zinsHyp1Kalk")} step={0.1} suffix="%" />
            <Field label="Zins 2. Hypothek (kalk.)" value={inputs.zinsHyp2Kalk} onChange={set("zinsHyp2Kalk")} step={0.1} suffix="%" />
            <Field label="Amortisation 2. Hypothek" value={inputs.amortisationJahre} onChange={set("amortisationJahre")} step={1} suffix="Jahre" />
          </FieldGrid>
          <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 12, marginBottom: 0 }}>
            Jahresbelastung kalkulatorisch: <strong>{chf(m.jahresbelastungKalk)}</strong> ({chf(m.jahresbelastungKalk / 12)}/Monat)
          </p>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 18, marginBottom: 16 }}>Finanzierung &amp; Bewirtschaftung — effektiv</h3>
          <FieldGrid>
            <Field label="Eigenkapital-Quote" value={inputs.eigenkapitalQuoteEff} onChange={set("eigenkapitalQuoteEff")} step={1} suffix="%" />
            <Field label="Zins 1. Hypothek (eff.)" value={inputs.zinsHyp1Eff} onChange={set("zinsHyp1Eff")} step={0.1} suffix="%" />
            <Field label="Zins 2. Hypothek (eff.)" value={inputs.zinsHyp2Eff} onChange={set("zinsHyp2Eff")} step={0.1} suffix="%" />
            <Field label="Laufende Nebenkosten" value={inputs.nkLaufendProzent} onChange={set("nkLaufendProzent")} step={0.1} suffix="% vom Kaufpreis" />
            <Field label="Leerstandsrisiko" value={inputs.leerstandsrisikoProzent} onChange={set("leerstandsrisikoProzent")} step={0.1} suffix="% vom GV-Wert" />
            <Field label="Betriebskosten" value={inputs.betriebskostenProzent} onChange={set("betriebskostenProzent")} step={0.5} suffix="% der Soll-Miete" />
            <Field label="Unterhaltskosten" value={inputs.unterhaltProzent} onChange={set("unterhaltProzent")} step={0.1} suffix="% vom GV-Wert" />
            <Field label="Rückstellung Instandsetzung" value={inputs.instandsetzungProzent} onChange={set("instandsetzungProzent")} step={0.1} suffix="% vom GV-Wert" />
          </FieldGrid>
          <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 12, marginBottom: 0 }}>
            Jahresbelastung effektiv: <strong>{chf(m.jahresbelastungEff)}</strong> · Bewirtschaftungskosten:{" "}
            <strong>{chf(m.bewirtschaftungskosten)}</strong>
          </p>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 18, marginBottom: 16 }}>Einmalige Kaufnebenkosten</h3>
          <FieldGrid>
            <Field label="Schuldbrief (Hypothekarerrichtung)" value={inputs.schuldbriefProzent} onChange={set("schuldbriefProzent")} step={0.01} suffix="% der Belehnungsbasis" />
            <Field label="Notariatskosten (Käuferanteil)" value={inputs.notarProzent} onChange={set("notarProzent")} step={0.01} suffix="% der Belehnungsbasis" />
            <Field label="Handänderungssteuer (Käuferanteil)" value={inputs.handaenderungProzent} onChange={set("handaenderungProzent")} step={0.01} suffix="% der Belehnungsbasis" />
          </FieldGrid>
          <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginTop: 12, marginBottom: 0 }}>
            Total einmalige Nebenkosten: <strong>{chf(m.einmaligeNebenkosten)}</strong>
          </p>
        </div>
      </div>

      {/* GLOSSAR */}
      <details className="card">
        <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: 15 }}>Begriffe erklärt</summary>
        <div style={{ marginTop: 16, display: "grid", gap: 14 }}>
          {GLOSSAR.map(([term, desc]) => (
            <div key={term}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "var(--navy-950)" }}>{term}</div>
              <div style={{ fontSize: 13.5, color: "var(--ink-soft)" }}>{desc}</div>
            </div>
          ))}
        </div>
      </details>

      <p style={{ fontSize: 12.5, color: "var(--ink-soft)", marginBottom: 0 }}>
        Alle Werte sind Standardannahmen und frei anpassbar. Diese Analyse ersetzt keine individuelle,
        ertragswertbasierte Prüfung durch Value Property AG und keine Finanzierungszusage einer Bank.
      </p>
    </div>
  );
}
