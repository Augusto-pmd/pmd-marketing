"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";

type ChartTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: Array<{
    value?: number;
    name?: string;
    dataKey?: string;
    color?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
  }>;
};

type Range = "7d" | "30d" | "90d";

function generateData(range: Range) {
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const data: Array<{ day: string; followers: number; engagement: number }> = [];
  let f = 12000;
  let e = 4.2;
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    f += Math.round(Math.sin(i * 0.5) * 18 + Math.cos(i * 0.3) * 12 + 14);
    e += (Math.sin(i * 0.4) + Math.cos(i * 0.7)) * 0.08;
    data.push({
      day: date.toLocaleDateString("es-AR", { day: "2-digit", month: "short" }),
      followers: f,
      engagement: Number(e.toFixed(2)),
    });
  }
  return data;
}

function CustomTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-[#0a0a10]/95 backdrop-blur-xl px-3 py-2 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
        {label}
      </p>
      {payload.map((p) => (
        <div key={p.dataKey ?? p.name} className="flex items-center gap-2 text-xs">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: p.color, boxShadow: `0 0 6px ${p.color}` }}
          />
          <span className="text-muted">{p.name}:</span>
          <span className="font-mono text-foreground tabular-nums">
            {Number(p.value).toLocaleString("es-AR", { maximumFractionDigits: 2 })}
          </span>
        </div>
      ))}
    </div>
  );
}

export function MainChart() {
  const [range, setRange] = useState<Range>("30d");
  const data = generateData(range);

  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Tendencias
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Seguidores y engagement
          </h3>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-white/5 bg-surface-2 p-0.5">
          {(["7d", "30d", "90d"] as Range[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={cn(
                "rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-all",
                range === r
                  ? "bg-cyan/15 text-cyan"
                  : "text-muted hover:text-foreground"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="px-2 pb-4 pt-5">
        <div className="px-3 pb-2 flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_8px_rgba(0,240,255,0.6)]" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Seguidores
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-magenta shadow-[0_0_8px_rgba(255,0,229,0.6)]" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Engagement %
            </span>
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 16, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="areaCyan" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#00f0ff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="areaMagenta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff00e5" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ff00e5" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="day"
                stroke="rgba(156,163,175,0.5)"
                fontSize={10}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
                interval={Math.floor(data.length / 8)}
              />
              <YAxis
                yAxisId="left"
                stroke="rgba(156,163,175,0.5)"
                fontSize={10}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
                tickFormatter={(v) => `${(v / 1000).toFixed(1)}k`}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="rgba(156,163,175,0.5)"
                fontSize={10}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(0,240,255,0.2)", strokeWidth: 1 }} />
              <Area
                yAxisId="left"
                type="monotone"
                dataKey="followers"
                name="Seguidores"
                stroke="#00f0ff"
                strokeWidth={2}
                fill="url(#areaCyan)"
                activeDot={{
                  r: 4,
                  fill: "#00f0ff",
                  stroke: "#0a0a10",
                  strokeWidth: 2,
                }}
              />
              <Area
                yAxisId="right"
                type="monotone"
                dataKey="engagement"
                name="Engagement"
                stroke="#ff00e5"
                strokeWidth={2}
                fill="url(#areaMagenta)"
                activeDot={{
                  r: 4,
                  fill: "#ff00e5",
                  stroke: "#0a0a10",
                  strokeWidth: 2,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
