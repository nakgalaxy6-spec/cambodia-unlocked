import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/site/Section";
import { SiteFooter } from "@/components/site/SiteFooter";
import { stories, storyCategories } from "@/lib/data";

export const Route = createFileRoute("/stories/")({
  head: () => ({
    meta: [
      { title: "Community Stories – Cambodia Unlocked" },
      { name: "description", content: "Human-centered stories of villages, homestays, farmers, artisans, guides and local businesses in Siem Reap." },
      { property: "og:title", content: "Community Stories – Cambodia Unlocked" },
      { property: "og:description", content: "The people behind Siem Reap's places." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StoriesIndex,
});

function StoriesIndex() {
  const { t, tc } = useI18n();
  const [cat, setCat] = useState<string | null>(null);
  const list = stories.filter((s) => !cat || s.category === cat);
  return (
    <main>
      <PageHeader eyebrow={t("Human-centered storytelling", "រឿងរ៉ាវផ្តោតលើជីវិតមនុស្ស")} title={t("Stories", "រឿងរ៉ាវ")} subtitle={t("Meet the villages, families, artisans and guides behind every experience.", "ស្គាល់ភូមិ គ្រួសារ សិប្បករ និងមគ្គុទ្ទេសក៍នៅពីក្រោយបទពិសោធន៍នីមួយៗ។")} />
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={() => setCat(null)} className={`rounded-full border px-4 py-2 text-sm font-medium ${!cat ? "border-navy bg-navy text-navy-foreground" : "text-muted-foreground hover:border-teal"}`}>{t("All", "ទាំងអស់")}</button>
          {storyCategories.map((c) => (
            <button key={c} type="button" onClick={() => setCat(c)} className={`rounded-full border px-4 py-2 text-sm font-medium ${cat === c ? "border-navy bg-navy text-navy-foreground" : "text-muted-foreground hover:border-teal hover:text-teal"}`}>{tc(c)}</button>
          ))}
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {list.map((s) => (
            <Link key={s.slug} to="/stories/$slug" params={{ slug: s.slug }} className="group overflow-hidden rounded-2xl border bg-card shadow-card transition hover:shadow-lift">
              <div className="aspect-[16/10] overflow-hidden"><img src={s.image} alt={tc(s.title)} loading="lazy" className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" /></div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-teal">{tc(s.category)}</p>
                <h3 className="mt-1 text-lg font-semibold text-navy">{tc(s.title)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{tc(s.subtitle)}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-teal">{t("Read story", "អានរឿង")} <ArrowRight className="size-4" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
