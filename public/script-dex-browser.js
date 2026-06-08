const LANG_STORAGE_KEY = 'champions-tool-ui-lang-v1';
const DEFAULT_TAB = 'all';

const I18N = {
  ja: {
    title: '図鑑',
    subtitle: 'ポケモン・わざ・特性・どうぐをひとつの検索窓で探す',
    searchPlaceholderAll: '全データから検索',
    searchPlaceholderPokemon: 'ポケモン名で検索',
    searchPlaceholderMove: 'わざ名で検索',
    searchPlaceholderAbility: 'とくせい名で検索',
    searchPlaceholderItem: 'どうぐ名で検索',
    tabAll: '全データ',
    tabPokemon: 'ポケモン',
    tabMove: 'わざ',
    tabAbility: 'とくせい',
    tabItem: 'どうぐ',
    tabLabelPokemon: 'ポケモン',
    tabLabelMove: 'わざ',
    tabLabelAbility: 'とくせい',
    tabLabelItem: 'どうぐ',
    count: '{count}件',
    countWithQuery: '「{query}」 {count}件',
    detail: '詳細',
    moveLearnedBy: '{count}匹が習得',
    abilityUsers: '{count}匹が所持',
    movePower: '威力 {value}',
    moveAccuracy: '命中 {value}',
    movePP: 'PP {value}',
    movePriority: '優先度 {value}',
    moveCategory: '{value}',
    moveStatus: '変化',
    movePhysical: '物理',
    moveSpecial: '特殊',
    type: 'タイプ',
    speedTier: '{value}族',
    itemMeta: '道具',
    emptyTitle: '検索語を入力してください',
    emptyBody: '上のタブを切り替えて、全データをまとめて検索できます。',
    resultsTitle: '検索結果',
    openHome: 'ホーム',
  },
  en: {
    title: 'Pokedex',
    subtitle: 'Search Pokemon, moves, abilities, and items from one box',
    searchPlaceholderAll: 'Search everything',
    searchPlaceholderPokemon: 'Search Pokemon',
    searchPlaceholderMove: 'Search moves',
    searchPlaceholderAbility: 'Search abilities',
    searchPlaceholderItem: 'Search items',
    tabAll: 'All',
    tabPokemon: 'Pokemon',
    tabMove: 'Moves',
    tabAbility: 'Abilities',
    tabItem: 'Items',
    tabLabelPokemon: 'Pokemon',
    tabLabelMove: 'Move',
    tabLabelAbility: 'Ability',
    tabLabelItem: 'Item',
    count: '{count} results',
    countWithQuery: '"{query}" {count} results',
    detail: 'Detail',
    moveLearnedBy: '{count} Pokemon learn it',
    abilityUsers: '{count} Pokemon have it',
    movePower: 'Power {value}',
    moveAccuracy: 'Accuracy {value}',
    movePP: 'PP {value}',
    movePriority: 'Priority {value}',
    moveCategory: '{value}',
    moveStatus: 'Status',
    movePhysical: 'Physical',
    moveSpecial: 'Special',
    type: 'Type',
    speedTier: 'Base {value}',
    itemMeta: 'Item',
    emptyTitle: 'Type a search term',
    emptyBody: 'Use tabs to search all data in one place.',
    resultsTitle: 'Search results',
    openHome: 'Home',
  },
};

const $ = id => document.getElementById(id);
const toId = text => String(text || '').toLowerCase().replace(/[^a-z0-9]/g, '');

function katakanaToHiragana(text) {
  return String(text || '').replace(/[\u30a1-\u30f6]/g, char => String.fromCharCode(char.charCodeAt(0) - 0x60));
}

function normalizeText(text) {
  return katakanaToHiragana(String(text || '').normalize('NFKC').toLowerCase());
}

