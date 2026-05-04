"use client";

import { motion } from "framer-motion";
import { ImageOff, Gauge, LinkIcon, FileText } from "lucide-react";

const SCORE = 78;
const ISSUES = [
  {
    icon: ImageOff,
    label: "3 imágenes sin alt text",
    severity: "warn" as const,
  },
  {
    icon: Gauge,
    label: "2 páginas con LCP > 2.5s",
    severity: "warn" as const,
  },
  {
    icon: LinkIcon,
    label: "1 enlace interno roto",
    severity: "error" as const,
  },
  {
    icon: FileText,
    label: "Sitemap actualizado",
    severity: "ok" as const,
  },
];

const SEV_STYLES = {
  ok: {
    bg: "bg-success/10",
    border: "border-success/30",
    text: "text-success",
  },
  warn: {
    bg: "bg-amber/10",
    border: "border-amber/30",
    text: "text-amber",
  },
  error: {
    bg: "bg-magenta/10",
    border: "border-magenta/30",
    text: "text-magenta",
  },
};

export function SiteHealth() {
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - SCORE / 100);

  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Diagnóstico
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Salud del sitio
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          Última auditoría · 02 May
        </span>
      </div>
      <div className="p-5 space-y-5">
        {/* Circle */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
              <circle
                cx="80"
                cy="80"
                r={radius}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="10"
                fill="none"
              />
              <motion.circle
                cx="80"
                cy="80"
                r={radius}
                stroke="url(#healthGradient)"
                strokeWidth="10"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                style={{ filter: "drop-shadow(0 0 8px rgba(0,255,136,0.5))" }}
              />
              <defs>
                <linearGradient id="healthGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#00ff88" />
                  <stop offset="100%" stopColor="#00f0ff" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-mono text-4xl font-semibold text-success tabular-nums">
                {SCORE}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                / 100
              </span>
            </div>
          </div>
        </div>
        {/* Issues */}
        <div className="space-y-2">
          {ISSUES.map((issue, i) => {
            const Icon = issue.icon;
            const styles = SEV_STYLES[issue.severity];
            return (
              <motion.div
                key={issue.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className={`flex items-center gap-3 rounded-lg border ${styles.border} ${styles.bg.replace("/10", "/[0.04]")} px-3 py-2`}
              >
                <Icon className={`h-3.5 w-3.5 shrink-0 ${styles.text}`} />
                <span className="text-xs text-foreground flex-1">
                  {issue.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
