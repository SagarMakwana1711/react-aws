import React, { useEffect, useState } from 'react';

const TITLE = 'Welcome back for cache invalidation';
const BTN_TEXT = 'Sign in';
const USER_TEXT = 'Username';
const PASS_TEXT = 'Password';
const ERR_DEFAULT = 'Please fill all fields';
const PH_USERNAME = 'your-username';
const PH_PASSWORD = '••••••••';
const CTA_NEW = 'New here?';
const CTA_SWITCH = 'Create an account';
const MSG_CREATED = 'Signup complete. Please sign in.';

function readCreatedFlag() {
  const h = window.location.hash || '';
  return h.includes('created=1');
}

export default function Login({ onLogin, switchToSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    setNotice(readCreatedFlag() ? MSG_CREATED : '');
  }, []);

  async function submit(e) {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError(ERR_DEFAULT);
      return;
    }
    setBusy(true);
    const res = await onLogin(username.trim(), password);
    setBusy(false);
    if (!res.ok) setError(res.message);
  }

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">{TITLE}</h1>

        {notice && <div className="notice">{notice}</div>}

        <form onSubmit={submit} className="auth-form">
          <label className="field">
            <span className="field-label">{USER_TEXT}</span>
            <input
              type="text"
              className="input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={PH_USERNAME}
              autoComplete="username"
            />
          </label>

          <label className="field">
            <span className="field-label">{PASS_TEXT}</span>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={PH_PASSWORD}
              autoComplete="current-password"
            />
          </label>

          {error && <div className="error">{error}</div>}

          <button className="btn primary" type="submit" disabled={busy}>
            {busy ? 'Signing in…' : BTN_TEXT}
          </button>
        </form>

        <div className="switch">
          {CTA_NEW}{' '}
          <button className="link" onClick={switchToSignup}>{CTA_SWITCH}</button>
        </div>
      </div>
    </section>
  );
}
