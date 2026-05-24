"use client";

import {
  Bell,
  Car,
  CheckCircle2,
  Grid3X3,
  Laptop,
  Menu,
  Mic,
  Search,
  ShoppingBasket,
  Smartphone,
  Star,
  Tag,
  Utensils,
  Watch
} from "lucide-react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type VisualKind =
  | "electronics"
  | "cabs"
  | "food"
  | "grocery"
  | "gadgets"
  | "appliances"
  | "ai"
  | "deals"
  | "search";

const visualConfig = {
  electronics: { icon: Smartphone, label: "Electronics", accent: "from-cyan-300/20 to-emerald-400/20" },
  cabs: { icon: Car, label: "Cabs", accent: "from-amber-300/20 to-emerald-400/20" },
  food: { icon: Utensils, label: "Food", accent: "from-orange-300/20 to-emerald-400/20" },
  grocery: { icon: ShoppingBasket, label: "Grocery", accent: "from-lime-300/20 to-emerald-400/20" },
  gadgets: { icon: Watch, label: "Gadgets", accent: "from-sky-300/20 to-emerald-400/20" },
  appliances: { icon: Grid3X3, label: "Appliances", accent: "from-zinc-300/20 to-emerald-400/20" },
  ai: { icon: Star, label: "AI Pick", accent: "from-emerald-300/25 to-lime-400/20" },
  deals: { icon: Tag, label: "Deals", accent: "from-green-300/25 to-emerald-500/20" },
  search: { icon: Search, label: "Search", accent: "from-teal-300/25 to-emerald-400/20" }
};

export function VisualTile({
  kind,
  title,
  className
}: {
  kind: VisualKind;
  title?: string;
  className?: string;
}) {
  const config = visualConfig[kind];
  const Icon = config.icon;

  return (
    <div className={cn("relative overflow-hidden rounded-md border border-white/10 bg-[#071914]", className)}>
      <div className={cn("absolute inset-0 bg-gradient-to-br", config.accent)} />
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-emerald-300/15 blur-2xl" />
      <div className="relative flex h-full min-h-28 flex-col justify-between p-4">
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/10 text-emerald-200">
            <Icon className="h-5 w-5" />
          </span>
          <span className="rounded-full border border-emerald-300/25 bg-emerald-400/12 px-2 py-1 text-[10px] font-bold text-emerald-100">
            Live
          </span>
        </div>
        <div>
          <p className="text-xs font-semibold text-emerald-200">{config.label}</p>
          <p className="mt-1 text-sm font-black leading-tight text-white">{title ?? config.label}</p>
        </div>
      </div>
    </div>
  );
}

