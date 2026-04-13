import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto footer-enhanced">
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{
          background: "linear-gradient(90deg, var(--color-navy), var(--color-accent), var(--color-accent-light), var(--color-accent))",
          backgroundSize: "200% auto",
          animation: "shimmer 4s linear infinite",
        }}
        aria-hidden="true"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">
          <div className="max-w-xs">
            <p className="font-bold text-lg tracking-tight" style={{ color: "var(--color-accent)" }}>
              Studytrax
            </p>
            <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--color-muted)" }}>
              Electronic data capture for academic research and disease organizations.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: "var(--color-emerald)" }}
                aria-hidden="true"
              />
              <span className="text-xs font-medium" style={{ color: "var(--color-emerald)" }}>
                21 CFR Part 11 &amp; HIPAA Compliant
              </span>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-muted)" }}>
              Navigation
            </p>
            <ul className="flex flex-col gap-2 text-sm list-none p-0 m-0">
              {[
                { href: "/", label: "Home" },
                { href: "/workbench", label: "Workbench" },
                { href: "/for-grant-writers", label: "For Grant Writers" },
                { href: "/compare-to-redcap", label: "Compare to REDCap" },
                { href: "/compliance-trust", label: "Compliance & Trust" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="transition-colors hover:underline"
                    style={{ color: "var(--color-muted)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--color-muted)" }}>
              Trusted By
            </p>
            <ul className="text-sm list-none p-0 m-0 flex flex-col gap-1.5" style={{ color: "var(--color-muted)" }}>
              <li>Mass General Brigham</li>
              <li>Mayo Clinic</li>
              <li>Brigham and Women's Hospital</li>
              <li>Tufts Medical Center</li>
              <li>Boston Children's Hospital</li>
            </ul>
          </div>
        </div>

        <div
          className="mt-8 pt-6 border-t text-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
          style={{ borderColor: "var(--color-border)", color: "var(--color-muted)" }}
        >
          <p>&copy; {year} Studytrax. All rights reserved.</p>
          <p>Powering clinical research for over two decades.</p>
        </div>
      </div>
    </footer>
  );
}
