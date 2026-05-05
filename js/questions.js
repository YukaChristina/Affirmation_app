const QUESTIONS = [
  // PART 1 | 成功の理由について（4問）
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

  // PART 2 | 今の気分・生き方について（6問）
  {
    id: 'q05', section: 'PART 2', sectionName: '今の気分・生き方について', type: 'required',
    question: '毎日、どんな気分で過ごされていますか？',
    hint: '毎日、ちょっとですが何かにワクワクしていますね。自分が主体的に取り組んでいることに対して、パッションを持つタイプなんだと思います。'
  },
  {
    id: 'q06', section: 'PART 2', sectionName: '今の気分・生き方について', type: 'required',
    question: 'ご家族について教えてください。',
    hint: 'パートナーとは本当にバディみたいな関係で、こんな私を面白がってくれて、応援してくれています。また、子どもたちの成長を一緒に見守りながら、ときに意見を交わし合いながら支え合っています。そんな毎日が、とても楽しいですね。'
  },
  {
    id: 'q07', section: 'PART 2', sectionName: '今の気分・生き方について', type: 'required',
    question: '歌と茶道をなさっているそうですね。仕事が忙しい中で、続けられる理由はなんですか？',
    hint: '歌と茶道は、長年続けていることの一つです。ライブは年に数回やっていて、舞台に立つたびに自分が「表現する人間」だということを思い出せるんです。茶道も茶会という場を通じておもてなしの心を表現するものです。どちらも私の根っこを作ってくれています。'
  },
  {
    id: 'q08', section: 'PART 2', sectionName: '今の気分・生き方について', type: 'required',
    question: '体型がとても美しいですよね。何か特別なトレーニングをされているんですか？',
    hint: '激しいことは何もしていません。インナーマッスルを鍛えるトレーニングに、軽い有酸素を組み合わせるだけ。でも継続していたら、自分でも驚くくらい体が変わりました。食事も極端に制限するんじゃなくて、好きなものをバランスよく食べる。それで十分でした。'
  },
  {
    id: 'q09', section: 'PART 2', sectionName: '今の気分・生き方について', type: 'required',
    question: '人間関係も広く深く、ということで有名ですが、どんな意識でつながりを保っていますか？',
    hint: '大切にしたいと思う絆やつながりは、なるべく自分から保ち続けられるよう努力したいと思っています。白百合の同級生、UBCの仲間、NYの友人。距離があっても、自分からなるべくコネクトするように心がけています。'
  },
  {
    id: 'q10', section: 'PART 2', sectionName: '今の気分・生き方について', type: 'required',
    question: '常に知識をアップデートし続けていますよね。どうやってキャッチアップしているんですか？',
    hint: 'CBSやテックゼロ、マネトレ大学のコミュニティとのつながりが一番の情報源でした。どの分野でも最先端のことに触れている方がいらっしゃいますから、そうした方からすぐに教えていただけるような環境や仕組みづくりを維持しています。'
  },

  // PART 3 | 過去の自分へ（1問）
  {
    id: 'q11', section: 'PART 3', sectionName: '過去の自分へ', type: 'required',
    question: '最後に——まだ迷っていた頃の自分に、今の自分から何か伝えるとしたら？',
    hint: '「あなたの感じていることは正しい」って言いたいです。こんな風に生きてみたいという感情、面白いと思う感覚、これは価値になると思う直感、それは間違っていない。ただ、それを諦めずに形にし続けること。デザインは世界を変えられる。それを信じ続けてほしいです。'
  }
];

function getQuestions() {
  try {
    const saved = localStorage.getItem('affirmation_custom_questions');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {}
  return QUESTIONS;
}

// カスタム質問にもデフォルト質問にも対応してIDで検索
function getQuestionById(id) {
  return getQuestions().find(q => q.id === id) || QUESTIONS.find(q => q.id === id);
}

function saveCustomQuestions(qs) {
  localStorage.setItem('affirmation_custom_questions', JSON.stringify(qs));
}

function resetCustomQuestions() {
  localStorage.removeItem('affirmation_custom_questions');
}

function selectSessionQuestions() {
  return getQuestions();
}
