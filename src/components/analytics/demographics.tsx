"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

type ChartTooltipProps = {
  active?: boolean;
  payload?: Array<{
    value?: number;
    name?: string;
    color?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
  }>;
};

const AGE_DATA = [
  { name: "18-24", value: 12, color: "#ff00e5" },
  { name: "25-34", value: 38, color: "#00f0ff" },
  { name: "35-44", value: 28, color: "#ffb800" },
  { name: "45-54", value: 15, color: "#00ff88" },
  { name: "55+", value: 7, color: "#6b8aff" },
];

const GENDER_DATA = [
  { name: "Mujeres", value: 54, color: "#ff00e5" },
  { name: "Hombres", value: 44, color: "#00f0ff" },
  { name: "Otros", value: 2, color: "#ffb800" },
];

const LOCATION_DATA = [
  { name: "Buenos Aires", value: 62, color: "#00f0ff" },
  { name: "GBA Norte", value: 18, color: "#ff00e5" },
  { name: "Córdoba", value: 8, color: "#ffb800" },
  { name: "Rosario", value: 6, color: "#00ff88" },
  { name: "Otras", value: 6, color: "#6b8aff" },
];

function CustomTooltip({ active, payload }: ChartTooltipProps) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="rounded-lg border border-white/10 bg-[#0a0a10]/95 backdrop-blur-xl px-3 py-2">
      <div className="flex items-center gap-2 text-xs">
        <span
          className="h-2 w-2 rounded-full"
          style={{
            background: p.payload.color,
            boxShadow: `0 0 6px ${p.payload.color}`,
          }}
        />
        <span className="text-muted">{p.name}:</span>
        <span className="font-mono text-foreground tabular-nums">
          {p.value}%
        </span>
      </div>
    </div>
  );
}

function DonutCard({
  title,
  data,
  centerLabel,
  centerValue,
}: {
  title: string;
  data: Array<{ name: string; value: number; color: string }>;
  centerLabel: string;
  centerValue: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="border-b border-white/5 px-5 py-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Audiencia
        </span>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>

      <div className="p-5">
        <div className="relative h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={2}
                stroke="none"
                isAnimationActive={false}
              >
                {data.map((d) => (
                  <Cell key={d.name} fill={d.color} fillOpacity={0.85} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
              {centerLabel}
            </span>
            <span className="font-mono text-base font-semibold text-foreground">
              {centerValue}
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-1.5 border-t border-white/5 pt-3">
          {data.map((d) => (
            <div key={d.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="h-1.5 w-1.5 rounded-full shrink-0"
                  style={{ background: d.color, boxShadow: `0 0 4px ${d.color}` }}
                />
                <span className="text-xs text-foreground truncate">{d.name}</span>
              </div>
              <span className="font-mono text-xs text-muted tabular-nums">
                {d.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Demographics() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <DonutCard
        title="Edad"
        data={AGE_DATA}
        centerLabel="Promedio"
        centerValue="34"
      />
      <DonutCard
        title="Género"
        data={GENDER_DATA}
        centerLabel="Total"
        centerValue="12.8k"
      />
      <DonutCard
        title="Ubicación"
        data={LOCATION_DATA}
        centerLabel="Top"
        centerValue="BA"
      />
    </div>
  );
}
