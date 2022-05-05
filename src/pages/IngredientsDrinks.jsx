import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../contexts/AppContext';
import { getDrinkByIngredient } from '../services/index';

function IngredientsDrinks() {
  const history = useHistory();
  const { drinkIngredientList, setCocktailsReturn } = useContext(AppContext);
  const twelve = 12;

  const handleClick = async (ingredient) => {
    const resultDrinkIngredient = await getDrinkByIngredient(ingredient);
    setCocktailsReturn(resultDrinkIngredient);
    history.push('/drinks');
  };
  return (
    <div>
      <Header title="Explore Ingredients" />
      { drinkIngredientList && drinkIngredientList.slice(0, twelve)
        .map((ingredient, index) => {
          const { strIngredient1: name } = ingredient;
          return (
            <button
              type="button"
              key={ index }
              onClick={ () => handleClick(name) }
            >
              <div data-testid={ `${index}-ingredient-card` }>
                <p
                  data-testid={ `${index}-card-name` }
                >
                  {name}

                </p>
                <img
                  data-testid={ `${index}-card-img` }
                  alt={ name }
                  src={ `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png` }
                />
              </div>
            </button>
          );
        })}
      <Footer />
    </div>
  );
}

export default IngredientsDrinks;
