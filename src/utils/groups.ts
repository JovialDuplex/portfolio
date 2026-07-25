import type { IconDefinition } from "../types/icon";

export interface IconGroup {
  key: string;
  label: string;
  icons: IconDefinition[];
}

/** Group icons by category, keeping a stable "Other" bucket last. */
export function groupByCategory(icons: IconDefinition[]): IconGroup[] {
  const map = new Map<string, IconDefinition[]>();
  for (const icon of icons) {
    const key = icon.category?.trim() || "other";
    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(icon);
  }
  const groups: IconGroup[] = [];
  for (const [key, list] of map) {
    if (key === "other") continue;
    groups.push({ key, label: capitalize(key), icons: list });
  }
  groups.sort((a, b) => a.label.localeCompare(b.label));
  if (map.has("other")) {
    groups.push({ key: "other", label: "Other", icons: map.get("other")! });
  }
  return groups;
}

/** List of distinct categories across a set of icons, alphabetically sorted. */
export function distinctCategories(icons: IconDefinition[]): string[] {
  return Array.from(
    new Set(icons.map((i) => i.category?.trim()).filter((c): c is string => !!c))
  ).sort((a, b) => a.localeCompare(b));
}

/** List of distinct libraries present in a set of icons. */
export function distinctLibraries(icons: IconDefinition[]): string[] {
  return Array.from(new Set(icons.map((i) => i.library))).sort((a, b) => a.localeCompare(b));
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
