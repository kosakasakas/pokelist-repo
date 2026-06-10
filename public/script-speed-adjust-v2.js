const STORAGE_KEY = 'champions-damage-calc-box-party-v1';
const OPEN_DETAIL_REQUEST_KEY = 'champions-open-detail-request-v1';
const SPEED_ADJUST_REQUEST_KEY = 'champions-speed-adjust-request-v1';
const SPEED_ADJUST_LAST_TARGET_KEY = 'champions-speed-adjust-last-target-v1';
const SPEED_ADJUST_ROW_CACHE_KEY = 'champions-speed-adjust-row-cache-v1';
const LANG_STORAGE_KEY = 'champions-tool-ui-lang-v1';
const MAX_SPEED_MEMOS = 20;

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
  Heat: 'ヒート', Wash: 'ウォッシュ', Frost: 'フロスト', Fan: 'スピン', Mow: 'カット',
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
    targetForm: 'フォルム',
    targetSearchTitle: '対象ポケモンを検索',
    search: '検索',
    searchPlaceholder: 'ポケモン名で検索',
    speedValue: '実数値',
    speedValueShort: '実数',
    groupList: '対象ポケモン',
    groupListShort: '対象',
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
    targetForm: 'Form',
    targetSearchTitle: 'Select target Pokemon',
    search: 'Search',
    searchPlaceholder: 'Filter by Pokemon',
    speedValue: 'Speed',
    speedValueShort: 'Speed',
    groupList: 'Target Pokemon',
    groupListShort: 'Targets',
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
  targetDetailEmbedModal: null,
  targetSearchScope: 'all',
  saveFeedbackTimer: null,
  lastFocusedSpeed: null,
  lastFocusedTop: null,
};

const transitions = window.pokeToolsTransitions || {
  animateSwap(_target) {},
  pageReady() {},
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
    speedMemos: [],
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
  next.speedMemos = Array.isArray(record?.speedMemos)
    ? record.speedMemos.map(memo => normalizeSpeedMemo(memo, next.speciesId)).slice(-MAX_SPEED_MEMOS)
    : [];
  if (!['plus', 'minus', 'neutral'].includes(next.natureBoostMode)) {
    if (typeof next.natureBoost === 'boolean') next.natureBoostMode = next.natureBoost ? 'plus' : 'neutral';
    else next.natureBoostMode = 'neutral';
  }
  return next;
}

