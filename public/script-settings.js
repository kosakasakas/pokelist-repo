const SETTINGS_LANG_KEY = 'champions-tool-ui-lang-v1';
const SETTINGS_REGULATION_KEY = 'champions-tool-ui-regulation-v1';
const SETTINGS_DOUBLE_BATTLE_KEY = 'champions-tool-ui-double-battle-v1';
const TOOL_LAYOUT_CONFIG_URLS = ['./layout-config.json', '/layout-config.json', './public/layout-config.json'];
const BOX_STORAGE_KEY = 'champions-damage-calc-box-party-v1';
const GOOGLE_LINKED_EMAIL_KEY = 'champions-google-linked-email-v1';
const GOOGLE_ACCESS_TOKEN_KEY = 'champions-google-access-token-v1';
const GOOGLE_ACCESS_TOKEN_EXPIRES_AT_KEY = 'champions-google-access-token-expires-at-v1';
const GOOGLE_BACKUP_REMOTE_MODIFIED_TIME_KEY = 'champions-google-backup-remote-modified-time-v1';
const GOOGLE_DRIVE_FILE_NAME = 'champions-box-backup.json';
const GOOGLE_SCOPES = 'https://www.googleapis.com/auth/drive.appdata https://www.googleapis.com/auth/userinfo.email';

let googleTokenClient = null;
let googleAccessToken = '';
let googleAccessTokenExpiresAt = 0;
let googleAccountEmail = '';
let googleOAuthClientId = '';
let googleSdkReadyPromise = null;
let googleOperationInProgress = false;

const I18N = {
  ja: {
    title: '設定',
    language: '言語',
    regulation: 'レギュレーション',
    doubleBattle: 'ダブルバトル用',
    googleLink: 'Google連携（ボックス保存/読込）',
    googleLinkedAs: '連携中: {email}',
    googleLinkedNoEmail: '連携中',
    googleNotLinked: '未連携',
    googleClientIdMissing: 'Google連携は管理者設定が未完了です。',
    googleSdkNotReady: 'Google認証ライブラリの読み込み待ちです。数秒後に再度お試しください。',
    googleSdkLoadFailed: 'Google認証ライブラリの読み込みに失敗しました。通信状態を確認してください。',
    googleReady: 'Google連携の準備ができています。',
    googleConnected: 'Google連携に成功しました。',
    googleDisconnected: 'Google連携を解除しました。',
    googleSigningIn: 'Google連携を確認中...',
    googleSaving: 'Driveへ書き込み中...',
    googleLoading: 'Driveから読み込み中...',
    googleCancelled: 'キャンセルしました。',
    googleConflictPrompt: 'Drive上のバックアップが他の端末/タブで更新されています。上書き保存しますか？',
    googleOverwritePrompt: 'Drive上に既存バックアップがあります。上書き保存しますか？',
    googleSaved: 'Driveへ保存しました。',
    googleLoaded: 'Driveから読込しました。ページを再読み込みすると反映されます。',
    googleNoBackup: 'Drive上にバックアップが見つかりません。',
    googleInvalidBackup: 'バックアップ形式が不正です。',
    googleFailed: 'Google連携処理に失敗しました。',
    saved: '保存しました',
  },
  en: {
    title: 'Settings',
    language: 'Language',
    regulation: 'Regulation',
    doubleBattle: 'Double battle mode',
    googleLink: 'Google Link (Box save/load)',
    googleLinkedAs: 'Linked: {email}',
    googleLinkedNoEmail: 'Linked',
    googleNotLinked: 'Not linked',
    googleClientIdMissing: 'Google integration is not configured by the site admin.',
    googleSdkNotReady: 'Google auth library is still loading. Please try again in a few seconds.',
    googleSdkLoadFailed: 'Failed to load Google auth library. Check your network connection.',
    googleReady: 'Google integration is ready.',
    googleConnected: 'Google linked successfully.',
    googleDisconnected: 'Google link disconnected.',
    googleSigningIn: 'Checking Google link...',
    googleSaving: 'Saving to Drive...',
    googleLoading: 'Loading from Drive...',
    googleCancelled: 'Cancelled.',
    googleConflictPrompt: 'Backup on Drive was updated from another tab/device. Overwrite it anyway?',
    googleOverwritePrompt: 'A backup already exists on Drive. Overwrite it?',
    googleSaved: 'Saved to Drive.',
    googleLoaded: 'Loaded from Drive. Reload page to reflect.',
    googleNoBackup: 'No backup found on Drive.',
    googleInvalidBackup: 'Backup format is invalid.',
    googleFailed: 'Google integration failed.',
    saved: 'Saved',
  },
};

