"use client";

import { motion } from "framer-motion";
import { Eye, Users, Heart, TrendingUp, type LucideIcon } from "lucide-react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

type Accent = "cyan" | "magenta" | "amber" | "success";

const ACCENT_HEX: Record<Accent, string> = {
  cyan: "#00f0ff",
  magenta: "#ff00e5",
  amber: "#ffb800",
  success: "#00ff88",
};

function makeSeries(seed: number, points = 14): { v: number }[] {
  const out: { v: number }[] = [];
  let v = 50 + (seed % 30);
  for (let i = 0; i < points; i++) {
    v += (Math.sin(i * 0.6 + seed) + Math.cos(i * 0.4 + seed) + 0.4) * 6;
    out.push({ v: Math.max(10, Math.round(v)) });
  }
  return out;
}

function Sparkline({ accent, data }: { accent: Accent; data: { v: number }[] }) {
  const color = ACCENT_HEX[accent];
  const id = `spark-${accent}`;

  return (
    <ResponsiveContainer width="100%" height={48}>
      <AreaChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.45} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#${id})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

const CARDS: Array<{
  label: string;
  value: string;
  delta: string;
  icon: LucideIcon;
  accent: Accent;
}> = [
  {
    label: "Impresiones",
    value: "248.3k",
    delta: "+12.4%",
    icon: Eye,
    accent: "cyan",
  },
  {
    label: "Alcance",
    value: "94.6k",
    delta: "+8.2%",
    icon: Users,
    accent: "magenta",
  },
  {
    label: "Engagement",
    value: "6.4%",
    delta: "+0.9 pp",
    icon: Heart,
    accent: "amber",
  },
  {
    label: "Crecimiento seguidores",
    value: "+340",
    delta: "+18% vs sem.",
    icon: TrendingUp,
    accent: "success",
  },
];

export function OverviewCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {CARDS.map((c, i) => {
        const Icon = c.icon;
        const series = makeSeries(i + 7);
        return (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl p-5 hover:border-white/10 transition-all"
            style={{
              boxShadow: `inset 0 0 0 1px transparent`,
            }}
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                {c.label}
              </span>
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md border",
                  c.accent === "cyan" && "border-cyan/30 bg-cyan/10",
                  c.accent === "magenta" && "border-magenta/30 bg-magenta/10",
                  c.accent === "amber" && "border-amber/30 bg-amber/10",
                  c.accent === "success" && "border-success/30 bg-success/10"
                )}
              >
                <Icon
                  className={cn(
                    "h-3.5 w-3.5",
                    c.accent === "cyan" && "text-cyan",
                    c.accent === "magenta" && "text-magenta",
                    c.accent === "amber" && "text-amber",
                    c.accent === "success" && "text-success"
                  )}
                />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="font-mono text-2xl font-semibold tracking-tight text-foreground tabular-nums">
                {c.value}
              </span>
              <span
                className={cn(
                  "font-mono text-xs",
                  c.delta.startsWith("+") ? "text-success" : "text-magenta"
                )}
              >
                {c.delta}
              </span>
            </div>
            <div className="mt-3 -mx-1">
              <Sparkline accent={c.accent} data={series} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
