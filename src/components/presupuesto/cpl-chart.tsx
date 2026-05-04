"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const DATA = [
  { month: "Dic", cpl: 4820 },
  { month: "Ene", cpl: 4650 },
  { month: "Feb", cpl: 4280 },
  { month: "Mar", cpl: 3940 },
  { month: "Abr", cpl: 3720 },
  { month: "May", cpl: 3480 },
];

type TooltipProps = {
  active?: boolean;
  label?: string;
  payload?: Array<{ value?: number; color?: string }>;
};

function CustomTooltip({ active, payload, label }: TooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-[#0a0a10]/95 backdrop-blur-xl px-3 py-2 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted mb-1">
        {label}
      </p>
      <div className="flex items-center gap-2 text-xs">
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{
            background: "#00f0ff",
            boxShadow: "0 0 6px #00f0ff",
          }}
        />
        <span className="text-muted">CPL:</span>
        <span className="font-mono text-foreground tabular-nums">
          ${Number(payload[0].value).toLocaleString("es-AR")} ARS
        </span>
      </div>
    </div>
  );
}

export function CPLChart() {
  const latest = DATA[DATA.length - 1].cpl;
  const previous = DATA[DATA.length - 2].cpl;
  const delta = ((latest - previous) / previous) * 100;

  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Eficiencia
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Costo por Lead (CPL)
          </h3>
        </div>
        <div className="text-right">
          <div className="font-mono text-2xl font-semibold text-cyan tabular-nums">
            ${latest.toLocaleString("es-AR")}
          </div>
          <div
            className={`font-mono text-[10px] uppercase tracking-wider ${
              delta < 0 ? "text-success" : "text-magenta"
            }`}
          >
            {delta > 0 ? "+" : ""}
            {delta.toFixed(1)}% vs mes ant.
          </div>
        </div>
      </div>

      <div className="p-5 h-[240px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={DATA} margin={{ top: 8, right: 16, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="cplGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00f0ff" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#00f0ff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              stroke="rgba(255,255,255,0.05)"
              strokeDasharray="3 3"
              vertical={false}
            />
            <XAxis
              dataKey="month"
              stroke="rgba(156,163,175,0.5)"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
            />
            <YAxis
              stroke="rgba(156,163,175,0.5)"
              fontSize={10}
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.05)" }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "rgba(0,240,255,0.2)", strokeWidth: 1 }} />
            <Line
              type="monotone"
              dataKey="cpl"
              stroke="#00f0ff"
              strokeWidth={2}
              dot={{ r: 3, fill: "#00f0ff", stroke: "#0a0a10", strokeWidth: 2 }}
              activeDot={{ r: 5, fill: "#00f0ff", stroke: "#0a0a10", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
