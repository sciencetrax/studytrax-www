import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, LifeBuoy, LogIn } from "lucide-react";

export const metadata: Metadata = {
  title: "Support | Studytrax",
  description:
    "Get help with Studytrax. Access tutorials, FAQs, and the user guide through our wiki, open a support ticket, or sign in to the platform.",
  openGraph: {
    title: "Support | Studytrax",
    description:
      "Get help with Studytrax. Access tutorials, FAQs, and the user guide through our wiki, open a support ticket, or sign in to the platform.",
    url: "https://www.studytrax.com/support",
    type: "website",
    siteName: "Studytrax",
  },
  alternates: { canonical: "https://www.studytrax.com/support" },
};

const resources = [
  {
    Icon: LogIn,
    title: "Sign In to Studytrax",
    body: "Access your studies, registries, and Workbench projects.",
    cta: "Log In",
    href: "https://my.studytrax.com/",
    featured: true,
  },
  {
    Icon: BookOpen,
    title: "Studytrax Wiki",
    body: "Browse our collection of tutorials, FAQs, and the user's guide. Everything you need to get the most out of Studytrax.",
    cta: "See Our Wiki",
    href: "https://sciencetrax.atlassian.net/wiki",
  },
  {
    Icon: LifeBuoy,
    title: "Open a Support Ticket",
    body: "Got a question or an issue? Tell us about it and our team will get back to you.",
    cta: "Open a Ticket",
    href: "https://studytrax.zendesk.com/",
  },
];

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="py-12 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-6">
            We&apos;re here to{" "}
            <span style={{ color: "var(--color-accent)" }}>Help</span>.
          </h1>
          <p
            className="text-lg sm:text-xl leading-relaxed max-w-3xl"
            style={{ color: "var(--color-muted)" }}
          >
            Log in to your account, browse self-service documentation, or open a ticket.
            However you need support, we&apos;ve got you covered.
          </p>
        </div>
      </section>

      {/* Resource cards */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-6">
          {resources.map((r) => (
            <a
              key={r.title}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-lg p-8 flex flex-col transition-all duration-200 hover:-translate-y-1"
              style={{
                backgroundColor: r.featured ? "var(--color-accent)" : "#fff",
                border: r.featured
                  ? "1px solid var(--color-accent)"
                  : "1px solid var(--color-border)",
                borderRadius: "var(--radius)",
                boxShadow: r.featured
                  ? "0 4px 18px rgba(10, 95, 142, 0.25)"
                  : "0 2px 8px rgba(10, 95, 142, 0.04)",
              }}
            >
              <div
                className="mb-4 w-12 h-12 rounded-xl flex items-center justify-center"
                style={{
                  background: r.featured
                    ? "rgba(255,255,255,0.15)"
                    : "linear-gradient(135deg, rgba(10,95,142,0.1), rgba(26,128,186,0.06))",
                  color: r.featured ? "#fff" : "var(--color-accent)",
                }}
              >
                <r.Icon size={24} />
              </div>
              <h2
                className="text-lg font-semibold mb-2"
                style={{ color: r.featured ? "#fff" : "var(--color-text)" }}
              >
                {r.title}
              </h2>
              <p
                className="text-sm leading-relaxed mb-5 flex-grow"
                style={{
                  color: r.featured ? "rgba(255,255,255,0.85)" : "var(--color-muted)",
                }}
              >
                {r.body}
              </p>
              <span
                className="inline-flex items-center gap-1 text-sm font-semibold transition-transform group-hover:translate-x-1"
                style={{ color: r.featured ? "#fff" : "var(--color-accent)" }}
              >
                {r.cta}
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
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Additional help */}
      <section
        className="py-14 px-4 sm:px-6"
        style={{ backgroundColor: "var(--color-surface)" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-3">Need something else?</h2>
          <p className="text-sm sm:text-base mb-6" style={{ color: "var(--color-muted)" }}>
            If you cannot find what you are looking for, reach out directly. We are glad to help.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-3.5 rounded text-sm font-semibold btn-primary"
            aria-label="Contact Studytrax"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
