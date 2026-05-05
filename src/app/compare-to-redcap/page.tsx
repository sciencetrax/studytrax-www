import type { Metadata } from "next";
import Link from "next/link";
import ImageLightbox from "@/components/ImageLightbox";
import {
  Users,
  Zap,
  FileText,
  HeartPulse,
  Layout as LayoutIcon,
  TrendingUp,
  Calendar,
  PlayCircle,
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

const rowIcons: Record<string, LucideIcon> = {
  "Core model": LayoutIcon,
  "Participant experience": Users,
  "Workflows": Zap,
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
      "Participants complete forms.",
    studytraxFirst:
      "The participant portal can include interactive forms, messaging, rewards, education, and health insights.",
    studytraxRest: "Engagement is built in, not bolted on.",
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
    area: "Analysis and publication",
    redcap:
      "Data is exported for analysis in external tools. Real-time reporting, decision support, tables, datasets, and manuscripts all happen outside the platform in disconnected tools.",
    studytraxFirst:
      "Live study data flows directly into reporting, decision support, datasets, publication-ready tables, and organized academic output, all within the platform.",
    studytraxRest:
      "No exporting, no rebuilding in another system, available in real time.",
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

export default function CompareToREDCapPage() {
  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────── */}
      <section
        className="pt-8 pb-4 sm:pt-10 sm:pb-6 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="mb-6">Using REDCap. Why Switch?</h1>
          <ul className="inline-block text-left space-y-4 list-none p-0 mb-8">
            {["Save Time", "Engage Participants", "Accelerate Results"].map((item) => (
              <li
                key={item}
                className="flex items-center gap-4 text-2xl sm:text-3xl font-semibold"
                style={{ color: "var(--color-text)" }}
              >
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2ac491"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-3xl mx-auto"
            style={{ color: "var(--color-text)" }}
          >
            <strong>Studytrax</strong> and <strong>REDCap</strong> are the only two electronic
            data capture (EDC) systems designed for academic research and disease organizations,
            rather than the pharmaceutical industry. Despite the shared audience, Studytrax and
            REDCap have distinctly different development aims and feature sets.
          </p>
        </div>
      </section>

      {/* ── Video Overview ──────────────────────────────────────── */}
      <section
        className="pt-1 pb-6 sm:pt-2 sm:pb-8 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div
              className="shrink-0 flex items-center justify-center"
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, rgba(10,95,142,0.1), rgba(26,128,186,0.06))",
                color: "var(--color-accent)",
              }}
            >
              <PlayCircle size={24} />
            </div>
            <h2 style={{ color: "var(--color-accent)" }}>Overview of Studytrax</h2>
          </div>
          <div
            className="relative w-full rounded-lg overflow-hidden"
            style={{
              paddingBottom: "56.25%",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius)",
              boxShadow: "0 8px 32px rgba(10, 95, 142, 0.1)",
            }}
          >
            <iframe
              src="https://player.vimeo.com/video/494894766?h=&title=0&byline=0&portrait=0&loop=1"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Studytrax platform overview"
              style={{ border: "none" }}
            />
          </div>
        </div>
      </section>

      {/* ── Section 3 — Key differences (table) ──────────────────── */}
      <section className="pt-4 pb-8 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
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
                  <th className="text-left font-bold text-lg" style={{ color: "var(--color-accent)", padding: "16px" }}>
                    Area
                  </th>
                  <th className="text-left font-bold text-lg" style={{ color: "var(--color-accent)", padding: "16px" }}>
                    REDCap
                  </th>
                  <th className="text-left font-bold text-lg" style={{ color: "var(--color-accent)", padding: "16px" }}>
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

      {/* ── Section 4a — Where REDCap stops ──────────────────────── */}
      <section className="pt-2 pb-16 px-4 sm:px-6" style={{ backgroundColor: "var(--color-surface)" }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-10" style={{ color: "var(--color-accent)" }}>
            Where REDCap Stops
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: "Limited Clinical Use",
                body: "Real-time clinical use of data is impractical, requiring workarounds or separate systems.",
              },
              {
                title: "Inflexible Features",
                body: "Features don't match real-world workflows, with limited options for triggers, branching, or rules.",
              },
              {
                title: "Siloed Data",
                body: "Each project is a standalone database. Data isn't shared across studies, requiring duplicate entry.",
              },
              {
                title: "Delayed Changes",
                body: "Mid-study form modifications are technically involved, slow to deploy, and risk data loss.",
              },
              {
                title: "No Path To Publication",
                body: "No tools to organize datasets, build manuscript tables, or connect outputs back to studies.",
              },
              {
                title: "Limited Form Design",
                body: "Forms are flat one-row-per-variable layouts, with no multimedia, body diagrams, or mobile-responsive options.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="rounded-lg p-6 flex flex-col"
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid var(--color-border)",
                  borderTop: "3px solid var(--color-accent-warm)",
                  borderRadius: "var(--radius)",
                }}
              >
                <div
                  className="mb-3 w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: "rgba(200, 85, 44, 0.1)",
                    color: "var(--color-accent-warm)",
                  }}
                  aria-hidden="true"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <h3 className="text-base font-bold mb-2" style={{ color: "var(--color-text)" }}>
                  {p.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  {p.body}
                </p>
              </div>
            ))}
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

      {/* ── Section 4c — But REDCap is "free" ────────────────────── */}
      <section className="pt-2 pb-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-5">But REDCap is &ldquo;free.&rdquo;</h2>
            <p className="text-base sm:text-lg leading-relaxed mb-5" style={{ color: "var(--color-muted)" }}>
              For 20+ years, Studytrax has supported academic and disease-focused research from
              zero funding through major grants. If Studytrax fits your research, we&apos;ll find
              a way to make licensing work, academic budgets are real, and we structure around
              them. A 100% no-risk guarantee means you only stay if it&apos;s delivering.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-base sm:text-lg font-semibold underline hover:no-underline"
              style={{ color: "var(--color-accent)" }}
            >
              See how pricing works <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
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
          <div className="flex flex-col items-center gap-3">
            <Link
              href="/contact"
              className="btn-primary px-12 py-5 rounded text-base sm:text-lg font-semibold transition-colors whitespace-nowrap"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.625rem" }}
            >
              <Calendar size={20} aria-hidden="true" className="shrink-0" />
              <span>Book a 5-minute Fit Check Conversation</span>
            </Link>
            <p
              className="text-sm font-semibold inline-flex items-center gap-2"
              style={{ color: "var(--color-text)" }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                style={{ color: "var(--color-accent-warm)" }}
              >
                <path d="M12 2L4 5v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V5l-8-3z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              100% No Risk Guarantee
            </p>
          </div>
          </div>
        </div>
      </section>
    </>
  );
}
