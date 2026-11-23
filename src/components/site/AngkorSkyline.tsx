import { cn } from "@/lib/utils";

/** Decorative Angkor-inspired skyline with palms. */
export function AngkorSkyline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 120" preserveAspectRatio="xMidYMax meet" className={cn("w-full", className)} aria-hidden>
      <g className="fill-current">
        <path d="M0 120h600v-6H0z" />
        {/* palms */}
        <path d="M40 114V60h3v54zM28 60c8-8 18-8 26 0-8-3-18-3-26 0zm4-6c6-8 16-8 22 0M70 114V70h3v44z" />
        <path d="M60 70c6-7 16-7 23 0-7-3-16-3-23 0z" />
        {/* temple */}
        <path d="M200 114V96h200v18z" />
        <path d="M220 96V80h160v16z" />
        <path d="M240 80l10-28 10 28zM340 80l10-28 10 28z" />
        <path d="M285 80l15-52 15 52z" />
        <path d="M262 80l8-20 8 20zM322 80l8-20 8 20z" />
        <path d="M296 28h8l-4-12z" />
        {/* palms right */}
        <path d="M480 114V56h3v58zM468 56c8-8 18-8 26 0-8-3-18-3-26 0zM520 114V72h3v42zM510 72c6-7 16-7 23 0-7-3-16-3-23 0z" />
        <path d="M150 114V76h3v38zM140 76c6-7 16-7 23 0-7-3-16-3-23 0z" />
      </g>
    </svg>
  );
}

export function Lotus({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 40" className={cn("h-8 w-12", className)} aria-hidden>
      <path d="M32 4c6 8 6 20 0 30-6-10-6-22 0-30Z" className="fill-lotus" />
      <path d="M32 34C26 26 16 20 6 20c4 9 14 14 26 14Z" className="fill-lotus/80" />
      <path d="M32 34c6-8 16-14 26-14-4 9-14 14-26 14Z" className="fill-lotus/80" />
      <path d="M4 36h56" className="stroke-teal" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
