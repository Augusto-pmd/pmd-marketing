"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageCircle, Reply, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/toast";

type Platform = "google" | "facebook";

type Review = {
  id: string;
  reviewer: string;
  rating: number;
  date: string;
  text: string;
  platform: Platform;
  responded: boolean;
};

const INITIAL_REVIEWS: Review[] = [
  {
    id: "r1",
    reviewer: "Mariana Ferreyra",
    rating: 5,
    date: "Hace 2 días",
    text: "Excelente experiencia con PMD. Construyeron nuestra casa modular en Pilar en el tiempo prometido y con una calidad de terminaciones impecable. El equipo es muy profesional y siempre estuvo disponible para responder dudas.",
    platform: "google",
    responded: false,
  },
  {
    id: "r2",
    reviewer: "Juan Manuel Sosa",
    rating: 5,
    date: "Hace 5 días",
    text: "Recomendados 100%. La obra avanzó según el cronograma y el presupuesto se respetó al peso. Diseño moderno y equipo de obra prolijo.",
    platform: "google",
    responded: true,
  },
  {
    id: "r3",
    reviewer: "Lucía Romero",
    rating: 4,
    date: "Hace 1 semana",
    text: "Muy buen trabajo en general. Algunos retrasos en la entrega de aberturas pero supieron resolverlo. Felices con el resultado final.",
    platform: "facebook",
    responded: false,
  },
  {
    id: "r4",
    reviewer: "Carlos Mendoza",
    rating: 5,
    date: "Hace 2 semanas",
    text: "Profesionalismo de punta a punta. Desde la cotización inicial hasta la entrega final, todo súper claro y transparente. La casa quedó hermosa.",
    platform: "google",
    responded: true,
  },
  {
    id: "r5",
    reviewer: "Sofía Cabrera",
    rating: 3,
    date: "Hace 3 semanas",
    text: "El resultado final está bien pero hubo demoras en algunos hitos. La comunicación podría mejorar.",
    platform: "facebook",
    responded: false,
  },
];

type Filter = "all" | "google" | "facebook";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "google", label: "Google" },
  { id: "facebook", label: "Facebook" },
];

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="#1877F2">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function ReviewFeed() {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [filter, setFilter] = useState<Filter>("all");
  const [replyOpen, setReplyOpen] = useState<string | null>(null);
  const [replies, setReplies] = useState<Record<string, string>>({});

  const filtered = useMemo(
    () =>
      filter === "all" ? reviews : reviews.filter((r) => r.platform === filter),
    [filter, reviews]
  );

  const handleSend = (review: Review) => {
    const text = (replies[review.id] || "").trim();
    if (!text) {
      toast({
        title: "Escribí una respuesta",
        description: "El mensaje no puede estar vacío.",
        variant: "error",
      });
      return;
    }
    setReviews((prev) =>
      prev.map((r) => (r.id === review.id ? { ...r, responded: true } : r))
    );
    setReplyOpen(null);
    setReplies((p) => {
      const next = { ...p };
      delete next[review.id];
      return next;
    });
    toast({
      title: "Respuesta enviada",
      description: `Se publicó tu respuesta a ${review.reviewer} en ${review.platform === "google" ? "Google" : "Facebook"}.`,
      variant: "success",
    });
  };

  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Feed
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Últimas reseñas
          </h3>
        </div>
        <div className="flex items-center gap-1.5 rounded-lg border border-white/5 bg-surface-2 p-0.5">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-md px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-all",
                filter === f.id
                  ? "bg-amber/15 text-amber"
                  : "text-muted hover:text-foreground"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-white/5">
        <AnimatePresence mode="popLayout">
          {filtered.map((r, i) => (
            <motion.div
              key={r.id}
              layout
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.04 }}
              className="p-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan/20 to-magenta/20 border border-white/10 font-mono text-sm font-semibold text-foreground">
                  {r.reviewer
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{r.reviewer}</span>
                      <div className="flex items-center gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star
                            key={s}
                            className={cn(
                              "h-3 w-3",
                              s <= r.rating
                                ? "fill-amber text-amber"
                                : "text-white/15"
                            )}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {r.platform === "google" ? (
                        <GoogleIcon className="h-3.5 w-3.5" />
                      ) : (
                        <FacebookIcon className="h-3.5 w-3.5" />
                      )}
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                        {r.date}
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
                    {r.text}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    {r.responded ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-success/30 bg-success/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-success">
                        <MessageCircle className="h-3 w-3" />
                        Respondida
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setReplyOpen(replyOpen === r.id ? null : r.id)
                        }
                        className="inline-flex items-center gap-1.5 rounded-full border border-cyan/40 bg-cyan/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-cyan hover:bg-cyan/20 transition-all"
                      >
                        <Reply className="h-3 w-3" />
                        Responder
                      </button>
                    )}
                  </div>
                  {replyOpen === r.id && !r.responded && (
                    <div className="mt-3 animate-fade-in">
                      <textarea
                        rows={2}
                        value={replies[r.id] || ""}
                        onChange={(e) =>
                          setReplies((p) => ({ ...p, [r.id]: e.target.value }))
                        }
                        placeholder="Escribí una respuesta personalizada..."
                        className="w-full rounded-lg border border-white/10 bg-surface-2 px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-cyan/40 focus:outline-none focus:ring-1 focus:ring-cyan/20 resize-none"
                      />
                      <div className="mt-2 flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setReplyOpen(null)}
                          className="rounded-md px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-muted hover:text-foreground"
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSend(r)}
                          className="flex items-center gap-1.5 rounded-md border border-cyan/40 bg-cyan/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan hover:bg-cyan/25 hover:shadow-[0_0_16px_rgba(0,240,255,0.25)] transition-all"
                        >
                          <Send className="h-3 w-3" />
                          Enviar
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center font-mono text-xs uppercase tracking-wider text-muted">
            Sin reseñas en {filter}
          </div>
        )}
      </div>
    </div>
  );
}
