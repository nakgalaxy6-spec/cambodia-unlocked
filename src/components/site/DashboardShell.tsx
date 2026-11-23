import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Bell, LogOut } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { ThemeToggle } from "./ThemeToggle";

export type NavItem = { id: string; label: string; icon: LucideIcon; badge?: string };

export function DashboardShell({
  title,
  role,
  user,
  items = [],
  groups,
  active,
  onSelect,
  renderItem,
  children,
  footer,
}: {
  title: string;
  role: string;
  user: { name: string; initials: string; avatar?: string | undefined; roleTag?: string | undefined };
  items?: NavItem[];
  groups?: { title: string; items: NavItem[] }[];
  active: string;
  onSelect?: (id: string) => void;
  /** Optional custom renderer so items can be real links. */
  renderItem?: (item: NavItem, className: string, content: ReactNode) => ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  const { t } = useI18n();
  const sections = groups ?? [{ title: "", items }];
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-muted/50 pb-12">
      <div className="mx-auto grid max-w-[1440px] gap-6 px-4 sm:px-6 py-6 lg:grid-cols-[260px_1fr]">
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-3xl border border-border/80 bg-card p-4 shadow-card">
            {/* User Profile Card */}
            <div className="flex items-center gap-3 rounded-2xl bg-gradient-to-br from-teal-soft/60 to-sky/60 p-3.5">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="size-11 rounded-full object-cover ring-2 ring-teal shadow-sm" />
              ) : (
                <span className="grid size-11 place-items-center rounded-full bg-navy font-bold text-navy-foreground shadow-sm">
                  {user.initials}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-navy">{user.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="rounded-full bg-teal px-2 py-0.2 text-[10px] font-bold text-white uppercase tracking-wider">
                    {user.roleTag || role}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation Sections */}
            <nav className="mt-4 space-y-1">
              {sections.map((section, index) => (
                <div key={`${section.title}-${index}`} className="space-y-0.5">
                  {section.title && (
                    <h2 className="px-3 pb-1 pt-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/80">
                      {section.title}
                    </h2>
                  )}
                  {section.items.map((it) => {
                    const cls = cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium transition",
                      active === it.id
                        ? "bg-teal text-white shadow-card font-semibold"
                        : "text-muted-foreground hover:bg-muted hover:text-navy",
                    );
                    const content = (
                      <>
                        <it.icon className={cn("size-4 shrink-0", active === it.id ? "text-white" : "text-muted-foreground")} />
                        <span className="flex-1 truncate">{it.label}</span>
                        {it.badge && (
                          <span
                            className={cn(
                              "rounded-full px-2 py-0.5 text-[10px] font-bold",
                              active === it.id ? "bg-white/20 text-white" : "bg-gold-soft text-navy",
                            )}
                          >
                            {it.badge}
                          </span>
                        )}
                      </>
                    );
                    if (renderItem) return <div key={it.id}>{renderItem(it, cls, content)}</div>;
                    return (
                      <button key={it.id} type="button" onClick={() => onSelect?.(it.id)} className={cls}>
                        {content}
                      </button>
                    );
                  })}
                </div>
              ))}
            </nav>

            {footer}

            <div className="mt-4 flex items-center justify-between rounded-xl border-t border-border pt-3 px-3 text-xs font-medium text-muted-foreground">
              <span>{t("Theme", "រូបរាង (Theme)")}</span>
              <ThemeToggle className="size-8" />
            </div>

            <Link
              to="/"
              className="mt-2 flex items-center gap-2.5 rounded-xl px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:text-navy hover:bg-muted"
            >
              <LogOut className="size-3.5" />
              <span>{t("Back to Home", "ត្រឡប់ទៅទំព័រដើម")}</span>
            </Link>
          </div>
        </aside>

        <div className="min-w-0 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/60 bg-card p-4 sm:p-5 shadow-sm">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-teal">{role}</p>
              <h1 className="text-xl sm:text-2xl font-extrabold text-navy tracking-tight">{title}</h1>
            </div>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() =>
                  toast.success(t("Notifications checked", "បានពិនិត្យការជូនដំណឹង"), {
                    description: t("You have 2 active updates in Siem Reap pilot.", "អ្នកមានដំណឹងថ្មីចំនួន ២ ក្នុងគម្រោងសៀមរាប។"),
                  })
                }
                className="relative grid size-10 place-items-center rounded-full border border-border bg-card transition hover:bg-muted"
                aria-label={t("Notifications", "ការជូនដំណឹង")}
              >
                <Bell className="size-4 text-navy" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-lotus ring-2 ring-card" />
              </button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function Widget({ title, action, children, className }: { title: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-2xl border bg-card p-5 shadow-card", className)}>
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="font-display text-base font-semibold text-navy">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

export function StatCard({ label, value, icon: Icon, delta, tone = "teal" }: { label: string; value: string; icon: LucideIcon; delta?: string; tone?: "teal" | "gold" | "lotus" | "navy" }) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{label}</p>
        <span className={cn("grid size-9 place-items-center rounded-xl",
          tone === "teal" && "bg-teal-soft text-teal",
          tone === "gold" && "bg-gold-soft text-gold-foreground",
          tone === "lotus" && "bg-lotus-soft text-lotus",
          tone === "navy" && "bg-secondary text-navy")}><Icon className="size-4" /></span>
      </div>
      <p className="mt-2 font-display text-3xl font-bold text-navy">{value}</p>
      {delta && <p className="mt-1 text-xs font-medium text-success">{delta}</p>}
    </div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const s = status.toLowerCase();
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold",
      (s === "replied" || s === "approved" || s === "active" || s === "published" || s === "confirmed") && "bg-success-soft text-success",
      (s === "pending" || s === "pending review" || s === "expiring" || s === "requested") && "bg-warning-soft text-gold-foreground",
      (s === "changes requested" || s === "declined" || s === "expired" || s === "rejected") && "bg-lotus-soft text-lotus",
      (s === "new" || s === "draft") && "bg-teal-soft text-teal")}>
      {status}
    </span>
  );
}
