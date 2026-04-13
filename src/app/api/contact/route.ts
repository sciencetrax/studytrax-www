import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.STX_SMTP_HOST ?? "email-smtp.us-east-2.amazonaws.com";
const SMTP_PORT = Number(process.env.STX_SMTP_PORT ?? 465);
const SMTP_USER = process.env.STX_SMTP_USER ?? "";
const SMTP_PASS = process.env.STX_SMTP_PASS ?? "";
const TO_ADDRESS = process.env.CONTACT_TO ?? "info@sciencetrax.dev";
const FROM_ADDRESS = process.env.CONTACT_FROM ?? "website@sciencetrax.dev";

// Pre-resolved IPs for email-smtp.us-east-2.amazonaws.com
// Avoids DNS resolution failures (EBUSY) on Vercel serverless
const SES_FALLBACK_IPS = ["18.188.75.34", "3.22.8.243", "3.23.0.113"];

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  institution: string;
  role: string;
  topic: string;
  message?: string;
}

function validate(body: unknown): ContactPayload {
  const b = body as Record<string, unknown>;
  const name = String(b.name ?? "").trim();
  const email = String(b.email ?? "").trim();
  const institution = String(b.institution ?? "").trim();
  const role = String(b.role ?? "").trim();
  const topic = String(b.topic ?? "").trim();

  if (!name || !email || !institution || !role || !topic) {
    throw new Error("Missing required fields: name, email, institution, role, topic");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Invalid email address");
  }

  return {
    name,
    email,
    phone: String(b.phone ?? "").trim() || undefined,
    institution,
    role,
    topic,
    message: String(b.message ?? "").trim() || undefined,
  };
}

function buildHtml(data: ContactPayload): string {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone ?? "—"],
    ["Institution", data.institution],
    ["Role", data.role],
    ["Topic", data.topic],
    ["Message", data.message ?? "—"],
  ];

  return `
    <div style="font-family: -apple-system, sans-serif; max-width: 600px;">
      <h2 style="color: #0a5f8e; margin-bottom: 16px;">New Contact Form Submission</h2>
      <table style="width: 100%; border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee; font-weight: 600; color: #333; width: 120px; vertical-align: top;">${label}</td>
            <td style="padding: 8px 12px; border-bottom: 1px solid #eee; color: #555;">${value}</td>
          </tr>`
          )
          .join("")}
      </table>
      <p style="margin-top: 20px; font-size: 12px; color: #999;">
        Sent from studytrax.com contact form
      </p>
    </div>
  `;
}

async function trySend(host: string, data: ContactPayload): Promise<void> {
  const transporter = nodemailer.createTransport({
    host,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    tls: {
      rejectUnauthorized: false,
      servername: SMTP_HOST,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  await transporter.sendMail({
    from: `"Studytrax Website" <${FROM_ADDRESS}>`,
    replyTo: `"${data.name}" <${data.email}>`,
    to: TO_ADDRESS,
    subject: `[Studytrax Contact] ${data.topic} — ${data.name} (${data.institution})`,
    html: buildHtml(data),
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = validate(body);

    // Try hostname first, then fall back to pre-resolved IPs
    const hosts = [SMTP_HOST, ...SES_FALLBACK_IPS];
    let lastError: Error | null = null;

    for (const host of hosts) {
      try {
        await trySend(host, data);
        return NextResponse.json({ ok: true });
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        if (!lastError.message.includes("EBUSY") && !lastError.message.includes("ETIMEDOUT") && !lastError.message.includes("getaddrinfo")) {
          throw lastError;
        }
      }
    }

    throw lastError ?? new Error("All SMTP hosts failed");
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Contact form error:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
