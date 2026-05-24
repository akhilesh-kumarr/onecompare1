"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  CarFront,
  Clock3,
  Mic,
  Search,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getSuggestions } from "@/lib/comparison-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const placeholders = [
  "Search iPhone 15 across stores...",
  "Compare Uber to Airport...",
  "Find best Chicken Biryani price...",
  "Optimize Milk 1L basket...",
  "Best value laptop under Rs. 60,000..."
];

const tabs = ["All", "Electronics", "Cabs", "Food", "Grocery", "Deals"];

export function SearchSuggestions({ query }: { query: string }) {
  const filtered = useMemo(() => getSuggestions(query), [query]);

  return (
    <AnimatePresence>
      {(query || filtered.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          className="absolute inset-x-0 top-[calc(100%+10px)] z-20 overflow-hidden rounded-lg border border-white/10 bg-[#061411]/95 p-2 shadow-panel backdrop-blur-xl"
        >
          <div className="mb-2 flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">
            <Sparkles className="h-3.5 w-3.5 text-emerald-300" />
            AI smart suggestions
          </div>
          {filtered.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className="flex items-center justify-between rounded-md px-3 py-3 text-sm transition hover:bg-emerald-400/10"
            >
              <span className="font-semibold text-white">{item.label}</span>
              <Badge variant="muted">{item.category}</Badge>
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function CategoryTabs({
  active,
  onChange
}: {
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="mx-auto mt-5 flex max-w-3xl gap-2 overflow-x-auto pb-1">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          suppressHydrationWarning
          className={cn(
            "shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition",
            active === tab
              ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100"
              : "border-white/10 bg-white/[0.04] text-zinc-400 hover:text-white"
          )}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export function TrendingSearches() {
  return (
    <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-4 sm:p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <TrendingUp className="h-4 w-4 text-emerald-300" />
          Trending searches
        </div>
        <span className="text-xs text-zinc-500">Live demo</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {getSuggestions("").slice(0, 5).map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-full border border-white/10 bg-white/[0.055] px-3 py-2 text-sm font-medium text-zinc-300 transition hover:border-emerald-400/40 hover:text-emerald-200"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const timer = window.setInterval(() => {
      setPlaceholderIndex((index) => (index + 1) % placeholders.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  function runSearch() {
    const suggestion = getSuggestions(query)[0];
    const target = suggestion ? `/${suggestion.category === "electronics" ? "electronics" : suggestion.category}` : "/electronics";
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`${target}${params.toString() ? `?${params.toString()}` : ""}`);
  }

  return (
    <div>
      <div className="relative mx-auto mt-9 max-w-3xl">
        <div className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.055] p-2 shadow-panel backdrop-blur sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />
            <Input
              className="h-14 border-transparent bg-transparent pl-12 pr-12 text-base"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => window.setTimeout(() => setFocused(false), 140)}
              onKeyDown={(event) => {
                if (event.key === "Enter") runSearch();
              }}
              placeholder={placeholders[placeholderIndex]}
            />
            <button
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md text-zinc-400 transition hover:bg-white/8 hover:text-emerald-200"
              aria-label="Voice search"
              suppressHydrationWarning
            >
              <Mic className="h-4 w-4" />
            </button>
          </div>
          <Button size="lg" className="h-14 shrink-0" onClick={runSearch}>
            Compare
          </Button>
        </div>
        {focused && <SearchSuggestions query={query} />}
      </div>

      <CategoryTabs active={activeTab} onChange={setActiveTab} />

      <div className="mx-auto mt-4 grid max-w-3xl gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-300">
          <Clock3 className="h-4 w-4 text-emerald-300" />
          Recent: MacBook Air M3
        </div>
        <div className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-zinc-300">
          <CarFront className="h-4 w-4 text-emerald-300" />
          Recent: Airport cab fare
        </div>
      </div>
    </div>
  );
}
