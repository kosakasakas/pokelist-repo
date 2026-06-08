const STORAGE_KEY = 'champions-damage-calc-box-party-v1';
const OPEN_DETAIL_REQUEST_KEY = 'champions-open-detail-request-v1';
const SPEED_ADJUST_REQUEST_KEY = 'champions-speed-adjust-request-v1';
const SPEED_ADJUST_LAST_TARGET_KEY = 'champions-speed-adjust-last-target-v1';
const SPEED_ADJUST_ROW_CACHE_KEY = 'champions-speed-adjust-row-cache-v1';
const LANG_STORAGE_KEY = 'champions-tool-ui-lang-v1';

const SPEED_PLUS_NATURES = new Set(['timid', 'hasty', 'jolly', 'naive']);
const SPEED_MINUS_NATURES = new Set(['brave', 'relaxed', 'quiet', 'sassy']);

const GROUPS = [
  { key: 'slow', label: 'groupSlow', badge: 'text-bg-secondary' },
  { key: 'noEv', label: 'groupNoEv', badge: 'text-bg-secondary' },
  { key: 'junsoku', label: 'groupJunsoku', badge: 'text-bg-primary' },
  { key: 'saisoku', label: 'groupSaisoku', badge: 'text-bg-primary' },
  { key: 'junsokuScarf', label: 'groupJunsokuScarf', badge: 'text-bg-warning text-dark' },
  { key: 'saisokuScarf', label: 'groupSaisokuScarf', badge: 'text-bg-warning text-dark' },
  { key: 'junsokuPlus1', label: 'groupJunsokuPlus1', badge: 'text-bg-success' },
  { key: 'saisokuPlus1', label: 'groupSaisokuPlus1', badge: 'text-bg-success' },
  { key: 'junsokuPlus2', label: 'groupJunsokuPlus2', badge: 'text-bg-info text-dark' },
  { key: 'saisokuPlus2', label: 'groupSaisokuPlus2', badge: 'text-bg-info text-dark' },
];

const FORME_NAME_JA = {
  Alola: 'アローラ', Hisui: 'ヒスイ', Galar: 'ガラル', Paldea: 'パルデア', Pirouette: 'ステップ',
  Noice: 'ナイスフェイス', Hangry: 'はらぺこ', Hero: 'マイティ', Terastal: 'テラス',
};

const I18N = {
  ja: {
    title: '素早さ調整',
    subtitle: '[Gen 9 Champions] VGC 2026 Reg M-A',
    back: '戻る',
    backToPage: 'ページへ戻る',
    targetFormat: '対象フォーマット',
    targetPokemon: '対象ポケモン',
    targetSearchTitle: '対象ポケモンを検索',
    search: '検索',
    searchPlaceholder: 'ポケモン名で検索',
    speedValue: '実数値',
    groupList: '対象群',
    save: '個体を保存',
    apLabel: '能力ポイント',
    rankLabel: 'ランク',
    naturePlus: '性格補正を切替 (+10% / -10% / 0%)',
    megaEvolution: 'メガ進化',
    scarf: 'こだわりスカーフ',
    noTarget: '対象ポケモンが見つかりません。',
    loadFailed: 'ページ初期化に失敗しました。',
    count: '{count}件',
    loadingTarget: '対象を読み込み中...',
    editPokemon: '詳細編集',
    pokedex: '図鑑',
    allList: '全リスト',
    boxList: 'ボックス',
    partyList: 'パーティ',
    sourceAll: '全リスト',
    sourceBox: 'ボックス',
    sourceParty: 'パーティ',
    groupSlow: '最遅',
    groupNoEv: '無振り',
    groupJunsoku: '準速',
    groupSaisoku: '最速',
    groupJunsokuScarf: '準速',
    groupSaisokuScarf: '最速',
    groupJunsokuPlus1: '準速+1',
    groupSaisokuPlus1: '最速+1',
    groupJunsokuPlus2: '準速+2',
    groupSaisokuPlus2: '最速+2',
    nickname: 'ニックネーム',
    cancel: 'キャンセル',
    apply: '適用',
    saveUpdated: '保存しました',
    saveAdded: 'ボックスへ追加して保存しました',
  },
  en: {
    title: 'Speed Tuning',
    subtitle: '[Gen 9 Champions] VGC 2026 Reg M-A',
    back: 'Back',
    backToPage: 'Back to page',
    targetFormat: 'Target format',
    targetPokemon: 'Target Pokemon',
    targetSearchTitle: 'Select target Pokemon',
    search: 'Search',
    searchPlaceholder: 'Filter by Pokemon',
    speedValue: 'Speed',
    groupList: 'Groups',
    save: 'Save Pokemon',
    apLabel: 'Effort points',
    rankLabel: 'Rank',
    naturePlus: 'Toggle nature modifier (+10% / -10% / 0%)',
    megaEvolution: 'Mega Evolution',
    scarf: 'Choice Scarf',
    noTarget: 'Target Pokemon not found.',
    loadFailed: 'Failed to initialize page.',
    count: '{count} rows',
    loadingTarget: 'Loading target...',
    editPokemon: 'Edit',
    pokedex: 'Pokedex',
    allList: 'All list',
    boxList: 'Box',
    partyList: 'Party',
    sourceAll: 'All list',
    sourceBox: 'Box',
    sourceParty: 'Party',
    groupSlow: 'Min',
    groupNoEv: 'No EV',
    groupJunsoku: 'Neutral 252',
    groupSaisoku: 'Max',
    groupJunsokuScarf: 'Neutral 252',
    groupSaisokuScarf: 'Max',
    groupJunsokuPlus1: 'Neutral 252 +1',
    groupSaisokuPlus1: 'Max +1',
    groupJunsokuPlus2: 'Neutral 252 +2',
    groupSaisokuPlus2: 'Max +2',
    nickname: 'Nickname',
    cancel: 'Cancel',
    apply: 'Apply',
    saveUpdated: 'Saved',
    saveAdded: 'Added to box and saved',
  },
};

