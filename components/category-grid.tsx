"use client";

import Link from "next/link";
import {
  ArrowRight,
  Bot,
  CarFront,
  Headphones,
  Home,
  Laptop,
  PackageSearch,
  ShoppingBasket,
  Smartphone,
  Utensils
} from "lucide-react";
import { CategoryCard } from "@/components/category-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const categories = [
  {
    href: "/electronics",
    title: "Electronics",
    description: "Mobiles, laptops, headphones, tablets, ratings, specs, and deals.",
    icon: Laptop,
    stats: "3 stores"
  },
  {
    href: "/cabs",
    title: "Cabs",
    description: "Uber, Ola, Rapido, ETA, surge, cheapest tags, and ride classes.",
    icon: CarFront,
    stats: "4 apps"
  },
  {
    href: "/food",
    title: "Food",
    description: "Swiggy, Zomato, Magicpin, coupons, delivery fees, and ratings.",
    icon: Utensils,
    stats: "4 apps"
  },
  {
    href: "/grocery",
    title: "Grocery",
    description: "Blinkit, Zepto, BigBasket, Instamart, quantities, and baskets.",
    icon: ShoppingBasket,
    stats: "4 apps"
  },
  {
    href: "/electronics",
    title: "Gadgets",
    description: "Audio gear, wearables, smart devices, launch deals, and reviews.",
    icon: Headphones,
    stats: "AI picks"
  },
  {
    href: "/electronics",
    title: "Appliances",
    description: "Home electronics, warranties, energy ratings, and service value.",
    icon: Home,
    stats: "Value"
  }
];

export function QuickActions() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Link
        href="/ai"
        className="group rounded-lg border border-emerald-400/25 bg-emerald-400/[0.07] p-5 transition hover:bg-emerald-400/[0.1]"
      >
        <div className="mb-5 flex items-center justify-between">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-400/15 text-emerald-200">
            <Bot className="h-5 w-5" />
          </span>
          <Badge>Premium</Badge>
        </div>
        <h3 className="text-lg font-black text-white">Ask AI for best value</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Convert budget, ratings, specs, delivery, and reviews into a clear buying decision.
        </p>
        <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-emerald-200">
          Open AI engine <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      </Link>

      <Link
        href="/deals"
        className="group rounded-lg border border-white/10 bg-white/[0.045] p-5 transition hover:border-emerald-400/35"
      >
        <PackageSearch className="mb-5 h-10 w-10 rounded-md bg-white/8 p-2 text-emerald-300" />
        <h3 className="text-lg font-black text-white">Track price drops</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Watch flash deals, saved comparisons, wishlists, and alert preferences.
        </p>
      </Link>

      <div className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
        <Smartphone className="mb-5 h-10 w-10 rounded-md bg-white/8 p-2 text-emerald-300" />
        <h3 className="text-lg font-black text-white">Demo shortcuts</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Use ready examples like iPhone 15, Chicken Biryani, Milk 1L, and Uber to Airport.
        </p>
        <Button asChild variant="secondary" className="mt-5">
          <Link href="/electronics">Start comparing</Link>
        </Button>
      </div>
    </div>
  );
}

export function CategoryGrid() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {categories.map((category) => (
        <CategoryCard key={category.title} {...category} />
      ))}
    </div>
  );
}
