const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SHOWDOWN_DIST = path.join(ROOT, 'library', 'pokemon-showdown', 'dist', 'sim', 'index.js');
const OUTPUT_FILE = path.join(ROOT, 'public', 'db', 'champions-calc-data.json');
const JA_OVERRIDES_FILE = path.join(ROOT, 'public', 'db', 'champions-ja-overrides.json');
const JA_MISSING_FILE = path.join(ROOT, 'public', 'db', 'champions-ja-missing.json');
const SPECIES_CSV = path.join(ROOT, 'public', 'db', 'ダメージ計算 - def_pokemon.csv');
const MOVE_CSV = path.join(ROOT, 'public', 'db', 'ダメージ計算 - list_move2poke.csv');
const MOVE_STATUS_CSV = path.join(ROOT, 'public', 'db', 'ダメージ計算 - list_movestatus2poke.csv');
const ABILITY_CSV = path.join(ROOT, 'public', 'db', 'ダメージ計算 - list_ability2poke.csv');

if (!fs.existsSync(SHOWDOWN_DIST)) {
  throw new Error(
    'Pokemon Showdown のビルド済みファイルが見つかりません。`npm run build:showdown` を先に実行してください。'
  );
}

const { Dex } = require(SHOWDOWN_DIST);

const TYPE_NAME_JA = {
  Normal: 'ノーマル',
  Fire: 'ほのお',
  Water: 'みず',
  Electric: 'でんき',
  Grass: 'くさ',
  Ice: 'こおり',
  Fighting: 'かくとう',
  Poison: 'どく',
  Ground: 'じめん',
  Flying: 'ひこう',
  Psychic: 'エスパー',
  Bug: 'むし',
  Rock: 'いわ',
  Ghost: 'ゴースト',
  Dragon: 'ドラゴン',
  Dark: 'あく',
  Steel: 'はがね',
  Fairy: 'フェアリー',
  Stellar: 'ステラ',
};

const ITEM_NAME_JA = {
  blackbelt: 'くろおび',
  blackglasses: 'くろいメガネ',
  charcoal: 'もくたん',
  choicescarf: 'こだわりスカーフ',
  dragonfang: 'りゅうのキバ',
  focusband: 'きあいのハチマキ',
  focussash: 'きあいのタスキ',
  hardstone: 'かたいいし',
  kingsrock: 'おうじゃのしるし',
  sitrusberry: 'オボンのみ',
  leftovers: 'たべのこし',
  lightball: 'でんきだま',
  magnet: 'じしゃく',
  mentalherb: 'メンタルハーブ',
  metalcoat: 'メタルコート',
  miracleseed: 'きせきのタネ',
  mysticwater: 'しんぴのしずく',
  nevermeltice: 'とけないこおり',
  poisonbarb: 'どくバリ',
  quickclaw: 'せんせいのツメ',
  scopelens: 'ピントレンズ',
  sharpbeak: 'するどいくちばし',
  shellbell: 'かいがらのすず',
  silkscarf: 'シルクのスカーフ',
  silverpowder: 'ぎんのこな',
  softsand: 'やわらかいすな',
  spelltag: 'のろいのおふだ',
  twistedspoon: 'まがったスプーン',
  whiteherb: 'しろいハーブ',
};

const DEFAULT_JA_OVERRIDES = {
  meta: {
    description: 'Fill nameJa / shortDescJa / descJa here. This file overrides generated data.',
  },
  species: {},
  moves: {},
  abilities: {},
  items: {},
};

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

function parseCsvToRecords(filePath) {
  const text = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];
  const headers = parseCsvLine(lines[0]);
  const records = [];
  for (let index = 1; index < lines.length; index += 1) {
    const row = parseCsvLine(lines[index]);
    if (!row.length) continue;
    const record = {};
    for (let h = 0; h < headers.length; h += 1) {
      record[headers[h]] = row[h] || '';
    }
    records.push(record);
  }
  return records;
}