const state = {
  lang: 'ja',
  data: null,
  speciesCsvMap: new Map(),
  moveCsvMap: new Map(),
  abilityCsvMap: new Map(),
  itemCsvMap: new Map(),
  query: '',
  activeTab: DEFAULT_TAB,
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

function parseParams() {
  const params = new URLSearchParams(window.location.search);
  const tab = params.get('tab');
  if (tab === 'all' || tab === 'pokemon' || tab === 'move' || tab === 'ability' || tab === 'item') state.activeTab = tab;
  state.query = params.get('q') || '';
}

function updateUrl() {
  const params = new URLSearchParams();
  if (state.activeTab && state.activeTab !== DEFAULT_TAB) params.set('tab', state.activeTab);
  if (state.query) params.set('q', state.query);
  const next = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ''}`;
  window.history.replaceState({}, '', next);
}

function buildSpeciesJapaneseMap(translations = {}) {
  state.speciesCsvMap = new Map();
  Object.entries(translations.species || {}).forEach(([id, entry]) => {
    const name = String(entry?.nameJa || '').trim();
    if (id && name && !state.speciesCsvMap.has(id)) state.speciesCsvMap.set(id, name);
  });
}

function buildMoveJapaneseMap(translations = {}) {
  state.moveCsvMap = new Map();
  Object.entries(translations.moves || {}).forEach(([id, entry]) => {
    const name = String(entry?.nameJa || '').trim();
    if (id && name && !state.moveCsvMap.has(id)) state.moveCsvMap.set(id, name);
  });
}

function buildAbilityJapaneseMap(translations = {}) {
  state.abilityCsvMap = new Map();
  Object.entries(translations.abilities || {}).forEach(([id, entry]) => {
    const name = String(entry?.nameJa || '').trim();
    if (id && name && !state.abilityCsvMap.has(id)) state.abilityCsvMap.set(id, name);
  });
}

function buildItemJapaneseMap(translations = {}) {
  state.itemCsvMap = new Map();
  Object.entries(translations.items || {}).forEach(([id, entry]) => {
    const name = String(entry?.nameJa || '').trim();
    if (id && name && !state.itemCsvMap.has(id)) state.itemCsvMap.set(id, name);
  });
}

function getItemIconHtml(item) {
  const spriteNum = Number.isFinite(Number(item?.spritenum)) ? Number(item.spritenum) : Number.isFinite(Number(item?.num)) ? Number(item.num) : null;
  if (spriteNum === null || spriteNum < 0) return '<div class="dex-item-icon">It</div>';
  const x = (spriteNum % 16) * 24;
  const y = Math.floor(spriteNum / 16) * 24;
  return `<div class="dex-item-icon"><span class="dex-item-icon-sprite" style="background-image:url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png);background-position:-${x}px -${y}px"></span></div>`;
}

function getSpeciesName(species) {
  if (state.lang === 'ja') return state.speciesCsvMap.get(species.id) || species.nameJa || species.name || species.id;
  return species.name || species.nameJa || species.id;
}

function getMoveName(move) {
  if (state.lang === 'ja') return state.moveCsvMap.get(move.id) || move.nameJa || move.name || move.id;
  return move.name || move.nameJa || move.id;
}

function getAbilityName(ability) {
  if (state.lang === 'ja') return state.abilityCsvMap.get(ability.id) || ability.nameJa || ability.name || ability.id;
  return ability.name || ability.nameJa || ability.id;
}

function getMoveDescription(move) {
  if (state.lang === 'ja') return move.shortDescJa || move.descJa || move.shortDesc || move.desc || '';
  return move.shortDesc || move.desc || '';
}

function getAbilityDescription(ability) {
  if (state.lang === 'ja') return ability.shortDescJa || ability.descJa || ability.shortDesc || ability.desc || '';
  return ability.shortDesc || ability.desc || '';
}

function getItemDescription(item) {
  if (state.lang === 'ja') return item.shortDescJa || item.descJa || item.shortDesc || item.desc || '';
  return item.shortDesc || item.desc || '';
}

function compareLocalizedText(left, right) {
  return normalizeText(left).localeCompare(normalizeText(right), 'ja');
}

function getSpeciesIconUrl(species) {
  return `https://play.pokemonshowdown.com/sprites/gen5/${species.spriteId || species.id}.png`;
}

function getMoveTypeIcon(type) {
  return `https://play.pokemonshowdown.com/sprites/types/${type}.png`;
}

function getPokemonHref(speciesId) {
  return `./pokedex-pokemon.html?species=${encodeURIComponent(speciesId)}&returnPath=${encodeURIComponent(window.location.pathname + window.location.search)}`;
}

function getMoveHref(moveId) {
  return `./pokedex-move.html?move=${encodeURIComponent(moveId)}&returnPath=${encodeURIComponent(window.location.pathname + window.location.search)}`;
}

function getAbilityHref(abilityId) {
  return `./pokedex-ability.html?ability=${encodeURIComponent(abilityId)}&returnPath=${encodeURIComponent(window.location.pathname + window.location.search)}`;
}