const $ = id => document.getElementById(id);
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const toNumber = (v, f = 0) => Number.isFinite(Number(v)) ? Number(v) : f;
const toId = text => String(text || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const normalizeFormeKey = forme => String(forme || '').replace(/[^A-Za-z]/g, '');
const normalizeText = text => String(text || '').normalize('NFKC').toLowerCase();
const escapeHtmlText = text => String(text || '').replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

function toShortFormLabel(species) {
  if (!species) return '-';
  const forme = String(species.forme || '').trim();
  if (!forme) return state.lang === 'ja' ? '通常' : 'Base';
  const lower = forme.toLowerCase();
  if (lower.startsWith('mega')) {
    if (lower.includes('-x') || lower.endsWith(' x')) return state.lang === 'ja' ? 'メガX' : 'Mega X';
    if (lower.includes('-y') || lower.endsWith(' y')) return state.lang === 'ja' ? 'メガY' : 'Mega Y';
    if (lower.includes('-z') || lower.endsWith(' z')) return state.lang === 'ja' ? 'メガZ' : 'Mega Z';
    return state.lang === 'ja' ? 'メガ' : 'Mega';
  }
  const compactJa = FORME_NAME_JA[forme] || FORME_NAME_JA[normalizeFormeKey(forme)] || '';
  return state.lang === 'ja' ? (compactJa || forme) : forme;
}

const state = {
  lang: 'ja',
  request: null,
  storage: { box: [], parties: [], calcLinks: { attacker: null, defender: null } },
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
  targetSource: { kind: 'list' },
  targetPrevItemId: '',
  scarfIconStyle: '',
  didInitialFocus: false,
  targetSearchModal: null,
  targetSearchScope: 'all',
  saveFeedbackTimer: null,
  detailHostListenerBound: false,
};

function t(key, vars = {}) {
  let text = I18N[state.lang]?.[key] || I18N.ja[key] || key;
  Object.entries(vars).forEach(([name, value]) => { text = text.replace(`{${name}}`, String(value)); });
  return text;
}

function defaultPokemonRecord(speciesId = 'charizard') {
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
    natureBoostMode: 'neutral',
  };
}

function defaultMegaCharizardYRecord() {
  const p = defaultPokemonRecord('charizard');
  p.itemId = 'megastoney';
  p.megaEnabled = true;
  return p;
}

function normalizePokemonRecord(record) {
  const base = defaultPokemonRecord(record?.speciesId || 'charizard');
  const next = { ...base, ...(record || {}) };
  next.evs = { ...base.evs, ...(record?.evs || {}) };
  next.ranks = { ...base.ranks, ...(record?.ranks || {}) };
  next.moveIds = Array.isArray(record?.moveIds) ? record.moveIds.filter(Boolean).slice(0, 4) : [];
  next.calcHistory = Array.isArray(record?.calcHistory) ? record.calcHistory.slice(-20) : [];
  if (!['plus', 'minus', 'neutral'].includes(next.natureBoostMode)) {
    if (typeof next.natureBoost === 'boolean') next.natureBoostMode = next.natureBoost ? 'plus' : 'neutral';
    else next.natureBoostMode = 'neutral';
  }
  return next;
}

function parseCsvLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') { current += '"'; i += 1; }
      else inQuotes = !inQuotes;
      continue;
    }
    if (c === ',' && !inQuotes) { values.push(current); current = ''; continue; }
    current += c;
  }
  values.push(current);
  return values;
}

async function fetchJson(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load: ${url}`);
  return res.json();
}

async function fetchCsvRecords(url) {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Failed to load CSV: ${url}`);
  const text = (await res.text()).replace(/^\uFEFF/, '');
  const lines = text.split(/\r?\n/).filter(Boolean);
  const headers = parseCsvLine(lines[0] || '');
  return lines.slice(1).map(line => {
    const vals = parseCsvLine(line);
    const r = {};
    headers.forEach((h, i) => { r[h] = vals[i] || ''; });
    return r;
  });
}

async function fetchCsvRecordsSafe(url) {
  try {
    return await fetchCsvRecords(url);
  } catch (_error) {
    return [];
  }
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
      return;
    }
  } catch (_error) {
    // ignore
  }
  state.storage = { box: [], parties: [], calcLinks: { attacker: null, defender: null } };
}

function saveStorage() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.storage)); }

function loadRequest() {
  try { state.request = JSON.parse(localStorage.getItem(SPEED_ADJUST_REQUEST_KEY) || 'null'); }
  catch (_error) { state.request = null; }
  localStorage.removeItem(SPEED_ADJUST_REQUEST_KEY);
}

function loadLastTargetState() {
  try {
    return JSON.parse(localStorage.getItem(SPEED_ADJUST_LAST_TARGET_KEY) || 'null');
  } catch (_error) {
    return null;
  }
}

function generateBoxId() {
  return `box-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

function persistLastTargetState() {
  if (!state.targetPokemon) return;
  const payload = {
    source: state.targetSource?.kind === 'box' ? 'box' : 'list',
    pokemonId: state.targetSource?.kind === 'box' ? (state.targetPokemon.id || '') : '',
    target: state.targetSource?.kind === 'box'
      ? null
      : {
          speciesId: state.targetPokemon.speciesId,
          nature: state.targetPokemon.nature,
          megaEnabled: Boolean(state.targetPokemon.megaEnabled),
          itemId: state.targetPokemon.itemId || '',
          evs: { ...(state.targetPokemon.evs || {}) },
          ranks: { ...(state.targetPokemon.ranks || {}) },
            natureBoostMode: state.targetPokemon.natureBoostMode || 'neutral',
            natureBoost: state.targetPokemon.natureBoostMode === 'plus',
        },
  };
  localStorage.setItem(SPEED_ADJUST_LAST_TARGET_KEY, JSON.stringify(payload));
}

function showSaveFeedback(messageKey) {
  const node = $('speed-save-feedback');
  if (!node) return;
  node.textContent = t(messageKey);
  if (state.saveFeedbackTimer) window.clearTimeout(state.saveFeedbackTimer);
  state.saveFeedbackTimer = window.setTimeout(() => {
    node.textContent = '';
    state.saveFeedbackTimer = null;
  }, 2400);
}

function calcSingleStat(base, ap, nature) {
  let stat = base + ap + 20;
  if (nature === 1.1) stat = Math.trunc((Math.trunc(stat * 110)) / 100);
  else if (nature === 0.9) stat = Math.trunc((Math.trunc(stat * 90)) / 100);
  return Math.max(1, stat);
}

function applyStageToStat(value, rank) {
  const r = clamp(toNumber(rank), -6, 6);
  if (r >= 0) return Math.floor((value * (2 + r)) / 2);
  return Math.floor((value * 2) / (2 - r));
}

function getNatureSpeedMultiplier(target) {
  const mode = target?.natureBoostMode;
  if (mode === 'plus') return 1.1;
  if (mode === 'minus') return 0.9;
  if (SPEED_PLUS_NATURES.has(target?.nature)) return 1.1;
  if (SPEED_MINUS_NATURES.has(target?.nature)) return 0.9;
  return 1;
}

function setupSpeciesJapaneseMap(records) {
  state.speciesNameJaById = new Map();
  Object.entries(records || {}).forEach(([id, entry]) => {
    const ja = String(entry?.nameJa || '').trim();
    if (!id || !ja) return;
    if (!state.speciesNameJaById.has(id)) state.speciesNameJaById.set(id, ja);
  });
}

function getItemIconStyle(itemId) {
  const item = state.itemsById.get(itemId);
  if (!item) return '';
  const iconNum = Number.isFinite(Number(item.spritenum)) ? Number(item.spritenum) : Number(item.num);
  if (!Number.isFinite(iconNum)) return '';
  const x = (iconNum % 16) * 24;
  const y = Math.floor(iconNum / 16) * 24;
  return `background-image:url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png);background-position:-${x}px -${y}px;`;
}

function setupLookups() {
  const speciesList = [...(state.data?.species || []), ...(state.data?.megaSpecies || [])];
  state.speciesById = new Map(speciesList.map(s => [s.id, s]));
  state.abilityNameToId = new Map((state.data?.abilities || []).map(a => [a.name, a.id]));
  state.itemsById = new Map((state.data?.items || []).map(i => [i.id, i]));
  state.megaMap = state.data?.megaMap || {};

  const item = state.itemsById.get('choicescarf');
  if (!item) return;
  const iconNum = Number.isFinite(Number(item.spritenum)) ? Number(item.spritenum) : Number(item.num);
  if (!Number.isFinite(iconNum)) return;
  const x = (iconNum % 16) * 24;
  const y = Math.floor(iconNum / 16) * 24;
  state.scarfIconStyle = `background-image:url(https://play.pokemonshowdown.com/sprites/itemicons-sheet.png);background-position:-${x}px -${y}px;`;
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
  return new Set(Array.isArray(byId[speciesId]) ? byId[speciesId] : []);
}

