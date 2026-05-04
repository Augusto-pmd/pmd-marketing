"use client";

import { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Platform = "instagram" | "facebook" | "linkedin" | "tiktok";

const PLATFORM_DOT: Record<Platform, string> = {
  instagram: "bg-magenta shadow-[0_0_6px_rgba(255,0,229,0.6)]",
  facebook: "bg-info shadow-[0_0_6px_rgba(107,138,255,0.6)]",
  linkedin: "bg-cyan shadow-[0_0_6px_rgba(0,240,255,0.6)]",
  tiktok: "bg-amber shadow-[0_0_6px_rgba(255,184,0,0.6)]",
};

const PLATFORM_LABEL: Record<Platform, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  linkedin: "LinkedIn",
  tiktok: "TikTok",
};

// Build mock scheduled posts relative to today so the calendar always shows activity
function buildSchedule(today: Date): Map<string, Platform[]> {
  const schedule = new Map<string, Platform[]>();
  const offsets: Array<[number, Platform[]]> = [
    [0, ["instagram", "facebook"]],
    [1, ["instagram"]],
    [3, ["linkedin"]],
    [5, ["facebook", "tiktok"]],
    [7, ["instagram", "linkedin"]],
    [9, ["tiktok"]],
    [12, ["instagram", "facebook", "linkedin"]],
    [15, ["instagram"]],
    [18, ["tiktok", "facebook"]],
    [21, ["instagram", "linkedin"]],
    [25, ["facebook"]],
    [-3, ["instagram"]],
    [-6, ["linkedin"]],
    [-10, ["tiktok"]],
  ];
  for (const [offset, platforms] of offsets) {
    const date = new Date(today);
    date.setDate(date.getDate() + offset);
    schedule.set(format(date, "yyyy-MM-dd"), platforms);
  }
  return schedule;
}

export function PostCalendar() {
  const [cursor, setCursor] = useState(() => new Date());
  const today = new Date();
  const schedule = buildSchedule(today);

  const monthStart = startOfMonth(cursor);
  const monthEnd = endOfMonth(cursor);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  const weekdays = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Calendario
          </span>
          <h3 className="mt-0.5 text-base font-semibold text-foreground capitalize">
            {format(cursor, "MMMM yyyy", { locale: es })}
          </h3>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCursor((c) => subMonths(c, 1))}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-white/5 bg-surface/60 text-muted hover:border-cyan/40 hover:text-cyan transition-all"
            aria-label="Mes anterior"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => setCursor(new Date())}
            className="rounded-md border border-white/5 bg-surface/60 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted hover:border-cyan/40 hover:text-cyan transition-all"
          >
            Hoy
          </button>
          <button
            type="button"
            onClick={() => setCursor((c) => addMonths(c, 1))}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-white/5 bg-surface/60 text-muted hover:border-cyan/40 hover:text-cyan transition-all"
            aria-label="Mes siguiente"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-5">
        {/* Weekday header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekdays.map((d) => (
            <div
              key={d}
              className="text-center font-mono text-[10px] uppercase tracking-wider text-muted py-1"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Day grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((day) => {
            const inMonth = isSameMonth(day, cursor);
            const isToday = isSameDay(day, today);
            const key = format(day, "yyyy-MM-dd");
            const platforms = schedule.get(key) ?? [];

            return (
              <button
                key={key}
                type="button"
                className={cn(
                  "relative flex aspect-square flex-col items-center justify-start rounded-md border p-1.5 text-xs transition-all",
                  inMonth
                    ? "border-white/5 bg-surface-2/40 text-foreground"
                    : "border-transparent text-muted/40",
                  isToday && "border-cyan/50 bg-cyan/5 shadow-[0_0_12px_rgba(0,240,255,0.2)]",
                  "hover:border-cyan/30 hover:bg-cyan/[0.04]"
                )}
              >
                <span
                  className={cn(
                    "font-mono text-xs",
                    isToday && "text-cyan font-semibold"
                  )}
                >
                  {format(day, "d")}
                </span>
                {platforms.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-0.5 justify-center pb-0.5">
                    {platforms.slice(0, 4).map((p) => (
                      <span
                        key={p}
                        className={cn("h-1.5 w-1.5 rounded-full", PLATFORM_DOT[p])}
                        title={PLATFORM_LABEL[p]}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-5 flex flex-wrap gap-3 border-t border-white/5 pt-4">
          {(Object.keys(PLATFORM_DOT) as Platform[]).map((p) => (
            <div key={p} className="flex items-center gap-1.5">
              <span className={cn("h-2 w-2 rounded-full", PLATFORM_DOT[p])} />
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                {PLATFORM_LABEL[p]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
