"use client";

import { useMemo } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from "reactflow";
import {
  Building2,
  Camera,
  ThumbsUp,
  PenTool,
  Users,
  Mail,
  Star,
  MessageCircle,
  BarChart3,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Accent = "cyan" | "magenta" | "blue" | "amber" | "success" | "purple" | "yellow";

type NodeData = {
  label: string;
  metric: string;
  metricLabel: string;
  icon: LucideIcon;
  accent: Accent;
  size?: "lg" | "md";
};

const ACCENT_HEX: Record<Accent, string> = {
  cyan: "#00f0ff",
  magenta: "#ff00e5",
  blue: "#6b8aff",
  amber: "#ffb800",
  success: "#00ff88",
  purple: "#a855f7",
  yellow: "#facc15",
};

function CustomNode({ data }: NodeProps<NodeData>) {
  const Icon = data.icon;
  const color = ACCENT_HEX[data.accent];
  const isLarge = data.size === "lg";

  return (
    <div
      className={cn(
        "relative rounded-xl border bg-surface/90 backdrop-blur-xl transition-all",
        isLarge ? "px-5 py-4 min-w-[180px]" : "px-4 py-3 min-w-[140px]",
        isLarge && "pulse-glow"
      )}
      style={{
        borderColor: `${color}55`,
        boxShadow: isLarge
          ? `0 0 0 1px ${color}55, 0 0 32px ${color}55, inset 0 0 24px ${color}10`
          : `0 0 0 1px ${color}33, 0 0 16px ${color}25, inset 0 0 16px ${color}08`,
      }}
    >
      {/* Handles on all four sides for flexible connections */}
      <Handle
        type="source"
        position={Position.Top}
        style={{ background: color, opacity: 0.6 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: color, opacity: 0.6 }}
      />
      <Handle
        type="target"
        position={Position.Bottom}
        style={{ background: color, opacity: 0.6 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: color, opacity: 0.6 }}
      />

      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex shrink-0 items-center justify-center rounded-lg border",
            isLarge ? "h-10 w-10" : "h-8 w-8"
          )}
          style={{
            background: `${color}1a`,
            borderColor: `${color}44`,
          }}
        >
          <Icon
            className={isLarge ? "h-5 w-5" : "h-4 w-4"}
            style={{ color }}
          />
        </div>
        <div className="flex flex-col min-w-0">
          <span
            className={cn(
              "font-semibold text-foreground leading-tight truncate",
              isLarge ? "text-sm" : "text-xs"
            )}
          >
            {data.label}
          </span>
          <div className="mt-0.5 flex items-baseline gap-1">
            <span
              className="font-mono text-xs tabular-nums"
              style={{ color }}
            >
              {data.metric}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-muted truncate">
              {data.metricLabel}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const nodeTypes = { custom: CustomNode };

const NODES: Node<NodeData>[] = [
  {
    id: "pmd",
    type: "custom",
    position: { x: 460, y: 290 },
    data: {
      label: "PMD Arquitectura",
      metric: "12.847",
      metricLabel: "alcance",
      icon: Building2,
      accent: "cyan",
      size: "lg",
    },
  },
  {
    id: "analytics",
    type: "custom",
    position: { x: 480, y: 60 },
    data: {
      label: "Analytics",
      metric: "98%",
      metricLabel: "uptime",
      icon: BarChart3,
      accent: "purple",
    },
  },
  {
    id: "instagram",
    type: "custom",
    position: { x: 820, y: 110 },
    data: {
      label: "Instagram",
      metric: "8.4k",
      metricLabel: "followers",
      icon: Camera,
      accent: "magenta",
    },
  },
  {
    id: "content",
    type: "custom",
    position: { x: 820, y: 290 },
    data: {
      label: "Content Studio",
      metric: "47",
      metricLabel: "posts",
      icon: PenTool,
      accent: "amber",
    },
  },
  {
    id: "facebook",
    type: "custom",
    position: { x: 820, y: 470 },
    data: {
      label: "Facebook",
      metric: "3.2k",
      metricLabel: "fans",
      icon: ThumbsUp,
      accent: "blue",
    },
  },
  {
    id: "crm",
    type: "custom",
    position: { x: 460, y: 540 },
    data: {
      label: "CRM",
      metric: "23",
      metricLabel: "leads",
      icon: Users,
      accent: "success",
    },
  },
  {
    id: "email",
    type: "custom",
    position: { x: 100, y: 470 },
    data: {
      label: "Email Campaigns",
      metric: "12",
      metricLabel: "activas",
      icon: Mail,
      accent: "cyan",
    },
  },
  {
    id: "whatsapp",
    type: "custom",
    position: { x: 100, y: 290 },
    data: {
      label: "WhatsApp",
      metric: "156",
      metricLabel: "chats",
      icon: MessageCircle,
      accent: "success",
    },
  },
  {
    id: "reviews",
    type: "custom",
    position: { x: 100, y: 110 },
    data: {
      label: "Google Reviews",
      metric: "4.8",
      metricLabel: "★ rating",
      icon: Star,
      accent: "yellow",
    },
  },
  {
    id: "reputation",
    type: "custom",
    position: { x: 280, y: 60 },
    data: {
      label: "Reputación",
      metric: "92",
      metricLabel: "score",
      icon: Sparkles,
      accent: "amber",
    },
  },
];

function makeEdge(
  id: string,
  source: string,
  target: string,
  color: Accent,
  opts: Partial<Edge> = {}
): Edge {
  const hex = ACCENT_HEX[color];
  return {
    id,
    source,
    target,
    animated: true,
    style: {
      stroke: hex,
      strokeWidth: 1.4,
      opacity: 0.55,
    },
    ...opts,
  };
}

const EDGES: Edge[] = [
  // Content Studio bridges to social platforms
  makeEdge("e-ig-content", "instagram", "content", "magenta"),
  makeEdge("e-fb-content", "facebook", "content", "blue"),
  // Content Studio to PMD center
  makeEdge("e-content-pmd", "content", "pmd", "amber"),
  // CRM to PMD center
  makeEdge("e-crm-pmd", "crm", "pmd", "success"),
  // Email + WhatsApp feed CRM
  makeEdge("e-email-crm", "email", "crm", "cyan"),
  makeEdge("e-wa-crm", "whatsapp", "crm", "success"),
  // Reviews to Reputación
  makeEdge("e-reviews-rep", "reviews", "reputation", "yellow"),
  // Reputación to PMD
  makeEdge("e-rep-pmd", "reputation", "pmd", "amber"),
  // Analytics connects to everything (subtle purple)
  makeEdge("e-an-pmd", "analytics", "pmd", "purple"),
  makeEdge("e-an-ig", "analytics", "instagram", "purple", {
    style: { stroke: ACCENT_HEX.purple, strokeWidth: 1, opacity: 0.3 },
  }),
  makeEdge("e-an-fb", "analytics", "facebook", "purple", {
    style: { stroke: ACCENT_HEX.purple, strokeWidth: 1, opacity: 0.3 },
  }),
  makeEdge("e-an-content", "analytics", "content", "purple", {
    style: { stroke: ACCENT_HEX.purple, strokeWidth: 1, opacity: 0.3 },
  }),
  makeEdge("e-an-crm", "analytics", "crm", "purple", {
    style: { stroke: ACCENT_HEX.purple, strokeWidth: 1, opacity: 0.3 },
  }),
  makeEdge("e-an-email", "analytics", "email", "purple", {
    style: { stroke: ACCENT_HEX.purple, strokeWidth: 1, opacity: 0.3 },
  }),
  makeEdge("e-an-wa", "analytics", "whatsapp", "purple", {
    style: { stroke: ACCENT_HEX.purple, strokeWidth: 1, opacity: 0.3 },
  }),
  makeEdge("e-an-reviews", "analytics", "reviews", "purple", {
    style: { stroke: ACCENT_HEX.purple, strokeWidth: 1, opacity: 0.3 },
  }),
  makeEdge("e-an-rep", "analytics", "reputation", "purple", {
    style: { stroke: ACCENT_HEX.purple, strokeWidth: 1, opacity: 0.3 },
  }),
];

export function NodeGraph() {
  const nodes = useMemo(() => NODES, []);
  const edges = useMemo(() => EDGES, []);

  return (
    <div className="relative h-[560px] w-full overflow-hidden rounded-xl border border-white/5 bg-[#07070b]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.4}
        maxZoom={1.5}
        proOptions={{ hideAttribution: true }}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable={false}
        panOnScroll
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={1}
          color="rgba(255,255,255,0.06)"
        />
        <Controls
          showInteractive={false}
          position="bottom-right"
        />
      </ReactFlow>

      {/* Decorative gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#07070b]/40" />

      {/* Title overlay */}
      <div className="pointer-events-none absolute left-5 top-5 flex flex-col gap-1">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          Ecosistema de Marketing
        </span>
        <span className="text-base font-semibold text-foreground">
          Vista de red en tiempo real
        </span>
      </div>

      {/* Legend */}
      <div className="pointer-events-none absolute right-5 top-5 flex flex-col gap-1.5 rounded-lg border border-white/5 bg-surface/70 px-3 py-2 backdrop-blur-xl">
        <span className="font-mono text-[9px] uppercase tracking-wider text-muted">
          Estado
        </span>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
          <span className="text-[11px] text-foreground">10 conectado</span>
        </div>
      </div>
    </div>
  );
}
