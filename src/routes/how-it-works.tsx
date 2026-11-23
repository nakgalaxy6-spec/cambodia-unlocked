import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Compass, BookOpen, Users, Map, MessageCircle, HeartHandshake, ArrowRight, ArrowDown, Check, Luggage, Store, BadgeCheck, Crown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionHeading } from "@/components/site/Section";
import { img } from "@/lib/images";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Cambodia Unlocked Works – Travelers, Guides & Businesses" },
      { name: "description", content: "Six simple steps connecting travelers, tour guides, local businesses and communities in Siem Reap, plus our free and premium plans." },
      { property: "og:title", content: "How Cambodia Unlocked Works" },
      { property: "og:description", content: "Connecting travelers, guides, businesses, and communities in one platform." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorks,
});

type Pair = readonly [string, string];

type Step = { icon: LucideIcon; title: Pair; intro: Pair; items: Pair[]; cta?: { label: Pair; to: "/explore" | "/stories" | "/guides" | "/dashboard" | "/businesses" } };

const steps: Step[] = [
  {
    icon: Compass, title: ["Discover Cambodia", "ស្វែងយល់ពីកម្ពុជា"], intro: ["Traveler explores:", "អ្នកដំណើរស្វែងរក៖"],
    items: [["Destinations", "គោលដៅ"], ["Community Stories", "រឿងរ៉ាវសហគមន៍"], ["Events", "ព្រឹត្តិការណ៍"], ["Tour Guides", "មគ្គុទ្ទេសក៍ទេសចរណ៍"], ["Businesses", "អាជីវកម្ម"]],
    cta: { label: ["Explore", "ស្វែងរក"], to: "/explore" },
  },
  {
    icon: BookOpen, title: ["Learn Local Stories", "សិក្សារឿងរ៉ាវក្នុងស្រុក"], intro: ["Read:", "អាន៖"],
    items: [["History", "ប្រវត្តិ"], ["Cultural Background", "ប្រវត្តិវប្បធម៌"], ["Community Stories", "រឿងរ៉ាវសហគមន៍"], ["Traveler Tips", "គន្លឹះសម្រាប់អ្នកដំណើរ"]],
    cta: { label: ["View Stories", "មើលរឿងរ៉ាវ"], to: "/stories" },
  },
  {
    icon: Users, title: ["Find Local Experts", "ស្វែងរកអ្នកជំនាញក្នុងស្រុក"], intro: ["Connect with:", "ភ្ជាប់ទំនាក់ទំនងជាមួយ៖"],
    items: [["Tour Guides", "មគ្គុទ្ទេសក៍ទេសចរណ៍"], ["Businesses", "អាជីវកម្ម"], ["Community Providers", "អ្នកផ្តល់សេវាសហគមន៍"]],
    cta: { label: ["Find Guides", "ស្វែងរកមគ្គុទ្ទេសក៍"], to: "/guides" },
  },
  {
    icon: Map, title: ["Plan Your Journey", "រៀបចំដំណើររបស់អ្នក"], intro: ["Use:", "ប្រើប្រាស់៖"],
    items: [["Favorites", "ចំណូលចិត្ត"], ["Trip Planner", "កម្មវិធីរៀបចំដំណើរ"], ["Lok Kru AI", "AI លោកគ្រូ"], ["Saved Experiences", "បទពិសោធន៍ដែលបានរក្សាទុក"]],
    cta: { label: ["Build Trip", "រៀបចំដំណើរ"], to: "/dashboard" },
  },
  {
    icon: MessageCircle, title: ["Contact Providers", "ទាក់ទងអ្នកផ្តល់សេវា"], intro: ["Send inquiries directly. Features:", "ផ្ញើសំណួរដោយផ្ទាល់។ មុខងារ៖"],
    items: [["Inquiry Forms", "ទម្រង់សំណួរ"], ["Messages", "សារ"], ["Calls", "ការហៅទូរសព្ទ"], ["WhatsApp", "WhatsApp"]],
    cta: { label: ["Contact Business", "ទាក់ទងអាជីវកម្ម"], to: "/businesses" },
  },
  {
    icon: HeartHandshake, title: ["Visit & Support Communities", "ទៅលេង និងគាំទ្រសហគមន៍"], intro: ["Travel spending directly benefits:", "ការចំណាយលើការធ្វើដំណើរផ្តល់ផលប្រយោជន៍ផ្ទាល់ដល់៖"],
    items: [["Guides", "មគ្គុទ្ទេសក៍"], ["Families", "គ្រួសារ"], ["Businesses", "អាជីវកម្ម"], ["Communities", "សហគមន៍"]],
  },
];

