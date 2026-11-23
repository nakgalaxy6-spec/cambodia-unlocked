import { useI18n } from "@/lib/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Phone, MapPin } from "lucide-react";
import { Rating } from "@/components/site/Cards";
import { InquiryDialog } from "@/components/site/InquiryDialog";
import { MapMock } from "@/components/site/MapMock";
import { PageHeader, SectionHeading } from "@/components/site/Section";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Button } from "@/components/ui/button";
import { guideCategories, supportCategories, tourGuides, travelSupport } from "@/lib/people";

export const Route = createFileRoute("/guides")({
  head: () => ({
    meta: [
      { title: "Tour Guides & Travel Support – Cambodia Unlocked" },
      { name: "description", content: "Find verified local tour guides in Siem Reap plus emergency contacts, hospitals, transport and travel resources." },
      { property: "og:title", content: "Tour Guides & Travel Support – Cambodia Unlocked" },
      { property: "og:description", content: "Local guides and essential travel help in Siem Reap." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GuidesPage,
});

function GuidesPage() {
  const { t, tc } = useI18n();
  const pins = travelSupport.flatMap((g) => g.items.flatMap((i) => i.entries.filter((e) => e.pin).map((e) => ({ id: e.name, label: e.name, x: e.pin!.x, y: e.pin!.y, tone: "lotus" as const }))));
  return (
    <main>
      <PageHeader eyebrow={t("Siem Reap Pilot", "គម្រោងសាកល្បងនៅសៀមរាប")} title={t("Tour Guides & Travel Support", "មគ្គុទ្ទេសក៍ទេសចរណ៍ និងជំនួយធ្វើដំណើរ")} subtitle={t("Connect with verified local guides and find the help you need while travelling.", "ទាក់ទងមគ្គុទ្ទេសក៍ក្នុងស្រុកដែលបានផ្ទៀងផ្ទាត់ និងស្វែងរកជំនួយដែលអ្នកត្រូវការពេលធ្វើដំណើរ។")} />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <SectionHeading eyebrow={t("Tour guides", "មគ្គុទ្ទេសក៍ទេសចរណ៍")} title={t("Guide Categories", "ប្រភេទមគ្គុទ្ទេសក៍")} />
        <div className="grid gap-4 md:grid-cols-3">
          {guideCategories.map((c) => (
            <div key={c.id} className="rounded-2xl border bg-card p-5 shadow-card">
              <h3 className="font-semibold text-navy">{tc(c.name)}</h3>
              <div className="mt-2 flex flex-wrap gap-1.5">{c.items.map((i) => <span key={i} className="rounded-full bg-teal-soft px-2.5 py-1 text-xs text-navy">{i}</span>)}</div>
            </div>
          ))}
        </div>
        <SectionHeading eyebrow={t("Verified locals", "អ្នកក្នុងស្រុកដែលបានផ្ទៀងផ្ទាត់")} title={t("Featured Tour Guides", "មគ្គុទ្ទេសក៍ទេសចរណ៍លេចធ្លោ")} className="mt-12" />
        <div className="grid gap-5 md:grid-cols-3">
          {tourGuides.map((g) => (
            <div key={g.slug} className="overflow-hidden rounded-2xl border bg-card shadow-card">
              <img src={g.photo ?? g.cover} alt={tc(g.name)} loading="lazy" className="aspect-[4/3] w-full object-cover object-top" />
              <div className="space-y-1.5 p-4">
                <h3 className="flex items-center gap-1 font-semibold text-navy">{tc(g.name)}{g.verified && <BadgeCheck className="size-4 text-teal" aria-label={t("Verified", "បានផ្ទៀងផ្ទាត់")} />}</h3>
                <p className="text-xs text-muted-foreground">{g.languages.join(" · ")} · {g.years} {t("yrs experience · Responds", "ឆ្នាំបទពិសោធន៍ · ឆ្លើយតប")} {g.responseRate}</p>
                <Rating value={g.rating} count={g.reviews} />
                <p className="text-sm text-muted-foreground">{tc(g.bio)}</p>
                <InquiryDialog provider={tc(g.name)} trigger={<Button size="sm" className="mt-2 rounded-full bg-teal hover:bg-teal/90">Send Inquiry</Button>} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="travel-support" className="bg-sky py-12">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeading eyebrow={t("Stay safe", "ធ្វើដំណើរដោយសុវត្ថិភាព")} title={t("Travel Support", "ជំនួយធ្វើដំណើរ")} />
          <div className="mb-6 flex flex-wrap gap-2">{supportCategories.map((c) => <span key={c} className="rounded-full border bg-card px-3 py-1.5 text-sm text-navy">{tc(c)}</span>)}</div>
          <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
            <div className="grid gap-4 md:grid-cols-3">
              {travelSupport.map((g) => (
                <div key={g.id} className="rounded-2xl border bg-card p-5 shadow-card">
                  <h3 className="font-semibold text-navy">{tc(g.title)}</h3>
                  {g.items.map((i) => (
                    <div key={i.heading} className="mt-3">
                      <p className="text-xs font-semibold uppercase tracking-widest text-teal">{i.heading}</p>
                      {i.entries.map((e) => (
                        <div key={e.name} className="mt-1 text-sm">
                          <p className="font-medium text-navy">{tc(e.name)}</p>
                          <p className="text-xs text-muted-foreground">{e.detail}</p>
                          {e.phone && <a href={`tel:${e.phone.replace(/\s/g, "")}`} className="flex items-center gap-1 text-xs text-teal"><Phone className="size-3" />{e.phone}</a>}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div>
              <p className="mb-2 flex items-center gap-1 text-sm font-semibold text-navy"><MapPin className="size-4 text-teal" /> {t("Important Locations Map", "ផែនទីទីតាំងសំខាន់ៗ")}</p>
              <MapMock className="h-[420px]" pins={pins} />
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
