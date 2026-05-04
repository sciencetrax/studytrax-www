import type { Metadata } from "next";
import Link from "next/link";
import ImageLightbox from "@/components/ImageLightbox";
import {
  Users,
  Zap,
  Activity,
  FileText,
  Network,
  HeartPulse,
  Layout as LayoutIcon,
  BarChart3,
  TrendingUp,
  Calendar,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Studytrax vs REDCap | Which EDC Fits Your Research? | Studytrax",
  description:
    "Clinical research has changed. Compare Studytrax and REDCap across participant engagement, automated workflows, real-time data use, integrated analysis, and clinical integration.",
  openGraph: {
    title: "Studytrax vs REDCap | Which EDC Fits Your Research?",
    description:
      "Clinical research has changed. Compare Studytrax and REDCap across participant engagement, automated workflows, real-time data use, integrated analysis, and clinical integration.",
    url: "https://www.studytrax.com/compare-to-redcap",
    type: "website",
    siteName: "Studytrax",
  },
  alternates: { canonical: "https://www.studytrax.com/compare-to-redcap" },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Does the data entry experience motivate participants to stay enrolled?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Studytrax engages participants beyond data entry with communication, incentives, education, and feedback built in. Engaged participants complete more visits, return more surveys, and stay enrolled longer.",
      },
    },
    {
      "@type": "Question",
      name: "How much time do staff spend on documentation and administrative activities instead of research?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Studytrax automates reporting, documentation, follow-up, and coordination through event triggers, scheduled notifications, and rule-based actions, reducing the manual work that consumes coordinator time.",
      },
    },
    {
      "@type": "Question",
      name: "What would make investigators log in more often?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Investigators see real-time data they can use directly for reporting, decision support, and clinical practice, so the system becomes part of their daily workflow rather than a back-office tool.",
      },
    },
    {
      "@type": "Question",
      name: "How simple is it to extract and analyze data, and build manuscript tables?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Workbench connects live study data directly to datasets, tables, and reports, so the path from collected data to a submitted manuscript is shorter and repeatable, without disconnected tools.",
      },
    },
    {
      "@type": "Question",
      name: "How much work can you reuse and automate across publications and studies?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Studytrax is a multi-study, connected environment where datasets, transformations, tables, reports, and configurations carry forward, giving each new study or publication a head start.",
      },
    },
    {
      "@type": "Question",
      name: "What happens when a platform limitation is hit and your team needs something the system cannot do?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Studytrax provides hands-on support and a flexible configuration model, so workflows, forms, integrations, and clinical use cases can be tailored to fit how your team actually works.",
      },
    },
  ],
};

interface ExecutionBlock {
  heading: string;
  body: string | null;
  Icon: LucideIcon;
}

const executionBlocks: ExecutionBlock[] = [
  {
    heading: "Participant engagement that leads to better data",
    body: "Participants aren't just entering data. They're part of the system, with communication, incentives, education, and feedback built in. An engaged participant completes more visits, returns more surveys, and stays enrolled longer.",
    Icon: Users,
  },
  {
    heading: "Automated workflows that replace manual work",
    body: "Reporting, documentation, follow-up, and coordination happen automatically based on real-time data. Event triggers, scheduled notifications, and rule-based actions reduce the work that consumes coordinators and keeps investigators waiting.",
    Icon: Zap,
  },
  {
    heading: "Real-time data use that creates immediate value",
    body: "Data is available for reporting, decision support, and clinical use without exporting or rebuilding it elsewhere. Investigators and staff see what they need when they need it, not weeks later after a data pull.",
    Icon: Activity,
  },
  {
    heading: "Integrated analysis that accelerates publication",
    body: null, // rendered with inline link below
    Icon: FileText,
  },
  {
    heading: "A connected environment, not siloed projects",
    body: "All research projects and registries live within a single environment. Data can be shared across studies as needed, forms and configurations carry forward, and nothing is locked inside a standalone project. The result is a connected research program, not a collection of disconnected databases.",
    Icon: Network,
  },
  {
    heading: "Clinical integration that extends beyond research",
    body: "Use the same system to support clinical workflows, generate visit summaries, score assessments, and deliver insights at the point of care. Studytrax has supported clinical integration for years, bridging research data and clinical practice in a single platform.",
    Icon: HeartPulse,
  },
];

