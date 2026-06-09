const LANG_STORAGE_KEY = 'champions-tool-ui-lang-v1';
const DEFAULT_TAB = 'all';

const I18N = {
  ja: {
    title: '図鑑',
    subtitle: 'ポケモン・わざ・特性・どうぐをひとつの検索窓で探す',
    searchSectionTitle: '図鑑検索',
    rankingSectionTitle: '種族値ランキング',
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
    rankingTitle: '種族値ランキング',
    rankingTotal: '合計',
    rankingHp: 'HP',
    rankingAtk: 'こうげき',
    rankingDef: 'ぼうぎょ',
    rankingSpa: 'とくこう',
    rankingSpd: 'とくぼう',
    rankingSpe: 'すばやさ',
    typeFilter: 'タイプ: {type}',
    loadMore: 'もっと見る',
    sortDesc: '高い順',
    sortAsc: '低い順',
    baseStatsMini: 'H{hp} A{atk} B{def} C{spa} D{spd} S{spe}',
    noRankingItems: '対象データがありません。',
  },
  en: {
    title: 'Pokedex',
    subtitle: 'Search Pokemon, moves, abilities, and items from one box',
    searchSectionTitle: 'Dex Search',
    rankingSectionTitle: 'Base Stat Ranking',
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
    rankingTitle: 'Base Stat Ranking',
    rankingTotal: 'Total',
    rankingHp: 'HP',
    rankingAtk: 'Attack',
    rankingDef: 'Defense',
    rankingSpa: 'Sp. Atk',
    rankingSpd: 'Sp. Def',
    rankingSpe: 'Speed',
    typeFilter: 'Type: {type}',
    loadMore: 'Load more',
    sortDesc: 'Highest first',
    sortAsc: 'Lowest first',
    baseStatsMini: 'H{hp} A{atk} B{def} C{spa} D{spd} S{spe}',
    noRankingItems: 'No ranking entries.',
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
  typeFilter: '',
  rankingStat: 'total',
  rankingSort: 'desc',
  rankingLimit: 30,
};

const transitions = window.pokeToolsTransitions || {
  swap(_target, render) {
    render();
  },
  pageReady() {},
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
  state.typeFilter = params.get('type') || '';
  const rankingStat = params.get('ranking');
  if (['total', 'hp', 'atk', 'def', 'spa', 'spd', 'spe'].includes(rankingStat || '')) state.rankingStat = rankingStat;
  const rankingSort = params.get('sort');
  if (['desc', 'asc'].includes(rankingSort || '')) state.rankingSort = rankingSort;
}

function updateUrl() {
  const params = new URLSearchParams();
  if (state.activeTab && state.activeTab !== DEFAULT_TAB) params.set('tab', state.activeTab);
  if (state.query) params.set('q', state.query);
  if (state.activeTab === 'pokemon' && state.typeFilter) params.set('type', state.typeFilter);
  if (state.rankingStat !== 'total') params.set('ranking', state.rankingStat);
  if (state.rankingSort !== 'desc') params.set('sort', state.rankingSort);
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
      baseStats: {
        hp: Number(species.baseStats?.hp || 0),
        atk: Number(species.baseStats?.atk || 0),
        def: Number(species.baseStats?.def || 0),
        spa: Number(species.baseStats?.spa || 0),
        spd: Number(species.baseStats?.spd || 0),
        spe: Number(species.baseStats?.spe || 0),
      },
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

function getBaseStatsMiniText(stats = {}) {
  return t('baseStatsMini', {
    hp: Number(stats.hp || 0),
    atk: Number(stats.atk || 0),
    def: Number(stats.def || 0),
    spa: Number(stats.spa || 0),
    spd: Number(stats.spd || 0),
    spe: Number(stats.spe || 0),
  });
}

function getPokemonResults() {
  const query = normalizeText(state.query);
  const normalizedType = normalizeText(state.typeFilter);
  return buildPokemonRows().filter(row => {
    const typeMatch = !normalizedType || (row.types || []).some(type => normalizeText(type) === normalizedType);
    const queryMatch = !query || row.search.includes(query);
    return typeMatch && queryMatch;
  });
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

function renderSearchEmpty(container) {
  container.innerHTML = '';
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
    `<span class="mono">${getBaseStatsMiniText(row.baseStats)}</span>`,
    '',
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
    '',
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
    '',
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
      ? getBaseStatsMiniText(row.baseStats)
      : row.shortDesc || '';

    return renderResultCard(icon, row.name, `<span class="badge text-bg-light">${kindLabel}</span>`, note, '', href);
  }).join('');

  if (!rows.length) renderEmptyState(container);
}

function getRankingRows(statKey) {
  const rows = buildPokemonRows();
  const scoreOf = row => {
    if (statKey === 'total') {
      const stats = row.baseStats || {};
      return Number(stats.hp || 0) + Number(stats.atk || 0) + Number(stats.def || 0)
        + Number(stats.spa || 0) + Number(stats.spd || 0) + Number(stats.spe || 0);
    }
    return Number(row.baseStats?.[statKey] || 0);
  };
  const enriched = rows
    .filter(row => {
      if (state.activeTab !== 'pokemon' || !state.typeFilter) return true;
      const normalizedType = normalizeText(state.typeFilter);
      return (row.types || []).some(type => normalizeText(type) === normalizedType);
    })
    .map(row => ({ ...row, score: scoreOf(row) }));
  const desc = state.rankingSort !== 'asc';
  return enriched.sort((left, right) => {
    const diff = desc ? right.score - left.score : left.score - right.score;
    if (diff !== 0) return diff;
    return compareLocalizedText(left.name, right.name);
  });
}

function addTieRanks(rows) {
  let lastScore = null;
  let currentRank = 0;
  return rows.map((row, index) => {
    if (lastScore === null || row.score !== lastScore) {
      currentRank = index + 1;
      lastScore = row.score;
    }
    return { ...row, rank: currentRank };
  });
}

function renderRankingPanel(container) {
  const rankingTabs = [
    { key: 'total', label: t('rankingTotal') },
    { key: 'hp', label: t('rankingHp') },
    { key: 'atk', label: t('rankingAtk') },
    { key: 'def', label: t('rankingDef') },
    { key: 'spa', label: t('rankingSpa') },
    { key: 'spd', label: t('rankingSpd') },
    { key: 'spe', label: t('rankingSpe') },
  ];
  const rankedRows = getRankingRows(state.rankingStat);
  const rows = addTieRanks(rankedRows).slice(0, state.rankingLimit);
  const selectedLabel = rankingTabs.find(tab => tab.key === state.rankingStat)?.label || t('rankingTotal');
  const hasMore = rankedRows.length > state.rankingLimit;
  container.innerHTML = `
    <section class="dex-ranking-panel">
      <div class="d-flex justify-content-between align-items-center gap-2 mb-2">
        <ul class="nav nav-tabs dex-tabs dex-ranking-tabs" role="tablist" aria-label="ranking-stats">
          ${rankingTabs.map(tab => `<li class="nav-item" role="presentation"><button type="button" class="nav-link ${tab.key === state.rankingStat ? 'active' : ''}" data-ranking-tab="${tab.key}">${tab.label}</button></li>`).join('')}
        </ul>
        <div class="small text-muted">${rankedRows.length}件</div>
      </div>
      <div class="dex-results">
          ${rows.length ? rows.map(row => renderResultCard(
            `<img class="ps-pokemon-icon dex-result-icon" src="${row.iconUrl}" alt="" loading="lazy">`,
            `${row.rank}位 ${row.name}`,
            `<span class="badge text-bg-light mono">${selectedLabel}: ${row.score}</span>`,
            (row.types || []).map(type => `<span class="badge text-bg-light dex-chip"><img class="dex-type-icon" src="${getMoveTypeIcon(type)}" alt="${type}" loading="lazy"></span>`).join(''),
            `<span class="mono">${getBaseStatsMiniText(row.baseStats)}</span>`,
            getPokemonHref(row.id),
          )).join('') : `<p class="text-muted mb-0">${t('noRankingItems')}</p>`}
      </div>
    </section>
  `;
  container.querySelectorAll('[data-ranking-tab]').forEach(button => {
    button.addEventListener('click', () => {
      state.rankingStat = button.dataset.rankingTab || 'total';
      state.rankingLimit = 30;
      updateUrl();
      renderResults();
    });
  });

  const moreButton = $('dex-ranking-more');
  if (moreButton) {
    moreButton.hidden = !hasMore;
    moreButton.disabled = !hasMore;
  }
}

function renderResults() {
  const rankingContainer = $('dex-results');
  const searchContainer = $('dex-search-results');
  const countNode = $('dex-result-count');
  const titleNode = $('dex-results-title');
  const tabButtons = document.querySelectorAll('[data-tab]');
  const searchInput = $('dex-search');

  if (!rankingContainer || !searchContainer || !countNode) return;

  const query = state.query.trim();
  if (titleNode) {
    const label = titleNode.querySelector('span');
    if (label) {
      label.textContent = t('rankingSectionTitle');
    } else {
      titleNode.textContent = t('rankingSectionTitle');
    }
  }
  if (searchInput) searchInput.setAttribute('placeholder', getSearchPlaceholder());
  tabButtons.forEach(button => button.classList.toggle('active', button.dataset.tab === state.activeTab));

  const rankingMoreButton = $('dex-ranking-more');
  const rankingSortSelect = $('dex-ranking-sort');
  if (rankingSortSelect) rankingSortSelect.disabled = false;

  if (!query) {
    countNode.textContent = '-';
    transitions.swap(searchContainer, () => renderSearchEmpty(searchContainer));
  } else {
    const suggestionRows = state.activeTab === 'all'
      ? getAllResults()
      : state.activeTab === 'move'
        ? getMoveResults()
        : state.activeTab === 'ability'
          ? getAbilityResults()
          : state.activeTab === 'item'
            ? getItemResults()
            : getPokemonResults();
    countNode.textContent = t('countWithQuery', { query, count: suggestionRows.length });
    transitions.swap(searchContainer, () => {
      if (state.activeTab === 'all') {
        renderAllResults(searchContainer, suggestionRows);
      } else if (state.activeTab === 'move') {
        renderMoveResults(searchContainer, suggestionRows);
      } else if (state.activeTab === 'ability') {
        renderAbilityResults(searchContainer, suggestionRows);
      } else if (state.activeTab === 'item') {
        renderItemResults(searchContainer, suggestionRows);
      } else {
        renderPokemonResults(searchContainer, suggestionRows);
      }
    });
  }

  transitions.swap(rankingContainer, () => renderRankingPanel(rankingContainer));
}

function applyI18n() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.getAttribute('data-i18n');
    if (!key || !I18N[state.lang][key]) return;
    if (node.matches('option')) {
      node.textContent = I18N[state.lang][key];
      return;
    }
    const label = node.querySelector('span');
    if (label) {
      label.textContent = I18N[state.lang][key];
      return;
    }
    node.textContent = I18N[state.lang][key];
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
      state.rankingLimit = 30;
      updateUrl();
      renderResults();
    });
  }

  if (clearButton && searchInput) {
    clearButton.addEventListener('click', () => {
      transitions.runWithButtonLoading(clearButton, () => {
        searchInput.value = '';
        state.query = '';
        state.rankingLimit = 30;
        updateUrl();
        renderResults();
        searchInput.focus();
      });
    });
  }

  document.querySelectorAll('[data-tab]').forEach(button => {
    button.addEventListener('click', () => {
      transitions.runWithButtonLoading(button, () => {
        state.activeTab = button.dataset.tab;
        if (state.activeTab !== 'pokemon') state.typeFilter = '';
        state.rankingLimit = 30;
        updateUrl();
        renderResults();
        if (searchInput) searchInput.focus();
      });
    });
  });

  const rankingSort = $('dex-ranking-sort');
  if (rankingSort) {
    rankingSort.addEventListener('change', () => {
      transitions.runWithButtonLoading(rankingSort, () => {
        state.rankingSort = rankingSort.value || 'desc';
        state.rankingLimit = 30;
        updateUrl();
        renderResults();
      });
    });
  }

  const rankingMore = $('dex-ranking-more');
  if (rankingMore) {
    rankingMore.addEventListener('click', () => {
      transitions.runWithButtonLoading(rankingMore, () => {
        state.rankingLimit += 30;
        renderResults();
      });
    });
  }

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
    fetchJson('./db/champions-calc-data.json'),
    fetchJson('./db/champions-ja-translations.json'),
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
  const rankingSort = $('dex-ranking-sort');
  const tabButtons = document.querySelectorAll('[data-tab]');
  if (searchInput) searchInput.value = state.query;
  if (rankingSort) rankingSort.value = state.rankingSort;
  tabButtons.forEach(button => button.classList.toggle('active', button.dataset.tab === state.activeTab));

  applyI18n();
  bindEvents();
  renderResults();
  transitions.pageReady();
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
