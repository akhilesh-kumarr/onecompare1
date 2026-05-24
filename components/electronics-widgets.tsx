import type { ElementType } from "react";
import { SlidersHorizontal, Star, Truck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export type ProductCardItem = {
  id: string;
  name: string;
  category: string;
  price: string;
  imageLabel: string;
  platform: string;
  rating: string;
  delivery: string;
  offer: string;
  icon: ElementType;
};

export function ProductCard({
  product,
  selected,
  onSelect
}: {
  product: ProductCardItem;
  selected: boolean;
  onSelect: () => void;
}) {
  const Icon = product.icon;

  return (
    <button
      onClick={onSelect}
      suppressHydrationWarning
      className={cn(
        "rounded-lg border p-4 text-left transition hover:-translate-y-1",
        selected
          ? "border-emerald-400/45 bg-emerald-400/[0.07]"
          : "border-white/10 bg-white/[0.04] hover:border-emerald-400/30"
      )}
    >
      <div className="mb-4 flex h-32 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-gradient-to-br from-emerald-400/15 via-white/[0.04] to-cyan-400/10">
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-emerald-300/25 bg-[#071914] shadow-glow">
          <div className="absolute inset-0 rounded-2xl bg-emerald-400/10" />
          <Icon className="relative h-10 w-10 text-emerald-200" />
        </div>
      </div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <Badge variant="muted">{product.platform}</Badge>
        <span className="flex items-center gap-1 text-xs font-semibold text-amber-200">
          <Star className="h-3.5 w-3.5 fill-amber-300 text-amber-300" />
          {product.rating}
        </span>
      </div>
      <h3 className="text-base font-black text-white">{product.name}</h3>
      <p className="mt-1 text-sm text-zinc-400">{product.imageLabel}</p>
      <div className="mt-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-lg font-black text-emerald-300">{product.price}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
            <Truck className="h-3.5 w-3.5" />
            {product.delivery}
          </p>
        </div>
        <Badge>{product.offer}</Badge>
      </div>
    </button>
  );
}

const filters = [
  { label: "Budget", value: "Rs. 25k - 80k" },
  { label: "RAM", value: "8GB+" },
  { label: "Storage", value: "128GB+" },
  { label: "Battery", value: "All-day" },
  { label: "Brand", value: "Apple, Sony" },
  { label: "Processor", value: "M-series / A-series" }
];

export function FilterSidebar() {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-black text-white">Smart filters</h3>
          <SlidersHorizontal className="h-4 w-4 text-emerald-300" />
        </div>
        <div className="grid gap-3">
          {filters.map((filter) => (
            <div key={filter.label} className="rounded-md border border-white/10 bg-white/[0.04] p-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">{filter.label}</p>
              <p className="mt-1 text-sm font-semibold text-zinc-200">{filter.value}</p>
            </div>
          ))}
        </div>
        <Button variant="secondary" className="mt-5 w-full">
          Apply filters
        </Button>
      </CardContent>
    </Card>
  );
}

export function SpecificationTable({
  specs
}: {
  specs: Array<{ name: string; value: string; score: string }>;
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
      <div className="grid grid-cols-[1fr_1.1fr_.65fr] gap-3 border-b border-white/10 bg-white/[0.045] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
        <span>Spec</span>
        <span>Value</span>
        <span>Score</span>
      </div>
      {specs.map((spec) => (
        <div key={spec.name} className="grid grid-cols-[1fr_1.1fr_.65fr] gap-3 border-b border-white/10 px-4 py-4 last:border-b-0">
          <span className="text-sm font-semibold text-white">{spec.name}</span>
          <span className="text-sm text-zinc-400">{spec.value}</span>
          <span className="text-sm font-black text-emerald-300">{spec.score}</span>
        </div>
      ))}
    </div>
  );
}
