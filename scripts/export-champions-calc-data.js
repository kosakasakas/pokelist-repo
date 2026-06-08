const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SHOWDOWN_DIST = path.join(ROOT, 'library', 'pokemon-showdown', 'dist', 'sim', 'index.js');
const OUTPUT_FILE = path.join(ROOT, 'public', 'db', 'champions-calc-data.json');
const JA_TRANSLATIONS_FILE = path.join(ROOT, 'public', 'db', 'champions-ja-translations.json');
const JA_OVERRIDES_FILE = path.join(ROOT, 'public', 'db', 'champions-ja-overrides.json');
const JA_MISSING_FILE = path.join(ROOT, 'public', 'db', 'champions-ja-missing.json');
const POKEAPI_CSV_DIR = path.join(ROOT, 'library', 'pokeapi', 'data', 'v2', 'csv');
const POKEAPI_LANGUAGES_FILE = path.join(POKEAPI_CSV_DIR, 'languages.csv');
const POKEAPI_SPECIES_FILE = path.join(POKEAPI_CSV_DIR, 'pokemon_species.csv');
const POKEAPI_POKEMON_FILE = path.join(POKEAPI_CSV_DIR, 'pokemon.csv');
const POKEAPI_SPECIES_NAMES_FILE = path.join(POKEAPI_CSV_DIR, 'pokemon_species_names.csv');
const POKEAPI_FORMS_FILE = path.join(POKEAPI_CSV_DIR, 'pokemon_forms.csv');
const POKEAPI_FORM_NAMES_FILE = path.join(POKEAPI_CSV_DIR, 'pokemon_form_names.csv');
const POKEAPI_MOVES_FILE = path.join(POKEAPI_CSV_DIR, 'moves.csv');
const POKEAPI_MOVE_NAMES_FILE = path.join(POKEAPI_CSV_DIR, 'move_names.csv');
const POKEAPI_ABILITIES_FILE = path.join(POKEAPI_CSV_DIR, 'abilities.csv');
const POKEAPI_ABILITY_NAMES_FILE = path.join(POKEAPI_CSV_DIR, 'ability_names.csv');
const POKEAPI_ITEMS_FILE = path.join(POKEAPI_CSV_DIR, 'items.csv');
const POKEAPI_ITEM_NAMES_FILE = path.join(POKEAPI_CSV_DIR, 'item_names.csv');
const POKEAPI_MOVE_EFFECT_PROSE_FILE = path.join(POKEAPI_CSV_DIR, 'move_effect_prose.csv');
const POKEAPI_ABILITY_PROSE_FILE = path.join(POKEAPI_CSV_DIR, 'ability_prose.csv');
const POKEAPI_ITEM_PROSE_FILE = path.join(POKEAPI_CSV_DIR, 'item_prose.csv');

if (!fs.existsSync(SHOWDOWN_DIST)) {
  throw new Error(
    'Pokemon Showdown のビルド済みファイルが見つかりません。`npm run build:showdown` を先に実行してください。'
  );
}

const { Dex, TeamValidator } = require(SHOWDOWN_DIST);

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

const DEFAULT_JA_OVERRIDES = {
  meta: {
    description: 'Fill nameJa / shortDescJa / descJa here. This file overrides generated data.',
  },
  species: {},
  moves: {},
  abilities: {},
  items: {},
};

const UPCOMING_INCLUDE_IDS = new Set([
  'raichumegax',
  'raichumegay',
  'raichunitex',
  'raichunitey',
]);

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

function pickLocalizedValue(overrideValue, fallbackValue, defaultValue) {
  const normalizedDefault = String(defaultValue || '').trim();
  const normalizedOverride = String(overrideValue || '').trim();
  if (normalizedOverride && normalizedOverride !== normalizedDefault) return normalizedOverride;
  const normalizedFallback = String(fallbackValue || '').trim();
  if (normalizedFallback) return normalizedFallback;
  return normalizedDefault;
}

function isUsableData(entry) {
  if (!entry || !entry.exists) return false;
  if (!entry.isNonstandard) return true;
  return UPCOMING_INCLUDE_IDS.has(toId(entry.id || entry.name));
}

function isMegaForm(entry) {
  if (!entry) return false;
  if (typeof entry.forme === 'string' && entry.forme.startsWith('Mega')) return true;
  if (typeof entry.name === 'string' && entry.name.includes('-Mega')) return true;
  return false;
}

