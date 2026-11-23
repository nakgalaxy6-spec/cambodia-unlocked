import { useI18n } from "@/lib/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, MapPin, User, Tag, CalendarPlus, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EventCard } from "@/components/site/Cards";
import { InquiryDialog } from "@/components/site/InquiryDialog";
import { SiteFooter } from "@/components/site/SiteFooter";
import { events, type EventItem, type EventPeriod } from "@/lib/data";
import { img } from "@/lib/images";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events & Festivals in Siem Reap – Cambodia Unlocked" },
      { name: "description", content: "Khmer New Year, Water Festival, Angkor Sankranta and local community festivals – today, this week, this month." },
      { property: "og:title", content: "Events & Festivals in Siem Reap – Cambodia Unlocked" },
      { property: "og:description", content: "What's on in Siem Reap, from village festivals to national celebrations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: EventsPage,
});

const tabs: EventPeriod[] = ["Today", "This Week", "This Month", "Annual Festivals"];
const cats = ["All", "Culture", "Community", "Workshop", "Local Community Festival", "Annual Festival"];

function EventsPage() {
  const { t, tc } = useI18n();
  const [tab, setTab] = useState<EventPeriod>("This Week");
  const [cat, setCat] = useState("All");
  const [open, setOpen] = useState<EventItem | null>(null);
  const list = events.filter((e) => e.periods.includes(tab) && (cat === "All" || e.category === cat));

  return (
    <main>
      <section className="relative isolate overflow-hidden min-h-[260px] sm:min-h-[340px] flex items-center">
        <img
          src={img.water}
          alt={t("Dragon boat race at the Water Festival", "ការប្រណាំងទូកងក្នុងព្រះរាជពិធីបុណ្យអុំទូក")}
          className="absolute inset-0 -z-10 h-full w-full object-cover object-[center_right] sm:object-right"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy/95 via-navy/85 sm:via-navy/70 to-navy/40 dark:from-navy-dark/95 dark:via-navy-dark/85 dark:to-navy-dark/40" />
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-14 sm:py-20 text-navy-foreground">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">{t("What's on", "ព្រឹត្តិការណ៍នាពេលខាងមុខ")}</p>
          <h1 className="mt-2 text-3xl font-extrabold sm:text-5xl">{t("Events in Siem Reap", "ព្រឹត្តិការណ៍នៅសៀមរាប")}</h1>
          <p className="mt-3 max-w-xl text-sm sm:text-base text-navy-foreground/90">{t("From village harvest days to Cambodia's biggest national festivals.", "ពីថ្ងៃប្រមូលផលក្នុងភូមិ រហូតដល់ពិធីបុណ្យជាតិធំៗរបស់កម្ពុជា។")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Tabs value={tab} onValueChange={(v) => setTab(v as EventPeriod)}>
            <TabsList className="h-11 rounded-full p-1">
              {tabs.map((t) => <TabsTrigger key={t} value={t} className="rounded-full px-5 data-[state=active]:bg-navy data-[state=active]:text-navy-foreground">{tc(t)}</TabsTrigger>)}
            </TabsList>
          </Tabs>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button key={c} type="button" onClick={() => setCat(c)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${cat === c ? "border-teal bg-teal text-primary-foreground" : "text-muted-foreground hover:border-teal hover:text-teal"}`}>{tc(c)}</button>
            ))}
          </div>
        </div>
        <p className="mt-6 text-sm text-muted-foreground"><span className="font-semibold text-navy">{list.length}</span> {t("events ·", "ព្រឹត្តិការណ៍ ·")} {tc(tab)}</p>
        {list.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed p-12 text-center text-muted-foreground">{t("No events in this category for", "មិនមានព្រឹត្តិការណ៍ក្នុងប្រភេទនេះសម្រាប់")} {tab.toLowerCase()}.</div>
        ) : (
          <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {list.map((e) => <EventCard key={e.slug} e={e} onOpen={() => setOpen(e)} />)}
          </div>
        )}
      </section>

      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent className="max-w-lg overflow-hidden p-0">
          {open && (
            <>
              <img src={open.image} alt={tc(open.name)} className="aspect-[16/9] w-full object-cover" />
              <div className="space-y-4 p-6 pt-2">
                <DialogHeader>
                  <DialogTitle className="text-2xl text-navy">{tc(open.name)}</DialogTitle>
                  <DialogDescription>{tc(open.description)}</DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <p className="flex items-center gap-2"><CalendarDays className="size-4 text-teal" />{tc(open.date)}</p>
                  <p className="flex items-center gap-2"><MapPin className="size-4 text-teal" />{tc(open.location)}</p>
                  <p className="flex items-center gap-2"><Tag className="size-4 text-teal" />{tc(open.category)}</p>
                  <p className="flex items-center gap-2"><User className="size-4 text-teal" />{tc(open.organizer)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button className="rounded-full bg-teal hover:bg-teal/90" onClick={() => { toast.success(`${open.name} added to My Trips`); setOpen(null); }}><CalendarPlus /> {t("Add to my trip", "បន្ថែមទៅដំណើររបស់ខ្ញុំ")}</Button>
                  <InquiryDialog provider={tc(open.organizer)} trigger={<Button variant="outline" className="rounded-full">Contact organizer</Button>} />
                  <Button variant="ghost" className="rounded-full" onClick={() => toast.success("Event link copied")}><Share2 /> {t("Share", "ចែករំលែក")}</Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <SiteFooter />
    </main>
  );
}
