import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TestimonialCarousel, { type Testimonial } from "@/components/TestimonialCarousel";
import ProofPoints from "@/components/ProofPoints";
import { Users, FlaskConical, BarChart3, ClipboardList, UserCheck, Zap } from "lucide-react";

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
    variant: "engage",
    Icon: Users,
    iconBg: "rgba(10,95,142,0.1)",
    iconColor: "var(--color-accent)",
  },
  {
    heading: "Activate",
    body: "Activate your data through automated workflows, real-time reporting, insights, and decision support, reducing manual work.",
    variant: "activate",
    Icon: Zap,
    iconBg: "rgba(26,140,106,0.1)",
    iconColor: "var(--color-emerald)",
  },
  {
    heading: "Build",
    body: "Analyze and publish faster. Connect studies and build on prior work to reduce effort and accelerate progress.",
    variant: "build",
    Icon: BarChart3,
    iconBg: "rgba(91,62,168,0.1)",
    iconColor: "var(--color-violet)",
  },
];

const roles = [
  {
    title: "Investigators",
    body: "Publication workflow, Workbench, grant support, and compounding across studies. Every project builds on the last.",
    Icon: FlaskConical,
    badgeBg: "rgba(10,95,142,0.08)",
    badgeColor: "var(--color-accent)",
    borderAccent: "var(--color-accent)",
    // Doctor with tablet in clinical setting
    image: "https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=800&q=80",
    imageAlt: "Clinical investigator with tablet reviewing patient data",
  },
  {
    title: "Coordinators & Staff",
    body: "Central calendar, automated reporting, query management, event notifications, participant payments, and access compliance.",
    Icon: ClipboardList,
    badgeBg: "rgba(26,140,106,0.08)",
    badgeColor: "var(--color-emerald)",
    borderAccent: "var(--color-emerald)",
    // Medical staff working at computer in office
    image: "https://images.unsplash.com/photo-1666101041144-005dc1a64d6d?w=800&q=80",
    imageAlt: "Research coordinators collaborating at computer",
  },
  {
    title: "Participants",
    body: "An interactive portal with data entry, rewards, messaging, and personalized learning, diaries, and health insights.",
    Icon: UserCheck,
    badgeBg: "rgba(91,62,168,0.08)",
    badgeColor: "var(--color-violet)",
    borderAccent: "var(--color-violet)",
    // Patient using phone/portal — photo by National Cancer Institute
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
    imageAlt: "Research participant using patient portal",
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
      "Across multiple studies with varied designs, Studytrax has simplified the time burden of administrative reports and has become my go-to platform for our studies and included Studytrax in all our grant applications. Studytrax truly streamlines the entire research process.",
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

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="hero-gradient relative min-h-[80vh] flex items-center">
        {/* Background photo overlay */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1600&q=75"
            alt=""
            fill
            priority
            className="object-cover object-center"
            style={{ opacity: 0.12 }}
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-32 text-center">
          <h1
            className="text-white mb-6 animate-fade-in-up"
            style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            A database isn&apos;t the finish line,<br className="hidden sm:block" />
            it&apos;s the{" "}
            <span
              className="relative inline-block"
              style={{
                background: "linear-gradient(135deg, #60c4f4 0%, #a5e3ff 50%, #60c4f4 100%)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "shimmer 3s linear infinite",
              }}
            >
              Starting Line
            </span>
            .
          </h1>

          <p
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up-delay-1"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            Studytrax powers patient registries, clinical trials, and research projects
            for those looking to put data to work.
          </p>

          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up-delay-2">
            <Link
              href="/contact"
              className="btn-primary px-8 py-4 text-sm font-semibold rounded-lg"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float"
          aria-hidden="true"
        >
          <svg width="20" height="28" viewBox="0 0 20 28" fill="none">
            <rect x="1" y="1" width="18" height="26" rx="9" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <rect x="9" y="6" width="2" height="6" rx="1" fill="rgba(255,255,255,0.5)">
              <animateTransform attributeName="transform" type="translate" values="0,0;0,6;0,0" dur="1.6s" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>
      </section>

      {/* ── Three Pillars ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20" aria-label="Platform pillars">
        <div className="grid sm:grid-cols-3 gap-6">
          {pillars.map(({ heading, body, variant, Icon, iconBg, iconColor }) => (
            <div
              key={heading}
              className={`pillar-card pillar-card--${variant} p-8 text-center`}
            >
              <div
                className="pillar-icon"
                style={{ background: iconBg, color: iconColor }}
              >
                <Icon size={22} />
              </div>
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: "var(--color-text)" }}
              >
                {heading}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Role Blocks ───────────────────────────────────────────── */}
      <section
        className="py-20 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
        aria-label="Who uses Studytrax"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-10">Built for everyone on the research team.</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {roles.map(({ title, body, Icon, badgeBg, badgeColor, borderAccent, image, imageAlt }) => (
              <div
                key={title}
                className="role-card overflow-hidden"
                style={{ borderTop: `3px solid ${borderAccent}` }}
              >
                {/* Photo */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={image}
                    alt={imageAlt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(to bottom, transparent 40%, rgba(11,31,53,0.7) 100%)`,
                    }}
                  />
                </div>
                {/* Content */}
                <div className="p-7">
                  <div
                    className="role-badge"
                    style={{ background: badgeBg, color: badgeColor }}
                  >
                    <Icon size={12} aria-hidden="true" />
                    {title}
                  </div>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Productivity Block ────────────────────────────────────── */}
      <section className="productivity-section py-20 sm:py-28 px-4 sm:px-6 relative">
        {/* Background photo */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1576669801775-ff43c5ab079d?w=1400&q=70"
            alt=""
            fill
            className="object-cover object-center"
            style={{ opacity: 0.08 }}
            sizes="100vw"
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-5 text-white">
            Amplify your team.
          </h2>
          <p className="text-white leading-relaxed text-base sm:text-lg" style={{ color: "rgba(255,255,255,0.85)" }}>
            Run parallel studies from one platform, reuse core assets, and automate the work that
            slows you down, amplifying your team&rsquo;s efforts and enabling seamless growth as
            new studies are added.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/workbench"
              className="btn-primary px-6 py-3 rounded-lg text-sm font-semibold"
              style={{
                background: "#fff",
                color: "var(--color-accent)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
              }}
            >
              Explore the Workbench
            </Link>
            <Link
              href="/for-grant-writers"
              className="btn-outline-white px-6 py-3 rounded-lg text-sm font-semibold"
            >
              Grant Support
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section
        className="py-20 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
        aria-label="Testimonials"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-10">Trusted by researchers.</h2>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* ── Proof Points ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <ProofPoints />
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="px-4 sm:px-6 py-20">
        <div
          className="max-w-4xl mx-auto rounded-2xl p-12 sm:p-16 text-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, var(--color-navy) 0%, var(--color-accent) 100%)",
            backgroundSize: "200% 200%",
            animation: "hero-bg-shift 12s ease infinite",
          }}
        >
          {/* Dot grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
            aria-hidden="true"
          />
          <div className="relative z-10">
            <h2
              className="mb-4 text-white"
              style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", fontWeight: 700 }}
            >
              Ready to see what your data can do?
            </h2>
            <p className="mb-10 text-base sm:text-lg" style={{ color: "rgba(255,255,255,0.78)" }}>
              Five minutes and a conversation about your study is all it takes.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="btn-primary px-10 py-4 rounded-lg text-sm font-semibold"
                style={{
                  background: "#fff",
                  color: "var(--color-accent)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
                }}
              >
                Get Started
              </Link>
              <Link
                href="/compare-to-redcap"
                className="btn-outline-white px-10 py-4 rounded-lg text-sm font-semibold"
              >
                Compare to REDCap
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