function getItemHref(itemId) {
  return `./pokedex-item.html?item=${encodeURIComponent(itemId)}&returnPath=${encodeURIComponent(window.location.pathname + window.location.search)}`;
}

function getItemName(item) {
  if (state.lang === 'ja') {
    const mapped = state.itemCsvMap.get(item.id);
    if (mapped) return mapped;
    if (item.nameJa && !/[A-Za-z]/.test(item.nameJa)) return item.nameJa;
    const megaStoneValue = typeof item.megaStone === 'string' ? item.megaStone : Object.values(item.megaStone || {})[0];
    const megaId = toId(megaStoneValue || '');
    if (megaId) {
      const baseId = megaId.replace(/mega[xyz]?$/, '');
      const allSpecies = [...(state.data?.species || []), ...(state.data?.megaSpecies || [])];
      const baseSpecies = allSpecies.find(entry => entry.id === baseId);
      const baseName = baseSpecies ? (state.speciesCsvMap.get(baseSpecies.id) || baseSpecies.nameJa || baseSpecies.name) : '';
      if (baseName) {
        const suffix = megaId.endsWith('megax') ? 'Ｘ' : (megaId.endsWith('megay') ? 'Ｙ' : (megaId.endsWith('megaz') ? 'Ｚ' : ''));
        return `${baseName}ナイト${suffix}`;
      }
    }
    return item.nameJa || item.name || item.id;
  }
  return item.name || item.nameJa || item.id;
}

function getMegaJapaneseAlias(species) {
  const id = String(species.id || '');
  if (!id.includes('mega')) return '';
  const baseId = id.replace(/mega[xyz]?$/i, '');
  const allSpecies = [...(state.data?.species || []), ...(state.data?.megaSpecies || [])];
  const baseSpecies = allSpecies.find(entry => entry.id === baseId);
  if (!baseSpecies) return '';
  const baseNameJa = baseSpecies.nameJa || state.speciesCsvMap.get(baseSpecies.id) || baseSpecies.name || '';
  const baseNameEn = baseSpecies.name || '';
  return `メガ${baseNameJa} メガ${baseNameEn}`;
}

function normalizePokemonSearch(species) {
  const typeText = (species.types || []).join(' ');
  const abilityText = Object.values(species.abilities || {}).join(' ');
  const nameText = `${getSpeciesName(species)} ${species.name || ''} ${species.nameJa || ''} ${species.baseSpecies || ''}`;
  const megaAlias = getMegaJapaneseAlias(species);
  return normalizeText(`${nameText} ${typeText} ${abilityText} ${megaAlias}`);
}

function normalizeMoveSearch(move) {
  return normalizeText([
    getMoveName(move),
    move.name || '',
    move.nameJa || '',
    move.type || '',
    move.category || '',
    getMoveDescription(move),
    move.shortDesc || '',
    move.desc || '',
    Object.keys(move.flags || {}).join(' '),
  ].join(' '));
}

function normalizeAbilitySearch(ability) {
  return normalizeText([getAbilityName(ability), ability.nameJa || '', getAbilityDescription(ability), ability.shortDesc || '', ability.desc || ''].join(' '));
}

function normalizeItemSearch(item) {
  return normalizeText([getItemName(item), item.name || '', item.nameJa || '', getItemDescription(item), item.shortDesc || '', item.desc || ''].join(' '));
}

function buildPokemonRows() {
  return [...(state.data?.species || []), ...(state.data?.megaSpecies || [])]
    .map(species => ({
      id: species.id,
      name: getSpeciesName(species),
      iconUrl: getSpeciesIconUrl(species),
      types: species.types || [],
      spe: Number(species.baseStats?.spe || 0),
      search: normalizePokemonSearch(species),
    }))
    .sort((left, right) => compareLocalizedText(left.name, right.name));
}

function buildMoveRows() {
  return (state.data?.moves || [])
    .map(move => ({
      id: move.id,
      name: getMoveName(move),
      type: move.type,
      category: move.category,
      basePower: move.basePower,
      accuracy: move.accuracy,
      pp: move.pp,
      priority: move.priority,
      shortDesc: getMoveDescription(move),
      search: normalizeMoveSearch(move),
    }))
    .sort((left, right) => compareLocalizedText(left.name, right.name));
}

