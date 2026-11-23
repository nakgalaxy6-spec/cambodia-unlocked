import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BookOpen, Store, Compass, LifeBuoy, CalendarDays, Sparkles, Luggage, Users, HeartHandshake,
  Landmark, MapPin, ArrowRight, Check, Target, Eye, Rocket, MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionHeading } from "@/components/site/Section";
import { businesses, destinations, events, stories } from "@/lib/data";
import { tourGuides } from "@/lib/people";
import { img } from "@/lib/images";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Cambodia Unlocked – Our Story, Mission & Vision" },
      { name: "description", content: "Why we built Cambodia Unlocked: connecting travelers with authentic Cambodian experiences while helping local communities, guides and businesses grow." },
      { property: "og:title", content: "About Cambodia Unlocked" },
      { property: "og:description", content: "Discover Local Cambodia. Support Local Communities. Our story, mission, vision and roadmap." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

type Pair = readonly [string, string];

const heroTiles: { src: string; label: Pair }[] = [
  { src: img.hero, label: ["Angkor Wat", "អង្គរវត្ត"] },
  { src: img.floating, label: ["Floating Villages", "ភូមិបណ្តែតទឹក"] },
  { src: img.lotus, label: ["Lotus Farms", "កសិដ្ឋានផ្កាឈូក"] },
  { src: img.pottery, label: ["Local Businesses", "អាជីវកម្មក្នុងស្រុក"] },
  { src: img.guideDara, label: ["Tour Guides", "មគ្គុទ្ទេសក៍ទេសចរណ៍"] },
  { src: img.community, label: ["Community Tourism", "ទេសចរណ៍សហគមន៍"] },
];

const onlyFamous: Pair[] = [["Angkor Wat", "អង្គរវត្ត"], ["Pub Street", "ផ្លូវ Pub Street"], ["Popular tourist areas", "តំបន់ទេសចរណ៍ល្បីៗ"]];
const hidden: Pair[] = [
  ["Community tourism projects", "គម្រោងទេសចរណ៍សហគមន៍"],
  ["Artisan workshops", "សិក្ខាសាលាសិប្បករ"],
  ["Homestays", "ផ្ទះស្នាក់នៅជាមួយគ្រួសារ"],
  ["Local guides", "មគ្គុទ្ទេសក៍ក្នុងស្រុក"],
  ["Family-owned businesses", "អាជីវកម្មគ្រួសារ"],
  ["Cultural experiences", "បទពិសោធន៍វប្បធម៌"],
];
const scattered = ["Facebook", "Google Maps", "Websites", "Travel Blogs", "TikTok"];
const scatteredKm: Record<string, string> = { Websites: "គេហទំព័រ", "Travel Blogs": "ប្លុកធ្វើដំណើរ" };

const features: { icon: LucideIcon; title: Pair; body: Pair }[] = [
  { icon: BookOpen, title: ["Community Stories", "រឿងរ៉ាវសហគមន៍"], body: ["Discover stories behind villages, artisans, farms, and families.", "ស្វែងយល់ពីរឿងរ៉ាវនៅពីក្រោយភូមិ សិប្បករ កសិដ្ឋាន និងគ្រួសារ។"] },
  { icon: Store, title: ["Local Business Discovery", "ស្វែងរកអាជីវកម្មក្នុងស្រុក"], body: ["Connect directly with local providers.", "ទាក់ទងដោយផ្ទាល់ជាមួយអ្នកផ្តល់សេវាក្នុងស្រុក។"] },
  { icon: Compass, title: ["Tour Guide Network", "បណ្តាញមគ្គុទ្ទេសក៍"], body: ["Find trusted local experts and guides.", "ស្វែងរកអ្នកជំនាញ និងមគ្គុទ្ទេសក៍ក្នុងស្រុកដែលគួរឱ្យទុកចិត្ត។"] },
  { icon: LifeBuoy, title: ["Travel Support", "ជំនួយការធ្វើដំណើរ"], body: ["Access transportation, emergency assistance, and visitor information.", "ទទួលបានព័ត៌មានការដឹកជញ្ជូន ជំនួយបន្ទាន់ និងព័ត៌មានសម្រាប់ភ្ញៀវ។"] },
  { icon: CalendarDays, title: ["Events Discovery", "ស្វែងរកព្រឹត្តិការណ៍"], body: ["Find festivals and local events.", "ស្វែងរកពិធីបុណ្យ និងព្រឹត្តិការណ៍ក្នុងស្រុក។"] },
  { icon: Sparkles, title: ["Lok Kru AI Companion", "ជំនួយការ AI លោកគ្រូ"], body: ["Receive personalized travel recommendations and itinerary support.", "ទទួលបានការណែនាំការធ្វើដំណើរផ្ទាល់ខ្លួន និងជំនួយរៀបចំកម្មវិធីដំណើរ។"] },
];

const audiences: { icon: LucideIcon; title: Pair; benefits: Pair[] }[] = [
  {
    icon: Luggage, title: ["Travelers", "អ្នកដំណើរ"],
    benefits: [["Discover hidden destinations", "ស្វែងរកគោលដៅលាក់កំបាំង"], ["Build trips", "រៀបចំដំណើរកម្សាន្ត"], ["Contact guides", "ទាក់ទងមគ្គុទ្ទេសក៍"], ["Learn local culture", "សិក្សាវប្បធម៌ក្នុងស្រុក"], ["Find authentic experiences", "ស្វែងរកបទពិសោធន៍ពិតប្រាកដ"]],
  },
  {
    icon: Store, title: ["Local Businesses", "អាជីវកម្មក្នុងស្រុក"],
    benefits: [["Gain visibility", "ទទួលបានការស្គាល់"], ["Receive inquiries", "ទទួលសំណួរពីអតិថិជន"], ["Tell their stories", "ចែករំលែករឿងរ៉ាវរបស់ខ្លួន"], ["Promote services", "ផ្សព្វផ្សាយសេវាកម្ម"]],
  },
  {
    icon: Compass, title: ["Tour Guides", "មគ្គុទ្ទេសក៍ទេសចរណ៍"],
    benefits: [["Create professional profiles", "បង្កើតប្រវត្តិរូបវិជ្ជាជីវៈ"], ["Reach travelers directly", "ទាក់ទងអ្នកដំណើរដោយផ្ទាល់"], ["Promote tours", "ផ្សព្វផ្សាយដំណើរកម្សាន្ត"]],
  },
  {
    icon: Users, title: ["Communities", "សហគមន៍"],
    benefits: [["Increase tourism opportunities", "បង្កើនឱកាសទេសចរណ៍"], ["Preserve cultural heritage", "ថែរក្សាបេតិកភណ្ឌវប្បធម៌"], ["Share local stories", "ចែករំលែករឿងរ៉ាវក្នុងស្រុក"]],
  },
];

const future: Pair[] = [
  ["Phnom Penh", "ភ្នំពេញ"], ["Battambang", "បាត់ដំបង"], ["Kampot", "កំពត"], ["Kep", "កែប"], ["Mondulkiri", "មណ្ឌលគិរី"], ["Cambodia Nationwide", "ទូទាំងប្រទេសកម្ពុជា"],
];

function About() {
  const { t } = useI18n();
  const T = (p: Pair) => t(p[0], p[1]);

  // Live counts from the platform's current listings.
  const communities = new Set(stories.filter((s) => ["Villages", "Community Projects", "Farmers", "Homestays"].includes(s.category)).map((s) => s.slug)).size;
  const stats: { label: Pair; value: number; icon: LucideIcon }[] = [
    { label: ["Local Businesses Listed", "អាជីវកម្មក្នុងស្រុកដែលបានចុះបញ្ជី"], value: businesses.length, icon: Store },
    { label: ["Tour Guides Registered", "មគ្គុទ្ទេសក៍ដែលបានចុះឈ្មោះ"], value: tourGuides.length, icon: Compass },
    { label: ["Destinations Published", "គោលដៅដែលបានផ្សព្វផ្សាយ"], value: destinations.length, icon: MapPin },
    { label: ["Events Featured", "ព្រឹត្តិការណ៍ដែលបានបង្ហាញ"], value: events.length, icon: CalendarDays },
    { label: ["Traveler Inquiries Sent", "សំណួរពីអ្នកដំណើរដែលបានផ្ញើ"], value: 1248, icon: MessageCircle },
    { label: ["Communities Connected", "សហគមន៍ដែលបានភ្ជាប់"], value: Math.max(communities, 1), icon: HeartHandshake },
  ];

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal px-3 py-1 text-xs font-semibold text-primary-foreground">
              <Landmark className="size-3.5" /> {t("About Cambodia Unlocked", "អំពី Cambodia Unlocked")}
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.1] md:text-5xl">
              {t("Discover Local Cambodia.", "ស្វែងយល់ពីកម្ពុជាក្នុងស្រុក។")}{" "}
              <span className="text-gold">{t("Support Local Communities.", "គាំទ្រសហគមន៍មូលដ្ឋាន។")}</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-navy-foreground/80">
              {t(
                "Cambodia Unlocked is a tourism discovery and local business connection platform that helps travelers find authentic Cambodian experiences while helping local communities, guides, and businesses gain visibility and opportunities.",
                "Cambodia Unlocked គឺជាវេទិកាស្វែងរកទេសចរណ៍ និងភ្ជាប់អាជីវកម្មក្នុងស្រុក ដែលជួយអ្នកដំណើរស្វែងរកបទពិសោធន៍កម្ពុជាពិតប្រាកដ ខណៈពេលជួយសហគមន៍ មគ្គុទ្ទេសក៍ និងអាជីវកម្មក្នុងស្រុកឱ្យទទួលបានការស្គាល់ និងឱកាសថ្មីៗ។",
              )}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-11 rounded-full bg-gold px-6 text-gold-foreground hover:bg-gold/90">
                <Link to="/explore">{t("Explore Destinations", "ស្វែងរកគោលដៅ")} <ArrowRight /></Link>
              </Button>
              <Button asChild variant="outline" className="h-11 rounded-full border-navy-foreground/30 bg-transparent px-6 text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground">
                <Link to="/how-it-works">{t("How It Works", "របៀបដំណើរការ")}</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {heroTiles.map((tile, i) => (
              <figure key={tile.src + i} className={`group relative overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`}>
                <img src={tile.src} alt={T(tile.label)} className="h-full min-h-[120px] w-full object-cover transition duration-500 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/85 to-transparent p-2 text-xs font-semibold">
                  {T(tile.label)}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* OUR STORY */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading eyebrow={t("Our story", "រឿងរ៉ាវរបស់យើង")} title={t("Why We Built Cambodia Unlocked", "ហេតុអ្វីយើងបង្កើត Cambodia Unlocked")} />
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border bg-card p-6 shadow-card">
            <p className="text-sm font-semibold text-navy">{t("Many travelers only discover:", "អ្នកដំណើរជាច្រើនស្គាល់តែ៖")}</p>
            <ul className="mt-3 space-y-2">
              {onlyFamous.map((p) => (
                <li key={p[0]} className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4 text-gold" /> {T(p)}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border bg-teal-soft p-6 shadow-card">
            <p className="text-sm font-semibold text-navy">{t("Meanwhile many amazing local experiences remain hidden:", "ខណៈដែលបទពិសោធន៍ក្នុងស្រុកដ៏អស្ចារ្យជាច្រើននៅតែលាក់កំបាំង៖")}</p>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {hidden.map((p) => (
                <li key={p[0]} className="flex items-center gap-2 text-sm text-navy"><Check className="size-4 text-teal" /> {T(p)}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col rounded-2xl border bg-card p-6 shadow-card">
            <p className="text-sm font-semibold text-navy">{t("Information is scattered across:", "ព័ត៌មានរាយប៉ាយនៅលើ៖")}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {scattered.map((s) => (
                <span key={s} className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">{t(s, scatteredKm[s] ?? s)}</span>
              ))}
            </div>
            <p className="mt-auto rounded-xl bg-navy p-4 pt-4 text-sm font-semibold text-navy-foreground">
              {t("Cambodia Unlocked brings everything together into one platform.", "Cambodia Unlocked ប្រមូលផ្តុំអ្វីៗទាំងអស់នៅលើវេទិកាតែមួយ។")}
            </p>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-sand py-16">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-2">
          <div className="rounded-3xl border bg-card p-8 shadow-card">
            <span className="grid size-11 place-items-center rounded-xl bg-teal-soft text-teal"><Target className="size-5" /></span>
            <h2 className="mt-4 text-2xl font-bold text-navy">{t("Our Mission", "បេសកកម្មរបស់យើង")}</h2>
            <p className="mt-3 text-muted-foreground">
              {t(
                "Connect travelers with authentic Cambodian experiences while empowering local businesses and community tourism providers through visibility, storytelling, and direct customer engagement.",
                "ភ្ជាប់អ្នកដំណើរជាមួយបទពិសោធន៍កម្ពុជាពិតប្រាកដ ព្រមទាំងពង្រឹងសមត្ថភាពអាជីវកម្មក្នុងស្រុក និងអ្នកផ្តល់សេវាទេសចរណ៍សហគមន៍ តាមរយៈការធ្វើឱ្យគេស្គាល់ ការនិទានរឿង និងការទំនាក់ទំនងផ្ទាល់ជាមួយអតិថិជន។",
              )}
            </p>
          </div>
          <div className="rounded-3xl border bg-card p-8 shadow-card">
            <span className="grid size-11 place-items-center rounded-xl bg-gold-soft text-gold-foreground"><Eye className="size-5" /></span>
            <h2 className="mt-4 text-2xl font-bold text-navy">{t("Our Vision", "ចក្ខុវិស័យរបស់យើង")}</h2>
            <p className="mt-3 text-muted-foreground">
              {t(
                "Create a tourism ecosystem where local communities, guides, small businesses, and cultural experiences benefit alongside Cambodia's major tourist attractions.",
                "បង្កើតប្រព័ន្ធទេសចរណ៍មួយ ដែលសហគមន៍មូលដ្ឋាន មគ្គុទ្ទេសក៍ អាជីវកម្មខ្នាតតូច និងបទពិសោធន៍វប្បធម៌ ទទួលបានផលប្រយោជន៍រួមគ្នាជាមួយរមណីយដ្ឋានទេសចរណ៍ធំៗរបស់កម្ពុជា។",
              )}
            </p>
          </div>
        </div>
      </section>

      {/* WHAT MAKES US DIFFERENT */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading eyebrow={t("Not a generic directory", "មិនមែនជាបញ្ជីធម្មតា")} title={t("What Makes Us Different", "អ្វីដែលធ្វើឱ្យយើងខុសប្លែក")} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title[0]} className="rounded-2xl border bg-card p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift">
              <span className="grid size-11 place-items-center rounded-xl bg-teal-soft text-teal"><f.icon className="size-5" /></span>
              <h3 className="mt-4 text-lg font-semibold text-navy">{T(f.title)}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{T(f.body)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO WE SUPPORT */}
      <section className="bg-teal-soft py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow={t("Everyone benefits", "គ្រប់គ្នាទទួលបានផលប្រយោជន៍")} title={t("Who We Support", "អ្នកដែលយើងគាំទ្រ")} />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {audiences.map((a) => (
              <div key={a.title[0]} className="rounded-2xl border bg-card p-6 shadow-card">
                <span className="grid size-11 place-items-center rounded-xl bg-navy text-navy-foreground"><a.icon className="size-5" /></span>
                <h3 className="mt-4 text-lg font-semibold text-navy">{T(a.title)}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-gold">{t("Benefits", "អត្ថប្រយោជន៍")}</p>
                <ul className="mt-2 space-y-1.5">
                  {a.benefits.map((b) => (
                    <li key={b[0]} className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="mt-0.5 size-4 shrink-0 text-success" /> {T(b)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMUNITY IMPACT */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading eyebrow={t("Live on the platform", "ទិន្នន័យផ្ទាល់លើវេទិកា")} title={t("Community Impact", "ផលប៉ះពាល់សហគមន៍")} />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label[0]} className="flex items-center gap-4 rounded-2xl border bg-card p-5 shadow-card">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gold-soft text-gold-foreground"><s.icon className="size-5" /></span>
              <div>
                <p className="font-display text-3xl font-bold text-navy">{s.value.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{T(s.label)}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted-foreground">{t("Counts update as new listings are published. Inquiry total is illustrative during the pilot.", "ចំនួនធ្វើបច្ចុប្បន្នភាពនៅពេលមានការចុះបញ្ជីថ្មី។ ចំនួនសំណួរគឺជាឧទាហរណ៍ក្នុងដំណាក់កាលសាកល្បង។")}</p>
      </section>

      {/* ROADMAP */}
      <section className="bg-sand py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow={t("Roadmap", "ផែនទីបង្ហាញផ្លូវ")} title={t("Where We're Going", "ទិសដៅរបស់យើង")} />
          <div className="grid gap-5 lg:grid-cols-[1fr_2fr]">
            <div className="rounded-3xl bg-navy p-6 text-navy-foreground">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">{t("Current phase", "ដំណាក់កាលបច្ចុប្បន្ន")}</p>
              <h3 className="mt-2 text-2xl font-bold">{t("Siem Reap Pilot Project", "គម្រោងសាកល្បងសៀមរាប")}</h3>
              <p className="mt-2 text-sm text-navy-foreground/75">{t("Building the model with local businesses, guides and communities in Siem Reap.", "កសាងគំរូជាមួយអាជីវកម្ម មគ្គុទ្ទេសក៍ និងសហគមន៍ក្នុងខេត្តសៀមរាប។")}</p>
            </div>
            <div className="rounded-3xl border bg-card p-6 shadow-card">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-teal"><Rocket className="size-4" /> {t("Future expansion", "ការពង្រីកនាពេលអនាគត")}</p>
              <ol className="mt-4 flex flex-wrap items-center gap-2">
                {future.map((p, i) => (
                  <li key={p[0]} className="flex items-center gap-2">
                    <span className={`rounded-full px-3 py-1.5 text-sm font-medium ${i === future.length - 1 ? "bg-gold text-gold-foreground" : "bg-teal-soft text-navy"}`}>{T(p)}</span>
                    {i < future.length - 1 && <ArrowRight className="size-4 text-gold" />}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-16 md:grid-cols-3">
        {[
          { icon: Luggage, eyebrow: ["Travelers", "អ្នកដំណើរ"] as Pair, title: ["Start Exploring Cambodia", "ចាប់ផ្តើមស្វែងរកកម្ពុជា"] as Pair, cta: ["Explore Destinations", "ស្វែងរកគោលដៅ"] as Pair, to: "/explore" as const },
          { icon: Store, eyebrow: ["Businesses", "អាជីវកម្ម"] as Pair, title: ["List Your Business", "ចុះបញ្ជីអាជីវកម្មរបស់អ្នក"] as Pair, cta: ["Register Business", "ចុះឈ្មោះអាជីវកម្ម"] as Pair, to: "/join" as const },
          { icon: Compass, eyebrow: ["Guides", "មគ្គុទ្ទេសក៍"] as Pair, title: ["Become A Tour Guide", "ក្លាយជាមគ្គុទ្ទេសក៍"] as Pair, cta: ["Join As Guide", "ចូលរួមជាមគ្គុទ្ទេសក៍"] as Pair, to: "/become-guide" as const },
        ].map((c) => (
          <div key={c.to} className="flex flex-col rounded-3xl border bg-card p-6 shadow-card">
            <span className="grid size-11 place-items-center rounded-xl bg-teal-soft text-teal"><c.icon className="size-5" /></span>
            <p className="mt-4 text-xs font-semibold uppercase tracking-widest text-teal">{T(c.eyebrow)}</p>
            <h3 className="mt-1 text-xl font-bold text-navy">{T(c.title)}</h3>
            <Button asChild className="mt-5 w-fit rounded-full bg-gold text-gold-foreground hover:bg-gold/90">
              <Link to={c.to}>{T(c.cta)} <ArrowRight /></Link>
            </Button>
          </div>
        ))}
      </section>

      <SiteFooter />
    </main>
  );
}
