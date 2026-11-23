import { useSyncExternalStore } from "react";
import { contentKm } from "./i18n-content";

/** Only two languages are supported: English and Khmer. */
export type Lang = "en" | "km";
export const LANGS: { id: Lang; label: string; short: string }[] = [
  { id: "en", label: "English", short: "EN" },
  { id: "km", label: "ខ្មែរ", short: "ខ្មែរ" },
];

export const LANG_KEY = "cu:lang";
const listeners = new Set<() => void>();
let current: Lang | null = null;

function read(): Lang {
  if (current) return current;
  if (typeof window === "undefined") return "en";
  const saved = window.localStorage.getItem(LANG_KEY);
  current = saved === "km" ? "km" : "en";
  document.documentElement.lang = current;
  return current;
}

export function setLang(lang: Lang) {
  current = lang;
  window.localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang;
  listeners.forEach((l) => l());
}

export function useLang(): Lang {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => "en" as Lang,
  );
}

/** Translate a known content string (place names, categories, short descriptions). Falls back to English. */
export function translateContent(lang: Lang, s: string): string {
  if (lang === "en") return s;
  return contentKm[s] ?? s;
}

export function useI18n() {
  const lang = useLang();
  return {
    lang,
    setLang,
    /** Inline bilingual text: t("Home", "ទំព័រដើម") */
    t: (en: string, km: string) => (lang === "km" ? km : en),
    /** Translate data/content strings through the shared Khmer content dictionary. */
    tc: (s: string) => translateContent(lang, s),
  };
}
