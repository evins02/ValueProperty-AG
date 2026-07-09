import Calculator from "./Calculator";

export const metadata = {
  title: "Rendite-Check — Value Property AG",
};

export default function RechnerPage() {
  return (
    <>
      <section className="section" style={{ paddingBottom: 32 }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="eyebrow" style={{ justifyContent: "center" }}>Rendite-Check</span>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", maxWidth: 620, margin: "0 auto" }}>
            Wie viel Cashflow steckt in Ihrem Objekt?
          </h1>
          <p style={{ color: "var(--ink-soft)", maxWidth: 520, margin: "18px auto 0", fontSize: 15.5 }}>
            Ein vereinfachtes Modell für eine erste Einschätzung. Für die effektive Prüfung eines konkreten
            Objekts erstellen wir eine vertiefte, ertragswertbasierte Analyse.
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
