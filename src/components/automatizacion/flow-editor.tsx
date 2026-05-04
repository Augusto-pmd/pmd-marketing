"use client";

import { useCallback, useMemo } from "react";
import { useToast } from "@/components/ui/toast";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Handle,
  MiniMap,
  Position,
  addEdge,
  useEdgesState,
  useNodesState,
  type Connection,
  type Edge,
  type Node,
  type NodeProps,
} from "reactflow";
import {
  UserPlus,
  Star,
  Calendar,
  MailOpen,
  Mail,
  CheckSquare,
  MessageSquare,
  Database,
  Sparkles,
  Filter,
  Clock,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NodeKind = "trigger" | "action" | "condition";

type NodeData = {
  label: string;
  description: string;
  icon: LucideIcon;
  kind: NodeKind;
};

const KIND_STYLES: Record<
  NodeKind,
  { hex: string; bg: string; text: string; border: string; label: string }
> = {
  trigger: {
    hex: "#00ff88",
    bg: "bg-success/10",
    text: "text-success",
    border: "border-success/40",
    label: "Trigger",
  },
  action: {
    hex: "#00f0ff",
    bg: "bg-cyan/10",
    text: "text-cyan",
    border: "border-cyan/40",
    label: "Acción",
  },
  condition: {
    hex: "#ffb800",
    bg: "bg-amber/10",
    text: "text-amber",
    border: "border-amber/40",
    label: "Condición",
  },
};

function FlowNode({ data }: NodeProps<NodeData>) {
  const Icon = data.icon;
  const styles = KIND_STYLES[data.kind];

  return (
    <div
      className="relative rounded-xl border bg-surface/95 backdrop-blur-xl px-4 py-3 min-w-[180px] transition-all"
      style={{
        borderColor: `${styles.hex}55`,
        boxShadow: `0 0 0 1px ${styles.hex}33, 0 0 18px ${styles.hex}30, inset 0 0 14px ${styles.hex}08`,
      }}
    >
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: styles.hex,
          opacity: 0.6,
          width: 8,
          height: 8,
          border: `1px solid ${styles.hex}`,
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: styles.hex,
          opacity: 0.6,
          width: 8,
          height: 8,
          border: `1px solid ${styles.hex}`,
        }}
      />

      <div className="flex items-start gap-2.5">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border",
            styles.border,
            styles.bg
          )}
        >
          <Icon className={cn("h-4 w-4", styles.text)} />
        </div>
        <div className="flex flex-col min-w-0">
          <span
            className={cn(
              "font-mono text-[9px] uppercase tracking-[0.18em]",
              styles.text
            )}
          >
            {styles.label}
          </span>
          <span className="text-sm font-semibold text-foreground leading-tight truncate">
            {data.label}
          </span>
          <span className="font-mono text-[10px] text-muted leading-tight mt-0.5 truncate">
            {data.description}
          </span>
        </div>
      </div>
    </div>
  );
}

const nodeTypes = { flow: FlowNode };

const INITIAL_NODES: Node<NodeData>[] = [
  {
    id: "trigger-1",
    type: "flow",
    position: { x: 60, y: 200 },
    data: {
      label: "Nuevo Lead",
      description: "Desde formulario web",
      icon: UserPlus,
      kind: "trigger",
    },
  },
  {
    id: "cond-1",
    type: "flow",
    position: { x: 320, y: 200 },
    data: {
      label: "Si Score > 80",
      description: "Lead calificado",
      icon: Filter,
      kind: "condition",
    },
  },
  {
    id: "action-1",
    type: "flow",
    position: { x: 580, y: 100 },
    data: {
      label: "Enviar Email Bienvenida",
      description: "Plantilla onboarding",
      icon: Mail,
      kind: "action",
    },
  },
  {
    id: "action-2",
    type: "flow",
    position: { x: 580, y: 300 },
    data: {
      label: "Crear Tarea CRM",
      description: "Asignar a vendedor",
      icon: CheckSquare,
      kind: "action",
    },
  },
  {
    id: "wait-1",
    type: "flow",
    position: { x: 880, y: 100 },
    data: {
      label: "Esperar 3 días",
      description: "Si no hubo respuesta",
      icon: Clock,
      kind: "condition",
    },
  },
  {
    id: "action-3",
    type: "flow",
    position: { x: 1140, y: 100 },
    data: {
      label: "Notificar WhatsApp",
      description: "Follow-up automático",
      icon: MessageSquare,
      kind: "action",
    },
  },
];

function makeEdge(id: string, source: string, target: string, color: string): Edge {
  return {
    id,
    source,
    target,
    animated: true,
    style: { stroke: color, strokeWidth: 1.6, opacity: 0.7 },
  };
}

