import * as React from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import type { IconDefinition } from "../types/icon";

export interface UseVirtualIconsArgs {
  icons: IconDefinition[];
  scrollRef: React.RefObject<HTMLElement>;
  columns: number;
  /** Row height in px, defaults to 44 (icon + padding) */
  rowHeight?: number;
  overscan?: number;
}

/**
 * Turns a flat icon list into virtualized rows of `columns` items each,
 * so the DOM only ever renders what's on screen - required to handle
 * icon libraries with tens of thousands of entries.
 */
export function useVirtualIcons({
  icons,
  scrollRef,
  columns,
  rowHeight = 44,
  overscan = 6,
}: UseVirtualIconsArgs) {
  const rowCount = Math.ceil(icons.length / Math.max(columns, 1));

  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => rowHeight,
    overscan,
  });

  const virtualRows = rowVirtualizer.getVirtualItems();

  const rows = React.useMemo(
    () =>
      virtualRows.map((virtualRow) => {
        const start = virtualRow.index * columns;
        const rowIcons = icons.slice(start, start + columns);
        return { ...virtualRow, icons: rowIcons };
      }),
    [virtualRows, icons, columns]
  );

  return {
    rows,
    totalSize: rowVirtualizer.getTotalSize(),
    rowVirtualizer,
  };
}
