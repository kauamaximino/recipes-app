import React from 'react';
// import AppContext from '../contexts/AppContext';

const Login = () => (
  <div>
    <input
      type="email"
      placeholder="Email"
      data-testid="email-input"
    />

    <input
      type="password"
      placeholder="Password"
      data-testid="password-input"
    />

    <button
      type="button"
      data-testid="login-submit-btn"
    >
      Enter
    </button>
  </div>
);

export default Login;