const travelerFlow: Pair[] = [
  ["Traveler", "អ្នកដំណើរ"], ["Discover Destination", "ស្វែងរកគោលដៅ"], ["Read Story", "អានរឿងរ៉ាវ"], ["Meet Guide", "ជួបមគ្គុទ្ទេសក៍"], ["Find Business", "ស្វែងរកអាជីវកម្ម"],
  ["Send Inquiry", "ផ្ញើសំណួរ"], ["Plan Trip", "រៀបចំដំណើរ"], ["Visit Experience", "ទៅទស្សនាបទពិសោធន៍"], ["Support Local Community", "គាំទ្រសហគមន៍មូលដ្ឋាន"],
];
const businessFlow: Pair[] = [
  ["Business Owner", "ម្ចាស់អាជីវកម្ម"], ["Register", "ចុះឈ្មោះ"], ["Create Profile", "បង្កើតប្រវត្តិរូប"], ["Upload Services", "បញ្ចូលសេវាកម្ម"],
  ["Receive Inquiries", "ទទួលសំណួរ"], ["Respond To Travelers", "ឆ្លើយតបអ្នកដំណើរ"], ["Grow Visibility", "បង្កើនការស្គាល់"], ["Upgrade Premium", "ដំឡើងទៅកញ្ចប់ពិសេស"],
];
const guideFlow: Pair[] = [
  ["Tour Guide", "មគ្គុទ្ទេសក៍"], ["Register", "ចុះឈ្មោះ"], ["Submit Information", "ដាក់ស្នើព័ត៌មាន"], ["Get Verified", "ទទួលការផ្ទៀងផ្ទាត់"],
  ["Create Tours", "បង្កើតដំណើរកម្សាន្ត"], ["Receive Travelers", "ទទួលអ្នកដំណើរ"], ["Build Reputation", "កសាងកេរ្តិ៍ឈ្មោះ"],
];

const premium: { name: Pair; price: Pair }[] = [
  { name: ["Business Premium", "អាជីវកម្មពិសេស"], price: ["$5–$15/month", "$5–$15/ខែ"] },
  { name: ["Guide Pro", "មគ្គុទ្ទេសក៍ Pro"], price: ["$5/month", "$5/ខែ"] },
  { name: ["Promotions", "ការផ្សព្វផ្សាយ"], price: ["$5–$10/campaign", "$5–$10/យុទ្ធនាការ"] },
  { name: ["Sponsored Experiences", "បទពិសោធន៍ឧបត្ថម្ភ"], price: ["$20–$50/campaign", "$20–$50/យុទ្ធនាការ"] },
  { name: ["Future Booking Commission", "កម្រៃជើងសារកក់នាពេលអនាគត"], price: ["5%–10%", "5%–10%"] },
];

function Flow({ title, icon: Icon, items, tone }: { title: string; icon: LucideIcon; items: Pair[]; tone: "teal" | "gold" | "navy" }) {
  const { t } = useI18n();
  const chip = tone === "teal" ? "bg-teal-soft text-navy" : tone === "gold" ? "bg-gold-soft text-navy" : "bg-secondary text-navy";
  return (
    <div className="rounded-3xl border bg-card p-6 shadow-card">
      <p className="flex items-center gap-2 font-display text-lg font-semibold text-navy"><Icon className="size-5 text-teal" /> {title}</p>
      <ol className="mt-4 flex flex-col items-start gap-1">
        {items.map((s, i) => (
          <li key={s[0] + i} className="flex flex-col items-start">
            <span className={`rounded-full px-3 py-1.5 text-sm font-medium ${i === 0 ? "bg-navy text-navy-foreground" : chip}`}>{t(s[0], s[1])}</span>
            {i < items.length - 1 && <ArrowDown className="my-0.5 ml-4 size-4 text-gold" />}
          </li>
        ))}
      </ol>
    </div>
  );
}