function t(key, vars = {}) {
  const lang = readLang();
  let text = (I18N[lang] || I18N.ja)[key] || key;
  Object.entries(vars).forEach(([k, v]) => {
    text = text.replace(`{${k}}`, String(v));
  });
  return text;
}

function readLang() {
  const fromLayout = window.pokeToolsLayout?.readLang?.();
  if (fromLayout === 'ja' || fromLayout === 'en') return fromLayout;
  try {
    const value = localStorage.getItem(SETTINGS_LANG_KEY);
    if (value === 'ja' || value === 'en') return value;
  } catch (_error) {
    // ignore
  }
  return 'ja';
}

function readRegulation() {
  const fromLayout = window.pokeToolsLayout?.readRegulation?.();
  if (fromLayout === 'M-A') return fromLayout;
  try {
    const value = localStorage.getItem(SETTINGS_REGULATION_KEY);
    if (value === 'M-A') return value;
  } catch (_error) {
    // ignore
  }
  return 'M-A';
}

function readDoubleBattle() {
  const fromLayout = window.pokeToolsLayout?.readDoubleBattleMode?.();
  if (typeof fromLayout === 'boolean') return fromLayout;
  try {
    const value = localStorage.getItem(SETTINGS_DOUBLE_BATTLE_KEY);
    if (value === '0' || value === 'false') return false;
    if (value === '1' || value === 'true') return true;
  } catch (_error) {
    // ignore
  }
  return true;
}

function writeLang(lang) {
  const next = lang === 'en' ? 'en' : 'ja';
  try {
    localStorage.setItem(SETTINGS_LANG_KEY, next);
  } catch (_error) {
    // ignore
  }
  window.dispatchEvent(new CustomEvent('poketools:langchange', { detail: { lang: next } }));
}

function writeRegulation(regulation) {
  if (window.pokeToolsLayout?.writeRegulation) {
    window.pokeToolsLayout.writeRegulation(regulation);
    return;
  }
  try {
    localStorage.setItem(SETTINGS_REGULATION_KEY, regulation === 'M-A' ? 'M-A' : 'M-A');
  } catch (_error) {
    // ignore
  }
}

function writeDoubleBattle(enabled) {
  if (window.pokeToolsLayout?.writeDoubleBattleMode) {
    window.pokeToolsLayout.writeDoubleBattleMode(Boolean(enabled));
    return;
  }
  try {
    localStorage.setItem(SETTINGS_DOUBLE_BATTLE_KEY, enabled ? '1' : '0');
  } catch (_error) {
    // ignore
  }
}

function applyI18n() {
  const title = document.getElementById('settings-title');
  const language = document.getElementById('setting-language-label');
  const regulation = document.getElementById('setting-regulation-label');
  const doubleBattle = document.getElementById('setting-double-battle-label');
  const googleLink = document.getElementById('setting-google-link-label');
  if (title) title.textContent = t('title');
  if (language) language.innerHTML = `<i class="bi bi-translate"></i><span>${t('language')}</span>`;
  if (regulation) regulation.innerHTML = `<i class="bi bi-list-ul"></i><span>${t('regulation')}</span>`;
  if (doubleBattle) doubleBattle.innerHTML = `<i class="bi bi-people-fill"></i><span>${t('doubleBattle')}</span>`;
  if (googleLink) googleLink.innerHTML = `<i class="bi bi-google"></i><span>${t('googleLink')}</span>`;
  refreshGoogleAccountLabel();
}

function flashSaved() {
  const node = document.getElementById('settings-saved');
  if (!node) return;
  node.textContent = t('saved');
  window.setTimeout(() => {
    node.textContent = '';
  }, 1000);
}

function setGoogleStatus(text, isError = false) {
  const node = document.getElementById('setting-google-status');
  if (!node) return;
  node.textContent = text || '';
  node.classList.toggle('text-danger', Boolean(isError && text));
  node.classList.toggle('text-muted', !isError || !text);
}

