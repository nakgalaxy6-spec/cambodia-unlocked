import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search, Landmark, Users, Trees, UtensilsCrossed, BedDouble, Mountain, Compass, Bus, CalendarDays, ArrowRight, MapPin, ShieldCheck, HeartHandshake, MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectionHeading } from "@/components/site/Section";
import { BusinessCard, DestinationCard, Rating } from "@/components/site/Cards";
import { AngkorSkyline, Lotus } from "@/components/site/AngkorSkyline";
import { businesses, destinations, events, homeCategories, stories } from "@/lib/data";
import { img } from "@/lib/images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cambodia Unlocked – Discover a Different Side of Siem Reap" },
      { name: "description", content: "Find authentic experiences, local businesses, community tourism, events and hidden gems across Siem Reap." },
      { property: "og:title", content: "Cambodia Unlocked – Discover a Different Side of Siem Reap" },
      { property: "og:description", content: "Discover Local Cambodia. Support Local Communities." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const catIcons = [Landmark, Users, Trees, UtensilsCrossed, BedDouble, Mountain, Compass, Bus, CalendarDays];

function Home() {
  const { t, tc } = useI18n();
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  const featured = destinations.slice(0, 4);
  const hidden = destinations.filter((d) => ["village-pottery-workshop", "village-cooking-class", "countryside-bicycle-tour"].includes(d.slug));
  const featuredBiz = businesses.filter((b) => b.premium).slice(0, 4);
  const upcoming = events.slice(0, 4);

  return (
    <main>
      {/* HERO */}
      <section className="relative isolate overflow-hidden min-h-[440px] sm:min-h-[500px] flex items-center">
        <img
          src={img.hero}
          alt={t("Angkor Wat at sunrise reflected in a lotus pond", "ប្រាសាទអង្គរវត្តពេលថ្ងៃរះ ឆ្លុះក្នុងស្រះឈូក")}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_35%]"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/80 sm:via-navy/60 to-navy/25 dark:from-navy-dark/95 dark:via-navy-dark/85 dark:to-navy-dark/35" />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pt-8 sm:pt-12 pb-14 sm:pb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal px-3 py-1 text-xs font-semibold text-primary-foreground shadow-sm">
            <MapPin className="size-3.5" /> {t("Siem Reap Pilot Project", "គម្រោងសាកល្បងនៅសៀមរាប")}
          </span>
          <h1 className="mt-3.5 max-w-2xl text-2xl font-extrabold leading-tight text-navy-foreground sm:text-4xl lg:text-5xl">
            {t("Discover a Different Side of", "ស្វែងយល់ពីទិដ្ឋភាពប្លែកមួយទៀតនៃ")} <span className="text-gold">{t("Siem Reap", "សៀមរាប")}</span>
          </h1>
          <p className="mt-2.5 max-w-xl text-sm sm:text-base text-navy-foreground/90">
            {t("Find authentic experiences, local businesses, community tourism, events and hidden gems across Siem Reap.", "ស្វែងរកបទពិសោធន៍ពិតប្រាកដ អាជីវកម្មក្នុងស្រុក ទេសចរណ៍សហគមន៍ ព្រឹត្តិការណ៍ និងកន្លែងពិសេសដែលមិនសូវមានគេស្គាល់នៅទូទាំងសៀមរាប។")}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/explore", search: q ? { q } : {} });
            }}
            className="mt-5 flex max-w-xl items-center gap-2 rounded-full bg-card p-1.5 shadow-lift"
          >
            <Search className="ml-2 sm:ml-3 size-4 sm:size-5 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label={t("Search", "ស្វែងរក")}
              placeholder={t("Search destinations, businesses, experiences or events", "ស្វែងរកគោលដៅទេសចរណ៍ អាជីវកម្ម បទពិសោធន៍ ឬព្រឹត្តិការណ៍")}
              className="h-9 sm:h-10 flex-1 bg-transparent text-xs sm:text-sm text-navy outline-none placeholder:text-muted-foreground"
            />
            <Button type="submit" className="h-9 sm:h-10 rounded-full bg-teal px-4 sm:px-5 text-xs sm:text-sm hover:bg-teal/90">{t("Search", "ស្វែងរក")}</Button>
          </form>
          <p className="mt-3 sm:mt-3.5 font-script text-lg sm:text-xl text-gold drop-shadow-sm">{t("Discover Local Cambodia. Support Local Communities.", "ស្វែងយល់ពីកម្ពុជាក្នុងស្រុក។ គាំទ្រសហគមន៍មូលដ្ឋាន។")}</p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="relative z-10 mx-auto -mt-6 sm:-mt-8 max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 rounded-2xl border bg-card/95 p-2 sm:p-2.5 shadow-lift backdrop-blur md:grid-cols-9">
          {homeCategories.map((c, i) => {
            const Icon = catIcons[i] ?? Compass;
            const inner = (
              <>
                <span className="grid size-8 sm:size-10 place-items-center rounded-xl bg-teal-soft text-teal transition group-hover:bg-teal group-hover:text-primary-foreground">
                  <Icon className="size-4 sm:size-4.5" />
                </span>
                <span className="text-center text-[11px] sm:text-xs font-medium text-navy line-clamp-2">{tc(c.label)}</span>
              </>
            );
            const cls = "group flex flex-col items-center gap-1.5 sm:gap-2 rounded-xl p-2 sm:p-2.5 transition hover:bg-muted";
            if (c.to === "/events") return <Link key={c.label} to="/events" className={cls}>{inner}</Link>;
            if (c.to === "/businesses") return <Link key={c.label} to="/businesses" search={{ category: c.category }} className={cls}>{inner}</Link>;
            return <Link key={c.label} to="/explore" search={{ category: c.category }} className={cls}>{inner}</Link>;
          })}
        </div>
      </section>

      {/* FEATURED DESTINATIONS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading
          eyebrow={t("Siem Reap", "សៀមរាប")}
          title={t("Featured Destinations", "គោលដៅទេសចរណ៍លេចធ្លោ")}
          action={<Button asChild variant="link" className="text-teal"><Link to="/explore">View all <ArrowRight /></Link></Button>}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((d) => <DestinationCard key={d.slug} d={d} />)}
        </div>
      </section>

      {/* HIDDEN EXPERIENCES */}
      <section className="bg-sand py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow={t("Off the usual path", "ចេញពីផ្លូវទេសចរណ៍ធម្មតា")} title={t("Hidden Experiences", "បទពិសោធន៍ពិសេសដែលមិនសូវមានគេស្គាល់")} action={<Button asChild variant="link" className="text-teal"><Link to="/explore" search={{ category: "Community Tourism" }}>See more <ArrowRight /></Link></Button>} />
          <div className="grid gap-5 lg:grid-cols-3">
            {hidden.map((d, i) => (
              <Link key={d.slug} to="/destinations/$slug" params={{ slug: d.slug }} className={`group relative overflow-hidden rounded-3xl ${i === 0 ? "lg:row-span-2" : ""}`}>
                <img src={d.image} alt={tc(d.name)} loading="lazy" className={`w-full object-cover object-top transition duration-500 group-hover:scale-105 ${i === 0 ? "h-[260px] sm:h-[340px] lg:h-full lg:min-h-[420px]" : "h-[200px]"}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent" />
                <div className="absolute bottom-0 p-5 text-navy-foreground">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gold">{tc(d.tag)}</p>
                  <h3 className="text-lg sm:text-xl font-bold">{tc(d.name)}</h3>
                  <p className="mt-1 text-sm text-navy-foreground/80 line-clamp-2">{tc(d.short)}</p>
                </div>
              </Link>
            ))}
            <div className="flex flex-col justify-between rounded-3xl bg-navy p-6 text-navy-foreground">
              <Lotus />
              <div>
                <h3 className="text-xl font-bold">{t("Not a generic directory.", "មិនមែនគ្រាន់តែជាបញ្ជីអាជីវកម្មធម្មតាទេ។")}</h3>
                <p className="mt-2 text-sm text-navy-foreground/75">{t("Every listing tells the story of the people behind it and connects you to them directly.", "បញ្ជីនីមួយៗប្រាប់ពីរឿងរ៉ាវរបស់អ្នកនៅពីក្រោយអាជីវកម្ម និងភ្ជាប់អ្នកទៅកាន់ពួកគេដោយផ្ទាល់។")}</p>
              </div>
              <Button asChild className="mt-4 w-fit rounded-full bg-gold text-gold-foreground hover:bg-gold/90"><Link to="/how-it-works">{t("How it works", "របៀបប្រើប្រាស់")}</Link></Button>
            </div>
          </div>
        </div>
      </section>

      {/* COMMUNITY STORIES */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading eyebrow={t("The people behind the places", "មនុស្សនៅពីក្រោយទីកន្លែងនានា")} title={t("Community Stories", "រឿងរ៉ាវសហគមន៍")} />
        <div className="grid gap-5 md:grid-cols-3">
          {stories.map((s) => (
            <Link key={s.slug} to="/stories/$slug" params={{ slug: s.slug }} className="group overflow-hidden rounded-2xl border bg-card shadow-card transition hover:shadow-lift">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={s.image} alt={tc(s.title)} loading="lazy" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-navy">{tc(s.title)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{tc(s.subtitle)}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal">{t("Read story", "អានរឿង")} <ArrowRight className="size-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED LOCAL BUSINESSES */}
      <section className="bg-teal-soft py-16">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow={t("Premium & verified", "កម្រិតពិសេស និងបានផ្ទៀងផ្ទាត់")} title={t("Featured Local Businesses", "អាជីវកម្មក្នុងស្រុកលេចធ្លោ")} action={<Button asChild variant="link" className="text-teal"><Link to="/businesses">Business directory <ArrowRight /></Link></Button>} />
          <div className="grid gap-4 md:grid-cols-2">
            {featuredBiz.map((b) => <BusinessCard key={b.slug} b={b} />)}
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <SectionHeading eyebrow={t("What's on", "ព្រឹត្តិការណ៍នាពេលខាងមុខ")} title={t("Upcoming Events", "ព្រឹត្តិការណ៍នាពេលខាងមុខ")} action={<Button asChild variant="link" className="text-teal"><Link to="/events">All events <ArrowRight /></Link></Button>} />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {upcoming.map((e) => (
            <Link key={e.slug} to="/events" className="flex gap-4 rounded-2xl border bg-card p-4 shadow-card transition hover:shadow-lift">
              <div className="grid h-16 w-14 shrink-0 place-items-center rounded-xl bg-gold-soft text-center">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-teal">{e.month}</p>
                  <p className="font-display text-xl font-bold leading-none text-navy">{e.day}</p>
                </div>
              </div>
              <div>
                <p className="font-semibold text-navy">{tc(e.name)}</p>
                <p className="text-xs text-muted-foreground">{tc(e.location)}</p>
                <p className="mt-1 text-xs font-medium text-teal">{tc(e.category)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-4 rounded-3xl border bg-sand p-6 md:grid-cols-3">
          {[
            { icon: ShieldCheck, t: "Verified local listings", d: "Every business is checked before it goes live." },
            { icon: MessageCircle, t: "Direct customer inquiries", d: "Message providers directly – no middlemen." },
            { icon: HeartHandshake, t: "Fairer tourism economy", d: "Free profiles for every local business." },
          ].map((x) => (
            <div key={x.t} className="flex gap-3">
              <x.icon className="size-6 shrink-0 text-teal" />
              <div><p className="font-semibold text-navy">{x.t}</p><p className="text-sm text-muted-foreground">{x.d}</p></div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Rating value={4.8} /> {t("average rating from travelers in the Siem Reap pilot (illustrative)", "ពិន្ទុមធ្យមពីអ្នកធ្វើដំណើរក្នុងគម្រោងសាកល្បងនៅសៀមរាប (សម្រាប់បង្ហាញជាឧទាហរណ៍)")}
        </div>
      </section>
      <AngkorSkyline className="h-16 text-navy" />
      <SiteFooter />
    </main>
  );
}
