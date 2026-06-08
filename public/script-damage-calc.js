const I18N = {
  ja: {
    title: 'ポケモンチャンピオンズ ダメージ計算',
    subtitle: '[Gen 9 Champions] VGC 2026 Reg M-A',
    backToList: 'ポケリスへ',
    attacker: '攻撃側',
    defender: '防御側',
    species: 'ポケモン',
    nature: 'せいかく',
    megaEnabled: 'メガ進化',
    ability: 'とくせい',
    item: 'もちもの',
    championsFixedStats: 'チャンピオンズ仕様に合わせて レベル50固定',
    apAtk: '能力ポイント Atk',
    apSpa: '能力ポイント SpA',
    apHp: '能力ポイント HP',
    apDef: '能力ポイント Def',
    apSpd: '能力ポイント SpD',
    actualStats: '実数値',
    battleSettings: '状況',
    move: 'わざ',
    type: 'タイプ',
    category: '分類',
    physical: '物理',
    special: '特殊',
    status: '変化',
    power: '威力',
    weather: '天候',
    terrain: 'フィールド',
    none: 'なし',
    sun: '晴れ',
    rain: '雨',
    sand: '砂嵐',
    snow: '雪',
    electricTerrain: 'エレキフィールド',
    grassyTerrain: 'グラスフィールド',
    psychicTerrain: 'サイコフィールド',
    mistyTerrain: 'ミストフィールド',
    critical: '急所',
    burn: 'やけど(攻撃側)',
    spreadMove: 'ダブル補正',
    helpingHand: 'てだすけ',
    reflect: 'リフレクター',
    lightScreen: 'ひかりのかべ',
    defenderFullHp: '防御側HP満タン',
    friendGuard: 'フレンドガード',
    hitCount: 'ヒット回数',
    calculate: '再計算',
    swapSides: '攻守入替',
    result: '計算結果',
    licenseLabel: 'データ出典',
    pickerSearch: '検索して絞り込み',
    pickerNoMatch: '候補がありません',
    pickerMove: 'わざを選択',
    pickerNature: 'せいかくを選択',
    pickerItem: 'もちものを選択',
    pickerSpecies: 'ポケモンを選択',
    pickerImportShowdown: 'Pokepaste（Showdown形式）から読み込み',
    pickerImportOpenButton: 'アイコン + Pokepaste',
    pickerImportTitle: 'Pokepaste 読み込み',
    pickerImportPlaceholder: 'ここに Showdown 形式の構築テキストを貼り付け',
    pickerImportButton: '読み込んで追加',
    close: '閉じる',
    pickerImportSuccess: '{count}体をボックスへ追加しました。',
    pickerImportNoValid: '読み込めるポケモンが見つかりませんでした。',
    detailExportPokepaste: 'Pokepaste出力',
    detailExportTitle: 'Pokepaste 出力',
    detailExportCopy: 'コピー',
    detailExportCopied: 'Pokepaste をコピーしました。',
    pickerAbility: 'とくせいを選択',
    statusMoveError: 'このわざは変化技のためダメージは 0 です。',
    noDamageError: '威力0のためダメージは 0 です。',
    invalidError: '入力値を確認してください。',
    notesPrefix: '補正:',
    megaEvolution: 'メガ進化',
    levitateImmunity: 'ふゆうで無効',
    flashFireImmunity: 'もらいびで無効',
    waterImmunity: 'みず吸収系で無効',
    electricImmunity: 'でんき吸収系で無効',
    grassImmunity: 'そうしょくで無効',
    typeImmunity: 'タイプ相性で無効',
    recoilLabel: '反動',
    recoveryLabel: '回復',
    hitsLabel: 'ヒット',
    randomLabel: '乱数(16)',
    neutralNature: '補正なし',
    boxPartyTitle: 'ポケモンチャンピオンズ ボックス/パーティ',
    boxPartySubtitle: 'Pokemon storage and party builder',
    toCalc: 'ダメージ計算へ',
    boxPartyLabel: 'ボックス / パーティ',
  },
  en: {
    title: 'Pokemon Champions Damage Calculator',
    subtitle: '[Gen 9 Champions] VGC 2026 Reg M-A',
    backToList: 'Back to Poke List',
    attacker: 'Attacker',
    defender: 'Defender',
    species: 'Pokemon',
    nature: 'Nature',
    megaEnabled: 'Mega Evolution',
    ability: 'Ability',
    item: 'Item',
    championsFixedStats: 'Champions setting: fixed Level 50',
    apAtk: 'Stat Points Atk',
    apSpa: 'Stat Points SpA',
    apHp: 'Stat Points HP',
    apDef: 'Stat Points Def',
    apSpd: 'Stat Points SpD',
    actualStats: 'Actual Stats',
    battleSettings: 'Situation',
    move: 'Move',
    type: 'Type',
    category: 'Category',
    physical: 'Physical',
    special: 'Special',
    status: 'Status',
    power: 'Power',
    weather: 'Weather',
    terrain: 'Terrain',
    none: 'None',
    sun: 'Sun',
    rain: 'Rain',
    sand: 'Sandstorm',
    snow: 'Snow',
    electricTerrain: 'Electric Terrain',
    grassyTerrain: 'Grassy Terrain',
    psychicTerrain: 'Psychic Terrain',
    mistyTerrain: 'Misty Terrain',
    critical: 'Critical hit',
    burn: 'Burned (attacker)',
    spreadMove: 'Doubles modifier',
    helpingHand: 'Helping Hand',
    reflect: 'Reflect',
    lightScreen: 'Light Screen',
    defenderFullHp: 'Defender at full HP',
    friendGuard: 'Friend Guard',
    hitCount: 'Hits',
    calculate: 'Recalculate',
    swapSides: 'Swap A/D',
    result: 'Result',
    licenseLabel: 'Data source',
    pickerSearch: 'Type to filter',
    pickerNoMatch: 'No options found',
    pickerMove: 'Select Move',
    pickerNature: 'Select Nature',
    pickerItem: 'Select Item',
    pickerSpecies: 'Select Pokemon',
    pickerImportShowdown: 'Import from Pokepaste (Showdown format)',
    pickerImportOpenButton: 'Icon + Pokepaste',
    pickerImportTitle: 'Pokepaste Import',
    pickerImportPlaceholder: 'Paste Showdown team text here',
    pickerImportButton: 'Import and add',
    close: 'Close',
    pickerImportSuccess: 'Added {count} Pokemon to box.',
    pickerImportNoValid: 'No valid Pokemon were found in pasted text.',
    detailExportPokepaste: 'Export Pokepaste',
    detailExportTitle: 'Pokepaste Export',
    detailExportCopy: 'Copy',
    detailExportCopied: 'Copied Pokepaste text.',
    pickerAbility: 'Select Ability',
    statusMoveError: 'Status move. Damage is 0.',
    noDamageError: 'Power is 0. Damage is 0.',
    invalidError: 'Please check your inputs.',
    notesPrefix: 'Modifiers:',
    megaEvolution: 'Mega Evolution',
    levitateImmunity: 'Levitate immunity',
    flashFireImmunity: 'Flash Fire immunity',
    waterImmunity: 'Water immunity',
    electricImmunity: 'Electric immunity',
    grassImmunity: 'Grass immunity',
    typeImmunity: 'Type immunity',
    recoilLabel: 'Recoil',
    recoveryLabel: 'Recovery',
    hitsLabel: 'Hits',
    randomLabel: 'Random (16)',
    neutralNature: 'Neutral',
    boxPartyTitle: 'Pokemon Champions Box / Party',
    boxPartySubtitle: 'Pokemon storage and party builder',
    toCalc: 'To Damage Calc',
    boxPartyLabel: 'Box / Party',
  },
};

const ITEM_NAME_JA_FALLBACK = {
  blackbelt: 'くろおび', blackglasses: 'くろいメガネ', charcoal: 'もくたん', choicescarf: 'こだわりスカーフ',
  dragonfang: 'りゅうのキバ', fairyfeather: 'せいれいプレート', focusband: 'きあいのハチマキ', focussash: 'きあいのタスキ',
  hardstone: 'かたいいし', kingsrock: 'おうじゃのしるし', leftovers: 'たべのこし', lightball: 'でんきだま',
  magnet: 'じしゃく', mentalherb: 'メンタルハーブ', metalcoat: 'メタルコート', miracleseed: 'きせきのタネ',
  mysticwater: 'しんぴのしずく', nevermeltice: 'とけないこおり', poisonbarb: 'どくバリ', quickclaw: 'せんせいのツメ',
  scopelens: 'ピントレンズ', sharpbeak: 'するどいくちばし', shellbell: 'かいがらのすず', silkscarf: 'シルクのスカーフ',
  silverpowder: 'ぎんのこな', sitrusberry: 'オボンのみ', softsand: 'やわらかいすな', spelltag: 'のろいのおふだ',
  twistedspoon: 'まがったスプーン', whiteherb: 'しろいハーブ',
  megastone: 'メガストーン', megastonex: 'メガストーンX', megastoney: 'メガストーンY', megastonez: 'メガストーンZ',
  chandelurite: 'シャンデラナイト',
  cahndelurite: 'シャンデラナイト',
};

const BASE_SPECIES_JA_FALLBACK = {
  Meloetta: 'メロエッタ', Vivillon: 'ビビヨン', Floette: 'フラエッテ', Gourgeist: 'パンプジン', Minior: 'メテノ',
  Mimikyu: 'ミミッキュ', Cramorant: 'ウッウ', Polteageist: 'ポットデス', Alcremie: 'マホイップ', Eiscue: 'コオリッポ',
  Morpeko: 'モルペコ', Maushold: 'イッカネズミ', Palafin: 'イルカマン', Sinistcha: 'ヤバソチャ', Ogerpon: 'オーガポン',
  Terapagos: 'テラパゴス',
};

const ABILITY_NAME_JA_FALLBACK = {
  flowerveil: 'フラワーベール',
  fairyaura: 'フェアリーオーラ',
};

const CALC_ITEMS = ['', 'focussash', 'choicescarf', 'leftovers', 'sitrusberry', 'focusband', 'quickclaw', 'scopelens', 'kingsrock', 'shellbell', 'mentalherb', 'whiteherb', 'blackbelt', 'blackglasses', 'charcoal', 'dragonfang', 'hardstone', 'lightball', 'magnet', 'metalcoat', 'miracleseed', 'mysticwater', 'nevermeltice', 'poisonbarb', 'sharpbeak', 'silkscarf', 'silverpowder', 'softsand', 'spelltag', 'twistedspoon', 'megastone', 'megastonex', 'megastoney', 'megastonez'];
const TYPE_BOOST_ITEMS = {
  blackbelt: 'Fighting',
  blackglasses: 'Dark',
  charcoal: 'Fire',
  dragonfang: 'Dragon',
  hardstone: 'Rock',
  magnet: 'Electric',
  metalcoat: 'Steel',
  miracleseed: 'Grass',
  mysticwater: 'Water',
  nevermeltice: 'Ice',
  poisonbarb: 'Poison',
  sharpbeak: 'Flying',
  silkscarf: 'Normal',
  silverpowder: 'Bug',
  softsand: 'Ground',
  spelltag: 'Ghost',
  twistedspoon: 'Psychic',
  fairyfeather: 'Fairy',
};

const NATURES = [
  { id: 'hardy', en: 'Hardy', ja: 'がんばりや', plus: null, minus: null }, { id: 'lonely', en: 'Lonely', ja: 'さみしがり', plus: 'atk', minus: 'def' },
  { id: 'adamant', en: 'Adamant', ja: 'いじっぱり', plus: 'atk', minus: 'spa' }, { id: 'naughty', en: 'Naughty', ja: 'やんちゃ', plus: 'atk', minus: 'spd' },
  { id: 'brave', en: 'Brave', ja: 'ゆうかん', plus: 'atk', minus: 'spe' }, { id: 'bold', en: 'Bold', ja: 'ずぶとい', plus: 'def', minus: 'atk' },
  { id: 'docile', en: 'Docile', ja: 'すなお', plus: null, minus: null }, { id: 'impish', en: 'Impish', ja: 'わんぱく', plus: 'def', minus: 'spa' },
  { id: 'lax', en: 'Lax', ja: 'のうてんき', plus: 'def', minus: 'spd' }, { id: 'relaxed', en: 'Relaxed', ja: 'のんき', plus: 'def', minus: 'spe' },
  { id: 'modest', en: 'Modest', ja: 'ひかえめ', plus: 'spa', minus: 'atk' }, { id: 'mild', en: 'Mild', ja: 'おっとり', plus: 'spa', minus: 'def' },
  { id: 'bashful', en: 'Bashful', ja: 'てれや', plus: null, minus: null }, { id: 'rash', en: 'Rash', ja: 'うっかりや', plus: 'spa', minus: 'spd' },
  { id: 'quiet', en: 'Quiet', ja: 'れいせい', plus: 'spa', minus: 'spe' }, { id: 'calm', en: 'Calm', ja: 'おだやか', plus: 'spd', minus: 'atk' },
  { id: 'gentle', en: 'Gentle', ja: 'おとなしい', plus: 'spd', minus: 'def' }, { id: 'careful', en: 'Careful', ja: 'しんちょう', plus: 'spd', minus: 'spa' },
  { id: 'quirky', en: 'Quirky', ja: 'きまぐれ', plus: null, minus: null }, { id: 'sassy', en: 'Sassy', ja: 'なまいき', plus: 'spd', minus: 'spe' },
  { id: 'timid', en: 'Timid', ja: 'おくびょう', plus: 'spe', minus: 'atk' }, { id: 'hasty', en: 'Hasty', ja: 'せっかち', plus: 'spe', minus: 'def' },
  { id: 'jolly', en: 'Jolly', ja: 'ようき', plus: 'spe', minus: 'spa' }, { id: 'naive', en: 'Naive', ja: 'むじゃき', plus: 'spe', minus: 'spd' },
  { id: 'serious', en: 'Serious', ja: 'まじめ', plus: null, minus: null },
];

