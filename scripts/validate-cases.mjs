// يتحقق من ملفات القضايا في data/cases/*.js حسب docs/case-format.md
// التشغيل:  node scripts/validate-cases.mjs            (يفحص data/cases في المشروع)
//           node scripts/validate-cases.mjs <مجلد>     (يفحص مجلدًا آخر، مفيد للتجربة)
// النتيجة: exit code 0 إذا ما فيه أخطاء، و1 عند أي خطأ. التحذيرات ما تفشّل الفحص.
// بدون أي حزم خارجية.

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const projectDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const argDir = process.argv[2];
const casesDir = argDir ? path.resolve(argDir) : path.join(projectDir, 'data', 'cases');
const usingProjectDir = !argDir;

// القيم المسموحة (من docs/case-format.md)
const REGIONS = ['gulf', 'mena', 'europe', 'americas', 'africa', 'asia', 'international'];
const TAGS = ['constitutional', 'civil', 'commercial', 'international', 'ip-tech', 'rights', 'environment', 'health', 'criminal'];
const SOURCE_STATUS = ['confirmed', 'likely', 'unread'];
const REVIEW = ['reviewed', 'draft'];
const STAGE_ORDER = ['basis', 'opening', 'evidence', 'rebuttal', 'closing'];
const ORIGINS = ['documented', 'adapted'];
const WINNERS = ['A', 'B', 'mixed'];
const VOTE_STATUS = ['confirmed', 'likely'];
const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const KNOWN_KEYS = ['id', 'title', 'country', 'region', 'court', 'year', 'date', 'tags', 'hook', 'parties', 'facts', 'sources', 'review', 'evidence', 'stages', 'verdict'];

const wordCount = (s) => (typeof s === 'string' ? s.trim().split(/\s+/).filter(Boolean).length : 0);
const isObj = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

