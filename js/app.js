// ── State ────────────────────────────────────────────────────────────────────
const state = {
  currentScreen: 'home',
  sessionId: null,
  sessionStartTime: null,
  sessionQuestions: [],
  currentIndex: 0,
  recordings: {},       // questionId -> Blob
  mediaRecorder: null,
  audioChunks: [],
  isRecording: false,
  recordingTimer: null,
  recordingSeconds: 0,
  playbackAudio: null,
  playbackIndex: 0,
  playbackSpeed: 1.0,
  playbackSessionId: null,
  playbackSourceSessionId: null, // 録音元セッションID
  playbackStartDate: null,
  playbackStartTime: null,
  playbackQuestions: [],
};

// ── Screen Navigation ─────────────────────────────────────────────────────────
function navigateTo(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(`screen-${screenId}`).classList.add('active');
  state.currentScreen = screenId;
}

// ── Home Screen ───────────────────────────────────────────────────────────────
async function initHome() {
  await syncSessionsFromCloud();
  const sessions = getSessions();
  const lastEl = document.getElementById('last-session-info');
  if (sessions.length > 0) {
    const last = sessions[sessions.length - 1];
    const dateStr = new Date(last.date + 'T' + last.startTime).toLocaleDateString('ja-JP', {
      month: 'long', day: 'numeric', weekday: 'short'
    });
    const modeLabel = last.mode === 'recording' ? '録音モード' : '再生モード';
    lastEl.textContent = `前回：${dateStr} ${last.startTime}（${modeLabel}）`;
  } else {
    lastEl.textContent = 'まだ記録がありません。最初のセッションを始めましょう！';
  }

  // Check if there are recordings available for playback
  const playBtn = document.getElementById('btn-play-mode');
  if (sessions.length === 0 || !sessions.some(s => s.mode === 'recording' && s.isCompleted)) {
    playBtn.classList.add('disabled-hint');
    playBtn.title = '録音データがありません';
  } else {
    playBtn.classList.remove('disabled-hint');
  }
}

// ── Recording Mode ────────────────────────────────────────────────────────────
async function startRecordingMode() {
  state.sessionId = Date.now().toString();
  state.sessionStartTime = new Date();
  state.sessionQuestions = selectSessionQuestions();
  state.currentIndex = 0;
  state.recordings = {};

  // Clear old IndexedDB recordings
  await clearOldRecordings(state.sessionId);

  // Save current session to LocalStorage
  saveCurrentSession({
    sessionId: state.sessionId,
    date: formatDate(state.sessionStartTime),
    startTime: formatTime(state.sessionStartTime),
    mode: 'recording',
    completedQuestions: [],
    isCompleted: false,
  });

  navigateTo('record');
  renderQuestion();
}

function renderQuestion() {
  const q = state.sessionQuestions[state.currentIndex];
  const total = state.sessionQuestions.length;
  const idx = state.currentIndex;

  // Progress
  document.getElementById('progress-text').textContent = `${idx + 1} / ${total}`;
  document.getElementById('progress-fill').style.width = `${((idx + 1) / total) * 100}%`;

  // Section badge
  document.getElementById('section-badge').textContent = q.sectionName;
  document.getElementById('type-badge').textContent = q.type === 'required' ? '必須' : 'ランダム';
  document.getElementById('type-badge').className = `badge badge-${q.type}`;

  // Question
  document.getElementById('question-text').textContent = q.question;
  document.getElementById('hint-text').textContent = q.hint;

  // Stop any ongoing speech
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  const speakBtn = document.getElementById('btn-speak');
  if (speakBtn) speakBtn.classList.remove('speaking');

  // Reset recording UI
  resetRecordingUI();

  // Show/hide bottom nav buttons
  document.getElementById('btn-prev').style.visibility = idx > 0 ? 'visible' : 'hidden';
  document.getElementById('btn-next').textContent = idx === total - 1 ? '完了' : '次へ →';
  document.getElementById('btn-next').disabled = !state.recordings[q.id];

  // Browse nav in question panel
  document.getElementById('browse-count').textContent = `${idx + 1} / ${total}`;
  document.getElementById('btn-browse-prev').disabled = idx === 0;
  document.getElementById('btn-browse-next').disabled = idx === total - 1;

  // If there's already a recording for this question
  if (state.recordings[q.id]) {
    showRecordedState(q.id);
  }
}

