import { useI18n } from "@/lib/i18n";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Map as MapIcon, LayoutGrid, Crown, UtensilsCrossed, Coffee, Hotel, Home, BedDouble, Users, Mountain, Bike, Bus, Car, HeartHandshake, Compass, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { BusinessCard, Rating } from "@/components/site/Cards";
import { MapMock } from "@/components/site/MapMock";
import { PageHeader, SectionHeading } from "@/components/site/Section";
import { SiteFooter } from "@/components/site/SiteFooter";
import { businessCategories, businesses } from "@/lib/data";
import { Link } from "@tanstack/react-router";

type DirSearch = { category?: string; q?: string };

export const Route = createFileRoute("/businesses/")({
  validateSearch: (s: Record<string, unknown>): DirSearch => {
    const o: DirSearch = {};
    if (typeof s["category"] === "string" && s["category"]) o.category = s["category"];
    if (typeof s["q"] === "string" && s["q"]) o.q = s["q"];
    return o;
  },
  head: () => ({
    meta: [
      { title: "Local Business Directory – Cambodia Unlocked" },
      { name: "description", content: "Restaurants, cafes, homestays, tour guides, tuk tuks and community tourism in Siem Reap – contact them directly." },
      { property: "og:title", content: "Local Business Directory – Cambodia Unlocked" },
      { property: "og:description", content: "Find and contact verified local businesses in Siem Reap." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Directory,
});

const icons = [UtensilsCrossed, Coffee, Hotel, Home, BedDouble, Users, Mountain, Bike, Car, Bus, HeartHandshake, Compass, ShoppingBag];

function Directory() {
  const { t, tc } = useI18n();
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/businesses/" });
  const [q, setQ] = useState(search.q ?? "");
  const [sort, setSort] = useState("recommended");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [view, setView] = useState<"split" | "list">("split");
  const [active, setActive] = useState<string | null>(null);
  const cat = search.category;

  const list = useMemo(() => {
    const term = (search.q ?? "").toLowerCase();
    const r = businesses.filter((b) => (!cat || b.category === cat) && (!verifiedOnly || b.verified) && (!term || `${b.name} ${b.category} ${b.tagline}`.toLowerCase().includes(term)));
    if (sort === "rating") return [...r].sort((a, b) => b.rating - a.rating);
    if (sort === "price") return [...r].sort((a, b) => a.priceFrom - b.priceFrom);
    return [...r].sort((a, b) => Number(b.premium) - Number(a.premium));
  }, [cat, verifiedOnly, sort, search.q]);

  const featured = businesses.filter((b) => b.premium).slice(0, 3);
  const setCat = (c?: string) => navigate({ search: (p) => { const n: DirSearch = {}; if (p.q) n.q = p.q; if (c) n.category = c; return n; } });

  return (
    <main>
      <PageHeader eyebrow={t("Siem Reap Pilot", "គម្រោងសាកល្បងនៅសៀមរាប")} title={t("Local Business Directory", "បញ្ជីអាជីវកម្មក្នុងស្រុក")} subtitle={t("Discover and contact local businesses directly. Every inquiry goes straight to the owner.", "ស្វែងរក និងទាក់ទងអាជីវកម្មក្នុងស្រុកដោយផ្ទាល់។ សំណួរនីមួយៗត្រូវបានផ្ញើទៅម្ចាស់អាជីវកម្មដោយផ្ទាល់។")}>
        <form onSubmit={(e) => { e.preventDefault(); navigate({ search: (p) => { const n: DirSearch = {}; if (q) n.q = q; if (p.category) n.category = p.category; return n; } }); }} className="mt-6 flex max-w-2xl items-center gap-2 rounded-full border bg-card p-1.5 shadow-card">
          <Search className="ml-3 size-5 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} aria-label={t("Search businesses", "ស្វែងរកអាជីវកម្ម")} placeholder={t("Search restaurants, homestays, guides…", "ស្វែងរកភោជនីយដ្ឋាន ផ្ទះស្នាក់នៅ មគ្គុទ្ទេសក៍…")} className="h-10 flex-1 bg-transparent text-sm outline-none" />
          <Button type="submit" className="rounded-full bg-teal hover:bg-teal/90">{t("Search", "ស្វែងរក")}</Button>
        </form>
      </PageHeader>

      <section className="mx-auto max-w-7xl px-6 pt-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button type="button" onClick={() => setCat()} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium ${!cat ? "border-navy bg-navy text-navy-foreground" : "text-muted-foreground hover:border-teal"}`}>{t("All", "ទាំងអស់")}</button>
          {businessCategories.map((c, i) => {
            const Icon = icons[i] ?? Users;
            return (
              <button key={c} type="button" onClick={() => setCat(c)} className={`flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition ${cat === c ? "border-navy bg-navy text-navy-foreground" : "text-muted-foreground hover:border-teal hover:text-teal"}`}>
                <Icon className="size-4" />{tc(c)}
              </button>
            );
          })}
        </div>
      </section>

      {!cat && !search.q && (
        <section className="mx-auto max-w-7xl px-6 pt-8">
          <SectionHeading eyebrow={t("Premium listings", "បញ្ជីកម្រិតពិសេស")} title={t("Featured Businesses", "អាជីវកម្មលេចធ្លោ")} />
          <div className="grid gap-5 md:grid-cols-3">
            {featured.map((b) => (
              <Link key={b.slug} to="/businesses/$slug" params={{ slug: b.slug }} className="group relative overflow-hidden rounded-3xl">
                <img src={b.image} alt={tc(b.name)} loading="lazy" className="aspect-[4/3] w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/90 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-gold px-2.5 py-1 text-xs font-semibold text-gold-foreground"><Crown className="size-3.5" /> {t("Featured", "លេចធ្លោ")}</span>
                <div className="absolute bottom-0 p-5 text-navy-foreground">
                  <p className="text-xs text-gold">{tc(b.category)}</p>
                  <h3 className="text-xl font-bold">{tc(b.name)}</h3>
                  <Rating value={b.rating} count={b.reviews} className="text-navy-foreground" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <p className="text-sm text-muted-foreground"><span className="font-semibold text-navy">{list.length}</span> {t("businesses", "អាជីវកម្ម")}{cat && <> {t("in", "ក្នុងប្រភេទ")} {tc(cat)}</>}</p>
          <div className="ml-auto flex items-center gap-3">
            <div className="flex items-center gap-2"><Switch id="ver" checked={verifiedOnly} onCheckedChange={setVerifiedOnly} /><Label htmlFor="ver">{t("Verified only", "តែអាជីវកម្មដែលបានផ្ទៀងផ្ទាត់")}</Label></div>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="h-9 w-44 rounded-full" aria-label="Sort"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">{t("Recommended", "បានណែនាំ")}</SelectItem>
                <SelectItem value="rating">{t("Highest rated", "ពិន្ទុខ្ពស់បំផុត")}</SelectItem>
                <SelectItem value="price">{t("Lowest price", "តម្លៃទាបបំផុត")}</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex rounded-full border p-1">
              <button type="button" onClick={() => setView("split")} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${view === "split" ? "bg-navy text-navy-foreground" : "text-muted-foreground"}`}><MapIcon className="size-4" /> {t("Map", "ផែនទី")}</button>
              <button type="button" onClick={() => setView("list")} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm ${view === "list" ? "bg-navy text-navy-foreground" : "text-muted-foreground"}`}><LayoutGrid className="size-4" /> {t("List", "បញ្ជី")}</button>
            </div>
          </div>
        </div>
        {list.length === 0 ? (
          <div className="rounded-2xl border border-dashed p-12 text-center">
            <p className="font-semibold text-navy">{t("No businesses listed here yet.", "មិនទាន់មានអាជីវកម្មក្នុងបញ្ជីនេះទេ។")}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t("Know one? Invite them to join for free.", "ស្គាល់អាជីវកម្មណាមួយទេ? អញ្ជើញពួកគេចូលរួមដោយឥតគិតថ្លៃ។")}</p>
            <Button asChild className="mt-4"><Link to="/join">{t("Register a business", "ចុះឈ្មោះអាជីវកម្ម")}</Link></Button>
          </div>
        ) : (
          <div className={view === "split" ? "grid gap-6 lg:grid-cols-[1fr_480px]" : ""}>
            <div className={view === "split" ? "grid gap-4" : "grid gap-4 md:grid-cols-2"}>
              {list.map((b) => <div key={b.slug} onMouseEnter={() => setActive(b.slug)}><BusinessCard b={b} active={active === b.slug} /></div>)}
            </div>
            {view === "split" && (
              <div className="lg:sticky lg:top-24 lg:h-[600px]">
                <MapMock className="h-[420px] lg:h-full" activeId={active} onPinClick={setActive} pins={list.map((b) => ({ id: b.slug, label: b.name, x: b.pin.x, y: b.pin.y, tone: b.premium ? "gold" : "teal" }))} />
              </div>
            )}
          </div>
        )}
      </section>
      <SiteFooter />
    </main>
  );
}