const STAT_LABELS = { ja: { atk: '攻撃', def: '防御', spa: '特攻', spd: '特防', spe: '素早さ' }, en: { atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe' } };

const FORME_NAME_JA = {
  Alola: 'アローラ', Hisui: 'ヒスイ', Galar: 'ガラル', Paldea: 'パルデア', Pirouette: 'ステップ',
  Archipelago: 'ぐんとう', Continental: 'たいりく', Elegant: 'みやび', Fancy: 'ファンシー', Garden: 'ガーデン',
  HighPlains: 'こうや', IcySnow: 'ゆきぐに', Jungle: 'ジャングル', Marine: 'マリン', Modern: 'モダン',
  Monsoon: 'スコール', Ocean: 'オーシャン', Pokeball: 'モンスターボール', Polar: 'ひょうせつ', River: 'リバー',
  Sandstorm: 'サンドストーム', Savanna: 'サバンナ', Sun: 'たいよう', Tundra: 'ツンドラ',
  Eternal: 'えいえん', Large: 'おおきい', Small: 'ちいさい', Super: 'とくだい', Meteor: 'りゅうせい',
  Busted: 'ばれたすがた', Gorging: 'まるのみ', Gulping: 'まるのみ', Antique: 'しんさく',
  CaramelSwirl: 'キャラメルミックス', LemonCream: 'レモン', MatchaCream: 'まっちゃ', MintCream: 'ミント',
  RainbowSwirl: 'レインボーミックス', RubyCream: 'ルビー', RubySwirl: 'ルビーミックス',
  Noice: 'ナイスフェイス', Hangry: 'はらぺこもよう', Four: '4ひきかぞく', Hero: 'マイティ', Masterpiece: 'しんさく',
  CornerstoneTera: 'いしずえテラスタル', HearthflameTera: 'かまどテラスタル', TealTera: 'みどりテラスタル', WellspringTera: 'いどテラスタル', Terastal: 'テラスタル',
};

const STATIC_PICKER_FIELDS = {
  'attacker-species': { buttonId: 'attacker-species-button', titleKey: 'pickerSpecies' },
  'attacker-forme': { buttonId: 'attacker-forme-button', titleKey: 'pickerSpecies' },
  'defender-species': { buttonId: 'defender-species-button', titleKey: 'pickerSpecies' },
  'defender-forme': { buttonId: 'defender-forme-button', titleKey: 'pickerSpecies' },
  'move-select': { buttonId: 'move-button', titleKey: 'pickerMove' },
  'move-type': { buttonId: 'move-type-button', titleKey: 'type' },
  'move-category': { buttonId: 'move-category-button', titleKey: 'category' },
  'attacker-nature': { buttonId: 'attacker-nature-button', titleKey: 'pickerNature' },
  'defender-nature': { buttonId: 'defender-nature-button', titleKey: 'pickerNature' },
  'attacker-item': { buttonId: 'attacker-item-button', titleKey: 'pickerItem' },
  'defender-item': { buttonId: 'defender-item-button', titleKey: 'pickerItem' },
  'attacker-ability': { buttonId: 'attacker-ability-button', titleKey: 'pickerAbility' },
  'defender-ability': { buttonId: 'defender-ability-button', titleKey: 'pickerAbility' },
  'detail-species': { buttonId: 'detail-species-button', titleKey: 'pickerSpecies' },
  'detail-forme': { buttonId: 'detail-forme-button', titleKey: 'pickerSpecies' },
  'detail-nature': { buttonId: 'detail-nature-button', titleKey: 'pickerNature' },
  'detail-item': { buttonId: 'detail-item-button', titleKey: 'pickerItem' },
  'detail-ability': { buttonId: 'detail-ability-button', titleKey: 'pickerAbility' },
};

const STORAGE_KEY = 'champions-damage-calc-box-party-v1';
const LANG_STORAGE_KEY = 'champions-tool-ui-lang-v1';
const PENDING_APPLY_KEY = 'champions-damage-calc-pending-apply-v1';
const OPEN_DETAIL_REQUEST_KEY = 'champions-open-detail-request-v1';
const SPEED_ADJUST_REQUEST_KEY = 'champions-speed-adjust-request-v1';
const SPEED_ADJUST_ROW_CACHE_KEY = 'champions-speed-adjust-row-cache-v1';
const LAST_SELECTED_SIDES_KEY = 'champions-calc-last-selected-sides-v1';
const DOUBLE_BATTLE_MODE_KEY = 'champions-tool-ui-double-battle-v1';
const MAX_CALC_HISTORY = 10;
const PARTY_SLOT_COUNT = 6;
const DETAIL_EV_TOTAL_MAX = 66;
const CHAMPIONS_IV_TOTAL_MAX = 186;
const NATURE_MODIFIER_STATS = ['atk', 'def', 'spa', 'spd', 'spe'];
const SIDE_PRESETS = {
  all: [
    { label: 'ようき A S+', nature: 'jolly', evs: { hp: 0, atk: 32, def: 0, spa: 0, spd: 0, spe: 32 } },
    { label: 'いじっぱり A+ S', nature: 'adamant', evs: { hp: 0, atk: 32, def: 0, spa: 0, spd: 0, spe: 32 } },
    { label: 'いじっぱり H A+', nature: 'adamant', evs: { hp: 32, atk: 32, def: 0, spa: 0, spd: 0, spe: 0 } },
    { label: 'ようき H S+', nature: 'jolly', evs: { hp: 32, atk: 0, def: 0, spa: 0, spd: 0, spe: 32 } },
    { label: 'おくびょう C S+', nature: 'timid', evs: { hp: 0, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 } },
    { label: 'ひかえめ C+ S', nature: 'modest', evs: { hp: 0, atk: 0, def: 0, spa: 32, spd: 0, spe: 32 } },
    { label: 'ひかえめ H C+', nature: 'modest', evs: { hp: 32, atk: 0, def: 0, spa: 32, spd: 0, spe: 0 } },
    { label: 'おくびょう H S+', nature: 'timid', evs: { hp: 32, atk: 0, def: 0, spa: 0, spd: 0, spe: 32 } },
    { label: 'ずぶとい H B+', nature: 'bold', evs: { hp: 32, atk: 0, def: 32, spa: 0, spd: 0, spe: 0 } },
    { label: 'わんぱく H B+', nature: 'impish', evs: { hp: 32, atk: 0, def: 32, spa: 0, spd: 0, spe: 0 } },
    { label: 'おだやか H D+', nature: 'calm', evs: { hp: 32, atk: 0, def: 0, spa: 0, spd: 32, spe: 0 } },
    { label: 'しんちょう H D+', nature: 'careful', evs: { hp: 32, atk: 0, def: 0, spa: 0, spd: 32, spe: 0 } },
    { label: 'のんき H B+ D', nature: 'relaxed', evs: { hp: 32, atk: 0, def: 32, spa: 0, spd: 32, spe: 0 } },
    { label: 'なまいき H D+ B', nature: 'sassy', evs: { hp: 32, atk: 0, def: 32, spa: 0, spd: 32, spe: 0 } },
    { label: 'ひかえめ H C+ D', nature: 'modest', evs: { hp: 32, atk: 0, def: 0, spa: 32, spd: 32, spe: 0 } },
    { label: 'いじっぱり H A+ B', nature: 'adamant', evs: { hp: 32, atk: 32, def: 32, spa: 0, spd: 0, spe: 0 } },
  ],
};

const state = {
  lang: 'ja',
  data: null,
  speciesById: new Map(),
  speciesNameJaById: new Map(),
  displaySpecies: [],
  mergedSpeciesAlias: new Map(),
  baseSpeciesJaByName: new Map(),
  movesById: new Map(),
  moveNameJaById: new Map(),
  moveByNum: new Map(),
  abilitiesById: new Map(),
  abilityByNum: new Map(),
  abilityNameJaById: new Map(),
  itemNameJaById: new Map(),
  itemsById: new Map(),
  typeEffectiveness: {},
  megaMap: {},
  pickerOptions: {},
  dynamicPickerMeta: {},
  picker: { currentField: '', modal: null, source: 'list', sideContext: null, partySlotTarget: null },
  pickerImport: { modal: null },
  preset: { modal: null, side: 'attacker' },
  detail: { modal: null, editingPokemonId: null },
  detailExport: { modal: null },
  confirmSave: { modal: null, role: null },
  storage: { box: [], parties: [], calcLinks: { attacker: null, defender: null } },
  availableFormats: ['[Gen 9 Champions] VGC 2026 Reg M-A'],
  learnsetBySpeciesId: new Map(),
  learnsetBySpeciesNum: new Map(),
  longPressTimer: null,
  suppressClickId: null,
  mobileSwipeAnimTimer: null,
};

const MOBILE_BATTLE_TAB_ORDER = ['result', 'attacker', 'defender', 'settings'];

const $ = id => document.getElementById(id);
const t = (key, vars = {}) => {
  let text = I18N[state.lang][key] || key;
  Object.entries(vars).forEach(([name, value]) => {
    text = text.replace(`{${name}}`, String(value));
  });
  return text;
};
const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const toNumber = (value, fallback = 0) => Number.isFinite(Number(value)) ? Number(value) : fallback;
const toId = text => String(text || '').toLowerCase().replace(/[^a-z0-9]/g, '');
const toHiragana = text => String(text || '').replace(/[\u30A1-\u30F6]/g, char => String.fromCharCode(char.charCodeAt(0) - 0x60));
const normalizeSearchText = text => toHiragana(String(text || '').normalize('NFKC').toLowerCase());
const getNatureById = id => NATURES.find(nature => nature.id === id) || NATURES[0];
const natureMod = (nature, statName) => nature.plus === statName ? 1.1 : (nature.minus === statName ? 0.9 : 1);
const normalizeBaseJaName = name => String(name || '').replace(/\(原種\)$/u, '');
const normalizeFormeKey = forme => String(forme || '').replace(/[^A-Za-z]/g, '');
const translateFormeJa = forme => FORME_NAME_JA[normalizeFormeKey(forme)] || forme;
const clone = value => JSON.parse(JSON.stringify(value));

function generateId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function hasCalcPage() {
  return Boolean($('move-select') && $('result-main'));
}

function hasManagerPage() {
  return Boolean($('box-list'));
}

function isDetailEmbedMode() {
  if (!hasManagerPage()) return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('embed') === 'detail';
}

function isDetailStandaloneMode() {
  if (!hasManagerPage()) return false;
  const params = new URLSearchParams(window.location.search);
  return params.get('detail') === 'standalone';
}

function getStandaloneReturnPath() {
  const params = new URLSearchParams(window.location.search);
  const fallback = './speed-adjust.html';
  const raw = params.get('returnPath');
  if (!raw) return fallback;
  try {
    const decoded = decodeURIComponent(raw);
    return decoded.startsWith('/') ? decoded : fallback;
  } catch (_error) {
    return fallback;
  }
}

function setupDetailEmbedLayout() {
  if (!isDetailEmbedMode()) return;
  document.body.classList.add('embed-detail-mode');
  document.querySelector('header.calc-header')?.classList.add('d-none');
  document.querySelector('main')?.classList.add('d-none');
  document.getElementById('tool-footer')?.classList.add('d-none');

  if (!document.getElementById('embed-detail-inline-style')) {
    const style = document.createElement('style');
    style.id = 'embed-detail-inline-style';
    style.textContent = `
      body.embed-detail-mode { background: transparent !important; margin: 0; }
      body.embed-detail-mode .modal-backdrop { display: none !important; }
      body.embed-detail-mode #pokemon-detail-modal {
        display: block !important;
        position: fixed;
        inset: 0;
        background: transparent;
      }
      body.embed-detail-mode #pokemon-detail-modal .modal-dialog {
        margin: 0.8rem auto;
        max-width: min(1080px, 96vw);
      }
      body.embed-detail-mode #pokemon-detail-modal .modal-content {
        border: 1px solid #dbe3ed;
        border-radius: 12px;
        overflow: hidden;
      }
      @media (max-width: 767.98px) {
        body.embed-detail-mode #pokemon-detail-modal .modal-dialog {
          margin: 0;
          max-width: 100vw;
          height: 100vh;
        }
        body.embed-detail-mode #pokemon-detail-modal .modal-content {
          height: 100vh;
          border-radius: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

function setupDetailStandaloneLayout() {
  if (!isDetailStandaloneMode()) return;
  document.body.classList.add('detail-standalone-mode');
  document.querySelector('header.calc-header')?.classList.add('d-none');
  document.querySelector('main')?.classList.add('d-none');
  document.getElementById('tool-footer')?.classList.add('d-none');
  if (document.getElementById('detail-standalone-inline-style')) return;
  const style = document.createElement('style');
  style.id = 'detail-standalone-inline-style';
  style.textContent = `
    body.detail-standalone-mode { background: #ffffff; }
    body.detail-standalone-mode #pokemon-detail-modal {
      display: block !important;
      position: fixed;
      inset: 0;
      background: #f8fafc;
    }
    body.detail-standalone-mode #pokemon-detail-modal .modal-dialog {
      margin: 0.9rem auto;
      max-width: min(1120px, 98vw);
    }
    @media (max-width: 767.98px) {
      body.detail-standalone-mode #pokemon-detail-modal .modal-dialog {
        margin: 0;
        max-width: 100vw;
        height: 100vh;
      }
      body.detail-standalone-mode #pokemon-detail-modal .modal-content {
        height: 100vh;
        border-radius: 0;
      }
    }
  `;
  document.head.appendChild(style);
}

function ensureDetailDialogStyles() {
  // Keep dialog visuals in static CSS/Bootstrap classes only.
}

function populateDetailEvSelectOptions() {
  ['hp', 'atk', 'def', 'spa', 'spd', 'spe'].forEach(stat => {
    const select = $(`detail-ev-${stat}`);
    if (!select || select.tagName !== 'SELECT' || select.options.length) return;
    for (let i = 0; i <= 32; i += 1) {
      const option = document.createElement('option');
      option.value = String(i);
      option.textContent = String(i);
      select.appendChild(option);
    }
  });
}

function populateCalcStatSelectOptions() {
  const evIds = [
    'attacker-ev-hp', 'attacker-ev-atk', 'attacker-ev-def', 'attacker-ev-spa', 'attacker-ev-spd', 'attacker-ev-spe',
    'defender-ev-hp', 'defender-ev-atk', 'defender-ev-def', 'defender-ev-spa', 'defender-ev-spd', 'defender-ev-spe',
  ];
  evIds.forEach(id => {
    const select = $(id);
    if (!select || select.tagName !== 'SELECT' || select.options.length) return;
    for (let i = 0; i <= 32; i += 1) {
      const option = document.createElement('option');
      option.value = String(i);
      option.textContent = String(i);
      select.appendChild(option);
    }
  });

  const rankIds = [
    'attacker-rank-atk', 'attacker-rank-def', 'attacker-rank-spa', 'attacker-rank-spd', 'attacker-rank-spe',
    'defender-rank-atk', 'defender-rank-def', 'defender-rank-spa', 'defender-rank-spd', 'defender-rank-spe',
  ];
  rankIds.forEach(id => {
    const select = $(id);
    if (!select || select.tagName !== 'SELECT' || select.options.length) return;
    for (let i = -6; i <= 6; i += 1) {
      const option = document.createElement('option');
      option.value = String(i);
      option.textContent = i > 0 ? `+${i}` : String(i);
      select.appendChild(option);
    }
  });
}

function getCurrentMobileBattleTab() {
  if (document.body.classList.contains('mobile-panel-attacker')) return 'attacker';
  if (document.body.classList.contains('mobile-panel-defender')) return 'defender';
  if (document.body.classList.contains('mobile-panel-result')) return 'result';
  return 'settings';
}

function getMobileTabDirection(fromTab, toTab) {
  const fromIndex = MOBILE_BATTLE_TAB_ORDER.indexOf(fromTab);
  const toIndex = MOBILE_BATTLE_TAB_ORDER.indexOf(toTab);
  if (fromIndex < 0 || toIndex < 0 || fromIndex === toIndex) return '';
  return toIndex > fromIndex ? 'forward' : 'backward';
}

function setMobileBattleTab(tab, options = {}) {
  const normalized = ['result', 'attacker', 'defender', 'settings'].includes(tab) ? tab : 'settings';
  const current = getCurrentMobileBattleTab();
  const direction = options.direction || getMobileTabDirection(current, normalized);
  const shouldAnimate = options.animate !== false
    && window.matchMedia('(max-width: 991.98px)').matches
    && current !== normalized
    && Boolean(direction);
  document.body.classList.toggle('mobile-panel-attacker', normalized === 'attacker');
  document.body.classList.toggle('mobile-panel-settings', normalized === 'settings');
  document.body.classList.toggle('mobile-panel-defender', normalized === 'defender');
  document.body.classList.toggle('mobile-panel-result', normalized === 'result');
  document.body.classList.remove('mobile-swipe-forward', 'mobile-swipe-backward');
  if (shouldAnimate) {
    document.body.classList.add(direction === 'backward' ? 'mobile-swipe-backward' : 'mobile-swipe-forward');
    if (state.mobileSwipeAnimTimer) window.clearTimeout(state.mobileSwipeAnimTimer);
    state.mobileSwipeAnimTimer = window.setTimeout(() => {
      document.body.classList.remove('mobile-swipe-forward', 'mobile-swipe-backward');
      state.mobileSwipeAnimTimer = null;
    }, 280);
  }
  const attackerButton = $('mobile-battle-tab-attacker');
  const settingsButton = $('mobile-battle-tab-settings');
  const defenderButton = $('mobile-battle-tab-defender');
  const resultButton = $('mobile-battle-tab-result');
  if (attackerButton) {
    const active = normalized === 'attacker';
    attackerButton.classList.toggle('active', active);
    attackerButton.setAttribute('aria-selected', String(active));
  }
  if (settingsButton) {
    const active = normalized === 'settings';
    settingsButton.classList.toggle('active', active);
    settingsButton.setAttribute('aria-selected', String(active));
  }
  if (defenderButton) {
    const active = normalized === 'defender';
    defenderButton.classList.toggle('active', active);
    defenderButton.setAttribute('aria-selected', String(active));
  }
  if (resultButton) {
    const active = normalized === 'result';
    resultButton.classList.toggle('active', active);
    resultButton.setAttribute('aria-selected', String(active));
  }
}

function initMobileBattleTabs() {
  const root = $('mobile-battle-tabs');
  if (!root) return;
  const attackerButton = $('mobile-battle-tab-attacker');
  const settingsButton = $('mobile-battle-tab-settings');
  const defenderButton = $('mobile-battle-tab-defender');
  const resultButton = $('mobile-battle-tab-result');
  if (attackerButton) attackerButton.addEventListener('click', () => setMobileBattleTab('attacker'));
  if (settingsButton) settingsButton.addEventListener('click', () => setMobileBattleTab('settings'));
  if (defenderButton) defenderButton.addEventListener('click', () => setMobileBattleTab('defender'));
  if (resultButton) resultButton.addEventListener('click', () => setMobileBattleTab('result'));

  const swipeHost = document.body;
  if (swipeHost) {
    let startX = 0;
    let startY = 0;
    let canSwipe = false;
    const isModalVisible = () => Boolean(document.querySelector('.modal.show'));
    const isSwipeBlockedTarget = target => {
      if (!(target instanceof Element)) return false;
      return Boolean(target.closest('input, textarea, select, button, a, [contenteditable="true"], .modal, .offcanvas, .dropdown-menu'));
    };
    swipeHost.addEventListener('touchstart', event => {
      if (!window.matchMedia('(max-width: 991.98px)').matches) {
        canSwipe = false;
        return;
      }
      if (isModalVisible() || isSwipeBlockedTarget(event.target)) {
        canSwipe = false;
        return;
      }
      const touch = event.changedTouches?.[0];
      if (!touch) {
        canSwipe = false;
        return;
      }
      startX = touch.clientX;
      startY = touch.clientY;
      canSwipe = true;
    }, { passive: true });
    swipeHost.addEventListener('touchend', event => {
      if (!canSwipe || !window.matchMedia('(max-width: 991.98px)').matches) return;
      const touch = event.changedTouches?.[0];
      if (!touch) return;
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;
      if (Math.abs(dx) < 56 || Math.abs(dx) <= Math.abs(dy) * 1.2) return;
      const current = getCurrentMobileBattleTab();
      const index = MOBILE_BATTLE_TAB_ORDER.indexOf(current);
      if (index < 0) return;
      if (dx < 0 && index < MOBILE_BATTLE_TAB_ORDER.length - 1) {
        setMobileBattleTab(MOBILE_BATTLE_TAB_ORDER[index + 1], { direction: 'forward' });
      }
      if (dx > 0 && index > 0) {
        setMobileBattleTab(MOBILE_BATTLE_TAB_ORDER[index - 1], { direction: 'backward' });
      }
    }, { passive: true });
    swipeHost.addEventListener('touchcancel', () => {
      canSwipe = false;
    }, { passive: true });
  }

  const mediaQuery = window.matchMedia('(max-width: 991.98px)');
  const handleViewport = event => {
    if (event.matches) {
      setMobileBattleTab('result', { animate: false });
    } else {
      document.body.classList.remove('mobile-panel-attacker', 'mobile-panel-settings', 'mobile-panel-defender', 'mobile-panel-result');
      document.body.classList.remove('mobile-swipe-forward', 'mobile-swipe-backward');
    }
  };
  if (typeof mediaQuery.addEventListener === 'function') mediaQuery.addEventListener('change', handleViewport);
  else if (typeof mediaQuery.addListener === 'function') mediaQuery.addListener(handleViewport);
  handleViewport(mediaQuery);
}

function getSideNatureOverridesFromButtons(side) {
  const plusStats = [];
  const minusStats = [];
  document.querySelectorAll(`.stat-mod-cycle-btn[data-side="${side}"]`).forEach(button => {
    const stat = button.dataset.stat;
    const stateValue = button.dataset.state || 'neutral';
    if (!stat || stat === 'hp') return;
    if (stateValue === 'plus') plusStats.push(stat);
    if (stateValue === 'minus') minusStats.push(stat);
  });
  return { plusStats, minusStats };
}

function getNatureMultiplierWithOverrides(nature, statName, plusStats = [], minusStats = []) {
  if (plusStats.includes(statName)) return 1.1;
  if (minusStats.includes(statName)) return 0.9;
  return natureMod(nature, statName);
}

function loadLanguagePreference() {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    if (saved === 'ja' || saved === 'en') state.lang = saved;
  } catch (_error) {
    // ignore storage errors
  }
}

function persistLanguagePreference() {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, state.lang);
  } catch (_error) {
    // ignore storage errors
  }
}

function readDoubleBattleModeEnabled() {
  try {
    const value = localStorage.getItem(DOUBLE_BATTLE_MODE_KEY);
    if (value === '0' || value === 'false') return false;
    if (value === '1' || value === 'true') return true;
  } catch (_error) {
    // ignore storage errors
  }
  return true;
}

function currentFormatLabel() {
  return state.data?.meta?.format || state.availableFormats[0] || '[Gen 9 Champions] VGC 2026 Reg M-A';
}

function normalizePartyRegulation(regulation) {
  if (state.availableFormats.includes(regulation)) return regulation;
  const legacyLabels = new Set(['A', 'B', 'C', 'D', 'E', 'F', 'Homeのみ', '藍の円盤', 'キタカミ図鑑', 'トリックマジック', '竜王戦', 'ブルーベリー学園']);
  if (legacyLabels.has(String(regulation || '').trim())) return currentFormatLabel();
  return regulation || currentFormatLabel();
}

function formatRegulationShortLabel(regulation) {
  const text = String(regulation || '').trim();
  const match = text.match(/(Reg\s*[A-Za-z0-9-]+)/i);
  if (!match) return text;
  return match[1].replace(/\s+/g, ' ');
}

function getPickerMeta(fieldId) {
  return STATIC_PICKER_FIELDS[fieldId] || state.dynamicPickerMeta[fieldId] || null;
}

function getStageMultiplier(stage) {
  const clamped = clamp(toNumber(stage), -6, 6);
  return clamped >= 0 ? (2 + clamped) / 2 : 2 / (2 - clamped);
}

function applyStageToStat(stat, stage) {
  return Math.max(1, Math.floor(stat * getStageMultiplier(stage)));
}

function emptyPokemonRecord() {
  return {
    id: generateId('box'),
    speciesId: 'fluttermane',
    nickname: '',
    nature: 'hardy',
    megaEnabled: false,
    abilityId: '',
    itemId: '',
    evs: { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    ranks: { atk: 0, def: 0, spa: 0, spd: 0, spe: 0 },
    ivTotal: CHAMPIONS_IV_TOTAL_MAX,
    notes: '',
    moveIds: [],
    calcHistory: [],
  };
}

function createEmptyParty() {
  return {
    id: generateId('party'),
    name: `パーティ${state.storage.parties.length + 1}`,
    slots: Array(PARTY_SLOT_COUNT).fill(null),
  };
}

function normalizePokemonRecord(record) {
  const base = emptyPokemonRecord();
  const next = { ...base, ...record };
  next.evs = { ...base.evs, ...(record?.evs || {}) };
  next.ranks = { ...base.ranks, ...(record?.ranks || {}) };
  next.moveIds = Array.isArray(record?.moveIds) ? record.moveIds.filter(Boolean).slice(0, 4) : [];
  next.calcHistory = Array.isArray(record?.calcHistory) ? record.calcHistory.slice(-MAX_CALC_HISTORY) : [];

  const normalizedSpeciesId = normalizeSelectedSpeciesId(next.speciesId);
  const megaBaseId = resolveMegaBaseId(normalizedSpeciesId);
  if (megaBaseId && normalizedSpeciesId !== megaBaseId) {
    next.speciesId = megaBaseId;
    next.megaEnabled = true;
    if (!next.itemId || isGenericMegaStone(next.itemId)) {
      next.itemId = getPreferredMegaItemId(megaBaseId, next.itemId || '');
    }
  } else {
    next.speciesId = normalizedSpeciesId;
  }
  if (next.megaEnabled && hasMega(next.speciesId) && !next.itemId) {
    next.itemId = getPreferredMegaItemId(next.speciesId, '');
  }
  if (next.megaEnabled && !hasMega(next.speciesId)) next.megaEnabled = false;
  return next;
}

function normalizePartyRecord(party) {
  const base = createEmptyParty();
  return {
    ...base,
    ...party,
    slots: Array.from({ length: PARTY_SLOT_COUNT }, (_, index) => Array.isArray(party?.slots) ? (party.slots[index] || null) : null),
  };
}

function loadStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      state.storage = { box: [], parties: [createEmptyParty()], calcLinks: { attacker: null, defender: null } };
      return;
    }
    const parsed = JSON.parse(raw);
    state.storage = {
      box: Array.isArray(parsed.box) ? parsed.box.map(normalizePokemonRecord) : [],
      parties: Array.isArray(parsed.parties) && parsed.parties.length ? parsed.parties.map(normalizePartyRecord) : [createEmptyParty()],
      calcLinks: { attacker: parsed?.calcLinks?.attacker || null, defender: parsed?.calcLinks?.defender || null },
    };
  } catch (_error) {
    state.storage = { box: [], parties: [createEmptyParty()], calcLinks: { attacker: null, defender: null } };
  }
}

function saveStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.storage));
}

function loadLastSelectedSides() {
  try {
    const parsed = JSON.parse(localStorage.getItem(LAST_SELECTED_SIDES_KEY) || 'null');
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch (_error) {
    return null;
  }
}

function saveLastSelectedSides() {
  if (!hasCalcPage() || !$('attacker-species') || !$('defender-species')) return;
  const payload = {
    attackerSpeciesId: $('attacker-species').value || '',
    attackerNature: $('attacker-nature')?.value || '',
    attackerAbilityId: $('attacker-ability')?.value || '',
    attackerItemId: $('attacker-item')?.value || '',
    attackerMegaEnabled: Boolean($('attacker-mega-enabled')?.checked),
    defenderSpeciesId: $('defender-species').value || '',
    defenderNature: $('defender-nature')?.value || '',
    defenderAbilityId: $('defender-ability')?.value || '',
    defenderItemId: $('defender-item')?.value || '',
    defenderMegaEnabled: Boolean($('defender-mega-enabled')?.checked),
    moveId: $('move-select')?.value || '',
    moveType: $('move-type')?.value || '',
    moveCategory: $('move-category')?.value || '',
    movePower: clamp(toNumber($('move-power')?.value, 80), 0, 400),
    moveParamValue: clamp(toNumber($('move-parameter-value')?.value, 0), 0, 99),
    weather: getActiveToggleValue('weather'),
    terrain: getActiveToggleValue('terrain'),
    isCrit: Boolean($('is-crit')?.checked),
    isBurn: Boolean($('is-burn')?.checked),
    isSpread: Boolean($('is-spread')?.checked),
    isHelpingHand: Boolean($('is-helping-hand')?.checked),
    reflect: Boolean($('reflect')?.checked),
    lightScreen: Boolean($('light-screen')?.checked),
    defenderFullHp: Boolean($('defender-full-hp')?.checked),
    isFriendGuard: Boolean($('is-friend-guard')?.checked),
    hitCount: clamp(toNumber($('hit-count')?.value, 1), 1, 10),
  };
  localStorage.setItem(LAST_SELECTED_SIDES_KEY, JSON.stringify(payload));
}

function getPokemonById(pokemonId) {
  return state.storage.box.find(pokemon => pokemon.id === pokemonId) || null;
}

function getPartyById(partyId) {
  return state.storage.parties.find(party => party.id === partyId) || null;
}

function resolveAbilitySpeciesId(speciesId, megaEnabled, itemId = '') {
  return resolveEffectiveSpeciesId(speciesId, megaEnabled, itemId);
}

function displaySpeciesName(species) {
  if (!species) return '';
  if (state.lang === 'ja') {
    if (state.speciesNameJaById.has(species.id)) return state.speciesNameJaById.get(species.id);
    if (species.nameJa) return species.nameJa;
    const baseId = toId(species.baseSpecies || '');
    const baseJa = state.speciesNameJaById.get(baseId)
      || state.baseSpeciesJaByName.get(species.baseSpecies)
      || BASE_SPECIES_JA_FALLBACK[species.baseSpecies]
      || species.baseSpecies
      || species.name;
    if (typeof species.name === 'string' && species.name.endsWith('-Mega-X')) return `メガ${baseJa}X`;
    if (typeof species.name === 'string' && species.name.endsWith('-Mega-Y')) return `メガ${baseJa}Y`;
    if (typeof species.name === 'string' && species.name.endsWith('-Mega-Z')) return `メガ${baseJa}Z`;
    if (typeof species.name === 'string' && species.name.includes('-Mega')) return `メガ${baseJa}`;
    if (species.forme) return `${baseJa}(${translateFormeJa(species.forme)})`;
    return baseJa;
  }
  return species.name;
}

function displayEntryName(entry) {
  if (!entry) return '';
  if (entry.baseStats) return displaySpeciesName(entry);
  if (state.lang === 'ja' && entry.rating != null && entry.id && state.abilityNameJaById.has(entry.id)) return state.abilityNameJaById.get(entry.id);
  if (state.lang === 'ja' && entry.rating != null && entry.id && ABILITY_NAME_JA_FALLBACK[entry.id]) return ABILITY_NAME_JA_FALLBACK[entry.id];
  if (state.lang === 'ja' && entry.id && state.moveNameJaById.has(entry.id)) return state.moveNameJaById.get(entry.id);
  if (state.lang === 'ja' && entry.nameJa) return entry.nameJa;
  return entry.name;
}

function displayItemName(item) {
  const getMegaStoneFallbackJa = currentItem => {
    if (!currentItem?.megaStone) return '';
    const megaStoneValue = typeof currentItem.megaStone === 'string'
      ? currentItem.megaStone
      : Object.values(currentItem.megaStone || {})[0];
    const megaId = toId(megaStoneValue || '');
    if (!megaId) return '';
    const baseId = megaId.replace(/mega[xyz]?$/, '');
    const baseSpecies = state.speciesById.get(baseId);
    const baseName = baseSpecies ? displaySpeciesName(baseSpecies) : '';
    if (!baseName) return '';
    const suffix = megaId.endsWith('megax') ? 'Ｘ' : (megaId.endsWith('megay') ? 'Ｙ' : (megaId.endsWith('megaz') ? 'Ｚ' : ''));
    return `${baseName}ナイト${suffix}`;
  };
  return state.lang === 'ja'
    ? (state.itemNameJaById.get(item.id) || ITEM_NAME_JA_FALLBACK[item.id] || getMegaStoneFallbackJa(item) || item.nameJa || item.name)
    : item.name;
}

function isGenericMegaStone(itemId) {
  return itemId === 'megastone' || itemId === 'megastonex' || itemId === 'megastoney' || itemId === 'megastonez';
}

function isMegaStoneItem(itemId) {
  if (!itemId) return false;
  if (isGenericMegaStone(itemId)) return true;
  return Boolean(state.itemsById.get(itemId)?.megaStone);
}

function getMegaStoneType(itemId) {
  if (itemId === 'megastonex') return 'x';
  if (itemId === 'megastoney') return 'y';
  if (itemId === 'megastonez') return 'z';
  const item = state.itemsById.get(itemId);
  const megaStoneValue = typeof item?.megaStone === 'string'
    ? item.megaStone
    : Object.values(item?.megaStone || {})[0];
  const megaId = toId(megaStoneValue || '');
  if (megaId.endsWith('megax')) return 'x';
  if (megaId.endsWith('megay')) return 'y';
  if (megaId.endsWith('megaz')) return 'z';
  const normalizedItemId = toId(itemId || '');
  if (normalizedItemId.endsWith('x')) return 'x';
  if (normalizedItemId.endsWith('y')) return 'y';
  if (normalizedItemId.endsWith('z')) return 'z';
  return 'normal';
}

function getPreferredMegaItemId(speciesId, currentItemId = '') {
  const directSpeciesId = toId(speciesId || '');
  const baseId = resolveMegaBaseId(speciesId);
  if (baseId) {
    const directForm = getMegaForms(baseId).find(form => toId(form.id) === directSpeciesId);
    if (directForm?.requiredItemId) return directForm.requiredItemId;
  }
  const megaForm = getMegaFormForSpecies(speciesId, currentItemId || '');
  if (megaForm?.requiredItemId) return megaForm.requiredItemId;
  if (currentItemId && state.itemsById.has(currentItemId)) return currentItemId;
  return '';
}

function getMegaForms(baseSpeciesId) {
  const megaMeta = state.megaMap[baseSpeciesId];
  if (!megaMeta) return [];
  if (Array.isArray(megaMeta.forms)) {
    return megaMeta.forms.map(form => ({
      ...form,
      stoneType: inferMegaStoneType(form),
    }));
  }
  if (megaMeta.id) return [{ id: megaMeta.id, stoneType: inferMegaStoneType({ id: megaMeta.id }) }];
  return [];
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

function getMegaFormForSpecies(speciesId, itemId = 'megastone') {
  const baseId = resolveMegaBaseId(speciesId);
  if (!baseId) return null;
  const forms = getMegaForms(baseId);
  if (!forms.length) return null;
  const directSpeciesId = toId(speciesId || '');
  const directForm = forms.find(form => toId(form.id) === directSpeciesId);
  const preferredType = getMegaStoneType(itemId);
  const exact = forms.find(form => form.stoneType === preferredType);
  if (exact) return exact;
  if (directForm) return directForm;
  const normal = forms.find(form => form.stoneType === 'normal');
  if (normal) return normal;
  return forms[0];
}

function resolveEffectiveSpeciesId(speciesId, megaEnabled, itemId = '') {
  if (!megaEnabled) return speciesId;
  const megaForm = getMegaFormForSpecies(speciesId, itemId);
  return megaForm?.id || speciesId;
}

function displayPokemonName(record) {
  const species = state.speciesById.get(record.speciesId);
  const speciesName = displaySpeciesName(species);
  return record.nickname ? `${record.nickname} (${speciesName})` : speciesName;
}

function getShowdownPokemonIconUrl(speciesId, megaEnabled = false, itemId = '') {
  const selectedId = normalizeSelectedSpeciesId(speciesId);
  const effectiveId = resolveEffectiveSpeciesId(selectedId, megaEnabled, itemId);
  const species = state.speciesById.get(effectiveId) || state.speciesById.get(selectedId);
  if (!species) return '';
  return `https://play.pokemonshowdown.com/sprites/gen5/${species.spriteId || species.id}.png`;
}

function getMoveTypeIconUrl(typeName) {
  if (!typeName) return '';
  return `https://play.pokemonshowdown.com/sprites/types/${typeName}.png`;
}

function getMoveCategoryIconUrl(category) {
  if (!category) return '';
  return `https://play.pokemonshowdown.com/sprites/categories/${category}.png`;
}

function renderGenericMegaStoneIcon(stoneType = 'normal') {
  const label = stoneType === 'x' ? 'X' : (stoneType === 'y' ? 'Y' : (stoneType === 'z' ? 'Z' : 'M'));
  return `<span class="ps-item-icon generic-mega-stone-icon" data-stone-type="${stoneType}" aria-label="Mega stone ${label}">${label}</span>`;
}

function getShowdownItemIconPosition(itemId) {
  const item = state.itemsById.get(itemId);
  if (!item) return null;
  const iconNumRaw = Number.isFinite(Number(item.spritenum)) ? Number(item.spritenum) : Number(item.num);
  if (!Number.isFinite(iconNumRaw)) return null;
  const iconNum = iconNumRaw;
  const x = (iconNum % 16) * 24;
  const y = Math.floor(iconNum / 16) * 24;
  return { x, y };
}

function renderItemVisual(itemId) {
  if (isGenericMegaStone(itemId)) return renderGenericMegaStoneIcon(getMegaStoneType(itemId));
  const pos = getShowdownItemIconPosition(itemId);
  if (!pos) return '';
  return `<span class="ps-item-icon" style="background-position:-${pos.x}px -${pos.y}px"></span>`;
}

function renderPokemonIconStack(speciesId, megaEnabled, itemId, alt = '') {
  const pokemonIconUrl = getShowdownPokemonIconUrl(speciesId, megaEnabled, itemId);
  const itemVisual = itemId ? renderItemVisual(itemId) : '';
  return `<span class="pokemon-icon-stack">${pokemonIconUrl ? `<img class="ps-pokemon-icon" src="${pokemonIconUrl}" alt="${alt}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling&&this.nextElementSibling.classList.remove('d-none');">` : ''}<span class="pokemon-icon-fallback${pokemonIconUrl ? ' d-none' : ''}" aria-hidden="true">?</span>${itemVisual}</span>`;
}

function renderPartyPickerIcons(speciesId, megaEnabled, itemId, alt = '') {
  const pokemonIconUrl = getShowdownPokemonIconUrl(speciesId, megaEnabled, itemId);
  const itemVisual = itemId ? renderItemVisual(itemId) : '';
  return `<span class="picker-party-icons">${pokemonIconUrl ? `<img class="ps-pokemon-icon" src="${pokemonIconUrl}" alt="${alt}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling&&this.nextElementSibling.classList.remove('d-none');">` : ''}<span class="pokemon-icon-fallback${pokemonIconUrl ? ' d-none' : ''}" aria-hidden="true">?</span>${itemVisual ? `<span class="picker-party-item-icon">${itemVisual}</span>` : ''}</span>`;
}

function renderBoxPickerIcons(speciesId, megaEnabled, itemId, alt = '') {
  const pokemonIconUrl = getShowdownPokemonIconUrl(speciesId, megaEnabled, itemId);
  const itemVisual = itemId ? renderItemVisual(itemId) : '';
  return `<span class="picker-box-icons">${pokemonIconUrl ? `<img class="ps-pokemon-icon" src="${pokemonIconUrl}" alt="${alt}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling&&this.nextElementSibling.classList.remove('d-none');">` : ''}<span class="pokemon-icon-fallback${pokemonIconUrl ? ' d-none' : ''}" aria-hidden="true">?</span>${itemVisual ? `<span class="picker-box-item-icon">${itemVisual}</span>` : ''}</span>`;
}

function renderPokemonOnlyIcon(speciesId, megaEnabled = false, itemId = '', alt = '') {
  const pokemonIconUrl = getShowdownPokemonIconUrl(speciesId, megaEnabled, itemId);
  return `<span class="pokemon-icon-stack">${pokemonIconUrl ? `<img class="ps-pokemon-icon" src="${pokemonIconUrl}" alt="${alt}" loading="lazy" onerror="this.style.display='none';this.nextElementSibling&&this.nextElementSibling.classList.remove('d-none');">` : ''}<span class="pokemon-icon-fallback${pokemonIconUrl ? ' d-none' : ''}" aria-hidden="true">?</span></span>`;
}

function refreshMoveMetaIcons() {
  if (!hasCalcPage()) return;
  const typeIcon = $('move-type-icon');
  const categoryIcon = $('move-category-icon');
  const typeValue = $('move-type')?.value || '';
  const categoryValue = $('move-category')?.value || '';
  if (typeIcon) {
    const typeUrl = getMoveTypeIconUrl(typeValue);
    typeIcon.style.backgroundImage = typeUrl ? `url(${typeUrl})` : '';
    typeIcon.title = state.lang === 'ja' ? ((state.data.types || []).find(type => type.name === typeValue)?.nameJa || typeValue) : typeValue;
  }
  if (categoryIcon) {
    const categoryUrl = getMoveCategoryIconUrl(categoryValue);
    categoryIcon.style.backgroundImage = categoryUrl ? `url(${categoryUrl})` : '';
    categoryIcon.title = state.lang === 'ja' ? ({ Physical: '物理', Special: '特殊', Status: '変化' }[categoryValue] || categoryValue) : categoryValue;
  }
}

function refreshHitCountVisibility(move) {
  if (!hasCalcPage() || !$('hit-count-wrap')) return;
  const visible = Boolean(move && (Array.isArray(move.multihit) || typeof move.multihit === 'number'));
  $('hit-count-wrap').classList.toggle('d-none', !visible);
}

function sortByDisplayName(entries, labelFn) {
  return [...entries].sort((left, right) => labelFn(left).localeCompare(labelFn(right), state.lang === 'ja' ? 'ja' : 'en'));
}

function getMoveTypeSortIndex(typeName) {
  const index = (state.data?.types || []).findIndex(type => type?.name === typeName);
  return index >= 0 ? index : Number.MAX_SAFE_INTEGER;
}

function sortMovesByTypeThenName(moves) {
  return [...moves].sort((left, right) => {
    const typeIndexDiff = getMoveTypeSortIndex(left?.type) - getMoveTypeSortIndex(right?.type);
    if (typeIndexDiff !== 0) return typeIndexDiff;
    const leftName = normalizeSearchText(displayEntryName(left));
    const rightName = normalizeSearchText(displayEntryName(right));
    return leftName.localeCompare(rightName, state.lang === 'ja' ? 'ja' : 'en');
  });
}

function speciesDamageSignature(entry) {
  return JSON.stringify({ baseSpecies: entry.baseSpecies, types: entry.types, stats: entry.baseStats, abilities: entry.abilities });
}

function buildDisplaySpeciesList() {
  const groups = new Map();
  for (const species of state.data.species || []) {
    const key = speciesDamageSignature(species);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(species);
  }
  state.mergedSpeciesAlias = new Map();
  const representatives = [];
  for (const group of groups.values()) {
    const preferred = group.find(species => !species.forme) || group[0];
    representatives.push(preferred);
    group.forEach(species => {
      if (species.id !== preferred.id) state.mergedSpeciesAlias.set(species.id, preferred.id);
    });
  }
  state.displaySpecies = representatives;
}

function normalizeSelectedSpeciesId(speciesId) {
  return state.mergedSpeciesAlias.get(speciesId) || speciesId;
}

function setPickerField(fieldId, options, selectedValue) {
  state.pickerOptions[fieldId] = options;
  const node = $(fieldId);
  if (node) node.value = options.some(option => option.value === selectedValue) ? selectedValue : (options[0]?.value || '');
  updatePickerButtonLabel(fieldId);
}

function getPickerLabel(fieldId, value) {
  return (state.pickerOptions[fieldId] || []).find(option => option.value === value)?.label || '-';
}

function toCompactNatureLabel(label) {
  return String(label || '').replace(/\s*\(.+\)\s*$/u, '');
}

function renderPickerButtonAsIcon(fieldId, button, value) {
  const iconOnlyFields = new Set(['attacker-species', 'defender-species', 'move-type', 'move-category']);
  if (!hasCalcPage() || !iconOnlyFields.has(fieldId)) {
    button.classList.remove('icon-picker-btn');
    button.classList.remove('calc-species-picker-btn');
    return false;
  }
  if (fieldId.endsWith('species')) {
    const side = fieldId.startsWith('attacker') ? 'attacker' : (fieldId.startsWith('defender') ? 'defender' : '');
    const megaEnabled = side ? Boolean($(`${side}-mega-enabled`)?.checked) : false;
    const itemId = side ? ($(`${side}-item`)?.value || '') : '';
    const iconUrl = getShowdownPokemonIconUrl(value, megaEnabled, itemId);
    const label = getPickerLabel(fieldId, value);
    if (iconUrl) {
      button.classList.add('icon-picker-btn');
      button.classList.add('calc-species-picker-btn');
      button.innerHTML = `<span class="calc-species-icon-wrap"><img class="ps-pokemon-icon" src="${iconUrl}" alt="" loading="lazy" onerror="this.style.display='none';this.nextElementSibling&&this.nextElementSibling.classList.remove('d-none');"><span class="pokemon-icon-fallback d-none" aria-hidden="true">?</span></span>`;
      button.title = label;
      button.setAttribute('aria-label', label);
      return true;
    }
  }
  button.classList.remove('calc-species-picker-btn');
  if (fieldId.endsWith('item')) {
    if (isGenericMegaStone(value)) {
      button.classList.add('icon-picker-btn');
      button.innerHTML = renderGenericMegaStoneIcon(getMegaStoneType(value));
      button.title = getPickerLabel(fieldId, value);
      return true;
    }
    const visual = renderItemVisual(value);
    if (visual) {
      button.classList.add('icon-picker-btn');
      button.innerHTML = visual;
      button.title = getPickerLabel(fieldId, value);
      return true;
    }
  }
  if (fieldId === 'move-type') {
    const iconUrl = getMoveTypeIconUrl(value);
    if (iconUrl) {
      button.classList.add('icon-picker-btn');
      button.innerHTML = `<img class="move-type-icon-chip" src="${iconUrl}" alt="" loading="lazy">`;
      button.title = getPickerLabel(fieldId, value);
      return true;
    }
  }
  if (fieldId === 'move-category') {
    const iconUrl = getMoveCategoryIconUrl(value);
    if (iconUrl) {
      button.classList.add('icon-picker-btn');
      button.innerHTML = `<img class="move-category-icon-chip" src="${iconUrl}" alt="" loading="lazy">`;
      button.title = getPickerLabel(fieldId, value);
      return true;
    }
  }
  return false;
}

function updatePickerButtonLabel(fieldId) {
  const meta = getPickerMeta(fieldId);
  if (!meta) return;
  const button = $(meta.buttonId);
  const input = $(fieldId);
  if (!button || !input) return;
  if (fieldId === 'move-select' && hasCalcPage()) {
    const move = state.movesById.get(input.value);
    const moveName = getPickerLabel(fieldId, input.value);
    if (move) {
      button.classList.remove('icon-picker-btn');
      button.textContent = moveName;
      button.title = moveName;
      return;
    }
  }
  const rendered = renderPickerButtonAsIcon(fieldId, button, input.value);
  if (!rendered) {
    let label = getPickerLabel(fieldId, input.value);
    if ((fieldId === 'attacker-nature' || fieldId === 'defender-nature') && hasCalcPage()) label = toCompactNatureLabel(label);
    button.textContent = label;
  }
}

function buildSpeciesOptions() {
  return sortByDisplayName(state.displaySpecies, displaySpeciesName).map(species => ({ value: species.id, label: displaySpeciesName(species) }));
}

function buildNatureOptions() {
  return NATURES.map(nature => {
    const base = state.lang === 'ja' ? nature.ja : nature.en;
    const label = nature.plus && nature.minus ? `${base} (+${STAT_LABELS[state.lang][nature.plus]} -${STAT_LABELS[state.lang][nature.minus]})` : `${base} (${t('neutralNature')})`;
    return { value: nature.id, label };
  });
}

function buildMoveOptions() {
  return sortByDisplayName((state.data.moves || []).filter(move => move?.category !== 'Status'), displayEntryName).map(move => ({
    value: move.id,
    label: displayEntryName(move),
    moveType: move.type,
    moveCategory: move.category,
    movePower: move.basePower,
  }));
}

function buildMoveTypeOptions() {
  return (state.data.types || []).map(type => ({ value: type.name, label: state.lang === 'ja' ? type.nameJa : type.name }));
}

function buildMoveCategoryOptions() {
  const categories = [
    { value: 'Physical', label: t('physical') },
    { value: 'Special', label: t('special') },
    { value: 'Status', label: t('status') },
  ];
  return categories;
}

