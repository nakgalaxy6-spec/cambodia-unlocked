import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  Compass,
  Calendar,
  Users,
  MessageCircle,
  Phone,
  CheckCircle2,
  Clock,
  Star,
  ShieldCheck,
  Crown,
  Sparkles,
  MapPin,
  TrendingUp,
  Store,
  User,
  Settings,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  DollarSign,
  HelpCircle,
} from "lucide-react";
import { toast } from "sonner";
import { DashboardShell, StatCard, Widget } from "@/components/site/DashboardShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { img } from "@/lib/images";
import { destinations, businesses } from "@/lib/data";

export const Route = createFileRoute("/guide-dashboard")({
  validateSearch: (s: Record<string, unknown>): { tab?: string | undefined } => {
    return { tab: typeof s["tab"] === "string" ? s["tab"] : undefined };
  },
  head: () => ({
    meta: [
      { title: "Tour Guide Workspace & Bookings – Cambodia Unlocked" },
      {
        name: "description",
        content:
          "Manage traveler bookings, tour circuits, local business partnerships, and official certification.",
      },
    ],
  }),
  component: GuideDashboard,
});

type Row = {
  title: string;
  detail: string;
  image?: string | undefined;
  id?: string | undefined;
  badge?: string | undefined;
  actionLabel?: string | undefined;
};

