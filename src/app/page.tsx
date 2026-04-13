import type { Metadata } from "next";
import Link from "next/link";
import TestimonialCarousel, { type Testimonial } from "@/components/TestimonialCarousel";
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
  {
    heading: "Engage",
    body: "Engage participants with a personalized, interactive experience that keeps them informed, involved, and motivated.",
  },
  {
    heading: "Activate",
    body: "Activate your data through automated workflows, real-time reporting, insights, and decision support, reducing manual work.",
  },
  {
    heading: "Build",
    body: "Analyze and publish faster. Connect studies and build on prior work to reduce effort and accelerate progress.",
  },
];

const roles = [
  {
    title: "Investigators",
    body: "Publication workflow, Workbench, grant support, and compounding across studies. Every project builds on the last.",
  },
  {
    title: "Coordinators & Staff",
    body: "Central calendar, automated reporting, query management, event notifications, participant payments, and access compliance.",
  },
  {
    title: "Participants",
    body: "An interactive portal with data entry, rewards, messaging, and personalized learning, diaries, and health insights.",
  },
];

// Testimonials from https://www.studytrax.com/real-world-evidence
const testimonials: Testimonial[] = [
  {
    name: "Harland Winter, MD",
    organization: "Mass General Brigham",
    diseaseArea: "Inflammatory Bowel Disease",
    designs: "Multiple Patient Registries and clinical trials.",
    quote:
      "Studytrax is our platform of choice for patient registries and clinical trials. I especially appreciate the responsive support team and the truly collaborative setup process that makes every new study feel straightforward.",
  },
  {
    name: "Ryan Uitti, MD",
    organization: "Mayo Clinic",
    diseaseArea: "Movement Disorders",
    designs: "Multiple Patient Registries and clinical trials.",
    quote:
      "I've used Studytrax for over 20 years.  Data entry is easy, allows for integration of multiple registries and simplifies analysis for discovery and publication.",
  },
  {
    name: "Theresa Strong, PhD",
    organization: "Foundation For Prader-Willi Research",
    diseaseArea: "Prader-Willi Syndrome",
    designs: "Multiple Patient Registries and clinical trials.",
    quote:
      "Having both registry and clinical trial infrastructure in a single system streamlined our operations, facilitated data entry, and made analysis much more efficient. We\u2019ve gotten super positive feedback from the clinical trial sites on the ease of using Studytrax for data collection.",
  },
  {
    name: "Daniel Solomon, MD MPH",
    organization: "Brigham and Women's Hospital",
    diseaseArea: "Rheumatoid arthritis",
    designs: "Multiple large-scale clinical trials.",
    quote:
      "Studytrax has been outstanding for running several large-scale, NIH-supported clinical trials. The workflow automation keeps participant recruitment and study progress on track, dramatically reducing administrative burden.",
  },
  {
    name: "Gabrielle Rushing, PhD",
    organization: "CSNK2A1 Foundation",
    diseaseArea: "Okur-Chung Neurodevelopmental Syndrome",
    designs: "Multiple Patient Registries, clinical trials, surveys.",
    quote:
      "Having worked with Studytrax at multiple organizations, I am consistently impressed by the excellent setup assistance and the powerful patient portal and engagement tools. They ensure participants\u2019 voices are heard and integrated into the platform, making it easy to contribute.",
  },
  {
    name: "Sai Krupa Das, PhD",
    organization: "Tufts Medical Center",
    diseaseArea: "Nutrition Science and Policy",
    designs: "Multiple observational studies and clinical trials.",
    quote:
      "Studytrax supports the implementation of multiple study designs with it\u2019s uniquely versatile portal. Their customer service is excellent, and the team is highly responsive and always helpful.",
  },
  {
    name: "Lynne Bird, MD",
    organization: "University of California, San Diego",
    diseaseArea: "Angelman syndrome",
    designs: "Large scale patient registry",
    quote:
      "Transitioning to Studytrax was smooth, even with a large existing registry. The staff made the migration seamless, and we now have access to powerful new features, especially the patient portal.",
  },
  {
    name: "Anastassios Pittas, MD",
    organization: "Tufts Medical Center",
    diseaseArea: "Diabetes",
    designs: "Multiple clinical trials",
    quote:
      "Across multiple studies with varied designs, StudyTrax has simplified the time burden of administrative reports and has become my go-to platform for our studies and included StudyTrax in all our grant applications. StudyTrax truly streamlines the entire research process.",
  },
  {
    name: "Benjamin Levine, MD",
    organization: "University of Texas Southwestern Medical Center",
    diseaseArea: "Cardiovascular disease",
    designs: "Cardiovascular risk survey and report",
    quote:
      "Studytrax\u2019s multimedia capabilities (video, images, etc.) allowed us to create rich, engaging forms that enabled us to optimize a strategy for asking young athletes about relevant cardiovascular symptoms. Data quality and completion rates were excellent.",
  },
  {
    name: "Gregory Homish, PhD",
    organization: "University at Buffalo",
    diseaseArea: "Substance use and misuse",
    designs: "Several large-scale observational studies.",
    quote:
      "In our NIH-funded study, Studytrax's portal incentives features were key to engaging and retaining participants through an extensive data-entry protocol. The platform performed exceptionally well.",
  },
  {
    name: "Richard Morse",
    organization: "Mass General Brigham",
    diseaseArea: "Information Technology",
    designs: "Multiple Patient Registries, clinical trials, surveys.",
    quote:
      "I\u2019ve used Studytrax for many studies for many years. The support is fantastic, and they are very responsive to requests. The ability to use Javascript, the export API, and many other features have worked very well.",
  },
  {
    name: "Lindsey Holiday, MA",
    organization: "Mass General Brigham McLean",
    diseaseArea: "Study coordinator",
    designs: "Multiple clinical trials.",
    quote:
      "Studytrax has made it much easier to manage clinical trials by automating documentation, participant payment tracking, and reporting.",
  },
  {
    name: "Kari Luther Rosbeck",
    organization: "TSC Alliance",
    diseaseArea: "Tuberous sclerosis complex",
    designs: "Large scale patient registry and multiple study designs",
    quote:
      "Studytrax has been an exceptional partner for our large, multi-site registry of thousands of patients and has enabled us to grow to include patient reported outcomes. With the ease and detail of the platform, it also allows us to identify patients for participation into numerous studies and scales beautifully.",
  },
  {
    name: "Matt Johnson",
    organization: "AutonomUS Inc.",
    diseaseArea: "Information Technology",
    designs: "Cohort trial",
    quote:
      "Studytrax has been instrumental in the success of our research. The ability to export well-organized data, ease of use, and prompt technical support have made Studytrax a pleasure to use.",
  },
  {
    name: "Batsheva Friedman",
    organization: "Boston Children\u2019s Hospital",
    diseaseArea: "Study Coordinator",
    designs: "Multi-site patient registry",
    quote:
      "Studytrax has been a helpful tool for our team, allowing us to customize queries, collect participant-reported data through the secure patient portal, and manage study tasks and progress.",
  },
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
        className="py-12 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6">
            A database isn&apos;t the finish line, it&apos;s the{" "}
            <span style={{ color: "var(--color-accent)" }}>Starting Line</span>.
          </h1>
          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            style={{ color: "var(--color-muted)" }}
          >
            StudyTrax powers patient registries, clinical trials, and research projects for those looking to put data to work.
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
          {pillars.map((pillar) => (
            <div
              key={pillar.heading}
              className="rounded-lg p-7 text-center"
              style={{
                border: "2px solid var(--color-border)",
                borderRadius: "var(--radius)",
                borderTopColor: "var(--color-accent)",
                borderTopWidth: "3px",
              }}
            >
              <h2
                className="text-lg font-bold mb-2"
                style={{ color: "var(--color-accent)" }}
              >
                {pillar.heading}
              </h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {pillar.body}
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
                <h2 className="text-base font-semibold mb-3" style={{ color: "var(--color-accent)" }}>{role.title}</h2>
                <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                  {role.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productivity Block */}
      <section
        className="py-16 sm:py-20 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-accent)" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-white">
            Amplify your team.
          </h2>
          <p className="text-white leading-relaxed text-base sm:text-lg">
            Run parallel studies from one platform, reuse core assets, and automate the work that
            slows you down, amplifying your team&rsquo;s efforts and enabling seamless growth as
            new studies are added.
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
          <TestimonialCarousel testimonials={testimonials} />
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
