import Fuse, { type IFuseOptions } from "fuse.js";
import type { IconDefinition } from "../types/icon";

const FUSE_KEYS: IFuseOptions<IconDefinition>["keys"] = [
  { name: "name", weight: 0.4 },
  { name: "tags", weight: 0.25 },
  { name: "keywords", weight: 0.2 },
  { name: "category", weight: 0.1 },
  { name: "library", weight: 0.05 },
];

/** Create a Fuse instance for a given icon set. Cheap enough to rebuild on data change. */
export function createIconFuse(icons: IconDefinition[], threshold = 0.35) {
  return new Fuse(icons, {
    keys: FUSE_KEYS,
    threshold,
    ignoreLocation: true,
    minMatchCharLength: 1,
  });
}

/** Run a search, falling back to the full list when the query is empty. */
export function searchIcons(
  fuse: Fuse<IconDefinition>,
  icons: IconDefinition[],
  query: string
): IconDefinition[] {
  const trimmed = query.trim();
  if (!trimmed) return icons;
  return fuse.search(trimmed).map((result) => result.item);
}
