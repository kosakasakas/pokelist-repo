const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const CALC_DATA_FILE = path.join(ROOT, 'public', 'db', 'champions-calc-data.json');
const TRANSLATIONS_FILE = path.join(ROOT, 'public', 'db', 'champions-ja-translations.json');
const OUTPUT_DIR = path.join(ROOT, 'public', 'db');
const OUTPUT_PREFIX = 'champions-ja-overrides-translate-part';

const CSV_HEADERS = [
  'section',
  'id',
  'name',
  'nameJa',
  'shortDescEn',
  'descEn',
  'shortDescJa',
  'descJa',
];

function csvEscape(value) {
  const text = String(value == null ? '' : value);
  if (/[",\n\r]/.test(text)) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function writeCsv(filePath, headers, rows) {
  const lines = [headers.join(',')];
  rows.forEach(row => {
    lines.push(headers.map(header => csvEscape(row[header] || '')).join(','));
  });
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function isTranslated(entry) {
  return !!(entry?.nameJa?.trim() || entry?.descJa?.trim());
}

function main() {
  if (!fs.existsSync(CALC_DATA_FILE)) {
    throw new Error(`Missing: ${CALC_DATA_FILE}`);
  }

  const calcData = JSON.parse(fs.readFileSync(CALC_DATA_FILE, 'utf8'));
  const translations = fs.existsSync(TRANSLATIONS_FILE)
    ? JSON.parse(fs.readFileSync(TRANSLATIONS_FILE, 'utf8'))
    : { moves: [] };

  const translatedIds = new Set(
    Array.isArray(translations?.moves)
      ? translations.moves.filter(m => m?.id).map(m => m.id)
      : []
  );

  const allMoves = Array.isArray(calcData?.moves) ? calcData.moves : [];
  const rows = allMoves
    .filter(move => !translatedIds.has(move?.id))
    .map(move => ({
      section: 'moves',
      id: String(move?.id || '').trim(),
      name: String(move?.name || '').trim(),
      nameJa: '',
      shortDescEn: String(move?.shortDesc || '').trim(),
      descEn: String(move?.desc || '').trim(),
      shortDescJa: '',
      descJa: '',
    }))
    .sort((a, b) => a.id.localeCompare(b.id));

  if (!rows.length) {
    console.log('no untranslated moves to export');
    return;
  }

  const partCount = 6;
  const chunkSize = Math.max(1, Math.ceil(rows.length / partCount));
  let startPart = 7;

  for (let i = 0; i < partCount; i += 1) {
    const partRows = rows.slice(i * chunkSize, (i + 1) * chunkSize);
    if (!partRows.length) continue;
    const outputPath = path.join(OUTPUT_DIR, `${OUTPUT_PREFIX}${startPart + i}.csv`);
    writeCsv(outputPath, CSV_HEADERS, partRows);
    console.log(`wrote: ${path.relative(ROOT, outputPath)} (${partRows.length} rows)`);
  }

  console.log(`done: total moves=${rows.length}, split=${partCount}, startPart=${startPart}`);
}

main();
