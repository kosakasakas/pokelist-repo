const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DATA_FILE = path.join(ROOT, 'public', 'db', 'champions-calc-data.json');
const CSV_DIR = path.join(ROOT, 'public', 'csv');

const CSV_FILES = {
  species: path.join(CSV_DIR, 'champions-pokemon.csv'),
  moves: path.join(CSV_DIR, 'champions-moves.csv'),
  abilities: path.join(CSV_DIR, 'champions-abilities.csv'),
  items: path.join(CSV_DIR, 'champions-items.csv'),
};

function toId(text) {
  return String(text || '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function csvEscape(value) {
  const text = String(value == null ? '' : value);
  if (text.includes('"') || text.includes(',') || text.includes('\n') || text.includes('\r')) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

function parseCsvLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i += 1;
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

function readCsvRecordsSafe(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const text = fs.readFileSync(filePath, 'utf8').replace(/^\uFEFF/, '');
  const lines = text.split(/\r?\n/).filter(Boolean);
  if (!lines.length) return [];
  const headers = parseCsvLine(lines[0]);
  return lines.slice(1).map(line => {
    const values = parseCsvLine(line);
    const record = {};
    headers.forEach((header, index) => {
      record[header] = values[index] || '';
    });
    return record;
  });
}

function writeCsv(filePath, headers, rows) {
  const lines = [headers.join(',')];
  rows.forEach(row => {
    lines.push(headers.map(header => csvEscape(row[header] || '')).join(','));
  });
  fs.writeFileSync(filePath, `${lines.join('\n')}\n`, 'utf8');
}

function chooseJaName(...candidates) {
  for (const candidate of candidates) {
    const text = String(candidate || '').trim();
    if (text) return text;
  }
  return '';
}

function buildExistingMap(records, keyResolver, nameResolver) {
  const map = new Map();
  records.forEach(record => {
    const key = keyResolver(record);
    const name = nameResolver(record);
    if (key && name && !map.has(key)) map.set(key, name);
  });
  return map;
}

function main() {
  if (!fs.existsSync(DATA_FILE)) {
    throw new Error('champions-calc-data.json が見つかりません。先に npm run build:data を実行してください。');
  }
  if (!fs.existsSync(CSV_DIR)) fs.mkdirSync(CSV_DIR, { recursive: true });

  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

  const speciesExisting = buildExistingMap(
    readCsvRecordsSafe(CSV_FILES.species),
    record => toId(record.ShowdownKey || ''),
    record => chooseJaName(record['名前(フォルム)'], record['名前'])
  );
  const moveExisting = buildExistingMap(
    readCsvRecordsSafe(CSV_FILES.moves),
    record => String(Number(record.ID) || ''),
    record => chooseJaName(record['わざ名'])
  );
  const abilityExisting = buildExistingMap(
    readCsvRecordsSafe(CSV_FILES.abilities),
    record => String(Number(record.ID) || ''),
    record => chooseJaName(record['特性'])
  );
  const itemExisting = buildExistingMap(
    readCsvRecordsSafe(CSV_FILES.items),
    record => toId(record.ShowdownKey || record.ID || ''),
    record => chooseJaName(record['名前'], record['どうぐ名'], record['道具名'])
  );

  const speciesRows = [...(data.species || []), ...(data.megaSpecies || [])]
    .sort((left, right) => (Number(left.num) || 0) - (Number(right.num) || 0) || String(left.id).localeCompare(String(right.id)))
    .map(entry => ({
      ShowdownKey: entry.id,
      名前: chooseJaName(speciesExisting.get(entry.id), entry.nameJa, entry.name),
    }));

  const moveRows = (data.moves || [])
    .filter(entry => Number.isFinite(Number(entry.num)))
    .sort((left, right) => Number(left.num) - Number(right.num))
    .map(entry => ({
      ID: String(entry.num),
      わざ名: chooseJaName(moveExisting.get(String(entry.num)), entry.nameJa, entry.name),
    }));

  const abilityRows = (data.abilities || [])
    .filter(entry => Number.isFinite(Number(entry.num)))
    .sort((left, right) => Number(left.num) - Number(right.num))
    .map(entry => ({
      ID: String(entry.num),
      特性: chooseJaName(abilityExisting.get(String(entry.num)), entry.nameJa, entry.name),
    }));

  const itemRows = (data.items || [])
    .sort((left, right) => String(left.id).localeCompare(String(right.id)))
    .map(entry => ({
      ShowdownKey: entry.id,
      名前: chooseJaName(itemExisting.get(entry.id), entry.nameJa, entry.name),
    }));

  writeCsv(CSV_FILES.species, ['ShowdownKey', '名前'], speciesRows);
  writeCsv(CSV_FILES.moves, ['ID', 'わざ名'], moveRows);
  writeCsv(CSV_FILES.abilities, ['ID', '特性'], abilityRows);
  writeCsv(CSV_FILES.items, ['ShowdownKey', '名前'], itemRows);

  console.log(`Generated CSVs: species=${speciesRows.length}, moves=${moveRows.length}, abilities=${abilityRows.length}, items=${itemRows.length}`);
}

main();
