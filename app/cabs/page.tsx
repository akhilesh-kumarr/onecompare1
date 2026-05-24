"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bike, Car, Navigation } from "lucide-react";
import {
  CabFareCard,
  FareComparison,
  LocationInput,
  type CabRide
} from "@/components/cab-widgets";
import { ModuleHeroMockup } from "@/components/mockup-visuals";
import { PageShell } from "@/components/page-shell";
import { ResultsSkeleton } from "@/components/loading-skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getRecommendation,
  toCurrency,
  type ComparisonItem,
  type SortKey
} from "@/lib/comparison-data";

function rideIcon(platform: string) {
  if (platform.toLowerCase().includes("rapido")) return Bike;
  if (platform.toLowerCase().includes("ola")) return Car;
  if (platform.toLowerCase().includes("uber")) return Car;
  return Navigation;
}

export default function CabsPage() {
  const [pickup, setPickup] = useState("College Campus");
  const [drop, setDrop] = useState("Kempegowda Airport");
  const [sort, setSort] = useState<SortKey>("best");
  const [searched, setSearched] = useState(true);
  const [loading, setLoading] = useState(false);
  const [cabItem, setCabItem] = useState<ComparisonItem | null>(null);

  const recommendation = cabItem ? getRecommendation(cabItem) : null;

  const rides: CabRide[] = useMemo(() => {
    if (!cabItem || !recommendation) return [];
    return cabItem.offers.map((offer) => ({
      app: offer.platform,
      type: offer.meta ?? offer.offer,
      price: toCurrency(offer.price),
      eta: offer.delivery,
      rating: offer.rating.toFixed(1),
      tag:
        offer.platform === recommendation.cheapest.platform
          ? "Cheapest"
          : offer.platform === recommendation.fastest.platform
            ? "Fast"
            : "Best",
      surge: offer.meta?.toLowerCase().includes("surge") ? offer.meta : "None",
      icon: rideIcon(offer.platform),
      best: offer.platform === recommendation.best.platform
    }));
  }, [cabItem, recommendation]);

  async function searchRides() {
    setLoading(true);
    setSearched(false);
    try {
      const params = new URLSearchParams({
        category: "cabs",
        sort,
        pickup,
        drop,
        q: `${pickup} ${drop}`
      });
      const response = await fetch(`/api/search?${params.toString()}`);
      if (!response.ok) throw new Error("Unable to load cab rides");

      const payload = (await response.json()) as { results: ComparisonItem[] };
      setCabItem(payload.results[0] ?? null);
    } catch {
      setCabItem(null);
    } finally {
      setSearched(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    searchRides();
  }, []);

  return (
    <PageShell>
      <section className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-3xl">
          <Badge>Module 4 . Cab Fare Comparison</Badge>
          <h1 className="mt-4 text-3xl font-black text-white sm:text-5xl">Choose the ride that makes sense.</h1>
          <p className="mt-3 text-zinc-400">
            Search a pickup and drop route to compare fare, ETA, cab type, surge, cheapest option, and best-value ride.
          </p>
        </div>

        <div className="mb-8">
          <ModuleHeroMockup
            kind="cabs"
            title="Route-aware fare comparison"
            subtitle="Pickup, drop, ride types, ETA, surge pricing, cheapest platform badges, and ride quality signals."
          />
        </div>

        <Card className="mb-8">
          <CardContent className="grid gap-4 pt-5 lg:grid-cols-[1fr_1fr_auto_auto] lg:items-end">
            <LocationInput label="Pickup" value={pickup} onChange={setPickup} type="pickup" />
            <LocationInput label="Drop" value={drop} onChange={setDrop} type="drop" />
            <label className="grid gap-2 text-sm font-semibold text-zinc-300">
              Sort
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value as SortKey)}
                className="h-12 rounded-md border border-white/10 bg-[#081813] px-3 text-sm font-semibold text-white outline-none"
              >
                <option value="best">Best value</option>
                <option value="price">Lowest price</option>
                <option value="fastest">Fastest ETA</option>
                <option value="rating">Best rated</option>
              </select>
            </label>
            <Button onClick={searchRides} className="h-12">
              Search Rides
            </Button>
          </CardContent>
        </Card>

        {loading && <ResultsSkeleton />}

        {!loading && searched && (
          <div className="grid gap-5 xl:grid-cols-[1fr_340px]">
            <div className="grid gap-5 sm:grid-cols-2">
              {rides.map((ride, index) => (
                <motion.div
                  key={ride.app}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.07 }}
                >
                  <CabFareCard ride={ride} index={index} />
                </motion.div>
              ))}
            </div>
            <FareComparison rides={rides} />
          </div>
        )}
      </section>
    </PageShell>
  );
}
