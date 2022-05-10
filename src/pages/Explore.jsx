import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Profile.css';

const Explore = ({ history }) => (
  <div>
    <Header title="Explore" />
    <div className="conteiner-profile">
      <button
        className="btn-profile"
        type="button"
        data-testid="explore-foods"
        onClick={ () => {
          history.push('/explore/foods');
        } }
      >
        Explore Foods

      </button>
      <button
        className="btn-profile"
        type="button"
        data-testid="explore-drinks"
        onClick={ () => {
          history.push('/explore/drinks');
        } }
      >
        Explore Drinks

      </button>
    </div>
    <Footer />
  </div>
);

Explore.propTypes = {
  push: propTypes.func,
}.isRequired;

export default Explore;
