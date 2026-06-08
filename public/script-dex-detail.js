const STORAGE_KEY = 'champions-damage-calc-box-party-v1';
const LANG_STORAGE_KEY = 'champions-tool-ui-lang-v1';

const I18N = {
  ja: {
    back: '戻る',
    openHome: 'ホーム',
    pokemon: 'ポケモン',
    move: 'わざ',
    ability: 'とくせい',
    item: 'どうぐ',
    pokemonList: '習得ポケモン',
    abilityList: '所持ポケモン',
    itemList: '関連ポケモン',
    moveMeta: 'バトル情報',
    effect: '説明',
    details: '詳細',
    type: 'タイプ',
    power: '威力',
    accuracy: '命中',
    pp: 'PP',
    priority: '優先度',
    target: '対象',
    category: '分類',
    rating: '評価',
    count: '{count}件',
    notFound: 'データが見つかりません。',
    noPokemon: '該当ポケモンがいません。',
    noMoveUsers: 'この技を覚えるポケモンがいません。',
    noAbilityUsers: 'この特性を持つポケモンがいません。',
    noItemUsers: 'このどうぐに関連するポケモンがいません。',
    speedTier: '{value}族',
    weight: '重さ {value}kg',
    movePhysical: '物理',
    moveSpecial: '特殊',
    moveStatus: '変化',
    yes: 'あり',
    none: 'なし',
    immuneAbilities: '無効化する特性',
    battleTags: 'バトル特性',
  },
  en: {
    back: 'Back',
    openHome: 'Home',
    pokemon: 'Pokemon',
    move: 'Move',
    ability: 'Ability',
    item: 'Item',
    pokemonList: 'Pokemon that learn this',
    abilityList: 'Pokemon that have this',
    itemList: 'Related Pokemon',
    moveMeta: 'Battle info',
    effect: 'Effect',
    details: 'Details',
    type: 'Type',
    power: 'Power',
    accuracy: 'Accuracy',
    pp: 'PP',
    priority: 'Priority',
    target: 'Target',
    category: 'Category',
    rating: 'Rating',
    count: '{count} results',
    notFound: 'Data not found.',
    noPokemon: 'No Pokemon found.',
    noMoveUsers: 'No Pokemon learn this move.',
    noAbilityUsers: 'No Pokemon have this ability.',
    noItemUsers: 'No Pokemon are related to this item.',
    speedTier: 'Base {value}',
    weight: 'Weight {value}kg',
    movePhysical: 'Physical',
    moveSpecial: 'Special',
    moveStatus: 'Status',
    yes: 'Yes',
    none: 'None',
    immuneAbilities: 'Ignored abilities',
    battleTags: 'Battle traits',
  },
};

const $ = id => document.getElementById(id);
const toId = text => String(text || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const normalizeText = text => String(text || '').normalize('NFKC').toLowerCase();

const state = {
  lang: 'ja',
  data: null,
  speciesCsvMap: new Map(),
  moveCsvMap: new Map(),
  abilityCsvMap: new Map(),
  itemCsvMap: new Map(),
  kind: 'move',
  valueId: '',
  returnPath: './pokedex.html',
  current: null,
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

function loadStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) state.storage = JSON.parse(raw);
  } catch (_error) {
    // ignore
  }
}

function parseParams() {
  const params = new URLSearchParams(window.location.search);
  state.kind = params.get('kind') || document.body?.dataset.detailKind || $('detail-root')?.dataset.detailKind || 'move';
  state.valueId = params.get(state.kind) || params.get('id') || '';
  const returnPath = params.get('returnPath');
  if (returnPath) state.returnPath = returnPath;
}

