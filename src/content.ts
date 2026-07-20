import type { LucideIcon } from "lucide-react";
import { Archive, Building2, FileCog, House, Sprout, Wrench } from "lucide-react";

export type SectionSlug = "masia" | "infraestructures" | "equips" | "gestions" | "arxiu";

export type RecordType = "infrastructure" | "equipment" | "element" | "management" | "archive-document";

export type DocumentReference = {
  title: string;
  href?: string;
};

export type CalMenutRecord = {
  id: string;
  name: string;
  type: RecordType;
  description?: string;
  location?: string;
  notes?: string;
  photographs?: string[];
  documents?: DocumentReference[];
  relatedItemIds?: string[];
};

export type Section = {
  title: string;
  slug: SectionSlug;
  path: string;
  summary: string;
  emptyText: string;
  icon: LucideIcon;
  type: string;
  recordTypes: RecordType[];
};

export const sections: Section[] = [
  {
    title: "Masia",
    slug: "masia",
    path: "/masia",
    summary: "Informació general de la finca, l’edifici i els espais principals.",
    emptyText: "Aquest espai queda preparat per incorporar-hi fitxes de la masia i notes de context.",
    icon: House,
    type: "Àrea",
    recordTypes: [],
  },
  {
    title: "Infraestructures",
    slug: "infraestructures",
    path: "/infraestructures",
    summary: "Electricitat, aigua, xarxa, climatització i exterior.",
    emptyText: "Aquest espai queda preparat per incorporar-hi informació tècnica i documentació bàsica.",
    icon: Building2,
    type: "Àrea",
    recordTypes: ["infrastructure"],
  },
  {
    title: "Equips",
    slug: "equips",
    path: "/equips",
    summary: "Fitxes dels equips i dispositius instal·lats.",
    emptyText: "Aquest espai queda preparat per incorporar-hi fitxes dels equips i dades de consulta.",
    icon: Wrench,
    type: "Àrea",
    recordTypes: ["equipment"],
  },
  {
    title: "Gestions",
    slug: "gestions",
    path: "/gestions",
    summary: "Proveïdors, contractes, assegurances i administració.",
    emptyText: "Aquest espai queda preparat per incorporar-hi referències administratives i documents associats.",
    icon: FileCog,
    type: "Àrea",
    recordTypes: ["management"],
  },
  {
    title: "Arxiu",
    slug: "arxiu",
    path: "/arxiu",
    summary: "Plànols, llicències, projectes i documents generals.",
    emptyText: "Aquest espai queda preparat per incorporar-hi documents, plànols i materials de consulta.",
    icon: Archive,
    type: "Àrea",
    recordTypes: ["archive-document"],
  },
];

export const recordTypeLabels: Record<RecordType, string> = {
  infrastructure: "Infraestructura",
  equipment: "Equip",
  element: "Element",
  management: "Gestió",
  "archive-document": "Document d’arxiu",
};

export const recordTypeIcons: Record<RecordType, LucideIcon> = {
  infrastructure: Building2,
  equipment: Wrench,
  element: Sprout,
  management: FileCog,
  "archive-document": Archive,
};

export const records: CalMenutRecord[] = [
  { id: "electricitat", name: "Electricitat", type: "infrastructure", description: "Sistema general d’electricitat de la finca." },
  { id: "xarxa-comunicacions", name: "Xarxa i comunicacions", type: "infrastructure", description: "Referència bàsica per a la xarxa i les comunicacions." },
  { id: "jardi-exterior", name: "Jardí i exterior", type: "infrastructure", description: "Espai exterior i elements del jardí." },
  { id: "caldera-greenheiss", name: "Caldera GreenHeiss", type: "equipment", description: "Equip de calefacció registrat per a consulta interna.", relatedItemIds: ["electricitat"] },
  { id: "switch-unifi", name: "Switch UniFi", type: "equipment", description: "Equip de xarxa registrat per a consulta interna.", relatedItemIds: ["xarxa-comunicacions"] },
  { id: "motor-porta", name: "Motor de la porta", type: "equipment", description: "Equip associat a l’accés de la finca.", relatedItemIds: ["electricitat"] },
  { id: "quadre-electric", name: "Quadre elèctric", type: "element", description: "Element elèctric registrat com a referència.", relatedItemIds: ["electricitat"] },
  { id: "olivera-gran", name: "Olivera gran", type: "element", description: "Element destacat del jardí.", relatedItemIds: ["jardi-exterior"] },
  { id: "asseguranca-llar", name: "Assegurança de la llar", type: "management", description: "Referència administrativa de l’assegurança de la llar." },
  { id: "planol-general-finca", name: "Plànol general de la finca", type: "archive-document", description: "Document de referència general de la finca." },
];

export const getRecordPath = (recordId: string) => `/registre/${recordId}`;
export const recordsById = new Map(records.map((record) => [record.id, record]));
