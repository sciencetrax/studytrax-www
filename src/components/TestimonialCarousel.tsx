"use client";

import { useCallback, useEffect, useState } from "react";

export interface Testimonial {
  name: string;
  quote: string;
  organization: string;
  diseaseArea?: string;
  designs?: string;
  headshot?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoAdvanceMs?: number;
}

export default function TestimonialCarousel({
  testimonials,
  autoAdvanceMs = 7000,
}: TestimonialCarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [animating, setAnimating] = useState(false);

  const count = testimonials.length;

  const goTo = useCallback(
    (i: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setIndex(((i % count) + count) % count);
        setAnimating(false);
      }, 180);
    },
    [count, animating],
  );

  const prev = useCallback(() => goTo(index - 1), [index, goTo]);
  const next = useCallback(() => goTo(index + 1), [index, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused || autoAdvanceMs <= 0 || count <= 1) return;
    const id = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setIndex((i) => (i + 1) % count);
        setAnimating(false);
      }, 180);
    }, autoAdvanceMs);
    return () => clearInterval(id);
  }, [paused, autoAdvanceMs, count]);

  // Keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  if (count === 0) return null;

  const current = testimonials[index];
  const initials = current.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  return (
    <div
      className="relative max-w-3xl mx-auto"
      role="region"
      aria-label="Customer testimonials"
      aria-roledescription="carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Slide */}
      <div
        className="testimonial-card p-8 sm:p-12 text-center min-h-[280px] flex flex-col justify-center"
        style={{
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 0.18s ease, transform 0.18s ease",
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Large opening quote mark */}
        <div
          className="text-7xl leading-none mb-1 select-none font-serif"
          style={{
            background: "linear-gradient(135deg, var(--color-accent), var(--color-accent-light))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            opacity: 0.5,
          }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        <blockquote
          className="text-lg sm:text-xl leading-relaxed italic mb-8"
          style={{ color: "#1a2332" }}
        >
          {current.quote}
        </blockquote>

        {/* Attribution */}
        <div className="flex items-center justify-center gap-4">
          <div
            className="testimonial-avatar w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            style={{ color: "#ffffff" }}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm" style={{ color: "#1a2332" }}>
              {current.name}
            </p>
            <p className="text-xs font-medium mt-0.5" style={{ color: "#5a6b7f" }}>
              {current.organization}
            </p>
            {current.diseaseArea && (
              <p
                className="text-xs mt-1.5 inline-block px-2.5 py-0.5 rounded-full font-medium"
                style={{
                  background: "linear-gradient(135deg, rgba(10,95,142,0.08), rgba(26,128,186,0.08))",
                  color: "var(--color-accent)",
                  border: "1px solid rgba(10,95,142,0.15)",
                }}
              >
                {current.diseaseArea}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Prev / Next buttons */}
      {count > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute top-1/2 -translate-y-1/2 -left-3 sm:-left-7 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:-translate-y-1/2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: "linear-gradient(135deg, var(--color-accent-light), var(--color-accent))",
              color: "#ffffff",
              border: "none",
              boxShadow: "0 4px 14px rgba(10, 95, 142, 0.3)",
              top: "50%",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(10, 95, 142, 0.45)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-52%) scale(1.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 14px rgba(10, 95, 142, 0.3)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next testimonial"
            className="absolute top-1/2 -translate-y-1/2 -right-3 sm:-right-7 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{
              background: "linear-gradient(135deg, var(--color-accent-light), var(--color-accent))",
              color: "#ffffff",
              border: "none",
              boxShadow: "0 4px 14px rgba(10, 95, 142, 0.3)",
              top: "50%",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 20px rgba(10, 95, 142, 0.45)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1.06)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 14px rgba(10, 95, 142, 0.3)";
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-50%) scale(1)";
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Progress bar */}
      {count > 1 && (
        <div className="mt-6 flex justify-center gap-1.5" role="tablist">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1} of ${count}: ${t.name}`}
              onClick={() => goTo(i)}
              className="rounded-full transition-all duration-300 focus:outline-none"
              style={{
                width: i === index ? "28px" : "8px",
                height: "8px",
                background: i === index
                  ? "linear-gradient(90deg, var(--color-accent), var(--color-accent-light))"
                  : "var(--color-border)",
                border: "none",
                opacity: i === index ? 1 : 0.5,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
