import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { BadgeCheck, Clock, Crown, Facebook, Instagram, Mail, MapPin, MessageCircle, Navigation, Phone, Send, Star, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Rating, SaveButton } from "@/components/site/Cards";
import { InquiryDialog } from "@/components/site/InquiryDialog";
import { MapMock } from "@/components/site/MapMock";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getBusiness } from "@/lib/data";

export const Route = createFileRoute("/businesses/$slug")({
  loader: ({ params }) => {
    const b = getBusiness(params.slug);
    if (!b) throw notFound();
    return { slug: b.slug };
  },
  head: ({ loaderData }) => {
    const b = loaderData ? getBusiness(loaderData.slug) : undefined;
    const title = b ? `${b.name} – Local Business | Cambodia Unlocked` : "Local Business – Cambodia Unlocked";
    return {
      meta: [
        { title },
        { name: "description", content: b?.story ?? "Local business profile in Siem Reap." },
        { property: "og:title", content: title },
        { property: "og:description", content: b?.tagline ?? "Local business profile in Siem Reap." },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: NotFoundPage,
  component: BusinessProfile,
});

function BusinessProfile() {
  const { t, tc } = useI18n();
  const { slug } = Route.useLoaderData();
  const b = getBusiness(slug)!;
  const [photo, setPhoto] = useState(0);
  const [reviews, setReviews] = useState(b.reviewList);
  const [stars, setStars] = useState(5);
  const [text, setText] = useState("");
  const [reviewOpen, setReviewOpen] = useState(false);
  const directions = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${b.name} ${b.location} Siem Reap Cambodia`)}`;

  return (
    <main>
      <div className="mx-auto max-w-7xl px-6 pt-6">
        <nav className="flex items-center gap-1 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-teal">{t("Home", "ទំព័រដើម")}</Link><ChevronRight className="size-4" />
          <Link to="/businesses" search={{}} className="hover:text-teal">{t("Businesses", "អាជីវកម្ម")}</Link><ChevronRight className="size-4" />
          <span className="text-navy">{tc(b.name)}</span>
        </nav>
      </div>

      <section className="mx-auto mt-4 max-w-7xl px-4 sm:px-6">
        <div className="relative min-h-[380px] sm:min-h-[420px] md:aspect-[21/8] overflow-hidden rounded-3xl">
          <img src={b.gallery[photo] ?? b.image} alt={tc(b.name)} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/50 to-transparent" />
          <SaveButton id={`b:${b.slug}`} label={tc(b.name)} className="absolute right-4 top-4 sm:right-5 sm:top-5" />
          <div className="absolute bottom-0 flex w-full flex-wrap items-end justify-between gap-4 p-5 sm:p-8 text-navy-foreground">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge className="border-0 bg-card/95 text-navy hover:bg-card">{t("Sample Listing", "បញ្ជីគំរូ")}</Badge>
                {b.premium && <Badge className="border-0 bg-gold text-gold-foreground hover:bg-gold"><Crown className="mr-1 size-3" />{t("Premium", "កម្រិតពិសេស")}</Badge>}
                {b.verified && <Badge className="border-0 bg-teal text-primary-foreground hover:bg-teal"><BadgeCheck className="mr-1 size-3" />{t("Verified", "បានផ្ទៀងផ្ទាត់")}</Badge>}
              </div>
              <h1 className="mt-2 text-2xl font-extrabold sm:text-4xl">{tc(b.name)}</h1>
              <p className="mt-1 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-navy-foreground/85">
                <span className="flex items-center gap-1"><MapPin className="size-4" />{tc(b.location)}</span>
                <Rating value={b.rating} count={b.reviews} className="text-navy-foreground" />
                <span>{tc(b.category)}</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <InquiryDialog provider={tc(b.name)} trigger={<Button className="rounded-full bg-gold text-gold-foreground hover:bg-gold/90"><Send /> Send Inquiry</Button>} />
              <Button asChild variant="outline" className="rounded-full border-navy-foreground/40 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"><a href={`tel:${b.phone.replace(/\s/g, "")}`}><Phone /> {t("Call", "ហៅទូរសព្ទ")}</a></Button>
              <Button asChild variant="outline" className="rounded-full border-navy-foreground/40 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground"><a href={directions} target="_blank" rel="noreferrer"><Navigation /> {t("Directions", "ទិសដៅធ្វើដំណើរ")}</a></Button>
            </div>
          </div>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:gap-3">
          {b.gallery.map((g, i) => (
            <button key={g + i} type="button" onClick={() => setPhoto(i)} className={`h-20 w-28 overflow-hidden rounded-xl ${photo === i ? "ring-2 ring-teal ring-offset-2" : "opacity-80 hover:opacity-100"}`} aria-label={`Show photo ${i + 1}`}>
              <img src={g} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-navy">{t("Business Story", "រឿងរ៉ាវអាជីវកម្ម")}</h2>
            <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{tc(b.story)}</p>
            <p className="mt-3 font-script text-2xl text-teal">{tc(b.tagline)}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-navy">{t("Services & Pricing", "សេវាកម្ម និងតម្លៃ")}</h2>
            <div className="mt-4 divide-y overflow-hidden rounded-2xl border">
              {b.services.map((s) => (
                <div key={s.name} className="flex items-center justify-between p-4">
                  <span className="font-medium text-navy">{tc(s.name)}</span>
                  <span className="flex items-center gap-4">
                    <span className="font-semibold text-teal">{tc(s.price)}</span>
                    <InquiryDialog provider={tc(b.name)} trigger={<Button size="sm" variant="outline" className="rounded-full">Ask</Button>} />
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold text-navy">{t("Customer Reviews", "មតិអតិថិជន")}</h2>
                <Rating value={b.rating} count={b.reviews + (reviews.length - b.reviewList.length)} className="mt-1" />
              </div>
              <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
                <DialogTrigger asChild><Button variant="outline" className="rounded-full"><Star /> {t("Write a review", "សរសេរមតិវាយតម្លៃ")}</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>{t("Review", "មតិវាយតម្លៃ")} {tc(b.name)}</DialogTitle></DialogHeader>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button key={n} type="button" onClick={() => setStars(n)} aria-label={`${n} stars`}><Star className={`size-7 ${n <= stars ? "fill-gold text-gold" : "text-border"}`} /></button>
                    ))}
                  </div>
                  <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder={t("Share your experience…", "ចែករំលែកបទពិសោធន៍របស់អ្នក…")} rows={4} />
                  <Button onClick={() => {
                    if (!text.trim()) { toast.error("Please write a few words"); return; }
                    setReviews((r) => [{ name: "You", country: "Traveler", rating: stars, date: "Just now", text }, ...r]);
                    setText(""); setReviewOpen(false); toast.success("Thanks! Your review was posted.");
                  }}>{t("Post review", "ផ្សព្វផ្សាយមតិ")}</Button>
                </DialogContent>
              </Dialog>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {reviews.map((r, i) => (
                <div key={r.name + i} className="rounded-2xl border bg-card p-5 shadow-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="grid size-10 place-items-center rounded-full bg-teal-soft font-semibold text-teal">{r.name[0]}</span>
                      <div><p className="font-semibold text-navy">{tc(r.name)}</p><p className="text-xs text-muted-foreground">{tc(r.country)} · {tc(r.date)}</p></div>
                    </div>
                    <span className="flex">{Array.from({ length: r.rating }).map((_, k) => <Star key={k} className="size-3.5 fill-gold text-gold" />)}</span>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{tc(r.text)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl border bg-card p-6 shadow-card">
            <h3 className="font-semibold text-navy">{t("Opening Hours", "ម៉ោងបើក")}</h3>
            <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground"><Clock className="size-4 text-teal" />{tc(b.hours)}</p>
            <h3 className="mt-5 font-semibold text-navy">{t("Contact Information", "ព័ត៌មានទំនាក់ទំនង")}</h3>
            <a href={`tel:${b.phone.replace(/\s/g, "")}`} className="mt-1 flex items-center gap-2 text-sm text-muted-foreground hover:text-teal"><Phone className="size-4 text-teal" />{b.phone}</a>
            <a href={`mailto:${b.email}`} className="mt-1 flex items-center gap-2 text-sm text-muted-foreground hover:text-teal"><Mail className="size-4 text-teal" />{b.email}</a>
            <h3 className="mt-5 font-semibold text-navy">{t("Social Media", "បណ្តាញសង្គម")}</h3>
            <div className="mt-2 flex gap-2">
              <a href={`https://facebook.com/${b.social.facebook}`} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid size-9 place-items-center rounded-full bg-teal-soft text-teal hover:bg-teal hover:text-primary-foreground"><Facebook className="size-4" /></a>
              <a href={`https://instagram.com/${b.social.instagram.replace("@", "")}`} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid size-9 place-items-center rounded-full bg-teal-soft text-teal hover:bg-teal hover:text-primary-foreground"><Instagram className="size-4" /></a>
              <a href={`https://t.me/${b.social.telegram.replace("@", "")}`} target="_blank" rel="noreferrer" aria-label="Telegram" className="grid size-9 place-items-center rounded-full bg-teal-soft text-teal hover:bg-teal hover:text-primary-foreground"><MessageCircle className="size-4" /></a>
            </div>
            <InquiryDialog provider={tc(b.name)} trigger={<Button className="mt-6 w-full rounded-full bg-teal hover:bg-teal/90"><Send /> Send Inquiry</Button>} />
          </div>
          <div className="rounded-3xl border bg-card p-3 shadow-card">
            <p className="px-3 pb-2 pt-1 text-sm font-semibold text-navy">{t("Location Map", "ផែនទីទីតាំង")}</p>
            <MapMock className="h-60" showLegend={false} activeId={b.slug} pins={[{ id: b.slug, label: b.name, x: b.pin.x, y: b.pin.y, tone: "gold" }]} />
            <Button asChild variant="link" className="w-full text-teal"><a href={directions} target="_blank" rel="noreferrer">{t("Open in Google Maps", "បើកក្នុង Google Maps")}</a></Button>
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
      <h1 className="text-3xl font-bold text-navy">{t("Business not found", "រកមិនឃើញអាជីវកម្ម")}</h1>
      <Button asChild className="mt-6"><Link to="/businesses" search={{}}>{t("Back to directory", "ត្រឡប់ទៅបញ្ជីអាជីវកម្ម")}</Link></Button>
    </div>
); }
