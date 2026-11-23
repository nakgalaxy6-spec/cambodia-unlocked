import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Quote, HeartHandshake, Check, ArrowLeft, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DestinationCard } from "@/components/site/Cards";
import { InquiryDialog } from "@/components/site/InquiryDialog";
import { SectionHeading } from "@/components/site/Section";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Lotus } from "@/components/site/AngkorSkyline";
import { getDestination, getStory, stories } from "@/lib/data";

export const Route = createFileRoute("/stories/$slug")({
  loader: ({ params }) => {
    const s = getStory(params.slug);
    if (!s) throw notFound();
    return { slug: s.slug };
  },
  head: ({ loaderData }) => {
    const s = loaderData ? getStory(loaderData.slug) : undefined;
    const title = s ? `${s.title} – Community Story | Cambodia Unlocked` : "Community Story – Cambodia Unlocked";
    return {
      meta: [
        { title },
        { name: "description", content: s?.subtitle ?? "The stories behind Siem Reap's destinations." },
        { property: "og:title", content: title },
        { property: "og:description", content: s?.subtitle ?? "The stories behind Siem Reap's destinations." },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: NotFoundPage,
  component: StoryPage,
});

function StoryPage() {
  const { t, tc } = useI18n();
  const { slug } = Route.useLoaderData();
  const s = getStory(slug)!;
  const [lightbox, setLightbox] = useState<number | null>(null);
  const related = s.related.map(getDestination).filter((x): x is NonNullable<typeof x> => Boolean(x));
  const others = stories.filter((x) => x.slug !== s.slug);
  const lightImg = lightbox !== null ? s.gallery[lightbox] : undefined;

  return (
    <main>
      <section className="relative isolate overflow-hidden min-h-[300px] sm:min-h-[380px] flex items-end">
        <img src={s.image} alt={tc(s.title)} className="absolute inset-0 -z-10 h-full w-full object-cover object-center" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/60 to-navy/20 dark:from-navy-dark dark:via-navy-dark/70 dark:to-navy-dark/30" />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 pb-12 sm:pb-16 pt-24 sm:pt-36 text-navy-foreground">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">{t("Community Story", "រឿងរ៉ាវសហគមន៍")}</p>
          <h1 className="mt-2 max-w-3xl text-3xl font-extrabold sm:text-4xl md:text-5xl">{tc(s.title)}</h1>
          <p className="mt-3 max-w-2xl text-base sm:text-lg text-navy-foreground/85">{tc(s.subtitle)}</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1fr_360px]">
        <div className="space-y-12">
          <div>
            <SectionHeading eyebrow="01" title={t("Background Story", "ប្រវត្តិរឿងរ៉ាវ")} className="mb-4" />
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              {s.background.map((p) => <p key={p.slice(0, 20)}>{tc(p)}</p>)}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="02" title={t("Community Impact", "ផលប្រយោជន៍ដល់សហគមន៍")} className="mb-4" />
            <div className="grid gap-4 sm:grid-cols-3">
              {s.impact.map((i) => (
                <div key={i.label} className="rounded-2xl bg-teal-soft p-5">
                  <p className="font-display text-3xl font-bold text-teal">{i.value}</p>
                  <p className="mt-1 text-sm text-navy">{tc(i.label)}</p>
                </div>
              ))}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{t("Illustrative figures for the prototype.", "តួលេខឧទាហរណ៍សម្រាប់គំរូសាកល្បង។")}</p>
          </div>

          <div>
            <SectionHeading eyebrow="03" title={t("Local Families", "គ្រួសារក្នុងស្រុក")} className="mb-4" />
            <div className="grid gap-4 md:grid-cols-3">
              {s.families.map((f) => (
                <figure key={f.name} className="rounded-2xl border bg-card p-5 shadow-card">
                  <Quote className="size-6 text-gold" />
                  <blockquote className="mt-2 text-navy">“{tc(f.quote)}”</blockquote>
                  <figcaption className="mt-4 text-sm"><span className="font-semibold text-navy">{tc(f.name)}</span><br /><span className="text-muted-foreground">{tc(f.role)}</span></figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading eyebrow="04" title={t("Photo Gallery", "កម្រងរូបភាព")} className="mb-4" />
            <div className="grid grid-cols-3 gap-3">
              {s.gallery.map((g, i) => (
                <button key={g + i} type="button" onClick={() => setLightbox(i)} className={`overflow-hidden rounded-2xl ${i === 0 ? "col-span-2 row-span-2" : ""}`} aria-label={`Open photo ${i + 1}`}>
                  <img src={g} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 hover:scale-105" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-navy p-6 text-navy-foreground">
            <Lotus />
            <h2 className="mt-3 text-2xl font-bold">{t("Why Support This Community?", "ហេតុអ្វីគួរគាំទ្រសហគមន៍នេះ?")}</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {s.why.map((w) => <li key={w} className="flex gap-2"><Check className="mt-0.5 size-4 shrink-0 text-gold" />{w}</li>)}
            </ul>
            <InquiryDialog provider={tc(s.title)} trigger={<Button className="mt-6 w-full rounded-full bg-gold text-gold-foreground hover:bg-gold/90"><MessageCircle /> Contact the community</Button>} />
            {related[0] && (
              <Button asChild variant="ghost" className="mt-2 w-full rounded-full text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground">
                <Link to="/destinations/$slug" params={{ slug: related[0].slug }}><HeartHandshake /> {t("Visit", "ទៅទស្សនា")} {tc(related[0].name)}</Link>
              </Button>
            )}
          </div>
          <div className="rounded-3xl border p-5">
            <p className="text-sm font-semibold text-navy">{t("More stories", "រឿងរ៉ាវបន្ថែម")}</p>
            {others.map((o) => (
              <Link key={o.slug} to="/stories/$slug" params={{ slug: o.slug }} className="mt-3 flex items-center gap-3 rounded-xl p-1 hover:bg-muted">
                <img src={o.image} alt="" className="size-14 rounded-lg object-cover" />
                <span className="text-sm font-medium text-navy">{tc(o.title)}</span>
                <ArrowRight className="ml-auto size-4 text-teal" />
              </Link>
            ))}
          </div>
        </aside>
      </section>

      <section className="bg-sand py-14">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow="05" title={t("Related Experiences", "បទពិសោធន៍ពាក់ព័ន្ធ")} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((d) => <DestinationCard key={d.slug} d={d} />)}
          </div>
        </div>
      </section>

      <Dialog open={lightbox !== null} onOpenChange={(o) => !o && setLightbox(null)}>
        <DialogContent className="max-w-4xl p-2">
          {lightImg && <img src={lightImg} alt="" className="w-full rounded-lg" />}
          <div className="flex justify-between p-2">
            <Button variant="outline" size="sm" onClick={() => setLightbox((i) => (i === null ? 0 : (i - 1 + s.gallery.length) % s.gallery.length))}><ArrowLeft /> {t("Prev", "មុន")}</Button>
            <Button variant="outline" size="sm" onClick={() => setLightbox((i) => (i === null ? 0 : (i + 1) % s.gallery.length))}>{t("Next", "បន្ទាប់")} <ArrowRight /></Button>
          </div>
        </DialogContent>
      </Dialog>
      <SiteFooter />
    </main>
  );
}

function NotFoundPage() {
  const { t } = useI18n(); return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-navy">{t("Story not found", "រកមិនឃើញរឿងរ៉ាវ")}</h1>
      <Button asChild className="mt-6"><Link to="/">{t("Back home", "ត្រឡប់ទៅទំព័រដើម")}</Link></Button>
    </div>
); }
