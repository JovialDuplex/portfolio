import * as React from "react";

const DEFAULT_KEY = "icon-picker:recent";
const DEFAULT_MAX = 16;

function readStorage(key: string): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeStorage(key: string, value: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

export interface UseRecentIconsOptions {
  storageKey?: string;
  max?: number;
}

/** Most-recently-used icon ids, newest first, capped at `max` entries. */
export function useRecentIcons({
  storageKey = DEFAULT_KEY,
  max = DEFAULT_MAX,
}: UseRecentIconsOptions = {}) {
  const [recent, setRecent] = React.useState<string[]>([]);

  React.useEffect(() => {
    setRecent(readStorage(storageKey));
  }, [storageKey]);

  const pushRecent = React.useCallback(
    (iconId: string) => {
      const next = [iconId, ...recent.filter((id) => id !== iconId)].slice(0, max);
      setRecent(next);
      writeStorage(storageKey, next);
    },
    [recent, storageKey, max]
  );

  const clearRecent = React.useCallback(() => {
    setRecent([]);
    writeStorage(storageKey, []);
  }, [storageKey]);

  return { recent, pushRecent, clearRecent };
}