function checkCase(c, fileId, errors, warnings) {
  const err = (m) => errors.push(m);
  const warn = (m) => warnings.push(m);

  // نص بلغتين {ar, en}. needEn = لازم يكون en معبأ (title, country, court, parties)
  function loc(v, where, { needEn = false, optional = false } = {}) {
    if (v === undefined && optional) return;
    if (!isObj(v)) { err(`${where}: لازم يكون كائن {ar, en}`); return; }
    if (typeof v.ar !== 'string' || !v.ar.trim()) err(`${where}.ar: فاضي أو ناقص`);
    if (typeof v.en !== 'string') err(`${where}.en: لازم يكون نص (ولو فاضي "")`);
    else if (needEn && !v.en.trim()) err(`${where}.en: لازم يكون معبأ في هذا الحقل`);
  }

  if (!isObj(c)) { err('القضية مو كائن'); return; }
  for (const k of Object.keys(c)) if (!KNOWN_KEYS.includes(k)) warn(`حقل غير معروف: ${k}`);

  // id
  if (typeof c.id !== 'string' || !ID_RE.test(c.id)) err(`id: لازم حروف إنجليزية صغيرة وأرقام وشرطة (القيمة: ${JSON.stringify(c.id)})`);
  else if (c.id !== fileId) err(`id "${c.id}" لا يطابق اسم الملف "${fileId}.js"`);

  loc(c.title, 'title', { needEn: true });
  loc(c.country, 'country', { needEn: true });
  loc(c.court, 'court', { needEn: true });
  loc(c.hook, 'hook');
  loc(c.facts, 'facts');
  if (isObj(c.facts) && typeof c.facts.ar === 'string') {
    const n = wordCount(c.facts.ar);
    if (n < 80 || n > 140) warn(`facts.ar: ${n} كلمة (المطلوب 80 إلى 140)`);
  }

  if (!REGIONS.includes(c.region)) err(`region: "${c.region}" غير مسموح. المسموح: ${REGIONS.join(' | ')}`);

  if (!Number.isInteger(c.year) || c.year < 1000 || c.year > 2100) err(`year: لازم رقم صحيح لسنة (القيمة: ${JSON.stringify(c.year)})`);
  if (c.date !== undefined) {
    if (typeof c.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(c.date)) err(`date: لازم بالشكل YYYY-MM-DD (القيمة: ${JSON.stringify(c.date)})`);
    else if (Number(c.date.slice(0, 4)) !== c.year) warn(`date (${c.date}) سنته غير year (${c.year})`);
  }

  if (!Array.isArray(c.tags) || c.tags.length === 0) err('tags: لازم مصفوفة فيها تصنيف واحد على الأقل');
  else {
    c.tags.forEach((t) => { if (!TAGS.includes(t)) err(`tags: "${t}" غير مسموح. المسموح: ${TAGS.join(' | ')}`); });
    if (new Set(c.tags).size !== c.tags.length) err('tags: فيه تكرار');
  }

  // الأطراف
  if (!isObj(c.parties)) err('parties: ناقص');
  else for (const s of ['A', 'B']) {
    const p = c.parties[s];
    if (!isObj(p)) { err(`parties.${s}: ناقص`); continue; }
    loc(p.name, `parties.${s}.name`, { needEn: true });
    loc(p.role, `parties.${s}.role`, { needEn: true });
  }

  // المصادر
  if (!Array.isArray(c.sources) || c.sources.length === 0) err('sources: لازم مصدر واحد على الأقل');
  else c.sources.forEach((s, i) => {
    const w = `sources[${i}]`;
    if (!isObj(s)) { err(`${w}: مو كائن`); return; }
    if (typeof s.title !== 'string' || !s.title.trim()) err(`${w}.title: فاضي`);
    if (typeof s.url !== 'string' || !/^https:\/\/[^\s]+$/.test(s.url)) err(`${w}.url: لازم يبدأ بـ https:// وبدون مسافات (القيمة: ${JSON.stringify(s.url)})`);
    if (!SOURCE_STATUS.includes(s.status)) err(`${w}.status: "${s.status}" غير مسموح. المسموح: ${SOURCE_STATUS.join(' | ')}`);
  });

  if (!REVIEW.includes(c.review)) err(`review: "${c.review}" غير مسموح. المسموح: ${REVIEW.join(' | ')}`);

  // الأدلة
  const evidenceIds = new Set();
  if (!Array.isArray(c.evidence)) err('evidence: لازم مصفوفة');
  else {
    if (c.evidence.length < 3 || c.evidence.length > 5) err(`evidence: فيه ${c.evidence.length} أدلة (المطلوب 3 إلى 5)`);
    c.evidence.forEach((e, i) => {
      const w = `evidence[${i}]`;
      if (!isObj(e)) { err(`${w}: مو كائن`); return; }
      if (typeof e.id !== 'string' || !e.id.trim()) err(`${w}.id: ناقص`);
      else if (evidenceIds.has(e.id)) err(`${w}.id: "${e.id}" مكرر`);
      else evidenceIds.add(e.id);
      loc(e.label, `${w}.label`);
      loc(e.detail, `${w}.detail`);
    });
  }

  // المراحل
  if (!Array.isArray(c.stages)) err('stages: لازم مصفوفة');
  else {
    if (c.stages.length !== 5) err(`stages: فيه ${c.stages.length} مراحل (المطلوب 5 بالضبط)`);
    c.stages.forEach((st, i) => {
      const w = `stages[${i}]`;
      if (!isObj(st)) { err(`${w}: مو كائن`); return; }
      if (st.type !== STAGE_ORDER[i]) err(`${w}.type: "${st.type}" والمتوقع "${STAGE_ORDER[i]}" (الترتيب: ${STAGE_ORDER.join(' ← ')})`);
      const tag = `${w}(${st.type})`;
      for (const s of ['A', 'B']) {
        if (!isObj(st.prompt)) { err(`${tag}.prompt: ناقص`); break; }
        loc(st.prompt[s], `${tag}.prompt.${s}`);
      }
      if (!isObj(st.opponentLine)) err(`${tag}.opponentLine: ناقص (اكتبه فاضي إذا مو rebuttal)`);
      else for (const s of ['A', 'B']) {
        const ol = st.opponentLine[s];
        if (st.type === 'rebuttal') loc(ol, `${tag}.opponentLine.${s}`);
        else if (!isObj(ol)) err(`${tag}.opponentLine.${s}: لازم يكون كائن {ar:"", en:""}`);
        else if (ol.ar && ol.ar.trim()) warn(`${tag}.opponentLine.${s}: معبأ في مرحلة غير rebuttal (ما راح يظهر)`);
      }
      if (!isObj(st.options)) { err(`${tag}.options: ناقص`); return; }
      for (const s of ['A', 'B']) {
        const opts = st.options[s];
        const ow = `${tag}.options.${s}`;
        if (!Array.isArray(opts)) { err(`${ow}: لازم مصفوفة`); continue; }
        if (opts.length !== 4) err(`${ow}: فيه ${opts.length} خيارات (المطلوب 4 بالضبط)`);
        const pts = opts.map((o) => (isObj(o) ? o.points : undefined));
        const sorted = [...pts].sort();
        if (JSON.stringify(sorted) !== JSON.stringify([0, 1, 2, 3])) err(`${ow}: النقاط ${JSON.stringify(pts)} والمطلوب 0 و1 و2 و3 مرة وحدة لكل رقم`);
        const ids = new Set();
        opts.forEach((o, j) => {
          const x = `${ow}[${j}]`;
          if (!isObj(o)) { err(`${x}: مو كائن`); return; }
          if (typeof o.id !== 'string' || !o.id.trim()) err(`${x}.id: ناقص`);
          else if (ids.has(o.id)) err(`${x}.id: "${o.id}" مكرر`);
          else ids.add(o.id);
          loc(o.text, `${x}.text`);
          loc(o.judge, `${x}.judge`);
          if (!ORIGINS.includes(o.origin)) err(`${x}.origin: "${o.origin}" غير مسموح. المسموح: ${ORIGINS.join(' | ')}`);
          if (st.type === 'evidence') {
            if (typeof o.evidenceId !== 'string' || !o.evidenceId) err(`${x}.evidenceId: لازم في مرحلة evidence`);
            else if (!evidenceIds.has(o.evidenceId)) err(`${x}.evidenceId: "${o.evidenceId}" مو موجود في evidence`);
          } else if (o.evidenceId !== undefined && !evidenceIds.has(o.evidenceId)) {
            err(`${x}.evidenceId: "${o.evidenceId}" مو موجود في evidence`);
          }
          if (isObj(o.text)) { const n = wordCount(o.text.ar); if (n < 15 || n > 35) warn(`${x}.text: ${n} كلمة (المطلوب 15 إلى 35)`); }
          if (isObj(o.judge)) { const n = wordCount(o.judge.ar); if (n < 20 || n > 45) warn(`${x}.judge: ${n} كلمة (المطلوب 20 إلى 45)`); }
        });
      }
    });
  }

  // الحكم
  const v = c.verdict;
  if (!isObj(v)) err('verdict: ناقص');
  else {
    if (!WINNERS.includes(v.winner)) err(`verdict.winner: "${v.winner}" غير مسموح. المسموح: ${WINNERS.join(' | ')}`);
    loc(v.summary, 'verdict.summary');
    loc(v.reasoning, 'verdict.reasoning');
    loc(v.aftermath, 'verdict.aftermath');
    if (isObj(v.reasoning)) { const n = wordCount(v.reasoning.ar); if (n < 60 || n > 120) warn(`verdict.reasoning: ${n} كلمة (المطلوب 60 إلى 120)`); }
    if (v.vote !== undefined) {
      if (typeof v.vote !== 'string' || !/^\d+-\d+$/.test(v.vote)) err(`verdict.vote: لازم بالشكل "3-2" (القيمة: ${JSON.stringify(v.vote)})`);
      if (!VOTE_STATUS.includes(v.voteStatus)) err(`verdict.voteStatus: لازم ${VOTE_STATUS.join(' | ')} إذا فيه vote`);
    } else if (v.voteStatus !== undefined && !VOTE_STATUS.includes(v.voteStatus)) {
      err(`verdict.voteStatus: "${v.voteStatus}" غير مسموح`);
    }
  }
}

