import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ArrowUpRight,
  Crown,
  BadgeCheck,
  Eye,
  MapPin,
  Store,
  Sparkles,
  MessageCircle,
  Star,
  Heart,
  MessageSquare,
  Layers,
  Image as ImageIcon,
  BookOpen,
  Users,
  Handshake,
  TrendingUp,
  Megaphone,
  Phone,
  Bell,
  Settings,
  MousePointerClick,
  Percent,
  DollarSign,
  Globe,
  Upload,
  Video,
  Clock,
  Share2,
  Calendar,
  CheckCircle2,
  Tag,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import { DashboardShell, Widget, StatCard } from "@/components/site/DashboardShell";
import { ThemeSegmentedControl } from "@/components/site/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { useAuth } from "@/lib/auth";
import { businesses, destinations } from "@/lib/data";
import { getOwner, teamMembers, branchLocations, guidePartners, tourGuides } from "@/lib/people";
import { img } from "@/lib/images";

type Row = { title: string; detail: string; image?: string; id?: string; badge?: string; time?: string; actionLabel?: string };

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
                <span className="rounded-full bg-teal-soft px-2 py-0.5 text-[10px] font-bold text-teal shrink-0">
                  {row.badge}
                </span>
              )}
              {row.time && <span className="text-[11px] text-muted-foreground ml-auto">{row.time}</span>}
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
        <span>{t("Business Name", "ឈ្មោះអាជីវកម្ម")}</span>
        <input required name="name" defaultValue={name} className="w-full rounded-xl border bg-background p-3" />
      </label>
      <label className="block space-y-2 text-sm">
        <span>{t("Email address", "អ៊ីមែល")}</span>
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
        {t("Receive instant WhatsApp & email inquiries alerts", "ទទួលការជូនដំណឹងសំណួរតាម WhatsApp និងអ៊ីមែលភ្លាមៗ")}
      </label>
      <Button type="submit" className="rounded-full bg-teal text-primary-foreground hover:bg-teal/90">
        {t("Save changes", "រក្សាទុកការផ្លាស់ប្តូរ")}
      </Button>
    </form>
  );
}

