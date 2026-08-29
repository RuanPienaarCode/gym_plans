/* Regenerate plans.json FROM the plan files, so the index can never drift
   from what is actually in the repo. Run after adding or editing a plan:
     node scripts/build-index.mjs
   Fails loudly if a plan references an exercise this repo does not define —
   a downloadable plan whose exercises are missing is a broken plan. */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { basename } from 'node:path';

const fmOf = t => {
  const m = t.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fm = {};
  if (m) for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) {
      let v = line.slice(i + 1).trim();
      if (/^".*"$/.test(v)) v = v.slice(1, -1);
      else if (/^\[.*\]$/.test(v)) v = v.slice(1, -1).split(',').map(s => s.trim().replace(/^"|"$/g, '')).filter(Boolean);
      fm[line.slice(0, i).trim()] = v;
    }
  }
  return { fm, body: m ? t.slice(m[0].length) : t };
};

/* EXACT names, not lowercased: a plan is downloaded by fetching
   exercises/<name>.md over https, and that is case-sensitive. Validating
   case-insensitively here once let "Jog on the spot" pass while the file was
   "Jog on the Spot.md" — green index, broken install. */
const known = new Set(readdirSync('exercises').filter(f => f.endsWith('.md')).map(f => basename(f, '.md')));
const plans = [];
const problems = [];

for (const file of readdirSync('plans').filter(f => f.endsWith('.md')).sort()) {
  const text = readFileSync(`plans/${file}`, 'utf8');
  const { fm, body } = fmOf(text);
  const days = [], exercises = new Set();
  let inDay = false;
  for (const line of body.split(/\r?\n/)) {
    const h = line.match(/^##\s+(.+?)\s*\((mon|tue|wed|thu|fri|sat|sun|any)\)\s*$/i);
    if (h) { days.push({ name: h[1].trim(), weekday: h[2].toLowerCase() }); inDay = true; continue; }
    const t = line.trim();
    /* Bullets in the INTRO are prose (a checklist, a progression) — only a
       bullet inside a day is a prescription, exactly as plan-parse reads it. */
    if (inDay && t.startsWith('- ')) exercises.add(t.slice(2).split('|')[0].trim());
  }
  for (const ex of exercises) {
    if (known.has(ex)) continue;
    const near = [...known].find(k => k.toLowerCase() === ex.toLowerCase());
    problems.push(near
      ? `${file}: "${ex}" does not match the file exactly — did you mean "${near}"?`
      : `${file}: no exercise definition for "${ex}"`);
  }
  const intro = body.split(/^##\s/m)[0].split(/\r?\n/).filter(l => l.trim());
  plans.push({
    id: basename(file, '.md'),
    name: (fm.name || basename(file, '.md').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())),
    summary: (intro[0] || '').slice(0, 200),
    series: fm.series || null,
    phase: fm.phase ? Number(fm.phase) : null,
    phase_of: fm.phase_of ? Number(fm.phase_of) : null,
    parallel: fm.parallel === 'true',
    fallback: fm.fallback === 'true',
    days: days.length,
    weekdays: days.map(d => d.weekday),
    file: `plans/${file}`,
    exercises: [...exercises].sort(),
  });
}

if (problems.length) {
  console.error('index NOT written — fix these first:\n  ' + problems.join('\n  '));
  process.exit(1);
}

const index = { version: 1, updated: new Date().toISOString().slice(0, 10), plans };
writeFileSync('plans.json', JSON.stringify(index, null, 2) + '\n');
console.log(`plans.json written: ${plans.length} plans, ${known.size} exercise definitions`);
