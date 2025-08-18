import React, { useEffect, useState } from 'react';
import './App.css';
import { apiLogin, apiSignup, getStoredToken, storeToken, clearToken } from './api';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';

const ROUTE_HOME = '#/';
const ROUTE_LOGIN = '#/login';
const ROUTE_SIGNUP = '#/signup';
const TOKEN_KEY = 'nebula_token';
const TITLE = 'Nebula Auth';

function getRoute() {
  return window.location.hash || ROUTE_HOME;
}

function navigate(to) {
  window.location.hash = to;
}

export default function App() {
  const [route, setRoute] = useState(getRoute());
  const [authed, setAuthed] = useState(Boolean(getStoredToken(TOKEN_KEY)));

  useEffect(() => {
    document.title = TITLE;
    function onHash() { setRoute(getRoute()); }
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  useEffect(() => {
    if (authed && (route === ROUTE_LOGIN || route === ROUTE_SIGNUP)) {
      navigate(ROUTE_HOME);
    }
    if (!authed && route === ROUTE_HOME) {
      navigate(ROUTE_LOGIN);
    }
  }, [authed, route]);

  async function handleLogin(email, password) {
    const res = await apiLogin(email, password);
    if (res.ok && res.token) {
      storeToken(TOKEN_KEY, res.token);
      setAuthed(true);
      navigate(ROUTE_HOME);
      return { ok: true };
    }
    return { ok: false, message: res.message || 'Login failed' };
  }

  async function handleSignup(name, email, password) {
    const res = await apiSignup(name, email, password);
    if (res.ok && res.token) {
      storeToken(TOKEN_KEY, res.token);
      setAuthed(true);
      navigate(ROUTE_HOME);
      return { ok: true };
    }
    return { ok: false, message: res.message || 'Signup failed' };
  }

  function handleLogout() {
    clearToken(TOKEN_KEY);
    setAuthed(false);
    navigate(ROUTE_LOGIN);
  }

  function renderScreen() {
    if (!authed && route === ROUTE_SIGNUP) {
      return <Signup onSignup={handleSignup} switchToLogin={() => navigate(ROUTE_LOGIN)} />;
    }
    if (!authed) {
      return <Login onLogin={handleLogin} switchToSignup={() => navigate(ROUTE_SIGNUP)} />;
    }
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <div className="page">
      <header className="topbar">
        <div className="brand">AWS tutorials</div>
        <nav className="nav">
          {!authed && (
            <span>
              <button className="link" onClick={() => navigate(ROUTE_LOGIN)}>Login</button>
              <button className="link" onClick={() => navigate(ROUTE_SIGNUP)}>Sign up</button>
            </span>
          )}
          {authed && <button className="link" onClick={handleLogout}>Logout</button>}
        </nav>
      </header>
      <main className="main">{renderScreen()}</main>
      <footer className="footer">© {new Date().getFullYear()} Nebula</footer>
    </div>
  );
}
