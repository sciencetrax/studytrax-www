import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Studytrax vs REDCap | Which EDC Fits Your Research?",
  description:
    "Honest comparison of Studytrax and REDCap for academic research and disease organizations. Free migration if you're ready to switch.",
  openGraph: {
    title: "Studytrax vs REDCap | Which EDC Fits Your Research?",
    description:
      "Honest comparison of Studytrax and REDCap for academic research and disease organizations. Free migration if you're ready to switch.",
    url: "https://www.studytrax.com/compare-to-redcap",
    type: "website",
    siteName: "Studytrax",
  },
  alternates: { canonical: "https://www.studytrax.com/compare-to-redcap" },
};

// NOTE: FAQPage schema intentionally removed. The "Questions worth asking"
// block is a set of discussion prompts, not canned Q&A entries.

interface DecisionFactor {
  icon: ReactNode;
  label: string;
  description?: string;
}

const iconProps = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

const factors: DecisionFactor[] = [
  {
    icon: (
      <svg {...iconProps}>
        <path d="M12 3v18" />
        <path d="M5 8h14" />
        <path d="M5 8l-2 8a5 5 0 0 0 10 0L11 8" />
        <path d="M19 8l-2 8a5 5 0 0 0 10 0L25 8" transform="translate(-6)" />
      </svg>
    ),
    label: "Overall Effort (Staff + Participants)",
    description:
      "Minimal coordination, low data entry \u27f7 Higher effort, ongoing coordination and data collection",
  },
  {
    icon: (
      <svg {...iconProps}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    label: "Participant Engagement",
    description:
      "Limited interaction needed \u27f7 Active engagement (communication, education, ongoing input)",
  },
  {
    icon: (
      <svg {...iconProps}>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
    label: "Real-Time Data Use",
    description:
      "Stored and reviewed later \u27f7 Used continuously for insight, reporting, and decisions",
  },
  {
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Clinical or Operational Integration",
    description:
      "Separate from care and workflows \u27f7 Integrated into clinical use, reporting, and operations",
  },
  {
    icon: (
      <svg {...iconProps}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    label: "Publication and Output Goals",
    description:
      "Occasional or external to the system \u27f7 Central, ongoing, and supported within the platform",
  },
  {
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    label: "Design Needs",
    description:
      "Fixed, predictable structure \u27f7 Dynamic, evolving, or multi-phase design",
  },
  {
    icon: (
      <svg {...iconProps}>
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    label: "Likely Future Studies / Registries",
    description:
      "Single, self-contained study \u27f7 Likely expansion into multiple or connected projects",
  },
];

const questions = [
  "Does the data entry experience motivate participants to stay enrolled?",
  "Would AI assisted data capture be helpful (e.g., paste a screen shot of lab values to complete a form)?",
  "How often do data errors occur in repeating, longitudinal events (e.g., tumors, adverse events, seizures)?",
  "How much time do staff spend on documentation and administrative activities?",
  "How often do investigators login to REDCap?",
  "What would make investigators login more often?",
  "How simple is it to extract and analyze data, and build manuscript tables?",
  "How much work can you reuse and automate across publications?",
  "What\u2019s the cost of siloed data, participants, and event calendars across studies?",
  "What happens when a REDCap feature limitation is hit?",
];

export default function CompareToREDCapPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-12 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6">A tool for collecting data, or a platform to put your data to{" "}
            <span style={{ color: "var(--color-accent)" }}>Work</span>
          </h1>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-3xl"
            style={{ color: "var(--color-muted)" }}
          >
            REDCap and Studytrax are the only two EDC systems built for academic research and
            disease organizations. Both secure your data.
          </p>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-3xl mt-5"
            style={{ color: "var(--color-muted)" }}
          >
            The difference is how each platform supports everything around how studies are run,
            how data is used, and how work evolves over time.
          </p>
          <p
            className="text-base sm:text-lg leading-relaxed max-w-3xl mt-4"
            style={{ color: "var(--color-muted)" }}
          >
            The dimensions below are designed to help you assess where your work falls. Across
            each, you may find yourself leaning in one direction or the other.
          </p>
        </div>
      </section>

      {/* Decision framework */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="mb-3">Where does your research / practice fall?</h2>
          <p className="text-sm sm:text-base" style={{ color: "var(--color-muted)" }}>
            The more contained your work, the more either option can fit. The more it grows,
            connects, and builds on prior work, the more the choice of platform matters.
          </p>
          <div className="grid grid-cols-[auto_1fr_auto] gap-3 sm:gap-5 items-center max-w-3xl mx-auto mt-8">
            {/* Row 1: LEANS labels aligned over LOW/HIGH columns */}
            <span
              className="text-base sm:text-xl font-semibold uppercase tracking-wide text-left"
              style={{ color: "#5a6b7f" }}
            >
              Leans REDCap
            </span>
            <span aria-hidden="true" />
            <span
              className="text-base sm:text-xl font-semibold uppercase tracking-wide text-right"
              style={{ color: "#0a5f8e" }}
            >
              Leans Studytrax
            </span>

            {/* Row 2: LOW [gradient bar] HIGH */}
            <span
              className="text-sm sm:text-base font-semibold uppercase tracking-wide"
              style={{ color: "#5a6b7f" }}
            >
              Low
            </span>
            <div
              className="relative h-2.5 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, #dbe3ec 0%, #c0ccdc 45%, #4a8ab0 75%, #0a5f8e 100%)",
              }}
              aria-hidden="true"
            >
              <span
                className="absolute -left-1 top-1/2 -translate-y-1/2 w-0 h-0"
                style={{
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderRight: "7px solid #dbe3ec",
                }}
              />
              <span
                className="absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0"
                style={{
                  borderTop: "6px solid transparent",
                  borderBottom: "6px solid transparent",
                  borderLeft: "7px solid #0a5f8e",
                }}
              />
            </div>
            <span
              className="text-sm sm:text-base font-semibold uppercase tracking-wide text-center"
              style={{ color: "#0a5f8e" }}
            >
              High
            </span>
          </div>
        </div>

        <div
          className="rounded-lg p-6 sm:p-10"
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #dbe3ec",
            borderRadius: "6px",
          }}
        >
          <ul className="space-y-8 sm:space-y-10">
            {factors.map((f) => (
              <li key={f.label} className="grid grid-cols-[auto_1fr] gap-4 sm:gap-6">
                <div
                  className="w-10 h-10 rounded flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "#f6f8fb",
                    color: "#0a5f8e",
                    border: "1px solid #dbe3ec",
                    borderRadius: "6px",
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <h3
                    className={`text-base sm:text-lg font-semibold text-center ${f.description ? "mb-1" : "mb-3"}`}
                    style={{ color: "#1a2332" }}
                  >
                    {f.label}
                  </h3>
                  {f.description && (
                    <p
                      className="text-sm leading-snug mb-3 text-center"
                      style={{ color: "#5a6b7f" }}
                    >
                      {f.description}
                    </p>
                  )}

                  {/* Scale bar */}
                  <div
                    className="relative h-2 rounded-full"
                    style={{
                      background:
                        "linear-gradient(to right, #dbe3ec 0%, #c0ccdc 45%, #4a8ab0 75%, #0a5f8e 100%)",
                    }}
                    aria-hidden="true"
                  >
                    {/* Arrowheads at each end */}
                    <span
                      className="absolute -left-1 top-1/2 -translate-y-1/2 w-0 h-0"
                      style={{
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                        borderRight: "6px solid #dbe3ec",
                      }}
                    />
                    <span
                      className="absolute -right-1 top-1/2 -translate-y-1/2 w-0 h-0"
                      style={{
                        borderTop: "5px solid transparent",
                        borderBottom: "5px solid transparent",
                        borderLeft: "6px solid #0a5f8e",
                      }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Questions block */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <div
          className="rounded-lg p-8"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
          }}
        >
          <h2 className="text-xl font-semibold mb-2">Questions that often clarify the right fit.</h2>
          <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: "var(--color-muted)" }}>
            These are the kinds of questions that often determine whether a platform meets your
            needs.
          </p>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
            {questions.map((q, i) => (
              <div key={i} className="flex gap-3">
                <span
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
                  style={{ backgroundColor: "var(--color-accent-warm)" }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  {q}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Switching block */}
      <section
        className="py-16 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-5">
            A simple, risk-free way to evaluate switching to Studytrax.
          </h2>
          <p className="text-white/90 leading-relaxed text-base sm:text-lg mb-8">
            If you&apos;re currently using REDCap, we&rsquo;ll review your project with you and
            determine if Studytrax is a better fit. If it is, we&rsquo;ll handle the migration at
            no cost with no disruption to your active studies. If not, we&rsquo;ll tell you that
            too, no pressure either way.
          </p>
          <Link
            href="/contact?topic=redcap-evaluation"
            className="inline-block px-8 py-3.5 rounded text-sm font-semibold bg-white transition-opacity hover:opacity-90"
            style={{ color: "var(--color-accent)", borderRadius: "var(--radius)" }}
          >
            Start a REDCap Evaluation
          </Link>
        </div>
      </section>

      {/* Internal links */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex flex-wrap gap-4">
          <Link
            href="/workbench"
            className="inline-block px-6 py-2.5 rounded text-sm font-semibold transition-colors hover:bg-gray-50"
            style={{
              color: "var(--color-accent)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius)",
            }}
          >
            Explore the Workbench
          </Link>
          <Link
            href="/compliance-trust"
            className="inline-block px-6 py-2.5 rounded text-sm font-semibold transition-colors hover:bg-gray-50"
            style={{
              color: "var(--color-text)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius)",
            }}
          >
            Compliance & Trust
          </Link>
          <Link
            href="/contact"
            className="inline-block px-6 py-2.5 rounded text-sm font-semibold transition-colors hover:bg-gray-50"
            style={{
              color: "var(--color-text)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius)",
            }}
          >
            Contact
          </Link>
        </div>
      </section>
    </>
  );
}
