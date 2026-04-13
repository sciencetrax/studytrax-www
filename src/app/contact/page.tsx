import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Get Started | Five Minutes Is All It Takes",
  description:
    "Per-project licensing tailored to your budget. In twenty years, we've always made it work. Quick chat, no pressure.",
  openGraph: {
    title: "Get Started | Five Minutes Is All It Takes | Studytrax",
    description:
      "Per-project licensing tailored to your budget. In twenty years, we've always made it work. Quick chat, no pressure.",
    url: "https://www.studytrax.com/contact",
    type: "website",
    siteName: "Studytrax",
  },
  alternates: { canonical: "https://www.studytrax.com/contact" },
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Studytrax",
  url: "https://www.studytrax.com/contact",
  description:
    "Get in touch with Studytrax for grant support, pricing, demos, and REDCap evaluations.",
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      {/* Hero */}
      <section
        className="py-12 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6">Check the fit in{" "}
            <span style={{ color: "var(--color-accent)" }}>Five Minutes</span>.
          </h1>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-3xl"
            style={{ color: "var(--color-muted)" }}
          >
            A quick conversation about your study and your funding scenario. That's it. The
            conversation is driven by you, and in over twenty years, we've always been able to
            make it work.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Left: Info blocks */}
          <div className="lg:col-span-2 space-y-8">
            {/* How pricing works */}
            <div>
              <h2 className="text-lg font-semibold mb-3">How pricing works.</h2>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
                Studytrax licensing is structured on a per-project basis, designed to align with the
                realities of academic research and nonprofit organizations, where timelines, scope,
                and funding can vary.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                Every license includes full access to the platform. Pricing is not tied to
                participant counts, number of sites, or feature usage, allowing your study to evolve
                without constraint.
              </p>
            </div>

            {/* What to expect */}
            <div>
              <h2 className="text-lg font-semibold mb-3">What to expect.</h2>
              <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--color-muted)" }}>
                We start with a quick conversation to understand your study, timeline, and goals.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                From there, we&apos;ll outline an approach that fits your project and aligns with
                how your study is structured, clear, straightforward, and easy to evaluate. No
                pressure, no obligation.
              </p>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-lg font-semibold mb-3">Built on experience.</h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                With over two decades of experience supporting 100+ medical centers and 1,000+
                studies, we&apos;ve seen every budget scenario and{" "}
                <strong style={{ color: "var(--color-accent)" }}>made it work</strong>.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            <h2 className="text-lg font-semibold mb-6">Send us a message.</h2>
            <Suspense fallback={<div>Loading form...</div>}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
