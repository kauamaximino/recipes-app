import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Explore = ({ history }) => (
  <div>
    <Header title="Explore" />
    <button
      type="button"
      data-testid="explore-foods"
      onClick={ () => {
        history.push('/explore/foods');
      } }
    >
      Explore Foods

    </button>
    <button
      type="button"
      data-testid="explore-drinks"
      onClick={ () => {
        history.push('/explore/drinks');
      } }
    >
      Explore Drinks

    </button>
    <Footer />
  </div>
);

Explore.propTypes = {
  push: propTypes.func,
}.isRequired;

export default Explore;