function buildAbilityRows() {
  return (state.data?.abilities || [])
    .map(ability => ({
      id: ability.id,
      name: getAbilityName(ability),
      rating: ability.rating,
      shortDesc: getAbilityDescription(ability),
      search: normalizeAbilitySearch(ability),
    }))
    .sort((left, right) => compareLocalizedText(left.name, right.name));
}

function buildItemRows() {
  return (state.data?.items || [])
    .map(item => ({
      id: item.id,
      name: getItemName(item),
      shortDesc: getItemDescription(item),
      isBerry: Boolean(item.isBerry),
      search: normalizeItemSearch(item),
    }))
    .sort((left, right) => compareLocalizedText(left.name, right.name));
}

function getSelectedTabLabel() {
  if (state.activeTab === 'all') return t('tabAll');
  if (state.activeTab === 'move') return t('tabMove');
  if (state.activeTab === 'ability') return t('tabAbility');
  if (state.activeTab === 'item') return t('tabItem');
  return t('tabPokemon');
}

function getSearchPlaceholder() {
  if (state.activeTab === 'all') return t('searchPlaceholderAll');
  if (state.activeTab === 'move') return t('searchPlaceholderMove');
  if (state.activeTab === 'ability') return t('searchPlaceholderAbility');
  if (state.activeTab === 'item') return t('searchPlaceholderItem');
  return t('searchPlaceholderPokemon');
}

function getMoveCategoryLabel(category) {
  if (category === 'Physical') return t('movePhysical');
  if (category === 'Special') return t('moveSpecial');
  return t('moveStatus');
}

function formatAccuracy(value) {
  if (value === true) return '必中';
  if (value == null || value === '') return '-';
  return `${value}%`;
}

function getPokemonResults() {
  const query = normalizeText(state.query);
  return buildPokemonRows().filter(row => !query || row.search.includes(query));
}

function getMoveResults() {
  const query = normalizeText(state.query);
  return buildMoveRows().filter(row => !query || row.search.includes(query));
}

function getAbilityResults() {
  const query = normalizeText(state.query);
  return buildAbilityRows().filter(row => !query || row.search.includes(query));
}

function getItemResults() {
  const query = normalizeText(state.query);
  return buildItemRows().filter(row => !query || row.search.includes(query));
}

function getAllResults() {
  const query = normalizeText(state.query);

  const list = [];
  getPokemonResults().forEach(row => list.push({ kind: 'pokemon', ...row }));
  getMoveResults().forEach(row => list.push({ kind: 'move', ...row }));
  getAbilityResults().forEach(row => list.push({ kind: 'ability', ...row }));
  getItemResults().forEach(row => list.push({ kind: 'item', ...row }));

  return list.sort((left, right) => {
    const leftScore = scoreByQuery(left.name, query);
    const rightScore = scoreByQuery(right.name, query);
    if (leftScore !== rightScore) return leftScore - rightScore;
    if (left.kind !== right.kind) return left.kind.localeCompare(right.kind);
    return compareLocalizedText(left.name, right.name);
  });
}

function scoreByQuery(rowName, query) {
  if (!query) return 1;
  const normalizedName = normalizeText(rowName);
  if (normalizedName === query) return 0;
  if (normalizedName.startsWith(query)) return 1;
  return 2;
}

function renderEmptyState(container) {
  container.innerHTML = `
    <section class="card panel-card dex-empty-state">
      <div class="card-body text-center py-5">
        <div class="dex-empty-icon">⌕</div>
        <h2 class="h5 mb-2">${t('emptyTitle')}</h2>
        <p class="text-muted mb-0">${t('emptyBody')}</p>
      </div>
    </section>
  `;
}

function renderResultCard(iconHtml, titleHtml, metaHtml, snippetHtml, noteHtml, href) {
  return `
    <a class="dex-result-card text-decoration-none shadow-sm" href="${href}">
      <div class="dex-result-icon-wrap">${iconHtml}</div>
      <div class="dex-result-content">
        <div class="dex-result-title">${titleHtml}</div>
        ${metaHtml ? `<div class="dex-result-meta dex-meta-pills">${metaHtml}</div>` : ''}
        ${snippetHtml ? `<div class="dex-result-snippet">${snippetHtml}</div>` : ''}
        ${noteHtml ? `<div class="dex-result-note">${noteHtml}</div>` : ''}
      </div>
    </a>
  `;
}

