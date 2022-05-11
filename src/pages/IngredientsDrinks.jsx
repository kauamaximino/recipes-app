import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../contexts/AppContext';
import { getDrinkByIngredient } from '../services/index';
import '../style/IngredientesFoods.css';

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
      <div className="conteiner-ingredients-explore">

        { drinkIngredientList && drinkIngredientList.slice(0, twelve)
          .map((ingredient, index) => {
            const { strIngredient1: name } = ingredient;
            return (
              <button
                className="btn-exp-ing"
                type="button"
                key={ index }
                onClick={ () => handleClick(name) }
              >
                <div data-testid={ `${index}-ingredient-card` }>
                  <img
                    data-testid={ `${index}-card-img` }
                    alt={ name }
                    src={ `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png` }
                  />
                  <p
                    className="text-explore-ing"
                    data-testid={ `${index}-card-name` }
                  >
                    {name}

                  </p>
                </div>
              </button>
            );
          })}
      </div>
      <Footer />
    </div>
  );
}

export default IngredientsDrinks;
