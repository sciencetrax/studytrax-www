"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface ImageLightboxProps {
  src: string;
  alt: string;
  caption?: string;
  thumbnailWidth?: number;
  thumbnailHeight?: number;
  /** Full-size dimensions for the modal — defaults are fine for typical screenshots */
  fullWidth?: number;
  fullHeight?: number;
  className?: string;
  /** When true, render the thumbnail at its natural aspect ratio (no cropping). Default: false (16:10 fixed aspect, object-cover). */
  preserveAspectRatio?: boolean;
}

export default function ImageLightbox({
  src,
  alt,
  caption,
  thumbnailWidth = 600,
  thumbnailHeight = 400,
  fullWidth = 1600,
  fullHeight = 1000,
  className = "",
  preserveAspectRatio = false,
}: ImageLightboxProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Only render portal client-side (avoids SSR mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock scroll + ESC to close while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      {preserveAspectRatio ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`View larger: ${alt}`}
          className={`group block w-full overflow-hidden rounded-md cursor-zoom-in transition-transform hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
          style={{
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface)",
            padding: 0,
          }}
        >
          <Image
            src={src}
            alt={alt}
            width={thumbnailWidth}
            height={thumbnailHeight}
            className="block w-full h-auto"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`View larger: ${alt}`}
          className={`group relative block w-full overflow-hidden rounded-md cursor-zoom-in transition-transform hover:scale-[1.01] focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`}
          style={{
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface)",
            aspectRatio: "16 / 10",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </button>
      )}

      {open && mounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 animate-fade-in"
          style={{ backgroundColor: "rgba(15, 25, 40, 0.85)", backdropFilter: "blur(4px)" }}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            style={{ backgroundColor: "rgba(255,255,255,0.12)", color: "#fff" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[min(1400px,95vw)] max-h-[90vh] w-auto"
          >
            <Image
              src={src}
              alt={alt}
              width={fullWidth}
              height={fullHeight}
              className="block w-auto max-w-full max-h-[85vh] h-auto rounded-lg shadow-2xl"
              sizes="95vw"
              priority
            />
            {caption && (
              <p
                className="text-center mt-3 text-sm font-medium"
                style={{ color: "rgba(255,255,255,0.92)" }}
              >
                {caption}
              </p>
            )}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
