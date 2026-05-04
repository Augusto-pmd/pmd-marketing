"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";
import { cn } from "@/lib/utils";

type ToastVariant = "success" | "error" | "info";

type Toast = {
  id: string;
  title: string;
  description?: string;
  variant: ToastVariant;
};

type ToastCtx = {
  toast: (t: Omit<Toast, "id">) => void;
};

const Ctx = createContext<ToastCtx | null>(null);

const VARIANTS: Record<
  ToastVariant,
  { icon: typeof CheckCircle2; ring: string; text: string; bar: string }
> = {
  success: {
    icon: CheckCircle2,
    ring: "border-success/40 shadow-[0_0_24px_rgba(0,255,136,0.18)]",
    text: "text-success",
    bar: "bg-success",
  },
  error: {
    icon: AlertCircle,
    ring: "border-magenta/40 shadow-[0_0_24px_rgba(255,0,229,0.18)]",
    text: "text-magenta",
    bar: "bg-magenta",
  },
  info: {
    icon: Info,
    ring: "border-cyan/40 shadow-[0_0_24px_rgba(0,240,255,0.18)]",
    text: "text-cyan",
    bar: "bg-cyan",
  },
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((t: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { ...t, id }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <Ctx.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-[100] flex w-full max-w-sm flex-col gap-2">
        <AnimatePresence>
          {toasts.map((t) => (
            <ToastItem key={t.id} toast={t} onDismiss={() => dismiss(t.id)} />
          ))}
        </AnimatePresence>
      </div>
    </Ctx.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const v = VARIANTS[toast.variant];
  const Icon = v.icon;

  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 24, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 24, scale: 0.96 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "pointer-events-auto relative flex items-start gap-3 overflow-hidden rounded-xl border bg-surface/95 backdrop-blur-xl px-4 py-3.5",
        v.ring
      )}
    >
      <span
        className={cn("absolute left-0 top-0 h-full w-0.5", v.bar)}
        aria-hidden
      />
      <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", v.text)} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground">{toast.title}</p>
        {toast.description && (
          <p className="mt-0.5 text-xs text-muted leading-relaxed">
            {toast.description}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Cerrar"
        className="text-muted hover:text-foreground transition-colors"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </motion.div>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx;
}