function buildJapaneseMaps(translations = {}) {
  state.speciesCsvMap = new Map();
  Object.entries(translations.species || {}).forEach(([id, entry]) => {
    const name = String(entry?.nameJa || '').trim();
    if (id && name && !state.speciesCsvMap.has(id)) state.speciesCsvMap.set(id, name);
  });

  state.moveCsvMap = new Map();
  Object.entries(translations.moves || {}).forEach(([id, entry]) => {
    const name = String(entry?.nameJa || '').trim();
    if (id && name && !state.moveCsvMap.has(id)) state.moveCsvMap.set(id, name);
  });

  state.abilityCsvMap = new Map();
  Object.entries(translations.abilities || {}).forEach(([id, entry]) => {
    const name = String(entry?.nameJa || '').trim();
    if (id && name && !state.abilityCsvMap.has(id)) state.abilityCsvMap.set(id, name);
  });

  state.itemCsvMap = new Map();
  Object.entries(translations.items || {}).forEach(([id, entry]) => {
    const name = String(entry?.nameJa || '').trim();
    if (id && name && !state.itemCsvMap.has(id)) state.itemCsvMap.set(id, name);
  });
}

function getSpeciesDisplayName(species) {
  const csvName = state.speciesCsvMap.get(species.id);
  if (state.lang === 'ja') return csvName || species.nameJa || species.name || species.id;
  return species.name || species.nameJa || species.id;
}

function getMoveDisplayName(move) {
  if (state.lang === 'ja') return state.moveCsvMap.get(move.id) || move.nameJa || move.name || move.id;
  return move.name || move.nameJa || move.id;
}

function getAbilityDisplayName(ability) {
  if (state.lang === 'ja') return state.abilityCsvMap.get(ability.id) || ability.nameJa || ability.name || ability.id;
  return ability.name || ability.nameJa || ability.id;
}

function getMoveDescription(move) {
  if (state.lang === 'ja') return move.shortDescJa || move.descJa || move.shortDesc || move.desc || '';
  return move.shortDesc || move.desc || '';
}

function getMoveLongDescription(move) {
  if (state.lang === 'ja') return move.descJa || move.shortDescJa || move.desc || move.shortDesc || '';
  return move.desc || move.shortDesc || '';
}

function getAbilityDescription(ability) {
  if (state.lang === 'ja') return ability.shortDescJa || ability.descJa || ability.shortDesc || ability.desc || '';
  return ability.shortDesc || ability.desc || '';
}

function getAbilityLongDescription(ability) {
  if (state.lang === 'ja') return ability.descJa || ability.shortDescJa || ability.desc || ability.shortDesc || '';
  return ability.desc || ability.shortDesc || '';
}

function getPokemonHref(speciesId) {
  return `./pokedex-pokemon.html?species=${encodeURIComponent(speciesId)}&returnPath=${encodeURIComponent(window.location.pathname + window.location.search)}`;
}

function getMoveCategoryLabel(category) {
  if (category === 'Physical') return t('movePhysical');
  if (category === 'Special') return t('moveSpecial');
  return t('moveStatus');
}

function formatMovePower(move) {
  if (!move) return '-';
  if (move.category === 'Status' || Number(move.basePower) === 0) return '-';
  return move.basePower;
}

function formatAccuracy(value) {
  if (value === true) return '100%';
  if (value == null || value === '') return '-';
  return `${value}%`;
}

function getMoveTags(move) {
  const tags = [];
  if (move.ignoreAbility) tags.push(t('immuneAbilities'));
  if (move.ignoreImmunity) tags.push(t('battleTags') + ': ' + (state.lang === 'ja' ? 'タイプ相性無視' : 'ignore immunity'));
  if (move.breaksProtect) tags.push(state.lang === 'ja' ? 'まもる貫通' : 'breaks Protect');
  if (move.flags?.sound) tags.push(state.lang === 'ja' ? '音技' : 'sound move');
  if (move.flags?.punch) tags.push(state.lang === 'ja' ? 'パンチ技' : 'punch move');
  if (move.flags?.contact) tags.push(state.lang === 'ja' ? '接触技' : 'contact move');
  return tags;
}

function getMoveFlags(move) {
  return Object.keys(move.flags || {}).filter(Boolean).sort();
}