const rowIcons: Record<string, LucideIcon> = {
  "Core model": LayoutIcon,
  "Participant experience": Users,
  "Workflows": Zap,
  "Data use": BarChart3,
  "Analysis and publication": FileText,
  "Clinical integration": HeartPulse,
  "Scalability": TrendingUp,
};

interface ComparisonRow {
  area: string;
  redcap: string;
  studytraxFirst: string;
  studytraxRest: string;
}

const comparisonRows: ComparisonRow[] = [
  {
    area: "Core model",
    redcap:
      "A data capture and storage tool. You build forms, collect responses, and export the data for use elsewhere.",
    studytraxFirst: "A research and clinical execution platform.",
    studytraxRest:
      "Data capture is the starting point, not the end product. The system drives workflows, engages participants, and delivers results.",
  },
  {
    area: "Participant experience",
    redcap:
      "Participants complete forms. The interface is functional but not designed to keep them engaged or informed between visits.",
    studytraxFirst:
      "Participants interact with a portal that includes messaging, rewards, education, and feedback.",
    studytraxRest: "Engagement is built into the system, not bolted on. You choose what’s best to use.",
  },
  {
    area: "Workflows",
    redcap:
      "Coordination happens outside the system. Staff manage follow-ups, reminders, and reporting manually or through separate tools.",
    studytraxFirst:
      "Event triggers, scheduled notifications, and rule-based actions automate the coordination work that typically falls on study staff.",
    studytraxRest: "",
  },
  {
    area: "Data use",
    redcap:
      "Data is exported for analysis in external tools. Real-time reporting and decision support require additional infrastructure.",
    studytraxFirst:
      "Data is available for reporting, decision support, and clinical use in real time, without exporting or rebuilding in another system.",
    studytraxRest: "",
  },
  {
    area: "Analysis and publication",
    redcap:
      "Analysis and publication workflows happen outside the platform. Tables, datasets, and manuscripts are built in disconnected tools.",
    studytraxFirst:
      "The Workbench connects live study data to datasets, publication-ready tables, and organized academic output, all within the platform.",
    studytraxRest: "",
  },
  {
    area: "Clinical integration",
    redcap:
      "Primarily a research tool. Clinical use cases require workarounds or separate systems.",
    studytraxFirst:
      "Supports clinical workflows, visit summaries, assessment scoring, and point-of-care insights.",
    studytraxRest: "Research and clinical practice run in the same platform.",
  },
  {
    area: "Scalability",
    redcap:
      "Each project is a standalone database. Sharing data, forms, or analytical work across projects requires manual effort.",
    studytraxFirst: "All projects live in a connected environment.",
    studytraxRest:
      "Forms, data, and analytical work compound across studies and carry forward.",
  },
];

const questions = [
  "Does the data entry experience motivate participants to stay enrolled?",
  "How much time do staff spend on documentation and administrative activities instead of research?",
  "What would make investigators log in more often?",
  "How simple is it to extract and analyze data, and build manuscript tables?",
  "How much work can you reuse and automate across publications and studies?",
  "What happens when a platform limitation is hit and your team needs something the system cannot do?",
];