async function loadGoogleClientIdFromConfig() {
  for (const url of TOOL_LAYOUT_CONFIG_URLS) {
    try {
      const response = await fetch(url, { cache: 'no-store' });
      if (!response.ok) continue;
      const config = await response.json();
      const fromGoogleObject = String(config?.google?.oauthClientId || '').trim();
      if (fromGoogleObject) return fromGoogleObject;
      const fromTopLevel = String(config?.googleOAuthClientId || '').trim();
      if (fromTopLevel) return fromTopLevel;
    } catch (_error) {
      // try next candidate
    }
  }
  return '';
}

function ensureGoogleSdkReady() {
  if (window.google?.accounts?.oauth2?.initTokenClient) return Promise.resolve();
  if (googleSdkReadyPromise) return googleSdkReadyPromise;
  googleSdkReadyPromise = new Promise((resolve, reject) => {
    const finish = () => {
      if (window.google?.accounts?.oauth2?.initTokenClient) resolve();
      else reject(new Error(t('googleSdkNotReady')));
    };

    let script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    let timeoutId = null;
    const cleanup = () => {
      if (timeoutId) window.clearTimeout(timeoutId);
      script.removeEventListener('load', onLoad);
      script.removeEventListener('error', onError);
    };
    const onLoad = () => {
      cleanup();
      finish();
    };
    const onError = () => {
      cleanup();
      reject(new Error(t('googleSdkLoadFailed')));
    };

    script.addEventListener('load', onLoad, { once: true });
    script.addEventListener('error', onError, { once: true });
    timeoutId = window.setTimeout(() => {
      cleanup();
      if (window.google?.accounts?.oauth2?.initTokenClient) resolve();
      else reject(new Error(t('googleSdkNotReady')));
    }, 8000);
  }).finally(() => {
    if (!window.google?.accounts?.oauth2?.initTokenClient) googleSdkReadyPromise = null;
  });
  return googleSdkReadyPromise;
}

function refreshGoogleAccountLabel() {
  const node = document.getElementById('setting-google-account');
  if (!node) return;
  if (googleAccountEmail) {
    node.textContent = t('googleLinkedAs', { email: googleAccountEmail });
    return;
  }
  if (googleAccessToken && googleAccessTokenExpiresAt > Date.now()) {
    node.textContent = t('googleLinkedNoEmail');
    return;
  }
  node.textContent = t('googleNotLinked');
}

function initializeGoogleTokenClient() {
  const clientId = googleOAuthClientId;
  if (!clientId) return null;
  if (!window.google?.accounts?.oauth2?.initTokenClient) return null;
  googleTokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: GOOGLE_SCOPES,
    callback: () => {},
  });
  return googleTokenClient;
}

function setGoogleActionsEnabled(enabled) {
  ['setting-google-signin', 'setting-google-signout', 'setting-google-save', 'setting-google-load'].forEach(id => {
    const node = document.getElementById(id);
    if (node) node.disabled = !enabled;
  });
}

function saveLinkedEmail(email) {
  try {
    if (email) sessionStorage.setItem(GOOGLE_LINKED_EMAIL_KEY, email);
    else sessionStorage.removeItem(GOOGLE_LINKED_EMAIL_KEY);
  } catch (_error) {
    // ignore
  }
}

function loadLinkedEmail() {
  try {
    return String(sessionStorage.getItem(GOOGLE_LINKED_EMAIL_KEY) || '').trim();
  } catch (_error) {
    return '';
  }
}

function saveTokenSession(accessToken, expiresInSec = 0) {
  try {
    if (!accessToken) {
      sessionStorage.removeItem(GOOGLE_ACCESS_TOKEN_KEY);
      sessionStorage.removeItem(GOOGLE_ACCESS_TOKEN_EXPIRES_AT_KEY);
      return;
    }
    const expiresAt = Date.now() + Math.max(0, Number(expiresInSec || 0) * 1000) - 5000;
    sessionStorage.setItem(GOOGLE_ACCESS_TOKEN_KEY, accessToken);
    sessionStorage.setItem(GOOGLE_ACCESS_TOKEN_EXPIRES_AT_KEY, String(expiresAt));
  } catch (_error) {
    // ignore
  }
}