function getEffectiveSpeciesId(speciesId, megaEnabled, itemId = '') {
  void megaEnabled;
  void itemId;
  return speciesId;
}

function inferMegaStoneType(form = {}) {
  const explicit = String(form.stoneType || '').toLowerCase();
  if (explicit === 'x' || explicit === 'y' || explicit === 'z' || explicit === 'normal') return explicit;
  const requiredItemId = String(form.requiredItemId || '').toLowerCase();
  if (requiredItemId.endsWith('x')) return 'x';
  if (requiredItemId.endsWith('y')) return 'y';
  if (requiredItemId.endsWith('z')) return 'z';
  const formId = String(form.id || '').toLowerCase();
  if (formId.endsWith('megax')) return 'x';
  if (formId.endsWith('megay')) return 'y';
  if (formId.endsWith('megaz')) return 'z';
  return 'normal';
}

function canUseScarf(species) {
  if (!species || species.requiredItem) return false;
  return !String(species.forme || '').toLowerCase().startsWith('mega');
}

function classifyRuleTier(rule) {
  if (!rule) return 0;
  if (Number.isFinite(Number(rule.stage))) return Number(rule.stage) >= 2 ? 2 : 1;
  if (Number.isFinite(Number(rule.multiplier))) return Number(rule.multiplier) >= 2 ? 2 : Number(rule.multiplier) > 1 ? 1 : 0;
  return 0;
}

function buildGroupedSpeciesRows() {
  const groups = new Map();
  (state.data?.species || []).forEach(species => {
    if (!species?.baseStats) return;
    const s = species.baseStats;
    const sig = `${s.hp}|${s.atk}|${s.def}|${s.spa}|${s.spd}|${s.spe}`;
    const key = `${toId(species.baseSpecies || species.name)}|${sig}`;
    if (!groups.has(key)) groups.set(key, { speciesIds: [], representativeId: species.id, baseSpe: toNumber(s.spe, 0) });
    const g = groups.get(key);
    g.speciesIds.push(species.id);
    if (!species.forme && !species.id.includes('totem')) g.representativeId = species.id;
  });

  let abilityRules = state.rules?.abilities || [];
  const moveRules = state.rules?.moves || [];
  const rows = [];

  abilityRules = abilityRules.filter(rule => rule.id !== 'steamengine');

  groups.forEach(group => {
    const rep = state.speciesById.get(group.representativeId);
    if (!rep) return;

    const baseSpe = group.baseSpe;
    const slow = calcSingleStat(baseSpe, 0, 0.9);
    const noEv = calcSingleStat(baseSpe, 0, 1);
    const junsoku = calcSingleStat(baseSpe, 32, 1);
    const saisoku = calcSingleStat(baseSpe, 32, 1.1);

    const abilityIds = new Set(Object.values(rep.abilities || {}).map(name => state.abilityNameToId.get(name)).filter(Boolean));
    const learnset = getSpeciesLearnset(rep.id);
    const plus1Badges = [];
    const plus2Badges = [];

    abilityRules.forEach(rule => {
      if (!abilityIds.has(rule.id)) return;
      const tier = classifyRuleTier(rule);
      if (tier >= 2) {
        plus2Badges.push({ key: `a2-${rule.id}`, text: rule.label, type: 'ability' });
      } else if (tier >= 1) {
        plus1Badges.push({ key: `a1-${rule.id}`, text: rule.label, type: 'ability' });
      }
    });

    moveRules.forEach(rule => {
      if (!learnset.has(rule.id)) return;
      const tier = classifyRuleTier(rule);
      if (tier >= 2) {
        plus2Badges.push({ key: `m2-${rule.id}`, text: rule.label, type: 'move' });
      } else if (tier >= 1) {
        plus1Badges.push({ key: `m1-${rule.id}`, text: rule.label, type: 'move' });
      }
    });

    rows.push({
      representativeId: rep.id,
      baseSpe,
      speeds: {
        slow,
        noEv,
        junsoku,
        saisoku,
        junsokuScarf: Math.floor(junsoku * 1.5),
        saisokuScarf: Math.floor(saisoku * 1.5),
        junsokuPlus1: applyStageToStat(junsoku, 1),
        saisokuPlus1: applyStageToStat(saisoku, 1),
        junsokuPlus2: applyStageToStat(junsoku, 2),
        saisokuPlus2: applyStageToStat(saisoku, 2),
      },
      canScarf: canUseScarf(rep),
      plus1Badges,
      plus2Badges,
      searchJa: normalizeText(group.speciesIds.map(id => getSpeciesName(state.speciesById.get(id))).join(' ')),
      searchEn: normalizeText(group.speciesIds.map(id => state.speciesById.get(id)?.name || id).join(' ')),
    });
  });

  rows.sort((a, b) => b.speeds.saisoku - a.speeds.saisoku || a.representativeId.localeCompare(b.representativeId));
  state.rowData = rows;
}

