"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/workbench", label: "Workbench" },
  { href: "/for-grant-writers", label: "For Grant Writers" },
  { href: "/compare-to-redcap", label: "Compare to REDCap" },
  { href: "/compliance-trust", label: "Compliance & Trust" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white border-b transition-all duration-300 ${scrolled ? "header-scrolled" : ""}`}
      style={{ borderColor: scrolled ? "rgba(219,227,236,0.6)" : "var(--color-border)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Studytrax home"
            className="shrink-0"
          >
            <Image
              src="/images/studytrax-logo.png"
              alt="Studytrax"
              width={180}
              height={18}
              priority
              className="h-6 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isCurrent =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={`px-3 py-2 rounded text-sm font-medium transition-all duration-200 ${
                    isCurrent
                      ? "font-semibold"
                      : "hover:text-[--color-accent]"
                  }`}
                  style={
                    isCurrent
                      ? { color: "var(--color-accent)" }
                      : { color: "var(--color-text)" }
                  }
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/contact"
              className="ml-3 px-4 py-2 rounded text-sm font-semibold btn-primary"
              style={{ padding: "0.5rem 1rem" }}
              aria-label="Get started with Studytrax"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="lg:hidden p-2 rounded hover:bg-gray-100 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
          >
            {menuOpen ? (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="lg:hidden border-t px-4 py-3 flex flex-col gap-1"
          style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
        >
          {navLinks.map((link) => {
            const isCurrent =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isCurrent ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                  isCurrent ? "font-semibold" : ""
                }`}
                style={
                  isCurrent
                    ? { color: "var(--color-accent)" }
                    : { color: "var(--color-text)" }
                }
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-4 py-2.5 rounded text-sm font-semibold text-center btn-primary"
          >
            Get Started
          </Link>
        </nav>
      )}
    </header>
  );
}
