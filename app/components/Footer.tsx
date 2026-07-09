export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--navy-950)", color: "#cfd8e2" }}>
      <div
        className="container"
        style={{
          padding: "48px 28px",
          display: "flex",
          flexWrap: "wrap",
          gap: 32,
          justifyContent: "space-between",
        }}
      >
        <div style={{ maxWidth: 360 }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "#fff", marginBottom: 10 }}>
            Value Property AG
          </div>
          <p style={{ fontSize: 13.5, color: "#93a4b5", marginBottom: 0 }}>
            Projektorientierte Immobiliengesellschaft mit Fokus auf die wertschöpfende Aufwertung von
            Mehrfamilienhäusern in ertragsorientierten Schweizer Wohnlagen.
          </p>
        </div>
        <div style={{ fontSize: 13.5, color: "#93a4b5", lineHeight: 1.9 }}>
          <div style={{ color: "#e3c878", fontWeight: 600, marginBottom: 6 }}>Kontakt</div>
          <div>Baarerstrasse 112, 6300 Zug</div>
          <div>+41 76 230 86 31</div>
          <div>evinsariaratnam@gmail.com</div>
        </div>
        <div style={{ fontSize: 12.5, color: "#6b7d8e", alignSelf: "flex-end" }}>
          © {new Date().getFullYear()} Value Property AG — Alle Angaben ohne Gewähr, keine Anlageberatung.
        </div>
      </div>
    </footer>
  );
}
