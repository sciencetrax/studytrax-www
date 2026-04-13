import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

const AWS_REGION = process.env.AWS_SES_REGION ?? "us-east-2";
const ACCESS_KEY = process.env.STX_SMTP_USER ?? "";
const SECRET_KEY_RAW = process.env.STX_SES_SECRET ?? process.env.STX_SMTP_PASS ?? "";
const TO_ADDRESSES = (process.env.CONTACT_TO ?? "info@sciencetrax.dev").split(",").map((s) => s.trim());
const FROM_ADDRESS = process.env.CONTACT_FROM ?? "website@sciencetrax.dev";

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

  return `<div style="font-family:-apple-system,sans-serif;max-width:600px"><h2 style="color:#0a5f8e;margin-bottom:16px">New Contact Form Submission</h2><table style="width:100%;border-collapse:collapse">${rows.map(([label, value]) => `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;font-weight:600;color:#333;width:120px;vertical-align:top">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#555">${value}</td></tr>`).join("")}</table><p style="margin-top:20px;font-size:12px;color:#999">Sent from studytrax.com contact form</p></div>`;
}

// AWS Signature V4 helpers
function hmacSha256(key: Buffer | string, data: string): Buffer {
  return createHmac("sha256", key).update(data).digest();
}

function sha256(data: string): string {
  return createHmac("sha256", "").update(data).digest("hex");
  // Actually need hash not hmac for body
}

function sha256Hash(data: string): string {
  const { createHash } = require("crypto");
  return createHash("sha256").update(data).digest("hex");
}

async function sendViaSesApi(subject: string, htmlBody: string, toAddresses: string[], from: string, replyTo: string) {
  const host = `email.${AWS_REGION}.amazonaws.com`;
  const endpoint = `https://${host}/`;

  // Build SES query string
  const params = new URLSearchParams();
  params.set("Action", "SendEmail");
  params.set("Source", from);
  toAddresses.forEach((addr, i) => {
    params.set(`Destination.ToAddresses.member.${i + 1}`, addr);
  });
  params.set("ReplyToAddresses.member.1", replyTo);
  params.set("Message.Subject.Data", subject);
  params.set("Message.Subject.Charset", "UTF-8");
  params.set("Message.Body.Html.Data", htmlBody);
  params.set("Message.Body.Html.Charset", "UTF-8");

  const body = params.toString();
  const now = new Date();
  const dateStamp = now.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const shortDate = dateStamp.slice(0, 8);

  const payloadHash = sha256Hash(body);

  const canonicalHeaders = `content-type:application/x-www-form-urlencoded\nhost:${host}\nx-amz-date:${dateStamp}\n`;
  const signedHeaders = "content-type;host;x-amz-date";

  const canonicalRequest = [
    "POST",
    "/",
    "",
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join("\n");

  const credentialScope = `${shortDate}/${AWS_REGION}/ses/aws4_request`;
  const stringToSign = [
    "AWS4-HMAC-SHA256",
    dateStamp,
    credentialScope,
    sha256Hash(canonicalRequest),
  ].join("\n");

  const signingKey = hmacSha256(
    hmacSha256(
      hmacSha256(
        hmacSha256(`AWS4${SECRET_KEY_RAW}`, shortDate),
        AWS_REGION
      ),
      "ses"
    ),
    "aws4_request"
  );

  const signature = createHmac("sha256", signingKey).update(stringToSign).digest("hex");

  const authHeader = `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Host": host,
      "X-Amz-Date": dateStamp,
      "Authorization": authHeader,
    },
    body,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`SES API error (${res.status}): ${text}`);
  }

  return res.text();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = validate(body);

    await sendViaSesApi(
      `[Studytrax Contact] ${data.topic} — ${data.name} (${data.institution})`,
      buildHtml(data),
      TO_ADDRESSES,
      `"Studytrax Website" <${FROM_ADDRESS}>`,
      `"${data.name}" <${data.email}>`
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Contact form error:", message);
    return NextResponse.json({ ok: false, error: message }, { status: 400 });
  }
}
