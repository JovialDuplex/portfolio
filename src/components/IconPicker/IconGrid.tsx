// import * as React from "react";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { cn } from "@/lib/utils";
// import { useVirtualIcons } from "../../hooks/useVirtualIcons";
// import type { IconDefinition } from "../../types/icon";
// import { IconItem as DefaultIconItem } from "./IconItem";

// export interface IconGridProps {
//   icons: IconDefinition[];
//   value?: string;
//   favorites: string[];
//   gridSize?: number;
//   iconSize?: number;
//   maxHeight?: number;
//   useOriginalColor?: boolean;
//   onSelect: (icon: IconDefinition) => void;
//   onToggleFavorite?: (icon: IconDefinition) => void;
//   ItemComponent?: typeof DefaultIconItem;
//   className?: string;
// }

// /**
//  * Renders `icons` as a virtualized grid. Only visible rows are mounted,
//  * so this comfortably scales to tens of thousands of icons.
//  */
// export function IconGrid({
//   icons,
//   value,
//   favorites,
//   gridSize = 8,
//   iconSize = 20,
//   maxHeight = 320,
//   useOriginalColor,
//   onSelect,
//   onToggleFavorite,
//   ItemComponent = DefaultIconItem,
//   className,
// }: IconGridProps) {
//   const scrollRef = React.useRef<HTMLDivElement>(null);
//   const { rows, totalSize } = useVirtualIcons({
//     icons,
//     scrollRef,
//     columns: gridSize,
//     rowHeight: iconSize + 24,
//   });

//   return (
//     <ScrollArea
//       className={cn("w-full", className)}
//       style={{ maxHeight }}
//       viewportRef={scrollRef as React.RefObject<HTMLDivElement>}
//     >
//       <div
//         role="listbox"
//         aria-label="Icons"
//         style={{ height: totalSize, position: "relative" }}
//         className="px-3 py-2"
//       >
//         {rows.map((row) => (
//           <div
//             key={row.index}
//             style={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: row.size,
//               transform: `translateY(${row.start}px)`,
//               display: "grid",
//               gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
//               gap: 4,
//             }}
//           >
//             {row.icons.map((icon) => (
//               <ItemComponent
//                 key={icon.id}
//                 icon={icon}
//                 selected={icon.id === value}
//                 favorite={favorites.includes(icon.id)}
//                 useOriginalColor={useOriginalColor}
//                 iconSize={iconSize}
//                 onSelect={onSelect}
//                 onToggleFavorite={onToggleFavorite}
//               />
//             ))}
//           </div>
//         ))}
//       </div>
//     </ScrollArea>
//   );
// }

import * as React from "react";
import { cn } from "@/lib/utils";
import { useVirtualIcons } from "../../hooks/useVirtualIcons";
import type { IconDefinition } from "../../types/icon";
import { IconItem as DefaultIconItem } from "./IconItem";

export interface IconGridProps {
  icons: IconDefinition[];
  value?: string;
  favorites: string[];
  gridSize?: number;
  iconSize?: number;
  maxHeight?: number;
  useOriginalColor?: boolean;
  onSelect: (icon: IconDefinition) => void;
  onToggleFavorite?: (icon: IconDefinition) => void;
  ItemComponent?: typeof DefaultIconItem;
  className?: string;
}

/**
 * Renders `icons` as a virtualized grid. Only visible rows are mounted,
 * so this comfortably scales to tens of thousands of icons.
 */
export function IconGrid({
  icons,
  value,
  favorites,
  gridSize = 8,
  iconSize = 20,
  maxHeight = 320,
  useOriginalColor,
  onSelect,
  onToggleFavorite,
  ItemComponent = DefaultIconItem,
  className,
}: IconGridProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { rows, totalSize } = useVirtualIcons({
    icons,
    scrollRef,
    columns: gridSize,
    rowHeight: iconSize + 24,
  });

  return (
    <div
      ref={scrollRef}
      className={cn(
        "w-full overflow-y-auto overscroll-contain",
        "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border",
        className
      )}
      style={{ maxHeight }}
    >
      <div
        role="listbox"
        aria-label="Icons"
        style={{ height: totalSize, position: "relative" }}
        className="px-3 py-2"
      >
        {rows.map((row) => (
          <div
            key={row.index}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: row.size,
              transform: `translateY(${row.start}px)`,
              display: "grid",
              gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
              gap: 4,
            }}
          >
            {row.icons.map((icon) => (
              <ItemComponent
                key={icon.id}
                icon={icon}
                selected={icon.id === value}
                favorite={favorites.includes(icon.id)}
                useOriginalColor={useOriginalColor}
                iconSize={iconSize}
                onSelect={onSelect}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}