"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  MessageSquare,
  TrendingUp,
  UserPlus,
  Send,
  Star,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Activity = {
  id: string;
  icon: LucideIcon;
  text: string;
  meta: string;
  time: string;
  accent: "cyan" | "magenta" | "amber" | "success";
};

const ACTIVITY: Activity[] = [
  {
    id: "1",
    icon: UserPlus,
    text: "Nuevo lead capturado",
    meta: "Sofía Mendez · Instagram",
    time: "hace 4 min",
    accent: "success",
  },
  {
    id: "2",
    icon: Send,
    text: "Post publicado en Instagram",
    meta: "Carrusel: Casa modular en Pilar",
    time: "hace 32 min",
    accent: "magenta",
  },
  {
    id: "3",
    icon: Star,
    text: "Nueva reseña de Google",
    meta: "★★★★★ · Familia Aguilar",
    time: "hace 1 h",
    accent: "amber",
  },
  {
    id: "4",
    icon: MessageSquare,
    text: "Conversación de WhatsApp asignada",
    meta: "Lautaro G. → Equipo de ventas",
    time: "hace 2 h",
    accent: "success",
  },
  {
    id: "5",
    icon: TrendingUp,
    text: "Campaña 'Diseño 2026' superó objetivo",
    meta: "+340% CTR vs benchmark",
    time: "hace 3 h",
    accent: "cyan",
  },
  {
    id: "6",
    icon: CheckCircle2,
    text: "Email de bienvenida enviado",
    meta: "Secuencia · 23 destinatarios",
    time: "hace 5 h",
    accent: "cyan",
  },
];

const ACCENT_BG: Record<Activity["accent"], string> = {
  cyan: "bg-cyan/10 text-cyan border-cyan/30",
  magenta: "bg-magenta/10 text-magenta border-magenta/30",
  amber: "bg-amber/10 text-amber border-amber/30",
  success: "bg-success/10 text-success border-success/30",
};

export function ActivityFeed() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Actividad reciente
          </h3>
        </div>
        <button className="font-mono text-[10px] uppercase tracking-wider text-muted hover:text-cyan transition-colors">
          Ver todo
        </button>
      </div>

      <ul className="divide-y divide-white/5">
        {ACTIVITY.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.li
              key={item.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="flex items-start gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
            >
              <div
                className={cn(
                  "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md border",
                  ACCENT_BG[item.accent]
                )}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">{item.text}</p>
                <p className="text-xs text-muted truncate">{item.meta}</p>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted shrink-0 mt-1">
                {item.time}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
