// اختبارات منطق اللعبة بدون متصفح وبدون حزم.
// يستخرج <script id="config"> و<script id="logic"> من index.html نفسه (مصدر واحد للكود)،
// ويشغّلهما في vm، ويختبر: التقييم، الألقاب، الفلاتر، الخلط، التخزين، اكتمال نصوص الواجهة بلغتين،
// ولعب قضايا data/cases من الطرفين.
// التشغيل: node scripts/test-logic.mjs

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const dir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const block = (id) => {
  const m = html.match(new RegExp(`<script id="${id}">([\\s\\S]*?)</script>`));
  if (!m) throw new Error(`ما لقيت <script id="${id}"> في index.html`);
  return m[1];
};

const ctx = { window: {} };
ctx.globalThis = ctx;
vm.createContext(ctx);
vm.runInContext(block('config'), ctx);
vm.runInContext(block('logic'), ctx);
const C = ctx.window.CONFIG, Lg = ctx.window.Logic;

let pass = 0, fail = 0;
function ok(cond, name) {
  if (cond) { pass++; console.log(`  ✓ ${name}`); }
  else { fail++; console.log(`  ✗ ${name}`); }
}
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// ---------------------------------------------------------------
console.log('\n[1] كود التطبيق يتحلل بدون أخطاء صياغة');
try { new vm.Script(block('app-main')); ok(true, 'app-main يتحلل'); } catch (e) { ok(false, 'app-main: ' + e.message); }

// ---------------------------------------------------------------
console.log('\n[2] نصوص الواجهة: كل مفتاح فيه ar وen غير فاضيين');
const emptyUI = Object.entries(C.UI).filter(([, v]) => !v || !String(v.ar || '').trim() || !String(v.en || '').trim()).map(([k]) => k);
ok(emptyUI.length === 0, `CONFIG.UI: ${Object.keys(C.UI).length} مفتاح، الناقص: ${emptyUI.join(', ') || 'لا شيء'}`);
const dicts = ['REGIONS', 'TAGS', 'STAGES', 'RATINGS', 'BANDS', 'SOURCE_STATUS'];
for (const d of dicts) {
  const bad = Object.entries(C[d]).filter(([, v]) => !v.ar || !v.en).map(([k]) => k);
  ok(bad.length === 0, `CONFIG.${d}: ${Object.keys(C[d]).length} مفتاح، الناقص: ${bad.join(', ') || 'لا شيء'}`);
}
const badWhy = C.WHY.filter((w) => !w.label.ar || !w.label.en || !w.desc.ar || !w.desc.en).map((w) => w.key);
ok(badWhy.length === 0, `CONFIG.WHY: ${C.WHY.length} خيارات، الناقص: ${badWhy.join(', ') || 'لا شيء'}`);
const badTitles = C.TITLES.filter((t) => ['m', 'f', 'n'].some((g) => !t[g] || !t[g].ar || !t[g].en));
ok(badTitles.length === 0, `CONFIG.TITLES: ${C.TITLES.length} ألقاب × 3 صيغ كاملة`);