function resetRecordingUI() {
  document.getElementById('record-btn').className = 'record-btn';
  document.getElementById('record-btn').innerHTML = `
    <div class="record-icon"></div>
    <span>タップして録音</span>
  `;
  document.getElementById('waveform').style.display = 'none';
  document.getElementById('playback-controls').style.display = 'none';
  document.getElementById('record-timer').textContent = '';
  stopRecordingTimer();
}

function showRecordedState(questionId) {
  document.getElementById('record-btn').className = 'record-btn recorded';
  document.getElementById('record-btn').innerHTML = `
    <div class="record-icon check">✓</div>
    <span>録音済み</span>
  `;
  document.getElementById('playback-controls').style.display = 'flex';
  document.getElementById('btn-next').disabled = false;
}

async function toggleRecording() {
  if (state.isRecording) {
    stopRecording();
  } else {
    await startRecording();
  }
}

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    state.audioChunks = [];

    const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
      ? 'audio/webm;codecs=opus'
      : MediaRecorder.isTypeSupported('audio/webm')
      ? 'audio/webm'
      : 'audio/ogg';

    state.mediaRecorder = new MediaRecorder(stream, { mimeType });
    state.mediaRecorder.ondataavailable = e => {
      if (e.data.size > 0) state.audioChunks.push(e.data);
    };
    state.mediaRecorder.onstop = async () => {
      stream.getTracks().forEach(t => t.stop());
      const blob = new Blob(state.audioChunks, { type: mimeType });
      const q = state.sessionQuestions[state.currentIndex];
      state.recordings[q.id] = blob;
      await saveRecording(q.id, state.sessionId, blob);
      uploadRecording(q.id, state.sessionId, blob).catch(console.error);
      showRecordedState(q.id);
    };

    state.mediaRecorder.start(100);
    state.isRecording = true;

    // UI
    document.getElementById('record-btn').className = 'record-btn recording';
    document.getElementById('record-btn').innerHTML = `
      <div class="record-icon pulse"></div>
      <span>録音中... タップで停止</span>
    `;
    document.getElementById('waveform').style.display = 'flex';
    document.getElementById('playback-controls').style.display = 'none';

    // Timer (5 min max)
    state.recordingSeconds = 0;
    state.recordingTimer = setInterval(() => {
      state.recordingSeconds++;
      const m = Math.floor(state.recordingSeconds / 60).toString().padStart(2, '0');
      const s = (state.recordingSeconds % 60).toString().padStart(2, '0');
      document.getElementById('record-timer').textContent = `${m}:${s}`;
      if (state.recordingSeconds >= 300) stopRecording();
    }, 1000);

  } catch (err) {
    alert('マイクへのアクセスが許可されていません。ブラウザの設定を確認してください。');
    console.error(err);
  }
}

function stopRecording() {
  if (state.mediaRecorder && state.isRecording) {
    state.mediaRecorder.stop();
    state.isRecording = false;
    stopRecordingTimer();
    document.getElementById('waveform').style.display = 'none';
    document.getElementById('record-btn').innerHTML = `
      <div class="record-icon"></div>
      <span>処理中...</span>
    `;
  }
}

function stopRecordingTimer() {
  if (state.recordingTimer) {
    clearInterval(state.recordingTimer);
    state.recordingTimer = null;
  }
}

function playCurrentRecording() {
  const q = state.sessionQuestions[state.currentIndex];
  const blob = state.recordings[q.id];
  if (!blob) return;
  if (state.playbackAudio) {
    state.playbackAudio.pause();
    state.playbackAudio = null;
  }
  const url = URL.createObjectURL(blob);
  state.playbackAudio = new Audio(url);
  state.playbackAudio.play();
  state.playbackAudio.onended = () => URL.revokeObjectURL(url);
}

function deleteCurrentRecording() {
  const q = state.sessionQuestions[state.currentIndex];
  if (state.playbackAudio) { state.playbackAudio.pause(); state.playbackAudio = null; }
  delete state.recordings[q.id];
  resetRecordingUI();
  document.getElementById('btn-next').disabled = true;
}

