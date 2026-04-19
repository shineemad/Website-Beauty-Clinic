/**
 * SVG Decorative Elements
 * Premium SVG shapes dan icons untuk visual richness
 */

export function GoldenOrb({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="orbGradient" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#E8DED5" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#D5B97D" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#DDBEBB" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="95" fill="url(#orbGradient)" />
    </svg>
  );
}

export function DecorativeLine({
  className = "",
  isVertical = false,
}: {
  className?: string;
  isVertical?: boolean;
}) {
  return (
    <svg
      viewBox={isVertical ? "0 0 4 100" : "0 0 100 4"}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient
          id="lineGradient"
          x1={isVertical ? "0%" : "0%"}
          y1={isVertical ? "0%" : "0%"}
          x2={isVertical ? "0%" : "100%"}
          y2={isVertical ? "100%" : "0%"}
        >
          <stop offset="0%" stopColor="rgba(213, 185, 125, 0)" />
          <stop offset="50%" stopColor="rgba(213, 185, 125, 0.6)" />
          <stop offset="100%" stopColor="rgba(213, 185, 125, 0)" />
        </linearGradient>
      </defs>
      <rect
        x="0"
        y="0"
        width={isVertical ? "4" : "100"}
        height={isVertical ? "100" : "4"}
        fill="url(#lineGradient)"
      />
    </svg>
  );
}

export function FloatingShapes({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 300 300"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="shapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(213, 185, 125, 0.15)" />
          <stop offset="100%" stopColor="rgba(221, 190, 187, 0.15)" />
        </linearGradient>
      </defs>

      {/* Top-left circle */}
      <circle cx="40" cy="40" r="30" fill="url(#shapeGradient)" opacity="0.6" />

      {/* Right diamond shape */}
      <g opacity="0.4">
        <path
          d="M 250 80 L 270 100 L 250 120 L 230 100 Z"
          fill="url(#shapeGradient)"
          stroke="rgba(213, 185, 125, 0.3)"
          strokeWidth="0.5"
        />
      </g>

      {/* Bottom line */}
      <line
        x1="60"
        y1="250"
        x2="220"
        y2="250"
        stroke="rgba(213, 185, 125, 0.2)"
        strokeWidth="1"
      />
    </svg>
  );
}

export function HexagonGrid({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(213, 185, 125, 0.1)" />
          <stop offset="100%" stopColor="rgba(138, 130, 121, 0.1)" />
        </linearGradient>
      </defs>

      {/* Hexagon grid pattern */}
      {Array.from({ length: 3 }).map((_, row) =>
        Array.from({ length: 4 }).map((_, col) => {
          const x = col * 110 + (row % 2 ? 55 : 0);
          const y = row * 95;
          const size = 25;

          return (
            <g key={`hex-${row}-${col}`} opacity="0.3">
              <polygon
                points={`${x},${y - size} ${x + size},${y - size / 2} ${x + size},${y + size / 2} ${x},${y + size} ${x - size},${y + size / 2} ${x - size},${y - size / 2}`}
                fill="none"
                stroke="rgba(213, 185, 125, 0.4)"
                strokeWidth="0.5"
              />
            </g>
          );
        }),
      )}
    </svg>
  );
}

export function AscendingDots({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dotsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(213, 185, 125, 0.2)" />
          <stop offset="100%" stopColor="rgba(213, 185, 125, 0.8)" />
        </linearGradient>
      </defs>

      {/* Dots ascending */}
      {[0, 1, 2, 3, 4].map((i) => (
        <circle
          key={`dot-${i}`}
          cx="50"
          cy={30 + i * 40}
          r={2 + i * 0.8}
          fill="url(#dotsGradient)"
          opacity={0.4 + i * 0.12}
        />
      ))}
    </svg>
  );
}

export function WavyBorder({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(213, 185, 125, 0)" />
          <stop offset="50%" stopColor="rgba(213, 185, 125, 0.3)" />
          <stop offset="100%" stopColor="rgba(213, 185, 125, 0)" />
        </linearGradient>
      </defs>

      <path
        d="M 0 50 Q 125 20 250 50 T 500 50 T 750 50 T 1000 50 L 1000 100 L 0 100 Z"
        fill="url(#waveGradient)"
        opacity="0.5"
      />
    </svg>
  );
}

export function BeforeAfterContainer({
  beforeLabel = "SEBELUM",
  afterLabel = "SESUDAH",
  className = "",
}: {
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={`before-after-wrapper relative w-full overflow-hidden rounded-lg bg-charcoal/5 ${className}`}
    >
      <div className="aspect-square w-full bg-gradient-to-br from-rose/10 to-gold/10 flex items-center justify-center relative">
        <div className="text-center">
          <div className="mb-4 flex justify-center gap-12">
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-full bg-rose/20 flex items-center justify-center">
                <span className="font-sans text-[10px] font-bold text-rose/60">
                  −
                </span>
              </div>
              <span className="font-sans text-[10px] uppercase tracking-wider text-charcoal/40">
                {beforeLabel}
              </span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="h-16 w-16 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="font-sans text-[10px] font-bold text-gold/60">
                  ✓
                </span>
              </div>
              <span className="font-sans text-[10px] uppercase tracking-wider text-charcoal/40">
                {afterLabel}
              </span>
            </div>
          </div>
          <p className="font-sans text-[11px] text-charcoal/30 tracking-wide">
            [Image placeholder]
          </p>
        </div>
      </div>
    </div>
  );
}

export function TreatmentImagePlaceholder({
  treatmentName = "",
}: {
  treatmentName?: string;
}) {
  return (
    <div className="gallery-item image-placeholder group">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
        {/* Decorative shapes */}
        <div className="relative h-24 w-24 svg-float">
          <GoldenOrb className="animate-pulse" />
        </div>

        {/* Text info */}
        <div className="text-center">
          {treatmentName && (
            <p className="font-display text-[14px] font-light italic text-charcoal/40">
              {treatmentName}
            </p>
          )}
          <p className="font-sans text-[11px] text-charcoal/20 tracking-wider mt-2">
            TREATMENT IMAGE
          </p>
        </div>
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-gold/0 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-10 z-5" />
    </div>
  );
}
