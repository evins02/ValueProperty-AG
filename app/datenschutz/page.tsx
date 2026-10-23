export const metadata = {
  title: "Datenschutzerklärung — Value Property AG",
};

export default function DatenschutzPage() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 720 }}>
        <span className="eyebrow">Rechtliches</span>
        <h1 style={{ fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 32 }}>Datenschutzerklärung</h1>

        <div style={{ display: "grid", gap: 28, fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.75 }}>
          <div>
            <h2 style={{ fontSize: 18, color: "var(--navy-950)", marginBottom: 8 }}>Verantwortliche Stelle</h2>
            <p style={{ marginBottom: 0 }}>
              Value Property AG, Baarerstrasse 112, 6300 Zug, Schweiz — vertreten durch Evins Ariaratnam
              (evinsariaratnam@gmail.com). Diese Datenschutzerklärung gilt für die Verarbeitung
              personenbezogener Daten im Rahmen dieser Website nach dem Schweizer Datenschutzgesetz (DSG).
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 18, color: "var(--navy-950)", marginBottom: 8 }}>Welche Daten wir erheben</h2>
            <p style={{ marginBottom: 8 }}>
              Beim Ausfüllen des Kontaktformulars erheben wir die von Ihnen eingegebenen Angaben: Name, E-Mail-
              Adresse und Ihre Nachricht. Diese Angaben sind freiwillig und werden ausschliesslich zur Bearbeitung
              Ihrer Anfrage verwendet.
            </p>
            <p style={{ marginBottom: 0 }}>
              Die Investment-Analyse auf dieser Website läuft vollständig in Ihrem Browser. Die von Ihnen
              eingegebenen Objektdaten werden nicht an uns oder Dritte übermittelt.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 18, color: "var(--navy-950)", marginBottom: 8 }}>Zweck und Rechtsgrundlage</h2>
            <p style={{ marginBottom: 0 }}>
              Die Verarbeitung erfolgt zur Beantwortung Ihrer Kontaktanfrage und zur Anbahnung bzw. Abwicklung
              einer allfälligen Geschäftsbeziehung. Rechtsgrundlage ist Ihre Einwilligung durch das Absenden des
              Formulars sowie unser berechtigtes Interesse an der Bearbeitung eingehender Anfragen.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 18, color: "var(--navy-950)", marginBottom: 8 }}>Weitergabe an Dritte</h2>
            <p style={{ marginBottom: 0 }}>
              Zum Versand der Kontaktformular-Benachrichtigung per E-Mail nutzen wir den Dienst Resend
              (Resend Inc., USA) als Auftragsverarbeiter. Dabei können Daten in die USA übermittelt werden.
              Resend verpflichtet sich vertraglich zu angemessenen Datenschutzgarantien. Eine darüber
              hinausgehende Weitergabe an Dritte findet nicht statt.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 18, color: "var(--navy-950)", marginBottom: 8 }}>Speicherdauer</h2>
            <p style={{ marginBottom: 0 }}>
              Wir speichern die über das Kontaktformular übermittelten Daten nur so lange, wie es zur Bearbeitung
              Ihrer Anfrage und einer allfälligen Geschäftsbeziehung erforderlich ist, danach löschen wir sie.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 18, color: "var(--navy-950)", marginBottom: 8 }}>Cookies und Tracking</h2>
            <p style={{ marginBottom: 0 }}>
              Diese Website verwendet keine Cookies und kein Analyse- oder Tracking-Tool.
            </p>
          </div>

          <div>
            <h2 style={{ fontSize: 18, color: "var(--navy-950)", marginBottom: 8 }}>Ihre Rechte</h2>
            <p style={{ marginBottom: 0 }}>
              Sie haben das Recht auf Auskunft über die zu Ihrer Person gespeicherten Daten sowie auf
              Berichtigung, Löschung oder Einschränkung der Verarbeitung. Wenden Sie sich dazu an
              evinsariaratnam@gmail.com.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
