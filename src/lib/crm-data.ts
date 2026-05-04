export type LeadStage =
  | "nuevo"
  | "contactado"
  | "propuesta"
  | "negociacion"
  | "cliente";

export type LeadSource = "Instagram" | "Facebook" | "Referido" | "Web" | "WhatsApp";

export type Contact = {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: LeadSource;
  stage: LeadStage;
  score: number;
  lastContact: string;
  value?: number;
  initials: string;
  notes?: string;
};

export const STAGE_LABEL: Record<LeadStage, string> = {
  nuevo: "Nuevo Lead",
  contactado: "Contactado",
  propuesta: "Propuesta Enviada",
  negociacion: "Negociación",
  cliente: "Cliente",
};

export const STAGE_ACCENT: Record<
  LeadStage,
  { text: string; bg: string; border: string; dot: string }
> = {
  nuevo: {
    text: "text-cyan",
    bg: "bg-cyan/10",
    border: "border-cyan/30",
    dot: "bg-cyan shadow-[0_0_8px_rgba(0,240,255,0.6)]",
  },
  contactado: {
    text: "text-info",
    bg: "bg-info/10",
    border: "border-info/30",
    dot: "bg-info",
  },
  propuesta: {
    text: "text-amber",
    bg: "bg-amber/10",
    border: "border-amber/30",
    dot: "bg-amber shadow-[0_0_8px_rgba(255,184,0,0.6)]",
  },
  negociacion: {
    text: "text-magenta",
    bg: "bg-magenta/10",
    border: "border-magenta/30",
    dot: "bg-magenta shadow-[0_0_8px_rgba(255,0,229,0.6)]",
  },
  cliente: {
    text: "text-success",
    bg: "bg-success/10",
    border: "border-success/30",
    dot: "bg-success shadow-[0_0_8px_rgba(0,255,136,0.6)]",
  },
};

export const SOURCE_ACCENT: Record<LeadSource, string> = {
  Instagram: "text-magenta border-magenta/30 bg-magenta/5",
  Facebook: "text-info border-info/30 bg-info/5",
  Referido: "text-amber border-amber/30 bg-amber/5",
  Web: "text-cyan border-cyan/30 bg-cyan/5",
  WhatsApp: "text-success border-success/30 bg-success/5",
};

export const CONTACTS: Contact[] = [
  {
    id: "c1",
    name: "Sofía Mendez",
    email: "sofia.mendez@gmail.com",
    phone: "+54 11 4567-8901",
    source: "Instagram",
    stage: "nuevo",
    score: 92,
    lastContact: "Hoy",
    value: 2400000,
    initials: "SM",
    notes: "Interesada en casa modular 120m² en Pilar. Solicitó visita a obra.",
  },
  {
    id: "c2",
    name: "Lautaro Garrido",
    email: "lautarog@empresa.com.ar",
    phone: "+54 11 5566-7788",
    source: "WhatsApp",
    stage: "contactado",
    score: 78,
    lastContact: "Ayer",
    value: 1800000,
    initials: "LG",
  },
  {
    id: "c3",
    name: "Familia Aguilar",
    email: "aguilar.flia@gmail.com",
    phone: "+54 11 6789-0123",
    source: "Referido",
    stage: "cliente",
    score: 100,
    lastContact: "Hace 3 días",
    value: 4500000,
    initials: "FA",
    notes: "Cliente activo. Obra en ejecución desde marzo.",
  },
  {
    id: "c4",
    name: "Martín Rossi",
    email: "mrossi@arquitecto.com",
    phone: "+54 11 7890-1234",
    source: "Web",
    stage: "propuesta",
    score: 85,
    lastContact: "Hace 2 días",
    value: 3200000,
    initials: "MR",
  },
  {
    id: "c5",
    name: "Camila Ortiz",
    email: "cami.ortiz@hotmail.com",
    phone: "+54 11 8901-2345",
    source: "Instagram",
    stage: "negociacion",
    score: 88,
    lastContact: "Hoy",
    value: 5100000,
    initials: "CO",
    notes: "Negociando ajustes finales en presupuesto. Muy interesada.",
  },
  {
    id: "c6",
    name: "Hernán Paredes",
    email: "hparedes@dev.com.ar",
    phone: "+54 11 9012-3456",
    source: "Facebook",
    stage: "nuevo",
    score: 65,
    lastContact: "Hoy",
    initials: "HP",
  },
  {
    id: "c7",
    name: "Valeria Caputo",
    email: "vcaputo@gmail.com",
    phone: "+54 11 0123-4567",
    source: "Web",
    stage: "contactado",
    score: 72,
    lastContact: "Hace 1 día",
    initials: "VC",
  },
  {
    id: "c8",
    name: "Diego Sosa",
    email: "diegososa@empresa.com",
    phone: "+54 11 2345-6789",
    source: "Referido",
    stage: "propuesta",
    score: 81,
    lastContact: "Hace 4 días",
    value: 2800000,
    initials: "DS",
  },
  {
    id: "c9",
    name: "Renata Vidal",
    email: "renata.v@outlook.com",
    phone: "+54 11 3456-7890",
    source: "Instagram",
    stage: "negociacion",
    score: 90,
    lastContact: "Hoy",
    value: 3700000,
    initials: "RV",
  },
  {
    id: "c10",
    name: "Estudio Norte SRL",
    email: "contacto@estudionorte.com.ar",
    phone: "+54 11 4567-1234",
    source: "Referido",
    stage: "cliente",
    score: 100,
    lastContact: "Hace 1 semana",
    value: 8200000,
    initials: "EN",
  },
];

export const STAGES_ORDER: LeadStage[] = [
  "nuevo",
  "contactado",
  "propuesta",
  "negociacion",
  "cliente",
];
