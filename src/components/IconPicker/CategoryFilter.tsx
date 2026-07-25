import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface CategoryFilterProps {
  categories: string[];
  value: string | null;
  onChange: (category: string | null) => void;
  className?: string;
}

/** Horizontal, scrollable list of category pills. `null` = "All". */
export function CategoryFilter({ categories, value, onChange, className }: CategoryFilterProps) {
  if (categories.length === 0) return null;

  return (
    <div className={cn("flex gap-1.5 overflow-x-auto px-3 py-2", className)}>
      <Badge
        variant={value === null ? "default" : "outline"}
        className="cursor-pointer whitespace-nowrap"
        onClick={() => onChange(null)}
      >
        All
      </Badge>
      {categories.map((category) => (
        <Badge
          key={category}
          variant={value === category ? "default" : "outline"}
          className="cursor-pointer whitespace-nowrap capitalize"
          onClick={() => onChange(category)}
        >
          {category}
        </Badge>
      ))}
    </div>
  );
}