function browseQuestion(dir) {
  const newIndex = state.currentIndex + dir;
  if (newIndex >= 0 && newIndex < state.sessionQuestions.length) {
    state.currentIndex = newIndex;
    renderQuestion();
  }
}

function prevQuestion() {
  if (state.currentIndex > 0) {
    state.currentIndex--;
    renderQuestion();
  }
}

function nextQuestion() {
  const total = state.sessionQuestions.length;
  if (state.currentIndex < total - 1) {
    state.currentIndex++;
    renderQuestion();
  } else {
    completeSession();
  }
}

async function completeSession() {
  const endTime = new Date();
  const completedIds = Object.keys(state.recordings);

  const sessionData = {
    sessionId: state.sessionId,
    date: formatDate(state.sessionStartTime),
    startTime: formatTime(state.sessionStartTime),
    endTime: formatTime(endTime),
    mode: 'recording',
    completedQuestions: completedIds,
    isCompleted: completedIds.length === state.sessionQuestions.length,
    questionIds: state.sessionQuestions.map(q => q.id),
  };

  saveSession(sessionData);
  saveSessionToCloud(sessionData).catch(console.error);
  localStorage.removeItem('affirmation_current_session');

  // Show complete screen
  document.getElementById('complete-count').textContent =
    `${completedIds.length} / ${state.sessionQuestions.length} 問を録音しました`;
  document.getElementById('complete-date').textContent =
    new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
  navigateTo('complete');
}

// ── Playback Mode ─────────────────────────────────────────────────────────────
async function startPlaybackMode() {
  const sessions = getSessions().filter(s => s.mode === 'recording' && s.isCompleted);
  if (sessions.length === 0) {
    alert('再生できる録音データがありません。まず録音モードで録音してください。');
    return;
  }

  const last = sessions[sessions.length - 1];
  const now = new Date();

  // 再生セッションは録音セッションとは別IDで作成
  state.playbackSessionId = 'pb_' + Date.now().toString();
  state.playbackSourceSessionId = last.sessionId;
  state.playbackStartDate = formatDate(now);
  state.playbackStartTime = formatTime(now);
  state.playbackIndex = 0;
  state.playbackSpeed = 1.0;

  // 録音セッションのquestionIdsをもとに現在の質問リストと同期
  state.playbackQuestions = (last.questionIds || last.completedQuestions)
    .map(id => getQuestionById(id))
    .filter(Boolean);

  navigateTo('play');
  renderPlayback();
}

async function renderPlayback() {
  const q = state.playbackQuestions[state.playbackIndex];
  const total = state.playbackQuestions.length;

  document.getElementById('play-progress-text').textContent =
    `Q${state.playbackIndex + 1} / ${total}`;
  document.getElementById('play-progress-fill').style.width =
    `${((state.playbackIndex + 1) / total) * 100}%`;
  document.getElementById('play-section').textContent = q.sectionName;
  document.getElementById('play-question').textContent = q.question;

  // 録音元セッションの日付を表示
  const sessions = getSessions();
  const sourceSession = sessions.find(s => s.sessionId === state.playbackSourceSessionId);
  if (sourceSession) {
    document.getElementById('play-date').textContent =
      `録音日：${sourceSession.date} ${sourceSession.startTime}`;
  }

  document.getElementById('btn-play-prev').disabled = state.playbackIndex === 0;
  document.getElementById('btn-play-next').disabled = state.playbackIndex === total - 1;

  await playbackQuestion(q);
}

async function playbackQuestion(q) {
  if (state.playbackAudio) {
    state.playbackAudio.pause();
    state.playbackAudio.onended = null;
    state.playbackAudio = null;
  }

  let blob = await getRecording(q.id, state.playbackSourceSessionId);
  if (!blob) blob = await downloadRecording(q.id, state.playbackSourceSessionId);
  if (!blob) {
    // 録音がない質問はスキップして自動で次へ
    autoAdvancePlayback();
    return;
  }

  const url = URL.createObjectURL(blob);
  state.playbackAudio = new Audio(url);
  state.playbackAudio.playbackRate = state.playbackSpeed;

  document.getElementById('btn-play-pause').textContent = '⏸';

  state.playbackAudio.onended = () => {
    URL.revokeObjectURL(url);
    document.getElementById('btn-play-pause').textContent = '▶';
    autoAdvancePlayback();
  };
  state.playbackAudio.play();
}

