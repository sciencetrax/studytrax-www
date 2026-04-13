import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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

// Detail sections rendered inline below due to mixed content (paragraphs + lists)

const badges = [
  { label: "HIPAA compliant", sub: "Business Associate Agreement (BAA) in place with required administrative, physical, and technical safeguards" },
  { label: "21 CFR Part 11 ready", sub: "Supports electronic records and signatures with validated controls and audit trails" },
  { label: "ISO 27001\u2013aligned posture", sub: "Security program continuously monitored through Vanta" },
  { label: "Encryption standards", sub: "AES-256 encryption for data at rest and backups; TLS 1.2+ for data in transit" },
];

export default function ComplianceTrustPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-12 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6">Secure, compliant, and built for{" "}
            <span style={{ color: "var(--color-accent)" }}>Clinical Research</span>.
          </h1>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-3xl"
            style={{ color: "var(--color-muted)" }}
          >
            Studytrax is designed from the ground up to protect sensitive clinical and research
            data, combining enterprise-grade infrastructure, rigorous security controls, and
            compliance with key regulatory standards.
          </p>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-3xl mt-4"
            style={{ color: "var(--color-muted)" }}
          >
            Hosted in the cloud and available when you need it, Studytrax delivers the security,
            reliability, and peace of mind required for modern clinical research.
          </p>
        </div>
      </section>

      {/* Compliance badges */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <h2 className="text-xl font-semibold mb-3">Standards and compliance you can trust</h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-muted)" }}>
          Studytrax aligns with widely recognized security and regulatory frameworks:
        </p>
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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-2 pb-10">

        {/* Software security controls */}
        <div className="py-8 border-b" style={{ borderColor: "var(--color-border)" }}>
          <h2 className="text-xl font-semibold mb-3">Built-in software security controls</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
            Security is embedded directly into the platform:
          </p>
          <ul className="text-sm leading-relaxed mb-3 space-y-1 pl-5 list-disc" style={{ color: "var(--color-muted)" }}>
            <li>SSL-enforced access across all sessions</li>
            <li>Strong authentication and password protection (salted and hashed)</li>
            <li>Account lockout after failed login attempts</li>
            <li>Automatic session timeouts for inactivity</li>
            <li>Role-based access controls (RBAC)</li>
            <li>Comprehensive user activity auditing and audit trails</li>
          </ul>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
            These controls ensure that only authorized users access the right data, and every action is tracked.
          </p>
        </div>

        {/* Operational controls */}
        <div className="py-8 border-b" style={{ borderColor: "var(--color-border)" }}>
          <h2 className="text-xl font-semibold mb-3">Operational and process controls</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
            Security extends beyond software into organizational practices:
          </p>
          <ul className="text-sm leading-relaxed space-y-1 pl-5 list-disc" style={{ color: "var(--color-muted)" }}>
            <li>Documented security policies and procedures</li>
            <li>Security awareness training for all personnel</li>
            <li>Role-based access and strong authentication across systems handling PHI</li>
            <li>Continuous risk assessment and risk management processes</li>
            <li>Incident detection, reporting, and response workflows</li>
            <li>Data redundancy, backup, and disaster recovery planning</li>
            <li>Ongoing third-party evaluation of the security program</li>
          </ul>
        </div>

        {/* Hosting and infrastructure */}
        <div className="py-8 border-b" style={{ borderColor: "var(--color-border)" }}>
          <h2 className="text-xl font-semibold mb-3">Enterprise-grade hosting and infrastructure</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
            Studytrax runs in a secure, enterprise-class environment with layered protection:
          </p>
          <ul className="text-sm leading-relaxed mb-4 space-y-1 pl-5 list-disc" style={{ color: "var(--color-muted)" }}>
            <li>Multi-tier architecture with web and database servers separated</li>
            <li>Firewalls ensure the database is never publicly accessible</li>
            <li>Intrusion detection and continuous log monitoring</li>
            <li>Fully encrypted database storage on RAID-configured systems</li>
            <li>Physically secure data centers with strict access controls</li>
          </ul>
          <p className="text-sm leading-relaxed mb-3 font-medium" style={{ color: "var(--color-text)" }}>
            Resilience and backup:
          </p>
          <ul className="text-sm leading-relaxed space-y-1 pl-5 list-disc" style={{ color: "var(--color-muted)" }}>
            <li>Automated backups every 15 minutes</li>
            <li>AES-256 encrypted backups stored in geographically separate locations</li>
            <li>Secure transfer over encrypted connections</li>
            <li>Physical destruction of retired or failed drives by the hosting provider</li>
          </ul>
        </div>

        {/* Regulatory */}
        <div className="py-8 border-b" style={{ borderColor: "var(--color-border)" }}>
          <h2 className="text-xl font-semibold mb-3">Regulatory-ready by design</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
            Studytrax is purpose-built for clinical research environments:
          </p>
          <ul className="text-sm leading-relaxed mb-3 space-y-1 pl-5 list-disc" style={{ color: "var(--color-muted)" }}>
            <li>Operates under a Business Associate Agreement (BAA)</li>
            <li>Implements HIPAA-required safeguards across all layers</li>
            <li>Supports 21 CFR Part 11 requirements, including:</li>
          </ul>
          <ul className="text-sm leading-relaxed mb-3 space-y-1 pl-10 list-disc" style={{ color: "var(--color-muted)" }}>
            <li>Secure, computer-generated audit trails</li>
            <li>Role-based access and system validation controls</li>
            <li>Unique, non-transferable electronic signatures linked to records</li>
          </ul>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
            This ensures your study is aligned with regulatory expectations from day one.
          </p>
        </div>

        {/* Participant payments */}
        <div className="py-8 border-b" style={{ borderColor: "var(--color-border)" }}>
          <h2 className="text-xl font-semibold mb-3">Secure participant payments</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
            Participant compensation is handled securely and transparently:
          </p>
          <ul className="text-sm leading-relaxed space-y-1 pl-5 list-disc" style={{ color: "var(--color-muted)" }}>
            <li>Gift card fulfillment uses one-time tokens over encrypted connections (TLS 1.2+)</li>
            <li>No protected health information is shared with third-party reward providers</li>
            <li>Participant balances are stored securely within Studytrax, not external wallets</li>
            <li>Full payment audit trails support financial tracking and 1099 reporting</li>
          </ul>
        </div>

        {/* Closing */}
        <div className="py-8">
          <h2 className="text-xl font-semibold mb-3">Security you can rely on</h2>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
            From infrastructure to application controls to operational processes, Studytrax is designed to protect your data, support compliance, and meet the demands of clinical research at every stage.
          </p>
        </div>

        {/* Architecture diagram */}
        <div className="py-8">
          <Image
            src="/images/architecture-diagram.png"
            alt="Studytrax multi-tier security architecture: Internet to Firewall to DMZ with Web Server to Firewall to Private Network with Database Server on encrypted RAID 5, with offsite encrypted backups to Microsoft Azure geo-redundant storage every 15 minutes"
            width={800}
            height={500}
            className="mx-auto rounded-lg w-full max-w-3xl h-auto"
            style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }}
          />
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
