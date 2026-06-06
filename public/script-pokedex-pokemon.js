const STORAGE_KEY = 'champions-damage-calc-box-party-v1';
const LANG_STORAGE_KEY = 'champions-tool-ui-lang-v1';
const SPEED_ADJUST_REQUEST_KEY = 'champions-speed-adjust-request-v1';
const PENDING_APPLY_KEY = 'champions-damage-calc-pending-apply-v1';

const I18N = {
  ja: {
    back: '戻る',
    detailSubtitle: 'Pokemon details',
    addToBox: 'ボックス追加',
    stats: '種族値',
    actualStats: '実数値目安',
    abilities: '特性',
    evolution: '進化・関連フォルム',
    moves: '覚える技',
    moveSearch: '技を検索',
    notFound: 'ポケモンが見つかりません。',
    noMoves: '技データがありません。',
    type: 'タイプ',
    speedTier: '{value}族',
    weight: '重さ {value}kg',
    actualBoosted: '全振り+',
    actualNeutralMax: '全振り',
    actualNoInvest: '無振り',
    actualLowered: '無振り-',
    total: '合計',
    related: '関連',
  },
  en: {
    back: 'Back',
    detailSubtitle: 'Pokemon details',
    addToBox: 'Add to box',
    stats: 'Base Stats',
    actualStats: 'Actual Stat Guide',
    abilities: 'Abilities',
    evolution: 'Evolution / Related Forms',
    moves: 'Moves',
    moveSearch: 'Search moves',
    notFound: 'Pokemon not found.',
    noMoves: 'No move data.',
    type: 'Type',
    speedTier: 'Base {value}',
    weight: 'Weight {value}kg',
    actualBoosted: 'Max +Nature',
    actualNeutralMax: 'Max Neutral',
    actualNoInvest: 'No investment',
    actualLowered: 'No-invest -Nature',
    total: 'Total',
    related: 'Related',
  },
};

