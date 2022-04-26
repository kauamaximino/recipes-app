import React, { useContext } from 'react';
import AppContext from '../contexts/AppContext';

const Login = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
  } = useContext(AppContext);

  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  const six = 6;

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        data-testid="email-input"
        value={ email }
        onChange={ ({ target: { value } }) => setEmail(value) }
      />

      <input
        type="password"
        placeholder="Password"
        data-testid="password-input"
        value={ password }
        onChange={ (e) => {
          setPassword(e.target.value);
        } }
      />

      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !(regex.test(email) && password.length > six) }
      >
        Enter
      </button>
    </div>
  );
};

export default Login;
