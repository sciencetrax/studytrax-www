const points = [
  { stat: "#1", label: "With Academic And Disease Organizations" },
  { stat: "Two Decades", label: "of Experience" },
  { stat: "100+", label: "Medical Centers" },
  { stat: "1000+", label: "Trials & Registries" },
];

export default function ProofPoints() {
  return (
    <section aria-label="Proof points" className="py-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {points.map((p) => (
          <div
            key={p.label}
            className="text-center rounded-lg p-6"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius)",
            }}
          >
            <p
              className="text-3xl font-bold mb-1"
              style={{ color: "var(--color-accent)" }}
            >
              {p.stat}
            </p>
            <p className="text-sm font-medium" style={{ color: "var(--color-muted)" }}>
              {p.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
