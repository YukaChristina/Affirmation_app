const SUPABASE_URL = 'https://txrqjfemkxylddiepwrc.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR4cnFqZmVta3h5bGRkaWVwd3JjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc0MzExNDQsImV4cCI6MjA5MzAwNzE0NH0.Lv1pxt0mqRbUgZt2L45YvZPvxvvXqZ9LKgCX4GzlvAc';

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ── Auth ──────────────────────────────────────────────────────────────────────
async function getUser() {
  const { data: { session } } = await sb.auth.getSession();
  return session?.user || null;
}

async function signIn(email, password) {
  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
}

async function signUp(email, password) {
  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) throw error;
  return data.user;
}

async function signOut() {
  await sb.auth.signOut();
}

async function updatePassword(newPassword) {
  const { error } = await sb.auth.updateUser({ password: newPassword });
  if (error) throw error;
}

// ── Sessions ──────────────────────────────────────────────────────────────────
async function saveSessionToCloud(sessionData) {
  const user = await getUser();
  if (!user) return;
  const { error } = await sb.from('sessions').upsert({
    session_id: sessionData.sessionId,
    user_id: user.id,
    date: sessionData.date,
    start_time: sessionData.startTime,
    end_time: sessionData.endTime || null,
    mode: sessionData.mode,
    completed_questions: sessionData.completedQuestions || [],
    question_ids: sessionData.questionIds || [],
    is_completed: sessionData.isCompleted || false,
  });
  if (error) console.error('saveSessionToCloud:', error);
}

async function getSessionsFromCloud() {
  const user = await getUser();
  if (!user) return [];
  const { data, error } = await sb
    .from('sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true });
  if (error) { console.error('getSessionsFromCloud:', error); return []; }
  return data.map(s => ({
    sessionId: s.session_id,
    date: s.date,
    startTime: s.start_time,
    endTime: s.end_time,
    mode: s.mode,
    completedQuestions: s.completed_questions || [],
    questionIds: s.question_ids || [],
    isCompleted: s.is_completed,
  }));
}

// ── Storage ───────────────────────────────────────────────────────────────────
async function uploadRecording(questionId, sessionId, blob) {
  const user = await getUser();
  if (!user) return;
  const ext = blob.type.includes('ogg') ? 'ogg' : 'webm';
  const path = `${user.id}/${sessionId}/${questionId}.${ext}`;
  const { error } = await sb.storage
    .from('recordings')
    .upload(path, blob, { upsert: true, contentType: blob.type });
  if (error) console.error('uploadRecording:', error);
}

async function downloadRecording(questionId, sessionId) {
  const user = await getUser();
  if (!user) return null;
  for (const ext of ['webm', 'ogg']) {
    const path = `${user.id}/${sessionId}/${questionId}.${ext}`;
    const { data, error } = await sb.storage.from('recordings').download(path);
    if (!error && data) return data;
  }
  return null;
}
