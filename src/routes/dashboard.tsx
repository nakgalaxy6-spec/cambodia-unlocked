import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ArrowUpRight,
  Sparkles,
  MapPin,
  Compass,
  Heart,
  CalendarDays,
  HelpCircle,
  Bell,
  Map,
  Calendar,
  Store,
  UserCheck,
  Star,
  Mail,
  MessageSquare,
  User,
  Languages,
  Settings,
  Crown,
  Tag,
  DollarSign,
  TrendingDown,
  Award,
  Clock,
  CheckCircle2,
  Bookmark,
  Share2,
} from "lucide-react";
import { toast } from "sonner";
import { DashboardShell, Widget, StatCard } from "@/components/site/DashboardShell";
import { ThemeSegmentedControl } from "@/components/site/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { destinations, businesses, events, stories } from "@/lib/data";
import { tourGuides, travelerProfile } from "@/lib/people";
import { useFavorites } from "@/lib/favorites";
import { img } from "@/lib/images";

type Row = {
  title: string;
  detail: string;
  image?: string | undefined;
  id?: string | undefined;
  badge?: string | undefined;
  actionLabel?: string | undefined;
};

function Records({ rows }: { rows: Row[] }) {
  const { t } = useI18n();
  return (
    <div className="divide-y">
      {rows.map((row, index) => (
        <div key={row.id ?? `${row.title}-${index}`} className="flex flex-wrap items-center gap-4 py-3.5 first:pt-0">
          {row.image && (
            <img src={row.image} alt={row.title} className="size-16 rounded-xl object-cover shrink-0" loading="lazy" />
          )}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-navy truncate">{row.title}</h3>
              {row.badge && (
                <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[10px] font-bold text-gold shrink-0">
                  {row.badge}
                </span>
              )}
            </div>
            <p className="whitespace-pre-line text-xs sm:text-sm text-muted-foreground mt-0.5">{row.detail}</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full shrink-0"
            onClick={() =>
              toast.info(t("Demo preview", "ការមើលសាកល្បង"), {
                description: `${row.title} · ${row.detail}`,
              })
            }
          >
            {row.actionLabel ?? t("View details", "មើលព័ត៌មានលម្អិត")}
            <ArrowUpRight className="size-3.5 ml-1" />
          </Button>
        </div>
      ))}
    </div>
  );
}

function AccountForm({ name, email }: { name: string; email: string }) {
  const { t } = useI18n();
  return (
    <form
      className="max-w-xl space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        toast.success(t("Changes saved for this demo", "បានរក្សាទុកការផ្លាស់ប្តូរសម្រាប់ការសាកល្បងនេះ"));
      }}
    >
      <label className="block space-y-2 text-sm">
        <span>{t("Name", "ឈ្មោះ")}</span>
        <input required name="name" defaultValue={name} className="w-full rounded-xl border bg-background p-3" />
      </label>
      <label className="block space-y-2 text-sm">
        <span>{t("Email", "អ៊ីមែល")}</span>
        <input
          required
          type="email"
          name="email"
          defaultValue={email}
          className="w-full rounded-xl border bg-background p-3"
        />
      </label>
      <div className="space-y-2 pt-1">
        <span className="block text-sm font-medium">{t("Theme & Appearance", "រូបរាង និង Theme")}</span>
        <ThemeSegmentedControl />
      </div>
      <label className="flex items-center gap-2 text-sm pt-1">
        <input type="checkbox" defaultChecked />
        {t("Email notifications & monthly deals alerts", "ការជូនដំណឹងតាមអ៊ីមែល និងការបញ្ចុះតម្លៃប្រចាំខែ")}
      </label>
      <Button type="submit" className="rounded-full bg-teal text-primary-foreground hover:bg-teal/90">
        {t("Save changes", "រក្សាទុកការផ្លាស់ប្តូរ")}
      </Button>
    </form>
  );
}

