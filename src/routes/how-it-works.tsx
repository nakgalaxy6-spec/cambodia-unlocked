import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Compass,
  BookOpen,
  Users,
  Map,
  MessageCircle,
  HeartHandshake,
  ArrowRight,
  Check,
  Crown,
  Star,
  BadgeCheck,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Eye,
  Phone,
  MessageSquare,
  Building,
  CheckCircle2,
  Info,
  Rocket,
  Store,
  Luggage,
  ArrowDown,
  Globe,
  Database,
  Smartphone,
  Server,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionHeading } from "@/components/site/Section";
import { InquiryDialog } from "@/components/site/InquiryDialog";
import { img } from "@/lib/images";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Cambodia Unlocked Works – Premium Plans & Revenue Model" },
      {
        name: "description",
        content:
          "Free to start, premium to grow. Clear value and transparent monetization for travelers, local businesses, and tour guides in Siem Reap.",
      },
      { property: "og:title", content: "How Cambodia Unlocked Works – Premium Plans & Revenue Ecosystem" },
      {
        property: "og:description",
        content:
          "Transparent subscription models and visibility packages for travelers, businesses, and certified local guides.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HowItWorks,
});

type Pair = readonly [string, string];

type Step = {
  icon: LucideIcon;
  title: Pair;
  intro: Pair;
  items: Pair[];
  cta?: { label: Pair; to: "/explore" | "/stories" | "/guides" | "/dashboard" | "/businesses" };
};

const steps: Step[] = [
  {
    icon: Compass,
    title: ["Discover Cambodia", "ស្វែងយល់ពីកម្ពុជា"],
    intro: ["Traveler explores:", "អ្នកដំណើរស្វែងរក៖"],
    items: [
      ["Destinations", "គោលដៅ"],
      ["Community Stories", "រឿងរ៉ាវសហគមន៍"],
      ["Events", "ព្រឹត្តិការណ៍"],
      ["Tour Guides", "មគ្គុទ្ទេសក៍ទេសចរណ៍"],
      ["Businesses", "អាជីវកម្ម"],
    ],
    cta: { label: ["Explore", "ស្វែងរក"], to: "/explore" },
  },
  {
    icon: BookOpen,
    title: ["Learn Local Stories", "សិក្សារឿងរ៉ាវក្នុងស្រុក"],
    intro: ["Read:", "អាន៖"],
    items: [
      ["History", "ប្រវត្តិ"],
      ["Cultural Background", "ប្រវត្តិវប្បធម៌"],
      ["Community Stories", "រឿងរ៉ាវសហគមន៍"],
      ["Traveler Tips", "គន្លឹះសម្រាប់អ្នកដំណើរ"],
    ],
    cta: { label: ["View Stories", "មើលរឿងរ៉ាវ"], to: "/stories" },
  },
  {
    icon: Users,
    title: ["Find Local Experts", "ស្វែងរកអ្នកជំនាញក្នុងស្រុក"],
    intro: ["Connect with:", "ភ្ជាប់ទំនាក់ទំនងជាមួយ៖"],
    items: [
      ["Tour Guides", "មគ្គុទ្ទេសក៍ទេសចរណ៍"],
      ["Businesses", "អាជីវកម្ម"],
      ["Community Providers", "អ្នកផ្តល់សេវាសហគមន៍"],
    ],
    cta: { label: ["Find Guides", "ស្វែងរកមគ្គុទ្ទេសក៍"], to: "/guides" },
  },
  {
    icon: Map,
    title: ["Plan Your Journey", "រៀបចំដំណើររបស់អ្នក"],
    intro: ["Use:", "ប្រើប្រាស់៖"],
    items: [
      ["Favorites", "ចំណូលចិត្ត"],
      ["Trip Planner", "កម្មវិធីរៀបចំដំណើរ"],
      ["Lok Kru AI", "AI លោកគ្រូ"],
      ["Saved Experiences", "បទពិសោធន៍ដែលបានរក្សាទុក"],
    ],
    cta: { label: ["Build Trip", "រៀបចំដំណើរ"], to: "/dashboard" },
  },
  {
    icon: MessageCircle,
    title: ["Contact Providers", "ទាក់ទងអ្នកផ្តល់សេវា"],
    intro: ["Send inquiries directly. Features:", "ផ្ញើសំណួរដោយផ្ទាល់។ មុខងារ៖"],
    items: [
      ["Inquiry Forms", "ទម្រង់សំណួរ"],
      ["Messages", "សារ"],
      ["Calls", "ការហៅទូរសព្ទ"],
      ["WhatsApp", "WhatsApp"],
    ],
    cta: { label: ["Contact Business", "ទាក់ទងអាជីវកម្ម"], to: "/businesses" },
  },
  {
    icon: HeartHandshake,
    title: ["Visit & Support Communities", "ទៅលេង និងគាំទ្រសហគមន៍"],
    intro: ["Travel spending directly benefits:", "ការចំណាយលើការធ្វើដំណើរផ្តល់ផលប្រយោជន៍ផ្ទាល់ដល់៖"],
    items: [
      ["Guides", "មគ្គុទ្ទេសក៍"],
      ["Families", "គ្រួសារ"],
      ["Businesses", "អាជីវកម្ម"],
      ["Communities", "សហគមន៍"],
    ],
  },
];

const travelerFlow: Pair[] = [
  ["Traveler", "អ្នកដំណើរ"],
  ["Discover Destination", "ស្វែងរកគោលដៅ"],
  ["Read Story", "អានរឿងរ៉ាវ"],
  ["Meet Guide", "ជួបមគ្គុទ្ទេសក៍"],
  ["Find Business", "ស្វែងរកអាជីវកម្ម"],
  ["Send Inquiry", "ផ្ញើសំណួរ"],
  ["Plan Trip", "រៀបចំដំណើរ"],
  ["Visit Experience", "ទៅទស្សនាបទពិសោធន៍"],
  ["Support Local Community", "គាំទ្រសហគមន៍មូលដ្ឋាន"],
];

const businessFlow: Pair[] = [
  ["Business Owner", "ម្ចាស់អាជីវកម្ម"],
  ["Register", "ចុះឈ្មោះ"],
  ["Create Profile", "បង្កើតប្រវត្តិរូប"],
  ["Upload Services", "បញ្ចូលសេវាកម្ម"],
  ["Receive Inquiries", "ទទួលសំណួរភ្ញៀវ"],
  ["Respond To Travelers", "ឆ្លើយតបអ្នកដំណើរ"],
  ["Grow Visibility", "ពង្រីកការស្គាល់"],
  ["Upgrade Premium", "ដំឡើងគម្រោង Premium"],
];

const guideFlow: Pair[] = [
  ["Tour Guide", "មគ្គុទ្ទេសក៍ទេសចរណ៍"],
  ["Register", "ចុះឈ្មោះ"],
  ["Submit Information", "ដាក់ឯកសារព័ត៌មាន"],
  ["Get Verified", "ទទួលការផ្ទៀងផ្ទាត់ផ្លូវការ"],
  ["Create Tours", "បង្កើតកញ្ចប់ដំណើរ"],
  ["Receive Travelers", "ទទួលស្វាគមន៍ភ្ញៀវ"],
  ["Build Reputation", "កសាងកេរ្តិ៍ឈ្មោះ និងកិត្តិនាម"],
];

const comparisonRows: {
  feature: Pair;
  freeTraveler: Pair;
  travelerPremium: Pair;
  bizPremium: Pair;
  guideVisibility: Pair;
}[] = [
  {
    feature: ["Browse Destinations", "ស្វែងរកគោលដៅនានា"],
    freeTraveler: ["✅", "✅"],
    travelerPremium: ["✅", "✅"],
    bizPremium: ["✅", "✅"],
    guideVisibility: ["✅", "✅"],
  },
  {
    feature: ["Save Favorites", "រក្សាទុកចំណូលចិត្ត"],
    freeTraveler: ["Limited (Up to 10)", "កម្រិតកំណត់ (រហូតដល់ ១០)"],
    travelerPremium: ["Unlimited ⭐️", "មិនកំណត់ ⭐️"],
    bizPremium: ["❌", "❌"],
    guideVisibility: ["❌", "❌"],
  },
  {
    feature: ["Personalized Recommendations", "ការណែនាំតាមបំណង"],
    freeTraveler: ["❌", "❌"],
    travelerPremium: ["✅ ⭐️", "✅ ⭐️"],
    bizPremium: ["❌", "❌"],
    guideVisibility: ["❌", "❌"],
  },
  {
    feature: ["Hidden Gems Collection", "កន្លែងកម្រស្គាល់ពិសេស"],
    freeTraveler: ["❌", "❌"],
    travelerPremium: ["✅ ⭐️", "✅ ⭐️"],
    bizPremium: ["❌", "❌"],
    guideVisibility: ["❌", "❌"],
  },
  {
    feature: ["Featured Placement", "ការបង្ហាញលេចធ្លោលើគេ"],
    freeTraveler: ["❌", "❌"],
    travelerPremium: ["❌", "❌"],
    bizPremium: ["✅ ⭐️", "✅ ⭐️"],
    guideVisibility: ["✅ ⭐️", "✅ ⭐️"],
  },
  {
    feature: ["Verification Badge", "ផ្លាកសញ្ញាផ្ទៀងផ្ទាត់"],
    freeTraveler: ["❌", "❌"],
    travelerPremium: ["Premium Badge", "ផ្លាកសញ្ញា Premium"],
    bizPremium: ["✅ ⭐️", "✅ ⭐️"],
    guideVisibility: ["✅ ⭐️", "✅ ⭐️"],
  },
  {
    feature: ["Analytics Dashboard", "ផ្ទាំងវិភាគទិន្នន័យ"],
    freeTraveler: ["❌", "❌"],
    travelerPremium: ["Basic", "កម្រិតមូលដ្ឋាន"],
    bizPremium: ["✅ ⭐️", "✅ ⭐️"],
    guideVisibility: ["❌", "❌"],
  },
  {
    feature: ["Event Promotion Tools", "ការផ្សព្វផ្សាយព្រឹត្តិការណ៍"],
    freeTraveler: ["❌", "❌"],
    travelerPremium: ["❌", "❌"],
    bizPremium: ["✅ ⭐️", "✅ ⭐️"],
    guideVisibility: ["❌", "❌"],
  },
  {
    feature: ["Search Priority", "អាទិភាពក្នុងលទ្ធផលស្វែងរក"],
    freeTraveler: ["❌", "❌"],
    travelerPremium: ["❌", "❌"],
    bizPremium: ["✅ ⭐️", "✅ ⭐️"],
    guideVisibility: ["✅ ⭐️", "✅ ⭐️"],
  },
  {
    feature: ["Extra Photos", "បញ្ចូលរូបថតបន្ថែម"],
    freeTraveler: ["❌", "❌"],
    travelerPremium: ["❌", "❌"],
    bizPremium: ["✅ (Up to 30)", "✅ (រហូតដល់ ៣០)"],
    guideVisibility: ["✅ ⭐️", "✅ ⭐️"],
  },
  {
    feature: ["Video Uploads", "បញ្ចូលវីដេអូណែនាំ"],
    freeTraveler: ["❌", "❌"],
    travelerPremium: ["❌", "❌"],
    bizPremium: ["✅ ⭐️", "✅ ⭐️"],
    guideVisibility: ["✅ ⭐️", "✅ ⭐️"],
  },
  {
    feature: ["Customer Inquiry Management", "ការគ្រប់គ្រងសំណួរអតិថិជន"],
    freeTraveler: ["❌", "❌"],
    travelerPremium: ["Inquiry History", "ប្រវត្តិសំណួរ"],
    bizPremium: ["✅ Full CRM", "✅ CRM ពេញលេញ"],
    guideVisibility: ["Direct Phone/WA", "ទូរសព្ទ/WA ផ្ទាល់"],
  },
  {
    feature: ["Premium Support", "សេវាជំនួយពិសេស"],
    freeTraveler: ["❌", "❌"],
    travelerPremium: ["✅ ⭐️", "✅ ⭐️"],
    bizPremium: ["✅ Priority", "✅ អាទិភាព"],
    guideVisibility: ["✅ ⭐️", "✅ ⭐️"],
  },
];