function getMoveUsers(move) {
  const entries = [];
  const speciesEntries = [...(state.data?.species || []), ...(state.data?.megaSpecies || [])];
  speciesEntries.forEach(species => {
    const moveIds = state.data?.learnsetBySpeciesId?.[species.id] || [];
    if (moveIds.includes(move.id)) entries.push(species);
  });
  return entries.sort((left, right) => getSpeciesDisplayName(left).localeCompare(getSpeciesDisplayName(right), state.lang === 'ja' ? 'ja' : 'en'));
}

function getAbilityUsers(ability) {
  const abilityId = ability.id;
  const users = [...(state.data?.species || []), ...(state.data?.megaSpecies || [])].filter(species => Object.values(species.abilities || {}).some(value => toId(value) === abilityId));
  return users.sort((left, right) => getSpeciesDisplayName(left).localeCompare(getSpeciesDisplayName(right), state.lang === 'ja' ? 'ja' : 'en'));
}

function renderMove(move) {
  const root = $('detail-root');
  const users = getMoveUsers(move);
  const typeIcon = `<img class="move-type-icon-chip" src="https://play.pokemonshowdown.com/sprites/types/${move.type}.png" alt="${move.type}" loading="lazy">`;
  const tags = getMoveTags(move);
  const flags = getMoveFlags(move);

  root.innerHTML = `
    <section class="card panel-card mb-3">
      <div class="card-body">
        <div class="dex-detail-head">
          <div class="dex-move-icon-box">${typeIcon}</div>
          <div>
            <div id="dex-detail-name" class="dex-detail-name">${getMoveDisplayName(move)}</div>
            <div id="dex-detail-meta" class="dex-detail-meta">${getMoveCategoryLabel(move.category)} / ${t('type')}: ${move.type}</div>
          </div>
        </div>
        <div class="d-flex flex-wrap gap-2 mt-3">
          <span class="badge text-bg-light mono">${t('power')}: ${formatMovePower(move)}</span>
          <span class="badge text-bg-light mono">${t('accuracy')}: ${formatAccuracy(move.accuracy)}</span>
          <span class="badge text-bg-light mono">${t('pp')}: ${move.pp ?? '-'}</span>
          <span class="badge text-bg-light mono">${t('priority')}: ${move.priority ?? 0}</span>
          <span class="badge text-bg-light mono">${t('target')}: ${move.target || '-'}</span>
        </div>
        <div class="dex-result-snippet mt-3">${getMoveDescription(move)}</div>
        ${getMoveLongDescription(move) && getMoveLongDescription(move) !== getMoveDescription(move) ? `<div class="text-muted small mt-2">${getMoveLongDescription(move)}</div>` : ''}
        <div class="d-flex flex-wrap gap-2 mt-3">
          ${tags.map(tag => `<span class="badge text-bg-secondary">${tag}</span>`).join('')}
          ${flags.map(flag => `<span class="badge text-bg-light text-uppercase">${flag}</span>`).join('')}
        </div>
      </div>
    </section>

    <section class="card panel-card mb-3">
      <div class="card-header" data-i18n="moveMeta">${t('moveMeta')}</div>
      <div class="card-body">
        <div class="dex-stats-grid">
          <div class="dex-stat-row"><span>${t('category')}</span><span>${getMoveCategoryLabel(move.category)}</span></div>
          <div class="dex-stat-row"><span>${t('type')}</span><span>${move.type}</span></div>
          <div class="dex-stat-row"><span>${t('power')}</span><span class="mono">${formatMovePower(move)}</span></div>
          <div class="dex-stat-row"><span>${t('accuracy')}</span><span class="mono">${formatAccuracy(move.accuracy)}</span></div>
          <div class="dex-stat-row"><span>${t('pp')}</span><span class="mono">${move.pp ?? '-'}</span></div>
          <div class="dex-stat-row"><span>${t('priority')}</span><span class="mono">${move.priority ?? 0}</span></div>
        </div>
      </div>
    </section>

    <section class="card panel-card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span data-i18n="pokemonList">${t('pokemonList')}</span>
        <span class="badge text-bg-light mono">${t('count', { count: users.length })}</span>
      </div>
      <div class="card-body">
        <div class="dex-result-list">${users.length ? users.map(species => `
          <a class="dex-result-card text-decoration-none" href="${getPokemonHref(species.id)}">
            <div class="dex-result-icon-wrap">
              <img class="ps-pokemon-icon dex-result-icon" src="https://play.pokemonshowdown.com/sprites/gen5/${species.spriteId || species.id}.png" alt="" loading="lazy">
            </div>
            <div class="dex-result-content">
              <div class="dex-result-title">${getSpeciesDisplayName(species)}</div>
              <div class="dex-result-meta dex-meta-pills">${(species.types || []).map(type => `<span class="badge text-bg-light">${type}</span>`).join('')}</div>
              <div class="dex-result-note">${t('detail')}</div>
            </div>
          </a>
        `).join('') : `<div class="text-muted">${t('noMoveUsers')}</div>`}</div>
      </div>
    </section>
  `;
}

