import Calculator from "./Calculator";

export const metadata = {
  title: "Investment-Analyse — Value Property AG",
};

export default function RechnerPage() {
  return (
    <>
      <section className="section" style={{ paddingBottom: 32 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Investment-Analyse</span>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", maxWidth: 680, margin: "0 auto" }}>
            Tragbarkeit, Rendite und Cashflow — nach bankenüblichem Berechnungsmodell.
          </h1>
          <p style={{ color: "var(--ink-soft)", maxWidth: 600, margin: "18px auto 0", fontSize: 15.5 }}>
            Dasselbe Kennzahlengerüst, das Banken und institutionelle Investoren für die Finanzierung von
            Mehrfamilienhäusern verwenden: kalkulatorische und effektive Tragbarkeit, NOI, ROI, ROE,
            Cash-on-Cash-Rendite und Ertragswert. Alle Annahmen sind frei editierbar.
          </p>
        </div>
      </section>
      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <Calculator />
        </div>
      </section>
    </>
  );
}
