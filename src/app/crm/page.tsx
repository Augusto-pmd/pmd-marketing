"use client";

import { useState, useMemo } from "react";
import { Users, UserPlus, Percent, Clock } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { PageMotion } from "@/components/ui/page-motion";
import { ContactTable } from "@/components/crm/contact-table";
import { LeadKanban } from "@/components/crm/lead-kanban";
import { ContactPanel } from "@/components/crm/contact-panel";
import {
  CONTACTS,
  type Contact,
  type LeadStage,
} from "@/lib/crm-data";

export default function CRMPage() {
  const [contacts, setContacts] = useState<Contact[]>(CONTACTS);
  const [selected, setSelected] = useState<Contact | null>(null);

  const stats = useMemo(() => {
    const total = contacts.length;
    const newThisMonth = contacts.filter((c) => c.stage === "nuevo").length;
    const clients = contacts.filter((c) => c.stage === "cliente").length;
    const conversion = total > 0 ? Math.round((clients / total) * 100) : 0;
    return { total, newThisMonth, clients, conversion };
  }, [contacts]);

  const handleMove = (id: string, stage: LeadStage) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, stage } : c))
    );
  };

  return (
    <PageMotion className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Módulo
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">CRM</h1>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-white/5 bg-surface/60 px-3 py-1.5 backdrop-blur-xl">
          <Users className="h-3.5 w-3.5 text-success" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            {stats.total} contactos · {stats.clients} clientes
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Contactos totales"
          value={String(stats.total)}
          delta="+12 este mes"
          trend="up"
          icon={Users}
          accent="cyan"
          index={0}
        />
        <StatCard
          label="Nuevos leads (mes)"
          value={String(stats.newThisMonth)}
          delta="+5 vs mes anterior"
          trend="up"
          icon={UserPlus}
          accent="success"
          index={1}
        />
        <StatCard
          label="Tasa de conversión"
          value={`${stats.conversion}%`}
          delta="+3% vs trimestre"
          trend="up"
          icon={Percent}
          accent="magenta"
          index={2}
        />
        <StatCard
          label="Tiempo promedio cierre"
          value="38 días"
          delta="-4 días"
          trend="up"
          icon={Clock}
          accent="amber"
          index={3}
        />
      </div>

      {/* Kanban */}
      <LeadKanban
        contacts={contacts}
        onMove={handleMove}
        onSelect={setSelected}
      />

      {/* Table */}
      <ContactTable contacts={contacts} onSelect={setSelected} />

      {/* Slide-out panel */}
      <ContactPanel contact={selected} onClose={() => setSelected(null)} />
    </PageMotion>
  );
}
