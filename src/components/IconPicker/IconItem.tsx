import * as React from "react";
import { Star } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { IconDefinition } from "../../types/icon";

export interface IconItemProps {
  icon: IconDefinition;
  selected?: boolean;
  favorite?: boolean;
  useOriginalColor?: boolean;
  iconSize?: number;
  onSelect: (icon: IconDefinition) => void;
  onToggleFavorite?: (icon: IconDefinition) => void;
}

/** Single icon button in the grid. Can be swapped out via IconPicker's `components.IconItem` prop. */
export const IconItem = React.forwardRef<HTMLButtonElement, IconItemProps>(
  (
    { icon, selected, favorite, useOriginalColor, iconSize = 20, onSelect, onToggleFavorite },
    ref
  ) => {
    const Icon = icon.component;
    const color = useOriginalColor && icon.color ? icon.color : "currentColor";

    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            ref={ref}
            type="button"
            role="option"
            aria-selected={selected}
            data-icon-id={icon.id}
            onClick={() => onSelect(icon)}
            className={cn(
              "group relative flex h-10 w-10 items-center justify-center rounded-md border border-transparent",
              "hover:bg-accent hover:text-accent-foreground focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-ring",
              selected && "border-primary bg-accent"
            )}
          >
            <Icon title={icon.name} size={iconSize} color={color} aria-hidden="true" />
            {onToggleFavorite && (
              <span
                role="button"
                tabIndex={-1}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(icon);
                }}
                className={cn(
                  "absolute -right-1 -top-1 hidden rounded-full bg-background p-0.5 group-hover:block",
                  favorite && "block"
                )}
                aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
              >
                <Star
                  className={cn(
                    "h-3 w-3",
                    favorite ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
                  )}
                />
              </span>
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="text-xs">{icon.name}</p>
        </TooltipContent>
      </Tooltip>
    );
  }
);
IconItem.displayName = "IconItem";
