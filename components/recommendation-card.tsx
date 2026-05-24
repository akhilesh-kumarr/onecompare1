import { Brain, CheckCircle2, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RecommendationCardProps = {
  title: string;
  summary: string;
  points: string[];
};

export function RecommendationCard({ title, summary, points }: RecommendationCardProps) {
  return (
    <Card className="border-emerald-400/25 bg-emerald-400/[0.055]">
      <CardHeader>
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-emerald-400/14 text-emerald-200">
            <Brain className="h-5 w-5" />
          </span>
          <Badge>
            <Sparkles className="mr-1 h-3.5 w-3.5" />
            AI Pick
          </Badge>
        </div>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-zinc-300">{summary}</p>
        <div className="mt-5 grid gap-3">
          {points.map((point) => (
            <div key={point} className="flex gap-3 text-sm text-zinc-300">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-300" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
