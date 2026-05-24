"use client";

import { motion } from "framer-motion";
import { Activity, BarChart3, Bot, Sparkles, TrendingUp } from "lucide-react";
import { CategoryGrid, QuickActions } from "@/components/category-grid";
import { AppShowcase, DashboardPreview } from "@/components/mockup-visuals";
import { PageShell } from "@/components/page-shell";
import { SectionHeading } from "@/components/section-heading";
import { SearchBar, TrendingSearches } from "@/components/smart-search";
import { AIRecommendationCard, SmartInsights } from "@/components/ai-widgets";
import { TrendingDeals } from "@/components/deals-widgets";
import { Badge } from "@/components/ui/badge";

const platformStats = [
  { label: "Comparison modules", value: "8", icon: BarChart3 },
  { label: "Demo platforms", value: "23+", icon: Activity },
  { label: "AI decisions", value: "Live", icon: Bot }
];

const homeInsight = {
  title: "Best value laptop under Rs. 60,000",
  score: 91,
  summary:
    "oneCompare balances price, reviews, specs, delivery speed, and warranty confidence before recommending the best option.",
  points: [
    "Prioritizes verified ratings and delivery reliability.",
    "Finds effective price after coupons and bank offers.",
    "Explains why the winner is better than the cheapest option."
  ],
  badge: "AI Pick"
};

export default function HomePage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/8 px-4 py-2 text-sm font-medium text-emerald-200"
          >
            <Sparkles className="h-4 w-4" />
            Startup-style comparison platform
          </motion.div>
          <h1 className="text-balance text-4xl font-black tracking-normal text-white sm:text-5xl lg:text-7xl">
            Compare mock/live demo data. All Comparisons. One Place.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
            Search electronics, cabs, food, groceries, gadgets, appliances, deals, and AI recommendations from one premium dashboard.
          </p>
          <SearchBar />
        </div>

        <div className="mx-auto mt-10 max-w-5xl">
          <AppShowcase />
        </div>

        <div className="mt-5">
          <DashboardPreview />
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {platformStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
                <Icon className="mb-4 h-6 w-6 text-emerald-300" />
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
              </div>
            );
          })}
        </div>

        <section className="mt-16">
          <SectionHeading
            eyebrow="Module 2"
            title="Categories Dashboard"
            description="A scalable navigation hub for every comparison vertical oneCompare can grow into."
            action={<Badge variant="muted">Glassmorphism cards</Badge>}
          />
          <CategoryGrid />
        </section>

        <section className="mt-16">
          <SectionHeading
            eyebrow="Quick actions"
            title="Jump into the premium workflows"
            description="AI decisions, saved comparisons, price drops, and high-confidence shortcuts for demo users."
          />
          <QuickActions />
        </section>

        <section className="mt-16 grid gap-5 lg:grid-cols-[1fr_.85fr]">
          <div>
            <SectionHeading
              eyebrow="Module 1"
              title="Smart Search & Discovery"
              description="Universal search, AI suggestions, voice shortcut, categories, recent searches, and trending examples."
            />
            <TrendingSearches />
          </div>
          <div>
            <SectionHeading eyebrow="Module 7" title="AI Recommendation Engine" />
            <div className="grid gap-5">
              <AIRecommendationCard insight={homeInsight} />
            </div>
          </div>
        </section>

        <section className="mt-16">
          <SectionHeading
            eyebrow="Module 8"
            title="Deals, Trends & Personalization"
            description="Flash deals, wishlists, price alerts, and saved comparisons keep users coming back."
            action={
              <Badge variant="muted">
                <TrendingUp className="mr-1 h-3.5 w-3.5" />
                Updated live
              </Badge>
            }
          />
          <TrendingDeals />
        </section>

        <section className="mt-16">
          <SmartInsights points={homeInsight.points} />
        </section>
      </section>

      <footer className="mx-auto mt-16 max-w-7xl border-t border-white/10 py-8 text-center text-sm text-zinc-500">
        oneCompare complete 8-module frontend: search, categories, electronics, cabs, food, grocery, AI, and personalization.
      </footer>
    </PageShell>
  );
}