const $ = id => document.getElementById(id);
const toId = text => String(text || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const normalizeText = text => String(text || '').normalize('NFKC').toLowerCase();
const toNumber = (value, fallback = 0) => {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
};
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const state = {
  lang: 'ja',
  storage: { box: [], parties: [], calcLinks: { attacker: null, defender: null } },
  data: null,
  speciesCsvMap: new Map(),
  moveCsvMap: new Map(),
  abilityCsvMap: new Map(),
  speciesId: '',
  returnPath: '/pokelist/pokedex.html',
  currentSpecies: null,
  moveSearch: '',
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

function parseParams() {
  const params = new URLSearchParams(window.location.search);
  state.speciesId = params.get('species') || 'pikachu';
  const returnPath = params.get('returnPath');
  if (returnPath) state.returnPath = returnPath;
}

function getSpeciesDisplayName(species) {
  const csvName = state.speciesCsvMap.get(species.id);
  if (state.lang === 'ja') return species.nameJa || csvName || species.name;
  return species.name || species.nameJa || species.id;
}

function getLocalizedSortValue(text) {
  return normalizeText(String(text || '').replace(/[\u30a1-\u30f6]/g, char => String.fromCharCode(char.charCodeAt(0) - 0x60)));
}

function buildCsvMaps(speciesRecords, moveRecords, abilityRecords) {
  state.speciesCsvMap = new Map();
  speciesRecords.forEach(record => {
    const id = toId(record.ShowdownKey || '');
    const name = String(record['名前(フォルム)'] || record['名前'] || '').trim();
    if (id && name && !state.speciesCsvMap.has(id)) state.speciesCsvMap.set(id, name);
  });

  state.moveCsvMap = new Map();
  moveRecords.forEach(record => {
    const moveId = Number(record.ID);
    const name = String(record['わざ名'] || '').trim();
    if (Number.isFinite(moveId) && name && !state.moveCsvMap.has(moveId)) state.moveCsvMap.set(moveId, name);
  });

  state.abilityCsvMap = new Map();
  abilityRecords.forEach(record => {
    const abilityId = Number(record.ID);
    const name = String(record['特性'] || '').trim();
    if (Number.isFinite(abilityId) && name && !state.abilityCsvMap.has(abilityId)) state.abilityCsvMap.set(abilityId, name);
  });
}

function getSpeciesIconUrl(species) {
  return `https://play.pokemonshowdown.com/sprites/gen5/${species.spriteId || species.id}.png`;
}

function addToBox(speciesId) {
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

function renderTypes(species) {
  const node = $('dex-type-list');
  if (!node) return;
  const types = species.types || [];
  node.innerHTML = types.map(type => `<img class="move-type-icon-chip" src="https://play.pokemonshowdown.com/sprites/types/${type}.png" alt="${type}" loading="lazy">`).join('');
}

function renderStats(species) {
  const node = $('dex-stats');
  if (!node) return;
  const stats = species.baseStats || {};
  const entries = [
    ['HP', stats.hp || 0],
    ['Atk', stats.atk || 0],
    ['Def', stats.def || 0],
    ['SpA', stats.spa || 0],
    ['SpD', stats.spd || 0],
    ['Spe', stats.spe || 0],
  ];
  const total = entries.reduce((sum, [, value]) => sum + Number(value || 0), 0);
  node.innerHTML = `${entries.map(([name, value]) => `<div class="dex-stat-row"><span>${name}</span><span class="mono">${value}</span></div>`).join('')}<div class="dex-stat-row fw-semibold"><span>${t('total')}</span><span class="mono">${total}</span></div>`;
}

function calcActualStat(base, statKey, ap, natureMultiplier) {
  const numericBase = Number(base || 0);
  const numericAp = Number(ap || 0);
  if (statKey === 'hp') return numericBase + numericAp + 75;
  return Math.floor((numericBase + numericAp + 20) * natureMultiplier);
}

function getJumpNatureId(statKey, natureMultiplier) {
  if (statKey === 'hp' || natureMultiplier === 1) return 'hardy';
  if (natureMultiplier > 1) {
    if (statKey === 'atk') return 'adamant';
    if (statKey === 'def') return 'bold';
    if (statKey === 'spa') return 'modest';
    if (statKey === 'spd') return 'calm';
    if (statKey === 'spe') return 'timid';
  }
  if (statKey === 'atk') return 'modest';
  if (statKey === 'def') return 'mild';
  if (statKey === 'spa') return 'adamant';
  if (statKey === 'spd') return 'rash';
  if (statKey === 'spe') return 'brave';
  return 'hardy';
}

function createJumpPokemonRecord(speciesId, statKey, ap, natureMultiplier) {
  const evs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 };
  if (Object.prototype.hasOwnProperty.call(evs, statKey)) evs[statKey] = clamp(toNumber(ap, 0), 0, 32);
  return {
    id: `dexjump-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    speciesId,
    nickname: '',
    nature: getJumpNatureId(statKey, natureMultiplier),
    megaEnabled: false,
    abilityId: '',
    itemId: '',
    evs,
    ranks: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    ivTotal: 186,
    notes: '',
    moveIds: [],
    calcHistory: [],
  };
}

function storeJumpRecord(record) {
  if (!Array.isArray(state.storage.box)) state.storage.box = [];
  state.storage.box = [record, ...state.storage.box.filter(entry => entry?.id !== record.id)].slice(0, 500);
  saveStorage();
}

function openSpeedAdjustFromActual(speciesId, ap, natureMultiplier) {
  localStorage.setItem(SPEED_ADJUST_REQUEST_KEY, JSON.stringify({
    selectedSpeciesId: speciesId,
    returnPath: window.location.pathname + window.location.search,
    prefill: {
      apSpe: clamp(toNumber(ap, 0), 0, 32),
      rankSpe: 0,
      natureBoost: natureMultiplier > 1,
    },
  }));
  window.location.href = '/pokelist/speed-adjust.html';
}

function openDamageCalcFromActual(speciesId, statKey, ap, natureMultiplier) {
  const record = createJumpPokemonRecord(speciesId, statKey, ap, natureMultiplier);
  storeJumpRecord(record);
  const side = statKey === 'atk' || statKey === 'spa' ? 'attacker' : 'defender';
  localStorage.setItem(PENDING_APPLY_KEY, JSON.stringify({ side, pokemonId: record.id }));
  window.location.href = '/pokelist/damage-calc.html';
}

function handleActualStatJump(event) {
  const trigger = event.target.closest('[data-jump-kind]');
  if (!trigger || !state.currentSpecies) return;
  event.preventDefault();
  const statKey = trigger.dataset.jumpStat;
  const ap = Number(trigger.dataset.jumpAp || 0);
  const nature = Number(trigger.dataset.jumpNature || 1);
  if (trigger.dataset.jumpKind === 'speed') {
    openSpeedAdjustFromActual(state.currentSpecies.id, ap, nature);
    return;
  }
  openDamageCalcFromActual(state.currentSpecies.id, statKey, ap, nature);
}

function renderActualStats(species) {
  const node = $('dex-actual-stats');
  if (!node) return;

  const stats = species.baseStats || {};
  const rows = [
    ['HP', 'hp'],
    ['Atk', 'atk'],
    ['Def', 'def'],
    ['SpA', 'spa'],
    ['SpD', 'spd'],
    ['Spe', 'spe'],
  ];

  const header = `
    <div class="dex-actual-row dex-actual-head">
      <span>Stat</span>
      <span>${t('actualBoosted')}</span>
      <span>${t('actualNeutralMax')}</span>
      <span>${t('actualNoInvest')}</span>
      <span>${t('actualLowered')}</span>
    </div>
  `;

  const body = rows.map(([label, key]) => {
    const base = Number(stats[key] || 0);
    const boosted = key === 'hp' ? '-' : calcActualStat(base, key, 32, 1.1);
    const neutral = calcActualStat(base, key, 32, 1);
    const noInvest = calcActualStat(base, key, 0, 1);
    const lowered = key === 'hp' ? '-' : calcActualStat(base, key, 0, 0.9);
    const makeValueLink = (value, jumpKind, jumpNature, jumpAp) => `
      <a href="#" class="mono text-decoration-none" data-jump-kind="${jumpKind}" data-jump-stat="${key}" data-jump-ap="${jumpAp}" data-jump-nature="${jumpNature}">${value}</a>
    `;

    return `
      <div class="dex-actual-row">
        <span class="fw-semibold">${label}</span>
        <span>${boosted === '-' ? '<span class="mono">-</span>' : makeValueLink(boosted, key === 'spe' ? 'speed' : 'damage', key === 'hp' ? 1 : 1.1, 32)}</span>
        <span>${makeValueLink(neutral, key === 'spe' ? 'speed' : 'damage', 1, 32)}</span>
        <span>${makeValueLink(noInvest, key === 'spe' ? 'speed' : 'damage', 1, 0)}</span>
        <span>${lowered === '-' ? '<span class="mono">-</span>' : makeValueLink(lowered, key === 'spe' ? 'speed' : 'damage', 0.9, 0)}</span>
      </div>
    `;
  }).join('');

  node.innerHTML = `${header}${body}`;
}

function renderAbilities(species) {
  const node = $('dex-abilities');
  if (!node) return;
  const abilities = Object.values(species.abilities || {});
  node.innerHTML = abilities.map(name => {
    const ability = (state.data?.abilities || []).find(entry => entry.name === name || entry.id === toId(name));
    const abilityName = ability ? getAbilityDisplayName(ability) : name;
    const href = ability ? `/pokelist/pokedex-ability.html?ability=${encodeURIComponent(ability.id)}&returnPath=${encodeURIComponent(window.location.pathname + window.location.search)}` : '#';
    return `<a class="badge text-bg-secondary text-decoration-none" href="${href}">${abilityName}</a>`;
  }).join('');
}

function renderEvolution(species) {
  const node = $('dex-evolution');
  if (!node) return;

  const allSpecies = [...(state.data?.species || []), ...(state.data?.megaSpecies || [])];
  const byId = new Map(allSpecies.map(entry => [entry.id, entry]));
  const megaMap = state.data?.megaMap || {};
  const ids = new Set([species.id]);

  const walkPrevo = start => {
    let current = start;
    while (current?.prevoId && byId.has(current.prevoId)) {
      ids.add(current.prevoId);
      current = byId.get(current.prevoId);
    }
  };

  const walkEvos = start => {
    const queue = [...(start?.evosIds || [])];
    while (queue.length) {
      const evoId = queue.shift();
      if (!evoId || ids.has(evoId) || !byId.has(evoId)) continue;
      ids.add(evoId);
      const evo = byId.get(evoId);
      (evo?.evosIds || []).forEach(nextId => queue.push(nextId));
    }
  };

  const baseGroupId = species.baseSpeciesId || species.id;
  allSpecies.forEach(entry => {
    if ((entry.baseSpeciesId || entry.id) === baseGroupId) ids.add(entry.id);
  });

  walkPrevo(species);
  walkEvos(species);

  const megaInfo = megaMap[baseGroupId];
  (megaInfo?.forms || []).forEach(form => {
    if (form?.id && byId.has(form.id)) ids.add(form.id);
  });

  const targets = [...ids]
    .map(id => byId.get(id))
    .filter(Boolean)
    .sort((left, right) => getLocalizedSortValue(getSpeciesDisplayName(left)).localeCompare(getLocalizedSortValue(getSpeciesDisplayName(right)), 'ja'));

  node.innerHTML = targets.map(entry => {
    const href = `/pokelist/pokedex-pokemon.html?species=${encodeURIComponent(entry.id)}&returnPath=${encodeURIComponent(window.location.pathname + window.location.search)}`;
    return `<a class="badge text-bg-light text-decoration-none" href="${href}">${getSpeciesDisplayName(entry)}</a>`;
  }).join('');
}

function getMoveDisplayName(move) {
  if (!move) return '';
  if (state.lang === 'ja') return state.moveCsvMap.get(move.num) || move.nameJa || move.name;
  return move.name || move.nameJa || move.id;
}

function getAbilityDisplayName(ability) {
  if (!ability) return '';
  if (state.lang === 'ja') return state.abilityCsvMap.get(ability.num) || ability.nameJa || ability.name;
  return ability.name || ability.nameJa || ability.id;
}

function renderMoves(species) {
  const node = $('dex-moves');
  if (!node) return;

  const moveIds = (state.data?.learnsetBySpeciesId?.[species.id] || []).slice();
  const query = normalizeText(state.moveSearch || '');
  const moves = moveIds
    .map(id => state.data.moves.find(move => move.id === id))
    .filter(Boolean)
    .filter(move => !query || normalizeText(`${getMoveDisplayName(move)} ${move.name || ''}`).includes(query))
    .sort((a, b) => getLocalizedSortValue(getMoveDisplayName(a)).localeCompare(getLocalizedSortValue(getMoveDisplayName(b)), 'ja'));

  if (!moves.length) {
    node.innerHTML = `<span class="text-muted">${t('noMoves')}</span>`;
    return;
  }

  node.innerHTML = moves.map(move => {
    const typeIcon = `<img class="move-type-icon-chip" src="https://play.pokemonshowdown.com/sprites/types/${move.type}.png" alt="${move.type}" loading="lazy">`;
    const category = move.category || 'Status';
    const categoryIcon = `<img class="move-category-icon" src="https://play.pokemonshowdown.com/sprites/categories/${category}.png" alt="${category}" loading="lazy">`;
    const powerValue = category === 'Status' || Number(move.basePower) === 0 ? '-' : move.basePower;
    const href = `/pokelist/pokedex-move.html?move=${encodeURIComponent(move.id)}&returnPath=${encodeURIComponent(window.location.pathname + window.location.search)}`;
    return `<a class="dex-move-row text-decoration-none" href="${href}">${typeIcon}${categoryIcon}<span>${getMoveDisplayName(move)}</span><span class="badge text-bg-light mono">${powerValue}</span></a>`;
  }).join('');
}

function renderHeader(species) {
  const title = $('dex-detail-title');
  const name = $('dex-detail-name');
  const meta = $('dex-detail-meta');
  const icon = $('dex-detail-icon');

  const display = getSpeciesDisplayName(species);
  const stats = species.baseStats || {};
  const statMeta = `H${stats.hp || 0} / A${stats.atk || 0} / B${stats.def || 0} / C${stats.spa || 0} / D${stats.spd || 0} / S${stats.spe || 0}`;
  if (title) title.textContent = display;
  if (name) name.textContent = display;
  if (meta) meta.textContent = `${statMeta}  ${t('weight', { value: species.weightkg ?? '-' })}`;
  if (icon) icon.src = getSpeciesIconUrl(species);
}

function renderAll() {
  const species = state.currentSpecies;
  if (!species) {
    const title = $('dex-detail-title');
    if (title) title.textContent = t('notFound');
    return;
  }

  renderHeader(species);
  renderTypes(species);
  renderStats(species);
  renderActualStats(species);
  renderAbilities(species);
  renderEvolution(species);
  renderMoves(species);
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
  const addBox = $('dex-add-box');
  if (addBox) addBox.addEventListener('click', () => state.currentSpecies && addToBox(state.currentSpecies.id));

  const moveSearch = $('dex-move-search');
  if (moveSearch) {
    moveSearch.addEventListener('input', () => {
      state.moveSearch = moveSearch.value.trim();
      renderMoves(state.currentSpecies);
    });
  }

  const actualStats = $('dex-actual-stats');
  if (actualStats) actualStats.addEventListener('click', handleActualStatJump);

  document.querySelectorAll('#lang-tabs [data-lang]').forEach(button => {
    button.addEventListener('click', () => {
      state.lang = button.dataset.lang;
      saveLang();
      applyI18n();
      renderAll();
    });
  });
}

async function initialize() {
  parseParams();
  loadLang();
  loadStorage();

  const [data, speciesCsvRecords, moveCsvRecords, abilityCsvRecords] = await Promise.all([
    fetchJson('/pokelist/db/champions-calc-data.json'),
    fetchCsvRecords('/pokelist/db/ダメージ計算 - def_pokemon.csv'),
    fetchCsvRecords('/pokelist/db/ダメージ計算 - list_move2poke.csv'),
    fetchCsvRecords('/pokelist/db/ダメージ計算 - list_ability2poke.csv'),
  ]);

  state.data = data;
  buildCsvMaps(speciesCsvRecords, moveCsvRecords, abilityCsvRecords);
  state.currentSpecies = (data.species || []).find(entry => entry.id === state.speciesId)
    || (data.megaSpecies || []).find(entry => entry.id === state.speciesId)
    || null;

  applyI18n();
  const back = $('detail-back');
  if (back) back.href = state.returnPath;

  bindEvents();
  renderAll();
}

initialize().catch(error => {
  console.error(error);
});
