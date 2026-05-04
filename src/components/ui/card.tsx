import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  glow,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  glow?: "cyan" | "magenta" | "amber" | "success" | "none";
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl transition-all",
        glow === "cyan" && "hover:border-cyan/30 hover:shadow-glow-cyan",
        glow === "magenta" && "hover:border-magenta/30 hover:shadow-glow-magenta",
        glow === "amber" && "hover:border-amber/30 hover:shadow-glow-amber",
        glow === "success" && "hover:border-success/30 hover:shadow-glow-success",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-sm font-semibold text-foreground tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardLabel({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.18em] text-muted",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function CardBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-5", className)} {...props}>
      {children}
    </div>
  );
}
