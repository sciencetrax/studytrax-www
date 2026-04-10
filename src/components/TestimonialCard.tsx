interface TestimonialCardProps {
  name: string;
  title?: string;
}

export default function TestimonialCard({ name, title }: TestimonialCardProps) {
  return (
    <div
      className="rounded-lg p-6 flex flex-col gap-4"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius)",
      }}
    >
      {/* Quote placeholder */}
      <div
        className="rounded p-4 text-sm italic"
        style={{
          backgroundColor: "var(--color-border)",
          color: "var(--color-muted)",
          borderRadius: "var(--radius)",
        }}
      >
        {/* [PLACEHOLDER: exact-testimonial-quote] */}
        <span aria-hidden="true" style={{ color: "var(--color-muted)" }}>
          [Testimonial quote from {name} to be provided]
        </span>
      </div>

      {/* Attribution */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
          style={{ backgroundColor: "var(--color-accent)" }}
          aria-hidden="true"
        >
          {name
            .split(" ")
            .slice(0, 2)
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="font-semibold text-sm" style={{ color: "var(--color-text)" }}>
            {name}
          </p>
          {title && (
            <p className="text-xs" style={{ color: "var(--color-muted)" }}>
              {title}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
