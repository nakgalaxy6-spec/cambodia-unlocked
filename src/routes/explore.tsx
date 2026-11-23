import { useI18n } from "@/lib/i18n";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Map as MapIcon, LayoutGrid, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DestinationCard } from "@/components/site/Cards";
import { MapMock } from "@/components/site/MapMock";
import { PageHeader } from "@/components/site/Section";
import { SiteFooter } from "@/components/site/SiteFooter";
import { destinationCategories, destinations } from "@/lib/data";

type ExploreSearch = { q?: string; category?: string };

export const Route = createFileRoute("/explore")({
  validateSearch: (s: Record<string, unknown>): ExploreSearch => {
    const out: ExploreSearch = {};
    if (typeof s["q"] === "string" && s["q"]) out.q = s["q"];
    if (typeof s["category"] === "string" && s["category"]) out.category = s["category"];
    return out;
  },
  head: () => ({
    meta: [
      { title: "Explore Destinations in Siem Reap – Cambodia Unlocked" },
      { name: "description", content: "Filter Siem Reap destinations by location, category, budget, opening hours and family friendliness – with map view." },
      { property: "og:title", content: "Explore Destinations in Siem Reap – Cambodia Unlocked" },
      { property: "og:description", content: "Lotus farms, floating villages, temples and village workshops on one map." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Explore,
});

const ALL = "all";
const locations = ["Siem Reap Town", "Countryside", "Tonle Sap", "Angkor Park", "Kulen Mountain"];
const budgets = ["Under $20", "$20 – $40", "$40+"];

function Explore() {
  const { t, tc } = useI18n();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/explore" });
  const [q, setQ] = useState(search.q ?? "");
  const [location, setLocation] = useState(ALL);
  const [budget, setBudget] = useState(ALL);
  const [openNow, setOpenNow] = useState(false);
  const [family, setFamily] = useState(false);
  const [view, setView] = useState<"split" | "grid">("split");
  const [active, setActive] = useState<string | null>(null);
  const category = search.category ?? ALL;

  const results = useMemo(() => {
    const term = (search.q ?? "").toLowerCase();
    return destinations.filter((d) => {
      if (term && !`${d.name} ${d.location} ${d.category} ${d.short}`.toLowerCase().includes(term)) return false;
      if (category !== ALL && d.category !== category) return false;
      if (location !== ALL && d.area !== location) return false;
      if (budget !== ALL && d.budget !== budget) return false;
      if (openNow && !d.openNow) return false;
      if (family && !d.familyFriendly) return false;
      return true;
    });
  }, [search.q, category, location, budget, openNow, family]);

  const setCategory = (v: string) => navigate({ search: (prev) => { const n: ExploreSearch = {}; if (prev.q) n.q = prev.q; if (v !== ALL) n.category = v; return n; } });
  const reset = () => {
    setQ(""); setLocation(ALL); setBudget(ALL); setOpenNow(false); setFamily(false);
    navigate({ search: {} });
  };

  return (
    <main>
      <PageHeader eyebrow={t("Siem Reap Pilot", "គម្រោងសាកល្បងនៅសៀមរាប")} title={t("Explore Destinations", "ស្វែងរកគោលដៅទេសចរណ៍")} subtitle={t("Authentic places and experiences across the Siem Reap pilot area.", "ទីកន្លែង និងបទពិសោធន៍ពិតប្រាកដនៅទូទាំងតំបន់គម្រោងសាកល្បងសៀមរាប។")}>
        <form
          onSubmit={(e) => { e.preventDefault(); navigate({ search: (prev) => { const n: ExploreSearch = {}; if (q) n.q = q; if (prev.category) n.category = prev.category; return n; } }); }}
          className="mt-6 flex max-w-2xl items-center gap-2 rounded-full border bg-card p-1.5 shadow-card"
        >
          <Search className="ml-3 size-5 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} aria-label={t("Search destinations", "ស្វែងរកគោលដៅទេសចរណ៍")} placeholder={t("Search destinations, businesses, experiences or events", "ស្វែងរកគោលដៅទេសចរណ៍ អាជីវកម្ម បទពិសោធន៍ ឬព្រឹត្តិការណ៍")} className="h-10 flex-1 bg-transparent text-sm outline-none" />
          <Button type="submit" className="rounded-full bg-teal hover:bg-teal/90">{t("Search", "ស្វែងរក")}</Button>
        </form>
      </PageHeader>

      <div className="sticky top-16 z-30 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-6 py-3">
          <SlidersHorizontal className="size-4 text-teal" />
          <FilterSelect label={t("Location", "ទីតាំង")} value={location} onChange={setLocation} options={locations} />
          <FilterSelect label={t("Category", "ប្រភេទ")} value={category} onChange={setCategory} options={[...destinationCategories]} />
          <FilterSelect label={t("Budget", "ថវិកា")} value={budget} onChange={setBudget} options={budgets} />
          <div className="flex items-center gap-2 rounded-full border px-3 py-1.5">
            <Switch id="open-now" checked={openNow} onCheckedChange={setOpenNow} />
            <Label htmlFor="open-now" className="text-sm">{t("Open Now", "កំពុងបើក")}</Label>
          </div>
          <div className="flex items-center gap-2 rounded-full border px-3 py-1.5">
            <Switch id="family" checked={family} onCheckedChange={setFamily} />
            <Label htmlFor="family" className="text-sm">{t("Family Friendly", "សមស្របសម្រាប់គ្រួសារ")}</Label>
          </div>
          <Button variant="ghost" size="sm" onClick={reset}><X /> {t("Clear", "សម្អាត")}</Button>
          <div className="ml-auto flex rounded-full border p-1">
            <button type="button" onClick={() => setView("split")} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${view === "split" ? "bg-navy text-navy-foreground" : "text-muted-foreground"}`}><MapIcon className="size-4" /> {t("Map", "ផែនទី")}</button>
            <button type="button" onClick={() => setView("grid")} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${view === "grid" ? "bg-navy text-navy-foreground" : "text-muted-foreground"}`}><LayoutGrid className="size-4" /> {t("List", "បញ្ជី")}</button>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-8">
        <p className="mb-4 text-sm text-muted-foreground">
          <span className="font-semibold text-navy">{results.length}</span> {t("places found", "កន្លែងត្រូវបានរកឃើញ")}
          {search.q && <> {t("for “", "សម្រាប់ «")}{search.q}”</>}
          {category !== ALL && <> {t("in", "ក្នុងប្រភេទ")} {tc(category)}</>}
        </p>
        {results.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-12 text-center">
            <p className="font-semibold text-navy">{t("No places match these filters.", "មិនមានកន្លែងដែលត្រូវនឹងលក្ខខណ្ឌទាំងនេះទេ។")}</p>
            <Button className="mt-4" onClick={reset}>{t("Clear filters", "សម្អាតតម្រង")}</Button>
          </div>
        ) : view === "split" ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_520px]">
            <div className="grid gap-5 sm:grid-cols-2">
              {results.map((d) => (
                <div key={d.slug} onMouseEnter={() => setActive(d.slug)}>
                  <DestinationCard d={d} active={active === d.slug} />
                </div>
              ))}
            </div>
            <div className="lg:sticky lg:top-36 lg:h-[640px]">
              <MapMock className="h-[480px] lg:h-full" activeId={active} onPinClick={setActive} pins={results.map((d) => ({ id: d.slug, label: `${d.name} · $${d.price}`, x: d.pin.x, y: d.pin.y }))} />
            </div>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {results.map((d) => <DestinationCard key={d.slug} d={d} />)}
          </div>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  const { t, tc } = useI18n();
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-9 w-auto min-w-36 rounded-full" aria-label={label}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={ALL}>{tc(label)}{t(": All", "៖ ទាំងអស់")}</SelectItem>
        {options.map((o) => <SelectItem key={o} value={o}>{tc(o)}</SelectItem>)}
      </SelectContent>
    </Select>
  );
}
