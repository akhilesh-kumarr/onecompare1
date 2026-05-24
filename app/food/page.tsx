"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FoodComparisonCard, RestaurantCard, type FoodItem } from "@/components/food-widgets";
import { ModuleHeroMockup } from "@/components/mockup-visuals";
import { PageShell } from "@/components/page-shell";
import { RecommendationCard } from "@/components/recommendation-card";
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

function toFoodItems(item: ComparisonItem): FoodItem[] {
  const recommendation = getRecommendation(item);
  return item.offers.map((offer) => ({
    platform: offer.platform,
    restaurant: item.brand,
    item: item.name,
    price: toCurrency(offer.price),
    delivery: offer.delivery,
    rating: offer.rating.toFixed(1),
    coupon: offer.offer,
    fee: offer.meta?.replace(" delivery fee", "") ?? "Included",
    best: offer.platform === recommendation.best.platform
  }));
}

export default function FoodPage() {
  const [query, setQuery] = useState("biryani");
  const [sort, setSort] = useState<SortKey>("best");
  const [foods, setFoods] = useState<ComparisonItem[]>([]);
  const [selected, setSelected] = useState<ComparisonItem | null>(null);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    setQuery(new URLSearchParams(window.location.search).get("q") ?? "biryani");
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadFoods() {
      setLoading(true);
      try {
        const params = new URLSearchParams({ q: debouncedQuery, category: "food", sort });
        const response = await fetch(`/api/search?${params.toString()}`, { signal: controller.signal });
        if (!response.ok) throw new Error("Unable to load food results");
        const payload = (await response.json()) as { results: ComparisonItem[] };
        setFoods(payload.results);
      } catch {
        if (!controller.signal.aborted) setFoods([]);
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    loadFoods();

    return () => controller.abort();
  }, [debouncedQuery, sort]);

  useEffect(() => {
    if (!selected || !foods.some((food) => food.id === selected.id)) {
      setSelected(foods[0] ?? null);
    }
  }, [foods, selected]);

  const foodItems = selected ? toFoodItems(selected) : [];
  const recommendation = selected ? getRecommendation(selected) : null;

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <Badge>Module 5 . Food Delivery Comparison</Badge>
            <h1 className="mt-4 text-3xl font-black text-white sm:text-5xl">Compare food before you order.</h1>
            <p className="mt-3 max-w-2xl text-zinc-400">
              Search biryani, pizza, or dinner options and compare final prices, delivery fees, coupons, ratings, and speed.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <ModuleHeroMockup
            kind="food"
            title="Food order price intelligence"
            subtitle="Compare item prices, delivery charges, ratings, coupons, restaurant quality, and arrival time."
          />
        </div>

        <div className="mb-8">
          <SearchControls
            query={query}
            onQueryChange={setQuery}
            sort={sort}
            onSortChange={setSort}
            placeholder="Try Chicken Biryani, pizza, dinner..."
          />
        </div>

        <section>
          <SectionHeading
            title={loading ? "Loading food results" : `${foods.length} food result${foods.length === 1 ? "" : "s"}`}
            description="Select a food item to compare platform-level pricing, fees, offers, and delivery speed."
          />
          {foods.length === 0 ? (
            <Card>
              <CardContent className="pt-5 text-sm text-zinc-400">No food result found. Try biryani or pizza.</CardContent>
            </Card>
          ) : (
            <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
              {foods.map((food) => (
                <button
                  key={food.id}
                  onClick={() => setSelected(food)}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    selected?.id === food.id ? "border-emerald-300/40 bg-emerald-400/15 text-emerald-100" : "border-white/10 bg-white/[0.04] text-zinc-400"
                  }`}
                >
                  {food.name}
                </button>
              ))}
            </div>
          )}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {foodItems.map((item, index) => (
              <motion.div
                key={item.platform}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
              >
                <RestaurantCard item={item} />
              </motion.div>
            ))}
          </div>
        </section>

        {selected && recommendation && (
          <section className="mt-10 grid gap-5 xl:grid-cols-[1.15fr_.85fr]">
            <div>
              <SectionHeading title="Food price matrix" />
              <FoodComparisonCard items={foodItems} />
            </div>
            <div>
              <SectionHeading title="AI meal recommendation" />
              <RecommendationCard
                title={recommendation.title}
                summary={recommendation.summary}
                points={recommendation.points}
              />
            </div>
          </section>
        )}

        <Card className="mt-10">
          <CardContent className="pt-5">
            <h2 className="text-xl font-black text-white">Functional platform coverage</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Swiggy", "Zomato", "Magicpin", "Coupons", "Delivery Fee", "Ratings", "Delivery Time"].map((item) => (
                <Badge key={item} variant="muted">{item}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </PageShell>
  );
}
