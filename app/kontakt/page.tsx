export const metadata = {
  title: "Kontakt — Value Property AG",
};

export default function KontaktPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 620 }}>
        <span className="eyebrow">Kontakt</span>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 20 }}>
          Sprechen wir über Ihr Projekt oder Ihre Investition.
        </h1>
        <p style={{ color: "var(--ink-soft)", fontSize: 15.5, marginBottom: 32 }}>
          Ob Objektvorschlag, Finanzierungspartnerschaft oder Investoren-Anfrage — wir melden uns in der
          Regel innerhalb von zwei Werktagen.
        </p>
        <div style={{ fontSize: 14.5, lineHeight: 2 }}>
          <div><strong>Evins Ariaratnam</strong></div>
          <div>Baarerstrasse 112, 6300 Zug</div>
          <div>+41 76 230 86 31</div>
          <div>evinsariaratnam@gmail.com</div>
        </div>
      </div>
    </section>
  );
}
