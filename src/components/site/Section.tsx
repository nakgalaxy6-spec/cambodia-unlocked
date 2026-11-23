import { useI18n } from "@/lib/i18n";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({ eyebrow, title, action, className }: { eyebrow?: string; title: string; action?: ReactNode; className?: string }) {
  const { tc } = useI18n();
  return (
    <div className={cn("mb-6 flex items-end justify-between gap-4", className)}>
      <div>
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-teal">{tc(eyebrow)}</p>}
        <h2 className="mt-1 text-2xl font-bold text-navy md:text-3xl">{tc(title)}</h2>
      </div>
      {action}
    </div>
  );
}

export function PageHeader({ eyebrow, title, subtitle, children }: { eyebrow?: string; title: string; subtitle?: string; children?: ReactNode }) {
  const { tc } = useI18n();
  return (
    <section className="bg-sky border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-10">
        {eyebrow && <p className="text-xs font-semibold uppercase tracking-widest text-teal">{tc(eyebrow)}</p>}
        <h1 className="mt-1 text-2xl sm:text-3xl md:text-4xl font-bold text-navy">{tc(title)}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-sm sm:text-base text-muted-foreground">{tc(subtitle)}</p>}
        {children}
      </div>
    </section>
  );
}
