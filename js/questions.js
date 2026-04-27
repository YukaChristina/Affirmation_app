const QUESTIONS = [
  // PART 1 | 成功の理由（必須 4問）
  {
    id: 'q01', section: 'PART 1', sectionName: '成功の理由', type: 'required',
    question: 'なぜ今のあなたは成功できたと思いますか？',
    hint: '「私が成功できた一番の理由は、毎朝自分の目標を声に出して確認し続けたことです。諦めずに行動し続けたことで、少しずつ理想の自分に近づけました。」'
  },
  {
    id: 'q02', section: 'PART 1', sectionName: '成功の理由', type: 'required',
    question: '独立を決意した理由・きっかけを教えてください。',
    hint: '「子どもたちに誇れる生き方をしたいと思ったとき、会社員では自分の可能性に限界を感じていました。あの日の決断が、今の私のすべての土台になっています。」'
  },
  {
    id: 'q03', section: 'PART 1', sectionName: '成功の理由', type: 'required',
    question: 'あなたのビジネスの収益構造はどのようになっていますか？',
    hint: '「コンサルティング、オンラインコース、コーチング、そしてコミュニティ運営の4つの柱があります。それぞれが補完し合い、安定した複数収入を生み出しています。」'
  },
  {
    id: 'q04', section: 'PART 1', sectionName: '成功の理由', type: 'required',
    question: 'グローバル展開はどのように実現しましたか？',
    hint: '「最初は英語への苦手意識がありましたが、発信を続けることで海外クライアントと繋がれました。言語の壁より、本質的な価値を届ける姿勢のほうが大切だと学びました。」'
  },

  // PART 2 | 今の気分・生き方（必須 5問）
  {
    id: 'q05', section: 'PART 2', sectionName: '今の気分・生き方', type: 'required',
    question: '今、どんな気持ちで毎日を過ごしていますか？',
    hint: '「毎朝目が覚めるたびに、今日も最高の一日が始まると感じています。自分の仕事と家族と健康、すべてがバランスよく整っていて、本当に充実しています。」'
  },
  {
    id: 'q06', section: 'PART 2', sectionName: '今の気分・生き方', type: 'required',
    question: '趣味はどんなことですか？どのように楽しんでいますか？',
    hint: '「ヨガと読書が私の大切な趣味です。ヨガで身体と心を整え、読書で新しい視点を取り入れる。どちらも自分を深めてくれる時間です。」'
  },
  {
    id: 'q07', section: 'PART 2', sectionName: '今の気分・生き方', type: 'required',
    question: '健康管理はどのように取り組んでいますか？',
    hint: '「睡眠を7時間確保すること、加工食品を減らすこと、毎日30分は身体を動かすこと。この3つを習慣にしてから、エネルギーが全然違います。」'
  },
  {
    id: 'q08', section: 'PART 2', sectionName: '今の気分・生き方', type: 'required',
    question: '人間関係において大切にしていることは何ですか？',
    hint: '「相手の話をしっかり聞くこと、自分の気持ちも正直に伝えること。無理して合わせず、お互いを尊重できる関係だけを大切にするようにしています。」'
  },
  {
    id: 'q09', section: 'PART 2', sectionName: '今の気分・生き方', type: 'required',
    question: '最近どんなことを学んでいますか？',
    hint: '「マーケティングの最新トレンドと、瞑想の実践を深く学んでいます。ビジネスと内面の両方を成長させることが、今の私のテーマです。」'
  },

  // PART 3 | 過去の自分へ（必須 1問）
  {
    id: 'q10', section: 'PART 3', sectionName: '過去の自分へ', type: 'required',
    question: '迷っていた頃の自分に、今だからこそ伝えたいメッセージは？',
    hint: '「大丈夫。あなたが感じている不安は、成長の証拠。怖くても一歩踏み出した先に、想像以上の素晴らしい世界が広がっているから、諦めないで。」'
  },

  // MORNING | 朝のこと（ランダム 2問）
  {
    id: 'q11', section: 'MORNING', sectionName: '朝のこと', type: 'random',
    question: '朝の起床ルーティンを教えてください。',
    hint: '「5時半に起きて、まず白湯を飲みます。それから10分の瞑想、日記を書いてアファメーション。この1時間が、一日の質を決める大切な時間です。」'
  },
  {
    id: 'q12', section: 'MORNING', sectionName: '朝のこと', type: 'random',
    question: '子どもたちとの朝の時間はどのように過ごしていますか？',
    hint: '「子どもたちの笑顔で朝が始まります。朝食を一緒に食べながら、今日どんな一日にしたいか話し合うのが好き。この時間が私の活力の源です。」'
  },

  // WORK | 仕事のこと（必須 2問）
  {
    id: 'q13', section: 'WORK', sectionName: '仕事のこと', type: 'required',
    question: '午前中はどのようなお仕事をされていますか？',
    hint: '「午前中は頭が冴えているので、コンテンツ制作やコーチングセッションに集中します。クリエイティブな仕事は午前に限定しています。」'
  },
  {
    id: 'q14', section: 'WORK', sectionName: '仕事のこと', type: 'required',
    question: '午後はどのようなお仕事をされていますか？',
    hint: '「午後はミーティングや事務作業、SNS発信の時間にしています。チームとの連携や、クライアントフォローも午後にまとめて行います。」'
  },

  // MIDDAY | 昼と身体（必須 1問）
  {
    id: 'q15', section: 'MIDDAY', sectionName: '昼と身体', type: 'required',
    question: 'ランチや昼間の運動はどのように取り組んでいますか？',
    hint: '「ランチは栄養バランスを考えた手作りか、信頼できるお気に入りのお店で。食後は15分歩いて、午後の仕事に向けてリフレッシュしています。」'
  },

  // EVENING | 夕方と家族（ランダム 2問）
  {
    id: 'q16', section: 'EVENING', sectionName: '夕方と家族', type: 'random',
    question: '夕方、仕事モードからプライベートへの切り替えはどのようにしていますか？',
    hint: '「18時になったら必ずパソコンを閉じます。それがスイッチ。着替えてアロマを焚くと、自然と仕事脳がオフになります。この儀式が大切です。」'
  },
  {
    id: 'q17', section: 'EVENING', sectionName: '夕方と家族', type: 'random',
    question: '夕食はどのように過ごしていますか？',
    hint: '「夕食は家族全員が揃う大切な時間。今日あった良かったことを一人ずつ話す習慣があります。食卓が笑顔で満ちていると、明日への力が湧いてきます。」'
  },

  // NIGHT | 夜と自分（ランダム 2問）
  {
    id: 'q18', section: 'NIGHT', sectionName: '夜と自分', type: 'random',
    question: '夜の趣味の時間はどのように過ごしていますか？',
    hint: '「夜は読書か手帳タイム。今日の振り返りと明日のプランを書いて、自分と向き合う時間にしています。この時間が翌日のパフォーマンスを決めます。」'
  },
  {
    id: 'q19', section: 'NIGHT', sectionName: '夜と自分', type: 'random',
    question: '就寝前に必ずすること、大切にしているルールはありますか？',
    hint: '「21時以降はスマホを見ません。ストレッチしながら今日の感謝を3つ思い浮かべ、明日の自分への期待を胸に眠りにつきます。翌朝の目覚めが全然違います。」'
  }
];

