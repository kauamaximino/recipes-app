import React, { useContext, useEffect } from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getLocalStorage from '../helpers/getLocalStorage';
import AppContext from '../contexts/AppContext';

function Profile({ history }) {
  const { email, setEmail } = useContext(AppContext);

  useEffect(() => {
    const getEmail = () => {
      const jsonEmail = getLocalStorage('user');
      const user = JSON.parse(jsonEmail);
      if (user) {
        setEmail(user.email);
      } else {
        setEmail('');
      }
    };
    getEmail();
  }, []);

  return (
    <div>
      <Header title="Profile" />
      <Footer />
      <div>
        <p data-testid="profile-email">
          { email }
        </p>
        <button
          data-testid="profile-done-btn"
          type="button"
          onClick={ () => {
            history.push('/done-recipes');
          } }
        >
          Done Recipes
        </button>
        <button
          data-testid="profile-favorite-btn"
          type="button"
          onClick={ () => {
            history.push('/favorite-recipes');
          } }
        >
          Favorite Recipes
        </button>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ () => {
            history.push('/');
            localStorage.clear();
          } }
        >
          Logout
        </button>
      </div>
    </div>
  );
}
Profile.propTypes = {
  push: propTypes.func,
}.isRequired;

export default Profile;
