import {
  comparisonItems,
  getRecommendation,
  searchComparisons,
  type Category,
  type ComparisonItem,
  type PlatformOffer,
  type SortKey
} from "@/lib/comparison-data";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000";

type BackendProduct = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  rating: number;
  delivery_days: number;
  platform: string;
  image_url?: string;
  specs: Record<string, string>;
};

type BackendCabRide = {
  id: string;
  provider: string;
  source: string;
  destination: string;
  estimated_price: number;
  estimated_time_minutes: number;
  rating: number;
  vehicle_type: string;
};

function discountFor(price: number) {
  if (price > 100000) return 6;
  if (price > 50000) return 15;
  if (price > 10000) return 22;
  return 0;
}

function deliveryLabel(product: BackendProduct) {
  const specDelivery = product.specs.Delivery;
  if (specDelivery) return specDelivery;
  return product.delivery_days === 0 ? "Today" : `${product.delivery_days} day${product.delivery_days === 1 ? "" : "s"}`;
}

function deliveryMinutes(product: BackendProduct) {
  const delivery = deliveryLabel(product);
  const match = delivery.match(/(\d+)\s*min/i);
  if (match) return Number(match[1]);
  return Math.max(product.delivery_days, 1) * 1440;
}

function typeFor(product: BackendProduct) {
  if (product.category === "food") return "Food Delivery";
  if (product.category === "grocery") return "Grocery";
  if (product.category === "deals") return product.specs.Category ?? "Deal";
  if (product.name.toLowerCase().includes("macbook")) return "Laptop";
  if (product.name.toLowerCase().includes("sony")) return "Headphones";
  return "Mobile";
}

function groupProducts(products: BackendProduct[]): ComparisonItem[] {
  const grouped = new Map<string, BackendProduct[]>();

  for (const product of products) {
    const key = product.name.toLowerCase();
    grouped.set(key, [...(grouped.get(key) ?? []), product]);
  }

  return [...grouped.values()].map((group) => {
    const first = group[0];
    const offers: PlatformOffer[] = group.map((product) => ({
      platform: product.platform,
      price: product.price,
      mrp: Math.round(product.price / (1 - discountFor(product.price) / 100)),
      discount: discountFor(product.price),
      rating: product.rating,
      delivery: deliveryLabel(product),
      deliveryMinutes: deliveryMinutes(product),
      availability: "In Stock",
      offer: product.specs.Coupon ?? product.specs.Deal ?? (product.delivery_days <= 1 ? "Fast delivery" : "Standard delivery"),
      meta: product.specs.Fee ?? product.specs.Deal
    }));

    return {
      id: first.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      category: first.category as Category,
      name: first.name,
      brand: first.brand,
      type: typeFor(first),
      popularity: 90,
      imageLabel: Object.values(first.specs).slice(0, 3).join(" . "),
      specs: first.specs,
      tags: [first.name, first.brand, first.category],
      offers
    };
  });
}

function cabRidesToComparison(rides: BackendCabRide[], pickup: string, drop: string): ComparisonItem[] {
  if (rides.length === 0) return [];

  return [
    {
      id: `${pickup}-${drop}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      category: "cabs",
      name: `${pickup} to ${drop}`,
      brand: "Bangalore",
      type: "Cab Fare",
      popularity: 91,
      imageLabel: `${pickup} pickup . ${drop} drop`,
      tags: ["cab", pickup, drop, ...rides.map((ride) => ride.provider)],
      specs: {
        Pickup: pickup,
        Drop: drop,
        Options: `${rides.length} rides`,
        Best: rides[0].provider
      },
      offers: rides.map((ride) => ({
        platform: ride.provider,
        price: ride.estimated_price,
        discount: 0,
        rating: ride.rating,
        delivery: `${ride.estimated_time_minutes} min`,
        deliveryMinutes: ride.estimated_time_minutes,
        availability: "In Stock",
        offer: ride.vehicle_type,
        meta: ride.vehicle_type
      }))
    }
  ];
}

export async function searchBackendComparisons({
  query,
  category,
  sort,
  pickup,
  drop,
  maxPrice
}: {
  query: string;
  category: Category | "all";
  sort: SortKey;
  pickup?: string;
  drop?: string;
  maxPrice?: number;
}) {
  try {
    if (category === "electronics" || category === "food" || category === "grocery" || category === "deals" || category === "all") {
      const params = new URLSearchParams({ limit: "100" });
      if (category !== "all") params.set("category", category);
      if (query) params.set("search", query);

      const response = await fetch(`${API_BASE_URL}/api/v1/products?${params.toString()}`, {
        cache: "no-store"
      });
      if (!response.ok) throw new Error("Products API failed");

      let results = groupProducts((await response.json()) as BackendProduct[]);
      if (maxPrice) {
        results = results.filter((item) => Math.min(...item.offers.map((offer) => offer.price)) <= maxPrice);
      }
      return { source: "fastapi", results };
    }

    if (category === "cabs") {
      const params = new URLSearchParams({ limit: "20" });
      if (pickup) params.set("source", pickup);
      if (drop) params.set("destination", drop);

      const response = await fetch(`${API_BASE_URL}/api/v1/cab-rides?${params.toString()}`, {
        cache: "no-store"
      });
      if (!response.ok) throw new Error("Cab API failed");

      const results = cabRidesToComparison((await response.json()) as BackendCabRide[], pickup ?? "Pickup", drop ?? "Drop");
      return { source: "fastapi", results };
    }
  } catch {
    const results = searchComparisons({ query, category, sort, maxPrice });
    return { source: "next-fallback", results };
  }

  return {
    source: "next-local",
    results: searchComparisons({ query, category, sort, maxPrice })
  };
}

export function localRecommendation(id: string | null) {
  const item = comparisonItems.find((entry) => entry.id === id) ?? comparisonItems[0];
  return {
    item,
    recommendation: getRecommendation(item)
  };
}
