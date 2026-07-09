import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--line)",
        position: "sticky",
        top: 0,
        background: "rgba(246,244,239,0.92)",
        backdropFilter: "blur(6px)",
        zIndex: 50,
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 76,
        }}
      >
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/logo.png" alt="Value Property AG" width={150} height={64} style={{ height: 34, width: "auto" }} priority />
        </Link>
        <nav style={{ display: "flex", gap: 32, fontSize: 14.5, fontWeight: 600 }}>
          <Link href="/#strategie" style={{ textDecoration: "none", color: "var(--navy-950)" }}>Strategie</Link>
          <Link href="/team" style={{ textDecoration: "none", color: "var(--navy-950)" }}>Team</Link>
          <Link href="/rechner" style={{ textDecoration: "none", color: "var(--navy-950)" }}>Rendite-Check</Link>
          <Link href="/kontakt" className="btn btn-primary" style={{ padding: "9px 20px", fontSize: 14 }}>
            Kontakt
          </Link>
        </nav>
      </div>
    </header>
  );
}