function HowItWorks() {
  const { t } = useI18n();
  const T = (p: Pair) => t(p[0], p[1]);

  return (
    <main>
      {/* HERO */}
      <section className="relative isolate overflow-hidden min-h-[260px] sm:min-h-[340px] flex items-center">
        <img
          src={img.bike}
          alt={t("Cycling through the Siem Reap countryside", "ជិះកង់កាត់ជនបទសៀមរាប")}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_right] sm:object-right"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/85 sm:via-navy/70 to-navy/35 dark:from-navy-dark/95 dark:via-navy-dark/85 dark:to-navy-dark/40" />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
          <p className="font-script text-2xl text-gold">{t("Simple, local, direct", "សាមញ្ញ ក្នុងស្រុក ផ្ទាល់")}</p>
          <h1 className="mt-2 max-w-2xl text-3xl font-extrabold leading-[1.1] text-navy-foreground sm:text-4xl md:text-5xl">
            {t("How Cambodia Unlocked Works", "របៀបដែល Cambodia Unlocked ដំណើរការ")}
          </h1>
          <p className="mt-3 max-w-xl text-base sm:text-lg text-navy-foreground/90">
            {t("Connecting travelers, guides, businesses, and communities in one platform.", "ភ្ជាប់អ្នកដំណើរ មគ្គុទ្ទេសក៍ អាជីវកម្ម និងសហគមន៍នៅលើវេទិកាតែមួយ។")}
          </p>
        </div>
      </section>

      {/* STEPS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading eyebrow={t("Six steps", "ប្រាំមួយជំហាន")} title={t("From discovery to community impact", "ពីការស្វែងរក ដល់ផលប៉ះពាល់សហគមន៍")} />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title[0]} className="flex flex-col rounded-2xl border bg-card p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-teal text-primary-foreground"><s.icon className="size-5" /></span>
                <span className="text-xs font-semibold uppercase tracking-widest text-gold">{t(`Step ${i + 1}`, `ជំហានទី ${i + 1}`)}</span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-navy">{T(s.title)}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{T(s.intro)}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <li key={it[0]} className="inline-flex items-center gap-1 rounded-full bg-teal-soft px-2.5 py-1 text-xs font-medium text-navy"><Check className="size-3 text-teal" /> {T(it)}</li>
                ))}
              </ul>
              {s.cta && (
                <Button asChild className="mt-5 w-fit rounded-full bg-gold text-gold-foreground hover:bg-gold/90">
                  <Link to={s.cta.to}>{T(s.cta.label)} <ArrowRight /></Link>
                </Button>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* VISUAL FLOW */}
      <section className="bg-navy py-16 text-navy-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">{t("Visual flow", "លំហូរដំណើរ")}</p>
          <h2 className="mt-1 text-2xl font-bold md:text-3xl">{t("The traveler journey", "ដំណើររបស់អ្នកដំណើរ")}</h2>
          <ol className="mt-6 flex flex-wrap items-center gap-2">
            {travelerFlow.map((s, i) => (
              <li key={s[0]} className="flex items-center gap-2">
                <span className={`rounded-full px-3 py-1.5 text-sm font-medium ${i === travelerFlow.length - 1 ? "bg-gold text-gold-foreground" : "bg-navy-foreground/10"}`}>{T(s)}</span>
                {i < travelerFlow.length - 1 && <ArrowRight className="size-4 text-gold" />}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ROLE FLOWS */}
      <section className="mx-auto grid max-w-7xl gap-5 px-6 py-16 md:grid-cols-3">
        <Flow title={t("Traveler flow", "លំហូរអ្នកដំណើរ")} icon={Luggage} items={travelerFlow} tone="teal" />
        <Flow title={t("Business flow", "លំហូរអាជីវកម្ម")} icon={Store} items={businessFlow} tone="gold" />
        <Flow title={t("Guide flow", "លំហូរមគ្គុទ្ទេសក៍")} icon={BadgeCheck} items={guideFlow} tone="navy" />
      </section>

      {/* REVENUE MODEL */}
      <section className="bg-sand py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow={t("Revenue model", "គំរូចំណូល")} title={t("Free to start. Premium to grow.", "ចាប់ផ្តើមដោយឥតគិតថ្លៃ។ ពិសេសដើម្បីរីកចម្រើន។")} />
          <div className="grid gap-5 lg:grid-cols-[1fr_1.6fr]">
            <div className="rounded-3xl border bg-card p-6 shadow-card">
              <p className="text-xs font-semibold uppercase tracking-widest text-teal">{t("Free", "ឥតគិតថ្លៃ")}</p>
              <p className="mt-2 font-display text-4xl font-bold text-navy">$0</p>
              <ul className="mt-4 space-y-2">
                {([["Traveler Access", "ការចូលប្រើសម្រាប់អ្នកដំណើរ"], ["Business Listings", "ការចុះបញ្ជីអាជីវកម្ម"], ["Guide Listings", "ការចុះបញ្ជីមគ្គុទ្ទេសក៍"]] as const).map((x) => (
                  <li key={x[0]} className="flex items-center gap-2 text-sm text-navy"><Check className="size-4 text-success" /> {T(x)}</li>
                ))}
              </ul>
              <Button asChild className="mt-6 rounded-full bg-teal text-primary-foreground hover:bg-teal/90">
                <Link to="/join">{t("List your business free", "ចុះបញ្ជីអាជីវកម្មឥតគិតថ្លៃ")}</Link>
              </Button>
            </div>
            <div className="rounded-3xl bg-navy p-6 text-navy-foreground shadow-card">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold"><Crown className="size-4" /> {t("Premium", "ពិសេស")}</p>
              <ul className="mt-4 divide-y divide-navy-foreground/10">
                {premium.map((p) => (
                  <li key={p.name[0]} className="flex items-center justify-between gap-4 py-3">
                    <span className="font-medium">{T(p.name)}</span>
                    <span className="rounded-full bg-gold px-3 py-1 text-sm font-semibold text-gold-foreground">{T(p.price)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-navy-foreground/60">{t("Booking commission is planned for a future phase.", "កម្រៃជើងសារលើការកក់ត្រូវបានគ្រោងសម្រាប់ដំណាក់កាលអនាគត។")}</p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
