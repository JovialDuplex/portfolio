// Components
export { IconPicker } from "./components/IconPicker/IconPicker";
export type { IconPickerProps, IconPickerSlots } from "./components/IconPicker/IconPicker";
export { IconPickerField } from "./components/IconPicker/IconPickerField";
export type { IconPickerFieldProps } from "./components/IconPicker/IconPickerField";

export { IconGrid } from "./components/IconPicker/IconGrid";
export { IconItem } from "./components/IconPicker/IconItem";
export { SearchBar } from "./components/IconPicker/SearchBar";
export { CategoryFilter } from "./components/IconPicker/CategoryFilter";
export { LibraryFilter } from "./components/IconPicker/LibraryFilter";
export { Preview } from "./components/IconPicker/Preview";
export { EmptyState } from "./components/IconPicker/EmptyState";
export { RecentIcons } from "./components/IconPicker/RecentIcons";
export { FavoriteIcons } from "./components/IconPicker/FavoriteIcons";

// Provider / registry
export {
  IconRegistryProvider,
  useIconRegistry,
  registerLibrary,
  unregisterLibrary,
  getLibraries,
  registry,
} from "./providers/IconRegistry";

// Hooks
export { useIconSearch } from "./hooks/useIconSearch";
export { useVirtualIcons } from "./hooks/useVirtualIcons";
export { useFavorites } from "./hooks/useFavorites";
export { useRecentIcons } from "./hooks/useRecentIcons";

// Utils
export { normalize, buildIconId } from "./utils/normalize";
export { createIconFuse, searchIcons } from "./utils/fuzzy";
export { groupByCategory, distinctCategories, distinctLibraries } from "./utils/groups";

// Types
export type {
  IconDefinition,
  IconLibrary,
  ResolvedIconLibrary,
  IconComponentProps,
  IconPickerClassNames,
} from "./types/icon";
