import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  LayoutDashboard, ArrowUpRight, ShieldCheck, Users, Store, Compass,
  TrendingUp, CheckCircle, Activity, MapPin, Calendar, BookOpen,
  HeartHandshake, Star, UserCheck, CreditCard, Megaphone, Sparkles,
  BarChart3
} from "lucide-react";
import { toast } from "sonner";
import { DashboardShell, Widget, StatCard } from "@/components/site/DashboardShell";
import { ThemeSegmentedControl } from "@/components/site/ThemeToggle";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { destinations, businesses, events, stories } from "@/lib/data";
import { tourGuides, travelerProfile, getOwner, teamMembers, branchLocations, guidePartners } from "@/lib/people";
import { useFavorites } from "@/lib/favorites";
import { img } from "@/lib/images";

type Row = { title: string; detail: string; image?: string; id?: string };
function Records({ rows }: { rows: Row[] }) {
  const { t } = useI18n();
  return <div className="divide-y">{rows.map((row, index) => <div key={row.id ?? `${row.title}-${index}`} className="flex flex-wrap items-center gap-4 py-4 first:pt-0">
    {row.image && <img src={row.image} alt={row.title} className="size-16 rounded-xl object-cover" loading="lazy" />}
    <div className="min-w-0 flex-1"><h3 className="font-semibold text-navy">{row.title}</h3><p className="whitespace-pre-line text-sm text-muted-foreground">{row.detail}</p></div>
    <Button variant="outline" onClick={() => toast.info(t("Demo preview", "ការមើលសាកល្បង"), { description: row.title + " · " + row.detail })}>{t("View details", "មើលព័ត៌មានលម្អិត")}<ArrowUpRight className="size-4" /></Button>
  </div>)}</div>;
}
function AccountForm({ name, email }: { name: string; email: string }) {
  const { t } = useI18n();
  return <form className="max-w-xl space-y-4" onSubmit={e => { e.preventDefault(); toast.success(t("Changes saved for this demo", "បានរក្សាទុកការផ្លាស់ប្តូរសម្រាប់ការសាកល្បងនេះ")); }}>
    <label className="block space-y-2 text-sm"><span>{t("Name", "ឈ្មោះ")}</span><input required name="name" defaultValue={name} className="w-full rounded-xl border bg-background p-3" /></label>
    <label className="block space-y-2 text-sm"><span>{t("Email", "អ៊ីមែល")}</span><input required type="email" name="email" defaultValue={email} className="w-full rounded-xl border bg-background p-3" /></label>
    <div className="space-y-2 pt-1">
      <span className="block text-sm font-medium">{t("Theme & Appearance", "រូបរាង និង Theme")}</span>
      <ThemeSegmentedControl />
    </div>
    <label className="flex items-center gap-2 text-sm pt-1"><input type="checkbox" defaultChecked />{t("Email notifications", "ការជូនដំណឹងតាមអ៊ីមែល")}</label>
    <Button type="submit">{t("Save changes", "រក្សាទុកការផ្លាស់ប្តូរ")}</Button>
  </form>;
}