function toId(value) {
  return String(value || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function parseCsvLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (ch === ',' && !inQuotes) {
      values.push(current);
      current = '';
      continue;
    }
    current += ch;
  }
  values.push(current);
  return values;
}

function readCsvRows(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  const lines = raw.split(/\r?\n/).filter(line => line.trim());
  if (!lines.length) return [];
  const headers = parseCsvLine(lines[0]).map(header => String(header || '').trim());
  return lines.slice(1).map(line => {
    const values = parseCsvLine(line);
    const row = {};
    headers.forEach((header, index) => {
      row[header] = values[index] != null ? String(values[index]).trim() : '';
    });
    return row;
  });
}

function buildJaFallbackMaps() {
  const languages = readCsvRows(POKEAPI_LANGUAGES_FILE);
  const findLanguageIds = identifiers => languages
    .filter(row => identifiers.includes(String(row.identifier || '').trim()))
    .map(row => Number(row.id))
    .filter(Number.isFinite);

  const jaLanguageIds = findLanguageIds(['ja', 'ja-hrkt']);
  const enLanguageIds = findLanguageIds(['en']);

  const buildLanguageOrder = preferredIds => {
    const available = [...new Set([...jaLanguageIds, ...enLanguageIds])];
    const first = preferredIds.filter(id => available.includes(id));
    const rest = available.filter(id => !first.includes(id));
    return new Map([...first, ...rest].map((id, index) => [id, index]));
  };
  const nameLanguageOrder = buildLanguageOrder([11, 1, 9]);
  const textLanguageOrder = buildLanguageOrder([11, 1, 9]);

  const pickBestByResourceId = (rows, resourceIdKey, pickValue, languageOrder) => {
    const map = new Map();
    rows.forEach(row => {
      const resourceId = Number(row[resourceIdKey]);
      const languageId = Number(row.local_language_id);
      const value = pickValue(row);
      if (!Number.isFinite(resourceId) || !Number.isFinite(languageId) || !value) return;
      if (!languageOrder.has(languageId)) return;
      const rank = languageOrder.get(languageId);
      const current = map.get(resourceId);
      if (!current || rank < current.rank) map.set(resourceId, { value, rank });
    });
    return map;
  };

  const normalizeMegaFormJaName = (name, baseJa, formIdentifier) => {
    const text = String(name || '').trim();
    if (!text) return '';
    if (!baseJa) return text;
    if (text === 'メガ') return `メガ${baseJa}`;
    if (text === 'メガX') return `メガ${baseJa}X`;
    if (text === 'メガY') return `メガ${baseJa}Y`;
    if (text === 'メガZ') return `メガ${baseJa}Z`;
    if (/\(メガ\)$/.test(text)) return `メガ${baseJa}`;
    if (/\(メガX\)$/.test(text)) return `メガ${baseJa}X`;
    if (/\(メガY\)$/.test(text)) return `メガ${baseJa}Y`;
    if (/\(メガZ\)$/.test(text)) return `メガ${baseJa}Z`;
    if (formIdentifier === 'mega') return `メガ${baseJa}`;
    if (formIdentifier === 'mega-x') return `メガ${baseJa}X`;
    if (formIdentifier === 'mega-y') return `メガ${baseJa}Y`;
    if (formIdentifier === 'mega-z') return `メガ${baseJa}Z`;
    return text;
  };

  const buildRegionalFormJaName = (baseJa, formIdentifier = '') => {
    const text = String(formIdentifier || '').trim().toLowerCase();
    if (!baseJa || !text) return '';
    const regionLabelByToken = {
      alola: 'アローラのすがた',
      galar: 'ガラルのすがた',
      hisui: 'ヒスイのすがた',
      paldea: 'パルデアのすがた',
    };
    const paldeaBreedByToken = {
      combat: 'コンバット種',
      aqua: 'ウォーター種',
      blaze: 'ブレイズ種',
    };
    const tokens = text.split('-').filter(Boolean);
    const regionToken = tokens.find(token => Object.prototype.hasOwnProperty.call(regionLabelByToken, token));
    if (!regionToken) return '';
    const regionLabel = regionLabelByToken[regionToken];
    if (regionToken === 'paldea') {
      const breedToken = tokens.find(token => Object.prototype.hasOwnProperty.call(paldeaBreedByToken, token));
      if (breedToken) return `${baseJa}(${regionLabel}・${paldeaBreedByToken[breedToken]})`;
    }
    return `${baseJa}(${regionLabel})`;
  };

  const buildRotomFormJaName = (identifier = '', formIdentifier = '') => {
    const id = toId(identifier);
    if (!id.startsWith('rotom')) return '';
    const token = String(formIdentifier || '').trim().toLowerCase();
    const formJaByToken = {
      heat: 'ヒートロトム',
      wash: 'ウォッシュロトム',
      frost: 'フロストロトム',
      fan: 'スピンロトム',
      mow: 'カットロトム',
    };
    return formJaByToken[token] || '';
  };

  const buildSpecialFormJaName = (baseJa, formIdentifier = '', identifier = '', selectedFormName = '') => {
    if (!baseJa) return '';
    const text = String(formIdentifier || '').trim().toLowerCase();
    const nameText = String(selectedFormName || '').trim().toLowerCase();
    const id = toId(identifier);
    const tokenSet = new Set(text.split('-').filter(Boolean));
    const hasToken = token => tokenSet.has(token) || text.includes(token) || nameText.includes(token);

    const formLabelByToken = [
      ['blade', 'ブレードフォルム'],
      ['shield', 'シールドフォルム'],
      ['midday', 'まひるのすがた'],
      ['midnight', 'まよなかのすがた'],
      ['dusk', 'たそがれのすがた'],
      ['hero', 'マイティフォルム'],
      ['zero', 'ナイーブフォルム'],
      ['female', 'メスのすがた'],
      ['male', 'オスのすがた'],
      ['rainy', 'あまみずのすがた'],
      ['sunny', 'たいようのすがた'],
      ['snowy', 'ゆきぐものすがた'],
      ['small', 'ちいさいサイズ'],
      ['large', 'おおきいサイズ'],
      ['super', 'とくだいサイズ'],
      ['average', 'ふつうのサイズ'],
      ['white-striped', 'しろすじのすがた'],
      ['blue-striped', 'あおすじのすがた'],
      ['red-striped', 'あかすじのすがた'],
      ['eternal', 'えいえんのはな'],
    ];

    for (const [token, label] of formLabelByToken) {
      if (hasToken(token)) return `${baseJa}(${label})`;
    }

    // Some form identifiers are sparse; use species-specific ID hints as final fallback.
    if (id.startsWith('aegislashblade')) return `${baseJa}(ブレードフォルム)`;
    if (id.startsWith('lycanrocdusk')) return `${baseJa}(たそがれのすがた)`;
    if (id.startsWith('lycanrocmidnight')) return `${baseJa}(まよなかのすがた)`;
    if (id.startsWith('palafinhero')) return `${baseJa}(マイティフォルム)`;
    if (id.startsWith('meowsticf')) return `${baseJa}(メスのすがた)`;
    if (id.startsWith('castformsunny')) return `${baseJa}(たいようのすがた)`;
    if (id.startsWith('castformrainy')) return `${baseJa}(あまみずのすがた)`;
    if (id.startsWith('castformsnowy')) return `${baseJa}(ゆきぐものすがた)`;
    if (id.startsWith('pumpkaboosmall')) return `${baseJa}(ちいさいサイズ)`;
    if (id.startsWith('pumpkaboolarge')) return `${baseJa}(おおきいサイズ)`;
    if (id.startsWith('pumpkaboosuper')) return `${baseJa}(とくだいサイズ)`;
    if (id.startsWith('floetteeternal')) return `${baseJa}(えいえんのはな)`;
    if (id.startsWith('basculinwhitestriped')) return `${baseJa}(しろすじのすがた)`;
    if (id.startsWith('basculinbluestriped')) return `${baseJa}(あおすじのすがた)`;

    return '';
  };

  const speciesJaById = new Map();
  const buildSpeciesIdAliases = identifier => {
    const base = toId(identifier);
    if (!base) return [];
    const aliases = new Set([base]);
    if (base.endsWith('breed')) aliases.add(base.slice(0, -5));
    if (base.endsWith('female')) aliases.add(`${base.slice(0, -6)}f`);
    if (base.endsWith('male')) aliases.add(`${base.slice(0, -4)}m`);
    if (base.includes('familyofthree')) aliases.add(base.replace('familyofthree', 'three'));
    if (base.includes('familyoffour')) aliases.add(base.replace('familyoffour', 'four'));
    return [...aliases].filter(Boolean);
  };
  const setSpeciesJaName = (identifier, jaName) => {
    const text = String(jaName || '').trim();
    if (!text) return;
    buildSpeciesIdAliases(identifier).forEach(id => {
      if (!speciesJaById.has(id)) speciesJaById.set(id, text);
    });
  };
  const speciesRows = readCsvRows(POKEAPI_SPECIES_FILE);
  const pokemonRows = readCsvRows(POKEAPI_POKEMON_FILE);
  const speciesIdentifierByNumericId = new Map();
  speciesRows.forEach(row => {
    const speciesId = Number(row.id);
    const identifier = toId(row.identifier);
    if (!Number.isFinite(speciesId) || !identifier) return;
    speciesIdentifierByNumericId.set(speciesId, identifier);
  });
  const pokemonSpeciesIdentifierByPokemonId = new Map();
  pokemonRows.forEach(row => {
    const pokemonId = Number(row.id);
    const speciesId = Number(row.species_id);
    const speciesIdentifier = speciesIdentifierByNumericId.get(speciesId) || '';
    if (!Number.isFinite(pokemonId) || !speciesIdentifier) return;
    pokemonSpeciesIdentifierByPokemonId.set(pokemonId, speciesIdentifier);
  });
  const speciesNames = pickBestByResourceId(
    readCsvRows(POKEAPI_SPECIES_NAMES_FILE),
    'pokemon_species_id',
    row => String(row.name || '').trim(),
    nameLanguageOrder
  );
  speciesRows.forEach(row => {
    const identifier = toId(row.identifier);
    const speciesId = Number(row.id);
    const jaName = speciesNames.get(speciesId)?.value || '';
    if (!identifier || !jaName) return;
    setSpeciesJaName(identifier, jaName);
  });

  const formRows = readCsvRows(POKEAPI_FORMS_FILE);
  const formNames = pickBestByResourceId(
    readCsvRows(POKEAPI_FORM_NAMES_FILE),
    'pokemon_form_id',
    row => String(row.pokemon_name || '').trim(),
    nameLanguageOrder
  );
  const formNameFallback = pickBestByResourceId(
    readCsvRows(POKEAPI_FORM_NAMES_FILE),
    'pokemon_form_id',
    row => String(row.form_name || '').trim(),
    nameLanguageOrder
  );
  formRows.forEach(row => {
    const identifier = toId(row.identifier);
    const formId = Number(row.id);
    const pokemonId = Number(row.pokemon_id);
    const formIdentifier = String(row.form_identifier || '').trim().toLowerCase();
    const selectedPokemonName = formNames.get(formId)?.value || '';
    const selectedFormName = formNameFallback.get(formId)?.value || '';
    const baseIdentifier = pokemonSpeciesIdentifierByPokemonId.get(pokemonId) || toId(String(row.identifier || '').replace(/-[^-]+$/, ''));
    const baseJa = speciesJaById.get(baseIdentifier) || '';
    let jaName = '';
    if (!jaName) jaName = buildRotomFormJaName(row.identifier, formIdentifier);
    if (!jaName) jaName = buildRegionalFormJaName(baseJa, formIdentifier);
    if (!jaName) jaName = buildSpecialFormJaName(baseJa, formIdentifier, row.identifier, selectedFormName || selectedPokemonName);
    if (!jaName) jaName = selectedPokemonName;
    if (!jaName && selectedFormName && baseJa) {
      if (/^mega(-[xyz])?$/.test(formIdentifier)) {
        jaName = normalizeMegaFormJaName(selectedFormName, baseJa, formIdentifier);
      } else {
        jaName = `${baseJa}(${selectedFormName})`;
      }
    }
    if (!jaName) jaName = selectedFormName;
    if (/^mega(-[xyz])?$/.test(formIdentifier)) jaName = normalizeMegaFormJaName(jaName, baseJa, formIdentifier);
    if (baseJa && /のすがた$/.test(jaName) && !jaName.startsWith(baseJa)) jaName = `${baseJa}(${jaName})`;
    if (!identifier || !jaName) return;
    setSpeciesJaName(identifier, jaName);
  });

  const moveJaById = new Map();
  const moveRows = readCsvRows(POKEAPI_MOVES_FILE);
  const moveNames = pickBestByResourceId(
    readCsvRows(POKEAPI_MOVE_NAMES_FILE),
    'move_id',
    row => String(row.name || '').trim(),
    nameLanguageOrder
  );
  moveRows.forEach(row => {
    const identifier = toId(row.identifier);
    const moveId = Number(row.id);
    const jaName = moveNames.get(moveId)?.value || '';
    if (!identifier || !jaName) return;
    if (!moveJaById.has(identifier)) moveJaById.set(identifier, jaName);
  });

  const abilityJaById = new Map();
  const abilityRows = readCsvRows(POKEAPI_ABILITIES_FILE);
  const abilityNames = pickBestByResourceId(
    readCsvRows(POKEAPI_ABILITY_NAMES_FILE),
    'ability_id',
    row => String(row.name || '').trim(),
    nameLanguageOrder
  );
  abilityRows.forEach(row => {
    const identifier = toId(row.identifier);
    const abilityId = Number(row.id);
    const jaName = abilityNames.get(abilityId)?.value || '';
    if (!identifier || !jaName) return;
    if (!abilityJaById.has(identifier)) abilityJaById.set(identifier, jaName);
  });

  const itemJaById = new Map();
  const itemRows = readCsvRows(POKEAPI_ITEMS_FILE);
  const itemNames = pickBestByResourceId(
    readCsvRows(POKEAPI_ITEM_NAMES_FILE),
    'item_id',
    row => String(row.name || '').trim(),
    nameLanguageOrder
  );
  itemRows.forEach(row => {
    const identifier = toId(row.identifier);
    const itemId = Number(row.id);
    const jaName = itemNames.get(itemId)?.value || '';
    if (!identifier || !jaName) return;
    if (!itemJaById.has(identifier)) itemJaById.set(identifier, jaName);
  });

  const moveDescById = new Map();
  const moveEffects = pickBestByResourceId(
    readCsvRows(POKEAPI_MOVE_EFFECT_PROSE_FILE),
    'move_effect_id',
    row => ({ shortDesc: String(row.short_effect || '').trim(), desc: String(row.effect || '').trim() }),
    textLanguageOrder
  );
  moveRows.forEach(row => {
    const identifier = toId(row.identifier);
    const effectId = Number(row.effect_id);
    const prose = moveEffects.get(effectId)?.value || null;
    if (!identifier || !prose) return;
    moveDescById.set(identifier, prose);
  });

  const abilityDescById = new Map();
  const abilityProse = pickBestByResourceId(
    readCsvRows(POKEAPI_ABILITY_PROSE_FILE),
    'ability_id',
    row => ({ shortDesc: String(row.short_effect || '').trim(), desc: String(row.effect || '').trim() }),
    textLanguageOrder
  );
  abilityRows.forEach(row => {
    const identifier = toId(row.identifier);
    const abilityId = Number(row.id);
    const prose = abilityProse.get(abilityId)?.value || null;
    if (!identifier || !prose) return;
    abilityDescById.set(identifier, prose);
  });

  const itemDescById = new Map();
  const itemProse = pickBestByResourceId(
    readCsvRows(POKEAPI_ITEM_PROSE_FILE),
    'item_id',
    row => ({ shortDesc: String(row.short_effect || '').trim(), desc: String(row.effect || '').trim() }),
    textLanguageOrder
  );
  itemRows.forEach(row => {
    const identifier = toId(row.identifier);
    const itemId = Number(row.id);
    const prose = itemProse.get(itemId)?.value || null;
    if (!identifier || !prose) return;
    itemDescById.set(identifier, prose);
  });

  return { speciesJaById, moveJaById, abilityJaById, itemJaById, moveDescById, abilityDescById, itemDescById };
}

