import * as React from "react";
import { createIconFuse, searchIcons } from "../utils/fuzzy";
import type { IconDefinition } from "../types/icon";

export interface UseIconSearchArgs {
  icons: IconDefinition[];
  query: string;
  threshold?: number;
}

/** Debounced-free (Fuse is fast enough) fuzzy search over an icon list. */
export function useIconSearch({ icons, query, threshold = 0.35 }: UseIconSearchArgs) {
  const fuse = React.useMemo(() => createIconFuse(icons, threshold), [icons, threshold]);

  const results = React.useMemo(
    () => searchIcons(fuse, icons, query),
    [fuse, icons, query]
  );

  return results;
}
