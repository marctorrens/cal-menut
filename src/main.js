import './styles.css';

const APP_VERSION = '0.1.0';
const DEPLOYMENT_DATE = __BUILD_DATE__;

const sections = [
  ['Masia', 'masia', '🏡', 'Espai central per documentar la masia, els seus espais i la vida quotidiana.'],
  ['Infraestructures', 'infraestructures', '🏗️', 'Inventari de subministraments, manteniment i recursos tècnics de la finca.'],
  ['Equips', 'equips', '👥', 'Seguiment dels equips, responsables i col·laboradors vinculats al projecte.'],
  ['Gestions', 'gestions', '⚙️', 'Placeholder per a tràmits, calendaris, tasques i operativa administrativa.'],
  ['Arxiu', 'arxiu', '🗄️', 'Accés inicial a documents, fotografies i materials històrics catalogats.'],
].map(([title, slug, icon, summary]) => ({ title, slug, icon, summary }));

function formattedBuildDate() {
  return new Intl.DateTimeFormat('ca-ES', { dateStyle: 'long', timeStyle: 'short' }).format(new Date(DEPLOYMENT_DATE));
}

function go(slug) {
  window.history.pushState({}, '', slug ? `/${slug}` : '/');
  render();
}

function renderPlaceholder(section) {
  document.querySelector('#root').innerHTML = `
    <main class="shell">
      <button class="back" type="button">← Tornar a l'inici</button>
      <section class="placeholder-page">
        <span class="page-icon" aria-hidden="true">${section.icon}</span>
        <p class="eyebrow">Pàgina placeholder</p>
        <h1>${section.title}</h1>
        <p>${section.summary}</p>
        <p>Aquesta ruta està preparada per rebre el contingut i els fluxos aprovats en Milestone 1.</p>
      </section>
    </main>`;
  document.querySelector('.back').addEventListener('click', () => go(''));
}

function renderHome() {
  document.querySelector('#root').innerHTML = `
    <main class="shell">
      <section class="hero">
        <p class="eyebrow">Cal Menut · v${APP_VERSION}</p>
        <h1>Centre operatiu digital de Cal Menut</h1>
        <p>Una base inicial per ordenar masia, infraestructures, equips, gestions i arxiu.</p>
        <p class="deployment">Desplegat: ${formattedBuildDate()}</p>
      </section>
      <label class="search-box"><span aria-hidden="true">🔎</span><input id="search" placeholder="Cerca seccions..." /></label>
      <section class="cards" aria-label="Seccions principals">${sections.map(cardTemplate).join('')}</section>
      <section class="results" aria-label="Resultats de cerca"><h2>Resultats</h2><div id="results"></div></section>
    </main>`;
  document.querySelectorAll('[data-route]').forEach((item) => item.addEventListener('click', () => go(item.dataset.route)));
  const search = document.querySelector('#search');
  const results = document.querySelector('#results');
  const updateResults = () => {
    const needle = search.value.trim().toLowerCase();
    const matches = sections.filter((section) => `${section.title} ${section.summary}`.toLowerCase().includes(needle));
    results.innerHTML = matches.map(resultTemplate).join('') || '<p>No hi ha resultats.</p>';
    results.querySelectorAll('[data-route]').forEach((item) => item.addEventListener('click', () => go(item.dataset.route)));
  };
  search.addEventListener('input', updateResults);
  updateResults();
}

function cardTemplate(section) {
  return `<button class="card" type="button" data-route="${section.slug}"><span class="card-icon" aria-hidden="true">${section.icon}</span><span>${section.title}</span><small>${section.summary}</small></button>`;
}

function resultTemplate(section) {
  return `<button type="button" data-route="${section.slug}"><strong>${section.title}</strong><span>${section.summary}</span></button>`;
}

function render() {
  const slug = window.location.pathname.replace(/^\//, '');
  const section = sections.find((item) => item.slug === slug);
  section ? renderPlaceholder(section) : renderHome();
}

window.addEventListener('popstate', render);
render();
