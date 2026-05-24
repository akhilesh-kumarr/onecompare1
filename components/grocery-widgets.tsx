import { Clock3, PackageCheck, ShoppingCart, Sparkles, Truck } from "lucide-react";
import { VisualTile } from "@/components/mockup-visuals";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type GroceryItem = {
  platform: string;
  product: string;
  quantity: string;
  price: string;
  delivery: string;
  tag: string;
  best?: boolean;
};

export function DeliveryBadge({ delivery }: { delivery: string }) {
  return (
    <Badge variant="muted">
      <Clock3 className="mr-1 h-3.5 w-3.5" />
      {delivery}
    </Badge>
  );
}

export function GroceryCard({ item }: { item: GroceryItem }) {
  return (
    <Card className={item.best ? "border-emerald-400/35 bg-emerald-400/[0.06]" : ""}>
      <CardContent className="pt-5">
        <VisualTile kind="grocery" title={item.product} className="mb-5 min-h-32" />
        <div className="mb-5 flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white/8 text-emerald-300">
            <PackageCheck className="h-6 w-6" />
          </span>
          <Badge variant={item.best ? "default" : "muted"}>{item.tag}</Badge>
        </div>
        <p className="text-sm font-semibold text-emerald-200">{item.platform}</p>
        <h3 className="mt-2 text-xl font-black text-white">{item.product}</h3>
        <p className="mt-1 text-sm text-zinc-400">{item.quantity}</p>
        <p className="mt-5 text-3xl font-black text-emerald-300">{item.price}</p>
        <div className="mt-5">
          <DeliveryBadge delivery={item.delivery} />
        </div>
        <Button className="mt-5 w-full" variant={item.best ? "default" : "secondary"}>
          Add Platform Basket
        </Button>
      </CardContent>
    </Card>
  );
}

export function PriceMatrix({ items }: { items: GroceryItem[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
      <div className="grid grid-cols-[1fr_.8fr_.8fr_.8fr] gap-3 border-b border-white/10 bg-white/[0.045] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
        <span>Platform</span>
        <span>Qty</span>
        <span>Price</span>
        <span>Delivery</span>
      </div>
      {items.map((item) => (
        <div key={item.platform} className="grid grid-cols-[1fr_.8fr_.8fr_.8fr] gap-3 border-b border-white/10 px-4 py-4 last:border-b-0">
          <span className="text-sm font-semibold text-white">{item.platform}</span>
          <span className="text-sm text-zinc-400">{item.quantity}</span>
          <span className="text-sm font-black text-emerald-300">{item.price}</span>
          <span className="text-sm text-zinc-400">{item.delivery}</span>
        </div>
      ))}
    </div>
  );
}

export function CartOptimizer() {
  return (
    <Card className="border-emerald-400/25 bg-emerald-400/[0.055]">
      <CardContent className="pt-5">
        <div className="mb-5 flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-emerald-400/14 text-emerald-200">
            <ShoppingCart className="h-6 w-6" />
          </span>
          <Badge>
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            Basket AI
          </Badge>
        </div>
        <h3 className="text-xl font-black text-white">Optimized basket split</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-300">
          Buy milk and bread from Blinkit for fastest delivery, but move detergent to BigBasket to save Rs. 42 on the full cart.
        </p>
        <div className="mt-5 grid gap-3">
          {["Estimated savings Rs. 67", "Fastest item arrives in 8 min", "Cheapest full basket Rs. 486"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] p-3 text-sm font-semibold text-white">
              <Truck className="h-4 w-4 text-emerald-300" />
              {item}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
