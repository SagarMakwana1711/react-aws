import React from 'react';

const WELCOME = 'Welcome to Nebula';
const SUB = 'You are logged in';

export default function Dashboard({ onLogout }) {
  return (
    <section className="dash">
      <div className="dash-card">
        <h1 className="dash-title">{WELCOME}</h1>
        <p className="dash-sub">{SUB}</p>
        <button className="btn" onClick={onLogout}>Logout</button>
      </div>
    </section>
  );
}