function createEmptyBucketRow() {
  const row = {};
  GROUPS.forEach(group => { row[group.key] = new Map(); });
  return row;
}

function ensureBucket(speed, map) {
  if (!map.has(speed)) map.set(speed, createEmptyBucketRow());
  return map.get(speed);
}

function addChip(map, speed, groupKey, row, badges = []) {
  const bucket = ensureBucket(speed, map);
  if (!bucket[groupKey].has(row.representativeId)) bucket[groupKey].set(row.representativeId, { row, badges: [] });
  const chip = bucket[groupKey].get(row.representativeId);
  badges.forEach(b => { if (!chip.badges.some(e => e.key === b.key)) chip.badges.push(b); });
}

function createSpeedBuckets() {
  const map = new Map();
  const axis = new Set();

  function put(row, key, badges = []) {
    const speed = row.speeds[key];
    addChip(map, speed, key, row, badges);
    axis.add(speed);
  }

  state.rowData.forEach(row => {
    put(row, 'slow');
    put(row, 'noEv');
    put(row, 'junsoku');
    put(row, 'saisoku');

    if (row.canScarf) {
      put(row, 'junsokuScarf');
      put(row, 'saisokuScarf');
    }

    if (row.plus2Badges.length) {
      put(row, 'junsokuPlus2', row.plus2Badges);
      put(row, 'saisokuPlus2', row.plus2Badges);
    } else if (row.plus1Badges.length) {
      put(row, 'junsokuPlus1', row.plus1Badges);
      put(row, 'saisokuPlus1', row.plus1Badges);
    }
  });

  const converted = new Map();
  map.forEach((bucket, speed) => {
    const grouped = {};
    GROUPS.forEach(group => { grouped[group.key] = [...bucket[group.key].values()]; });
    converted.set(speed, grouped);
  });

  state.speedBuckets = converted;
  state.speedAxis = [...axis].sort((a, b) => b - a);
}

function getTargetEffectiveSpecies() {
  if (!state.targetPokemon) return null;
  return state.speciesById.get(state.targetPokemon.speciesId) || null;
}

function getTargetCurrentSpeed() {
  const species = getTargetEffectiveSpecies();
  if (!species || !state.targetPokemon) return 0;
  const base = toNumber(species.baseStats?.spe, 0);
  const ap = clamp(toNumber(state.targetPokemon.evs?.spe, 0), 0, 32);
  const rank = clamp(toNumber(state.targetPokemon.ranks?.spe, 0), -6, 6);
  const nature = getNatureSpeedMultiplier(state.targetPokemon);
  let speed = applyStageToStat(calcSingleStat(base, ap, nature), rank);
  if (state.targetPokemon.itemId === 'choicescarf') speed = Math.floor(speed * 1.5);
  return speed;
}

function getCurrentFocusGroup() {
  if (!state.targetPokemon) return 'saisoku';
  const rank = clamp(toNumber(state.targetPokemon.ranks?.spe, 0), -6, 6);
  const ap = clamp(toNumber(state.targetPokemon.evs?.spe, 0), 0, 32);
  const fast = getNatureSpeedMultiplier(state.targetPokemon) >= 1.1;
  if (rank >= 2) return fast ? 'saisokuPlus2' : 'junsokuPlus2';
  if (rank >= 1) return fast ? 'saisokuPlus1' : 'junsokuPlus1';
  if (state.targetPokemon.itemId === 'choicescarf') return fast ? 'saisokuScarf' : 'junsokuScarf';
  if (ap === 0 && getNatureSpeedMultiplier(state.targetPokemon) <= 0.9) return 'slow';
  if (ap === 0) return 'noEv';
  return fast ? 'saisoku' : 'junsoku';
}

function getRowSearchKey(row) { return state.lang === 'ja' ? row.searchJa : row.searchEn; }

function filterChips(chips, query) { return !query ? chips : chips.filter(chip => getRowSearchKey(chip.row).includes(query)); }

function renderRuleBadges(chip) {
  if (!chip.badges?.length) return '';
  return `<span class="speed-rule-badges">${chip.badges.map(badge => {
    if (badge.type === 'scarf') return `<span class="badge text-bg-warning text-dark"><span class="ps-item-icon" style="${state.scarfIconStyle}"></span></span>`;
    return `<span class="badge ${badge.type === 'move' ? 'text-bg-info' : 'text-bg-success'}">${badge.text}</span>`;
  }).join('')}</span>`;
}

function renderSpeedChip(chip) {
  if (chip?.isSelf) {
    const icon = getShowdownPokemonIconUrl(chip.speciesId);
    return `<span class="speed-pokemon-cell speed-self-chip">${icon ? `<img class="ps-pokemon-icon" src="${icon}" alt="" loading="lazy">` : ''}<span class="speed-self-badge">自分</span></span>`;
  }
  const icon = getShowdownPokemonIconUrl(chip.row.representativeId);
  const returnPath = encodeURIComponent(window.location.pathname + window.location.search);
  const href = `./pokedex-pokemon.html?species=${encodeURIComponent(chip.row.representativeId)}&returnPath=${returnPath}`;
  return `<span class="speed-pokemon-cell"><a class="speed-icon-link" href="${href}">${icon ? `<img class="ps-pokemon-icon" src="${icon}" alt="" loading="lazy">` : ''}</a>${renderRuleBadges(chip)}</span>`;
}

function buildTargetSelfChip() {
  if (!state.targetPokemon) return null;
  return {
    isSelf: true,
    speciesId: state.targetPokemon.speciesId,
  };
}

function getGroupTierLabel(chips) {
  const tiers = [...new Set(chips.map(chip => toNumber(chip.row?.baseSpe, 0)).filter(value => value > 0))].sort((a, b) => a - b);
  if (!tiers.length) return '';
  if (tiers.length === 1) return `${tiers[0]}族`;
  const visible = tiers.slice(0, 3).join('/');
  return `${visible}${tiers.length > 3 ? '+' : ''}族`;
}