const revenueStreams: {
  num: string;
  name: Pair;
  price: Pair;
  desc: Pair;
  highlight?: boolean;
}[] = [
  {
    num: "1",
    name: ["Business Premium Subscription", "ការជាវអាជីវកម្មកម្រិត Premium"],
    price: ["$5–$15/month", "$5–$15/ខែ"],
    desc: [
      "Enhanced listings, analytics dashboard, event promotions, lead tracking, and marketing tools.",
      "ការចុះបញ្ជីកម្រិតខ្ពស់ ផ្ទាំងវិភាគទិន្នន័យ ការផ្សព្វផ្សាយព្រឹត្តិការណ៍ និងការគ្រប់គ្រងអតិថិជន។",
    ],
  },
  {
    num: "2",
    name: ["Traveler Premium Subscription", "ការជាវអ្នកដំណើរកម្រិត Premium"],
    price: ["$2.99/month", "$2.99/ខែ"],
    desc: [
      "Unlimited favorites, personalized trip planner, hidden gems collection, offline guides, and exclusive discounts.",
      "រក្សាទុកចំណូលចិត្តមិនកំណត់ គម្រោងធ្វើដំណើរផ្ទាល់ខ្លួន កន្លែងកម្សាន្តលាក់មុខពិសេស និងការបញ្ចុះតម្លៃផ្តាច់មុខ។",
    ],
    highlight: true,
  },
  {
    num: "3",
    name: ["Featured Guide Package", "កញ្ចប់មគ្គុទ្ទេសក៍លេចធ្លោ"],
    price: ["$5/month", "$5/ខែ"],
    desc: [
      "Homepage placement, top search rank, larger profile card, video intro, and priority traveler inquiries.",
      "បង្ហាញលើទំព័រដើម ចំណាត់ថ្នាក់ស្វែងរកកំពូល កាតប្រវត្តិរូបធំ វីដេអូណែនាំ និងទទួលសំណួរអាទិភាព។",
    ],
  },
  {
    num: "4",
    name: ["Verified Guide Package", "កញ្ចប់មគ្គុទ្ទេសក៍ផ្ទៀងផ្ទាត់ផ្លូវការ"],
    price: ["$10–$20/year", "$10–$20/ឆ្នាំ"],
    desc: [
      "Official ID, phone & tour license verification with trusted badge and enhanced traveler credibility.",
      "ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ ទូរសព្ទ និងអាជ្ញាប័ណ្ណទេសចរណ៍ ជាមួយផ្លាកសញ្ញាទំនុកចិត្តខ្ពស់។",
    ],
  },
  {
    num: "5",
    name: ["Sponsored Experiences", "បទពិសោធន៍ឧបត្ថម្ភ"],
    price: ["$20–$50/campaign", "$20–$50/យុទ្ធនាការ"],
    desc: [
      "Targeted campaign placement on homepage and destination pages with live analytics tracking.",
      "ការបង្ហាញយុទ្ធនាការគោលដៅនៅលើទំព័រដើម និងទំព័រតំបន់ទេសចរណ៍ ជាមួយរបាយការណ៍លទ្ធផល។",
    ],
  },
  {
    num: "6",
    name: ["Event Promotion Packages", "កញ្ចប់ផ្សព្វផ្សាយព្រឹត្តិការណ៍"],
    price: ["Paid Featured Listings", "ការចុះបញ្ជីព្រឹត្តិការណ៍លេចធ្លោ"],
    desc: [
      "Promote cultural festivals, workshops, culinary popups, and community activities to travelers.",
      "ផ្សព្វផ្សាយពិធីបុណ្យវប្បធម៌ សិក្ខាសាលា អាហារ និងសកម្មភាពសហគមន៍ឱ្យមានអ្នកចូលរួមច្រើន។",
    ],
  },
  {
    num: "7",
    name: ["Booking Commission (Future Phase)", "កម្រៃជើងសារលើការកក់ (ដំណាក់កាលអនាគត)"],
    price: ["5%–10%", "5%–10%"],
    desc: [
      "Applied to online tour reservations, boutique hotels, tuk-tuk transport, and guided activities.",
      "អនុវត្តលើការកក់ដំណើរកម្សាន្តតាមអ៊ីនធឺណិត សណ្ឋាគារ ការដឹកជញ្ជូនរ៉ឺម៉កកង់បី និងសកម្មភាពនានា។",
    ],
  },
];

const roadmapPhases: {
  phase: Pair;
  tag: Pair;
  status: "current" | "next" | "future";
  items: Pair[];
}[] = [
  {
    phase: ["Phase 1 (Current MVP)", "ដំណាក់កាលទី ១ (MVP បច្ចុប្បន្ន)"],
    tag: ["Live Now", "កំពុងដំណើរការ"],
    status: "current",
    items: [
      ["Tourism Discovery Website", "គេហទំព័រស្វែងរកគោលដៅទេសចរណ៍"],
      ["Business Directory", "បញ្ជីឈ្មោះអាជីវកម្មក្នុងស្រុក"],
      ["Traveler Accounts", "គណនីអ្នកដំណើរ"],
      ["Business Owner Accounts", "គណនីម្ចាស់អាជីវកម្ម"],
      ["Premium Subscriptions", "ការជាវកញ្ចប់ Premium"],
      ["Events Platform", "វេទិកាផ្សព្វផ្សាយព្រឹត្តិការណ៍"],
      ["Tour Guide Profiles", "ប្រវត្តិរូបមគ្គុទ្ទេសក៍ទេសចរណ៍"],
    ],
  },
  {
    phase: ["Phase 2", "ដំណាក់កាលទី ២"],
    tag: ["In Development", "កំពុងអភិវឌ្ឍ"],
    status: "next",
    items: [
      ["Advanced Analytics", "ផ្ទាំងវិភាគទិន្នន័យកម្រិតខ្ពស់"],
      ["Sponsored Promotions", "យុទ្ធនាការផ្សព្វផ្សាយឧបត្ថម្ភ"],
      ["Featured Guides", "កម្មវិធីមគ្គុទ្ទេសក៍លេចធ្លោ"],
      ["Verification Program", "កម្មវិធីផ្ទៀងផ្ទាត់ផ្លូវការ"],
    ],
  },
  {
    phase: ["Phase 3", "ដំណាក់កាលទី ៣"],
    tag: ["Planned", "គ្រោងទុក"],
    status: "future",
    items: [
      ["Mobile Application", "កម្មវិធីទូរសព្ទដៃ (iOS & Android)"],
      ["AI Travel Recommendations", "ការណែនាំការធ្វើដំណើរឆ្លាតវៃដោយ AI"],
      ["Offline Travel Features", "មុខងារប្រើប្រាស់ដោយគ្មានអ៊ីនធឺណិត"],
    ],
  },
  {
    phase: ["Phase 4", "ដំណាក់កាលទី ៤"],
    tag: ["Future Scale", "ការពង្រីកនាពេលអនាគត"],
    status: "future",
    items: [
      ["Online Booking System", "ប្រព័ន្ធកក់តាមអ៊ីនធឺណិត"],
      ["Tour Reservations", "ការកក់ដំណើរកម្សាន្តផ្ទាល់"],
      ["Tuk Tuk Reservations", "ការកក់រ៉ឺម៉កកង់បី"],
      ["Hotel Reservations", "ការកក់សណ្ឋាគារ និងផ្ទះស្នាក់"],
      ["Commission Revenue System", "ប្រព័ន្ធកម្រៃជើងសារស្វ័យប្រវត្តិ"],
    ],
  },
];

