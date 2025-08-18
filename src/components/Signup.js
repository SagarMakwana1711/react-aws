import React, { useState } from 'react';

const TITLE = 'Create account';
const BTN_TEXT = 'Sign up';
const NAME_TEXT = 'Name';
const EMAIL_TEXT = 'Email';
const PASS_TEXT = 'Password';
const ERR_DEFAULT = 'Please fill all fields';

export default function Signup({ onSignup, switchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError(ERR_DEFAULT);
      return;
    }
    setBusy(true);
    const res = await onSignup(name.trim(), email.trim(), password);
    setBusy(false);
    if (!res.ok) setError(res.message);
  }

  return (
    <section className="auth-wrap">
      <div className="auth-card">
        <h1 className="auth-title">{TITLE}</h1>
        <form onSubmit={submit} className="auth-form">
          <label className="field">
            <span className="field-label">{NAME_TEXT}</span>
            <input
              type="text"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </label>

          <label className="field">
            <span className="field-label">{EMAIL_TEXT}</span>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>

          <label className="field">
            <span className="field-label">{PASS_TEXT}</span>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password"
              autoComplete="new-password"
            />
          </label>

          {error && <div className="error">{error}</div>}

          <button className="btn primary" type="submit" disabled={busy}>
            {busy ? 'Creating…' : BTN_TEXT}
          </button>
        </form>

        <div className="switch">
          Already have an account?
          <button className="link" onClick={switchToLogin}>Sign in</button>
        </div>
      </div>
    </section>
  );
}
