import * as React from "react";
import { cn } from "@/lib/utils";
import type { IconDefinition } from "../../types/icon";
import { IconItem as DefaultIconItem } from "./IconItem";

export interface RecentIconsProps {
  icons: IconDefinition[];
  value?: string;
  favorites: string[];
  useOriginalColor?: boolean;
  onSelect: (icon: IconDefinition) => void;
  onToggleFavorite?: (icon: IconDefinition) => void;
  className?: string;
}

/** Single row of recently-used icons, shown above the main grid. */
export function RecentIcons({
  icons,
  value,
  favorites,
  useOriginalColor,
  onSelect,
  onToggleFavorite,
  className,
}: RecentIconsProps) {
  if (icons.length === 0) return null;

  return (
    <div className={cn("border-b px-3 py-2", className)}>
      <p className="mb-1.5 text-xs font-medium text-muted-foreground">Recent</p>
      <div className="flex flex-wrap gap-1">
        {icons.map((icon) => (
          <DefaultIconItem
            key={icon.id}
            icon={icon}
            selected={icon.id === value}
            favorite={favorites.includes(icon.id)}
            useOriginalColor={useOriginalColor}
            onSelect={onSelect}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
