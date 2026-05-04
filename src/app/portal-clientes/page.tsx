"use client";

import { Globe, Building2, Inbox, Gift } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { PageMotion } from "@/components/ui/page-motion";
import { ProjectShowcase } from "@/components/portal-clientes/project-showcase";
import { Testimonials } from "@/components/portal-clientes/testimonials";
import { ReferralProgram } from "@/components/portal-clientes/referral-program";
import { ContactSubmissions } from "@/components/portal-clientes/contact-submissions";

export default function PortalClientesPage() {
  return (
    <PageMotion className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Módulo
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">
            Portal Clientes
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-white/5 bg-surface/60 px-3 py-1.5 backdrop-blur-xl">
          <Globe className="h-3.5 w-3.5 text-cyan" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            pmdarquitectura.com.ar
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Proyectos publicados"
          value="6"
          delta="+1 este mes"
          trend="up"
          icon={Building2}
          accent="cyan"
          index={0}
        />
        <StatCard
          label="Visitas portal/mes"
          value="3.840"
          delta="+22%"
          trend="up"
          icon={Globe}
          accent="success"
          index={1}
        />
        <StatCard
          label="Mensajes recibidos"
          value="48"
          delta="2 sin responder"
          trend="up"
          icon={Inbox}
          accent="magenta"
          index={2}
        />
        <StatCard
          label="Referidos del mes"
          value="12"
          delta="+25% conv."
          trend="up"
          icon={Gift}
          accent="amber"
          index={3}
        />
      </div>

      {/* Showcase */}
      <ProjectShowcase />

      {/* Two-column */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Testimonials />
        </div>
        <ReferralProgram />
      </div>

      {/* Submissions */}
      <ContactSubmissions />
    </PageMotion>
  );
}
