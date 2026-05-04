"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Accent = "cyan" | "magenta" | "amber" | "success";

const ACCENT_STYLES: Record<
  Accent,
  { iconBg: string; icon: string; ring: string; text: string }
> = {
  cyan: {
    iconBg: "bg-cyan/10",
    icon: "text-cyan",
    ring: "hover:border-cyan/40 hover:shadow-glow-cyan",
    text: "text-cyan",
  },
  magenta: {
    iconBg: "bg-magenta/10",
    icon: "text-magenta",
    ring: "hover:border-magenta/40 hover:shadow-glow-magenta",
    text: "text-magenta",
  },
  amber: {
    iconBg: "bg-amber/10",
    icon: "text-amber",
    ring: "hover:border-amber/40 hover:shadow-glow-amber",
    text: "text-amber",
  },
  success: {
    iconBg: "bg-success/10",
    icon: "text-success",
    ring: "hover:border-success/40 hover:shadow-glow-success",
    text: "text-success",
  },
};

export function StatCard({
  label,
  value,
  delta,
  trend = "up",
  icon: Icon,
  accent = "cyan",
  index = 0,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down" | "neutral";
  icon: LucideIcon;
  accent?: Accent;
  index?: number;
}) {
  const styles = ACCENT_STYLES[accent];
  const TrendIcon = trend === "up" ? TrendingUp : TrendingDown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className={cn(
        "group relative overflow-hidden rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl p-5 transition-all",
        styles.ring
      )}
    >
      {/* Decorative corner accent */}
      <div
        className={cn(
          "absolute -right-10 -top-10 h-24 w-24 rounded-full opacity-30 blur-2xl transition-opacity group-hover:opacity-60",
          accent === "cyan" && "bg-cyan",
          accent === "magenta" && "bg-magenta",
          accent === "amber" && "bg-amber",
          accent === "success" && "bg-success"
        )}
      />

      <div className="relative flex items-start justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {label}
        </span>
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg border border-white/5",
            styles.iconBg
          )}
        >
          <Icon className={cn("h-4 w-4", styles.icon)} />
        </div>
      </div>

      <div className="relative mt-4 flex items-baseline gap-2">
        <span className="font-mono text-3xl font-semibold tracking-tight text-foreground">
          {value}
        </span>
      </div>

      {delta && (
        <div className="relative mt-2 flex items-center gap-1.5">
          <TrendIcon
            className={cn(
              "h-3 w-3",
              trend === "up" ? "text-success" : "text-magenta"
            )}
          />
          <span
            className={cn(
              "font-mono text-xs",
              trend === "up" ? "text-success" : "text-magenta"
            )}
          >
            {delta}
          </span>
        </div>
      )}
    </motion.div>
  );
}
