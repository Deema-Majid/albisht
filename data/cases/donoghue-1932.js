// قضية Donoghue v Stevenson (1932)
// المصدر الداخلي: docs/research-cases.md (القسم 3). الحجج المعلّمة documented مذكورة في تقرير الباحث،
// والباقي adapted (صياغتنا). لا يوجد أي اقتباس حرفي منسوب لقاضٍ.
(window.CASES = window.CASES || []).push({
  id: "donoghue-1932",
  title:   { ar: "قضية الحلزون في القارورة", en: "Donoghue v Stevenson" },
  country: { ar: "المملكة المتحدة (اسكتلندا)", en: "United Kingdom (Scotland)" },
  region:  "europe",
  court:   { ar: "مجلس اللوردات", en: "House of Lords" },
  year: 1932, date: "1932-05-26",
  tags: ["civil"],
  hook:  { ar: "حلزون في قارورة مشروب… هل يُسأل الصانع أمام شخص ما اشترى منه أصلًا؟", en: "A snail in a bottle of ginger beer... can the maker be held liable to someone who never bought anything from him?" },
  parties: {
    A: { name: { ar: "ماي دونهيو", en: "May Donoghue" }, role: { ar: "المدّعية", en: "Pursuer" } },
    B: { name: { ar: "ديفيد ستيفنسون", en: "David Stevenson" }, role: { ar: "صانع المشروب (المدّعى عليه)", en: "Manufacturer (Defender)" } }
  },
  facts: {
    ar: "سنة 1928 جلست ماي دونهيو مع صديقتها في مقهى بمدينة بيزلي في اسكتلندا. اشترت الصديقة لها مشروب زنجبيل في قارورة من زجاج معتم لا يُرى ما بداخلها، وكانت القارورة مغلقة منذ خرجت من مصنع ديفيد ستيفنسون. تقول دونهيو إنها شربت جزءًا من المشروب، ثم وجدت في القارورة بقايا حلزون متحلل، وإنها مرضت بعد ذلك. رفعت دونهيو دعوى تعويض على الصانع مباشرة. لكنها لم تشترِ المشروب بنفسها، فلا يوجد أي عقد بينها وبين الصانع ولا بينها وبين صاحب المقهى. وكانت محكمة اسكتلندية قد رفضت قبل سنوات قليلة دعوى مشابهة ضد صانع مشروبات. ووصلت القضية إلى مجلس اللوردات ليجيب عن سؤال واحد: هل للمستهلك حق على الصانع بدون عقد بينهما؟",
    en: "In 1928, May Donoghue sat with a friend in a café in the town of Paisley, Scotland. The friend bought her a ginger beer in a bottle of dark, opaque glass, so no one could see what was inside, and the bottle had been sealed since it left David Stevenson's factory. Donoghue says she drank part of the drink and then found the remains of a decomposed snail in the bottle, and that she fell ill afterwards. Donoghue sued the manufacturer directly for compensation. But she had not bought the drink herself, so there was no contract between her and the manufacturer, nor between her and the café owner. A few years earlier, a Scottish court had rejected a similar claim against a drinks manufacturer. The case reached the House of Lords to answer a single question: does a consumer have a claim against a manufacturer without a contract between them?"
  },
  sources: [
    { title: "Wikipedia — Donoghue v Stevenson", url: "https://en.wikipedia.org/wiki/Donoghue_v_Stevenson", status: "confirmed" },
    { title: "Scottish Council of Law Reporting — The Paisley Snail mini-trial", url: "https://scottishlawreports.org.uk/resources/donoghue-v-stevenson/the-paisley-snail-minitrial", status: "confirmed" }
  ],
  review: "reviewed",
  evidence: [
    { id: "e1", label: { ar: "القارورة المعتمة", en: "The opaque bottle" }, detail: { ar: "زجاج القارورة معتم لا يُظهر ما بداخلها، وكانت مغلقة منذ خرجت من المصنع، فلم يكن أحد يستطيع فحص المشروب قبل شربه.", en: "The bottle's glass was opaque and hid what was inside, and it had been sealed since it left the factory, so no one could inspect the drink before drinking it." } },
    { id: "e2", label: { ar: "الصديقة هي اللي اشترت", en: "The friend was the one who bought it" }, detail: { ar: "الصديقة هي التي دفعت ثمن المشروب، فلا يوجد عقد بين دونهيو وصاحب المقهى، ولا بينها وبين الصانع.", en: "The friend paid for the drink, so there was no contract between Donoghue and the café owner, nor between her and the manufacturer." } },
    { id: "e3", label: { ar: "سابقة Mullen v Barr (1929)", en: "The Mullen v Barr precedent (1929)" }, detail: { ar: "قضية اسكتلندية سابقة رفضت فيها المحكمة دعوى مشابهة ضد صانع مشروبات، ويستند إليها الصانع.", en: "An earlier Scottish case in which the court rejected a similar claim against a drinks manufacturer. The manufacturer relies on it." } },
    { id: "e4", label: { ar: "الحلزون لم يُعرض على المحكمة", en: "The snail was never shown to the court" }, detail: { ar: "الصانع ينكر وجود الحلزون، ولم يُفحص أمام أي محكمة. والسؤال المطروح قانوني: لو صحّت الوقائع، هل للمدّعية حق؟", en: "The manufacturer denies the snail existed, and it was never examined before any court. The question raised is a legal one: if the facts are true, does the pursuer have a claim?" } },
    { id: "e5", label: { ar: "ادعاء: نظام تنظيف القوارير", en: "Claim: the bottle-cleaning system" }, detail: { ar: "تقول دونهيو إن نظام فحص القوارير وتنظيفها في مصنع ستيفنسون لم يكن فعّالًا.", en: "Donoghue says the system for inspecting and cleaning bottles at Stevenson's factory was not effective." } }
  ],
  stages: [
    {
      type: "basis",
      prompt: {
        A: { ar: "المدّعية لم توقّع أي عقد مع الصانع. على أي أساس قانوني تطالبه بالتعويض؟", en: "The pursuer never signed any contract with the manufacturer. On what legal basis does she claim compensation from him?" },
        B: { ar: "على أي أساس قانوني يرى الدفاع أن الصانع غير مسؤول تجاه المدّعية؟", en: "On what legal basis does the defense argue that the manufacturer is not liable to the pursuer?" }
      },
      opponentLine: { A: { ar: "", en: "" }, B: { ar: "", en: "" } },
      options: {
        A: [
          { id: "a1", text: { ar: "القانون يحمي الناس من الأضرار حتى خارج العقود، فالفعل الضار بحد ذاته قد يكون سببًا كافيًا للمطالبة بالتعويض.", en: "The law protects people from harm even outside contracts, so a harmful act on its own can be a sufficient reason to claim compensation." }, points: 2, origin: "adapted",
            judge: { ar: "حجة مقبولة. صحيح أن المسؤولية قد تقوم خارج العقد، لكنها عامة جدًا. المحكمة تحتاج تحديدًا: لماذا يكون هذا الصانع بالذات مسؤولًا تجاه هذه المستهلكة؟", en: "An acceptable argument. It is true that liability can arise outside a contract, but this is far too general. The court needs specifics: why is this particular manufacturer liable to this particular consumer?" } },
          { id: "a2", text: { ar: "موكّلتي عانت كثيرًا ومرضت بسبب المشروب، والعدل يقتضي أن تُعوَّض بغض النظر عن وجود عقد أو أي قواعد قانونية أخرى.", en: "My client suffered greatly and fell ill because of the drink, and justice demands that she be compensated regardless of whether there is a contract or any other legal rules." }, points: 0, origin: "adapted",
            judge: { ar: "هذه حجة خارج المطلوب. التعاطف لا يصنع أساسًا قانونيًا، والمحامي يربط الضرر بقاعدة واضحة، وإلا تبقى المطالبة بلا سند مهما كان الضرر مؤلمًا.", en: "This argument misses what is being asked. Sympathy does not create a legal basis. A lawyer links the harm to a clear rule; otherwise the claim has no foundation, however painful the harm." } },
          { id: "a3", text: { ar: "الصانع عليه واجب عناية تجاه المستهلك الأخير، لأنه يعرف أن منتجه سيصل إليه مغلقًا وبلا فحص، فالضرر متوقّع حتى بدون عقد.", en: "The manufacturer owes a duty of care to the final consumer, because he knows his product will reach them sealed and uninspected, so the harm is foreseeable even without a contract." }, points: 3, origin: "documented",
            judge: { ar: "حجة قوية. تبني المسؤولية على علاقة الصانع بمن سيستخدم منتجه، لا على العقد. وربط الواجب بإمكانية توقّع الضرر هو لبّ قانون الإهمال.", en: "A strong argument. It bases liability on the manufacturer's relationship with whoever will use the product, not on a contract. Linking the duty to the foreseeability of harm is the heart of the law of negligence." } },
          { id: "a4", text: { ar: "الصديقة اشترت المشروب من المقهى، فموكّلتي تستفيد من عقد صديقتها كأنها هي التي اشترت المشروب بنفسها.", en: "The friend bought the drink from the café, so my client benefits from her friend's contract as if she had bought the drink herself." }, points: 1, origin: "adapted",
            judge: { ar: "حجة ضعيفة. العقد يربط طرفيه فقط، والمدّعية ليست طرفًا فيه. ومدّ العقد إلى غير أطرافه يحتاج أساسًا قانونيًا واضحًا لم يُقدَّم هنا.", en: "A weak argument. A contract binds only its parties, and the pursuer is not a party to it. Extending a contract to people outside it requires a clear legal basis, and none was offered here." } }
        ],
        B: [
          { id: "b1", text: { ar: "المدّعية تستطيع مقاضاة صاحب المقهى بدل موكّلي، فهو الذي قدّم لها المشروب وهو الأقرب إليها في هذه القصة.", en: "The pursuer can sue the café owner instead of my client, since he is the one who served her the drink and is closest to her in this story." }, points: 1, origin: "adapted",
            judge: { ar: "حجة ضعيفة. لا يوجد عقد بين المدّعية وصاحب المقهى أيضًا، فالحجة تنقل المشكلة ولا تحلّها، ولا ترد على سؤال مسؤولية الصانع نفسه.", en: "A weak argument. There is no contract between the pursuer and the café owner either, so the argument moves the problem rather than solving it, and it does not answer the question of the manufacturer's own liability." } },
          { id: "b2", text: { ar: "لا يوجد عقد بين موكّلي والمدّعية، والقاعدة السائدة أن الصانع لا يُسأل عن منتج غير خطِر بطبيعته إلا أمام من تعاقد معه.", en: "There is no contract between my client and the pursuer, and the prevailing rule is that a manufacturer is liable for a product that is not inherently dangerous only to the person he contracted with." }, points: 3, origin: "documented",
            judge: { ar: "حجة قوية. تجمع غياب العقد مع تمييز معروف بين المنتجات الخطرة بطبيعتها وغيرها. هكذا يُبنى الدفاع على قاعدة سائدة، لا على إنكار عام.", en: "A strong argument. It combines the absence of a contract with a well-known distinction between inherently dangerous products and other products. This is how a defense is built on a prevailing rule rather than a general denial." } },
          { id: "b3", text: { ar: "موكّلي صاحب مصنع محترم وسمعته طيبة منذ سنوات طويلة، ولا يمكن أن يهمل في عمله أو في نظافة قواريره.", en: "My client owns a respected factory with a good reputation built over many years, and he could never be careless in his work or in keeping his bottles clean." }, points: 0, origin: "adapted",
            judge: { ar: "هذه حجة خارج الموضوع. السمعة الطيبة ليست دليلًا ولا قاعدة قانونية، والسؤال المطروح عن وجود واجب قانوني، لا عن شخصية الصانع.", en: "This argument is off topic. A good reputation is neither evidence nor a legal rule. The question is whether a legal duty exists, not what kind of person the manufacturer is." } },
          { id: "b4", text: { ar: "المسؤولية خارج العقد استثناء ضيق، وتوسيعها لتشمل كل مستهلك سيفتح الباب لدعاوى لا نهاية لها ضد كل الصانعين.", en: "Liability outside contract is a narrow exception, and extending it to cover every consumer would open the door to endless lawsuits against all manufacturers." }, points: 2, origin: "adapted",
            judge: { ar: "حجة مقبولة. التحذير من كثرة الدعاوى حجة معروفة، لكنها وحدها لا تثبت أن القانون الحالي يعفي الصانع. الأفضل البدء بالقاعدة ثم إضافة أثرها.", en: "An acceptable argument. Warning about a flood of lawsuits is a well-known argument, but on its own it does not prove that the current law excuses the manufacturer. It is better to start with the rule and then add its consequences." } }
        ]
      }
    },
    {
      type: "opening",
      prompt: {
        A: { ar: "ما الافتتاحية القصيرة التي تلخّص بها المدّعية قضيتها أمام المحكمة؟", en: "What short opening statement does the pursuer use to sum up her case before the court?" },
        B: { ar: "ما الافتتاحية التي يقدّمها الدفاع عن الصانع أمام المحكمة؟", en: "What opening statement does the defense present on behalf of the manufacturer?" }
      },
      opponentLine: { A: { ar: "", en: "" }, B: { ar: "", en: "" } },
      options: {
        A: [
          { id: "a1", text: { ar: "سنروي للمحكمة كل ما حدث في ذلك اليوم داخل المقهى بالتفصيل، دقيقة بدقيقة، حتى تتضح الصورة كاملة.", en: "We will tell the court everything that happened in the café that day in detail, minute by minute, until the full picture is clear." }, points: 1, origin: "adapted",
            judge: { ar: "افتتاحية ضعيفة. التفاصيل الكثيرة بلا هدف تشتّت انتباه المحكمة عن السؤال الأساسي. الافتتاحية الجيدة تختار الوقائع المهمة قانونيًا فقط، وتترك الباقي لوقته.", en: "A weak opening. Lots of detail without a purpose distracts the court from the main question. A good opening picks only the facts that matter legally and leaves the rest for later." } },
          { id: "a2", text: { ar: "سنثبت أن موكّلتي تضررت من مشروب صنعه المدّعى عليه، وأن هذا الضرر الذي أصابها يستحق التعويض.", en: "We will prove that my client was harmed by a drink made by the defender, and that the harm she suffered deserves compensation." }, points: 2, origin: "adapted",
            judge: { ar: "افتتاحية مقبولة. واضحة ومرتبة، لكنها لا تذكر لماذا يقع الواجب على الصانع رغم غياب العقد، وهي النقطة التي سيهاجمها الخصم أولًا.", en: "An acceptable opening. It is clear and well organized, but it does not say why the duty falls on the manufacturer despite there being no contract, which is the point the other side will attack first." } },
          { id: "a3", text: { ar: "الشركات تهمل المستهلكين البسطاء دائمًا، وهذه القضية مجرد مثال آخر على ما يحدث كل يوم في كل مكان.", en: "Companies always neglect ordinary consumers, and this case is just one more example of what happens every day, everywhere." }, points: 0, origin: "adapted",
            judge: { ar: "افتتاحية خاطئة. التعميم على كل الشركات ليس دليلًا ضد هذا الصانع بالذات، وقد يضر بمصداقية المحامي أمام المحكمة. الأقوى التركيز على وقائع القضية.", en: "A mistaken opening. Generalizing about all companies is no evidence against this particular manufacturer, and it may hurt the lawyer's credibility before the court. It is stronger to focus on the facts of the case." } },
          { id: "a4", text: { ar: "موكّلتي شربت من قارورة مغلقة لا يُرى ما بداخلها، فالصانع وحده كان قادرًا على منع الضرر، وعليه واجب عناية تجاهها.", en: "My client drank from a sealed bottle whose contents could not be seen, so only the manufacturer could have prevented the harm, and he owed her a duty of care." }, points: 3, origin: "documented",
            judge: { ar: "افتتاحية قوية. تقدّم الواقعة المهمة، وهي القارورة المغلقة والمعتمة، وتربطها مباشرة بالواجب القانوني. الافتتاحية الجيدة تخبر القاضي من البداية بما سيُثبَت لاحقًا.", en: "A strong opening. It presents the key fact, the sealed and opaque bottle, and links it directly to the legal duty. A good opening tells the judge from the start what will be proven later." } }
        ],
        B: [
          { id: "b1", text: { ar: "المدّعية تبالغ في وصف مرضها حتى تحصل على المال، ولا ينبغي للمحكمة أن تصدّق كلامها.", en: "The pursuer is exaggerating her illness to get money, and the court should not believe what she says." }, points: 0, origin: "adapted",
            judge: { ar: "افتتاحية خاطئة. اتهام الخصم بالكذب بلا دليل يضعف موقف الدفاع ويبعد المحكمة عن السؤال القانوني. المحامي يناقش الأدلة، لا نوايا الأشخاص.", en: "A mistaken opening. Accusing the other side of lying without evidence weakens the defense and pulls the court away from the legal question. A lawyer argues about the evidence, not about people's motives." } },
          { id: "b2", text: { ar: "القضية تطلب من المحكمة إنشاء مسؤولية جديدة لا يعرفها القانون: صانع يُسأل أمام شخص لم يتعاقد معه، عن منتج غير خطِر بطبيعته.", en: "This case asks the court to create a new kind of liability unknown to the law: a manufacturer held liable to someone he never contracted with, for a product that is not inherently dangerous." }, points: 3, origin: "documented",
            judge: { ar: "افتتاحية قوية. تحدد السؤال القانوني بدقة، وتضع عبء الإقناع على الطرف الآخر، لأن المدّعية هي التي تطلب من المحكمة توسيع القانون.", en: "A strong opening. It defines the legal question precisely and puts the burden of persuasion on the other side, because the pursuer is the one asking the court to expand the law." } },
          { id: "b3", text: { ar: "مصنع موكّلي ينظّف القوارير بعناية كبيرة، ولم تصله من قبل أي شكوى عن منتجاته من أي زبون.", en: "My client's factory cleans its bottles with great care, and it has never received a single complaint about its products from any customer." }, points: 1, origin: "adapted",
            judge: { ar: "افتتاحية ضعيفة. هذا ادعاء بلا دليل مقدَّم، وغياب الشكاوى السابقة لا يثبت سلامة هذه القارورة تحديدًا. الادعاء يحتاج دليلًا يسنده.", en: "A weak opening. This is a claim with no evidence presented, and the lack of past complaints does not prove that this particular bottle was safe. A claim needs evidence to support it." } },
          { id: "b4", text: { ar: "موكّلي ينكر وجود أي حلزون في القارورة، والمدّعية لم تقدّم حتى الآن ما يثبت ادعاءها أمام المحكمة.", en: "My client denies that there was any snail in the bottle, and so far the pursuer has presented nothing to the court that proves her claim." }, points: 2, origin: "documented",
            judge: { ar: "افتتاحية مقبولة. إنكار الوقائع حق للدفاع، لكن المحكمة هنا تنظر في سؤال قانوني على فرض صحة الوقائع، فالإنكار وحده لا يحسم هذا السؤال.", en: "An acceptable opening. Denying the facts is the defense's right, but here the court is considering a legal question on the assumption that the facts are true, so denial alone does not settle that question." } }
        ]
      }
    },
    {
      type: "evidence",
      prompt: {
        A: { ar: "أي دليل يدعم موقف المدّعية أكثر من غيره، وكيف يخدمه؟", en: "Which piece of evidence best supports the pursuer's position, and how does it help?" },
        B: { ar: "أي دليل يدعم دفاع الصانع أكثر من غيره، وكيف يخدمه؟", en: "Which piece of evidence best supports the manufacturer's defense, and how does it help?" }
      },
      opponentLine: { A: { ar: "", en: "" }, B: { ar: "", en: "" } },
      options: {
        A: [
          { id: "a1", evidenceId: "e3", text: { ar: "قضية Mullen v Barr تثبت أن المحاكم الاسكتلندية تتعامل مع شكاوى المشروبات بجدية، فهي سابقة في صالح موكّلتي.", en: "The Mullen v Barr case proves that Scottish courts take complaints about drinks seriously, so it is a precedent in my client's favor." }, points: 0, origin: "adapted",
            judge: { ar: "استخدام خاطئ للدليل. هذه السابقة رُفضت فيها الدعوى ضد الصانع، فالاستشهاد بها يخدم الخصم. وقراءة السابقة جيدًا ضرورية قبل الاستناد إليها.", en: "A misuse of the evidence. In this precedent the claim against the manufacturer was rejected, so citing it helps the other side. Reading a precedent carefully is essential before relying on it." } },
          { id: "a2", evidenceId: "e1", text: { ar: "القارورة معتمة ومغلقة، فلا موكّلتي ولا صاحب المقهى كان يستطيع فحص المشروب. الصانع آخر من رآه، فهو المسؤول عن سلامته.", en: "The bottle was opaque and sealed, so neither my client nor the café owner could inspect the drink. The manufacturer was the last to see it, so he is responsible for its safety." }, points: 3, origin: "documented",
            judge: { ar: "استخدام قوي للدليل. يربط الدليل مباشرة بالادعاء: عدم إمكانية الفحص يعني أن المستهلك يعتمد كليًا على عناية الصانع، وهذا ما يحتاجه القاضي لتأسيس الواجب.", en: "A strong use of the evidence. It links the evidence directly to the claim: being unable to inspect means the consumer relies entirely on the manufacturer's care, which is exactly what the judge needs to establish the duty." } },
          { id: "a3", evidenceId: "e5", text: { ar: "نظام تنظيف القوارير في المصنع لم يكن فعّالًا، وهذا يفسّر كيف وصل الحلزون إلى داخل القارورة.", en: "The factory's bottle-cleaning system was not effective, and this explains how the snail got inside the bottle." }, points: 2, origin: "documented",
            judge: { ar: "استخدام مقبول. يشير إلى إهمال محتمل، لكنه ادعاء يحتاج إثباتًا، ولا يجيب عن السؤال الأسبق: هل على الصانع واجب تجاه المدّعية أصلًا؟", en: "An acceptable use. It points to possible negligence, but it is a claim that needs proof, and it does not answer the earlier question: does the manufacturer owe the pursuer a duty at all?" } },
          { id: "a4", evidenceId: "e2", text: { ar: "الصديقة هي التي اشترت المشروب، وهذا يبيّن أن موكّلتي كانت ضيفة بريئة لم ترتكب أي خطأ في ذلك اليوم.", en: "The friend was the one who bought the drink, which shows that my client was an innocent guest who did nothing wrong that day." }, points: 1, origin: "adapted",
            judge: { ar: "استخدام ضعيف. هذا الدليل يخدم الخصم أكثر لأنه يؤكد غياب العقد. وبراءة المدّعية ليست محل نزاع أصلًا، والمطلوب إثبات واجب الصانع.", en: "A weak use. This evidence helps the other side more, because it confirms there was no contract. The pursuer's innocence is not in dispute anyway; what must be proven is the manufacturer's duty." } }
        ],
        B: [
          { id: "b1", evidenceId: "e4", text: { ar: "الحلزون لم يُعرض على المحكمة، فلا دليل مادي على وجوده، وعلى المحكمة أن ترفض الدعوى لهذا السبب وحده.", en: "The snail was never shown to the court, so there is no physical evidence that it existed, and the court should dismiss the claim for this reason alone." }, points: 1, origin: "documented",
            judge: { ar: "استخدام ضعيف في هذه المرحلة. المحكمة تنظر في سؤال قانوني أولي على فرض صحة الادعاء، والإثبات يأتي لاحقًا. الحجة تناسب مرحلة أخرى لا هذا السؤال.", en: "A weak use at this stage. The court is considering a preliminary legal question on the assumption that the claim is true; proof comes later. This argument suits a different stage, not this question." } },
          { id: "b2", evidenceId: "e1", text: { ar: "القارورة معتمة، وهذا يعني أن المدّعية كان عليها أن تنتبه أكثر وتتأكد مما في المشروب قبل أن تشربه.", en: "The bottle was opaque, which means the pursuer should have been more careful and checked what was in the drink before drinking it." }, points: 0, origin: "adapted",
            judge: { ar: "استخدام خاطئ للدليل. القارورة المعتمة تعني أن المدّعية لم تكن قادرة على الرؤية أصلًا، فالدليل يعمل ضد الدفاع. والدليل الذي يقوّي حجة الخصم لا يصح استخدامه.", en: "A misuse of the evidence. The opaque bottle means the pursuer could not see inside at all, so the evidence works against the defense. Evidence that strengthens the other side's argument should not be used." } },
          { id: "b3", evidenceId: "e3", text: { ar: "في قضية Mullen v Barr رفضت محكمة اسكتلندية دعوى مشابهة ضد صانع مشروبات، والمحاكم تلتزم بسوابقها حفاظًا على استقرار القانون.", en: "In Mullen v Barr, a Scottish court rejected a similar claim against a drinks manufacturer, and courts follow their precedents to keep the law stable." }, points: 3, origin: "documented",
            judge: { ar: "استخدام قوي للدليل. سابقة قريبة جدًا من الوقائع ومن النظام القانوني نفسه، وربطها بمبدأ استقرار القانون يجعلها حجة يصعب تجاهلها.", en: "A strong use of the evidence. A precedent very close to the facts and from the same legal system, linked to the principle of legal stability, makes an argument that is hard to ignore." } },
          { id: "b4", evidenceId: "e2", text: { ar: "الصديقة هي التي اشترت المشروب، فلا عقد بين المدّعية وأي أحد، لا صاحب المقهى ولا موكّلي.", en: "The friend was the one who bought the drink, so the pursuer has no contract with anyone, neither the café owner nor my client." }, points: 2, origin: "documented",
            judge: { ar: "استخدام مقبول. يثبت غياب العقد بوضوح، لكنه يكرر نقطة معروفة ولا يقدّم سببًا لعدم قيام مسؤولية خارج العقد، وهي ما تطلبه المدّعية.", en: "An acceptable use. It clearly proves there was no contract, but it repeats a known point and gives no reason why liability outside contract should not arise, which is what the pursuer is asking for." } }
        ]
      }
    },
    {
      type: "rebuttal",
      prompt: {
        A: { ar: "كيف ترد المدّعية على حجة الدفاع عن الصانع؟", en: "How does the pursuer respond to the manufacturer's defense?" },
        B: { ar: "كيف يرد الدفاع عن الصانع على حجة المدّعية؟", en: "How does the manufacturer's defense respond to the pursuer's argument?" }
      },
      opponentLine: {
        A: { ar: "لو صار كل صانع مسؤولًا أمام كل من يستخدم منتجه، فلن تنتهي الدعاوى أبدًا، ولهذا اشترط القانون وجود عقد.", en: "If every manufacturer were liable to everyone who uses its products, the lawsuits would never end, and that is why the law requires a contract." },
        B: { ar: "القارورة مغلقة ومعتمة، فلا أحد غير الصانع يستطيع ضمان سلامة ما بداخلها، ولهذا عليه واجب عناية تجاه من يشربها.", en: "The bottle was sealed and opaque, so no one but the manufacturer could guarantee that its contents were safe, and that is why he owes a duty of care to whoever drinks it." }
      },
      options: {
        A: [
          { id: "a1", text: { ar: "عدد الدعاوى ليس مشكلة موكّلتي، والمحاكم موجودة أصلًا حتى تنظر في الدعاوى مهما كثرت أو تكررت.", en: "The number of lawsuits is not my client's problem, and courts exist precisely to hear cases, however many there are and however often they come up." }, points: 1, origin: "adapted",
            judge: { ar: "رد ضعيف. يتجاهل النقطة بدل أن يرد عليها. القاضي يهتم بأثر حكمه على القضايا القادمة، وتجاهل هذا القلق يضعف موقف المدّعية.", en: "A weak response. It ignores the point instead of answering it. A judge cares about how a ruling will affect future cases, and ignoring this concern weakens the pursuer's position." } },
          { id: "a2", text: { ar: "الواجب لا يشمل كل الناس، بل من يتوقع الصانع بشكل معقول أنهم سيتأثرون بمنتجه مباشرة، مثل من يشرب من قارورة مغلقة لا تُفحص.", en: "The duty does not cover everyone, only those the manufacturer can reasonably foresee will be directly affected by the product, such as someone drinking from a sealed bottle that cannot be inspected." }, points: 3, origin: "adapted",
            judge: { ar: "رد قوي. لم يرفض قلق الخصم، بل حدّد حدود الواجب بمعيار واضح هو التوقع المعقول والعلاقة المباشرة. الرد الجيد يعالج نقطة الخصم نفسها.", en: "A strong response. It does not dismiss the other side's concern; it sets limits on the duty with a clear test: reasonable foreseeability and a direct relationship. A good response deals with the other side's actual point." } },
          { id: "a3", text: { ar: "الصانع يحاول تخويف المحكمة من كثرة الدعاوى حتى يهرب من المسؤولية، وهذا تصرّف غير أخلاقي منه.", en: "The manufacturer is trying to scare the court with a flood of lawsuits so he can escape responsibility, and that is unethical of him." }, points: 0, origin: "adapted",
            judge: { ar: "رد خاطئ. مهاجمة دوافع الخصم ليست ردًا قانونيًا، ولا تجيب عن قلقه من كثرة الدعاوى. الأقوى التركيز على مضمون الحجة نفسها، وتقديم معيار قانوني يرد عليها.", en: "A mistaken response. Attacking the other side's motives is not a legal answer, and it does not address the concern about a flood of lawsuits. It is stronger to focus on the substance of the argument and offer a legal test that answers it." } },
          { id: "a4", text: { ar: "القانون ليس ثابتًا، والمحاكم طوّرت قواعد جديدة من قبل كلما تغيّرت حاجات المجتمع وطريقة البيع والشراء.", en: "The law is not fixed, and courts have developed new rules before whenever society's needs and the ways people buy and sell have changed." }, points: 2, origin: "adapted",
            judge: { ar: "رد مقبول. صحيح أن القانون يتطور، لكنه لا يبيّن كيف نمنع كثرة الدعاوى التي يخشاها الخصم. الرد الأقوى يقترح حدًا واضحًا للواجب.", en: "An acceptable response. It is true that the law develops, but this does not show how to prevent the flood of lawsuits the other side fears. A stronger response proposes a clear limit on the duty." } }
        ],
        B: [
          { id: "b1", text: { ar: "الحلزون كائن طبيعي غير ضار في الأصل، فوجوده في المشروب لا يُعد إهمالًا من الصانع ولا من أي أحد آخر.", en: "A snail is a natural creature that is harmless in itself, so its presence in the drink is not negligence by the manufacturer or anyone else." }, points: 0, origin: "adapted",
            judge: { ar: "رد خاطئ. يبدو منطقيًا لكنه يتجاهل أن الضرر المدّعى هو المرض بعد الشرب، ونفي الضرر برأي شخصي ليس ردًا قانونيًا على حجة الخصم.", en: "A mistaken response. It sounds logical, but it ignores that the harm claimed is the illness after drinking, and denying harm based on personal opinion is not a legal answer to the other side's argument." } },
          { id: "b2", text: { ar: "حتى لو كانت القارورة معتمة، فهذا لا يغيّر حقيقة أن المدّعية لم تتعاقد مع موكّلي في أي وقت.", en: "Even if the bottle was opaque, that does not change the fact that the pursuer never had a contract with my client at any time." }, points: 2, origin: "adapted",
            judge: { ar: "رد مقبول. يعيد التأكيد على غياب العقد، لكنه لا يجيب عن النقطة الجديدة التي طرحها الخصم: لماذا لا يكفي عدم إمكانية الفحص لقيام الواجب؟", en: "An acceptable response. It restates the absence of a contract, but it does not answer the new point the other side raised: why is the impossibility of inspection not enough to create a duty?" } },
          { id: "b3", text: { ar: "ربما فُتحت القارورة أو عُبث بها بعد خروجها من المصنع، فلا يمكن الجزم بأن الخطأ من موكّلي.", en: "Perhaps the bottle was opened or tampered with after it left the factory, so it cannot be said for certain that the fault was my client's." }, points: 1, origin: "adapted",
            judge: { ar: "رد ضعيف. احتمال بلا دليل، ولا يناسب سؤالًا قانونيًا يفترض صحة الوقائع. الدفاع بالتخمين يفتح الباب لأسئلة لا يملك الدفاع إجابتها.", en: "A weak response. It is a possibility with no evidence, and it does not suit a legal question that assumes the facts are true. Defending by guesswork opens the door to questions the defense cannot answer." } },
          { id: "b4", text: { ar: "مشروب الزنجبيل ليس منتجًا خطِرًا بطبيعته، والقانون لم يفرض واجبًا خارج العقد إلا في المنتجات الخطرة، فلا يجوز توسيعه دون تشريع.", en: "Ginger beer is not an inherently dangerous product, and the law has imposed a duty outside contract only for dangerous products, so it should not be extended without legislation." }, points: 3, origin: "documented",
            judge: { ar: "رد قوي. يرد على الخصم بالقاعدة نفسها: الاستثناء محصور في المنتجات الخطرة. وترك توسيع القانون للمشرّع حجة معتبرة عند المحاكم.", en: "A strong response. It answers the other side with the rule itself: the exception is limited to dangerous products. Leaving the expansion of the law to the legislature is an argument that courts take seriously." } }
        ]
      }
    },
    {
      type: "closing",
      prompt: {
        A: { ar: "ما الخلاصة التي تختم بها المدّعية مرافعتها؟", en: "What final summary does the pursuer use to close her case?" },
        B: { ar: "ما الخلاصة التي يختم بها الدفاع مرافعته؟", en: "What final summary does the defense use to close its case?" }
      },
      opponentLine: { A: { ar: "", en: "" }, B: { ar: "", en: "" } },
      options: {
        A: [
          { id: "a1", text: { ar: "لو خسرت موكّلتي هذه القضية، سيفقد الناس ثقتهم في المحاكم وفي العدالة كلها، ولن يحمي القانون أحدًا بعد اليوم.", en: "If my client loses this case, people will lose their trust in the courts and in justice itself, and the law will protect no one from now on." }, points: 0, origin: "adapted",
            judge: { ar: "خاتمة خاطئة. مبالغة عاطفية لا تقنع القاضي، والتهويل يضعف مصداقية المحامي أمام المحكمة. الأفضل ربط النتيجة المطلوبة بقاعدة قانونية واضحة ومحددة.", en: "A mistaken closing. Emotional exaggeration does not persuade a judge, and overstatement weakens the lawyer's credibility before the court. It is better to link the requested outcome to a clear, specific legal rule." } },
          { id: "a2", text: { ar: "نترك الأمر كله لحكمة المحكمة الموقرة، ونثق تمامًا أنها ستتخذ القرار الصحيح والعادل في النهاية.", en: "We leave the whole matter to the wisdom of this honorable court, and we fully trust that it will reach the right and fair decision in the end." }, points: 1, origin: "adapted",
            judge: { ar: "خاتمة ضعيفة. الخاتمة بلا طلب ولا حجة تضيّع آخر فرصة للإقناع. المحامي الجيد يختم بما يريده من المحكمة بالضبط، ولماذا تستحقه موكّلته.", en: "A weak closing. A closing with no request and no argument wastes the last chance to persuade. A good lawyer ends with exactly what they want from the court and why their client deserves it." } },
          { id: "a3", text: { ar: "من يصنع منتجًا يصل إلى الناس مغلقًا عليه أن يعتني بمن يستخدمه. نطلب تقرير هذا الواجب، فهو عادل ومحدود بما يُتوقّع بشكل معقول.", en: "Anyone who makes a product that reaches people sealed must take care of those who use it. We ask the court to recognize this duty, which is fair and limited to what can reasonably be foreseen." }, points: 3, origin: "adapted",
            judge: { ar: "خاتمة قوية. تلخّص المبدأ في جملة واحدة، وتطلب طلبًا محددًا، وتطمئن المحكمة أن الواجب له حدود. الخاتمة الجيدة تجمع القاعدة والطلب معًا.", en: "A strong closing. It sums up the principle in one sentence, makes a specific request, and reassures the court that the duty has limits. A good closing brings the rule and the request together." } },
          { id: "a4", text: { ar: "أثبتنا أن القارورة كانت معتمة ومغلقة، وأن موكّلتي تضررت بعد الشرب، ولذلك نطلب من المحكمة الحكم لصالحها.", en: "We have proven that the bottle was opaque and sealed and that my client was harmed after drinking, so we ask the court to rule in her favor." }, points: 2, origin: "adapted",
            judge: { ar: "خاتمة مقبولة. تذكّر بأهم الوقائع وتطلب الحكم بوضوح، لكنها لا تذكّر المحكمة بالمبدأ القانوني المطلوب تقريره، وهو جوهر القضية كلها.", en: "An acceptable closing. It recalls the key facts and clearly asks for a ruling, but it does not remind the court of the legal principle it is being asked to establish, which is the core of the whole case." } }
        ],
        B: [
          { id: "b1", text: { ar: "القانون القائم والسابقة الاسكتلندية واضحان: لا مسؤولية بلا عقد في منتج غير خطِر. وإن أراد المجتمع قاعدة جديدة فطريقها التشريع، لا هذه القضية.", en: "The existing law and the Scottish precedent are clear: no liability without a contract for a product that is not dangerous. If society wants a new rule, the way to get it is legislation, not this case." }, points: 3, origin: "adapted",
            judge: { ar: "خاتمة قوية. تجمع القاعدة والسابقة، وتعطي المحكمة سببًا للتحفّظ. وتذكير القاضي بحدود دوره حجة جدية في القضايا التي تطلب تغيير القانون.", en: "A strong closing. It combines the rule and the precedent and gives the court a reason for caution. Reminding the judge of the limits of the court's role is a serious argument in cases that ask to change the law." } },
          { id: "b2", text: { ar: "القصة كلها قد تكون مختلقة، فالحلزون لم يُعرض على أي محكمة حتى الآن، ولا يصح تصديق رواية بلا دليل.", en: "The whole story may be made up; the snail has never been shown to any court, and a story without evidence should not be believed." }, points: 0, origin: "adapted",
            judge: { ar: "خاتمة خاطئة. اتهام بالاختلاق بلا دليل، وفي مرحلة تفترض فيها المحكمة صحة الوقائع. هذا يضعف مصداقية الدفاع بدل أن يقويه.", en: "A mistaken closing. It accuses the other side of making things up without evidence, at a stage where the court assumes the facts are true. This weakens the defense's credibility instead of strengthening it." } },
          { id: "b3", text: { ar: "موكّلي رجل أعمال يعمل بجد منذ سنوات، وتحميله هذه المسؤولية سيضر بمصنعه وبالعاملين فيه وبعائلاتهم.", en: "My client is a businessman who has worked hard for years, and holding him responsible would harm his factory, its workers and their families." }, points: 1, origin: "adapted",
            judge: { ar: "خاتمة ضعيفة. الضرر الاقتصادي على الصانع قد يهم المشرّع، لكنه لا يجيب عن سؤال الواجب القانوني. المحكمة تحكم بالقاعدة لا بالظروف الشخصية.", en: "A weak closing. Economic harm to the manufacturer may matter to the legislature, but it does not answer the question of legal duty. The court rules according to the rule, not personal circumstances." } },
          { id: "b4", text: { ar: "المدّعية لم تتعاقد مع موكّلي في أي وقت، ولذلك نطلب من المحكمة الموقرة رفض دعواها كاملة.", en: "The pursuer never had a contract with my client at any time, so we ask this honorable court to dismiss her claim in full." }, points: 2, origin: "adapted",
            judge: { ar: "خاتمة مقبولة. واضحة ومحددة الطلب، لكنها تختصر الدفاع في نقطة واحدة، وتتجاهل ما طرحه الخصم عن القارورة المغلقة التي لا تُفحص.", en: "An acceptable closing. It is clear and makes a specific request, but it reduces the defense to a single point and ignores what the other side said about the sealed bottle that cannot be inspected." } }
        ]
      }
    }
  ],
  verdict: {
    winner: "A",
    summary: { ar: "حكم مجلس اللوردات بأغلبية 3 ضد 2 أن على الصانع واجب عناية تجاه المستهلك الأخير، حتى لو لم يكن بينهما عقد.", en: "The House of Lords ruled by a 3-2 majority that a manufacturer owes a duty of care to the final consumer, even if there is no contract between them." },
    reasoning: { ar: "رأت الأغلبية أن الصانع الذي يبيع منتجه بطريقة تمنع فحصه قبل الاستخدام، ويعرف أن إهماله قد يضر المستهلك، عليه واجب عناية تجاه هذا المستهلك. وصاغ اللورد أتكن ما صار يُعرف بـ«مبدأ الجار»: على الإنسان أن يتجنب الأفعال التي يتوقع بشكل معقول أنها ستضر من يتأثرون بها مباشرة. ونظرت المحكمة في السؤال القانوني على فرض صحة ما تقوله دونهيو، ولم تفصل في وجود الحلزون نفسه.", en: "The majority held that a manufacturer who sells a product in a way that prevents it from being inspected before use, and who knows that carelessness could harm the consumer, owes that consumer a duty of care. Lord Atkin set out what became known as the “neighbour principle”: people must avoid acts that they can reasonably foresee would harm those who are directly affected by them. The court decided the legal question on the assumption that what Donoghue said was true, and did not rule on whether the snail itself existed." },
    vote: "3-2", voteStatus: "confirmed",
    aftermath: { ar: "صار «مبدأ الجار» أساس قانون الإهمال في بريطانيا وفي دول كثيرة أخرى. أما وجود الحلزون فلم يثبت أبدًا، لأن ستيفنسون توفي سنة 1932، وانتهت القضية بتسوية سنة 1934.", en: "The “neighbour principle” became the foundation of the law of negligence in Britain and in many other countries. The snail's existence was never proven, because Stevenson died in 1932 and the case ended in a settlement in 1934." }
  }
});
