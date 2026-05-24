import { Brain, CheckCircle2, Gauge, Sparkles, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export type AIInsight = {
  title: string;
  score: number;
  summary: string;
  points: string[];
  badge: string;
};

export function BestValueBadge({ label = "Best Value" }: { label?: string }) {
  return (
    <Badge>
      <Trophy className="mr-1 h-3.5 w-3.5" />
      {label}
    </Badge>
  );
}

export function AIRecommendationCard({ insight }: { insight: AIInsight }) {
  return (
    <Card className="border-emerald-400/25 bg-emerald-400/[0.055]">
      <CardContent className="pt-5">
        <div className="mb-5 flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-md bg-emerald-400/14 text-emerald-200">
            <Brain className="h-6 w-6" />
          </span>
          <BestValueBadge label={insight.badge} />
        </div>
        <h3 className="text-xl font-black text-white">{insight.title}</h3>
        <p className="mt-2 text-sm leading-6 text-zinc-300">{insight.summary}</p>
        <div className="mt-5 rounded-md border border-white/10 bg-white/[0.045] p-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-zinc-300">AI score</span>
            <span className="font-black text-emerald-300">{insight.score}/100</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-emerald-400" style={{ width: `${insight.score}%` }} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function SmartInsights({ points }: { points: string[] }) {
  return (
    <Card>
      <CardContent className="pt-5">
        <div className="mb-5 flex items-center gap-3">
          <Gauge className="h-5 w-5 text-emerald-300" />
          <h3 className="font-black text-white">Smart insights</h3>
        </div>
        <div className="grid gap-3">
          {points.map((point) => (
            <div key={point} className="flex gap-3 rounded-md border border-white/10 bg-white/[0.035] p-3 text-sm text-zinc-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function RecommendationPanel({ insights }: { insights: AIInsight[] }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
      <AIRecommendationCard insight={insights[0]} />
      <Card>
        <CardContent className="pt-5">
          <div className="mb-5 flex items-center justify-between">
            <h3 className="font-black text-white">Personalized suggestions</h3>
            <Badge variant="muted">
              <Sparkles className="mr-1 h-3.5 w-3.5" />
              Learning
            </Badge>
          </div>
          <div className="grid gap-3">
            {insights.slice(1).map((insight) => (
              <div key={insight.title} className="rounded-md border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-white">{insight.title}</p>
                  <span className="text-sm font-black text-emerald-300">{insight.score}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-400">{insight.summary}</p>
              </div>
            ))}
          </div>
          <Button className="mt-5 w-full">Generate New Recommendation</Button>
        </CardContent>
      </Card>
    </div>
  );
}
