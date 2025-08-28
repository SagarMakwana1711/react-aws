import React, { useState } from 'react';

const TITLE = 'Create account';
const BTN_TEXT = 'Sign up';
const USER_TEXT = 'Username';
const PASS_TEXT = 'Password';
const ERR_DEFAULT = 'Please fill all fields';
const PH_USERNAME = 'choose-a-username';
const PH_PASSWORD = 'Create a strong password';
const CTA_HAVE = 'Already have an account?';
const CTA_SWITCH = 'Sign in';

export default function Signup({ onSignup, switchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    if (!username || !password) {
      setError(ERR_DEFAULT);
      return;
    }
    setBusy(true);
    const res = await onSignup(username.trim(), password);
    setBusy(false);
    if (!res.ok) setError(res.message);
    // on success, App.js navigates to #/login?created=1
  }

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">{TITLE}</h1>
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
              autoComplete="new-password"
            />
          </label>

          {error && <div className="error">{error}</div>}

          <button className="btn primary" type="submit" disabled={busy}>
            {busy ? 'Creating…' : BTN_TEXT}
          </button>
        </form>

        <div className="switch">
          {CTA_HAVE}{' '}
          <button className="link" onClick={switchToLogin}>{CTA_SWITCH}</button>
        </div>
      </div>
    </section>
  );
}