function autoAdvancePlayback() {
  if (state.playbackIndex < state.playbackQuestions.length - 1) {
    state.playbackIndex++;
    renderPlayback();
  } else {
    completePlaybackSession();
  }
}

async function completePlaybackSession() {
  if (state.playbackAudio) {
    state.playbackAudio.pause();
    state.playbackAudio = null;
  }

  const endTime = new Date();
  const sessionData = {
    sessionId: state.playbackSessionId,
    date: state.playbackStartDate,
    startTime: state.playbackStartTime,
    endTime: formatTime(endTime),
    mode: 'playback',
    completedQuestions: state.playbackQuestions.map(q => q.id),
    questionIds: state.playbackQuestions.map(q => q.id),
    isCompleted: true,
  };

  saveSession(sessionData);
  saveSessionToCloud(sessionData).catch(console.error);

  // リセット（二重保存防止）
  state.playbackSessionId = null;
  state.playbackStartDate = null;

  navigateTo('home');
  initHome();
}

function togglePlayPause() {
  if (!state.playbackAudio) return;
  if (state.playbackAudio.paused) {
    state.playbackAudio.play();
    document.getElementById('btn-play-pause').textContent = '⏸';
  } else {
    state.playbackAudio.pause();
    document.getElementById('btn-play-pause').textContent = '▶';
  }
}

function playPrev() {
  if (state.playbackIndex > 0) {
    state.playbackIndex--;
    renderPlayback();
  }
}

function playNext() {
  if (state.playbackIndex < state.playbackQuestions.length - 1) {
    state.playbackIndex++;
    renderPlayback();
  }
}

function changeSpeed() {
  const speeds = [0.8, 1.0, 1.2];
  const idx = speeds.indexOf(state.playbackSpeed);
  state.playbackSpeed = speeds[(idx + 1) % speeds.length];
  document.getElementById('btn-speed').textContent = `${state.playbackSpeed}x`;
  if (state.playbackAudio) state.playbackAudio.playbackRate = state.playbackSpeed;
}

function stopPlayback() {
  if (state.playbackAudio) {
    state.playbackAudio.pause();
    state.playbackAudio.onended = null;
    state.playbackAudio = null;
  }

  // 未完了の場合のみ途中記録（completePlaybackSessionが呼ばれた後はIDがnull）
  if (state.playbackSessionId && state.playbackStartDate) {
    const now = new Date();
    const sessionData = {
      sessionId: state.playbackSessionId,
      date: state.playbackStartDate,
      startTime: state.playbackStartTime,
      endTime: formatTime(now),
      mode: 'playback',
      completedQuestions: state.playbackQuestions.slice(0, state.playbackIndex).map(q => q.id),
      questionIds: state.playbackQuestions.map(q => q.id),
      isCompleted: false,
    };
    saveSession(sessionData);
    saveSessionToCloud(sessionData).catch(console.error);
    state.playbackSessionId = null;
    state.playbackStartDate = null;
  }

  navigateTo('home');
  initHome();
}

// ── History Screen ────────────────────────────────────────────────────────────
function showHistory() {
  navigateTo('history');
  renderHistory();
}

function renderHistory() {
  const sessions = getSessions();
  renderCalendar(sessions);
  renderSessionList(sessions);
}