export const Route = createFileRoute("/business-dashboard")({
  validateSearch: (s: Record<string, unknown>): { tab?: string } =>
    typeof s["tab"] === "string" ? { tab: s["tab"] as string } : {},
  head: () => ({
    meta: [
      { title: "Business Performance Dashboard | Cambodia Unlocked" },
      {
        name: "description",
        content:
          "Business Performance Dashboard for verified partners on Cambodia Unlocked. Track customer inquiries, analytics, visitor growth, promotions and profile management.",
      },
      { property: "og:title", content: "Business Performance Dashboard | Cambodia Unlocked" },
      {
        property: "og:description",
        content: "Track customer leads, conversion rates, visitor growth and campaign marketing.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const { t, tc, lang, setLang } = useI18n();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/business-dashboard" });

  const groups = [
    {
      title: t("Performance", "ដំណើរការអាជីវកម្ម"),
      items: [
        { id: "overview", label: t("Overview", "ទិដ្ឋភាពទូទៅ"), icon: LayoutDashboard },
        { id: "inquiries-crm", label: t("Inquiries Panel", "ប្រអប់សំណួរអតិថិជន"), icon: MessageSquare },
        { id: "analytics", label: t("Analytics & Growth", "ការវិភាគ និងកំណើន"), icon: TrendingUp },
      ],
    },
    {
      title: t("Marketing Tools", "ឧបករណ៍ទីផ្សារ"),
      items: [
        { id: "promotions", label: t("Promotions & Offers", "ការផ្តល់ជូន និងការបញ្ចុះតម្លៃ"), icon: Tag },
        { id: "sponsored", label: t("Sponsored Listings", "ការផ្សព្វផ្សាយឧបត្ថម្ភ"), icon: Sparkles },
        { id: "featured-management", label: t("Featured Placement", "ការគ្រប់គ្រងការបង្ហាញលេចធ្លោ"), icon: Crown },
        { id: "events-promo", label: t("Event Promotions", "ការផ្សព្វផ្សាយព្រឹត្តិការណ៍"), icon: Calendar },
      ],
    },
    {
      title: t("Profile Management", "គ្រប់គ្រងប្រវត្តិរូបអាជីវកម្ម"),
      items: [
        { id: "profile-desc", label: t("Business Description", "ព័ត៌មានលម្អិតអាជីវកម្ម"), icon: Store },
        { id: "photos", label: t("Photo Gallery (Up to 30)", "វិចិត្រសាលរូបថត (៣០)"), icon: ImageIcon },
        { id: "videos", label: t("Videos & Media", "វីដេអូផ្សព្វផ្សាយ"), icon: Video },
        { id: "services", label: t("Special Packages & Services", "សេវាកម្ម និងកញ្ចប់ពិសេស"), icon: Layers },
        { id: "story", label: t("Business Story", "រឿងរ៉ាវអាជីវកម្ម"), icon: BookOpen },
        { id: "opening-hours", label: t("Opening Hours & Location", "ម៉ោងបើក និងទីតាំង"), icon: Clock },
        { id: "social-links", label: t("Social & Contact Links", "តំណភ្ជាប់បណ្តាញសង្គម"), icon: Globe },
      ],
    },
    {
      title: t("Operations", "ប្រតិបត្តិការ"),
      items: [
        { id: "team", label: t("Team Members", "សមាជិកក្រុម"), icon: Users },
        { id: "partnerships", label: t("Tour Guide Partnerships", "ដៃគូមគ្គុទ្ទេសក៍"), icon: Handshake },
        { id: "subscription", label: t("Subscription Plan", "គម្រោងសមាជិកភាព"), icon: Crown },
        { id: "settings", label: t("Account Settings", "ការកំណត់"), icon: Settings },
      ],
    },
  ];

  const aliases: Record<string, string> = {
    dashboard: "overview",
    inquiries: "inquiries-crm",
    views: "analytics",
  };
  const requested = aliases[search["tab"] ?? ""] ?? search["tab"] ?? "overview";
  const active =
    requested === "overview" || groups.some((g) => g.items.some((i) => i.id === requested)) ? requested : "overview";
  const heading = groups.flatMap((g) => g.items).find((i) => i.id === active)?.label ?? t("Overview", "ទិដ្ឋភាពទូទៅ");
  const selectTab = (tab: string) => {
    void navigate({ search: { tab } });
  };

  const { user, quickLogin } = useAuth();
  const business = businesses.find((b) => b.slug === "village-pottery-studio");
  const owner = business ? getOwner(business) : undefined;

  const displayName = user?.name ?? owner?.name ?? "Chanreay Sok";
  const businessTitle = user?.businessName ?? business?.name ?? "Village Pottery Studio";
  const businessCategoryName = user?.businessCategory ?? business?.category ?? "Community Tourism";
  const displayAvatar = user?.avatar ?? img.ownerChanreay;

  // Inquiries panel data requested in prompt
  const customerInquiries: Row[] = [
    {
      title: t("Traveler from France (Claire Dupont)", "អ្នកដំណើរមកពីបារាំង (Claire Dupont)"),
      detail: t("Interested in hands-on pottery workshop for 2 adults · Travel dates: Next Saturday 10:00 AM", "ចាប់អារម្មណ៍សិក្ខាសាលាស្មូនឆ្នាំងសម្រាប់មនុស្សពេញវ័យ ២ នាក់"),
      time: t("2 hours ago", "២ ម៉ោងមុន"),
      badge: t("Pottery Workshop", "សិក្ខាសាលាស្មូនឆ្នាំង"),
      actionLabel: t("Reply via WhatsApp", "ឆ្លើយតបតាម WhatsApp"),
    },
    {
      title: t("Traveler from Singapore (Wei Ming)", "អ្នកដំណើរមកពីសិង្ហបុរី (Wei Ming)"),
      detail: t("Looking for cooking experience and traditional kiln firing demo · Group of 4 · Requesting price", "ចង់បានបទពិសោធន៍ធ្វើម្ហូប និងការដុតកុលាលភាជន៍ · ក្រុម ៤ នាក់"),
      time: t("Yesterday", "ម្សិលមិញ"),
      badge: t("Cooking & Craft", "ធ្វើម្ហូប និងសិប្បកម្ម"),
      actionLabel: t("Send Quote", "ផ្ញើតម្លៃជូន"),
    },
    {
      title: t("Traveler from Australia (Sarah & Mark)", "អ្នកដំណើរមកពីអូស្ត្រាលី (Sarah & Mark)"),
      detail: t("Family session inquiry with 2 kids · Inquiring about hotel pickup options in Siem Reap", "សួរនាំអំពីវគ្គគ្រួសារជាមួយកូន ២ នាក់ · សួរអំពីរថយន្តទទួល"),
      time: t("2 days ago", "២ ថ្ងៃមុន"),
      badge: t("Family Package", "កញ្ចប់គ្រួសារ"),
      actionLabel: t("View Inquiry", "មើលសំណួរ"),
    },
  ];

  const servicesRows: Row[] = [
    {
      title: t("Hands-on Pottery Workshop", "សិក្ខាសាលាស្មូនឆ្នាំងដោយផ្ទាល់"),
      detail: t("$20 / person · 90 minutes · Up to 8 guests · Includes finished clay bowl", "$20 / នាក់ · ៩០ នាទី · ភ្ញៀវរហូតដល់ ៨ នាក់"),
      badge: t("Popular", "ពេញនិយម"),
    },
    {
      title: t("Family Ceramic Craft Session", "វគ្គសិប្បកម្មកុលាលភាជន៍សម្រាប់គ្រួសារ"),
      detail: t("$35 / family · 2 hours · Traditional wheel throwing & painting", "$35 / គ្រួសារ · ២ ម៉ោង"),
      badge: t("Top Rated", "វាយតម្លៃខ្ពស់"),
    },
    {
      title: t("Master Artisan Cultural Immersion", "បទពិសោធន៍ស្វែងយល់ជាមួយសិប្បករជើងចាស់"),
      detail: t("$45 / person · Half day with village tour and authentic meal", "$45 / នាក់ · កន្លះថ្ងៃជាមួយអាហារភូមិ"),
      badge: t("Premium Package", "កញ្ចប់ពិសេស"),
    },
  ];

  const panel =
    active === "profile-desc" || active === "settings" ? (
      <AccountForm name={businessTitle} email={user?.email ?? business?.email ?? "hello@villagepottery.kh"} />
    ) : active === "inquiries-crm" ? (
      <InquiriesPanel inquiries={customerInquiries} />
    ) : active === "analytics" ? (
      <AnalyticsSection />
    ) : active === "photos" ? (
      <PhotoGallerySection />
    ) : active === "videos" ? (
      <VideoMediaSection />
    ) : active === "promotions" ? (
      <MarketingToolsSection />
    ) : active === "sponsored" || active === "featured-management" ? (
      <SponsoredAndFeaturedSection />
    ) : active === "opening-hours" ? (
      <OpeningHoursSection />
    ) : active === "social-links" ? (
      <SocialLinksSection />
    ) : active === "subscription" ? (
      <SubscriptionSection />
    ) : active === "team" ? (
      <Records rows={teamMembers.map((m) => ({ title: m.name, detail: `${tc(m.role)} · ${m.phone}`, badge: m.role }))} />
    ) : active === "partnerships" ? (
      <Records
        rows={guidePartners.map((p) => ({
          title: tourGuides.find((g) => g.slug === p.slug)?.name ?? p.slug,
          detail: `${tc(p.assigned)} · ${p.tours} tours completed · ${p.rating} / 5 rating`,
          badge: "Licensed Guide Partner",
        }))}
      />
    ) : active === "services" ? (
      <Records rows={servicesRows} />
    ) : (
      <Records rows={customerInquiries} />
    );

  return (
    <DashboardShell
      title={t("Business Performance Dashboard", "ផ្ទាំងគ្រប់គ្រងដំណើរការអាជីវកម្ម")}
      role={t("Business Owner Dashboard", "ផ្ទាំងគ្រប់គ្រងម្ចាស់អាជីវកម្ម")}
      user={{
        name: displayName,
        initials: displayName.slice(0, 2).toUpperCase(),
        avatar: displayAvatar,
        roleTag: "👑 Premium Business Partner",
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
      {/* BUSINESS BANNER */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy via-navy/95 to-gold/30 p-6 sm:p-8 text-white shadow-lift border border-gold/30">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-0.5 text-xs font-bold text-gold-foreground">
                <Crown className="size-3.5" /> 👑 {t("Premium Business Partner", "ដៃគូអាជីវកម្មកម្រិត Premium")}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-teal-soft/30 border border-teal/40 px-2.5 py-0.5 text-xs font-semibold text-white">
                <BadgeCheck className="size-3.5 text-teal-light" /> {tc(businessCategoryName)}
              </span>
            </div>
            <h2 className="text-2xl font-extrabold sm:text-3xl text-white">
              {businessTitle} – {t("Business Performance Dashboard", "ផ្ទាំងគ្រប់គ្រងដំណើរការអាជីវកម្ម")}
            </h2>
            <p className="mt-1 flex items-center gap-1.5 text-xs sm:text-sm text-white/80">
              <MapPin className="size-3.5 text-gold shrink-0" />
              {t("Roluos Village, Siem Reap • Managed by ", "ភូមិរលួស សៀមរាប • គ្រប់គ្រងដោយ ")}
              <span className="font-semibold text-gold">{displayName}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <Button
              asChild
              className="rounded-full bg-gold px-5 text-xs sm:text-sm font-bold text-gold-foreground hover:bg-gold/90 shadow-md"
            >
              <Link to="/businesses/$slug" params={{ slug: "village-pottery-studio" }}>
                {t("View Public Page", "មើលទំព័រសាធារណៈ")}
              </Link>
            </Button>
            <Button
              variant="outline"
              className="rounded-full border-white/30 text-xs sm:text-sm text-white hover:bg-white/10"
              onClick={() => selectTab("promotions")}
            >
              {t("Launch Promotion", "បង្កើតការផ្សព្វផ្សាយ")}
            </Button>
          </div>
        </div>
      </div>

      {active === "overview" ? (
        <div className="space-y-6 mt-6">
          {/* 7 KEY METRICS REQUESTED IN PROMPT */}
          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            <div className="rounded-2xl border bg-card p-4 shadow-card">
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-semibold">
                <Eye className="size-3.5 text-teal" /> {t("Profile Views", "ការមើល")}
              </span>
              <p className="font-display text-2xl font-bold text-navy mt-1">2,485</p>
              <span className="text-[10px] text-teal font-medium">+18% this month</span>
            </div>

            <div className="rounded-2xl border bg-card p-4 shadow-card">
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-semibold">
                <MessageSquare className="size-3.5 text-gold" /> {t("Inquiries", "សំណួរ")}
              </span>
              <p className="font-display text-2xl font-bold text-navy mt-1">86</p>
              <span className="text-[10px] text-success font-medium">96% reply rate</span>
            </div>

            <div className="rounded-2xl border bg-card p-4 shadow-card">
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-semibold">
                <MousePointerClick className="size-3.5 text-teal" /> {t("Website Clicks", "ចុចគេហទំព័រ")}
              </span>
              <p className="font-display text-2xl font-bold text-navy mt-1">243</p>
              <span className="text-[10px] text-teal font-medium">+32 new</span>
            </div>

            <div className="rounded-2xl border bg-card p-4 shadow-card">
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-semibold">
                <Heart className="size-3.5 text-lotus" /> {t("Saved by Travelers", "បានរក្សាទុក")}
              </span>
              <p className="font-display text-2xl font-bold text-navy mt-1">118</p>
              <span className="text-[10px] text-lotus font-medium">+14 this week</span>
            </div>

            <div className="rounded-2xl border bg-card p-4 shadow-card">
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-semibold">
                <Phone className="size-3.5 text-teal" /> {t("Phone Calls", "ការទូរសព្ទ")}
              </span>
              <p className="font-display text-2xl font-bold text-navy mt-1">37</p>
              <span className="text-[10px] text-teal font-medium">Direct calls</span>
            </div>

            <div className="rounded-2xl border bg-card p-4 shadow-card">
              <span className="text-xs text-muted-foreground flex items-center gap-1 font-semibold">
                <Percent className="size-3.5 text-gold" /> {t("Conversion Rate", "អត្រាបម្លែង")}
              </span>
              <p className="font-display text-2xl font-bold text-navy mt-1">12%</p>
              <span className="text-[10px] text-gold font-medium">Above average</span>
            </div>

            <div className="rounded-2xl border bg-card p-4 shadow-card bg-gold-soft/20 border-gold/30">
              <span className="text-xs text-gold-foreground flex items-center gap-1 font-bold">
                <TrendingUp className="size-3.5 text-gold" /> {t("Revenue Growth", "កំណើនចំណូល")}
              </span>
              <p className="font-display text-2xl font-bold text-navy mt-1">+18%</p>
              <span className="text-[10px] text-success font-semibold">Month-over-month</span>
            </div>
          </div>

          {/* TWO MAIN COLUMNS: INQUIRIES CRM PANEL + QUICK ANALYTICS */}
          <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            {/* INQUIRIES PANEL */}
            <div className="rounded-3xl border bg-card p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-bold text-lg text-navy flex items-center gap-2">
                    <MessageCircle className="size-5 text-teal" /> {t("Recent Customer Inquiries", "សំណួរអតិថិជនថ្មីៗ")}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {t("Direct inquiries from international travelers interested in your services.", "សំណួរផ្ទាល់ពីអ្នកដំណើរបរទេសដែលមានចំណាប់អារម្មណ៍លើសេវាកម្មរបស់អ្នក។")}
                  </p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => selectTab("inquiries-crm")}>
                  {t("View All (86)", "មើលទាំងអស់ (៨៦)")}
                </Button>
              </div>

              <Records rows={customerInquiries} />
            </div>

            {/* QUICK ANALYTICS & VISITOR SOURCES */}
            <div className="rounded-3xl border bg-card p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-bold text-lg text-navy flex items-center gap-2">
                  <TrendingUp className="size-5 text-gold" /> {t("Traveler Demographics", "ប្រភពអ្នកដំណើរ")}
                </h3>
                <Button variant="ghost" size="sm" onClick={() => selectTab("analytics")}>
                  {t("Full report", "របាយការណ៍ពេញលេញ")}
                </Button>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase text-teal">{t("Top Visitor Countries:", "ប្រទេសអ្នកទស្សនាច្រើនជាងគេ៖")}</p>
                {[
                  { country: t("France", "បារាំង"), pct: 28, flag: "🇫🇷" },
                  { country: t("Singapore", "សិង្ហបុរី"), pct: 22, flag: "🇸🇬" },
                  { country: t("United States", "សហរដ្ឋអាមេរិក"), pct: 19, flag: "🇺🇸" },
                  { country: t("Australia", "អូស្ត្រាលី"), pct: 14, flag: "🇦🇺" },
                  { country: t("Other Countries", "ប្រទេសផ្សេងៗ"), pct: 17, flag: "🌏" },
                ].map((item) => (
                  <div key={item.country} className="space-y-1">
                    <div className="flex justify-between text-xs text-navy font-medium">
                      <span>
                        {item.flag} {item.country}
                      </span>
                      <span>{item.pct}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-teal rounded-full" style={{ width: `${item.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t">
                <p className="text-xs font-semibold uppercase text-gold mb-2">{t("Traffic Channels:", "ប្រភពចរាចរណ៍៖")}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl bg-secondary p-2.5">
                    <p className="text-muted-foreground">{t("Direct Discovery", "ស្វែងរកផ្ទាល់")}</p>
                    <p className="font-bold text-navy text-sm mt-0.5">42%</p>
                  </div>
                  <div className="rounded-xl bg-secondary p-2.5">
                    <p className="text-muted-foreground">{t("Search Engine", "ម៉ាស៊ីនស្វែងរក")}</p>
                    <p className="font-bold text-navy text-sm mt-0.5">31%</p>
                  </div>
                  <div className="rounded-xl bg-secondary p-2.5">
                    <p className="text-muted-foreground">{t("Guide Referrals", "មគ្គុទ្ទេសក៍ណែនាំ")}</p>
                    <p className="font-bold text-navy text-sm mt-0.5">18%</p>
                  </div>
                  <div className="rounded-xl bg-secondary p-2.5">
                    <p className="text-muted-foreground">{t("Social Links", "បណ្តាញសង្គម")}</p>
                    <p className="font-bold text-navy text-sm mt-0.5">9%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Widget title={heading}>{panel}</Widget>
      )}
    </DashboardShell>
  );
}

function InquiriesPanel({ inquiries }: { inquiries: Row[] }) {
  const { t } = useI18n();
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {t("Manage and respond to live inquiries from travelers worldwide.", "គ្រប់គ្រង និងឆ្លើយតបទៅកាន់សំណួរជាក់ស្តែងពីអ្នកដំណើរទូទាំងពិភពលោក។")}
        </p>
        <span className="rounded-full bg-teal px-3 py-1 text-xs font-bold text-primary-foreground">
          {t("86 Total Leads", "សំណួរសរុប ៨៦")}
        </span>
      </div>
      <Records rows={inquiries} />
    </div>
  );
}

function AnalyticsSection() {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border bg-card p-4 shadow-card">
          <span className="text-xs text-muted-foreground font-semibold">{t("Visitor Growth", "កំណើនអ្នកទស្សនា")}</span>
          <p className="font-display text-2xl font-bold text-navy mt-1">+18%</p>
          <span className="text-xs text-teal font-medium">2,485 monthly impressions</span>
        </div>
        <div className="rounded-2xl border bg-card p-4 shadow-card">
          <span className="text-xs text-muted-foreground font-semibold">{t("Inquiries Conversion", "អត្រាបម្លែងសំណួរ")}</span>
          <p className="font-display text-2xl font-bold text-navy mt-1">12.4%</p>
          <span className="text-xs text-gold-foreground font-medium">86 direct inquiries</span>
        </div>
        <div className="rounded-2xl border bg-card p-4 shadow-card">
          <span className="text-xs text-muted-foreground font-semibold">{t("Average Rating", "ពិន្ទុវាយតម្លៃមធ្យម")}</span>
          <p className="font-display text-2xl font-bold text-navy mt-1">4.9 / 5</p>
          <span className="text-xs text-success font-medium">64 verified reviews</span>
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-card space-y-4">
        <h3 className="font-bold text-navy text-lg">{t("Monthly Performance Report", "របាយការណ៍ដំណើរការប្រចាំខែ")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("Visitor traffic and inquiry trends over the last 3 months.", "និន្នាការចរាចរណ៍ភ្ញៀវ និងសំណួរក្នុងរយៈពេល ៣ ខែកន្លងមក។")}
        </p>

        <div className="space-y-3 pt-2">
          {[
            { month: "January 2026", views: 1420, inquiries: 48, pct: 55 },
            { month: "February 2026", views: 1890, inquiries: 65, pct: 72 },
            { month: "March 2026", views: 2485, inquiries: 86, pct: 100 },
          ].map((m) => (
            <div key={m.month} className="space-y-1">
              <div className="flex justify-between text-xs text-navy font-semibold">
                <span>{m.month}</span>
                <span>
                  {m.views} {t("views", "ការមើល")} • {m.inquiries} {t("inquiries", "សំណួរ")}
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-secondary overflow-hidden">
                <div className="h-full bg-gradient-to-r from-teal to-gold rounded-full" style={{ width: `${m.pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PhotoGallerySection() {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-navy text-lg">{t("Photo Gallery (Up to 30 Photos)", "វិចិត្រសាលរូបថត (រហូតដល់ ៣០ សន្លឹក)")}</h3>
          <p className="text-xs text-muted-foreground">
            {t("Business Premium members can upload high-resolution photos showcasing workshops, products, and studio spaces.", "សមាជិក Business Premium អាចបញ្ចូលរូបភាពច្បាស់ៗរហូតដល់ ៣០ សន្លឹក។")}
          </p>
        </div>
        <Button
          onClick={() => toast.success(t("Upload dialog opened", "បានបើកផ្ទាំងបញ្ចូលរូបភាព"))}
          className="rounded-full bg-teal text-primary-foreground hover:bg-teal/90 text-xs"
        >
          <Upload className="size-3.5 mr-1" /> {t("Upload Photos", "បញ្ចូលរូបថត")}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {destinations.slice(0, 6).map((d, i) => (
          <div key={d.slug} className="group relative overflow-hidden rounded-2xl border bg-card">
            <img src={d.image} alt={d.slug} className="aspect-[4/3] w-full object-cover transition group-hover:scale-105" />
            <div className="p-3">
              <p className="text-xs font-semibold text-navy">
                {t("Studio Showcase", "រូបភាពស្ទូឌីយោ")} #{i + 1}
              </p>
              <span className="text-[10px] text-muted-foreground">High resolution · Approved</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoMediaSection() {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-card p-6 shadow-card space-y-4">
        <h3 className="font-bold text-navy text-lg flex items-center gap-2">
          <Video className="size-5 text-teal" /> {t("Video Introduction & Media", "វីដេអូណែនាំខ្លួន និងមេឌៀ")}
        </h3>
        <p className="text-sm text-muted-foreground">
          {t("Embed YouTube, Vimeo, or upload a direct video tour of your business to increase traveler bookings by up to 40%.", "បញ្ចូលវីដេអូណែនាំអំពីអាជីវកម្មរបស់អ្នក ដើម្បីបង្កើនការកក់រហូតដល់ ៤០%។")}
        </p>

        <div className="aspect-video w-full rounded-2xl border bg-secondary/60 flex flex-col items-center justify-center text-center p-6">
          <Video className="size-12 text-teal mb-3" />
          <h4 className="font-bold text-navy">{t("Village Pottery Studio - Artisan Story Video", "វីដេអូរឿងរ៉ាវសិប្បករស្ទូឌីយោស្មូនឆ្នាំង")}</h4>
          <p className="text-xs text-muted-foreground mt-1">Duration: 2 min 14 sec · Status: Active on Homepage</p>
          <Button
            size="sm"
            className="mt-4 rounded-full bg-gold text-gold-foreground hover:bg-gold/90"
            onClick={() => toast.info(t("Video preview started", "កំពុងចាក់វីដេអូសាកល្បង"))}
          >
            {t("Watch Video Tour", "ទស្សនាវីដេអូ")}
          </Button>
        </div>
      </div>
    </div>
  );
}

function MarketingToolsSection() {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-navy text-lg">{t("Marketing Tools & Promotions", "ឧបករណ៍ទីផ្សារ និងការផ្សព្វផ្សាយ")}</h3>
          <p className="text-xs text-muted-foreground">
            {t("Create discount coupons, seasonal campaigns, and special traveler offers.", "បង្កើតប័ណ្ណបញ្ចុះតម្លៃ យុទ្ធនាការតាមរដូវកាល និងការផ្តល់ជូនពិសេស។")}
          </p>
        </div>
        <Button
          onClick={() => toast.success(t("New promotion created!", "បានបង្កើតការផ្សព្វផ្សាយថ្មី!"))}
          className="rounded-full bg-teal text-primary-foreground hover:bg-teal/90 text-xs"
        >
          <Plus className="size-3.5 mr-1" /> {t("Create Promotion", "បង្កើតការផ្សព្វផ្សាយ")}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-bold text-gold">15% Discount</span>
            <span className="text-xs text-success font-semibold">Active</span>
          </div>
          <h4 className="font-bold text-navy text-base">{t("Early Bird 15% Off Workshop", "បញ្ចុះតម្លៃ ១៥% សិក្ខាសាលា")}</h4>
          <p className="text-xs text-muted-foreground">Code: EARLYBIRD2026 · Valid for bookings made 7 days in advance.</p>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-card space-y-2">
          <div className="flex items-center justify-between">
            <span className="rounded-full bg-teal-soft px-2.5 py-0.5 text-xs font-bold text-teal">Free Gift</span>
            <span className="text-xs text-success font-semibold">Active</span>
          </div>
          <h4 className="font-bold text-navy text-base">{t("Free Handmade Souvenir Cup", "កាដូកែវសេរ៉ាមិចឥតគិតថ្លៃ")}</h4>
          <p className="text-xs text-muted-foreground">Included with every family craft booking of 3+ people.</p>
        </div>
      </div>
    </div>
  );
}

function SponsoredAndFeaturedSection() {
  const { t } = useI18n();
  return (
    <div className="space-y-6">
      <div className="rounded-2xl border bg-card p-6 shadow-card space-y-4">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-foreground">
            <Crown className="size-3.5" /> {t("Featured Placement Active", "ការបង្ហាញលេចធ្លោសកម្ម")}
          </span>
          <span className="text-xs text-muted-foreground">Renews on Aug 1, 2026</span>
        </div>
        <h3 className="font-bold text-navy text-lg">{t("Featured Local Businesses Placement", "ការដាក់បង្ហាញក្នុងអាជីវកម្មលេចធ្លោ")}</h3>
        <p className="text-sm text-muted-foreground">
          {t("Your studio appears on the Cambodia Unlocked homepage under 'Premium & Verified Featured Local Businesses'.", "ស្ទូឌីយោរបស់អ្នកបង្ហាញនៅលើទំព័រដើម ក្នុងផ្នែក 'អាជីវកម្មក្នុងស្រុកលេចធ្លោ'។")}
        </p>

        <div className="rounded-2xl bg-secondary/50 p-4 grid gap-3 sm:grid-cols-3 text-center">
          <div>
            <span className="text-xs text-muted-foreground">{t("Featured Impressions", "ការបង្ហាញ")}</span>
            <p className="font-display text-xl font-bold text-navy mt-1">8,500</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">{t("Clicks from Homepage", "ការចុចពីទំព័រដើម")}</span>
            <p className="font-display text-xl font-bold text-navy mt-1">327</p>
          </div>
          <div>
            <span className="text-xs text-muted-foreground">{t("Rank in Category", "ចំណាត់ថ្នាក់ក្នុងប្រភេទ")}</span>
            <p className="font-display text-xl font-bold text-teal mt-1">#1 Top</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function OpeningHoursSection() {
  const { t } = useI18n();
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-card space-y-4 max-w-xl">
      <h3 className="font-bold text-navy text-lg flex items-center gap-2">
        <Clock className="size-5 text-teal" /> {t("Opening Hours & Studio Location", "ម៉ោងធ្វើការ និងទីតាំងស្ទូឌីយោ")}
      </h3>
      <div className="space-y-2 text-sm text-navy">
        <div className="flex justify-between py-1 border-b">
          <span>{t("Monday – Friday", "ច័ន្ទ – សុក្រ")}</span>
          <span className="font-semibold">08:00 AM – 05:00 PM</span>
        </div>
        <div className="flex justify-between py-1 border-b">
          <span>{t("Saturday – Sunday", "សៅរ៍ – អាទិត្យ")}</span>
          <span className="font-semibold text-teal">08:00 AM – 06:00 PM</span>
        </div>
        <div className="flex justify-between py-1">
          <span>{t("Location", "ទីតាំង")}</span>
          <span className="font-semibold">Roluos Village, Siem Reap</span>
        </div>
      </div>
    </div>
  );
}

function SocialLinksSection() {
  const { t } = useI18n();
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-card space-y-4 max-w-xl">
      <h3 className="font-bold text-navy text-lg flex items-center gap-2">
        <Globe className="size-5 text-teal" /> {t("Social & Contact Information", "ព័ត៌មានទំនាក់ទំនង និងបណ្តាញសង្គម")}
      </h3>
      <div className="space-y-3 text-sm">
        <div>
          <span className="font-medium text-navy block">{t("Phone / WhatsApp:", "ទូរសព្ទ / WhatsApp៖")}</span>
          <span className="text-muted-foreground">+855 12 345 678</span>
        </div>
        <div>
          <span className="font-medium text-navy block">{t("Website:", "គេហទំព័រ៖")}</span>
          <a href="#" className="text-teal hover:underline">https://villagepotterystudio.kh</a>
        </div>
        <div>
          <span className="font-medium text-navy block">Facebook / Instagram:</span>
          <span className="text-muted-foreground">@villagepotterykh</span>
        </div>
      </div>
    </div>
  );
}

function SubscriptionSection() {
  const { t } = useI18n();
  return (
    <div className="rounded-2xl border bg-card p-6 shadow-card space-y-4 max-w-xl">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-foreground">
          👑 Business Premium
        </span>
        <span className="font-bold text-navy">$10 / month</span>
      </div>
      <h3 className="font-bold text-navy text-lg">{t("Current Active Plan", "គម្រោងសកម្មបច្ចុប្បន្ន")}</h3>
      <p className="text-sm text-muted-foreground">
        {t("Includes full CRM inquiries management, 30 photos, analytics dashboard, and priority search rankings.", "រួមបញ្ចូលការគ្រប់គ្រង CRM, រូបថត ៣០ សន្លឹក, ផ្ទាំងវិភាគ និងការបង្ហាញលេចធ្លោ។")}
      </p>
      <Button
        onClick={() => toast.info(t("Subscription settings demo", "ការកំណត់សមាជិកភាពសាកល្បង"))}
        className="rounded-full bg-teal text-primary-foreground hover:bg-teal/90"
      >
        {t("Manage Subscription", "គ្រប់គ្រងសមាជិកភាព")}
      </Button>
    </div>
  );
}
