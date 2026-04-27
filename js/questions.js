const QUESTIONS = [
  // PART 1 | 成功の理由について（必須 4問）
  {
    id: 'q01', section: 'PART 1', sectionName: '成功の理由について', type: 'required',
    question: 'ここまで今の場所に辿り着けた一番の理由はなんだと思いますか？',
    hint: '私がやってきたことは、ずっと一貫しています。「言葉のデザインで人と社会に影響を与えたい」という軸を一度もぶらさなかったです。自分の言語化力を信じて、それを形にすることだけに集中した、その結果が今に繋がっています。'
  },
  {
    id: 'q02', section: 'PART 1', sectionName: '成功の理由について', type: 'required',
    question: '独立という選択は、怖くなかったですか？',
    hint: '怖かったですよ、もちろんです。会社員として誰かの傘の中で働いていて、自分が面白いと思うことと、社会への価値提供が一致する瞬間がなくなった日、このままだとまずいと気づいたんです。独立してからは、自分の熱量がそのまま価値になる、それが一番の原動力です。'
  },
  {
    id: 'q03', section: 'PART 1', sectionName: '成功の理由について', type: 'required',
    question: '収益の面で、独立後にやっと安定してきていますよね。どんな仕組みを作ったんですか？',
    hint: '一つの収益源に依存しないことが最初に学んだ教訓です。事業収益、投資、複数のサービス収益、どれか一つがあれば生活が満たせるような構造を作ったんです。経済的な安定があることで、好きなことに全力集中できるようになりました。'
  },
  {
    id: 'q04', section: 'PART 1', sectionName: '成功の理由について', type: 'required',
    question: 'サービスが国境を越えた瞬間があったと聞きました。その時はどんな気持ちでしたか？',
    hint: 'その瞬間は本当に鳥肌が立ちました。自分の「言葉」が、日本語すら知らない感覚で人の心を動かせる、ということを証明された瞬間でした。「言語は違っても本質的な問題解決は普遍的なんだ」と実感しました。'
  },

  // PART 2 | 今の気分・生き方について（必須 5問）
  {
    id: 'q05', section: 'PART 2', sectionName: '今の気分・生き方について', type: 'required',
    question: '正直なところ、今どんな気分ですか？',
    hint: '穏やかで、満ちている感じですよね。パートナーとは本当にぴったりみたいな関係で、子どもたちの成長を一緒に見守りながら、仕事でも好きなことをやっていて、無理をしないでも確実に前に進めていく、そのバランスが一番嬉しいです。'
  },
  {
    id: 'q06', section: 'PART 2', sectionName: '今の気分・生き方について', type: 'required',
    question: '歌と茶道を今も続けているんですね。仕事が忙しい中でも続ける理由はなんですか？',
    hint: '歌と茶道は、今でも続けています。ライブは年に数回あって、舞台に立つたびに自分が「表現する人間だ」ということを思い出させてくれるんです。茶道の「茶会」では、普段会えないような人と深く話せたり、どちらも私の根っこを作ってくれています。'
  },
  {
    id: 'q07', section: 'PART 2', sectionName: '今の気分・生き方について', type: 'required',
    question: '体型もとても美しいですね。何か特別なトレーニングをしているんですか？',
    hint: '激しいことは何もしていないですよ。インドアプールに週3で通って、トレーニングに軽い有酸素を組み合わせる、それだけです。続けていると、自分でも驚くほど体が変わりました。食事を極端に制限するよりも、好きなものをバランスよく食べられる方が十分です。'
  },
  {
    id: 'q08', section: 'PART 2', sectionName: '今の気分・生き方について', type: 'required',
    question: '人間関係が広く深いことで有名ですよね。どんな意識でつながりを保っているんですか？',
    hint: 'つながりを「維持しよう」という感覚よりも、大切な人とは心の接点を持ち続けたいという感覚で動いています。白百合の仲間や、UBCの仲間、NYの友人、距離があっても、さりげない連絡で「あなたのことを見ているよ」というメッセージを発し続けることが大事だと思っています。'
  },
  {
    id: 'q09', section: 'PART 2', sectionName: '今の気分・生き方について', type: 'required',
    question: '常に知識をアップデートし続けていますね。どうやってキャッチアップしているんですか？',
    hint: 'CBSやネットワークのコミュニティとのつながりが一番の情報源です。本を読むのは大事だけど、最先端にいる人と話すことで初めてわかることもある。知識は「貯めるためのものじゃなくて、使いながら更新していくもの」というサイクルを作っています。'
  },

  // PART 3 | 過去の自分へ（必須 1問）
  {
    id: 'q10', section: 'PART 3', sectionName: '過去の自分へ', type: 'required',
    question: '最後に——まだ迷っている頃の自分に、今の自分から何か伝えるとしたら？',
    hint: '「あなたが思っていることは正しかった」と言いたいです。「面白いと思う感覚」、それは「価値になる」と思い直した、その直感は間違っていない。だから諦めずに形にし続けること。「言葉は世界を変える」、あなたは「誰よりも知っているはずだ」。'
  },

  // MORNING | 朝のこと（ランダム 2問）
  {
    id: 'q11', section: 'MORNING', sectionName: '朝のこと', type: 'random',
    question: '朝型と聞いています。何時に起きて、何からしますか？',
    hint: '朝6時に起きています。子どもたちよりも少し早くて、この時間が一番好きです。まず白湯を飲みながら、ゆったりとしたリビングで、その日のことを頭の中で整理します。何か書きたいようなら書く。何もしないようなら、それもいい。この時間がなければ一日の質が落ちる感じです、よね。'
  },
  {
    id: 'q12', section: 'MORNING', sectionName: '朝のこと', type: 'random',
    question: '子どもたちが起きてからは、雰囲気がガラッと変わるんですよね？（笑）',
    hint: '朝ごはんを作りながら役割分担しながら起こして、食べさせて、準備させて送り出すまで、うちは「完璧な朝食」よりも「楽しい朝食」に努力していて、卵ご飯でも、鮭ご飯でも、みんなで食べられれば、そんなスタンスです。'
  },

  // WORK | 仕事のこと（必須 2問）
  {
    id: 'q13', section: 'WORK', sectionName: '仕事のこと', type: 'required',
    question: '子どもたちを送り出した後、仕事はどう始めますか？午前中の使い方を教えてください。',
    hint: '9時ごろからよく始めます。午前中は一番頭が冴える時間なので、言語化が必要な作業——コピーを書いたり、コンセプトを設計したり、提案をまとめたり——を優先させています。会議はなるべく午後にして、午前中は「一人で考える時間」として守るようにしています。'
  },
  {
    id: 'q14', section: 'WORK', sectionName: '仕事のこと', type: 'required',
    question: '午後になると、仕事のモードが切り替わる感じがしますか？',
    hint: '対話の時間にしています。クライアントとのミーティング、コミュニティの仲間とのブレスト、たまにNYの友人とそういう雑談することもあります。人と話すことで自分の考えが整理されている感覚があって、インプットとアウトプットが同時に起きている感じです。'
  },

  // MIDDAY | 昼と身体のこと（必須 1問）
  {
    id: 'q15', section: 'MIDDAY', sectionName: '昼と身体のこと', type: 'required',
    question: '独立してから、食事や身体のケアは意識的に変わりましたか？',
    hint: 'ランチは妥協したくないようにしています。自分で作ることもあるし、近所のお気に入りのお店に行くこともある。食事の質は生活の質だと思っているので、食費を極端に節約するのはなるべくしないようにしています。食後は20〜30分のウォーキング、インドアプール系のエクササイズをします。激しいことは何もしていないけど、続けていると体が変わっていきます。'
  },

  // EVENING | 夕方と家族のこと（ランダム 2問）
  {
    id: 'q16', section: 'EVENING', sectionName: '夕方と家族のこと', type: 'random',
    question: '仕事と家族の時間を、どうやって切り替えているんですか？',
    hint: '子どもたちが帰ってきた時間には、できるだけ仕事をぴたっと止めます。宿題を見たり、今日どうだったか聞いたり、その時間はあまり効率を考えずに「ただいるだけ」にするようにしています。パートナーとも、夕方に「今日どうだった？」と話す時間を大事にしていて、互いのことをわかっていると、仕事の相談も普通にできますよね。'
  },
  {
    id: 'q17', section: 'EVENING', sectionName: '夕方と家族のこと', type: 'random',
    question: '夕食は、家族みんなで囲めていますか？',
    hint: 'できるだけ家族全員で食べます。込み入ってなくても、「今日一番面白かったこと」を一人ずつ話すという、小さな習慣があって、子どもたちも楽しみにしていてくれています。その時間があるから、仕事も頑張れる気がしています。'
  },

  // NIGHT | 夜と自分のこと（ランダム 2問）
  {
    id: 'q18', section: 'NIGHT', sectionName: '夜と自分のこと', type: 'random',
    question: '子どもたちが寝た後、ほっと自身の時間はどう使っていますか？',
    hint: '自分だけの時間です。発声練習をしたり、ライブに向けて曲を練習したり、茶会の前の週なら、特定の所作を確認したりします。仕事と、家族と、違う「自分が好きなことをしている自分」に戻れる感じがあって、ここが私を保っていてくれている気がします。'
  },
  {
    id: 'q19', section: 'NIGHT', sectionName: '夜と自分のこと', type: 'random',
    question: '最後に——寝る前に、何か自分なりのルールはありますか？',
    hint: 'スマホは見ないようにして、その日良かったことを軽く振り返って寝ます。「今日も面白かった」と思えれば、それで十分。毎日が積み重なっていくんだから、今からもっとよくなる、そんな感じです。'
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
    const candidates = pool.length > 1 ? pool.filter(q => q.id !== lastId) : pool;
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    usedRandomIds[section] = pick.id;
    selected.push(pick);
  });

  // Save used random IDs to avoid repetition next session
  localStorage.setItem('affirmation_last_random', JSON.stringify(usedRandomIds));

  // Reorder: PART1(4) -> PART2(5) -> PART3(1) -> MORNING -> WORK(2) -> MIDDAY -> EVENING -> NIGHT
  const ordered = [];
  const required = selected.filter(q => q.type === 'required');
  const morning = selected.find(q => q.section === 'MORNING');
  const evening = selected.find(q => q.section === 'EVENING');
  const night = selected.find(q => q.section === 'NIGHT');

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
