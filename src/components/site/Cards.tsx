import { useI18n } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { Star, MapPin, Heart, BadgeCheck, Crown, CalendarDays, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Business, Destination, EventItem } from "@/lib/data";
import { useFavorites } from "@/lib/favorites";

export function Rating({ value, count, className }: { value: number; count?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1 text-sm font-medium text-navy", className)}>
      <Star className="size-4 fill-gold text-gold" />
      {value.toFixed(1)}
      {count !== undefined && <span className="font-normal text-muted-foreground">({count})</span>}
    </span>
  );
}

export function SaveButton({ id, label, className }: { id: string; label: string; className?: string }) {
  const { isSaved, toggle } = useFavorites();
  const saved = isSaved(id);
  return (
    <button
      type="button"
      aria-label={saved ? `Remove ${label} from favorites` : `Save ${label}`}
      aria-pressed={saved}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id, label);
      }}
      className={cn("grid size-9 place-items-center rounded-full bg-card/95 shadow-card transition hover:scale-105", className)}
    >
      <Heart className={cn("size-4", saved ? "fill-lotus text-lotus" : "text-navy")} />
    </button>
  );
}

export function DestinationCard({ d, compact = false, active = false }: { d: Destination; compact?: boolean; active?: boolean }) {
  const { t, tc } = useI18n();
  return (
    <Link
      to="/destinations/$slug"
      params={{ slug: d.slug }}
      className={cn(
        "group block overflow-hidden rounded-2xl border bg-card shadow-card transition hover:-translate-y-0.5 hover:shadow-lift",
        active && "ring-2 ring-teal",
      )}
    >
      <div className={cn("relative overflow-hidden", compact ? "aspect-[4/3]" : "aspect-[4/3]")}>
        <img src={d.image} alt={tc(d.name)} loading="lazy" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" />
        <SaveButton id={`d:${d.slug}`} label={tc(d.name)} className="absolute right-3 top-3" />
        <Badge className="absolute left-3 top-3 border-0 bg-card/95 text-navy hover:bg-card">{tc(d.tag)}</Badge>
      </div>
      <div className="space-y-1.5 p-4">
        <h3 className="font-display text-base font-semibold text-navy">{tc(d.name)}</h3>
        <p className="flex items-center gap-1 text-xs text-muted-foreground"><MapPin className="size-3.5" />{tc(d.location)}</p>
        <div className="flex items-center justify-between pt-1">
          <Rating value={d.rating} count={d.reviews} />
          <span className="text-sm text-muted-foreground">{t("From", "ចាប់ពី")} <span className="font-semibold text-navy">${d.price}</span></span>
        </div>
      </div>
    </Link>
  );
}

export function BusinessCard({ b, active = false }: { b: Business; active?: boolean }) {
  const { t, tc } = useI18n();
  return (
    <Link
      to="/businesses/$slug"
      params={{ slug: b.slug }}
      className={cn("group flex flex-col sm:flex-row overflow-hidden rounded-2xl border bg-card shadow-card transition hover:shadow-lift", active && "ring-2 ring-teal")}
    >
      <div className="relative h-44 sm:h-auto sm:w-36 shrink-0 overflow-hidden">
        <img src={b.image} alt={tc(b.name)} loading="lazy" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" />
        {b.premium && (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-gold px-2 py-0.5 text-[10px] font-semibold text-gold-foreground">
            <Crown className="size-3" /> {t("Premium", "កម្រិតពិសេស")}
          </span>
        )}
      </div>
      <div className="flex-1 space-y-1 p-4">
        <p className="text-xs font-medium text-teal">{tc(b.category)}</p>
        <h3 className="flex items-center gap-1 font-display font-semibold text-navy">
          {tc(b.name)} {b.verified && <BadgeCheck className="size-4 text-teal" aria-label={t("Verified", "បានផ្ទៀងផ្ទាត់")} />}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{tc(b.tagline)}</p>
        <div className="flex items-center justify-between pt-1">
          <Rating value={b.rating} count={b.reviews} />
          <span className="text-xs text-muted-foreground">{t("From $", "ចាប់ពី $")}{b.priceFrom}</span>
        </div>
      </div>
    </Link>
  );
}

export function EventCard({ e, onOpen }: { e: EventItem; onOpen: () => void }) {
  const { t, tc } = useI18n();
  return (
    <button type="button" onClick={onOpen} className="group overflow-hidden rounded-2xl border bg-card text-left shadow-card transition hover:-translate-y-0.5 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={e.image} alt={tc(e.name)} loading="lazy" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" />
        <div className="absolute left-3 top-3 rounded-xl bg-card px-3 py-1.5 text-center shadow-card">
          <p className="text-[10px] font-bold tracking-widest text-teal">{e.month}</p>
          <p className="font-display text-xl font-bold leading-none text-navy">{e.day}</p>
        </div>
        <Badge className="absolute right-3 top-3 border-0 bg-gold text-gold-foreground hover:bg-gold">{tc(e.category)}</Badge>
      </div>
      <div className="space-y-2 p-4">
        <h3 className="font-display text-base font-semibold text-navy">{tc(e.name)}</h3>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays className="size-3.5 text-teal" />{tc(e.date)}</p>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="size-3.5 text-teal" />{tc(e.location)}</p>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><User className="size-3.5 text-teal" />{t("Organizer:", "អ្នករៀបចំ៖")} {tc(e.organizer)}</p>
      </div>
    </button>
  );
}
