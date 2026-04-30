import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { type Testimonial } from "@/components/TestimonialCarousel";
import ProofPoints from "@/components/ProofPoints";
import { Users, FlaskConical, BarChart3, ClipboardList, UserCheck, Zap, PlayCircle } from "lucide-react";

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
    image: "/images/nurse.png",
    imageAlt: "Research participant smiling while looking at a tablet",
  },
];

// Testimonials from https://www.studytrax.com/real-world-evidence
const testimonials: Testimonial[] = [
  {
    name: "Dan Draine, PhD",
    organization: "Emory University",
    diseaseArea: "Epilepsy",
    quote:
      "We’ve been able to integrate multiple NIH and sponsored trials alongside a large patient registry in Studytrax, creating a seamless bridge between research and clinical care. Automated test scoring, clinic note generation, and delivering personalized results back to patients have fundamentally changed how we use our data.",
  },
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
      <section className="hero-gradient relative">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">

            {/* Left: copy + CTA */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <h1
                className="text-white mb-6 animate-fade-in-up"
                style={{ textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
              >
                Clinical research{" "}
                <span
                  className="relative inline-block"
                  style={{
                    color: "var(--color-accent-warm)",
                    lineHeight: 1.3,
                    paddingBottom: "0.05em",
                  }}
                >
                  Reimagined!
                </span>
                {" "}Patients engaged and informed, admin work eliminated, and
                results delivered faster.
              </h1>

              <p
                className="text-lg sm:text-xl mb-4 leading-relaxed animate-fade-in-up-delay-1"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                Run a single or multi-studies.
              </p>

              <ul className="mb-8 inline-block text-left space-y-2 animate-fade-in-up-delay-1 list-none p-0">
                {["Clinical Trials", "Patient Registries", "Surveys"].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-base sm:text-lg"
                    style={{ color: "rgba(255,255,255,0.92)" }}
                  >
                    <svg
                      width="20"
                      height="20"
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
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col items-center lg:items-start gap-3 animate-fade-in-up-delay-2">
                <Link
                  href="/contact"
                  className="btn-primary px-8 py-4 text-sm font-semibold rounded-lg"
                >
                  Get Started Reimagining
                </Link>
                <p
                  className="text-sm font-semibold inline-flex items-center gap-2"
                  style={{ color: "rgba(255,255,255,0.85)" }}
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

            {/* Right: nurse image + tagline + customer logos */}
            <div className="lg:col-span-5 animate-fade-in-up-delay-2">
              <div
                className="relative"
                style={{
                  aspectRatio: "4 / 3",
                  WebkitMaskImage:
                    "radial-gradient(ellipse 75% 75% at 50% 45%, #000 45%, transparent 100%)",
                  maskImage:
                    "radial-gradient(ellipse 75% 75% at 50% 45%, #000 45%, transparent 100%)",
                }}
              >
                <Image
                  src="/images/nurse.png"
                  alt="Smiling person looking at a tablet"
                  fill
                  priority
                  className="object-cover"
                  style={{ objectPosition: "center 35%" }}
                  sizes="(max-width: 1024px) 100vw, 480px"
                />
              </div>

              <div
                className="mt-5 text-center font-bold leading-tight"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                <p className="text-xl sm:text-2xl">
                  <span style={{ color: "var(--color-accent-warm)" }}>20+</span>{" "}
                  Years Experience
                </p>
                <p className="text-xl sm:text-2xl mt-1">
                  <span style={{ color: "var(--color-accent-warm)" }}>1000s</span>{" "}
                  of Trials &amp; Registries
                </p>
              </div>

              {/* Customer logo collage */}
              <div className="mt-5 grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-2.5">
                {[
                  { src: "/images/logos/mgb-mclean.png", alt: "Mass General Brigham McLean" },
                  { src: "/images/logos/mayo.png", alt: "Mayo Clinic" },
                  { src: "/images/logos/bwh.png", alt: "Brigham and Women's Hospital" },
                  { src: "/images/logos/tufts.png", alt: "Tufts Medical Center" },
                  { src: "/images/logos/boston-childrens.png", alt: "Boston Children's Hospital" },
                  { src: "/images/logos/mgb-childrens.png", alt: "Mass General Brigham Children's" },
                  { src: "/images/logos/ucsd.png", alt: "University of California, San Diego" },
                  { src: "/images/logos/utsw.png", alt: "University of Texas Southwestern" },
                  { src: "/images/logos/cure-hht.png", alt: "Cure HHT" },
                  { src: "/images/logos/prader-willi.png", alt: "Foundation For Prader-Willi Research" },
                  { src: "/images/logos/tsc.png", alt: "TSC Alliance" },
                  { src: "/images/logos/csnk2a1.png", alt: "CSNK2A1 Foundation" },
                ].map((logo) => (
                  <div
                    key={logo.src}
                    className="rounded-md p-2 flex items-center justify-center"
                    style={{
                      backgroundColor: "#ffffff",
                      minHeight: "60px",
                    }}
                  >
                    <Image
                      src={logo.src}
                      alt={logo.alt}
                      width={140}
                      height={70}
                      className="h-auto w-auto max-h-[48px] object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Video Overview ──────────────────────────────────────── */}
      <section
        className="py-16 sm:py-20 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
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
            <h2 style={{ color: "var(--color-accent)" }}>See Studytrax in action</h2>
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

      {/* ── Three Pillars ─────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-0" aria-label="Platform pillars">
        <h2 className="text-center mb-10" style={{ color: "var(--color-accent)" }}>
          From simple survey to integrated research
        </h2>
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

        {/* Integration hub diagram */}
        <div className="flex justify-center mt-6 mb-4">
          <Image
            src="/images/integration-hub.png"
            alt="Studytrax as the integration hub for studies and registries, connecting Participant Portal, Biorepository, EMR, Wearables, Devices, LIMS, and Staff"
            width={1600}
            height={900}
            className="block w-full max-w-full h-auto"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
        </div>
      </section>

      {/* ── Role Blocks ───────────────────────────────────────────── */}
      <section
        className="pt-14 pb-20 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
        aria-label="Who uses Studytrax"
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center mb-10" style={{ color: "var(--color-accent)" }}>Built for everyone on the research team.</h2>
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
          <h2 className="text-center mb-10" style={{ color: "var(--color-accent)" }}>Trusted by researchers.</h2>
          <div className="grid md:grid-cols-2 gap-5">
            {testimonials.map((t) => {
              const initials = t.name
                .split(" ")
                .slice(0, 2)
                .map((n) => n[0])
                .join("");
              return (
                <div
                  key={t.name}
                  className="rounded-lg p-6 sm:p-7 flex flex-col"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius)",
                    boxShadow: "0 2px 8px rgba(10, 95, 142, 0.04)",
                  }}
                >
                  <div
                    className="text-4xl leading-none mb-2 select-none font-serif"
                    style={{ color: "var(--color-accent)", opacity: 0.3 }}
                    aria-hidden="true"
                  >
                    &ldquo;
                  </div>
                  <blockquote
                    className="text-sm sm:text-base leading-relaxed italic mb-5 flex-grow"
                    style={{ color: "#1a2332" }}
                  >
                    {t.quote}
                  </blockquote>
                  <div className="flex items-center gap-3 pt-4" style={{ borderTop: "1px solid var(--color-border)" }}>
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{ backgroundColor: "var(--color-accent)", color: "#ffffff" }}
                      aria-hidden="true"
                    >
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate" style={{ color: "#1a2332" }}>
                        {t.name}
                      </p>
                      <p className="text-xs truncate" style={{ color: "var(--color-muted)" }}>
                        {t.organization}
                      </p>
                      {t.diseaseArea && (
                        <p
                          className="text-xs mt-1 inline-block px-2 py-0.5 rounded-full font-medium"
                          style={{
                            backgroundColor: "rgba(10,95,142,0.08)",
                            color: "var(--color-accent)",
                          }}
                        >
                          {t.diseaseArea}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
                Get Started Reimagining
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
