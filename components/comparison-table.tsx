import { ExternalLink, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type StoreOffer = {
  store: string;
  price: string;
  delivery: string;
  rating: string;
  warranty: string;
  deal?: string;
  best?: boolean;
};

export function ComparisonTable({ offers }: { offers: StoreOffer[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
      <div className="hidden grid-cols-[1.1fr_.9fr_.9fr_.75fr_.9fr_.7fr] gap-4 border-b border-white/10 bg-white/[0.045] px-5 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500 lg:grid">
        <span>Store</span>
        <span>Price</span>
        <span>Delivery</span>
        <span>Rating</span>
        <span>Warranty</span>
        <span>Action</span>
      </div>

      <div className="divide-y divide-white/10">
        {offers.map((offer) => (
          <div
            key={offer.store}
            className={cn(
              "grid gap-4 px-5 py-5 lg:grid-cols-[1.1fr_.9fr_.9fr_.75fr_.9fr_.7fr] lg:items-center",
              offer.best && "bg-emerald-400/[0.055]"
            )}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-base font-bold text-white">{offer.store}</div>
                {offer.deal && <p className="mt-1 text-xs text-zinc-400">{offer.deal}</p>}
              </div>
              {offer.best && <Badge>Best Deal</Badge>}
            </div>
            <div>
              <span className="text-xs text-zinc-500 lg:hidden">Price</span>
              <p className="text-xl font-bold text-emerald-300">{offer.price}</p>
            </div>
            <div>
              <span className="text-xs text-zinc-500 lg:hidden">Delivery</span>
              <p className="text-sm text-zinc-300">{offer.delivery}</p>
            </div>
            <div>
              <span className="text-xs text-zinc-500 lg:hidden">Rating</span>
              <p className="flex items-center gap-1 text-sm text-zinc-300">
                <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
                {offer.rating}
              </p>
            </div>
            <div>
              <span className="text-xs text-zinc-500 lg:hidden">Warranty</span>
              <p className="text-sm text-zinc-300">{offer.warranty}</p>
            </div>
            <Button variant={offer.best ? "default" : "secondary"} size="sm">
              Visit
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
