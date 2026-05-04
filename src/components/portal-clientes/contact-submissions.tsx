"use client";

import { motion } from "framer-motion";
import { Mail, Inbox, MailCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type Submission = {
  id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  status: "Nuevo" | "Respondido";
};

const SUBMISSIONS: Submission[] = [
  {
    id: "s1",
    name: "Federico Álvarez",
    email: "f.alvarez@gmail.com",
    message:
      "Hola, me interesa cotizar una casa modular de 180m² para terreno en Pilar. ¿Pueden enviarme info?",
    date: "Hace 12 min",
    status: "Nuevo",
  },
  {
    id: "s2",
    name: "Carolina Mendoza",
    email: "carolina.mendoza@hotmail.com",
    message:
      "Quiero ampliar mi vivienda en San Isidro, sumar 60m² y galería. ¿Hacen proyectos así?",
    date: "Hace 2 horas",
    status: "Nuevo",
  },
  {
    id: "s3",
    name: "Pablo Russo",
    email: "pablo@constructor.com.ar",
    message: "Consulta sobre llave en mano para cabaña en Bariloche, lote propio.",
    date: "Hace 5 horas",
    status: "Respondido",
  },
  {
    id: "s4",
    name: "Sofía Gutierrez",
    email: "s.gutierrez@gmail.com",
    message:
      "Buen día, vimos su trabajo en Nordelta y queremos cotizar duplex 280m². Disponible para reunión.",
    date: "Ayer",
    status: "Respondido",
  },
  {
    id: "s5",
    name: "Martín Cabrera",
    email: "martin.cab@outlook.com",
    message: "Necesito asesoramiento para refacción integral departamento Recoleta 120m².",
    date: "Hace 2 días",
    status: "Respondido",
  },
];

export function ContactSubmissions() {
  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md border border-cyan/30 bg-cyan/10">
            <Inbox className="h-4 w-4 text-cyan" />
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Bandeja de entrada
            </span>
            <h3 className="text-sm font-semibold text-foreground">
              Formulario de contacto del portal
            </h3>
          </div>
        </div>
        <span className="rounded-full border border-magenta/30 bg-magenta/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-magenta">
          2 nuevos
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5 text-left">
              <th className="px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                Contacto
              </th>
              <th className="px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                Mensaje
              </th>
              <th className="px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                Estado
              </th>
              <th className="px-3 py-3 font-mono text-[10px] uppercase tracking-wider text-muted">
                Fecha
              </th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <tbody>
            {SUBMISSIONS.map((s, i) => (
              <motion.tr
                key={s.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="border-b border-white/[0.03] hover:bg-white/[0.02]"
              >
                <td className="px-5 py-3.5 align-top">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan/20 to-magenta/20 border border-white/10 font-mono text-xs font-semibold text-foreground">
                      {s.name
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-medium text-foreground truncate">
                        {s.name}
                      </div>
                      <div className="font-mono text-[10px] text-muted truncate">
                        {s.email}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-3.5 align-top max-w-md">
                  <p className="text-xs text-muted leading-relaxed line-clamp-2">
                    {s.message}
                  </p>
                </td>
                <td className="px-3 py-3.5 align-top">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider",
                      s.status === "Nuevo"
                        ? "border-magenta/30 bg-magenta/10 text-magenta"
                        : "border-success/30 bg-success/10 text-success"
                    )}
                  >
                    {s.status === "Nuevo" ? (
                      <Mail className="h-3 w-3" />
                    ) : (
                      <MailCheck className="h-3 w-3" />
                    )}
                    {s.status}
                  </span>
                </td>
                <td className="px-3 py-3.5 align-top font-mono text-xs text-muted">
                  {s.date}
                </td>
                <td className="px-5 py-3.5 align-top text-right">
                  <button
                    type="button"
                    className="rounded-md border border-cyan/40 bg-cyan/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan hover:bg-cyan/20"
                  >
                    Responder
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
