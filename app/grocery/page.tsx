"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CartOptimizer, GroceryCard, PriceMatrix, type GroceryItem } from "@/components/grocery-widgets";
import { ModuleHeroMockup } from "@/components/mockup-visuals";
import { PageShell } from "@/components/page-shell";
import { SearchControls } from "@/components/search-controls";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  getRecommendation,
  toCurrency,
  type ComparisonItem,
  type SortKey
} from "@/lib/comparison-data";
import { useDebounce } from "@/lib/use-debounce";

function toGroceryItems(item: ComparisonItem): GroceryItem[] {
  const recommendation = getRecommendation(item);
  return item.offers.map((offer) => ({
    platform: offer.platform,
    product: item.name,
    quantity: item.specs.Quantity ?? "1 unit",
    price: toCurrency(offer.price),
    delivery: offer.delivery,
    tag: offer.platform === recommendation.cheapest.platform ? "Cheapest" : offer.platform === recommendation.fastest.platform ? "Fastest" : "Value",
    best: offer.platform === recommendation.best.platform
  }));
}

export default function GroceryPage() {
  const [query, setQuery] = useState("milk");
  const [sort, setSort] = useState<SortKey>("best");
  const [groceries, setGroceries] = useState<ComparisonItem[]>([]);
  const [selected, setSelected] = useState<ComparisonItem | null>(null);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    setQuery(new URLSearchParams(window.location.search).get("q") ?? "milk");
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadGroceries() {
      setLoading(true);
      try {
        const params = new URLSearchParams({ q: debouncedQuery, category: "grocery", sort });
        const response = await fetch(`/api/search?${params.toString()}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Unable to load grocery results");
        const payload = (await response.json()) as { results: ComparisonItem[] };
        setGroceries(payload.results);
      } catch {
        if (!controller.signal.aborted) setGroceries([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadGroceries();

    return () => controller.abort();
  }, [debouncedQuery, sort]);

  useEffect(() => {
    if (!selected || !groceries.some((item) => item.id === selected.id)) {
      setSelected(groceries[0] ?? null);
    }
  }, [groceries, selected]);

  const groceryItems = selected ? toGroceryItems(selected) : [];

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <Badge>Module 6 . Grocery Comparison</Badge>
            <h1 className="mt-4 text-3xl font-black text-white sm:text-5xl">Optimize every grocery basket.</h1>
            <p className="mt-3 max-w-2xl text-zinc-400">
              Search milk, ghee, essentials, or household items and compare quantity, price, speed, and platform value.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <ModuleHeroMockup
            kind="grocery"
            title="Basket optimization view"
            subtitle="Compare quantities, delivery speed, cheapest platform, full-cart savings, and basket split recommendations."
          />
        </div>

        <div className="mb-8">
          <SearchControls
            query={query}
            onQueryChange={setQuery}
            sort={sort}
            onSortChange={setSort}
            placeholder="Try Milk 1L, Amul Ghee, grocery..."
          />
        </div>

        <section>
          <SectionHeading
            title={loading ? "Loading grocery results" : `${groceries.length} grocery result${groceries.length === 1 ? "" : "s"}`}
            description="Choose a grocery item to compare unit price, speed, and basket optimization signals."
          />
          <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
            {groceries.map((item) => (
              <button
                key={item.id}
                onClick={() => setSelected(item)}
                className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  selected?.id === item.id ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100" : "border-white/10 bg-white/[0.04] text-zinc-400"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          {groceries.length === 0 ? (
            <Card>
              <CardContent className="pt-5 text-sm text-zinc-400">No grocery result found. Try milk or ghee.</CardContent>
            </Card>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
              {groceryItems.map((item, index) => (
                <motion.div
                  key={item.platform}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <GroceryCard item={item} />
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {selected && (
          <section className="mt-10 grid gap-5 xl:grid-cols-[1fr_.9fr]">
            <div>
              <SectionHeading title="Price matrix" />
              <PriceMatrix items={groceryItems} />
            </div>
            <div>
              <SectionHeading title="Cart optimizer" />
              <CartOptimizer />
            </div>
          </section>
        )}

        <Card className="mt-10">
          <CardContent className="pt-5">
            <h2 className="text-xl font-black text-white">Functional platform coverage</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Blinkit", "Zepto", "BigBasket", "Instamart", "Quantity Match", "Basket Split"].map((item) => (
                <Badge key={item} variant="muted">{item}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
