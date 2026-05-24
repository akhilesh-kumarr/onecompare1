"use client";

import { ArrowDownUp, Filter, Search } from "lucide-react";
import type { Category, SortKey } from "@/lib/comparison-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const categories: Array<{ value: Category | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "electronics", label: "Electronics" },
  { value: "cabs", label: "Cabs" },
  { value: "food", label: "Food" },
  { value: "grocery", label: "Grocery" }
];

const sorts: Array<{ value: SortKey; label: string }> = [
  { value: "best", label: "Best value" },
  { value: "price", label: "Lowest price" },
  { value: "rating", label: "Best rated" },
  { value: "fastest", label: "Fastest" },
  { value: "popular", label: "Popular" }
];

type SearchControlsProps = {
  query: string;
  onQueryChange: (query: string) => void;
  category?: Category | "all";
  onCategoryChange?: (category: Category | "all") => void;
  sort: SortKey;
  onSortChange: (sort: SortKey) => void;
  placeholder: string;
  showCategories?: boolean;
};

export function SearchControls({
  query,
  onQueryChange,
  category = "all",
  onCategoryChange,
  sort,
  onSortChange,
  placeholder,
  showCategories = false
}: SearchControlsProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.045] p-3 shadow-panel">
      <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
          <Input
            className="h-12 pl-12"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={placeholder}
          />
        </div>
        <div className="flex gap-2">
          <div className="relative flex-1 lg:w-44">
            <ArrowDownUp className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-emerald-300" />
            <select
              value={sort}
              onChange={(event) => onSortChange(event.target.value as SortKey)}
              className="h-12 w-full appearance-none rounded-md border border-white/10 bg-[#081813] pl-9 pr-3 text-sm font-semibold text-white outline-none transition focus:border-emerald-400/50"
            >
              {sorts.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </div>
          <Button variant="secondary" className="hidden h-12 sm:inline-flex">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </div>
      </div>
      {showCategories && onCategoryChange && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {categories.map((item) => (
            <button
              key={item.value}
              onClick={() => onCategoryChange(item.value)}
              suppressHydrationWarning
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
                category === item.value
                  ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100"
                  : "border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