function renderAbility(ability) {
  const root = $('detail-root');
  const users = getAbilityUsers(ability);

  root.innerHTML = `
    <section class="card panel-card mb-3">
      <div class="card-body">
        <div class="dex-detail-head">
          <div class="dex-ability-icon">Ab</div>
          <div>
            <div id="dex-detail-name" class="dex-detail-name">${getAbilityDisplayName(ability)}</div>
          </div>
        </div>
        <div class="dex-result-snippet mt-3">${getAbilityDescription(ability)}</div>
        ${getAbilityLongDescription(ability) && getAbilityLongDescription(ability) !== getAbilityDescription(ability) ? `<div class="text-muted small mt-2">${getAbilityLongDescription(ability)}</div>` : ''}
      </div>
    </section>

    <section class="card panel-card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span data-i18n="abilityList">${t('abilityList')}</span>
        <span class="badge text-bg-light mono">${t('count', { count: users.length })}</span>
      </div>
      <div class="card-body">
        <div class="dex-result-list">${users.length ? users.map(species => `
          <a class="dex-result-card text-decoration-none" href="${getPokemonHref(species.id)}">
            <div class="dex-result-icon-wrap">
              <img class="ps-pokemon-icon dex-result-icon" src="https://play.pokemonshowdown.com/sprites/gen5/${species.spriteId || species.id}.png" alt="" loading="lazy">
            </div>
            <div class="dex-result-content">
              <div class="dex-result-title">${getSpeciesDisplayName(species)}</div>
              <div class="dex-result-meta dex-meta-pills">${(species.types || []).map(type => `<span class="badge text-bg-light">${type}</span>`).join('')}</div>
              <div class="dex-result-note">${t('detail')}</div>
            </div>
          </a>
        `).join('') : `<div class="text-muted">${t('noAbilityUsers')}</div>`}</div>
      </div>
    </section>
  `;
}