function renderCalendar(sessions) {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  document.getElementById('cal-title').textContent =
    `${year}年${month + 1}月`;

  const sessionDates = new Set(sessions.map(s => s.date));

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const todayStr = formatDate(now);

  const grid = document.getElementById('cal-grid');
  grid.innerHTML = '';

  // Day headers
  ['日', '月', '火', '水', '木', '金', '土'].forEach(d => {
    const el = document.createElement('div');
    el.className = 'cal-header';
    el.textContent = d;
    grid.appendChild(el);
  });

  // Empty cells
  for (let i = 0; i < firstDay; i++) {
    grid.appendChild(document.createElement('div'));
  }

  // Day cells
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const el = document.createElement('div');
    el.className = 'cal-day';
    if (dateStr === todayStr) el.classList.add('today');
    if (sessionDates.has(dateStr)) el.classList.add('has-session');
    el.textContent = d;
    grid.appendChild(el);
  }

  // Streak
  let streak = 0;
  const today = new Date();
  for (let i = 0; ; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    if (sessionDates.has(formatDate(d))) {
      streak++;
    } else if (i > 0) {
      break;
    }
  }
  document.getElementById('streak-count').textContent = `${streak}日連続`;
}

function renderSessionList(sessions) {
  const container = document.getElementById('session-list');
  container.innerHTML = '';

  if (sessions.length === 0) {
    container.innerHTML = '<p class="empty-msg">まだ記録がありません</p>';
    return;
  }

  [...sessions].reverse().forEach(session => {
    const card = document.createElement('div');
    card.className = 'session-card';
    const modeLabel = session.mode === 'recording' ? '🎙 録音' : '▶ 再生';
    const statusLabel = session.isCompleted ? '完了' : '途中';
    const statusClass = session.isCompleted ? 'status-complete' : 'status-partial';

    card.innerHTML = `
      <div class="session-card-header">
        <span class="session-date">${session.date} ${session.startTime}</span>
        <span class="session-mode">${modeLabel}</span>
        <span class="session-status ${statusClass}">${statusLabel}</span>
      </div>
      <div class="session-detail" id="detail-${session.sessionId}" style="display:none">
        <p class="detail-time">⏱ ${session.startTime} ～ ${session.endTime || '--'}</p>
        <p class="detail-count">回答した質問：${session.completedQuestions.length}問</p>
        <div class="detail-questions">
          ${session.completedQuestions.map(id => {
            const q = getQuestions().find(q => q.id === id);
            return q ? `<span class="detail-q">${q.sectionName}: ${q.question.slice(0, 20)}...</span>` : '';
          }).join('')}
        </div>
      </div>
    `;
    card.querySelector('.session-card-header').addEventListener('click', () => {
      const detail = document.getElementById(`detail-${session.sessionId}`);
      detail.style.display = detail.style.display === 'none' ? 'block' : 'none';
    });
    container.appendChild(card);
  });
}

// ── LocalStorage helpers ──────────────────────────────────────────────────────
function getSessions() {
  return JSON.parse(localStorage.getItem('affirmation_sessions') || '[]');
}

function saveSession(session) {
  const sessions = getSessions();
  const idx = sessions.findIndex(s => s.sessionId === session.sessionId);
  if (idx >= 0) sessions[idx] = session;
  else sessions.push(session);
  localStorage.setItem('affirmation_sessions', JSON.stringify(sessions));
}

function saveCurrentSession(session) {
  localStorage.setItem('affirmation_current_session', JSON.stringify(session));
}

