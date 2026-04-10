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
        className="py-20 sm:py-28 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6">Five minutes is all it takes.</h1>
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
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                Studytrax licensing is handled on a per-project basis, tailored to work within the
                realities of academic research and nonprofit disease organizations, where funding
                cycles go up and down. Every license includes access to the full feature set.
                Licensing is not dependent on the number of participants, the number of sites, or
                which features you use.
              </p>
            </div>

            {/* What to expect */}
            <div>
              <h2 className="text-lg font-semibold mb-3">What to expect.</h2>
              <p className="text-sm leading-relaxed" style={{ color: "var(--color-muted)" }}>
                A quick chat about your study, your timeline, and your needs. From there we put
                together a proposal that fits your budget. No pressure, no obligation.
              </p>
            </div>

            {/* Proof points callout */}
            <div
              className="rounded-lg p-5"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
              }}
            >
              <p className="text-sm font-semibold mb-1" style={{ color: "var(--color-accent)" }}>
                Two decades of experience.
              </p>
              <p className="text-sm" style={{ color: "var(--color-muted)" }}>
                100+ medical centers, 1000+ trials. We've seen every budget scenario and made it
                work.
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