function PhoneFrame({
  title,
  subtitle,
  kind,
  children
}: {
  title: string;
  subtitle: string;
  kind: VisualKind;
  children: ReactNode;
}) {
  return (
    <motion.div
      whileHover={{ y: -6, rotate: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
      className="mx-auto w-full max-w-[250px]"
    >
      <div className="mb-5 text-center">
        <h3 className="text-xl font-black leading-tight text-white">{title}</h3>
        <p className="mt-2 text-sm leading-5 text-zinc-300">{subtitle}</p>
      </div>
      <div className="rounded-[2rem] border border-emerald-300/35 bg-[#050b0d] p-2 shadow-[0_0_40px_rgba(16,185,129,.22)]">
        <div className="overflow-hidden rounded-[1.55rem] border border-white/10 bg-[#061017]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[10px] font-bold text-white">
            <span>12:{kind === "grocery" ? "37" : "17"}</span>
            <span className="flex gap-1">
              <span className="h-1.5 w-4 rounded-full bg-white/80" />
              <span className="h-1.5 w-2 rounded-full bg-emerald-300" />
            </span>
          </div>
          <div className="min-h-[420px] p-4">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SearchPhone() {
  return (
    <PhoneFrame
      title="Search Across All Platforms"
      subtitle="Find products, services and compare instantly."
      kind="search"
    >
      <div className="mb-7 flex items-center justify-between">
        <Menu className="h-4 w-4 text-zinc-300" />
        <span className="text-base font-black text-white">one<span className="text-emerald-300">Compare</span></span>
        <Bell className="h-4 w-4 text-emerald-300" />
      </div>
      <h4 className="text-center text-lg font-black text-white">Compare Everything.</h4>
      <p className="text-center text-lg font-black text-emerald-300">Save Every Time.</p>
      <div className="mt-5 flex items-center gap-2 rounded-lg bg-white px-3 py-3 text-xs text-zinc-700">
        <Search className="h-4 w-4" />
        Search for products, cabs, food...
        <Mic className="ml-auto h-4 w-4" />
      </div>
      <p className="mt-6 text-xs font-bold text-white">Popular Searches</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {["iPhone 15", "Pizza", "Uber"].map((item) => (
          <span key={item} className="rounded-full bg-white/8 px-2.5 py-1 text-[10px] text-zinc-200">{item}</span>
        ))}
      </div>
      <p className="mt-6 text-xs font-bold text-white">Top Categories</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {(["electronics", "cabs", "food", "grocery", "gadgets", "deals"] as VisualKind[]).map((item) => (
          <VisualTile key={item} kind={item} className="min-h-20" />
        ))}
      </div>
    </PhoneFrame>
  );
}

function ComparePhone() {
  const rows = [
    ["Amazon", "Rs. 59,999", "10% OFF"],
    ["Flipkart", "Rs. 58,999", "12% OFF"],
    ["Croma", "Rs. 60,499", "9% OFF"],
    ["Vijay", "Rs. 59,990", "10% OFF"]
  ];

  return (
    <PhoneFrame
      title="Compare Mock/Live Demo Data"
      subtitle="Demo prices, delivery time and offers across platforms."
      kind="electronics"
    >
      <div className="rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-xs text-zinc-200">
        <Search className="mr-2 inline h-3.5 w-3.5" />
        iPhone 15 128GB
      </div>
      <div className="mt-4 flex gap-2">
        {["All", "Amazon", "Croma"].map((tab) => (
          <span key={tab} className="rounded-md bg-emerald-400/15 px-3 py-1 text-[10px] font-bold text-emerald-100">{tab}</span>
        ))}
      </div>
      <div className="mt-4 grid gap-3">
        {rows.map((row) => (
          <div key={row[0]} className="rounded-lg bg-white p-3 text-zinc-950">
            <div className="flex items-center justify-between">
              <span className="font-black">{row[0]}</span>
              <span className="text-[10px] font-bold">4.4 ⭐</span>
            </div>
            <div className="mt-2 flex items-end justify-between">
              <span className="text-lg font-black">{row[1]}</span>
              <span className="text-[10px] font-black text-emerald-700">{row[2]}</span>
            </div>
            <p className="mt-1 text-[10px] text-zinc-600">FREE delivery by Tomorrow</p>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

function StackPhone() {
  return (
    <PhoneFrame
      title="No More Switching Between Apps"
      subtitle="All platforms in one place, one smart comparison."
      kind="deals"
    >
      <div className="relative h-[350px]">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="absolute top-8 rounded-2xl border border-white/10 bg-white p-5 text-zinc-950 shadow-2xl"
            style={{
              left: `${20 + index * 32}px`,
              width: "150px",
              transform: `rotate(${index === 0 ? -7 : index === 1 ? 0 : 7}deg)`,
              zIndex: 5 - index
            }}
          >
            <p className="text-sm font-black">{index === 0 ? "Amazon" : index === 1 ? "oneCompare" : "Croma"}</p>
            <VisualTile kind={index === 1 ? "electronics" : "deals"} className="mt-4 min-h-32 border-zinc-200" />
            <p className="mt-4 text-xl font-black">Rs. 59,999</p>
            <p className="text-xs text-emerald-700">In Stock</p>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

function GroceryPhone() {
  return (
    <PhoneFrame
      title="Find Best Price At One Place"
      subtitle="We find the best deal so you don't have to."
      kind="grocery"
    >
      <div className="rounded-lg border border-white/10 bg-white/8 px-3 py-2 text-xs text-zinc-200">
        <Search className="mr-2 inline h-3.5 w-3.5" />
        Amul Pure Ghee 1L
      </div>
      <div className="mt-4 grid gap-3">
        {[
          ["Blinkit", "Rs. 635", "Best"],
          ["Zepto", "Rs. 648", "Fast"],
          ["BigBasket", "Rs. 670", "Save"],
          ["Instamart", "Rs. 660", "Add"]
        ].map((row) => (
          <div key={row[0]} className="rounded-lg bg-white p-3 text-zinc-950">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-black">{row[0]}</span>
              <span className="text-[10px] font-bold">4.4 ⭐</span>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xl font-black">{row[1]}</span>
              <span className="rounded-md border border-emerald-700 px-2 py-1 text-[10px] font-black text-emerald-700">{row[2]}</span>
            </div>
          </div>
        ))}
      </div>
    </PhoneFrame>
  );
}

export function AppShowcase() {
  return (
    <section className="rounded-lg border border-emerald-400/25 bg-[#041410] p-5 shadow-panel">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <SearchPhone />
        <ComparePhone />
        <StackPhone />
        <GroceryPhone />
      </div>
    </section>
  );
}

export function DashboardPreview() {
  return (
    <section className="rounded-lg border border-emerald-400/25 bg-[#03100d] p-5 shadow-panel">
      <div className="grid gap-5 xl:grid-cols-[1.35fr_.8fr]">
        <div className="rounded-lg border border-white/10 bg-[#061411] p-5">
          <div className="mb-6 flex items-center gap-4">
            <span className="text-xl font-black text-white">one<span className="text-emerald-300">Compare</span></span>
            <div className="ml-auto flex max-w-md flex-1 items-center gap-2 rounded-full bg-white/8 px-4 py-3 text-sm text-zinc-400">
              <Search className="h-4 w-4" />
              Search anything... mobiles, cabs, food, grocery
            </div>
          </div>
          <h3 className="text-2xl font-black text-white">Welcome back, Ankit</h3>
          <p className="mt-1 text-sm text-zinc-400">Let’s find the best value for your money.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {(["electronics", "cabs", "food", "grocery", "gadgets"] as VisualKind[]).map((item) => (
              <VisualTile key={item} kind={item} className="min-h-36" />
            ))}
          </div>
          <div className="mt-6 rounded-lg border border-emerald-400/20 bg-emerald-400/[0.055] p-5">
            <div className="mb-4 flex items-center gap-2">
              <h4 className="font-black text-white">Smart Recommendation</h4>
              <Badge>AI Powered</Badge>
            </div>
            <div className="grid gap-5 md:grid-cols-[.8fr_1fr_auto] md:items-center">
              <VisualTile kind="electronics" title="OnePlus 12R 256GB" className="min-h-36" />
              <div>
                <Badge>Best Value for You</Badge>
                <h5 className="mt-3 text-xl font-black text-white">OnePlus 12R 256GB</h5>
                <p className="text-sm text-zinc-400">Flipkart . Delivery by Tomorrow</p>
                <p className="mt-2 text-2xl font-black text-emerald-300">Rs. 39,999</p>
              </div>
              <div className="grid gap-2 text-sm text-zinc-300">
                {["Cheapest Price", "High Rating", "Fast Delivery"].map((item) => (
                  <span key={item} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300" />{item}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-5">
          <ComparisonPanel />
          <CabPanel />
        </div>
      </div>
    </section>
  );
}

function ComparisonPanel() {
  return (
    <div className="rounded-lg border border-white/10 bg-[#061411] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-black text-white">Electronics Comparison</h3>
        <span className="text-xs font-bold text-emerald-300">Add to Compare</span>
      </div>
      <div className="grid grid-cols-4 overflow-hidden rounded-md border border-white/10 text-sm">
        {["", "iPhone 15", "Samsung S24", "OnePlus 12R"].map((item) => (
          <div key={item} className="border-b border-r border-white/10 p-3 text-center font-bold text-white last:border-r-0">{item}</div>
        ))}
        {[
          ["Price", "Rs. 59,999", "Rs. 74,999", "Rs. 39,999"],
          ["Rating", "4.5 ⭐", "4.4 ⭐", "4.4 ⭐"],
          ["Storage", "128GB", "256GB", "256GB"],
          ["Best For", "iOS", "Premium", "Performance"]
        ].flatMap((row) =>
          row.map((cell, index) => (
            <div key={`${row[0]}-${cell}-${index}`} className={cn("border-r border-t border-white/10 p-3 text-center text-zinc-300 last:border-r-0", index === 3 && "text-emerald-300 font-bold")}>
              {cell}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function CabPanel() {
  return (
    <div className="rounded-lg border border-white/10 bg-[#061411] p-5">
      <h3 className="mb-3 text-lg font-black text-white">Cab Fare Comparison</h3>
      {[
        ["Uber Go", "Rs. 210", "5 min"],
        ["Ola Mini", "Rs. 190", "6 min"],
        ["Rapido Go", "Rs. 165", "4 min"],
        ["Ola Prime", "Rs. 260", "6 min"]
      ].map((row, index) => (
        <div key={row[0]} className="flex items-center gap-3 border-b border-white/10 py-3 last:border-b-0">
          <Car className="h-5 w-5 text-emerald-300" />
          <span className="font-semibold text-white">{row[0]}</span>
          {index === 2 && <Badge>Cheapest</Badge>}
          <span className="ml-auto font-black text-white">{row[1]}</span>
          <span className="text-sm text-zinc-400">{row[2]}</span>
        </div>
      ))}
    </div>
  );
}

export function ModuleHeroMockup({
  kind,
  title,
  subtitle
}: {
  kind: VisualKind;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-lg border border-emerald-400/25 bg-[#041410] p-5 shadow-panel">
      <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr] lg:items-center">
        <VisualTile kind={kind} title={title} className="min-h-72" />
        <div className="grid gap-3">
          <Badge>Interactive Preview</Badge>
          <h2 className="text-2xl font-black text-white sm:text-3xl">{title}</h2>
          <p className="max-w-2xl text-sm leading-6 text-zinc-300">{subtitle}</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {["Mock/live data", "AI score", "Best deal"].map((item) => (
              <div key={item} className="rounded-md border border-white/10 bg-white/[0.045] p-4">
                <Star className="mb-3 h-4 w-4 text-emerald-300" />
                <p className="text-sm font-bold text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