// ── Utilities ─────────────────────────────────────────────────────────────────
function formatDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function formatTime(d) {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

// ── Text-to-Speech ────────────────────────────────────────────────────────────
// 女性の自然な声を優先度順に選択
function selectBestFemaleVoice(voices) {
  const ja = voices.filter(v => v.lang === 'ja-JP' || v.lang === 'ja');

  // 優先度1: Google の日本語音声（Chromeで最も自然）
  const google = ja.find(v => v.name === 'Google 日本語' || v.name === 'Google Japanese');
  if (google) return google;

  // 優先度2: Microsoft のニューラル女性音声（Edge/Windowsで最も自然）
  const msNatural = ja.find(v =>
    v.name.includes('Natural') &&
    (v.name.includes('Nanami') || v.name.includes('Aoi') ||
     v.name.includes('Mayu') || v.name.includes('Shiori'))
  );
  if (msNatural) return msNatural;

  // 優先度3: Microsoft オンライン女性音声
  const msOnline = ja.find(v =>
    v.name.includes('Online') &&
    !v.name.includes('Keita') && !v.name.includes('Ichiro')
  );
  if (msOnline) return msOnline;

  // 優先度4: Kyoko / Ren（macOS標準女性音声）
  const mac = ja.find(v => v.name.includes('Kyoko') || v.name.includes('O-Ren'));
  if (mac) return mac;

  // 優先度5: 名前で女性らしいもの（Nanami, Mizuki, Ayumi, Haruka）
  const namedFemale = ja.find(v =>
    ['nanami','mizuki','ayumi','haruka','aoi','mayu','shiori'].some(n =>
      v.name.toLowerCase().includes(n)
    )
  );
  if (namedFemale) return namedFemale;

  // 優先度6: 男性名を避けた日本語音声
  const notMale = ja.find(v =>
    !['keita','ichiro','otoya','male'].some(n => v.name.toLowerCase().includes(n))
  );
  if (notMale) return notMale;

  return ja[0] || null;
}

function speakQuestion() {
  if (!('speechSynthesis' in window)) {
    alert('このブラウザは音声読み上げに対応していません。');
    return;
  }

  const btn = document.getElementById('btn-speak');

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    btn.classList.remove('speaking');
    return;
  }

  const q = state.sessionQuestions[state.currentIndex];
  const utterance = new SpeechSynthesisUtterance(q.question);
  utterance.lang = 'ja-JP';
  utterance.rate = 0.88;   // ゆっくりめで聞き取りやすく
  utterance.pitch = 1.05;  // 自然なピッチ
  utterance.volume = 1.0;

  const applyVoice = () => {
    const voice = selectBestFemaleVoice(window.speechSynthesis.getVoices());
    if (voice) utterance.voice = voice;
    utterance.onstart = () => btn.classList.add('speaking');
    utterance.onend   = () => btn.classList.remove('speaking');
    utterance.onerror = () => btn.classList.remove('speaking');
    window.speechSynthesis.speak(utterance);
  };

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    applyVoice();
  } else {
    window.speechSynthesis.onvoiceschanged = applyVoice;
  }
}

// ── Cloud Sync & Auth ─────────────────────────────────────────────────────────
async function syncSessionsFromCloud() {
  try {
    const user = await getUser();
    if (!user) return;

    // ローカルセッションをクラウドへ一括アップロード（未登録分も含む）
    const localSessions = getSessions();
    await Promise.all(localSessions.map(s => saveSessionToCloud(s).catch(() => {})));

    // クラウドからプルしてマージ
    const cloudSessions = await getSessionsFromCloud();
    if (cloudSessions.length === 0) return;
    const map = new Map();
    [...localSessions, ...cloudSessions].forEach(s => map.set(s.sessionId, s));
    const merged = Array.from(map.values())
      .sort((a, b) => a.sessionId.localeCompare(b.sessionId));
    localStorage.setItem('affirmation_sessions', JSON.stringify(merged));
  } catch (e) {
    console.warn('Cloud sync skipped:', e);
  }
}

async function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('login-error');
  errorEl.textContent = '';
  try {
    await signIn(email, password);
    navigateTo('home');
    await initHome();
  } catch (err) {
    errorEl.textContent = 'ログインに失敗しました：' + (err.message || '');
  }
}

async function handleSignup() {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  const errorEl = document.getElementById('login-error');
  errorEl.textContent = '';
  if (password.length < 6) {
    errorEl.textContent = 'パスワードは6文字以上で入力してください。';
    return;
  }
  try {
    const user = await signUp(email, password);
    if (user) {
      navigateTo('home');
      await initHome();
    } else {
      errorEl.textContent = '登録メールを送信しました。メールを確認してください。';
    }
  } catch (err) {
    errorEl.textContent = '登録に失敗しました：' + (err.message || '');
  }
}

async function handleSignout() {
  await signOut();
  navigateTo('login');
}

// ── Question Manager ─────────────────────────────────────────────────────────
const SECTION_NAMES = {
  'PART 1': '成功の理由について',
  'PART 2': '今の気分・生き方について',
  'PART 3': '過去の自分へ',
};

let _editingIndex = null;

function showQuestionManager() {
  navigateTo('qmgr');
  renderQuestionManager();
}

