import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="mt-auto border-t py-10"
      style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <p className="font-bold text-base" style={{ color: "var(--color-accent)" }}>
              Studytrax
            </p>
            <p className="text-sm mt-1" style={{ color: "var(--color-muted)" }}>
              Electronic data capture for academic research and disease organizations.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm list-none p-0 m-0">
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
        </div>

        <div
          className="mt-8 pt-6 border-t text-xs"
          style={{ borderColor: "var(--color-border)", color: "var(--color-muted)" }}
        >
          <p>&copy; {year} Studytrax. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
