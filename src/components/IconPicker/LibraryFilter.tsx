import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface LibraryFilterProps {
  libraries: { id: string; name: string }[];
  value: string | null;
  onChange: (libraryId: string | null) => void;
  className?: string;
}

/** Horizontal list of library pills. `null` = "All libraries". */
export function LibraryFilter({ libraries, value, onChange, className }: LibraryFilterProps) {
  if (libraries.length <= 1) return null;

  return (
    <div className={cn("flex gap-1.5 overflow-x-auto px-3 py-2", className)}>
      <Badge
        variant={value === null ? "default" : "outline"}
        className="cursor-pointer whitespace-nowrap"
        onClick={() => onChange(null)}
      >
        All libraries
      </Badge>
      {libraries.map((lib) => (
        <Badge
          key={lib.id}
          variant={value === lib.id ? "default" : "outline"}
          className="cursor-pointer whitespace-nowrap"
          onClick={() => onChange(lib.id)}
        >
          {lib.name}
        </Badge>
      ))}
    </div>
  );
}
