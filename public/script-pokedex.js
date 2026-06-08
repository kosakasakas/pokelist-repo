const STORAGE_KEY = 'champions-damage-calc-box-party-v1';
const SPEED_ADJUST_REQUEST_KEY = 'champions-speed-adjust-request-v1';
const LANG_STORAGE_KEY = 'champions-tool-ui-lang-v1';

const I18N = {
  ja: {
    title: '図鑑',
    subtitle: 'Pokemon browser by Showdown data',
    back: '戻る',
    search: '検索',
    searchPlaceholder: 'ポケモン名で検索',
    filter: '表示',
    all: 'すべて',
    baseOnly: '基本形のみ',
    addToBox: 'ボックス追加',
    openDetail: '詳細',
    setTarget: '調整対象',
    count: '{count}件',
    speedTier: '{value}族',
  },
  en: {
    title: 'Pokedex',
    subtitle: 'Pokemon browser by Showdown data',
    back: 'Back',
    search: 'Search',
    searchPlaceholder: 'Filter by Pokemon name',
    filter: 'View',
    all: 'All',
    baseOnly: 'Base forms',
    addToBox: 'Add to box',
    openDetail: 'Detail',
    setTarget: 'Set target',
    count: '{count} entries',
    speedTier: 'Base {value}',
  },
};

const $ = id => document.getElementById(id);
const toId = text => String(text || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const normalizeText = text => String(text || '').normalize('NFKC').toLowerCase();

const state = {
  lang: 'ja',
  mode: 'browse',
  returnPath: './speed-adjust.html',
  storage: { box: [], parties: [], calcLinks: { attacker: null, defender: null } },
  data: null,
  speciesNameJaById: new Map(),
  rows: [],
  query: '',
  filter: 'all',
  selectedSpeciesId: '',
};

function t(key, vars = {}) {
  let text = I18N[state.lang]?.[key] || I18N.ja[key] || key;
  Object.entries(vars).forEach(([name, value]) => {
    text = text.replace(`{${name}}`, String(value));
  });
  return text;
}

function parseCsvLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"') {
      if (inQuotes && line[index + 1] === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
      continue;
    }
    current += char;
  }
  values.push(current);
  return values;
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Failed to load: ${url}`);
  return response.json();
}

async function fetchCsvRecords(url) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new Error(`Failed to load CSV: ${url}`);
  const text = (await response.text()).replace(/^\uFEFF/, '');
  const lines = text.split(/\r?\n/).filter(Boolean);
  const headers = parseCsvLine(lines[0] || '');
  return lines.slice(1).map(line => {
    const values = parseCsvLine(line);
    const record = {};
    headers.forEach((header, index) => {
      record[header] = values[index] || '';
    });
    return record;
  });
}

function loadLang() {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'ja' || saved === 'en') state.lang = saved;
  } catch (_error) {
    // ignore
  }
}

function saveLang() {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, state.lang);
  } catch (_error) {
    // ignore
  }
}

function loadStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state.storage = JSON.parse(raw);
  } catch (_error) {
    // ignore
  }
}

function saveStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.storage));
}

function setupSpeciesJapaneseMap(records) {
  state.speciesNameJaById = new Map();
  records.forEach(record => {
    const showdownId = toId(record.ShowdownKey || '');
    const nameJa = String(record['名前(フォルム)'] || record['名前'] || '').trim();
    if (!showdownId || !nameJa) return;
    if (!state.speciesNameJaById.has(showdownId)) state.speciesNameJaById.set(showdownId, nameJa);
  });
}

function getSpeciesName(species) {
  if (state.lang === 'ja') return state.speciesNameJaById.get(species.id) || species.nameJa || species.name;
  return species.name || species.nameJa || species.id;
}

function getSpeciesIconUrl(species) {
  return `https://play.pokemonshowdown.com/sprites/gen5/${species.spriteId || species.id}.png`;
}

function buildRows() {
  state.rows = (state.data?.species || []).map(species => ({
    speciesId: species.id,
    baseSpeciesId: toId(species.baseSpecies || species.name),
    iconUrl: getSpeciesIconUrl(species),
    spe: Number(species.baseStats?.spe || 0),
    nameJa: state.speciesNameJaById.get(species.id) || species.nameJa || species.name,
    nameEn: species.name || species.nameJa || species.id,
    hasForme: Boolean(species.forme),
    search: normalizeText(`${state.speciesNameJaById.get(species.id) || ''} ${species.name || ''} ${species.nameJa || ''}`),
  }));
}

function openDetail(speciesId) {
  const returnPath = encodeURIComponent(window.location.pathname + window.location.search);
  window.location.href = `./pokedex-pokemon.html?species=${encodeURIComponent(speciesId)}&returnPath=${returnPath}`;
}

function filteredRows() {
  const query = normalizeText(state.query || '');
  return state.rows.filter(row => {
    if (state.filter === 'base' && row.hasForme) return false;
    if (query && !row.search.includes(query)) return false;
    return true;
  });
}