function renderGroupLabel(group, chips) {
  const tier = getGroupTierLabel(chips);
  const label = t(group.label);
  const withIcon = group.key === 'junsokuScarf' || group.key === 'saisokuScarf';
  const icon = withIcon && state.scarfIconStyle
    ? `<span class="ps-item-icon speed-group-scarf-icon" style="${state.scarfIconStyle}"></span>`
    : '';
  return `${label}${icon}${tier ? ` ${tier}` : ''}`;
}

function renderGroupRows(grouped, focusGroup, isFocusRow) {
  const selfChips = [];
  const orderedGroups = [...GROUPS].sort((a, b) => {
    if (a.key === focusGroup) return -1;
    if (b.key === focusGroup) return 1;
    return 0;
  });

  const normalRows = orderedGroups.map(group => {
    const chips = grouped[group.key] || [];
    if (!chips.length) return '';
    const groupSelfChips = chips.filter(chip => chip?.isSelf);
    groupSelfChips.forEach(chip => selfChips.push(chip));
    const normalChips = chips.filter(chip => !chip?.isSelf);
    if (!normalChips.length) return '';
    const isFocusGroup = focusGroup === group.key;
    const hl = (isFocusRow && isFocusGroup) ? 'speed-group-highlight speed-column-pulse' : '';
    const anchor = (isFocusRow && isFocusGroup && !selfChips.length) ? ' speed-focus-anchor' : '';
    return `<div class="speed-group ${hl}${anchor}"><span class="badge ${group.badge} speed-group-label">${renderGroupLabel(group, chips)}</span><span class="speed-chip-list">${normalChips.map(renderSpeedChip).join('')}</span></div>`;
  }).join('');

  const selfGroup = selfChips.length
    ? `<div class="speed-group speed-group-self${isFocusRow ? ' speed-group-highlight speed-column-pulse speed-focus-anchor' : ''}"><span class="badge text-bg-danger speed-group-label">自分</span><span class="speed-chip-list">${selfChips.map(renderSpeedChip).join('')}</span></div>`
    : '';

  return `${selfGroup}${normalRows}`;
}

function renderSpeedTable(keepFocus = false) {
  const tbody = $('speed-table-body');
  if (!tbody) return;

  const currentSpeed = getTargetCurrentSpeed();
  const focusGroup = getCurrentFocusGroup();
  const query = normalizeText(state.searchWord || '');
  const rowCache = {};
  const html = state.speedAxis.map(speed => {
    const bucket = state.speedBuckets.get(speed);
    if (!bucket) return '';

    const grouped = {};
    GROUPS.forEach(group => { grouped[group.key] = filterChips(bucket[group.key] || [], query); });

    if (Number(speed) === Number(currentSpeed)) {
      const selfChip = buildTargetSelfChip();
      if (selfChip && grouped[focusGroup]) grouped[focusGroup] = [selfChip, ...grouped[focusGroup]];
    }

    if (!GROUPS.some(group => grouped[group.key].length)) return '';

    const focusRow = Number(speed) === Number(currentSpeed) ? 'speed-focus-row' : '';
    const groupHtml = renderGroupRows(grouped, focusGroup, Boolean(focusRow));
    rowCache[String(speed)] = { speed: Number(speed), html: groupHtml };
    return `<tr id="speed-row-${speed}" class="${focusRow}"><td class="mono">${speed}</td><td><div class="speed-group-stack">${groupHtml}</div></td></tr>`;
  }).join('');

  tbody.innerHTML = html;
  if (!query) {
    try {
      localStorage.setItem(SPEED_ADJUST_ROW_CACHE_KEY, JSON.stringify({
        updatedAt: Date.now(),
        lang: state.lang,
        rows: rowCache,
      }));
    } catch (_error) {
      // ignore cache write failures
    }
  }

  const focusRowId = `speed-row-${currentSpeed}`;
  const focusRow = $(focusRowId) || tbody.querySelector('.speed-focus-row');
  if (focusRow && (keepFocus || !state.didInitialFocus)) {
    const container = document.querySelector('.table-container');
    if (container && container.contains(focusRow)) {
      const moveFocus = () => {
        const rowRect = focusRow.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const headerHeight = document.querySelector('#speed-table thead')?.getBoundingClientRect().height || 0;
        const mobileOffset = window.matchMedia('(max-width: 767.98px)').matches ? 14 : 8;
        const top = Math.max(0, container.scrollTop + (rowRect.top - containerRect.top) - headerHeight - mobileOffset);
        const behavior = keepFocus && !window.matchMedia('(max-width: 767.98px)').matches ? 'smooth' : 'auto';
        container.scrollTo({ top, behavior });
      };
      requestAnimationFrame(() => requestAnimationFrame(moveFocus));
    } else {
      focusRow.scrollIntoView({ block: 'start' });
    }
    if (keepFocus) {
      focusRow.classList.add('highlight-row');
      setTimeout(() => focusRow.classList.remove('highlight-row'), 1500);
    }
    state.didInitialFocus = true;
  }
}

function getBoxPokemonById(id) { return state.storage.box.find(p => p.id === id) || null; }

function getPartyEntries() {
  const entries = [];
  (state.storage.parties || []).forEach(party => {
    if (!Array.isArray(party?.slots)) return;
    party.slots.forEach((pokemonId, index) => {
      if (!pokemonId) return;
      const pokemon = getBoxPokemonById(pokemonId);
      if (!pokemon) return;
      const species = state.speciesById.get(pokemon.speciesId);
      const label = pokemon.nickname ? `${pokemon.nickname} (${getSpeciesName(species)})` : getSpeciesName(species);
      entries.push({
        id: `${party.id}-${index}`,
        type: 'party',
        record: pokemon,
        label,
        search: normalizeText(`${pokemon.nickname || ''} ${getSpeciesName(species)} ${party.name || ''}`),
        sub: `${party.name || (state.lang === 'ja' ? 'パーティ' : 'Party')} #${index + 1}`,
        iconUrl: getShowdownPokemonIconUrl(pokemon.speciesId),
        itemIconStyle: getItemIconStyle(pokemon.itemId || ''),
      });
    });
  });
  return entries;
}

