import type { ElementType } from "react";
import { Clock3, IndianRupee, MapPin, Navigation, ShieldCheck, Star, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export type CabRide = {
  app: string;
  type: string;
  price: string;
  eta: string;
  rating: string;
  tag: string;
  surge: string;
  icon: ElementType;
  best?: boolean;
};

export function LocationInput({
  label,
  value,
  onChange,
  type
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: "pickup" | "drop";
}) {
  const Icon = type === "pickup" ? MapPin : Navigation;
  return (
    <label className="grid gap-2 text-sm font-semibold text-zinc-300">
      {label}
      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-emerald-300" />
        <Input value={value} onChange={(event) => onChange(event.target.value)} className="pl-12" />
      </div>
    </label>
  );
}

export function ETAIndicator({ eta, surge }: { eta: string; surge: string }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-md border border-white/10 bg-white/[0.045] p-3">
        <Clock3 className="mb-2 h-4 w-4 text-zinc-500" />
        <p className="text-sm font-semibold text-white">{eta}</p>
        <p className="text-xs text-zinc-500">ETA</p>
      </div>
      <div className="rounded-md border border-white/10 bg-white/[0.045] p-3">
        <Zap className="mb-2 h-4 w-4 text-emerald-300" />
        <p className="text-sm font-semibold text-white">{surge}</p>
        <p className="text-xs text-zinc-500">Surge</p>
      </div>
    </div>
  );
}

export function CabFareCard({ ride, index }: { ride: CabRide; index: number }) {
  const Icon = ride.icon;

  return (
    <Card className={ride.best ? "border-emerald-400/35 bg-emerald-400/[0.06]" : ""}>
      <CardContent className="pt-5">
        <div className="mb-6 flex items-center justify-between gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-white/8 text-emerald-300">
            <Icon className="h-6 w-6" />
          </span>
          <Badge variant={ride.best ? "default" : "muted"}>{ride.tag}</Badge>
        </div>
        <h2 className="text-xl font-black text-white">{ride.app}</h2>
        <p className="mt-1 text-sm text-zinc-400">{ride.type}</p>
        <div className="mt-6 flex items-end justify-between">
          <div className="text-3xl font-black text-emerald-300">{ride.price}</div>
          <p className="flex items-center gap-1 text-sm text-zinc-300">
            <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
            {ride.rating}
          </p>
        </div>
        <div className="mt-6">
          <ETAIndicator eta={ride.eta} surge={ride.surge} />
        </div>
        <Button className="mt-5 w-full" variant={ride.best || index === 1 ? "default" : "secondary"}>
          Select Ride
        </Button>
      </CardContent>
    </Card>
  );
}

export function FareComparison({ rides }: { rides: CabRide[] }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-black text-white">Fare intelligence</h3>
        <Badge>
          <ShieldCheck className="mr-1 h-3.5 w-3.5" />
          Live estimate
        </Badge>
      </div>
      <div className="grid gap-3">
        {rides.map((ride) => (
          <div key={ride.app} className="grid grid-cols-[1fr_auto] items-center gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3">
            <div>
              <p className="font-semibold text-white">{ride.app}</p>
              <p className="text-xs text-zinc-500">{ride.type} . {ride.eta} pickup</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-black text-emerald-300">
              <IndianRupee className="h-4 w-4" />
              {ride.price.replace("Rs. ", "")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
