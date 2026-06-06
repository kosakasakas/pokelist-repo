const STORAGE_KEY = 'champions-damage-calc-box-party-v1';
const OPEN_DETAIL_REQUEST_KEY = 'champions-open-detail-request-v1';
const SPEED_ADJUST_REQUEST_KEY = 'champions-speed-adjust-request-v1';
const LANG_STORAGE_KEY = 'champions-tool-ui-lang-v1';
const SPEED_CUSTOM_TARGETS_KEY = 'champions-speed-adjust-custom-targets-v1';

const SPEED_PLUS_NATURES = new Set(['timid', 'hasty', 'jolly', 'naive']);
const SPEED_MINUS_NATURES = new Set(['brave', 'relaxed', 'quiet', 'sassy']);
const GENERIC_MEGA_ITEMS = new Set(['megastone', 'megastonex', 'megastoney', 'megastonez']);

const I18N = {
  ja: {
    title: '素早さ調整',
    subtitle: '[Gen 9 Champions] VGC 2026 Reg M-A',
    back: '戻る',
    backToPage: 'ページへ戻る',
    targetFormat: '対象フォーマット',
    targetPokemon: '調査対象ポケモン',
    targetSearchTitle: '調査対象ポケモンを検索',
    search: '検索',
    searchPlaceholder: 'ポケモン名で検索',
    speedValue: '実数値',
    minSpeed: '最遅',
    maxSpeed: '最速',
    save: '保存',
    apLabel: '努力ポイント',
    rankLabel: 'ランク',
    naturePlus: '性格補正(+10%)を適用/解除',
    scarf: 'こだわりスカーフ',
    mega: 'メガ進化',
    noTarget: '調査対象が見つかりません。',
    loadFailed: 'ページ初期化に失敗しました。',
    count: '{count}件',
    loadingTarget: '調査対象を読み込み中...',
    editPokemon: '詳細編集',
    openDex: '図鑑を開く',
    pokedex: '図鑑',
    tempLabel: '仮',
  },
  en: {
    title: 'Speed Tuning',
    subtitle: '[Gen 9 Champions] VGC 2026 Reg M-A',
    back: 'Back',
    backToPage: 'Back to page',
    targetFormat: 'Target format',
    targetPokemon: 'Target Pokemon',
    targetSearchTitle: 'Search target Pokemon',
    search: 'Search',
    searchPlaceholder: 'Filter by Pokemon',
    speedValue: 'Speed',
    minSpeed: 'Min',
    maxSpeed: 'Max',
    save: 'Save',
    apLabel: 'Effort points',
    rankLabel: 'Rank',
    naturePlus: 'Toggle +10% nature boost',
    scarf: 'Choice Scarf',
    mega: 'Mega Evolution',
    noTarget: 'Target Pokemon not found.',
    loadFailed: 'Failed to initialize page.',
    count: '{count} entries',
    loadingTarget: 'Loading target...',
    editPokemon: 'Edit',
    openDex: 'Open Pokedex',
    pokedex: 'Pokedex',
    tempLabel: 'Temp',
  },
};

