import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, MapPin, Navigation, Heart, MessageCircle, Wallet, ArrowRight, Users, Mountain, Languages, ChevronRight, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BusinessCard, DestinationCard, Rating } from "@/components/site/Cards";
import { InquiryDialog } from "@/components/site/InquiryDialog";
import { MapMock } from "@/components/site/MapMock";
import { SectionHeading } from "@/components/site/Section";
import { SiteFooter } from "@/components/site/SiteFooter";
import { adventures, businesses, destinations, getDestination, getStory, guides } from "@/lib/data";
import { useFavorites } from "@/lib/favorites";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const d = getDestination(params.slug);
    if (!d) throw notFound();
    return { slug: d.slug };
  },
  head: ({ loaderData }) => {
    const d = loaderData ? getDestination(loaderData.slug) : undefined;
    const title = d ? `${d.name} – Cambodia Unlocked` : "Destination – Cambodia Unlocked";
    return {
      meta: [
        { title },
        { name: "description", content: d?.description ?? "Destination details in Siem Reap." },
        { property: "og:title", content: title },
        { property: "og:description", content: d?.short ?? "Destination details in Siem Reap." },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: NotFoundPage,
  component: DestinationPage,
});

function DestinationPage() {
  const { t, tc } = useI18n();
  const { slug } = Route.useLoaderData();
  const d = getDestination(slug)!;
  const [photo, setPhoto] = useState(0);
  const { isSaved, toggle } = useFavorites();
  const saved = isSaved(`d:${d.slug}`);
  const story = getStory(d.storySlug);
  const nearby = destinations.filter((x) => x.slug !== d.slug).slice(0, 3);
  const nearbyBiz = businesses.slice(0, 4);
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${d.name} ${d.location} Cambodia`)}`;

  return (
    <main>
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-teal">{t("Home", "ទំព័រដើម")}</Link><ChevronRight className="size-4" />
          <Link to="/explore" className="hover:text-teal">{t("Explore", "ស្វែងរក")}</Link><ChevronRight className="size-4" />
          <span className="text-navy">{tc(d.name)}</span>
        </nav>
      </div>

      {/* Hero + gallery */}
      <section className="mx-auto mt-4 grid max-w-7xl gap-3 px-4 sm:px-6 lg:grid-cols-[2fr_1fr]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl sm:rounded-3xl">
          <img src={d.gallery[photo] ?? d.image} alt={tc(d.name)} className="h-full w-full object-cover" />
          <Badge className="absolute left-4 top-4 border-0 bg-teal text-primary-foreground">{tc(d.category)}</Badge>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-2 sm:gap-3 lg:grid-cols-2">
          {d.gallery.slice(0, 4).map((g, i) => (
            <button key={g + i} type="button" onClick={() => setPhoto(i)} className={`overflow-hidden rounded-xl sm:rounded-2xl ring-offset-2 transition ${photo === i ? "ring-2 ring-teal" : "opacity-90 hover:opacity-100"}`} aria-label={`Show photo ${i + 1}`}>
              <img src={g} alt="" loading="lazy" className="aspect-square h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 py-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <div>
            <p className="text-sm font-medium text-teal">{d.slug === "lotus-farm-experience" ? "Local family farm" : d.category} · {tc(d.tag)}</p>
            <h1 className="mt-1 text-2xl font-bold text-navy sm:text-4xl">{tc(d.name)}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <Rating value={d.rating} count={d.reviews} />
              <span className="flex items-center gap-1"><MapPin className="size-4 text-teal" />{tc(d.location)}</span>
              <span className="flex items-center gap-1"><Clock className="size-4 text-teal" />{tc(d.hours)}</span>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button variant="outline" className="rounded-full" onClick={() => toggle(`d:${d.slug}`, d.name)}>
                <Heart className={saved ? "fill-lotus text-lotus" : ""} /> {saved ? "Saved" : "Save Destination"}
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <a href={directions} target="_blank" rel="noreferrer"><Navigation /> {t("Get Directions", "មើលផ្លូវធ្វើដំណើរ")}</a>
              </Button>
              <InquiryDialog provider={tc(d.provider)} trigger={<Button className="rounded-full bg-teal hover:bg-teal/90"><MessageCircle /> Contact Provider</Button>} />
              <Button variant="ghost" className="rounded-full" onClick={() => { void navigator.clipboard?.writeText(window.location.href); toast.success("Link copied"); }}><Share2 /> {t("Share", "ចែករំលែក")}</Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-navy">{t("About this experience", "អំពីបទពិសោធន៍នេះ")}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{tc(d.description)}</p>
          </div>

          <div className="rounded-3xl bg-sand p-6">
            <h2 className="text-xl font-bold text-navy">{t("History", "ប្រវត្តិ")}</h2>
            <p className="mt-2 leading-relaxed text-muted-foreground">{tc(d.history)}</p>
          </div>

          {story && (
            <Link to="/stories/$slug" params={{ slug: story.slug }} className="group grid overflow-hidden rounded-3xl border bg-card shadow-card md:grid-cols-[240px_1fr]">
              <img src={story.image} alt={tc(story.title)} loading="lazy" className="h-full min-h-48 w-full object-cover" />
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-teal">{t("Community Story", "រឿងរ៉ាវសហគមន៍")}</p>
                <h2 className="mt-1 text-xl font-bold text-navy">{tc(story.title)}</h2>
                <p className="mt-2 text-muted-foreground">{tc(d.story)}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal group-hover:underline">{t("Read the full story", "អានរឿងពេញ")} <ArrowRight className="size-4" /></span>
              </div>
            </Link>
          )}

          <div>
            <SectionHeading title={t("Nearby Experiences", "បទពិសោធន៍នៅក្បែរ")} />
            <div className="grid gap-5 sm:grid-cols-3">
              {nearby.map((n) => <DestinationCard key={n.slug} d={n} compact />)}
            </div>
          </div>

          <div>
            <SectionHeading title={t("Nearby Businesses", "អាជីវកម្មនៅក្បែរ")} action={<Button asChild variant="link" className="text-teal"><Link to="/businesses">See all</Link></Button>} />
            <div className="grid gap-4 md:grid-cols-2">
              {nearbyBiz.map((b) => <BusinessCard key={b.slug} b={b} />)}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-navy"><Users className="size-5 text-teal" /> {t("Tour Guide Recommendations", "មគ្គុទ្ទេសក៍ទេសចរណ៍ដែលបានណែនាំ")}</h2>
              <ul className="mt-4 space-y-3">
                {guides.map((g) => (
                  <li key={g.name}>
                    <Link to="/businesses/$slug" params={{ slug: g.slug }} className="flex items-center justify-between rounded-xl p-2 hover:bg-muted">
                      <div>
                        <p className="font-medium text-navy">{tc(g.name)}</p>
                        <p className="flex items-center gap-1 text-xs text-muted-foreground"><Languages className="size-3" />{tc(g.languages)} · {tc(g.specialty)}</p>
                      </div>
                      <Rating value={g.rating} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold text-navy"><Mountain className="size-5 text-teal" /> {t("Adventure Activities Nearby", "សកម្មភាពផ្សងព្រេងនៅក្បែរ")}</h2>
              <ul className="mt-4 space-y-3">
                {adventures.map((a) => (
                  <li key={a.name}>
                    <Link to="/explore" search={{ category: "Adventure Tours" }} className="flex items-center justify-between rounded-xl p-2 hover:bg-muted">
                      <div><p className="font-medium text-navy">{tc(a.name)}</p><p className="text-xs text-muted-foreground">{tc(a.time)}</p></div>
                      <span className="font-semibold text-teal">{tc(a.price)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border bg-card p-6 shadow-card">
            <p className="flex items-center gap-2 text-sm text-muted-foreground"><Wallet className="size-4 text-teal" /> {t("Estimated Price", "តម្លៃប៉ាន់ស្មាន")}</p>
            <p className="mt-1 font-display text-3xl font-bold text-navy">${d.price}<span className="text-base font-normal text-muted-foreground"> {t("/ person", "/ នាក់")}</span></p>
            <div className="mt-4 space-y-2 border-t pt-4 text-sm">
              <p className="flex items-center gap-2 text-muted-foreground"><Clock className="size-4 text-teal" /><span className="font-medium text-navy">{t("Opening Hours:", "ម៉ោងបើក៖")}</span> {d.hours.replace("Open daily ", "Daily ")}</p>
              <p className="flex items-center gap-2 text-muted-foreground"><MapPin className="size-4 text-teal" />{tc(d.distance)}</p>
              <p className={`text-xs font-semibold ${d.openNow ? "text-success" : "text-muted-foreground"}`}>{d.openNow ? "● Open now" : "● Closed now"}</p>
            </div>
            <InquiryDialog provider={tc(d.provider)} trigger={<Button className="mt-5 w-full rounded-full bg-teal hover:bg-teal/90"><MessageCircle /> Contact Provider</Button>} />
            <Button asChild variant="outline" className="mt-2 w-full rounded-full"><a href={directions} target="_blank" rel="noreferrer"><Navigation /> {t("Get Directions", "មើលផ្លូវធ្វើដំណើរ")}</a></Button>
            <p className="mt-3 text-center text-xs text-muted-foreground">{t("Provided by", "ផ្តល់សេវាដោយ")} {tc(d.provider)}</p>
          </div>
          <div className="rounded-3xl border bg-card p-3 shadow-card">
            <p className="px-3 pb-2 pt-1 text-sm font-semibold text-navy">{t("Location Map", "ផែនទីទីតាំង")}</p>
            <MapMock className="h-64" showLegend={false} activeId={d.slug} pins={[{ id: d.slug, label: d.name, x: d.pin.x, y: d.pin.y }, ...nearbyBiz.map((b) => ({ id: b.slug, label: b.name, x: b.pin.x, y: b.pin.y, tone: "gold" as const }))]} />
          </div>
        </aside>
      </section>
      <SiteFooter />
    </main>
  );
}

function NotFoundPage() {
  const { t } = useI18n(); return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-navy">{t("Destination not found", "រកមិនឃើញគោលដៅទេសចរណ៍")}</h1>
      <Button asChild className="mt-6"><Link to="/explore">{t("Back to Explore", "ត្រឡប់ទៅស្វែងរក")}</Link></Button>
    </div>
); }