function HowItWorks() {
  const { t } = useI18n();
  const T = (p: Pair) => t(p[0], p[1]);

  return (
    <main>
      {/* HERO */}
      <section className="relative isolate overflow-hidden min-h-[260px] sm:min-h-[340px] flex items-center">
        <img
          src={img.hero}
          alt={t("Angkor Wat at sunrise reflected in a lotus pond", "ប្រាសាទអង្គរវត្តពេលថ្ងៃរះ ឆ្លុះក្នុងស្រះឈូក")}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/85 sm:via-navy/70 to-navy/35 dark:from-navy-dark/95 dark:via-navy-dark/85 dark:to-navy-dark/40" />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
          <p className="font-script text-2xl text-gold">{t("Simple, local, direct", "សាមញ្ញ ក្នុងស្រុក ផ្ទាល់")}</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold leading-[1.1] text-navy-foreground sm:text-4xl md:text-5xl">
            {t("How Cambodia Unlocked Works", "របៀបដែល Cambodia Unlocked ដំណើរការ")}
          </h1>
          <p className="mt-3 max-w-2xl text-base sm:text-lg text-navy-foreground/90">
            {t(
              "A transparent, sustainable ecosystem connecting travelers, licensed local guides, community businesses, and destinations across Siem Reap.",
              "ប្រព័ន្ធអេកូឡូស៊ីប្រកបដោយតម្លាភាព និងនិរន្តរភាព ដែលភ្ជាប់អ្នកដំណើរ មគ្គុទ្ទេសក៍ក្នុងស្រុកមានអាជ្ញាប័ណ្ណ អាជីវកម្មសហគមន៍ និងគោលដៅទេសចរណ៍ទូទាំងខេត្តសៀមរាប។",
            )}
          </p>
        </div>
      </section>

      {/* THREE USER GROUPS ARCHITECTURE CALLOUT */}
      <section className="mx-auto max-w-7xl px-6 pt-12 pb-4">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="flex items-start gap-3.5 rounded-2xl border bg-card p-5 shadow-card">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal-soft text-navy">
              <Luggage className="size-5 text-teal" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-teal">{t("User Group 1", "ក្រុមអ្នកប្រើប្រាស់ ១")}</p>
              <h3 className="font-bold text-navy">{t("Traveler Accounts", "គណនីអ្នកដំណើរ")}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("Free exploration or $2.99/mo Traveler Premium for unlimited favorites, hidden gems & planner.", "រុករកដោយឥតគិតថ្លៃ ឬជាវ $2.99/ខែ សម្រាប់មុខងារពិសេសៗ។")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-2xl border bg-card p-5 shadow-card">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold-soft text-navy">
              <Store className="size-5 text-gold" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">{t("User Group 2", "ក្រុមអ្នកប្រើប្រាស់ ២")}</p>
              <h3 className="font-bold text-navy">{t("Business Owner Accounts", "គណនីម្ចាស់អាជីវកម្ម")}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("Free listings or $5–$15/mo Business Premium with analytics, leads CRM & homepage promotions.", "ចុះបញ្ជីឥតគិតថ្លៃ ឬជាវ $5–$15/ខែ ជាមួយផ្ទាំងវិភាគ និងផ្សព្វផ្សាយ។")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 rounded-2xl border bg-card p-5 shadow-card">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-secondary text-navy">
              <BadgeCheck className="size-5 text-teal" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-teal">{t("User Group 3", "ក្រុមអ្នកប្រើប្រាស់ ៣")}</p>
              <h3 className="font-bold text-navy">{t("Tour Guide Profiles", "ប្រវត្តិរូបមគ្គុទ្ទេសក៍")}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("No account or dashboard required. Manually managed profiles + affordable visibility packages.", "មិនចាំបាច់មានគណនី ឬផ្ទាំងគ្រប់គ្រងទេ។ គ្រប់គ្រងផ្ទាល់ដោយ Cambodia Unlocked។")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SIX STEPS */}
      <section className="mx-auto max-w-7xl px-6 py-12">
        <SectionHeading
          eyebrow={t("Six steps", "ប្រាំមួយជំហាន")}
          title={t("From discovery to community impact", "ពីការស្វែងរក ដល់ផលប៉ះពាល់សហគមន៍")}
        />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((s, i) => (
            <li key={s.title[0]} className="flex flex-col rounded-2xl border bg-card p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-xl bg-teal text-primary-foreground">
                  <s.icon className="size-5" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                  {t(`Step ${i + 1}`, `ជំហានទី ${i + 1}`)}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold text-navy">{T(s.title)}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{T(s.intro)}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.items.map((it) => (
                  <li
                    key={it[0]}
                    className="inline-flex items-center gap-1 rounded-full bg-teal-soft px-2.5 py-1 text-xs font-medium text-navy"
                  >
                    <Check className="size-3 text-teal" /> {T(it)}
                  </li>
                ))}
              </ul>
              {s.cta && (
                <Button asChild className="mt-5 w-fit rounded-full bg-gold text-gold-foreground hover:bg-gold/90">
                  <Link to={s.cta.to}>
                    {T(s.cta.label)} <ArrowRight />
                  </Link>
                </Button>
              )}
            </li>
          ))}
        </ol>
      </section>

      {/* USER FLOWS & ECOSYSTEM ARCHITECTURE (FROM USER SPECIFICATION) */}
      <section className="bg-slate-50 dark:bg-card/40 py-16 border-y border-border/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-3.5 py-1 text-xs font-bold text-teal">
              <Sparkles className="size-3.5 text-teal" /> {t("Ecosystem Architecture", "ស្ថាបត្យកម្មប្រព័ន្ធអេកូឡូស៊ី")}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
              {t("Three User Flows Working Together", "លំហូរការងារទាំង ៣ ដែលមានទំនាក់ទំនងគ្នា")}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">
              {t(
                "How Travelers, Local Businesses, and Tour Guides seamlessly connect and create shared community value.",
                "របៀបដែលអ្នកដំណើរ អាជីវកម្មក្នុងស្រុក និងមគ្គុទ្ទេសក៍ទេសចរណ៍ ភ្ជាប់ទំនាក់ទំនងគ្នា និងបង្កើតតម្លៃសហគមន៍។",
              )}
            </p>
          </div>

          {/* 3 USER FLOW CARDS (MATCHING USER DIAGRAM) */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* CARD 1: TRAVELER FLOW */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card hover:shadow-lift transition-all">
              <div className="flex items-center gap-2.5 mb-6">
                <span className="grid size-9 place-items-center rounded-xl bg-teal-soft text-teal">
                  <Luggage className="size-5" />
                </span>
                <h3 className="font-bold text-lg text-navy">{t("Traveler flow", "លំហូរអ្នកដំណើរ")}</h3>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-navy px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-sm">
                  {T(travelerFlow[0] ?? ["Traveler", "អ្នកដំណើរ"])}
                </div>

                {travelerFlow.slice(1).map((step, idx) => (
                  <div key={step[0]} className="flex flex-col items-center w-full">
                    <ArrowDown className="size-3.5 text-amber-500 my-1" />
                    <div className="w-full text-center rounded-2xl bg-cyan-50/80 dark:bg-cyan-950/40 border border-cyan-200/60 dark:border-cyan-800/40 px-4 py-2 text-xs sm:text-sm font-semibold text-cyan-900 dark:text-cyan-200 shadow-xs">
                      {T(step)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 2: BUSINESS FLOW */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card hover:shadow-lift transition-all">
              <div className="flex items-center gap-2.5 mb-6">
                <span className="grid size-9 place-items-center rounded-xl bg-gold-soft text-gold-foreground">
                  <Store className="size-5 text-amber-600" />
                </span>
                <h3 className="font-bold text-lg text-navy">{t("Business flow", "លំហូរអាជីវកម្ម")}</h3>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-navy px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-sm">
                  {T(businessFlow[0] ?? ["Business Owner", "ម្ចាស់អាជីវកម្ម"])}
                </div>

                {businessFlow.slice(1).map((step) => (
                  <div key={step[0]} className="flex flex-col items-center w-full">
                    <ArrowDown className="size-3.5 text-amber-500 my-1" />
                    <div className="w-full text-center rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40 px-4 py-2 text-xs sm:text-sm font-semibold text-amber-900 dark:text-amber-200 shadow-xs">
                      {T(step)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CARD 3: GUIDE FLOW */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card hover:shadow-lift transition-all">
              <div className="flex items-center gap-2.5 mb-6">
                <span className="grid size-9 place-items-center rounded-xl bg-sky-50 dark:bg-sky-950/60 text-sky-600">
                  <BadgeCheck className="size-5" />
                </span>
                <h3 className="font-bold text-lg text-navy">{t("Guide flow", "លំហូរមគ្គុទ្ទេសក៍")}</h3>
              </div>

              <div className="flex flex-col items-center space-y-2">
                <div className="rounded-full bg-navy px-5 py-2 text-xs sm:text-sm font-bold text-white shadow-sm">
                  {T(guideFlow[0] ?? ["Tour Guide", "មគ្គុទ្ទេសក៍ទេសចរណ៍"])}
                </div>

                {guideFlow.slice(1).map((step) => (
                  <div key={step[0]} className="flex flex-col items-center w-full">
                    <ArrowDown className="size-3.5 text-amber-500 my-1" />
                    <div className="w-full text-center rounded-2xl bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200/60 dark:border-sky-800/40 px-4 py-2 text-xs sm:text-sm font-semibold text-sky-900 dark:text-sky-200 shadow-xs">
                      {T(step)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* SECOND ROW: TRAVELER JOURNEY, PLATFORM ARCHITECTURE, BUSINESS MODEL (FROM USER SPEC) */}
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {/* CARD A: TRAVELER JOURNEY */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-teal mb-4">
                  {t("Traveler Journey", "ដំណើររបស់អ្នកដំណើរ")}
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-cyan-100/80 dark:bg-cyan-950/60 px-3 py-1.5 text-xs font-semibold text-cyan-900 dark:text-cyan-200">
                    {t("Traveler", "អ្នកដំណើរ")}
                  </span>
                  <ArrowRight className="size-3.5 text-amber-500" />
                  <span className="rounded-full bg-cyan-100/80 dark:bg-cyan-950/60 px-3 py-1.5 text-xs font-semibold text-cyan-900 dark:text-cyan-200">
                    {t("Explore Destination", "ស្វែងរកគោលដៅ")}
                  </span>
                  <ArrowRight className="size-3.5 text-amber-500" />
                  <span className="rounded-full bg-cyan-100/80 dark:bg-cyan-950/60 px-3 py-1.5 text-xs font-semibold text-cyan-900 dark:text-cyan-200">
                    {t("View History & Story", "មើលប្រវត្តិ & រឿងរ៉ាវ")}
                  </span>
                  <ArrowRight className="size-3.5 text-amber-500" />
                  <span className="rounded-full bg-cyan-100/80 dark:bg-cyan-950/60 px-3 py-1.5 text-xs font-semibold text-cyan-900 dark:text-cyan-200">
                    {t("Discover Business", "ស្វែងរកអាជីវកម្ម")}
                  </span>
                  <ArrowRight className="size-3.5 text-amber-500" />
                  <span className="rounded-full bg-cyan-100/80 dark:bg-cyan-950/60 px-3 py-1.5 text-xs font-semibold text-cyan-900 dark:text-cyan-200">
                    {t("Send Inquiry", "ផ្ញើសំណួរ")}
                  </span>
                  <ArrowRight className="size-3.5 text-amber-500" />
                  <span className="rounded-full bg-cyan-100/80 dark:bg-cyan-950/60 px-3 py-1.5 text-xs font-semibold text-cyan-900 dark:text-cyan-200">
                    {t("Visit Experience", "ទៅទស្សនាបទពិសោធន៍")}
                  </span>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground border-t pt-3">
                {t("100% direct traveler contact with local guides and artisans.", "ទំនាក់ទំនងផ្ទាល់ ១០០% រវាងភ្ញៀវទេសចរ និងមគ្គុទ្ទេសក៍ក្នុងស្រុក។")}
              </p>
            </div>

            {/* CARD B: PLATFORM ARCHITECTURE */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-teal mb-4">
                  {t("Platform Architecture", "ស្ថាបត្យកម្មបច្ចេកវិទ្យាវេទិកា")}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 rounded-xl border bg-muted/30 px-3.5 py-2 text-xs font-bold text-navy">
                    <Globe className="size-4 text-teal" />
                    <span>{t("Website (React / SSR Responsive Web)", "គេហទំព័រ (React / SSR Web)")}</span>
                  </div>
                  <div className="text-center text-amber-500 text-xs">↓</div>
                  <div className="flex items-center gap-2 rounded-xl border bg-muted/30 px-3.5 py-2 text-xs font-bold text-navy">
                    <Server className="size-4 text-teal" />
                    <span>{t("REST API (Fast Server Endpoints)", "REST API (ម៉ាស៊ីនបម្រើ)")}</span>
                  </div>
                  <div className="text-center text-amber-500 text-xs">↓</div>
                  <div className="flex items-center gap-2 rounded-xl border bg-muted/30 px-3.5 py-2 text-xs font-bold text-navy">
                    <Database className="size-4 text-teal" />
                    <span>{t("MySQL Database (Structured Data & Listings)", "MySQL Database (ទិន្នន័យ & បញ្ជី)")}</span>
                  </div>
                  <div className="text-center text-amber-500 text-xs">↓</div>
                  <div className="flex items-center gap-2 rounded-xl border bg-muted/30 px-3.5 py-2 text-xs font-bold text-navy">
                    <Smartphone className="size-4 text-teal" />
                    <span>{t("Android Application (Phase 3 Expansion)", "Android App (ដំណាក់កាលទី ៣)")}</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground border-t pt-3">
                {t("High performance, mobile responsive, and scalable cloud stack.", "ដំណើរការលឿន ងាយស្រួលលើទូរសព្ទដៃ និងអាចពង្រីកបានខ្ពស់។")}
              </p>
            </div>

            {/* CARD C: BUSINESS MODEL */}
            <div className="rounded-3xl border border-border/80 bg-card p-6 shadow-card flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-teal mb-4">
                  {t("Business Model", "គំរូអាជីវកម្ម & ប្រាក់ចំណូល")}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-border/70 p-3 bg-muted/20">
                    <p className="text-xs font-bold text-navy mb-2">
                      {t("Free Business Profile", "ប្រវត្តិរូបឥតគិតថ្លៃ")}
                    </p>
                    <ul className="space-y-1.5 text-[11px] text-muted-foreground">
                      <li className="flex items-center gap-1.5 text-teal">
                        <Check className="size-3" /> {t("Listing", "ការចុះបញ្ជី")}
                      </li>
                      <li className="flex items-center gap-1.5 text-teal">
                        <Check className="size-3" /> {t("Photos", "រូបភាព")}
                      </li>
                      <li className="flex items-center gap-1.5 text-teal">
                        <Check className="size-3" /> {t("Contact Details", "ព័ត៌មានទំនាក់ទំនង")}
                      </li>
                      <li className="flex items-center gap-1.5 text-teal">
                        <Check className="size-3" /> {t("Customer Inquiries", "សំណួរអតិថិជន")}
                      </li>
                    </ul>
                  </div>

                  <div className="rounded-2xl border border-gold/40 p-3 bg-gold-soft/40">
                    <div className="flex items-baseline justify-between mb-2">
                      <p className="text-xs font-bold text-navy">
                        {t("Premium", "កញ្ចប់ Premium")}
                      </p>
                      <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400">$5–15/mo</span>
                    </div>
                    <ul className="space-y-1.5 text-[11px] text-muted-foreground">
                      <li className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-medium">
                        <Check className="size-3" /> {t("Featured Placements", "បង្ហាញលេចធ្លោ")}
                      </li>
                      <li className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-medium">
                        <Check className="size-3" /> {t("Promotions", "ការផ្សព្វផ្សាយ")}
                      </li>
                      <li className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-medium">
                        <Check className="size-3" /> {t("Future Booking Commissions", "កម្រៃជើងសារកក់")}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground border-t pt-3">
                {t("Sustainable revenue allowing 0% commission on direct community artisans.", "ចំណូលនិរន្តរភាពដោយមិនកាត់កម្រៃជើងសារពីសិប្បករសហគមន៍ឡើយ។")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* MASTER SECTION: PREMIUM PLANS PAGE */}
      {/* ========================================================================= */}
      <section id="plans" className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-3.5 py-1 text-xs font-bold text-navy">
            <Crown className="size-3.5 text-gold" /> {t("Pricing & Value", "តម្លៃ និងអត្ថប្រយោជន៍")}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl md:text-5xl">
            {t("Free to Start. Premium to Grow.", "ចាប់ផ្តើមដោយឥតគិតថ្លៃ។ ពិសេសដើម្បីរីកចម្រើន។")}
          </h2>
          <p className="mt-3 text-base sm:text-lg text-muted-foreground">
            {t(
              "Choose the plan that best fits your travel or business journey.",
              "ជ្រើសរើសគម្រោងដែលស័ក្តិសមបំផុតសម្រាប់ដំណើរទេសចរណ៍ ឬអាជីវកម្មរបស់អ្នក។",
            )}
          </p>
        </div>

        {/* 3 CORE PRICING CARDS */}
        <div className="grid gap-6 lg:grid-cols-3 items-stretch">
          {/* PLAN 1: FREE TRAVELER */}
          <div className="flex flex-col justify-between rounded-3xl border bg-card p-6 sm:p-8 shadow-card">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-teal">
                  {t("For Travelers", "សម្រាប់អ្នកដំណើរ")}
                </span>
                <span className="rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-navy">
                  {t("Free Forever", "ឥតគិតថ្លៃរហូត")}
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-bold text-navy">{t("Free Traveler", "អ្នកដំណើរឥតគិតថ្លៃ")}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("Essential features to explore Siem Reap's culture & community.", "មុខងារសំខាន់ៗដើម្បីរុករកវប្បធម៌ និងសហគមន៍សៀមរាប។")}
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold text-navy">$0</span>
                <span className="text-sm text-muted-foreground">/{t("month", "ខែ")}</span>
              </div>

              <div className="mt-6 space-y-2.5 text-sm text-navy">
                {[
                  ["Browse destinations", "ស្វែងរកគោលដៅទេសចរណ៍"],
                  ["Explore local businesses", "ស្វែងយល់ពីអាជីវកម្មក្នុងស្រុក"],
                  ["Read reviews", "អានការវាយតម្លៃពិតប្រាកដ"],
                  ["View tour guides", "មើលបញ្ជីមគ្គុទ្ទេសក៍ទេសចរណ៍"],
                  ["Search attractions", "ស្វែងរកកន្លែងទាក់ទាញសំខាន់ៗ"],
                  ["Access public events", "ចូលមើលព្រឹត្តិការណ៍សាធារណៈ"],
                  ["Save up to 10 favorites", "រក្សាទុកចំណូលចិត្តរហូតដល់ ១០"],
                ].map(([en, km]) => (
                  <div key={en} className="flex items-center gap-2">
                    <Check className="size-4 text-teal shrink-0" />
                    <span>{t(en ?? "", km ?? "")}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button asChild variant="outline" className="mt-8 rounded-full w-full">
              <Link to="/explore">{t("Start Exploring", "ចាប់ផ្តើមស្វែងរក")}</Link>
            </Button>
          </div>

          {/* PLAN 2: TRAVELER PREMIUM */}
          <div className="relative flex flex-col justify-between rounded-3xl border-2 border-gold bg-card p-6 sm:p-8 shadow-card ring-2 ring-gold/20">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 rounded-full bg-gold px-3.5 py-1 text-xs font-bold text-gold-foreground shadow">
              <Crown className="size-3.5" /> {t("Most Popular", "ពេញនិយមបំផុត")}
            </span>
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                  {t("For Curious Travelers", "សម្រាប់អ្នកដំណើរស្រឡាញ់ការរុករក")}
                </span>
                <span className="rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-navy">
                  {t("Traveler Premium", "អ្នកដំណើរ Premium")}
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-bold text-navy">{t("Traveler Premium", "អ្នកដំណើរ Premium")}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("Unlock hidden gems, offline guides, custom itineraries & VIP perks.", "បើកមើលកន្លែងកម្រស្គាល់ មគ្គុទ្ទេសក៍ក្រៅបណ្តាញ និងការបញ្ចុះតម្លៃ។")}
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold text-navy">$2.99</span>
                <span className="text-sm text-muted-foreground">/{t("month", "ខែ")}</span>
              </div>

              <div className="mt-6 space-y-2.5 text-sm text-navy">
                {[
                  ["Unlimited favorites", "រក្សាទុកចំណូលចិត្តមិនកំណត់"],
                  ["Personalized trip planner", "កម្មវិធីរៀបចំដំណើរកម្សាន្តផ្ទាល់ខ្លួន"],
                  ["Hidden Gems Collection", "បណ្តុំកន្លែងទេសចរណ៍កម្រស្គាល់ពិសេស"],
                  ["Premium Cambodia Guides", "មគ្គុទ្ទេសក៍ទេសចរណ៍កម្ពុជាកម្រិត Premium"],
                  ["Personalized recommendations", "ការណែនាំគោលដៅតាមចំណូលចិត្ត"],
                  ["Offline destination guides", "មគ្គុទ្ទេសក៍គោលដៅប្រើដោយគ្មានអ៊ីនធឺណិត"],
                  ["Exclusive discounts", "ការបញ្ចុះតម្លៃ និងការផ្តល់ជូនផ្តាច់មុខ"],
                  ["Event & festival alerts", "ការជូនដំណឹងព្រឹត្តិការណ៍ និងបុណ្យទាន"],
                  ["Multiple travel itineraries", "បង្កើតគម្រោងធ្វើដំណើរបានច្រើន"],
                  ["Premium member badge", "ផ្លាកសញ្ញាសមាជិក Premium"],
                  ["Early access to new experiences", "សិទ្ធិចូលទស្សនាបទពិសោធន៍ថ្មីៗមុនគេ"],
                ].map(([en, km]) => (
                  <div key={en} className="flex items-center gap-2">
                    <Check className="size-4 text-gold shrink-0" />
                    <span>{t(en ?? "", km ?? "")}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button asChild className="mt-8 rounded-full bg-gold text-gold-foreground hover:bg-gold/90 w-full shadow-md font-semibold">
              <Link to="/dashboard">
                <Crown className="size-4" /> {t("Upgrade to Traveler Premium", "ដំឡើងទៅ Traveler Premium")}
              </Link>
            </Button>
          </div>

          {/* PLAN 3: BUSINESS PREMIUM */}
          <div className="relative flex flex-col justify-between rounded-3xl border-2 border-teal/40 bg-card p-6 sm:p-8 shadow-card">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-widest text-teal">
                  {t("For Local Businesses", "សម្រាប់អាជីវកម្មក្នុងស្រុក")}
                </span>
                <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-primary-foreground">
                  👑 {t("Business Premium", "អាជីវកម្ម Premium")}
                </span>
              </div>
              <h3 className="mt-3 text-2xl font-bold text-navy">{t("Business Premium", "អាជីវកម្ម Premium")}</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {t("Grow visibility, track customer inquiries, and drive direct traveler footfall.", "បង្កើនការមើលឃើញ តាមដានសំណួរភ្ញៀវ និងជំរុញការលក់ផ្ទាល់។")}
              </p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold text-navy">$5–$15</span>
                <span className="text-sm text-muted-foreground">/{t("month", "ខែ")}</span>
              </div>

              <div className="mt-6 space-y-2 text-sm text-navy">
                {[
                  ["Homepage featured placement", "ការបង្ហាញលេចធ្លោលើទំព័រដើម"],
                  ["Priority search ranking", "ចំណាត់ថ្នាក់ស្វែងរកកំពូលគេ"],
                  ["Verified business badge", "ផ្លាកសញ្ញាអាជីវកម្មផ្ទៀងផ្ទាត់រួច"],
                  ["Premium business profile", "ទំព័រប្រវត្តិរូបអាជីវកម្មកម្រិតខ្ពស់"],
                  ["Up to 30 photos", "បញ្ចូលរូបថតរហូតដល់ ៣០ សន្លឹក"],
                  ["Video uploads", "បញ្ចូលវីដេអូផ្សព្វផ្សាយ"],
                  ["Business story page", "ទំព័ររឿងរ៉ាវអាជីវកម្ម និងសហគមន៍"],
                  ["Event promotion tools", "ឧបករណ៍ផ្សព្វផ្សាយព្រឹត្តិការណ៍"],
                  ["Customer inquiry management", "ប្រព័ន្ធគ្រប់គ្រងសំណួរអតិថិជន"],
                  ["Analytics dashboard", "ផ្ទាំងវិភាគទិន្នន័យភ្ញៀវទស្សនា"],
                  ["Lead tracking system", "ប្រព័ន្ធតាមដានអតិថិជនសក្តានុពល"],
                  ["Website & social links", "តំណភ្ជាប់គេហទំព័រ និងបណ្តាញសង្គម"],
                  ["Special offers and coupons", "ការផ្តល់ជូនពិសេស និងប័ណ្ណបញ្ចុះតម្លៃ"],
                  ["Priority support", "សេវាជំនួយអាទិភាព ២៤/៧"],
                ].map(([en, km]) => (
                  <div key={en} className="flex items-center gap-2">
                    <Check className="size-4 text-teal shrink-0" />
                    <span>{t(en ?? "", km ?? "")}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button asChild className="mt-8 rounded-full bg-teal text-primary-foreground hover:bg-teal/90 w-full shadow-md font-semibold">
              <Link to="/join">
                <Rocket className="size-4" /> {t("Grow My Business", "ពង្រីកអាជីវកម្មរបស់ខ្ញុំ")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* TOUR GUIDE VISIBILITY PACKAGE (IMPORTANT: NO ACCOUNT REQUIRED) */}
      {/* ========================================================================= */}
      <section id="guide-visibility" className="bg-sand py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow={t("Tour guide model", "គំរូមគ្គុទ្ទេសក៍ទេសចរណ៍")}
            title={t("Tour Guide Visibility Packages", "កញ្ចប់បង្ហាញ និងលើកកម្ពស់មគ្គុទ្ទេសក៍")}
          />

          {/* CRITICAL ARCHITECTURAL CLARITY BANNER */}
          <div className="mt-[-10px] mb-8 rounded-2xl border-2 border-teal/30 bg-teal-soft/70 p-5 text-navy flex items-start gap-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-teal text-primary-foreground">
              <Info className="size-5" />
            </span>
            <div className="text-sm space-y-1">
              <p className="font-bold text-navy text-base">
                {t(
                  "IMPORTANT: Tour Guides DO NOT need accounts and do NOT have dashboards.",
                  "ចំណាំសំខាន់៖ មគ្គុទ្ទេសក៍ទេសចរណ៍ មិនចាំបាច់មានគណនី ឬផ្ទាំងគ្រប់គ្រងឡើយ។",
                )}
              </p>
              <p className="text-muted-foreground">
                {t(
                  "Cambodia Unlocked manually creates, verifies, and manages guide profiles. Guides pay zero booking commissions and only choose affordable optional visibility or verification upgrades.",
                  "Cambodia Unlocked បង្កើត ផ្ទៀងផ្ទាត់ និងគ្រប់គ្រងប្រវត្តិរូបមគ្គុទ្ទេសក៍ដោយផ្ទាល់។ មគ្គុទ្ទេសក៍មិនត្រូវបង់កម្រៃជើងសារលើការកក់ទេ ដោយគ្រាន់តែបង់កញ្ចប់ផ្សព្វផ្សាយ ឬផ្ទៀងផ្ទាត់តាមការស្ម័គ្រចិត្ត។",
                )}
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* FREE GUIDE LISTING */}
            <div className="flex flex-col justify-between rounded-3xl border bg-card p-6 shadow-card">
              <div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-navy">
                  {t("Always Free", "ឥតគិតថ្លៃជានិច្ច")}
                </span>
                <h3 className="mt-3 text-xl font-bold text-navy">
                  {t("FREE GUIDE LISTING", "ការចុះបញ្ជីមគ្គុទ្ទេសក៍ឥតគិតថ្លៃ")}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("Every verified local guide is listed freely on our platform.", "រាល់មគ្គុទ្ទេសក៍ក្នុងស្រុកទាំងអស់ត្រូវបានចុះបញ្ជីដោយឥតគិតថ្លៃ។")}
                </p>
                <div className="mt-3 font-display text-3xl font-bold text-navy">$0</div>

                <div className="mt-5 space-y-2 text-sm text-navy">
                  <p className="text-xs font-semibold uppercase text-teal">{t("Displayed Information:", "ព័ត៌មានដែលបានបង្ហាញ៖")}</p>
                  {[
                    ["Profile Photo", "រូបថតប្រវត្តិរូបច្បាស់"],
                    ["Full Name", "ឈ្មោះពេញ"],
                    ["Languages Spoken", "ភាសាដែលចេះនិយាយ"],
                    ["Phone Number", "លេខទូរសព្ទផ្ទាល់"],
                    ["WhatsApp", "គណនី WhatsApp"],
                    ["Experience Level", "កម្រិតបទពិសោធន៍ (ឆ្នាំ)"],
                    ["Location", "ទីតាំង (ខេត្តសៀមរាប)"],
                    ["Biography", "ជីវប្រវត្តិសង្ខេប"],
                    ["Tour Specialties", "ជំនាញ និងដំណើរកម្សាន្តឯកទេស"],
                  ].map(([en, km]) => (
                    <div key={en} className="flex items-center gap-2">
                      <Check className="size-4 text-teal shrink-0" />
                      <span>{t(en ?? "", km ?? "")}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button asChild variant="outline" className="mt-6 rounded-full w-full">
                <Link to="/guides">{t("Browse Tour Guides", "ស្វែងរកមគ្គុទ្ទេសក៍")}</Link>
              </Button>
            </div>

            {/* FEATURED GUIDE PACKAGE */}
            <div className="relative flex flex-col justify-between rounded-3xl border-2 border-gold/60 bg-card p-6 shadow-card">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1 text-xs font-bold text-gold-foreground">
                  <Crown className="size-3.5" /> {t("Featured Guide", "មគ្គុទ្ទេសក៍លេចធ្លោ")}
                </span>
                <h3 className="mt-3 text-xl font-bold text-navy">
                  {t("FEATURED GUIDE PACKAGE", "កញ្ចប់មគ្គុទ្ទេសក៍លេចធ្លោ")}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("Top search ranking and homepage placement for active guides.", "ចំណាត់ថ្នាក់ស្វែងរកកំពូល និងការបង្ហាញលើទំព័រដើម។")}
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold text-navy">$5</span>
                  <span className="text-sm text-muted-foreground">/{t("month", "ខែ")}</span>
                </div>

                <div className="mt-5 space-y-2 text-sm text-navy">
                  <p className="text-xs font-semibold uppercase text-gold">{t("Benefits:", "អត្ថប្រយោជន៍៖")}</p>
                  {[
                    ["Homepage Placement", "ការបង្ហាញនៅលើទំព័រដើម"],
                    ["Top Search Ranking", "ចំណាត់ថ្នាក់ស្វែងរកកំពូល"],
                    ["Larger Profile Card", "កាតប្រវត្តិរូបធំជាងមុន"],
                    ["More Photos", "រូបថតច្រើនជាងមុន"],
                    ["Video Introduction", "វីដេអូណែនាំខ្លួនជាផ្លូវការ"],
                    ["Featured Destination Pages", "បង្ហាញលើទំព័រគោលដៅទេសចរណ៍"],
                    ["Recommended Guide Label", "ស្លាកមគ្គុទ្ទេសក៍ណែនាំ"],
                    ["Higher Visibility", "ការមើលឃើញខ្ពស់ជាងមុន"],
                    ["Priority Traveler Inquiries", "អាទិភាពទទួលសំណួរពីអ្នកដំណើរ"],
                  ].map(([en, km]) => (
                    <div key={en} className="flex items-center gap-2">
                      <Check className="size-4 text-gold shrink-0" />
                      <span>{t(en ?? "", km ?? "")}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button asChild className="mt-6 rounded-full bg-gold text-gold-foreground hover:bg-gold/90 w-full font-semibold">
                <Link to="/become-guide">
                  <Crown className="size-4" /> {t("Become a Featured Guide", "ក្លាយជាមគ្គុទ្ទេសក៍លេចធ្លោ")}
                </Link>
              </Button>
            </div>

            {/* VERIFIED GUIDE PACKAGE */}
            <div className="relative flex flex-col justify-between rounded-3xl border-2 border-teal/60 bg-card p-6 shadow-card">
              <div>
                <span className="inline-flex items-center gap-1 rounded-full bg-teal px-3 py-1 text-xs font-bold text-primary-foreground">
                  <ShieldCheck className="size-3.5" /> {t("Verified Local Guide", "មគ្គុទ្ទេសក៍ក្នុងស្រុកផ្ទៀងផ្ទាត់រួច")}
                </span>
                <h3 className="mt-3 text-xl font-bold text-navy">
                  {t("VERIFIED GUIDE PACKAGE", "កញ្ចប់មគ្គុទ្ទេសក៍ផ្ទៀងផ្ទាត់ផ្លូវការ")}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t("Official license validation for maximum traveler trust.", "ការផ្ទៀងផ្ទាត់អាជ្ញាប័ណ្ណផ្លូវការសម្រាប់ទំនុកចិត្តខ្ពស់បំផុត។")}
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-3xl font-bold text-navy">$10–$20</span>
                  <span className="text-sm text-muted-foreground">/{t("year", "ឆ្នាំ")}</span>
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-muted-foreground">
                  <p className="font-semibold text-teal uppercase">{t("Verification Includes:", "ការផ្ទៀងផ្ទាត់រួមមាន៖")}</p>
                  <div>✅ {t("Identity Verification", "ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ")}</div>
                  <div>✅ {t("Contact Verification", "ការផ្ទៀងផ្ទាត់ទំនាក់ទំនង")}</div>
                  <div>✅ {t("Guide License Verification", "ការផ្ទៀងផ្ទាត់អាជ្ញាប័ណ្ណមគ្គុទ្ទេសក៍")}</div>
                  <div>✅ {t("Experience Verification", "ការផ្ទៀងផ្ទាត់បទពិសោធន៍")}</div>
                </div>

                <div className="mt-4 space-y-2 text-sm text-navy">
                  <p className="text-xs font-semibold uppercase text-teal">{t("Benefits:", "អត្ថប្រយោជន៍៖")}</p>
                  {[
                    ["Trusted Badge", "ផ្លាកសញ្ញាទំនុកចិត្ត (Trusted Badge)"],
                    ["Higher Search Visibility", "ការបង្ហាញខ្ពស់ក្នុងការស្វែងរក"],
                    ["Better Traveler Trust", "ទំនុកចិត្តកាន់តែខ្លាំងពីអ្នកដំណើរ"],
                    ["Increased Inquiries", "ការកើនឡើងនៃសំណួរពីភ្ញៀវ"],
                  ].map(([en, km]) => (
                    <div key={en} className="flex items-center gap-2">
                      <Check className="size-4 text-teal shrink-0" />
                      <span>{t(en ?? "", km ?? "")}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button asChild className="mt-6 rounded-full bg-teal text-primary-foreground hover:bg-teal/90 w-full font-semibold">
                <Link to="/become-guide">
                  <ShieldCheck className="size-4" /> {t("Apply for Verification", "ដាក់ពាក្យស្នើសុំការផ្ទៀងផ្ទាត់")}
                </Link>
              </Button>
            </div>
          </div>

          {/* GUIDE CARD EXAMPLE SHOWCASE */}
          <div className="mt-12 rounded-3xl border bg-card p-6 sm:p-8 shadow-card max-w-3xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-widest text-teal mb-4">
              {t("Guide Card Example (How it appears to travelers)", "ឧទាហរណ៍នៃកាតមគ្គុទ្ទេសក៍ (របៀបដែលបង្ហាញដល់អ្នកដំណើរ)")}
            </p>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="relative shrink-0">
                <img
                  src={img.guideDara}
                  alt="Dara - Licensed Local Guide"
                  className="size-28 sm:size-32 rounded-2xl object-cover border-2 border-teal/20"
                />
                <span className="absolute -bottom-2 -right-2 grid size-7 place-items-center rounded-full bg-gold text-gold-foreground shadow">
                  <Crown className="size-4" />
                </span>
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-teal-soft px-3 py-1 text-xs font-semibold text-navy">
                    <CheckCircle2 className="size-3.5 text-teal" />
                    {t("Verified Local Guide", "មគ្គុទ្ទេសក៍ក្នុងស្រុកផ្ទៀងផ្ទាត់រួច")}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-navy">
                    <Crown className="size-3.5 text-gold" />
                    {t("Featured Guide", "មគ្គុទ្ទេសក៍លេចធ្លោ")}
                  </span>
                </div>

                <h4 className="text-2xl font-bold text-navy">
                  {t("Dara - Licensed Local Guide", "ដារ៉ា - មគ្គុទ្ទេសក៍មានអាជ្ញាប័ណ្ណផ្លូវការ")}
                </h4>

                <div className="flex items-center gap-2 text-sm text-navy">
                  <span className="flex items-center gap-1 font-semibold text-gold">
                    <Star className="size-4 fill-gold text-gold" /> 4.9
                  </span>
                  <span className="text-muted-foreground">{t("(76 Reviews)", "(ការវាយតម្លៃ ៧៦)")}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{t("Siem Reap", "សៀមរាប")}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 text-xs sm:text-sm text-muted-foreground">
                  <div>
                    <span className="font-semibold text-navy block">{t("Languages:", "ភាសា៖")}</span>
                    <span>{t("English • Khmer • French", "អង់គ្លេស • ខ្មែរ • បារាំង")}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-navy block">{t("Experience:", "បទពិសោធន៍៖")}</span>
                    <span>{t("8 Years", "៨ ឆ្នាំ")}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-navy block">{t("Specialty:", "ជំនាញពិសេស៖")}</span>
                    <span>{t("Angkor Archaeology & History Tours", "ប្រវត្តិសាស្ត្រ និងបុរាណវិទ្យាអង្គរ")}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-navy block">{t("Price:", "តម្លៃ៖")}</span>
                    <span className="font-bold text-teal">{t("From $35/day", "ចាប់ពី $35/ថ្ងៃ")}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1 text-xs text-muted-foreground">
                  <span className="font-semibold text-navy">{t("Contact:", "ទំនាក់ទំនង៖")}</span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5">
                    <Phone className="size-3 text-teal" /> {t("Phone", "ទូរសព្ទ")}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-0.5">
                    <MessageSquare className="size-3 text-success" /> WhatsApp
                  </span>
                </div>

                <div className="flex flex-wrap gap-3 pt-3">
                  <Button asChild variant="outline" className="rounded-full">
                    <Link to="/guides">{t("View Profile", "មើលប្រវត្តិរូប")}</Link>
                  </Button>
                  <InquiryDialog
                    provider="Dara - Licensed Local Guide"
                    trigger={
                      <Button className="rounded-full bg-teal text-primary-foreground hover:bg-teal/90">
                        {t("Contact Guide", "ទាក់ទងមគ្គុទ្ទេសក៍")}
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPONSORED EXPERIENCES */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-center">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-soft px-3 py-1 text-xs font-semibold text-navy">
              <Sparkles className="size-3.5 text-gold" /> {t("Promote Your Experience", "ផ្សព្វផ្សាយបទពិសោធន៍របស់អ្នក")}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold text-navy sm:text-4xl">
              {t("Promote Your Experience to Thousands of Travelers", "ផ្សព្វផ្សាយបទពិសោធន៍របស់អ្នកទៅកាន់អ្នកដំណើរបរទេសរាប់ពាន់នាក់")}
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              {t(
                "Showcase unique workshops, cultural tours, cooking classes, or artisan visits at the top of category pages with live analytics tracking.",
                "បង្ហាញសិក្ខាសាលាប្លែកៗ ដំណើរកម្សាន្តវប្បធម៌ ថ្នាក់បង្រៀនធ្វើម្ហូប ឬសិប្បកម្ម នៅផ្នែកខាងលើនៃទំព័រប្រភេទនីមួយៗ ជាមួយការតាមដានទិន្នន័យជាក់ស្តែង។",
              )}
            </p>

            <div className="mt-4 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-navy">$20–$50</span>
              <span className="text-sm text-muted-foreground">/{t("campaign", "យុទ្ធនាការ")}</span>
            </div>

            <div className="mt-6 grid gap-2.5 sm:grid-cols-2 text-sm text-navy">
              {[
                ["Homepage Highlight", "ការបង្ហាញពិសេសលើទំព័រដើម"],
                ["Featured Category Placement", "ការដាក់បង្ហាញក្នុងប្រភេទលេចធ្លោ"],
                ["Priority Search Ranking", "ចំណាត់ថ្នាក់អាទិភាពក្នុងការស្វែងរក"],
                ["Sponsored Label", "ស្លាកឧបត្ថម្ភ (Sponsored)"],
                ["Social Media Promotion", "ការផ្សព្វផ្សាយលើបណ្តាញសង្គម"],
                ["Analytics Reporting", "របាយការណ៍ស្ថិតិលម្អិត"],
                ["Increased Exposure", "ការកើនឡើងនៃការមើលឃើញ"],
              ].map(([en, km]) => (
                <div key={en} className="flex items-center gap-2">
                  <Check className="size-4 text-teal shrink-0" />
                  <span>{t(en ?? "", km ?? "")}</span>
                </div>
              ))}
            </div>

            <Button asChild className="mt-8 rounded-full bg-teal text-primary-foreground hover:bg-teal/90">
              <Link to="/join">
                {t("Launch a Sponsored Campaign", "ចាប់ផ្តើមយុទ្ធនាការផ្សព្វផ្សាយ")} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          {/* EXAMPLE CAMPAIGN CARD */}
          <div className="rounded-3xl border bg-card p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {t("Example Campaign", "ឧទាហរណ៍នៃយុទ្ធនាការជាក់ស្តែង")}
              </span>
              <span className="rounded-full bg-gold/20 px-2.5 py-0.5 text-xs font-bold text-gold">
                {t("Sponsored", "ឧបត្ថម្ភ")}
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border">
              <img
                src={img.angkorSunrise}
                alt="Angkor Sunrise Photography Tour"
                className="aspect-[16/9] w-full object-cover"
              />
              <div className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-teal">{t("Photography Tour", "ដំណើរកម្សាន្តថតរូប")}</span>
                  <span className="text-xs font-bold text-navy">$45/person</span>
                </div>
                <h4 className="font-bold text-navy text-lg">
                  {t("Angkor Sunrise Photography Tour", "ដំណើរកម្សាន្តថតរូបថ្ងៃរះអង្គរ")}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {t(
                    "Capture Angkor Wat bathed in morning golden light with a local photography guide.",
                    "ផ្តិតយករូបភាពថ្ងៃរះដ៏អស្ចារ្យនៅប្រាសាទអង្គរវត្តជាមួយមគ្គុទ្ទេសក៍ថតរូបក្នុងស្រុក។",
                  )}
                </p>
              </div>
            </div>

            {/* PERFORMANCE METRICS */}
            <div className="grid grid-cols-3 gap-3 rounded-2xl bg-secondary/50 p-4 text-center">
              <div>
                <span className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <Eye className="size-3 text-teal" /> {t("Views", "ការមើល")}
                </span>
                <p className="mt-1 font-display text-lg font-bold text-navy">8,500</p>
                <span className="text-[10px] text-muted-foreground">{t("Impressions", "ការបង្ហាញ")}</span>
              </div>
              <div className="border-x border-border">
                <span className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <TrendingUp className="size-3 text-gold" /> {t("Clicks", "ការចុច")}
                </span>
                <p className="mt-1 font-display text-lg font-bold text-navy">327</p>
                <span className="text-[10px] text-muted-foreground">{t("Traveler Clicks", "អ្នកដំណើរចុច")}</span>
              </div>
              <div>
                <span className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                  <MessageSquare className="size-3 text-success" /> {t("Inquiries", "សំណួរ")}
                </span>
                <p className="mt-1 font-display text-lg font-bold text-navy">47</p>
                <span className="text-[10px] text-muted-foreground">{t("Direct Inquiries", "សំណួរផ្ទាល់")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VERIFIED & TRUSTED PARTNERS PROGRAM */}
      <section className="bg-navy py-16 text-navy-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">
              {t("Trust & safety", "ទំនុកចិត្ត និងសុវត្ថិភាព")}
            </p>
            <h2 className="mt-2 text-3xl font-extrabold md:text-4xl">
              {t("Verified & Trusted Partners Program", "កម្មវិធីដៃគូដែលបានផ្ទៀងផ្ទាត់ និងគួរឱ្យទុកចិត្ត")}
            </h2>
            <p className="mt-3 text-base text-navy-foreground/80">
              {t(
                "Ensuring high quality, security, and authentic local experiences for travelers visiting Cambodia.",
                "ធានានូវគុណភាពខ្ពស់ សុវត្ថិភាព និងបទពិសោធន៍ក្នុងស្រុកពិតប្រាកដ សម្រាប់អ្នកដំណើរដែលមកទស្សនាកម្ពុជា។",
              )}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* BUSINESS VERIFICATION */}
            <div className="rounded-3xl border border-navy-foreground/15 bg-navy-light/40 p-6 backdrop-blur space-y-4">
              <div className="flex items-center gap-2">
                <span className="grid size-10 place-items-center rounded-xl bg-teal text-primary-foreground">
                  <Building className="size-5" />
                </span>
                <div>
                  <h3 className="font-bold text-lg">{t("Business Verification", "ការផ្ទៀងផ្ទាត់អាជីវកម្ម")}</h3>
                  <span className="text-xs text-gold font-medium">{t("Safe & Registered", "សុវត្ថិភាព និងបានចុះបញ្ជី")}</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-navy-foreground/90">
                {[
                  ["Business License Check", "ពិនិត្យអាជ្ញាប័ណ្ណអាជីវកម្មផ្លូវការ"],
                  ["Contact Verification", "ផ្ទៀងផ្ទាត់ព័ត៌មានទំនាក់ទំនងផ្ទាល់"],
                  ["Location Verification", "ផ្ទៀងផ្ទាត់ទីតាំងអាជីវកម្មជាក់ស្តែង"],
                  ["Safety Standards Review", "ពិនិត្យស្តង់ដាសុវត្ថិភាព និងអនាម័យ"],
                ].map(([en, km]) => (
                  <li key={en} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-teal shrink-0" />
                    <span>{t(en ?? "", km ?? "")}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-navy-foreground/10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/20 px-3 py-1 text-xs font-semibold text-teal-light">
                  <CheckCircle2 className="size-3.5 text-teal" />
                  {t("Verified Business", "អាជីវកម្មផ្ទៀងផ្ទាត់រួច")}
                </span>
              </div>
            </div>

            {/* GUIDE VERIFICATION */}
            <div className="rounded-3xl border border-navy-foreground/15 bg-navy-light/40 p-6 backdrop-blur space-y-4">
              <div className="flex items-center gap-2">
                <span className="grid size-10 place-items-center rounded-xl bg-teal text-primary-foreground">
                  <BadgeCheck className="size-5" />
                </span>
                <div>
                  <h3 className="font-bold text-lg">{t("Guide Verification", "ការផ្ទៀងផ្ទាត់មគ្គុទ្ទេសក៍")}</h3>
                  <span className="text-xs text-gold font-medium">{t("Certified Professionals", "អ្នកជំនាញមានវិញ្ញាបនបត្រ")}</span>
                </div>
              </div>
              <ul className="space-y-2.5 text-sm text-navy-foreground/90">
                {[
                  ["ID Verification", "ផ្ទៀងផ្ទាត់អត្តសញ្ញាណប័ណ្ណផ្លូវការ"],
                  ["License Validation", "ផ្ទៀងផ្ទាត់អាជ្ញាប័ណ្ណទេសចរណ៍ជាតិ"],
                  ["Contact Verification", "ផ្ទៀងផ្ទាត់លេខទូរសព្ទ និង WhatsApp"],
                  ["Experience Check", "ពិនិត្យប្រវត្តិបទពិសោធន៍នាំភ្ញៀវ"],
                ].map(([en, km]) => (
                  <li key={en} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-teal shrink-0" />
                    <span>{t(en ?? "", km ?? "")}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-2 border-t border-navy-foreground/10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal/20 px-3 py-1 text-xs font-semibold text-teal-light">
                  <BadgeCheck className="size-3.5 text-teal" />
                  {t("Verified Local Guide", "មគ្គុទ្ទេសក៍ក្នុងស្រុកផ្ទៀងផ្ទាត់រួច")}
                </span>
              </div>
            </div>

            {/* PREMIUM PARTNER */}
            <div className="rounded-3xl border border-gold/30 bg-navy-light/40 p-6 backdrop-blur space-y-4">
              <div className="flex items-center gap-2">
                <span className="grid size-10 place-items-center rounded-xl bg-gold text-gold-foreground">
                  <Crown className="size-5" />
                </span>
                <div>
                  <h3 className="font-bold text-lg">{t("Premium Partner Program", "កម្មវិធីដៃគូកម្រិតពិសេស")}</h3>
                  <span className="text-xs text-gold font-medium">{t("Top Tier Recognition", "ការទទួលស្គាល់កម្រិតខ្ពស់")}</span>
                </div>
              </div>
              <p className="text-sm text-navy-foreground/80">
                {t(
                  "Awarded to partners who uphold top traveler ratings, provide rapid inquiries response, and maintain full verification status.",
                  "ផ្តល់ជូនដៃគូដែលមានការវាយតម្លៃល្អពីភ្ញៀវ ឆ្លើយតបរហ័សទាន់ចិត្ត និងបានបញ្ចប់ការផ្ទៀងផ្ទាត់ពេញលេញ។",
                )}
              </p>
              <div className="pt-2 border-t border-navy-foreground/10">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold text-gold">
                  <Crown className="size-3.5 text-gold" />
                  {t("Premium Partner", "ដៃគូពិសេស")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PREMIUM COMPARISON TABLE */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow={t("Compare plans", "ប្រៀបធៀបគម្រោង")}
          title={t("Premium Comparison Table", "តារាងប្រៀបធៀបគម្រោង Premium")}
        />
        <p className="mt-[-20px] mb-8 text-sm sm:text-base text-muted-foreground max-w-2xl">
          {t(
            "Clear, transparent feature breakdown across traveler accounts, business subscriptions, and guide visibility packages.",
            "ការបែងចែកលក្ខណៈពិសេសច្បាស់លាស់ និងមានតម្លាភាព សម្រាប់គណនីអ្នកដំណើរ អាជីវកម្ម និងកញ្ចប់មគ្គុទ្ទេសក៍។",
          )}
        </p>

        <div className="overflow-x-auto rounded-3xl border bg-card shadow-card">
          <table className="w-full min-w-[720px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b bg-secondary/50 text-navy font-semibold">
                <th className="p-4 sm:p-5">{t("Features", "មុខងារ និងអត្ថប្រយោជន៍")}</th>
                <th className="p-4 sm:p-5 text-center">{t("Free Traveler", "អ្នកដំណើរឥតគិតថ្លៃ")}</th>
                <th className="p-4 sm:p-5 text-center text-teal">
                  {t("Traveler Premium", "អ្នកដំណើរ Premium")}
                  <span className="block text-xs font-normal text-muted-foreground">$2.99/mo</span>
                </th>
                <th className="p-4 sm:p-5 text-center text-gold">
                  {t("Business Premium", "អាជីវកម្ម Premium")}
                  <span className="block text-xs font-normal text-muted-foreground">$5–$15/mo</span>
                </th>
                <th className="p-4 sm:p-5 text-center text-navy font-bold">
                  {t("Tour Guide Visibility", "កញ្ចប់មគ្គុទ្ទេសក៍")}
                  <span className="block text-xs font-normal text-muted-foreground">$5/mo or $10/yr</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y text-navy">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? "bg-card" : "bg-secondary/20"}>
                  <td className="p-4 sm:p-5 font-medium">{T(row.feature)}</td>
                  <td className="p-4 sm:p-5 text-center text-muted-foreground">{T(row.freeTraveler)}</td>
                  <td className="p-4 sm:p-5 text-center font-semibold text-teal">{T(row.travelerPremium)}</td>
                  <td className="p-4 sm:p-5 text-center font-semibold text-gold">{T(row.bizPremium)}</td>
                  <td className="p-4 sm:p-5 text-center font-semibold text-navy">{T(row.guideVisibility)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* REVENUE MODEL */}
      <section className="bg-sand py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading
            eyebrow={t("Monetization", "ការរកប្រាក់ចំណូល")}
            title={t("How Cambodia Unlocked Generates Revenue", "របៀបដែល Cambodia Unlocked បង្កើតចំណូល")}
          />
          <p className="mt-[-20px] mb-8 text-sm sm:text-base text-muted-foreground max-w-2xl">
            {t(
              "A diversified 7-stream revenue model ensuring financial self-sufficiency while remaining fair and supportive to local Khmer communities.",
              "គំរូចំណូលចម្រុះចំនួន ៧ ច្រក ដែលធានានូវនិរន្តរភាពហិរញ្ញវត្ថុ ព្រមទាំងផ្តល់ការគាំទ្រដោយយុត្តិធម៌ដល់សហគមន៍ខ្មែរក្នុងស្រុក។",
            )}
          </p>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {revenueStreams.map((s) => (
              <div
                key={s.num}
                className={`relative flex flex-col justify-between rounded-3xl border bg-card p-6 shadow-card ${
                  s.highlight ? "border-gold ring-1 ring-gold/40" : ""
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="grid size-8 place-items-center rounded-full bg-teal-soft font-display text-sm font-bold text-navy">
                      {s.num}
                    </span>
                    <span className="rounded-full bg-secondary px-3 py-1 font-display text-sm font-bold text-teal">
                      {T(s.price)}
                    </span>
                  </div>
                  <h3 className="mt-4 font-bold text-lg text-navy">{T(s.name)}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{T(s.desc)}</p>
                </div>
                <div className="mt-4 pt-3 border-t text-xs font-medium text-navy/70 flex items-center gap-1">
                  <Check className="size-3.5 text-teal" />
                  {t("Active revenue component", "ផ្នែកចំណូលសកម្ម")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROADMAP */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow={t("Growth strategy", "យុទ្ធសាស្ត្ររីកចម្រើន")}
          title={t("Cambodia Unlocked Roadmap", "ផែនទីបង្ហាញផ្លូវ Cambodia Unlocked")}
        />
        <p className="mt-[-20px] mb-8 text-sm sm:text-base text-muted-foreground max-w-2xl">
          {t(
            "Our journey from the current MVP pilot in Siem Reap to a nationwide, commission-powered digital travel infrastructure.",
            "ដំណើររបស់យើងពីដំណាក់កាលសាកល្បង MVP បច្ចុប្បន្ននៅសៀមរាប រហូតដល់ហេដ្ឋារចនាសម្ព័ន្ធទេសចរណ៍ឌីជីថលទូទាំងប្រទេស។",
          )}
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {roadmapPhases.map((r, i) => (
            <div
              key={r.phase[0]}
              className={`flex flex-col rounded-3xl border p-6 shadow-card ${
                r.status === "current"
                  ? "bg-navy text-navy-foreground border-teal"
                  : "bg-card text-navy border-border"
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                    r.status === "current"
                      ? "bg-teal text-primary-foreground"
                      : r.status === "next"
                      ? "bg-gold text-gold-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {T(r.tag)}
                </span>
                <span
                  className={`text-xs font-semibold ${
                    r.status === "current" ? "text-gold" : "text-muted-foreground"
                  }`}
                >
                  {t(`Phase ${i + 1}`, `ដំណាក់កាល ${i + 1}`)}
                </span>
              </div>

              <h3 className={`mt-4 font-bold text-lg ${r.status === "current" ? "text-gold" : "text-navy"}`}>
                {T(r.phase)}
              </h3>

              <ul className="mt-4 flex-1 space-y-2 text-sm">
                {r.items.map((it) => (
                  <li key={it[0]} className="flex items-start gap-2">
                    <Check
                      className={`size-4 mt-0.5 shrink-0 ${
                        r.status === "current" ? "text-teal" : "text-success"
                      }`}
                    />
                    <span className={r.status === "current" ? "text-navy-foreground/90" : "text-muted-foreground"}>
                      {T(it)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PITCH / VALUE SUMMARY CALLOUT BANNER */}
      <section className="bg-sand py-12">
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative overflow-hidden rounded-3xl border-2 border-gold/40 bg-card p-6 sm:p-10 shadow-card text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3.5 py-1 text-xs font-bold text-gold-foreground">
              <Rocket className="size-4" /> {t("Why This Model Wins", "មូលហេតុដែលគំរូនេះមានប្រសិទ្ធភាពខ្ពស់")}
            </span>
            <blockquote className="mt-4 font-display text-lg sm:text-xl md:text-2xl font-bold text-navy leading-relaxed">
              &ldquo;
              {t(
                "This version is much stronger because it includes Traveler Premium Accounts, Business Owner Dashboards, and Tour Guide Visibility Packages without requiring guide accounts, making the entire Cambodia Unlocked business model more realistic, scalable, and easier to explain during your pitch.",
                "កំណែនេះមានភាពរឹងមាំខ្លាំង ដោយសារវារួមបញ្ចូលគណនី Traveler Premium, ផ្ទាំងគ្រប់គ្រងម្ចាស់អាជីវកម្ម និងកញ្ចប់បង្ហាញមគ្គុទ្ទេសក៍ទេសចរណ៍ ដោយមិនតម្រូវឱ្យមានគណនីមគ្គុទ្ទេសក៍ ដែលធ្វើឱ្យគំរូអាជីវកម្ម Cambodia Unlocked កាន់តែប្រាកដនិយម អាចពង្រីកបាន និងងាយស្រួលពន្យល់អំឡុងពេលធ្វើបទបង្ហាញ។",
              )}
              &rdquo;
            </blockquote>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild className="rounded-full bg-teal text-primary-foreground hover:bg-teal/90">
                <Link to="/explore">
                  {t("Explore the Platform", "ស្វែងយល់ពីវេទិកា")} <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/join">{t("Join as a Partner", "ចូលរួមជាដៃគូ")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
