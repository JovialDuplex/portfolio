/** Lowercase, strip diacritics, collapse whitespace/dashes for consistent matching. */
export function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[-_]+/g, " ")
    .trim();
}

/** Build a stable icon id from library + raw name, e.g. "lucide:arrow-right" */
export function buildIconId(library: string, name: string): string {
  return `${library}:${normalize(name).replace(/\s+/g, "-")}`;
}
