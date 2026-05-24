"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type CategoryCardProps = {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  stats: string;
};

export function CategoryCard({
  href,
  title,
  description,
  icon: Icon,
  stats
}: CategoryCardProps) {
  return (
    <motion.div whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}>
      <Link
        href={href}
        className="group flex min-h-[230px] flex-col justify-between rounded-lg border border-white/10 bg-white/[0.045] p-6 shadow-panel transition hover:border-emerald-400/40 hover:bg-emerald-400/[0.055]"
      >
        <div>
          <div className="mb-5 flex items-center justify-between">
            <span className="flex h-12 w-12 items-center justify-center rounded-md bg-emerald-400/12 text-emerald-300">
              <Icon className="h-6 w-6" />
            </span>
            <Badge variant="muted">{stats}</Badge>
          </div>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-400">{description}</p>
        </div>
        <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-emerald-300">
          Compare now
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.div>
  );
}