function toMegaJaName(baseJa, forme = '', fallback = '') {
  if (!baseJa) return fallback || '';
  const formeText = String(forme || '').toUpperCase();
  if (formeText.includes('MEGA-X')) return `メガ${baseJa}X`;
  if (formeText.includes('MEGA-Y')) return `メガ${baseJa}Y`;
  if (formeText.includes('MEGA-Z')) return `メガ${baseJa}Z`;
  if (formeText.includes('MEGA')) return `メガ${baseJa}`;
  return fallback || '';
}

function toMegaStoneJaName(itemEntry, speciesJaById) {
  if (!itemEntry) return '';
  const megaStoneValue = typeof itemEntry.megaStone === 'string'
    ? itemEntry.megaStone
    : Object.values(itemEntry.megaStone || {})[0];
  const megaId = toId(megaStoneValue || '');
  if (!megaId) return '';
  const baseId = megaId.replace(/mega[xyz]?$/, '');
  if (!baseId) return '';
  const baseJa = speciesJaById.get(baseId) || '';
  if (!baseJa) return '';
  const suffix = megaId.endsWith('megax') ? 'Ｘ' : (megaId.endsWith('megay') ? 'Ｙ' : (megaId.endsWith('megaz') ? 'Ｚ' : ''));
  return `${baseJa}ナイト${suffix}`;
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

function buildMissingTranslations(data) {
  const species = [...(data.species || []), ...(data.megaSpecies || [])]
    .filter(entry => !entry.nameJa)
    .map(entry => ({
      id: entry.id,
      name: entry.name,
      nameJa: '',
    }));

  const moves = (data.moves || [])
    .filter(entry => !entry.nameJa || !entry.shortDescJa || !entry.descJa)
    .map(entry => ({
      id: entry.id,
      name: entry.name,
      nameJa: entry.nameJa || '',
      shortDescEn: entry.shortDesc || '',
      descEn: entry.desc || '',
      shortDescJa: '',
      descJa: '',
    }));

  const abilities = (data.abilities || [])
    .filter(entry => !entry.nameJa || !entry.shortDescJa || !entry.descJa)
    .map(entry => ({
      id: entry.id,
      name: entry.name,
      nameJa: entry.nameJa || '',
      shortDescEn: entry.shortDesc || '',
      descEn: entry.desc || '',
      shortDescJa: '',
      descJa: '',
    }));

  const items = (data.items || [])
    .filter(entry => !entry.nameJa || !entry.shortDescJa || !entry.descJa)
    .map(entry => ({
      id: entry.id,
      name: entry.name,
      nameJa: entry.nameJa || '',
      shortDescEn: entry.shortDesc || '',
      descEn: entry.desc || '',
      shortDescJa: '',
      descJa: '',
    }));

  return {
    meta: {
      generatedAt: new Date().toISOString(),
      description: 'Fill shortDescJa/descJa/nameJa and copy into champions-ja-overrides.json.',
    },
    species,
    moves,
    abilities,
    items,
  };
}

function buildJaTranslations(data) {
  const translations = {
    meta: {
      generatedAt: new Date().toISOString(),
      source: 'champions-calc-data',
      locale: 'ja',
    },
    species: {},
    moves: {},
    abilities: {},
    items: {},
  };

  [...(data.species || []), ...(data.megaSpecies || [])].forEach(entry => {
    translations.species[entry.id] = {
      nameJa: entry.nameJa || '',
    };
  });
  (data.moves || []).forEach(entry => {
    translations.moves[entry.id] = {
      nameJa: entry.nameJa || '',
      shortDescJa: entry.shortDescJa || '',
      descJa: entry.descJa || '',
    };
  });
  (data.abilities || []).forEach(entry => {
    translations.abilities[entry.id] = {
      nameJa: entry.nameJa || '',
      shortDescJa: entry.shortDescJa || '',
      descJa: entry.descJa || '',
    };
  });
  (data.items || []).forEach(entry => {
    translations.items[entry.id] = {
      nameJa: entry.nameJa || '',
      shortDescJa: entry.shortDescJa || '',
      descJa: entry.descJa || '',
    };
  });

  return translations;
}

function buildOverridesTemplateFromMissing(missing) {
  const overrides = {
    meta: {
      description: 'Fill nameJa / shortDescJa / descJa here. This file overrides generated data.',
      generatedFromMissingAt: new Date().toISOString(),
    },
    species: {},
    moves: {},
    abilities: {},
    items: {},
  };

  (missing.species || []).forEach(entry => {
    overrides.species[entry.id] = { nameJa: entry.nameJa || '' };
  });
  (missing.moves || []).forEach(entry => {
    overrides.moves[entry.id] = {
      nameJa: entry.nameJa || '',
      shortDescJa: entry.shortDescJa || '',
      descJa: entry.descJa || '',
    };
  });
  (missing.abilities || []).forEach(entry => {
    overrides.abilities[entry.id] = {
      nameJa: entry.nameJa || '',
      shortDescJa: entry.shortDescJa || '',
      descJa: entry.descJa || '',
    };
  });
  (missing.items || []).forEach(entry => {
    overrides.items[entry.id] = {
      nameJa: entry.nameJa || '',
      shortDescJa: entry.shortDescJa || '',
      descJa: entry.descJa || '',
    };
  });

  return overrides;
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
  const formatId = '[Gen 9 Champions] VGC 2026 Reg M-A';
  const dex = Dex.mod('champions');
  const baseDex = Dex.mod('gen9');
  ensureJaOverridesFile();
  const jaOverrides = normalizeJaOverrides(readJsonFile(JA_OVERRIDES_FILE, DEFAULT_JA_OVERRIDES));
  const jaFallback = buildJaFallbackMaps();

  const validator = TeamValidator.get(formatId);
  const makeValidationSet = entry => {
    const species = dex.species.get(entry.id);
    const championsLearnset = dex.data.Learnsets?.[species.id]?.learnset || {};
    const gen9Learnset = baseDex.data.Learnsets?.[species.id]?.learnset || {};
    const moveId = Object.keys(championsLearnset)[0] || Object.keys(gen9Learnset)[0] || 'protect';
    const abilityName = species.abilities?.['0'] || Object.values(species.abilities || {})[0] || 'Pressure';
    return {
      name: species.name,
      species: species.name,
      ability: abilityName,
      moves: [moveId],
      level: 50,
      nature: 'Hardy',
      evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
      ivs: { hp: 31, atk: 31, def: 31, spa: 31, spd: 31, spe: 31 },
    };
  };
  const isLegalForFormat = entry => {
    const problems = validator.validateSet(makeValidationSet(entry), {}) || [];
    if (!Array.isArray(problems) || !problems.length) return true;
    return !problems.some(problem => /does not exist in Gen 9|not obtainable|is banned|is not allowed/i.test(String(problem || '')));
  };

  const allUsableSpecies = dex.species.all().filter(isUsableData);
  const nonMegaSpecies = allUsableSpecies.filter(entry => !isMegaForm(entry));
  const legalNonMegaSpecies = nonMegaSpecies.filter(isLegalForFormat);
  const legalBaseIds = new Set(legalNonMegaSpecies.map(entry => toId(entry.id)));
  const legalMegaSpecies = allUsableSpecies.filter(entry => {
    if (!isMegaForm(entry)) return false;
    const baseId = getMegaBaseId(entry, new Set(nonMegaSpecies.map(species => toId(species.id)))) || toId(entry.baseSpecies || '');
    return Boolean(baseId && legalBaseIds.has(baseId));
  });
  const usableSpecies = [...legalNonMegaSpecies, ...legalMegaSpecies];
  const allSpeciesIds = new Set(usableSpecies.map(entry => toId(entry.id)));

  const megaMap = {};
  for (const entry of usableSpecies) {
    if (!isMegaForm(entry)) continue;
    const baseId = getMegaBaseId(entry, allSpeciesIds);
    if (!baseId) continue;
    if (!megaMap[baseId]) megaMap[baseId] = { defaultId: null, forms: [] };
    const requiredItemName = entry.requiredItem || entry.requiredItems?.[0] || null;
    const formMeta = {
      id: entry.id,
      name: entry.name,
      baseId,
      requiredItemId: requiredItemName ? String(requiredItemName).toLowerCase().replace(/[^a-z0-9]/g, '') : null,
      requiredItemName,
    };
    megaMap[baseId].forms.push(formMeta);
    if (!megaMap[baseId].defaultId) megaMap[baseId].defaultId = entry.id;
  }

  const species = usableSpecies
    .filter(entry => !isMegaForm(entry))
    .map(entry => ({
      id: entry.id,
      spriteId: entry.spriteid || entry.id,
      num: entry.num,
      name: entry.name,
      nameJa: pickLocalizedValue(
        getOverrideString(jaOverrides, 'species', entry.id, 'nameJa'),
        jaFallback.speciesJaById.get(entry.id) || entry.nameJa || '',
        entry.name
      ),
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
    .map(entry => {
      const baseId = getMegaBaseId(entry, allSpeciesIds) || toId(entry.baseSpecies || entry.name);
      const baseJa = jaFallback.speciesJaById.get(baseId) || '';
      const megaJaFallback = toMegaJaName(baseJa, entry.name || entry.forme || '', '');
      return {
      id: entry.id,
      spriteId: entry.spriteid || entry.id,
      num: entry.num,
      name: entry.name,
      nameJa: pickLocalizedValue(
        getOverrideString(jaOverrides, 'species', entry.id, 'nameJa'),
        jaFallback.speciesJaById.get(entry.id) || megaJaFallback || entry.nameJa || '',
        entry.name
      ),
      baseSpecies: entry.baseSpecies,
      baseSpeciesId: baseId,
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
    };
    })
    .sort((left, right) => left.num - right.num || left.id.localeCompare(right.id));

  const moves = dex.moves
    .all()
    .filter(isUsableData)
    .map(entry => ({
      id: entry.id,
      num: entry.num,
      name: entry.name,
      nameJa: pickLocalizedValue(
        getOverrideString(jaOverrides, 'moves', entry.id, 'nameJa'),
        jaFallback.moveJaById.get(entry.id) || entry.nameJa || '',
        entry.name
      ),
      type: entry.type,
      category: entry.category,
      basePower: entry.basePower,
      accuracy: entry.accuracy,
      pp: entry.pp,
      priority: entry.priority,
      target: entry.target,
      shortDesc: entry.shortDesc || null,
      desc: entry.desc || null,
      shortDescJa: pickLocalizedValue(
        getOverrideString(jaOverrides, 'moves', entry.id, 'shortDescJa'),
        jaFallback.moveDescById.get(entry.id)?.shortDesc || entry.shortDescJa,
        entry.shortDesc
      ),
      descJa: pickLocalizedValue(
        getOverrideString(jaOverrides, 'moves', entry.id, 'descJa'),
        jaFallback.moveDescById.get(entry.id)?.desc || entry.descJa,
        entry.desc
      ),
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
      nameJa: pickLocalizedValue(
        getOverrideString(jaOverrides, 'abilities', entry.id, 'nameJa'),
        jaFallback.abilityJaById.get(entry.id) || entry.nameJa || '',
        entry.name
      ),
      shortDesc: entry.shortDesc || null,
      desc: entry.desc || null,
      shortDescJa: pickLocalizedValue(
        getOverrideString(jaOverrides, 'abilities', entry.id, 'shortDescJa'),
        jaFallback.abilityDescById.get(entry.id)?.shortDesc || entry.shortDescJa,
        entry.shortDesc
      ),
      descJa: pickLocalizedValue(
        getOverrideString(jaOverrides, 'abilities', entry.id, 'descJa'),
        jaFallback.abilityDescById.get(entry.id)?.desc || entry.descJa,
        entry.desc
      ),
      rating: entry.rating,
    }))
    .sort((left, right) => left.name.localeCompare(right.name));

  const items = dex.items
    .all()
    .filter(isUsableData)
    .map(entry => {
      const autoMegaNameJa = toMegaStoneJaName(entry, jaFallback.speciesJaById);
      return {
        id: entry.id,
        num: entry.num,
        spritenum: Number.isFinite(Number(entry.spritenum)) ? Number(entry.spritenum) : null,
        name: entry.name,
        nameJa: pickLocalizedValue(
          getOverrideString(jaOverrides, 'items', entry.id, 'nameJa'),
          autoMegaNameJa || jaFallback.itemJaById.get(entry.id) || entry.nameJa || '',
          entry.name
        ),
        isBerry: Boolean(entry.isBerry),
        shortDesc: entry.shortDesc || null,
        desc: entry.desc || null,
        shortDescJa: pickLocalizedValue(
          getOverrideString(jaOverrides, 'items', entry.id, 'shortDescJa'),
          jaFallback.itemDescById.get(entry.id)?.shortDesc || entry.shortDescJa,
          entry.shortDesc
        ),
        descJa: pickLocalizedValue(
          getOverrideString(jaOverrides, 'items', entry.id, 'descJa'),
          jaFallback.itemDescById.get(entry.id)?.desc || entry.descJa,
          entry.desc
        ),
        fling: entry.fling || null,
      };
    })
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
      source: 'pokemon-showdown + pokeapi-csv',
      mod: 'champions',
      format: formatId,
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
const missing = buildMissingTranslations(data);
const jaTranslations = buildJaTranslations(data);
const shouldResetJaOverrides = process.argv.includes('--reset-ja');

fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2), 'utf8');
fs.writeFileSync(JA_TRANSLATIONS_FILE, JSON.stringify(jaTranslations, null, 2), 'utf8');
fs.writeFileSync(JA_MISSING_FILE, JSON.stringify(missing, null, 2), 'utf8');
if (shouldResetJaOverrides) {
  const template = buildOverridesTemplateFromMissing(missing);
  fs.writeFileSync(JA_OVERRIDES_FILE, JSON.stringify(template, null, 2), 'utf8');
}

console.log(`Generated: ${OUTPUT_FILE}`);
console.log(`Generated: ${JA_TRANSLATIONS_FILE}`);
console.log(`Generated: ${JA_MISSING_FILE}`);
if (shouldResetJaOverrides) console.log(`Reset: ${JA_OVERRIDES_FILE}`);
console.log(`species=${data.species.length}, moves=${data.moves.length}, abilities=${data.abilities.length}, items=${data.items.length}, types=${data.types.length}`);
