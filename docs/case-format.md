# صيغة ملف القضية (ملزمة لكل من يكتب قضية)

كل قضية تنكتب في ملف مستقل: `data/cases/<id>.js`. وهذا شكله بالضبط:

```js
(window.CASES = window.CASES || []).push({
  id: "donoghue-1932",                 // حروف إنجليزية صغيرة وأرقام وشرطة، ونفس اسم الملف
  title:   { ar: "قضية الحلزون", en: "Donoghue v Stevenson" },
  country: { ar: "المملكة المتحدة (اسكتلندا)", en: "United Kingdom (Scotland)" },
  region:  "europe",                   // gulf | mena | europe | americas | africa | asia | international
  court:   { ar: "مجلس اللوردات", en: "House of Lords" },
  year: 1932, date: "1932-05-26",      // date اختياري، إذا غير مؤكد احذفه
  tags: ["civil"],                     // واحد أو أكثر: constitutional | civil | commercial | international | ip-tech | rights | environment | health | criminal
  hook:  { ar: "سطر واحد مشوّق يظهر على ملف القضية", en: "" },
  parties: {
    A: { name: { ar: "...", en: "..." }, role: { ar: "المدّعية", en: "Claimant" } },
    B: { name: { ar: "...", en: "..." }, role: { ar: "المدّعى عليه", en: "Defendant" } }
  },
  facts: { ar: "الوقائع بحياد، من 80 إلى 140 كلمة، بدون ذكر النتيجة", en: "" },
  sources: [
    { title: "Wikipedia — Donoghue v Stevenson", url: "https://...", status: "confirmed" } // confirmed | likely | unread
  ],
  review: "reviewed",                  // reviewed = الوقائع راجعناها مقابل مصدر مفتوح | draft
  evidence: [
    { id: "e1", label: { ar: "القارورة المعتمة", en: "" }, detail: { ar: "...", en: "" } }
    // من 3 إلى 5 أدلة، ويستخدمها الطرفان
  ],
  stages: [ /* خمس مراحل بالترتيب: basis, opening, evidence, rebuttal, closing */
    {
      type: "basis",
      prompt: { A: { ar: "سؤال القاضي لمحامي الطرف A", en: "" }, B: { ar: "...", en: "" } },
      opponentLine: { A: { ar: "", en: "" }, B: { ar: "", en: "" } }, // يُملأ فقط في مرحلة rebuttal: حجة الخصم اللي يرد عليها اللاعب
      options: {
        A: [
          { id: "a1", text: { ar: "...", en: "" }, points: 3, origin: "documented", judge: { ar: "تعليق القاضي وليش", en: "" } },
          { id: "a2", text: { ar: "...", en: "" }, points: 2, origin: "adapted",    judge: { ar: "...", en: "" } },
          { id: "a3", text: { ar: "...", en: "" }, points: 1, origin: "adapted",    judge: { ar: "...", en: "" } },
          { id: "a4", text: { ar: "...", en: "" }, points: 0, origin: "adapted",    judge: { ar: "...", en: "" } }
        ],
        B: [ /* نفس الشكل */ ]
      }
    }
    // في مرحلة evidence كل خيار فيه evidenceId يشير لدليل من evidence
  ],
  verdict: {
    winner: "A",                        // A | B | mixed
    summary:   { ar: "الحكم في سطرين", en: "" },
    reasoning: { ar: "ليش حكمت المحكمة كذا، من 60 إلى 120 كلمة", en: "" },
    vote: "3-2", voteStatus: "confirmed", // احذف vote إذا ما فيه تصويت أو غير معروف. voteStatus: confirmed | likely
    aftermath: { ar: "وش صار بعدها، في سطرين أو ثلاثة", en: "" }
  }
});
```

## قواعد الكتابة
1. **اللغة:** عربي فصيح مبسّط وواضح لعمر 13 وفوق. الحقل `en` فاضي إلا في title وcountry وcourt وparties.name وparties.role.
2. **صيغة المخاطبة:** تعليقات القاضي وأسئلته تكون محايدة بين المذكر والمؤنث. مثال: «هذه حجة قوية لأن...»، وتجنّب «أحسنتَ» و«أحسنتِ».
3. **الخيارات:** كل مرحلة وكل طرف فيها 4 خيارات بالنقاط 3 و2 و1 و0، ونرتّبها عشوائيًا في الملف (المحرّك يخلطها مرة ثانية).
   - **3:** أقوى حجة قانونية.
   - **2:** مقبولة.
   - **1:** ضعيفة.
   - **0:** خاطئة قانونيًا أو عاطفية أو خارج الموضوع، لكنها لازم تبين معقولة لغير المختص.
   - طول كل خيار من 15 إلى 35 كلمة.
4. **النقاط تقيس جودة الحجة، مو نتيجة الحكم.** الطرف اللي خسر فعلًا لازم يكون عنده خيار بـ 3 نقاط في كل مرحلة.
5. **تعليق القاضي:** من 20 إلى 45 كلمة. يشرح ليش الحجة قوية أو ضعيفة قانونيًا، ويعلّم مهارة من مهارات المحاماة (ربط الدليل بالادعاء، الرد على نقطة الخصم، عبء الإثبات...).
6. **origin:**
   - `documented`: الحجة مذكورة فعلًا في المصادر.
   - `adapted`: صياغتنا نحن.
   - لا تنسب أي اقتباس حرفي لقاضٍ حقيقي إلا إذا كان موثّقًا.
7. **الدقة:**
   - كل واقعة وكل رقم يكون من `docs/research-*.md` أو من مصدر فتحته بنفسك.
   - الرقم المرجّح نضع معه `voteStatus: "likely"` أو نحذفه.
   - لا تخترع أسماء أو تواريخ أو أرقام.
8. **الحياد والعمر:**
   - بدون أي وصف للعنف أو الدم.
   - بدون أي تفاصيل شخصية عن أحياء غير اللي في السجل العام.
   - في قضايا الدول نصوغ الطرفين بتوازن.
   - التحفّظات المذكورة في تقارير البحث **ملزمة**.
9. **القضايا الجنائية:** A = الادعاء، وB = الدفاع.
