"use client";

import { Heart, MessageCircle, Share2, Eye, Camera, ThumbsUp, Music } from "lucide-react";
import { cn, formatCompact } from "@/lib/utils";

type TopPost = {
  id: string;
  title: string;
  platform: "instagram" | "facebook" | "tiktok";
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  gradient: string;
};

const POSTS: TopPost[] = [
  {
    id: "p1",
    title: "Tour 360° casa modular Pilar",
    platform: "instagram",
    likes: 4820,
    comments: 312,
    shares: 542,
    reach: 38400,
    gradient: "from-magenta/30 via-cyan/15 to-amber/15",
  },
  {
    id: "p2",
    title: "Antes y después · Belgrano",
    platform: "instagram",
    likes: 3140,
    comments: 198,
    shares: 287,
    reach: 24600,
    gradient: "from-cyan/25 via-magenta/15 to-info/15",
  },
  {
    id: "p3",
    title: "Time-lapse construcción 6 meses",
    platform: "tiktok",
    likes: 8200,
    comments: 410,
    shares: 1240,
    reach: 67000,
    gradient: "from-amber/30 via-magenta/15 to-cyan/15",
  },
  {
    id: "p4",
    title: "Testimonio Familia Aguilar",
    platform: "facebook",
    likes: 1280,
    comments: 96,
    shares: 134,
    reach: 12400,
    gradient: "from-info/25 via-success/15 to-cyan/15",
  },
];

const PLATFORM_INFO: Record<
  TopPost["platform"],
  { icon: React.ComponentType<{ className?: string }>; color: string; ring: string }
> = {
  instagram: { icon: Camera, color: "text-magenta", ring: "border-magenta/30" },
  facebook: { icon: ThumbsUp, color: "text-info", ring: "border-info/30" },
  tiktok: { icon: Music, color: "text-amber", ring: "border-amber/30" },
};

export function TopPosts() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Highlights
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Posts con mejor performance
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          Últimos 30 días
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 xl:grid-cols-4">
        {POSTS.map((post, i) => {
          const platform = PLATFORM_INFO[post.platform];
          const Icon = platform.icon;
          return (
            <article
              key={post.id}
              className={cn(
                "group cursor-pointer overflow-hidden rounded-lg border bg-surface-2 transition-all hover:shadow-glow-cyan",
                platform.ring,
                "hover:border-cyan/40"
              )}
            >
              <div
                className={cn(
                  "relative aspect-square w-full bg-gradient-to-br overflow-hidden",
                  post.gradient
                )}
              >
                <div className="absolute inset-0 grid-bg opacity-30" />
                <div className="absolute top-2 left-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/20 bg-black/40 backdrop-blur">
                    <Icon className={cn("h-3.5 w-3.5", platform.color)} />
                  </span>
                </div>
                <div className="absolute top-2 right-2">
                  <span className="rounded-full border border-white/20 bg-black/40 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-foreground/90 backdrop-blur">
                    #{i + 1}
                  </span>
                </div>
              </div>

              <div className="p-3">
                <p className="text-xs font-medium text-foreground line-clamp-2 group-hover:text-cyan transition-colors min-h-[2rem]">
                  {post.title}
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/5 pt-2">
                  <div className="flex items-center gap-1">
                    <Eye className="h-2.5 w-2.5 text-cyan" />
                    <span className="font-mono text-[10px] text-foreground tabular-nums">
                      {formatCompact(post.reach)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-2.5 w-2.5 text-magenta" />
                    <span className="font-mono text-[10px] text-foreground tabular-nums">
                      {formatCompact(post.likes)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-2.5 w-2.5 text-amber" />
                    <span className="font-mono text-[10px] text-foreground tabular-nums">
                      {post.comments}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share2 className="h-2.5 w-2.5 text-success" />
                    <span className="font-mono text-[10px] text-foreground tabular-nums">
                      {post.shares}
                    </span>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
