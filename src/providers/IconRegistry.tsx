import * as React from "react";
import type { IconDefinition, IconLibrary, ResolvedIconLibrary } from "../types/icon";

/**
 * IconRegistry
 * ------------
 * A framework-agnostic singleton registry. Libraries are registered
 * once (usually at app bootstrap) via `registerLibrary`. Nothing is
 * imported or loaded eagerly - `load()` (if provided) only runs the
 * first time a library is actually requested by the UI.
 *
 * This intentionally lives outside React so it can be used from
 * anywhere (tests, non-component code, other pickers, etc). The
 * `IconRegistryProvider` below is a thin React wrapper around it.
 */
class IconRegistryClass {
  private libraries = new Map<string, IconLibrary>();
  private cache = new Map<string, IconDefinition[]>();
  private pending = new Map<string, Promise<IconDefinition[]>>();
  private listeners = new Set<() => void>();

  registerLibrary(library: IconLibrary) {
    if (this.libraries.has(library.id)) {
      console.warn(
        `[IconPicker] Library "${library.id}" is already registered. Overwriting.`
      );
    }
    this.libraries.set(library.id, library);
    if (library.icons) {
      this.cache.set(library.id, library.icons);
    }
    this.notify();
  }

  unregisterLibrary(id: string) {
    this.libraries.delete(id);
    this.cache.delete(id);
    this.pending.delete(id);
    this.notify();
  }

  getLibraries(): IconLibrary[] {
    return Array.from(this.libraries.values());
  }

  getLibrary(id: string): IconLibrary | undefined {
    return this.libraries.get(id);
  }

  isLoaded(id: string): boolean {
    return this.cache.has(id);
  }

  /** Resolve (loading if needed) the icons for a single library id. */
  async resolveLibrary(id: string): Promise<IconDefinition[]> {
    if (this.cache.has(id)) return this.cache.get(id)!;
    if (this.pending.has(id)) return this.pending.get(id)!;

    const library = this.libraries.get(id);
    if (!library) throw new Error(`[IconPicker] Unknown library "${id}"`);

    if (library.icons) {
      this.cache.set(id, library.icons);
      return library.icons;
    }
    if (!library.load) {
      throw new Error(
        `[IconPicker] Library "${id}" has neither "icons" nor "load" defined.`
      );
    }

    const promise = library
      .load()
      .then((icons) => {
        this.cache.set(id, icons);
        this.pending.delete(id);
        this.notify();
        return icons;
      })
      .catch((err) => {
        this.pending.delete(id);
        throw err;
      });

    this.pending.set(id, promise);
    return promise;
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((l) => l());
  }
}

/** Singleton instance - import { registry } if you need direct access outside React. */
export const registry = new IconRegistryClass();

// Convenience free functions matching the spec's public API
export const registerLibrary = (library: IconLibrary) => registry.registerLibrary(library);
export const unregisterLibrary = (id: string) => registry.unregisterLibrary(id);
export const getLibraries = () => registry.getLibraries();

interface IconRegistryContextValue {
  libraries: ResolvedIconLibrary[];
  requestLibraries: (ids: string[]) => void;
}

const IconRegistryContext = React.createContext<IconRegistryContextValue | null>(null);

/**
 * Wrap your app (or just the picker) in this provider. It watches the
 * registry and re-renders consumers whenever a library is (un)registered
 * or finishes loading.
 */
export function IconRegistryProvider({ children }: { children: React.ReactNode }) {
  const [, forceUpdate] = React.useReducer((c) => c + 1, 0);
  const [resolved, setResolved] = React.useState<Map<string, ResolvedIconLibrary>>(new Map());

  React.useEffect(() => {
    return registry.subscribe(() => forceUpdate());
  }, []);

  const requestLibraries = React.useCallback((ids: string[]) => {
    setResolved((prev) => {
      const next = new Map(prev);
      for (const id of ids) {
        const lib = registry.getLibrary(id);
        if (!lib) continue;
        const existing = next.get(id);
        if (existing && (existing.loading || existing.icons.length)) continue;
        next.set(id, {
          id,
          name: lib.name,
          description: lib.description,
          icons: registry.isLoaded(id) ? registry["cache"].get(id) ?? [] : [],
          loading: !registry.isLoaded(id),
        });
      }
      return next;
    });

    ids.forEach((id) => {
      registry
        .resolveLibrary(id)
        .then((icons) => {
          setResolved((prev) => {
            const next = new Map(prev);
            const lib = registry.getLibrary(id);
            next.set(id, {
              id,
              name: lib?.name ?? id,
              description: lib?.description,
              icons,
              loading: false,
            });
            return next;
          });
        })
        .catch((error: Error) => {
          setResolved((prev) => {
            const next = new Map(prev);
            const lib = registry.getLibrary(id);
            next.set(id, {
              id,
              name: lib?.name ?? id,
              description: lib?.description,
              icons: [],
              loading: false,
              error,
            });
            return next;
          });
        });
    });
  }, []);

  const value = React.useMemo(
    () => ({ libraries: Array.from(resolved.values()), requestLibraries }),
    [resolved, requestLibraries]
  );

  return (
    <IconRegistryContext.Provider value={value}>{children}</IconRegistryContext.Provider>
  );
}

export function useIconRegistry() {
  const ctx = React.useContext(IconRegistryContext);
  if (!ctx) {
    throw new Error("useIconRegistry must be used within an <IconRegistryProvider>");
  }
  return ctx;
}