function loadTokenSession() {
  try {
    const token = String(sessionStorage.getItem(GOOGLE_ACCESS_TOKEN_KEY) || '').trim();
    const expiresAt = Number(sessionStorage.getItem(GOOGLE_ACCESS_TOKEN_EXPIRES_AT_KEY) || '0');
    if (!token || !Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
      return { token: '', expiresAt: 0 };
    }
    return { token, expiresAt };
  } catch (_error) {
    return { token: '', expiresAt: 0 };
  }
}

function clearTokenSession() {
  saveTokenSession('', 0);
}

function saveRemoteBackupModifiedTime(modifiedTime) {
  try {
    if (modifiedTime) localStorage.setItem(GOOGLE_BACKUP_REMOTE_MODIFIED_TIME_KEY, String(modifiedTime));
    else localStorage.removeItem(GOOGLE_BACKUP_REMOTE_MODIFIED_TIME_KEY);
  } catch (_error) {
    // ignore
  }
}

function loadRemoteBackupModifiedTime() {
  try {
    return String(localStorage.getItem(GOOGLE_BACKUP_REMOTE_MODIFIED_TIME_KEY) || '').trim();
  } catch (_error) {
    return '';
  }
}

function setGoogleOperationInProgress(inProgress) {
  googleOperationInProgress = Boolean(inProgress);
  ['setting-google-signin', 'setting-google-signout', 'setting-google-save', 'setting-google-load'].forEach(id => {
    const node = document.getElementById(id);
    if (!node) return;
    node.disabled = googleOperationInProgress || !googleOAuthClientId;
  });
}

function applyGoogleLinkButtonsVisibility() {
  const signInButton = document.getElementById('setting-google-signin');
  const signOutButton = document.getElementById('setting-google-signout');
  const linked = Boolean(googleAccessToken && googleAccessTokenExpiresAt > Date.now());

  if (signInButton) signInButton.classList.toggle('d-none', linked);
  if (signOutButton) signOutButton.classList.toggle('d-none', !linked);
  setGoogleOperationInProgress(googleOperationInProgress);
}

async function requestGoogleToken(prompt = 'consent') {
  if (!googleOAuthClientId) throw new Error(t('googleClientIdMissing'));
  if (!window.google?.accounts?.oauth2?.initTokenClient) {
    ensureGoogleSdkReady().catch(() => {});
    throw new Error(t('googleSdkNotReady'));
  }
  return new Promise((resolve, reject) => {
    const client = initializeGoogleTokenClient();
    if (!client) {
      reject(new Error(t('googleFailed')));
      return;
    }
    client.callback = response => {
      if (!response || response.error) {
        reject(new Error(response?.error || t('googleFailed')));
        return;
      }
      googleAccessToken = response.access_token || '';
      googleAccessTokenExpiresAt = Date.now() + Math.max(0, Number(response.expires_in || 0) * 1000) - 5000;
      saveTokenSession(googleAccessToken, response.expires_in || 0);
      resolve(googleAccessToken);
    };
    client.requestAccessToken({ prompt });
  });
}

async function fetchGoogleUserEmail() {
  if (!googleAccessToken) return '';
  const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
    headers: { Authorization: `Bearer ${googleAccessToken}` },
  });
  if (!response.ok) return '';
  const data = await response.json();
  return String(data?.email || '').trim();
}

async function ensureGoogleLinked() {
  const hasValidToken = Boolean(googleAccessToken && googleAccessTokenExpiresAt > Date.now());
  if (!hasValidToken) {
    await requestGoogleToken('consent');
  }
  if (!googleAccessToken) throw new Error(t('googleFailed'));
  if (!googleAccountEmail) {
    googleAccountEmail = await fetchGoogleUserEmail();
  }
  saveLinkedEmail(googleAccountEmail || '');
  refreshGoogleAccountLabel();
  applyGoogleLinkButtonsVisibility();
}