function normalizeSpeedMemo(memo, fallbackSpeciesId = 'charizard') {
  const base = {
    id: `speed-memo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    note: '',
    speciesId: fallbackSpeciesId || 'charizard',
    nature: 'hardy',
    natureBoostMode: 'neutral',
    megaEnabled: false,
    itemId: '',
    evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    ranks: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    currentSpeed: 0,
  };
  const next = { ...base, ...(memo || {}) };
  next.note = String(next.note || memo?.text || memo?.memo || '').trim();
  next.speciesId = String(next.speciesId || fallbackSpeciesId || 'charizard');
  next.nature = String(next.nature || 'hardy');
  next.natureBoostMode = ['plus', 'minus', 'neutral'].includes(next.natureBoostMode)
    ? next.natureBoostMode
    : (memo?.natureBoost === true ? 'plus' : 'neutral');
  next.megaEnabled = Boolean(next.megaEnabled);
  next.itemId = String(next.itemId || '');
  next.evs = { ...base.evs, ...(memo?.evs || {}) };
  next.ranks = { ...base.ranks, ...(memo?.ranks || {}) };
  next.currentSpeed = clamp(toNumber(next.currentSpeed, 0), 0, 9999);
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
    return `<span class="speed-pokemon-cell speed-self-chip">${icon ? `<img class="ps-pokemon-icon" src="${icon}" alt="" loading="lazy">` : ''}</span>`;
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

function renderSelfSpeedRow(speed, isFocusRow) {
  const selfChip = buildTargetSelfChip();
  if (!selfChip) return '';
  const rowClass = isFocusRow ? 'speed-self-row speed-focus-row' : 'speed-self-row';
  const groupClass = isFocusRow ? ' speed-focus-anchor' : '';
  return `<tr id="speed-self-row-${speed}" class="${rowClass}"><td class="mono">${speed}</td><td><div class="speed-group-stack"><div class="speed-group speed-group-self${groupClass}"><span class="badge text-bg-danger speed-group-label">自分</span><span class="speed-chip-list">${renderSpeedChip(selfChip)}</span></div></div></td></tr>`;
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
  const pulseClass = ' speed-column-pulse';
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
    const hl = (isFocusRow && isFocusGroup) ? `speed-group-highlight${pulseClass}` : '';
    const anchor = (isFocusRow && isFocusGroup && !selfChips.length) ? ' speed-focus-anchor' : '';
    return `<div class="speed-group ${hl}${anchor}"><span class="badge ${group.badge} speed-group-label">${renderGroupLabel(group, chips)}</span><span class="speed-chip-list">${normalChips.map(renderSpeedChip).join('')}</span></div>`;
  }).join('');

  const selfGroup = selfChips.length
    ? `<div class="speed-group speed-group-self${isFocusRow ? ` speed-group-highlight${pulseClass} speed-focus-anchor` : ''}"><span class="badge text-bg-danger speed-group-label">自分</span><span class="speed-chip-list">${selfChips.map(renderSpeedChip).join('')}</span></div>`
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
  const speeds = [...state.speedAxis];
  if (Number.isFinite(Number(currentSpeed)) && !speeds.includes(Number(currentSpeed))) {
    speeds.push(Number(currentSpeed));
    speeds.sort((left, right) => right - left);
  }

  const html = speeds.map(speed => {
    const bucket = state.speedBuckets.get(speed);
    const grouped = {};
    GROUPS.forEach(group => { grouped[group.key] = filterChips(bucket?.[group.key] || [], query); });

    const isCurrentSpeed = Number(speed) === Number(currentSpeed);
    const hasGroupedRows = GROUPS.some(group => grouped[group.key].length);
    const rows = [];

    if (isCurrentSpeed) rows.push(renderSelfSpeedRow(speed, true));
    if (!hasGroupedRows) return rows.join('');

    const groupHtml = renderGroupRows(grouped, focusGroup, false);
    rowCache[String(speed)] = { speed: Number(speed), html: groupHtml };
    rows.push(`<tr id="speed-row-${speed}"><td class="mono">${speed}</td><td><div class="speed-group-stack">${groupHtml}</div></td></tr>`);
    return rows.join('');
  }).join('');

  tbody.innerHTML = html;
  transitions.animateSwap(tbody);
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

  const focusRowId = `speed-self-row-${currentSpeed}`;
  const focusRow = $(focusRowId) || tbody.querySelector('.speed-focus-row');
  if (focusRow && (keepFocus || !state.didInitialFocus)) {
    const container = document.querySelector('.table-container');
    if (container && container.contains(focusRow)) {
      const moveFocus = () => {
        const headerHeight = document.querySelector('#speed-table thead')?.getBoundingClientRect().height || 0;
        const sameSpeed = Number(state.lastFocusedSpeed) === Number(currentSpeed);
        const targetTop = Math.max(0, focusRow.offsetTop - headerHeight);
        const delta = targetTop - container.scrollTop;
        const shouldMove = Math.abs(delta) > 2;
        if (shouldMove) {
          const behavior = keepFocus && !sameSpeed ? 'smooth' : 'auto';
          container.scrollTo({ top: targetTop, behavior });
        }
        state.lastFocusedSpeed = Number(currentSpeed);
        state.lastFocusedTop = container.scrollTop;
      };
      requestAnimationFrame(() => requestAnimationFrame(moveFocus));
    } else {
      const sameSpeed = Number(state.lastFocusedSpeed) === Number(currentSpeed);
      const behavior = keepFocus && !sameSpeed ? 'smooth' : 'auto';
      focusRow.scrollIntoView({ block: 'start', behavior });
      state.lastFocusedSpeed = Number(currentSpeed);
      state.lastFocusedTop = null;
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
  const formCell = $('target-forme-cell');
  const panel = $('speed-target-panel')?.querySelector('.speed-target-main');
  if (!select || !state.targetPokemon) return;
  const options = getTargetFormOptions(state.targetPokemon.speciesId);
  select.innerHTML = options.map(entry => `<option value="${entry.id}">${toShortFormLabel(entry)}</option>`).join('');
  const showForm = options.length > 1;
  if (formCell) formCell.classList.toggle('d-none', !showForm);
  if (panel) panel.dataset.formVisible = showForm ? '1' : '0';
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
  if (text) text.textContent = mode === 'plus' ? '▲' : (mode === 'minus' ? '▼' : '-');
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
  headMain.innerHTML = `${icon ? `<span class="speed-target-picker-icon-wrap" aria-hidden="true"><img class="ps-pokemon-icon" src="${icon}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling&&this.nextElementSibling.classList.remove('d-none');"><span class="pokemon-icon-fallback d-none" aria-hidden="true">?</span></span>` : '<span class="speed-target-picker-icon-wrap" aria-hidden="true"><span class="pokemon-icon-fallback" aria-hidden="true">?</span></span>'}`;
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
  updateTargetPanelOffset();
  transitions.animateSwap(panel || headMain);
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
  return ensureTargetLinkedToBox();
}

function applyNatureModeToNatureField(target = state.targetPokemon) {
  if (!target) return;
  const mode = target.natureBoostMode || 'neutral';
  const natureId = String(target.nature || 'hardy');
  if (mode === 'plus') {
    if (!SPEED_PLUS_NATURES.has(natureId)) target.nature = 'timid';
    return;
  }
  if (mode === 'minus') {
    if (!SPEED_MINUS_NATURES.has(natureId)) target.nature = 'brave';
    return;
  }
  if (SPEED_PLUS_NATURES.has(natureId) || SPEED_MINUS_NATURES.has(natureId)) {
    target.nature = 'hardy';
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

  applyNatureModeToNatureField(state.targetPokemon);

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
  const frame = $('target-detail-embed-frame');
  if (!frame || !state.targetDetailEmbedModal) return;
  localStorage.setItem(OPEN_DETAIL_REQUEST_KEY, JSON.stringify({ pokemonId: state.targetPokemon.id }));
  const pokemonId = encodeURIComponent(state.targetPokemon.id);
  frame.dataset.pokemonId = state.targetPokemon.id;
  logDetailEmbedDebug('open-click', { pokemonId: state.targetPokemon.id, targetSource: state.targetSource?.kind || '' });
  frame.src = `./box-party.html?embed=detail&openDetail=${pokemonId}`;
  state.targetDetailEmbedModal.show();
}

function getSortedSpeciesOptions() {
  const seen = new Map();
  [...(state.data?.species || []), ...(state.data?.megaSpecies || [])].forEach(species => {
    if (!seen.has(species.id)) seen.set(species.id, species);
  });
  return [...seen.values()].sort((left, right) => getSpeciesName(left).localeCompare(getSpeciesName(right), state.lang === 'ja' ? 'ja' : 'en'));
}

function getEditDraftCurrentSpeed(draft) {
  const species = state.speciesById.get(draft?.speciesId || '');
  if (!species || !draft) return 0;
  const base = toNumber(species.baseStats?.spe, 0);
  const ap = clamp(toNumber(draft.evs?.spe, 0), 0, 32);
  const rank = clamp(toNumber(draft.ranks?.spe, 0), -6, 6);
  const nature = getNatureSpeedMultiplier(draft);
  let speed = applyStageToStat(calcSingleStat(base, ap, nature), rank);
  if (draft.itemId === 'choicescarf') speed = Math.floor(speed * 1.5);
  return speed;
}

function renderTargetEditScarfToggle() {
  const button = $('target-edit-scarf');
  const draft = state.targetEditDraft;
  if (!button || !draft) return;
  const species = state.speciesById.get(draft.speciesId || '');
  const allowed = canUseScarf(species);
  button.disabled = !allowed;
  button.classList.toggle('d-none', !allowed);
  const active = allowed && draft.itemId === 'choicescarf';
  button.classList.toggle('active', active);
  button.setAttribute('aria-pressed', String(active));
  const icon = state.scarfIconStyle
    ? `<span class="ps-item-icon" style="${state.scarfIconStyle}" aria-hidden="true"></span>`
    : '<i class="bi bi-bag" aria-hidden="true"></i>';
  button.innerHTML = `<span class="speed-scarf-label">${icon}</span>`;
}

function renderTargetEditNatureToggle() {
  const button = $('target-edit-nature-cycle');
  const text = $('target-edit-nature-cycle-text');
  const mode = state.targetEditDraft?.natureBoostMode || 'neutral';
  if (!button) return;
  button.classList.remove('mode-plus', 'mode-minus', 'mode-neutral');
  button.classList.add(mode === 'plus' ? 'mode-plus' : (mode === 'minus' ? 'mode-minus' : 'mode-neutral'));
  button.setAttribute('aria-pressed', String(mode !== 'neutral'));
  if (text) text.textContent = mode === 'plus' ? '▲' : (mode === 'minus' ? '▼' : '-');
}

function renderTargetEditFormOptions() {
  const draft = state.targetEditDraft;
  const formSelect = $('target-edit-forme-select');
  const formWrap = $('target-edit-forme-wrap');
  if (!draft || !formSelect) return;
  const options = getTargetFormOptions(draft.speciesId);
  formSelect.innerHTML = options.map(entry => `<option value="${entry.id}">${toShortFormLabel(entry)}</option>`).join('');
  const showForm = options.length > 1;
  if (formWrap) formWrap.classList.toggle('d-none', !showForm);
  if (options.some(entry => entry.id === draft.speciesId)) {
    formSelect.value = draft.speciesId;
  } else if (options.length) {
    draft.speciesId = options[0].id;
    formSelect.value = options[0].id;
  }
}

function renderTargetEditModal() {
  const draft = state.targetEditDraft;
  if (!draft) return;
  const speciesSelect = $('target-edit-species-select');
  const nickname = $('target-edit-nickname');
  const apSelect = $('target-edit-spe-ap');
  const rankSelect = $('target-edit-spe-rank');
  const speedNode = $('target-edit-current-speed');
  if (speciesSelect) {
    const options = getSortedSpeciesOptions();
    speciesSelect.innerHTML = options.map(species => `<option value="${species.id}">${getSpeciesName(species)}</option>`).join('');
    if (options.some(species => species.id === draft.speciesId)) speciesSelect.value = draft.speciesId;
  }
  if (nickname) nickname.value = String(draft.nickname || '');
  if (apSelect) apSelect.value = String(clamp(toNumber(draft.evs?.spe, 0), 0, 32));
  if (rankSelect) rankSelect.value = String(clamp(toNumber(draft.ranks?.spe, 0), -6, 6));
  renderTargetEditFormOptions();
  renderTargetEditNatureToggle();
  renderTargetEditScarfToggle();
  if (speedNode) speedNode.textContent = String(getEditDraftCurrentSpeed(draft));
}

function updateTargetEditFromInputs() {
  const draft = state.targetEditDraft;
  if (!draft) return;
  const speciesId = $('target-edit-species-select')?.value || draft.speciesId;
  const formSpeciesId = $('target-edit-forme-select')?.value || speciesId;
  const nickname = $('target-edit-nickname')?.value || '';
  const ap = clamp(toNumber($('target-edit-spe-ap')?.value, draft.evs?.spe || 0), 0, 32);
  const rank = clamp(toNumber($('target-edit-spe-rank')?.value, draft.ranks?.spe || 0), -6, 6);
  let scarf = draft.itemId === 'choicescarf';

  draft.speciesId = formSpeciesId;
  draft.nickname = String(nickname).trim();
  draft.evs.spe = ap;
  draft.ranks.spe = rank;

  if (!canUseScarf(state.speciesById.get(formSpeciesId))) scarf = false;
  if (scarf) {
    if (draft.itemId !== 'choicescarf') state.targetPrevItemId = draft.itemId || state.targetPrevItemId || '';
    draft.itemId = 'choicescarf';
  } else if (draft.itemId === 'choicescarf') {
    draft.itemId = state.targetPrevItemId || '';
  }

  applyNatureModeToNatureField(draft);
  renderTargetEditModal();
}

function applyTargetEditModal() {
  const draft = state.targetEditDraft;
  if (!draft) return;
  const next = normalizePokemonRecord({ ...draft });
  state.targetPokemon = next;
  state.targetSource = { kind: state.targetEditSourceKind === 'box' ? 'box' : 'list' };

  if (state.targetSource.kind === 'box' && next.id) {
    const index = state.storage.box.findIndex(entry => entry.id === next.id);
    if (index >= 0) {
      state.storage.box[index] = next;
      state.targetPokemon = state.storage.box[index];
      saveStorage();
      showSaveFeedback('saveUpdated');
    }
  }

  persistLastTargetState();
  renderTargetPanel();
  renderSpeedTable(true);
  state.targetEditModal?.hide();
}

function refreshAfterEmbeddedDetailClose() {
  loadStorage();
  if (state.targetSource?.kind === 'box' && state.targetPokemon?.id) {
    const latest = state.storage.box.find(entry => entry.id === state.targetPokemon.id);
    if (latest) state.targetPokemon = latest;
  }
  persistLastTargetState();
  renderTargetPanel();
  renderSpeedTable(true);
}

function logDetailEmbedDebug(stage, extra = {}) {
  void stage;
  void extra;
}

function tryOpenEmbeddedDetail(frame, pokemonId, attempt = 0) {
  const maxAttempts = 8;
  const delayMs = 120;
  if (!frame || !pokemonId) return;

  let childWindow = null;
  try {
    childWindow = frame.contentWindow;
  } catch (error) {
    logDetailEmbedDebug('child-window-access-error', { attempt, error: String(error) });
  }

  const openFn = childWindow && typeof childWindow.openPokemonDetail === 'function'
    ? childWindow.openPokemonDetail
    : null;

  if (openFn) {
    logDetailEmbedDebug('invoke-openPokemonDetail', { attempt, pokemonId });
    try {
      openFn.call(childWindow, pokemonId);
    } catch (error) {
      logDetailEmbedDebug('invoke-openPokemonDetail-failed', { attempt, pokemonId, error: String(error) });
    }
    return;
  }

  if (attempt >= maxAttempts) {
    logDetailEmbedDebug('invoke-openPokemonDetail-timeout', { pokemonId, maxAttempts });
    return;
  }

  window.setTimeout(() => tryOpenEmbeddedDetail(frame, pokemonId, attempt + 1), delayMs);
}

function handleDetailEmbedFrameLoad() {
  const frame = $('target-detail-embed-frame');
  if (!frame) return;
  const requestedPokemonId = String(frame.dataset.pokemonId || '').trim();
  logDetailEmbedDebug('iframe-load', {
    requestedPokemonId,
    frameSrc: frame.getAttribute('src') || '',
  });
  try {
    const doc = frame.contentDocument;
    if (!doc || !doc.documentElement) return;
    logDetailEmbedDebug('iframe-doc-ready', {
      requestedPokemonId,
      readyState: doc.readyState,
      location: doc.location ? String(doc.location.href || '') : '',
    });
    doc.documentElement.classList.remove('tool-page-loading');
    doc.documentElement.classList.add('tool-page-ready');
    tryOpenEmbeddedDetail(frame, requestedPokemonId, 0);
  } catch (_error) {
    logDetailEmbedDebug('iframe-load-handler-error', {
      requestedPokemonId,
      error: String(_error),
    });
  }
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
  if (state.targetEditDraft) renderTargetEditModal();
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
    transitions.runWithButtonLoading(node, () => {
      node.dataset.active = node.dataset.active === '1' ? '0' : '1';
      updateTargetFromInputs();
    });
  });

  $('target-forme-select')?.addEventListener('change', () => {
    const select = $('target-forme-select');
    transitions.runWithButtonLoading(select, () => updateTargetFromInputs());
  });

  $('target-nature-cycle')?.addEventListener('click', () => {
    if (!state.targetPokemon) return;
    const button = $('target-nature-cycle');
    transitions.runWithButtonLoading(button, () => {
      const current = state.targetPokemon.natureBoostMode || 'neutral';
      state.targetPokemon.natureBoostMode = current === 'neutral' ? 'plus' : (current === 'plus' ? 'minus' : 'neutral');
      updateTargetFromInputs();
    });
  });

  $('target-picker-trigger')?.addEventListener('click', () => {
    const button = $('target-picker-trigger');
    transitions.runWithButtonLoading(button, () => openTargetSearchModal());
  });
  $('target-search-input')?.addEventListener('input', renderTargetSearchList);

  document.querySelectorAll('#target-search-scope [data-scope]').forEach(button => {
    button.addEventListener('click', () => {
      transitions.runWithButtonLoading(button, () => {
        state.targetSearchScope = button.dataset.scope;
        document.querySelectorAll('#target-search-scope [data-scope]').forEach(node => {
          node.classList.toggle('active', node.dataset.scope === state.targetSearchScope);
        });
        renderTargetSearchList();
      });
    });
  });

  $('target-edit-detail')?.addEventListener('click', openTargetEditModal);

  $('speed-memo-btn')?.addEventListener('click', () => {
    saveSpeedMemo();
  });

  $('speed-history-back')?.addEventListener('click', () => {
    const button = $('speed-history-back');
    transitions.runWithButtonLoading(button, () => handleHistoryBack());
  });

  document.querySelectorAll('#lang-tabs [data-lang]').forEach(button => {
    button.addEventListener('click', () => {
      state.lang = button.dataset.lang;
      persistLanguagePreference();
      applyI18n();
      renderSpeedTable(true);
    });
  });

}

function updateTargetPanelOffset() {
  const panelCol = $('speed-target-panel-col');
  const listCol = $('speed-list-panel-col');
  const tableContainer = document.querySelector('.table-container');
  const footer = $('speed-page-footer');
  if (!panelCol) return;

  const isDesktop = window.matchMedia && window.matchMedia('(min-width: 992px)').matches;
  let footerOffset = 0;
  if (isDesktop && footer) {
    const footerStyle = window.getComputedStyle(footer);
    if (footerStyle.display !== 'none') {
      const footerRect = footer.getBoundingClientRect();
      const footerMarginTop = Number.parseFloat(footerStyle.marginTop || '0') || 0;
      footerOffset = Math.ceil(footerRect.height + footerMarginTop);
    }
  }
  panelCol.style.bottom = `${footerOffset}px`;

  if (isDesktop) {
    if (listCol) {
      const listRect = listCol.getBoundingClientRect();
      panelCol.style.left = `${Math.max(0, listRect.left)}px`;
      panelCol.style.width = `${Math.max(0, listRect.width)}px`;
      panelCol.style.right = 'auto';
    }
  } else {
    panelCol.style.left = '0px';
    panelCol.style.right = '0px';
    panelCol.style.width = '100%';
  }
  const height = Math.ceil(panelCol.getBoundingClientRect().height || 0);
  document.body.style.setProperty('--speed-target-panel-height', `${height}px`);

  if (tableContainer) {
    const top = tableContainer.getBoundingClientRect().top;
    const panelTop = panelCol.getBoundingClientRect().top;
    const available = Math.max(160, Math.floor(panelTop - top - 8));
    document.body.style.setProperty('--speed-list-max-height', `${available}px`);
  }
}

function getSameSpeedRows(speed) {
  if (!state.speedBuckets) return [];
  const buckets = state.speedBuckets.get(speed);
  if (!buckets) return [];
  return Object.values(buckets).flat();
}

function getNextSlowerSpeedRows() {
  const currentSpeed = getTargetCurrentSpeed();
  if (!state.speedAxis) return [];
  const idx = state.speedAxis.indexOf(currentSpeed);
  if (idx < 0 || idx >= state.speedAxis.length - 1) return [];
  const nextSpeed = state.speedAxis[idx + 1];
  return getSameSpeedRows(nextSpeed);
}

function buildSpeedMemoContent(note) {
  if (!state.targetPokemon) return null;
  return {
    id: `speed-memo-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`,
    note: String(note || '').trim(),
    speciesId: state.targetPokemon.speciesId,
    nature: state.targetPokemon.nature || 'hardy',
    natureBoostMode: state.targetPokemon.natureBoostMode || 'neutral',
    megaEnabled: Boolean(state.targetPokemon.megaEnabled),
    itemId: state.targetPokemon.itemId || '',
    evs: { ...(state.targetPokemon.evs || {}) },
    ranks: { ...(state.targetPokemon.ranks || {}) },
    currentSpeed: getTargetCurrentSpeed(),
  };
}

function saveSpeedMemo() {
  const memoNote = window.prompt(state.lang === 'ja' ? '簡易メモを入力してください。' : 'Enter a short memo.', '');
  if (memoNote === null) return;
  const result = ensureTargetLinkedToBoxWithConfirm();
  if (!result.linked || !state.targetPokemon?.id) return;
  const memoContent = buildSpeedMemoContent(memoNote);
  if (!memoContent || !state.targetPokemon) return;
  const nextMemo = normalizeSpeedMemo(memoContent, state.targetPokemon.speciesId);
  state.targetPokemon.speedMemos = [nextMemo, ...(Array.isArray(state.targetPokemon.speedMemos) ? state.targetPokemon.speedMemos : [])].slice(0, MAX_SPEED_MEMOS);
  saveStorage();
  persistLastTargetState();
  alert(state.lang === 'ja' ? 'メモを保存しました' : 'Memo saved');
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

  const detailEmbedModalElement = $('target-detail-embed-modal');
  const frame = $('target-detail-embed-frame');
  if (frame) frame.addEventListener('load', handleDetailEmbedFrameLoad);
  if (detailEmbedModalElement && window.bootstrap?.Modal) {
    state.targetDetailEmbedModal = new bootstrap.Modal(detailEmbedModalElement);
    detailEmbedModalElement.addEventListener('shown.bs.modal', () => {
      logDetailEmbedDebug('embed-modal-shown', {});
    });
    detailEmbedModalElement.addEventListener('hidden.bs.modal', () => {
      const currentFrame = $('target-detail-embed-frame');
      if (currentFrame) {
        currentFrame.src = 'about:blank';
        currentFrame.dataset.pokemonId = '';
      }
      logDetailEmbedDebug('embed-modal-hidden', {});
      refreshAfterEmbeddedDetailClose();
    });
  }

  window.addEventListener('message', event => {
    if (event.origin !== window.location.origin) return;
    if (event.data?.type === 'champions-detail-closed') {
      logDetailEmbedDebug('child-closed-message', {});
      state.targetDetailEmbedModal?.hide();
    }
  });

  persistLastTargetState();
  applyI18n();
  renderTargetPanel();
  renderSpeedTable();
  updateTargetPanelOffset();
  bindEvents();
  window.addEventListener('resize', updateTargetPanelOffset);
  window.setTimeout(updateTargetPanelOffset, 0);
  transitions.pageReady();
}

initialize().catch(error => {
  console.error('Speed Adjust Init Error:', error);
  const head = $('target-picker-trigger');
  if (head) head.textContent = t('loadFailed');
});
