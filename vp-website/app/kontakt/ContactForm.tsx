"use client";

import { useState } from "react";

export default function ContactForm() {
  const [data, setData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!data.name || !data.email || !data.message) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", ...data }),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card">
        <h2 style={{ fontSize: 20, marginBottom: 8 }}>Nachricht gesendet</h2>
        <p style={{ color: "var(--ink-soft)", marginBottom: 0 }}>
          Danke, {data.name.split(" ")[0]}. Wir melden uns in Kürze bei Ihnen.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="card">
      <div className="field">
        <label htmlFor="c-name">Name</label>
        <input id="c-name" type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} required />
      </div>
      <div className="field">
        <label htmlFor="c-email">E-Mail</label>
        <input id="c-email" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} required />
      </div>
      <div className="field">
        <label htmlFor="c-message">Nachricht</label>
        <textarea id="c-message" rows={5} value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} required />
      </div>
      {status === "error" && (
        <p style={{ color: "#b3261e", fontSize: 13.5 }}>Etwas ist schiefgelaufen. Bitte erneut versuchen.</p>
      )}
      <button type="submit" className="btn btn-gold" disabled={status === "sending"} style={{ width: "100%" }}>
        {status === "sending" ? "Wird gesendet …" : "Nachricht senden"}
      </button>
    </form>
  );
}
