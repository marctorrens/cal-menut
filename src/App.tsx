import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { FileText, Image, MapPin, Search, X } from "lucide-react";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import {
  getRecordPath,
  records,
  recordsById,
  recordTypeIcons,
  recordTypeLabels,
  decisionStatusLabels,
  sections,
  type CalMenutRecord,
  type Section,
} from "./content";

type SearchResult = {
  title: string;
  description: string;
  path: string;
  icon: Section["icon"];
  type: string;
};

function RecordCard({ record }: { record: CalMenutRecord }) {
  const Icon = recordTypeIcons[record.type];

  return (
    <Link className="record-card" to={getRecordPath(record.id)}>
      <span className="record-icon"><Icon size={24} strokeWidth={1.7} /></span>
      <span>
        <small>{recordTypeLabels[record.type]}</small>
        <strong>{record.name}</strong>
        {record.description ? <span className="record-summary">{record.description}</span> : null}
      </span>
    </Link>
  );
}

function SearchDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;
    setQuery("");
    requestAnimationFrame(() => inputRef.current?.focus());

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const searchableItems = useMemo<SearchResult[]>(() => [
    ...sections.map((section) => ({
      title: section.title,
      description: section.summary,
      path: section.path,
      icon: section.icon,
      type: section.type,
    })),
    ...records.map((record) => ({
      title: record.name,
      description: [record.description, record.location, record.notes, record.confirmedFacts?.join(" "), record.plannedInfrastructure?.join(" "), record.optionsUnderConsideration?.join(" "), record.finalDecisions?.join(" "), record.decisionNotes ? Object.values(record.decisionNotes).flat().join(" ") : undefined].filter(Boolean).join(" "),
      path: getRecordPath(record.id),
      icon: recordTypeIcons[record.type],
      type: recordTypeLabels[record.type],
    })),
  ], []);

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("ca");
    if (!normalized) return searchableItems;
    return searchableItems.filter((item) =>
      `${item.title} ${item.description} ${item.type}`
        .toLocaleLowerCase("ca")
        .includes(normalized),
    );
  }, [query, searchableItems]);

  if (!open) return null;

  return (
    <div className="search-backdrop" onMouseDown={onClose} role="presentation">
      <section
        aria-label="Cerca a Cal Menut"
        aria-modal="true"
        className="search-dialog"
        onMouseDown={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="search-input-row">
          <Search aria-hidden="true" size={20} />
          <input
            ref={inputRef}
            aria-label="Cerca"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cerca a Cal Menut..."
            type="search"
            value={query}
          />
          <button aria-label="Tanca la cerca" className="icon-button" onClick={onClose} type="button">
            <X size={19} />
          </button>
        </div>

        <div className="search-results">
          {results.length ? (
            results.map((result) => {
              const Icon = result.icon;
              return (
                <button
                  className="search-result"
                  key={result.path}
                  onClick={() => {
                    navigate(result.path);
                    onClose();
                  }}
                  type="button"
                >
                  <Icon aria-hidden="true" size={20} />
                  <span>
                    <strong>{result.title}</strong>
                    <small>{result.type}</small>
                  </span>
                </button>
              );
            })
          ) : (
            <p className="empty-search">No s’ha trobat cap resultat.</p>
          )}
        </div>
      </section>
    </div>
  );
}

function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);
  const deploymentDate = new Intl.DateTimeFormat("ca-ES", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(__BUILD_DATE__));

  return (
    <main className="home-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Cal Menut</p>
          <h1>Tota la informació de la masia, en un sol lloc.</h1>
        </div>
        <button className="search-button" onClick={() => setSearchOpen(true)} type="button">
          <Search size={18} />
          <span>Cerca</span>
        </button>
      </header>

      <section aria-label="Àrees principals" className="entry-grid">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <Link className="entry-card" key={section.path} to={section.path}>
              <span className="entry-icon"><Icon size={30} strokeWidth={1.7} /></span>
              <span>
                <strong>{section.title}</strong>
                <small>{section.summary}</small>
              </span>
            </Link>
          );
        })}
      </section>

      <footer className="home-footer">
        <span>Cal Menut · v{__APP_VERSION__}</span>
        <span>Últim desplegament: {deploymentDate}</span>
      </footer>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </main>
  );
}

function SectionPage({ section }: { section: Section }) {
  const sectionRecords = records.filter((record) => section.recordTypes.includes(record.type));

  return (
    <main className="section-shell">
      <Link className="back-link" to="/">← Torna a l’inici</Link>
      <section className="section-hero">
        <p className="eyebrow">Àrea</p>
        <h1>{section.title}</h1>
        <p>{section.summary}</p>
      </section>
      {sectionRecords.length ? (
        <section aria-label={`Registres de ${section.title}`} className="record-grid">
          {sectionRecords.map((record) => <RecordCard key={record.id} record={record} />)}
        </section>
      ) : (
        <section aria-label="Contingut pendent" className="empty-state">
          <p className="eyebrow">Preparat per al futur</p>
          <p>{section.emptyText}</p>
        </section>
      )}
    </main>
  );
}