function renderPokemonResults(container, rows) {
  container.innerHTML = rows.slice(0, 72).map(row => renderResultCard(
    `<img class="ps-pokemon-icon dex-result-icon" src="${row.iconUrl}" alt="" loading="lazy">`,
    row.name,
    (row.types || []).map(type => `<span class="badge text-bg-light dex-chip"><img class="dex-type-icon" src="${getMoveTypeIcon(type)}" alt="${type}" loading="lazy"></span>`).join(''),
    '',
    t('detail'),
    getPokemonHref(row.id),
  )).join('');

  if (!rows.length) renderEmptyState(container);
}

function renderMoveResults(container, rows) {
  container.innerHTML = rows.slice(0, 72).map(row => renderResultCard(
    `<span class="dex-move-icon-box"><img class="dex-type-icon dex-move-type-icon" src="${getMoveTypeIcon(row.type)}" alt="${row.type}" loading="lazy"></span>`,
    row.name,
    [
      `<span class="badge text-bg-light">${getMoveCategoryLabel(row.category)}</span>`,
      `<span class="badge text-bg-light mono">${t('movePower', { value: row.category === 'Status' || Number(row.basePower) === 0 ? '-' : row.basePower })}</span>`,
      `<span class="badge text-bg-light mono">${t('moveAccuracy', { value: formatAccuracy(row.accuracy) })}</span>`,
      `<span class="badge text-bg-light mono">${t('movePP', { value: row.pp ?? '-' })}</span>`,
    ].join(''),
    row.shortDesc || '',
    t('moveLearnedBy', { count: (state.data?.learnersByMoveId?.[row.id] || []).length }),
    getMoveHref(row.id),
  )).join('');

  if (!rows.length) renderEmptyState(container);
}

function renderAbilityResults(container, rows) {
  container.innerHTML = rows.slice(0, 72).map(row => renderResultCard(
    '<div class="dex-ability-icon">Ab</div>',
    row.name,
    `<span class="badge text-bg-light">${t('abilityUsers', { count: (state.data?.abilityUsersByAbilityId?.[row.id] || []).length })}</span>`,
    row.shortDesc || '',
    t('detail'),
    getAbilityHref(row.id),
  )).join('');

  if (!rows.length) renderEmptyState(container);
}

function renderItemResults(container, rows) {
  container.innerHTML = rows.slice(0, 72).map(row => renderResultCard(
    getItemIconHtml(row),
    row.name,
    [`<span class="badge text-bg-light">${t('itemMeta')}</span>`, row.isBerry ? '<span class="badge text-bg-light">Berry</span>' : ''].join(''),
    row.shortDesc || '',
    t('detail'),
    getItemHref(row.id),
  )).join('');

  if (!rows.length) renderEmptyState(container);
}

function renderAllResults(container, rows) {
  container.innerHTML = rows.slice(0, 120).map(row => {
    const href = row.kind === 'pokemon'
      ? getPokemonHref(row.id)
      : row.kind === 'move'
        ? getMoveHref(row.id)
        : row.kind === 'ability'
          ? getAbilityHref(row.id)
          : getItemHref(row.id);

    const kindLabel = row.kind === 'pokemon'
      ? t('tabLabelPokemon')
      : row.kind === 'move'
        ? t('tabLabelMove')
        : row.kind === 'ability'
          ? t('tabLabelAbility')
          : t('tabLabelItem');

    const icon = row.kind === 'pokemon'
      ? `<img class="ps-pokemon-icon dex-result-icon" src="${row.iconUrl}" alt="" loading="lazy">`
      : row.kind === 'move'
        ? `<span class="dex-move-icon-box"><img class="dex-type-icon dex-move-type-icon" src="${getMoveTypeIcon(row.type)}" alt="${row.type}" loading="lazy"></span>`
        : row.kind === 'ability'
          ? '<div class="dex-ability-icon">Ab</div>'
          : getItemIconHtml(row);

    const note = row.kind === 'pokemon'
      ? t('speedTier', { value: row.spe })
      : row.shortDesc || '';

    return renderResultCard(icon, row.name, `<span class="badge text-bg-light">${kindLabel}</span>`, note, t('detail'), href);
  }).join('');

  if (!rows.length) renderEmptyState(container);
}

