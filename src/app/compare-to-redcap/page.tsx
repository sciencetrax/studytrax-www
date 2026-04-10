import type { Metadata } from "next";
import Link from "next/link";
import SectionBlock from "@/components/SectionBlock";

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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do your participants only fill out forms, or do they need a reason to come back?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Studytrax provides an interactive participant portal with personalized disease information, secure messaging, reward points, and multi-study access, giving participants a reason to stay engaged and return.",
      },
    },
    {
      "@type": "Question",
      name: "Does your staff spend more time on administrative reports than on the research itself?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Studytrax automates IRB, progress, safety, and administrative reports, with all reports dynamically linked to live study data and updatable on demand.",
      },
    },
    {
      "@type": "Question",
      name: "When a study ends, does the analytical setup carry forward or start from scratch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The Studytrax Workbench lets you duplicate an entire workspace, including all variable coding, table designs, and analyses, and bring it into the next project with one click.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to get from collected data to submitted manuscript?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Studytrax integrates the analytical and publication workflow directly into the platform through the Workbench, with publication-ready tables linked to live data that update on demand.",
      },
    },
  ],
};

const blocks = [
  {
    heading: "REDCap works well when...",
    body: "Your data capture needs are straightforward, your team is comfortable managing the details, and there's no rush to turn data into results. It's free, with educational resources available to help your team learn the platform, and hourly support available if you need hands-on help with setup or troubleshooting.",
  },
  {
    heading: "Studytrax is built for when...",
    body: "You want to reclaim the time your team spends managing the research instead of doing it. When participant engagement matters, not just data collection but keeping people informed, motivated, and coming back. When workflows fit your team, not the other way around. When your research drives the configuration, not the application, with dedicated support to back it up.",
  },
];

const questions = [
  "Do your participants only fill out forms, or do they need a reason to come back?",
  "Does your staff spend more time on administrative reports than on the research itself?",
  "When a study ends, does the analytical setup carry forward or start from scratch?",
  "How long does it take to get from collected data to submitted manuscript?",
];

export default function CompareToREDCapPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6">When REDCap is enough, and when it is not.</h1>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-3xl"
            style={{ color: "var(--color-muted)" }}
          >
            REDCap and Studytrax are the only two EDC systems built for academic research and
            disease organizations. They serve the same community with different tools. Here's how
            to tell which one fits your work.
          </p>
        </div>
      </section>

      {/* Comparison blocks */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 gap-6 mb-6">
          {blocks.map((block, i) => (
            <SectionBlock key={i} heading={block.heading} body={block.body} />
          ))}
        </div>

        {/* Questions block */}
        <div
          className="rounded-lg p-8"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius)",
          }}
        >
          <h2 className="text-xl font-semibold mb-5">Questions worth asking before you choose.</h2>
          <div className="space-y-4">
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
          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-5">Switching is free.</h2>
          <p className="text-white/90 leading-relaxed text-base sm:text-lg mb-8">
            If you're currently on REDCap and want to evaluate Studytrax, we'll migrate your data
            at no cost. No disruption to your active studies. No pressure. If REDCap turns out to
            be the better fit for your specific work, we'll tell you.
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
