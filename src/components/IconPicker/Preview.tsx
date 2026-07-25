import * as React from "react";
import { cn } from "@/lib/utils";
import type { IconDefinition } from "../../types/icon";

export interface PreviewProps {
  icon: IconDefinition | null;
  useOriginalColor?: boolean;
  className?: string;
}

/** Shows a larger rendering of the currently selected icon plus its name/library. */
export function Preview({ icon, useOriginalColor, className }: PreviewProps) {
  if (!icon) return null;
  const Icon = icon.component;
  const color = useOriginalColor && icon.color ? icon.color : "currentColor";

  return (
    <div className={cn("flex items-center gap-3 border-b px-3 py-2", className)}>
      <div className="flex h-9 w-9 items-center justify-center rounded-md border bg-muted">
        <Icon title={icon.name} size={22} color={color} aria-hidden="true" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium">{icon.name}</p>
        <p className="truncate text-xs text-muted-foreground">{icon.library}</p>
      </div>
    </div>
  );
}
