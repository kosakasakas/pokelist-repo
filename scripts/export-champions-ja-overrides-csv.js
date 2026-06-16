const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INPUT_FILE = path.join(ROOT, 'public', 'db', 'champions-ja-overrides.json');
const OUTPUT_DIR = path.join(ROOT, 'public', 'db');
const OUTPUT_PREFIX = 'champions-ja-overrides-translate-part';
const DEFAULT_PART_COUNT = 3;
const DEFAULT_START_PART = 1;

const SECTIONS = [
  'species',
  'moves',
  'abilities',
  'items',
  'moveTargets',
  'typeNames',
  'moveCategories',
  'moveFlags',
  'moveTags',
];

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

function normalizeEntry(entry) {
  return {
    id: String(entry?.id || '').trim(),
    name: String(entry?.name || '').trim(),
    nameJa: String(entry?.nameJa || '').trim(),
    shortDescEn: String(entry?.shortDescEn || '').trim(),
    descEn: String(entry?.descEn || '').trim(),
    shortDescJa: String(entry?.shortDescJa || '').trim(),
    descJa: String(entry?.descJa || '').trim(),
  };
}

function getArgValue(flag, fallback) {
  const target = process.argv.slice(2).find(arg => arg.startsWith(`${flag}=`));
  if (!target) return fallback;
  const raw = target.slice(flag.length + 1);
  const parsed = Number.parseInt(raw, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function isUntranslated(row) {
  const hasName = Boolean(String(row.name || '').trim());
  const hasNameJa = Boolean(String(row.nameJa || '').trim());
  const hasShortEn = Boolean(String(row.shortDescEn || '').trim());
  const hasDescEn = Boolean(String(row.descEn || '').trim());
  const hasShortJa = Boolean(String(row.shortDescJa || '').trim());
  const hasDescJa = Boolean(String(row.descJa || '').trim());

  if (hasName && !hasNameJa) return true;
  if (hasShortEn && !hasShortJa) return true;
  if (hasDescEn && !hasDescJa) return true;
  return false;
}

function main() {
  if (!fs.existsSync(INPUT_FILE)) {
    throw new Error(`Missing input file: ${INPUT_FILE}`);
  }

  const raw = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf8'));
  const rows = [];

  SECTIONS.forEach(section => {
    const list = Array.isArray(raw?.[section]) ? raw[section] : [];
    list.forEach(entry => {
      const normalized = normalizeEntry(entry);
      if (!normalized.id) return;
      rows.push({ section, ...normalized });
    });
  });

  rows.sort((a, b) => {
    if (a.section !== b.section) return a.section.localeCompare(b.section);
    return a.id.localeCompare(b.id);
  });

  const untranslatedOnly = process.argv.includes('--untranslated');
  const startPart = getArgValue('--start-part', DEFAULT_START_PART);
  const partCount = getArgValue('--part-count', DEFAULT_PART_COUNT);
  const filteredRows = untranslatedOnly ? rows.filter(isUntranslated) : rows;

  if (!filteredRows.length) {
    console.log('no rows to export');
    return;
  }

  const chunkSize = Math.max(1, Math.ceil(filteredRows.length / partCount));
  for (let i = 0; i < partCount; i += 1) {
    const partRows = filteredRows.slice(i * chunkSize, (i + 1) * chunkSize);
    if (!partRows.length) continue;
    const outputPath = path.join(OUTPUT_DIR, `${OUTPUT_PREFIX}${startPart + i}.csv`);
    writeCsv(outputPath, CSV_HEADERS, partRows);
    console.log(`wrote: ${path.relative(ROOT, outputPath)} (${partRows.length} rows)`);
  }

  console.log(`done: total rows=${rows.length}, exported=${filteredRows.length}, split=${partCount}, startPart=${startPart}, untranslatedOnly=${untranslatedOnly}`);
}

main();
