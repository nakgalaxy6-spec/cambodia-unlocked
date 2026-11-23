import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  LayoutDashboard, ArrowUpRight, Compass, BadgeCheck, MapPin, Eye, Star,
  MessageCircle, Heart, Award, Languages, CheckCircle2, Package,
  DollarSign, CalendarCheck, Mail, Bell, TrendingUp, Crown
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

export const Route = createFileRoute("/guide-dashboard")({
  validateSearch: (s: Record<string, unknown>): { tab?: string } => typeof s["tab"] === "string" ? { tab: s["tab"] as string } : {},
  head: () => ({ meta: [
    { title: "Tour guide dashboard | Cambodia Unlocked" },
    { name: "description", content: "Manage your tour guide dashboard on Cambodia Unlocked in Siem Reap." },
    { property: "og:title", content: "Tour guide dashboard | Cambodia Unlocked" },
    { property: "og:description", content: "Explore your tour guide dashboard and community tourism activity." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: DashboardPage,
});
function DashboardPage() {
  const { t, tc, lang, setLang } = useI18n();
  const { user } = useAuth();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/guide-dashboard" });
  const groups = [
    { title: t("Overview", "ទិដ្ឋភាពទូទៅ"), items: [{ id: "views", label: t("Profile Views", "ការមើលប្រវត្តិរូប"), icon: Eye }, { id: "favorites", label: t("Favorites", "ការរក្សាទុក"), icon: Heart }, { id: "reviews", label: t("Reviews", "ការវាយតម្លៃ"), icon: Star }, { id: "inquiries", label: t("Inquiries", "សំណួរ"), icon: MessageCircle }] },
    { title: t("My Profile", "ប្រវត្តិរូបរបស់ខ្ញុំ"), items: [{ id: "experience", label: t("Experience", "បទពិសោធន៍"), icon: Award }, { id: "languages", label: t("Languages", "ភាសា"), icon: Languages }, { id: "expertise", label: t("Expertise", "ជំនាញ"), icon: CheckCircle2 }, { id: "coverage", label: t("Coverage Areas", "តំបន់ផ្តល់សេវា"), icon: MapPin }] },
    { title: t("Tours", "ដំណើរកម្សាន្ត"), items: [{ id: "packages", label: t("Tour Packages", "កញ្ចប់ដំណើរកម្សាន្ត"), icon: Package }, { id: "pricing", label: t("Pricing", "តម្លៃ"), icon: DollarSign }, { id: "availability", label: t("Availability", "ពេលទំនេរ"), icon: CalendarCheck }] },
    { title: t("Inquiries", "សំណួរ"), items: [{ id: "messages", label: t("Traveler Messages", "សារអ្នកដំណើរ"), icon: Mail }, { id: "requests", label: t("Requests", "សំណើ"), icon: Bell }] },
    { title: t("Growth", "ការរីកចម្រើន"), items: [{ id: "analytics", label: t("Analytics", "ការវិភាគ"), icon: TrendingUp }, { id: "subscription", label: t("Subscription", "គម្រោងសមាជិកភាព"), icon: Crown }] }
  ];
  const aliases: Record<string, string> = {};
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

  const guide = tourGuides.find(g => g.slug.includes("dara")) ?? tourGuides[0];
  const displayName = user?.role === "guide" ? user.name : (guide?.name ?? "Dara Sok (ដារ៉ា សុខ)");
  const displayAvatar = user?.role === "guide" ? user.avatar : guide?.photo;

  const rows: Record<string, Row[]> = {
    views: [{ title: t("Profile views", "ការមើលប្រវត្តិរូប"), detail: t("842 views · 22% growth this month", "ការមើល ៨៤២ ដង · កើនឡើង ២២% ក្នុងខែនេះ") }],
    favorites: [{ title: t("Traveler favorites", "ការរក្សាទុករបស់អ្នកដំណើរ"), detail: t("64 saves · 8 new this month", "ការរក្សាទុក ៦៤ · ថ្មី ៨ ក្នុងខែនេះ") }],
    reviews: reviewRows, inquiries: messageRows, messages: messageRows, requests: messageRows,
    experience: [{ title: t("Local expertise", "ជំនាញក្នុងតំបន់"), detail: (guide?.years ?? 12) + " " + t("years guiding in Siem Reap", "ឆ្នាំនៃការនាំភ្ញៀវនៅសៀមរាប") }, { title: t("Culture and heritage", "វប្បធម៌ និងបេតិកភណ្ឌ"), detail: t("History graduate sharing temple stories and village life with small groups.", "បញ្ចប់ការសិក្សាផ្នែកប្រវត្តិសាស្ត្រ ចែករំលែករឿងរ៉ាវប្រាសាទ និងជីវិតតាមភូមិជាមួយក្រុមភ្ញៀវតូចៗ។") }],
    languages: (guide?.languages ?? []).map(l => ({ title: l === "Khmer" ? t("Khmer", "ខ្មែរ") : l === "French" ? t("French", "បារាំង") : t("English", "អង់គ្លេស"), detail: t("Available for guided tours", "អាចប្រើសម្រាប់ការនាំភ្ញៀវទេសចរ") })),
    expertise: (guide?.expertise ?? []).map(e => ({ title: tc(e), detail: t("Private and small-group tours", "ដំណើរឯកជន និងជាក្រុមតូច") })),
    coverage: (guide?.areas ?? []).map(a => ({ title: tc(a), detail: tc(guide?.province ?? "Siem Reap") })),
    packages: [
      { title: t("Angkor sunrise and Ta Prohm", "ថ្ងៃរះនៅអង្គរ និងតាព្រហ្ម"), detail: t("Half day · $35 · Up to 6 guests", "កន្លះថ្ងៃ · $35 · ភ្ញៀវរហូតដល់ ៦ នាក់") },
      { title: t("Banteay Srei and village life", "បន្ទាយស្រី និងជីវិតតាមភូមិ"), detail: t("Full day · $45 · Up to 6 guests", "ពេញមួយថ្ងៃ · $45 · ភ្ញៀវរហូតដល់ ៦ នាក់") },
      { title: t("Hidden temples photography", "ថតរូបប្រាសាទលាក់ខ្លួន"), detail: t("4 hours · $30", "៤ ម៉ោង · $30") },
    ],
    pricing: [{ title: t("Half-day guiding", "សេវានាំភ្ញៀវកន្លះថ្ងៃ"), detail: t("From $35 · Transport and entry tickets excluded", "ចាប់ពី $35 · មិនរាប់បញ្ចូលមធ្យោបាយធ្វើដំណើរ និងសំបុត្រចូល") }, { title: t("Full-day guiding", "សេវានាំភ្ញៀវពេញមួយថ្ងៃ"), detail: t("From $45 · Custom quotes for groups", "ចាប់ពី $45 · តម្លៃតាមសំណើសម្រាប់ក្រុម") }],
  };
  const panel = active === "subscription" ? <Plans kind="guide" /> : active === "analytics" ? <Metrics /> : active === "availability" ? <Availability /> : <Records rows={rows[active] ?? messageRows} />;

  return <DashboardShell title={t("Tour guide dashboard", "ផ្ទាំងគ្រប់គ្រងមគ្គុទ្ទេសក៍")} role={t("Tour Guide Dashboard", "ផ្ទាំងគ្រប់គ្រងមគ្គុទ្ទេសក៍")} user={{ name: displayName, initials: displayName.slice(0, 2).toUpperCase(), avatar: displayAvatar, roleTag: t("Licensed Guide", "មគ្គុទ្ទេសក៍") }} groups={groups} active={active} onSelect={selectTab} footer={<Button variant="ghost" className="mt-3 w-full justify-start" onClick={() => selectTab("overview") }>{t("Overview", "ទិដ្ឋភាពទូទៅ")}</Button>}>
    {/* Guide Identity Banner */}
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-navy/95 to-teal/90 p-6 sm:p-7 text-white shadow-lift border border-teal/40">
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-teal-soft/30 border border-teal/40 px-2.5 py-0.5 text-xs font-semibold text-teal-foreground">
              <BadgeCheck className="size-3 text-teal" /> {t("Ministry of Tourism Certified", "បានទទួលស្គាល់ដោយក្រសួងទេសចរណ៍")}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold sm:text-3xl text-white">
            {displayName}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-xs sm:text-sm text-white/80">
            <MapPin className="size-3.5 text-gold" /> {t("Siem Reap • English & French • 12 Years Experience", "សៀមរាប • អង់គ្លេស និងបារាំង • បទពិសោធន៍ ១២ ឆ្នាំ")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button asChild className="rounded-full bg-gold px-5 text-xs sm:text-sm font-bold text-gold-foreground hover:bg-gold/90 shadow-md">
            <Link to="/guides">
              {t("View Guide Profile", "មើលប្រវត្តិរូប")}
            </Link>
          </Button>
          <Button variant="outline" className="rounded-full border-white/30 text-xs sm:text-sm text-white hover:bg-white/10" onClick={() => selectTab("packages")}>
            {t("Edit Tour Packages", "កែប្រែកញ្ចប់ដំណើរ")}
          </Button>
        </div>
      </div>
    </div>

    {active === "overview" ? <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={t("Profile views", "ការមើលប្រវត្តិរូប")} value={"842"} icon={Eye} tone="teal" delta="+22% this month" />
        <StatCard label={t("Favorites", "ការរក្សាទុក")} value={"64"} icon={Star} tone="gold" delta="+8 new" />
        <StatCard label={t("Reviews", "ការវាយតម្លៃ")} value={"76"} icon={Star} tone="lotus" delta="5.0 ★ average" />
        <StatCard label={t("Inquiries", "សំណួរ")} value={"18"} icon={MessageCircle} tone="navy" delta="98% response rate" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Widget title={t("Recent inquiries", "សំណួរថ្មីៗ")} action={<Button variant="ghost" onClick={() => selectTab("inquiries")}>{t("View all", "មើលទាំងអស់")}</Button>}><Records rows={messageRows} /></Widget>
        <Widget title={t("Community activity", "សកម្មភាពសហគមន៍")} action={<Button variant="ghost" onClick={() => selectTab("reviews")}>{t("View all", "មើលទាំងអស់")}</Button>}><Records rows={reviewRows} /></Widget>
      </div>
    </> : <Widget title={heading}>{panel}</Widget>}
  </DashboardShell>;
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

function Availability() {
  const { t } = useI18n();
  const [available, setAvailable] = useState(true);
  return <div className="space-y-4"><p>{t("July 2026 · Monday–Saturday · 05:00–17:00", "កក្កដា ២០២៦ · ច័ន្ទ–សៅរ៍ · ០៥:០០–១៧:០០")}</p><label className="flex gap-3"><input type="checkbox" checked={available} onChange={e => { setAvailable(e.target.checked); toast.success(t("Availability updated for this session", "បានធ្វើបច្ចុប្បន្នភាពពេលទំនេរសម្រាប់ការប្រើប្រាស់លើកនេះ")); }} />{t("Accept new tour requests", "ទទួលសំណើដំណើរកម្សាន្តថ្មី")}</label><Records rows={[{ title: t("18 July · Angkor sunrise", "១៨ កក្កដា · ថ្ងៃរះនៅអង្គរ"), detail: t("05:00–11:00 · Requested", "០៥:០០–១១:០០ · បានស្នើសុំ") }, { title: t("20 July · Banteay Srei", "២០ កក្កដា · បន្ទាយស្រី"), detail: t("08:00–16:00 · Confirmed", "០៨:០០–១៦:០០ · បានបញ្ជាក់") }]} /></div>;
}
