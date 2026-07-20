import packageInfo from '../package.json' with { type: 'json' };

type Section = {
  title: string;
  description: string;
  href: string;
  icon: string;
};

const buildDate = new Date().toISOString();

const icons = {
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z"/>',
  building: '<rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/>',
  tractor: '<path d="M3 4h9l1 7"/><path d="M4 11V4"/><path d="M8 11V8h7l4 3"/><circle cx="7" cy="17" r="4"/><circle cx="7" cy="17" r="1"/><circle cx="18" cy="18" r="3"/><path d="M10 17h5"/>',
  clipboard: '<rect width="16" height="18" x="4" y="4" rx="2"/><path d="M9 2h6a2 2 0 0 1 2 2v2H7V4a2 2 0 0 1 2-2Z"/><path d="M9 12h6M9 16h6"/>',
  archive: '<rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/>',
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
};

const sections: Section[] = [
  { title: 'Masia', description: 'Espai central de la casa, els seus usos i la vida quotidiana de Cal Menut.', href: '#masia', icon: icons.home },
  { title: 'Infraestructures', description: 'Àmbit per ordenar edificis, espais, subministraments i elements físics de la finca.', href: '#infraestructures', icon: icons.building },
  { title: 'Equips', description: 'Referència per a eines, maquinària i materials que donen suport a les feines.', href: '#equips', icon: icons.tractor },
  { title: 'Gestions', description: 'Punt d’entrada per a tràmits, tasques administratives i seguiment documental.', href: '#gestions', icon: icons.clipboard },
  { title: 'Arxiu', description: 'Lloc per conservar documents, memòria, criteris i informació històrica.', href: '#arxiu', icon: icons.archive },
];

const searchItems = sections.map((section) => ({ ...section, keywords: `${section.title} ${section.description}`.toLocaleLowerCase('ca') }));
const root = document.getElementById('root');

function icon(path: string, size = 56) {
  return `<svg aria-hidden="true" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}

function formatBuildDate(dateValue: string) {
  return new Intl.DateTimeFormat('ca', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(dateValue));
}

function renderApp() {
  if (!root) return;

  root.innerHTML = `
    <div class="app-shell">
      <header class="hero" aria-labelledby="page-title">
        <div>
          <p class="eyebrow">Cal Menut</p>
          <h1 id="page-title">Una entrada clara per organitzar la masia.</h1>
          <p class="hero-text">Accedeix als espais principals amb una navegació senzilla, càlida i pensada per créixer amb ordre.</p>
        </div>
        <button class="search-button" type="button">${icon(icons.search, 22)} Cerca</button>
      </header>
      <main aria-label="Seccions principals">
        <section class="entry-grid">
          ${sections.map((section) => `
            <a class="entry-card" href="${section.href}" id="${section.href.slice(1)}">
              <span class="icon-wrap">${icon(section.icon)}</span>
              <span><span class="entry-title">${section.title}</span><span class="entry-description">${section.description}</span></span>
            </a>`).join('')}
        </section>
      </main>
    </div>
    <footer class="site-footer"><span>Versió ${packageInfo.version}</span><span>Desplegament: ${formatBuildDate(buildDate)}</span></footer>
  `;

  root.querySelector('.search-button')?.addEventListener('click', openSearch);
}

function openSearch() {
  const previous = document.activeElement as HTMLElement | null;
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';
  backdrop.innerHTML = `
    <section aria-labelledby="search-title" aria-modal="true" class="search-modal" role="dialog">
      <div class="modal-header"><div><p class="eyebrow">Cerca local</p><h2 id="search-title">Cerca dins les seccions</h2></div><button aria-label="Tanca la cerca" class="icon-button" type="button">${icon(icons.close, 24)}</button></div>
      <label class="search-label" for="site-search">Escriu una paraula clau</label>
      <input autocomplete="off" id="site-search" placeholder="Masia, arxiu, equips..." type="search" />
      <div aria-live="polite" class="result-count"></div><ul class="result-list"></ul>
    </section>`;
  document.body.append(backdrop);
  document.body.classList.add('modal-open');

  const input = backdrop.querySelector<HTMLInputElement>('#site-search')!;
  const list = backdrop.querySelector<HTMLUListElement>('.result-list')!;
  const count = backdrop.querySelector<HTMLDivElement>('.result-count')!;

  const close = () => { backdrop.remove(); document.body.classList.remove('modal-open'); previous?.focus(); };
  const renderResults = () => {
    const q = input.value.trim().toLocaleLowerCase('ca');
    const results = q ? searchItems.filter((item) => item.keywords.includes(q)) : searchItems;
    count.textContent = results.length === 1 ? '1 resultat' : `${results.length} resultats`;
    list.innerHTML = results.map((item) => `<li><a href="${item.href}"><strong>${item.title}</strong><span>${item.description}</span></a></li>`).join('');
    list.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
  };

  backdrop.addEventListener('mousedown', (event) => { if (event.target === backdrop) close(); });
  backdrop.querySelector('.icon-button')?.addEventListener('click', close);
  document.addEventListener('keydown', function onKey(event) {
    if (!document.body.contains(backdrop)) return document.removeEventListener('keydown', onKey);
    if (event.key === 'Escape') close();
  });
  input.addEventListener('input', renderResults);
  renderResults();
  input.focus();
}

renderApp();
