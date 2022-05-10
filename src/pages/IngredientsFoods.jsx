import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../contexts/AppContext';
import { getFoodByIngredient } from '../services/index';
import '../style/IngredientesFoods.css';

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
      <div className="conteiner-ingredients-explore">
        { foodIngredientList && foodIngredientList.slice(0, twelve)
          .map((ingredient, index) => {
            const { strIngredient: name } = ingredient;
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
                    src={ `https://www.themealdb.com/images/ingredients/${name}-Small.png` }
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

export default IngredientsFoods;
