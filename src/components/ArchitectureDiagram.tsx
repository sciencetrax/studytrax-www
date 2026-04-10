export default function ArchitectureDiagram() {
  return (
    <figure className="my-8" role="img" aria-label="Studytrax hosting architecture diagram showing layered security from Internet through firewalls to an isolated database server with encrypted offsite backups">
      <figcaption className="text-sm font-semibold mb-4" style={{ color: "var(--color-muted)" }}>
        Hosting Architecture
      </figcaption>
      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 720 340"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full max-w-2xl mx-auto block"
          style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif" }}
          aria-hidden="true"
        >
          {/* Definitions */}
          <defs>
            <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill="#5a6b7f" />
            </marker>
          </defs>

          {/* Internet */}
          <rect x="20" y="130" width="100" height="60" rx="6" fill="#e8f0f8" stroke="#0a5f8e" strokeWidth="1.5" />
          <text x="70" y="155" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0a5f8e">Internet</text>
          <text x="70" y="170" textAnchor="middle" fontSize="10" fill="#5a6b7f">Users</text>

          {/* Arrow 1 */}
          <line x1="120" y1="160" x2="155" y2="160" stroke="#5a6b7f" strokeWidth="1.5" markerEnd="url(#arrow)" />
          <text x="137" y="152" textAnchor="middle" fontSize="9" fill="#5a6b7f">TLS</text>

          {/* Firewall 1 */}
          <rect x="155" y="120" width="80" height="80" rx="6" fill="#fff3f0" stroke="#c8552c" strokeWidth="2" />
          <text x="195" y="152" textAnchor="middle" fontSize="11" fontWeight="600" fill="#c8552c">Firewall</text>
          <text x="195" y="167" textAnchor="middle" fontSize="9" fill="#5a6b7f">Layer 1</text>
          <text x="195" y="180" textAnchor="middle" fontSize="9" fill="#5a6b7f">Perimeter</text>

          {/* Arrow 2 */}
          <line x1="235" y1="160" x2="270" y2="160" stroke="#5a6b7f" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* DMZ / Web Server */}
          <rect x="270" y="100" width="130" height="120" rx="6" fill="#f6f8fb" stroke="#dbe3ec" strokeWidth="1.5" />
          <text x="335" y="130" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5a6b7f">DMZ</text>
          <rect x="285" y="138" width="100" height="60" rx="4" fill="#e8f0f8" stroke="#0a5f8e" strokeWidth="1.5" />
          <text x="335" y="163" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0a5f8e">Web Server</text>
          <text x="335" y="178" textAnchor="middle" fontSize="9" fill="#5a6b7f">SSL-enforced</text>

          {/* Arrow 3 */}
          <line x1="400" y1="160" x2="435" y2="160" stroke="#5a6b7f" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Firewall 2 */}
          <rect x="435" y="120" width="80" height="80" rx="6" fill="#fff3f0" stroke="#c8552c" strokeWidth="2" />
          <text x="475" y="152" textAnchor="middle" fontSize="11" fontWeight="600" fill="#c8552c">Firewall</text>
          <text x="475" y="167" textAnchor="middle" fontSize="9" fill="#5a6b7f">Layer 2</text>
          <text x="475" y="180" textAnchor="middle" fontSize="9" fill="#5a6b7f">Internal</text>

          {/* Arrow 4 */}
          <line x1="515" y1="160" x2="550" y2="160" stroke="#5a6b7f" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Database Server */}
          <rect x="550" y="90" width="145" height="140" rx="6" fill="#f6f8fb" stroke="#dbe3ec" strokeWidth="1.5" />
          <text x="622" y="115" textAnchor="middle" fontSize="10" fontWeight="600" fill="#5a6b7f">Private Network</text>
          <rect x="562" y="122" width="121" height="90" rx="4" fill="#e8f0f8" stroke="#0a5f8e" strokeWidth="1.5" />
          <text x="622" y="147" textAnchor="middle" fontSize="11" fontWeight="600" fill="#0a5f8e">Database Server</text>
          <text x="622" y="163" textAnchor="middle" fontSize="9" fill="#5a6b7f">Encrypted RAID 5</text>
          <text x="622" y="178" textAnchor="middle" fontSize="9" fill="#5a6b7f">Never public</text>
          <text x="622" y="193" textAnchor="middle" fontSize="9" fill="#5a6b7f">Intrusion detection</text>

          {/* Offsite backup arrow (downward from DB) */}
          <line x1="622" y1="230" x2="622" y2="265" stroke="#5a6b7f" strokeWidth="1.5" markerEnd="url(#arrow)" />

          {/* Offsite backup label */}
          <rect x="530" y="265" width="185" height="65" rx="6" fill="#f0fff4" stroke="#22a45d" strokeWidth="1.5" />
          <text x="622" y="288" textAnchor="middle" fontSize="11" fontWeight="600" fill="#22a45d">Offsite Backup</text>
          <text x="622" y="303" textAnchor="middle" fontSize="9" fill="#5a6b7f">AES-256 encrypted</text>
          <text x="622" y="317" textAnchor="middle" fontSize="9" fill="#5a6b7f">Every 15 min via SSL</text>

          {/* Label for backup frequency */}
          <text x="640" y="253" fontSize="9" fill="#5a6b7f">15 min</text>

          {/* Legend */}
          <rect x="20" y="265" width="12" height="12" rx="2" fill="#fff3f0" stroke="#c8552c" strokeWidth="1.5" />
          <text x="36" y="275" fontSize="9" fill="#5a6b7f">Firewall</text>
          <rect x="90" y="265" width="12" height="12" rx="2" fill="#e8f0f8" stroke="#0a5f8e" strokeWidth="1.5" />
          <text x="106" y="275" fontSize="9" fill="#5a6b7f">Studytrax Systems</text>
          <rect x="210" y="265" width="12" height="12" rx="2" fill="#f0fff4" stroke="#22a45d" strokeWidth="1.5" />
          <text x="226" y="275" fontSize="9" fill="#5a6b7f">Secure Backup</text>
        </svg>
      </div>
    </figure>
  );
}
