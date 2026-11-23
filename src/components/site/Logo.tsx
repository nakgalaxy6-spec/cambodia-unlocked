import { useI18n } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <img
      src="/images/cambodia-unlocked-logo.jpg"
      alt="Cambodia Unlocked Logo"
      className={cn("size-9 rounded-xl object-cover shadow-sm ring-1.5 ring-gold/40 dark:ring-gold/60 transition-transform duration-300 group-hover:scale-105", className)}
    />
  );
}

export function Logo({ className, light = false, hideText = false }: { className?: string; light?: boolean; hideText?: boolean }) {
  const { t } = useI18n();
  return (
    <Link
      to="/"
      className={cn("group flex items-center gap-2.5 transition", className)}
      aria-label={t("Cambodia Unlocked home", "ទំព័រដើម Cambodia Unlocked")}
    >
      <LogoMark />
      {!hideText && (
        <span className={cn("font-display text-lg font-extrabold tracking-tight", light ? "text-navy-foreground" : "text-navy")}>
          Cambodia <span className="text-gold font-black drop-shadow-sm">Unlocked</span>
        </span>
      )}
    </Link>
  );
}
