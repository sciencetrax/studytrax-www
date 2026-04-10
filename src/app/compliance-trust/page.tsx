import type { Metadata } from "next";
import Link from "next/link";
import ArchitectureDiagram from "@/components/ArchitectureDiagram";

export const metadata: Metadata = {
  title: "Security & Compliance | HIPAA, 21 CFR Part 11",
  description:
    "HIPAA compliant, 21 CFR Part 11 ready, continuously monitored through Vanta. Built for academic medical centers and disease organizations.",
  openGraph: {
    title: "Security & Compliance | HIPAA, 21 CFR Part 11 | Studytrax",
    description:
      "HIPAA compliant, 21 CFR Part 11 ready, continuously monitored through Vanta. Built for academic medical centers and disease organizations.",
    url: "https://www.studytrax.com/compliance-trust",
    type: "website",
    siteName: "Studytrax",
  },
  alternates: { canonical: "https://www.studytrax.com/compliance-trust" },
};

interface ComplianceSectionProps {
  heading: string;
  body: string;
}

function ComplianceSection({ heading, body }: ComplianceSectionProps) {
  return (
    <div
      className="py-8 border-b last:border-b-0"
      style={{ borderColor: "var(--color-border)" }}
    >
      <h2 className="text-xl font-semibold mb-3">{heading}</h2>
      <p className="leading-relaxed text-base" style={{ color: "var(--color-muted)" }}>
        {body}
      </p>
    </div>
  );
}

const sections = [
  {
    heading: "Software controls.",
    body: "Studytrax was designed from the ground up with data security in mind. SSL-enforced access, strong authentication, individually salted and hashed passwords, account locking after failed login attempts, inactive session timeouts, role-based security, and comprehensive user activity auditing are all built into the platform.",
  },
  {
    heading: "Process controls.",
    body: "Process controls encompass policies and procedures to protect data across the organization. These include documented security policies and procedures, security awareness training, role-based access with strong authentication for all systems containing PHI, user activity auditing, risk analysis and management, incident reporting and tracking, data redundancy and backup and disaster recovery strategy, and third-party evaluation of the security program.",
  },
  {
    heading: "Hosting and infrastructure.",
    body: "Studytrax runs in an enterprise-class data center with a Business Associate Agreement in place. The architecture uses a multi-tier strategy where web servers and database servers are physically separated, with a firewall between them, so the database is never publicly accessible. An offsite backup runs every 15 minutes. All backup data is encrypted using AES-256 and transferred to a geographically separate data center over SSL. The database resides on a fully encrypted drive in a RAID 5 configuration. Servers are protected by intrusion detection and log monitoring tools. In the event any disk is retired or fails, the hosting provider physically destroys the drive.",
  },
  {
    heading: "Compliance.",
    body: "Studytrax operates under a Business Associate Agreement and implements the administrative, procedural, physical, and technical safeguards required by HIPAA. The platform is built to address the requirements of 21 CFR Part 11 for electronic records and electronic signatures, including validated system controls, role-based access, secure audit trails, and electronic signatures that are unique to each individual, linked to the record, and cannot be removed or transferred. Studytrax's HIPAA and ISO 27001 security posture is continuously monitored through Vanta.",
  },
  {
    heading: "Participant payments.",
    body: "Gift-card fulfillment uses a one-time token passed over TLS 1.2+. No protected health information is transmitted to the reward provider. Participant balances are stored in the participant's Studytrax account, not in a third-party wallet. The complete payment trail is auditable for 1099 reporting.",
  },
];

const badges = [
  { label: "HIPAA", sub: "Business Associate Agreement in place" },
  { label: "21 CFR Part 11", sub: "Electronic records and signatures" },
  { label: "ISO 27001", sub: "Security posture monitored through Vanta" },
  { label: "AES-256", sub: "Encrypted offsite backups" },
];

export default function ComplianceTrustPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6">Secure, compliant, and built for clinical research.</h1>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-3xl"
            style={{ color: "var(--color-muted)" }}
          >
            Studytrax runs in the cloud, so it's available when you need it. Secure and compliant,
            Studytrax provides peace of mind knowing your clinical and research data are safe.
          </p>
        </div>
      </section>

      {/* Compliance badges */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {badges.map((b) => (
            <div
              key={b.label}
              className="rounded-lg p-5 text-center"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
              }}
            >
              <p
                className="font-bold text-sm mb-1"
                style={{ color: "var(--color-accent)" }}
              >
                {b.label}
              </p>
              <p className="text-xs leading-snug" style={{ color: "var(--color-muted)" }}>
                {b.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Detail sections */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        {sections.map((s) => (
          <ComplianceSection key={s.heading} heading={s.heading} body={s.body} />
        ))}

        {/* Architecture diagram */}
        <div className="py-8">
          <ArchitectureDiagram />
        </div>
      </section>

      {/* Internal links */}
      <section
        className="py-14 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-lg font-semibold mb-4">Ready to get started?</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-block px-6 py-2.5 rounded text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-accent)", borderRadius: "var(--radius)" }}
            >
              Contact Us
            </Link>
            <Link
              href="/"
              className="inline-block px-6 py-2.5 rounded text-sm font-semibold transition-colors hover:bg-gray-50"
              style={{
                color: "var(--color-text)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