const INITIAL_EDGES: Edge[] = [
  makeEdge("e1", "trigger-1", "cond-1", "#00ff88"),
  makeEdge("e2", "cond-1", "action-1", "#ffb800"),
  makeEdge("e3", "cond-1", "action-2", "#ffb800"),
  makeEdge("e4", "action-1", "wait-1", "#00f0ff"),
  makeEdge("e5", "wait-1", "action-3", "#ffb800"),
];

const PALETTE: Array<{
  kind: NodeKind;
  items: Array<{ label: string; icon: LucideIcon }>;
}> = [
  {
    kind: "trigger",
    items: [
      { label: "Nuevo Lead", icon: UserPlus },
      { label: "Review Recibida", icon: Star },
      { label: "Post Programado", icon: Calendar },
      { label: "Email Abierto", icon: MailOpen },
    ],
  },
  {
    kind: "action",
    items: [
      { label: "Enviar Email", icon: Mail },
      { label: "Crear Tarea", icon: CheckSquare },
      { label: "Notificar WhatsApp", icon: MessageSquare },
      { label: "Actualizar CRM", icon: Database },
      { label: "Generar Contenido IA", icon: Sparkles },
    ],
  },
  {
    kind: "condition",
    items: [
      { label: "Si Score > 80", icon: Filter },
      { label: "Si Plataforma = Instagram", icon: Filter },
      { label: "Si Horario Óptimo", icon: Clock },
    ],
  },
];

export function FlowEditor() {
  const { toast } = useToast();
  const [nodes, , onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);

  const handleSave = () => {
    toast({
      title: "Flujo guardado",
      description: `${nodes.length} nodos · ${edges.length} conexiones publicadas.`,
      variant: "success",
    });
  };

  const onConnect = useCallback(
    (connection: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            animated: true,
            style: { stroke: "#00f0ff", strokeWidth: 1.6, opacity: 0.7 },
          },
          eds
        )
      ),
    [setEdges]
  );

  const types = useMemo(() => nodeTypes, []);

  return (
    <div className="rounded-xl border border-white/5 bg-surface/80 backdrop-blur-xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 border-b border-white/5 px-5 py-4">
        <div>
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
            Editor de Flujo
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Onboarding leads calificados
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-success/30 bg-success/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-success">
            ● Activo
          </span>
          <button
            type="button"
            onClick={handleSave}
            className="rounded-md border border-cyan/40 bg-cyan/15 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan hover:bg-cyan/25 hover:shadow-glow-cyan transition-all"
          >
            Guardar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px]">
        {/* Canvas */}
        <div className="relative h-[520px] bg-[#07070b]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={types}
            fitView
            fitViewOptions={{ padding: 0.2 }}
            minZoom={0.4}
            maxZoom={1.5}
            proOptions={{ hideAttribution: true }}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={20}
              size={1}
              color="rgba(255,255,255,0.06)"
            />
            <Controls showInteractive={false} position="bottom-left" />
            <MiniMap
              position="bottom-right"
              nodeColor={(n) => {
                const data = n.data as NodeData;
                return KIND_STYLES[data.kind].hex;
              }}
              nodeStrokeWidth={2}
              maskColor="rgba(7,7,11,0.7)"
            />
          </ReactFlow>

          <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#07070b]/80 to-transparent" />
        </div>

        {/* Palette */}
        <aside className="border-l border-white/5 bg-surface-2/50">
          <div className="border-b border-white/5 px-4 py-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Bloques disponibles
            </span>
            <h4 className="text-sm font-semibold text-foreground">
              Arrastrar al canvas
            </h4>
          </div>
          <div className="overflow-y-auto p-3 space-y-4 max-h-[470px]">
            {PALETTE.map((group) => {
              const styles = KIND_STYLES[group.kind];
              return (
                <div key={group.kind}>
                  <div
                    className={cn(
                      "mb-2 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em]",
                      styles.text
                    )}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: styles.hex,
                        boxShadow: `0 0 6px ${styles.hex}`,
                      }}
                    />
                    {styles.label}
                  </div>
                  <div className="space-y-1.5">
                    {group.items.map((it) => {
                      const Icon = it.icon;
                      return (
                        <button
                          key={it.label}
                          type="button"
                          draggable
                          className={cn(
                            "w-full flex items-center gap-2 rounded-lg border bg-surface px-2.5 py-2 text-left transition-all hover:bg-white/[0.02] cursor-grab active:cursor-grabbing",
                            styles.border,
                            "hover:" + styles.border.replace("/40", "/60")
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-md border",
                              styles.border,
                              styles.bg
                            )}
                          >
                            <Icon className={cn("h-3 w-3", styles.text)} />
                          </div>
                          <span className="text-xs text-foreground truncate">
                            {it.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
