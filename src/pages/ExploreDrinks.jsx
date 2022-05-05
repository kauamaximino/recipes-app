import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRandomDrink } from '../services/index';
import AppContext from '../contexts/AppContext';

function ExploreDrinks() {
  const {
    setRandomID, randomID,
  } = useContext(AppContext);

  useEffect(() => {
    const randomDrink = async () => {
      const response = await getRandomDrink();
      setRandomID(response[0].idDrink);
    };
    randomDrink();
  }, []);

  return (
    <div>
      <Header title="Explore Drinks" />
      <a href="/explore/drinks/ingredients">
        <p data-testid="explore-by-ingredient">By Ingredient</p>

      </a>
      <a href={ `/drinks/${randomID}` }>
        <p data-testid="explore-surprise">Surprise me!</p>

      </a>
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
