import { translateContent } from "@/lib/i18n";
import { useSyncExternalStore } from "react";
import { toast } from "sonner";

const KEY = "cu:favorites";
const listeners = new Set<() => void>();
let cache: string[] | null = null;

function read(): string[] {
  if (cache) return cache;
  if (typeof window === "undefined") return [];
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(KEY) ?? "null");
    cache = Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : ["d:lotus-farm-experience", "d:banteay-srei", "b:village-pottery-studio"];
  } catch {
    cache = [];
  }
  return cache;
}

const EMPTY: string[] = [];

export function useFavorites() {
  const list = useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    read,
    () => EMPTY,
  );
  return {
    list,
    isSaved: (id: string) => list.includes(id),
    toggle: (id: string, label: string) => {
      const cur = read();
      const saved = cur.includes(id);
      cache = saved ? cur.filter((x) => x !== id) : [...cur, id];
      window.localStorage.setItem(KEY, JSON.stringify(cache));
      listeners.forEach((l) => l());
      const lang = window.localStorage.getItem("cu:lang") === "km" ? "km" : "en";
      const name = translateContent(lang, label);
      toast.success(lang === "km"
        ? saved ? `បានដក ${name} ចេញពីចំណូលចិត្ត` : `បានរក្សាទុក ${name} ក្នុងចំណូលចិត្ត`
        : saved ? `Removed ${label} from favorites` : `Saved ${label} to favorites`);
    },
  };
}
