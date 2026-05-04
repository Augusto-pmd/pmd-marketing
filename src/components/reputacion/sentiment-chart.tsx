"use client";

import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const DATA = [
  { name: "Positivo", value: 78, color: "#00ff88" },
  { name: "Neutro", value: 14, color: "#ffb800" },
  { name: "Negativo", value: 8, color: "#ff00e5" },
];

export function SentimentChart() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Análisis IA
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Sentimiento de reseñas
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-success">
          ● Procesado
        </span>
      </div>

      <div className="p-5">
        <div className="relative h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={DATA}
                cx="50%"
                cy="50%"
                innerRadius={56}
                outerRadius={84}
                paddingAngle={2}
                dataKey="value"
                stroke="#0a0a0f"
                strokeWidth={2}
              >
                {DATA.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-mono text-2xl font-semibold text-success tabular-nums">
              78%
            </span>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              positivo
            </span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {DATA.map((d) => (
            <div key={d.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: d.color, boxShadow: `0 0 8px ${d.color}` }}
                />
                <span className="text-xs text-foreground">{d.name}</span>
              </div>
              <span
                className="font-mono text-xs tabular-nums"
                style={{ color: d.color }}
              >
                {d.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
