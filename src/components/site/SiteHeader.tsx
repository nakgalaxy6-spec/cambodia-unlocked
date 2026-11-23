import { Link, useNavigate } from "@tanstack/react-router";
import {
  Search,
  ChevronDown,
  User,
  Store,
  ShieldCheck,
  LifeBuoy,
  LogOut,
  Compass,
  Info,
  Settings,
  Menu,
  Languages,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { LANGS, useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useAuth, type UserRole } from "@/lib/auth";

/** Final top navigation — do not add more top-level items. */
const nav = [
  { to: "/", en: "Home", km: "ទំព័រដើម" },
  { to: "/explore", en: "Explore", km: "ស្វែងរក" },
  { to: "/stories", en: "Stories", km: "រឿងរ៉ាវ" },
  { to: "/events", en: "Events", km: "ព្រឹត្តិការណ៍" },
  { to: "/businesses", en: "Local Businesses", km: "អាជីវកម្មក្នុងស្រុក" },
  { to: "/guides", en: "Tour Guides & Travel Support", km: "មគ្គុទ្ទេសក៍ និងជំនួយការធ្វើដំណើរ" },
  { to: "/about", en: "About Us", km: "អំពីយើង" },
  { to: "/how-it-works", en: "How It Works", km: "របៀបដំណើរការ" },
] as const;

const itemCls = "cursor-pointer rounded-lg px-2 py-1.5 text-sm";

export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();
  return (
    <div
      role="group"
      aria-label={t("Choose language", "ជ្រើសរើសភាសា")}
      className={cn("inline-flex items-center rounded-full border bg-card p-0.5", className)}
    >
      <Languages className="ml-1.5 mr-0.5 size-3.5 text-muted-foreground" aria-hidden="true" />
      {LANGS.map((l) => (
        <button
          key={l.id}
          type="button"
          lang={l.id}
          aria-pressed={lang === l.id}
          onClick={() => setLang(l.id)}
          className={cn(
            "rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
            lang === l.id ? "bg-teal text-primary-foreground" : "text-muted-foreground hover:text-navy",
          )}
        >
          {l.short}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const { t } = useI18n();
  const { user, isAuthenticated, logout, quickLogin, getDashboardUrl } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success(t("Signed out", "បានចាកចេញ"), {
      description: t("Your session has ended successfully.", "វគ្គរបស់អ្នកបានបញ្ចប់ដោយជោគជ័យ។"),
    });
    navigate({ to: "/" });
  };

  const getRoleLabel = (role?: string) => {
    switch (role) {
      case "business":
        return t("Business", "អាជីវកម្ម");
      case "admin":
        return t("Admin", "Admin");
      case "guide":
        return t("Guide", "មគ្គុទ្ទេសក៍");
      case "traveler":
      default:
        return t("Traveler", "ភ្ញៀវ");
    }
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-3 px-4 sm:px-6">
        <Logo />
        <nav className="hidden items-center gap-0.5 xl:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-teal-soft text-teal" }}
            >
              {t(n.en, n.km)}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle />
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" aria-label={t("Search", "ស្វែងរក")} onClick={() => setOpen(true)}>
            <Search />
          </Button>

          {/* AUTH STATE: SIGNED IN OR SIGNED OUT */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="hidden sm:inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal-soft/70 px-3 py-1.5 text-xs font-semibold text-navy transition hover:bg-teal-soft shadow-sm"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="size-6 rounded-full object-cover ring-1 ring-teal" />
                  ) : (
                    <span className="grid size-6 place-items-center rounded-full bg-teal text-[11px] font-bold text-white">
                      {user.name.charAt(0)}
                    </span>
                  )}
                  <span className="max-w-[110px] truncate">{user.name.split(" ")[0]}</span>
                  <span className="rounded-full bg-teal px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                    {getRoleLabel(user.role)}
                  </span>
                  <ChevronDown className="size-3 text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 p-2.5 shadow-xl">
                <div className="mb-2 flex items-center gap-3 rounded-xl bg-sky/60 p-2.5">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="size-10 rounded-full object-cover ring-2 ring-teal" />
                  ) : (
                    <span className="grid size-10 place-items-center rounded-full bg-navy text-sm font-bold text-white">
                      {user.name.charAt(0)}
                    </span>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-navy">{user.name}</p>
                    <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    <span className="mt-0.5 inline-block rounded bg-teal-soft px-1.5 py-0.2 text-[10px] font-semibold text-teal">
                      {user.role === "business"
                        ? t("Business Owner", "ម្ចាស់អាជីវកម្ម")
                        : user.role === "admin"
                        ? t("Platform Admin", "អ្នកគ្រប់គ្រងប្រព័ន្ធ")
                        : user.role === "guide"
                        ? t("Tour Guide", "មគ្គុទ្ទេសក៍ទេសចរណ៍")
                        : t("Traveler / Guest", "ភ្ញៀវទេសចរ")}
                    </span>
                  </div>
                </div>

                <DropdownMenuItem asChild className={cn(itemCls, "bg-teal-soft font-semibold text-teal hover:bg-teal hover:text-white")}>
                  <Link to={getDashboardUrl(user.role)}>
                    <LayoutDashboard className="size-4" />
                    <span>{t("Go to My Dashboard", "ផ្ទាំងគ្រប់គ្រងរបស់ខ្ញុំ")}</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuLabel className="px-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  {t("Quick Switch Demo Role (4 Roles)", "ប្តូរតួនាទីសាកល្បង (៤ តួនាទី)")}
                </DropdownMenuLabel>
                <DropdownMenuItem
                  onClick={() => {
                    quickLogin("traveler");
                    toast.success(t("Switched to Traveler", "បានប្តូរទៅគណនីភ្ញៀវទេសចរ"));
                    navigate({ to: "/dashboard" });
                  }}
                  className={itemCls}
                >
                  <User className="size-4 text-teal" />
                  <span>{t("1. Traveler (Sokchan)", "១. ភ្ញៀវទេសចរ (សុខចាន់)")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    quickLogin("guide");
                    toast.success(t("Switched to Tour Guide", "បានប្តូរទៅគណនីមគ្គុទ្ទេសក៍"));
                    navigate({ to: "/guide-dashboard" });
                  }}
                  className={itemCls}
                >
                  <Compass className="size-4 text-emerald-600" />
                  <span>{t("2. Tour Guide (Dara)", "២. មគ្គុទ្ទេសក៍ (ដារ៉ា)")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    quickLogin("business");
                    toast.success(t("Switched to Business Owner", "បានប្តូរទៅគណនីម្ចាស់អាជីវកម្ម"));
                    navigate({ to: "/business-dashboard" });
                  }}
                  className={itemCls}
                >
                  <Store className="size-4 text-gold" />
                  <span>{t("3. Business (Chanreay)", "៣. ម្ចាស់អាជីវកម្ម (ចាន់រី)")}</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    quickLogin("admin");
                    toast.success(t("Switched to Platform Admin", "បានប្តូរទៅគណនី Admin"));
                    navigate({ to: "/admin" });
                  }}
                  className={itemCls}
                >
                  <ShieldCheck className="size-4 text-navy" />
                  <span>{t("4. Admin (Borey)", "៤. អ្នកគ្រប់គ្រង (បូរី)")}</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild className={itemCls}>
                  <Link to={getDashboardUrl(user.role)} search={{ tab: "settings" }}>
                    <Settings className="size-4 text-muted-foreground" />
                    <span>{t("Account Settings", "ការកំណត់គណនី")}</span>
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleLogout} className={cn(itemCls, "text-destructive hover:bg-destructive/10")}>
                  <LogOut className="size-4" />
                  <span>{t("Sign Out", "ចាកចេញ")}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-1.5">
              <Button asChild variant="ghost" className="h-9 rounded-full px-3.5 text-xs font-semibold text-navy hover:bg-teal-soft hover:text-teal">
                <Link to="/login">{t("Sign In", "ចូលគណនី")}</Link>
              </Button>
              <Button asChild className="h-9 rounded-full bg-gold px-4 text-xs font-bold text-gold-foreground shadow-sm hover:bg-gold/90">
                <Link to="/signup">{t("Sign Up", "ចុះឈ្មោះ")}</Link>
              </Button>
            </div>
          )}

          {/* MOBILE DRAWER */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="xl:hidden" aria-label={t("Open menu", "បើកម៉ឺនុយ")}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 overflow-y-auto">
              <SheetHeader>
                <SheetTitle>{t("Menu", "ម៉ឺនុយ")}</SheetTitle>
              </SheetHeader>

              {/* Mobile Auth Banner */}
              <div className="mt-3 px-4">
                {isAuthenticated && user ? (
                  <div className="flex items-center gap-3 rounded-2xl bg-teal-soft/60 p-3">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="size-11 rounded-full object-cover ring-2 ring-teal" />
                    ) : (
                      <span className="grid size-11 place-items-center rounded-full bg-teal text-sm font-bold text-white">
                        {user.name.charAt(0)}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-navy">{user.name}</p>
                      <span className="rounded bg-teal px-1.5 py-0.5 text-[10px] font-bold text-white uppercase">
                        {getRoleLabel(user.role)}
                      </span>
                      <Link
                        to={getDashboardUrl(user.role)}
                        onClick={() => setMobileOpen(false)}
                        className="mt-1 block text-xs font-semibold text-teal hover:underline"
                      >
                        {t("Go to Dashboard →", "ទៅកាន់ផ្ទាំងគ្រប់គ្រង →")}
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    <Button asChild variant="outline" className="h-10 rounded-xl text-xs font-semibold" onClick={() => setMobileOpen(false)}>
                      <Link to="/login">{t("Sign In", "ចូលគណនី")}</Link>
                    </Button>
                    <Button asChild className="h-10 rounded-xl bg-gold text-xs font-bold text-gold-foreground hover:bg-gold/90" onClick={() => setMobileOpen(false)}>
                      <Link to="/signup">{t("Sign Up", "ចុះឈ្មោះ")}</Link>
                    </Button>
                  </div>
                )}
              </div>

              <nav className="mt-4 flex flex-col gap-1 px-4">
                {nav.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    onClick={() => setMobileOpen(false)}
                    activeOptions={{ exact: n.to === "/" }}
                    className="rounded-xl px-3 py-2.5 text-sm font-medium text-navy hover:bg-muted"
                    activeProps={{ className: "bg-teal-soft text-teal" }}
                  >
                    {t(n.en, n.km)}
                  </Link>
                ))}
              </nav>

              <div className="mt-4 space-y-1 border-t px-4 pt-4 text-sm">
                <div className="mb-3 flex items-center justify-between">
                  <LanguageSwitcher />
                  <ThemeToggle />
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                  {t("Dashboards by Role", "ផ្ទាំងគ្រប់គ្រងតាមតួនាទី")}
                </p>
                {([
                  { to: "/dashboard", en: "Traveler Dashboard", km: "ផ្ទាំងគ្រប់គ្រងអ្នកដំណើរ", icon: User },
                  { to: "/business-dashboard", en: "Business Dashboard", km: "ផ្ទាំងគ្រប់គ្រងអាជីវកម្ម", icon: Store },
                  { to: "/admin", en: "Admin Dashboard", km: "ផ្ទាំងគ្រប់គ្រងអ្នកគ្រប់គ្រង", icon: ShieldCheck },
                  { to: "/guide-dashboard", en: "Tour Guide Dashboard", km: "ផ្ទាំងគ្រប់គ្រងមគ្គុទ្ទេសក៍", icon: Compass },
                ] as const).map((m) => (
                  <Link
                    key={m.to}
                    to={m.to}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-muted-foreground hover:bg-muted hover:text-navy"
                  >
                    <m.icon className="size-4 text-teal" />
                    <span>{t(m.en, m.km)}</span>
                  </Link>
                ))}

                {isAuthenticated && (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileOpen(false);
                      handleLogout();
                    }}
                    className="mt-3 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left font-medium text-destructive hover:bg-destructive/10"
                  >
                    <LogOut className="size-4" />
                    <span>{t("Sign Out", "ចាកចេញពីគណនី")}</span>
                  </button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("Search Siem Reap", "ស្វែងរកនៅសៀមរាប")}</DialogTitle>
          </DialogHeader>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setOpen(false);
              navigate({ to: "/explore", search: q ? { q } : {} });
            }}
          >
            <Input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("Destinations, businesses, experiences or events", "គោលដៅ អាជីវកម្ម បទពិសោធន៍ ឬព្រឹត្តិការណ៍")}
            />
            <Button type="submit">{t("Search", "ស្វែងរក")}</Button>
          </form>
        </DialogContent>
      </Dialog>
    </header>
  );
}
