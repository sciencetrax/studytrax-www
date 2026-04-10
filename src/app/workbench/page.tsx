import type { Metadata } from "next";
import Link from "next/link";
import SectionBlock from "@/components/SectionBlock";

export const metadata: Metadata = {
  title: "Workbench | Publication Workflow for Clinical Research",
  description:
    "Organize academic output, build publication-ready tables linked to live study data, and carry your analytical work forward project after project.",
  openGraph: {
    title: "Workbench | Publication Workflow for Clinical Research | Studytrax",
    description:
      "Organize academic output, build publication-ready tables linked to live study data, and carry your analytical work forward project after project.",
    url: "https://www.studytrax.com/workbench",
    type: "website",
    siteName: "Studytrax",
  },
  alternates: { canonical: "https://www.studytrax.com/workbench" },
};

const blocks = [
  {
    heading: "One place for everything.",
    body: "Create a dedicated workspace for each manuscript, poster, report, or initiative. Pull in files, images, datasets, and statistical output. Bring in co-authors and collaborators and give them access to the data and output they need, nothing more, nothing less.",
  },
  {
    heading: "Build your data, your way.",
    body: "Point-and-click dataset creation without needing to understand the underlying data model. Select entire forms or individual variables. Recode and transform variables on the fly, dummy coding, collapsing categories, creating calculated fields. Check distributions, spot outliers, and resolve data quality issues before formal analysis begins.",
  },
  {
    heading: "Tables that update themselves.",
    body: "Design publication-ready tables by adding variable rows and columns, choosing summary options, and relabeling variables instantly. Generate IRB, progress, safety, and administrative reports in a word-processor interface that blends text, tables, and images. Everything is dynamically linked to the live study data, click update and every number refreshes.",
  },
  {
    heading: "Copy everything forward.",
    body: "Duplicate an entire workspace, all variable coding, table designs, analyses, and formatting, and bring it into the next iteration. Your Year 1 longitudinal analysis becomes the Year 2 template in one click. Annual IRB reports roll forward. Every piece of dissemination work you did on the last project is reusable on the next one.",
  },
];

export default function WorkbenchPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-20 sm:py-28 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6">Where data becomes results.</h1>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-3xl"
            style={{ color: "var(--color-muted)" }}
          >
            The Workbench is the space between collecting your data and getting it into the world.
            Organize every piece of academic and administrative output, prepare and analyze datasets,
            build publication-ready tables, and carry all of it forward to the next project.
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

      {/* Internal links */}
      <section
        className="py-14 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-6 text-xl font-semibold">Keep exploring</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/for-grant-writers"
              className="inline-block px-6 py-2.5 rounded text-sm font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "var(--color-accent)", borderRadius: "var(--radius)" }}
            >
              Grant Support
            </Link>
            <Link
              href="/"
              className="inline-block px-6 py-2.5 rounded text-sm font-semibold transition-colors hover:bg-gray-50"
              style={{
                color: "var(--color-accent)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
              }}
            >
              Back to Home
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
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
