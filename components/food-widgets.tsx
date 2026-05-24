import { Clock3, Percent, Star, Ticket, Truck, Utensils } from "lucide-react";
import { VisualTile } from "@/components/mockup-visuals";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type FoodItem = {
  platform: string;
  restaurant: string;
  item: string;
  price: string;
  delivery: string;
  rating: string;
  coupon: string;
  fee: string;
  best?: boolean;
};

export function CouponBadge({ coupon }: { coupon: string }) {
  return (
    <Badge variant="gold">
      <Ticket className="mr-1 h-3.5 w-3.5" />
      {coupon}
    </Badge>
  );
}

export function DeliveryInfo({ delivery, fee }: { delivery: string; fee: string }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-md border border-white/10 bg-white/[0.045] p-3">
        <Clock3 className="mb-2 h-4 w-4 text-zinc-500" />
        <p className="text-sm font-semibold text-white">{delivery}</p>
        <p className="text-xs text-zinc-500">Delivery</p>
      </div>
      <div className="rounded-md border border-white/10 bg-white/[0.045] p-3">
        <Truck className="mb-2 h-4 w-4 text-emerald-300" />
        <p className="text-sm font-semibold text-white">{fee}</p>
        <p className="text-xs text-zinc-500">Fee</p>
      </div>
    </div>
  );
}

export function RestaurantCard({ item }: { item: FoodItem }) {
  return (
    <Card className={item.best ? "border-emerald-400/35 bg-emerald-400/[0.06]" : ""}>
      <CardContent className="pt-5">
        <VisualTile kind="food" title={item.item} className="mb-5 min-h-32" />
        <div className="mb-5 flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white/8 text-emerald-300">
            <Utensils className="h-6 w-6" />
          </span>
          {item.best ? <Badge>Best Meal Deal</Badge> : <CouponBadge coupon={item.coupon} />}
        </div>
        <p className="text-sm font-semibold text-emerald-200">{item.platform}</p>
        <h3 className="mt-2 text-xl font-black text-white">{item.restaurant}</h3>
        <p className="mt-1 text-sm text-zinc-400">{item.item}</p>
        <div className="mt-5 flex items-end justify-between">
          <p className="text-3xl font-black text-emerald-300">{item.price}</p>
          <p className="flex items-center gap-1 text-sm text-zinc-300">
            <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
            {item.rating}
          </p>
        </div>
        <div className="mt-5">
          <DeliveryInfo delivery={item.delivery} fee={item.fee} />
        </div>
        <Button className="mt-5 w-full" variant={item.best ? "default" : "secondary"}>
          View Offer
        </Button>
      </CardContent>
    </Card>
  );
}

export function FoodComparisonCard({ items }: { items: FoodItem[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
      <div className="grid grid-cols-[1fr_.8fr_.8fr_.8fr] gap-3 border-b border-white/10 bg-white/[0.045] px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
        <span>Platform</span>
        <span>Price</span>
        <span>Coupon</span>
        <span>Time</span>
      </div>
      {items.map((item) => (
        <div key={item.platform} className="grid grid-cols-[1fr_.8fr_.8fr_.8fr] gap-3 border-b border-white/10 px-4 py-4 last:border-b-0">
          <span className="text-sm font-semibold text-white">{item.platform}</span>
          <span className="text-sm font-black text-emerald-300">{item.price}</span>
          <span className="flex items-center gap-1 text-sm text-zinc-300">
            <Percent className="h-3.5 w-3.5 text-amber-300" />
            {item.coupon}
          </span>
          <span className="text-sm text-zinc-400">{item.delivery}</span>
        </div>
      ))}
    </div>
  );
}