function buildItemOptions() {
  const options = [{ value: '', label: state.lang === 'ja' ? 'なし' : 'None', itemId: '' }];
  const allItems = sortByDisplayName([...state.itemsById.values()], displayItemName);
  allItems.forEach(item => {
    options.push({ value: item.id, label: displayItemName(item), itemId: item.id });
  });
  return options;
}

function buildAbilityOptions(speciesId, megaEnabled, itemId = '') {
  const species = state.speciesById.get(resolveAbilitySpeciesId(speciesId, megaEnabled, itemId));
  const options = [];
  if (species) {
    Object.values(species.abilities || {}).forEach(name => {
      const ability = state.data.abilities.find(entry => entry.name === name);
      if (ability) options.push({ value: ability.id, label: displayEntryName(ability) });
    });
  }
  if (!options.length) options.push({ value: '', label: state.lang === 'ja' ? 'なし' : 'None' });
  return options;
}

function buildLearnsetOptions(speciesId) {
  const species = state.speciesById.get(normalizeSelectedSpeciesId(speciesId));
  if (!species) return buildMoveOptions();
  const learnedMoveIds = new Set();
  const exactById = state.learnsetBySpeciesId.get(species.id);
  if (exactById && exactById.size) exactById.forEach(moveId => learnedMoveIds.add(moveId));
  if (!learnedMoveIds.size) {
    const exactLearned = state.learnsetBySpeciesNum.get(species.num);
    if (exactLearned && exactLearned.size) {
      exactLearned.forEach(moveId => learnedMoveIds.add(moveId));
    }
  }
  if (!learnedMoveIds.size) {
    const speciesNums = new Set([species.num]);
    const speciesIds = new Set([species.id]);
    state.speciesById.forEach(entry => {
      if (entry.baseSpecies === species.baseSpecies) {
        speciesNums.add(entry.num);
        speciesIds.add(entry.id);
      }
    });
    speciesIds.forEach(id => {
      const learned = state.learnsetBySpeciesId.get(id);
      if (!learned || !learned.size) return;
      learned.forEach(moveId => learnedMoveIds.add(moveId));
    });
    speciesNums.forEach(num => {
      const learned = state.learnsetBySpeciesNum.get(num);
      if (!learned || !learned.size) return;
      learned.forEach(moveId => learnedMoveIds.add(moveId));
    });
  }
  const sourceMoves = learnedMoveIds.size
    ? [...learnedMoveIds].map(moveId => state.movesById.get(moveId)).filter(Boolean)
    : [...state.data.moves];
  return sortMovesByTypeThenName(sourceMoves).map(move => ({
    value: move.id,
    label: displayEntryName(move),
    moveType: move.type,
    moveCategory: move.category,
    movePower: move.basePower,
  }));
}

function buildSpeciesPickerOptions() {
  const pickerSpecies = [...state.displaySpecies, ...(state.data?.megaSpecies || [])];
  return sortByDisplayName(pickerSpecies, displaySpeciesName).map(species => ({
    value: species.id,
    label: displaySpeciesName(species),
    iconSpeciesId: species.id,
    iconMegaEnabled: false,
    iconItemId: '',
  }));
}

function buildDetailSpeciesPickerOptions() {
  const pickerSpecies = [...(state.data?.species || []), ...(state.data?.megaSpecies || [])];
  const dedup = new Map();
  pickerSpecies.forEach(species => {
    if (!dedup.has(species.id)) dedup.set(species.id, species);
  });
  return sortByDisplayName([...dedup.values()], displaySpeciesName).map(species => ({
    value: species.id,
    label: displaySpeciesName(species),
    iconSpeciesId: species.id,
    iconMegaEnabled: false,
    iconItemId: '',
  }));
}

function canSpeciesLearnMove(speciesId, moveId) {
  const species = state.speciesById.get(normalizeSelectedSpeciesId(speciesId));
  if (!species || !moveId) return true;
  if (!state.movesById.has(moveId)) return true;
  const byId = state.learnsetBySpeciesId.get(species.id);
  if (byId && byId.size) return byId.has(moveId);
  const byNum = state.learnsetBySpeciesNum.get(species.num);
  if (byNum && byNum.size) return byNum.has(moveId);
  return true;
}

function getMovePowerParameterConfig(moveId) {
  const configMap = {
    lastrespects: {
      min: 0,
      max: 5,
      defaultValue: 0,
      labelJa: '倒れた味方数',
      labelEn: 'Fainted allies',
      helpJa: 'おはかまいり: 50 + 50 x 倒れた味方数',
      helpEn: 'Last Respects: 50 + 50 x fainted allies',
      resolver: value => 50 + 50 * clamp(toNumber(value), 0, 5),
    },
    ragefist: {
      min: 0,
      max: 6,
      defaultValue: 0,
      labelJa: '受けた被弾回数',
      labelEn: 'Times hit',
      helpJa: 'ふんどのこぶし: 50 + 50 x 被弾回数',
      helpEn: 'Rage Fist: 50 + 50 x times hit',
      resolver: value => 50 + 50 * clamp(toNumber(value), 0, 6),
    },
    storedpower: {
      min: 0,
      max: 12,
      defaultValue: 0,
      labelJa: '能力上昇段階合計',
      labelEn: 'Total stat boosts',
      helpJa: 'アシストパワー: 20 + 20 x 能力上昇段階合計',
      helpEn: 'Stored Power: 20 + 20 x total boosts',
      resolver: value => 20 + 20 * clamp(toNumber(value), 0, 12),
    },
    powertrip: {
      min: 0,
      max: 12,
      defaultValue: 0,
      labelJa: '能力上昇段階合計',
      labelEn: 'Total stat boosts',
      helpJa: 'つけあがる: 20 + 20 x 能力上昇段階合計',
      helpEn: 'Power Trip: 20 + 20 x total boosts',
      resolver: value => 20 + 20 * clamp(toNumber(value), 0, 12),
    },
  };
  return configMap[moveId] || null;
}

function resolveMovePower(input, move) {
  const config = getMovePowerParameterConfig(move.id);
  if (!config) return clamp(input.movePower, 0, 400);
  return clamp(config.resolver(input.moveParamValue), 0, 400);
}

function updateMoveParameterUI() {
  if (!hasCalcPage()) return;
  const wrap = $('move-parameter-wrap');
  const label = $('move-parameter-label');
  const valueInput = $('move-parameter-value');
  const help = $('move-parameter-help');
  if (!wrap || !label || !valueInput || !help) return;
  const move = state.movesById.get($('move-select').value);
  const config = move ? getMovePowerParameterConfig(move.id) : null;
  refreshHitCountVisibility(move);
  if (!config) {
    wrap.classList.add('d-none');
    return;
  }
  wrap.classList.remove('d-none');
  label.textContent = state.lang === 'ja' ? config.labelJa : config.labelEn;
  help.textContent = state.lang === 'ja' ? config.helpJa : config.helpEn;
  valueInput.min = String(config.min);
  valueInput.max = String(config.max);
  const current = clamp(toNumber(valueInput.value, config.defaultValue), config.min, config.max);
  valueInput.value = String(current);
  $('move-power').value = String(resolveMovePower({ moveParamValue: current, movePower: $('move-power').value }, move));
}

function fillSpeciesField(fieldId, selectedId) {
  if (fieldId === 'attacker-species' || fieldId === 'defender-species' || fieldId === 'detail-species') {
    setPickerField(fieldId, buildDetailSpeciesPickerOptions(), selectedId);
    return;
  }
  setPickerField(fieldId, buildSpeciesOptions(), normalizeSelectedSpeciesId(selectedId));
}

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
  const compactJa = FORME_NAME_JA[forme] || FORME_NAME_JA[forme.replace(/[^A-Za-z]/g, '')] || '';
  return state.lang === 'ja' ? (compactJa || forme) : forme;
}

function buildFormOptionsForSide(side) {
  const speciesInput = $(`${side}-species`);
  if (!speciesInput) return [];
  const selected = state.speciesById.get(speciesInput.value) || state.speciesById.get(normalizeSelectedSpeciesId(speciesInput.value));
  if (!selected) return [];
  const baseName = selected.baseSpecies || selected.name;
  const forms = [...(state.data?.species || []), ...(state.data?.megaSpecies || [])]
    .filter(entry => (entry.baseSpecies || entry.name) === baseName);
  const dedup = new Map();
  forms.forEach(entry => {
    if (!dedup.has(entry.id)) dedup.set(entry.id, entry);
  });
  return [...dedup.values()]
    .sort((left, right) => {
      const leftRank = String(left.forme || '').length;
      const rightRank = String(right.forme || '').length;
      if (leftRank !== rightRank) return leftRank - rightRank;
      return displaySpeciesName(left).localeCompare(displaySpeciesName(right), state.lang === 'ja' ? 'ja' : 'en');
    })
    .map(entry => ({ value: entry.id, label: toShortFormLabel(entry) }));
}

function syncFormeFieldForSide(side, preferredSpeciesId = '') {
  const formField = `${side}-forme`;
  const speciesField = `${side}-species`;
  if (!$(formField) || !$(speciesField)) return;
  const options = buildFormOptionsForSide(side);
  const target = preferredSpeciesId || $(speciesField).value;
  const selectedValue = options.some(option => option.value === target) ? target : (options[0]?.value || '');
  setPickerField(formField, options, selectedValue);
  if (selectedValue) {
    $(formField).value = selectedValue;
    $(speciesField).value = selectedValue;
    updatePickerButtonLabel(speciesField);
  }
}

function fillNatureFields(attackerSelected, defenderSelected, detailSelected) {
  const options = buildNatureOptions();
  if ($('attacker-nature')) setPickerField('attacker-nature', options, attackerSelected);
  if ($('defender-nature')) setPickerField('defender-nature', options, defenderSelected);
  if ($('detail-nature')) setPickerField('detail-nature', options, detailSelected);
  ['attacker', 'defender'].forEach(syncNatureModifierSelectors);
  syncDetailNatureButtonsFromNature();
}

function buildNatureModOptions(signLabel) {
  const labels = state.lang === 'ja'
    ? { atk: 'A', def: 'B', spa: 'C', spd: 'D', spe: 'S' }
    : { atk: 'Atk', def: 'Def', spa: 'SpA', spd: 'SpD', spe: 'Spe' };
  return [`<option value="">${signLabel}</option>`, ...NATURE_MODIFIER_STATS.map(stat => `<option value="${stat}">${labels[stat]}</option>`)];
}

function findNatureIdByModifiers(plusStat, minusStat) {
  if (!plusStat || !minusStat || plusStat === minusStat) return 'hardy';
  return NATURES.find(nature => nature.plus === plusStat && nature.minus === minusStat)?.id || 'hardy';
}

function syncNatureModifierSelectors(prefix) {
  const natureInput = $(`${prefix}-nature`);
  if (!natureInput) return;
  const nature = getNatureById(natureInput.value);
  const plus = $(`${prefix}-nature-plus`);
  const minus = $(`${prefix}-nature-minus`);
  if (plus && minus) {
    if (!plus.options.length) plus.innerHTML = buildNatureModOptions('+').join('');
    if (!minus.options.length) minus.innerHTML = buildNatureModOptions('-').join('');
    plus.value = nature.plus || '';
    minus.value = nature.minus || '';
  }
  document.querySelectorAll(`.stat-mod-cycle-btn[data-side="${prefix}"]`).forEach(button => {
    const labelMap = { hp: 'H', atk: 'A', def: 'B', spa: 'C', spd: 'D', spe: 'S' };
    const usePercentLabel = prefix === 'detail';
    if (button.dataset.stat === 'hp') {
      button.dataset.state = 'neutral';
      if (usePercentLabel) {
        button.textContent = '+-0%';
      } else {
        button.textContent = 'H';
      }
      return;
    }
    const stateValue = button.dataset.stat === nature.plus ? 'plus' : (button.dataset.stat === nature.minus ? 'minus' : 'neutral');
    button.dataset.state = stateValue;
    const base = labelMap[button.dataset.stat] || '';
    if (usePercentLabel) {
      if (stateValue === 'plus') button.textContent = '▲10%';
      else if (stateValue === 'minus') button.textContent = '▼10%';
      else button.textContent = '+-0%';
    } else {
      button.textContent = stateValue === 'plus' ? `${base}+` : (stateValue === 'minus' ? `${base}-` : base);
    }
  });
}

function applyNatureFromModifierSelectors(prefix, strict = false) {
  const plus = $(`${prefix}-nature-plus`);
  const minus = $(`${prefix}-nature-minus`);
  const natureInput = $(`${prefix}-nature`);
  if (!natureInput) return { valid: true, plusStats: [], minusStats: [] };
  let plusStat = plus?.value || '';
  let minusStat = minus?.value || '';
  if (!plus || !minus) {
    const plusStats = [];
    const minusStats = [];
    document.querySelectorAll(`.stat-mod-cycle-btn[data-side="${prefix}"]`).forEach(button => {
      const stat = button.dataset.stat;
      const stateValue = button.dataset.state || 'neutral';
      if (!stat || stat === 'hp') return;
      if (stateValue === 'plus') plusStats.push(stat);
      if (stateValue === 'minus') minusStats.push(stat);
    });
    if (strict) {
      const validNone = plusStats.length === 0 && minusStats.length === 0;
      const validSingle = plusStats.length === 1 && minusStats.length === 1 && plusStats[0] !== minusStats[0];
      if (!validNone && !validSingle) {
        return { valid: false, plusStats, minusStats };
      }
    }
    plusStat = plusStats[0] || '';
    minusStat = minusStats[0] || '';
  }
  const hasPlus = Boolean(plusStat);
  const hasMinus = Boolean(minusStat);
  if (hasPlus && hasMinus && plusStat !== minusStat) {
    natureInput.value = findNatureIdByModifiers(plusStat, minusStat);
    updatePickerButtonLabel(`${prefix}-nature`);
    if (plus && minus) syncNatureModifierSelectors(prefix);
    return { valid: true, plusStats: [plusStat], minusStats: [minusStat] };
  }
  if (!hasPlus && !hasMinus) {
    natureInput.value = 'hardy';
    updatePickerButtonLabel(`${prefix}-nature`);
    if (plus && minus) syncNatureModifierSelectors(prefix);
    return { valid: true, plusStats: [], minusStats: [] };
  }
  updatePickerButtonLabel(`${prefix}-nature`);
  return strict ? { valid: false, plusStats: hasPlus ? [plusStat] : [], minusStats: hasMinus ? [minusStat] : [] } : { valid: true, plusStats: hasPlus ? [plusStat] : [], minusStats: hasMinus ? [minusStat] : [] };
}

function validateSideNatureForSave(side) {
  const result = applyNatureFromModifierSelectors(side, true);
  if (!result.valid) {
    window.alert('性格補正は + と - をそれぞれ1つずつ（または両方なし）で保存してください。');
    return false;
  }
  syncNatureModifierSelectors(side);
  return true;
}

function syncDetailNatureButtonsFromNature() {
  if (!$('detail-nature')) return;
  const nature = getNatureById($('detail-nature').value);
  document.querySelectorAll('.detail-mod-btn').forEach(button => {
    button.classList.remove('active');
    if (button.dataset.detailMod === 'plus' && button.dataset.stat === nature.plus) button.classList.add('active');
    if (button.dataset.detailMod === 'minus' && button.dataset.stat === nature.minus) button.classList.add('active');
  });
}

function applyDetailNatureFromButtons() {
  if (!$('detail-nature')) return;
  const plusStat = document.querySelector('.detail-mod-btn.active[data-detail-mod="plus"]')?.dataset.stat || '';
  const minusStat = document.querySelector('.detail-mod-btn.active[data-detail-mod="minus"]')?.dataset.stat || '';
  $('detail-nature').value = findNatureIdByModifiers(plusStat, minusStat);
  updatePickerButtonLabel('detail-nature');
  syncDetailNatureButtonsFromNature();
  updateDetailStatSummaries();
  const pokemon = readDetailPokemonFromForm() || getCurrentDetailPokemon();
  if (pokemon) {
    renderDetailHeadSummary(pokemon);
    renderDetailWarnings(pokemon);
  }
}

function fillMoveField(selectedId) {
  setPickerField('move-select', buildMoveOptions(), selectedId);
}

function fillMoveTypeField(selectedType) {
  setPickerField('move-type', buildMoveTypeOptions(), selectedType);
}

function fillMoveCategoryField(selectedCategory) {
  setPickerField('move-category', buildMoveCategoryOptions(), selectedCategory);
}

function fillItemField(fieldId, selectedId) {
  setPickerField(fieldId, buildItemOptions(), selectedId);
}

function fillAbilityField(fieldId, speciesId, megaEnabled, selectedAbilityId, itemId = '') {
  const options = buildAbilityOptions(speciesId, megaEnabled, itemId);
  const preferred = selectedAbilityId || (options[0]?.value || '');
  setPickerField(fieldId, options, preferred);
}

function fillTypeSelect() {
  fillMoveTypeField($('move-type')?.value || 'Fairy');
  fillMoveCategoryField($('move-category')?.value || 'Special');
}

function setupLocalizedNameMapsFromData(jaTranslations = null) {
  const speciesMap = jaTranslations?.species && typeof jaTranslations.species === 'object' ? jaTranslations.species : {};
  const moveMap = jaTranslations?.moves && typeof jaTranslations.moves === 'object' ? jaTranslations.moves : {};
  const abilityMap = jaTranslations?.abilities && typeof jaTranslations.abilities === 'object' ? jaTranslations.abilities : {};
  const itemMap = jaTranslations?.items && typeof jaTranslations.items === 'object' ? jaTranslations.items : {};

  state.moveNameJaById = new Map();
  (state.data?.moves || []).forEach(move => {
    const mapEntry = moveMap?.[move?.id];
    const mappedName = String(mapEntry?.nameJa || '').trim();
    if (move?.id && mappedName) state.moveNameJaById.set(move.id, mappedName);
    else if (move?.id && move?.nameJa) state.moveNameJaById.set(move.id, move.nameJa);
  });

  state.speciesNameJaById = new Map();
  [...(state.data?.species || []), ...(state.data?.megaSpecies || [])].forEach(species => {
    const mapEntry = speciesMap?.[species?.id];
    const mappedName = String(mapEntry?.nameJa || '').trim();
    if (species?.id && mappedName) state.speciesNameJaById.set(species.id, mappedName);
    else if (species?.id && species?.nameJa) state.speciesNameJaById.set(species.id, species.nameJa);
  });

  state.abilityNameJaById = new Map();
  (state.data?.abilities || []).forEach(ability => {
    const mapEntry = abilityMap?.[ability?.id];
    const mappedName = String(mapEntry?.nameJa || '').trim();
    if (ability?.id && mappedName) state.abilityNameJaById.set(ability.id, mappedName);
    else if (ability?.id && ability?.nameJa) state.abilityNameJaById.set(ability.id, ability.nameJa);
  });

  state.itemNameJaById = new Map();
  (state.data?.items || []).forEach(item => {
    const mapEntry = itemMap?.[item?.id];
    const mappedName = String(mapEntry?.nameJa || '').trim();
    if (item?.id && mappedName) state.itemNameJaById.set(item.id, mappedName);
    else if (item?.id && item?.nameJa) state.itemNameJaById.set(item.id, item.nameJa);
  });

  state.learnsetBySpeciesNum = new Map();
  state.learnsetBySpeciesId.forEach((moveIds, speciesId) => {
    const species = state.speciesById.get(speciesId);
    if (!species || !Number.isFinite(species.num)) return;
    if (!state.learnsetBySpeciesNum.has(species.num)) state.learnsetBySpeciesNum.set(species.num, new Set());
    moveIds.forEach(moveId => state.learnsetBySpeciesNum.get(species.num).add(moveId));
  });
}

async function fetchCsvRecordsSafe(url) {
  try {
    return await fetchCsvRecords(url);
  } catch (_error) {
    return [];
  }
}

function refreshConditionToggleLabels() {
  document.querySelectorAll('.badge-btn[data-icon-label-key]').forEach(button => {
    const key = button.dataset.iconLabelKey;
    const label = t(key);
    button.title = label;
    button.setAttribute('aria-label', label);
  });
}

function applyCompactFieldTitles() {
  const labels = state.lang === 'ja' ? {
    'attacker-species-button': '攻撃側ポケモン', 'attacker-forme-button': '攻撃側フォルム', 'attacker-nature-button': '攻撃側せいかく', 'attacker-ability-button': '攻撃側とくせい', 'attacker-item-button': '攻撃側もちもの',
    'defender-species-button': '防御側ポケモン', 'defender-forme-button': '防御側フォルム', 'defender-nature-button': '防御側せいかく', 'defender-ability-button': '防御側とくせい', 'defender-item-button': '防御側もちもの',
    'detail-species-button': '詳細ポケモン', 'detail-forme-button': '詳細フォルム', 'detail-nature-button': '詳細せいかく', 'detail-ability-button': '詳細とくせい', 'detail-item-button': '詳細もちもの',
    'move-button': 'わざ', 'move-type-button': 'わざタイプ', 'move-category-button': 'わざ分類', 'move-power': 'わざ威力', 'hit-count': 'ヒット回数',
    'attacker-ev-atk': '攻撃側 AP Atk', 'attacker-ev-spa': '攻撃側 AP SpA', 'attacker-rank-atk': '攻撃側 ランク Atk', 'attacker-rank-spa': '攻撃側 ランク SpA', 'attacker-rank-spe': '攻撃側 ランク Spe',
    'defender-ev-hp': '防御側 AP HP', 'defender-ev-def': '防御側 AP Def', 'defender-ev-spd': '防御側 AP SpD', 'defender-rank-def': '防御側 ランク Def', 'defender-rank-spd': '防御側 ランク SpD', 'defender-rank-spe': '防御側 ランク Spe',
    'detail-ev-hp': '詳細 AP HP', 'detail-ev-atk': '詳細 AP Atk', 'detail-ev-def': '詳細 AP Def', 'detail-ev-spa': '詳細 AP SpA', 'detail-ev-spd': '詳細 AP SpD', 'detail-ev-spe': '詳細 AP Spe',
  } : {
    'attacker-species-button': 'Attacker species', 'attacker-forme-button': 'Attacker form', 'attacker-nature-button': 'Attacker nature', 'attacker-ability-button': 'Attacker ability', 'attacker-item-button': 'Attacker item',
    'defender-species-button': 'Defender species', 'defender-forme-button': 'Defender form', 'defender-nature-button': 'Defender nature', 'defender-ability-button': 'Defender ability', 'defender-item-button': 'Defender item',
    'detail-species-button': 'Detail species', 'detail-forme-button': 'Detail form', 'detail-nature-button': 'Detail nature', 'detail-ability-button': 'Detail ability', 'detail-item-button': 'Detail item',
    'move-button': 'Move', 'move-type-button': 'Move type', 'move-category-button': 'Move category', 'move-power': 'Move power', 'hit-count': 'Hit count',
    'attacker-ev-atk': 'Attacker AP Atk', 'attacker-ev-spa': 'Attacker AP SpA', 'attacker-rank-atk': 'Attacker Rank Atk', 'attacker-rank-spa': 'Attacker Rank SpA', 'attacker-rank-spe': 'Attacker Rank Spe',
    'defender-ev-hp': 'Defender AP HP', 'defender-ev-def': 'Defender AP Def', 'defender-ev-spd': 'Defender AP SpD', 'defender-rank-def': 'Defender Rank Def', 'defender-rank-spd': 'Defender Rank SpD', 'defender-rank-spe': 'Defender Rank Spe',
    'detail-ev-hp': 'Detail AP HP', 'detail-ev-atk': 'Detail AP Atk', 'detail-ev-def': 'Detail AP Def', 'detail-ev-spa': 'Detail AP SpA', 'detail-ev-spd': 'Detail AP SpD', 'detail-ev-spe': 'Detail AP Spe',
  };
  Object.entries(labels).forEach(([id, label]) => {
    const node = $(id);
    if (!node) return;
    node.title = label;
    node.setAttribute('aria-label', label);
  });
  if ($('attacker-ev-atk')) $('attacker-ev-atk').placeholder = 'AP Atk';
  if ($('attacker-ev-spa')) $('attacker-ev-spa').placeholder = 'AP SpA';
  if ($('defender-ev-hp')) $('defender-ev-hp').placeholder = 'AP HP';
  if ($('defender-ev-def')) $('defender-ev-def').placeholder = 'AP Def';
  if ($('defender-ev-spd')) $('defender-ev-spd').placeholder = 'AP SpD';
  if ($('attacker-rank-atk')) $('attacker-rank-atk').placeholder = 'R Atk';
  if ($('attacker-rank-spa')) $('attacker-rank-spa').placeholder = 'R SpA';
  if ($('attacker-rank-spe')) $('attacker-rank-spe').placeholder = 'R Spe';
  if ($('defender-rank-def')) $('defender-rank-def').placeholder = 'R Def';
  if ($('defender-rank-spd')) $('defender-rank-spd').placeholder = 'R SpD';
  if ($('defender-rank-spe')) $('defender-rank-spe').placeholder = 'R Spe';
  if ($('detail-ev-hp')) $('detail-ev-hp').placeholder = 'AP HP';
  if ($('detail-ev-atk')) $('detail-ev-atk').placeholder = 'AP Atk';
  if ($('detail-ev-def')) $('detail-ev-def').placeholder = 'AP Def';
  if ($('detail-ev-spa')) $('detail-ev-spa').placeholder = 'AP SpA';
  if ($('detail-ev-spd')) $('detail-ev-spd').placeholder = 'AP SpD';
  if ($('detail-ev-spe')) $('detail-ev-spe').placeholder = 'AP Spe';
}

function setupLookups(data) {
  const speciesList = [...(data.species || []), ...(data.megaSpecies || [])];
  state.speciesById = new Map(speciesList.map(entry => [entry.id, entry]));
  state.movesById = new Map(data.moves.map(entry => [entry.id, entry]));
  state.moveByNum = new Map(data.moves.map(entry => [Number(entry.num), entry.id]));
  state.abilitiesById = new Map(data.abilities.map(entry => [entry.id, entry]));
  state.abilityByNum = new Map(data.abilities.map(entry => [Number(entry.num), entry.id]));
  state.itemsById = new Map(data.items.map(entry => [entry.id, entry]));
  state.megaMap = data.megaMap || {};
  state.typeEffectiveness = {};
  state.baseSpeciesJaByName = new Map();
  speciesList.forEach(species => {
    const fallback = BASE_SPECIES_JA_FALLBACK[species.baseSpecies];
    if (fallback && !state.baseSpeciesJaByName.get(species.baseSpecies)) state.baseSpeciesJaByName.set(species.baseSpecies, fallback);
    if (species.nameJa) {
      const current = state.baseSpeciesJaByName.get(species.baseSpecies);
      if (!current || !species.forme) state.baseSpeciesJaByName.set(species.baseSpecies, normalizeBaseJaName(species.nameJa));
    }
  });
  (data.types || []).forEach(type => {
    state.typeEffectiveness[type.name] = type.offensive;
  });
  state.learnsetBySpeciesId = new Map(Object.entries(data.learnsetBySpeciesId || {}).map(([speciesId, moveIds]) => [speciesId, new Set(Array.isArray(moveIds) ? moveIds : [])]));
  buildDisplaySpeciesList();
}

function resolveMegaBaseId(speciesId) {
  if (state.megaMap[speciesId]) return speciesId;
  const species = state.speciesById.get(speciesId);
  const baseId = toId(species?.baseSpecies || '');
  return state.megaMap[baseId] ? baseId : null;
}

function hasMega(speciesId) {
  return Boolean(resolveMegaBaseId(speciesId));
}

function getEffectiveSpecies(speciesId, megaEnabled, itemId = '') {
  const effectiveId = resolveEffectiveSpeciesId(speciesId, megaEnabled, itemId);
  return state.speciesById.get(effectiveId) || state.speciesById.get(speciesId);
}

function applyI18n() {
  document.documentElement.lang = state.lang;
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.getAttribute('data-i18n');
    if (I18N[state.lang][key]) node.textContent = I18N[state.lang][key];
  });
  if ($('detail-export-pokepaste')) $('detail-export-pokepaste').textContent = t('detailExportPokepaste');
  if ($('picker-search')) $('picker-search').placeholder = t('pickerSearch');
}

function updateLangTabs() {
  document.querySelectorAll('#lang-tabs [data-lang]').forEach(button => {
    button.classList.toggle('active', button.dataset.lang === state.lang);
  });
}

function applyLanguageChange() {
  persistLanguagePreference();
  applyI18n();
  refreshConditionToggleLabels();
  applyCompactFieldTitles();
  refreshMoveMetaIcons();
  updateLangTabs();
  if (hasCalcPage()) {
    refreshLocalizedFields();
    updateMoveParameterUI();
    calculateAndRender();
  } else {
    renderManagerViews();
  }
}

const SPREAD_MOVE_TARGETS = new Set(['allAdjacent', 'allAdjacentFoes']);

function isSpreadDamageMove(move) {
  return Boolean(move && SPREAD_MOVE_TARGETS.has(move.target));
}

function syncSpreadOptionAvailability(move) {
  const spreadInput = $('is-spread');
  if (!spreadInput) return;
  const spreadLabel = document.querySelector('label[for="is-spread"]');
  const enabled = isSpreadDamageMove(move);
  spreadInput.disabled = !enabled;
  if (!enabled) spreadInput.checked = false;
  if (spreadLabel) spreadLabel.classList.toggle('text-muted', !enabled);
}

function recalcMoveFields() {
  if (!hasCalcPage()) return;
  const move = state.movesById.get($('move-select').value);
  syncSpreadOptionAvailability(move);
  if (!move) return;
  $('move-type').value = move.type;
  $('move-category').value = move.category;
  $('move-power').value = move.basePower;
  const hitCount = $('hit-count');
  if (Array.isArray(move.multihit)) hitCount.value = move.multihit[0];
  else if (typeof move.multihit === 'number') hitCount.value = move.multihit;
  else hitCount.value = 1;
  refreshMoveMetaIcons();
  updateMoveParameterUI();
  updatePickerButtonLabel('move-select');
  updatePickerButtonLabel('move-type');
  updatePickerButtonLabel('move-category');
}

function restoreSidesFromCalcLinks() {
  if (!hasCalcPage()) return false;
  let restored = false;
  ['attacker', 'defender'].forEach(side => {
    const linkedId = state.storage?.calcLinks?.[side];
    if (!linkedId) return;
    const pokemon = getPokemonById(linkedId);
    if (!pokemon) return;
    applyStoredPokemonToSide(side, pokemon, { silent: true });
    restored = true;
  });
  return restored;
}

function calcSingleStat(base, ap, natureMultiplier) {
  let stat = base + ap + 20;
  if (natureMultiplier === 1.1) stat = Math.trunc((Math.trunc(stat * 110)) / 100);
  else if (natureMultiplier === 0.9) stat = Math.trunc((Math.trunc(stat * 90)) / 100);
  return Math.max(1, stat);
}

function calcHpStat(base, ap) {
  return base === 1 ? 1 : base + ap + 75;
}

function getActiveToggleValue(group) {
  return document.querySelector(`.badge-btn[data-group="${group}"].active`)?.dataset.value || 'none';
}

