"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="section" style={{ textAlign: "center" }}>
      <div className="container">
        <span className="eyebrow" style={{ justifyContent: "center" }}>Fehler</span>
        <h1 style={{ fontSize: "clamp(26px, 4vw, 36px)", marginBottom: 18 }}>
          Etwas ist schiefgelaufen.
        </h1>
        <p style={{ color: "var(--ink-soft)", maxWidth: 480, margin: "0 auto 32px" }}>
          Bitte versuchen Sie es erneut. Falls das Problem bestehen bleibt, kontaktieren Sie uns gerne direkt.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button type="button" className="btn btn-primary" onClick={() => reset()}>
            Erneut versuchen
          </button>
          <a href="/kontakt" className="btn btn-ghost">
            Kontakt aufnehmen
          </a>
        </div>
      </div>
    </section>
  );
}
