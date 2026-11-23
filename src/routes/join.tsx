import { useI18n } from "@/lib/i18n";
import { createFileRoute, Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { InquiryForm } from "@/components/site/InquiryDialog";
import { PageHeader } from "@/components/site/Section";
import { SiteFooter } from "@/components/site/SiteFooter";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Join & Contact – Cambodia Unlocked" },
      { name: "description", content: "Register your Siem Reap business for free or contact a local provider directly." },
      { property: "og:title", content: "Join & Contact – Cambodia Unlocked" },
      { property: "og:description", content: "Free business profiles for local Siem Reap businesses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Join,
});

function Join() {
  const { t, tc } = useI18n();
  return (
    <main>
      <PageHeader eyebrow={t("Join & Contact", "ចូលរួម និងទំនាក់ទំនង")} title={t("Register Your Business", "ចុះឈ្មោះអាជីវកម្មរបស់អ្នក")} subtitle={t("Free listing, photos, contact details and customer inquiries.", "ចុះបញ្ជី រូបភាព ព័ត៌មានទំនាក់ទំនង និងទទួលសំណួរពីអតិថិជនដោយឥតគិតថ្លៃ។")} />
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-2">
        <form
          className="space-y-3 rounded-2xl border bg-card p-6 shadow-card"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            if (!String(fd.get("business") ?? "").trim()) { toast.error(t("Please add your business name", "សូមបញ្ចូលឈ្មោះអាជីវកម្មរបស់អ្នក")); return; }
            toast.success(t("Registration received", "បានទទួលការចុះឈ្មោះ"), { description: t("Our team will verify your listing within 2 days.", "ក្រុមការងាររបស់យើងនឹងផ្ទៀងផ្ទាត់ការចុះបញ្ជីរបស់អ្នកក្នុងរយៈពេល 2 ថ្ងៃ។") });
            e.currentTarget.reset();
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-bold text-navy">{t("Register Your Business", "ចុះឈ្មោះអាជីវកម្មរបស់អ្នក")}</h2><Button asChild variant="outline"><Link to="/become-guide">{t("Become a Tour Guide", "ក្លាយជាមគ្គុទ្ទេសក៍")}</Link></Button></div>
          {([["business", t("Business name", "ឈ្មោះអាជីវកម្ម")], ["category", t("Category", "ប្រភេទ")], ["contact", t("Contact person", "អ្នកទំនាក់ទំនង")], ["email", t("Email", "អ៊ីមែល")], ["phone", t("Phone", "លេខទូរសព្ទ")]] as [string, string][]).map(([n, l]) => (
            <div key={n} className="space-y-1.5"><Label htmlFor={`j-${n}`}>{tc(l)}</Label><Input id={`j-${n}`} name={n} /></div>
          ))}
          <div className="flex items-center gap-2"><Checkbox id="j-agree" /><Label htmlFor="j-agree">{t("I agree to the listing terms", "ខ្ញុំយល់ព្រមតាមលក្ខខណ្ឌចុះបញ្ជី")}</Label></div>
          <Button type="submit" className="w-full bg-gold text-gold-foreground hover:bg-gold/90">{t("Register My Business", "ចុះឈ្មោះអាជីវកម្មរបស់ខ្ញុំ")}</Button>
        </form>
        <div className="rounded-2xl border bg-card p-6 shadow-card">
          <h2 className="mb-3 text-xl font-bold text-navy">{t("Contact a Local Provider", "ទាក់ទងអ្នកផ្តល់សេវាក្នុងស្រុក")}</h2>
          <InquiryForm provider={t("a local provider", "អ្នកផ្តល់សេវាក្នុងស្រុក")} />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
