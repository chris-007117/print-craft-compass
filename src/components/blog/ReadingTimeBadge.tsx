import { Clock } from "lucide-react";

export const ReadingTimeBadge = ({ minutes }: { minutes: number }) => (
  <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
    <Clock className="h-3.5 w-3.5" />
    {minutes} min read
  </span>
);
