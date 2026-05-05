"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const topics = [
  "5-Minute Fit Check",
  "Quote Request",
  "Grant Support",
  "Demo",
  "General Inquiry",
  "Other",
];

export default function ContactForm() {
  const searchParams = useSearchParams();
  const topicRef = useRef<HTMLSelectElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error ?? "Something went wrong");
      }
      setStatus("sent");
      formRef.current?.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "sent") {
    return (
      <div
        className="rounded-lg p-8 text-center"
        style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: "var(--radius)" }}
      >
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--color-accent)" }}>Message sent!</h3>
        <p className="text-sm" style={{ color: "var(--color-muted)" }}>
          We&apos;ll get back to you shortly. Thank you for reaching out.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
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

      {status === "error" && (
        <p className="text-sm font-medium" style={{ color: "#c8552c" }}>
          {errorMsg || "Something went wrong. Please try again."}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full sm:w-auto px-8 py-3 rounded text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        style={{ backgroundColor: "var(--color-accent)", borderRadius: "var(--radius)" }}
      >
        {status === "sending" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
