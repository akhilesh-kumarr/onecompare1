import { Badge } from "@/components/ui/badge";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  action
}: SectionHeadingProps) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        {eyebrow && <Badge>{eyebrow}</Badge>}
        <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}
