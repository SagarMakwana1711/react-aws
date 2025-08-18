import React, { useState } from 'react';

const TITLE = 'Welcome back';
const BTN_TEXT = 'Sign in';
const EMAIL_TEXT = 'Email';
const PASS_TEXT = 'Password';
const ERR_DEFAULT = 'Please fill all fields';

export default function Login({ onLogin, switchToSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError(ERR_DEFAULT);
      return;
    }
    setBusy(true);
    const res = await onLogin(email.trim(), password);
    setBusy(false);
    if (!res.ok) setError(res.message);
  }

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">{TITLE}</h1>
        <form onSubmit={submit} className="auth-form">
          <label className="field">
            <span className="field-label">{EMAIL_TEXT}</span>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
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
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>

          {error && <div className="error">{error}</div>}

          <button className="btn primary" type="submit" disabled={busy}>
            {busy ? 'Signing in…' : BTN_TEXT}
          </button>
        </form>

        <div className="switch">
          New here?
          <button className="link" onClick={switchToSignup}>Create an account</button>
        </div>
      </div>
    </section>
  );
}
