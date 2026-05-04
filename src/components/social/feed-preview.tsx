"use client";

import { Camera, ThumbsUp, Briefcase, Music, Heart, MessageCircle, Send, Bookmark } from "lucide-react";

type Platform = "instagram" | "facebook" | "linkedin" | "tiktok";

const PREVIEW_TEXT_PLACEHOLDER =
  "Tu mensaje aparecerá acá. Empezá a escribir en el composer para ver cómo se vería en cada plataforma.";

function PreviewShell({
  platform,
  children,
}: {
  platform: Platform;
  children: React.ReactNode;
}) {
  const ACCENT: Record<Platform, { name: string; icon: React.ComponentType<{ className?: string }>; color: string; ring: string }> = {
    instagram: { name: "Instagram", icon: Camera, color: "text-magenta", ring: "border-magenta/30" },
    facebook: { name: "Facebook", icon: ThumbsUp, color: "text-info", ring: "border-info/30" },
    linkedin: { name: "LinkedIn", icon: Briefcase, color: "text-cyan", ring: "border-cyan/30" },
    tiktok: { name: "TikTok", icon: Music, color: "text-amber", ring: "border-amber/30" },
  };
  const { name, icon: Icon, color, ring } = ACCENT[platform];

  return (
    <div className={`rounded-xl border bg-surface-2 overflow-hidden ${ring}`}>
      <div className="flex items-center justify-between border-b border-white/5 px-3 py-2">
        <div className="flex items-center gap-1.5">
          <Icon className={`h-3.5 w-3.5 ${color}`} />
          <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
            {name}
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
          Preview
        </span>
      </div>
      {children}
    </div>
  );
}

export function FeedPreview({
  text,
  platforms,
}: {
  text: string;
  platforms: Platform[];
}) {
  const display = text.trim() || PREVIEW_TEXT_PLACEHOLDER;
  const isPlaceholder = !text.trim();

  if (platforms.length === 0) {
    return (
      <div className="flex h-full min-h-[300px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-surface-2/40 text-center p-8">
        <p className="text-sm text-muted">
          Seleccioná al menos una plataforma para ver la previa
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {platforms.includes("instagram") && (
        <PreviewShell platform="instagram">
          <div className="flex items-center gap-2 px-3 py-2.5">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-magenta to-amber" />
            <div className="flex-1">
              <div className="text-xs font-semibold text-foreground">pmd.arquitectura</div>
              <div className="text-[10px] text-muted">Buenos Aires, Argentina</div>
            </div>
          </div>
          <div className="aspect-square w-full bg-gradient-to-br from-surface to-surface-2 relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Imagen / Video
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 px-3 py-2 border-t border-white/5">
            <Heart className="h-4 w-4 text-muted hover:text-magenta cursor-pointer" />
            <MessageCircle className="h-4 w-4 text-muted" />
            <Send className="h-4 w-4 text-muted" />
            <Bookmark className="h-4 w-4 text-muted ml-auto" />
          </div>
          <div className="px-3 pb-3">
            <p className={`text-xs leading-relaxed ${isPlaceholder ? "text-muted/60 italic" : "text-foreground"}`}>
              <span className="font-semibold text-foreground mr-1">pmd.arquitectura</span>
              {display}
            </p>
          </div>
        </PreviewShell>
      )}

      {platforms.includes("facebook") && (
        <PreviewShell platform="facebook">
          <div className="flex items-center gap-2 px-3 py-2.5">
            <div className="h-8 w-8 rounded-full bg-info/30 border border-info/40" />
            <div className="flex-1">
              <div className="text-xs font-semibold text-foreground">PMD Arquitectura</div>
              <div className="text-[10px] text-muted">Hace unos minutos · Pública</div>
            </div>
          </div>
          <div className="px-3 pb-3">
            <p className={`text-xs leading-relaxed ${isPlaceholder ? "text-muted/60 italic" : "text-foreground"}`}>
              {display}
            </p>
          </div>
          <div className="aspect-video w-full bg-gradient-to-br from-info/10 to-surface relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Imagen
              </span>
            </div>
          </div>
        </PreviewShell>
      )}

      {platforms.includes("linkedin") && (
        <PreviewShell platform="linkedin">
          <div className="flex items-center gap-2 px-3 py-2.5">
            <div className="h-8 w-8 rounded bg-cyan/30 border border-cyan/40" />
            <div className="flex-1">
              <div className="text-xs font-semibold text-foreground">PMD Arquitectura SRL</div>
              <div className="text-[10px] text-muted">Constructora · 1.2k seguidores · Hace 2 min</div>
            </div>
          </div>
          <div className="px-3 pb-3">
            <p className={`text-xs leading-relaxed ${isPlaceholder ? "text-muted/60 italic" : "text-foreground"}`}>
              {display}
            </p>
          </div>
        </PreviewShell>
      )}

      {platforms.includes("tiktok") && (
        <PreviewShell platform="tiktok">
          <div className="aspect-[9/16] max-h-64 w-full bg-gradient-to-br from-amber/15 to-surface relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-[10px] uppercase tracking-wider text-muted">
                Video vertical
              </span>
            </div>
            <div className="absolute bottom-3 left-3 right-3">
              <p className={`text-xs leading-tight ${isPlaceholder ? "text-muted/70 italic" : "text-white"}`}>
                @pmd.arquitectura
              </p>
              <p className={`mt-1 text-[10px] leading-snug line-clamp-2 ${isPlaceholder ? "text-muted/50 italic" : "text-white/90"}`}>
                {display}
              </p>
            </div>
          </div>
        </PreviewShell>
      )}
    </div>
  );
}
