import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  LayoutDashboard, ArrowUpRight, Sparkles, MapPin, Compass, Heart,
  CalendarDays, HelpCircle, Bell, Map, Calendar, Store, UserCheck,
  Star, Mail, MessageSquare, User, Languages, Settings
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

export const Route = createFileRoute("/dashboard")({
  validateSearch: (s: Record<string, unknown>): { tab?: string } => typeof s["tab"] === "string" ? { tab: s["tab"] as string } : {},
  head: () => ({ meta: [
    { title: "Traveler dashboard | Cambodia Unlocked" },
    { name: "description", content: "Manage your traveler dashboard on Cambodia Unlocked in Siem Reap." },
    { property: "og:title", content: "Traveler dashboard | Cambodia Unlocked" },
    { property: "og:description", content: "Explore your traveler dashboard and community tourism activity." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: DashboardPage,
});
function DashboardPage() {
  const { t, tc, lang, setLang } = useI18n();
  const { user } = useAuth();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/dashboard" });

  const displayName = user?.name ?? travelerProfile.name;
  const displayEmail = user?.email ?? travelerProfile.email;
  const displayAvatar = user?.avatar;

  const groups = [
    { title: t("Overview", "ទិដ្ឋភាពទូទៅ"), items: [{ id: "saved-places", label: t("Saved Places", "កន្លែងដែលបានរក្សាទុក"), icon: Heart }, { id: "upcoming", label: t("Upcoming Trips", "ដំណើរកម្សាន្តខាងមុខ"), icon: CalendarDays }, { id: "inquiry-status", label: t("Inquiry Status", "ស្ថានភាពសំណួរ"), icon: HelpCircle }, { id: "notifications", label: t("Notifications", "ការជូនដំណឹង"), icon: Bell }] },
    { title: t("Trips", "ដំណើរកម្សាន្ត"), items: [{ id: "trips", label: t("My Trips", "ដំណើរកម្សាន្តរបស់ខ្ញុំ"), icon: Compass }, { id: "planner", label: t("Trip Planner", "រៀបចំដំណើរកម្សាន្ត"), icon: Map }, { id: "calendar", label: t("Travel Calendar", "ប្រតិទិនដំណើរកម្សាន្ត"), icon: Calendar }] },
    { title: t("Saved", "បានរក្សាទុក"), items: [{ id: "saved-destinations", label: t("Destinations", "គោលដៅទេសចរណ៍"), icon: MapPin }, { id: "saved-businesses", label: t("Businesses", "អាជីវកម្ម"), icon: Store }, { id: "saved-guides", label: t("Guides", "មគ្គុទ្ទេសក៍"), icon: UserCheck }, { id: "saved-events", label: t("Events", "ព្រឹត្តិការណ៍"), icon: Sparkles }] },
    { title: t("Activity", "សកម្មភាព"), items: [{ id: "reviews", label: t("Reviews", "ការវាយតម្លៃ"), icon: Star }, { id: "messages", label: t("Messages", "សារ"), icon: Mail }, { id: "inquiries", label: t("Inquiry History", "ប្រវត្តិសំណួរ"), icon: MessageSquare }] },
    { title: t("Account", "គណនី"), items: [{ id: "profile", label: t("Profile", "ប្រវត្តិរូប"), icon: User }, { id: "language", label: t("Language", "ភាសា"), icon: Languages }, { id: "settings", label: t("Settings", "ការកំណត់"), icon: Settings }] }
  ];
  const aliases: Record<string, string> = {"dashboard": "overview", "favorites": "saved-destinations", "guides": "saved-guides", "businesses": "saved-businesses"};
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

  const { list } = useFavorites();
  const saved = [...destinationRows, ...businessRows, ...guideRows, ...eventRows].filter(r => r.id && list.includes(r.id));
  const tripRows: Row[] = [
    { title: t("Siem Reap culture weekend", "ចុងសប្ដាហ៍វប្បធម៌នៅសៀមរាប"), detail: t("18–20 July 2026 · 2 travelers · Planning", "១៨–២០ កក្កដា ២០២៦ · អ្នកដំណើរ ២ នាក់ · កំពុងរៀបចំ") },
    { title: t("Village crafts and lotus fields", "សិប្បកម្មភូមិ និងវាលផ្កាឈូក"), detail: t("25 July 2026 · Day trip · Confirmed", "២៥ កក្កដា ២០២៦ · ដំណើរមួយថ្ងៃ · បានបញ្ជាក់") },
  ];
  const rows: Record<string, Row[]> = {
    "saved-places": saved, "saved-destinations": destinationRows.filter(r => r.id && list.includes(r.id)),
    "saved-businesses": businessRows.filter(r => r.id && list.includes(r.id)),
    "saved-guides": guideRows.filter(r => r.id && list.includes(r.id)), "saved-events": eventRows.filter(r => r.id && list.includes(r.id)),
    upcoming: tripRows, trips: tripRows, calendar: tripRows,
    "inquiry-status": messageRows, messages: messageRows, inquiries: messageRows, reviews: reviewRows,
    notifications: [{ title: t("Your workshop inquiry has a reply", "សំណួរអំពីសិក្ខាសាលារបស់អ្នកមានចម្លើយហើយ"), detail: t("Village Pottery Studio · Today", "ស្ទូឌីយោស្មូនឆ្នាំងភូមិ · ថ្ងៃនេះ") }, { title: t("Trip reminder", "ការរំលឹកដំណើរកម្សាន្ត"), detail: t("Review your July itinerary", "ពិនិត្យផែនការធ្វើដំណើរខែកក្កដារបស់អ្នក") }],
  };
  const recommendation = active === "saved-guides" ? guideRows : active === "saved-events" ? eventRows : active === "saved-businesses" ? businessRows : destinationRows;
  const panel = active === "language" ? <label className="block max-w-sm space-y-2"><span>{t("Site language", "ភាសាគេហទំព័រ")}</span><select className="w-full rounded-xl border bg-background p-3" value={lang} onChange={e => { setLang(e.target.value === "km" ? "km" : "en"); toast.success(e.target.value === "km" ? "បានប្ដូរភាសា" : "Language updated"); }}><option value="en">{t("English", "អង់គ្លេស")}</option><option value="km">{t("Khmer", "ខ្មែរ")}</option></select></label>
    : active === "profile" || active === "settings" ? <AccountForm name={displayName} email={displayEmail} />
    : active === "planner" ? <TripPlanner />
    : <>{(rows[active] ?? []).length > 0 && <Records rows={rows[active] ?? []} />}{active.startsWith("saved") && <div className="mt-5"><h3 className="mb-4 font-semibold text-navy">{t("Recommended for your next trip", "សំណើសម្រាប់ដំណើរកម្សាន្តបន្ទាប់")}</h3><Records rows={recommendation.slice(0, 3)} /></div>}</>;

  return <DashboardShell title={t("Traveler dashboard", "ផ្ទាំងគ្រប់គ្រងអ្នកដំណើរ")} role={t("Traveler Dashboard", "ផ្ទាំងគ្រប់គ្រងអ្នកដំណើរ")} user={{ name: displayName, initials: displayName.slice(0, 2).toUpperCase(), avatar: displayAvatar, roleTag: t("Traveler", "ភ្ញៀវទេសចរ") }} groups={groups} active={active} onSelect={selectTab} footer={<Button variant="ghost" className="mt-3 w-full justify-start" onClick={() => selectTab("overview") }>{t("Overview", "ទិដ្ឋភាពទូទៅ")}</Button>}>
    {/* Personalized Welcome Banner */}
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-navy/95 to-teal/90 p-6 sm:p-7 text-white shadow-lift">
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/20 px-3 py-1 text-xs font-semibold text-gold backdrop-blur">
            <Sparkles className="size-3.5" /> {t("Gold Explorer • សមាជិកអ្នករុករកកម្រិតមាស", "សមាជិកអ្នករុករកកម្រិតមាស")}
          </span>
          <h2 className="mt-2.5 text-2xl font-extrabold sm:text-3xl text-white">
            {t("Welcome back, ", "សូមស្វាគមន៍ការត្រឡប់មកវិញ, ")} <span className="text-gold">{displayName}</span>!
          </h2>
          <p className="mt-1 max-w-xl text-sm text-white/80">
            {t("Ready to uncover more authentic Siem Reap experiences, artisan workshops, and local homestays today?", "ត្រៀមខ្លួនស្វែងយល់ពីបទពិសោធន៍ថ្មីៗ សិក្ខាសាលាសិប្បករ និងផ្ទះស្នាក់នៅសៀមរាបហើយឬនៅ?")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button asChild className="rounded-full bg-gold px-5 text-xs sm:text-sm font-bold text-gold-foreground hover:bg-gold/90 shadow-md">
            <Link to="/explore">{t("Explore Destinations", "ស្វែងរកគោលដៅ")}</Link>
          </Button>
          <Button variant="outline" className="rounded-full border-white/30 text-xs sm:text-sm text-white hover:bg-white/10" onClick={() => selectTab("planner")}>
            {t("Plan a Trip", "រៀបចំដំណើរកម្សាន្ត")}
          </Button>
        </div>
      </div>
    </div>

    {active === "overview" ? <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={t("Saved places", "កន្លែងបានរក្សាទុក")} value={String(saved.length)} icon={LayoutDashboard} tone="teal" delta="+3 this week" />
        <StatCard label={t("Upcoming trips", "ដំណើរកម្សាន្តខាងមុខ")} value={"2"} icon={Compass} tone="gold" />
        <StatCard label={t("Open inquiries", "សំណួរកំពុងរង់ចាំ")} value={"2"} icon={MapPin} tone="lotus" />
        <StatCard label={t("Explorer Points", "ពិន្ទុរុករក")} value={"480 pts"} icon={Sparkles} tone="navy" delta="Gold Level" />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Widget title={t("Saved places", "កន្លែងបានរក្សាទុក")} action={<Button variant="ghost" onClick={() => selectTab("saved-places")}>{t("View all", "មើលទាំងអស់")}</Button>}><Records rows={saved.length ? saved.slice(0, 3) : destinationRows.slice(0, 3)} /></Widget>
        <Widget title={t("Upcoming trips", "ដំណើរកម្សាន្តខាងមុខ")} action={<Button variant="ghost" onClick={() => selectTab("upcoming")}>{t("View all", "មើលទាំងអស់")}</Button>}><Records rows={tripRows} /></Widget>
        <Widget title={t("Inquiry status", "ស្ថានភាពសំណួរ")} action={<Button variant="ghost" onClick={() => selectTab("inquiry-status")}>{t("View all", "មើលទាំងអស់")}</Button>}><Records rows={messageRows} /></Widget>
        <Widget title={t("Notifications", "ការជូនដំណឹង")} action={<Button variant="ghost" onClick={() => selectTab("notifications")}>{t("View all", "មើលទាំងអស់")}</Button>}><Records rows={rows["notifications"] ?? messageRows} /></Widget>
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

function TripPlanner() {
  const { t, tc } = useI18n();
  const [stops, setStops] = useState<string[]>([]);
  return <div className="space-y-4"><form className="grid gap-4 sm:grid-cols-2" onSubmit={e => { e.preventDefault(); toast.success(t("Itinerary saved for this session", "បានរក្សាទុកផែនការសម្រាប់ការប្រើប្រាស់លើកនេះ")); }}>
    <label className="space-y-2"><span>{t("Trip name", "ឈ្មោះដំណើរកម្សាន្ត")}</span><input required defaultValue={t("Siem Reap weekend", "ចុងសប្ដាហ៍នៅសៀមរាប")} className="w-full rounded-xl border bg-background p-3" /></label>
    <label className="space-y-2"><span>{t("Departure date", "ថ្ងៃចេញដំណើរ")}</span><input required type="date" defaultValue="2026-07-18" className="w-full rounded-xl border bg-background p-3" /></label>
    <div className="space-y-3 sm:col-span-2">{destinations.slice(0, 4).map(d => <label key={d.slug} className="flex items-center gap-3 rounded-xl border p-3"><input type="checkbox" checked={stops.includes(d.slug)} onChange={e => setStops(prev => e.target.checked ? [...prev, d.slug] : prev.filter(s => s !== d.slug))} />{tc(d.name)}</label>)}</div>
    <p>{t("Selected stops", "កន្លែងដែលបានជ្រើសរើស")}: {stops.length}</p><Button type="submit">{t("Save itinerary", "រក្សាទុកផែនការធ្វើដំណើរ")}</Button>
  </form></div>;
}
