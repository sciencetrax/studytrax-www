"use client";

import { useEffect, useRef, useState } from "react";

const points = [
  { stat: "#1", label: "With Academic And Disease Organizations", icon: "trophy" },
  { stat: "20+", label: "Years of Experience", icon: "clock" },
  { stat: "100+", label: "Medical Centers", icon: "hospital" },
  { stat: "1000+", label: "Trials & Registries", icon: "chart" },
];

function TrophyIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9H4a2 2 0 0 1-2-2V5h4" /><path d="M18 9h2a2 2 0 0 0 2-2V5h-4" />
      <path d="M8 21h8" /><path d="M12 17v4" />
      <path d="M6 3h12v8a6 6 0 0 1-6 6 6 6 0 0 1-6-6Z" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function HospitalIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 6v4m-2-2h4" /><rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 21v-6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6" />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 3v18h18" /><path d="m7 16 4-4 4 4 5-5" />
    </svg>
  );
}

const IconMap: Record<string, React.ComponentType> = {
  trophy: TrophyIcon,
  clock: ClockIcon,
  hospital: HospitalIcon,
  chart: ChartIcon,
};

export default function ProofPoints() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} aria-label="Proof points" className="py-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {points.map((p, i) => {
          const Icon = IconMap[p.icon];
          return (
            <div
              key={p.label}
              className="proof-card text-center p-7"
              style={{
                animation: visible ? `fade-in-up 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 0.12}s both` : "none",
                opacity: visible ? undefined : 0,
              }}
            >
              <div
                className="mx-auto mb-3 w-10 h-10 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, rgba(10,95,142,0.1), rgba(26,128,186,0.06))",
                  color: "var(--color-accent)",
                }}
              >
                <Icon />
              </div>
              <p className="proof-stat mb-1">{p.stat}</p>
              <p className="text-xs font-medium leading-snug" style={{ color: "var(--color-muted)" }}>
                {p.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