function resolveTargetPokemon() {
  if (state.request?.pokemonId) {
    const target = getBoxPokemonById(state.request.pokemonId);
    if (target) {
      state.targetPokemon = target;
      state.targetSource = { kind: 'box' };
      return;
    }
  }

  if (state.request?.selectedSpeciesId) {
    state.targetPokemon = normalizePokemonRecord(defaultPokemonRecord(state.request.selectedSpeciesId));
    const prefill = state.request?.prefill;
    if (prefill && typeof prefill === 'object') {
      state.targetPokemon.evs.spe = clamp(toNumber(prefill.apSpe, state.targetPokemon.evs.spe), 0, 32);
      state.targetPokemon.ranks.spe = clamp(toNumber(prefill.rankSpe, state.targetPokemon.ranks.spe), -6, 6);
      if (typeof prefill.natureBoostMode === 'string' && ['plus', 'minus', 'neutral'].includes(prefill.natureBoostMode)) state.targetPokemon.natureBoostMode = prefill.natureBoostMode;
      else if (typeof prefill.natureBoost === 'boolean') state.targetPokemon.natureBoostMode = prefill.natureBoost ? 'plus' : 'neutral';
      if (typeof prefill.scarf === 'boolean') state.targetPokemon.itemId = prefill.scarf ? 'choicescarf' : '';
      if (typeof prefill.megaEnabled === 'boolean') state.targetPokemon.megaEnabled = prefill.megaEnabled;
    }
    state.targetSource = { kind: 'list' };
    return;
  }

  const lastTarget = loadLastTargetState();
  if (lastTarget?.source === 'box' && lastTarget.pokemonId) {
    const target = getBoxPokemonById(lastTarget.pokemonId);
    if (target) {
      state.targetPokemon = target;
      state.targetSource = { kind: 'box' };
      return;
    }
  }
  if (lastTarget?.source === 'list' && lastTarget.target?.speciesId) {
    state.targetPokemon = normalizePokemonRecord(lastTarget.target);
    state.targetSource = { kind: 'list' };
    return;
  }

  state.targetPokemon = defaultMegaCharizardYRecord();
  state.targetSource = { kind: 'list' };
}

function getTargetFormOptions(speciesId) {
  const species = state.speciesById.get(speciesId);
  if (!species) return [];
  const baseName = species.baseSpecies || species.name;
  const family = [...(state.data?.species || []), ...(state.data?.megaSpecies || [])]
    .filter(entry => (entry.baseSpecies || entry.name) === baseName);
  const dedup = new Map();
  family.forEach(entry => {
    if (!dedup.has(entry.id)) dedup.set(entry.id, entry);
  });
  return [...dedup.values()].sort((left, right) => {
    const leftRank = String(left.forme || '').length;
    const rightRank = String(right.forme || '').length;
    if (leftRank !== rightRank) return leftRank - rightRank;
    return toShortFormLabel(left).localeCompare(toShortFormLabel(right), state.lang === 'ja' ? 'ja' : 'en');
  });
}

function renderTargetFormSelect() {
  const select = $('target-forme-select');
  if (!select || !state.targetPokemon) return;
  const options = getTargetFormOptions(state.targetPokemon.speciesId);
  select.innerHTML = options.map(entry => `<option value="${entry.id}">${toShortFormLabel(entry)}</option>`).join('');
  if (options.some(entry => entry.id === state.targetPokemon.speciesId)) {
    select.value = state.targetPokemon.speciesId;
  } else if (options.length) {
    state.targetPokemon.speciesId = options[0].id;
    select.value = options[0].id;
  }
}

function renderScarfToggle() {
  const button = $('target-scarf');
  if (!button) return;

  const species = state.speciesById.get(state.targetPokemon?.speciesId || '');
  const canShowScarf = canUseScarf(species);

  button.classList.toggle('d-none', !canShowScarf);
  if (!canShowScarf) {
    if (state.targetPokemon?.itemId === 'choicescarf') state.targetPokemon.itemId = state.targetPrevItemId || '';
    button.dataset.active = '0';
    button.innerHTML = '';
    return;
  }

  const active = Boolean(state.targetPokemon?.itemId === 'choicescarf');
  button.classList.toggle('active', active);
  button.setAttribute('aria-pressed', String(active));
  button.dataset.active = active ? '1' : '0';

  const icon = state.scarfIconStyle
    ? `<span class="ps-item-icon" style="${state.scarfIconStyle}" aria-hidden="true"></span>`
    : '<i class="bi bi-bag" aria-hidden="true"></i>';
  const label = '';
  button.innerHTML = `<span class="speed-scarf-label">${icon}${label}</span>`;
}

function renderNatureToggle() {
  const button = $('target-nature-cycle');
  const text = $('target-nature-cycle-text');
  if (!button) return;
  const mode = state.targetPokemon?.natureBoostMode || 'neutral';
  button.classList.remove('mode-plus', 'mode-minus', 'mode-neutral');
  button.classList.add(mode === 'plus' ? 'mode-plus' : (mode === 'minus' ? 'mode-minus' : 'mode-neutral'));
  button.setAttribute('aria-pressed', String(mode !== 'neutral'));
  if (text) text.textContent = mode === 'plus' ? '▲10%' : (mode === 'minus' ? '▼10%' : '+-0%');
}

function renderTargetPanel() {
  const headMain = $('target-picker-trigger');
  const panel = $('speed-target-panel')?.querySelector('.speed-target-main');
  const editButton = $('target-edit-detail');
  if (!headMain) return;
  const target = state.targetPokemon;
  if (!target) {
    headMain.textContent = t('noTarget');
    if (panel) panel.dataset.editVisible = '0';
    if (editButton) editButton.classList.add('d-none');
    return;
  }

  if (panel) panel.dataset.editVisible = '1';
  if (editButton) editButton.classList.remove('d-none');

  const species = getTargetEffectiveSpecies() || state.speciesById.get(target.speciesId);
  const icon = species ? getShowdownPokemonIconUrl(species.id) : '';
  const speciesName = getSpeciesName(species || state.speciesById.get(target.speciesId));
  const nickname = String(target.nickname || '').trim();
  const fullTitle = nickname ? `${nickname} (${speciesName})` : speciesName;
  headMain.innerHTML = icon ? `<img class="ps-pokemon-icon" src="${icon}" alt="" loading="lazy">` : '<i class="bi bi-question-circle" aria-hidden="true"></i>';
  headMain.title = fullTitle;
  headMain.setAttribute('aria-label', fullTitle);

  const speApNode = $('target-spe-ap');
  const speRankNode = $('target-spe-rank');
  const currentSpeedNode = $('target-current-speed');
  if (speApNode) speApNode.value = String(clamp(toNumber(target.evs?.spe, 0), 0, 32));
  if (speRankNode) speRankNode.value = String(clamp(toNumber(target.ranks?.spe, 0), -6, 6));
  if (currentSpeedNode) currentSpeedNode.textContent = String(getTargetCurrentSpeed());

  renderTargetFormSelect();
  renderScarfToggle();
  renderNatureToggle();
}