function updateBackgroundByConditions() {
  const weather = getActiveToggleValue('weather');
  const terrain = getActiveToggleValue('terrain');
  const weatherColors = { none: '#ffffff', sun: '#ffb4ae', rain: '#9ec9ff', snow: '#d5efff', sand: '#ffd1ad' };
  const terrainColors = { none: '#ffffff', electric: '#fff3a6', psychic: '#ffc2df', grassy: '#afe9c2', misty: '#a8ece5' };
  const weatherColor = weatherColors[weather] || '#ffffff';
  const terrainColor = terrainColors[terrain] || '#ffffff';
  if (weather !== 'none' && terrain !== 'none') {
    document.body.style.background = `linear-gradient(180deg, ${weatherColor} 0%, ${weatherColor} 48%, ${terrainColor} 52%, ${terrainColor} 100%)`;
  } else if (weather !== 'none') {
    document.body.style.background = weatherColor;
  } else if (terrain !== 'none') {
    document.body.style.background = terrainColor;
  } else {
    document.body.style.background = '#ffffff';
  }
}

function resolveAutoConditionFromAbility(abilityName) {
  const weatherMap = {
    Drought: { group: 'weather', value: 'sun' },
    Drizzle: { group: 'weather', value: 'rain' },
    'Sand Stream': { group: 'weather', value: 'sand' },
    'Snow Warning': { group: 'weather', value: 'snow' },
    'Desolate Land': { group: 'weather', value: 'sun' },
    'Primordial Sea': { group: 'weather', value: 'rain' },
  };
  const terrainMap = {
    'Electric Surge': { group: 'terrain', value: 'electric' },
    'Grassy Surge': { group: 'terrain', value: 'grassy' },
    'Psychic Surge': { group: 'terrain', value: 'psychic' },
    'Misty Surge': { group: 'terrain', value: 'misty' },
    'Hadron Engine': { group: 'terrain', value: 'electric' },
  };
  return weatherMap[abilityName] || terrainMap[abilityName] || null;
}

function autoApplyConditionsFromAbilities() {
  if (!hasCalcPage()) return;
  const attackerSpecies = getEffectiveSpecies($('attacker-species')?.value, $('attacker-mega-enabled')?.checked, $('attacker-item')?.value || '');
  const defenderSpecies = getEffectiveSpecies($('defender-species')?.value, $('defender-mega-enabled')?.checked, $('defender-item')?.value || '');
  const attackerAbilityId = resolveAbilityIdForSpecies(attackerSpecies, $('attacker-ability')?.value || '');
  const defenderAbilityId = resolveAbilityIdForSpecies(defenderSpecies, $('defender-ability')?.value || '');
  const orderedAbilities = [attackerAbilityId, defenderAbilityId]
    .map(id => state.abilitiesById.get(id)?.name)
    .filter(Boolean);
  let weather = null;
  let terrain = null;
  orderedAbilities.forEach(name => {
    const resolved = resolveAutoConditionFromAbility(name);
    if (!resolved) return;
    if (resolved.group === 'weather' && !weather) weather = resolved.value;
    if (resolved.group === 'terrain' && !terrain) terrain = resolved.value;
  });
  if (weather) setActiveToggle('weather', weather);
  if (terrain) setActiveToggle('terrain', terrain);
}

function setActiveToggle(group, value) {
  document.querySelectorAll(`.badge-btn[data-group="${group}"]`).forEach(button => {
    button.classList.toggle('active', button.dataset.value === value);
  });
  if (hasCalcPage()) updateBackgroundByConditions();
}

function hasAbility(id, names) {
  const ability = state.abilitiesById.get(id);
  return Boolean(ability && names.includes(ability.name));
}

function resolveAbilityIdForSpecies(species, selectedAbilityId) {
  if (selectedAbilityId) return selectedAbilityId;
  const first = species?.abilities?.['0'];
  if (!first) return '';
  const ability = state.data.abilities.find(entry => entry.name === first);
  return ability ? ability.id : '';
}

function getTypeMultiplier(moveType, defenderTypes) {
  let multiplier = 1;
  const offense = state.typeEffectiveness[moveType] || {};
  defenderTypes.forEach(type => {
    multiplier *= offense[type] == null ? 1 : offense[type];
  });
  return multiplier;
}

function getStabMultiplier(moveType, attackerTypes, adaptability) {
  let stab = attackerTypes.includes(moveType) ? 1.5 : 1;
  if (adaptability && stab > 1) stab = 2;
  return stab;
}

function getOffensiveItemDamageModifier(itemId, moveCategory, moveType, typeMultiplier) {
  if (!itemId) return { multiplier: 1, label: '' };
  if (itemId === 'lifeorb') return { multiplier: 1.3, label: 'Life Orb' };
  if (itemId === 'expertbelt' && typeMultiplier > 1) return { multiplier: 1.2, label: 'Expert Belt' };
  if (itemId === 'muscleband' && moveCategory === 'Physical') return { multiplier: 1.1, label: 'Muscle Band' };
  if (itemId === 'wiseglasses' && moveCategory === 'Special') return { multiplier: 1.1, label: 'Wise Glasses' };
  if (TYPE_BOOST_ITEMS[itemId] && TYPE_BOOST_ITEMS[itemId] === moveType) return { multiplier: 1.2, label: 'Type Booster' };
  return { multiplier: 1, label: '' };
}

function collectInput() {
  const attackerNatureOverride = getSideNatureOverridesFromButtons('attacker');
  const defenderNatureOverride = getSideNatureOverridesFromButtons('defender');
  return {
    attackerSpeciesId: $('attacker-species').value,
    attackerMegaEnabled: false,
    attackerNature: $('attacker-nature').value,
    attackerAbilityId: $('attacker-ability').value,
    attackerItemId: $('attacker-item').value,
    attackerEvHp: clamp(toNumber($('attacker-ev-hp')?.value), 0, 32),
    attackerEvAtk: clamp(toNumber($('attacker-ev-atk').value), 0, 32),
    attackerEvDef: clamp(toNumber($('attacker-ev-def')?.value), 0, 32),
    attackerEvSpa: clamp(toNumber($('attacker-ev-spa').value), 0, 32),
    attackerEvSpd: clamp(toNumber($('attacker-ev-spd')?.value), 0, 32),
    attackerEvSpe: clamp(toNumber($('attacker-ev-spe')?.value), 0, 32),
    attackerRankHp: 0,
    attackerRankAtk: clamp(toNumber($('attacker-rank-atk').value), -6, 6),
    attackerRankDef: clamp(toNumber($('attacker-rank-def')?.value), -6, 6),
    attackerRankSpa: clamp(toNumber($('attacker-rank-spa').value), -6, 6),
    attackerRankSpd: clamp(toNumber($('attacker-rank-spd')?.value), -6, 6),
    attackerRankSpe: clamp(toNumber($('attacker-rank-spe').value), -6, 6),
    attackerNaturePlusStats: attackerNatureOverride.plusStats,
    attackerNatureMinusStats: attackerNatureOverride.minusStats,
    defenderSpeciesId: $('defender-species').value,
    defenderMegaEnabled: false,
    defenderNature: $('defender-nature').value,
    defenderAbilityId: $('defender-ability').value,
    defenderItemId: $('defender-item').value,
    defenderEvHp: clamp(toNumber($('defender-ev-hp').value), 0, 32),
    defenderEvAtk: clamp(toNumber($('defender-ev-atk')?.value), 0, 32),
    defenderEvDef: clamp(toNumber($('defender-ev-def').value), 0, 32),
    defenderEvSpa: clamp(toNumber($('defender-ev-spa')?.value), 0, 32),
    defenderEvSpd: clamp(toNumber($('defender-ev-spd').value), 0, 32),
    defenderEvSpe: clamp(toNumber($('defender-ev-spe')?.value), 0, 32),
    defenderRankHp: 0,
    defenderRankAtk: clamp(toNumber($('defender-rank-atk')?.value), -6, 6),
    defenderRankDef: clamp(toNumber($('defender-rank-def').value), -6, 6),
    defenderRankSpa: clamp(toNumber($('defender-rank-spa')?.value), -6, 6),
    defenderRankSpd: clamp(toNumber($('defender-rank-spd').value), -6, 6),
    defenderRankSpe: clamp(toNumber($('defender-rank-spe').value), -6, 6),
    defenderNaturePlusStats: defenderNatureOverride.plusStats,
    defenderNatureMinusStats: defenderNatureOverride.minusStats,
    moveId: $('move-select').value,
    moveType: $('move-type').value,
    moveCategory: $('move-category').value,
    movePower: clamp(toNumber($('move-power').value), 0, 400),
    moveParamValue: clamp(toNumber($('move-parameter-value')?.value, 0), 0, 99),
    weather: getActiveToggleValue('weather'),
    terrain: getActiveToggleValue('terrain'),
    isCrit: $('is-crit').checked,
    isBurn: $('is-burn').checked,
    isSpread: $('is-spread').checked,
    isHelpingHand: Boolean($('is-helping-hand')?.checked),
    reflect: $('reflect').checked,
    lightScreen: $('light-screen').checked,
    defenderFullHp: $('defender-full-hp').checked,
    isFriendGuard: Boolean($('is-friend-guard')?.checked),
    hitCount: clamp(toNumber($('hit-count').value, 1), 1, 10),
  };
}

function calculateDamageRange(input) {
  const dict = I18N[state.lang];
  const notes = [];
  const appliedModifiers = [];
  const attackerModifiers = [];
  const defenderModifiers = [];
  const move = state.movesById.get(input.moveId);
  const attackerSpecies = getEffectiveSpecies(input.attackerSpeciesId, input.attackerMegaEnabled, input.attackerItemId);
  const defenderSpecies = getEffectiveSpecies(input.defenderSpeciesId, input.defenderMegaEnabled, input.defenderItemId);
  if (!move || !attackerSpecies || !defenderSpecies) throw new Error(dict.invalidError);
  const power = resolveMovePower(input, move);
  if (input.moveCategory === 'Status') return { min: 0, max: 0, notes: [dict.statusMoveError], hitCount: input.hitCount, move, defenderHp: 1, rolls: [], power, typeMultiplier: 1, appliedModifiers, attackerModifiers, defenderModifiers };
  if (power <= 0) return { min: 0, max: 0, notes: [dict.noDamageError], hitCount: input.hitCount, move, defenderHp: 1, rolls: [], power, typeMultiplier: 1, appliedModifiers, attackerModifiers, defenderModifiers };

  const attackerNature = getNatureById(input.attackerNature);
  const defenderNature = getNatureById(input.defenderNature);
  const attackerAtk = applyStageToStat(calcSingleStat(attackerSpecies.baseStats.atk, input.attackerEvAtk, getNatureMultiplierWithOverrides(attackerNature, 'atk', input.attackerNaturePlusStats, input.attackerNatureMinusStats)), input.attackerRankAtk);
  const attackerSpa = applyStageToStat(calcSingleStat(attackerSpecies.baseStats.spa, input.attackerEvSpa, getNatureMultiplierWithOverrides(attackerNature, 'spa', input.attackerNaturePlusStats, input.attackerNatureMinusStats)), input.attackerRankSpa);
  const defenderAtk = applyStageToStat(calcSingleStat(defenderSpecies.baseStats.atk, input.defenderEvAtk, getNatureMultiplierWithOverrides(defenderNature, 'atk', input.defenderNaturePlusStats, input.defenderNatureMinusStats)), input.defenderRankAtk);
  const defenderDef = applyStageToStat(calcSingleStat(defenderSpecies.baseStats.def, input.defenderEvDef, getNatureMultiplierWithOverrides(defenderNature, 'def', input.defenderNaturePlusStats, input.defenderNatureMinusStats)), input.defenderRankDef);
  const defenderSpd = applyStageToStat(calcSingleStat(defenderSpecies.baseStats.spd, input.defenderEvSpd, getNatureMultiplierWithOverrides(defenderNature, 'spd', input.defenderNaturePlusStats, input.defenderNatureMinusStats)), input.defenderRankSpd);
  const defenderHp = calcHpStat(defenderSpecies.baseStats.hp, input.defenderEvHp);

  let attackStat = input.moveCategory === 'Physical' ? attackerAtk : attackerSpa;
  let defenseStat = input.moveCategory === 'Physical' ? defenderDef : defenderSpd;
  if (move.id === 'bodypress') attackStat = defenderDef;
  if (move.id === 'foulplay') attackStat = defenderAtk;
  if (['psyshock', 'psystrike', 'secretsword'].includes(move.id)) defenseStat = defenderDef;

  const attackerAbilityId = resolveAbilityIdForSpecies(attackerSpecies, input.attackerAbilityId);
  const defenderAbilityId = resolveAbilityIdForSpecies(defenderSpecies, input.defenderAbilityId);
  if (input.attackerMegaEnabled) notes.push(dict.megaEvolution);
  if (input.defenderMegaEnabled) notes.push(dict.megaEvolution);

  if (input.moveCategory === 'Physical' && hasAbility(attackerAbilityId, ['Huge Power', 'Pure Power'])) attackStat *= 2;
  if (input.moveCategory === 'Physical' && hasAbility(attackerAbilityId, ['Hustle'])) attackStat = Math.floor(attackStat * 1.5);
  if (input.moveCategory === 'Special' && hasAbility(attackerAbilityId, ['Solar Power']) && input.weather === 'sun') attackStat = Math.floor(attackStat * 1.5);
  if (input.moveCategory === 'Physical' && hasAbility(attackerAbilityId, ['Guts']) && input.isBurn) attackStat = Math.floor(attackStat * 1.5);
  if (input.moveCategory === 'Physical' && input.attackerItemId === 'choiceband') attackStat = Math.floor(attackStat * 1.5);
  if (input.moveCategory === 'Special' && input.attackerItemId === 'choicespecs') attackStat = Math.floor(attackStat * 1.5);
  if (input.moveCategory === 'Special' && input.defenderItemId === 'assaultvest') defenseStat = Math.floor(defenseStat * 1.5);
  if (input.moveCategory === 'Physical' && hasAbility(defenderAbilityId, ['Fur Coat'])) defenseStat *= 2;
  if (input.defenderItemId === 'eviolite' && defenderSpecies.nfe) defenseStat = Math.floor(defenseStat * 1.5);

  const defenderTypes = defenderSpecies.types;
  const attackerTypes = attackerSpecies.types;
  if (move.type === 'Ground' && hasAbility(defenderAbilityId, ['Levitate'])) return { min: 0, max: 0, notes: [dict.levitateImmunity], hitCount: input.hitCount, move, defenderHp, rolls: [], power, typeMultiplier: 0, attackStatUsed: attackStat, defenseStatUsed: defenseStat, attackerAbilityId, defenderAbilityId, appliedModifiers, attackerModifiers, defenderModifiers };
  if (move.type === 'Fire' && hasAbility(defenderAbilityId, ['Flash Fire'])) return { min: 0, max: 0, notes: [dict.flashFireImmunity], hitCount: input.hitCount, move, defenderHp, rolls: [], power, typeMultiplier: 0, attackStatUsed: attackStat, defenseStatUsed: defenseStat, attackerAbilityId, defenderAbilityId, appliedModifiers, attackerModifiers, defenderModifiers };
  if (move.type === 'Water' && hasAbility(defenderAbilityId, ['Water Absorb', 'Storm Drain', 'Dry Skin'])) return { min: 0, max: 0, notes: [dict.waterImmunity], hitCount: input.hitCount, move, defenderHp, rolls: [], power, typeMultiplier: 0, attackStatUsed: attackStat, defenseStatUsed: defenseStat, attackerAbilityId, defenderAbilityId, appliedModifiers, attackerModifiers, defenderModifiers };
  if (move.type === 'Electric' && hasAbility(defenderAbilityId, ['Volt Absorb', 'Lightning Rod', 'Motor Drive'])) return { min: 0, max: 0, notes: [dict.electricImmunity], hitCount: input.hitCount, move, defenderHp, rolls: [], power, typeMultiplier: 0, attackStatUsed: attackStat, defenseStatUsed: defenseStat, attackerAbilityId, defenderAbilityId, appliedModifiers, attackerModifiers, defenderModifiers };
  if (move.type === 'Grass' && hasAbility(defenderAbilityId, ['Sap Sipper'])) return { min: 0, max: 0, notes: [dict.grassImmunity], hitCount: input.hitCount, move, defenderHp, rolls: [], power, typeMultiplier: 0, attackStatUsed: attackStat, defenseStatUsed: defenseStat, attackerAbilityId, defenderAbilityId, appliedModifiers, attackerModifiers, defenderModifiers };

  const typeMultiplier = getTypeMultiplier(move.type, defenderTypes);
  if (typeMultiplier === 0) return { min: 0, max: 0, notes: [dict.typeImmunity], hitCount: input.hitCount, move, defenderHp, rolls: [], power, typeMultiplier: 0, attackStatUsed: attackStat, defenseStatUsed: defenseStat, attackerAbilityId, defenderAbilityId, appliedModifiers, attackerModifiers, defenderModifiers };
  const stab = getStabMultiplier(move.type, attackerTypes, hasAbility(attackerAbilityId, ['Adaptability']));
  const weatherMultiplier = input.weather === 'sun' ? (move.type === 'Fire' ? 1.5 : (move.type === 'Water' ? 0.5 : 1)) : (input.weather === 'rain' ? (move.type === 'Water' ? 1.5 : (move.type === 'Fire' ? 0.5 : 1)) : 1);
  const terrainMultiplier = input.terrain === 'electric' && move.type === 'Electric' ? 1.3 : input.terrain === 'grassy' && move.type === 'Grass' ? 1.3 : input.terrain === 'psychic' && move.type === 'Psychic' ? 1.3 : input.terrain === 'misty' && move.type === 'Dragon' ? 0.5 : 1;
  let movePowerMultiplier = 1;
  if (hasAbility(attackerAbilityId, ['Technician']) && power <= 60) movePowerMultiplier *= 1.5;
  if (input.terrain === 'grassy' && ['earthquake', 'bulldoze', 'magnitude'].includes(move.id)) movePowerMultiplier *= 0.5;
  const critMultiplier = input.isCrit ? 1.5 : 1;
  const spreadMultiplier = input.isSpread ? 0.75 : 1;
  const helpingHandMultiplier = input.isHelpingHand ? 1.5 : 1;
  let screenMultiplier = 1;
  if (!input.isCrit) {
    if (input.moveCategory === 'Physical' && input.reflect) screenMultiplier *= 0.5;
    if (input.moveCategory === 'Special' && input.lightScreen) screenMultiplier *= 0.5;
  }
  let burnMultiplier = 1;
  if (input.isBurn && input.moveCategory === 'Physical' && !hasAbility(attackerAbilityId, ['Guts'])) burnMultiplier = 0.5;
  if (input.weather === 'sand' && defenderTypes.includes('Rock') && input.moveCategory === 'Special') defenseStat = Math.floor(defenseStat * 1.5);
  if (input.weather === 'snow' && defenderTypes.includes('Ice') && input.moveCategory === 'Physical') defenseStat = Math.floor(defenseStat * 1.5);
  const multiscaleMultiplier = input.defenderFullHp && hasAbility(defenderAbilityId, ['Multiscale', 'Shadow Shield']) ? 0.5 : 1;
  const friendGuardMultiplier = input.isFriendGuard ? 0.75 : 1;

  if (spreadMultiplier !== 1) {
    appliedModifiers.push(t('spreadMove'));
    attackerModifiers.push(t('spreadMove'));
  }
  if (helpingHandMultiplier !== 1) {
    appliedModifiers.push(t('helpingHand'));
    attackerModifiers.push(t('helpingHand'));
  }
  if (critMultiplier !== 1) {
    appliedModifiers.push(t('critical'));
    attackerModifiers.push(t('critical'));
  }
  if (burnMultiplier !== 1) {
    appliedModifiers.push(t('burn'));
    attackerModifiers.push(t('burn'));
  }
  if (screenMultiplier !== 1) {
    const screenLabel = input.moveCategory === 'Physical' ? t('reflect') : t('lightScreen');
    appliedModifiers.push(screenLabel);
    defenderModifiers.push(screenLabel);
  }
  if (friendGuardMultiplier !== 1) {
    appliedModifiers.push(t('friendGuard'));
    defenderModifiers.push(t('friendGuard'));
  }
  if (multiscaleMultiplier !== 1) {
    appliedModifiers.push(t('defenderFullHp'));
    defenderModifiers.push(t('defenderFullHp'));
  }
  if (weatherMultiplier !== 1) {
    const weatherText = `${t('weather')}:${t(input.weather)}`;
    appliedModifiers.push(weatherText);
    attackerModifiers.push(weatherText);
  }
  if (terrainMultiplier !== 1) {
    const terrainKey = input.terrain === 'electric'
      ? 'electricTerrain'
      : (input.terrain === 'grassy'
        ? 'grassyTerrain'
        : (input.terrain === 'psychic' ? 'psychicTerrain' : 'mistyTerrain'));
    const terrainText = `${t('terrain')}:${t(terrainKey)}`;
    appliedModifiers.push(terrainText);
    attackerModifiers.push(terrainText);
  }

  const level = 50;
  const preModifier = Math.floor(Math.floor(Math.floor(((2 * level) / 5 + 2) * power * movePowerMultiplier * attackStat / Math.max(1, defenseStat)) / 50) + 2);
  const constantModifier = stab * typeMultiplier * weatherMultiplier * terrainMultiplier * critMultiplier * spreadMultiplier * helpingHandMultiplier * burnMultiplier * screenMultiplier * multiscaleMultiplier * friendGuardMultiplier;
  const itemBoost = getOffensiveItemDamageModifier(input.attackerItemId, input.moveCategory, move.type, typeMultiplier);
  const itemMultiplier = itemBoost.multiplier;
  if (itemBoost.multiplier !== 1) {
    const atkItem = state.itemsById.get(input.attackerItemId);
    const itemText = state.lang === 'ja' ? (atkItem?.nameJa || ITEM_NAME_JA_FALLBACK[input.attackerItemId] || itemBoost.label) : (atkItem?.name || itemBoost.label);
    appliedModifiers.push(itemText);
    attackerModifiers.push(itemText);
  }
  const hitCount = clamp(input.hitCount, 1, 10);
  const resolvePerHitPower = hitIndex => {
    if (move.id === 'tripleaxel') {
      const tiers = [20, 40, 60];
      return tiers[Math.min(hitIndex, tiers.length - 1)];
    }
    return power;
  };
  const calcPerHitBase = hitPower => Math.floor(Math.floor(Math.floor(((2 * level) / 5 + 2) * hitPower * movePowerMultiplier * attackStat / Math.max(1, defenseStat)) / 50) + 2);
  const rolls = [];
  for (let roll = 85; roll <= 100; roll += 1) {
    let total = 0;
    for (let hit = 0; hit < hitCount; hit += 1) {
      const hitPower = resolvePerHitPower(hit);
      const perHitBase = move.id === 'tripleaxel' ? calcPerHitBase(hitPower) : preModifier;
      total += Math.max(1, Math.floor(perHitBase * constantModifier * itemMultiplier * (roll / 100)));
    }
    rolls.push(total);
  }
  const min = rolls[0];
  const max = rolls[rolls.length - 1];
  let recoil = null;
  let recovery = null;
  if (Array.isArray(move.recoil) && move.recoil.length >= 2) recoil = { min: Math.floor(min * move.recoil[0] / move.recoil[1]), max: Math.floor(max * move.recoil[0] / move.recoil[1]) };
  if (input.attackerItemId === 'lifeorb') {
    const lifeOrbRecoil = { min: Math.floor(min / 10), max: Math.floor(max / 10) };
    recoil = recoil ? { min: recoil.min + lifeOrbRecoil.min, max: recoil.max + lifeOrbRecoil.max } : lifeOrbRecoil;
  }
  if (Array.isArray(move.drain) && move.drain.length >= 2) recovery = { min: Math.floor(min * move.drain[0] / move.drain[1]), max: Math.floor(max * move.drain[0] / move.drain[1]) };
  return { min, max, defenderHp, recoil, recovery, hitCount, notes, rolls, move, power, typeMultiplier, attackStatUsed: attackStat, defenseStatUsed: defenseStat, attackerAbilityId, defenderAbilityId, appliedModifiers, attackerModifiers, defenderModifiers };
}

function renderResult(result, input = null) {
  const forEachResultNode = (baseId, callback) => {
    [$(baseId), $(`${baseId}-mobile`)].filter(Boolean).forEach(callback);
  };
  const renderResultModifierIcons = (mods, kind, excluded = new Set()) => {
    const iconMap = {
      [t('spreadMove')]: { icon: 'bi-people-fill', short: '全' },
      [t('helpingHand')]: { icon: 'bi-hand-index-thumb-fill', short: '手' },
      [t('critical')]: { icon: 'bi-bullseye', short: '急' },
      [t('burn')]: { icon: 'bi-fire', short: '火' },
      [t('reflect')]: { icon: 'bi-shield-fill', short: '壁' },
      [t('lightScreen')]: { icon: 'bi-shield-fill', short: '壁' },
      [t('friendGuard')]: { icon: 'bi-person-hearts', short: '友' },
      [t('defenderFullHp')]: { icon: 'bi-heart-fill', short: '満' },
    };
    return (Array.isArray(mods) ? mods : [])
      .filter(mod => mod && !excluded.has(mod))
      .map(mod => {
        const weatherPrefix = `${t('weather')}:`;
        const terrainPrefix = `${t('terrain')}:`;
        let mapped = iconMap[mod] || null;
        if (!mapped && mod.startsWith(weatherPrefix)) mapped = { icon: 'bi-cloud-sun-fill', short: '天' };
        if (!mapped && mod.startsWith(terrainPrefix)) mapped = { icon: 'bi-globe2', short: '地' };
        if (!mapped && mod.startsWith('R:')) mapped = { icon: 'bi-graph-up-arrow', short: 'R' };
        if (!mapped) {
          return `<span class="result-mod-icon ${kind}" title="${escapeHtml(mod)}">${escapeHtml(mod.slice(0, 1))}</span>`;
        }
        return `<span class="result-mod-icon ${kind}" title="${escapeHtml(mod)}"><i class="bi ${mapped.icon}" aria-hidden="true"></i></span>`;
      })
      .join('');
  };
  const renderImpactItem = itemId => itemId ? renderItemVisual(itemId) : '';
  const formatKoSummary = (rolls, defenderHp, hitCount, koRate) => {
    if (!Array.isArray(rolls) || !rolls.length || !defenderHp) return '-';

    if (koRate >= 100) return state.lang === 'ja' ? '確定1発' : 'Guaranteed OHKO';
    if (koRate > 0) return state.lang === 'ja' ? `${koRate.toFixed(1)}%で1発` : `${koRate.toFixed(1)}% to OHKO`;

    const minRoll = Math.min(...rolls);
    const maxRoll = Math.max(...rolls);
    if (minRoll <= 0 || maxRoll <= 0) return '-';

    const fastestHits = Math.max(1, Math.ceil(defenderHp / maxRoll));
    const guaranteedHits = Math.max(fastestHits, Math.ceil(defenderHp / minRoll));
    if (fastestHits === guaranteedHits) {
      return state.lang === 'ja' ? `確定${guaranteedHits}発` : `Guaranteed ${guaranteedHits}HKO`;
    }
    if (state.lang === 'ja') {
      return `乱数${fastestHits}発`;
    }
    return `Possible ${fastestHits}HKO`;
  };

  const minPct = result.defenderHp ? (result.min / result.defenderHp) * 100 : 0;
  const maxPct = result.defenderHp ? (result.max / result.defenderHp) * 100 : 0;
  const getDamageClassByRatio = ratio => {
    if (ratio >= 1) return 'result-dmg-deep-red';
    if (ratio >= 0.8) return 'result-dmg-red';
    if (ratio >= 0.5) return 'result-dmg-yellow';
    return 'result-dmg-green';
  };

  if (!input || !hasCalcPage()) {
    forEachResultNode('result-main', node => { node.textContent = '-'; });
    forEachResultNode('result-extra', node => { node.textContent = '-'; });
    forEachResultNode('result-stab-effect', node => { node.textContent = '-'; node.classList.remove('is-on', 'is-off'); });
    ['result-attacker-item-impact', 'result-defender-item-impact', 'result-attacker-modifiers', 'result-defender-modifiers', 'result-move-item-impact', 'result-move-modifiers'].forEach(id => {
      forEachResultNode(id, node => { node.innerHTML = ''; });
    });
    return;
  }

  const move = result.move || state.movesById.get(input.moveId);
  const attackerSpecies = getEffectiveSpecies(input.attackerSpeciesId, input.attackerMegaEnabled, input.attackerItemId);
  const defenderSpecies = getEffectiveSpecies(input.defenderSpeciesId, input.defenderMegaEnabled, input.defenderItemId);
  const attackerTypes = attackerSpecies?.types || [];
  const attackerStab = getStabMultiplier(input.moveType, attackerTypes, hasAbility(result.attackerAbilityId, ['Adaptability']));
  const attackerImpactItemBoost = getOffensiveItemDamageModifier(input.attackerItemId, input.moveCategory, input.moveType, Number(result.typeMultiplier || 0));
  const attackerItemAffectsDamage = Boolean(
    input.attackerItemId && (
      attackerImpactItemBoost.multiplier !== 1
      || (input.moveCategory === 'Physical' && input.attackerItemId === 'choiceband')
      || (input.moveCategory === 'Special' && input.attackerItemId === 'choicespecs')
    )
  );
  const defenderItemAffectsDamage = Boolean(
    input.defenderItemId && (
      (input.moveCategory === 'Special' && input.defenderItemId === 'assaultvest')
      || (input.defenderItemId === 'eviolite' && defenderSpecies?.nfe)
    )
  );
  forEachResultNode('result-attacker-icons', node => {
    node.innerHTML = renderPokemonOnlyIcon(input.attackerSpeciesId, input.attackerMegaEnabled, input.attackerItemId);
  });
  forEachResultNode('result-defender-icons', node => {
    node.innerHTML = renderPokemonOnlyIcon(input.defenderSpeciesId, input.defenderMegaEnabled, input.defenderItemId);
  });

  const atkLabel = input.moveCategory === 'Special' ? 'C' : 'A';
  const defLabel = input.moveCategory === 'Special' ? 'D' : 'B';
  const attackerMods = Array.isArray(result.attackerModifiers) ? result.attackerModifiers : [];
  const defenderMods = Array.isArray(result.defenderModifiers) ? result.defenderModifiers : [];
  const weatherPrefix = `${t('weather')}:`;
  const terrainPrefix = `${t('terrain')}:`;
  const isWeatherOrTerrainMod = mod => String(mod || '').startsWith(weatherPrefix) || String(mod || '').startsWith(terrainPrefix);
  const moveRelatedMods = new Set([t('spreadMove'), t('helpingHand'), t('critical'), t('burn')]);
  const moveRowMods = attackerMods.filter(mod => moveRelatedMods.has(mod));
  const attackerPokemonRowMods = attackerMods.filter(mod => isWeatherOrTerrainMod(mod));
  const defenderPokemonRowMods = defenderMods.slice();
  const buildRankBadgeText = (label, value) => {
    const numeric = clamp(toNumber(value), -6, 6);
    if (!numeric) return '';
    const sign = numeric > 0 ? `+${numeric}` : `${numeric}`;
    return `R:${label}${sign}`;
  };
  const attackerRankBadgeMods = [
    buildRankBadgeText('A', input.attackerRankAtk),
    buildRankBadgeText('B', input.attackerRankDef),
    buildRankBadgeText('C', input.attackerRankSpa),
    buildRankBadgeText('D', input.attackerRankSpd),
    buildRankBadgeText('S', input.attackerRankSpe),
  ].filter(Boolean);
  const defenderRankBadgeMods = [
    buildRankBadgeText('A', input.defenderRankAtk),
    buildRankBadgeText('B', input.defenderRankDef),
    buildRankBadgeText('C', input.defenderRankSpa),
    buildRankBadgeText('D', input.defenderRankSpd),
    buildRankBadgeText('S', input.defenderRankSpe),
  ].filter(Boolean);
  attackerPokemonRowMods.push(...attackerRankBadgeMods);
  defenderPokemonRowMods.push(...defenderRankBadgeMods);
  if (input.reflect && input.moveCategory === 'Physical' && !defenderPokemonRowMods.includes(t('reflect'))) defenderPokemonRowMods.push(t('reflect'));
  if (input.lightScreen && input.moveCategory === 'Special' && !defenderPokemonRowMods.includes(t('lightScreen'))) defenderPokemonRowMods.push(t('lightScreen'));
  if (input.isFriendGuard && !defenderPokemonRowMods.includes(t('friendGuard'))) defenderPokemonRowMods.push(t('friendGuard'));
  forEachResultNode('result-attacker-meta', node => {
    node.textContent = `${atkLabel}${toNumber(result.attackStatUsed)}`;
  });
  forEachResultNode('result-defender-meta', node => {
    node.textContent = `HP${toNumber(result.defenderHp)} / ${defLabel}${toNumber(result.defenseStatUsed)}`;
  });
  const excludedAttackerMods = new Set();
  if (attackerItemAffectsDamage) {
    const atkItem = state.itemsById.get(input.attackerItemId);
    const itemLabel = state.lang === 'ja'
      ? (atkItem?.nameJa || ITEM_NAME_JA_FALLBACK[input.attackerItemId] || attackerImpactItemBoost.label)
      : (atkItem?.name || attackerImpactItemBoost.label);
    if (itemLabel) excludedAttackerMods.add(itemLabel);
  }
  forEachResultNode('result-attacker-item-impact', node => {
    node.innerHTML = '';
  });
  forEachResultNode('result-defender-item-impact', node => {
    node.innerHTML = defenderItemAffectsDamage ? renderImpactItem(input.defenderItemId) : '';
  });
  forEachResultNode('result-move-item-impact', node => {
    node.innerHTML = attackerItemAffectsDamage ? renderImpactItem(input.attackerItemId) : '';
  });
  forEachResultNode('result-move-modifiers', node => {
    node.innerHTML = renderResultModifierIcons(moveRowMods, 'positive', excludedAttackerMods);
  });
  forEachResultNode('result-attacker-modifiers', node => {
    node.innerHTML = renderResultModifierIcons(attackerPokemonRowMods, 'positive', excludedAttackerMods);
  });
  forEachResultNode('result-defender-modifiers', node => {
    node.innerHTML = renderResultModifierIcons(defenderPokemonRowMods, 'negative');
  });

  const moveName = move ? displayEntryName(move) : '-';
  const moveTypeName = state.lang === 'ja'
    ? ((state.data.types || []).find(type => type.name === input.moveType)?.nameJa || input.moveType || '-')
    : (input.moveType || '-');
  const categoryName = state.lang === 'ja'
    ? ({ Physical: '物理', Special: '特殊', Status: '変化' }[input.moveCategory] || input.moveCategory || '-')
    : (input.moveCategory || '-');
  const powerLabel = state.lang === 'ja' ? '威力' : 'Power';
  forEachResultNode('result-move', node => { node.textContent = moveName; });
  forEachResultNode('result-move-meta', node => {
    node.innerHTML = `<span>${escapeHtml(moveTypeName)}</span><span class="result-move-meta-sep">/</span><span>${escapeHtml(categoryName)}</span><span class="result-move-meta-sep">/</span><span class="result-move-power mono">${escapeHtml(powerLabel)} ${toNumber(result.power)}</span>`;
  });
  forEachResultNode('result-stab-effect', node => {
    node.classList.toggle('is-on', attackerStab > 1);
    node.classList.toggle('is-off', !(attackerStab > 1));
    node.textContent = attackerStab > 1
      ? (state.lang === 'ja' ? `一致 x${attackerStab}` : `STAB x${attackerStab}`)
      : (state.lang === 'ja' ? '一致なし' : 'No STAB');
  });

  let typeLabel = state.lang === 'ja' ? '等倍' : 'Neutral';
  let typeLevel = 'neutral';
  let typeIconClass = 'bi-record-circle';
  const multiplier = Number(result.typeMultiplier || 0);
  if (multiplier === 0) {
    typeLabel = state.lang === 'ja' ? '無効 x0' : 'Immune x0';
    typeLevel = 'immune';
    typeIconClass = 'bi-slash-circle-fill';
  } else if (multiplier > 1) {
    typeLabel = state.lang === 'ja' ? `弱点 x${multiplier}` : `Super x${multiplier}`;
    typeLevel = 'super';
    typeIconClass = 'bi-exclamation-diamond-fill';
  } else if (multiplier < 1) {
    typeLabel = state.lang === 'ja' ? `半減 x${multiplier}` : `Resist x${multiplier}`;
    typeLevel = 'resist';
    typeIconClass = 'bi-shield-fill-minus';
  }
  forEachResultNode('result-type-effect', node => {
    node.textContent = typeLabel;
    node.dataset.level = typeLevel;
  });

  forEachResultNode('result-main', node => {
    node.innerHTML = `${result.min} <span class="result-percent">(${minPct.toFixed(1)}%)</span> ~ ${result.max} <span class="result-percent">(${maxPct.toFixed(1)}%)</span>`;
    node.classList.remove('result-dmg-green', 'result-dmg-yellow', 'result-dmg-red', 'result-dmg-deep-red');
    node.classList.add(getDamageClassByRatio(maxPct / 100));
  });

  const rolls = Array.isArray(result.rolls) ? result.rolls : [];
  const koCount = rolls.filter(value => value >= (result.defenderHp || Infinity)).length;
  const koRate = rolls.length ? (koCount / rolls.length) * 100 : 0;
  const koSummary = formatKoSummary(rolls, result.defenderHp, result.hitCount, koRate);
  forEachResultNode('result-ko-rate', node => { node.textContent = koSummary; });

  let colorClass = 'green';
  if (koRate >= 100) colorClass = 'red';
  else if (koRate >= 50) colorClass = 'yellow';
  forEachResultNode('result-random-bar', node => {
    node.innerHTML = `<span class="result-ko-fill ${colorClass}" style="width:${Math.max(0, Math.min(100, koRate))}%"></span>`;
  });

  forEachResultNode('result-extra', node => {
    if (!rolls.length) {
      node.textContent = '-';
      return;
    }
    const pills = rolls.map(value => {
      const ratio = result.defenderHp ? (value / result.defenderHp) : 0;
      const cls = getDamageClassByRatio(ratio);
      return `<span class="result-random-pill ${cls}">${value}</span>`;
    }).join('');
    node.innerHTML = pills;
  });
}

