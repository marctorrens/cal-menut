import { useEffect, useMemo, useRef, useState } from "react";
import {
  Archive,
  Building2,
  FileCog,
  House,
  Search,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

type Entry = {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  type: string;
};

const entries: Entry[] = [
  {
    title: "Masia",
    description: "Informació general de la finca i de l’edifici.",
    path: "/masia",
    icon: House,
    type: "Àrea",
  },
  {
    title: "Infraestructures",
    description: "Electricitat, aigua, xarxa, climatització i exterior.",
    path: "/infraestructures",
    icon: Building2,
    type: "Àrea",
  },
  {
    title: "Equips",
    description: "Fitxes dels equips i dispositius instal·lats.",
    path: "/equips",
    icon: Wrench,
    type: "Àrea",
  },
  {
    title: "Gestions",
    description: "Proveïdors, contractes, assegurances i administració.",
    path: "/gestions",
    icon: FileCog,
    type: "Àrea",
  },
  {
    title: "Arxiu",
    description: "Plànols, llicències, projectes i documents generals.",
    path: "/arxiu",
    icon: Archive,
    type: "Àrea",
  },
];

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

  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("ca");
    if (!normalized) return entries;
    return entries.filter((entry) =>
      `${entry.title} ${entry.description} ${entry.type}`
        .toLocaleLowerCase("ca")
        .includes(normalized),
    );
  }, [query]);

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
            results.map((entry) => {
              const Icon = entry.icon;
              return (
                <button
                  className="search-result"
                  key={entry.path}
                  onClick={() => {
                    navigate(entry.path);
                    onClose();
                  }}
                  type="button"
                >
                  <Icon aria-hidden="true" size={20} />
                  <span>
                    <strong>{entry.title}</strong>
                    <small>{entry.type}</small>
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
        {entries.map((entry) => {
          const Icon = entry.icon;
          return (
            <Link className="entry-card" key={entry.path} to={entry.path}>
              <span className="entry-icon"><Icon size={30} strokeWidth={1.7} /></span>
              <span>
                <strong>{entry.title}</strong>
                <small>{entry.description}</small>
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

function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="placeholder-page">
      <Link className="back-link" to="/">← Cal Menut</Link>
      <p className="eyebrow">Àrea</p>
      <h1>{title}</h1>
      <p>Informació pendent de documentar.</p>
    </main>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {entries.map((entry) => (
        <Route key={entry.path} path={entry.path} element={<PlaceholderPage title={entry.title} />} />
      ))}
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
