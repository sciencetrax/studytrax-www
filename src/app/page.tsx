import type { Metadata } from "next";
import Link from "next/link";
import TestimonialCard from "@/components/TestimonialCard";
import ProofPoints from "@/components/ProofPoints";

export const metadata: Metadata = {
  title: "Studytrax | EDC for Academic Research & Disease Organizations",
  description:
    "Studytrax puts clinical research data to work. Engage participants, accelerate publication, and build on every project. For academic researchers and disease organizations.",
  openGraph: {
    title: "Studytrax | EDC for Academic Research & Disease Organizations",
    description:
      "Studytrax puts clinical research data to work. Engage participants, accelerate publication, and build on every project. For academic researchers and disease organizations.",
    url: "https://www.studytrax.com/",
    type: "website",
    siteName: "Studytrax",
  },
  alternates: { canonical: "https://www.studytrax.com/" },
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Studytrax",
  applicationCategory: "HealthApplication",
  operatingSystem: "Web-based",
  description:
    "Electronic data capture platform for academic researchers and disease organizations looking to put data to work.",
};

const pillars = [
  "Engage and inform participants as a community.",
  "Turn data into action, for participants, clinicians, and staff alike.",
  "Connect, share, and build upon every project.",
];

const roles = [
  {
    title: "Investigators",
    body: "Publication workflow, Workbench, grant support, and compounding across studies. Every project builds on the last.",
  },
  {
    title: "Coordinators & Administrators",
    body: "Central calendar, automated reporting, query management, event notifications, participant payments, and compliance. Everything in one place.",
  },
  {
    title: "Participants",
    body: "The portal, rewards, secure messaging, personalized disease information, and multi-study access. Participants stay informed and engaged.",
  },
];

const testimonials = [
  { name: "Lisa Cole Burnett PhD" },
  { name: "V.F. Froelicher MD" },
  { name: "Stacey Grabert PharmD" },
  { name: "Galit Kleiner-Fisman MD" },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />

      {/* Hero */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6">
            A database is the starting line, not the finish line.
          </h1>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            Studytrax is for academic researchers and disease organizations looking to put data to work.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded text-white font-semibold text-sm transition-opacity hover:opacity-90"
            style={{ backgroundColor: "var(--color-accent)", borderRadius: "var(--radius)" }}
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Three Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16" aria-label="Platform pillars">
        <div className="grid sm:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => (
            <div
              key={i}
              className="rounded-lg p-7 text-center"
              style={{
                border: "2px solid var(--color-border)",
                borderRadius: "var(--radius)",
                borderTopColor: "var(--color-accent)",
                borderTopWidth: "3px",
              }}
            >
              <p className="font-medium leading-snug" style={{ color: "var(--color-text)" }}>
                {pillar}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Role Blocks */}
      <section
        className="py-16 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
        aria-label="Who uses Studytrax"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-10">Built for everyone on the research team.</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {roles.map((role) => (
              <div
                key={role.title}
                className="rounded-lg p-7"
                style={{
                  backgroundColor: "#fff",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius)",
                }}
              >
                <h2 className="text-base font-semibold mb-3">{role.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  {role.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productivity Block */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div
          className="rounded-xl p-10 sm:p-14"
          style={{ backgroundColor: "var(--color-accent)", borderRadius: "var(--radius)" }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-white">
            Do more with the same team.
          </h2>
          <p className="text-white/90 leading-relaxed max-w-2xl text-base sm:text-lg">
            Run parallel studies and registries from a single platform. Reuse forms, datasets,
            analyses, and reports across projects. Automate the administrative work that eats your
            week. Studytrax does not add headcount, it amplifies the team you already have.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/workbench"
              className="inline-block px-6 py-2.5 rounded text-sm font-semibold bg-white transition-opacity hover:opacity-90"
              style={{ color: "var(--color-accent)", borderRadius: "var(--radius)" }}
            >
              Explore the Workbench
            </Link>
            <Link
              href="/for-grant-writers"
              className="inline-block px-6 py-2.5 rounded text-sm font-semibold border-2 border-white text-white transition-opacity hover:opacity-90"
              style={{ borderRadius: "var(--radius)" }}
            >
              Grant Support
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="py-16 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
        aria-label="Testimonials"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-10">Trusted by researchers.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} name={t.name} />
            ))}
          </div>
        </div>
      </section>

      {/* Proof Points */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <ProofPoints />
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="text-center">
          <h2 className="mb-4">Ready to see what your data can do?</h2>
          <p className="mb-8 text-base" style={{ color: "var(--color-muted)" }}>
            Five minutes and a conversation about your study is all it takes.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-block px-8 py-3 rounded text-white font-semibold text-sm transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-accent)", borderRadius: "var(--radius)" }}
            >
              Get Started
            </Link>
            <Link
              href="/compare-to-redcap"
              className="inline-block px-8 py-3 rounded font-semibold text-sm transition-colors hover:bg-gray-50"
              style={{
                color: "var(--color-accent)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
              }}
            >
              Compare to REDCap
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
