import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  LayoutDashboard, ArrowUpRight, Crown, BadgeCheck, Eye, MapPin, Store,
  Sparkles, MessageCircle, Star, Heart, MessageSquare, Layers, Image,
  BookOpen, Users, Handshake, TrendingUp, Megaphone, Phone, Bell, Settings
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

export const Route = createFileRoute("/business-dashboard")({
  validateSearch: (s: Record<string, unknown>): { tab?: string } => typeof s["tab"] === "string" ? { tab: s["tab"] as string } : {},
  head: () => ({ meta: [
    { title: "Business dashboard | Cambodia Unlocked" },
    { name: "description", content: "Manage your business dashboard on Cambodia Unlocked in Siem Reap." },
    { property: "og:title", content: "Business dashboard | Cambodia Unlocked" },
    { property: "og:description", content: "Explore your business dashboard and community tourism activity." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: DashboardPage,
});
function DashboardPage() {
  const { t, tc, lang, setLang } = useI18n();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/business-dashboard" });
  const groups = [
    { title: t("Overview", "ទិដ្ឋភាពទូទៅ"), items: [{ id: "views", label: t("Views", "ការមើល"), icon: Eye }, { id: "favorites", label: t("Favorites", "ការរក្សាទុក"), icon: Heart }, { id: "inquiries", label: t("Inquiries", "សំណួរ"), icon: MessageSquare }, { id: "reviews", label: t("Reviews", "ការវាយតម្លៃ"), icon: Star }] },
    { title: t("Business", "អាជីវកម្ម"), items: [{ id: "business", label: t("Profile", "ប្រវត្តិរូប"), icon: Store }, { id: "services", label: t("Services", "សេវាកម្ម"), icon: Layers }, { id: "photos", label: t("Gallery", "វិចិត្រសាលរូបភាព"), icon: Image }, { id: "story", label: t("Story", "រឿងរ៉ាវ"), icon: BookOpen }] },
    { title: t("Operations", "ប្រតិបត្តិការ"), items: [{ id: "team", label: t("Team Members", "សមាជិកក្រុម"), icon: Users }, { id: "locations", label: t("Locations", "ទីតាំង"), icon: MapPin }, { id: "partnerships", label: t("Tour Guide Partnerships", "ដៃគូមគ្គុទ្ទេសក៍"), icon: Handshake }] },
    { title: t("Growth", "ការរីកចម្រើន"), items: [{ id: "analytics", label: t("Analytics", "ការវិភាគ"), icon: TrendingUp }, { id: "promotions", label: t("Promotions", "ការផ្សព្វផ្សាយ"), icon: Megaphone }, { id: "subscription", label: t("Subscription", "គម្រោងសមាជិកភាព"), icon: Crown }] },
    { title: t("Settings", "ការកំណត់"), items: [{ id: "contact", label: t("Contact Information", "ព័ត៌មានទំនាក់ទំនង"), icon: Phone }, { id: "notifications", label: t("Notifications", "ការជូនដំណឹង"), icon: Bell }, { id: "settings", label: t("Account Settings", "ការកំណត់គណនី"), icon: Settings }] }
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

  const { user } = useAuth();
  const business = businesses.find(b => b.slug === "village-pottery-studio");
  const owner = business ? getOwner(business) : undefined;

  const displayName = user?.name ?? owner?.name ?? "Chanreay Sok";
  const businessTitle = user?.businessName ?? business?.name ?? "Village Pottery Studio";
  const businessCategoryName = user?.businessCategory ?? business?.category ?? "Community Tourism";
  const displayAvatar = user?.avatar;

  const rows: Record<string, Row[]> = {
    views: [{ title: t("Profile discovery", "ការរកឃើញប្រវត្តិរូប"), detail: t("1,248 views · 18% growth this month", "ការមើល ១,២៤៨ ដង · កើនឡើង ១៨% ក្នុងខែនេះ") }],
    favorites: [{ title: t("Saved by travelers", "បានរក្សាទុកដោយអ្នកដំណើរ"), detail: t("86 saves · 12 new this month", "ការរក្សាទុក ៨៦ · ថ្មី ១២ ក្នុងខែនេះ") }],
    inquiries: messageRows, reviews: reviewRows,
    services: [{ title: t("Hands-on pottery workshop", "សិក្ខាសាលាស្មូនឆ្នាំងដោយផ្ទាល់"), detail: t("$20 / person · 90 minutes · Up to 8 guests", "$20 / នាក់ · ៩០ នាទី · ភ្ញៀវរហូតដល់ ៨ នាក់") }, { title: t("Family craft session", "វគ្គសិប្បកម្មសម្រាប់គ្រួសារ"), detail: t("$35 / family · 2 hours", "$35 / គ្រួសារ · ២ ម៉ោង") }],
    team: teamMembers.map(m => ({ title: m.name, detail: tc(m.role) + " · " + m.phone })),
    locations: branchLocations.map(b => ({ title: tc(b.location), detail: b.manager + " · " + b.phone + " · " + tc(b.hours) })),
    partnerships: guidePartners.map(p => ({ title: tourGuides.find(g => g.slug === p.slug)?.name ?? p.slug, detail: tc(p.assigned) + " · " + p.tours + " " + t("tours", "ដំណើរកម្សាន្ត") + " · " + p.rating + " / 5" })),
    story: [{ title: t("Keeping Khmer pottery alive", "រក្សាសិល្បៈស្មូនឆ្នាំងខ្មែរឱ្យរស់រវើក"), detail: t("Three generations of artisans share their craft. Each workshop supports nine village families and helps apprentices learn traditional skills.", "សិប្បករបីជំនាន់ចែករំលែកជំនាញរបស់ពួកគេ។ សិក្ខាសាលានីមួយៗជួយគាំទ្រគ្រួសារប្រាំបួននៅក្នុងភូមិ និងជួយកូនជាងរៀនជំនាញប្រពៃណី។") }],
    contact: [{ title: t("Contact the studio", "ទាក់ទងស្ទូឌីយោ"), detail: (business?.phone ?? "+855 12 345 678") + " · " + (business?.email ?? "hello@villagepottery.kh") }, { title: t("Location", "ទីតាំង"), detail: t("Roluos, Siem Reap · Daily 08:00–17:00", "រលួស សៀមរាប · រៀងរាល់ថ្ងៃ ០៨:០០–១៧:០០") }],
    notifications: [{ title: t("New workshop inquiry", "សំណួរថ្មីអំពីសិក្ខាសាលា"), detail: t("Sokchan · 2 guests · Today", "សុខចាន់ · ភ្ញៀវ ២ នាក់ · ថ្ងៃនេះ") }, { title: t("Monthly profile report ready", "របាយការណ៍ប្រវត្តិរូបប្រចាំខែរួចរាល់ហើយ"), detail: t("Views grew 18% this month", "ការមើលកើនឡើង ១៨% ក្នុងខែនេះ") }],
  };
  const panel = active === "business" || active === "settings" ? <AccountForm name={businessTitle} email={user?.email ?? business?.email ?? "hello@villagepottery.kh"} />
    : active === "photos" ? <div className="grid gap-4 sm:grid-cols-3">{(business?.gallery ?? destinations.slice(0, 3).map(d => d.image)).map((image, i) => <figure key={`${image}-${i}`}><img src={image} alt={t("Studio gallery image", "រូបភាពស្ទូឌីយោ") + ` ${i + 1}`} className="aspect-[4/3] w-full rounded-xl object-cover" /><figcaption className="mt-2 text-sm">{t("Studio gallery", "វិចិត្រសាលស្ទូឌីយោ")} {i + 1}</figcaption></figure>)}</div>
    : active === "subscription" ? <Plans kind="business" />
    : active === "promotions" ? <Plans kind="promotions" />
    : active === "analytics" ? <Metrics /> : <Records rows={rows[active] ?? messageRows} />;

  return <DashboardShell title={t("Business dashboard", "ផ្ទាំងគ្រប់គ្រងអាជីវកម្ម")} role={t("Business Dashboard", "ផ្ទាំងគ្រប់គ្រងអាជីវកម្ម")} user={{ name: displayName, initials: displayName.slice(0, 2).toUpperCase(), avatar: displayAvatar, roleTag: t("Business Owner", "ម្ចាស់អាជីវកម្ម") }} groups={groups} active={active} onSelect={selectTab} footer={<Button variant="ghost" className="mt-3 w-full justify-start" onClick={() => selectTab("overview") }>{t("Overview", "ទិដ្ឋភាពទូទៅ")}</Button>}>
    {/* Business Identity Banner */}
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-navy/95 to-gold/30 p-6 sm:p-7 text-white shadow-lift border border-gold/30">
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-gold-foreground">
              <Crown className="size-3" /> {t("Premium Verified Business", "អាជីវកម្មផ្ទៀងផ្ទាត់កម្រិតពិសេស")}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-teal-soft/30 border border-teal/40 px-2.5 py-0.5 text-xs font-semibold text-teal-foreground">
              <BadgeCheck className="size-3 text-teal" /> {tc(businessCategoryName)}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold sm:text-3xl text-white">
            {businessTitle}
          </h2>
          <p className="mt-1 flex items-center gap-1.5 text-xs sm:text-sm text-white/80">
            <MapPin className="size-3.5 text-gold" /> {t("Roluos, Siem Reap • Managed by ", "រលួស សៀមរាប • គ្រប់គ្រងដោយ ")} <span className="font-semibold text-gold">{displayName}</span>
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <Button asChild className="rounded-full bg-gold px-5 text-xs sm:text-sm font-bold text-gold-foreground hover:bg-gold/90 shadow-md">
            <Link to="/businesses/$slug" params={{ slug: "village-pottery-studio" }}>
              {t("View Public Page", "មើលទំព័រសាធារណៈ")}
            </Link>
          </Button>
          <Button variant="outline" className="rounded-full border-white/30 text-xs sm:text-sm text-white hover:bg-white/10" onClick={() => selectTab("services")}>
            {t("Manage Services", "គ្រប់គ្រងសេវាកម្ម")}
          </Button>
        </div>
      </div>
    </div>

    {active === "overview" ? <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label={t("Views", "ការមើល")} value={"1,248"} icon={Eye} tone="teal" delta="+18% this month" />
        <StatCard label={t("Inquiries", "សំណួរ")} value={"24"} icon={MessageCircle} tone="gold" delta="92% reply rate" />
        <StatCard label={t("Saved by Travelers", "បានរក្សាទុក")} value={"86"} icon={Store} tone="lotus" delta="+12 new" />
        <StatCard label={t("Rating", "ពិន្ទុវាយតម្លៃ")} value={"4.9 / 5"} icon={Star} tone="navy" delta="64 reviews" />
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
