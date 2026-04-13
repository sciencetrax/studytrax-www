"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const roles = [
  "PI",
  "Research Administrator",
  "Study Coordinator",
  "Department Chair",
  "Other",
];

const topics = [
  "Grant Support",
  "Pricing",
  "Demo",
  "REDCap Evaluation",
  "General Inquiry",
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const topicRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    const topicParam = searchParams.get("topic");
    if (topicParam && topicRef.current) {
      const match = topics.find(
        (t) => t.toLowerCase().replace(/\s+/g, "-") === topicParam.toLowerCase()
      );
      if (match) {
        topicRef.current.value = match;
      }
    }
  }, [searchParams]);

  return (
    /* [PLACEHOLDER: form-endpoint] */
    <form
      method="POST"
      action="#"
      className="space-y-5"
      aria-label="Contact form"
    >
      <div>
        <label
          htmlFor="contact-name"
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--color-text)" }}
        >
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="w-full px-4 py-2.5 rounded border text-sm transition-colors"
          style={{
            borderColor: "var(--color-border)",
            borderRadius: "var(--radius)",
            color: "var(--color-text)",
            backgroundColor: "#fff",
          }}
          placeholder="Your full name"
        />
      </div>

      <div>
        <label
          htmlFor="contact-email"
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--color-text)" }}
        >
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full px-4 py-2.5 rounded border text-sm transition-colors"
          style={{
            borderColor: "var(--color-border)",
            borderRadius: "var(--radius)",
            color: "var(--color-text)",
            backgroundColor: "#fff",
          }}
          placeholder="you@institution.edu"
        />
      </div>

      <div>
        <label
          htmlFor="contact-phone"
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--color-text)" }}
        >
          Phone
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          className="w-full px-4 py-2.5 rounded border text-sm transition-colors"
          style={{
            borderColor: "var(--color-border)",
            borderRadius: "var(--radius)",
            color: "var(--color-text)",
            backgroundColor: "#fff",
          }}
          placeholder="(555) 555-5555"
        />
      </div>

      <div>
        <label
          htmlFor="contact-institution"
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--color-text)" }}
        >
          Institution <span aria-hidden="true">*</span>
        </label>
        <input
          id="contact-institution"
          name="institution"
          type="text"
          required
          autoComplete="organization"
          className="w-full px-4 py-2.5 rounded border text-sm transition-colors"
          style={{
            borderColor: "var(--color-border)",
            borderRadius: "var(--radius)",
            color: "var(--color-text)",
            backgroundColor: "#fff",
          }}
          placeholder="University or organization"
        />
      </div>

      <div>
        <label
          htmlFor="contact-role"
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--color-text)" }}
        >
          Role <span aria-hidden="true">*</span>
        </label>
        <select
          id="contact-role"
          name="role"
          required
          className="w-full px-4 py-2.5 rounded border text-sm transition-colors appearance-none"
          style={{
            borderColor: "var(--color-border)",
            borderRadius: "var(--radius)",
            color: "var(--color-text)",
            backgroundColor: "#fff",
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Select your role
          </option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-topic"
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--color-text)" }}
        >
          Topic <span aria-hidden="true">*</span>
        </label>
        <select
          id="contact-topic"
          name="topic"
          required
          ref={topicRef}
          className="w-full px-4 py-2.5 rounded border text-sm transition-colors appearance-none"
          style={{
            borderColor: "var(--color-border)",
            borderRadius: "var(--radius)",
            color: "var(--color-text)",
            backgroundColor: "#fff",
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Select a topic
          </option>
          {topics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="contact-message"
          className="block text-sm font-medium mb-1"
          style={{ color: "var(--color-text)" }}
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          className="w-full px-4 py-2.5 rounded border text-sm transition-colors resize-y"
          style={{
            borderColor: "var(--color-border)",
            borderRadius: "var(--radius)",
            color: "var(--color-text)",
            backgroundColor: "#fff",
          }}
          placeholder="Tell us about your study and what you're looking for..."
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-8 py-3 rounded text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: "var(--color-accent)", borderRadius: "var(--radius)" }}
      >
        Send Message
      </button>
    </form>
  );
}