// كل مفتاح مستخدم في الكود أو الـ HTML موجود في CONFIG.UI
const appCode = block('app-main');
const usedKeys = new Set([
  ...[...appCode.matchAll(/\bt\('([A-Za-z_]+)'/g)].map((m) => m[1]),
  ...[...html.matchAll(/data-i18n(?:-aria)?="([A-Za-z_]+)"/g)].map((m) => m[1]),
  ...[...appCode.matchAll(/(?:activeNotices\.push|addNotice)\('([A-Za-z_]+)'\)/g)].map((m) => m[1])
]);
const missing = [...usedKeys].filter((k) => !C.UI[k]);
ok(missing.length === 0, `كل المفاتيح المستخدمة (${usedKeys.size}) موجودة في CONFIG.UI. الناقص: ${missing.join(', ') || 'لا شيء'}`);
const genderKeys = Object.keys(C.UI).filter((k) => /_(m|f)$/.test(k));
ok(genderKeys.every((k) => C.UI[k.replace(/_(m|f)$/, '')]), `كل صيغة أستاذ/أستاذة (${genderKeys.length}) لها صيغة محايدة أساسية`);

// ---------------------------------------------------------------
console.log('\n[3] التقييم');
const S = C.SCORING;
let r = Lg.computeResult([3, 3, 3, 3, 3], S);
ok(r.percent === 100 && r.band === 'excellent' && r.won, 'كل الخيارات القوية = 100% متميزة ومكسوبة');
r = Lg.computeResult([0, 0, 0, 0, 0], S);
ok(r.percent === 0 && r.band === 'training' && !r.won, 'كل الخيارات الخاطئة = 0% تحتاج تدريب');
r = Lg.computeResult([3, 2, 2, 2, 1], S); // 10/15 = 67%
ok(r.percent === 67 && !r.won && r.band === 'good', '10/15 = 67% جيدة وغير مكسوبة (تحت 70)');
r = Lg.computeResult([3, 2, 2, 2, 2], S); // 11/15 = 73%
ok(r.percent === 73 && r.won && r.band === 'good', '11/15 = 73% مكسوبة وجيدة');
r = Lg.computeResult([3, 3, 2, 2, 2], S); // 12/15 = 80%
ok(r.percent === 80 && r.band === 'excellent', '12/15 = 80% متميزة (الحد الأدنى)');
r = Lg.computeResult([2, 2, 1, 1, 1], S); // 7/15 = 47%
ok(r.percent === 47 && r.band === 'training', '7/15 = 47% تحتاج تدريب');
r = Lg.computeResult([2, 2, 2, 1, 1], S); // 8/15 = 53%
ok(r.percent === 53 && r.band === 'good', '8/15 = 53% جيدة (فوق 50)');

// ---------------------------------------------------------------
console.log('\n[4] الألقاب (0، 2، 4، 7، 10، ثم «كل القضايا») وصيغها. هنا عدد القضايا = 14');
const T = C.TITLES;
const expectM = { 0: 'متدرّب', 1: 'متدرّب', 2: 'محامٍ', 3: 'محامٍ', 4: 'محامٍ أول', 6: 'محامٍ أول', 7: 'مستشار', 9: 'مستشار', 10: 'كبير المستشارين', 13: 'كبير المستشارين', 14: 'أسطورة المرافعة', 20: 'أسطورة المرافعة' };
for (const [w, title] of Object.entries(expectM)) ok(Lg.titleFor(Number(w), 'm', T, 14).title.ar === title, `${w} مكسوبة (أستاذ) = ${title}`);
const expectF = { 0: 'متدرّبة', 2: 'محامية', 4: 'محامية أولى', 7: 'مستشارة', 10: 'كبيرة المستشارين', 14: 'أسطورة المرافعة' };
for (const [w, title] of Object.entries(expectF)) ok(Lg.titleFor(Number(w), 'f', T, 14).title.ar === title, `${w} مكسوبة (أستاذة) = ${title}`);
ok(Lg.titleFor(0, '', T, 14).title.ar === 'متدرّب/ة', 'بدون اختيار = صيغة محايدة');
ok(Lg.titleFor(5, 'f', T, 14).title.en === 'Senior Lawyer', 'الإنجليزي: 5 = Senior Lawyer');
let ti = Lg.titleFor(5, 'm', T, 14);
ok(ti.toNext === 2 && ti.next.ar === 'مستشار', '5 مكسوبة: باقي 2 للقب مستشار');
ti = Lg.titleFor(14, 'm', T, 14);
ok(ti.next === null && ti.toNext === 0, '14 مكسوبة: ما فيه لقب أعلى');

// ---------------------------------------------------------------
// [البند 5] أعلى لقب يتبع عدد القضايا المعروضة
const steps = (total) => Lg.resolveTitles(T, total).map((t) => t.wins).join(',');
ok(T.some((t) => t.wins === 'all'), "CONFIG.TITLES: آخر درجة wins:'all'");
ok(steps(13) === '0,2,4,7,10,13', '13 قضية: الدرجات 0،2،4،7،10،13');
ok(steps(10) === '0,2,4,7,10', '10 قضايا: درجة 10 تصير «أسطورة» (بدون تكرار)');
ok(steps(5) === '0,2,4,5', '5 قضايا: الدرجات 0،2،4،5 (7 و10 تنشال)');
ok(steps(1) === '0,1' && steps(0) === '0,1', 'قضية وحدة أو صفر: 0 ثم 1');
ok(steps(30) === '0,2,4,7,10,30', '30 قضية: الأسطورة عند 30');
ok(Lg.titleFor(13, 'f', T, 13).title.ar === 'أسطورة المرافعة' && Lg.titleFor(13, 'f', T, 13).next === null, '13 من 13: أسطورة المرافعة (أعلى لقب ممكن)');
ok(Lg.titleFor(12, 'm', T, 13).title.ar === 'كبير المستشارين' && Lg.titleFor(12, 'm', T, 13).toNext === 1, '12 من 13: كبير المستشارين، باقي 1');

console.log('\n[5] حفظ أفضل أداء وعدّ القضايا المكسوبة');
const comp = {};
let rec = Lg.recordResult(comp, 'x-1', 'A', 60, '2026-11-04');
ok(rec.isBest && rec.prevBest === null && comp['x-1'].best === 60, 'أول نتيجة تنحفظ');
rec = Lg.recordResult(comp, 'x-1', 'B', 40, '2026-11-05');
ok(!rec.isBest && comp['x-1'].best === 60 && comp['x-1'].side === 'A', 'نتيجة أقل ما تغيّر الأفضل');
rec = Lg.recordResult(comp, 'x-1', 'B', 87, '2026-11-06');
ok(rec.isBest && rec.prevBest === 60 && comp['x-1'].side === 'B', 'نتيجة أعلى تستبدل الأفضل');
Lg.recordResult(comp, 'x-2', 'A', 70, '2026-11-06');
Lg.recordResult(comp, 'x-3', 'A', 69, '2026-11-06');
ok(Lg.countWins(comp, S.winPercent) === 2, 'العدّ: 87 و70 مكسوبة، 69 لا');
// [البند 10] العدّ للقضايا الموجودة في البيانات الحالية فقط
comp['deleted-case'] = { best: 100, side: 'A', date: '2026-01-01' };
ok(Lg.countWins(comp, S.winPercent) === 3, 'بدون قائمة: تنحسب كل المحفوظة (3)');
ok(Lg.countWins(comp, S.winPercent, ['x-1', 'x-2', 'x-3']) === 2, 'مع قائمة القضايا الحالية: القضية المحذوفة ما تنحسب (2)');
ok(Lg.countWins(comp, S.winPercent, []) === 0, 'ما فيه قضايا معروضة = 0');

// ---------------------------------------------------------------
console.log('\n[6] التخزين: سليم، فاضي، تالف، محظور');
const KEY = C.STORAGE_KEY, LIM = C.LIMITS, WK = C.WHY.map((w) => w.key);
function fakeStore(init) {
  const m = new Map(Object.entries(init || {}));
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => m.set(k, String(v)), removeItem: (k) => m.delete(k), _m: m };
}
const blocked = { getItem() { throw new Error('SecurityError'); }, setItem() { throw new Error('QuotaExceeded'); }, removeItem() { throw new Error('x'); } };
ok(Lg.storageAvailable(fakeStore()) === true, 'تخزين يشتغل = متاح');
ok(Lg.storageAvailable(blocked) === false, 'تخزين يرمي خطأ = غير متاح (بدون انهيار)');
ok(Lg.loadState(null, KEY, LIM, WK).status === 'unavailable', 'بدون تخزين = unavailable وحالة افتراضية');
ok(Lg.loadState(blocked, KEY, LIM, WK).status === 'unavailable', 'getItem يرمي خطأ = unavailable');
ok(Lg.loadState(fakeStore(), KEY, LIM, WK).status === 'new', 'ما فيه بيانات = new');
ok(Lg.loadState(fakeStore({ [KEY]: '{not json' }), KEY, LIM, WK).status === 'corrupt', 'JSON تالف = corrupt');
ok(Lg.loadState(fakeStore({ [KEY]: '[1,2]' }), KEY, LIM, WK).status === 'corrupt', 'مصفوفة بدل كائن = corrupt');
ok(Lg.loadState(fakeStore({ [KEY]: '{"version":2}' }), KEY, LIM, WK).status === 'corrupt', 'نسخة غير معروفة = corrupt');
ok(Lg.loadState(fakeStore({ [KEY]: 'null' }), KEY, LIM, WK).status === 'corrupt', 'null = corrupt');
const longName = 'س'.repeat(100), longWhy = 'x'.repeat(1000);
const dirty = { version: 1, name: '  ' + longName + '  ', why: longWhy, whyKey: 'hack', gender: 'x', lang: 'fr',
  completed: { 'good-1': { best: 87, side: 'A', date: '2026-11-04' }, 'bad id!': { best: 50, side: 'A' }, '__proto__': { best: 1, side: 'A' },
    'over-1': { best: 150, side: 'A' }, 'side-1': { best: 50, side: 'C' }, 'nan-1': { best: 'abc', side: 'B' }, 'date-1': { best: 40.6, side: 'B', date: '<img>' } } };
