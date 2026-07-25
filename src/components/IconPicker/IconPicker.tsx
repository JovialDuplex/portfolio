import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { useIconRegistry, registry } from "../../providers/IconRegistry";
import { useIconSearch } from "../../hooks/useIconSearch";
import { useFavorites } from "../../hooks/useFavorites";
import { useRecentIcons } from "../../hooks/useRecentIcons";
import { distinctCategories } from "../../utils/groups";
import type { IconDefinition, IconPickerClassNames } from "../../types/icon";

import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";
import { LibraryFilter } from "./LibraryFilter";
import { IconGrid } from "./IconGrid";
import { Preview } from "./Preview";
import { EmptyState } from "./EmptyState";
import { RecentIcons } from "./RecentIcons";
import { FavoriteIcons } from "./FavoriteIcons";
import { IconItem } from "./IconItem";

export interface IconPickerSlots {
  IconItem?: typeof IconItem;
  SearchBar?: typeof SearchBar;
  EmptyState?: typeof EmptyState;
  Preview?: typeof Preview;
  Footer?: React.ComponentType<{ icon: IconDefinition | null }>;
  Header?: React.ComponentType<{}>;
}

export interface IconPickerProps {
  /** Selected icon id, e.g. "lucide:arrow-right" */
  value?: string | null;
  onChange?: (iconId: string | null, icon: IconDefinition | null) => void;

  /** Restrict to specific registered library ids. Defaults to all registered libraries. */
  libraries?: string[];

  allowClear?: boolean;
  showPreview?: boolean;
  showSearch?: boolean;
  showCategories?: boolean;
  showLibraries?: boolean;
  showRecent?: boolean;
  showFavorites?: boolean;
  useOriginalColor?: boolean;

  placeholder?: string;
  emptyMessage?: string;
  gridSize?: number;
  iconSize?: number;
  maxHeight?: number;

  disabled?: boolean;
  className?: string;
  classNames?: IconPickerClassNames;

  /** Swap any internal sub-component. */
  components?: IconPickerSlots;
}

/**
 * IconPicker
 * ----------
 * Library-agnostic icon picker. Register icon libraries once with
 * `registerLibrary`, then use this component anywhere - it never
 * imports a specific icon set itself.
 */
