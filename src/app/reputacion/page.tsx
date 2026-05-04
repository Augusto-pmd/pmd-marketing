"use client";

import { Star, ThumbsUp, MessageCircle, AlertCircle } from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { PageMotion } from "@/components/ui/page-motion";
import { OverallRating } from "@/components/reputacion/overall-rating";
import { ReviewFeed } from "@/components/reputacion/review-feed";
import { SentimentChart } from "@/components/reputacion/sentiment-chart";
import { ResponseTemplates } from "@/components/reputacion/response-templates";
import { ReputationAlerts } from "@/components/reputacion/alerts";

export default function ReputacionPage() {
  return (
    <PageMotion className="space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Módulo
          </span>
          <h1 className="mt-1 text-2xl font-semibold text-foreground">
            Reputación
          </h1>
        </div>
        <div className="hidden md:flex items-center gap-2 rounded-lg border border-white/5 bg-surface/60 px-3 py-1.5 backdrop-blur-xl">
          <Star className="h-3.5 w-3.5 text-amber" />
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Sincronizado hace 5 min
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Calificación promedio"
          value="4.7"
          delta="+0.2 vs mes ant."
          trend="up"
          icon={Star}
          accent="amber"
          index={0}
        />
        <StatCard
          label="Total reseñas"
          value="248"
          delta="+18 este mes"
          trend="up"
          icon={MessageCircle}
          accent="cyan"
          index={1}
        />
        <StatCard
          label="Sentimiento positivo"
          value="78%"
          delta="+4 pp"
          trend="up"
          icon={ThumbsUp}
          accent="success"
          index={2}
        />
        <StatCard
          label="Pendientes respuesta"
          value="8"
          delta="-3 vs ayer"
          trend="up"
          icon={AlertCircle}
          accent="magenta"
          index={3}
        />
      </div>

      {/* Overall + Sentiment + Alerts */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <OverallRating />
        </div>
        <SentimentChart />
      </div>

      <ReputationAlerts />

      {/* Templates */}
      <ResponseTemplates />

      {/* Feed */}
      <ReviewFeed />
    </PageMotion>
  );
}
