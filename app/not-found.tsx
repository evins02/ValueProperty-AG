import Link from "next/link";
import Skyline from "./components/Skyline";

export const metadata = {
  title: "Seite nicht gefunden — Value Property AG",
};

export default function NotFound() {
  return (
    <section style={{ background: "var(--navy-950)", color: "#fff", position: "relative", overflow: "hidden" }}>
      <div className="container" style={{ padding: "140px 28px", textAlign: "center", position: "relative", zIndex: 2 }}>
        <span className="eyebrow" style={{ justifyContent: "center" }}>404</span>
        <h1 style={{ color: "#fff", fontSize: "clamp(28px, 4vw, 40px)", marginBottom: 18 }}>
          Diese Seite gibt es nicht — oder nicht mehr.
        </h1>
        <p style={{ color: "#c6d1db", maxWidth: 480, margin: "0 auto 32px" }}>
          Prüfen Sie die Adresse oder kehren Sie zur Startseite zurück.
        </p>
        <Link href="/" className="btn btn-gold">Zur Startseite</Link>
      </div>
      <Skyline tone="dark" className="hero-skyline" />
      <style>{`
        .hero-skyline {
          position: absolute;
          right: -20px;
          bottom: -10px;
          width: 300px;
          height: auto;
          opacity: 0.5;
        }
      `}</style>
    </section>
  );
}