function readJsonFile(filePath, fallback) {
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (_error) {
    return fallback;
  }
}

function ensureJaOverridesFile() {
  if (fs.existsSync(JA_OVERRIDES_FILE)) return;
  fs.writeFileSync(JA_OVERRIDES_FILE, JSON.stringify(DEFAULT_JA_OVERRIDES, null, 2), 'utf8');
}

function normalizeJaOverrides(raw) {
  return {
    meta: raw?.meta || DEFAULT_JA_OVERRIDES.meta,
    species: raw?.species && typeof raw.species === 'object' ? raw.species : {},
    moves: raw?.moves && typeof raw.moves === 'object' ? raw.moves : {},
    abilities: raw?.abilities && typeof raw.abilities === 'object' ? raw.abilities : {},
    items: raw?.items && typeof raw.items === 'object' ? raw.items : {},
  };
}

function getOverrideString(overrides, section, id, key) {
  const value = overrides?.[section]?.[id]?.[key];
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function readMoveJapaneseNameMap() {
  const moveJaByNum = {};

  const loadMoveNames = filePath => {
    if (!fs.existsSync(filePath)) return;
    for (const row of parseCsvToRecords(filePath)) {
      const moveId = Number(row.ID);
      const moveName = row['わざ名'];
      if (!Number.isFinite(moveId) || !moveName || moveName === '#REF!') continue;
      if (!moveJaByNum[moveId]) moveJaByNum[moveId] = moveName;
    }
  };

  loadMoveNames(MOVE_CSV);
  loadMoveNames(MOVE_STATUS_CSV);

  return moveJaByNum;
}

function readSpeciesJapaneseNameMap() {
  const speciesJaById = {};
  if (!fs.existsSync(SPECIES_CSV)) return speciesJaById;

  for (const row of parseCsvToRecords(SPECIES_CSV)) {
    const id = String(row.ShowdownKey || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const name = String(row['名前(フォルム)'] || row['名前'] || '').trim();
    if (!id || !name || name === '#REF!') continue;
    if (!speciesJaById[id]) speciesJaById[id] = name;
  }

  return speciesJaById;
}

function readAbilityJapaneseNameMap() {
  const abilityJaByNum = {};
  if (!fs.existsSync(ABILITY_CSV)) return abilityJaByNum;

  for (const row of parseCsvToRecords(ABILITY_CSV)) {
    const abilityId = Number(row.ID);
    const abilityName = row['特性'];
    if (!Number.isFinite(abilityId) || !abilityName || abilityName === '#REF!') continue;
    if (!abilityJaByNum[abilityId]) abilityJaByNum[abilityId] = abilityName;
  }

  return abilityJaByNum;
}

function isUsableData(entry) {
  return Boolean(entry && entry.exists && !entry.isNonstandard);
}

function isMegaForm(entry) {
  if (!entry) return false;
  if (typeof entry.forme === 'string' && entry.forme.startsWith('Mega')) return true;
  if (typeof entry.name === 'string' && entry.name.includes('-Mega')) return true;
  return false;
}

function getMegaStoneTypeFromName(name) {
  if (typeof name !== 'string') return 'normal';
  if (name.endsWith('-Mega-X')) return 'x';
  if (name.endsWith('-Mega-Y')) return 'y';
  if (name.endsWith('-Mega-Z')) return 'z';
  return 'normal';
}

function getMegaJapaneseSuffix(stoneType) {
  if (stoneType === 'x') return 'X';
  if (stoneType === 'y') return 'Y';
  if (stoneType === 'z') return 'Z';
  return '';
}

function toId(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function getMegaBaseId(entry, allSpeciesIds) {
  if (!entry) return '';
  const id = toId(entry.id);
  const baseSpeciesId = toId(entry.baseSpecies);
  if (baseSpeciesId && allSpeciesIds.has(baseSpeciesId) && baseSpeciesId !== id) return baseSpeciesId;

  if (id.endsWith('megax') || id.endsWith('megay') || id.endsWith('megaz')) {
    const baseId = id.slice(0, -5);
    if (allSpeciesIds.has(baseId)) return baseId;
  }
  if (id.endsWith('mega')) {
    const baseId = id.slice(0, -4);
    if (allSpeciesIds.has(baseId)) return baseId;
  }
  return '';
}

function getAutoSpeciesJapaneseName(entry, allSpeciesIds, speciesJaById) {
  if (!entry) return null;
  if (!isMegaForm(entry)) return speciesJaById[entry.id] || null;

  const baseId = getMegaBaseId(entry, allSpeciesIds);
  const baseNameJa = speciesJaById[baseId];
  if (!baseNameJa) return speciesJaById[entry.id] || null;

  const suffix = getMegaJapaneseSuffix(getMegaStoneTypeFromName(entry.name));
  return `メガ${baseNameJa}${suffix}`;
}

function buildMissingTranslations(data) {
  return {
    meta: {
      generatedAt: new Date().toISOString(),
      description: 'Fill this data into champions-ja-overrides.json to override generated Japanese text.',
    },
    species: [...(data.species || []), ...(data.megaSpecies || [])]
      .filter(entry => !entry.nameJa)
      .map(entry => ({
        id: entry.id,
        name: entry.name,
        nameJa: null,
      })),
    moves: (data.moves || [])
      .filter(entry => !entry.nameJa || !entry.shortDescJa || !entry.descJa)
      .map(entry => ({
        id: entry.id,
        name: entry.name,
        nameJa: entry.nameJa,
        shortDescEn: entry.shortDesc,
        descEn: entry.desc,
        shortDescJa: entry.shortDescJa,
        descJa: entry.descJa,
      })),
    abilities: (data.abilities || [])
      .filter(entry => !entry.nameJa || !entry.shortDescJa || !entry.descJa)
      .map(entry => ({
        id: entry.id,
        name: entry.name,
        nameJa: entry.nameJa,
        shortDescEn: entry.shortDesc,
        descEn: entry.desc,
        shortDescJa: entry.shortDescJa,
        descJa: entry.descJa,
      })),
    items: (data.items || [])
      .filter(entry => !entry.nameJa || !entry.shortDescJa || !entry.descJa)
      .map(entry => ({
        id: entry.id,
        name: entry.name,
        nameJa: entry.nameJa,
        shortDescEn: entry.shortDesc,
        descEn: entry.desc,
        shortDescJa: entry.shortDescJa,
        descJa: entry.descJa,
      })),
  };
}

function getTypeEffectivenessTable(dex) {
  const types = dex.types.names().map(name => {
    const type = dex.types.get(name);
    const offensive = {};
    for (const defenderName of dex.types.names()) {
      const defender = dex.types.get(defenderName);
      const value = defender.damageTaken[name];
      let multiplier = 1;
      if (value === 1) multiplier = 2;
      if (value === 2) multiplier = 0.5;
      if (value === 3) multiplier = 0;
      offensive[defenderName] = multiplier;
    }
    return {
      id: type.id,
      name: type.name,
      nameJa: TYPE_NAME_JA[type.name] || type.name,
      damageTaken: type.damageTaken,
      offensive,
    };
  });
  return types;
}

function buildData() {
  const dex = Dex.mod('champions');
  const baseDex = Dex.mod('gen9');
  ensureJaOverridesFile();
  const jaOverrides = normalizeJaOverrides(readJsonFile(JA_OVERRIDES_FILE, DEFAULT_JA_OVERRIDES));
  const speciesJaById = readSpeciesJapaneseNameMap();
  const moveJaByNum = readMoveJapaneseNameMap();
  const abilityJaByNum = readAbilityJapaneseNameMap();

  const usableSpecies = dex.species.all().filter(isUsableData);

  const allSpeciesIds = new Set(usableSpecies.map(entry => toId(entry.id)));

  const megaMap = {};
  for (const entry of usableSpecies) {
    if (!isMegaForm(entry)) continue;
    const baseId = getMegaBaseId(entry, allSpeciesIds);
    if (!baseId) continue;
    if (!megaMap[baseId]) megaMap[baseId] = { defaultId: null, forms: [] };
    const stoneType = getMegaStoneTypeFromName(entry.name);
    const requiredItemName = entry.requiredItem || entry.requiredItems?.[0] || null;
    const formMeta = {
      id: entry.id,
      name: entry.name,
      stoneType,
      baseId,
      requiredItemId: requiredItemName ? String(requiredItemName).toLowerCase().replace(/[^a-z0-9]/g, '') : null,
      requiredItemName,
    };
    megaMap[baseId].forms.push(formMeta);
    if (!megaMap[baseId].defaultId || stoneType === 'normal') megaMap[baseId].defaultId = entry.id;
  }

  const species = usableSpecies
    .filter(entry => !isMegaForm(entry))
    .map(entry => ({
      id: entry.id,
      spriteId: entry.spriteid || entry.id,
      num: entry.num,
      name: entry.name,
      nameJa: getOverrideString(jaOverrides, 'species', entry.id, 'nameJa') || getAutoSpeciesJapaneseName(entry, allSpeciesIds, speciesJaById),
      baseSpecies: entry.baseSpecies,
      baseSpeciesId: toId(entry.baseSpecies || entry.name),
      forme: entry.forme,
      prevoId: toId(entry.prevo),
      evosIds: Array.isArray(entry.evos) ? entry.evos.map(toId).filter(Boolean) : [],
      types: entry.types,
      baseStats: entry.baseStats,
      weightkg: entry.weightkg,
      abilities: entry.abilities,
      bst: entry.bst,
      nfe: Boolean(entry.nfe),
      canMega: Boolean(megaMap[entry.id]),
    }))
    .sort((left, right) => left.num - right.num || left.id.localeCompare(right.id));

  const megaSpecies = usableSpecies
    .filter(isMegaForm)
    .map(entry => ({
      id: entry.id,
      spriteId: entry.spriteid || entry.id,
      num: entry.num,
      name: entry.name,
      nameJa: getOverrideString(jaOverrides, 'species', entry.id, 'nameJa') || getAutoSpeciesJapaneseName(entry, allSpeciesIds, speciesJaById),
      baseSpecies: entry.baseSpecies,
      baseSpeciesId: getMegaBaseId(entry, allSpeciesIds) || toId(entry.baseSpecies || entry.name),
      forme: entry.forme,
      prevoId: toId(entry.prevo),
      evosIds: Array.isArray(entry.evos) ? entry.evos.map(toId).filter(Boolean) : [],
      types: entry.types,
      baseStats: entry.baseStats,
      weightkg: entry.weightkg,
      abilities: entry.abilities,
      bst: entry.bst,
      nfe: Boolean(entry.nfe),
      canMega: false,
    }))
    .sort((left, right) => left.num - right.num || left.id.localeCompare(right.id));

  const moves = dex.moves
    .all()
    .filter(isUsableData)
    .map(entry => ({
      id: entry.id,
      num: entry.num,
      name: entry.name,
      nameJa: getOverrideString(jaOverrides, 'moves', entry.id, 'nameJa') || moveJaByNum[entry.num] || null,
      type: entry.type,
      category: entry.category,
      basePower: entry.basePower,
      accuracy: entry.accuracy,
      pp: entry.pp,
      priority: entry.priority,
      target: entry.target,
      shortDesc: entry.shortDesc || null,
      desc: entry.desc || null,
      shortDescJa: getOverrideString(jaOverrides, 'moves', entry.id, 'shortDescJa'),
      descJa: getOverrideString(jaOverrides, 'moves', entry.id, 'descJa'),
      ignoreAbility: Boolean(entry.ignoreAbility),
      ignoreImmunity: Boolean(entry.ignoreImmunity),
      breaksProtect: Boolean(entry.breaksProtect),
      flags: entry.flags,
      drain: entry.drain || null,
      recoil: entry.recoil || null,
      multihit: entry.multihit || null,
      hasCrashDamage: Boolean(entry.hasCrashDamage),
      selfDestruct: entry.selfdestruct || null,
    }))
    .sort((left, right) => left.name.localeCompare(right.name));

  const moveIdSet = new Set(moves.map(move => move.id));

  const abilities = dex.abilities
    .all()
    .filter(isUsableData)
    .map(entry => ({
      id: entry.id,
      num: entry.num,
      name: entry.name,
      nameJa: getOverrideString(jaOverrides, 'abilities', entry.id, 'nameJa') || abilityJaByNum[entry.num] || null,
      shortDesc: entry.shortDesc || null,
      desc: entry.desc || null,
      shortDescJa: getOverrideString(jaOverrides, 'abilities', entry.id, 'shortDescJa'),
      descJa: getOverrideString(jaOverrides, 'abilities', entry.id, 'descJa'),
      rating: entry.rating,
    }))
    .sort((left, right) => left.name.localeCompare(right.name));

  const items = dex.items
    .all()
    .filter(isUsableData)
    .map(entry => ({
      id: entry.id,
      num: entry.num,
      spritenum: Number.isFinite(Number(entry.spritenum)) ? Number(entry.spritenum) : null,
      name: entry.name,
      nameJa: getOverrideString(jaOverrides, 'items', entry.id, 'nameJa') || ITEM_NAME_JA[entry.id] || null,
      isBerry: Boolean(entry.isBerry),
      shortDesc: entry.shortDesc || null,
      desc: entry.desc || null,
      shortDescJa: getOverrideString(jaOverrides, 'items', entry.id, 'shortDescJa'),
      descJa: getOverrideString(jaOverrides, 'items', entry.id, 'descJa'),
      fling: entry.fling || null,
    }))
    .sort((left, right) => left.name.localeCompare(right.name));

  const types = getTypeEffectivenessTable(dex);

  const learnsetBySpeciesId = {};
  const championsLearnsets = dex.data.Learnsets || {};
  const gen9Learnsets = baseDex.data.Learnsets || {};
  for (const entry of usableSpecies) {
    if (!entry || !entry.id) continue;
    const fromChampions = championsLearnsets[entry.id]?.learnset;
    const fromGen9 = gen9Learnsets[entry.id]?.learnset;
    const baseId = (entry.baseSpecies || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const fromGen9Base = gen9Learnsets[baseId]?.learnset;
    const learnset = fromChampions || fromGen9 || fromGen9Base || {};
    const moveIds = Object.keys(learnset).filter(moveId => moveIdSet.has(moveId));
    if (moveIds.length) learnsetBySpeciesId[entry.id] = moveIds;
  }

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      source: 'pokemon-showdown',
      mod: 'champions',
      format: '[Gen 9 Champions] VGC 2026 Reg M-A',
      gameType: 'doubles',
      levelPreset: 50,
      localeFallback: 'en',
    },
    species,
    megaSpecies,
    moves,
    abilities,
    items,
    types,
    megaMap,
    learnsetBySpeciesId,
  };
}

const data = buildData();
fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf8');
fs.writeFileSync(JA_MISSING_FILE, JSON.stringify(buildMissingTranslations(data), null, 2), 'utf8');

console.log(`Generated: ${OUTPUT_FILE}`);
console.log(`Generated: ${JA_MISSING_FILE}`);
console.log(`species=${data.species.length}, moves=${data.moves.length}, abilities=${data.abilities.length}, items=${data.items.length}, types=${data.types.length}`);