export default function CompareToREDCapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <section
        className="pt-8 pb-12 sm:pt-10 sm:pb-16 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="mb-6">Comparing Studytrax to REDCap?</h1>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto"
            style={{ color: "var(--color-text)" }}
          >
            The main difference is what the systems are designed to do. Most platforms are
            designed to capture and store data. Studytrax is built to engage participants,
            automate workflows, and deliver results fast, in research and in clinical practice.
          </p>
        </div>
      </section>

      {/* ── Section 1 — Clinical research has changed ─────────────── */}
      <section className="pt-8 pb-6 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-5">Clinical research has changed, and so have the requirements.</h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--color-muted)" }}>
              The goal is no longer just collecting data. Teams are expected to minimize dropouts
              and maximize complete datasets, reduce administrative burden across staff, turn data
              into results faster, and use data in real time to inform care and decisions. That
              requires more than a database.
            </p>
          </div>
        </div>
      </section>

      {/* ── Section 3 — Key differences (table) ──────────────────── */}
      <section className="pt-4 pb-8 px-4 sm:px-6">
        <div
          className="max-w-6xl mx-auto rounded-lg pt-4 pb-6 px-6 sm:pt-5 sm:pb-8 sm:px-10"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
          }}
        >
          <h2 className="text-center mb-5">Key differences.</h2>

          {/* Desktop / tablet table (>= 640px) */}
          <div className="hidden sm:block max-w-[960px] mx-auto overflow-x-auto">
            <table className="w-full" style={{ borderCollapse: "collapse", tableLayout: "fixed" }}>
              <colgroup>
                <col style={{ width: "140px" }} />
                <col />
                <col />
              </colgroup>
              <thead>
                <tr style={{ borderBottom: "2px solid var(--color-border)" }}>
                  <th className="text-left font-bold" style={{ color: "var(--color-accent)", padding: "16px" }}>
                    Area
                  </th>
                  <th className="text-left font-bold" style={{ color: "var(--color-accent)", padding: "16px" }}>
                    REDCap
                  </th>
                  <th className="text-left font-bold" style={{ color: "var(--color-accent)", padding: "16px" }}>
                    Studytrax
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => {
                  const RowIcon = rowIcons[row.area];
                  return (
                  <tr key={row.area} style={{ borderBottom: "1px solid var(--color-border)" }}>
                    <td className="font-semibold align-top" style={{ color: "var(--color-text)", padding: "16px" }}>
                      <div className="flex items-center gap-2.5">
                        {RowIcon && (
                          <span
                            className="inline-flex items-center justify-center w-8 h-8 rounded-md shrink-0"
                            style={{
                              background: "rgba(10,95,142,0.08)",
                              color: "var(--color-accent)",
                            }}
                            aria-hidden="true"
                          >
                            <RowIcon size={16} />
                          </span>
                        )}
                        <span>{row.area}</span>
                      </div>
                    </td>
                    <td className="align-top text-sm leading-relaxed" style={{ color: "var(--color-muted)", padding: "16px" }}>
                      {row.redcap}
                    </td>
                    <td className="align-top text-sm leading-relaxed" style={{ padding: "16px" }}>
                      <span className="font-semibold" style={{ color: "var(--color-accent)" }}>
                        {row.studytraxFirst}
                      </span>
                      {row.studytraxRest && (
                        <>
                          {" "}
                          <span style={{ color: "var(--color-text)" }}>{row.studytraxRest}</span>
                        </>
                      )}
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile stacked cards (< 640px) */}
          <div className="sm:hidden space-y-4 max-w-md mx-auto">
            {comparisonRows.map((row) => {
              const RowIcon = rowIcons[row.area];
              return (
              <div
                key={row.area}
                className="rounded-lg p-5"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius)",
                }}
              >
                <h3 className="font-bold text-base mb-3 flex items-center gap-2.5" style={{ color: "var(--color-text)" }}>
                  {RowIcon && (
                    <span
                      className="inline-flex items-center justify-center w-8 h-8 rounded-md shrink-0"
                      style={{
                        background: "rgba(10,95,142,0.08)",
                        color: "var(--color-accent)",
                      }}
                      aria-hidden="true"
                    >
                      <RowIcon size={16} />
                    </span>
                  )}
                  {row.area}
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "var(--color-muted)" }}>
                      REDCap
                    </p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                      {row.redcap}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "var(--color-accent)" }}>
                      Studytrax
                    </p>
                    <p className="text-sm leading-relaxed">
                      <span className="font-semibold" style={{ color: "var(--color-accent)" }}>
                        {row.studytraxFirst}
                      </span>
                      {row.studytraxRest && (
                        <>
                          {" "}
                          <span style={{ color: "var(--color-text)" }}>{row.studytraxRest}</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 2 — Built for execution ──────────────────────── */}
      <section className="pt-2 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-10">Studytrax is built for execution, not just storage.</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {executionBlocks.map((b) => {
              const Icon = b.Icon;
              return (
                <div
                  key={b.heading}
                  className="rounded-lg p-6"
                  style={{
                    backgroundColor: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius)",
                  }}
                >
                  <div
                    className="mb-4 w-11 h-11 rounded-xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, rgba(10,95,142,0.1), rgba(26,128,186,0.06))",
                      color: "var(--color-accent)",
                    }}
                    aria-hidden="true"
                  >
                    <Icon size={22} />
                  </div>
                  <h3
                    className="font-bold mb-2"
                    style={{ color: "var(--color-text)", fontSize: "1.1rem" }}
                  >
                    {b.heading}
                  </h3>
                  {b.body ? (
                    <p style={{ color: "var(--color-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                      {b.body}
                    </p>
                  ) : (
                    <p style={{ color: "var(--color-muted)", fontSize: "0.95rem", lineHeight: 1.6 }}>
                      Move from data collection to manuscript-ready outputs without disconnected
                      tools or delays. The{" "}
                      <Link
                        href="/workbench"
                        className="underline hover:no-underline"
                        style={{ color: "var(--color-accent)" }}
                      >
                        Workbench
                      </Link>{" "}
                      connects live study data directly to datasets, statistics, tables, and
                      reports, so the path from collected data to submitted manuscript is shorter
                      and repeatable.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Section 4 — Questions worth asking ───────────────────── */}
      <section className="pt-2 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto">
          <h2 className="text-center mb-6">Questions worth asking before you decide.</h2>
          <ol className="space-y-5 list-none p-0">
            {questions.map((q, i) => (
              <li key={q} className="flex gap-4 items-start">
                <span
                  className="font-bold tabular-nums shrink-0"
                  style={{
                    color: "var(--color-accent)",
                    fontSize: "2.25rem",
                    lineHeight: 1,
                    minWidth: "2.5rem",
                  }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <p
                  className="text-base sm:text-lg leading-relaxed pt-2"
                  style={{ color: "var(--color-text)" }}
                >
                  {q}
                </p>
              </li>
            ))}
          </ol>
          </div>
        </div>
      </section>

      {/* ── Section 4b — UI design and learning curve ────────────── */}
      <section className="pt-2 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="mb-3">UI design and the learning curve.</h2>
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Study setup example
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 items-start">
            <div>
              <p
                className="text-xs font-bold uppercase tracking-wide mb-2 text-center"
                style={{ color: "var(--color-muted)" }}
              >
                REDCap
              </p>
              <ImageLightbox
                src="/images/comparisons/redcap-setup.png"
                alt="REDCap study setup screen"
                caption="REDCap study setup"
                preserveAspectRatio
              />
            </div>
            <div>
              <p
                className="text-xs font-bold uppercase tracking-wide mb-2 text-center"
                style={{ color: "var(--color-accent)" }}
              >
                Studytrax
              </p>
              <ImageLightbox
                src="/images/comparisons/studytrax-setup.png"
                alt="Studytrax project setup screen"
                caption="Studytrax project setup"
                preserveAspectRatio
              />
            </div>
          </div>
          <p className="text-xs mt-3 text-center" style={{ color: "var(--color-muted)" }}>
            Click to enlarge
          </p>
        </div>
      </section>

      {/* ── Section 5 — CTA ──────────────────────────────────────── */}
      <section
        className="pt-8 pb-16 sm:pt-10 sm:pb-20 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
          <h2 className="mb-5">See how this would work for your team.</h2>
          <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: "var(--color-muted)" }}>
            We&apos;ll walk through your current process and show how Studytrax would support your
            research and clinical workflows. If your current approach already meets your needs,
            we&apos;ll tell you.
          </p>
          <Link
            href="/contact"
            className="btn-primary px-12 py-5 rounded text-base sm:text-lg font-semibold transition-colors whitespace-nowrap"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem" }}
          >
            <Calendar size={20} aria-hidden="true" className="shrink-0" />
            <span>Schedule a quick conversation</span>
          </Link>
          </div>
        </div>
      </section>
    </>
  );
}
