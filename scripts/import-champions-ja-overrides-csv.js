const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const INPUT_JSON = path.join(ROOT, 'public', 'db', 'champions-ja-overrides.json');
const INPUT_DIR = path.join(ROOT, 'public', 'db');
const INPUT_PREFIX = 'champions-ja-overrides-translate-part';

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

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];

    if (ch === '"') {
      if (inQuotes && text[i + 1] === '"') {
        field += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (ch === ',' && !inQuotes) {
      row.push(field);
      field = '';
      continue;
    }

    if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && text[i + 1] === '\n') i += 1;
      row.push(field);
      if (row.length > 1 || row[0] !== '') rows.push(row);
      row = [];
      field = '';
      continue;
    }

    field += ch;
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function readCsvRecords(filePath) {
  const text = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  const lines = parseCsv(text);
  if (!lines.length) return [];
  const headers = lines[0].map(value => String(value || '').trim());
  return lines.slice(1).map(values => {
    const record = {};
    headers.forEach((header, idx) => {
      record[header] = values[idx] == null ? '' : String(values[idx]);
    });
    return record;
  });
}

function ensureSections(obj) {
  SECTIONS.forEach(section => {
    if (!Array.isArray(obj[section])) obj[section] = [];
  });
}

function indexById(list) {
  const map = new Map();
  list.forEach((entry, idx) => {
    const id = String(entry?.id || '').trim();
    if (!id) return;
    map.set(id, idx);
  });
  return map;
}

function applyRecord(target, record) {
  target.id = String(record.id || '').trim();
  target.name = String(record.name || '').trim();
  target.nameJa = String(record.nameJa || '').trim();
  target.shortDescEn = String(record.shortDescEn || '').trim();
  target.descEn = String(record.descEn || '').trim();
  target.shortDescJa = String(record.shortDescJa || '').trim();
  target.descJa = String(record.descJa || '').trim();
}

function sortSections(data) {
  SECTIONS.forEach(section => {
    data[section].sort((a, b) => String(a.id || '').localeCompare(String(b.id || '')));
  });
}

function getCsvPartPaths() {
  if (!fs.existsSync(INPUT_DIR)) return [];
  const names = fs.readdirSync(INPUT_DIR);
  const parts = names
    .map(name => {
      const match = name.match(/^champions-ja-overrides-translate-part(\d+)\.csv$/);
      if (!match) return null;
      return {
        number: Number.parseInt(match[1], 10),
        path: path.join(INPUT_DIR, name),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.number - b.number);
  return parts;
}

function main() {
  if (!fs.existsSync(INPUT_JSON)) {
    throw new Error(`Missing input json: ${INPUT_JSON}`);
  }

  const overrides = JSON.parse(fs.readFileSync(INPUT_JSON, 'utf8'));
  ensureSections(overrides);

  const csvParts = getCsvPartPaths();
  if (!csvParts.length) {
    throw new Error(`No CSV parts found in: ${INPUT_DIR}`);
  }

  let totalRecords = 0;
  csvParts.forEach(part => {
    const csvPath = part.path;
    const records = readCsvRecords(csvPath);
    totalRecords += records.length;

    records.forEach(record => {
      const section = String(record.section || '').trim();
      const id = String(record.id || '').trim();
      if (!section || !id) return;
      if (!SECTIONS.includes(section)) return;

      const list = overrides[section];
      const idxMap = indexById(list);
      const existingIndex = idxMap.get(id);
      if (existingIndex == null) {
        const next = {};
        applyRecord(next, record);
        list.push(next);
      } else {
        applyRecord(list[existingIndex], record);
      }
    });
  });

  sortSections(overrides);
  overrides.meta = {
    ...(overrides.meta || {}),
    mergedFromCsvAt: new Date().toISOString(),
  };

  fs.writeFileSync(INPUT_JSON, `${JSON.stringify(overrides, null, 2)}\n`, 'utf8');
  console.log(`merged CSV into ${path.relative(ROOT, INPUT_JSON)} (records=${totalRecords}, parts=${csvParts.length})`);
}

main();
