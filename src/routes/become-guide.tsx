import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ArrowDown, BadgeCheck, Check, Crown, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PageHeader } from "@/components/site/Section";
import { SiteFooter } from "@/components/site/SiteFooter";
import { coveredAreaList, expertiseList } from "@/lib/people";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/become-guide")({
  head: () => ({
    meta: [
      { title: "Become a Tour Guide – Cambodia Unlocked" },
      { name: "description", content: "Create a free professional guide profile, get verified and reach travelers in Siem Reap directly." },
      { property: "og:title", content: "Become a Tour Guide – Cambodia Unlocked" },
      { property: "og:description", content: "Free guide profiles for licensed local guides in Siem Reap." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BecomeGuide,
});

const languages = [
  ["English", "អង់គ្លេស"], ["Khmer", "ខ្មែរ"], ["French", "បារាំង"], ["Chinese", "ចិន"], ["Japanese", "ជប៉ុន"], ["Korean", "កូរ៉េ"],
] as const;

const steps = [
  ["Register", "ចុះឈ្មោះ"], ["Submit Information", "ដាក់ស្នើព័ត៌មាន"], ["Get Verified", "ទទួលការផ្ទៀងផ្ទាត់"],
  ["Create Tours", "បង្កើតដំណើរកម្សាន្ត"], ["Receive Travelers", "ទទួលអ្នកដំណើរ"], ["Build Reputation", "កសាងកេរ្តិ៍ឈ្មោះ"],
] as const;

function BecomeGuide() {
  const { t, tc } = useI18n();
  const [langs, setLangs] = useState<string[]>(["English", "Khmer"]);
  const toggle = (l: string) => setLangs((cur) => (cur.includes(l) ? cur.filter((x) => x !== l) : [...cur, l]));

  return (
    <main>
      <PageHeader
        eyebrow={t("Join as a guide", "ចូលរួមជាមគ្គុទ្ទេសក៍")}
        title={t("Become a Tour Guide", "ក្លាយជាមគ្គុទ្ទេសក៍ទេសចរណ៍")}
        subtitle={t("Create a professional profile, reach travelers directly and promote your tours — free to start.", "បង្កើតប្រវត្តិរូបវិជ្ជាជីវៈ ទាក់ទងអ្នកដំណើរដោយផ្ទាល់ និងផ្សព្វផ្សាយដំណើរកម្សាន្តរបស់អ្នក — ចាប់ផ្តើមដោយឥតគិតថ្លៃ។")}
      />
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[1.4fr_1fr]">
        <form
          className="space-y-4 rounded-2xl border bg-card p-6 shadow-card"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            if (!String(fd.get("name") ?? "").trim() || !String(fd.get("phone") ?? "").trim()) {
              toast.error(t("Please add your name and phone number", "សូមបញ្ចូលឈ្មោះ និងលេខទូរសព្ទរបស់អ្នក"));
              return;
            }
            toast.success(t("Application received", "បានទទួលពាក្យស្នើសុំ"), {
              description: t("We'll verify your guide license within 3 days.", "យើងនឹងផ្ទៀងផ្ទាត់អាជ្ញាប័ណ្ណមគ្គុទ្ទេសក៍របស់អ្នកក្នុងរយៈពេល 3 ថ្ងៃ។"),
            });
            e.currentTarget.reset();
          }}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-xl font-bold text-navy">{t("Tour guide registration", "ការចុះឈ្មោះមគ្គុទ្ទេសក៍")}</h2>
            <Button asChild variant="outline">
              <Link to="/join"><Store /> {t("Register Your Business", "ចុះឈ្មោះអាជីវកម្ម")}</Link>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {([
              ["name", t("Full name", "ឈ្មោះពេញ")],
              ["phone", t("Phone / WhatsApp", "ទូរសព្ទ / WhatsApp")],
              ["email", t("Email", "អ៊ីមែល")],
              ["license", t("Guide license number", "លេខអាជ្ញាប័ណ្ណមគ្គុទ្ទេសក៍")],
              ["years", t("Years of experience", "ចំនួនឆ្នាំបទពិសោធន៍")],
              ["price", t("Day rate (USD)", "តម្លៃក្នុងមួយថ្ងៃ (ដុល្លារ)")],
            ] as const).map(([n, l]) => (
              <div key={n} className="space-y-1.5">
                <Label htmlFor={`g-${n}`}>{l}</Label>
                <Input id={`g-${n}`} name={n} type={n === "email" ? "email" : n === "years" || n === "price" ? "number" : "text"} />
              </div>
            ))}
          </div>
          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-navy">{t("Languages you guide in", "ភាសាដែលអ្នកប្រើក្នុងការណែនាំ")}</legend>
            <div className="flex flex-wrap gap-2">
              {languages.map(([en, km]) => (
                <button
                  key={en}
                  type="button"
                  aria-pressed={langs.includes(en)}
                  onClick={() => toggle(en)}
                  className={`rounded-full border px-3 py-1 text-sm transition ${langs.includes(en) ? "border-teal bg-teal text-primary-foreground" : "bg-card text-muted-foreground hover:text-navy"}`}
                >
                  {t(en, km)}
                </button>
              ))}
            </div>
          </fieldset>
          <fieldset className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <legend className="text-sm font-medium text-navy">{t("Expertise", "ជំនាញ")}</legend>
              {expertiseList.map((x) => (
                <div key={x} className="flex items-center gap-2"><Checkbox id={`ex-${x}`} name="expertise" value={x} /><Label htmlFor={`ex-${x}`} className="font-normal">{tc(x)}</Label></div>
              ))}
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium text-navy">{t("Coverage areas", "តំបន់គ្របដណ្តប់")}</p>
              {coveredAreaList.map((x) => (
                <div key={x} className="flex items-center gap-2"><Checkbox id={`ar-${x}`} name="areas" value={x} /><Label htmlFor={`ar-${x}`} className="font-normal">{tc(x)}</Label></div>
              ))}
            </div>
          </fieldset>
          <div className="space-y-1.5">
            <Label htmlFor="g-bio">{t("Short bio", "ប្រវត្តិរូបសង្ខេប")}</Label>
            <Textarea id="g-bio" name="bio" rows={4} placeholder={t("Tell travelers about your background and favorite places to share.", "ប្រាប់អ្នកដំណើរអំពីប្រវត្តិរបស់អ្នក និងកន្លែងដែលអ្នកចូលចិត្តណែនាំ។")} />
          </div>
          <div className="flex items-center gap-2"><Checkbox id="g-agree" /><Label htmlFor="g-agree" className="font-normal">{t("I confirm I hold a valid Cambodian guide license", "ខ្ញុំបញ្ជាក់ថាខ្ញុំមានអាជ្ញាប័ណ្ណមគ្គុទ្ទេសក៍កម្ពុជាត្រឹមត្រូវ")}</Label></div>
          <Button type="submit" className="w-full bg-gold text-gold-foreground hover:bg-gold/90">{t("Submit Application", "ដាក់ស្នើពាក្យ")}</Button>
        </form>

        <aside className="space-y-5">
          <div className="rounded-2xl border bg-card p-6 shadow-card">
            <p className="flex items-center gap-2 font-display text-lg font-semibold text-navy"><BadgeCheck className="size-5 text-teal" /> {t("How guide sign-up works", "របៀបចុះឈ្មោះជាមគ្គុទ្ទេសក៍")}</p>
            <ol className="mt-4 flex flex-col items-start gap-1">
              {steps.map(([en, km], i) => (
                <li key={en} className="flex flex-col items-start">
                  <span className="rounded-full bg-teal-soft px-3 py-1.5 text-sm font-medium text-navy">{t(en, km)}</span>
                  {i < steps.length - 1 && <ArrowDown className="my-0.5 ml-4 size-4 text-gold" />}
                </li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl bg-navy p-6 text-navy-foreground shadow-card">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold"><Crown className="size-4" /> {t("Guide Pro", "មគ្គុទ្ទេសក៍ Pro")}</p>
            <p className="mt-2 font-display text-3xl font-bold">{t("$5/month", "$5/ខែ")}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-navy-foreground/80">
              {([["Free basic profile", "ប្រវត្តិរូបមូលដ្ឋានឥតគិតថ្លៃ"], ["Featured in guide search", "បង្ហាញលេចធ្លោក្នុងការស្វែងរកមគ្គុទ្ទេសក៍"], ["Tour packages & analytics", "កញ្ចប់ដំណើរកម្សាន្ត និងការវិភាគ"]] as const).map(([en, km]) => (
                <li key={en} className="flex items-center gap-2"><Check className="size-4 text-gold" /> {t(en, km)}</li>
              ))}
            </ul>
            <Button asChild variant="outline" className="mt-5 rounded-full border-navy-foreground/30 bg-transparent text-navy-foreground hover:bg-navy-foreground/10 hover:text-navy-foreground">
              <Link to="/guide-dashboard">{t("Preview the guide dashboard", "មើលផ្ទាំងគ្រប់គ្រងមគ្គុទ្ទេសក៍")}</Link>
            </Button>
          </div>
        </aside>
      </section>
      <SiteFooter />
    </main>
  );
}