// ---------- التشغيل ----------
if (!fs.existsSync(casesDir)) { console.error(`المجلد غير موجود: ${casesDir}`); process.exit(1); }
const files = fs.readdirSync(casesDir).filter((f) => f.endsWith('.js')).sort();
console.log(`فحص ${files.length} ملف في ${casesDir}\n`);
if (files.length === 0) { console.error('ما فيه أي ملف قضية.'); process.exit(1); }

// القضايا المذكورة في index.html (فقط عند فحص مجلد المشروع)
let listed = null;
const indexPath = path.join(projectDir, 'index.html');
if (usingProjectDir && fs.existsSync(indexPath)) {
  const html = fs.readFileSync(indexPath, 'utf8');
  listed = new Set([...html.matchAll(/<script[^>]+src="data\/cases\/([a-z0-9-]+)\.js"/g)].map((m) => m[1]));
}

let totalErrors = 0, totalWarnings = 0;
const seenIds = new Map();
for (const f of files) {
  const fileId = f.slice(0, -3);
  const errors = [], warnings = [];
  const code = fs.readFileSync(path.join(casesDir, f), 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  try {
    vm.runInContext(code, sandbox, { filename: f, timeout: 1000 });
  } catch (e) {
    errors.push(`الملف ما اشتغل: ${e.message}`);
  }
  const list = sandbox.window.CASES;
  if (!errors.length) {
    if (!Array.isArray(list)) errors.push('الملف لازم يضيف القضية بـ (window.CASES = window.CASES || []).push({...})');
    else if (list.length !== 1) errors.push(`الملف أضاف ${list.length} قضايا، والمطلوب قضية وحدة لكل ملف`);
    else checkCase(list[0], fileId, errors, warnings);
  }
  const c = Array.isArray(list) && list[0];
  if (c && typeof c.id === 'string') {
    if (seenIds.has(c.id)) errors.push(`id "${c.id}" مكرر في ${seenIds.get(c.id)}`);
    else seenIds.set(c.id, f);
  }
  if (listed && !listed.has(fileId)) warnings.push('الملف غير مذكور في وسوم <script> داخل index.html، فما راح يظهر في اللعبة');

  const status = errors.length ? 'فشل ✗' : 'سليم ✓';
  const review = c && c.review ? ` [${c.review}]` : '';
  console.log(`${status}  ${f}${review}  — ${errors.length} خطأ، ${warnings.length} تحذير`);
  errors.forEach((m) => console.log(`    خطأ: ${m}`));
  warnings.forEach((m) => console.log(`    تحذير: ${m}`));
  totalErrors += errors.length; totalWarnings += warnings.length;
}

if (listed) {
  const missing = [...listed].filter((id) => !files.includes(id + '.js'));
  if (missing.length) console.log(`\nملاحظة: ${missing.length} قضية مذكورة في index.html وملفها غير موجود بعد (اللعبة تتجاهلها): ${missing.join(', ')}`);
}

console.log(`\nالمجموع: ${files.length} ملف، ${totalErrors} خطأ، ${totalWarnings} تحذير.`);
if (totalErrors > 0) { console.log('النتيجة: فشل'); process.exit(1); }
console.log('النتيجة: نجاح');
