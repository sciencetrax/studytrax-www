interface SectionBlockProps {
  heading: string;
  body: string;
  accent?: boolean;
}

export default function SectionBlock({ heading, body, accent = false }: SectionBlockProps) {
  return (
    <div
      className="rounded-lg p-6 sm:p-8"
      style={{
        backgroundColor: accent ? "var(--color-accent)" : "var(--color-surface)",
        border: `1px solid ${accent ? "transparent" : "var(--color-border)"}`,
        borderRadius: "var(--radius)",
      }}
    >
      <h2
        className="text-xl font-semibold mb-3"
        style={{ color: accent ? "#fff" : "var(--color-text)" }}
      >
        {heading}
      </h2>
      <p
        className="leading-relaxed"
        style={{ color: accent ? "rgba(255,255,255,0.9)" : "var(--color-muted)" }}
      >
        {body}
      </p>
    </div>
  );
}