export function GuideDashboard() {
  const { t, tc } = useI18n();
  const { user, quickLogin } = useAuth();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/guide-dashboard" });

  const groups = [
    {
      title: t("Operations", "ប្រតិបត្តិការ"),
      items: [
        { id: "overview", label: t("Overview", "ទិដ្ឋភាពទូទៅ"), icon: Compass },
        { id: "inquiries", label: t("Traveler Bookings", "ការកក់ពីភ្ញៀវ"), icon: MessageCircle, badge: "3" },
        { id: "circuits", label: t("My Tour Circuits", "កញ្ចប់ Tour របស់ខ្ញុំ"), icon: MapPin },
        { id: "schedule", label: t("Tour Schedule", "កាលវិភាគនាំភ្ញៀវ"), icon: Calendar },
      ],
    },
    {
      title: t("Ecosystem & Partners", "បណ្តាញដៃគូ"),
      items: [
        { id: "partners", label: t("Business Partners", "ដៃគូអាជីវកម្មក្នុងស្រុក"), icon: Store, badge: "4" },
        { id: "verification", label: t("License & Admin", "អាជ្ញាប័ណ្ណ & Admin"), icon: ShieldCheck },
        { id: "reviews", label: t("Traveler Reviews", "ការវាយតម្លៃពីអ្នកដំណើរ"), icon: Star },
      ],
    },
    {
      title: t("Account", "គណនី"),
      items: [
        { id: "profile", label: t("Guide Profile", "ប្រវត្តិរូបមគ្គុទ្ទេសក៍"), icon: User },
        { id: "settings", label: t("Settings", "ការកំណត់"), icon: Settings },
      ],
    },
  ];

  const active = search.tab ?? "overview";
  const selectTab = (tab: string) => navigate({ search: { tab } });

  const displayName = user?.name ?? "Dara Sok (ដារ៉ា សុខ)";
  const displayAvatar = user?.avatar ?? img.guideDara;

  return (
    <DashboardShell
      title={t("Tour Guide Workspace", "កន្លែងការងារមគ្គុទ្ទេសក៍ទេសចរណ៍")}
      role={t("Licensed Tour Guide", "មគ្គុទ្ទេសក៍ទេសចរណ៍ផ្លូវការ")}
      user={{
        name: displayName,
        initials: "DS",
        avatar: displayAvatar,
        roleTag: t("Senior Guide", "មគ្គុទ្ទេសក៍ជាន់ខ្ពស់"),
      }}
      groups={groups}
      active={active}
      onSelect={selectTab}
      footer={
        <div className="mt-4 rounded-2xl border border-gold/40 bg-gold-soft/40 p-3 space-y-2">
          <p className="text-[11px] font-bold text-navy uppercase tracking-wider">
            {t("Test Interconnected Roles", "តេស្តតួនាទីដែលទាក់ទងគ្នា")}
          </p>
          <div className="grid grid-cols-3 gap-1">
            <button
              type="button"
              onClick={() => {
                quickLogin("traveler");
                toast.success(t("Switched to Traveler", "បានប្តូរទៅគណនីអ្នកដំណើរ"));
                navigate({ to: "/dashboard" });
              }}
              className="rounded-lg bg-card p-1.5 text-center text-[10px] font-semibold text-navy hover:bg-teal hover:text-white"
            >
              Traveler
            </button>
            <button
              type="button"
              onClick={() => {
                quickLogin("business");
                toast.success(t("Switched to Business", "បានប្តូរទៅគណនីអាជីវកម្ម"));
                navigate({ to: "/business-dashboard" });
              }}
              className="rounded-lg bg-card p-1.5 text-center text-[10px] font-semibold text-navy hover:bg-gold hover:text-navy"
            >
              Business
            </button>
            <button
              type="button"
              onClick={() => {
                quickLogin("admin");
                toast.success(t("Switched to Admin", "បានប្តូរទៅគណនី Admin"));
                navigate({ to: "/admin" });
              }}
              className="rounded-lg bg-card p-1.5 text-center text-[10px] font-semibold text-navy hover:bg-navy hover:text-white"
            >
              Admin
            </button>
          </div>
        </div>
      }
    >
      {/* GUIDE PROFILE HERO BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-slate-900 to-emerald-950 p-6 sm:p-8 text-white shadow-lift border border-teal/30">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <img
              src={displayAvatar}
              alt="Dara Sok"
              className="size-20 sm:size-24 rounded-2xl object-cover ring-4 ring-emerald-500/40 shadow-xl shrink-0"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
                  <CheckCircle2 className="size-3 text-emerald-400" />
                  {t("Verified Local Guide", "មគ្គុទ្ទេសក៍ផ្ទៀងផ្ទាត់រួច")}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-gold/20 border border-gold/40 px-2.5 py-0.5 text-xs font-bold text-gold">
                  <Crown className="size-3 text-gold" />
                  {t("Featured Guide Package ($5/mo)", "កញ្ចប់លេចធ្លោ ($5/ខែ)")}
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-white/80">
                  ID: AGY-GD-0492
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                {displayName}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-navy-foreground/80 max-w-xl">
                {t(
                  "Licensed Senior Heritage Guide • 8 Years Experience • Specializing in Angkor Wat, Bayon & Banteay Srei Historical Circuits",
                  "មគ្គុទ្ទេសក៍បេតិកភណ្ឌជាន់ខ្ពស់ • បទពិសោធន៍ ៨ ឆ្នាំ • ជំនាញប្រាសាទអង្គរវត្ត បាយ័ន និងបន្ទាយស្រី"
                )}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/80">
                <span className="flex items-center gap-1 text-gold font-semibold">
                  <Star className="size-3.5 fill-gold" /> 5.0 (76 {t("Reviews", "ការវាយតម្លៃ")})
                </span>
                <span>•</span>
                <span>{t("Languages:", "ភាសា៖")} English • Khmer • French</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">
                  {t("Zero Commission Platform", "វេទិកាគ្មានកម្រៃជើងសារ ០%")}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-col gap-2 shrink-0">
            <Button
              onClick={() => selectTab("inquiries")}
              className="rounded-full bg-teal text-primary-foreground hover:bg-teal/90 shadow-md font-semibold text-xs"
            >
              <MessageCircle className="size-3.5 mr-1.5" />
              {t("View 3 New Inquiries", "មើលសំណួរថ្មី ៣")}
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full border-white/20 bg-white/10 text-white hover:bg-white/20 text-xs"
            >
              <Link to="/guides">
                <ExternalLink className="size-3.5 mr-1.5" />
                {t("Public Guide Profile", "ប្រវត្តិរូបជាសាធារណៈ")}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* 4 KEY METRICS */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label={t("Tours Completed", "ដំណើរបានបញ្ចប់")}
          value="142"
          delta={t("+18 this season", "+១៨ ក្នុងរដូវកាលនេះ")}
          icon={Compass}
        />
        <StatCard
          label={t("Traveler Inquiries", "សំណួរពីភ្ញៀវ")}
          value="18"
          delta={t("3 pending reply", "៣ កំពុងរង់ចាំឆ្លើយ")}
          icon={MessageCircle}
        />
        <StatCard
          label={t("Partner Businesses", "ដៃគូអាជីវកម្ម")}
          value="12"
          delta={t("Pottery, Cafes & Stays", "ស្ទូឌីយោ កាហ្វេ និងស្នាក់នៅ")}
          icon={Store}
        />
        <StatCard
          label={t("Est. Monthly Income", "ចំណូលប៉ាន់ស្មានខែនេះ")}
          value="$1,890"
          delta={t("100% direct to guide", "១០០% ចូលមគ្គុទ្ទេសក៍ផ្ទាល់")}
          icon={DollarSign}
        />
      </div>

      {/* TAB CONTENT */}
      {active === "overview" && (
        <div className="mt-6 space-y-6">
          {/* SECTION 1: INCOMING TRAVELER BOOKINGS (INTERCONNECTION: GUIDE <-> TRAVELER) */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-teal">
                  {t("Interconnection with Travelers", "ទំនាក់ទំនងជាមួយភ្ញៀវទេសចរ")}
                </span>
                <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                  <Users className="size-5 text-teal" />
                  {t("Recent Traveler Booking Inquiries", "សំណួរ និងការកក់ថ្មីៗពីអ្នកដំណើរ")}
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => selectTab("inquiries")}
                className="text-teal text-xs"
              >
                {t("View All Inquiries", "មើលសំណួរទាំងអស់")} <ArrowRight className="size-3.5 ml-1" />
              </Button>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: "bkg-01",
                  traveler: "Sokchan Min (សុខចាន់ មីន)",
                  travelerRole: "👑 Premium Traveler",
                  tour: t("Angkor Wat Sunrise & Photography Circuit", "ដំណើរមើលថ្ងៃរះនៅអង្គរវត្ត & ថតរូប"),
                  date: t("Sunday, 05:00 AM • 2 Persons", "ថ្ងៃអាទិត្យ ម៉ោង ០៥:០០ ព្រឹក • ២ នាក់"),
                  price: "$45",
                  phone: "+855 12 888 123",
                  status: t("Pending Reply", "រង់ចាំឆ្លើយ"),
                  statusColor: "bg-amber-100 text-amber-800",
                },
                {
                  id: "bkg-02",
                  traveler: "Sarah Jenkins (Melbourne, Australia)",
                  travelerRole: "Traveler",
                  tour: t("Banteay Srei & Village Palm Sugar Walk", "ដំណើរទស្សនាបន្ទាយស្រី និងស្ករត្នោត"),
                  date: t("Tuesday, 08:00 AM • 3 Persons", "ថ្ងៃអង្គារ ម៉ោង ០៨:០០ ព្រឹក • ៣ នាក់"),
                  price: "$55",
                  phone: "+61 412 345 678",
                  status: t("Confirmed", "បានបញ្ជាក់"),
                  statusColor: "bg-emerald-100 text-emerald-800",
                },
                {
                  id: "bkg-03",
                  traveler: "Jean-Luc Dupont (Paris, France)",
                  travelerRole: "Traveler",
                  tour: t("Angkor Thom & Bayon Architectural Tour (French)", "ដំណើរស្វែងយល់អង្គរធំ & បាយ័ន (ភាសាបារាំង)"),
                  date: t("Thursday, 08:30 AM • 2 Persons", "ថ្ងៃព្រហស្បតិ៍ ម៉ោង ០៨:៣០ ព្រឹក • ២ នាក់"),
                  price: "$40",
                  phone: "+33 6 12 34 56 78",
                  status: t("Confirmed", "បានបញ្ជាក់"),
                  statusColor: "bg-emerald-100 text-emerald-800",
                },
              ].map((b) => (
                <div
                  key={b.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border/80 bg-muted/30 p-4 transition hover:bg-muted/50"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-navy text-sm">{b.traveler}</span>
                      <span className="rounded-full bg-gold/20 px-2 py-0.2 text-[10px] font-semibold text-gold">
                        {b.travelerRole}
                      </span>
                      <span className={`rounded-full px-2 py-0.2 text-[10px] font-bold ${b.statusColor}`}>
                        {b.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-teal">{b.tour}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <Clock className="size-3 text-muted-foreground" /> {b.date}
                      <span>•</span>
                      <span className="font-bold text-navy">{b.price}</span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() =>
                        toast.success(
                          t(
                            `Booking confirmed for ${b.traveler}!`,
                            `បានបញ្ជាក់ការកក់សម្រាប់ ${b.traveler}!`
                          )
                        )
                      }
                      className="rounded-full bg-teal text-primary-foreground hover:bg-teal/90 text-xs h-8"
                    >
                      <CheckCircle2 className="size-3.5 mr-1" />
                      {t("Accept", "យល់ព្រម")}
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-full text-xs h-8 text-navy"
                    >
                      <a href={`https://wa.me/${b.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">
                        <MessageCircle className="size-3.5 mr-1 text-emerald-600" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 2: BUSINESS PARTNERS NETWORK (INTERCONNECTION: GUIDE <-> BUSINESS OWNER) */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-gold">
                  {t("Interconnection with Local Businesses", "ទំនាក់ទំនងជាមួយម្ចាស់អាជីវកម្មក្នុងស្រុក")}
                </span>
                <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                  <Store className="size-5 text-gold" />
                  {t("Local Business Partner Stops on Your Circuits", "អាជីវកម្មក្នុងស្រុកដែលជាដៃគូក្នុងដំណើរ Tour")}
                </h2>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => selectTab("partners")}
                className="text-teal text-xs"
              >
                {t("Manage Partners", "គ្រប់គ្រងដៃគូ")} <ArrowRight className="size-3.5 ml-1" />
              </Button>
            </div>

            <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
              {t(
                "Guides bring traveler groups to visit local artisan workshops, family-run cafes, and homestays. In return, partner businesses offer special group discounts and warm local hospitality.",
                "មគ្គុទ្ទេសក៍នាំភ្ញៀវទៅទស្សនាសិប្បកម្មខ្មែរ ហាងកាហ្វេ និងកន្លែងស្នាក់នៅ។ ជាថ្នូរមកវិញ អាជីវកម្មដៃគូផ្តល់ការបញ្ចុះតម្លៃពិសេសសម្រាប់ក្រុមភ្ញៀវ និងការទទួលស្វាគមន៍យ៉ាងកក់ក្តៅ។"
              )}
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  id: "biz-01",
                  name: "Village Pottery Studio (ស្ទូឌីយោស្មូនឆ្នាំងភូមិ)",
                  owner: "Chanreay Sok (ចាន់រី សុខ)",
                  roleTag: "👑 Business Owner",
                  category: t("Handicrafts & Workshop", "សិប្បកម្ម & សិក្ខាសាលា"),
                  deal: t("15% group discount for Dara's travelers", "បញ្ចុះតម្លៃ ១៥% សម្រាប់ភ្ញៀវរបស់តារា"),
                  status: t("Active Partner", "ដៃគូសកម្ម"),
                  image: img.pottery,
                },
                {
                  id: "biz-02",
                  name: "Lotus Leaf Café (កាហ្វេផ្កាឈូក)",
                  owner: "Vannak Meng",
                  roleTag: "Business Owner",
                  category: t("Café & Breakfast", "កាហ្វេ & អាហារពេលព្រឹក"),
                  deal: t("Free iced lotus tea for tour groups", "តែផ្កាឈូកទឹកកកឥតគិតថ្លៃសម្រាប់ក្រុម tour"),
                  status: t("Active Partner", "ដៃគូសកម្ម"),
                  image: img.cafe,
                },
                {
                  id: "biz-03",
                  name: "Sokha Tuk Tuk Services (សុខា រ៉ឺម៉កកង់បី)",
                  owner: "Sokha Ouk",
                  roleTag: "Transport Partner",
                  category: t("Tuk Tuk & Van", "រ៉ឺម៉កកង់បី & រថយន្ត"),
                  deal: t("Priority temple pickup dispatch", "អាទិភាពទទួលបញ្ជូនភ្ញៀវតាមប្រាសាទ"),
                  status: t("Active Partner", "ដៃគូសកម្ម"),
                  image: img.tuktuk,
                },
              ].map((p) => (
                <div
                  key={p.id}
                  className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm hover:shadow-md transition"
                >
                  <img src={p.image} alt={p.name} className="h-32 w-full object-cover" />
                  <div className="p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-teal uppercase tracking-wider">
                        {p.category}
                      </span>
                      <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.2 text-[10px] font-bold">
                        {p.status}
                      </span>
                    </div>
                    <h3 className="font-bold text-navy text-sm line-clamp-1">{p.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <User className="size-3 text-muted-foreground" /> {p.owner}
                    </p>
                    <div className="rounded-xl bg-gold-soft/50 p-2 text-xs font-semibold text-navy">
                      🎁 {p.deal}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 3: ADMIN VERIFICATION & OVERSIGHT (INTERCONNECTION: GUIDE <-> ADMIN) */}
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card">
            <span className="text-xs font-semibold uppercase tracking-wider text-navy">
              {t("Interconnection with Platform Administration", "ទំនាក់ទំនងជាមួយអ្នកគ្រប់គ្រងប្រព័ន្ធ (Admin)")}
            </span>
            <h2 className="text-xl font-bold text-navy flex items-center gap-2 mt-1">
              <ShieldCheck className="size-5 text-teal" />
              {t("License Verification & Compliance Status", "ស្ថានភាពអាជ្ញាប័ណ្ណ និងការផ្ទៀងផ្ទាត់ផ្លូវការ")}
            </h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/50 p-4 space-y-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-xs font-bold">
                  <CheckCircle2 className="size-3.5 text-emerald-600" />
                  {t("Verified by Admin Borey Seng", "បានផ្ទៀងផ្ទាត់ដោយ Admin បូរី")}
                </span>
                <p className="text-sm font-bold text-navy">
                  {t("Official Ministry Tourism License", "អាជ្ញាប័ណ្ណទេសចរណ៍ក្រសួងផ្លូវការ")}
                </p>
                <p className="text-xs text-muted-foreground">
                  ID: MO-SR-2024-884 • {t("Valid until Dec 2027", "សុពលភាពដល់ ធ្នូ ២០២៧")}
                </p>
              </div>

              <div className="rounded-2xl border border-gold/40 bg-gold-soft/40 p-4 space-y-1.5">
                <span className="inline-flex items-center gap-1 rounded-full bg-gold text-gold-foreground px-2.5 py-0.5 text-xs font-bold">
                  <Crown className="size-3.5" />
                  {t("Featured Package Active", "កញ្ចប់លេចធ្លោកំពុងដំណើរការ")}
                </span>
                <p className="text-sm font-bold text-navy">$5/{t("month", "ខែ")} • {t("Renews in 24 days", "បន្តក្នុង ២៤ ថ្ងៃ")}</p>
                <p className="text-xs text-muted-foreground">
                  {t("Top Search Ranking • Homepage Placement", "ចំណាត់ថ្នាក់កំពូលក្នុងការស្វែងរក • បង្ហាញលើទំព័រដើម")}
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-muted/30 p-4 space-y-1.5 flex flex-col justify-between">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">{t("Direct Admin Channel", "ច្រកទាក់ទង Admin")}</p>
                  <p className="text-sm font-bold text-navy">{t("Provincial Tourism Liaison", "មន្ត្រីសម្របសម្រួលទេសចរណ៍")}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.info(t("Admin contacted. Support will respond in 15 mins.", "បានទាក់ទង Admin។ ជំនួយនឹងឆ្លើយតបក្នុង ១៥ នាទី។"))}
                  className="rounded-full text-xs h-8 w-full mt-2"
                >
                  <ShieldCheck className="size-3.5 mr-1 text-teal" />
                  {t("Message Admin", "ផ្ញើសារទៅ Admin")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: INQUIRIES & BOOKINGS */}
      {active === "inquiries" && (
        <div className="mt-6 space-y-4">
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card">
            <h2 className="text-xl font-bold text-navy flex items-center gap-2">
              <MessageCircle className="size-5 text-teal" />
              {t("All Traveler Inquiries & Booking Requests", "សំណួរ និងការកក់ទាំងអស់ពីអ្នកដំណើរ")}
            </h2>
            <p className="text-xs text-muted-foreground mt-1 mb-4">
              {t(
                "Travelers reach out to you directly through Cambodia Unlocked with 0% platform commission.",
                "ភ្ញៀវទេសចរទាក់ទងអ្នកដោយផ្ទាល់តាមរយៈ Cambodia Unlocked ដោយគ្មានកម្រៃជើងសារ ០%។"
              )}
            </p>

            <div className="space-y-3">
              {[
                {
                  id: "inq-1",
                  name: "Sokchan Min (សុខចាន់ មីន)",
                  country: "Cambodia (Phnom Penh)",
                  role: "👑 Premium Traveler",
                  tour: "Angkor Wat Sunrise & Photography Circuit",
                  date: "Sunday 27 July 2026 • 05:00 AM",
                  party: "2 adults",
                  message: "Hi Dara, we want to capture the reflection at sunrise and then visit Ta Prohm before crowds arrive. Can you pick us up at our hotel?",
                  price: "$45",
                  phone: "+855 12 888 123",
                },
                {
                  id: "inq-2",
                  name: "Sarah Jenkins",
                  country: "Australia (Melbourne)",
                  role: "Traveler",
                  tour: "Banteay Srei & Village Palm Sugar Walk",
                  date: "Tuesday 29 July 2026 • 08:00 AM",
                  party: "3 adults",
                  message: "Looking for an authentic cultural day including visiting the pottery studio and tasting palm sugar.",
                  price: "$55",
                  phone: "+61 412 345 678",
                },
                {
                  id: "inq-3",
                  name: "Jean-Luc Dupont",
                  country: "France (Paris)",
                  role: "Traveler",
                  tour: "Angkor Thom & Bayon Architectural History",
                  date: "Thursday 31 July 2026 • 08:30 AM",
                  party: "2 adults",
                  message: "We would like a detailed tour in French explaining the bas-reliefs and 216 stone faces of Bayon.",
                  price: "$40",
                  phone: "+33 6 12 34 56 78",
                },
              ].map((inq) => (
                <div key={inq.id} className="rounded-2xl border border-border/80 bg-muted/20 p-5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/60 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-navy">{inq.name}</span>
                        <span className="rounded-full bg-gold/20 px-2 py-0.2 text-[10px] font-bold text-gold">
                          {inq.role}
                        </span>
                        <span className="text-xs text-muted-foreground">({inq.country})</span>
                      </div>
                      <p className="text-xs text-teal font-semibold mt-0.5">{inq.tour}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-display font-extrabold text-navy text-lg">{inq.price}</span>
                      <p className="text-[11px] text-muted-foreground">{inq.date}</p>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground italic bg-card p-3 rounded-xl border border-border/60">
                    "{inq.message}"
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                      <Phone className="size-3 text-teal" /> {inq.phone}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        onClick={() => toast.success(t(`Booking confirmed for ${inq.name}!`, `បានបញ្ជាក់ការកក់សម្រាប់ ${inq.name}!`))}
                        className="rounded-full bg-teal text-primary-foreground hover:bg-teal/90 text-xs h-8"
                      >
                        <CheckCircle2 className="size-3.5 mr-1" />
                        {t("Accept Tour", "យល់ព្រមទទួល")}
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="rounded-full text-xs h-8"
                      >
                        <a href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">
                          <MessageCircle className="size-3.5 mr-1 text-emerald-600" />
                          {t("Reply on WhatsApp", "ឆ្លើយតបតាម WhatsApp")}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: MY TOUR CIRCUITS */}
      {active === "circuits" && (
        <div className="mt-6 space-y-4">
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                  <MapPin className="size-5 text-teal" />
                  {t("My Active Tour Circuits", "កញ្ចប់ដំណើរកម្សាន្តសកម្មរបស់ខ្ញុំ")}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t("Manage your itineraries, durations, pricing, and partner business stops.", "គ្រប់គ្រងកម្មវិធីទស្សនា រយៈពេល តម្លៃ និងទីតាំងអាជីវកម្មដៃគូ។")}
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => toast.success(t("Circuit creator opened.", "បានបើកផ្ទាំងបង្កើត Tour ថ្មី។"))}
                className="rounded-full bg-teal text-primary-foreground hover:bg-teal/90 text-xs"
              >
                + {t("Add New Circuit", "បន្ថែម Tour ថ្មី")}
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {[
                {
                  id: "c-1",
                  name: t("Angkor Sunrise & Monumental Temples", "ដំណើរមើលថ្ងៃរះនៅអង្គរវត្ត & ប្រាសាទសំខាន់ៗ"),
                  duration: t("6 Hours • Early Morning", "៦ ម៉ោង • ព្រឹកព្រលឹម"),
                  price: "$35 – $45",
                  stops: [t("Angkor Wat Sunrise", "ថ្ងៃរះអង្គរវត្ត"), t("Bayon Temple", "ប្រាសាទបាយ័ន"), t("Ta Prohm Roots", "ប្រាសាទតាព្រហ្ម"), t("Lotus Leaf Café Stop", "ឈប់ញ៉ាំកាហ្វេ")],
                  badge: t("Most Popular", "ពេញនិយមបំផុត"),
                  image: img.angkorWat,
                },
                {
                  id: "c-2",
                  name: t("Banteay Srei & Artisan Village Immersion", "បន្ទាយស្រី & ស្វែងយល់សិប្បកម្មភូមិខ្មែរ"),
                  duration: t("Full Day • 8 Hours", "ពេញមួយថ្ងៃ • ៨ ម៉ោង"),
                  price: "$45 – $55",
                  stops: [t("Banteay Srei Carvings", "បន្ទាយស្រី"), t("Palm Sugar Making", "ស្ករត្នោត"), t("Village Pottery Workshop", "ស្ទូឌីយោកុលាលភាជន៍")],
                  badge: t("Artisan Focus", "ផ្តោតលើសិប្បកម្ម"),
                  image: img.banteay,
                },
                {
                  id: "c-3",
                  name: t("Phnom Kulen Waterfall & Sacred Lingas Trek", "ដំណើរកម្សាន្តទឹកជ្រោះភ្នំគូលែន & ស្ទឹងលិង្គ ១០០០"),
                  duration: t("Full Day • Mountain Tour", "ពេញមួយថ្ងៃ • ឡើងភ្នំ"),
                  price: "$60 – $70",
                  stops: [t("Kulen Waterfall", "ទឹកធ្លាក់គូលែន"), t("River of 1,000 Lingas", "ស្ទឹងលិង្គ ១០០០"), t("Reclining Buddha", "ព្រះអង្គធំ")],
                  badge: t("Adventure", "ផ្សងព្រេង"),
                  image: img.kulen,
                },
                {
                  id: "c-4",
                  name: t("Countryside Bicycle & Sunset Trail", "ជិះកង់កម្សាន្តតាមជនបទ & មើលថ្ងៃលិច"),
                  duration: t("3.5 Hours • Afternoon", "៣.៥ ម៉ោង • រសៀល"),
                  price: "$25",
                  stops: [t("Rice Paddies", "វាលស្រែ"), t("Lotus Farm Road", "កសិដ្ឋានឈូក"), t("Mekong Homestay Tea", "តែផ្ទះស្នាក់")],
                  badge: t("Eco-Tourism", "អេកូទេសចរណ៍"),
                  image: img.bike,
                },
              ].map((c) => (
                <div key={c.id} className="overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm hover:shadow-md transition">
                  <img src={c.image} alt={c.name} className="h-40 w-full object-cover" />
                  <div className="p-4 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-gold/20 text-gold px-2.5 py-0.5 text-[10px] font-bold">
                        {c.badge}
                      </span>
                      <span className="font-extrabold text-navy text-sm">{c.price}</span>
                    </div>
                    <h3 className="font-bold text-navy text-base">{c.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="size-3 text-teal" /> {c.duration}
                    </p>
                    <div className="pt-2 border-t border-border/60">
                      <p className="text-[11px] font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
                        {t("Tour Circuit Stops:", "ទីតាំងឈប់ក្នុងដំណើរ៖")}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {c.stops.map((st, i) => (
                          <span key={i} className="rounded-lg bg-muted px-2 py-0.5 text-[10px] font-medium text-navy">
                            {st}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: BUSINESS PARTNERS NETWORK */}
      {active === "partners" && (
        <div className="mt-6 space-y-4">
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                  <Store className="size-5 text-gold" />
                  {t("Local Business Partner Network", "បណ្តាញដៃគូអាជីវកម្មក្នុងស្រុក")}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t("Partner with pottery studios, cafes, and homestays for mutual community benefit.", "សហការជាមួយសិប្បកម្ម ហាងកាហ្វេ និងផ្ទះស្នាក់ ដើម្បីផលប្រយោជន៍សហគមន៍ទៅវិញទៅមក។")}
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => toast.success(t("Partnership invitation sent to business owners.", "បានផ្ញើការអញ្ជើញសហការទៅកាន់ម្ចាស់អាជីវកម្ម។"))}
                className="rounded-full bg-teal text-primary-foreground hover:bg-teal/90 text-xs"
              >
                + {t("Connect New Business", "ភ្ជាប់អាជីវកម្មថ្មី")}
              </Button>
            </div>

            <div className="space-y-4">
              {[
                {
                  id: "p-1",
                  name: "Village Pottery Studio (ស្ទូឌីយោកុលាលភាជន៍ភូមិ)",
                  owner: "Chanreay Sok (ចាន់រី សុខ)",
                  ownerRole: "👑 Business Owner Partner",
                  phone: "+855 12 345 678",
                  location: "Roluos Village, Siem Reap",
                  collaboration: t("Stop on Banteay Srei & Roluos tour. Travelers try pottery wheel.", "ទីតាំងឈប់សម្រាប់ tour បន្ទាយស្រី និងរលួស។ ភ្ញៀវរៀនស្មូនឆ្នាំងដី។"),
                  benefit: t("15% group discount + Free welcome herbal tea", "បញ្ចុះតម្លៃ ១៥% សម្រាប់ក្រុម + តែរុក្ខជាតិស្វាគមន៍"),
                  image: img.pottery,
                },
                {
                  id: "p-2",
                  name: "Lotus Leaf Café (កាហ្វេផ្កាឈូក)",
                  owner: "Vannak Meng",
                  ownerRole: "Business Owner Partner",
                  phone: "+855 12 777 888",
                  location: "Wat Bo Road, Siem Reap Town",
                  collaboration: t("Morning coffee & breakfast stop after Angkor sunrise tour.", "ទីតាំងឈប់ពិសាកាហ្វេ និងអាហារពេលព្រឹកបន្ទាប់ពីមើលថ្ងៃរះអង្គរ។"),
                  benefit: t("10% discount on specialty iced coffee & Khmer snacks", "បញ្ចុះតម្លៃ ១០% លើកាហ្វេ និងនំខ្មែរ"),
                  image: img.cafe,
                },
                {
                  id: "p-3",
                  name: "Mekong Wooden Homestay (ផ្ទះស្នាក់ឈើបុរាណ)",
                  owner: "Sokhom Phally",
                  ownerRole: "Homestay Host",
                  phone: "+855 12 555 444",
                  location: "Chreav Village, Siem Reap",
                  collaboration: t("Traditional lunch break on countryside bicycle circuits.", "ឈប់សម្រាកពិសាអាហារថ្ងៃត្រង់ប្រពៃណីក្នុងដំណើរជិះកង់ជនបទ។"),
                  benefit: t("Fresh organic home-cooked Khmer meal from garden herbs", "ម្ហូបខ្មែរបន្លែសរីរាង្គស្រស់ៗពីសួនគ្រួសារ"),
                  image: img.homestay,
                },
              ].map((bp) => (
                <div key={bp.id} className="rounded-2xl border border-border/80 bg-card p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm hover:shadow-md transition">
                  <div className="flex items-start sm:items-center gap-4">
                    <img src={bp.image} alt={bp.name} className="size-20 rounded-xl object-cover shrink-0" />
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-navy text-base">{bp.name}</h3>
                        <span className="rounded-full bg-gold/20 text-gold px-2 py-0.2 text-[10px] font-bold">
                          {bp.ownerRole}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground flex items-center gap-2">
                        <span><User className="size-3 inline mr-1 text-teal" />{bp.owner}</span>
                        <span>•</span>
                        <span><MapPin className="size-3 inline mr-1 text-teal" />{bp.location}</span>
                      </p>
                      <p className="text-xs text-navy font-medium pt-0.5">{bp.collaboration}</p>
                      <div className="inline-block rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 text-xs font-semibold">
                        🎁 {bp.benefit}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    <Button
                      size="sm"
                      onClick={() => toast.success(t(`Group reservation notice sent to ${bp.owner}!`, `បានផ្ញើដំណឹងកក់ក្រុមទៅកាន់ ${bp.owner}!`))}
                      className="rounded-full bg-teal text-primary-foreground hover:bg-teal/90 text-xs h-8"
                    >
                      <Calendar className="size-3.5 mr-1" />
                      {t("Notify Tour Arrival", "ជូនដំណឹងនាំភ្ញៀវទៅ")}
                    </Button>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className="rounded-full text-xs h-8"
                    >
                      <a href={`https://wa.me/${bp.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">
                        <MessageCircle className="size-3.5 mr-1 text-emerald-600" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB: LICENSE & ADMIN VERIFICATION */}
      {active === "verification" && (
        <div className="mt-6 space-y-4">
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card space-y-6">
            <div>
              <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                <ShieldCheck className="size-5 text-teal" />
                {t("Ministry License & Platform Verification", "អាជ្ញាប័ណ្ណក្រសួង និងការផ្ទៀងផ្ទាត់វេទិកា")}
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t(
                  "Platform Admin Borey Seng reviews and validates all official tourism guide licenses to ensure traveler trust.",
                  "Admin បូរី សេង ត្រួតពិនិត្យនិងផ្ទៀងផ្ទាត់អាជ្ញាប័ណ្ណមគ្គុទ្ទេសក៍ផ្លូវការ ដើម្បីធានាទំនុកចិត្តខ្ពស់បំផុត។"
                )}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-50/40 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold">
                    <CheckCircle2 className="size-4 text-emerald-600" />
                    {t("Official License Verified", "អាជ្ញាប័ណ្ណបានផ្ទៀងផ្ទាត់រួច")}
                  </span>
                  <span className="text-xs font-bold text-emerald-700">100% Compliant</span>
                </div>
                <div className="space-y-1.5 text-xs text-navy">
                  <p><strong>{t("Full Name:", "ឈ្មោះពេញ៖")}</strong> Dara Sok (ដារ៉ា សុខ)</p>
                  <p><strong>{t("License Number:", "លេខអាជ្ញាប័ណ្ណ៖")}</strong> MO-SR-2024-884</p>
                  <p><strong>{t("Issuing Authority:", "ស្ថាប័នចេញប័ណ្ណ៖")}</strong> Ministry of Tourism, Cambodia</p>
                  <p><strong>{t("Languages:", "ភាសាផ្លូវការ៖")}</strong> English, Khmer, French</p>
                  <p><strong>{t("Expiration Date:", "កាលបរិច្ឆេទផុតកំណត់៖")}</strong> 31 December 2027</p>
                  <p><strong>{t("Reviewed by Admin:", "បានត្រួតពិនិត្យដោយ៖")}</strong> Borey Seng (Head of Platform Operations)</p>
                </div>
              </div>

              <div className="rounded-2xl border border-gold/40 bg-gold-soft/40 p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold text-gold-foreground px-3 py-1 text-xs font-bold">
                    <Crown className="size-4" />
                    {t("Featured Guide Package", "កញ្ចប់មគ្គុទ្ទេសក៍លេចធ្លោ")}
                  </span>
                  <span className="text-xs font-bold text-gold">$5/month</span>
                </div>
                <div className="space-y-1 text-xs text-navy">
                  <p className="font-semibold text-emerald-700">✅ {t("Homepage Featured Placement", "ការបង្ហាញនៅលើទំព័រដើម")}</p>
                  <p className="font-semibold text-emerald-700">✅ {t("Top Search Ranking in Siem Reap", "ចំណាត់ថ្នាក់ស្វែងរកកំពូលនៅសៀមរាប")}</p>
                  <p className="font-semibold text-emerald-700">✅ {t("Recommended Guide Badge", "ស្លាកសញ្ញាមគ្គុទ្ទេសក៍ណែនាំ")}</p>
                  <p className="font-semibold text-emerald-700">✅ {t("Priority Traveler Inquiries (3x visibility)", "អាទិភាពទទួលសំណួរពីភ្ញៀវ")}</p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toast.info(t("Featured Guide status active. Next billing in 24 days.", "កញ្ចប់ Featured Guide សកម្ម។ គិតប្រាក់បន្តក្នុង ២៤ ថ្ងៃ។"))}
                  className="rounded-full text-xs h-8 w-full mt-2"
                >
                  {t("Manage Subscription ($5/mo)", "គ្រប់គ្រងកញ្ចប់ ($5/ខែ)")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: REVIEWS */}
      {active === "reviews" && (
        <div className="mt-6 space-y-4">
          <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                  <Star className="size-5 text-gold fill-gold" />
                  {t("Traveler Reviews (5.0 Rating • 76 Reviews)", "ការវាយតម្លៃពីអ្នកដំណើរ (៥.០ ផ្កាយ • ៧៦ ការវាយតម្លៃ)")}
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {t("Direct feedback from verified travelers who completed your tours.", "មតិយោបល់ផ្ទាល់ពីអ្នកដំណើរដែលបានបញ្ចប់ដំណើរកម្សាន្តជាមួយអ្នក។")}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  name: "Hannah Wright",
                  country: "United Kingdom",
                  date: "14 July 2026",
                  rating: 5,
                  text: "Dara was an absolute treasure! He knew every carving and historical fact at Banteay Srei and Angkor Wat. He also took us to the Village Pottery Studio where we made clay pots with local artisans. Highly recommended!",
                },
                {
                  name: "Minh Pham",
                  country: "Vietnam",
                  date: "8 July 2026",
                  rating: 5,
                  text: "Super responsive on WhatsApp, picked us up on time with a comfortable tuk tuk, and took amazing photos of us with the sunrise. Best guide in Siem Reap!",
                },
                {
                  name: "Carlos Rodriguez",
                  country: "Spain",
                  date: "28 June 2026",
                  rating: 5,
                  text: "Great energy and deep respect for Khmer culture. We loved the village coconut stop and avoiding the big tour bus crowds.",
                },
              ].map((rev, idx) => (
                <div key={idx} className="rounded-2xl border border-border/70 bg-muted/20 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-navy text-sm">{rev.name}</span>
                      <span className="text-xs text-muted-foreground ml-2">({rev.country})</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} className="size-3.5 fill-gold text-gold" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">"{rev.text}"</p>
                  <p className="text-[10px] text-muted-foreground">{rev.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
