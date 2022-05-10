import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getRandomMeal } from '../services/index';
import AppContext from '../contexts/AppContext';
import '../style/Profile.css';

function ExploreFoods() {
  const {
    setRandomID, randomID,
  } = useContext(AppContext);

  useEffect(() => {
    const randomMeal = async () => {
      const response = await getRandomMeal();
      setRandomID(response[0].idMeal);
    };
    randomMeal();
  }, []);

  return (
    <div>
      <Header title="Explore Foods" />
      <div className="conteiner-profile">
        <a className="link-surprise" href="/explore/foods/ingredients">
          <p data-testid="explore-by-ingredient">By Ingredient</p>

        </a>
        <a className="link-surprise" href="/explore/foods/nationalities">
          <p data-testid="explore-by-nationality">By Nationality</p>

        </a>
        <a className="link-surprise" href={ `/foods/${randomID}` }>
          <p data-testid="explore-surprise">Surprise me!</p>

        </a>
      </div>
      <Footer />
    </div>
  );
}

export default ExploreFoods;
