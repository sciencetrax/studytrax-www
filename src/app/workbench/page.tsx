import type { Metadata } from "next";
import Link from "next/link";
import ImageLightbox from "@/components/ImageLightbox";

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

// Blocks rendered inline below due to mixed content (paragraphs + lists)

export default function WorkbenchPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-12 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6">Where your data becomes{" "}
            <span style={{ color: "var(--color-accent)" }}>Discoveries</span>
          </h1>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-3xl mb-4"
            style={{ color: "var(--color-muted)" }}
          >
            The Workbench is the bridge between collecting data and producing results.
            It transforms raw study data into publication-ready output, faster, smarter,
            and with far less effort.
          </p>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-3xl"
            style={{ color: "var(--color-muted)" }}
          >
            Design datasets, explore your data, build dynamic tables, and generate reports,
            all in one connected workspace that stays in sync with your study.
          </p>
        </div>
      </section>

      {/* Workbench screenshots — click to enlarge */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-2 pb-2">
        <div className="grid md:grid-cols-2 gap-5 items-start">
          <ImageLightbox
            src="/images/screenshots/investigator-biosketch-v2.png"
            alt="Studytrax biosketch and academic output view"
            caption="Biosketch and academic output"
            preserveAspectRatio
          />
          <ImageLightbox
            src="/images/screenshots/workbench-functions.png"
            alt="Studytrax Workbench functions overview"
            caption="Workbench functions"
            preserveAspectRatio
          />
        </div>
        <p className="text-xs mt-2 text-center" style={{ color: "var(--color-muted)" }}>
          Click to enlarge
        </p>
      </section>

      {/* Feature blocks */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 pb-12">
        <div className="grid sm:grid-cols-2 gap-6">

          {/* Block 1 */}
          <div
            className="rounded-lg p-7"
            style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }}
          >
            <h2 className="text-lg font-semibold mb-3">One workspace for every initiative</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
              Create a dedicated workspace for each manuscript, abstract, poster, grant report, IRB submission, or quality initiative.
            </p>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--color-muted)" }}>
              Bring everything together:
            </p>
            <ul className="text-sm leading-relaxed mb-3 space-y-1 pl-5 list-disc" style={{ color: "var(--color-muted)" }}>
              <li>Datasets, tables, and analyses</li>
              <li>Files, images, and statistical outputs</li>
              <li>Co-authors and collaborators with precise, role-based access</li>
            </ul>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Everyone works from the same live data, no version confusion, no unnecessary access.
            </p>
          </div>

          {/* Block 2 */}
          <div
            className="rounded-lg p-7"
            style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }}
          >
            <h2 className="text-lg font-semibold mb-3">Build datasets your way, no coding required</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
              Move from raw data to analysis-ready datasets in minutes.
            </p>
            <ul className="text-sm leading-relaxed mb-3 space-y-1 pl-5 list-disc" style={{ color: "var(--color-muted)" }}>
              <li>Point-and-click selection of forms or individual variables</li>
              <li>Recode, transform, dummy-code, and create calculated fields on the fly</li>
              <li>Collapse categories and tailor datasets to your exact needs</li>
              <li>Instantly review distributions, identify outliers, and resolve data issues early</li>
            </ul>
            <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--color-text)" }}>
              No programming. No bottlenecks. No delays.
            </p>
          </div>

          {/* Block 3 */}
          <div
            className="rounded-lg p-7"
            style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }}
          >
            <h2 className="text-lg font-semibold mb-3">Tables that stay in sync with your data</h2>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--color-muted)" }}>
              Create publication-ready tables directly from live study data:
            </p>
            <ul className="text-sm leading-relaxed mb-3 space-y-1 pl-5 list-disc" style={{ color: "var(--color-muted)" }}>
              <li>Add variables as rows or columns</li>
              <li>Choose summary statistics (n, %, mean, SD, and more)</li>
              <li>Relabel and format instantly</li>
            </ul>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Every table is dynamically linked to your data, so when your data updates, your tables update.
              No manual edits. No rework. No last-minute scrambling.
            </p>
          </div>

          {/* Block 4 */}
          <div
            className="rounded-lg p-7"
            style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }}
          >
            <h2 className="text-lg font-semibold mb-3">Reports that write themselves</h2>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--color-muted)" }}>
              Build professional reports in a familiar, document-style interface.
            </p>
            <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--color-muted)" }}>
              Combine text, self-updating tables, charts, and images to generate:
            </p>
            <ul className="text-sm leading-relaxed mb-3 space-y-1 pl-5 list-disc" style={{ color: "var(--color-muted)" }}>
              <li>IRB submissions and annual reports</li>
              <li>Progress and safety summaries</li>
              <li>Administrative and operational reports</li>
            </ul>
            <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Everything stays connected to your data, eliminating copy-paste errors and version control issues.
            </p>
          </div>

          {/* Block 5 */}
          <div
            className="rounded-lg p-7"
            style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }}
          >
            <h2 className="text-lg font-semibold mb-3">Reuse everything. Accelerate every next study.</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
              Turn your work into a repeatable advantage.
            </p>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
              Duplicate an entire workspace, including datasets, transformations, tables, reports, formatting, and supporting files, and carry it forward instantly.
            </p>
            <ul className="text-sm leading-relaxed mb-3 space-y-1 pl-5 list-disc" style={{ color: "var(--color-muted)" }}>
              <li>Year 1 analysis becomes your Year 2 starting point</li>
              <li>IRB reports roll forward automatically</li>
              <li>Proven outputs become reusable templates</li>
            </ul>
            <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--color-text)" }}>
              What used to take weeks now takes minutes.
            </p>
          </div>

          {/* Block 6 */}
          <div
            className="rounded-lg p-7"
            style={{ border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }}
          >
            <h2 className="text-lg font-semibold mb-3">From data collection to real-world impact</h2>
            <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
              Whether you&apos;re an investigator preparing manuscripts or a statistician coordinating analyses across studies, the Workbench removes the disconnect between data and output.
            </p>
            <p className="text-sm font-medium leading-relaxed" style={{ color: "var(--color-text)" }}>
              Publish faster.<br />
              Reuse your best work.<br />
              Spend less time on mechanics, and more time on science.
            </p>
          </div>

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