function ensureTargetLinkedToBox() {
  if (!state.targetPokemon) return { linked: false, created: false };

  if (state.targetSource.kind === 'box' && state.targetPokemon.id) {
    const index = state.storage.box.findIndex(entry => entry.id === state.targetPokemon.id);
    if (index >= 0) {
      state.storage.box[index] = normalizePokemonRecord(state.targetPokemon);
      state.targetPokemon = state.storage.box[index];
      return { linked: true, created: false };
    }
  }

  const created = normalizePokemonRecord({ ...state.targetPokemon, id: generateBoxId() });
  state.storage.box.unshift(created);
  state.targetPokemon = created;
  state.targetSource = { kind: 'box' };
  return { linked: true, created: true };
}

function ensureTargetLinkedToBoxWithConfirm() {
  if (!state.targetPokemon) return { linked: false, created: false };
  if (state.targetSource.kind === 'box' && state.targetPokemon.id) {
    return ensureTargetLinkedToBox();
  }
  const confirmed = window.confirm(state.lang === 'ja'
    ? 'この対象はボックスに紐づいていません。ボックスへ新規作成してから個体編集を開きますか？'
    : 'This target is not linked to your box. Create a new box Pokemon and open the editor?');
  if (!confirmed) return { linked: false, created: false };
  return ensureTargetLinkedToBox();
}

function applyNatureModeToNatureField() {
  if (!state.targetPokemon) return;
  const mode = state.targetPokemon.natureBoostMode || 'neutral';
  const natureId = String(state.targetPokemon.nature || 'hardy');
  if (mode === 'plus') {
    if (!SPEED_PLUS_NATURES.has(natureId)) state.targetPokemon.nature = 'timid';
    return;
  }
  if (mode === 'minus') {
    if (!SPEED_MINUS_NATURES.has(natureId)) state.targetPokemon.nature = 'brave';
    return;
  }
  if (SPEED_PLUS_NATURES.has(natureId) || SPEED_MINUS_NATURES.has(natureId)) {
    state.targetPokemon.nature = 'hardy';
  }
}

function updateTargetFromInputs() {
  if (!state.targetPokemon) return;
  const ap = clamp(toNumber($('target-spe-ap')?.value, 0), 0, 32);
  const rank = clamp(toNumber($('target-spe-rank')?.value, 0), -6, 6);
  const formSpeciesId = $('target-forme-select')?.value || state.targetPokemon.speciesId;
  let scarf = $('target-scarf')?.dataset.active === '1';
  state.targetPokemon.speciesId = formSpeciesId;
  if (!canUseScarf(state.speciesById.get(formSpeciesId))) scarf = false;

  state.targetPokemon.evs.spe = ap;
  state.targetPokemon.ranks.spe = rank;
  state.targetPokemon.megaEnabled = false;

  if (scarf) {
    if (state.targetPokemon.itemId !== 'choicescarf') state.targetPrevItemId = state.targetPokemon.itemId || state.targetPrevItemId || '';
    state.targetPokemon.itemId = 'choicescarf';
  } else if (state.targetPokemon.itemId === 'choicescarf') {
    state.targetPokemon.itemId = state.targetPrevItemId || '';
  }

  applyNatureModeToNatureField();

  renderTargetPanel();
  renderSpeedTable(true);
  persistLastTargetState();
}

function getRowSearchKey(row) { return state.lang === 'ja' ? row.searchJa : row.searchEn; }

function getAllSpeciesEntries() {
  const speciesList = [...(state.data?.species || []), ...(state.data?.megaSpecies || [])];
  return speciesList.map(species => {
    const ja = getSpeciesName(species);
    const en = String(species?.name || '');
    return {
      id: `all-${species.id}`,
      type: 'all',
      speciesId: species.id,
      label: ja,
      search: normalizeText(`${ja} ${en}`),
      sub: '',
      iconUrl: getShowdownPokemonIconUrl(species.id),
      itemIconStyle: '',
    };
  }).sort((a, b) => a.label.localeCompare(b.label, state.lang === 'ja' ? 'ja' : 'en'));
}

function getBoxEntries() {
  return state.storage.box.map(record => {
    const species = state.speciesById.get(record.speciesId);
    const nickname = String(record.nickname || '').trim();
    const label = nickname ? `${nickname} (${getSpeciesName(species)})` : getSpeciesName(species);
    return {
      id: `box-${record.id}`,
      type: 'box',
      record,
      label,
      search: normalizeText(`${nickname} ${getSpeciesName(species)}`),
      sub: '',
      iconUrl: getShowdownPokemonIconUrl(record.speciesId),
      itemIconStyle: getItemIconStyle(record.itemId || ''),
    };
  });
}

function getSearchEntries() {
  if (state.targetSearchScope === 'box') return getBoxEntries();
  if (state.targetSearchScope === 'party') return getPartyEntries();
  return getAllSpeciesEntries();
}

function createTargetRecordFromSpeciesId(speciesId) {
  const record = normalizePokemonRecord(defaultPokemonRecord(speciesId));
  record.megaEnabled = false;
  return record;
}

function applySearchSelection(entry) {
  if (!entry) return;
  if (entry.type === 'box' || entry.type === 'party') {
    state.targetPokemon = entry.record;
    state.targetSource = { kind: 'box' };
  } else {
    state.targetPokemon = createTargetRecordFromSpeciesId(entry.speciesId);
    state.targetSource = { kind: 'list' };
  }
  renderTargetPanel();
  renderSpeedTable(true);
  persistLastTargetState();
  state.targetSearchModal?.hide();
}

function renderTargetSearchList() {
  const list = $('target-search-list');
  if (!list) return;

  const query = normalizeText($('target-search-input')?.value || '');
  const entries = getSearchEntries().filter(e => !query || e.search.includes(query)).slice(0, 250);

  list.innerHTML = entries.map(entry => {
    return `<button class="list-group-item list-group-item-action target-search-item" type="button" data-entry-id="${entry.id}"><span class="target-search-item-main">${entry.iconUrl ? `<img class="ps-pokemon-icon" src="${entry.iconUrl}" alt="" loading="lazy">` : ''}${entry.itemIconStyle ? `<span class="ps-item-icon" style="${entry.itemIconStyle}" aria-hidden="true"></span>` : ''}<span class="target-search-item-label">${entry.label}</span></span>${entry.sub ? `<span class="badge text-bg-light target-search-item-sub">${entry.sub}</span>` : ''}</button>`;
  }).join('');

  const byId = new Map(entries.map(entry => [entry.id, entry]));
  list.querySelectorAll('.target-search-item').forEach(button => {
    button.addEventListener('click', () => applySearchSelection(byId.get(button.dataset.entryId)));
  });
}

