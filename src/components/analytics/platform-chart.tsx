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

type ChartTooltipProps = {
  active?: boolean;
  label?: string;
  payload?: Array<{
    value?: number;
    name?: string;
    color?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
  }>;
};

const DATA = [
  { platform: "Instagram", impressions: 142000, color: "#ff00e5" },
  { platform: "Facebook", impressions: 58000, color: "#6b8aff" },
  { platform: "TikTok", impressions: 32000, color: "#ffb800" },
  { platform: "LinkedIn", impressions: 16300, color: "#00f0ff" },
];

function CustomTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const point = payload[0];
  return (
    <div className="rounded-lg border border-white/10 bg-[#0a0a10]/95 backdrop-blur-xl px-3 py-2">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
        {label}
      </p>
      <div className="flex items-center gap-2 text-xs">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: point.payload.color,
            boxShadow: `0 0 6px ${point.payload.color}`,
          }}
        />
        <span className="font-mono text-foreground tabular-nums">
          {Number(point.value).toLocaleString("es-AR")}
        </span>
        <span className="text-muted text-[11px]">impresiones</span>
      </div>
    </div>
  );
}

export function PlatformChart() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Comparativa
        </span>
        <h3 className="text-sm font-semibold text-foreground">
          Performance por plataforma
        </h3>
      </div>

      <div className="p-5">
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={DATA} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid
                stroke="rgba(255,255,255,0.05)"
                strokeDasharray="3 3"
                vertical={false}
              />
              <XAxis
                dataKey="platform"
                stroke="rgba(156,163,175,0.6)"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
              />
              <YAxis
                stroke="rgba(156,163,175,0.5)"
                fontSize={10}
                tickLine={false}
                axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,240,255,0.04)" }} />
              <Bar dataKey="impressions" radius={[6, 6, 0, 0]}>
                {DATA.map((d) => (
                  <Cell key={d.platform} fill={d.color} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Inline legend with totals */}
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 border-t border-white/5 pt-4">
          {DATA.map((d) => (
            <div key={d.platform} className="flex flex-col gap-0.5">
              <div className="flex items-center gap-1.5">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: d.color, boxShadow: `0 0 6px ${d.color}` }}
                />
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                  {d.platform}
                </span>
              </div>
              <span className="font-mono text-sm text-foreground tabular-nums">
                {(d.impressions / 1000).toFixed(1)}k
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