const RANDOM_SECTIONS = ['MORNING', 'EVENING', 'NIGHT'];

function selectSessionQuestions() {
  const lastRandom = JSON.parse(localStorage.getItem('affirmation_last_random') || '{}');
  const selected = [];
  const usedRandomIds = {};

  // Required questions in order
  QUESTIONS.filter(q => q.type === 'required').forEach(q => selected.push(q));

  // Random: 1 per section, avoid repeating last session's pick
  RANDOM_SECTIONS.forEach(section => {
    const pool = QUESTIONS.filter(q => q.section === section);
    const lastId = lastRandom[section];
    const avoid = pool.find(q => q.id === lastId);
    const candidates = pool.length > 1 ? pool.filter(q => q.id !== lastId) : pool;
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    usedRandomIds[section] = pick.id;

    // Insert at logical position
    selected.push(pick);
  });

  // Save used random IDs to avoid repetition next session
  localStorage.setItem('affirmation_last_random', JSON.stringify(usedRandomIds));

  // Reorder: required in sequence, then interleave MORNING after q10, WORK/MIDDAY in middle, EVENING/NIGHT at end
  const ordered = [];
  const required = selected.filter(q => q.type === 'required');
  const morning = selected.find(q => q.section === 'MORNING');
  const evening = selected.find(q => q.section === 'EVENING');
  const night = selected.find(q => q.section === 'NIGHT');

  // Order: PART1(4) -> PART2(5) -> PART3(1) -> MORNING -> WORK(2) -> MIDDAY -> EVENING -> NIGHT
  required.filter(q => q.section === 'PART 1').forEach(q => ordered.push(q));
  required.filter(q => q.section === 'PART 2').forEach(q => ordered.push(q));
  required.filter(q => q.section === 'PART 3').forEach(q => ordered.push(q));
  if (morning) ordered.push(morning);
  required.filter(q => q.section === 'WORK').forEach(q => ordered.push(q));
  required.filter(q => q.section === 'MIDDAY').forEach(q => ordered.push(q));
  if (evening) ordered.push(evening);
  if (night) ordered.push(night);

  return ordered;
}