function calculateAndRender() {
  if (!hasCalcPage()) return;
  try {
    const input = collectInput();
    renderResult(calculateDamageRange(input), input);
    saveLastSelectedSides();
    const currentDetail = getCurrentDetailPokemon();
    if (currentDetail && state.detail.modal && $('pokemon-detail-modal')?.classList.contains('show')) renderDetailCalcHistory(currentDetail);
  } catch (_error) {
    renderResult({ min: 0, max: 0, defenderHp: 1, hitCount: 1, notes: [I18N[state.lang].invalidError], rolls: [], typeMultiplier: 1 }, collectInput());
  }
}

function apply11nHighlight(side, plusStats, stats) {
  const statToNode = { atk: `${side}-inline-atk`, def: `${side}-inline-def`, spa: `${side}-inline-spa`, spd: `${side}-inline-spd`, spe: `${side}-inline-spe` };
  Object.entries(statToNode).forEach(([stat, nodeId]) => {
    const node = $(nodeId);
    if (!node) return;
    const boosted = Array.isArray(plusStats) && plusStats.includes(stat);
    const value = toNumber(stats[stat]);
    node.classList.toggle('stat-11n-highlight', Boolean(boosted && value > 0 && value % 11 === 0));
  });
}

function getModifierStateFromButtons(prefix) {
  const plusStats = [];
  const minusStats = [];
  document.querySelectorAll(`.stat-mod-cycle-btn[data-side="${prefix}"]`).forEach(button => {
    const stat = button.dataset.stat;
    const stateValue = button.dataset.state || 'neutral';
    if (!stat || stat === 'hp') return;
    if (stateValue === 'plus') plusStats.push(stat);
    if (stateValue === 'minus') minusStats.push(stat);
  });
  const validNone = plusStats.length === 0 && minusStats.length === 0;
  const validSingle = plusStats.length === 1 && minusStats.length === 1 && plusStats[0] !== minusStats[0];
  return { plusStats, minusStats, valid: validNone || validSingle };
}

function applyDetail11nHighlight(plusStats, stats) {
  const statToNode = {
    atk: 'detail-stat-atk',
    def: 'detail-stat-def',
    spa: 'detail-stat-spa',
    spd: 'detail-stat-spd',
    spe: 'detail-stat-spe',
  };
  Object.entries(statToNode).forEach(([stat, nodeId]) => {
    const node = $(nodeId);
    const evNode = $(`detail-ev-${stat}`);
    if (!node) return;
    node.classList.remove('stat-11n-highlight');
    if (evNode) evNode.classList.remove('stat-11n-highlight');
  });

  document.querySelectorAll('.stat-mod-cycle-btn[data-side="detail"]').forEach(button => {
    const stat = button.dataset.stat;
    if (!stat || stat === 'hp') return;
    const stateValue = button.dataset.state || 'neutral';
    button.classList.remove('stat-11n-highlight');
    button.dataset.state = stateValue;
  });
}

function updateStatSummaries() {
  if (!hasCalcPage()) return;
  const attackerSpecies = getEffectiveSpecies($('attacker-species').value, $('attacker-mega-enabled').checked, $('attacker-item').value);
  const defenderSpecies = getEffectiveSpecies($('defender-species').value, $('defender-mega-enabled').checked, $('defender-item').value);
  if (!attackerSpecies || !defenderSpecies) return;
  const attackerNature = getNatureById($('attacker-nature').value);
  const defenderNature = getNatureById($('defender-nature').value);
  const attackerNatureOverride = getSideNatureOverridesFromButtons('attacker');
  const defenderNatureOverride = getSideNatureOverridesFromButtons('defender');
  const attacker = {
    hp: calcHpStat(attackerSpecies.baseStats.hp, clamp(toNumber($('attacker-ev-hp')?.value), 0, 32)),
    atk: calcSingleStat(attackerSpecies.baseStats.atk, clamp(toNumber($('attacker-ev-atk').value), 0, 32), getNatureMultiplierWithOverrides(attackerNature, 'atk', attackerNatureOverride.plusStats, attackerNatureOverride.minusStats)),
    def: calcSingleStat(attackerSpecies.baseStats.def, clamp(toNumber($('attacker-ev-def')?.value), 0, 32), getNatureMultiplierWithOverrides(attackerNature, 'def', attackerNatureOverride.plusStats, attackerNatureOverride.minusStats)),
    spa: calcSingleStat(attackerSpecies.baseStats.spa, clamp(toNumber($('attacker-ev-spa').value), 0, 32), getNatureMultiplierWithOverrides(attackerNature, 'spa', attackerNatureOverride.plusStats, attackerNatureOverride.minusStats)),
    spd: calcSingleStat(attackerSpecies.baseStats.spd, clamp(toNumber($('attacker-ev-spd')?.value), 0, 32), getNatureMultiplierWithOverrides(attackerNature, 'spd', attackerNatureOverride.plusStats, attackerNatureOverride.minusStats)),
    spe: calcSingleStat(attackerSpecies.baseStats.spe, clamp(toNumber($('attacker-ev-spe')?.value), 0, 32), getNatureMultiplierWithOverrides(attackerNature, 'spe', attackerNatureOverride.plusStats, attackerNatureOverride.minusStats)),
  };
  const defender = {
    hp: calcHpStat(defenderSpecies.baseStats.hp, clamp(toNumber($('defender-ev-hp').value), 0, 32)),
    atk: calcSingleStat(defenderSpecies.baseStats.atk, clamp(toNumber($('defender-ev-atk')?.value), 0, 32), getNatureMultiplierWithOverrides(defenderNature, 'atk', defenderNatureOverride.plusStats, defenderNatureOverride.minusStats)),
    def: calcSingleStat(defenderSpecies.baseStats.def, clamp(toNumber($('defender-ev-def').value), 0, 32), getNatureMultiplierWithOverrides(defenderNature, 'def', defenderNatureOverride.plusStats, defenderNatureOverride.minusStats)),
    spa: calcSingleStat(defenderSpecies.baseStats.spa, clamp(toNumber($('defender-ev-spa')?.value), 0, 32), getNatureMultiplierWithOverrides(defenderNature, 'spa', defenderNatureOverride.plusStats, defenderNatureOverride.minusStats)),
    spd: calcSingleStat(defenderSpecies.baseStats.spd, clamp(toNumber($('defender-ev-spd').value), 0, 32), getNatureMultiplierWithOverrides(defenderNature, 'spd', defenderNatureOverride.plusStats, defenderNatureOverride.minusStats)),
    spe: calcSingleStat(defenderSpecies.baseStats.spe, clamp(toNumber($('defender-ev-spe')?.value), 0, 32), getNatureMultiplierWithOverrides(defenderNature, 'spe', defenderNatureOverride.plusStats, defenderNatureOverride.minusStats)),
  };
  if ($('attacker-inline-hp')) $('attacker-inline-hp').textContent = String(attacker.hp);
  if ($('attacker-inline-atk')) $('attacker-inline-atk').textContent = String(attacker.atk);
  if ($('attacker-inline-def')) $('attacker-inline-def').textContent = String(attacker.def);
  if ($('attacker-inline-spa')) $('attacker-inline-spa').textContent = String(attacker.spa);
  if ($('attacker-inline-spd')) $('attacker-inline-spd').textContent = String(attacker.spd);
  if ($('attacker-inline-spe')) $('attacker-inline-spe').textContent = String(attacker.spe);
  if ($('defender-inline-hp')) $('defender-inline-hp').textContent = String(defender.hp);
  if ($('defender-inline-atk')) $('defender-inline-atk').textContent = String(defender.atk);
  if ($('defender-inline-def')) $('defender-inline-def').textContent = String(defender.def);
  if ($('defender-inline-spa')) $('defender-inline-spa').textContent = String(defender.spa);
  if ($('defender-inline-spd')) $('defender-inline-spd').textContent = String(defender.spd);
  if ($('defender-inline-spe')) $('defender-inline-spe').textContent = String(defender.spe);
  apply11nHighlight('attacker', attackerNatureOverride.plusStats, attacker);
  apply11nHighlight('defender', defenderNatureOverride.plusStats, defender);
  if ($('attacker-stats-summary')) $('attacker-stats-summary').textContent = `H${attacker.hp} A${attacker.atk} B${attacker.def} C${attacker.spa} D${attacker.spd} S${attacker.spe}`;
  if ($('defender-stats-summary')) $('defender-stats-summary').textContent = `H${defender.hp} A${defender.atk} B${defender.def} C${defender.spa} D${defender.spd} S${defender.spe}`;
}

function updateDetailStatSummaries() {
  if (!$('detail-species')) return;
  applyNatureFromModifierSelectors('detail');
  const detailModifierState = getModifierStateFromButtons('detail');
  const detailNatureOverride = getSideNatureOverridesFromButtons('detail');
  const species = getEffectiveSpecies($('detail-species').value, $('detail-mega-enabled')?.checked, $('detail-item')?.value || '');
  if (!species) return;
  const nature = getNatureById($('detail-nature')?.value || 'hardy');
  const hp = calcHpStat(species.baseStats.hp, clamp(toNumber($('detail-ev-hp')?.value), 0, 32));
  const atk = calcSingleStat(species.baseStats.atk, clamp(toNumber($('detail-ev-atk')?.value), 0, 32), getNatureMultiplierWithOverrides(nature, 'atk', detailNatureOverride.plusStats, detailNatureOverride.minusStats));
  const def = calcSingleStat(species.baseStats.def, clamp(toNumber($('detail-ev-def')?.value), 0, 32), getNatureMultiplierWithOverrides(nature, 'def', detailNatureOverride.plusStats, detailNatureOverride.minusStats));
  const spa = calcSingleStat(species.baseStats.spa, clamp(toNumber($('detail-ev-spa')?.value), 0, 32), getNatureMultiplierWithOverrides(nature, 'spa', detailNatureOverride.plusStats, detailNatureOverride.minusStats));
  const spd = calcSingleStat(species.baseStats.spd, clamp(toNumber($('detail-ev-spd')?.value), 0, 32), getNatureMultiplierWithOverrides(nature, 'spd', detailNatureOverride.plusStats, detailNatureOverride.minusStats));
  const spe = calcSingleStat(species.baseStats.spe, clamp(toNumber($('detail-ev-spe')?.value), 0, 32), getNatureMultiplierWithOverrides(nature, 'spe', detailNatureOverride.plusStats, detailNatureOverride.minusStats));
  if ($('detail-stat-hp')) $('detail-stat-hp').textContent = String(hp);
  if ($('detail-stat-atk')) $('detail-stat-atk').textContent = String(atk);
  if ($('detail-stat-def')) $('detail-stat-def').textContent = String(def);
  if ($('detail-stat-spa')) $('detail-stat-spa').textContent = String(spa);
  if ($('detail-stat-spd')) $('detail-stat-spd').textContent = String(spd);
  if ($('detail-stat-spe')) $('detail-stat-spe').textContent = String(spe);
  const plusStats = detailNatureOverride.plusStats.length ? detailNatureOverride.plusStats : (nature.plus ? [nature.plus] : []);
  applyDetail11nHighlight(plusStats, { atk, def, spa, spd, spe });
  const evWarning = $('detail-ev-warning');
  if (evWarning) evWarning.style.display = hasDetailEvOverflow() ? 'inline-flex' : 'none';
  const evRemaining = $('detail-ev-remaining');
  if (evRemaining) evRemaining.textContent = `残り能力ポイント: ${Math.max(0, DETAIL_EV_TOTAL_MAX - getDetailEvTotal())}`;
  const natureWarning = $('detail-nature-warning');
  if (natureWarning) natureWarning.classList.toggle('d-none', detailModifierState.valid);
  if (state.detail.modal && $('pokemon-detail-modal')?.classList.contains('show')) {
    const draft = readDetailPokemonFromForm();
    if (draft) renderDetailCalcHistory(draft);
  }
}

function getDetailEvTotal() {
  const evIds = ['detail-ev-hp', 'detail-ev-atk', 'detail-ev-def', 'detail-ev-spa', 'detail-ev-spd', 'detail-ev-spe'];
  return evIds.reduce((sum, id) => sum + clamp(toNumber($(id)?.value, 0), 0, 32), 0);
}

function hasDetailEvOverflow() {
  return getDetailEvTotal() > DETAIL_EV_TOTAL_MAX;
}

function updateMegaToggleIcon(side, itemId = '') {
  const checkbox = $(`${side}-mega-enabled`);
  const button = $(`${side}-mega-toggle`);
  if (!checkbox || !button) return;
  const canUse = !checkbox.disabled;
  const isOn = canUse && Boolean(checkbox.checked);
  button.disabled = !canUse;
  button.classList.toggle('is-on', isOn);
  button.setAttribute('aria-pressed', isOn ? 'true' : 'false');
  button.textContent = 'メガ';
}

function updateDetailMegaIcon(itemId = '') {
  const megaToggle = $('detail-mega-enabled');
  const megaButton = $('detail-mega-toggle');
  if (!megaToggle || !megaButton) return;
  const canUse = !megaToggle.disabled;
  const isOn = canUse && Boolean(megaToggle.checked);
  megaButton.disabled = !canUse;
  megaButton.classList.toggle('is-on', isOn);
  megaButton.setAttribute('aria-pressed', isOn ? 'true' : 'false');
  const stoneType = getMegaStoneType(itemId || '');
  let label = 'メガ';
  if (stoneType === 'x') label = 'メガX';
  else if (stoneType === 'y') label = 'メガY';
  else if (stoneType === 'z') label = 'メガZ';
  megaButton.textContent = label;
  megaButton.dataset.stoneType = stoneType || 'normal';
}

function getPartyMemberships(pokemonId) {
  const memberships = [];
  state.storage.parties.forEach(party => {
    party.slots.forEach((slotPokemonId, index) => {
      if (slotPokemonId === pokemonId) memberships.push({ partyId: party.id, partyName: party.name, slotIndex: index });
    });
  });
  return memberships;
}

function getPokemonWarnings(pokemon, regulation = '', options = {}) {
  const includeMoveWarning = options.includeMoveWarning !== false;
  const warnings = [];
  const species = state.speciesById.get(pokemon.speciesId);
  const configuredMoveIds = Array.isArray(pokemon.moveIds)
    ? pokemon.moveIds.filter(moveId => Boolean(moveId) && state.movesById.has(moveId))
    : [];
  if (!species) warnings.push('ポケモン未設定');
  if (pokemon.ivTotal < 0 || pokemon.ivTotal > CHAMPIONS_IV_TOTAL_MAX) warnings.push('IV合計が範囲外');
  Object.entries(pokemon.evs || {}).forEach(([stat, value]) => {
    if (toNumber(value) < 0 || toNumber(value) > 32) warnings.push(`${stat.toUpperCase()} APが範囲外`);
  });
  if (pokemon.megaEnabled && !hasMega(pokemon.speciesId)) warnings.push('メガ進化不可');
  if (regulation && !state.availableFormats.includes(regulation)) warnings.push(`未対応フォーマット: ${regulation}`);
  if (includeMoveWarning && species && configuredMoveIds.some(moveId => !canSpeciesLearnMove(pokemon.speciesId, moveId))) warnings.push('覚えないわざを含む');
  return warnings;
}

function getPartyWarnings(party) {
  const warnings = [];
  party.slots.forEach(pokemonId => {
    if (!pokemonId) return;
    const pokemon = getPokemonById(pokemonId);
    if (!pokemon) warnings.push('存在しないポケモン参照');
    else warnings.push(...getPokemonWarnings(pokemon));
  });
  return [...new Set(warnings)];
}

function upsertMoveId(moveIds, moveId) {
  if (!moveId) return moveIds.slice(0, 4);
  const next = [moveId, ...moveIds.filter(id => id !== moveId)];
  return next.slice(0, 4);
}

function createPokemonRecordFromSide(side) {
  if (!hasCalcPage()) return emptyPokemonRecord();
  const input = collectInput();
  if (side === 'attacker') {
    return normalizePokemonRecord({
      speciesId: input.attackerSpeciesId,
      nature: input.attackerNature,
      megaEnabled: input.attackerMegaEnabled,
      abilityId: input.attackerAbilityId,
      itemId: input.attackerItemId,
      evs: { hp: input.attackerEvHp, atk: input.attackerEvAtk, def: input.attackerEvDef, spa: input.attackerEvSpa, spd: input.attackerEvSpd, spe: input.attackerEvSpe },
      ranks: { atk: input.attackerRankAtk, def: input.attackerRankDef, spa: input.attackerRankSpa, spd: input.attackerRankSpd, spe: input.attackerRankSpe },
      moveIds: input.moveId ? [input.moveId] : [],
    });
  }
  return normalizePokemonRecord({
    speciesId: input.defenderSpeciesId,
    nature: input.defenderNature,
    megaEnabled: input.defenderMegaEnabled,
    abilityId: input.defenderAbilityId,
    itemId: input.defenderItemId,
    evs: { hp: input.defenderEvHp, atk: input.defenderEvAtk, def: input.defenderEvDef, spa: input.defenderEvSpa, spd: input.defenderEvSpd, spe: input.defenderEvSpe },
    ranks: { atk: input.defenderRankAtk, def: input.defenderRankDef, spa: input.defenderRankSpa, spd: input.defenderRankSpd, spe: input.defenderRankSpe },
    moveIds: input.moveId ? [input.moveId] : [],
  });
}

function pokemonToSideOverride(pokemon, side) {
  if (side === 'attacker') {
    return {
      attackerSpeciesId: pokemon.speciesId,
      attackerMegaEnabled: Boolean(pokemon.megaEnabled),
      attackerNature: pokemon.nature,
      attackerAbilityId: pokemon.abilityId,
      attackerItemId: pokemon.itemId,
      attackerEvHp: clamp(toNumber(pokemon.evs.hp), 0, 32),
      attackerEvAtk: clamp(toNumber(pokemon.evs.atk), 0, 32),
      attackerEvDef: clamp(toNumber(pokemon.evs.def), 0, 32),
      attackerEvSpa: clamp(toNumber(pokemon.evs.spa), 0, 32),
      attackerEvSpd: clamp(toNumber(pokemon.evs.spd), 0, 32),
      attackerEvSpe: clamp(toNumber(pokemon.evs.spe), 0, 32),
      attackerRankAtk: clamp(toNumber(pokemon.ranks.atk), -6, 6),
      attackerRankDef: clamp(toNumber(pokemon.ranks.def), -6, 6),
      attackerRankSpa: clamp(toNumber(pokemon.ranks.spa), -6, 6),
      attackerRankSpd: clamp(toNumber(pokemon.ranks.spd), -6, 6),
      attackerRankSpe: clamp(toNumber(pokemon.ranks.spe), -6, 6),
    };
  }
  return {
    defenderSpeciesId: pokemon.speciesId,
    defenderMegaEnabled: Boolean(pokemon.megaEnabled),
    defenderNature: pokemon.nature,
    defenderAbilityId: pokemon.abilityId,
    defenderItemId: pokemon.itemId,
    defenderEvHp: clamp(toNumber(pokemon.evs.hp), 0, 32),
    defenderEvAtk: clamp(toNumber(pokemon.evs.atk), 0, 32),
    defenderEvDef: clamp(toNumber(pokemon.evs.def), 0, 32),
    defenderEvSpa: clamp(toNumber(pokemon.evs.spa), 0, 32),
    defenderEvSpd: clamp(toNumber(pokemon.evs.spd), 0, 32),
    defenderEvSpe: clamp(toNumber(pokemon.evs.spe), 0, 32),
    defenderRankAtk: clamp(toNumber(pokemon.ranks.atk), -6, 6),
    defenderRankDef: clamp(toNumber(pokemon.ranks.def), -6, 6),
    defenderRankSpa: clamp(toNumber(pokemon.ranks.spa), -6, 6),
    defenderRankSpd: clamp(toNumber(pokemon.ranks.spd), -6, 6),
    defenderRankSpe: clamp(toNumber(pokemon.ranks.spe), -6, 6),
  };
}

function applyStoredPokemonToSide(side, pokemon, options = {}) {
  if (!hasCalcPage()) return;
  const { silent = false } = options;
  const preferredFormeSpeciesId = (() => {
    if (!pokemon?.megaEnabled) return pokemon.speciesId;
    const megaForm = getMegaFormForSpecies(pokemon.speciesId, pokemon.itemId || '');
    if (megaForm?.id) return megaForm.id;
    return resolveEffectiveSpeciesId(pokemon.speciesId, true, pokemon.itemId || '') || pokemon.speciesId;
  })();
  fillSpeciesField(`${side}-species`, pokemon.speciesId);
  syncFormeFieldForSide(side, preferredFormeSpeciesId);
  $(`${side}-species`).value = pokemon.speciesId;
  updatePickerButtonLabel(`${side}-species`);
  $(`${side}-nature`).value = pokemon.nature;
  updatePickerButtonLabel(`${side}-nature`);
  syncNatureModifierSelectors(side);
  $(`${side}-mega-enabled`).checked = Boolean(pokemon.megaEnabled && hasMega(pokemon.speciesId));
  $(`${side}-item`).value = pokemon.itemId || '';
  updatePickerButtonLabel(`${side}-item`);
  syncMegaToggle(side, pokemon.abilityId || '');
  if (!$(`${side}-mega-enabled`).checked) {
    $(`${side}-item`).value = pokemon.itemId || '';
    updatePickerButtonLabel(`${side}-item`);
  }
  if (side === 'attacker') {
    $('attacker-ev-hp').value = clamp(toNumber(pokemon.evs.hp), 0, 32);
    $('attacker-ev-atk').value = clamp(toNumber(pokemon.evs.atk), 0, 32);
    $('attacker-ev-def').value = clamp(toNumber(pokemon.evs.def), 0, 32);
    $('attacker-ev-spa').value = clamp(toNumber(pokemon.evs.spa), 0, 32);
    $('attacker-ev-spd').value = clamp(toNumber(pokemon.evs.spd), 0, 32);
    $('attacker-ev-spe').value = clamp(toNumber(pokemon.evs.spe), 0, 32);
    $('attacker-rank-atk').value = clamp(toNumber(pokemon.ranks.atk), -6, 6);
    $('attacker-rank-def').value = clamp(toNumber(pokemon.ranks.def), -6, 6);
    $('attacker-rank-spa').value = clamp(toNumber(pokemon.ranks.spa), -6, 6);
    $('attacker-rank-spd').value = clamp(toNumber(pokemon.ranks.spd), -6, 6);
    $('attacker-rank-spe').value = clamp(toNumber(pokemon.ranks.spe), -6, 6);
    if (pokemon.moveIds[0]) {
      $('move-select').value = pokemon.moveIds[0];
      updatePickerButtonLabel('move-select');
      recalcMoveFields();
    }
  } else {
    $('defender-ev-hp').value = clamp(toNumber(pokemon.evs.hp), 0, 32);
    $('defender-ev-atk').value = clamp(toNumber(pokemon.evs.atk), 0, 32);
    $('defender-ev-def').value = clamp(toNumber(pokemon.evs.def), 0, 32);
    $('defender-ev-spa').value = clamp(toNumber(pokemon.evs.spa), 0, 32);
    $('defender-ev-spd').value = clamp(toNumber(pokemon.evs.spd), 0, 32);
    $('defender-ev-spe').value = clamp(toNumber(pokemon.evs.spe), 0, 32);
    $('defender-rank-atk').value = clamp(toNumber(pokemon.ranks.atk), -6, 6);
    $('defender-rank-def').value = clamp(toNumber(pokemon.ranks.def), -6, 6);
    $('defender-rank-spa').value = clamp(toNumber(pokemon.ranks.spa), -6, 6);
    $('defender-rank-spd').value = clamp(toNumber(pokemon.ranks.spd), -6, 6);
    $('defender-rank-spe').value = clamp(toNumber(pokemon.ranks.spe), -6, 6);
  }
  state.storage.calcLinks[side] = pokemon.id;
  if (!silent) {
    saveStorage();
    renderManagerViews();
    updateStatSummaries();
    calculateAndRender();
  }
}

function syncMegaToggle(side, selectedAbilityId = '') {
  if (!$(`${side}-species`) || !$(`${side}-mega-enabled`) || !$(`${side}-item`) || !$(`${side}-item-button`)) return;
  const speciesId = $(`${side}-species`).value;
  const megaToggle = $(`${side}-mega-enabled`);
  const megaWrap = megaToggle.closest('.calc-side-mega-toggle') || megaToggle.closest('.mega-switch') || megaToggle.closest('.form-check');
  const pokemonBlock = megaWrap?.closest('.calc-side-pokemon-block');
  const itemInput = $(`${side}-item`);
  const canMega = hasMega(speciesId);
  megaToggle.disabled = !canMega;
  if (megaWrap) megaWrap.classList.toggle('d-none', !canMega);
  if (pokemonBlock) pokemonBlock.classList.toggle('calc-side-pokemon-block-mega-hidden', !canMega);
  if (!canMega) megaToggle.checked = false;
  if (!canMega && isMegaStoneItem(itemInput.value)) itemInput.value = '';
  if (megaToggle.checked) {
    itemInput.value = getPreferredMegaItemId(speciesId, itemInput.value || '');
  }
  updatePickerButtonLabel(`${side}-item`);
  updateMegaToggleIcon(side, itemInput.value);
  fillAbilityField(`${side}-ability`, speciesId, megaToggle.checked, selectedAbilityId, itemInput.value);
  updatePickerButtonLabel(`${side}-species`);
  syncNatureModifierSelectors(side);
  updateStatSummaries();
}