const L1 = Lg.loadState(fakeStore({ [KEY]: JSON.stringify(dirty) }), KEY, LIM, WK);
ok(L1.status === 'ok', 'بيانات فيها قيم غريبة = تنظف وتنقبل');
ok(Array.from(L1.state.name).length === 40, 'الاسم يتقص لـ 40 حرف');
ok(L1.state.why.length === 300, 'الإجابة تتقص لـ 300 حرف');
ok(L1.state.whyKey === '' && L1.state.gender === '' && L1.state.lang === 'ar', 'whyKey/gender/lang غير المسموحة ترجع للافتراضي');
ok(eq(Object.keys(L1.state.completed).sort(), ['date-1', 'good-1']), 'القضايا المنتهية: تنقبل السليمة فقط (good-1، date-1)');
ok(L1.state.completed['date-1'].best === 41 && L1.state.completed['date-1'].date === '', 'النسبة تتقرب، والتاريخ الغريب ينشال');
ok(L1.state.completed.best === undefined && Object.getPrototypeOf(Object.getPrototypeOf(L1.state.completed)) === null, '__proto__ ما يلوّث الكائن (البروتوتايب بقي Object.prototype العادي)');
ok(Lg.clampText('a\u0000b\nc', 40) === 'a b c', 'رموز التحكم تنشال من النص');
ok(Array.from(Lg.clampText('😀'.repeat(50), 40)).length === 40, 'القص يحسب الإيموجي حرف واحد');
const st2 = Lg.defaultState(); st2.name = 'سارة'; st2.lang = 'en';
const round = Lg.loadState(fakeStore({ [KEY]: Lg.serialize(st2) }), KEY, LIM, WK);
ok(round.status === 'ok' && round.state.name === 'سارة' && round.state.lang === 'en', 'حفظ ثم تحميل يرجع نفس البيانات (والاسم واللغة)');

