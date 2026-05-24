import { Bell, Bookmark, Heart, Percent, TrendingUp } from "lucide-react";
import { VisualTile } from "@/components/mockup-visuals";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type DealItem = {
  name: string;
  platform: string;
  price: string;
  drop: string;
  kind: "electronics" | "gadgets" | "food" | "grocery";
};

const defaultDeals: DealItem[] = [
  { name: "iPhone 15", platform: "Amazon", price: "Rs. 64,999", drop: "12% drop", kind: "electronics" },
  { name: "Sony XM5", platform: "Flipkart", price: "Rs. 26,990", drop: "Flash deal", kind: "gadgets" },
  { name: "Chicken Biryani", platform: "Magicpin", price: "Rs. 179", drop: "Coupon live", kind: "food" },
  { name: "Milk 1L", platform: "Blinkit", price: "Rs. 63", drop: "Fastest", kind: "grocery" }
];

export function TrendingDeals({ deals = defaultDeals }: { deals?: DealItem[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {deals.map((deal) => (
        <Card key={deal.name}>
          <CardContent className="pt-5">
            <VisualTile kind={deal.kind} title={deal.name} className="mb-5 min-h-32" />
            <div className="mb-5 flex items-center justify-between">
              <Percent className="h-10 w-10 rounded-md bg-emerald-400/12 p-2 text-emerald-300" />
              <Badge>{deal.drop}</Badge>
            </div>
            <h3 className="font-black text-white">{deal.name}</h3>
            <p className="mt-1 text-sm text-zinc-400">{deal.platform}</p>
            <p className="mt-5 text-2xl font-black text-emerald-300">{deal.price}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export function Wishlist() {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="mb-5 flex items-center gap-3">
          <Heart className="h-5 w-5 text-emerald-300" />
          <h3 className="font-black text-white">Wishlist</h3>
        </div>
        {["MacBook Air M3", "iPad Air 11 inch", "Airport weekday cab"].map((item) => (
          <div key={item} className="mb-3 flex items-center justify-between rounded-md border border-white/10 bg-white/[0.035] p-3 last:mb-0">
            <span className="text-sm font-semibold text-zinc-200">{item}</span>
            <Badge variant="muted">Saved</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function SavedComparisons() {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="mb-5 flex items-center gap-3">
          <Bookmark className="h-5 w-5 text-emerald-300" />
          <h3 className="font-black text-white">Saved comparisons</h3>
        </div>
        {["Phone upgrade shortlist", "Weekend grocery basket", "Food delivery dinner"].map((item) => (
          <div key={item} className="mb-3 rounded-md border border-white/10 bg-white/[0.035] p-3 last:mb-0">
            <p className="text-sm font-semibold text-white">{item}</p>
            <p className="mt-1 text-xs text-zinc-500">Updated today</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export function PriceAlerts() {
  return (
    <Card className="border-emerald-400/25 bg-emerald-400/[0.055]">
      <CardContent className="pt-5">
        <div className="mb-5 flex items-center justify-between">
          <Bell className="h-10 w-10 rounded-md bg-emerald-400/14 p-2 text-emerald-200" />
          <Badge>3 active</Badge>
        </div>
        <h3 className="text-xl font-black text-white">Price drop alerts</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-300">
          Get notified when selected items hit your target price or when a route becomes unusually cheap.
        </p>
        <div className="mt-5 grid gap-3">
          {["iPhone 15 below Rs. 62,000", "Cab to Airport below Rs. 650", "Milk basket below Rs. 500"].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/[0.04] p-3 text-sm font-semibold text-white">
              <TrendingUp className="h-4 w-4 text-emerald-300" />
              {item}
            </div>
          ))}
        </div>
        <Button className="mt-5 w-full">Create Alert</Button>
      </CardContent>
    </Card>
  );
}