function syncDetailMegaToggle(selectedAbilityId = '') {
  if (!$('detail-species') || !$('detail-mega-enabled')) return;
  const speciesId = $('detail-species').value;
  const megaToggle = $('detail-mega-enabled');
  const megaWrap = megaToggle.closest('.detail-mega-switch') || megaToggle.closest('.mega-switch') || megaToggle.closest('.form-check');
  const itemInput = $('detail-item');
  const canMega = hasMega(speciesId);
  megaToggle.disabled = !canMega;
  if (megaWrap) megaWrap.classList.toggle('d-none', !canMega);
  if (!canMega) megaToggle.checked = false;
  if (!canMega && isMegaStoneItem(itemInput?.value || '')) itemInput.value = '';
  if (megaToggle.checked && itemInput) itemInput.value = getPreferredMegaItemId(speciesId, itemInput.value || '');
  if (itemInput) updatePickerButtonLabel('detail-item');
  updateDetailMegaIcon(itemInput?.value || '');
  fillAbilityField('detail-ability', speciesId, megaToggle.checked, selectedAbilityId, itemInput?.value || '');
  updatePickerButtonLabel('detail-species');
  syncNatureModifierSelectors('detail');
  updateDetailStatSummaries();
}

function refreshDetailDerivedViews(pokemon) {
  if (!pokemon) return;
  renderDetailHeadSummary(pokemon);
  renderDetailWarnings(pokemon);
  renderDetailSpeedMemo(pokemon);
  renderDetailCalcHistory(pokemon);
}

function removePokemonReferences(pokemonId) {
  state.storage.parties.forEach(party => {
    party.slots = party.slots.map(slotPokemonId => slotPokemonId === pokemonId ? null : slotPokemonId);
  });
  if (state.storage.calcLinks.attacker === pokemonId) state.storage.calcLinks.attacker = null;
  if (state.storage.calcLinks.defender === pokemonId) state.storage.calcLinks.defender = null;
}

function duplicatePokemon(pokemonId) {
  const pokemon = getPokemonById(pokemonId);
  if (!pokemon) return;
  const copy = normalizePokemonRecord({ ...clone(pokemon), id: generateId('box'), nickname: pokemon.nickname ? `${pokemon.nickname} コピー` : '' });
  state.storage.box.push(copy);
  saveStorage();
  renderManagerViews();
}

function renderBoxList() {
  if (!hasManagerPage()) return;
  const container = $('box-list');
  container.innerHTML = '';
  $('box-count-badge').textContent = String(state.storage.box.length);
  if (!state.storage.box.length) {
    container.innerHTML = '<div class="empty-state">ボックスは空です。</div>';
    return;
  }
  state.storage.box.forEach(pokemon => {
    const warnings = getPokemonWarnings(pokemon);
    const memberships = getPartyMemberships(pokemon.id);
    const card = document.createElement('div');
    card.className = 'card shadow-sm border mb-2 position-relative entity-card compact-entity-card';
    card.draggable = true;
    card.innerHTML = `
      <div class="card-body p-2 d-flex align-items-center justify-content-center entity-card-head">
        ${renderPokemonIconStack(pokemon.speciesId, Boolean(pokemon.megaEnabled), pokemon.itemId, displayPokemonName(pokemon))}
      </div>
      ${(memberships.length || warnings.length) ? `<span class="badge rounded-pill ${warnings.length ? 'text-bg-warning' : 'text-bg-light'} card-corner-badge">${memberships.length || '!'}</span>` : ''}
    `;
    card.title = `${displayPokemonName(pokemon)}${pokemon.itemId ? ` / ${displayItemName(state.itemsById.get(pokemon.itemId) || { id: '', name: 'None', nameJa: 'なし' })}` : ''}`;
    card.addEventListener('click', () => {
      if (state.suppressClickId === pokemon.id) {
        state.suppressClickId = null;
        return;
      }
      openPokemonDetail(pokemon.id);
    });
    card.addEventListener('contextmenu', event => {
      event.preventDefault();
      duplicatePokemon(pokemon.id);
    });
    card.addEventListener('pointerdown', () => {
      state.longPressTimer = window.setTimeout(() => {
        duplicatePokemon(pokemon.id);
        state.suppressClickId = pokemon.id;
      }, 500);
    });
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(type => {
      card.addEventListener(type, () => {
        if (state.longPressTimer) {
          clearTimeout(state.longPressTimer);
          state.longPressTimer = null;
        }
      });
    });
    card.addEventListener('dragstart', event => {
      event.dataTransfer.setData('text/pokemon-id', pokemon.id);
    });
    container.appendChild(card);
  });
}

function renderPartyList() {
  if (!hasManagerPage()) return;
  const container = $('party-list');
  container.innerHTML = '';
  $('party-count-badge').textContent = String(state.storage.parties.length);
  state.storage.parties.forEach(party => {
    const card = document.createElement('div');
    card.className = 'card shadow-sm border mb-3 party-card';
    card.innerHTML = `
      <div class="card-body p-2 party-card-head">
        <div class="party-name-wrap">
          <input class="form-control form-control-sm party-name-input" data-party-id="${party.id}" value="${party.name}">
          <button class="btn btn-sm remove-party-button" data-party-id="${party.id}" type="button" aria-label="パーティ削除"><i class="bi bi-x-lg"></i></button>
        </div>
      </div>
      <div class="card-body pt-0 party-slots"></div>
    `;
    const slots = card.querySelector('.party-slots');
    party.slots.forEach((pokemonId, index) => {
      const pokemon = pokemonId ? getPokemonById(pokemonId) : null;
      const slot = document.createElement('div');
      slot.className = `party-slot${pokemon ? ' occupied' : ''}`;
      slot.dataset.partyId = party.id;
      slot.dataset.slotIndex = String(index);
      if (pokemon) {
        const memberships = getPartyMemberships(pokemon.id);
        const warnings = getPokemonWarnings(pokemon);
        slot.innerHTML = `
          ${(memberships.length || warnings.length) ? `<span class="badge rounded-pill ${warnings.length ? 'text-bg-warning' : 'text-bg-light'} card-corner-badge">${memberships.length || '!'}</span>` : ''}
          <button class="party-slot-button" type="button" data-pokemon-id="${pokemon.id}">
            ${renderPokemonIconStack(pokemon.speciesId, Boolean(pokemon.megaEnabled), pokemon.itemId, displayPokemonName(pokemon))}
          </button>
          <button class="btn btn-sm btn-link text-muted remove-slot-button" type="button" data-party-id="${party.id}" data-slot-index="${index}"><i class="bi bi-x-circle"></i></button>
        `;
      } else {
        slot.innerHTML = `
          <button class="btn btn-outline-secondary party-slot-add-button" type="button" data-party-id="${party.id}" data-slot-index="${index}" title="ボックスから選択" aria-label="ボックスから選択">
            <i class="bi bi-plus-lg" aria-hidden="true"></i>
          </button>
        `;
      }
      slot.addEventListener('dragover', event => event.preventDefault());
      slot.addEventListener('drop', event => {
        event.preventDefault();
        assignPokemonToPartySlot(party.id, index, event.dataTransfer.getData('text/pokemon-id'));
      });
      slots.appendChild(slot);
    });
    container.appendChild(card);
  });
  container.querySelectorAll('.party-name-input').forEach(input => {
    input.addEventListener('input', event => {
      const party = getPartyById(event.target.dataset.partyId);
      if (!party) return;
      party.name = event.target.value || 'パーティ';
      saveStorage();
      renderManagerViews();
    });
  });
  container.querySelectorAll('.remove-party-button').forEach(button => {
    button.addEventListener('click', () => {
      if (!window.confirm('このパーティを削除しますか？')) return;
      state.storage.parties = state.storage.parties.filter(party => party.id !== button.dataset.partyId);
      if (!state.storage.parties.length) state.storage.parties.push(createEmptyParty());
      saveStorage();
      renderManagerViews();
    });
  });
  container.querySelectorAll('.remove-slot-button').forEach(button => {
    button.addEventListener('click', () => {
      const party = getPartyById(button.dataset.partyId);
      if (!party) return;
      party.slots[Number(button.dataset.slotIndex)] = null;
      saveStorage();
      renderManagerViews();
    });
  });
  container.querySelectorAll('.party-slot-button').forEach(button => {
    button.addEventListener('click', () => openPokemonDetail(button.dataset.pokemonId));
  });
  container.querySelectorAll('.party-slot-add-button').forEach(button => {
    button.addEventListener('click', () => openPartySlotPicker(button.dataset.partyId, Number(button.dataset.slotIndex)));
  });
}

function calculateDetailSpeedValue(pokemon) {
  const inDetailView = Boolean($('detail-species'));
  const speciesId = inDetailView ? $('detail-species')?.value : pokemon.speciesId;
  const megaEnabled = inDetailView ? Boolean($('detail-mega-enabled')?.checked) : Boolean(pokemon.megaEnabled);
  const itemId = inDetailView ? ($('detail-item')?.value || '') : (pokemon.itemId || '');
  const species = getEffectiveSpecies(speciesId, megaEnabled, itemId);
  if (!species?.baseStats?.spe) return 0;

  const natureId = inDetailView ? ($('detail-nature')?.value || 'hardy') : (pokemon.nature || 'hardy');
  const nature = getNatureById(natureId);
  const speEv = inDetailView
    ? clamp(toNumber($('detail-ev-spe')?.value), 0, 32)
    : clamp(toNumber(pokemon.evs?.spe, 0), 0, 32);

  if (inDetailView) {
    const detailNatureOverride = getSideNatureOverridesFromButtons('detail');
    const natureMultiplier = getNatureMultiplierWithOverrides(nature, 'spe', detailNatureOverride.plusStats, detailNatureOverride.minusStats);
    return calcSingleStat(species.baseStats.spe, speEv, natureMultiplier);
  }

  return calcSingleStat(species.baseStats.spe, speEv, natureMod(nature, 'spe'));
}

function renderDetailSpeedMemo(pokemon) {
  const container = $('detail-speed-memo');
  if (!container) return;
  const speed = calculateDetailSpeedValue(pokemon);
  if (!speed) {
    container.innerHTML = '';
    return;
  }
  const loadSpeedRows = () => {
    try {
      const raw = localStorage.getItem(SPEED_ADJUST_ROW_CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || !parsed.rows) return null;
      return parsed.rows;
    } catch (_error) {
      return null;
    }
  };
  const rows = loadSpeedRows();
  const currentRow = rows?.[String(speed)]?.html || '';
  const nextRow = rows?.[String(Math.max(0, speed - 1))]?.html || '';
  const renderRowGroups = html => html || '<span class="text-muted small">該当なし</span>';
  container.innerHTML = `
    <div class="table-responsive detail-speed-memo-table-wrap">
      <table class="table table-sm align-middle mb-0 detail-speed-memo-table">
        <thead>
          <tr>
            <th class="mono" scope="col">実数値</th>
            <th scope="col">対象群</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="mono">${speed}</td>
            <td><div class="detail-speed-memo-row">${renderRowGroups(currentRow)}</div></td>
          </tr>
          <tr>
            <td class="mono">${Math.max(0, speed - 1)}</td>
            <td><div class="detail-speed-memo-row">${renderRowGroups(nextRow)}</div></td>
          </tr>
        </tbody>
      </table>
    </div>
  `;
}

function renderManagerViews() {
  if (hasCalcPage()) updateLinkedDetailButtons();
  if (!hasManagerPage()) return;
  renderBoxList();
  renderPartyList();
}

function updateLinkedDetailButtons() {
  const mapping = [
    { side: 'attacker', buttonId: 'attacker-open-linked-detail' },
    { side: 'defender', buttonId: 'defender-open-linked-detail' },
  ];
  mapping.forEach(({ side, buttonId }) => {
    const button = $(buttonId);
    if (!button) return;
    const topStrip = button.closest('.calc-side-top-strip');
    const pokemon = getPokemonById(state.storage.calcLinks[side]);
    if (!pokemon) {
      button.classList.add('d-none');
      button.disabled = true;
      if (topStrip) topStrip.classList.add('calc-side-edit-hidden');
      return;
    }
    button.classList.remove('d-none');
    button.disabled = false;
    if (topStrip) topStrip.classList.remove('calc-side-edit-hidden');
    button.title = `${displayPokemonName(pokemon)} を編集`;
  });
}

function openLinkedPokemonDetailFromCalc(side) {
  const linkedId = state.storage.calcLinks[side];
  const pokemon = getPokemonById(linkedId);
  if (!pokemon) {
    window.alert(`${side === 'attacker' ? '攻撃側' : '防御側'}に紐付いたポケモンがありません。`);
    return;
  }
  if (state.detail.modal) {
    openPokemonDetail(pokemon.id);
    return;
  }
      localStorage.setItem(OPEN_DETAIL_REQUEST_KEY, JSON.stringify({ pokemonId: pokemon.id }));
      window.location.href = './box-party.html';
    }

function openOrCreateLinkedPokemonDetailFromCalc(side) {
  const linkedId = state.storage.calcLinks[side];
  const linkedPokemon = getPokemonById(linkedId);
  if (linkedPokemon) {
    openLinkedPokemonDetailFromCalc(side);
    return;
  }
  if (!validateSideNatureForSave(side)) return;
  const sideLabel = side === 'attacker' ? '攻撃側' : '防御側';
  const ok = window.confirm(`${sideLabel}に紐付いたポケモンがありません。\n現在の内容で新規作成して編集しますか？`);
  if (!ok) return;
  const created = createPokemonRecordFromSide(side);
  state.storage.box.push(created);
  state.storage.calcLinks[side] = created.id;
  saveStorage();
  renderManagerViews();
  openLinkedPokemonDetailFromCalc(side);
}
function assignPokemonToPartySlot(partyId, slotIndex, pokemonId) {
  const party = getPartyById(partyId);
  const pokemon = getPokemonById(pokemonId);
  if (!party || !pokemon) return;
  party.slots = party.slots.map(slotPokemonId => slotPokemonId === pokemonId ? null : slotPokemonId);
  party.slots[slotIndex] = pokemonId;
  saveStorage();
  renderManagerViews();
}

function openPartySlotPicker(partyId, slotIndex) {
  if (!state.picker.modal) return;
  state.picker.partySlotTarget = { partyId, slotIndex };
  state.dynamicPickerMeta['party-slot'] = { titleKey: 'pickerSpecies' };
  state.pickerOptions['party-slot'] = createPickerOptionsFromBox();
  state.picker.currentField = 'party-slot';
  state.picker.sideContext = null;
  state.picker.source = 'list';
  $('picker-title').textContent = t('pickerSpecies');
  $('picker-search').value = '';
  refreshPickerSourceTabs();
  renderPickerList('');
  state.picker.modal.show();
}

function getCurrentDetailPokemon() {
  return getPokemonById(state.detail.editingPokemonId);
}

function getDetailNotesElement() {
  return $('detail-notes-other') || $('detail-notes');
}

function renderDetailWarnings(pokemon) {
  if (!$('detail-warning-list')) return;
  const memberships = getPartyMemberships(pokemon.id);
  const includeMoveWarning = !hasDetailEvOverflow();
  const warnings = [...new Set([
    ...getPokemonWarnings(pokemon, '', { includeMoveWarning }),
    ...memberships.flatMap(entry => getPokemonWarnings(pokemon, getPartyById(entry.partyId)?.regulation || '', { includeMoveWarning })),
  ])];
  $('detail-warning-list').innerHTML = warnings.length ? warnings.map(warning => `<div><i class="bi bi-exclamation-triangle-fill text-warning"></i> ${warning}</div>`).join('') : '';
}

function buildHistoryInputForPokemon(pokemon, entry) {
  const input = clone(entry.inputSnapshot);
  return entry.role === 'attacker' ? { ...input, ...pokemonToSideOverride(pokemon, 'attacker') } : { ...input, ...pokemonToSideOverride(pokemon, 'defender') };
}

function formatKoSummaryText(rolls, defenderHp, koRate) {
  if (!Array.isArray(rolls) || !rolls.length || !defenderHp) return '-';
  if (koRate >= 100) return state.lang === 'ja' ? '確定1発' : 'Guaranteed OHKO';
  if (koRate > 0) return state.lang === 'ja' ? `${koRate.toFixed(1)}%で1発` : `${koRate.toFixed(1)}% to OHKO`;
  const minRoll = Math.min(...rolls);
  const maxRoll = Math.max(...rolls);
  if (minRoll <= 0 || maxRoll <= 0) return '-';
  const fastestHits = Math.max(1, Math.ceil(defenderHp / maxRoll));
  const guaranteedHits = Math.max(fastestHits, Math.ceil(defenderHp / minRoll));
  if (fastestHits === guaranteedHits) return state.lang === 'ja' ? `確定${guaranteedHits}発` : `Guaranteed ${guaranteedHits}HKO`;
  return state.lang === 'ja' ? `乱数${fastestHits}発` : `Possible ${fastestHits}HKO`;
}

function buildEmbeddedResultCaptureHtml(input, result) {
  const move = result.move || state.movesById.get(input.moveId);
  const atkLabel = input.moveCategory === 'Special' ? 'C' : 'A';
  const defLabel = input.moveCategory === 'Special' ? 'D' : 'B';
  const minPct = result.defenderHp ? (result.min / result.defenderHp) * 100 : 0;
  const maxPct = result.defenderHp ? (result.max / result.defenderHp) * 100 : 0;
  const moveTypeName = state.lang === 'ja'
    ? ((state.data.types || []).find(type => type.name === input.moveType)?.nameJa || input.moveType || '-')
    : (input.moveType || '-');
  const categoryName = state.lang === 'ja'
    ? ({ Physical: '物理', Special: '特殊', Status: '変化' }[input.moveCategory] || input.moveCategory || '-')
    : (input.moveCategory || '-');
  const powerLabel = state.lang === 'ja' ? '威力' : 'Power';
  const attackerSpecies = getEffectiveSpecies(input.attackerSpeciesId, input.attackerMegaEnabled, input.attackerItemId);
  const attackerTypes = attackerSpecies?.types || [];
  const attackerStab = getStabMultiplier(input.moveType, attackerTypes, hasAbility(result.attackerAbilityId, ['Adaptability']));

  let typeLabel = state.lang === 'ja' ? '等倍' : 'Neutral';
  let typeLevel = 'neutral';
  let typeIconClass = 'bi-record-circle';
  const multiplier = Number(result.typeMultiplier || 0);
  if (multiplier === 0) {
    typeLabel = state.lang === 'ja' ? '無効 x0' : 'Immune x0';
    typeLevel = 'immune';
    typeIconClass = 'bi-slash-circle-fill';
  } else if (multiplier > 1) {
    typeLabel = state.lang === 'ja' ? `弱点 x${multiplier}` : `Super x${multiplier}`;
    typeLevel = 'super';
    typeIconClass = 'bi-exclamation-diamond-fill';
  } else if (multiplier < 1) {
    typeLabel = state.lang === 'ja' ? `半減 x${multiplier}` : `Resist x${multiplier}`;
    typeLevel = 'resist';
    typeIconClass = 'bi-shield-fill-minus';
  }

  const rolls = Array.isArray(result.rolls) ? result.rolls : [];
  const koCount = rolls.filter(value => value >= (result.defenderHp || Infinity)).length;
  const koRate = rolls.length ? (koCount / rolls.length) * 100 : 0;
  const koSummary = formatKoSummaryText(rolls, result.defenderHp, koRate);
  const pills = rolls.map(value => {
    const ratio = result.defenderHp ? (value / result.defenderHp) : 0;
    const cls = ratio >= 1 ? 'result-dmg-deep-red' : (ratio >= 0.8 ? 'result-dmg-red' : (ratio >= 0.5 ? 'result-dmg-yellow' : 'result-dmg-green'));
    return `<span class="result-random-pill ${cls}">${value}</span>`;
  }).join('');

  return `
    <div class="result-capture result-capture-embedded">
      <div class="result-summary-row result-row-shell">
        <span class="result-row-head-icon" aria-hidden="true"><i class="bi bi-person-fill"></i></span>
        <div class="result-side-inline result-side-inline-start">
          <div class="result-side-icons">${renderPokemonOnlyIcon(input.attackerSpeciesId, input.attackerMegaEnabled, input.attackerItemId)}</div>
          <span class="result-side-meta mono">${atkLabel}${toNumber(result.attackStatUsed)}</span>
        </div>
        <span class="result-flow-arrow" aria-hidden="true"><i class="bi bi-arrow-right"></i></span>
        <div class="result-side-inline result-side-inline-end">
          <div class="result-side-icons">${renderPokemonOnlyIcon(input.defenderSpeciesId, input.defenderMegaEnabled, input.defenderItemId)}</div>
          <span class="result-side-meta mono">HP${toNumber(result.defenderHp)} / ${defLabel}${toNumber(result.defenseStatUsed)}</span>
        </div>
      </div>
      <div class="result-move-line result-row-shell">
        <span class="result-row-head-icon" aria-hidden="true"><i class="bi bi-lightning-charge-fill"></i></span>
        <span class="result-move-name">${escapeHtml(move ? displayEntryName(move) : '-')}</span>
        <span class="result-move-inline mono"><span>${escapeHtml(moveTypeName)}</span><span class="result-move-meta-sep">/</span><span>${escapeHtml(categoryName)}</span><span class="result-move-meta-sep">/</span><span class="result-move-power mono">${escapeHtml(powerLabel)} ${toNumber(result.power)}</span></span>
        <span class="result-inline-badge result-stab-effect ${attackerStab > 1 ? 'is-on' : 'is-off'}">${attackerStab > 1 ? (state.lang === 'ja' ? `一致 x${attackerStab}` : `STAB x${attackerStab}`) : (state.lang === 'ja' ? '一致なし' : 'No STAB')}</span>
        <span class="result-type-effect" data-level="${typeLevel}">${escapeHtml(typeLabel)}</span>
      </div>
      <div class="result-damage-row result-row-shell">
        <span class="result-row-head-icon" aria-hidden="true"><i class="bi bi-activity"></i></span>
        <span class="result-value mono">${result.min} <span class="result-percent">(${minPct.toFixed(1)}%)</span> ~ ${result.max} <span class="result-percent">(${maxPct.toFixed(1)}%)</span></span>
        <span class="result-ko-summary mono">${escapeHtml(koSummary)}</span>
      </div>
      <div class="result-random-row result-row-shell">
        <span class="result-row-head-icon result-random-icon" aria-hidden="true"><i class="bi bi-bar-chart-steps"></i></span>
        <span class="result-sub mono">${pills || '-'}</span>
      </div>
    </div>
  `;
}

function renderDetailCalcHistory(pokemon) {
  const attackerContainer = $('detail-calc-history-attacker');
  const defenderContainer = $('detail-calc-history-defender');
  if (!attackerContainer || !defenderContainer) return;
  attackerContainer.innerHTML = '';
  defenderContainer.innerHTML = '';
  if (!pokemon.calcHistory.length) {
    attackerContainer.innerHTML = '<div class="text-muted small">保存済み計算はありません。</div>';
    defenderContainer.innerHTML = '<div class="text-muted small">保存済み計算はありません。</div>';
    return;
  }
  const groups = {
    attacker: pokemon.calcHistory.filter(entry => entry.role === 'attacker').slice().reverse(),
    defender: pokemon.calcHistory.filter(entry => entry.role === 'defender').slice().reverse(),
  };
  [
    { key: 'attacker', container: attackerContainer },
    { key: 'defender', container: defenderContainer },
  ].forEach(section => {
    const entries = groups[section.key];
    if (!entries.length) return;
    entries.forEach(entry => {
      const item = document.createElement('div');
      item.className = 'calc-history-item';
      try {
        const historyInput = buildHistoryInputForPokemon(pokemon, entry);
        const result = calculateDamageRange(historyInput);
        const embedded = buildEmbeddedResultCaptureHtml(historyInput, result);
        item.innerHTML = `
          <div class="calc-history-capture">
            ${embedded}
            <button class="btn btn-sm btn-link text-muted calc-history-delete calc-history-delete-overlay" type="button" data-calc-id="${entry.id}" title="削除"><i class="bi bi-trash"></i></button>
          </div>
        `;
      } catch (_error) {
        item.innerHTML = '<div class="calc-history-title">再計算失敗</div>';
      }
      section.container.appendChild(item);
    });
  });
  document.querySelectorAll('#detail-calc-history-attacker .calc-history-delete, #detail-calc-history-defender .calc-history-delete').forEach(button => {
    button.addEventListener('click', () => {
      pokemon.calcHistory = pokemon.calcHistory.filter(entry => entry.id !== button.dataset.calcId);
      saveStorage();
      renderDetailCalcHistory(pokemon);
    });
  });
}

function renderDetailMoveList(pokemon) {
  if (!$('detail-move-list')) return;
  const container = $('detail-move-list');
  container.innerHTML = '';
  state.dynamicPickerMeta = Object.fromEntries(Object.entries(state.dynamicPickerMeta).filter(([fieldId]) => !fieldId.startsWith('detail-move-')));
  for (let index = 0; index < 4; index += 1) {
    const fieldId = `detail-move-${index}`;
    const buttonId = `${fieldId}-button`;
    state.dynamicPickerMeta[fieldId] = { buttonId, titleKey: 'pickerMove' };
    const row = document.createElement('div');
    row.className = 'detail-move-row';
    row.innerHTML = `
      <input id="${fieldId}" type="hidden">
      <button id="${buttonId}" class="btn btn-outline-secondary text-start detail-move-button" type="button"></button>
    `;
    container.appendChild(row);
    setPickerField(fieldId, [{ value: '', label: '未設定' }, ...buildLearnsetOptions(pokemon.speciesId)], pokemon.moveIds[index] || '');
    refreshDetailMoveButton(fieldId);
    $(buttonId).addEventListener('click', () => openPicker(fieldId));
  }
}

function refreshDetailMoveButton(fieldId) {
  const moveInput = $(fieldId);
  const button = $(`${fieldId}-button`);
  if (!moveInput || !button) return;
  const move = state.movesById.get(moveInput.value);
  if (!move) {
    button.textContent = getPickerLabel(fieldId, moveInput.value) || '未設定';
    return;
  }
  const typeIcon = getMoveTypeIconUrl(move.type);
  const categoryIcon = getMoveCategoryIconUrl(move.category);
  const powerText = move.basePower != null ? String(move.basePower) : '-';
  button.innerHTML = `
    <span class="move-picker-item">
      <span class="move-picker-item-main">
        ${typeIcon ? `<img class="move-type-icon-chip" src="${typeIcon}" alt="" loading="lazy">` : ''}
        ${categoryIcon ? `<img class="move-category-icon-chip" src="${categoryIcon}" alt="" loading="lazy">` : ''}
        <span class="move-picker-name">${displayEntryName(move)}</span>
      </span>
      <span class="move-picker-damage mono">威力 ${powerText}</span>
    </span>
  `;
}

function openNewBoxSpeciesPicker() {
  if (!state.picker.modal) return;
  state.dynamicPickerMeta['new-box-species'] = { titleKey: 'pickerSpecies' };
  state.pickerOptions['new-box-species'] = buildSpeciesPickerOptions();
  state.picker.currentField = 'new-box-species';
  state.picker.sideContext = null;
  state.picker.source = 'list';
  $('picker-title').textContent = t('pickerSpecies');
  $('picker-search').value = '';
  renderPickerCreateActions();
  refreshPickerSourceTabs();
  renderPickerList('');
  $('picker-modal').dataset.layered = '0';
  state.picker.modal.show();
}

