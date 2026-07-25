import type { ComponentType, SVGProps } from "react";

/**
 * Generic props every icon component is expected to accept.
 * Individual libraries may accept more, this is the common subset
 * the picker relies on (size + color).
 */
export type IconComponentProps = SVGProps<SVGSVGElement> & {
  size?: number | string;
  color?: string;
  title?: string;
};

/**
 * Canonical representation of a single icon, regardless of which
 * library it originally came from. Every registered library must
 * expose its icons in this shape.
 */
export interface IconDefinition {
  /** Globally unique id, conventionally `${library}:${name}` */
  id: string;
  /** Human readable name, used for display + search */
  name: string;
  /** The actual renderable icon component */
  component: ComponentType<IconComponentProps>;
  /** Id of the library this icon belongs to */
  library: string;
  /** Optional grouping, e.g. "brands", "arrows", "weather" */
  category?: string;
  /** Free-form tags used to broaden search matches */
  tags?: string[];
  /** Additional search keywords (aliases, synonyms) */
  keywords?: string[];
  /** Official brand / original color, e.g. "#1DA1F2" for Twitter */
  color?: string;
}

/**
 * A registered icon library. `icons` can either be a static array
 * or a lazy loader so heavy libraries are only fetched on demand.
 */
export interface IconLibrary {
  id: string;
  name: string;
  /** Static icon list, OR... */
  icons?: IconDefinition[];
  /** ...an async loader, called once and cached on first use */
  load?: () => Promise<IconDefinition[]>;
  /** Optional short description shown in the library filter */
  description?: string;
}

/** A library once it's been resolved (loaded) and cached in memory */
export interface ResolvedIconLibrary {
  id: string;
  name: string;
  description?: string;
  icons: IconDefinition[];
  loading: boolean;
  error?: Error;
}

export interface UseIconSearchOptions {
  icons: IconDefinition[];
  query: string;
  /** Fuse.js threshold, 0 = exact match, 1 = match anything. Default 0.35 */
  threshold?: number;
}

export interface IconPickerClassNames {
  root?: string;
  trigger?: string;
  content?: string;
  searchBar?: string;
  grid?: string;
  item?: string;
  preview?: string;
  emptyState?: string;
  footer?: string;
  header?: string;
}
