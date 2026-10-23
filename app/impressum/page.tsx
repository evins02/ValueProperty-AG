export const metadata = {
  title: "Impressum — Value Property AG",
};

export default function ImpressumPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <span className="eyebrow">Rechtliches</span>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 32 }}>Impressum</h1>

        <div style={{ display: "grid", gap: 28, fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.75 }}>
          <div>
            <h2 style={{ fontSize: 18, color: "var(--navy-950)", marginBottom: 8 }}>Anbieterin</h2>
            <p style={{ marginBottom: 0 }}>
              Value Property AG
              <br />
              Baarerstrasse 112
              <br />
              6300 Zug, Schweiz
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 18, color: "var(--navy-950)", marginBottom: 8 }}>Vertreten durch</h2>
            <p style={{ marginBottom: 0 }}>Evins Ariaratnam, Gründer &amp; Geschäftsführer</p>
          </div>

          <div>
            <h2 style={{ fontSize: 18, color: "var(--navy-950)", marginBottom: 8 }}>Kontakt</h2>
            <p style={{ marginBottom: 0 }}>
              Telefon: +41 76 230 86 31
              <br />
              E-Mail: evinsariaratnam@gmail.com
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 18, color: "var(--navy-950)", marginBottom: 8 }}>Handelsregister</h2>
            <p style={{ marginBottom: 0 }}>
              Handelsregistereintrag und UID-Nummer werden nach Abschluss der Eintragung an dieser Stelle ergänzt.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 18, color: "var(--navy-950)", marginBottom: 8 }}>Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Website wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte übernimmt Value Property AG jedoch keine Gewähr. Alle
              Angaben, insbesondere in der Investment-Analyse, sind vereinfachte Indikationen und stellen keine
              Anlageberatung, kein Angebot und keine Finanzierungszusage dar.
            </p>
            <p style={{ marginBottom: 0 }}>
              Verweise und Links auf Websites Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird
              jegliche Verantwortung für solche Websites abgelehnt.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 18, color: "var(--navy-950)", marginBottom: 8 }}>Urheberrecht</h2>
            <p style={{ marginBottom: 0 }}>
              Die Urheberrechte an Inhalten dieser Website, insbesondere Texte, Bildmaterial und Logo, liegen bei
              Value Property AG. Die Vervielfältigung oder Verwendung ohne vorherige schriftliche Zustimmung ist
              nicht gestattet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
