"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DATA = [
  { channel: "Email Marketing", roi: 480, color: "#00ff88" },
  { channel: "SEO Orgánico", roi: 320, color: "#00f0ff" },
  { channel: "Ads Instagram", roi: 280, color: "#ff00e5" },
  { channel: "Referidos", roi: 240, color: "#ffb800" },
  { channel: "Ads Facebook", roi: 180, color: "#6b8aff" },
  { channel: "Contenido Orgánico", roi: 140, color: "#a855f7" },
];

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number; payload?: { channel?: string; color?: string } }>;
};

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-white/10 bg-[#0a0a10]/95 backdrop-blur-xl px-3 py-2 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
        {item.payload?.channel}
      </p>
      <div className="flex items-center gap-2 text-xs">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: item.payload?.color,
            boxShadow: `0 0 6px ${item.payload?.color}`,
          }}
        />
        <span className="font-mono text-foreground tabular-nums">
          {item.value}% ROI
        </span>
      </div>
    </div>
  );
}

export function ROIChart() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Retorno
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            ROI por canal
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-success">
          ROI prom. 273%
        </span>
      </div>
      <div className="p-5 h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DATA}
            layout="vertical"
            margin={{ top: 4, right: 16, left: 4, bottom: 0 }}
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
              tickFormatter={(v) => `${v}%`}
            />
            <YAxis
              type="category"
              dataKey="channel"
              stroke="rgba(156,163,175,0.5)"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
              width={120}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,240,255,0.04)" }} />
            <Bar dataKey="roi" radius={[0, 6, 6, 0]}>
              {DATA.map((entry) => (
                <Cell key={entry.channel} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
