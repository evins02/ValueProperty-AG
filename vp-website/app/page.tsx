import Link from "next/link";
import Skyline from "./components/Skyline";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section style={{ background: "var(--navy-950)", color: "#fff", position: "relative", overflow: "hidden" }}>
        <div
          className="container"
          style={{ padding: "120px 28px 100px", position: "relative", zIndex: 2, maxWidth: 780 }}
        >
          <span className="eyebrow">Value-Add Immobilien Schweiz</span>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 58px)", color: "#fff" }}>
            Wertsteigerung, die sich rechnen lässt.
          </h1>
          <p style={{ fontSize: 18, color: "#c6d1db", marginTop: 22, marginBottom: 36, maxWidth: 620 }}>
            Value Property AG identifiziert unterbewertete Mehrfamilienhäuser in ertragsstarken Schweizer
            Lagen, hebt ihr Ertragspotenzial gezielt an und realisiert den geschaffenen Mehrwert über einen
            geplanten Exit — diszipliniert, ertragswertbasiert, bankenfähig.
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/rechner" className="btn btn-gold">Rendite-Check starten</Link>
            <Link href="#strategie" className="btn btn-ghost" style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}>
              Strategie im Detail
            </Link>
          </div>
        </div>
        <Skyline tone="dark" className="hero-skyline" />
        <style>{`
          .hero-skyline {
            position: absolute;
            right: -20px;
            bottom: -10px;
            width: 380px;
            height: auto;
            opacity: 0.9;
          }
          @media (max-width: 720px) {
            .hero-skyline { width: 220px; opacity: 0.55; }
          }
        `}</style>
      </section>

      {/* DIE LOGIK */}
      <section id="strategie" className="section">
        <div className="container">
          <span className="eyebrow">Die Logik</span>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", marginBottom: 48, maxWidth: 620 }}>
            Drei Schritte vom unterbewerteten Objekt zum realisierten Mehrwert.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 28 }}>
            {[
              {
                n: "01",
                t: "Identifizieren",
                d: "Systematisches Screening von Bestandsliegenschaften mit wirtschaftlichem, baulichem oder strukturellem Optimierungspotenzial — geprüft anhand einer standardisierten Kalkulation.",
              },
              {
                n: "02",
                t: "Aufwerten",
                d: "Gezielte operative, bauliche und betriebliche Massnahmen steigern den nachhaltigen Cashflow der Liegenschaft — die Basis jeder ertragswertbasierten Bewertung.",
              },
              {
                n: "03",
                t: "Realisieren",
                d: "Nach Stabilisierung der Erträge erfolgt der geplante Verkauf. Die freigesetzten Mittel werden systematisch in das nächste Projekt reinvestiert.",
              },
            ].map((s) => (
              <div key={s.n} className="card">
                <div style={{ fontFamily: "var(--font-display)", fontSize: 15, color: "var(--gold-500)", marginBottom: 14 }}>
                  {s.n}
                </div>
                <h3 style={{ fontSize: 20, marginBottom: 10 }}>{s.t}</h3>
                <p style={{ color: "var(--ink-soft)", fontSize: 14.5, marginBottom: 0 }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WARUM ERTRAGSWERT */}
      <section className="section-tight" style={{ background: "#fff", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 56, alignItems: "center" }}>
          <div>
            <span className="eyebrow">Warum Ertragswert zählt</span>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", marginBottom: 18 }}>
              Mehr Nettomiete heisst mehr Verkaufspreis — nicht Spekulation, sondern Rechnung.
            </h2>
            <p style={{ color: "var(--ink-soft)", fontSize: 15.5 }}>
              Mehrfamilienhäuser werden im Investorenmarkt primär ertragswertbasiert bewertet. Eine gezielte
              Erhöhung der Nettomieterträge führt deshalb direkt zu einer höheren Markt- und Verkaufspreisbasis.
              Die Wertschöpfung erfolgt über operative, bauliche und strukturelle Optimierung — nicht über
              spekulative Marktbewegungen.
            </p>
          </div>
          <div className="card" style={{ background: "var(--paper)" }}>
            <div style={{ fontSize: 13, color: "var(--ink-soft)", marginBottom: 4 }}>Vereinfachtes Prinzip</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "var(--navy-950)", marginBottom: 4 }}>
              Ertragswert = Nettomiete ÷ Kapitalisierungssatz
            </div>
            <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 12, marginBottom: 0 }}>
              Steigt die nachhaltige Nettomiete, steigt bei gleichem Kapitalisierungssatz auch der Ertragswert
              der Liegenschaft. Teste die Wirkung im Rendite-Check.
            </p>
          </div>
        </div>
      </section>

      {/* MARKTUMFELD */}
      <section className="section">
        <div className="container">
          <span className="eyebrow">Marktumfeld</span>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 32px)", marginBottom: 40, maxWidth: 640 }}>
            Struktureller Rückenwind für Bestandsimmobilien mit Entwicklungspotenzial.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 28 }}>
            {[
              ["Angebot", "Begrenztes Neubauvolumen trifft auf strukturellen Leerstandsmangel in urbanen Lagen."],
              ["Nachfrage", "Anhaltend hohe Nachfrage nach Mietwohnraum in gut angebundenen Schweizer Regionen."],
              ["Substanz", "Nachfolge- und Erbensituationen schaffen laufend unterbewertete Bestandsobjekte."],
            ].map(([t, d]) => (
              <div key={t} style={{ borderTop: "2px solid var(--gold-500)", paddingTop: 18 }}>
                <h3 style={{ fontSize: 17, marginBottom: 8 }}>{t}</h3>
                <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-tight" style={{ background: "var(--navy-950)", color: "#fff" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ color: "#fff", fontSize: "clamp(24px, 3vw, 32px)", marginBottom: 18 }}>
            Wie viel Potenzial steckt in Ihrem Objekt?
          </h2>
          <p style={{ color: "#c6d1db", maxWidth: 520, margin: "0 auto 28px" }}>
            Der Rendite-Check gibt in wenigen Minuten eine erste, vereinfachte Einschätzung von Cashflow und
            Nettorendite.
          </p>
          <Link href="/rechner" className="btn btn-gold">Rendite-Check starten</Link>
        </div>
      </section>
    </>
  );
}
