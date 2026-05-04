import type { Metadata } from "next";
import Link from "next/link";

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

// Blocks rendered inline below due to mixed content (paragraphs + lists)

export default function ForGrantWritersPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-12 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6">Built-In Grant Score{" "}
            <span style={{ color: "var(--color-accent)" }}>Boost</span>
          </h1>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-3xl mb-4"
            style={{ color: "var(--color-muted)" }}
          >
            Every strong grant needs more than a database.
            It needs a clear, credible story for innovation, execution, and impact.
          </p>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-3xl mb-4"
            style={{ color: "var(--color-muted)" }}
          >
            Studytrax helps you tell that story, and back it up with a system that already delivers.
          </p>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-3xl"
            style={{ color: "var(--color-muted)" }}
          >
            From participant engagement to automated workflows to real-time dissemination, your
            proposal reflects not just what you plan to do, but what is already built and operational.
          </p>
        </div>
      </section>

      {/* Scoring table */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-4">
        <h2 className="text-xl font-semibold mb-3">How Studytrax strengthens your score</h2>
        <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--color-muted)" }}>
          Here&apos;s how Studytrax maps directly to what reviewers score, and what sets proposals apart.
        </p>
        <div className="overflow-x-auto">
          <table
            className="w-full text-sm border-collapse"
            style={{ borderRadius: "var(--radius)" }}
          >
            <thead>
              <tr style={{ backgroundColor: "var(--color-accent)", color: "#fff" }}>
                <th className="text-left px-4 py-3 font-semibold">Scoring Area</th>
                <th className="text-left px-4 py-3 font-semibold">What reviewers often see</th>
                <th className="text-left px-4 py-3 font-semibold">With Studytrax</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  area: "Innovation",
                  reviewers: "Standard data capture with limited differentiation",
                  studytrax: "Active participant engagement (portal, messaging, education, incentives), automated workflows, device integration, and real-time interaction built into the study",
                },
                {
                  area: "Approach",
                  reviewers: "General descriptions of data collection and analysis",
                  studytrax: "Clearly defined, executable workflows with event triggers, longitudinal tracking, automated processes, and integrated analysis tools",
                },
                {
                  area: "Data Management & Sharing (DMS)",
                  reviewers: "A plan describing what will happen after data collection",
                  studytrax: "A system where data is already organized, structured, and connected to analysis and outputs from day one",
                },
                {
                  area: "Dissemination",
                  reviewers: "Intent to publish, often disconnected from infrastructure",
                  studytrax: "Built-in Workbench linking live data to publication-ready tables, reports, and manuscripts, ready to generate outputs immediately",
                },
                {
                  area: "Collaboration",
                  reviewers: "“The team will collaborate” without clear structure",
                  studytrax: "Role-based access to shared workspaces, datasets, tables, and outputs, collaboration that is immediate, controlled, and audit-ready",
                },
                {
                  area: "Feasibility / Execution",
                  reviewers: "Strong ideas with unclear path to implementation",
                  studytrax: "A unified platform where data capture, workflows, analysis, reporting, and dissemination are already integrated and operational",
                },
                {
                  area: "Data Quality & Retention",
                  reviewers: "Risk of missing data and participant drop-off",
                  studytrax: "Engaged participants, automated reminders, dynamic workflows, and real-time validation improve completeness and data quality",
                },
                {
                  area: "Efficiency / Timeline",
                  reviewers: "Manual processes, multiple tools, and delayed outputs",
                  studytrax: "Automated workflows, reusable templates, and integrated reporting reduce manual effort and accelerate time to analysis and publication",
                },
              ].map((row, i) => (
                <tr
                  key={row.area}
                  style={{
                    backgroundColor: i % 2 === 0 ? "var(--color-surface)" : "#fff",
                    borderBottom: "1px solid var(--color-border)",
                  }}
                >
                  <td className="px-4 py-3 font-semibold align-top" style={{ color: "var(--color-accent)", minWidth: "140px" }}>
                    {row.area}
                  </td>
                  <td className="px-4 py-3 align-top" style={{ color: "var(--color-muted)" }}>
                    {row.reviewers}
                  </td>
                  <td className="px-4 py-3 align-top" style={{ color: "var(--color-text)" }}>
                    {row.studytrax}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Feature blocks */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-16">
        <div className="grid sm:grid-cols-2 gap-6">

          {/* Block 1 */}
          <div
            className="rounded-lg p-7"
            style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }}
          >
            <h2 className="text-lg font-semibold mb-3">Stronger Innovation. Clearer Approach. Higher confidence.</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
              Writing high-scoring Innovation and Approach sections becomes easier when your platform does the work.
            </p>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--color-muted)" }}>
              Studytrax enables you to clearly describe:
            </p>
            <ul className="text-sm leading-relaxed mb-3 space-y-1 pl-5 list-disc" style={{ color: "var(--color-muted)" }}>
              <li>Active participant engagement (portal, messaging, education, incentives)</li>
              <li>Automated workflows and event-driven data collection</li>
              <li>Device integration and longitudinal tracking</li>
              <li>Real-time reporting, visualization, and decision support</li>
              <li>Integrated analysis and publication workflows</li>
            </ul>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Instead of abstract plans, your proposal is grounded in specific, working capabilities reviewers can immediately understand.
            </p>
          </div>

          {/* Block 2 */}
          <div
            className="rounded-lg p-7"
            style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }}
          >
            <h2 className="text-lg font-semibold mb-3">A Data Management &amp; Sharing plan that actually runs</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
              Most DMS plans describe what will happen after the study.
            </p>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
              With Studytrax, your DMS plan is already operational from day one.
            </p>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--color-muted)" }}>
              Data flows directly into an integrated analysis and reporting environment, where it can be:
            </p>
            <ul className="text-sm leading-relaxed mb-3 space-y-1 pl-5 list-disc" style={{ color: "var(--color-muted)" }}>
              <li>Prepared and analyzed</li>
              <li>Transformed into publication-ready tables</li>
              <li>Organized into manuscripts, reports, and outputs</li>
            </ul>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              When reviewers read your plan, they&apos;re not reading intent.
              They&apos;re reading a description of a system that already works.
            </p>
          </div>

          {/* Block 3 */}
          <div
            className="rounded-lg p-7"
            style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }}
          >
            <h2 className="text-lg font-semibold mb-3">The dissemination advantage</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
              Dissemination is no longer a separate step, it&apos;s built into the study.
            </p>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--color-muted)" }}>
              With the Workbench:
            </p>
            <ul className="text-sm leading-relaxed mb-3 space-y-1 pl-5 list-disc" style={{ color: "var(--color-muted)" }}>
              <li>Data connects directly to tables, reports, and manuscripts</li>
              <li>Outputs stay linked to live data and update instantly</li>
              <li>Academic and administrative deliverables are organized in one place</li>
            </ul>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              This means faster publication, fewer delays, and a credible path from data to impact, something reviewers consistently look for.
            </p>
          </div>

          {/* Block 4 */}
          <div
            className="rounded-lg p-7"
            style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }}
          >
            <h2 className="text-lg font-semibold mb-3">Built-in collaboration for your entire team</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
              Your proposal can go beyond &ldquo;the team will collaborate.&rdquo;
            </p>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--color-muted)" }}>
              With Studytrax, collaboration is structured and immediate:
            </p>
            <ul className="text-sm leading-relaxed mb-3 space-y-1 pl-5 list-disc" style={{ color: "var(--color-muted)" }}>
              <li>Grant co-investigators, statisticians, and analysts access shared workspaces</li>
              <li>Teams work from live datasets, tables, and outputs, not static exports</li>
              <li>Permissions are controlled, so each contributor sees exactly what they need</li>
            </ul>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              This allows your Approach section to describe how collaboration actually happens, not just that it will.
            </p>
          </div>

          {/* Block 5 */}
          <div
            className="rounded-lg p-7"
            style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }}
          >
            <h2 className="text-lg font-semibold mb-3">From proposal to execution, no gap</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
              One of the biggest risks reviewers see: a strong proposal with no clear path to execution.
            </p>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
              Studytrax closes that gap.
            </p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Everything described in your grant, data capture, workflows, analysis, reporting, dissemination, is already supported in a single, connected platform.
            </p>
          </div>

          {/* Block 6 */}
          <div
            className="rounded-lg p-7"
            style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }}
          >
            <h2 className="text-lg font-semibold mb-3">A proven partner in funded research</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
              Studytrax has supported a wide range of funded projects, from small investigator-initiated studies to large R01s and multi-site networks.
            </p>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--color-muted)" }}>
              We provide:
            </p>
            <ul className="text-sm leading-relaxed mb-3 space-y-1 pl-5 list-disc" style={{ color: "var(--color-muted)" }}>
              <li>Platform access aligned to your study design</li>
              <li>Support letters tailored to your proposal</li>
              <li>Guidance on positioning Studytrax within your grant narrative</li>
            </ul>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              You&apos;re not just selecting software, you&apos;re strengthening your proposal.
            </p>
          </div>


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