function addSpeciesToBox(speciesId) {
  const record = {
    id: `box-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    speciesId,
    nickname: '',
    nature: 'hardy',
    megaEnabled: false,
    abilityId: '',
    itemId: '',
    evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    ranks: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    ivTotal: 186,
    notes: '',
    moveIds: [],
    calcHistory: [],
  };
  if (!Array.isArray(state.storage.box)) state.storage.box = [];
  state.storage.box.unshift(record);
  saveStorage();
}

function setAsSpeedTarget(speciesId) {
  localStorage.setItem(SPEED_ADJUST_REQUEST_KEY, JSON.stringify({
    selectedSpeciesId: speciesId,
    returnPath: './speed-adjust.html',
  }));
  window.location.href = './speed-adjust.html';
}

function renderGrid() {
  const grid = $('dex-grid');
  if (!grid) return;

  const rows = filteredRows();
  grid.innerHTML = rows.map(row => `
    <article class="dex-card ${state.selectedSpeciesId === row.speciesId ? 'dex-highlight' : ''}" data-species-id="${row.speciesId}">
      <button class="dex-icon-wrap dex-open-detail" type="button" data-species-id="${row.speciesId}"><img class="ps-pokemon-icon" src="${row.iconUrl}" alt="" loading="lazy"></button>
      <div class="dex-name">${state.lang === 'ja' ? row.nameJa : row.nameEn}</div>
      <div class="dex-meta mono">${t('speedTier', { value: row.spe })}</div>
      <div class="dex-actions">
        <button class="btn btn-outline-primary btn-sm dex-open-detail" type="button" data-species-id="${row.speciesId}">${t('openDetail')}</button>
        <button class="btn btn-outline-secondary btn-sm dex-add-box" type="button" data-species-id="${row.speciesId}">${t('addToBox')}</button>
        ${state.mode === 'select-speed' ? `<button class="btn btn-primary btn-sm dex-set-target" type="button" data-species-id="${row.speciesId}">${t('setTarget')}</button>` : ''}
      </div>
    </article>
  `).join('');

  const countNode = $('dex-count');
  if (countNode) countNode.textContent = t('count', { count: rows.length });

  grid.querySelectorAll('.dex-add-box').forEach(button => {
    button.addEventListener('click', () => addSpeciesToBox(button.dataset.speciesId));
  });

  grid.querySelectorAll('.dex-set-target').forEach(button => {
    button.addEventListener('click', () => setAsSpeedTarget(button.dataset.speciesId));
  });

  grid.querySelectorAll('.dex-open-detail').forEach(button => {
    button.addEventListener('click', () => openDetail(button.dataset.speciesId));
  });

  if (state.selectedSpeciesId) {
    const target = grid.querySelector(`[data-species-id="${state.selectedSpeciesId}"]`);
    if (target) target.scrollIntoView({ block: 'center' });
  }
}

function applyI18n() {
  document.documentElement.lang = state.lang;

  document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.getAttribute('data-i18n');
    if (key && I18N[state.lang][key]) node.textContent = I18N[state.lang][key];
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(node => {
    const key = node.getAttribute('data-i18n-placeholder');
    node.setAttribute('placeholder', t(key));
  });

  document.querySelectorAll('#lang-tabs [data-lang]').forEach(button => {
    button.classList.toggle('active', button.dataset.lang === state.lang);
  });

  const filter = $('dex-filter');
  if (filter) {
    const all = filter.querySelector('option[value="all"]');
    const base = filter.querySelector('option[value="base"]');
    if (all) all.textContent = t('all');
    if (base) base.textContent = t('baseOnly');
  }
}

function bindEvents() {
  const search = $('dex-search');
  if (search) {
    search.addEventListener('input', () => {
      state.query = search.value.trim();
      renderGrid();
    });
  }

  const filter = $('dex-filter');
  if (filter) {
    filter.addEventListener('change', () => {
      state.filter = filter.value;
      renderGrid();
    });
  }

  document.querySelectorAll('#lang-tabs [data-lang]').forEach(button => {
    button.addEventListener('click', () => {
      state.lang = button.dataset.lang;
      saveLang();
      applyI18n();
      renderGrid();
    });
  });
}

function parseParams() {
  const params = new URLSearchParams(window.location.search);
  state.mode = params.get('mode') || 'browse';
  state.selectedSpeciesId = params.get('species') || '';
  const returnPath = params.get('returnPath');
  if (returnPath) state.returnPath = returnPath;
}

async function initialize() {
  parseParams();
  loadLang();
  loadStorage();

  const data = await fetchJson('./db/champions-calc-data.json');

  state.data = data;
  buildRows();
  applyI18n();

  const back = $('pokedex-back');
  if (back) back.href = state.returnPath;

  bindEvents();
  renderGrid();
}

initialize().catch(error => {
  console.error(error);
});
