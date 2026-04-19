export const AuthorBio = ({ name, avatarUrl }: { name: string; avatarUrl?: string | null }) => (
  <div className="flex items-start gap-4 p-6 bg-muted/40 border border-border">
    <img
      src={avatarUrl || "/favicon.svg"}
      alt={name}
      className="h-14 w-14 rounded-full object-cover bg-card border border-border"
      loading="lazy"
    />
    <div>
      <p className="font-display text-base uppercase tracking-tight">{name}</p>
      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
        The team at Veridia Press writes about commercial print, packaging, and design — drawn from work on press in Phoenix and Scottsdale.
      </p>
    </div>
  </div>
);
