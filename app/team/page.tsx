import Skyline from "../components/Skyline";

export const metadata = {
  title: "Team — Value Property AG",
};

export default function TeamPage() {
  return (
    <>
      <section className="section" style={{ paddingBottom: 40 }}>
        <div className="container">
          <span className="eyebrow">Gründerprofil</span>
          <h1 style={{ fontSize: "clamp(30px, 4vw, 44px)", maxWidth: 640 }}>
            Bankenerfahrung, auf die eigene Immobilienstrategie angewendet.
          </h1>
        </div>
      </section>

      <section className="section-tight">
        <div
          className="container responsive-grid-2"
          style={{ "--grid-2-cols": "260px 1fr", gap: 48, alignItems: "start" } as React.CSSProperties}
        >
          <div style={{ maxWidth: 260 }}>
            <div
              style={{
                width: "100%",
                aspectRatio: "1",
                background: "var(--navy-950)",
                borderRadius: "var(--radius)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 18,
              }}
            >
              <span style={{ fontFamily: "var(--font-display)", fontSize: 56, color: "var(--gold-300)" }}>EA</span>
            </div>
            <Skyline tone="light" style={{ width: "100%", height: "auto" }} />
          </div>

          <div>
            <h2 style={{ fontSize: 26, marginBottom: 4 }}>Evins Ariaratnam</h2>
            <p style={{ color: "var(--gold-500)", fontWeight: 600, fontSize: 14, marginBottom: 24 }}>
              Gründer &amp; Geschäftsführer, Value Property AG
            </p>
            <p style={{ fontSize: 15.5, color: "var(--ink-soft)" }}>
              Ich bringe fundierte Erfahrung aus dem Banking mit. Schon früh erkannte ich, dass Investitionen
              in reale Vermögenswerte langfristig die höchsten risikoadjustierten Renditen generieren. Während
              meiner Tätigkeit als Banker habe ich ein exaktes Verständnis dafür entwickelt, Kapital effizient
              einzusetzen und als Hebel zu nutzen.
            </p>
            <p style={{ fontSize: 15.5, color: "var(--ink-soft)" }}>
              2025 wechselte ich zur Bank Wir, wo ich vertieft im Firmenkundenbereich tätig war. Dort stellte
              ich mir die Frage: Warum nicht selbst genau das machen, was unsere Kunden tun — eigene
              Immobiliengesellschaften gründen und strategisch investieren? Meine Erfahrung auf der
              Bankenseite ist dabei ein klarer Vorteil: Ich kenne die Perspektive von Kreditgebern, verstehe
              Finanzierungsprozesse und kann diese Expertise gezielt für die Immobilienbewirtschaftung und
              Wertsteigerung einsetzen.
            </p>
            <p style={{ fontSize: 15.5, color: "var(--ink-soft)", marginBottom: 0 }}>
              Heute gestalte ich die operative Bewirtschaftung von Immobilien aktiv, um nachhaltige Rendite
              und Wertsteigerung für Value Property AG und ihre Kapitalpartner zu realisieren.
            </p>
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ background: "#fff", borderTop: "1px solid var(--line)" }}>
        <div className="container">
          <span className="eyebrow">Werte</span>
          <h2 style={{ fontSize: 24, marginBottom: 28, maxWidth: 560 }}>
            Worauf es bei jeder Entscheidung ankommt.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 28 }}>
            {[
              {
                t: "Ertragswertbasiert",
                d: "Entscheidungen stützen sich auf nachvollziehbare Zahlen — Nettomiete, Kapitalisierungssatz, Tragbarkeit — nicht auf Spekulation über künftige Marktbewegungen.",
              },
              {
                t: "Diszipliniert",
                d: "Jedes Objekt durchläuft dieselbe standardisierte Kalkulation nach bankenüblichem Tragbarkeitsmodell, bevor eine Investitionsentscheidung fällt.",
              },
              {
                t: "Transparent",
                d: "Kapitalpartner erhalten eine nachvollziehbare Herleitung von Annahmen, Kennzahlen und Risiken — keine Blackbox-Kalkulation.",
              },
              {
                t: "Partnerschaftlich",
                d: "Ob Eigentümerin, Finanzierungspartner oder Investor: Eine Zusammenarbeit beginnt mit einem offenen Gespräch über die individuelle Ausgangslage.",
              },
            ].map((v) => (
              <div key={v.t} className="card">
                <h3 style={{ fontSize: 17, marginBottom: 8 }}>{v.t}</h3>
                <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 0 }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <span className="eyebrow">Organisation</span>
          <h2 style={{ fontSize: 24, marginBottom: 28, maxWidth: 560 }}>
            Schlanke Führung, starke externe Partner.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
            {[
              "Akquisition & Marktanalyse",
              "Finanzierung & Strukturierung",
              "Asset Management",
              "Controlling & Reporting",
            ].map((t) => (
              <div key={t} style={{ borderLeft: "2px solid var(--gold-500)", paddingLeft: 14, fontSize: 14.5, color: "var(--ink-soft)" }}>
                {t}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
