import * as React from "react";

const DEFAULT_KEY = "icon-picker:favorites";

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
    // storage full / disabled — fail silently, favorites just won't persist
  }
}

export interface UseFavoritesOptions {
  storageKey?: string;
}

/**
 * Favorites persisted to localStorage, keyed by icon id.
 * Safe for SSR: reads are deferred to a client-side effect.
 */
export function useFavorites({ storageKey = DEFAULT_KEY }: UseFavoritesOptions = {}) {
  const [favorites, setFavorites] = React.useState<string[]>([]);

  React.useEffect(() => {
    setFavorites(readStorage(storageKey));
  }, [storageKey]);

  const persist = React.useCallback(
    (next: string[]) => {
      setFavorites(next);
      writeStorage(storageKey, next);
    },
    [storageKey]
  );

  const toggleFavorite = React.useCallback(
    (iconId: string) => {
      persist(
        favorites.includes(iconId)
          ? favorites.filter((id) => id !== iconId)
          : [...favorites, iconId]
      );
    },
    [favorites, persist]
  );

  const removeFavorite = React.useCallback(
    (iconId: string) => {
      persist(favorites.filter((id) => id !== iconId));
    },
    [favorites, persist]
  );

  const isFavorite = React.useCallback((iconId: string) => favorites.includes(iconId), [
    favorites,
  ]);

  const getFavorites = React.useCallback(() => favorites, [favorites]);

  return { favorites, toggleFavorite, removeFavorite, isFavorite, getFavorites };
}
