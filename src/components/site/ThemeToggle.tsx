import { Sun, Moon, Laptop, Check } from "lucide-react";
import { useTheme, type Theme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const { t } = useI18n();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t("Toggle theme", "ប្តូររូបរាង (Theme)")}
          className={cn(
            "relative inline-flex size-9 items-center justify-center rounded-full border border-border bg-card text-foreground transition-all duration-300 hover:border-teal/50 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-sm",
            className,
          )}
        >
          {resolvedTheme === "dark" ? (
            <Moon className="size-4 text-gold transition-transform duration-300 rotate-0 scale-100" />
          ) : (
            <Sun className="size-4 text-amber-500 transition-transform duration-300 rotate-0 scale-100" />
          )}
          <span className="sr-only">{t("Toggle theme", "ប្តូរ Theme")}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40 p-1.5 shadow-xl">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={cn(
            "flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold",
            theme === "light" ? "bg-teal-soft text-teal" : "text-foreground",
          )}
        >
          <div className="flex items-center gap-2">
            <Sun className="size-3.5 text-amber-500" />
            <span>{t("Light", "ពន្លឺ (Light)")}</span>
          </div>
          {theme === "light" && <Check className="size-3.5" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={cn(
            "flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold",
            theme === "dark" ? "bg-teal-soft text-teal" : "text-foreground",
          )}
        >
          <div className="flex items-center gap-2">
            <Moon className="size-3.5 text-gold" />
            <span>{t("Dark", "ងងឹត (Dark)")}</span>
          </div>
          {theme === "dark" && <Check className="size-3.5" />}
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={cn(
            "flex cursor-pointer items-center justify-between rounded-lg px-2.5 py-2 text-xs font-semibold",
            theme === "system" ? "bg-teal-soft text-teal" : "text-foreground",
          )}
        >
          <div className="flex items-center gap-2">
            <Laptop className="size-3.5 text-muted-foreground" />
            <span>{t("System", "ស្វ័យប្រវត្តិ (System)")}</span>
          </div>
          {theme === "system" && <Check className="size-3.5" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function ThemeSegmentedControl({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const { t } = useI18n();

  const options: { id: Theme; label: string; icon: typeof Sun }[] = [
    { id: "light", label: t("Light", "ពន្លឺ"), icon: Sun },
    { id: "dark", label: t("Dark", "ងងឹត"), icon: Moon },
    { id: "system", label: t("System", "ប្រព័ន្ធ"), icon: Laptop },
  ];

  return (
    <div className={cn("inline-flex items-center rounded-2xl border border-border bg-card p-1 shadow-sm", className)}>
      {options.map((opt) => {
        const Icon = opt.icon;
        const active = theme === opt.id;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => setTheme(opt.id)}
            className={cn(
              "flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all duration-200",
              active
                ? "bg-teal text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
            )}
          >
            <Icon className={cn("size-3.5", active ? "text-white" : opt.id === "light" ? "text-amber-500" : opt.id === "dark" ? "text-gold" : "text-muted-foreground")} />
            <span>{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
