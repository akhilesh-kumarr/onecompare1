import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-md bg-white/7", className)}>
      <div className="absolute inset-y-0 -left-full w-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

export function ResultsSkeleton() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="rounded-lg border border-white/10 bg-white/[0.045] p-5">
          <Skeleton className="mb-5 h-10 w-10" />
          <Skeleton className="mb-3 h-5 w-2/3" />
          <Skeleton className="mb-6 h-4 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      ))}
    </div>
  );
}
