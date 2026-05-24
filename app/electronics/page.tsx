"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Headphones, Laptop, Smartphone, TabletSmartphone } from "lucide-react";
import { ComparisonTable, type StoreOffer } from "@/components/comparison-table";
import { FilterSidebar, ProductCard, SpecificationTable } from "@/components/electronics-widgets";
import { ModuleHeroMockup } from "@/components/mockup-visuals";
import { PageShell } from "@/components/page-shell";
import { RecommendationCard } from "@/components/recommendation-card";
import { SearchControls } from "@/components/search-controls";
import { SectionHeading } from "@/components/section-heading";
import { ResultsSkeleton } from "@/components/loading-skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  getBestOffer,
  getRecommendation,
  toCurrency,
  type ComparisonItem,
  type SortKey
} from "@/lib/comparison-data";
import { useDebounce } from "@/lib/use-debounce";

function iconFor(item: ComparisonItem) {
  if (item.type.toLowerCase().includes("laptop")) return Laptop;
  if (item.type.toLowerCase().includes("headphones")) return Headphones;
  if (item.type.toLowerCase().includes("tablet")) return TabletSmartphone;
  return Smartphone;
}

function toStoreOffers(item: ComparisonItem): StoreOffer[] {
  const recommended = getRecommendation(item).best.platform;
  return item.offers.map((offer) => ({
    store: offer.platform,
    price: toCurrency(offer.price),
    delivery: offer.delivery,
    rating: offer.rating.toFixed(1),
    warranty: offer.availability,
    deal: `${offer.discount}% off . ${offer.offer}`,
    best: offer.platform === recommended
  }));
}

function toSpecRows(item: ComparisonItem) {
  return Object.entries(item.specs).map(([name, value], index) => ({
    name,
    value,
    score: String(Math.max(82, 96 - index * 3))
  }));
}

export default function ElectronicsPage() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("best");
  const [products, setProducts] = useState<ComparisonItem[]>([]);
  const [selected, setSelected] = useState<ComparisonItem | null>(null);
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 250);

  useEffect(() => {
    setQuery(new URLSearchParams(window.location.search).get("q") ?? "");
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          q: debouncedQuery,
          category: "electronics",
          sort
        });
        const response = await fetch(`/api/search?${params.toString()}`, {
          signal: controller.signal
        });
        if (!response.ok) throw new Error("Unable to load electronics");

        const payload = (await response.json()) as { results: ComparisonItem[] };
        setProducts(payload.results);
      } catch (error) {
        if (!controller.signal.aborted) {
          setProducts([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => controller.abort();
  }, [debouncedQuery, sort]);

  useEffect(() => {
    if (!selected || !products.some((product) => product.id === selected.id)) {
      setSelected(products[0] ?? null);
    }
  }, [products, selected]);

  function chooseProduct(product: ComparisonItem) {
    setSelected(product);
  }

  const recommendation = selected ? getRecommendation(selected) : null;

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <Badge>Module 3 . Electronics Comparison</Badge>
            <h1 className="mt-4 text-3xl font-black text-white sm:text-5xl">Compare gadgets like a pro.</h1>
            <p className="mt-3 max-w-2xl text-zinc-400">
              Search iPhone, laptops, headphones, or gaming devices and get filtered prices, specs, availability, and AI value picks.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <ModuleHeroMockup
            kind="electronics"
            title="Electronics comparison dashboard"
            subtitle="Phones, laptops, audio gear, specs, store offers, ratings, warranty, delivery, and AI deal scoring."
          />
        </div>

        <div className="mb-6">
          <SearchControls
            query={query}
            onQueryChange={setQuery}
            sort={sort}
            onSortChange={setSort}
            placeholder="Try iPhone, gaming laptop, Sony headphones..."
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
          <aside className="self-start">
            <FilterSidebar />
          </aside>

          <div className="grid gap-8">
            <section>
              <SectionHeading
                title={`${products.length} matching product${products.length === 1 ? "" : "s"}`}
                description="Results update with debounced search and sorting by value, price, rating, popularity, or delivery speed."
              />
              {products.length === 0 ? (
                <Card>
                  <CardContent className="pt-5 text-sm text-zinc-400">
                    No matching electronics found. Try iPhone, MacBook, gaming laptop, or Sony.
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  {products.map((product, index) => {
                    const best = getBestOffer(product, sort);
                    return (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.04 }}
                      >
                        <ProductCard
                          product={{
                            id: product.id,
                            name: product.name,
                            category: product.type,
                            price: `from ${toCurrency(best.price)}`,
                            imageLabel: product.imageLabel,
                            platform: best.platform,
                            rating: best.rating.toFixed(1),
                            delivery: best.delivery,
                            offer: `${best.discount}% OFF`,
                            icon: iconFor(product)
                          }}
                          selected={selected?.id === product.id}
                          onSelect={() => chooseProduct(product)}
                        />
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </section>

            {loading ? (
              <ResultsSkeleton />
            ) : selected && recommendation ? (
              <>
                <Card>
                  <CardContent className="pt-5">
                    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                      <div>
                        <Badge variant="muted">{selected.type}</Badge>
                        <h2 className="mt-3 text-2xl font-black text-white">{selected.name}</h2>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="text-sm text-zinc-500">Best value price</p>
                        <p className="text-2xl font-black text-emerald-300">{toCurrency(recommendation.best.price)}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {selected.tags.slice(0, 5).map((tag) => (
                        <Badge key={tag} variant="muted">{tag}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-5 xl:grid-cols-[1.1fr_.9fr]">
                  <ComparisonTable offers={toStoreOffers(selected)} />
                  <SpecificationTable specs={toSpecRows(selected)} />
                </div>

                <RecommendationCard
                  title={recommendation.title}
                  summary={recommendation.summary}
                  points={recommendation.points}
                />
              </>
            ) : null}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