function buildImportNameCandidates(name) {
  const raw = String(name || '').trim();
  if (!raw) return [];
  const candidates = new Set([raw]);
  candidates.add(raw.replace(/\s+/g, ' '));
  candidates.add(raw.replace(/[’']/g, ''));
  return [...candidates];
}

function resolveSpeciesIdFromImportName(name) {
  const candidates = buildImportNameCandidates(name);
  for (const candidate of candidates) {
    const id = toId(candidate);
    if (state.speciesById.has(id)) return id;
  }
  const allSpecies = [...(state.data.species || []), ...(state.data.megaSpecies || [])];
  for (const species of allSpecies) {
    const names = [species.id, species.name, species.nameJa, species.baseSpecies].map(value => normalizeSearchText(value));
    if (candidates.some(candidate => names.includes(normalizeSearchText(candidate)))) return species.id;
  }
  return '';
}

function resolveAbilityIdFromImportName(name) {
  const candidates = buildImportNameCandidates(name);
  for (const candidate of candidates) {
    const id = toId(candidate);
    if (state.abilitiesById.has(id)) return id;
  }
  for (const ability of state.data.abilities || []) {
    const names = [ability.id, ability.name, ability.nameJa].map(value => normalizeSearchText(value));
    if (candidates.some(candidate => names.includes(normalizeSearchText(candidate)))) return ability.id;
  }
  return '';
}

function resolveItemIdFromImportName(name) {
  const candidates = buildImportNameCandidates(name);
  for (const candidate of candidates) {
    const id = toId(candidate);
    if (state.itemsById.has(id)) return id;
  }
  for (const item of state.itemsById.values()) {
    const names = [item.id, item.name, item.nameJa].map(value => normalizeSearchText(value));
    if (candidates.some(candidate => names.includes(normalizeSearchText(candidate)))) return item.id;
  }
  return '';
}

function resolveMoveIdFromImportName(name) {
  const cleaned = String(name || '').replace(/\[[^\]]+\]/g, '').trim();
  const candidates = buildImportNameCandidates(cleaned);
  for (const candidate of candidates) {
    const id = toId(candidate);
    if (state.movesById.has(id)) return id;
  }
  for (const move of state.data.moves || []) {
    const names = [move.id, move.name, move.nameJa].map(value => normalizeSearchText(value));
    if (candidates.some(candidate => names.includes(normalizeSearchText(candidate)))) return move.id;
  }
  return '';
}

function resolveNatureIdFromImportName(name) {
  const normalized = normalizeSearchText(String(name || '').trim());
  const found = NATURES.find(nature => [nature.id, nature.en, nature.ja].some(value => normalizeSearchText(value) === normalized));
  return found?.id || 'hardy';
}

function convertShowdownEvToChampions(ev) {
  return clamp(Math.round(toNumber(ev, 0) / 8), 0, 32);
}

function parseShowdownImportSet(blockText) {
  const lines = String(blockText || '').split(/\r?\n/).map(line => line.trim()).filter(Boolean);
  if (!lines.length) return null;

  const firstLine = lines[0];
  const [leftPartRaw, itemPartRaw = ''] = firstLine.split('@');
  const leftPart = String(leftPartRaw || '').trim().replace(/\s*\((M|F)\)\s*$/i, '').trim();
  let nickname = '';
  let speciesName = leftPart;
  const bracketMatch = leftPart.match(/^(.*)\(([^()]+)\)\s*$/);
  if (bracketMatch) {
    nickname = String(bracketMatch[1] || '').trim();
    speciesName = String(bracketMatch[2] || '').trim();
  }

  const speciesId = resolveSpeciesIdFromImportName(speciesName);
  if (!speciesId) return null;

  const record = emptyPokemonRecord();
  record.nickname = nickname;
  record.speciesId = speciesId;
  record.itemId = resolveItemIdFromImportName(itemPartRaw.trim());

  for (const line of lines.slice(1)) {
    if (/^Ability\s*:/i.test(line)) {
      record.abilityId = resolveAbilityIdFromImportName(line.replace(/^Ability\s*:/i, '').trim());
      continue;
    }
    if (/^EVs\s*:/i.test(line)) {
      const body = line.replace(/^EVs\s*:/i, '').trim();
      body.split('/').forEach(segment => {
        const match = segment.trim().match(/^(\d+)\s*(HP|Atk|Def|SpA|SpD|Spe)$/i);
        if (!match) return;
        const value = convertShowdownEvToChampions(match[1]);
        const statKey = {
          hp: 'hp', atk: 'atk', def: 'def', spa: 'spa', spd: 'spd', spe: 'spe',
        }[String(match[2]).toLowerCase()];
        if (statKey) record.evs[statKey] = value;
      });
      continue;
    }
    if (/Nature$/i.test(line)) {
      const natureName = line.replace(/Nature$/i, '').trim();
      record.nature = resolveNatureIdFromImportName(natureName);
      continue;
    }
    if (/^-/i.test(line)) {
      const moveName = line.replace(/^-+\s*/, '').trim();
      const moveId = resolveMoveIdFromImportName(moveName);
      if (moveId && record.moveIds.length < 4) record.moveIds.push(moveId);
    }
  }
  return normalizePokemonRecord(record);
}

function importShowdownTextToBox(text) {
  const blocks = String(text || '').split(/\n\s*\n/).map(block => block.trim()).filter(Boolean);
  const imported = blocks.map(parseShowdownImportSet).filter(Boolean);
  if (!imported.length) {
    window.alert(t('pickerImportNoValid'));
    return;
  }
  state.storage.box.push(...imported);
  saveStorage();
  renderManagerViews();
  window.alert(t('pickerImportSuccess', { count: imported.length }));
  if (state.pickerImport.modal) state.pickerImport.modal.hide();
  if (state.picker.modal) state.picker.modal.hide();
}

function buildPokepasteTextFromPokemon(pokemon) {
  if (!pokemon) return '';
  const effectiveSpecies = getEffectiveSpecies(pokemon.speciesId, Boolean(pokemon.megaEnabled), pokemon.itemId || '')
    || state.speciesById.get(pokemon.speciesId);
  const speciesName = String(effectiveSpecies?.name || '').trim() || pokemon.speciesId;
  const nickname = String(pokemon.nickname || '').trim();
  const itemName = String(state.itemsById.get(pokemon.itemId || '')?.name || '').trim();
  const abilityName = String(state.abilitiesById.get(pokemon.abilityId || '')?.name || '').trim();
  const natureName = String(getNatureById(pokemon.nature || 'hardy')?.en || 'Hardy').trim();
  const moveNames = (Array.isArray(pokemon.moveIds) ? pokemon.moveIds : [])
    .map(moveId => String(state.movesById.get(moveId || '')?.name || '').trim())
    .filter(Boolean)
    .slice(0, 4);

  const headerBase = nickname && nickname !== speciesName ? `${nickname} (${speciesName})` : speciesName;
  const lines = [itemName ? `${headerBase} @ ${itemName}` : headerBase];
  if (abilityName) lines.push(`Ability: ${abilityName}`);

  const statLabels = [
    ['hp', 'HP'],
    ['atk', 'Atk'],
    ['def', 'Def'],
    ['spa', 'SpA'],
    ['spd', 'SpD'],
    ['spe', 'Spe'],
  ];
  const evParts = statLabels
    .map(([key, label]) => {
      const championsAp = clamp(toNumber(pokemon.evs?.[key], 0), 0, 32);
      const showdownEv = clamp(championsAp * 8, 0, 252);
      if (!showdownEv) return '';
      return `${showdownEv} ${label}`;
    })
    .filter(Boolean);
  if (evParts.length) lines.push(`EVs: ${evParts.join(' / ')}`);

  lines.push(`${natureName} Nature`);
  moveNames.forEach(moveName => {
    lines.push(`- ${moveName}`);
  });
  return lines.join('\n');
}

function openDetailPokepasteExportModal() {
  if (!state.detailExport.modal) return;
  const pokemon = readDetailPokemonFromForm() || getCurrentDetailPokemon();
  if (!pokemon) return;
  if ($('detail-export-title')) $('detail-export-title').textContent = t('detailExportTitle');
  if ($('detail-export-copy')) $('detail-export-copy').textContent = t('detailExportCopy');
  if ($('detail-export-text')) $('detail-export-text').value = buildPokepasteTextFromPokemon(pokemon);
  state.detailExport.modal.show();
}

async function copyDetailPokepasteText() {
  const text = $('detail-export-text')?.value || '';
  if (!text) return;
  try {
    if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(text);
    else {
      $('detail-export-text')?.focus();
      $('detail-export-text')?.select();
      document.execCommand('copy');
    }
    window.alert(t('detailExportCopied'));
  } catch (_error) {
    window.alert(t('detailExportCopied'));
  }
}

function syncCalcSidesFromEditedPokemon(pokemonId) {
  if (!hasCalcPage()) return false;
  const pokemon = getPokemonById(pokemonId);
  if (!pokemon) return false;
  let touched = false;
  if (state.storage.calcLinks.attacker === pokemonId) {
    applyStoredPokemonToSide('attacker', pokemon, { silent: true });
    touched = true;
  }
  if (state.storage.calcLinks.defender === pokemonId) {
    applyStoredPokemonToSide('defender', pokemon, { silent: true });
    touched = true;
  }
  if (touched) {
    saveStorage();
    renderManagerViews();
    updateStatSummaries();
    calculateAndRender();
  }
  return touched;
}

function openPickerImportModal() {
  if (!state.pickerImport.modal) return;
  if ($('picker-import-title')) $('picker-import-title').textContent = t('pickerImportTitle');
  if ($('picker-import-text')) {
    $('picker-import-text').value = '';
    $('picker-import-text').setAttribute('placeholder', t('pickerImportPlaceholder'));
  }
  if ($('picker-import-close')) $('picker-import-close').textContent = t('close');
  if ($('picker-import-button')) $('picker-import-button').innerHTML = `<i class="bi bi-upload"></i> ${t('pickerImportButton')}`;
  $('picker-import-modal').dataset.layered = '1';
  state.pickerImport.modal.show();
}

function renderPickerCreateActions() {
  const container = $('picker-create-actions');
  if (!container) return;
  if (state.picker.currentField !== 'new-box-species') {
    container.classList.add('d-none');
    container.innerHTML = '';
    return;
  }

  container.classList.remove('d-none');
  container.innerHTML = `
    <button id="picker-open-import-modal" class="btn btn-outline-primary btn-sm d-inline-flex align-items-center gap-2" type="button">
      <i class="bi bi-upload"></i><span>${t('pickerImportOpenButton')}</span>
    </button>
  `;
  const importOpenButton = $('picker-open-import-modal');
  if (importOpenButton) importOpenButton.addEventListener('click', openPickerImportModal);
}

function renderDetailHeadSummary(pokemon) {
  if (!$('detail-head-icon') || !pokemon) return;
  const species = getEffectiveSpecies(pokemon.speciesId, Boolean(pokemon.megaEnabled), pokemon.itemId || '')
    || state.speciesById.get(pokemon.speciesId);
  const speciesLabel = displaySpeciesName(species);
  $('detail-head-icon').innerHTML = renderPokemonIconStack(pokemon.speciesId, Boolean(pokemon.megaEnabled), pokemon.itemId, speciesLabel);
  if ($('detail-head-name')) $('detail-head-name').textContent = speciesLabel;
  if ($('detail-head-base-stats')) {
    const baseStats = species?.baseStats || {};
    $('detail-head-base-stats').textContent = `H${baseStats.hp ?? '-'} A${baseStats.atk ?? '-'} B${baseStats.def ?? '-'} C${baseStats.spa ?? '-'} D${baseStats.spd ?? '-'} S${baseStats.spe ?? '-'}`;
    if ($('detail-head-base-total')) {
      const sum = ['hp', 'atk', 'def', 'spa', 'spd', 'spe'].reduce((acc, stat) => acc + toNumber(baseStats[stat], 0), 0);
      $('detail-head-base-total').textContent = `合計 ${sum}`;
    }
  }
  if ($('detail-head-meta')) {
    const typeIcons = (species?.types || []).map(typeName => {
      const iconUrl = getMoveTypeIconUrl(typeName);
      return iconUrl ? `<img class="move-type-icon-chip" src="${iconUrl}" alt="${typeName}" loading="lazy">` : `<span class="small">${typeName}</span>`;
    }).join('');
    $('detail-head-meta').innerHTML = `<span class="entity-icons">${typeIcons}</span>`;
  }
}

function populateDetailForm(pokemon) {
  if (!$('detail-pokemon-id')) return;
  $('detail-pokemon-id').value = pokemon.id;
  if ($('detail-nickname')) $('detail-nickname').value = pokemon.nickname || '';
  const notesElement = getDetailNotesElement();
  if (notesElement) notesElement.value = pokemon.notes || '';
  $('detail-ev-hp').value = clamp(toNumber(pokemon.evs.hp), 0, 32);
  $('detail-ev-atk').value = clamp(toNumber(pokemon.evs.atk), 0, 32);
  $('detail-ev-def').value = clamp(toNumber(pokemon.evs.def), 0, 32);
  $('detail-ev-spa').value = clamp(toNumber(pokemon.evs.spa), 0, 32);
  $('detail-ev-spd').value = clamp(toNumber(pokemon.evs.spd), 0, 32);
  if ($('detail-ev-spe')) $('detail-ev-spe').value = clamp(toNumber(pokemon.evs.spe), 0, 32);
  const megaBaseId = resolveMegaBaseId(pokemon.speciesId);
  const isMegaSpeciesSelected = Boolean(megaBaseId && megaBaseId !== pokemon.speciesId);
  $('detail-mega-enabled').checked = Boolean(pokemon.megaEnabled || isMegaSpeciesSelected);
  fillSpeciesField('detail-species', pokemon.speciesId);
  syncFormeFieldForSide('detail', pokemon.speciesId);
  fillNatureFields($('attacker-nature')?.value || 'modest', $('defender-nature')?.value || 'bold', pokemon.nature);
  const initialItemId = $('detail-mega-enabled').checked
    ? getPreferredMegaItemId(pokemon.speciesId, pokemon.itemId || '')
    : (pokemon.itemId || '');
  fillItemField('detail-item', initialItemId);
  syncDetailMegaToggle(pokemon.abilityId || '');
  updateDetailStatSummaries();
  refreshDetailDerivedViews(pokemon);
  renderDetailMoveList(pokemon);
  $('pokemon-detail-title').textContent = state.lang === 'ja' ? 'ポケモン編集' : 'Edit Pokemon';
}

function openPokemonDetail(pokemonId) {
  if (!state.detail.modal) return;
  const pokemon = getPokemonById(pokemonId);
  if (!pokemon) return;
  state.detail.editingPokemonId = pokemonId;
  populateDetailForm(pokemon);
  state.detail.modal.show();
}

function readDetailPokemonFromForm() {
  if (!$('detail-pokemon-id')) return null;
  const current = getCurrentDetailPokemon();
  if (!current) return null;
  const notesElement = getDetailNotesElement();
  return normalizePokemonRecord({
    ...current,
    speciesId: $('detail-species').value,
    nickname: $('detail-nickname')?.value || '',
    nature: $('detail-nature').value,
    megaEnabled: $('detail-mega-enabled').checked,
    abilityId: $('detail-ability').value,
    itemId: $('detail-item').value,
    evs: {
      hp: clamp(toNumber($('detail-ev-hp').value), 0, 32),
      atk: clamp(toNumber($('detail-ev-atk').value), 0, 32),
      def: clamp(toNumber($('detail-ev-def').value), 0, 32),
      spa: clamp(toNumber($('detail-ev-spa').value), 0, 32),
      spd: clamp(toNumber($('detail-ev-spd').value), 0, 32),
      spe: clamp(toNumber($('detail-ev-spe')?.value), 0, 32),
    },
    ivTotal: CHAMPIONS_IV_TOTAL_MAX,
    notes: notesElement?.value || '',
    moveIds: Array.from({ length: 4 }, (_, index) => $(`detail-move-${index}`)?.value || '').filter(Boolean),
  });
}

function saveDetailPokemon() {
  if (hasDetailEvOverflow()) {
    window.alert(`能力ポイントの合計が上限（${DETAIL_EV_TOTAL_MAX}）を超えています。`);
    return null;
  }
  const updated = readDetailPokemonFromForm();
  if (!updated) return null;
  const index = state.storage.box.findIndex(pokemon => pokemon.id === updated.id);
  if (index === -1) return null;
  state.storage.box[index] = updated;
  const synced = syncCalcSidesFromEditedPokemon(updated.id);
  if (!synced) {
    saveStorage();
    renderManagerViews();
  }
  populateDetailForm(updated);
  return updated;
}

function createNewBoxPokemon(initialPokemon = null) {
  const pokemon = normalizePokemonRecord(initialPokemon || emptyPokemonRecord());
  state.storage.box.push(pokemon);
  saveStorage();
  renderManagerViews();
  if (state.detail.modal) openPokemonDetail(pokemon.id);
}

function removeDetailPokemon() {
  const pokemonId = state.detail.editingPokemonId;
  if (!pokemonId) return;
  state.storage.box = state.storage.box.filter(pokemon => pokemon.id !== pokemonId);
  removePokemonReferences(pokemonId);
  saveStorage();
  renderManagerViews();
  if (state.detail.modal) state.detail.modal.hide();
}

function createPickerOptionsFromBox() {
  return state.storage.box.map(pokemon => ({
    value: pokemon.id,
    label: `${displayPokemonName(pokemon)} ${pokemon.notes ? `| ${pokemon.notes}` : ''}`.trim(),
    iconSpeciesId: pokemon.speciesId,
    iconMegaEnabled: Boolean(pokemon.megaEnabled),
    iconItemId: pokemon.itemId || '',
  }));
}

function createPickerOptionsFromParty() {
  const options = [];
  state.storage.parties.forEach(party => {
    party.slots.forEach((pokemonId, index) => {
      const pokemon = getPokemonById(pokemonId);
      if (!pokemon) return;
      options.push({
        value: pokemon.id,
        label: `${party.name} / ${index + 1}: ${displayPokemonName(pokemon)}`,
        iconSpeciesId: pokemon.speciesId,
        iconMegaEnabled: Boolean(pokemon.megaEnabled),
        iconItemId: pokemon.itemId || '',
      });
    });
  });
  return options;
}

function shouldShowPickerSources(fieldId) {
  return fieldId === 'attacker-species' || fieldId === 'defender-species' || fieldId === 'move-select';
}

function getPickerSourcesForField(fieldId) {
  if (fieldId === 'attacker-species' || fieldId === 'defender-species') return ['list', 'box', 'party'];
  if (fieldId === 'move-select') {
    const linked = getPokemonById(state.storage.calcLinks.attacker);
    const hasLinkedMoves = Boolean(linked && linked.moveIds?.length);
    return hasLinkedMoves ? ['list', 'linked'] : ['list'];
  }
  return ['list'];
}

function refreshPickerSourceTabs() {
  if (!$('picker-source-tabs')) return;
  const sources = getPickerSourcesForField(state.picker.currentField);
  const visible = shouldShowPickerSources(state.picker.currentField);
  if (!sources.includes(state.picker.source)) state.picker.source = 'list';
  $('picker-source-tabs').classList.toggle('d-none', !visible);
  document.querySelectorAll('#picker-source-tabs [data-source]').forEach(button => {
    button.parentElement?.classList.toggle('d-none', !sources.includes(button.dataset.source));
    button.classList.toggle('active', button.dataset.source === state.picker.source);
  });
}

function createPickerOptionsFromLinkedAttackerMoves() {
  const linked = getPokemonById(state.storage.calcLinks.attacker);
  if (!linked || !Array.isArray(linked.moveIds)) return [];
  return linked.moveIds
    .map(moveId => state.movesById.get(moveId))
    .filter(move => Boolean(move) && move.category !== 'Status')
    .map(move => ({ value: move.id, label: displayEntryName(move) }));
}

function renderMovePickerItem(option) {
  const move = state.movesById.get(option.value);
  if (!move) return option.label;
  const typeIcon = getMoveTypeIconUrl(move.type);
  const categoryIcon = getMoveCategoryIconUrl(move.category);
  const powerText = move.basePower != null ? String(move.basePower) : '-';
  return `
    <span class="move-picker-item">
      <span class="move-picker-item-main">
        ${typeIcon ? `<img class="move-type-icon-chip" src="${typeIcon}" alt="" loading="lazy">` : ''}
        ${categoryIcon ? `<img class="move-category-icon-chip" src="${categoryIcon}" alt="" loading="lazy">` : ''}
        <span class="move-picker-name">${option.label}</span>
      </span>
      <span class="move-picker-damage mono">威力 ${powerText}</span>
    </span>
  `;
}

function renderPickerList(query) {
  if (!$('picker-list')) return;
  const list = $('picker-list');
  list.innerHTML = '';
  let options = state.pickerOptions[state.picker.currentField] || [];
  if (state.picker.source === 'box' && shouldShowPickerSources(state.picker.currentField)) options = createPickerOptionsFromBox();
  if (state.picker.source === 'party' && shouldShowPickerSources(state.picker.currentField)) options = createPickerOptionsFromParty();
  if (state.picker.source === 'linked' && state.picker.currentField === 'move-select') options = createPickerOptionsFromLinkedAttackerMoves();
  const normalizedQuery = normalizeSearchText(query);
  const filtered = normalizedQuery ? options.filter(option => normalizeSearchText(option.label).includes(normalizedQuery)) : options;
  if (!filtered.length) {
    const empty = document.createElement('div');
    empty.className = 'picker-empty';
    empty.textContent = t('pickerNoMatch');
    list.appendChild(empty);
    return;
  }
  filtered.forEach(option => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'picker-item';
    const fieldId = state.picker.currentField;
    if (fieldId === 'party-slot' && option.iconSpeciesId) {
      button.innerHTML = `<span class="entity-icons">${renderBoxPickerIcons(option.iconSpeciesId, option.iconMegaEnabled, option.iconItemId)}<span>${option.label}</span></span>`;
    } else if (fieldId.endsWith('species')) {
      if (state.picker.source === 'party' && option.iconSpeciesId) {
        button.innerHTML = `<span class="entity-icons">${renderPartyPickerIcons(option.iconSpeciesId, option.iconMegaEnabled, option.iconItemId)}<span>${option.label}</span></span>`;
      } else if (state.picker.source === 'box' && option.iconSpeciesId) {
        button.innerHTML = `<span class="entity-icons">${renderBoxPickerIcons(option.iconSpeciesId, option.iconMegaEnabled, option.iconItemId)}<span>${option.label}</span></span>`;
      } else if ((state.picker.source === 'box' || state.picker.source === 'party') && option.iconSpeciesId) {
        button.innerHTML = `<span class="entity-icons">${renderPokemonIconStack(option.iconSpeciesId, option.iconMegaEnabled, option.iconItemId)}<span>${option.label}</span></span>`;
      } else {
        const iconUrl = getShowdownPokemonIconUrl(option.value);
        if (iconUrl) button.innerHTML = `<span class="entity-icons"><img class="ps-pokemon-icon" src="${iconUrl}" alt="" loading="lazy"><span>${option.label}</span></span>`;
        else button.textContent = option.label;
      }
      } else if (fieldId === 'move-select' || fieldId.startsWith('detail-move-')) {
        button.innerHTML = renderMovePickerItem(option);
      } else if (fieldId === 'move-type') {
        const iconUrl = getMoveTypeIconUrl(option.value);
        if (iconUrl) button.innerHTML = `<span class="entity-icons"><img class="move-type-icon-chip" src="${iconUrl}" alt="" loading="lazy"><span>${option.label}</span></span>`;
        else button.textContent = option.label;
      } else if (fieldId === 'move-category') {
        const iconUrl = getMoveCategoryIconUrl(option.value);
        if (iconUrl) button.innerHTML = `<span class="entity-icons"><img class="move-category-icon-chip" src="${iconUrl}" alt="" loading="lazy"><span>${option.label}</span></span>`;
        else button.textContent = option.label;
    } else if (fieldId.endsWith('item')) {
      const visual = renderItemVisual(option.value);
      if (visual) button.innerHTML = `<span class="entity-icons">${visual}<span>${option.label}</span></span>`;
      else button.textContent = option.label;
    } else {
      button.textContent = option.label;
    }
    button.addEventListener('click', () => {
      const fieldId = state.picker.currentField;
      const isSpeciesField = fieldId === 'attacker-species' || fieldId === 'defender-species';
      const isFormeField = fieldId === 'attacker-forme' || fieldId === 'defender-forme' || fieldId === 'detail-forme';
      if (fieldId === 'party-slot') {
        const target = state.picker.partySlotTarget;
        if (target) assignPokemonToPartySlot(target.partyId, target.slotIndex, option.value);
      } else if (fieldId === 'new-box-species') {
        createNewBoxPokemon({ ...emptyPokemonRecord(), speciesId: option.value });
      } else 
      if (isSpeciesField && state.picker.source !== 'list') {
        const side = fieldId.startsWith('attacker') ? 'attacker' : 'defender';
        const pokemon = getPokemonById(option.value);
        if (pokemon) applyStoredPokemonToSide(side, pokemon);
      } else if (fieldId === 'detail-species') {
        const megaBaseId = resolveMegaBaseId(option.value);
        const isMegaSelection = Boolean(megaBaseId && megaBaseId !== option.value);
        $('detail-species').value = option.value;
        $('detail-mega-enabled').checked = isMegaSelection || Boolean($('detail-mega-enabled').checked);
        if (isMegaSelection && $('detail-item')) {
          $('detail-item').value = getPreferredMegaItemId(option.value, $('detail-item').value || '');
          updatePickerButtonLabel('detail-item');
        }
        syncFormeFieldForSide('detail', option.value);
        updatePickerButtonLabel('detail-species');
        syncDetailMegaToggle('');
        const draft = readDetailPokemonFromForm() || getCurrentDetailPokemon();
        if (draft) {
          updateDetailStatSummaries();
          refreshDetailDerivedViews(draft);
          renderDetailMoveList(draft);
        }
      } else {
        $(fieldId).value = option.value;
        updatePickerButtonLabel(fieldId);
        if (isFormeField) {
          if (fieldId === 'detail-forme') {
            $('detail-species').value = option.value;
            updatePickerButtonLabel('detail-species');
            syncDetailMegaToggle($('detail-ability')?.value || '');
          } else {
            const side = fieldId.startsWith('attacker') ? 'attacker' : 'defender';
            $(`${side}-species`).value = option.value;
            updatePickerButtonLabel(`${side}-species`);
            syncMegaToggle(side, '');
            renderManagerViews();
          }
        }
        if (fieldId.startsWith('detail-move-')) refreshDetailMoveButton(fieldId);
        if (fieldId.endsWith('-nature')) syncNatureModifierSelectors(fieldId.split('-')[0]);
        if (fieldId === 'detail-nature') syncDetailNatureButtonsFromNature();
        if (fieldId.startsWith('detail-')) updateDetailStatSummaries();
        if (fieldId === 'move-select') recalcMoveFields();
        if (fieldId === 'attacker-item' || fieldId === 'defender-item') {
          const side = fieldId.startsWith('attacker') ? 'attacker' : 'defender';
          const megaToggle = $(`${side}-mega-enabled`);
          if (isMegaStoneItem(option.value) && hasMega($(`${side}-species`).value)) megaToggle.checked = true;
          else if (!isMegaStoneItem(option.value)) megaToggle.checked = false;
          syncMegaToggle(side, $(`${side}-ability`).value);
        }
        if (fieldId === 'detail-item') {
          if (isMegaStoneItem(option.value) && hasMega($('detail-species').value)) $('detail-mega-enabled').checked = true;
          else if (!isMegaStoneItem(option.value)) $('detail-mega-enabled').checked = false;
          syncDetailMegaToggle($('detail-ability').value);
          const draft = readDetailPokemonFromForm() || getCurrentDetailPokemon();
          if (draft) refreshDetailDerivedViews(draft);
        }
        if (fieldId === 'attacker-species' || fieldId === 'defender-species') {
          const side = fieldId.startsWith('attacker') ? 'attacker' : 'defender';
          state.storage.calcLinks[side] = null;
          saveStorage();
          const megaBaseId = resolveMegaBaseId($(fieldId).value);
          const isMegaSelection = Boolean(megaBaseId && megaBaseId !== $(fieldId).value);
          if (isMegaSelection) {
            $(`${side}-mega-enabled`).checked = true;
            const itemInput = $(`${side}-item`);
            if (itemInput) itemInput.value = getPreferredMegaItemId($(fieldId).value, itemInput.value || '');
            updatePickerButtonLabel(`${side}-item`);
          }
          syncMegaToggle(side, '');
          syncFormeFieldForSide(side, $(fieldId).value);
          renderManagerViews();
        }
      }
      if (hasCalcPage()) {
        updateStatSummaries();
        calculateAndRender();
      }
      state.picker.modal.hide();
    });
    list.appendChild(button);
  });
}

function openPicker(fieldId) {
  if (!state.picker.modal) return;
  state.picker.currentField = fieldId;
  state.picker.sideContext = fieldId.startsWith('attacker') ? 'attacker' : (fieldId.startsWith('defender') ? 'defender' : null);
  if (fieldId === 'detail-species') state.picker.source = 'list';
  const meta = getPickerMeta(fieldId);
  $('picker-title').textContent = t(meta?.titleKey || 'pickerMove');
  if (!shouldShowPickerSources(fieldId)) state.picker.source = 'list';
  renderPickerCreateActions();
  refreshPickerSourceTabs();
  $('picker-search').value = '';
  renderPickerList('');
  const detailVisible = fieldId.startsWith('detail-') && state.detail.modal && $('pokemon-detail-modal')?.classList.contains('show');
  $('picker-modal').dataset.layered = detailVisible ? '1' : '0';
  state.picker.modal.show();
}

function bindPickerButtons() {
  Object.entries(STATIC_PICKER_FIELDS).forEach(([fieldId, meta]) => {
    const button = $(meta.buttonId);
    if (button) button.addEventListener('click', () => openPicker(fieldId));
  });
}

function buildMainFormOptions() {
  if (!hasCalcPage()) return;
  const remembered = loadLastSelectedSides();
  const attackerDefault = $('attacker-species').value || remembered?.attackerSpeciesId || 'fluttermane';
  const defenderDefault = $('defender-species').value || remembered?.defenderSpeciesId || 'incineroar';
  fillSpeciesField('attacker-species', attackerDefault);
  fillSpeciesField('defender-species', defenderDefault);
  syncFormeFieldForSide('attacker', attackerDefault);
  syncFormeFieldForSide('defender', defenderDefault);
  fillMoveField($('move-select').value || 'moonblast');
  fillMoveTypeField($('move-type')?.value || 'Fairy');
  fillMoveCategoryField($('move-category')?.value || 'Special');
  fillNatureFields($('attacker-nature')?.value || 'modest', $('defender-nature')?.value || 'bold', $('detail-nature')?.value || 'hardy');
  fillItemField('attacker-item', $('attacker-item')?.value || 'choicescarf');
  fillItemField('defender-item', $('defender-item')?.value || 'sitrusberry');
}

function setupDefaults() {
  if (!hasCalcPage()) return;
  const remembered = loadLastSelectedSides();
  buildMainFormOptions();
  fillTypeSelect();
  $('attacker-rank-def').value = 0;
  $('attacker-rank-atk').value = 0;
  $('attacker-rank-spa').value = 0;
  $('attacker-rank-spd').value = 0;
  $('attacker-rank-spe').value = 0;
  $('defender-rank-atk').value = 0;
  $('defender-rank-def').value = 0;
  $('defender-rank-spa').value = 0;
  $('defender-rank-spd').value = 0;
  $('defender-rank-spe').value = 0;
  setActiveToggle('weather', 'none');
  setActiveToggle('terrain', 'none');
  if ($('is-spread')) $('is-spread').checked = readDoubleBattleModeEnabled();
  if (remembered) {
    if (remembered.attackerNature) $('attacker-nature').value = remembered.attackerNature;
    if (remembered.defenderNature) $('defender-nature').value = remembered.defenderNature;
    if (typeof remembered.attackerMegaEnabled === 'boolean') $('attacker-mega-enabled').checked = remembered.attackerMegaEnabled;
    if (typeof remembered.defenderMegaEnabled === 'boolean') $('defender-mega-enabled').checked = remembered.defenderMegaEnabled;
    if (remembered.attackerItemId) $('attacker-item').value = remembered.attackerItemId;
    if (remembered.defenderItemId) $('defender-item').value = remembered.defenderItemId;
    if (remembered.moveId && state.movesById.has(remembered.moveId)) $('move-select').value = remembered.moveId;
    if (remembered.moveType) $('move-type').value = remembered.moveType;
    if (remembered.moveCategory) $('move-category').value = remembered.moveCategory;
    if ($('move-power')) $('move-power').value = String(clamp(toNumber(remembered.movePower, 80), 0, 400));
    if ($('move-parameter-value')) $('move-parameter-value').value = String(clamp(toNumber(remembered.moveParamValue, 0), 0, 99));
    setActiveToggle('weather', remembered.weather || 'none');
    setActiveToggle('terrain', remembered.terrain || 'none');
    if ($('is-crit')) $('is-crit').checked = Boolean(remembered.isCrit);
    if ($('is-burn')) $('is-burn').checked = Boolean(remembered.isBurn);
    if ($('is-spread')) $('is-spread').checked = Boolean(remembered.isSpread);
    if ($('is-helping-hand')) $('is-helping-hand').checked = Boolean(remembered.isHelpingHand);
    if ($('reflect')) $('reflect').checked = Boolean(remembered.reflect);
    if ($('light-screen')) $('light-screen').checked = Boolean(remembered.lightScreen);
    if ($('defender-full-hp')) $('defender-full-hp').checked = remembered.defenderFullHp !== false;
    if ($('is-friend-guard')) $('is-friend-guard').checked = Boolean(remembered.isFriendGuard);
    if ($('hit-count')) $('hit-count').value = String(clamp(toNumber(remembered.hitCount, 1), 1, 10));
  }
  const restoredFromLinks = restoreSidesFromCalcLinks();
  if (!restoredFromLinks) {
    syncMegaToggle('attacker', remembered?.attackerAbilityId || '');
    syncMegaToggle('defender', remembered?.defenderAbilityId || '');
  }
  if (!restoredFromLinks && $('attacker-ability') && remembered?.attackerAbilityId) {
    const atkOptionExists = Array.from($('attacker-ability').options || []).some(option => option.value === remembered.attackerAbilityId);
    if (atkOptionExists) {
      $('attacker-ability').value = remembered.attackerAbilityId;
      updatePickerButtonLabel('attacker-ability');
    }
  }
  if (!restoredFromLinks && $('defender-ability') && remembered?.defenderAbilityId) {
    const defOptionExists = Array.from($('defender-ability').options || []).some(option => option.value === remembered.defenderAbilityId);
    if (defOptionExists) {
      $('defender-ability').value = remembered.defenderAbilityId;
      updatePickerButtonLabel('defender-ability');
    }
  }
  if ($('attacker-item')) updatePickerButtonLabel('attacker-item');
  if ($('defender-item')) updatePickerButtonLabel('defender-item');
  if ($('attacker-nature')) updatePickerButtonLabel('attacker-nature');
  if ($('defender-nature')) updatePickerButtonLabel('defender-nature');
  recalcMoveFields();
  updateStatSummaries();
}

function refreshLocalizedFields() {
  if (!hasCalcPage()) return;
  const keep = collectInput();
  buildMainFormOptions();
  fillTypeSelect();
  $('attacker-species').value = normalizeSelectedSpeciesId(keep.attackerSpeciesId);
  $('defender-species').value = normalizeSelectedSpeciesId(keep.defenderSpeciesId);
  syncFormeFieldForSide('attacker', keep.attackerSpeciesId);
  syncFormeFieldForSide('defender', keep.defenderSpeciesId);
  $('attacker-nature').value = keep.attackerNature;
  $('defender-nature').value = keep.defenderNature;
  $('attacker-item').value = keep.attackerItemId;
  $('defender-item').value = keep.defenderItemId;
  $('move-select').value = keep.moveId;
  updatePickerButtonLabel('attacker-species');
  updatePickerButtonLabel('defender-species');
  updatePickerButtonLabel('attacker-nature');
  updatePickerButtonLabel('defender-nature');
  syncNatureModifierSelectors('attacker');
  syncNatureModifierSelectors('defender');
  updatePickerButtonLabel('attacker-item');
  updatePickerButtonLabel('defender-item');
  updatePickerButtonLabel('move-select');
  syncMegaToggle('attacker', keep.attackerAbilityId);
  syncMegaToggle('defender', keep.defenderAbilityId);
  recalcMoveFields();
  updateStatSummaries();
  renderManagerViews();
}

function snapshotSide(side) {
  if (!hasCalcPage()) return null;
  return side === 'attacker' ? {
    species: $('attacker-species').value,
    nature: $('attacker-nature').value,
    megaEnabled: $('attacker-mega-enabled').checked,
    ability: $('attacker-ability').value,
    item: $('attacker-item').value,
    evHp: $('attacker-ev-hp').value,
    evAtk: $('attacker-ev-atk').value,
    evDef: $('attacker-ev-def').value,
    evSpa: $('attacker-ev-spa').value,
    evSpd: $('attacker-ev-spd').value,
    evSpe: $('attacker-ev-spe').value,
    rankDef: $('attacker-rank-def').value,
    rankAtk: $('attacker-rank-atk').value,
    rankSpa: $('attacker-rank-spa').value,
    rankSpd: $('attacker-rank-spd').value,
    rankSpe: $('attacker-rank-spe').value,
  } : {
    species: $('defender-species').value,
    nature: $('defender-nature').value,
    megaEnabled: $('defender-mega-enabled').checked,
    ability: $('defender-ability').value,
    item: $('defender-item').value,
    evHp: $('defender-ev-hp').value,
    evAtk: $('defender-ev-atk').value,
    evDef: $('defender-ev-def').value,
    evSpa: $('defender-ev-spa').value,
    evSpd: $('defender-ev-spd').value,
    evSpe: $('defender-ev-spe').value,
    rankAtk: $('defender-rank-atk').value,
    rankDef: $('defender-rank-def').value,
    rankSpa: $('defender-rank-spa').value,
    rankSpd: $('defender-rank-spd').value,
    rankSpe: $('defender-rank-spe').value,
  };
}

function applySideSnapshot(side, data) {
  if (!hasCalcPage() || !data) return;
  $(`${side}-species`).value = normalizeSelectedSpeciesId(data.species);
  syncFormeFieldForSide(side, data.species);
  updatePickerButtonLabel(`${side}-species`);
  $(`${side}-nature`).value = data.nature;
  updatePickerButtonLabel(`${side}-nature`);
  syncNatureModifierSelectors(side);
  $(`${side}-mega-enabled`).checked = data.megaEnabled;
  $(`${side}-item`).value = data.item;
  updatePickerButtonLabel(`${side}-item`);
  if (side === 'attacker') {
    $('attacker-ev-hp').value = data.evHp;
    $('attacker-ev-atk').value = data.evAtk;
    $('attacker-ev-def').value = data.evDef;
    $('attacker-ev-spa').value = data.evSpa;
    $('attacker-ev-spd').value = data.evSpd;
    $('attacker-ev-spe').value = data.evSpe;
    $('attacker-rank-def').value = data.rankDef;
    $('attacker-rank-atk').value = data.rankAtk;
    $('attacker-rank-spa').value = data.rankSpa;
    $('attacker-rank-spd').value = data.rankSpd;
    $('attacker-rank-spe').value = data.rankSpe;
  } else {
    $('defender-ev-hp').value = data.evHp;
    $('defender-ev-atk').value = data.evAtk;
    $('defender-ev-def').value = data.evDef;
    $('defender-ev-spa').value = data.evSpa;
    $('defender-ev-spd').value = data.evSpd;
    $('defender-ev-spe').value = data.evSpe;
    $('defender-rank-atk').value = data.rankAtk;
    $('defender-rank-def').value = data.rankDef;
    $('defender-rank-spa').value = data.rankSpa;
    $('defender-rank-spd').value = data.rankSpd;
    $('defender-rank-spe').value = data.rankSpe;
  }
  syncMegaToggle(side, data.ability);
}

function swapSides() {
  if (!hasCalcPage()) return;
  const attacker = snapshotSide('attacker');
  const defender = snapshotSide('defender');
  const attackerLink = state.storage.calcLinks.attacker;
  const defenderLink = state.storage.calcLinks.defender;
  applySideSnapshot('attacker', {
    species: defender.species,
    nature: defender.nature,
    megaEnabled: defender.megaEnabled,
    ability: defender.ability,
    item: defender.item,
    evHp: defender.evHp,
    evAtk: defender.evAtk,
    evDef: defender.evDef,
    evSpa: defender.evSpa,
    evSpd: defender.evSpd,
    evSpe: defender.evSpe,
    rankAtk: defender.rankAtk,
    rankDef: defender.rankDef,
    rankSpa: defender.rankSpa,
    rankSpd: defender.rankSpd,
    rankSpe: defender.rankSpe,
  });
  applySideSnapshot('defender', {
    species: attacker.species,
    nature: attacker.nature,
    megaEnabled: attacker.megaEnabled,
    ability: attacker.ability,
    item: attacker.item,
    evHp: attacker.evHp,
    evAtk: attacker.evAtk,
    evDef: attacker.evDef,
    evSpa: attacker.evSpa,
    evSpd: attacker.evSpd,
    evSpe: attacker.evSpe,
    rankAtk: attacker.rankAtk,
    rankDef: attacker.rankDef,
    rankSpa: attacker.rankSpa,
    rankSpd: attacker.rankSpd,
    rankSpe: attacker.rankSpe,
  });
  state.storage.calcLinks.attacker = defenderLink;
  state.storage.calcLinks.defender = attackerLink;
  saveStorage();
  renderManagerViews();
  updateStatSummaries();
  calculateAndRender();
}

function applyPresetToSide(side, preset) {
  if (!hasCalcPage() || !preset) return;
  const evs = { hp: 0, atk: 0, def: 0, spa: 0, spd: 0, spe: 0, ...(preset.evs || {}) };
  if (side === 'attacker') {
    $('attacker-nature').value = preset.nature;
    $('attacker-ev-hp').value = String(clamp(toNumber(evs.hp, 0), 0, 32));
    $('attacker-ev-atk').value = String(clamp(toNumber(evs.atk, 0), 0, 32));
    $('attacker-ev-def').value = String(clamp(toNumber(evs.def, 0), 0, 32));
    $('attacker-ev-spa').value = String(clamp(toNumber(evs.spa, 0), 0, 32));
    $('attacker-ev-spd').value = String(clamp(toNumber(evs.spd, 0), 0, 32));
    $('attacker-ev-spe').value = String(clamp(toNumber(evs.spe, 0), 0, 32));
    $('attacker-rank-def').value = '0';
    $('attacker-rank-atk').value = '0';
    $('attacker-rank-spa').value = '0';
    $('attacker-rank-spd').value = '0';
    $('attacker-rank-spe').value = '0';
  } else {
    $('defender-nature').value = preset.nature;
    $('defender-ev-hp').value = String(clamp(toNumber(evs.hp, 0), 0, 32));
    $('defender-ev-atk').value = String(clamp(toNumber(evs.atk, 0), 0, 32));
    $('defender-ev-def').value = String(clamp(toNumber(evs.def, 0), 0, 32));
    $('defender-ev-spa').value = String(clamp(toNumber(evs.spa, 0), 0, 32));
    $('defender-ev-spd').value = String(clamp(toNumber(evs.spd, 0), 0, 32));
    $('defender-ev-spe').value = String(clamp(toNumber(evs.spe, 0), 0, 32));
    $('defender-rank-atk').value = '0';
    $('defender-rank-def').value = '0';
    $('defender-rank-spa').value = '0';
    $('defender-rank-spd').value = '0';
    $('defender-rank-spe').value = '0';
  }
  updatePickerButtonLabel(`${side}-nature`);
  syncNatureModifierSelectors(side);
  updateStatSummaries();
  calculateAndRender();
}

function openPresetModal(side) {
  if (!state.preset.modal) return;
  state.preset.side = side;
  if ($('preset-title')) $('preset-title').textContent = side === 'attacker' ? '攻撃側プリセット' : '防御側プリセット';
  const list = $('preset-list');
  if (list) {
    list.innerHTML = '';
    (SIDE_PRESETS.all || []).forEach(preset => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'picker-item';
      button.textContent = preset.label;
      button.addEventListener('click', () => {
        applyPresetToSide(side, preset);
        state.preset.modal.hide();
      });
      list.appendChild(button);
    });
  }
  state.preset.modal.show();
}