const $ = id => document.getElementById(id);
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const toNumber = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const toId = text => String(text || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const normalizeText = text => String(text || '').normalize('NFKC').toLowerCase();

const state = {
  lang: 'ja',
  request: null,
  storage: { box: [], parties: [], calcLinks: { attacker: null, defender: null } },
  customTargets: [],
  data: null,
  rules: null,
  speciesById: new Map(),
  megaMap: {},
  speciesNameJaById: new Map(),
  abilityNameToId: new Map(),
  itemsById: new Map(),
  rowData: [],
  speedBuckets: new Map(),
  speedAxis: [],
  searchWord: '',
  targetPokemon: null,
  targetSource: null,
  targetPrevItemId: '',
  scarfIconStyle: '',
  didInitialFocus: false,
  searchAssignTargetId: '',
  targetSearchModal: null,
};

function t(key, vars = {}) {
  let text = I18N[state.lang]?.[key] || I18N.ja[key] || key;
  Object.entries(vars).forEach(([name, value]) => {
    text = text.replace(`{${name}}`, String(value));
  });
  return text;
}

function defaultPokemonRecord(speciesId = 'fluttermane') {
  return {
    id: `speed-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
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
    natureBoost: false,
    isCustomSpeedTarget: true,
  };
}

function normalizePokemonRecord(record) {
  const base = defaultPokemonRecord(record?.speciesId || 'fluttermane');
  const next = { ...base, ...(record || {}) };
  next.evs = { ...base.evs, ...(record?.evs || {}) };
  next.ranks = { ...base.ranks, ...(record?.ranks || {}) };
  next.moveIds = Array.isArray(record?.moveIds) ? record.moveIds.filter(Boolean).slice(0, 4) : [];
  next.calcHistory = Array.isArray(record?.calcHistory) ? record.calcHistory.slice(-20) : [];
  return next;
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

function loadLanguagePreference() {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'ja' || saved === 'en') state.lang = saved;
  } catch (_error) {
    // ignore
  }
}

function persistLanguagePreference() {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, state.lang);
  } catch (_error) {
    // ignore
  }
}

function loadStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      state.storage = {
        box: Array.isArray(parsed.box) ? parsed.box.map(normalizePokemonRecord) : [],
        parties: Array.isArray(parsed.parties) ? parsed.parties : [],
        calcLinks: { attacker: parsed?.calcLinks?.attacker || null, defender: parsed?.calcLinks?.defender || null },
      };
    }
  } catch (_error) {
    // ignore
  }
}

function saveStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.storage));
}

function loadCustomTargets() {
  try {
    const raw = localStorage.getItem(SPEED_CUSTOM_TARGETS_KEY);
    const parsed = JSON.parse(raw || '[]');
    state.customTargets = Array.isArray(parsed) ? parsed.map(normalizePokemonRecord) : [];
  } catch (_error) {
    state.customTargets = [];
  }
}

function saveCustomTargets() {
  localStorage.setItem(SPEED_CUSTOM_TARGETS_KEY, JSON.stringify(state.customTargets));
}

function loadRequest() {
  try {
    state.request = JSON.parse(localStorage.getItem(SPEED_ADJUST_REQUEST_KEY) || 'null');
  } catch (_error) {
    state.request = null;
  }
  localStorage.removeItem(SPEED_ADJUST_REQUEST_KEY);
}

function calcSingleStat(base, ap, natureMultiplier) {
  let stat = base + ap + 20;
  if (natureMultiplier === 1.1) stat = Math.trunc((Math.trunc(stat * 110)) / 100);
  else if (natureMultiplier === 0.9) stat = Math.trunc((Math.trunc(stat * 90)) / 100);
  return Math.max(1, stat);
}

function applyStageToStat(value, rank) {
  const clamped = clamp(toNumber(rank), -6, 6);
  if (clamped >= 0) return Math.floor((value * (2 + clamped)) / 2);
  return Math.floor((value * 2) / (2 - clamped));
}

function getNatureSpeedMultiplier(target) {
  if (target?.natureBoost) return 1.1;
  const natureId = target?.nature;
  if (SPEED_PLUS_NATURES.has(natureId)) return 1.1;
  if (SPEED_MINUS_NATURES.has(natureId)) return 0.9;
  return 1;
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

function setupLookups() {
  const speciesList = [...(state.data?.species || []), ...(state.data?.megaSpecies || [])];
  state.speciesById = new Map(speciesList.map(entry => [entry.id, entry]));
  state.abilityNameToId = new Map((state.data?.abilities || []).map(entry => [entry.name, entry.id]));
  state.itemsById = new Map((state.data?.items || []).map(entry => [entry.id, entry]));
  state.megaMap = state.data?.megaMap || {};

  const scarfPos = getShowdownItemIconPosition('choicescarf');
  state.scarfIconStyle = scarfPos
    ? `background-image:url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png);background-position:-${scarfPos.x}px -${scarfPos.y}px;`
    : '';
}

function getShowdownItemIconPosition(itemId) {
  const item = state.itemsById.get(itemId);
  if (!item) return null;
  const iconNumRaw = Number.isFinite(Number(item.spritenum)) ? Number(item.spritenum) : Number(item.num);
  if (!Number.isFinite(iconNumRaw)) return null;
  return { x: (iconNumRaw % 16) * 24, y: Math.floor(iconNumRaw / 16) * 24 };
}

function getSpeciesName(species) {
  if (!species) return '-';
  if (state.lang === 'ja') {
    return state.speciesNameJaById.get(species.id)
      || species.nameJa
      || state.speciesNameJaById.get(toId(species.baseSpecies || ''))
      || species.baseSpecies
      || species.name;
  }
  return species.name || species.nameJa || species.id;
}

function getShowdownPokemonIconUrl(speciesId) {
  const species = state.speciesById.get(speciesId);
  if (!species) return '';
  return `https://play.pokemonshowdown.com/sprites/gen5/${species.spriteId || species.id}.png`;
}

function getSpeciesLearnset(speciesId) {
  const byId = state.data?.learnsetBySpeciesId || {};
  const moves = byId[speciesId];
  return new Set(Array.isArray(moves) ? moves : []);
}

function getEffectiveSpeciesId(speciesId, megaEnabled, itemId = '') {
  if (!megaEnabled && !GENERIC_MEGA_ITEMS.has(itemId)) return speciesId;
  const baseId = state.megaMap[speciesId] ? speciesId : toId(state.speciesById.get(speciesId)?.baseSpecies || '');
  const megaMeta = state.megaMap[baseId];
  if (!megaMeta) return speciesId;
  const forms = Array.isArray(megaMeta.forms) ? megaMeta.forms : (megaMeta.id ? [{ id: megaMeta.id, stoneType: 'normal' }] : []);
  if (!forms.length) return speciesId;
  const stoneType = itemId === 'megastonex' ? 'x' : itemId === 'megastoney' ? 'y' : itemId === 'megastonez' ? 'z' : 'normal';
  const exact = forms.find(form => form.stoneType === stoneType) || forms.find(form => form.stoneType === 'normal') || forms[0];
  return exact?.id || speciesId;
}

function canUseScarf(species) {
  if (!species) return false;
  return !species.requiredItem;
}

function calculateRuleSpeed(baseValue, rule) {
  if (!rule) return null;
  if (Number.isFinite(Number(rule.multiplier))) return Math.floor(baseValue * Number(rule.multiplier));
  if (Number.isFinite(Number(rule.stage))) return applyStageToStat(baseValue, Number(rule.stage));
  return null;
}

function classifyRuleToColumn(rule) {
  if (!rule) return null;
  if (rule.id === 'choicescarf') return 'plus1';
  if (Number.isFinite(Number(rule.stage))) return Number(rule.stage) >= 2 ? 'plus2' : 'plus1';
  if (Number.isFinite(Number(rule.multiplier))) return Number(rule.multiplier) >= 2 ? 'plus2' : 'plus1';
  return null;
}

function buildGroupedSpeciesRows() {
  const groups = new Map();
  (state.data?.species || []).forEach(species => {
    if (!species?.baseStats) return;
    const stats = species.baseStats;
    const sig = `${stats.hp}|${stats.atk}|${stats.def}|${stats.spa}|${stats.spd}|${stats.spe}`;
    const groupKey = `${toId(species.baseSpecies || species.name)}|${sig}`;
    if (!groups.has(groupKey)) {
      groups.set(groupKey, {
        speciesIds: [],
        representativeId: species.id,
        baseSpe: toNumber(stats.spe, 0),
      });
    }
    const group = groups.get(groupKey);
    group.speciesIds.push(species.id);
    if (!species.forme && !species.id.includes('totem')) group.representativeId = species.id;
  });

  const rows = [];
  groups.forEach(group => {
    const representative = state.speciesById.get(group.representativeId);
    if (!representative) return;

    const baseSpe = group.baseSpe;
    const min = calcSingleStat(baseSpe, 0, 0.9);
    const max = calcSingleStat(baseSpe, 32, 1.1);
    const searchJaList = group.speciesIds.map(id => getSpeciesName(state.speciesById.get(id)));
    const searchEnList = group.speciesIds.map(id => state.speciesById.get(id)?.name || id);

    const abilityIds = Object.values(representative.abilities || {})
      .map(name => state.abilityNameToId.get(name))
      .filter(Boolean);

    rows.push({
      representativeId: representative.id,
      baseSpe,
      min,
      max,
      canScarf: canUseScarf(representative),
      abilityIds,
      learnset: getSpeciesLearnset(representative.id),
      searchJa: normalizeText(searchJaList.join(' ')),
      searchEn: normalizeText(searchEnList.join(' ')),
    });
  });

  rows.sort((a, b) => b.max - a.max || a.representativeId.localeCompare(b.representativeId));
  state.rowData = rows;
}

function createEmptyBucketRow() {
  return { min: new Map(), max: new Map(), plus1: new Map(), plus2: new Map() };
}

function ensureBucket(speed, bucketMap) {
  if (!bucketMap.has(speed)) bucketMap.set(speed, createEmptyBucketRow());
  return bucketMap.get(speed);
}

function addChip(bucketMap, speed, column, row, badge = null) {
  const bucket = ensureBucket(speed, bucketMap);
  if (!bucket[column].has(row.representativeId)) {
    bucket[column].set(row.representativeId, { row, badges: [] });
  }
  if (badge) {
    const chip = bucket[column].get(row.representativeId);
    if (!chip.badges.some(entry => entry.key === badge.key)) chip.badges.push(badge);
  }
}

function createSpeedBuckets() {
  const bucketMap = new Map();
  const axisSet = new Set();

  const addAxis = speed => {
    if (speed == null) return;
    axisSet.add(speed);
  };

  const abilityRules = state.rules?.abilities || [];
  const moveRules = state.rules?.moves || [];
  const scarfRule = (state.rules?.items || []).find(item => item.id === 'choicescarf');

  state.rowData.forEach(row => {
    addChip(bucketMap, row.min, 'min', row);
    addChip(bucketMap, row.max, 'max', row);
    addAxis(row.min);
    addAxis(row.max);

    abilityRules.forEach(rule => {
      if (!row.abilityIds.includes(rule.id)) return;
      const speed = calculateRuleSpeed(row.max, rule);
      const column = classifyRuleToColumn(rule);
      if (speed == null || !column) return;
      addChip(bucketMap, speed, column, row, { key: `a:${rule.id}`, text: rule.label, type: 'ability' });
      addAxis(speed);
    });

    moveRules.forEach(rule => {
      if (!row.learnset.has(rule.id)) return;
      const speed = calculateRuleSpeed(row.max, rule);
      const column = classifyRuleToColumn(rule);
      if (speed == null || !column) return;
      addChip(bucketMap, speed, column, row, { key: `m:${rule.id}`, text: rule.label, type: 'move' });
      addAxis(speed);
    });

    if (row.canScarf && scarfRule) {
      const speed = calculateRuleSpeed(row.max, scarfRule);
      if (speed != null) {
        addChip(bucketMap, speed, 'plus1', row, { key: 'i:choicescarf', text: t('scarf'), type: 'scarf' });
        addAxis(speed);
      }
    }
  });

  const converted = new Map();
  bucketMap.forEach((bucket, speed) => {
    converted.set(speed, {
      min: [...bucket.min.values()],
      max: [...bucket.max.values()],
      plus1: [...bucket.plus1.values()],
      plus2: [...bucket.plus2.values()],
    });
  });

  state.speedBuckets = converted;
  state.speedAxis = [...axisSet].sort((a, b) => b - a);
}

function getTargetEffectiveSpecies() {
  if (!state.targetPokemon) return null;
  const effectiveId = getEffectiveSpeciesId(
    state.targetPokemon.speciesId,
    Boolean(state.targetPokemon.megaEnabled),
    state.targetPokemon.itemId || ''
  );
  return state.speciesById.get(effectiveId) || state.speciesById.get(state.targetPokemon.speciesId) || null;
}

function getTargetCurrentSpeed() {
  const species = getTargetEffectiveSpecies();
  if (!species || !state.targetPokemon) return 0;

  const baseSpe = toNumber(species.baseStats?.spe, 0);
  const ap = clamp(toNumber(state.targetPokemon.evs?.spe, 0), 0, 32);
  const rank = clamp(toNumber(state.targetPokemon.ranks?.spe, 0), -6, 6);
  const natureMul = getNatureSpeedMultiplier(state.targetPokemon);
  const raw = calcSingleStat(baseSpe, ap, natureMul);
  let speed = applyStageToStat(raw, rank);
  if (state.targetPokemon.itemId === 'choicescarf') speed = Math.floor(speed * 1.5);
  return speed;
}

function getCurrentFocusColumn() {
  if (!state.targetPokemon) return 'max';
  const rank = clamp(toNumber(state.targetPokemon.ranks?.spe, 0), -6, 6);
  if (state.targetPokemon.itemId === 'choicescarf') return 'plus1';
  if (rank >= 2) return 'plus2';
  if (rank >= 1) return 'plus1';

  const ap = clamp(toNumber(state.targetPokemon.evs?.spe, 0), 0, 32);
  const natureMul = getNatureSpeedMultiplier(state.targetPokemon);
  return ap === 0 && natureMul === 0.9 ? 'min' : 'max';
}

function getRowSearchKey(row) {
  return state.lang === 'ja' ? row.searchJa : row.searchEn;
}

function filterChips(chips, query) {
  if (!query) return chips;
  return chips.filter(chip => getRowSearchKey(chip.row).includes(query));
}

function renderRuleBadges(chip) {
  if (!chip.badges?.length) return '';
  return `<span class="speed-rule-badges">${chip.badges.map(badge => {
    if (badge.type === 'scarf') {
      return `<span class="badge text-bg-warning text-dark"><span class="ps-item-icon" style="${state.scarfIconStyle}"></span></span>`;
    }
    const cls = badge.type === 'move' ? 'text-bg-info' : 'text-bg-success';
    return `<span class="badge ${cls}">${badge.text}</span>`;
  }).join('')}</span>`;
}

function renderSpeedChip(chip) {
  const iconUrl = getShowdownPokemonIconUrl(chip.row.representativeId);
  const href = `/pokelist/pokedex-pokemon.html?species=${encodeURIComponent(chip.row.representativeId)}`;
  return `<span class="speed-pokemon-cell"><a class="speed-icon-link" href="${href}">${iconUrl ? `<img class="ps-pokemon-icon" src="${iconUrl}" alt="" loading="lazy">` : ''}</a>${renderRuleBadges(chip)}</span>`;
}

function renderColumnChips(chips) {
  if (!chips.length) return '<span class="text-muted">-</span>';
  const baseSet = [...new Set(chips.map(chip => chip.row.baseSpe))].sort((a, b) => b - a);
  const headBadges = baseSet.slice(0, 2).map(base => `<span class="badge rounded-pill text-bg-secondary speed-base-tag mono">${base}族</span>`).join('');
  const etcBadge = baseSet.length > 2 ? `<span class="badge rounded-pill text-bg-light speed-base-tag mono">+${baseSet.length - 2}</span>` : '';
  return `<span class="speed-chip-list"><span class="speed-chip-head">${headBadges}${etcBadge}</span>${chips.map(renderSpeedChip).join('')}</span>`;
}

function renderSpeedTable(keepFocus = false) {
  const tbody = $('speed-table-body');
  if (!tbody) return;

  const currentSpeed = getTargetCurrentSpeed();
  const focusCol = getCurrentFocusColumn();
  const query = normalizeText(state.searchWord || '');

  let shownRows = 0;
  const rows = [];

  state.speedAxis.forEach(speed => {
    const bucket = state.speedBuckets.get(speed);
    if (!bucket) return;

    const filtered = {
      min: filterChips(bucket.min, query),
      max: filterChips(bucket.max, query),
      plus1: filterChips(bucket.plus1, query),
      plus2: filterChips(bucket.plus2, query),
    };

    const hasAny = filtered.min.length || filtered.max.length || filtered.plus1.length || filtered.plus2.length;
    if (!hasAny) return;

    shownRows += 1;
    const isFocusRow = Number(speed) === Number(currentSpeed);

    rows.push(`
      <tr class="${isFocusRow ? 'speed-focus-row' : ''}">
        <td class="mono">${speed}</td>
        <td data-col="min">${renderColumnChips(filtered.min)}</td>
        <td data-col="max">${renderColumnChips(filtered.max)}</td>
        <td data-col="plus1">${renderColumnChips(filtered.plus1)}</td>
        <td data-col="plus2">${renderColumnChips(filtered.plus2)}</td>
      </tr>
    `);
  });

  tbody.innerHTML = rows.join('');

  document.querySelectorAll('#speed-table thead [data-col]').forEach(th => {
    th.classList.toggle('speed-focus-col', th.dataset.col === focusCol);
  });

  const countNode = $('speed-list-count');
  if (countNode) countNode.textContent = t('count', { count: shownRows });

  const focusRow = tbody.querySelector('.speed-focus-row');
  if (focusRow && (keepFocus || !state.didInitialFocus)) {
    focusRow.scrollIntoView({ block: 'center' });
    state.didInitialFocus = true;
  }
}

function listAllTargets() {
  return [
    ...state.storage.box.map(record => ({ kind: 'box', record })),
    ...state.customTargets.map(record => ({ kind: 'custom', record })),
  ];
}

function findTargetById(id) {
  const box = state.storage.box.find(record => record.id === id);
  if (box) return { kind: 'box', record: box };
  const custom = state.customTargets.find(record => record.id === id);
  if (custom) return { kind: 'custom', record: custom };
  return null;
}

function resolveTargetPokemon() {
  const request = state.request;

  if (request?.selectedSpeciesId) {
    const custom = normalizePokemonRecord(defaultPokemonRecord(request.selectedSpeciesId));
    state.customTargets.unshift(custom);
    state.customTargets = state.customTargets.slice(0, 100);
    saveCustomTargets();
    state.targetPokemon = custom;
    state.targetSource = { kind: 'custom' };
    return;
  }

  if (request?.pokemonId) {
    const found = findTargetById(request.pokemonId);
    if (found) {
      state.targetPokemon = found.record;
      state.targetSource = { kind: found.kind };
      return;
    }
  }

  const first = listAllTargets()[0];
  if (first) {
    state.targetPokemon = first.record;
    state.targetSource = { kind: first.kind };
    return;
  }

  const fallback = normalizePokemonRecord(defaultPokemonRecord('fluttermane'));
  state.customTargets.unshift(fallback);
  saveCustomTargets();
  state.targetPokemon = fallback;
  state.targetSource = { kind: 'custom' };
}

function renderQuickTargetList() {
  const wrap = $('target-quick-list');
  if (!wrap) return;

  const targets = listAllTargets();
  wrap.innerHTML = targets.map(target => {
    const species = state.speciesById.get(target.record.speciesId);
    const name = getSpeciesName(species);
    const icon = getShowdownPokemonIconUrl(target.record.speciesId);
    const isActive = state.targetPokemon?.id === target.record.id;
    return `<button class="target-quick-btn ${isActive ? 'active' : ''}" type="button" data-target-id="${target.record.id}">${icon ? `<img class="ps-pokemon-icon" src="${icon}" alt="" loading="lazy">` : ''}<span>${name}</span></button>`;
  }).join('');

  wrap.querySelectorAll('.target-quick-btn').forEach(button => {
    button.addEventListener('click', () => {
      const found = findTargetById(button.dataset.targetId);
      if (!found) return;
      state.targetPokemon = found.record;
      state.targetSource = { kind: found.kind };
      renderTargetPanel();
      renderSpeedTable(true);
      openTargetSearchModal(button.dataset.targetId);
    });
  });
}

function hasMega(speciesId) {
  const species = state.speciesById.get(speciesId);
  if (!species) return false;
  const baseId = toId(species.baseSpecies || species.name);
  return Boolean(state.megaMap[speciesId] || state.megaMap[baseId]);
}

function renderScarfToggle() {
  const button = $('target-scarf');
  if (!button) return;
  const active = Boolean(state.targetPokemon?.itemId === 'choicescarf');
  button.classList.toggle('active', active);
  button.setAttribute('aria-pressed', String(active));
  button.dataset.active = active ? '1' : '0';
  button.innerHTML = `<span class="ps-item-icon" style="${state.scarfIconStyle}"></span>`;
}

function renderMegaToggle() {
  const input = $('target-mega-enabled');
  const icon = $('target-mega-icon');
  if (!input || !icon) return;

  const enabled = hasMega(state.targetPokemon?.speciesId || '');
  const checked = Boolean(state.targetPokemon?.megaEnabled && enabled);

  input.checked = checked;
  input.disabled = !enabled;
  icon.classList.toggle('active', checked);
}

function renderNatureToggle() {
  const button = $('target-nature-plus');
  if (!button) return;
  const active = Boolean(state.targetPokemon?.natureBoost);
  button.classList.toggle('active', active);
  button.setAttribute('aria-pressed', String(active));
}

function renderTargetPanel() {
  const headMain = document.querySelector('.speed-target-head-main');
  if (!headMain) return;

  const target = state.targetPokemon;
  if (!target) {
    headMain.textContent = t('noTarget');
    return;
  }

  const effectiveSpecies = state.speciesById.get(
    getEffectiveSpeciesId(target.speciesId, Boolean(target.megaEnabled), target.itemId || '')
  ) || state.speciesById.get(target.speciesId);

  const iconUrl = effectiveSpecies ? getShowdownPokemonIconUrl(effectiveSpecies.id) : '';
  const name = getSpeciesName(effectiveSpecies || state.speciesById.get(target.speciesId));
  headMain.innerHTML = `${iconUrl ? `<img class="ps-pokemon-icon" src="${iconUrl}" alt="" loading="lazy">` : ''}<span>${name}</span>`;

  $('target-spe-ap').value = String(clamp(toNumber(target.evs?.spe, 0), 0, 32));
  $('target-spe-rank').value = String(clamp(toNumber(target.ranks?.spe, 0), -6, 6));
  $('target-current-speed').textContent = String(getTargetCurrentSpeed());

  const dexLink = $('target-open-pokedex');
  if (dexLink) dexLink.href = `/pokelist/pokedex-pokemon.html?species=${encodeURIComponent(target.speciesId)}`;

  renderScarfToggle();
  renderMegaToggle();
  renderNatureToggle();
  renderQuickTargetList();
}

function updateTargetFromInputs() {
  if (!state.targetPokemon) return;

  const ap = clamp(toNumber($('target-spe-ap')?.value, 0), 0, 32);
  const rank = clamp(toNumber($('target-spe-rank')?.value, 0), -6, 6);
  const scarf = $('target-scarf')?.dataset.active === '1';
  const megaEnabled = Boolean($('target-mega-enabled')?.checked);

  state.targetPokemon.evs.spe = ap;
  state.targetPokemon.ranks.spe = rank;
  state.targetPokemon.megaEnabled = megaEnabled;

  if (scarf) {
    if (state.targetPokemon.itemId !== 'choicescarf') {
      state.targetPrevItemId = state.targetPokemon.itemId || state.targetPrevItemId || '';
    }
    state.targetPokemon.itemId = 'choicescarf';
  } else if (state.targetPokemon.itemId === 'choicescarf') {
    state.targetPokemon.itemId = state.targetPrevItemId || '';
  }

  renderTargetPanel();
  renderSpeedTable(true);
}

function renderTargetSearchList() {
  const list = $('target-search-list');
  if (!list) return;

  const query = normalizeText($('target-search-input')?.value || '');
  const items = state.rowData
    .filter(row => !query || getRowSearchKey(row).includes(query))
    .slice(0, 200);

  list.innerHTML = items.map(row => {
    const species = state.speciesById.get(row.representativeId);
    const name = getSpeciesName(species);
    const icon = getShowdownPokemonIconUrl(row.representativeId);
    return `<button class="target-search-item" type="button" data-species-id="${row.representativeId}">${icon ? `<img class="ps-pokemon-icon" src="${icon}" alt="" loading="lazy">` : ''}<span>${name}</span></button>`;
  }).join('');

  list.querySelectorAll('.target-search-item').forEach(button => {
    button.addEventListener('click', () => {
      const assign = findTargetById(state.searchAssignTargetId);
      if (!assign) return;

      assign.record.speciesId = button.dataset.speciesId;
      assign.record.megaEnabled = false;

      state.targetPokemon = assign.record;
      state.targetSource = { kind: assign.kind };

      if (assign.kind === 'box') saveStorage();
      else saveCustomTargets();

      renderTargetPanel();
      renderSpeedTable(true);
      state.targetSearchModal?.hide();
    });
  });
}

function openTargetSearchModal(targetId = '') {
  state.searchAssignTargetId = targetId || state.targetPokemon?.id || '';
  $('target-search-input').value = '';
  renderTargetSearchList();
  state.targetSearchModal?.show();
}

function editCurrentPokemon() {
  if (!state.targetPokemon) return;

  if (state.targetSource?.kind === 'box') {
    localStorage.setItem(OPEN_DETAIL_REQUEST_KEY, JSON.stringify({ pokemonId: state.targetPokemon.id }));
    window.location.href = '/pokelist/box-party.html';
    return;
  }

  const created = normalizePokemonRecord({
    ...state.targetPokemon,
    id: `box-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    isCustomSpeedTarget: false,
  });

  state.storage.box.unshift(created);
  saveStorage();
  localStorage.setItem(OPEN_DETAIL_REQUEST_KEY, JSON.stringify({ pokemonId: created.id }));
  window.location.href = '/pokelist/box-party.html';
}

function applyI18n() {
  document.documentElement.lang = state.lang;

  document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.getAttribute('data-i18n');
    if (node.id === 'speed-list-count') return;
    node.textContent = t(key);
  });

  document.querySelectorAll('[data-i18n-title]').forEach(node => {
    const key = node.getAttribute('data-i18n-title');
    const text = t(key);
    node.setAttribute('title', text);
    node.setAttribute('aria-label', text);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(node => {
    const key = node.getAttribute('data-i18n-placeholder');
    node.setAttribute('placeholder', t(key));
  });

  document.querySelectorAll('#lang-tabs [data-lang]').forEach(button => {
    button.classList.toggle('active', button.dataset.lang === state.lang);
  });

  renderTargetPanel();
  renderTargetSearchList();
}

function navigateBack() {
  const returnPath = state.request?.returnPath || '/pokelist/box-party.html';
  window.location.href = returnPath;
}

function handleHistoryBack() {
  if (window.history.length > 1) {
    window.history.back();
    return;
  }
  navigateBack();
}

function bindEvents() {
  $('speed-search')?.addEventListener('input', () => {
    state.searchWord = $('speed-search').value.trim();
    renderSpeedTable();
  });

  ['target-spe-ap', 'target-spe-rank'].forEach(id => {
    const node = $(id);
    if (!node) return;
    node.addEventListener('input', updateTargetFromInputs);
    node.addEventListener('change', updateTargetFromInputs);
  });

  $('target-scarf')?.addEventListener('click', () => {
    const node = $('target-scarf');
    node.dataset.active = node.dataset.active === '1' ? '0' : '1';
    updateTargetFromInputs();
  });

  $('target-mega-enabled')?.addEventListener('change', updateTargetFromInputs);

  $('target-nature-plus')?.addEventListener('click', () => {
    if (!state.targetPokemon) return;
    state.targetPokemon.natureBoost = !state.targetPokemon.natureBoost;
    updateTargetFromInputs();
  });

  $('target-picker-trigger')?.addEventListener('click', () => openTargetSearchModal());
  $('target-search-input')?.addEventListener('input', renderTargetSearchList);

  $('target-edit-detail')?.addEventListener('click', editCurrentPokemon);

  $('speed-save-only')?.addEventListener('click', () => {
    if (!state.targetPokemon) return;
    if (state.targetSource?.kind === 'box') saveStorage();
    else saveCustomTargets();
  });

  $('speed-history-back')?.addEventListener('click', handleHistoryBack);

  document.querySelectorAll('#lang-tabs [data-lang]').forEach(button => {
    button.addEventListener('click', () => {
      state.lang = button.dataset.lang;
      persistLanguagePreference();
      applyI18n();
      renderSpeedTable(true);
    });
  });
}

async function initialize() {
  loadLanguagePreference();
  loadStorage();
  loadCustomTargets();
  loadRequest();

  const [data, rules, speciesCsvRecords] = await Promise.all([
    fetchJson('/pokelist/db/champions-calc-data.json'),
    fetchJson('/pokelist/db/speed-adjust-rules.json'),
    fetchCsvRecords('/pokelist/db/ダメージ計算 - def_pokemon.csv'),
  ]);

  state.data = data;
  state.rules = rules;

  setupLookups();
  setupSpeciesJapaneseMap(speciesCsvRecords);
  resolveTargetPokemon();
  buildGroupedSpeciesRows();
  createSpeedBuckets();

  const modalElement = $('target-search-modal');
  if (modalElement && window.bootstrap?.Modal) {
    state.targetSearchModal = new bootstrap.Modal(modalElement);
  }

  const formatNode = document.querySelector('.speed-format-chip');
  if (formatNode && rules?.format) formatNode.textContent = rules.format;

  applyI18n();
  renderTargetPanel();
  renderSpeedTable();
  bindEvents();

  const backTop = $('speed-back-top');
  if (backTop && state.request?.returnPath) backTop.href = state.request.returnPath;
}

initialize().catch(error => {
  console.error(error);
  const head = document.querySelector('.speed-target-head-main');
  if (head) head.textContent = t('loadFailed');
});
