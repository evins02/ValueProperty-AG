"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const LINKS = [
  { href: "/#strategie", label: "Strategie" },
  { href: "/team", label: "Team" },
  { href: "/rechner", label: "Investment-Analyse" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

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
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }} onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="Value Property AG" width={150} height={64} style={{ height: 34, width: "auto" }} priority />
        </Link>

        <nav className="nav-links" style={{ alignItems: "center", gap: 32, fontSize: 14.5, fontWeight: 600 }}>
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} style={{ textDecoration: "none", color: "var(--navy-950)" }}>
              {l.label}
            </Link>
          ))}
          <Link href="/kontakt" className="btn btn-primary" style={{ padding: "9px 20px", fontSize: 14 }}>
            Kontakt
          </Link>
        </nav>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Menü schliessen" : "Menü öffnen"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            border: "1px solid var(--line-strong)",
            borderRadius: "var(--radius)",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            {open ? (
              <path d="M4 4L16 16M16 4L4 16" stroke="var(--navy-950)" strokeWidth="1.8" strokeLinecap="round" />
            ) : (
              <>
                <line x1="2" y1="5" x2="18" y2="5" stroke="var(--navy-950)" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="2" y1="10" x2="18" y2="10" stroke="var(--navy-950)" strokeWidth="1.8" strokeLinecap="round" />
                <line x1="2" y1="15" x2="18" y2="15" stroke="var(--navy-950)" strokeWidth="1.8" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      <div
        className={`nav-mobile-panel${open ? " is-open" : ""}`}
        style={{
          flexDirection: "column",
          gap: 4,
          padding: "8px 28px 20px",
          borderTop: "1px solid var(--line)",
        }}
      >
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            style={{ textDecoration: "none", color: "var(--navy-950)", fontWeight: 600, fontSize: 15.5, padding: "12px 0", borderBottom: "1px solid var(--line)" }}
          >
            {l.label}
          </Link>
        ))}
        <Link href="/kontakt" onClick={() => setOpen(false)} className="btn btn-primary" style={{ marginTop: 14, justifyContent: "center" }}>
          Kontakt
        </Link>
      </div>
    </header>
  );
}