async function restoreGoogleLinkOnReload() {
  if (!googleOAuthClientId) return false;
  const sessionToken = loadTokenSession();
  const rememberedEmail = loadLinkedEmail();
  if (!sessionToken.token) {
    googleAccessToken = '';
    googleAccessTokenExpiresAt = 0;
    googleAccountEmail = '';
    saveLinkedEmail('');
    refreshGoogleAccountLabel();
    applyGoogleLinkButtonsVisibility();
    return false;
  }

  try {
    googleAccessToken = sessionToken.token;
    googleAccessTokenExpiresAt = sessionToken.expiresAt;
    const email = await fetchGoogleUserEmail();
    googleAccountEmail = email || rememberedEmail || '';
    if (googleAccountEmail) saveLinkedEmail(googleAccountEmail);
    refreshGoogleAccountLabel();
    applyGoogleLinkButtonsVisibility();
    return true;
  } catch (_error) {
    googleAccessToken = '';
    googleAccessTokenExpiresAt = 0;
    clearTokenSession();
    googleAccountEmail = '';
    saveLinkedEmail('');
    refreshGoogleAccountLabel();
    applyGoogleLinkButtonsVisibility();
    return false;
  }
}

async function fetchDriveJson(path, options = {}) {
  const response = await fetch(path, {
    ...options,
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
      ...(options.headers || {}),
    },
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `HTTP ${response.status}`);
  }
  return response.json();
}

async function findBackupFile() {
  const query = encodeURIComponent(`name='${GOOGLE_DRIVE_FILE_NAME}' and trashed=false`);
  const fields = encodeURIComponent('files(id,name,modifiedTime)');
  const path = `https://www.googleapis.com/drive/v3/files?q=${query}&spaces=appDataFolder&fields=${fields}&orderBy=modifiedTime desc&pageSize=1`;
  const data = await fetchDriveJson(path);
  return Array.isArray(data?.files) && data.files.length ? data.files[0] : null;
}

function buildMultipartBody(metadata, content) {
  const boundary = `boundary_${Date.now().toString(36)}`;
  const body = [
    `--${boundary}`,
    'Content-Type: application/json; charset=UTF-8',
    '',
    JSON.stringify(metadata),
    `--${boundary}`,
    'Content-Type: application/json; charset=UTF-8',
    '',
    content,
    `--${boundary}--`,
  ].join('\r\n');
  return { boundary, body };
}

async function saveBackupToDrive() {
  await ensureGoogleLinked();
  const raw = localStorage.getItem(BOX_STORAGE_KEY) || '';
  if (!raw) {
    throw new Error(t('googleInvalidBackup'));
  }
  const existing = await findBackupFile();
  const lastKnownModifiedTime = loadRemoteBackupModifiedTime();
  if (existing?.id && !lastKnownModifiedTime) {
    const shouldOverwrite = window.confirm(t('googleOverwritePrompt'));
    if (!shouldOverwrite) {
      throw new Error(t('googleCancelled'));
    }
  }
  if (existing?.modifiedTime && lastKnownModifiedTime && existing.modifiedTime !== lastKnownModifiedTime) {
    const shouldOverwrite = window.confirm(t('googleConflictPrompt'));
    if (!shouldOverwrite) {
      throw new Error(t('googleCancelled'));
    }
  }
  const metadata = existing
    ? { name: GOOGLE_DRIVE_FILE_NAME }
    : { name: GOOGLE_DRIVE_FILE_NAME, parents: ['appDataFolder'] };
  const { boundary, body } = buildMultipartBody(metadata, raw);
  const url = existing
    ? `https://www.googleapis.com/upload/drive/v3/files/${encodeURIComponent(existing.id)}?uploadType=multipart&fields=id,modifiedTime`
    : 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,modifiedTime';
  const method = existing ? 'PATCH' : 'POST';
  const response = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${googleAccessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body,
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || t('googleFailed'));
  }
  const data = await response.json().catch(() => null);
  const latestModifiedTime = String(data?.modifiedTime || existing?.modifiedTime || '').trim();
  if (latestModifiedTime) saveRemoteBackupModifiedTime(latestModifiedTime);
}

async function loadBackupFromDrive() {
  await ensureGoogleLinked();
  const existing = await findBackupFile();
  if (!existing?.id) {
    throw new Error(t('googleNoBackup'));
  }
  const response = await fetch(`https://www.googleapis.com/drive/v3/files/${encodeURIComponent(existing.id)}?alt=media`, {
    headers: { Authorization: `Bearer ${googleAccessToken}` },
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || t('googleFailed'));
  }
  const text = await response.text();
  let parsed = null;
  try {
    parsed = JSON.parse(text);
  } catch (_error) {
    throw new Error(t('googleInvalidBackup'));
  }
  if (!parsed || !Array.isArray(parsed.box) || !Array.isArray(parsed.parties)) {
    throw new Error(t('googleInvalidBackup'));
  }
  localStorage.setItem(BOX_STORAGE_KEY, JSON.stringify(parsed));
  saveRemoteBackupModifiedTime(String(existing.modifiedTime || '').trim());
}

