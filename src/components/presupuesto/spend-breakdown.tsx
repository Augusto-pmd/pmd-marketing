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
  { category: "Ads Instagram", spent: 98400, color: "#ff00e5" },
  { category: "Ads Facebook", spent: 64200, color: "#6b8aff" },
  { category: "Email Marketing", spent: 28100, color: "#00f0ff" },
  { category: "Contenido", spent: 52800, color: "#ffb800" },
  { category: "SEO", spent: 38600, color: "#00ff88" },
  { category: "Herramientas", spent: 30740, color: "#a855f7" },
];

type TooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number; payload?: { category?: string; color?: string } }>;
};

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="rounded-lg border border-white/10 bg-[#0a0a10]/95 backdrop-blur-xl px-3 py-2 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
        {item.payload?.category}
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
          ${Number(item.value).toLocaleString("es-AR")} ARS
        </span>
      </div>
    </div>
  );
}

export function SpendBreakdown() {
  const total = DATA.reduce((acc, d) => acc + d.spent, 0);

  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Distribución
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Gasto por categoría
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          Total ${total.toLocaleString("es-AR")} ARS
        </span>
      </div>

      <div className="p-5 h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={DATA}
            margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
          >
            <CartesianGrid
              stroke="rgba(255,255,255,0.05)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="category"
              stroke="rgba(156,163,175,0.5)"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
              interval={0}
            />
            <YAxis
              stroke="rgba(156,163,175,0.5)"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0,240,255,0.04)" }} />
            <Bar dataKey="spent" radius={[6, 6, 0, 0]}>
              {DATA.map((entry) => (
                <Cell key={entry.category} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 px-5 pb-5">
        {DATA.map((d) => {
          const pct = (d.spent / total) * 100;
          return (
            <div
              key={d.category}
              className="flex items-center justify-between gap-2 rounded-md border border-white/5 bg-surface-2 px-2.5 py-1.5"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: d.color, boxShadow: `0 0 6px ${d.color}` }}
                />
                <span className="text-[11px] text-foreground truncate">
                  {d.category}
                </span>
              </div>
              <span className="font-mono text-[10px] text-muted tabular-nums shrink-0">
                {pct.toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