export const Route = createFileRoute("/dashboard")({
  validateSearch: (s: Record<string, unknown>): { tab?: string } =>
    typeof s["tab"] === "string" ? { tab: s["tab"] as string } : {},
  head: () => ({
    meta: [
      { title: "My Cambodia Journey – Traveler Dashboard | Cambodia Unlocked" },
      {
        name: "description",
        content:
          "My Cambodia Journey: Traveler Premium Dashboard for managing upcoming trips, saved experiences, favorite guides, custom itineraries and reward badges.",
      },
      { property: "og:title", content: "My Cambodia Journey – Traveler Dashboard | Cambodia Unlocked" },
      {
        property: "og:description",
        content: "Explore custom itineraries, budget planner, hidden gems, and traveler rewards.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { t, tc, lang, setLang } = useI18n();
  const { user, quickLogin } = useAuth();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/dashboard" });

  const displayName = user?.name ?? travelerProfile.name;
  const displayEmail = user?.email ?? travelerProfile.email;
  const displayAvatar = user?.avatar ?? img.travelerSokchan;

  const groups = [
    {
      title: t("My Journey", "ដំណើររបស់ខ្ញុំ"),
      items: [
        { id: "overview", label: t("Overview", "ទិដ្ឋភាពទូទៅ"), icon: LayoutDashboard },
        { id: "upcoming", label: t("Upcoming Trips", "ដំណើរកម្សាន្តខាងមុខ"), icon: CalendarDays },
        { id: "custom-itineraries", label: t("Custom Itineraries", "គម្រោងធ្វើដំណើរផ្ទាល់ខ្លួន"), icon: Compass },
        { id: "planner", label: t("Trip Planner", "កម្មវិធីរៀបចំដំណើរ"), icon: Map },
        { id: "budget-planner", label: t("Travel Budget Planner", "គម្រោងថវិកាធ្វើដំណើរ"), icon: DollarSign },
        { id: "travel-history", label: t("Travel History", "ប្រវត្តិធ្វើដំណើរ"), icon: Clock },
      ],
    },
    {
      title: t("Favorites & Discovery", "ចំណូលចិត្ត និងការរុករក"),
      items: [
        { id: "saved-experiences", label: t("Saved Experiences", "បទពិសោធន៍បានរក្សាទុក"), icon: Heart },
        { id: "saved-businesses", label: t("Favorite Businesses", "អាជីវកម្មពេញចិត្ត"), icon: Store },
        { id: "saved-guides", label: t("Favorite Tour Guides", "មគ្គុទ្ទេសក៍ពេញចិត្ត"), icon: UserCheck },
        { id: "hidden-gems", label: t("Recommended Hidden Gems", "កន្លែងកម្រស្គាល់ពិសេស"), icon: Sparkles },
        { id: "nearby-attractions", label: t("Nearby Attractions", "កន្លែងទាក់ទាញក្បែរៗ"), icon: MapPin },
        { id: "upcoming-events", label: t("Upcoming Events", "ព្រឹត្តិការណ៍ខាងមុខ"), icon: Calendar },
        { id: "recently-viewed", label: t("Recently Viewed", "បានមើលថ្មីៗ"), icon: Bookmark },
      ],
    },
    {
      title: t("Perks & Rewards", "អត្ថប្រយោជន៍ និងរង្វាន់"),
      items: [
        { id: "rewards", label: t("Traveler Rewards", "រង្វាន់អ្នកដំណើរ"), icon: Award },
        { id: "promotions", label: t("Exclusive Promotions", "ការបញ្ចុះតម្លៃផ្តាច់មុខ"), icon: Tag },
        { id: "inquiries", label: t("Inquiry History", "ប្រវត្តិសំណួរ"), icon: MessageSquare },
        { id: "notifications", label: t("Notifications", "ការជូនដំណឹង"), icon: Bell },
      ],
    },
    {
      title: t("Account", "គណនី"),
      items: [
        { id: "profile", label: t("Profile", "ប្រវត្តិរូប"), icon: User },
        { id: "language", label: t("Language", "ភាសា"), icon: Languages },
        { id: "settings", label: t("Settings", "ការកំណត់"), icon: Settings },
      ],
    },
  ];

  const aliases: Record<string, string> = {
    dashboard: "overview",
    favorites: "saved-experiences",
    guides: "saved-guides",
    businesses: "saved-businesses",
  };
  const requested = aliases[search["tab"] ?? ""] ?? search["tab"] ?? "overview";
  const active =
    requested === "overview" || groups.some((g) => g.items.some((i) => i.id === requested)) ? requested : "overview";
  const heading = groups.flatMap((g) => g.items).find((i) => i.id === active)?.label ?? t("Overview", "ទិដ្ឋភាពទូទៅ");
  const selectTab = (tab: string) => {
    void navigate({ search: { tab } });
  };

  const destinationRows: Row[] = destinations.map((d) => ({
    id: `d:${d.slug}`,
    title: tc(d.name),
    detail: `${tc(d.category)} · ${tc(d.location)}`,
    image: d.image,
  }));
  const businessRows: Row[] = businesses.map((b) => ({
    id: `b:${b.slug}`,
    title: tc(b.name),
    detail: `${tc(b.category)} · ${b.rating} / 5 (${b.reviews} reviews)`,
    image: b.image,
    badge: b.premium ? "👑 Premium" : undefined,
  }));
  const guideRows: Row[] = tourGuides.map((g) => ({
    id: `g:${g.slug}`,
    title: `${g.name} – Licensed Local Guide`,
    detail: `${tc(g.province)} · ${g.languages.join(", ")} · ${g.years} yrs exp · ${g.rating} / 5`,
    image: g.photo ?? g.cover,
    badge: "👑 Featured Guide",
  }));
  const eventRows: Row[] = events.map((e) => ({
    id: `e:${e.slug}`,
    title: tc(e.name),
    detail: `${tc(e.location)} · ${e.month} ${e.day}`,
    image: e.image,
  }));

  const { list } = useFavorites();
  const savedExperiences: Row[] = [
    {
      title: t("Hands-on Khmer Pottery Workshop", "សិក្ខាសាលាស្មូនឆ្នាំងខ្មែរ"),
      detail: t("Village Pottery Studio · Roluos Village · $20/person", "ស្ទូឌីយោស្មូនឆ្នាំងភូមិ · រលួស · $20/នាក់"),
      image: destinations[0]?.image,
      badge: "⭐ 4.9",
    },
    {
      title: t("Banteay Srei & Village Palm Sugar Walk", "ដំណើរទស្សនាបន្ទាយស្រី និងស្ករត្នោត"),
      detail: t("Full day with Dara Sok · $45/tour", "ពេញមួយថ្ងៃជាមួយតារាសុខ · $45/ដំណើរ"),
      image: destinations[1]?.image,
      badge: "⭐ 5.0",
    },
    {
      title: t("Countryside Sunset Bicycle Trail", "ជិះកង់មើលថ្ងៃលិចនៅជនបទ"),
      detail: t("Community ecotourism circuit · 3 hours", "ដំណើរអេកូទេសចរណ៍សហគមន៍ · ៣ ម៉ោង"),
      image: destinations[2]?.image,
      badge: "⭐ 4.8",
    },
  ];

  const tripRows: Row[] = [
    {
      title: t("Siem Reap Heritage & Artisan Weekend", "ចុងសប្ដាហ៍បេតិកភណ្ឌ និងសិប្បកម្មសៀមរាប"),
      detail: t("18–20 July 2026 · 2 travelers · Angkor Wat, Roluos & Pottery", "១៨–២០ កក្កដា ២០២៦ · អ្នកដំណើរ ២ នាក់"),
      badge: t("Confirmed", "បានបញ្ជាក់"),
      image: destinations[0]?.image,
    },
    {
      title: t("Phnom Kulen Waterfall & Sacred River Hike", "ដំណើរកម្សាន្តទឹកជ្រោះភ្នំគូលែន និងស្ទឹងលិង្គមួយពាន់"),
      detail: t("25 July 2026 · Day Trip with Licensed Guide", "២៥ កក្កដា ២០២៦ · ដំណើរមួយថ្ងៃជាមួយមគ្គុទ្ទេសក៍"),
      badge: t("Planning", "កំពុងរៀបចំ"),
      image: destinations[3]?.image,
    },
  ];

  const customItineraries: Row[] = [
    {
      title: t("3-Day Siem Reap Cultural Immersion", "គម្រោង ៣ ថ្ងៃស្វែងយល់វប្បធម៌សៀមរាប"),
      detail: t("Day 1: Sunrise Temples · Day 2: Village Artisans · Day 3: Floating Village", "ថ្ងៃទី១៖ ប្រាសាទ · ថ្ងៃទី២៖ សិប្បករភូមិ · ថ្ងៃទី៣៖ ភូមិបណ្តែតទឹក"),
      badge: t("Custom", "ផ្ទាល់ខ្លួន"),
    },
    {
      title: t("Khmer Foodie & Organic Farm Trail", "គម្រោងម្ហូបខ្មែរ និងកសិដ្ឋានសរីរាង្គ"),
      detail: t("2 Days · Cooking classes, lotus root harvesting & evening street food", "២ ថ្ងៃ · ថ្នាក់ធ្វើម្ហូប និងអាហារតាមដងផ្លូវ"),
      badge: t("Custom", "ផ្ទាល់ខ្លួន"),
    },
  ];

  const hiddenGems: Row[] = [
    {
      title: t("Chau Srei Vibol Forest Temple", "ប្រាសាទចៅស្រីវិបុល ក្នុងព្រៃស្ងប់ស្ងាត់"),
      detail: t("Hidden jungle sanctuary 25km east of Siem Reap. Zero tourist crowds.", "ប្រាសាទបុរាណក្នុងព្រៃស្ងប់ស្ងាត់ ចម្ងាយ ២៥គម គ្មានមនុស្សអ៊ូអរ។"),
      badge: t("Hidden Gem", "កន្លែងកម្រស្គាល់"),
      image: destinations[2]?.image,
    },
    {
      title: t("Roluos Artisan Weaving Family", "គ្រួសារតម្បាញសិប្បកម្មរលួស"),
      detail: t("Watch traditional silk loom weaving in a 100-year-old wooden house.", "ទស្សនាការត្បាញសូត្របុរាណក្នុងផ្ទះឈើចំណាស់ ១០០ ឆ្នាំ។"),
      badge: t("Community", "សហគមន៍"),
      image: destinations[1]?.image,
    },
  ];

  const promotions: Row[] = [
    {
      title: t("15% Off Hands-on Pottery Workshop", "បញ្ចុះតម្លៃ ១៥% សិក្ខាសាលាស្មូនឆ្នាំង"),
      detail: t("Village Pottery Studio · Code: CAMBODIAVIP · Valid until Aug 31", "ស្ទូឌីយោស្មូនឆ្នាំងភូមិ · កូដ: CAMBODIAVIP"),
      badge: t("Exclusive", "ផ្តាច់មុខ"),
      actionLabel: t("Use Voucher", "ប្រើប្រាស់"),
    },
    {
      title: t("Free Organic Lotus Tea Tasting", "ឥតគិតថ្លៃភ្លក្សតែផ្កាឈូកសរីរាង្គ"),
      detail: t("Lotus Leaf Café · With any dessert purchase · Show Premium Badge", "ហាងកាហ្វេផ្កាឈូក · បង្ហាញផ្លាកសញ្ញា Premium"),
      badge: t("Free Perk", "ឥតគិតថ្លៃ"),
      actionLabel: t("Claim Deal", "ទទួលយក"),
    },
    {
      title: t("$10 Off Angkor Sunrise Photo Tour", "បញ្ចុះតម្លៃ $១០ ដំណើរកម្សាន្តថតរូបថ្ងៃរះ"),
      detail: t("Dara Sok Local Guide · Apply during inquiry", "មគ្គុទ្ទេសក៍តារាសុខ · ទទួលបានពេលទាក់ទង"),
      badge: t("Partner Deal", "ការបញ្ចុះតម្លៃដៃគូ"),
      actionLabel: t("Book with Guide", "កក់ជាមួយមគ្គុទ្ទេសក៍"),
    },
  ];

  const travelHistory: Row[] = [
    {
      title: t("Banteay Srei Village Tour (Completed)", "ដំណើរទស្សនាភូមិបន្ទាយស្រី (បានបញ្ចប់)"),
      detail: t("12 May 2026 · Reviewed 5/5 stars · Supported 2 village families", "១២ ឧសភា ២០២៦ · ផ្តល់ផ្កាយ ៥ · គាំទ្រគ្រួសារភូមិ ២"),
      badge: "Completed",
    },
    {
      title: t("Tonle Sap Lake Floating Village Boat (Completed)", "ជិះទូកភូមិបណ្តែតទឹកបឹងទន្លេសាប (បានបញ្ចប់)"),
      detail: t("28 April 2026 · Reviewed 5/5 stars", "២៨ មេសា ២០២៦ · ផ្តល់ផ្កាយ ៥"),
      badge: "Completed",
    },
  ];

  const nearbyAttractions: Row[] = [
    {
      title: t("Bakong Temple (Roluos Group)", "ប្រាសាទបាគង (ក្រុមប្រាសាទរលួស)"),
      detail: t("4.2 km from current area · Oldest sandstone temple mountain", "៤.២ គម ពីតំបន់បច្ចុប្បន្ន · ប្រាសាទភ្នំថ្មភក់ចំណាស់ជាងគេ"),
      image: destinations[0]?.image,
    },
    {
      title: t("Preah Ko Temple", "ប្រាសាទព្រះគោ"),
      detail: t("3.8 km from current area · Stunning 9th-century brick carvings", "៣.៨ គម ពីតំបន់បច្ចុប្បន្ន"),
      image: destinations[1]?.image,
    },
  ];

  const recentlyViewed: Row[] = [
    {
      title: t("Village Cooking Class", "ថ្នាក់បង្រៀនធ្វើម្ហូបក្នុងភូមិ"),
      detail: t("Siem Reap countryside · From $25/person", "ជនបទសៀមរាប · ចាប់ពី $25/នាក់"),
      image: destinations[1]?.image,
    },
    {
      title: t("Ta Prohm Jungle Temple", "ប្រាសាទតាព្រហ្ម"),
      detail: t("Angkor Archaeological Park · Iconic tree roots", "ឧទ្យានបុរាណវិទ្យាអង្គរ"),
      image: destinations[0]?.image,
    },
  ];

  const messageRows: Row[] = [
    {
      title: t("Pottery workshop inquiry • 2 guests", "សំណួរសិក្ខាសាលាស្មូនឆ្នាំង • ភ្ញៀវ ២ នាក់"),
      detail: t("Village Pottery Studio · Replied 2 hours ago · Saturday, 10:00", "ស្ទូឌីយោស្មូនឆ្នាំងភូមិ · ឆ្លើយតប ២ ម៉ោងមុន"),
      badge: t("Replied", "បានឆ្លើយតប"),
    },
    {
      title: t("Angkor sunrise photography tour", "ដំណើរកម្សាន្តថតរូបថ្ងៃរះអង្គរ"),
      detail: t("Dara Sok (Licensed Guide) · Confirmed for Sunday 05:00 AM", "ដារ៉ាសុខ (មគ្គុទ្ទេសក៍) · បានបញ្ជាក់"),
      badge: t("Confirmed", "បានបញ្ជាក់"),
    },
  ];

  const rows: Record<string, Row[]> = {
    upcoming: tripRows,
    "saved-experiences": savedExperiences,
    "saved-businesses": businessRows.filter((b) => b.badge),
    "saved-guides": guideRows,
    "custom-itineraries": customItineraries,
    "hidden-gems": hiddenGems,
    promotions: promotions,
    "nearby-attractions": nearbyAttractions,
    "upcoming-events": eventRows,
    "travel-history": travelHistory,
    "recently-viewed": recentlyViewed,
    inquiries: messageRows,
    notifications: [
      {
        title: t("New VIP Discount unlocked", "បានបើកសិទ្ធិបញ្ចុះតម្លៃ VIP ថ្មី"),
        detail: t("Village Pottery Studio added 15% off for Premium Travelers.", "ស្ទូឌីយោស្មូនឆ្នាំងភូមិបានផ្តល់ការបញ្ចុះតម្លៃ ១៥%។"),
        badge: "New",
      },
      {
        title: t("Guide Dara Sok confirmed your sunrise pickup", "មគ្គុទ្ទេសក៍ដារ៉ាសុខបានបញ្ជាក់ម៉ោងទទួលពេលព្រឹក"),
        detail: t("Pick up scheduled at 05:00 AM this Sunday.", "ម៉ោងទទួលកំណត់នៅ ០៥:០០ ព្រឹកថ្ងៃអាទិត្យនេះ។"),
      },
    ],
  };

  const panel =
    active === "language" ? (
      <label className="block max-w-sm space-y-2">
        <span>{t("Site language", "ភាសាគេហទំព័រ")}</span>
        <select
          className="w-full rounded-xl border bg-background p-3"
          value={lang}
          onChange={(e) => {
            setLang(e.target.value === "km" ? "km" : "en");
            toast.success(e.target.value === "km" ? "បានប្ដូរភាសា" : "Language updated");
          }}
        >
          <option value="en">{t("English", "អង់គ្លេស")}</option>
          <option value="km">{t("Khmer", "ខ្មែរ")}</option>
        </select>
      </label>
    ) : active === "profile" || active === "settings" ? (
      <AccountForm name={displayName} email={displayEmail} />
    ) : active === "planner" ? (
      <TripPlanner />
    ) : active === "budget-planner" ? (
      <BudgetPlanner />
    ) : active === "rewards" ? (
      <RewardsSection />
    ) : (
      <Records rows={rows[active] ?? savedExperiences} />
    );

  return (
    <DashboardShell
      title={t("My Cambodia Journey", "ដំណើរទេសចរណ៍កម្ពុជារបស់ខ្ញុំ")}
      role={t("Traveler Dashboard", "ផ្ទាំងគ្រប់គ្រងអ្នកដំណើរ")}
      user={{
        name: displayName,
        initials: displayName.slice(0, 2).toUpperCase(),
        avatar: displayAvatar,
        roleTag: "👑 Premium Traveler",
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
                quickLogin("guide");
                toast.success(t("Switched to Tour Guide", "បានប្តូរទៅគណនីមគ្គុទ្ទេសក៍"));
                navigate({ to: "/guide-dashboard" });
              }}
              className="rounded-lg bg-card p-1.5 text-center text-[10px] font-semibold text-navy hover:bg-teal hover:text-white transition"
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
            <button
              type="button"
              onClick={() => {
                quickLogin("admin");
                toast.success(t("Switched to Admin", "បានប្តូរទៅគណនី Admin"));
                navigate({ to: "/admin" });
              }}
              className="rounded-lg bg-card p-1.5 text-center text-[10px] font-semibold text-navy hover:bg-navy hover:text-white transition"
            >
              Admin
            </button>
          </div>
        </div>
      }
    >
      {/* PERSONALIZED TRAVELER BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-navy/95 to-teal/90 p-6 sm:p-8 text-white shadow-lift">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/50 bg-gold/20 px-3 py-1 text-xs font-bold text-gold backdrop-blur">
                <Crown className="size-3.5 text-gold" /> {t("👑 Premium Traveler", "👑 អ្នកដំណើរ Premium")}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/90">
                <Sparkles className="size-3.5 text-teal-light" /> {t("Gold Explorer Level", "កម្រិតអ្នករុករកមាស")}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold sm:text-3xl text-white">
              {t("My Cambodia Journey", "ដំណើរទេសចរណ៍កម្ពុជារបស់ខ្ញុំ")} –{" "}
              <span className="text-gold">{displayName}</span>
            </h2>
            <p className="mt-1.5 max-w-xl text-sm text-white/80">
              {t(
                "You have unlocked unlimited favorites, customized itineraries, hidden gems, and exclusive partner discounts across Siem Reap.",
                "អ្នកទទួលបានការរក្សាទុកមិនកំណត់ គម្រោងធ្វើដំណើរផ្ទាល់ខ្លួន កន្លែងទេសចរណ៍កម្រស្គាល់ និងការបញ្ចុះតម្លៃដៃគូទូទាំងសៀមរាប។",
              )}
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button
              asChild
              className="rounded-full bg-gold px-5 text-xs sm:text-sm font-bold text-gold-foreground hover:bg-gold/90 shadow-md"
            >
              <Link to="/explore">{t("Explore Destinations", "ស្វែងរកគោលដៅ")}</Link>
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-white/30 text-xs sm:text-sm text-white hover:bg-white/10"
              onClick={() => selectTab("planner")}
            >
              {t("Plan Trip", "រៀបចំដំណើរ")}
            </Button>
          </div>
        </div>
      </div>

      {active === "overview" ? (
        <div className="space-y-6 mt-6">
          {/* TOP STAT CARDS */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              label={t("Saved Experiences", "បទពិសោធន៍បានរក្សាទុក")}
              value={String(savedExperiences.length + list.length)}
              icon={Heart}
              tone="teal"
              delta={t("Unlimited access", "ការចូលប្រើមិនកំណត់")}
            />
            <StatCard
              label={t("Upcoming Trips", "ដំណើរកម្សាន្តខាងមុខ")}
              value={String(tripRows.length)}
              icon={CalendarDays}
              tone="gold"
              delta={t("Next: 18 July", "បន្ទាប់៖ ១៨ កក្កដា")}
            />
            <StatCard
              label={t("Premium Savings This Month", "ការសន្សំក្នុងខែនេះ")}
              value={"$84"}
              icon={DollarSign}
              tone="lotus"
              delta={t("3 Exclusive deals used", "បានប្រើ ៣ ការផ្តល់ជូន")}
            />
            <StatCard
              label={t("Achievement Badges", "ផ្លាកសញ្ញាសមិទ្ធផល")}
              value={"4 Badges"}
              icon={Award}
              tone="navy"
              delta={t("Top 5% Explorer", "អ្នករុករកកំពូល ៥%")}
            />
          </div>

          {/* TRAVELER REWARDS STRIP */}
          <div className="rounded-3xl border bg-card p-6 shadow-card">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div>
                <h3 className="font-bold text-lg text-navy flex items-center gap-2">
                  <Award className="size-5 text-gold" /> {t("Traveler Rewards & Status", "រង្វាន់ និងស្ថានភាពអ្នកដំណើរ")}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {t("Your exclusive perks as a Premium Traveler subscriber.", "អត្ថប្រយោជន៍ផ្តាច់មុខរបស់អ្នកជាសមាជិក Premium។")}
                </p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => selectTab("rewards")}>
                {t("View All Rewards", "មើលរង្វាន់ទាំងអស់")}
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl bg-teal-soft/50 p-4 border border-teal/20">
                <span className="text-xs text-muted-foreground uppercase font-semibold">{t("Monthly Savings", "ការសន្សំប្រចាំខែ")}</span>
                <p className="font-display text-2xl font-bold text-navy mt-1">$84.00</p>
                <span className="text-xs text-teal font-medium">{t("From 3 partner workshops", "ពី ៣ សិក្ខាសាលាដៃគូ")}</span>
              </div>
              <div className="rounded-2xl bg-gold-soft/50 p-4 border border-gold/20">
                <span className="text-xs text-muted-foreground uppercase font-semibold">{t("Exclusive Deals Used", "ការផ្តល់ជូនបានប្រើ")}</span>
                <p className="font-display text-2xl font-bold text-navy mt-1">3 Deals</p>
                <span className="text-xs text-gold-foreground font-medium">{t("Pottery, Café & Guide", "ស្មូនឆ្នាំង កាហ្វេ និងមគ្គុទ្ទេសក៍")}</span>
              </div>
              <div className="rounded-2xl bg-secondary p-4">
                <span className="text-xs text-muted-foreground uppercase font-semibold">{t("Favorite Categories", "ប្រភេទដែលចូលចិត្ត")}</span>
                <p className="font-bold text-navy mt-1 text-sm">{t("Heritage · Cafés · Pottery", "បេតិកភណ្ឌ · កាហ្វេ · ស្មូន")}</p>
                <span className="text-xs text-muted-foreground">{t("Based on saved trips", "ផ្អែកលើការរក្សាទុក")}</span>
              </div>
              <div className="rounded-2xl bg-secondary p-4">
                <span className="text-xs text-muted-foreground uppercase font-semibold">{t("Unlocked Badges", "ផ្លាកសញ្ញាទទួលបាន")}</span>
                <div className="flex items-center gap-1.5 mt-2">
                  <span title="Angkor Explorer" className="text-lg">🏛️</span>
                  <span title="Cultural Supporter" className="text-lg">🤝</span>
                  <span title="Local Foodie" className="text-lg">🍲</span>
                  <span title="Eco Traveler" className="text-lg">🚴</span>
                </div>
              </div>
            </div>
          </div>

          {/* DEDICATED WIDGETS GRID */}
          <div className="grid gap-6 xl:grid-cols-2">
            <Widget
              title={t("Upcoming Trips", "ដំណើរកម្សាន្តខាងមុខ")}
              action={
                <Button variant="ghost" size="sm" onClick={() => selectTab("upcoming")}>
                  {t("View all", "មើលទាំងអស់")}
                </Button>
              }
            >
              <Records rows={tripRows} />
            </Widget>

            <Widget
              title={t("Saved Experiences", "បទពិសោធន៍បានរក្សាទុក")}
              action={
                <Button variant="ghost" size="sm" onClick={() => selectTab("saved-experiences")}>
                  {t("View all", "មើលទាំងអស់")}
                </Button>
              }
            >
              <Records rows={savedExperiences} />
            </Widget>

            <Widget
              title={t("Recommended Hidden Gems", "កន្លែងកម្រស្គាល់ពិសេស")}
              action={
                <Button variant="ghost" size="sm" onClick={() => selectTab("hidden-gems")}>
                  {t("Discover more", "ស្វែងយល់បន្ថែម")}
                </Button>
              }
            >
              <Records rows={hiddenGems} />
            </Widget>

            <Widget
              title={t("Exclusive Promotions for You", "ការបញ្ចុះតម្លៃផ្តាច់មុខសម្រាប់អ្នក")}
              action={
                <Button variant="ghost" size="sm" onClick={() => selectTab("promotions")}>
                  {t("View all", "មើលទាំងអស់")}
                </Button>
              }
            >
              <Records rows={promotions} />
            </Widget>

            <Widget
              title={t("Favorite Tour Guides", "មគ្គុទ្ទេសក៍ពេញចិត្ត")}
              action={
                <Button variant="ghost" size="sm" onClick={() => selectTab("saved-guides")}>
                  {t("Find guides", "ស្វែងរកមគ្គុទ្ទេសក៍")}
                </Button>
              }
            >
              <Records rows={guideRows.slice(0, 2)} />
            </Widget>

            <Widget
              title={t("Nearby Attractions", "កន្លែងទាក់ទាញក្បែរៗ")}
              action={
                <Button variant="ghost" size="sm" onClick={() => selectTab("nearby-attractions")}>
                  {t("View map", "មើលផែនទី")}
                </Button>
              }
            >
              <Records rows={nearbyAttractions} />
            </Widget>
          </div>
        </div>
      ) : (
        <Widget title={heading}>{panel}</Widget>
      )}
    </DashboardShell>
  );
}

function BudgetPlanner() {
  const { t } = useI18n();
  const [days, setDays] = useState(3);
  const [people, setPeople] = useState(2);
  const hotelPerNight = 45;
  const foodPerDay = 25;
  const activitiesPerDay = 35;
  const transportPerDay = 18;

  const total = (hotelPerNight * (days - 1)) + ((foodPerDay + activitiesPerDay) * days * people) + (transportPerDay * days);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-card p-6 shadow-card space-y-4">
        <h3 className="font-bold text-lg text-navy">{t("Trip Budget Calculator", "គណនាថវិកាធ្វើដំណើរ")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("Estimate your Siem Reap travel costs based on authentic local pricing.", "ប៉ាន់ប្រមាណការចំណាយនៅសៀមរាប ផ្អែកលើតម្លៃជាក់ស្តែងក្នុងស្រុក។")}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-1.5 text-sm">
            <span className="font-medium text-navy">{t("Trip Duration (Days)", "ចំនួនថ្ងៃ")}</span>
            <input
              type="number"
              min={1}
              max={30}
              value={days}
              onChange={(e) => setDays(Number(e.target.value) || 1)}
              className="w-full rounded-xl border bg-background p-3"
            />
          </label>
          <label className="space-y-1.5 text-sm">
            <span className="font-medium text-navy">{t("Number of Travelers", "ចំនួនអ្នកដំណើរ")}</span>
            <input
              type="number"
              min={1}
              max={10}
              value={people}
              onChange={(e) => setPeople(Number(e.target.value) || 1)}
              className="w-full rounded-xl border bg-background p-3"
            />
          </label>
        </div>

        <div className="grid gap-3 sm:grid-cols-4 pt-3 text-center">
          <div className="rounded-xl bg-secondary p-3">
            <span className="text-xs text-muted-foreground">{t("Boutique Stay", "កន្លែងស្នាក់")}</span>
            <p className="font-bold text-navy mt-1">${hotelPerNight * (days - 1)}</p>
          </div>
          <div className="rounded-xl bg-secondary p-3">
            <span className="text-xs text-muted-foreground">{t("Local Meals", "អាហារ")}</span>
            <p className="font-bold text-navy mt-1">${foodPerDay * days * people}</p>
          </div>
          <div className="rounded-xl bg-secondary p-3">
            <span className="text-xs text-muted-foreground">{t("Tours & Workshops", "ដំណើរកម្សាន្ត")}</span>
            <p className="font-bold text-navy mt-1">${activitiesPerDay * days * people}</p>
          </div>
          <div className="rounded-xl bg-secondary p-3">
            <span className="text-xs text-muted-foreground">{t("Tuk Tuk Transport", "រ៉ឺម៉កកង់បី")}</span>
            <p className="font-bold text-navy mt-1">${transportPerDay * days}</p>
          </div>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <span className="font-bold text-navy text-lg">{t("Estimated Total:", "ការប៉ាន់ប្រមាណសរុប៖")}</span>
          <span className="font-display text-3xl font-extrabold text-teal">${total} USD</span>
        </div>

        <Button
          onClick={() => toast.success(t("Budget saved to your trip itinerary!", "បានរក្សាទុកថវិកាក្នុងគម្រោងរបស់អ្នក!"))}
          className="rounded-full bg-teal text-primary-foreground hover:bg-teal/90 w-full"
        >
          {t("Save Budget Plan", "រក្សាទុកគម្រោងថវិកា")}
        </Button>
      </div>
    </div>
  );
}

function RewardsSection() {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-card p-6 shadow-card space-y-4">
        <h3 className="font-bold text-lg text-navy">{t("Traveler Achievement Badges", "ផ្លាកសញ្ញាសមិទ្ធផលអ្នកដំណើរ")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("Earn badges and unlock higher discounts by visiting community projects and verified local businesses.", "ទទួលបានផ្លាកសញ្ញា និងការបញ្ចុះតម្លៃបន្ថែម ដោយទស្សនាគម្រោងសហគមន៍។")}
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            {
              icon: "🏛️",
              title: t("Angkor Explorer", "អ្នករុករកអង្គរ"),
              desc: t("Visited 5+ historic temples in Siem Reap", "បានទស្សនា ៥+ ប្រាសាទបុរាណ"),
              status: t("Unlocked", "ទទួលបានរួច"),
            },
            {
              icon: "🤝",
              title: t("Cultural Supporter", "អ្នកគាំទ្រវប្បធម៌"),
              desc: t("Supported 3+ local artisan workshops directly", "គាំទ្រ ៣+ សិក្ខាសាលាសិប្បករ"),
              status: t("Unlocked", "ទទួលបានរួច"),
            },
            {
              icon: "🍲",
              title: t("Local Foodie", "អ្នកជំនាញម្ហូបក្នុងស្រុក"),
              desc: t("Tasted authentic Khmer cooking class dishes", "បានភ្លក្សមុខម្ហូបខ្មែរពិតប្រាកដ"),
              status: t("Unlocked", "ទទួលបានរួច"),
            },
            {
              icon: "🚴",
              title: t("Eco Traveler", "អ្នកដំណើរអេកូឡូស៊ី"),
              desc: t("Completed low-carbon countryside cycling", "ជិះកង់ជនបទកាត់បន្ថយផ្សែងពុល"),
              status: t("Unlocked", "ទទួលបានរួច"),
            },
          ].map((b) => (
            <div key={b.title} className="flex items-start gap-3 rounded-2xl border bg-secondary/30 p-4">
              <span className="text-3xl shrink-0">{b.icon}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-navy">{b.title}</h4>
                  <Badge variant="outline" className="text-xs bg-teal/10 text-teal border-teal/30">
                    {b.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TripPlanner() {
  const { t, tc } = useI18n();
  const [stops, setStops] = useState<string[]>([]);
  return (
    <div className="space-y-4">
      <form
        className="grid gap-4 sm:grid-cols-2 rounded-2xl border bg-card p-6 shadow-card"
        onSubmit={(e) => {
          e.preventDefault();
          toast.success(t("Itinerary saved for this session", "បានរក្សាទុកផែនការសម្រាប់ការប្រើប្រាស់លើកនេះ"));
        }}
      >
        <label className="space-y-2">
          <span className="font-semibold text-navy">{t("Trip name", "ឈ្មោះដំណើរកម្សាន្ត")}</span>
          <input
            required
            defaultValue={t("Siem Reap Cultural Journey", "ដំណើរកម្សាន្តវប្បធម៌សៀមរាប")}
            className="w-full rounded-xl border bg-background p-3"
          />
        </label>
        <label className="space-y-2">
          <span className="font-semibold text-navy">{t("Departure date", "ថ្ងៃចេញដំណើរ")}</span>
          <input required type="date" defaultValue="2026-07-18" className="w-full rounded-xl border bg-background p-3" />
        </label>
        <div className="space-y-3 sm:col-span-2">
          <span className="font-semibold text-navy block">{t("Select Destinations & Experiences", "ជ្រើសរើសគោលដៅ និងបទពិសោធន៍")}</span>
          <div className="grid gap-2 sm:grid-cols-2">
            {destinations.slice(0, 6).map((d) => (
              <label
                key={d.slug}
                className={`flex items-center gap-3 rounded-xl border p-3 transition cursor-pointer ${
                  stops.includes(d.slug) ? "border-teal bg-teal-soft" : "bg-card"
                }`}
              >
                <input
                  type="checkbox"
                  checked={stops.includes(d.slug)}
                  onChange={(e) =>
                    setStops((prev) => (e.target.checked ? [...prev, d.slug] : prev.filter((s) => s !== d.slug)))
                  }
                  className="rounded"
                />
                <span className="text-sm font-medium text-navy">{tc(d.name)}</span>
              </label>
            ))}
          </div>
        </div>
        <p className="text-sm text-muted-foreground sm:col-span-2">
          {t("Selected stops", "កន្លែងដែលបានជ្រើសរើស")}: <span className="font-bold text-navy">{stops.length}</span>
        </p>
        <Button type="submit" className="rounded-full bg-teal text-primary-foreground hover:bg-teal/90 sm:col-span-2">
          {t("Save Itinerary", "រក្សាទុកផែនការធ្វើដំណើរ")}
        </Button>
      </form>
    </div>
  );
}