export function IconPicker({
  value,
  onChange,
  libraries,
  allowClear = true,
  showPreview = true,
  showSearch = true,
  showCategories = true,
  showLibraries = true,
  showRecent = true,
  showFavorites = true,
  useOriginalColor = false,
  placeholder = "Search icons...",
  emptyMessage = "No icons found",
  gridSize = 8,
  iconSize = 20,
  maxHeight = 320,
  disabled,
  className,
  classNames,
  components,
}: IconPickerProps) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string | null>(null);
  const [library, setLibrary] = React.useState<string | null>(null);
  const [activeTab, setActiveTab] = React.useState<"all" | "favorites" | "recent">("all");

  const { libraries: resolvedLibraries, requestLibraries } = useIconRegistry();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { recent, pushRecent } = useRecentIcons();

  const libraryIds = React.useMemo(
    () => libraries ?? resolvedLibraries.map((l) => l.id),
    [libraries, resolvedLibraries]
  );

  React.useEffect(() => {
    if (open) {
      // If no specific libraries are requested, load ALL registered ones
      const idsToLoad = libraries ?? registry.getLibraries().map((l) => l.id);
      requestLibraries(idsToLoad);
    }
  }, [open, libraries, requestLibraries]);

  // On first mount, kick off loading for explicitly requested libraries
  // so the trigger button can render the selected icon immediately.
  React.useEffect(() => {
    if (libraries?.length) requestLibraries(libraries);
  }, [libraries, requestLibraries]);

  const allIcons = React.useMemo<IconDefinition[]>(() => {
    const active = resolvedLibraries.filter((l) => libraryIds.includes(l.id));
    return active.flatMap((l) => l.icons);
  }, [resolvedLibraries, libraryIds]);

  const isLoading = resolvedLibraries.some((l) => libraryIds.includes(l.id) && l.loading);

  const filteredByFacets = React.useMemo(() => {
    return allIcons.filter((icon) => {
      if (category && icon.category !== category) return false;
      if (library && icon.library !== library) return false;
      return true;
    });
  }, [allIcons, category, library]);

  const searched = useIconSearch({ icons: filteredByFacets, query });

  const displayedIcons = React.useMemo(() => {
    if (activeTab === "favorites") return searched.filter((i) => favorites.includes(i.id));
    if (activeTab === "recent") return searched.filter((i) => recent.includes(i.id));
    return searched;
  }, [activeTab, searched, favorites, recent]);

  const categories = React.useMemo(() => distinctCategories(allIcons), [allIcons]);
  const libraryOptions = React.useMemo(
    () => resolvedLibraries.filter((l) => libraryIds.includes(l.id)).map((l) => ({ id: l.id, name: l.name })),
    [resolvedLibraries, libraryIds]
  );

  const selectedIcon = React.useMemo(
    () => allIcons.find((i) => i.id === value) ?? null,
    [allIcons, value]
  );

  const recentIcons = React.useMemo(
    () => recent.map((id) => allIcons.find((i) => i.id === id)).filter(Boolean) as IconDefinition[],
    [recent, allIcons]
  );
  const favoriteIcons = React.useMemo(
    () => favorites.map((id) => allIcons.find((i) => i.id === id)).filter(Boolean) as IconDefinition[],
    [favorites, allIcons]
  );

  function handleSelect(icon: IconDefinition) {
    onChange?.(icon.id, icon);
    pushRecent(icon.id);
    setOpen(false);
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    onChange?.(null, null);
  }

  const SearchBarSlot = components?.SearchBar ?? SearchBar;
  const EmptyStateSlot = components?.EmptyState ?? EmptyState;
  const PreviewSlot = components?.Preview ?? Preview;
  const ItemSlot = components?.IconItem ?? IconItem;
  const FooterSlot = components?.Footer;
  const HeaderSlot = components?.Header;

  return (
    <TooltipProvider delayDuration={200}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            type="button"
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn("w-full justify-between font-normal", classNames?.trigger, className)}
          >
            <span className="flex items-center gap-2 truncate">
              {selectedIcon ? (
                <>
                  <selectedIcon.component
                    size={16}
                    color={useOriginalColor && selectedIcon.color ? selectedIcon.color : "currentColor"}
                  />
                  {selectedIcon.name}
                </>
              ) : (
                <span className="text-muted-foreground">{placeholder}</span>
              )}
            </span>
            <span className="flex items-center gap-1">
              {allowClear && selectedIcon && (
                <span
                  role="button"
                  tabIndex={-1}
                  onClick={handleClear}
                  className="rounded-sm px-1 text-muted-foreground hover:text-foreground"
                  aria-label="Clear selection"
                >
                  ×
                </span>
              )}
              <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-[340px] p-0", classNames?.content)}
          align="start"
        >
          <CommandPrimitive
            shouldFilter={false}
            className={cn("flex flex-col", classNames?.root)}
          >
            {HeaderSlot && <HeaderSlot />}

            {showPreview && selectedIcon && (
              <PreviewSlot icon={selectedIcon} useOriginalColor={useOriginalColor} className={classNames?.preview} />
            )}

            {showSearch && (
              <SearchBarSlot
                value={query}
                onChange={setQuery}
                placeholder={placeholder}
                className={classNames?.searchBar}
              />
            )}

            {(showFavorites || showRecent) && (
              <div className="flex gap-1 px-3 pt-2">
                <TabButton active={activeTab === "all"} onClick={() => setActiveTab("all")}>
                  All
                </TabButton>
                {showFavorites && (
                  <TabButton active={activeTab === "favorites"} onClick={() => setActiveTab("favorites")}>
                    Favorites
                  </TabButton>
                )}
                {showRecent && (
                  <TabButton active={activeTab === "recent"} onClick={() => setActiveTab("recent")}>
                    Recent
                  </TabButton>
                )}
              </div>
            )}

            {showLibraries && activeTab === "all" && (
              <LibraryFilter libraries={libraryOptions} value={library} onChange={setLibrary} />
            )}
            {showCategories && activeTab === "all" && (
              <CategoryFilter categories={categories} value={category} onChange={setCategory} />
            )}

            <Separator />

            {activeTab === "all" && showRecent && !query && recentIcons.length > 0 && (
              <RecentIcons
                icons={recentIcons}
                value={value ?? undefined}
                favorites={favorites}
                useOriginalColor={useOriginalColor}
                onSelect={handleSelect}
                onToggleFavorite={(icon) => toggleFavorite(icon.id)}
              />
            )}
            {activeTab === "all" && showFavorites && !query && favoriteIcons.length > 0 && (
              <FavoriteIcons
                icons={favoriteIcons}
                value={value ?? undefined}
                useOriginalColor={useOriginalColor}
                onSelect={handleSelect}
                onToggleFavorite={(icon) => toggleFavorite(icon.id)}
              />
            )}

            {isLoading ? (
              <div className="px-6 py-10 text-center text-sm text-muted-foreground">
                Loading icons...
              </div>
            ) : displayedIcons.length === 0 ? (
              <EmptyStateSlot message={emptyMessage} className={classNames?.emptyState} />
            ) : (
              <IconGrid
                icons={displayedIcons}
                value={value ?? undefined}
                favorites={favorites}
                gridSize={gridSize}
                iconSize={iconSize}
                maxHeight={maxHeight}
                useOriginalColor={useOriginalColor}
                onSelect={handleSelect}
                onToggleFavorite={(icon) => toggleFavorite(icon.id)}
                ItemComponent={ItemSlot}
                className={classNames?.grid}
              />
            )}

            {FooterSlot && (
              <div className={cn("border-t px-3 py-2", classNames?.footer)}>
                <FooterSlot icon={selectedIcon} />
              </div>
            )}
          </CommandPrimitive>
        </PopoverContent>
      </Popover>
    </TooltipProvider>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-md px-2 py-1 text-xs font-medium",
        active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-accent/50"
      )}
    >
      {children}
    </button>
  );
}
