"use client";

import { Bell, Search } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-4 border-b border-white/5 bg-[#0a0a10]/60 backdrop-blur-xl px-6">
      {/* Logo text on mobile fallback / breadcrumb area */}
      <div className="flex items-center gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
          PMD Arquitectura
        </span>
        <span className="hidden md:inline-block text-muted/50">/</span>
        <span className="hidden md:inline-block text-sm text-foreground">
          Centro de comando
        </span>
      </div>

      {/* Search */}
      <div className="ml-auto flex flex-1 max-w-md items-center">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Buscar contactos, posts, campañas..."
            className="w-full rounded-lg border border-white/5 bg-surface/60 py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted/60 focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/20 transition-colors"
          />
        </div>
      </div>

      {/* Notifications */}
      <button
        type="button"
        aria-label="Notificaciones"
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-white/5 bg-surface/60 text-muted hover:border-cyan/40 hover:text-cyan transition-all"
      >
        <Bell className="h-4 w-4" />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-magenta shadow-[0_0_8px_rgba(255,0,229,0.8)]" />
      </button>

      {/* Avatar */}
      <button
        type="button"
        aria-label="Perfil"
        className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-cyan/30 to-magenta/30 border border-white/10 text-xs font-semibold text-foreground hover:border-cyan/50 transition-all"
      >
        AU
      </button>
    </header>
  );
}