export const Route = createFileRoute("/admin")({
  validateSearch: (s: Record<string, unknown>): { tab?: string } => typeof s["tab"] === "string" ? { tab: s["tab"] as string } : {},
  head: () => ({ meta: [
    { title: "Platform administration | Cambodia Unlocked" },
    { name: "description", content: "Manage your platform administration on Cambodia Unlocked in Siem Reap." },
    { property: "og:title", content: "Platform administration | Cambodia Unlocked" },
    { property: "og:description", content: "Explore your platform administration and community tourism activity." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: DashboardPage,
});
function DashboardPage() {
  const { t, tc, lang, setLang } = useI18n();
  const { user, quickLogin } = useAuth();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/admin" });

  const displayName = user?.name ?? "Borey Seng (បូរី សេង)";
  const displayAvatar = user?.avatar ?? img.adminBorey;

  const groups = [
    { title: t("Overview", "ទិដ្ឋភាពទូទៅ"), items: [{ id: "users", label: t("Users", "អ្នកប្រើប្រាស់"), icon: Users }, { id: "businesses", label: t("Businesses", "អាជីវកម្ម"), icon: Store }, { id: "guides", label: t("Guides", "មគ្គុទ្ទេសក៍"), icon: Compass }, { id: "destinations", label: t("Destinations", "គោលដៅទេសចរណ៍"), icon: MapPin }, { id: "events", label: t("Events", "ព្រឹត្តិការណ៍"), icon: Calendar }] },
    { title: t("Content", "មាតិកា"), items: [{ id: "stories", label: t("Stories", "រឿងរ៉ាវ"), icon: BookOpen }, { id: "community", label: t("Community Pages", "ទំព័រសហគមន៍"), icon: HeartHandshake }, { id: "reviews", label: t("Reviews", "ការវាយតម្លៃ"), icon: Star }] },
    { title: t("Verification", "ការផ្ទៀងផ្ទាត់"), items: [{ id: "business-approval", label: t("Business Approval", "ការអនុម័តអាជីវកម្ម"), icon: ShieldCheck }, { id: "guide-approval", label: t("Tour Guide Approval", "ការអនុម័តមគ្គុទ្ទេសក៍"), icon: UserCheck }] },
    { title: t("Revenue", "ចំណូល"), items: [{ id: "plans", label: t("Premium Plans", "គម្រោងពិសេស"), icon: CreditCard }, { id: "promotions", label: t("Promotions", "ការផ្សព្វផ្សាយ"), icon: Megaphone }, { id: "sponsored", label: t("Sponsored Experiences", "បទពិសោធន៍ដែលមានអ្នកឧបត្ថម្ភ"), icon: Sparkles }] },
    { title: t("Reports", "របាយការណ៍"), items: [{ id: "growth", label: t("Platform Growth", "ការរីកចម្រើនវេទិកា"), icon: TrendingUp }, { id: "impact", label: t("Community Impact", "ផលជះលើសហគមន៍"), icon: Activity }, { id: "tourism", label: t("Tourism Performance", "លទ្ធផលវិស័យទេសចរណ៍"), icon: BarChart3 }] }
  ];
  const aliases: Record<string, string> = {"verification": "business-approval", "revenue": "plans", "settings": "overview"};
  const requested = aliases[search["tab"] ?? ""] ?? search["tab"] ?? "overview";
  const active = requested === "overview" || groups.some(g => g.items.some(i => i.id === requested)) ? requested : "overview";
  const heading = groups.flatMap(g => g.items).find(i => i.id === active)?.label ?? t("Overview", "ទិដ្ឋភាពទូទៅ");
  const selectTab = (tab: string) => { void navigate({ search: { tab } }); };

  const destinationRows: Row[] = destinations.map(d => ({ id: `d:${d.slug}`, title: tc(d.name), detail: tc(d.category) + " · " + tc(d.location), image: d.image }));
  const businessRows: Row[] = businesses.map(b => ({ id: `b:${b.slug}`, title: tc(b.name), detail: tc(b.category), image: b.image }));
  const guideRows: Row[] = tourGuides.map(g => ({ id: `g:${g.slug}`, title: g.name, detail: tc(g.province) + " · " + g.rating + " / 5", image: g.cover }));
  const eventRows: Row[] = events.map(e => ({ id: `e:${e.slug}`, title: tc(e.name), detail: tc(e.location), image: e.image }));
  const messageRows: Row[] = [
    { title: t("Pottery workshop • 2 guests", "សិក្ខាសាលាស្មូនឆ្នាំង • ភ្ញៀវ ២ នាក់"), detail: t("Chanreay · Replied · Saturday, 10:00", "ចាន់រី · បានឆ្លើយតប · ថ្ងៃសៅរ៍ ម៉ោង ១០:០០") },
    { title: t("Angkor sunrise tour", "ដំណើរមើលថ្ងៃរះនៅអង្គរ"), detail: t("Dara · Awaiting reply · Sunday, 05:00", "តារា · កំពុងរង់ចាំចម្លើយ · ថ្ងៃអាទិត្យ ម៉ោង ០៥:០០") },
  ];
  const reviewRows: Row[] = [
    { title: t("A wonderful local experience", "បទពិសោធន៍ក្នុងសហគមន៍ដ៏អស្ចារ្យ"), detail: t("Sokchan · 5 / 5 · Published", "សុខចាន់ · ៥ / ៥ · បានផ្សាយ") },
    { title: t("Friendly hosts and beautiful crafts", "ម្ចាស់ផ្ទះរួសរាយ និងសិប្បកម្មស្រស់ស្អាត"), detail: t("Hannah · 5 / 5 · Published", "ហាណា · ៥ / ៥ · បានផ្សាយ") },
  ];

  const rows: Record<string, Row[]> = {
    users: [{ title: travelerProfile.name, detail: t("Traveler · Active · Phnom Penh", "អ្នកដំណើរ · សកម្ម · ភ្នំពេញ") }, ...guideRows.slice(0, 2)],
    businesses: businessRows, guides: guideRows, destinations: destinationRows, events: eventRows,
    stories: stories.map(s => ({ title: tc(s.title), detail: tc(s.category), image: s.image })),
    community: [{ title: t("Roluos craft community", "សហគមន៍សិប្បកម្មរលួស"), detail: t("9 families · Published · Updated this week", "៩ គ្រួសារ · បានផ្សាយ · បានធ្វើបច្ចុប្បន្នភាពសប្ដាហ៍នេះ") }, { title: t("Kampong Phluk community", "សហគមន៍កំពង់ភ្លុក"), detail: t("Floating village experiences · Published", "បទពិសោធន៍ភូមិបណ្ដែតទឹក · បានផ្សាយ") }],
    reviews: reviewRows,
    impact: [{ title: t("Local families supported", "គ្រួសារក្នុងតំបន់ដែលទទួលបានការគាំទ្រ"), detail: t("126 families · Across 14 communities", "១២៦ គ្រួសារ · នៅក្នុងសហគមន៍ ១៤") }, { title: t("Local employment", "ការងារក្នុងតំបន់"), detail: t("84 jobs · 52% women-led businesses", "ការងារ ៨៤ · អាជីវកម្ម ៥២% ដឹកនាំដោយស្ត្រី") }],
    tourism: [{ title: t("Visitor discovery", "ការស្វែងរករបស់ភ្ញៀវទេសចរ"), detail: t("8,420 destination views · 21% monthly growth", "ការមើលគោលដៅ ៨,៤២០ ដង · កំណើនប្រចាំខែ ២១%") }, { title: t("Traveler inquiries", "សំណួររបស់អ្នកដំណើរ"), detail: t("248 inquiries · 92% response rate", "សំណួរ ២៤៨ · អត្រាឆ្លើយតប ៩២%") }],
  };
  const panel = active === "business-approval" ? <ApprovalQueue key="business" rows={businessRows.slice(0, 3)} /> : active === "guide-approval" ? <ApprovalQueue key="guide" rows={guideRows.slice(0, 3)} /> : active === "plans" ? <Plans kind="all" /> : active === "promotions" ? <Plans kind="promotions" /> : active === "sponsored" ? <Plans kind="sponsored" /> : active === "growth" ? <Metrics /> : <Records rows={rows[active] ?? messageRows} />;

  return (
    <DashboardShell
      title={t("Platform Administration", "ការគ្រប់គ្រងវេទិកា")}
      role={t("Master Platform Admin", "អ្នកគ្រប់គ្រងជាន់ខ្ពស់")}
      user={{
        name: displayName,
        initials: displayName.slice(0, 2).toUpperCase(),
        avatar: displayAvatar,
        roleTag: t("Admin Lead", "អ្នកគ្រប់គ្រង"),
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
              className="rounded-lg bg-card p-1.5 text-center text-[10px] font-semibold text-navy hover:bg-teal hover:text-white transition"
            >
              Traveler
            </button>
            <button
              type="button"
              onClick={() => {
                quickLogin("guide");
                toast.success(t("Switched to Tour Guide", "បានប្តូរទៅគណនីមគ្គុទ្ទេសក៍"));
                navigate({ to: "/guide-dashboard" });
              }}
              className="rounded-lg bg-card p-1.5 text-center text-[10px] font-semibold text-navy hover:bg-emerald-600 hover:text-white transition"
            >
              Tour Guide
            </button>
            <button
              type="button"
              onClick={() => {
                quickLogin("business");
                toast.success(t("Switched to Business", "បានប្តូរទៅគណនីអាជីវកម្ម"));
                navigate({ to: "/business-dashboard" });
              }}
              className="rounded-lg bg-card p-1.5 text-center text-[10px] font-semibold text-navy hover:bg-gold hover:text-navy transition"
            >
              Business
            </button>
          </div>
        </div>
      }
    >
    {/* Executive Platform Banner */}
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-slate-900 to-teal/80 p-6 sm:p-7 text-white shadow-lift border border-teal/40">
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-success/20 border border-success/40 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
              <Activity className="size-3 text-emerald-400 animate-pulse" />
              {t("System Live & Healthy • 99.98% Uptime", "ប្រព័ន្ធដំណើរការប្រក្រតី • ៩៩.៩៨%")}
            </span>
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/80">
              Siem Reap Pilot Hub
            </span>
          </div>
          <h2 className="text-2xl font-extrabold sm:text-3xl text-white">
            {t("Platform Control Center", "មជ្ឈមណ្ឌលគ្រប់គ្រងប្រព័ន្ធ")}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-white/80 max-w-xl">
            {t("Managing listings, guide verifications, traveler inquiries, and community economic distributions.", "គ្រប់គ្រងការចុះបញ្ជី ការផ្ទៀងផ្ទាត់មគ្គុទ្ទេសក៍ សំណួរអ្នកដំណើរ និងផលជះសេដ្ឋកិច្ចសហគមន៍។")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button variant="outline" className="rounded-full border-teal/40 bg-teal/20 text-xs sm:text-sm font-semibold text-white hover:bg-teal" onClick={() => selectTab("business-approval")}>
            <ShieldCheck className="mr-1.5 size-4" />
            {t("Review Approvals", "ពិនិត្យការអនុម័ត")}
          </Button>
          <Button className="rounded-full bg-gold px-5 text-xs sm:text-sm font-bold text-gold-foreground hover:bg-gold/90 shadow-md" onClick={() => selectTab("growth")}>
            <TrendingUp className="mr-1.5 size-4" />
            {t("View Analytics", "មើលការវិភាគ")}
          </Button>
        </div>
      </div>
    </div>

    {active === "overview" ? <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={t("Total Platform Users", "អ្នកប្រើប្រាស់សរុប")} value={"1,284"} icon={Users} tone="teal" delta="+24% this month" />
        <StatCard label={t("Local Businesses", "អាជីវកម្មក្នុងស្រុក")} value={String(businesses.length)} icon={Store} tone="gold" delta="100% verified" />
        <StatCard label={t("Tour Guides Registered", "មគ្គុទ្ទេសក៍ទេសចរណ៍")} value={String(tourGuides.length)} icon={Compass} tone="lotus" delta="5 active today" />
        <StatCard label={t("Community Impact", "ផលជះសហគមន៍")} value={"$48,200"} icon={ShieldCheck} tone="navy" delta="Direct to families" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Widget title={t("Recent inquiries", "សំណួរថ្មីៗ")} action={<Button variant="ghost" onClick={() => selectTab("users")}>{t("View all", "មើលទាំងអស់")}</Button>}><Records rows={messageRows} /></Widget>
        <Widget title={t("Community activity", "សកម្មភាពសហគមន៍")} action={<Button variant="ghost" onClick={() => selectTab("reviews")}>{t("View all", "មើលទាំងអស់")}</Button>}><Records rows={reviewRows} /></Widget>
      </div>
    </> : <Widget title={heading}>{panel}</Widget>}
  </DashboardShell>
  );
}

function Metrics() {
  const { t } = useI18n();
  return <div className="space-y-4"><p className="text-sm text-muted-foreground">{t("Last 30 days · Illustrative performance", "៣០ ថ្ងៃចុងក្រោយ · លទ្ធផលជាឧទាហរណ៍")}</p>{[[t("Discovery", "ការរកឃើញ"), 82], [t("Engagement", "ការចូលរួម"), 64], [t("Inquiry response", "ការឆ្លើយតបសំណួរ"), 92]].map(([label, value]) => <div key={String(label)}><div className="mb-2 flex justify-between text-sm"><span>{label}</span><span>{value}%</span></div><progress aria-label={String(label)} value={Number(value)} max={100} className="h-3 w-full accent-teal" /></div>)}</div>;
}
function Plans({ kind }: { kind: "business" | "guide" | "all" | "promotions" | "sponsored" }) {
  const { t } = useI18n();
  const plans = [
    { key: "business", title: t("Free", "ឥតគិតថ្លៃ"), price: t("$0 / month", "$0 / ខែ"), detail: t("Public profile and traveler inquiries", "ប្រវត្តិរូបសាធារណៈ និងសំណួររបស់អ្នកដំណើរ") },
    { key: "business", title: t("Business Premium", "គម្រោងអាជីវកម្មពិសេស"), price: t("$5–$15 / month", "$5–$15 / ខែ"), detail: t("Enhanced visibility, gallery and insights", "បង្កើនភាពងាយរកឃើញ វិចិត្រសាល និងការវិភាគ") },
    { key: "guide", title: t("Guide Pro", "គម្រោងមគ្គុទ្ទេសក៍អាជីព"), price: t("$5 / month", "$5 / ខែ"), detail: t("Professional profile and tour insights", "ប្រវត្តិរូបអាជីព និងការវិភាគដំណើរកម្សាន្ត") },
    { key: "promotions", title: t("Promotions", "ការផ្សព្វផ្សាយ"), price: t("$5–$10 / campaign", "$5–$10 / យុទ្ធនាការ"), detail: t("Highlight an offer to travelers", "ផ្សព្វផ្សាយការផ្តល់ជូនដល់អ្នកដំណើរ") },
    { key: "sponsored", title: t("Sponsored Experiences", "បទពិសោធន៍ដែលមានអ្នកឧបត្ថម្ភ"), price: t("$20–$50 / campaign", "$20–$50 / យុទ្ធនាការ"), detail: t("Featured community experiences", "បទពិសោធន៍សហគមន៍ដែលបានរំលេច") },
  ];
  return <div className="space-y-4"><div className="grid gap-4 md:grid-cols-2">{plans.filter(p => kind === "all" || p.key === kind).map(p => <div key={p.title} className="rounded-xl border bg-sand p-5"><h3 className="font-display text-lg font-semibold text-navy">{p.title}</h3><p className="my-3 text-xl font-bold text-teal">{p.price}</p><p className="mb-4 text-sm text-muted-foreground">{p.detail}</p><Button onClick={() => toast.info(t("Demo only — no payment collected", "សម្រាប់សាកល្បងប៉ុណ្ណោះ — មិនមានការបង់ប្រាក់"))}>{t("Preview plan", "មើលគម្រោងជាមុន")}</Button></div>)}</div>{kind === "all" && <p className="rounded-xl bg-gold-soft p-4 text-sm text-gold-foreground">{t("Future booking commission: 5%–10%. Not currently charged.", "កម្រៃជើងសារកក់នាពេលអនាគត៖ ៥%–១០%។ បច្ចុប្បន្នមិនមានការគិតថ្លៃទេ។")}</p>}</div>;
}

function ApprovalQueue({ rows }: { rows: Row[] }) {
  const { t } = useI18n();
  const [decisions, setDecisions] = useState<Record<string, "approved" | "rejected">>({});
  function decide(id: string, decision: "approved" | "rejected") { setDecisions(prev => ({ ...prev, [id]: decision })); toast.success(decision === "approved" ? t("Approved for this demo", "បានអនុម័តសម្រាប់ការសាកល្បងនេះ") : t("Rejected for this demo", "បានបដិសេធសម្រាប់ការសាកល្បងនេះ")); }
  return <div className="space-y-4">{rows.map(row => { const id = row.id ?? row.title; const decision = decisions[id]; return <div key={id} className="flex flex-wrap items-center gap-3 rounded-xl border p-4"><div className="flex-1"><h3 className="font-semibold text-navy">{row.title}</h3><p className="text-sm text-muted-foreground">{row.detail}</p><p className={decision === "approved" ? "text-success" : decision === "rejected" ? "text-lotus" : "text-muted-foreground"}>{decision === "approved" ? t("Approved", "បានអនុម័ត") : decision === "rejected" ? t("Rejected", "បានបដិសេធ") : t("Pending review · Demo application", "កំពុងរង់ចាំពិនិត្យ · ពាក្យស្នើសុំសាកល្បង")}</p></div><Button disabled={!!decision} onClick={() => decide(id, "approved")}>{t("Approve", "អនុម័ត")}</Button><Button variant="outline" disabled={!!decision} onClick={() => decide(id, "rejected")}>{t("Reject", "បដិសេធ")}</Button></div>; })}</div>;
}