// الأفاتار
const avOf = (v) => Lg.loadState(fakeStore({ [KEY]: JSON.stringify({ version: 1, avatar: v }) }), KEY, LIM, WK).state.avatar;
ok(avOf('av-f1') === 'av-f1' && avOf('photo') === 'photo', 'الأفاتار: رمز رسمة أو photo ينقبل');
ok(avOf('<img onerror=x>') === '' && avOf(42) === '' && avOf('javascript:alert(1)') === '', 'الأفاتار: أي قيمة غريبة ترجع فاضية');
ok(C.AVATARS.length === 10 && C.AVATARS.every((id) => /^av-/.test(id)), 'فيه 10 أفاتارات');
ok(avOf('seal') === 'seal' && avOf('av-rank-3') === 'av-rank-3', 'الأفاتار: الختم الشخصي وأوسمة الألقاب ينقبلون');
ok(C.RANKS.length === 5 && C.RANKS.every((r, i) => r.id === 'av-rank-' + (i + 1) && r.title === i + 1 && C.TITLES[r.title] && r.ar && r.en), 'أوسمة الألقاب: 5 أوسمة، كل واحد مربوط بلقب من الثاني للأخير وله اسم بالعربي والإنجليزي');
ok(C.RANKS.at(-1).title === C.TITLES.length - 1 && C.TITLES.at(-1).wins === 'all', 'آخر وسام (البشت الملكي) مربوط بأعلى لقب (كل القضايا)');
const waxOf = (v) => Lg.loadState(fakeStore({ [KEY]: JSON.stringify({ version: 1, sealWax: v }) }), KEY, LIM, WK).state.sealWax;
ok(waxOf(3) === 3 && waxOf(-1) === -1 && Lg.defaultState().sealWax === -1, 'لون الختم: رقم صحيح ينقبل، والافتراضي تلقائي (-1)');
ok(waxOf(2.5) === -1 && waxOf('3') === -1 && waxOf(-7) === -1 && waxOf(99) === -1 && waxOf(null) === -1, 'لون الختم: أي قيمة غريبة ترجع تلقائي');
ok(C.SEAL.wax.length === 7 && C.SEAL.wax.every((w) => w.ar && w.en && /^#[0-9A-F]{6}$/i.test(w.c[0]) && /^#[0-9A-F]{6}$/i.test(w.c[1])), 'ألوان الشمع: 7 ألوان لكل واحد اسم عربي وإنجليزي');
ok(C.SEAL.maxFs <= 3.6 && C.SEAL.rim > 16.2 && C.SEAL.rim < 24.5, 'الختم: حجم اسم الحافة ما يتعدى المقاس المختبَر (3.6)');
ok(C.AVATAR_NAMES.ar.length === C.AVATARS.length && C.AVATAR_NAMES.en.length === C.AVATARS.length, 'كل أفاتار له اسم بالعربي والإنجليزي');
const goodJpeg = 'data:image/jpeg;base64,/9j/' + 'A'.repeat(400);
const MAXP = C.PHOTO.maxStoredChars;
ok(Lg.isPhotoData(goodJpeg, MAXP), 'الصورة: JPEG بصيغة data URL ينقبل');
ok(!Lg.isPhotoData('data:image/jpeg;base64,' + 'A'.repeat(400), MAXP), 'الصورة: بيانات مو JPEG حقيقي (بدون /9j/) ما تنقبل');
ok(!Lg.isPhotoData('data:image/svg+xml;base64,' + 'A'.repeat(400), MAXP), 'الصورة: SVG ما ينقبل');
ok(!Lg.isPhotoData('https://example.com/a.jpg', MAXP) && !Lg.isPhotoData(null, MAXP), 'الصورة: رابط خارجي أو null ما ينقبل');
ok(!Lg.isPhotoData('data:image/jpeg;base64,' + 'A'.repeat(MAXP), MAXP), 'الصورة: أكبر من الحد ما تنقبل');
ok(!Lg.isPhotoData('data:image/jpeg;base64,AAAA"><script>' + 'A'.repeat(400), MAXP), 'الصورة: رموز غريبة داخل البيانات ما تنقبل');

// التوقيع
const MAXS = C.SIGN.maxStoredChars;
ok(Lg.isSignData('data:image/png;base64,iVBORw0KGgo' + 'A'.repeat(200), MAXS), 'التوقيع: PNG بصيغة data URL ينقبل');
ok(!Lg.isSignData('data:image/png;base64,' + 'A'.repeat(200), MAXS), 'التوقيع: بيانات مو PNG حقيقي ما تنقبل');
ok(!Lg.isSignData('data:image/svg+xml;base64,iVBORw0KGgo' + 'A'.repeat(200), MAXS) && !Lg.isSignData(null, MAXS), 'التوقيع: SVG أو null ما ينقبل');
ok(!Lg.isSignData('data:image/png;base64,iVBORw0KGgo' + 'A'.repeat(MAXS), MAXS), 'التوقيع: أكبر من الحد ما ينقبل');
ok(!Lg.isSignData('data:image/png;base64,iVBORw0KGgo"><img onerror=x>' + 'A'.repeat(200), MAXS), 'التوقيع: رموز غريبة ما تنقبل');

// ---------------------------------------------------------------
console.log('\n[7] الفلاتر');
const mk = (id, region, tags, year) => ({ id, region, tags, year });
const sample = [
  mk('a-1', 'europe', ['civil'], 1932), mk('b-1', 'americas', ['constitutional', 'rights'], 1969),
  mk('c-1', 'gulf', ['international'], 2001), mk('d-1', 'international', ['international', 'environment'], 2014),
  mk('e-1', 'europe', ['criminal'], 1894), mk('f-1', 'europe', ['criminal'], 1896), mk('g-1', 'americas', ['ip-tech'], 1984)
];
const fac = Lg.buildFacets(sample, Object.keys(C.REGIONS), Object.keys(C.TAGS));
ok(eq(fac.region, ['gulf', 'europe', 'americas', 'international']), 'المناطق تتولد من البيانات بترتيب CONFIG');
ok(eq(fac.decade, [1890, 1930, 1960, 1980, 2000, 2010]), 'العقود تتولد من السنوات ومرتبة');
ok(!fac.tag.includes('health') && fac.tag.includes('criminal'), 'التصنيفات: الموجودة فقط');
const F = (region = [], tag = [], decade = []) => Lg.filterCases(sample, { region, tag, decade }).map((c) => c.id);
ok(F().length === 7, 'بدون فلتر = الكل (7)');
ok(eq(F(['europe']), ['a-1', 'e-1', 'f-1']), 'أوروبا = 3');
ok(eq(F(['europe', 'gulf']), ['a-1', 'c-1', 'e-1', 'f-1']), 'أوروبا أو الخليج = 4 (OR داخل المجموعة)');
ok(eq(F(['europe'], ['criminal']), ['e-1', 'f-1']), 'أوروبا + جنائي = 2 (AND بين المجموعات)');
ok(eq(F(['europe'], ['criminal'], [1890]), ['e-1', 'f-1']), 'أوروبا + جنائي + 1890 = 2');
ok(eq(F([], ['international']), ['c-1', 'd-1']), 'دولي = 2');
ok(eq(F(['americas'], ['international']), []), 'أمريكا + دولي = لا نتائج');
ok(eq(F([], [], [2000, 2010]), ['c-1', 'd-1']), 'عقد 2000 أو 2010 = 2');
// فحص شامل: كل تركيبات قيمة وحدة من كل مجموعة (مع "الكل") تطابق العدّ اليدوي
let combos = 0, comboOk = true;
for (const rg of [null, ...fac.region]) for (const tg of [null, ...fac.tag]) for (const dc of [null, ...fac.decade]) {
  combos++;
  const got = F(rg ? [rg] : [], tg ? [tg] : [], dc ? [dc] : []).length;
  const want = sample.filter((c) => (!rg || c.region === rg) && (!tg || c.tags.includes(tg)) && (!dc || Math.floor(c.year / 10) * 10 === dc)).length;
  if (got !== want) comboOk = false;
}
ok(comboOk, `كل التركيبات (${combos}) تطابق العدّ المستقل`);

// ---------------------------------------------------------------
console.log('\n[8] الخلط');
const base = [0, 1, 2, 3];
let seed = 1; const rng = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const sh = Lg.shuffle(base, rng);
ok(eq([...sh].sort(), base) && eq(base, [0, 1, 2, 3]), 'الخلط يحافظ على العناصر وما يغيّر الأصل');
const firsts = new Set(); for (let i = 0; i < 200; i++) firsts.add(Lg.shuffle(base, rng)[0]);
ok(firsts.size === 4, 'كل خيار يطلع أول في مرة على الأقل (200 خلطة)');

// ---------------------------------------------------------------
// ---------------------------------------------------------------
console.log('\n[8ب] صيغ العدد بالعربي (البند 9)');
const P = (n) => Lg.pluralCategory(n, 'ar');
ok([0, 1, 2, 3, 10, 11, 99, 100, 101, 102, 103, 111, 1000].map(P).join(',') === 'zero,one,two,few,few,many,many,other,other,other,few,many,other', 'الفئات حسب CLDR للأعداد 0،1،2،3،10،11،99،100،101،102،103،111،1000');
const CW = C.COUNTS.casesWon, CS = C.COUNTS.cases, CP = C.COUNTS.points;
ok(Lg.countPhrase(0, CW, 'ar') === 'ولا قضية مكسوبة', '0 = ولا قضية مكسوبة');
ok(Lg.countPhrase(1, CW, 'ar') === 'قضية واحدة مكسوبة', '1 = قضية واحدة مكسوبة');
ok(Lg.countPhrase(2, CW, 'ar') === 'قضيتان مكسوبتان', '2 = قضيتان مكسوبتان');
ok(Lg.countPhrase(3, CW, 'ar') === '3 قضايا مكسوبة' && Lg.countPhrase(10, CW, 'ar') === '10 قضايا مكسوبة', '3 و10 = قضايا');
ok(Lg.countPhrase(11, CW, 'ar') === '11 قضية مكسوبة' && Lg.countPhrase(14, CW, 'ar') === '14 قضية مكسوبة', '11 و14 = قضية');
ok(Lg.countPhrase(1, CS, 'ar') === 'قضية واحدة' && Lg.countPhrase(5, CS, 'ar') === '5 قضايا', '«باقي ...»: قضية واحدة / 5 قضايا');
ok(Lg.countPhrase(3, CP, 'ar') === '3 نقاط' && Lg.countPhrase(2, CP, 'ar') === 'نقطتان' && Lg.countPhrase(0, CP, 'ar') === 'ولا نقطة', 'النقاط: 3 نقاط / نقطتان / ولا نقطة');
ok(Lg.countPhrase(1, CW, 'en') === '1 case won' && Lg.countPhrase(0, CW, 'en') === '0 cases won' && Lg.countPhrase(1, CP, 'en') === '+1 point', 'الإنجليزي: 1 case won / 0 cases won / +1 point');
const badCounts = Object.entries(C.COUNTS).filter(([, f]) => !['zero', 'one', 'two', 'few', 'many', 'other'].every((k) => f.ar[k]) || !f.en.one || !f.en.other).map(([k]) => k);
ok(badCounts.length === 0, `CONFIG.COUNTS: كل الصيغ موجودة (${Object.keys(C.COUNTS).join('، ')})`);
ok(!/\{(n|wins)\} قضايا/.test(JSON.stringify(C.UI)), 'ما فيه «{n} قضايا» ثابتة في نصوص الواجهة');

// ---------------------------------------------------------------
console.log('\n[8ج] صيغة المخاطبة محايدة (البند 4)');
const MASC = ['متأكد', 'اختر', 'اكتب', 'ارجع', 'جرّب', 'اضغط', 'تترافع', 'ترافع', 'افتح', 'اقلب', 'أعد', 'اعرض', 'اترك', 'غيّر', 'ادخل', 'تحتاج', 'تقدر', 'أحسنت', 'دوّرها'];
const offenders = [];
for (const [k, v] of Object.entries(C.UI)) {
  if (/_m$/.test(k)) continue;                          // صيغة المذكر المقصودة
  if (!/_f$/.test(k) && C.UI[k + '_f']) continue;       // الأساس له صيغة مؤنثة، فيظهر للأستاذ والمحايد فقط
  const words = v.ar.replace(/[«»،.؟!:()"]/g, ' ').split(/\s+/);
  const hit = words.filter((w) => MASC.includes(w));
  if (hit.length) offenders.push(`${k}: ${hit.join('،')}`);
}
ok(offenders.length === 0, `ما فيه أفعال مخاطبة مذكرة في نصوص تظهر للأستاذة. المخالف: ${offenders.join(' | ') || 'لا شيء'}`);
ok(C.UI.enterCourt_f && C.UI.enterCourt_f.ar === 'ادخلي قاعة المحكمة', 'زر الدخول له صيغة مؤنثة');

// كل جمهور يشوف صيغته: الأستاذ X_m وإلا X، والأستاذة X_f وإلا X، والمحايد X
// الكلمات المؤنثة/المذكرة نتعلمها من الفروق بين الصيغ نفسها، ونضيف لها أشهر الصيغ
const FEMW = new Set(['اختاري', 'ادخلي', 'جرّبي', 'ارجعي', 'اكتبي', 'اضغطي', 'افتحي', 'غيّري', 'تقدرين', 'تبين', 'تختارين', 'تشوفين', 'تكسبين', 'تفتحين', 'تترافعين', 'متأكدة', 'اخترتي', 'كسبتي', 'وصلتي', 'فتحتي']);
const MASW = new Set(['اختر', 'ادخل', 'جرّب', 'ارجع', 'اكتب', 'اضغط', 'افتح', 'غيّر', 'تقدر', 'تبي', 'تشوف', 'تترافع', 'متأكد', 'أحسنت', 'اخترت', 'كسبت', 'فتحت', 'تختار', 'وتختار', 'تكسب', 'تكسبها', 'تفتح', 'وتفتح', 'تمسك', 'وتمسك', 'وتترافع']);
const tok = (s) => s.replace(/[«»،.؟!:()"'\-—{}0-9%/👑🎉🔒]/g, ' ').split(/\s+/).filter(Boolean);
const gBases = [...new Set(Object.keys(C.UI).map((k) => k.replace(/_(m|f)$/, '')))];
for (const b of gBases) {
  const f = C.UI[b + '_f'], m = C.UI[b + '_m'] || C.UI[b];
  if (!f || !m) continue;
  const fw = new Set(tok(f.ar)), mw = new Set(tok(m.ar));
  fw.forEach((w) => { if (!mw.has(w)) FEMW.add(w); });
  mw.forEach((w) => { if (!fw.has(w)) MASW.add(w); });
}
// استثناءات مو موجّهة للاعب: أسماء أزرار المخاطبة، وأسماء المثال، و«المحكمة وصلت» (فعل للمحكمة مو للاعب)
const NOT_ADDRESS = new Set(['أستاذ', 'أستاذة', 'سارة', 'فهد']);
const ALLOW = { bridgeStrong: ['وصلت'] };
[...NOT_ADDRESS].forEach((w) => { FEMW.delete(w); MASW.delete(w); });
const wrongG = [];
for (const b of gBases) {
  const base = C.UI[b]; if (!base) continue;
  const forM = (C.UI[b + '_m'] || base).ar, forF = (C.UI[b + '_f'] || base).ar, okW = ALLOW[b] || [];
  tok(forM).filter((w) => FEMW.has(w) && !okW.includes(w)).forEach((w) => wrongG.push(`أستاذ ← ${b}: ${w}`));
  tok(forF).filter((w) => MASW.has(w) && !okW.includes(w)).forEach((w) => wrongG.push(`أستاذة ← ${b}: ${w}`));
  if (C.UI[b + '_f'] || C.UI[b + '_m']) tok(base.ar).filter((w) => (FEMW.has(w) || MASW.has(w)) && !okW.includes(w)).forEach((w) => wrongG.push(`محايد ← ${b}: ${w}`));
}
ok(wrongG.length === 0, `كل لاعب يشوف صيغته: ما فيه مؤنث للأستاذ ولا مذكر للأستاذة ولا تذكير/تأنيث للمحايد. المخالف: ${wrongG.join(' | ') || 'لا شيء'}`);
ok(C.UI.topTitle_f.ar.includes('وصلتي') && C.UI.rankAll_f.ar.includes('فتحتي') && !/وصلت|فتحت/.test(C.UI.topTitle.ar + C.UI.rankAll.ar), '«وصلت لأعلى لقب» و«فتحت كل الأوسمة»: لها صيغة للأستاذة، والمحايد بدون فعل مخاطبة');

// ---------------------------------------------------------------
console.log('\n[8د] حماية النتيجة من مرحلة ناقصة (البندان 1 و2)');
const pk = (n) => ({ points: n });
ok(Lg.isCompleteTrial([pk(3), pk(2), pk(1), pk(0), pk(3)], 5) === true, '5 اختيارات = مكتملة');
ok(Lg.isCompleteTrial([pk(3), pk(2), pk(1), pk(0)], 5) === false, '4 اختيارات = ناقصة');
const holey = [pk(3), pk(2)]; holey[3] = pk(1); holey[4] = pk(0);
ok(Lg.isCompleteTrial(holey, 5) === false, 'مرحلة متخطّاة (فراغ في المصفوفة) = ناقصة');
ok(Lg.isCompleteTrial([pk(3), null, pk(1), pk(0), pk(3)], 5) === false, 'اختيار null = ناقصة');
ok(Lg.isCompleteTrial(null, 5) === false, 'بدون اختيارات = ناقصة');
const appSrc = block('app-main');
ok(/if \(!trial \|\| !trial\.answered \|\| trial\.busy\) return;/.test(appSrc), 'nextStage فيه حارس busy/answered');
ok(/if \(!alive\(tr\) \|\| current !== 'trial'\) return;/.test(appSrc) && /if \(!alive\(tr\) \|\| tr\.picks\[tr\.idx\] !== o\) return;/.test(appSrc), 'مؤقّتا المطرقة وقلب الصفحة يتأكدان إن المحاكمة نفسها ما زالت شغّالة');
ok(/Lg\.isCompleteTrial\(trial\.picks/.test(appSrc), 'finishTrial يرفض نتيجة بمرحلة ناقصة');

console.log('\n[9] القضايا الحقيقية: الظهور واللعب من الطرفين');
const casesDir = path.join(dir, 'data', 'cases');
const all = [];
for (const f of fs.readdirSync(casesDir).filter((x) => x.endsWith('.js'))) {
  const sb = { window: {} }; vm.createContext(sb);
  try { vm.runInContext(fs.readFileSync(path.join(casesDir, f), 'utf8'), sb, { timeout: 1000 }); all.push(...(sb.window.CASES || [])); }
  catch (e) { console.log(`  (تخطّي ${f}: ${e.message})`); }
}
const draft = { ...all[0], id: 'draft-x', review: 'draft' };
const broken = { ...all[0], id: 'broken-x', stages: [] };
const dup = { ...all[0] };
const vis = Lg.visibleCases([...all, draft, broken, dup]);
ok(!vis.some((c) => c.id === 'draft-x'), 'القضية draft ما تظهر');
ok(!vis.some((c) => c.id === 'broken-x'), 'القضية المعطوبة ما تظهر وما توقف اللعبة');
ok(vis.filter((c) => c.id === all[0].id).length === 1, 'القضية المكررة تظهر مرة وحدة');
for (const c of vis) {
  for (const side of ['A', 'B']) {
    const best = c.stages.map((st) => Math.max(...st.options[side].map((o) => o.points)));
    const worst = c.stages.map((st) => Math.min(...st.options[side].map((o) => o.points)));
    ok(Lg.computeResult(best, S).percent === 100, `${c.id} طرف ${side}: أقوى الخيارات = 100%`);
    ok(Lg.computeResult(worst, S).percent === 0, `${c.id} طرف ${side}: أضعف الخيارات = 0%`);
  }
  const out = ['A', 'B'].map((s) => Lg.realOutcome(c.verdict.winner, s));
  ok(c.verdict.winner === 'mixed' ? eq(out, ['mixed', 'mixed']) : out.includes('won') && out.includes('lost'), `${c.id}: رسالة الربط تطلع للطرف الخاسر فعلًا (${out.join('/')})`);
}

console.log(`\nالمجموع: ${pass} نجح، ${fail} فشل.`);
process.exit(fail ? 1 : 0);
