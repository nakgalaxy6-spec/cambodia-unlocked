import type React from "react";
import { Link, type LinkProps } from "@tanstack/react-router";
import { AngkorSkyline, Lotus } from "./AngkorSkyline";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer>
      <section className="relative overflow-hidden bg-navy text-navy-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-14 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-script text-3xl text-gold">{t("Local People, Brighter Tomorrow", "ប្រជាជនមូលដ្ឋាន អនាគតភ្លឺស្វាង")}</p>
            <h2 className="mt-1 text-4xl font-bold">{t("Explore Local Cambodia", "ស្វែងយល់ពីកម្ពុជាក្នុងស្រុក")}</h2>
            <p className="mt-2 max-w-xl text-navy-foreground/75">
              {t("Every inquiry you send goes straight to a local business or community in Siem Reap.", "រាល់សំណួរដែលអ្នកផ្ញើ ទៅដល់អាជីវកម្ម ឬសហគមន៍មូលដ្ឋាននៅសៀមរាបដោយផ្ទាល់។")}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/explore" className="rounded-full bg-gold px-6 py-3 font-semibold text-gold-foreground transition hover:bg-gold/90">
              {t("Start exploring", "ចាប់ផ្តើមស្វែងរក")}
            </Link>
            <Link to="/join" className="rounded-full border border-navy-foreground/30 px-6 py-3 font-semibold transition hover:bg-navy-foreground/10">
              {t("List your business free", "ចុះបញ្ជីអាជីវកម្មឥតគិតថ្លៃ")}
            </Link>
          </div>
        </div>
        <AngkorSkyline className="pointer-events-none -mb-1 h-20 text-navy-foreground/10" />
      </section>
      <section className="border-t bg-background">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 md:grid-cols-4">
          <div className="space-y-3">
            <Logo />
            <p className="text-sm text-muted-foreground">{t("Discover Local Cambodia. Support Local Communities.", "ស្វែងយល់ពីកម្ពុជាក្នុងស្រុក។ គាំទ្រសហគមន៍មូលដ្ឋាន។")}</p>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal px-3 py-1 text-xs font-medium text-primary-foreground">
              {t("Siem Reap Pilot Project", "គម្រោងសាកល្បងសៀមរាប")}
            </span>
          </div>
          <FooterCol title={t("Discover", "ស្វែងរក")}>
            <FLink to="/explore">{t("Explore destinations", "ស្វែងរកគោលដៅ")}</FLink>
            <FLink to="/stories">{t("Community stories", "រឿងរ៉ាវសហគមន៍")}</FLink>
            <FLink to="/events">{t("Events", "ព្រឹត្តិការណ៍")}</FLink>
            <FLink to="/businesses">{t("Local businesses", "អាជីវកម្មក្នុងស្រុក")}</FLink>
            <FLink to="/guides">{t("Tour guides & travel support", "មគ្គុទ្ទេសក៍ និងជំនួយការធ្វើដំណើរ")}</FLink>
          </FooterCol>
          <FooterCol title={t("Join", "ចូលរួម")}>
            <FLink to="/join">{t("Register your business", "ចុះឈ្មោះអាជីវកម្ម")}</FLink>
            <FLink to="/become-guide">{t("Become a tour guide", "ក្លាយជាមគ្គុទ្ទេសក៍")}</FLink>
            <FLink to="/how-it-works">{t("How it works & pricing", "របៀបដំណើរការ និងតម្លៃ")}</FLink>
            <FLink to="/about">{t("About us", "អំពីយើង")}</FLink>
          </FooterCol>
          <FooterCol title={t("Dashboards", "ផ្ទាំងគ្រប់គ្រង")}>
            <FLink to="/dashboard">{t("Traveler dashboard", "ផ្ទាំងអ្នកដំណើរ")}</FLink>
            <FLink to="/business-dashboard">{t("Business dashboard", "ផ្ទាំងអាជីវកម្ម")}</FLink>
            <FLink to="/how-it-works">{t("Guide visibility & packages", "កញ្ចប់បង្ហាញមគ្គុទ្ទេសក៍")}</FLink>
            <FLink to="/admin">{t("Admin dashboard", "ផ្ទាំងអ្នកគ្រប់គ្រង")}</FLink>
          </FooterCol>
        </div>
        <div className="mx-auto flex max-w-7xl items-center justify-between border-t px-6 py-4 text-xs text-muted-foreground">
          <span>© 2026 Cambodia Unlocked · {t("Design prototype · Illustrative content and metrics", "គំរូរចនា · ខ្លឹមសារ និងតួលេខជាឧទាហរណ៍")}</span>
          <span className="flex items-center gap-2 font-script text-lg text-teal"><Lotus className="h-5 w-8" /> {t("Same Journeys, Stronger Communities", "ដំណើរដដែល សហគមន៍រឹងមាំជាងមុន")}</span>
        </div>
      </section>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-semibold text-navy">{title}</p>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">{children}</ul>
    </div>
  );
}

function FLink({ to, children }: { to: NonNullable<LinkProps["to"]>; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="hover:text-teal">{children}</Link>
    </li>
  );
}
