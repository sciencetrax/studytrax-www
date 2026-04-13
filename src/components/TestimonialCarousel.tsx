"use client";

import { useCallback, useEffect, useState } from "react";

export interface Testimonial {
  name: string;
  quote: string;
  organization: string;
  diseaseArea?: string;
  designs?: string;
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

  const count = testimonials.length;

  const goTo = useCallback(
    (i: number) => {
      setIndex(((i % count) + count) % count);
    },
    [count],
  );

  const prev = useCallback(() => goTo(index - 1), [index, goTo]);
  const next = useCallback(() => goTo(index + 1), [index, goTo]);

  // Auto-advance
  useEffect(() => {
    if (paused || autoAdvanceMs <= 0 || count <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
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
        className="rounded-lg p-8 sm:p-12 text-center min-h-[280px] flex flex-col justify-center"
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #dbe3ec",
          borderRadius: "6px",
        }}
        aria-live="polite"
        aria-atomic="true"
      >
        {/* Large opening quote mark */}
        <div
          className="text-6xl leading-none mb-2 select-none"
          style={{ color: "#0a5f8e", opacity: 0.25 }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        <blockquote
          className="text-lg sm:text-xl leading-relaxed italic mb-6"
          style={{ color: "#1a2332" }}
        >
          {current.quote}
        </blockquote>

        {/* Attribution */}
        <div className="flex items-center justify-center gap-4">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
            style={{ backgroundColor: "#0a5f8e", color: "#ffffff" }}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm" style={{ color: "#1a2332" }}>
              {current.name}
            </p>
            <p className="text-xs" style={{ color: "#5a6b7f" }}>
              {current.organization}
            </p>
            {current.diseaseArea && (
              <p
                className="text-xs mt-1 inline-block px-2 py-0.5 rounded"
                style={{
                  backgroundColor: "#f6f8fb",
                  color: "#0a5f8e",
                  border: "1px solid #dbe3ec",
                  borderRadius: "4px",
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
            className="absolute top-1/2 -translate-y-1/2 -left-2 sm:-left-6 w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "#0a5f8e",
              color: "#ffffff",
              border: "none",
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
            className="absolute top-1/2 -translate-y-1/2 -right-2 sm:-right-6 w-10 h-10 rounded-full flex items-center justify-center transition-opacity hover:opacity-80"
            style={{
              backgroundColor: "#0a5f8e",
              color: "#ffffff",
              border: "none",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {count > 1 && (
        <div className="flex justify-center gap-2 mt-6" role="tablist">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`Testimonial ${i + 1} of ${count}: ${t.name}`}
              onClick={() => goTo(i)}
              className="w-2.5 h-2.5 rounded-full transition-opacity"
              style={{
                backgroundColor: i === index ? "#0a5f8e" : "#dbe3ec",
                border: "none",
                opacity: i === index ? 1 : 0.6,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
