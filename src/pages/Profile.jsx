import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import getLocalStorage from '../helpers/getLocalStorage';

function Profile({ history }) {
  const jsonEmail = getLocalStorage('user');
  const email = JSON.parse(jsonEmail);
  return (
    <div>
      <Header title="Profile" />
      <Footer />
      <div>
        <p data-testid="profile-email">
          { email.email }
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
