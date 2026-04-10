import type { Metadata } from "next";
import Link from "next/link";
import SectionBlock from "@/components/SectionBlock";

export const metadata: Metadata = {
  title: "Bump Up Your Grant Scores | Grant Support",
  description:
    "Strengthen your NIH Innovation and Approach sections with an EDC that integrates the dissemination plan directly into the application.",
  openGraph: {
    title: "Bump Up Your Grant Scores | Studytrax Grant Support",
    description:
      "Strengthen your NIH Innovation and Approach sections with an EDC that integrates the dissemination plan directly into the application.",
    url: "https://www.studytrax.com/for-grant-writers",
    type: "website",
    siteName: "Studytrax",
  },
  alternates: { canonical: "https://www.studytrax.com/for-grant-writers" },
};

const blocks = [
  {
    heading: "Submissions that work.",
    body: "Writing the Innovation and Approach sections just got a whole lot easier. The flexible configuration of Studytrax allows for a custom fit to your study's needs and an easy way to craft a story that stands out, whether it's participant engagement, staff workflows, device integration, event triggers, analytical routines, data visualizations, or automated reporting. Your Innovation and Approach sections become anchored in what the platform actually does. A Data Management and Sharing plan aligned to the NIH 2023 policy is operational from day one. And a support letter highlights Studytrax's extensive experience in successful grant-funded research.",
  },
  {
    heading: "The dissemination advantage.",
    body: "Your DMS plan is not a document, it's a running feature of the study. Most DMS plans describe what the team intends to do after the data is collected. With Studytrax, the plan is already operational: data flows into the Workbench, where it connects directly to publication-ready tables, reports, and organized academic output. When reviewers read your plan, they're reading a description of something that already works.",
  },
  {
    heading: "Bring in your team.",
    body: "Give collaborators access to the work, not just the data. Co-investigators, biostatisticians, and co-authors can be granted access to specific Workbench workspaces, datasets, tables, manuscript drafts, statistical output, without needing access to the full study. The collaborative infrastructure is already in the platform, so your Approach section can describe what's available and how it will be implemented.",
  },
  {
    heading: "Leveraging success.",
    body: "We've helped dozens of teams across a wide range of funded research, from small grants with little or no budget to large R01s and multi-site networks. Studytrax has a long history of successful grant-funded projects and the demonstrated competence to support yours.",
  },
];

export default function ForGrantWritersPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6">Bump up your grant scores.</h1>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-3xl"
            style={{ color: "var(--color-muted)" }}
          >
            Every grant needs a competitive edge to maximize the score, and simply having a database
            does not move the needle. Studytrax stands out with an innovative, responsive approach
            that maximizes the engagement of participants and staff alike, custom-fits to your
            study's needs, and integrates the dissemination plan directly into the application.
            A partner vested in your success.
          </p>
        </div>
      </section>

      {/* Feature blocks */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid sm:grid-cols-2 gap-6">
          {blocks.map((block, i) => (
            <SectionBlock key={i} heading={block.heading} body={block.body} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-16 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-white text-2xl sm:text-3xl font-bold mb-4">
            Start your grant-support conversation.
          </h2>
          <p className="text-white/90 mb-8 text-base">
            Tell us about your study and your funding scenario. We'll take it from there.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded text-sm font-semibold bg-white transition-opacity hover:opacity-90"
            style={{ color: "var(--color-accent)", borderRadius: "var(--radius)" }}
          >
            Start your grant-support conversation
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
