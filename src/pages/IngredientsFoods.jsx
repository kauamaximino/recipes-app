import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../contexts/AppContext';
import { getFoodByIngredient } from '../services/index';

function IngredientsFoods() {
  const history = useHistory();
  const { foodIngredientList, setRecipesReturn } = useContext(AppContext);
  const twelve = 12;

  const handleClick = async (name) => {
    const resultFoodIngredient = await getFoodByIngredient(name);
    setRecipesReturn(resultFoodIngredient);
    history.push('/foods');
  };

  return (
    <div>
      <Header title="Explore Ingredients" />
      { foodIngredientList && foodIngredientList.slice(0, twelve)
        .map((ingredient, index) => {
          const { strIngredient: name } = ingredient;
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
                  src={ `https://www.themealdb.com/images/ingredients/${name}-Small.png` }
                />

              </div>

            </button>

          );
        })}
      <Footer />
    </div>
  );
}

export default IngredientsFoods;
