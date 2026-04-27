const QUESTIONS = [
  // PART 1 | 成功の理由について（必須 4問）
  {
    id: 'q01', section: 'PART 1', sectionName: '成功の理由について', type: 'required',
    question: 'ゆかさんが今の場所に辿り着けた、一番の理由はなんだと思いますか？',
    hint: '私の人生の哲学は「自分の表現で世界に関わる」というものです。「言葉のデザインで人と社会に影響を与える」という軸を一度もぶらさず、自分の言語化力を信じて、アプリを通じてそれを形にすることだけに集中した。その結果が、今につながっていると思います。'
  },
  {
    id: 'q02', section: 'PART 1', sectionName: '成功の理由について', type: 'required',
    question: 'ゆかさんは会社員経験を経て、ご自身のサービスを立ち上げられました。独立という選択は、怖くなかったですか？',
    hint: '怖かったですよ、もちろん。でも、会社員として誰かの枠の中で働いていても、自分が面白いと感じることと、社会への価値提供が一致する瞬間がなかなか来ないとある日気づいたんです。そんなとき、お金と時間とスキルと仲間がすべてそろっていて、最後のピースが自分の覚悟だと気づいたとき、腹をくくることができました。'
  },
  {
    id: 'q03', section: 'PART 1', sectionName: '成功の理由について', type: 'required',
    question: '収入の面でも、独立後にしっかりと安定させてきていますよね。どんな仕組みを作ったんですか？',
    hint: '一つの収入源に依存しないことを最初から意識しました。事業収益、投資、複数のサービス収入。どれか一つがゆらいでも生活が揺るがない構造を作ったんです。経済的な安定があることで、やりたいことに思い切り集中できるようになりました。'
  },
  {
    id: 'q04', section: 'PART 1', sectionName: '成功の理由について', type: 'required',
    question: 'サービスが国境を越えた瞬間があったと聞きました。あの時はどんな気持ちでしたか？',
    hint: 'あの瞬間は本当に鳥肌が立ちました。自分のデザイン力が、日本語じゃない文脈でも人の心を動かせたということが証明された瞬間でしたから。言語は違っても、本質的な問題解決は普遍的なんだと実感しました。私が目指していた「グローバル人材」ってこれのことだ、と思いました。'
  },

  // PART 2 | 今の気分・生き方について（必須 5問）
  {
    id: 'q05', section: 'PART 2', sectionName: '今の気分・生き方について', type: 'required',
    question: '毎日、どんな気分で過ごされていますか？',
    hint: '毎日、ちょっとですが何かにワクワクしていますね。自分が主体的に取り組んでいることに対して、パッションを持つタイプなんだと思います。パートナーとは本当にバディみたいな関係で、こんな私を応援してくれています。また、子どもたちの成長を一緒に見守りながら、ときに意見を交わし合いながら支え合っています。そんな毎日が、とても楽しいですね。'
  },
  {
    id: 'q06', section: 'PART 2', sectionName: '今の気分・生き方について', type: 'required',
    question: '歌と茶道をなさっているそうですね。仕事が忙しい中で、続けられる理由はなんですか？',
    hint: '歌と茶道は、長年続けていることの一つです。ライブは年に数回やっていて、舞台に立つたびに自分が「表現する人間」だということを思い出せるんです。茶道も茶会という場を通じておもてなしの心を表現するものです。どちらも私の根っこを作ってくれています。'
  },
  {
    id: 'q07', section: 'PART 2', sectionName: '今の気分・生き方について', type: 'required',
    question: '体型がとても美しいですよね。何か特別なトレーニングをされているんですか？',
    hint: '激しいことは何もしていません。インナーマッスルを鍛えるトレーニングに、軽い有酸素を組み合わせるだけ。でも継続していたら、自分でも驚くくらい体が変わりました。食事も極端に制限するんじゃなくて、好きなものをバランスよく食べる。それで十分でした。'
  },
  {
    id: 'q08', section: 'PART 2', sectionName: '今の気分・生き方について', type: 'required',
    question: '人間関係も広く深く、ということで有名ですが、どんな意識でつながりを保っていますか？',
    hint: '大切にしたいと思う絆やつながりは、なるべく自分から保ち続けられるよう努力したいと思っています。白百合の同級生、UBCの仲間、NYの友人。距離があっても、自分からなるべくコネクトするように心がけています。'
  },
  {
    id: 'q09', section: 'PART 2', sectionName: '今の気分・生き方について', type: 'required',
    question: '常に知識をアップデートし続けていますよね。どうやってキャッチアップしているんですか？',
    hint: 'CBSやテックゼロ、マネトレ大学のコミュニティとのつながりが一番の情報源でした。どの分野でも最先端のことに触れている方がいらっしゃいますから、そうした方からすぐに教えていただけるような環境や仕組みづくりを維持しています。'
  },

  // PART 3 | 過去の自分へ（必須 1問）
  {
    id: 'q10', section: 'PART 3', sectionName: '過去の自分へ', type: 'required',
    question: '最後に——まだ迷っていた頃の自分に、今の自分から何か伝えるとしたら？',
    hint: '「あなたの感じていることは正しい」って言いたいです。こんな風に生きてみたいという感情、面白いと思う感覚、これは価値になると思う直感、それは間違っていない。ただ、それを諦めずに形にし続けること。デザインは世界を変えられる。それを信じ続けてほしいです。'
  },

  // MORNING | 朝のこと（ランダム 2問）
  {
    id: 'q11', section: 'MORNING', sectionName: '朝のこと', type: 'random',
    question: 'ゆかさんは朝型と聞いています。何時に起きて、まず何をするんですか？',
    hint: '朝6時に起きています。子どもたちより少し早くて、その時間が一番好きです。まず白湯を飲みながら、静かなリビングでその日のことを頭の中で整理します。何かを書くわけじゃないんですが、この時間があるかないかで一日の質がぜんぜん違うんですよね。'
  },
  {
    id: 'q12', section: 'MORNING', sectionName: '朝のこと', type: 'random',
    question: '子どもたちが起きてからは、雰囲気ががらっと変わりそうですね（笑）。',
    hint: 'もう怒涛です（笑）。パートナーと役割分担しながら、起こして、ごはん食べさせて、準備させて送り出す。うちは「完璧な朝食」より「楽しい朝食」を優先していて、納豆ご飯でも卵かけご飯でも、みんなで食べられればそれでいい、というスタンスです。'
  },

  // WORK | 仕事のこと（必須 2問）
  {
    id: 'q13', section: 'WORK', sectionName: '仕事のこと', type: 'required',
    question: '子どもを送り出した後、仕事はどう始めるんですか？午前中の使い方を教えてください。',
    hint: '9時くらいから始めます。午前中は一番頭が動く時間なので、言語化が必要な作業——コピーを書く、コンセプトを設計する、提案をまとめる——をここに集中させています。会議はなるべく午後にして、午前中は「一人で考える時間」として守るようにしています。'
  },
  {
    id: 'q14', section: 'WORK', sectionName: '仕事のこと', type: 'required',
    question: '午後になると、仕事のモードが切り替わる感じがありますか？',
    hint: '対話の時間にしています。クライアントとのミーティング、コミュニティの仲間とのブレスト、たまにNYの友人とビデオ通話することもあります。人と話すことで自分の考えが整理されていく感覚があって、インプットとアウトプットが同時に起きている感じです。'
  },

  // MIDDAY | 昼と身体のこと（必須 1問）
  {
    id: 'q15', section: 'MIDDAY', sectionName: '昼と身体のこと', type: 'required',
    question: '独立されてから、食事や身体のケアは意識的に変わりましたか？',
    hint: 'ランチは手を抜かないようにしています。自分で作ることもあるし、近所のお気に入りのお店に行くこともある。食事の質は生活の質だと思っているので、食費を極端に節約するのはしないようにしています。食後は20〜30分、ウォーキングかインナーマッスル系のエクササイズをします。激しいことは何もしていないんですが、続けていると体が変わってきます。'
  },

  // EVENING | 夕方と家族のこと（ランダム 2問）
  {
    id: 'q16', section: 'EVENING', sectionName: '夕方と家族のこと', type: 'random',
    question: '仕事と家族の時間、どうやって切り替えているんですか？',
    hint: '子どもが帰ってくる時間には、できるだけ仕事をいったん止めます。宿題を見たり、今日どうだったか聞いたり。この時間はあまり効率を考えずに、ただそこにいるようにしています。パートナーとも夕方に「今日どうだった？」と話す時間を大事にしていて、お互いのことをわかっているから、仕事の相談も普通にできるんですよね。'
  },
  {
    id: 'q17', section: 'EVENING', sectionName: '夕方と家族のこと', type: 'random',
    question: '夕食も、家族みんなで囲むんですか？',
    hint: 'できるだけ家族全員で食べます。手が込んでいなくてもいい。「今日一番面白かったこと」を一人ずつ話す、という小さな習慣があって、子どもたちも楽しみにしてくれています。この時間があるから、仕事も頑張れる気がしています。'
  },

  // NIGHT | 夜と自分のこと（ランダム 2問）
  {
    id: 'q18', section: 'NIGHT', sectionName: '夜と自分のこと', type: 'random',
    question: '子どもたちが寝た後、ゆかさん自身の時間はどう使っていますか？',
    hint: '自分だけの時間です。発声練習をしたり、ライブに向けて曲を練習したり。お茶会の前の週なら、お点前の所作を確認したりもします。仕事とも家族とも違う「ただ自分が好きなことをしている自分」に戻れる感覚があって、これが私を保ってくれている気がします。'
  },
  {
    id: 'q19', section: 'NIGHT', sectionName: '夜と自分のこと', type: 'random',
    question: '最後に——寝る前に、何か自分なりのルールはありますか？',
    hint: 'スマホは見ないようにして、その日やったことを軽く振り返って眠ります。「今日も面白かった」と思えれば、それで十分。そういう日を積み重ねていたら、気づいたら今ここにいた、という感じです。'
  }
];

const RANDOM_SECTIONS = ['MORNING', 'EVENING', 'NIGHT'];

function selectSessionQuestions() {
  const lastRandom = JSON.parse(localStorage.getItem('affirmation_last_random') || '{}');
  const selected = [];
  const usedRandomIds = {};

  QUESTIONS.filter(q => q.type === 'required').forEach(q => selected.push(q));

  RANDOM_SECTIONS.forEach(section => {
    const pool = QUESTIONS.filter(q => q.section === section);
    const lastId = lastRandom[section];
    const candidates = pool.length > 1 ? pool.filter(q => q.id !== lastId) : pool;
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    usedRandomIds[section] = pick.id;
    selected.push(pick);
  });

  localStorage.setItem('affirmation_last_random', JSON.stringify(usedRandomIds));

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
