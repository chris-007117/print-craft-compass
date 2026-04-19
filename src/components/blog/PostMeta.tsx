import { format } from "date-fns";
import { ReadingTimeBadge } from "./ReadingTimeBadge";

export const PostMeta = ({
  authorName,
  authorAvatarUrl,
  publishedAt,
  readingTimeMinutes,
  showAvatar = false,
}: {
  authorName: string;
  authorAvatarUrl?: string | null;
  publishedAt: string;
  readingTimeMinutes: number;
  showAvatar?: boolean;
}) => (
  <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
    {showAvatar && (
      <img
        src={authorAvatarUrl || "/favicon.svg"}
        alt={authorName}
        className="h-8 w-8 rounded-full object-cover bg-muted"
        loading="lazy"
      />
    )}
    <span className="font-medium text-foreground">{authorName}</span>
    <span className="text-muted-foreground/50">·</span>
    <time dateTime={publishedAt}>{format(new Date(publishedAt), "MMM d, yyyy")}</time>
    <span className="text-muted-foreground/50">·</span>
    <ReadingTimeBadge minutes={readingTimeMinutes} />
  </div>
);
