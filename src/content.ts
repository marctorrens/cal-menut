import type { LucideIcon } from "lucide-react";
import { Archive, Building2, FileCog, House, Sprout, Wrench } from "lucide-react";

export type SectionSlug = "masia" | "infraestructures" | "equips" | "gestions" | "arxiu";

export type RecordType = "infrastructure" | "equipment" | "element" | "management" | "archive-document";

export type DocumentReference = {
  title: string;
  href?: string;
};

export type DecisionStatus = "under-consideration" | "provisional" | "final";

export type DecisionNotes = {
  need?: string;
  optionsConsidered?: string[];
  pros?: string[];
  cons?: string[];
  decisionCriteria?: string[];
  provisionalConclusion?: string;
  decisionStatus?: DecisionStatus;
};

export type CalMenutRecord = {
  id: string;
  name: string;
  type: RecordType;
  description?: string;
  location?: string;
  confirmedFacts?: string[];
  plannedInfrastructure?: string[];
  optionsUnderConsideration?: string[];
  finalDecisions?: string[];
  decisionNotes?: DecisionNotes;
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

export const decisionStatusLabels: Record<DecisionStatus, string> = {
  "under-consideration": "En estudi",
  provisional: "Conclusió provisional",
  final: "Decisió final",
};

export const recordTypeIcons: Record<RecordType, LucideIcon> = {
  infrastructure: Building2,
  equipment: Wrench,
  element: Sprout,
  management: FileCog,
  "archive-document": Archive,
};

export const records: CalMenutRecord[] = [
  {
    id: "electricitat",
    name: "Electricitat",
    type: "infrastructure",
    description: "Sistema general d’electricitat de la finca.",
  },
  {
    id: "climatitzacio",
    name: "Climatització",
    type: "infrastructure",
    description: "Infraestructura relacionada amb la climatització de la casa.",
  },
  {
    id: "xarxa-comunicacions",
    name: "Xarxa i comunicacions",
    type: "infrastructure",
    description:
      "Infraestructura planificada per fer servir Ethernet cablejat sempre que sigui possible, amb connectivitat exterior i connexió de xarxa a l’entrada de vehicles per al videoporter i, potencialment, altres dispositius.",
    confirmedFacts: [
      "La finca preveu una xarxa interior i punts de connectivitat associats a serveis tècnics.",
      "A l’entrada de vehicles hi ha necessitat de connectivitat per al videoporter.",
    ],
    plannedInfrastructure: [
      "Prioritzar cablejat Ethernet allà on el traçat sigui viable.",
      "Portar connexió de xarxa fins a l’entrada de vehicles com a punt exterior de servei.",
    ],
    optionsUnderConsideration: [
      "Ethernet cablejat fins al punt exterior.",
      "Connexió exterior sense fil si el cablejat no és viable o no és estable.",
      "Ús del mateix punt de xarxa per a altres dispositius exteriors futurs.",
    ],
    decisionNotes: {
      need: "Definir una solució de connectivitat fiable per al videoporter i possibles dispositius exteriors sense perdre la recerca feta sobre alternatives.",
      optionsConsidered: [
        "Ethernet cablejat sempre que el conducte i el recorregut ho permetin.",
        "Enllaç Wi-Fi o una altra alternativa sense fil com a pla de contingència.",
        "Reserva d’un punt de xarxa exterior compartible amb equipament futur.",
      ],
      pros: [
        "El cablejat Ethernet sol aportar més estabilitat i menys manteniment que una connexió sense fil.",
        "Un punt exterior planificat pot reduir intervencions futures.",
      ],
      cons: [
        "La viabilitat depèn del recorregut físic, el conducte disponible i les proteccions necessàries.",
        "Compartir el punt amb dispositius futurs pot requerir alimentació, caixes o protecció addicional.",
      ],
      decisionCriteria: [
        "Fiabilitat del servei del videoporter.",
        "Viabilitat del pas de cable i manteniment posterior.",
        "Protecció exterior i compatibilitat amb ampliacions futures.",
      ],
      provisionalConclusion:
        "La hipòtesi preferent és Ethernet cablejat fins a l’entrada de vehicles, però resta pendent de validació tècnica abans de considerar-ho una solució aprovada o instal·lada.",
      decisionStatus: "provisional",
    },
  },
  {
    id: "jardi-exterior",
    name: "Jardí i exterior",
    type: "infrastructure",
    description:
      "Infraestructura del jardí i l’exterior, preparada per contenir subinfraestructures, equips i elements quan hi hagi registres reals.",
    notes:
      "El reg, la il·luminació exterior i un robot tallagespa poden ser elements relacionats quan es creïn registres amb informació confirmada.",
  },
  {
    id: "porta-acces-vehicles",
    name: "Porta d’accés de vehicles",
    type: "infrastructure",
    description:
      "Porta d’accés de vehicles amb motor, il·luminació exterior i videoporter en aquesta ubicació.",
    location: "Portes i accessos",
    confirmedFacts: [
      "Hi arriba un conducte soterrat d’aproximadament 50 mm de diàmetre.",
      "El conducte porta alimentació de 230 V per al motor de la porta i la il·luminació.",
    ],
    plannedInfrastructure: [
      "Valorar si el mateix accés pot admetre connectivitat de xarxa per al videoporter.",
    ],
    optionsUnderConsideration: [
      "Aprofitar el recorregut existent si és tècnicament viable i segur.",
      "Fer un recorregut separat per a dades si cal separar serveis o millorar proteccions.",
    ],
    notes:
      "La connectivitat de xarxa a aquesta ubicació continua pendent de decisió tècnica; no s’ha de presentar com a instal·lada fins que es confirmi.",
    relatedItemIds: ["electricitat", "xarxa-comunicacions"],
  },
  {
    id: "caldera-greenheiss",
    name: "Caldera GreenHeiss",
    type: "equipment",
    description:
      "Caldera de pèl·lets GreenHeiss de tipus hydro, destinada a alimentar el circuit de radiadors de la casa.",
    relatedItemIds: ["climatitzacio"],
  },
  {
    id: "motor-porta",
    name: "Motor de la porta",
    type: "equipment",
    description: "Motor que acciona la porta d’accés de vehicles i s’alimenta a 230 V.",
    relatedItemIds: ["porta-acces-vehicles", "electricitat"],
  },
  {
    id: "videoporter",
    name: "Videoporter",
    type: "equipment",
    description: "Videoporter situat a l’entrada de vehicles.",
    relatedItemIds: ["porta-acces-vehicles"],
  },
];

export const getRecordPath = (recordId: string) => `/registre/${recordId}`;
export const recordsById = new Map(records.map((record) => [record.id, record]));
