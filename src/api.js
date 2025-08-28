const ENV_KEY = 'REACT_APP_API_URL';

// endpoints (backend swagger showed POST /users/ for signup)
const PATH_LOGIN = '/login/';
const PATH_SIGNUP = '/users/';

const CT_JSON = 'application/json';
const MSG_INVALID_JSON = 'Invalid JSON';
const MSG_REQUEST_FAILED = 'Request failed';

function readBaseUrl() {
  const raw = process.env[ENV_KEY] || '';
  if (!raw) return '';
  try {
    const u = new URL(raw);
    return u.origin;
  } catch (_e) {
    return raw;
  }
}

const API_BASE_URL = readBaseUrl();

function copyPropsSafe(target, source) {
  if (!source || typeof source !== 'object') return target;
  for (const k in source) {
    if (Object.prototype.hasOwnProperty.call(source, k)) target[k] = source[k];
  }
  return target;
}

function toJsonResponse(resp) {
  const ok = resp.ok;
  return resp
    .json()
    .then(function (data) {
      if (!ok) {
        return {
          ok: false,
          message: (data && data.message) ? data.message : MSG_REQUEST_FAILED
        };
      }
      const result = { ok: true };
      return copyPropsSafe(result, data);
    })
    .catch(function () {
      return ok ? { ok: true } : { ok: false, message: MSG_INVALID_JSON };
    });
}

export function getStoredToken(key) {
  const tok = localStorage.getItem(key);
  return tok || '';
}

export function storeToken(key, token) {
  localStorage.setItem(key, token);
}

export function clearToken(key) {
  localStorage.removeItem(key);
}

// login expects { username, password }
export async function apiLogin(username, password) {
  const r = await fetch(API_BASE_URL + PATH_LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': CT_JSON },
    body: JSON.stringify({ username: username, password: password })
  });
  return toJsonResponse(r);
}

// signup expects { username, password }
export async function apiSignup(username, password) {
  const r = await fetch(API_BASE_URL + PATH_SIGNUP, {
    method: 'POST',
    headers: { 'Content-Type': CT_JSON },
    body: JSON.stringify({ username: username, password: password })
  });
  return toJsonResponse(r);
}
