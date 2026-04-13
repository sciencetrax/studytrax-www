import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SMTP_HOST = process.env.STX_SMTP_HOST ?? "mail.sciencetrax.dev";
const SMTP_PORT = Number(process.env.STX_SMTP_PORT ?? 465);
const SMTP_USER = process.env.STX_SMTP_USER ?? "";
const SMTP_PASS = process.env.STX_SMTP_PASS ?? "";
const TO_ADDRESS = process.env.CONTACT_TO ?? "info@sciencetrax.dev";
const FROM_ADDRESS = process.env.CONTACT_FROM ?? "website@sciencetrax.dev";

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  tls: { rejectUnauthorized: false },
});

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = validate(body);

    await transporter.sendMail({
      from: `"Studytrax Website" <${FROM_ADDRESS}>`,
      replyTo: `"${data.name}" <${data.email}>`,
      to: TO_ADDRESS,
      subject: `[Studytrax Contact] ${data.topic} — ${data.name} (${data.institution})`,
      html: buildHtml(data),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Contact form error:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
