"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Eye, EyeOff, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

type Testimonial = {
  id: string;
  client: string;
  rating: number;
  quote: string;
  project: string;
  published: boolean;
};

const INITIAL: Testimonial[] = [
  {
    id: "t1",
    client: "Mariana Ferreyra",
    rating: 5,
    quote:
      "Construyeron nuestra casa modular en Pilar en el tiempo prometido y con una calidad de terminaciones impecable.",
    project: "Casa Modular Pilar",
    published: true,
  },
  {
    id: "t2",
    client: "Juan Manuel Sosa",
    rating: 5,
    quote:
      "La obra avanzó según el cronograma y el presupuesto se respetó al peso. Equipo profesional y prolijo.",
    project: "Townhouses Nordelta",
    published: true,
  },
  {
    id: "t3",
    client: "Carlos Mendoza",
    rating: 5,
    quote:
      "Profesionalismo de punta a punta. Desde la cotización inicial hasta la entrega final, todo súper claro.",
    project: "Casa de Campo Cariló",
    published: true,
  },
  {
    id: "t4",
    client: "Lucía Romero",
    rating: 4,
    quote:
      "Muy buen trabajo en general. Algunos retrasos en aberturas pero supieron resolverlo. Felices con el resultado.",
    project: "Casa Lago San Isidro",
    published: false,
  },
];

export function Testimonials() {
  const [items, setItems] = useState(INITIAL);

  const toggle = (id: string) =>
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, published: !t.published } : t))
    );

  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Testimonios
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Reseñas para mostrar en el portal
          </h3>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
          {items.filter((t) => t.published).length}/{items.length} publicados
        </span>
      </div>
      <div className="divide-y divide-white/5">
        {items.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className={cn(
              "flex items-start gap-4 p-5 transition-colors",
              !t.published && "opacity-60"
            )}
          >
            <Quote className="h-5 w-5 shrink-0 text-cyan/50 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground leading-relaxed italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-foreground">
                    {t.client}
                  </span>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={cn(
                          "h-3 w-3",
                          s <= t.rating
                            ? "fill-amber text-amber"
                            : "text-white/15"
                        )}
                      />
                    ))}
                  </div>
                  <span className="font-mono text-[11px] text-muted">
                    · {t.project}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => toggle(t.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider transition-all",
                    t.published
                      ? "border-success/40 bg-success/10 text-success"
                      : "border-white/10 bg-surface-2 text-muted hover:text-foreground"
                  )}
                >
                  {t.published ? (
                    <>
                      <Eye className="h-3 w-3" />
                      Publicado
                    </>
                  ) : (
                    <>
                      <EyeOff className="h-3 w-3" />
                      Oculto
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
