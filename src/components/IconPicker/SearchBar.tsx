import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
}

/** Search input, wired into cmdk so keyboard nav (arrows/enter/esc) works for free. */
export function SearchBar({
  value,
  onChange,
  placeholder = "Search icons...",
  className,
  autoFocus = true,
}: SearchBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border-b px-3 py-2",
        className
      )}
    >
      <Search className="h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
      <CommandPrimitive.Input
        value={value}
        onValueChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={cn(
          "flex h-8 w-full rounded-md bg-transparent text-sm outline-none",
          "placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="shrink-0 rounded-sm opacity-50 hover:opacity-100"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