function renderResults() {
  const container = $('dex-results');
  const countNode = $('dex-result-count');
  const titleNode = $('dex-results-title');
  const tabButtons = document.querySelectorAll('[data-tab]');
  const searchInput = $('dex-search');

  if (!container || !countNode) return;

  const rows = state.activeTab === 'all'
    ? getAllResults()
    : state.activeTab === 'move'
      ? getMoveResults()
      : state.activeTab === 'ability'
        ? getAbilityResults()
        : state.activeTab === 'item'
          ? getItemResults()
          : getPokemonResults();
  const query = state.query.trim();
  countNode.textContent = query ? t('countWithQuery', { query, count: rows.length }) : t('count', { count: rows.length });
  if (titleNode) titleNode.textContent = getSelectedTabLabel();
  if (searchInput) searchInput.setAttribute('placeholder', getSearchPlaceholder());
  tabButtons.forEach(button => button.classList.toggle('active', button.dataset.tab === state.activeTab));

  if (state.activeTab === 'move') {
    renderMoveResults(container, rows);
    return;
  }
  if (state.activeTab === 'ability') {
    renderAbilityResults(container, rows);
    return;
  }
  if (state.activeTab === 'item') {
    renderItemResults(container, rows);
    return;
  }
  if (state.activeTab === 'all') {
    renderAllResults(container, rows);
    return;
  }
  renderPokemonResults(container, rows);
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
  document.querySelectorAll('[data-lang]').forEach(button => {
    button.classList.toggle('active', button.dataset.lang === state.lang);
  });
}

function bindEvents() {
  const searchInput = $('dex-search');
  const clearButton = $('dex-search-clear');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      state.query = searchInput.value.trim();
      updateUrl();
      renderResults();
    });
  }

  if (clearButton && searchInput) {
    clearButton.addEventListener('click', () => {
      searchInput.value = '';
      state.query = '';
      updateUrl();
      renderResults();
      searchInput.focus();
    });
  }

  document.querySelectorAll('[data-tab]').forEach(button => {
    button.addEventListener('click', () => {
      state.activeTab = button.dataset.tab;
      updateUrl();
      renderResults();
      if (searchInput) searchInput.focus();
    });
  });

  document.querySelectorAll('[data-lang]').forEach(button => {
    button.addEventListener('click', () => {
      state.lang = button.dataset.lang;
      saveLang();
      applyI18n();
      renderResults();
    });
  });
}

async function initialize() {
  parseParams();
  loadLang();

  const [data, jaTranslations] = await Promise.all([
    fetchJson('/db/champions-calc-data.json'),
    fetchJson('/db/champions-ja-translations.json'),
  ]);

  state.data = {
    ...data,
    learnersByMoveId: buildLearnersByMoveId(data),
    abilityUsersByAbilityId: buildAbilityUsersByAbilityId(data),
  };
  buildSpeciesJapaneseMap(jaTranslations || {});
  buildMoveJapaneseMap(jaTranslations || {});
  buildAbilityJapaneseMap(jaTranslations || {});
  buildItemJapaneseMap(jaTranslations || {});

  const searchInput = $('dex-search');
  const tabButtons = document.querySelectorAll('[data-tab]');
  if (searchInput) searchInput.value = state.query;
  tabButtons.forEach(button => button.classList.toggle('active', button.dataset.tab === state.activeTab));

  applyI18n();
  bindEvents();
  renderResults();
}

function buildLearnersByMoveId(data) {
  const lookup = {};
  const speciesEntries = [...(data.species || []), ...(data.megaSpecies || [])];
  speciesEntries.forEach(species => {
    const moveIds = data.learnsetBySpeciesId?.[species.id] || [];
    moveIds.forEach(moveId => {
      if (!lookup[moveId]) lookup[moveId] = [];
      lookup[moveId].push(species.id);
    });
  });
  Object.values(lookup).forEach(list => list.sort());
  return lookup;
}

function buildAbilityUsersByAbilityId(data) {
  const lookup = {};
  [...(data.species || []), ...(data.megaSpecies || [])].forEach(species => {
    Object.values(species.abilities || {}).forEach(abilityName => {
      const abilityId = toId(abilityName);
      if (!abilityId) return;
      if (!lookup[abilityId]) lookup[abilityId] = [];
      lookup[abilityId].push(species.id);
    });
  });
  Object.values(lookup).forEach(list => list.sort());
  return lookup;
}

initialize().catch(error => {
  console.error(error);
  const container = $('dex-results');
  if (container) {
    container.innerHTML = `<div class="alert alert-danger mb-0">${error.message}</div>`;
  }
});
