const DB_NAME = 'affirmation_db';
const DB_VERSION = 1;
const STORE_NAME = 'audio_recordings';

let db = null;

async function openDB() {
  if (db) return db;
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = e => {
      e.target.result.createObjectStore(STORE_NAME);
    };
    req.onsuccess = e => { db = e.target.result; resolve(db); };
    req.onerror = e => reject(e.target.error);
  });
}

async function saveRecording(questionId, sessionId, blob) {
  const database = await openDB();
  const key = `${questionId}_${sessionId}`;
  return new Promise((resolve, reject) => {
    const tx = database.transaction(STORE_NAME, 'readwrite');
    tx.objectStore(STORE_NAME).put(blob, key);
    tx.oncomplete = resolve;
    tx.onerror = e => reject(e.target.error);
  });
}

async function getRecording(questionId, sessionId) {
  const database = await openDB();
  const key = `${questionId}_${sessionId}`;
  return new Promise((resolve, reject) => {
    const tx = database.transaction(STORE_NAME, 'readonly');
    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = e => resolve(e.target.result);
    req.onerror = e => reject(e.target.error);
  });
}

async function deleteSessionRecordings(sessionId) {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAllKeys();
    req.onsuccess = e => {
      const keys = e.target.result.filter(k => k.endsWith(`_${sessionId}`));
      keys.forEach(k => store.delete(k));
    };
    tx.oncomplete = resolve;
    tx.onerror = e => reject(e.target.error);
  });
}

async function clearOldRecordings(keepSessionId) {
  const database = await openDB();
  return new Promise((resolve, reject) => {
    const tx = database.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.getAllKeys();
    req.onsuccess = e => {
      const keys = e.target.result.filter(k => !k.endsWith(`_${keepSessionId}`));
      keys.forEach(k => store.delete(k));
    };
    tx.oncomplete = resolve;
    tx.onerror = e => reject(e.target.error);
  });
}
