import { NextRequest, NextResponse } from "next/server";

// TODO vor Live-Schaltung: Diese Route speichert Leads aktuell nur im Server-Log.
// Vercel Serverless Functions haben kein persistentes Dateisystem — für den
// produktiven Einsatz muss hier ein echter Speicher/Versand angebunden werden, z. B.:
//   - E-Mail-Benachrichtigung über Resend (https://resend.com) oder Postmark
//   - Persistente Speicherung über Vercel Postgres, Supabase oder Airtable
//   - Alternativ: Weiterleitung an ein bestehendes CRM per Webhook
//
// Beispiel (Resend), sobald ein API-Key in den Vercel Environment Variables hinterlegt ist:
//
// import { Resend } from "resend";
// const resend = new Resend(process.env.RESEND_API_KEY);
// await resend.emails.send({
//   from: "Value Property AG <no-reply@valueproperty.com>",
//   to: "evinsariaratnam@gmail.com",
//   subject: `Neuer Lead: ${body.name}`,
//   text: JSON.stringify(body, null, 2),
// });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
    }

    // Sichtbar in den Vercel Function Logs (Dashboard -> Deployments -> Logs),
    // bis eine echte Anbindung (siehe TODO oben) konfiguriert ist.
    console.log("[lead]", new Date().toISOString(), JSON.stringify(body));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] error", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