function openTargetSearchModal() {
  const searchInput = $('target-search-input');
  if (searchInput) searchInput.value = '';
  renderTargetSearchList();
  state.targetSearchModal?.show();
}

function openTargetEditModal() {
  if (!state.targetPokemon) return;
  updateTargetFromInputs();
  const result = ensureTargetLinkedToBoxWithConfirm();
  if (!result.linked || !state.targetPokemon?.id) return;
  saveStorage();
  persistLastTargetState();
  localStorage.setItem(OPEN_DETAIL_REQUEST_KEY, JSON.stringify({ pokemonId: state.targetPokemon.id }));
  const host = $('target-box-editor-host');
  const frame = $('target-box-editor-frame');
  if (!host || !frame) {
    const returnPath = encodeURIComponent(window.location.pathname + window.location.search);
    window.location.href = `./box-party.html?detail=standalone&returnPath=${returnPath}`;
    return;
  }
  host.classList.remove('d-none');
  host.setAttribute('aria-hidden', 'false');
  frame.style.visibility = 'hidden';
  frame.src = './box-party.html?embed=detail';
}

function closeTargetEditHost() {
  const host = $('target-box-editor-host');
  if (host) {
    host.classList.add('d-none');
    host.setAttribute('aria-hidden', 'true');
  }
  const frame = $('target-box-editor-frame');
  if (frame) {
    frame.style.visibility = 'hidden';
    frame.src = 'about:blank';
  }
  syncTargetAfterBoxEditorClose();
}

function syncTargetAfterBoxEditorClose() {
  loadStorage();
  if (state.targetSource?.kind === 'box' && state.targetPokemon?.id) {
    const refreshed = getBoxPokemonById(state.targetPokemon.id);
    if (refreshed) state.targetPokemon = refreshed;
  }
  renderTargetPanel();
  renderSpeedTable(true);
  persistLastTargetState();
}

function populateSelect(selectId, start, end, withPlus = true) {
    const select = $(selectId);
    if (!select) return;
    for (let i = start; i <= end; i++) {
        const option = document.createElement('option');
        option.value = i;
    option.textContent = withPlus && i > 0 ? `+${i}` : String(i);
        select.appendChild(option);
    }
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

  document.querySelectorAll('#target-search-scope [data-scope]').forEach(button => {
    button.classList.toggle('active', button.dataset.scope === state.targetSearchScope);
  });

  renderTargetPanel();
  renderTargetSearchList();
}

function navigateBack() {
  const returnPath = state.request?.returnPath || './box-party.html';
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
    node.addEventListener('change', updateTargetFromInputs);
  });

  $('target-scarf')?.addEventListener('click', () => {
    const node = $('target-scarf');
    if (!node || node.classList.contains('d-none')) return;
    node.dataset.active = node.dataset.active === '1' ? '0' : '1';
    updateTargetFromInputs();
  });

  $('target-forme-select')?.addEventListener('change', updateTargetFromInputs);

  $('target-nature-cycle')?.addEventListener('click', () => {
    if (!state.targetPokemon) return;
    const current = state.targetPokemon.natureBoostMode || 'neutral';
    state.targetPokemon.natureBoostMode = current === 'neutral' ? 'plus' : (current === 'plus' ? 'minus' : 'neutral');
    updateTargetFromInputs();
  });

  $('target-picker-trigger')?.addEventListener('click', openTargetSearchModal);
  $('target-search-input')?.addEventListener('input', renderTargetSearchList);

  document.querySelectorAll('#target-search-scope [data-scope]').forEach(button => {
    button.addEventListener('click', () => {
      state.targetSearchScope = button.dataset.scope;
      document.querySelectorAll('#target-search-scope [data-scope]').forEach(node => {
        node.classList.toggle('active', node.dataset.scope === state.targetSearchScope);
      });
      renderTargetSearchList();
    });
  });

  $('target-edit-detail')?.addEventListener('click', openTargetEditModal);

  $('speed-history-back')?.addEventListener('click', handleHistoryBack);

  document.querySelectorAll('#lang-tabs [data-lang]').forEach(button => {
    button.addEventListener('click', () => {
      state.lang = button.dataset.lang;
      persistLanguagePreference();
      applyI18n();
      renderSpeedTable(true);
    });
  });

  if (!state.detailHostListenerBound) {
    window.addEventListener('message', event => {
      if (event.origin !== window.location.origin) return;
      const type = event.data?.type;
      if (type === 'champions-detail-ready') {
        const frame = $('target-box-editor-frame');
        if (frame) frame.style.visibility = 'visible';
      }
      if (type === 'champions-detail-closed') {
        closeTargetEditHost();
      }
    });
    state.detailHostListenerBound = true;
  }

}

async function initialize() {
  loadLanguagePreference();
  loadStorage();
  loadRequest();

  populateSelect('target-spe-ap', 0, 32, false);
  populateSelect('target-spe-rank', -6, 6);

  // Initialize tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  const [data, rules, jaTranslations] = await Promise.all([
    fetchJson('./db/champions-calc-data.json'),
    fetchJson('./db/speed-adjust-rules.json'),
    fetchJson('./db/champions-ja-translations.json').catch(() => ({})),
  ]);

  state.data = data;
  state.rules = rules;

  setupLookups();
  setupSpeciesJapaneseMap(jaTranslations?.species || {});
  resolveTargetPokemon();
  buildGroupedSpeciesRows();
  createSpeedBuckets();

  const modalElement = $('target-search-modal');
  if (modalElement && window.bootstrap?.Modal) state.targetSearchModal = new bootstrap.Modal(modalElement);

  persistLastTargetState();
  applyI18n();
  renderTargetPanel();
  renderSpeedTable();
  bindEvents();
}

initialize().catch(error => {
  console.error('Speed Adjust Init Error:', error);
  const head = $('target-picker-trigger');
  if (head) head.textContent = t('loadFailed');
});
