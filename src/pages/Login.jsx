import React, { useContext } from 'react';
import propTypes from 'prop-types';
import AppContext from '../contexts/AppContext';
import saveLocalStorage from '../helpers/saveLocalStorage';

const Login = ({ history }) => {
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
        onChange={ ({ target: { value } }) => setPassword(value) }
      />

      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ !(regex.test(email) && password.length > six) }
        onClick={ () => {
          history.push('/foods');
          saveLocalStorage('mealsToken', 1);
          saveLocalStorage('cocktailsToken', 1);
          saveLocalStorage('user', { email });
        } }
      >
        Enter
      </button>
    </div>
  );
};

Login.propTypes = {
  push: propTypes.func,
}.isRequired;

export default Login;