async function initialize() {
  const languageSelect = document.getElementById('setting-language');
  const regulationSelect = document.getElementById('setting-regulation');
  const doubleBattleToggle = document.getElementById('setting-double-battle');
  const googleSigninButton = document.getElementById('setting-google-signin');
  const googleSignoutButton = document.getElementById('setting-google-signout');
  const googleSaveButton = document.getElementById('setting-google-save');
  const googleLoadButton = document.getElementById('setting-google-load');
  if (languageSelect) languageSelect.value = readLang();
  if (regulationSelect) regulationSelect.value = readRegulation();
  if (doubleBattleToggle) doubleBattleToggle.checked = readDoubleBattle();
  googleOAuthClientId = await loadGoogleClientIdFromConfig();
  setGoogleActionsEnabled(Boolean(googleOAuthClientId));
  if (!googleOAuthClientId) {
    setGoogleStatus(t('googleClientIdMissing'), true);
    googleAccountEmail = '';
    saveLinkedEmail('');
  } else {
    ensureGoogleSdkReady().catch(() => {});
    const restored = await restoreGoogleLinkOnReload();
    setGoogleStatus(restored ? t('googleConnected') : t('googleReady'));
  }

  applyI18n();
  applyGoogleLinkButtonsVisibility();

  if (languageSelect) {
    languageSelect.addEventListener('change', () => {
      writeLang(languageSelect.value);
      applyI18n();
      flashSaved();
    });
  }

  if (regulationSelect) {
    regulationSelect.addEventListener('change', () => {
      writeRegulation(regulationSelect.value);
      flashSaved();
    });
  }

  if (doubleBattleToggle) {
    doubleBattleToggle.addEventListener('change', () => {
      writeDoubleBattle(doubleBattleToggle.checked);
      flashSaved();
    });
  }

  if (googleSigninButton) {
    googleSigninButton.addEventListener('click', async () => {
      try {
        setGoogleOperationInProgress(true);
        setGoogleStatus(t('googleSigningIn'));
        await ensureGoogleLinked();
        setGoogleStatus(t('googleConnected'));
        applyGoogleLinkButtonsVisibility();
      } catch (_error) {
        const message = _error?.message || t('googleFailed');
        setGoogleStatus(message, true);
        window.alert(message);
      } finally {
        setGoogleOperationInProgress(false);
      }
    });
  }

  if (googleSignoutButton) {
    googleSignoutButton.addEventListener('click', () => {
      if (googleAccessToken && window.google?.accounts?.oauth2?.revoke) {
        window.google.accounts.oauth2.revoke(googleAccessToken, () => {});
      }
      googleAccessToken = '';
      googleAccessTokenExpiresAt = 0;
      clearTokenSession();
      googleAccountEmail = '';
      saveLinkedEmail('');
      refreshGoogleAccountLabel();
      applyGoogleLinkButtonsVisibility();
      setGoogleStatus(t('googleDisconnected'));
    });
  }

  if (googleSaveButton) {
    googleSaveButton.addEventListener('click', async () => {
      try {
        setGoogleOperationInProgress(true);
        setGoogleStatus(t('googleSaving'));
        await saveBackupToDrive();
        setGoogleStatus(t('googleSaved'));
      } catch (_error) {
        const message = _error?.message || t('googleFailed');
        setGoogleStatus(message, true);
        window.alert(message);
      } finally {
        setGoogleOperationInProgress(false);
      }
    });
  }

  if (googleLoadButton) {
    googleLoadButton.addEventListener('click', async () => {
      try {
        setGoogleOperationInProgress(true);
        setGoogleStatus(t('googleLoading'));
        await loadBackupFromDrive();
        setGoogleStatus(t('googleLoaded'));
      } catch (_error) {
        const message = _error?.message || t('googleFailed');
        setGoogleStatus(message, true);
        window.alert(message);
      } finally {
        setGoogleOperationInProgress(false);
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}
