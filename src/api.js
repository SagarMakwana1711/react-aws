const API_BASE_URL = 'https://your-backend.example.com'; // ← set this
const PATH_LOGIN = '/api/auth/login';
const PATH_SIGNUP = '/api/auth/signup';
const CT_JSON = 'application/json';
const MSG_INVALID_JSON = 'Invalid JSON';
const MSG_REQUEST_FAILED = 'Request failed';

function copyPropsSafe(target, source) {
  if (!source || typeof source !== 'object') return target;
  for (var k in source) {
    if (Object.prototype.hasOwnProperty.call(source, k)) target[k] = source[k];
  }
  return target;
}


function toJsonResponse(resp) {
  var ok = resp.ok;
  return resp
    .json()
    .then(function (data) {
      if (!ok) {
        return {
          ok: false,
          message: (data && data.message) ? data.message : MSG_REQUEST_FAILED
        };
      }
      var result = { ok: true };
      return copyPropsSafe(result, data);
    })
    .catch(function () {
      return ok ? { ok: true } : { ok: false, message: MSG_INVALID_JSON };
    });
}

export function getStoredToken(key) {
  var tok = localStorage.getItem(key);
  return tok || '';
}

export function storeToken(key, token) {
  localStorage.setItem(key, token);
}

export function clearToken(key) {
  localStorage.removeItem(key);
}

export async function apiLogin(email, password) {
  var r = await fetch(API_BASE_URL + PATH_LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': CT_JSON },
    body: JSON.stringify({ email: email, password: password })
  });
  return toJsonResponse(r);
}

export async function apiSignup(name, email, password) {
  var r = await fetch(API_BASE_URL + PATH_SIGNUP, {
    method: 'POST',
    headers: { 'Content-Type': CT_JSON },
    body: JSON.stringify({ name: name, email: email, password: password })
  });
  return toJsonResponse(r);
}
