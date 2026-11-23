import { useI18n } from "@/lib/i18n";
import { MapPin, Plus, Minus, LocateFixed } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type MapPinItem = {
  id: string;
  label: string;
  x: number;
  y: number;
  tone?: "teal" | "gold" | "lotus" | "navy";
};

/** Stylized illustrative map of Siem Reap (prototype – not to scale). */
export function MapMock({
  pins,
  activeId,
  onPinClick,
  className,
  showLegend = true,
}: {
  pins: MapPinItem[];
  activeId?: string | null;
  onPinClick?: (id: string) => void;
  className?: string;
  showLegend?: boolean;
}) {
  const { t, tc } = useI18n();
  const [zoom, setZoom] = useState(1);
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border bg-teal-soft", className)}>
      <div className="absolute inset-0 origin-center transition-transform duration-300" style={{ transform: `scale(${zoom})` }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
          <rect width="100" height="100" className="fill-sand" />
          <path d="M0 0h100v100H0z" className="fill-success-soft" opacity="0.55" />
          <path d="M0 86 Q30 78 50 88 T100 82 V100 H0Z" className="fill-teal/25" />
          <path d="M48 0 C46 20 52 35 49 50 S44 75 52 88" className="stroke-teal/50" strokeWidth="1.2" fill="none" />
          <rect x="20" y="22" width="22" height="7" rx="1" className="fill-teal/20" />
          <path d="M0 48 H100 M30 0 V100 M70 10 L55 52 M49 50 L80 16" className="stroke-background" strokeWidth="1.4" fill="none" />
          <path d="M0 48 H100 M30 0 V100 M70 10 L55 52 M49 50 L80 16" className="stroke-gold/50" strokeWidth="0.4" fill="none" />
          <rect x="46" y="30" width="9" height="7" className="fill-navy/15" />
        </svg>
        <span className="absolute left-[43%] top-[26%] text-[10px] font-semibold uppercase tracking-wider text-navy/60">{t("Angkor Wat", "អង្គរវត្ត")}</span>
        <span className="absolute left-[20%] top-[18%] text-[10px] font-semibold uppercase tracking-wider text-navy/60">{t("West Baray", "បារាយណ៍ខាងលិច")}</span>
        <span className="absolute left-[42%] top-[58%] text-sm font-bold text-navy/70">{t("Siem Reap", "សៀមរាប")}</span>
        <span className="absolute left-[30%] top-[92%] text-[10px] font-semibold uppercase tracking-wider text-teal">{t("Tonle Sap Lake", "បឹងទន្លេសាប")}</span>
        <span className="absolute left-[78%] top-[8%] text-[10px] font-semibold uppercase tracking-wider text-navy/60">{t("Kulen", "គូលែន")}</span>
        {pins.map((p) => {
          const active = activeId === p.id;
          const tone = p.tone ?? "teal";
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onPinClick?.(p.id)}
              className="group absolute -translate-x-1/2 -translate-y-full"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              aria-label={tc(p.label)}
            >
              <span
                className={cn(
                  "pointer-events-none absolute bottom-full left-1/2 mb-1 -translate-x-1/2 whitespace-nowrap rounded-md bg-card px-2 py-1 text-xs font-medium text-navy shadow-card transition",
                  active ? "opacity-100" : "opacity-0 group-hover:opacity-100",
                )}
              >
                {tc(p.label)}
              </span>
              <MapPin
                className={cn(
                  "size-7 drop-shadow transition-transform group-hover:scale-110",
                  active && "scale-125",
                  tone === "teal" && "fill-teal text-card",
                  tone === "gold" && "fill-gold text-card",
                  tone === "lotus" && "fill-lotus text-card",
                  tone === "navy" && "fill-navy text-card",
                )}
              />
            </button>
          );
        })}
      </div>
      <div className="absolute right-3 top-3 flex flex-col overflow-hidden rounded-lg border bg-card shadow-card">
        <button type="button" aria-label={t("Zoom in", "ពង្រីក")} className="p-2 hover:bg-muted" onClick={() => setZoom((z) => Math.min(z + 0.25, 2))}><Plus className="size-4" /></button>
        <button type="button" aria-label={t("Zoom out", "បង្រួម")} className="border-t p-2 hover:bg-muted" onClick={() => setZoom((z) => Math.max(z - 0.25, 1))}><Minus className="size-4" /></button>
        <button type="button" aria-label={t("Reset map", "កំណត់ផែនទីឡើងវិញ")} className="border-t p-2 hover:bg-muted" onClick={() => setZoom(1)}><LocateFixed className="size-4" /></button>
      </div>
      {showLegend && (
        <span className="absolute bottom-3 left-3 rounded-md bg-card/90 px-2 py-1 text-[10px] text-muted-foreground">{t("Illustrative map · not to scale", "ផែនទីគំរូ · មិនតាមមាត្រដ្ឋាន")}</span>
      )}
    </div>
  );
}
