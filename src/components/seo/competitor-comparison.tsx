"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DATA = [
  {
    name: "PMD",
    da: 42,
    keywords: 89,
    traffic: 23,
  },
  {
    name: "ConstructoraNorte",
    da: 38,
    keywords: 124,
    traffic: 31,
  },
  {
    name: "BuildArq",
    da: 51,
    keywords: 156,
    traffic: 48,
  },
  {
    name: "ModularHogar",
    da: 34,
    keywords: 67,
    traffic: 18,
  },
];

type TooltipProps = {
  active?: boolean;
  label?: string;
  payload?: Array<{ value?: number; name?: string; color?: string; dataKey?: string }>;
};

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-[#0a0a10]/95 backdrop-blur-xl px-3 py-2 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
        {label}
      </p>
      {payload.map((p) => (
        <div
          key={p.dataKey ?? p.name}
          className="flex items-center gap-2 text-xs"
        >
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: p.color, boxShadow: `0 0 6px ${p.color}` }}
          />
          <span className="text-muted">{p.name}:</span>
          <span className="font-mono text-foreground tabular-nums">
            {p.value}
          </span>
        </div>
      ))}
    </div>
  );
}

export function CompetitorComparison() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Benchmark
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Comparativa con competidores
          </h3>
        </div>
        <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_6px_rgba(0,240,255,0.6)]" />
            <span className="text-muted">DA</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-magenta shadow-[0_0_6px_rgba(255,0,229,0.6)]" />
            <span className="text-muted">Keywords</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-amber shadow-[0_0_6px_rgba(255,184,0,0.6)]" />
            <span className="text-muted">Tráfico (k)</span>
          </span>
        </div>
      </div>

      <div className="p-5 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DATA}
            layout="vertical"
            margin={{ top: 8, right: 16, left: 8, bottom: 0 }}
          >
            <CartesianGrid
              stroke="rgba(255,255,255,0.05)"
              strokeDasharray="3 3"
              horizontal={false}
            />
            <XAxis
              type="number"
              stroke="rgba(156,163,175,0.5)"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
            />
            <YAxis
              type="category"
              dataKey="name"
              stroke="rgba(156,163,175,0.5)"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
              width={120}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,240,255,0.04)" }} />
            <Bar dataKey="da" name="DA" fill="#00f0ff" radius={[0, 4, 4, 0]} />
            <Bar dataKey="keywords" name="Keywords" fill="#ff00e5" radius={[0, 4, 4, 0]} />
            <Bar dataKey="traffic" name="Tráfico" fill="#ffb800" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
