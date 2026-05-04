"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Share2,
  Users,
  PenTool,
  Mail,
  BarChart3,
  Star,
  Search,
  Workflow,
  Globe,
  DollarSign,
  ChevronLeft,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  accent?: "cyan" | "magenta" | "amber" | "success";
};

const NAV: NavItem[] = [
  { label: "Dashboard", href: "/", icon: Home, accent: "cyan" },
  { label: "Social Media", href: "/social-media", icon: Share2, accent: "magenta" },
  { label: "CRM", href: "/crm", icon: Users, accent: "success" },
  { label: "Contenido", href: "/contenido", icon: PenTool, accent: "amber" },
  { label: "Campañas", href: "/campanas", icon: Mail, accent: "cyan" },
  { label: "Analytics", href: "/analytics", icon: BarChart3 },
  { label: "Reputación", href: "/reputacion", icon: Star, accent: "amber" },
  { label: "SEO", href: "/seo", icon: Search },
  { label: "Automatización", href: "/automatizacion", icon: Workflow, accent: "magenta" },
  { label: "Portal Clientes", href: "/portal-clientes", icon: Globe, accent: "cyan" },
  { label: "Presupuesto", href: "/presupuesto", icon: DollarSign, accent: "success" },
];

const ACCENT_COLOR: Record<NonNullable<NavItem["accent"]>, string> = {
  cyan: "text-cyan",
  magenta: "text-magenta",
  amber: "text-amber",
  success: "text-success",
};

export function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "relative flex h-full flex-col border-r border-white/5 bg-[#0a0a10]/80 backdrop-blur-xl transition-all duration-300",
        collapsed ? "w-[72px]" : "w-[240px]"
      )}
    >
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 px-4 border-b border-white/5">
        <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan/20 to-magenta/20 border border-cyan/30 glow-cyan">
          <Zap className="h-4 w-4 text-cyan" />
        </div>
        {!collapsed && (
          <div className="flex flex-col leading-tight">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              PMD
            </span>
            <span className="text-sm font-semibold text-foreground">
              Marketing Hub
            </span>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3">
        <ul className="space-y-1 px-2">
          {NAV.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            const accentColor = item.accent
              ? ACCENT_COLOR[item.accent]
              : "text-muted";

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all",
                    isActive
                      ? "bg-cyan/10 text-foreground"
                      : "text-muted hover:bg-white/[0.03] hover:text-foreground"
                  )}
                  title={collapsed ? item.label : undefined}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-r-full bg-cyan shadow-[0_0_12px_rgba(0,240,255,0.8)]" />
                  )}
                  <Icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-colors",
                      isActive ? "text-cyan" : `${accentColor} opacity-70 group-hover:opacity-100`
                    )}
                  />
                  {!collapsed && (
                    <span
                      className={cn(
                        "truncate font-medium",
                        isActive && "text-foreground"
                      )}
                    >
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse toggle */}
      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? "Expandir menú" : "Colapsar menú"}
        className="absolute -right-3 top-20 z-10 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-surface text-muted hover:border-cyan/50 hover:text-cyan transition-all"
      >
        <ChevronLeft
          className={cn(
            "h-3 w-3 transition-transform",
            collapsed && "rotate-180"
          )}
        />
      </button>

      {/* Footer status */}
      <div className="border-t border-white/5 p-3">
        <div
          className={cn(
            "flex items-center gap-2 rounded-md px-2 py-1.5",
            collapsed && "justify-center"
          )}
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
          </span>
          {!collapsed && (
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
              Sistema activo
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