function getItemDisplayName(item) {
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

function getItemIconHtml(item) {
  const spriteNum = Number.isFinite(Number(item?.spritenum)) ? Number(item.spritenum) : Number.isFinite(Number(item?.num)) ? Number(item.num) : null;
  if (spriteNum === null || spriteNum < 0) return '<div class="dex-item-icon">It</div>';
  const x = (spriteNum % 16) * 24;
  const y = Math.floor(spriteNum / 16) * 24;
  return `<div class="dex-item-icon"><span class="dex-item-icon-sprite" style="background-image:url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png);background-position:-${x}px -${y}px"></span></div>`;
}

function getItemDescription(item) {
  if (state.lang === 'ja') return item.shortDescJa || item.descJa || item.shortDesc || item.desc || '';
  return item.shortDesc || item.desc || '';
}

function getItemLongDescription(item) {
  if (state.lang === 'ja') return item.descJa || item.shortDescJa || item.desc || item.shortDesc || '';
  return item.desc || item.shortDesc || '';
}

function getItemUsers(item) {
  const users = [];
  const allSpecies = [...(state.data?.species || []), ...(state.data?.megaSpecies || [])];
  const megaMap = state.data?.megaMap || {};

  allSpecies.forEach(species => {
    const baseId = species.baseSpeciesId || species.id;
    const megaInfo = megaMap[baseId];
    if (!megaInfo?.forms?.length) return;
    const hasLinkedForm = megaInfo.forms.some(form => form.requiredItemId === item.id);
    if (hasLinkedForm) users.push(species);
  });

  return users.sort((left, right) => getSpeciesDisplayName(left).localeCompare(getSpeciesDisplayName(right), state.lang === 'ja' ? 'ja' : 'en'));
}

function renderItem(item) {
  const root = $('detail-root');
  const users = getItemUsers(item);

  root.innerHTML = `
    <section class="card panel-card mb-3">
      <div class="card-body">
        <div class="dex-detail-head">
          ${getItemIconHtml(item)}
          <div>
            <div id="dex-detail-name" class="dex-detail-name">${getItemDisplayName(item)}</div>
          </div>
        </div>
        <div class="dex-result-snippet mt-3">${getItemDescription(item)}</div>
        ${getItemLongDescription(item) && getItemLongDescription(item) !== getItemDescription(item) ? `<div class="text-muted small mt-2">${getItemLongDescription(item)}</div>` : ''}
      </div>
    </section>

    <section class="card panel-card">
      <div class="card-header d-flex justify-content-between align-items-center">
        <span data-i18n="itemList">${t('itemList')}</span>
        <span class="badge text-bg-light mono">${t('count', { count: users.length })}</span>
      </div>
      <div class="card-body">
        <div class="dex-result-list">${users.length ? users.map(species => `
          <a class="dex-result-card text-decoration-none" href="${getPokemonHref(species.id)}">
            <div class="dex-result-icon-wrap">
              <img class="ps-pokemon-icon dex-result-icon" src="https://play.pokemonshowdown.com/sprites/gen5/${species.spriteId || species.id}.png" alt="" loading="lazy">
            </div>
            <div class="dex-result-content">
              <div class="dex-result-title">${getSpeciesDisplayName(species)}</div>
              <div class="dex-result-meta dex-meta-pills">${(species.types || []).map(type => `<span class="badge text-bg-light">${type}</span>`).join('')}</div>
              <div class="dex-result-note">${t('detail')}</div>
            </div>
          </a>
        `).join('') : `<div class="text-muted">${t('noItemUsers')}</div>`}</div>
      </div>
    </section>
  `;
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
}

function bindEvents() {
  document.querySelectorAll('#lang-tabs [data-lang]').forEach(button => {
    button.addEventListener('click', () => {
      state.lang = button.dataset.lang;
      saveLang();
      applyI18n();
      renderCurrent();
    });
  });
}

function renderCurrent() {
  const back = $('detail-back');
  if (back) back.href = state.returnPath;
  const title = $('detail-page-title');
  if (title) {
    if (state.kind === 'ability') title.textContent = t('ability');
    else if (state.kind === 'item') title.textContent = t('item');
    else title.textContent = t('move');
  }

  if (!state.current) {
    $('detail-root').innerHTML = `<div class="alert alert-warning mb-0">${t('notFound')}</div>`;
    return;
  }

  if (state.kind === 'ability') renderAbility(state.current);
  else if (state.kind === 'item') renderItem(state.current);
  else renderMove(state.current);
}

async function initialize() {
  parseParams();
  loadLang();
  loadStorage();

  const [data, jaTranslations] = await Promise.all([
    fetchJson('./db/champions-calc-data.json'),
    fetchJson('./db/champions-ja-translations.json'),
  ]);

  state.data = data;
  buildJapaneseMaps(jaTranslations || {});

  if (state.kind === 'ability') {
    state.current = (data.abilities || []).find(entry => entry.id === state.valueId) || null;
  } else if (state.kind === 'item') {
    state.current = (data.items || []).find(entry => entry.id === state.valueId) || null;
  } else {
    state.current = (data.moves || []).find(entry => entry.id === state.valueId) || null;
  }

  applyI18n();
  const home = $('detail-home');
  if (home) home.href = './pokedex.html';
  bindEvents();
  renderCurrent();
}

initialize().catch(error => {
  console.error(error);
  const root = $('detail-root');
  if (root) root.innerHTML = `<div class="alert alert-danger mb-0">${error.message}</div>`;
});
