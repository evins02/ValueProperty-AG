import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "evinsariaratnam@gmail.com";

function labelFor(type: string) {
  switch (type) {
    case "contact":
      return "Kontaktformular";
    case "calculator_result":
      return "Investment-Analyse genutzt";
    default:
      return "Anfrage";
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "invalid_payload" }, { status: 400 });
    }

    const { type = "contact", name, email } = body as {
      type?: string;
      name?: string;
      email?: string;
    };

    const apiKey = process.env.RESEND_API_KEY;

    if (apiKey) {
      const resend = new Resend(apiKey);
      const lines = Object.entries(body)
        .filter(([key]) => key !== "type")
        .map(([key, value]) => `${key}: ${typeof value === "string" ? value : JSON.stringify(value)}`)
        .join("\n");

      await resend.emails.send({
        // Solange keine eigene Domain bei Resend verifiziert ist, funktioniert der
        // gemeinsame Test-Absender nur für Zustellungen an die Resend-Kontoadresse.
        from: "Value Property AG <onboarding@resend.dev>",
        to: TO_EMAIL,
        replyTo: typeof email === "string" && email ? email : undefined,
        subject: `${labelFor(type)}${name ? ` — ${name}` : ""}`,
        text: lines,
      });
    } else {
      // Ohne RESEND_API_KEY (Vercel Environment Variable) nur Server-Log, damit das
      // Formular auch ohne E-Mail-Anbindung nicht fehlschlägt.
      console.log("[lead] RESEND_API_KEY fehlt — nur geloggt:", new Date().toISOString(), JSON.stringify(body));
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] error", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
