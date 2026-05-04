"use client";

import { motion } from "framer-motion";
import {
  Camera,
  ThumbsUp,
  Briefcase,
  Calendar,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ScheduledPost = {
  id: string;
  title: string;
  platform: "instagram" | "facebook" | "linkedin";
  date: string;
  time: string;
  type: "Reel" | "Post" | "Carrusel" | "Story";
};

const PLATFORM: Record<
  ScheduledPost["platform"],
  { icon: LucideIcon; color: string; name: string }
> = {
  instagram: { icon: Camera, color: "magenta", name: "Instagram" },
  facebook: { icon: ThumbsUp, color: "blue", name: "Facebook" },
  linkedin: { icon: Briefcase, color: "cyan", name: "LinkedIn" },
};

const POSTS: ScheduledPost[] = [
  {
    id: "1",
    title: "Antes y después: remodelación en Vicente López",
    platform: "instagram",
    date: "Hoy",
    time: "18:30",
    type: "Carrusel",
  },
  {
    id: "2",
    title: "Tour por casa modular Pilar — vista 360°",
    platform: "instagram",
    date: "Mañana",
    time: "12:00",
    type: "Reel",
  },
  {
    id: "3",
    title: "Tendencias de diseño sustentable 2026",
    platform: "linkedin",
    date: "Vie 8/5",
    time: "09:00",
    type: "Post",
  },
  {
    id: "4",
    title: "Testimonio cliente — Familia Aguilar",
    platform: "facebook",
    date: "Sáb 9/5",
    time: "11:30",
    type: "Post",
  },
];

const PLATFORM_STYLES: Record<string, string> = {
  magenta: "bg-magenta/10 text-magenta border-magenta/30",
  blue: "bg-info/10 text-info border-info/30",
  cyan: "bg-cyan/10 text-cyan border-cyan/30",
};

export function ScheduledPosts() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-cyan" />
          <h3 className="text-sm font-semibold text-foreground">
            Próximos posts programados
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          {POSTS.length} programados
        </span>
      </div>

      <ul className="divide-y divide-white/5">
        {POSTS.map((post, i) => {
          const platform = PLATFORM[post.platform];
          const Icon = platform.icon;

          return (
            <motion.li
              key={post.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.05 }}
              className="group flex items-start gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors cursor-pointer"
            >
              <div
                className={cn(
                  "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                  PLATFORM_STYLES[platform.color]
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate group-hover:text-cyan transition-colors">
                  {post.title}
                </p>
                <div className="mt-1 flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                    {platform.name}
                  </span>
                  <span className="text-muted/40">·</span>
                  <span
                    className={cn(
                      "rounded-full border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider",
                      PLATFORM_STYLES[platform.color]
                    )}
                  >
                    {post.type}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0 gap-0.5">
                <span className="text-xs text-foreground font-medium">
                  {post.date}
                </span>
                <div className="flex items-center gap-1 font-mono text-[10px] text-muted">
                  <Clock className="h-2.5 w-2.5" />
                  {post.time}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