function renderQuestionManager() {
  const questions = getQuestions();
  const container = document.getElementById('question-list-mgr');
  container.innerHTML = '';

  questions.forEach((q, idx) => {
    const item = document.createElement('div');
    item.className = 'qmgr-item';
    item.innerHTML = `
      <div class="qmgr-item-top">
        <span class="qmgr-num">${idx + 1}</span>
        <span class="badge badge-section">${q.section}</span>
      </div>
      <p class="qmgr-q-text">${q.question}</p>
      <div class="qmgr-actions">
        <button class="btn-qmgr-edit" onclick="openQuestionModal(${idx})">✏️ 編集</button>
        <button class="btn-qmgr-delete" onclick="confirmDeleteQuestion(${idx})">🗑 削除</button>
      </div>
    `;
    container.appendChild(item);
  });

  const isCustom = !!localStorage.getItem('affirmation_custom_questions');
  document.getElementById('qmgr-reset-btn').style.display = isCustom ? 'inline-block' : 'none';
}

function openQuestionModal(idx) {
  _editingIndex = idx;
  const isNew = idx === null;
  document.getElementById('modal-title').textContent = isNew ? '質問を追加' : '質問を編集';

  if (!isNew) {
    const q = getQuestions()[idx];
    document.getElementById('modal-section').value = q.section;
    document.getElementById('modal-question-text').value = q.question;
    document.getElementById('modal-hint-text').value = q.hint;
  } else {
    document.getElementById('modal-section').value = 'PART 2';
    document.getElementById('modal-question-text').value = '';
    document.getElementById('modal-hint-text').value = '';
  }

  document.getElementById('modal-question').style.display = 'flex';
  document.getElementById('modal-question-text').focus();
}

function closeQuestionModal() {
  document.getElementById('modal-question').style.display = 'none';
  _editingIndex = null;
}

function saveQuestion() {
  const section = document.getElementById('modal-section').value;
  const questionText = document.getElementById('modal-question-text').value.trim();
  const hintText = document.getElementById('modal-hint-text').value.trim();

  if (!questionText) {
    alert('質問文を入力してください。');
    return;
  }

  const questions = getQuestions().slice();

  if (_editingIndex === null) {
    questions.push({
      id: 'cq' + Date.now(),
      section,
      sectionName: SECTION_NAMES[section],
      type: 'required',
      question: questionText,
      hint: hintText,
    });
  } else {
    questions[_editingIndex] = {
      ...questions[_editingIndex],
      section,
      sectionName: SECTION_NAMES[section],
      question: questionText,
      hint: hintText,
    };
  }

  saveCustomQuestions(questions);
  closeQuestionModal();
  renderQuestionManager();
}

function confirmDeleteQuestion(idx) {
  const q = getQuestions()[idx];
  if (!confirm(`この質問を削除しますか？\n\n「${q.question}」`)) return;
  const questions = getQuestions().slice();
  questions.splice(idx, 1);
  saveCustomQuestions(questions);
  renderQuestionManager();
}

function resetToDefaultQuestions() {
  if (!confirm('すべての変更を破棄して、デフォルトの質問に戻しますか？')) return;
  resetCustomQuestions();
  renderQuestionManager();
}

// ── Historical Session Seeding ────────────────────────────────────────────────
function insertHistoricalPlaybackSessions() {
  const allIds = getQuestions().map(q => q.id);
  const historical = [
    { sessionId: 'historical_pb_20260503', date: '2026-05-03', startTime: '08:00', endTime: '08:00' },
    { sessionId: 'historical_pb_20260504', date: '2026-05-04', startTime: '08:00', endTime: '08:00' },
    { sessionId: 'historical_pb_20260505', date: '2026-05-05', startTime: '08:00', endTime: '08:00' },
  ];
  const existing = new Set(getSessions().map(s => s.sessionId));
  historical.forEach(h => {
    if (!existing.has(h.sessionId)) {
      saveSession({
        ...h,
        mode: 'playback',
        completedQuestions: allIds,
        questionIds: allIds,
        isCompleted: true,
      });
    }
  });
}

// ── Init ──────────────────────────────────────────────────────────────────────
window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
  insertHistoricalPlaybackSessions();
  const user = await getUser();
  if (user) {
    navigateTo('home');
    await initHome();
  }
  // If not logged in, screen-login is already active (default)
});