function updateLinkedPokemonFromSide(side) {
  if (!hasCalcPage()) return;
  if (!validateSideNatureForSave(side)) return;
  let pokemon = getPokemonById(state.storage.calcLinks[side]);
  if (!pokemon) {
    const ok = window.confirm(`${side === 'attacker' ? '攻撃側' : '防御側'}に紐付いたポケモンがありません。\n現在の内容で新規ポケモンをボックスに保存しますか？`);
    if (!ok) return;
    pokemon = createPokemonRecordFromSide(side);
    state.storage.box.push(pokemon);
    state.storage.calcLinks[side] = pokemon.id;
  }
  const input = collectInput();
  if (side === 'attacker') {
    pokemon.speciesId = input.attackerSpeciesId;
    pokemon.nature = input.attackerNature;
    pokemon.megaEnabled = input.attackerMegaEnabled;
    pokemon.abilityId = input.attackerAbilityId;
    pokemon.itemId = input.attackerItemId;
    pokemon.evs.hp = input.attackerEvHp;
    pokemon.evs.atk = input.attackerEvAtk;
    pokemon.evs.def = input.attackerEvDef;
    pokemon.evs.spa = input.attackerEvSpa;
    pokemon.evs.spd = input.attackerEvSpd;
    pokemon.evs.spe = input.attackerEvSpe;
    pokemon.ranks.def = input.attackerRankDef;
    pokemon.ranks.atk = input.attackerRankAtk;
    pokemon.ranks.spa = input.attackerRankSpa;
    pokemon.ranks.spd = input.attackerRankSpd;
    pokemon.ranks.spe = input.attackerRankSpe;
  } else {
    pokemon.speciesId = input.defenderSpeciesId;
    pokemon.nature = input.defenderNature;
    pokemon.megaEnabled = input.defenderMegaEnabled;
    pokemon.abilityId = input.defenderAbilityId;
    pokemon.itemId = input.defenderItemId;
    pokemon.evs.hp = input.defenderEvHp;
    pokemon.evs.atk = input.defenderEvAtk;
    pokemon.evs.def = input.defenderEvDef;
    pokemon.evs.spa = input.defenderEvSpa;
    pokemon.evs.spd = input.defenderEvSpd;
    pokemon.evs.spe = input.defenderEvSpe;
    pokemon.ranks.atk = input.defenderRankAtk;
    pokemon.ranks.def = input.defenderRankDef;
    pokemon.ranks.spa = input.defenderRankSpa;
    pokemon.ranks.spd = input.defenderRankSpd;
    pokemon.ranks.spe = input.defenderRankSpe;
  }
  pokemon.moveIds = upsertMoveId(pokemon.moveIds, input.moveId);
  saveStorage();
  renderManagerViews();
  if (state.detail.editingPokemonId === pokemon.id) populateDetailForm(pokemon);
}

function ensureLinkedPokemonForRole(role) {
  let pokemon = getPokemonById(state.storage.calcLinks[role]);
  if (!pokemon) {
    const ok = window.confirm(`${role === 'attacker' ? '攻撃側' : '防御側'}に紐付いたポケモンがありません。\n現在の内容で新規ポケモンをボックスに保存しますか？`);
    if (!ok) return null;
    pokemon = createPokemonRecordFromSide(role);
    state.storage.box.push(pokemon);
    state.storage.calcLinks[role] = pokemon.id;
    saveStorage();
    renderManagerViews();
  }
  return pokemon;
}

function createResultCaptureSnapshotHtml() {
  if (!hasCalcPage()) return '';
  const source = $('result-capture');
  if (!source) return '';
  const clone = source.cloneNode(true);
  clone.removeAttribute('id');
  clone.classList.add('result-capture-embedded');
  clone.querySelectorAll('[id]').forEach(node => node.removeAttribute('id'));
  return clone.outerHTML;
}

function saveCurrentCalcToPokemon(role) {
  if (!hasCalcPage()) return;
  const pokemon = ensureLinkedPokemonForRole(role);
  if (!pokemon) return;
  const ok = window.confirm(`${displayPokemonName(pokemon)} にダメージ計算メモを保存しますか？`);
  if (!ok) return;
  pokemon.calcHistory.push({
    id: generateId('calc'),
    role,
    inputSnapshot: collectInput(),
    resultCaptureHtml: createResultCaptureSnapshotHtml(),
    createdAt: new Date().toISOString(),
  });
  pokemon.calcHistory = pokemon.calcHistory.slice(-MAX_CALC_HISTORY);
  saveStorage();
  if (state.detail.editingPokemonId === pokemon.id) renderDetailCalcHistory(pokemon);
  if (state.confirmSave.modal) state.confirmSave.modal.hide();
}

function openCalcMemoSaveSelector() {
  if (!state.confirmSave.modal || !hasCalcPage()) return;
  $('confirm-save-calc-text').textContent = '保存先を選択してください。';
  state.confirmSave.modal.show();
}

function initPickerModal() {
  if (!$('picker-modal')) return;
  state.picker.modal = new bootstrap.Modal($('picker-modal'));
  $('picker-search').addEventListener('input', () => renderPickerList($('picker-search').value.trim()));
  $('picker-modal').addEventListener('shown.bs.modal', () => {
    const layered = $('picker-modal').dataset.layered === '1';
    const modalZ = layered ? 1085 : 1060;
    const backdropZ = modalZ - 5;
    $('picker-modal').style.zIndex = String(modalZ);
    const backdrops = document.querySelectorAll('.modal-backdrop.show');
    const topBackdrop = backdrops[backdrops.length - 1];
    if (topBackdrop) topBackdrop.style.zIndex = String(backdropZ);
  });
  $('picker-modal').addEventListener('hidden.bs.modal', () => {
    state.picker.currentField = '';
    state.picker.partySlotTarget = null;
    $('picker-search').value = '';
    renderPickerCreateActions();
    $('picker-modal').dataset.layered = '0';
    $('picker-modal').style.zIndex = '';
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.style.zIndex = '';
    });
  });
  document.querySelectorAll('#picker-source-tabs [data-source]').forEach(button => {
    button.addEventListener('click', () => {
      state.picker.source = button.dataset.source;
      refreshPickerSourceTabs();
      renderPickerList($('picker-search').value.trim());
    });
  });
}

function initPickerImportModal() {
  if (!$('picker-import-modal')) return;
  state.pickerImport.modal = new bootstrap.Modal($('picker-import-modal'));
  $('picker-import-modal').addEventListener('shown.bs.modal', () => {
    $('picker-import-modal').style.zIndex = '1095';
    const backdrops = document.querySelectorAll('.modal-backdrop.show');
    const topBackdrop = backdrops[backdrops.length - 1];
    if (topBackdrop) topBackdrop.style.zIndex = '1090';
    $('picker-import-text')?.focus();
  });
  $('picker-import-modal').addEventListener('hidden.bs.modal', () => {
    $('picker-import-modal').style.zIndex = '';
    $('picker-import-modal').dataset.layered = '0';
    if ($('picker-import-text')) $('picker-import-text').value = '';
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.style.zIndex = '';
    });
  });
  if ($('picker-import-button')) {
    $('picker-import-button').addEventListener('click', () => {
      const text = $('picker-import-text')?.value || '';
      importShowdownTextToBox(text);
    });
  }
}

function initDetailModal() {
  if (!$('pokemon-detail-modal')) return;
  state.detail.modal = new bootstrap.Modal($('pokemon-detail-modal'));
  if ($('detail-mega-toggle')) {
    $('detail-mega-toggle').addEventListener('click', () => {
      const megaToggle = $('detail-mega-enabled');
      if (!megaToggle || megaToggle.disabled) return;
      megaToggle.checked = !megaToggle.checked;
      megaToggle.dispatchEvent(new Event('change', { bubbles: true }));
    });
  }
  $('detail-mega-enabled').addEventListener('change', () => {
    syncDetailMegaToggle($('detail-ability').value);
    const pokemon = readDetailPokemonFromForm() || getCurrentDetailPokemon();
    if (pokemon) refreshDetailDerivedViews(pokemon);
  });
  $('detail-save').addEventListener('click', () => {
    if (!window.confirm('データを保存しますか？')) return;
    const saved = saveDetailPokemon();
    if (saved) state.detail.modal.hide();
  });
  if ($('detail-export-pokepaste')) $('detail-export-pokepaste').addEventListener('click', openDetailPokepasteExportModal);
  $('detail-delete').addEventListener('click', removeDetailPokemon);
  $('detail-apply-attacker').addEventListener('click', () => {
    const pokemon = saveDetailPokemon();
    if (!pokemon) return;
    if (hasCalcPage()) {
      applyStoredPokemonToSide('attacker', pokemon);
      state.detail.modal.hide();
      return;
    }
    localStorage.setItem(PENDING_APPLY_KEY, JSON.stringify({ side: 'attacker', pokemonId: pokemon.id }));
    window.location.href = './damage-calc.html';
  });
  $('detail-apply-defender').addEventListener('click', () => {
    const pokemon = saveDetailPokemon();
    if (!pokemon) return;
    if (hasCalcPage()) {
      applyStoredPokemonToSide('defender', pokemon);
      state.detail.modal.hide();
      return;
    }
    localStorage.setItem(PENDING_APPLY_KEY, JSON.stringify({ side: 'defender', pokemonId: pokemon.id }));
    window.location.href = './damage-calc.html';
  });
  if ($('detail-apply-speed')) $('detail-apply-speed').addEventListener('click', () => {
    const pokemon = saveDetailPokemon();
    if (!pokemon) return;
    localStorage.setItem(SPEED_ADJUST_REQUEST_KEY, JSON.stringify({
      pokemonId: pokemon.id,
      returnPath: window.location.pathname,
    }));
    window.location.href = './speed-adjust.html';
  });
  ['detail-nickname', 'detail-notes-other', 'detail-notes', 'detail-ev-hp', 'detail-ev-atk', 'detail-ev-def', 'detail-ev-spa', 'detail-ev-spd', 'detail-ev-spe'].forEach(id => {
    const node = $(id);
    if (!node) return;
    node.addEventListener('input', () => {
      updateDetailStatSummaries();
      const pokemon = readDetailPokemonFromForm();
      if (pokemon) refreshDetailDerivedViews(pokemon);
    });
    node.addEventListener('change', () => {
      updateDetailStatSummaries();
      const pokemon = readDetailPokemonFromForm();
      if (pokemon) refreshDetailDerivedViews(pokemon);
    });
  });

  $('pokemon-detail-modal').addEventListener('hidden.bs.modal', () => {
    if (isDetailEmbedMode()) {
      window.parent?.postMessage({ type: 'champions-detail-closed' }, window.location.origin);
      return;
    }
    if (!isDetailStandaloneMode()) return;
    window.location.href = getStandaloneReturnPath();
  });
  $('pokemon-detail-modal').addEventListener('shown.bs.modal', () => {
    if (isDetailEmbedMode()) {
      window.parent?.postMessage({ type: 'champions-detail-ready' }, window.location.origin);
      return;
    }
  });
}

function initDetailExportModal() {
  if (!$('detail-export-modal')) return;
  state.detailExport.modal = new bootstrap.Modal($('detail-export-modal'));
  if ($('detail-export-copy')) $('detail-export-copy').addEventListener('click', copyDetailPokepasteText);
}

function initConfirmSaveModal() {
  if (!$('confirm-save-calc-modal')) return;
  state.confirmSave.modal = new bootstrap.Modal($('confirm-save-calc-modal'));
  if ($('confirm-save-calc-attacker')) $('confirm-save-calc-attacker').addEventListener('click', () => saveCurrentCalcToPokemon('attacker'));
  if ($('confirm-save-calc-defender')) $('confirm-save-calc-defender').addEventListener('click', () => saveCurrentCalcToPokemon('defender'));
}

function initPresetModal() {
  if (!$('preset-modal')) return;
  state.preset.modal = new bootstrap.Modal($('preset-modal'));
}

function bindEvents() {
  if ($('history-back')) {
    $('history-back').addEventListener('click', () => {
      const canBack = window.history.length > 1 && document.referrer && document.referrer.startsWith(window.location.origin);
      if (canBack) window.history.back();
      else window.location.href = './index.html';
    });
  }
  if ($('swap-sides')) $('swap-sides').addEventListener('click', swapSides);
  if ($('swap-sides-result')) $('swap-sides-result').addEventListener('click', swapSides);
  if ($('save-calc-memo')) $('save-calc-memo').addEventListener('click', openCalcMemoSaveSelector);
  if ($('attacker-open-linked-detail')) $('attacker-open-linked-detail').addEventListener('click', () => openLinkedPokemonDetailFromCalc('attacker'));
  if ($('defender-open-linked-detail')) $('defender-open-linked-detail').addEventListener('click', () => openLinkedPokemonDetailFromCalc('defender'));
  if ($('result-attacker-icons')) $('result-attacker-icons').addEventListener('click', () => openOrCreateLinkedPokemonDetailFromCalc('attacker'));
  if ($('result-defender-icons')) $('result-defender-icons').addEventListener('click', () => openOrCreateLinkedPokemonDetailFromCalc('defender'));
  if ($('result-flow-swap-button')) $('result-flow-swap-button').addEventListener('click', swapSides);
  if ($('result-move')) $('result-move').addEventListener('click', () => openPicker('move-select'));
  if ($('result-move-meta')) $('result-move-meta').addEventListener('click', () => openPicker('move-select'));
  if ($('update-attacker-pokemon')) $('update-attacker-pokemon').addEventListener('click', () => {
    if (!window.confirm('データを保存しますか？')) return;
    updateLinkedPokemonFromSide('attacker');
  });
  if ($('update-defender-pokemon')) $('update-defender-pokemon').addEventListener('click', () => {
    if (!window.confirm('データを保存しますか？')) return;
    updateLinkedPokemonFromSide('defender');
  });
  if ($('add-box-pokemon')) $('add-box-pokemon').addEventListener('click', () => {
    openNewBoxSpeciesPicker();
  });
  if ($('attacker-preset')) $('attacker-preset').addEventListener('click', () => openPresetModal('attacker'));
  if ($('defender-preset')) $('defender-preset').addEventListener('click', () => openPresetModal('defender'));
  if ($('add-party')) $('add-party').addEventListener('click', () => {
    state.storage.parties.push(createEmptyParty());
    saveStorage();
    renderManagerViews();
  });
  if (hasCalcPage()) {
    ['attacker', 'defender'].forEach(side => {
      const megaButton = $(`${side}-mega-toggle`);
      const megaInput = $(`${side}-mega-enabled`);
      if (!megaButton || !megaInput) return;
      megaButton.addEventListener('click', () => {
        if (megaInput.disabled) return;
        megaInput.checked = !megaInput.checked;
        megaInput.dispatchEvent(new Event('change', { bubbles: true }));
      });
    });
    ['attacker', 'defender'].forEach(side => {
      $(`${side}-mega-enabled`).addEventListener('change', () => {
        syncMegaToggle(side, $(`${side}-ability`).value);
        calculateAndRender();
      });
    });
    $('move-power').addEventListener('input', () => {
      updatePickerButtonLabel('move-select');
      calculateAndRender();
    });
    if ($('move-parameter-value')) $('move-parameter-value').addEventListener('input', () => {
      updateMoveParameterUI();
      calculateAndRender();
    });
    ['attacker', 'defender'].forEach(side => {
      const plus = $(`${side}-nature-plus`);
      const minus = $(`${side}-nature-minus`);
      if (plus) plus.addEventListener('change', () => {
        applyNatureFromModifierSelectors(side);
        updateStatSummaries();
        calculateAndRender();
      });
      if (minus) minus.addEventListener('change', () => {
        applyNatureFromModifierSelectors(side);
        updateStatSummaries();
        calculateAndRender();
      });
    });
  }
  document.querySelectorAll('.stat-mod-cycle-btn').forEach(button => {
    button.addEventListener('click', () => {
      const side = button.dataset.side;
      const stat = button.dataset.stat;
      if (!side || !stat || stat === 'hp' || button.disabled) return;
      const labelMap = { hp: 'H', atk: 'A', def: 'B', spa: 'C', spd: 'D', spe: 'S' };
      const base = labelMap[stat] || stat.toUpperCase();
      const current = button.dataset.state || 'neutral';
      const next = current === 'neutral' ? 'plus' : (current === 'plus' ? 'minus' : 'neutral');
      button.dataset.state = next;
      if (side === 'detail') {
        if (next === 'plus') button.textContent = '▲10%';
        else if (next === 'minus') button.textContent = '▼10%';
        else button.textContent = '+-0%';
      } else {
        button.textContent = next === 'plus' ? `${base}+` : (next === 'minus' ? `${base}-` : base);
      }
      applyNatureFromModifierSelectors(side);
      if (side === 'detail') {
        updateDetailStatSummaries();
        const pokemon = readDetailPokemonFromForm() || getCurrentDetailPokemon();
        if (pokemon) {
          renderDetailHeadSummary(pokemon);
          renderDetailWarnings(pokemon);
          renderDetailSpeedMemo(pokemon);
        }
      } else {
        updateStatSummaries();
        calculateAndRender();
      }
    });
  });
  document.querySelectorAll('.badge-btn').forEach(button => {
    button.addEventListener('click', () => {
      setActiveToggle(button.dataset.group, button.dataset.value);
      calculateAndRender();
    });
  });
  ['attacker-ev-hp', 'attacker-ev-atk', 'attacker-ev-def', 'attacker-ev-spa', 'attacker-ev-spd', 'attacker-ev-spe', 'defender-ev-hp', 'defender-ev-atk', 'defender-ev-def', 'defender-ev-spa', 'defender-ev-spd', 'defender-ev-spe', 'hit-count', 'attacker-rank-atk', 'attacker-rank-def', 'attacker-rank-spa', 'attacker-rank-spd', 'attacker-rank-spe', 'defender-rank-atk', 'defender-rank-def', 'defender-rank-spa', 'defender-rank-spd', 'defender-rank-spe'].forEach(id => {
    if (!$(id)) return;
    $(id).addEventListener('input', () => {
      updateStatSummaries();
      calculateAndRender();
    });
    $(id).addEventListener('change', () => {
      updateStatSummaries();
      calculateAndRender();
    });
  });
  ['is-crit', 'is-burn', 'is-spread', 'is-helping-hand', 'reflect', 'light-screen', 'defender-full-hp', 'is-friend-guard'].forEach(id => {
    if ($(id)) $(id).addEventListener('change', calculateAndRender);
  });
  bindPickerButtons();
  document.querySelectorAll('#lang-tabs [data-lang]').forEach(button => {
    button.addEventListener('click', () => {
      state.lang = button.dataset.lang;
      applyLanguageChange();
    });
  });
  window.addEventListener('poketools:battlemodechange', event => {
    if (!hasCalcPage() || !$('is-spread')) return;
    const enabled = event?.detail?.doubleBattle !== false;
    $('is-spread').checked = enabled;
    calculateAndRender();
  });
}

async function initialize() {
  const [dataResponse, jaTranslationsResponse] = await Promise.all([
    fetch('./db/champions-calc-data.json', { cache: 'no-store' }),
    fetch('./db/champions-ja-translations.json', { cache: 'no-store' }),
  ]);
  if (!dataResponse.ok) throw new Error(`Failed to load data: ${dataResponse.status}`);
  state.data = await dataResponse.json();
  const jaTranslations = jaTranslationsResponse.ok ? await jaTranslationsResponse.json() : null;
  ensureDetailDialogStyles();
  populateDetailEvSelectOptions();
  populateCalcStatSelectOptions();
  setupLookups(state.data);
  state.availableFormats = [currentFormatLabel()];
  setupLocalizedNameMapsFromData(jaTranslations);
  loadLanguagePreference();
  loadStorage();
  initPickerModal();
  initPickerImportModal();
  initDetailModal();
  initDetailExportModal();
  initConfirmSaveModal();
  initPresetModal();
  initMobileBattleTabs();
  applyI18n();
  refreshConditionToggleLabels();
  applyCompactFieldTitles();
  updateLangTabs();
  setupDefaults();
  setupDetailEmbedLayout();
  setupDetailStandaloneLayout();
  bindEvents();
  if (hasCalcPage()) {
    try {
      const pending = JSON.parse(localStorage.getItem(PENDING_APPLY_KEY) || 'null');
      if (pending?.side && pending?.pokemonId) {
        const pokemon = getPokemonById(pending.pokemonId);
        if (pokemon) applyStoredPokemonToSide(pending.side, pokemon);
      }
    } catch (_error) {
      // ignore invalid persisted state
    }
    localStorage.removeItem(PENDING_APPLY_KEY);
    updateLinkedDetailButtons();
    updateMoveParameterUI();
    try {
      const openRequest = JSON.parse(localStorage.getItem(OPEN_DETAIL_REQUEST_KEY) || 'null');
      if (openRequest?.pokemonId && getPokemonById(openRequest.pokemonId)) openPokemonDetail(openRequest.pokemonId);
    } catch (_error) {
      // ignore invalid persisted state
    }
    localStorage.removeItem(OPEN_DETAIL_REQUEST_KEY);
  }
  if (hasManagerPage() && state.detail.modal) {
    try {
      const openRequest = JSON.parse(localStorage.getItem(OPEN_DETAIL_REQUEST_KEY) || 'null');
      if (openRequest?.pokemonId && getPokemonById(openRequest.pokemonId)) openPokemonDetail(openRequest.pokemonId);
      else if (isDetailStandaloneMode()) window.location.href = getStandaloneReturnPath();
    } catch (_error) {
      // ignore invalid persisted state
    }
    localStorage.removeItem(OPEN_DETAIL_REQUEST_KEY);
  }
  if (!isDetailStandaloneMode()) {
    renderManagerViews();
    calculateAndRender();
  }
}

initialize().catch(error => {
  if ($('result-main')) $('result-main').textContent = 'ERROR';
  if ($('result-type-effect')) $('result-type-effect').textContent = String(error.message || error);
  if ($('result-extra')) $('result-extra').textContent = '-';
  if ($('result-ko-rate')) $('result-ko-rate').textContent = '-';
  if ($('result-random-bar')) $('result-random-bar').innerHTML = '';
  if (!$('result-main')) window.alert(`初期化エラー: ${String(error.message || error)}`);
});