function OptionalSection({ title, children }: { title: string; children?: ReactNode }) {
  if (!children) return null;
  return (
    <section className="record-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}


function BulletList({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return <ul>{items.map((item) => <li key={item}>{item}</li>)}</ul>;
}

function DecisionNotesSection({ record }: { record: CalMenutRecord }) {
  const notes = record.decisionNotes;
  if (!notes) return null;

  return (
    <OptionalSection title="Notes de decisió">
      <dl className="decision-notes">
        {notes.need ? <><dt>Necessitat</dt><dd>{notes.need}</dd></> : null}
        {notes.optionsConsidered?.length ? <><dt>Opcions considerades</dt><dd><BulletList items={notes.optionsConsidered} /></dd></> : null}
        {notes.pros?.length ? <><dt>Pros</dt><dd><BulletList items={notes.pros} /></dd></> : null}
        {notes.cons?.length ? <><dt>Contres</dt><dd><BulletList items={notes.cons} /></dd></> : null}
        {notes.decisionCriteria?.length ? <><dt>Criteris de decisió</dt><dd><BulletList items={notes.decisionCriteria} /></dd></> : null}
        {notes.provisionalConclusion ? <><dt>Conclusió provisional</dt><dd>{notes.provisionalConclusion}</dd></> : null}
        {notes.decisionStatus ? <><dt>Estat de la decisió</dt><dd><span className={`decision-status decision-status--${notes.decisionStatus}`}>{decisionStatusLabels[notes.decisionStatus]}</span></dd></> : null}
      </dl>
    </OptionalSection>
  );
}

function RecordPage() {
  const navigate = useNavigate();
  const { recordId } = useParams();
  const record = recordId ? recordsById.get(recordId) : undefined;

  if (!record) {
    return (
      <main className="section-shell">
        <Link className="back-link" to="/">← Torna a l’inici</Link>
        <section className="empty-state">
          <p className="eyebrow">Registre no trobat</p>
          <p>No s’ha trobat cap registre amb aquest enllaç.</p>
        </section>
      </main>
    );
  }

  const relatedItems = record.relatedItemIds
    ?.map((id) => recordsById.get(id))
    .filter((item): item is CalMenutRecord => Boolean(item));

  return (
    <main className="section-shell">
      <button className="back-link back-button" onClick={() => navigate(-1)} type="button">← Torna enrere</button>
      <article className="record-detail">
        <p className="eyebrow">{recordTypeLabels[record.type]}</p>
        <h1>{record.name}</h1>
        {record.description ? <p className="record-description">{record.description}</p> : null}

        <OptionalSection title="Ubicació">
          {record.location ? <p><MapPin aria-hidden="true" size={18} /> {record.location}</p> : undefined}
        </OptionalSection>
        <OptionalSection title="Fotografies">
          {record.photographs?.length ? (
            <ul>{record.photographs.map((photo) => <li key={photo}><Image aria-hidden="true" size={18} /> {photo}</li>)}</ul>
          ) : undefined}
        </OptionalSection>
        <OptionalSection title="Documents">
          {record.documents?.length ? (
            <ul>{record.documents.map((document) => <li key={document.title}><FileText aria-hidden="true" size={18} /> {document.href ? <a href={document.href}>{document.title}</a> : document.title}</li>)}</ul>
          ) : undefined}
        </OptionalSection>
        <OptionalSection title="Fets existents confirmats">
          <BulletList items={record.confirmedFacts} />
        </OptionalSection>
        <OptionalSection title="Infraestructura planificada">
          <BulletList items={record.plannedInfrastructure} />
        </OptionalSection>
        <OptionalSection title="Opcions en estudi">
          <BulletList items={record.optionsUnderConsideration} />
        </OptionalSection>
        <OptionalSection title="Decisions finals">
          <BulletList items={record.finalDecisions} />
        </OptionalSection>
        <DecisionNotesSection record={record} />
        <OptionalSection title="Notes">
          {record.notes ? <p>{record.notes}</p> : undefined}
        </OptionalSection>
        <OptionalSection title="Elements relacionats">
          {relatedItems?.length ? (
            <div className="related-grid">{relatedItems.map((item) => <RecordCard key={item.id} record={item} />)}</div>
          ) : undefined}
        </OptionalSection>
      </article>
    </main>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {sections.map((section) => (
        <Route key={section.path} path={section.path} element={<SectionPage section={section} />} />
      ))}
      <Route path="/registre/:recordId" element={<RecordPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
