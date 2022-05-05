import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

function CardFood() {
  const history = useHistory();
  const { recipesReturn, redirectDetailsFoods } = useContext(AppContext);
  const twelve = 12;

  useEffect(() => {
    if (redirectDetailsFoods && recipesReturn && recipesReturn.length === 1) {
      history.push(`foods/${recipesReturn[0].idMeal}`);
    }
  }, [recipesReturn, history, redirectDetailsFoods]);

  useEffect(() => {
    if (!recipesReturn) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [recipesReturn]);

  return (
    <div>
      {recipesReturn && recipesReturn.slice(0, twelve).map((recipe, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ recipe.idMeal }
        >
          <h1 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h1>
          <img
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ))}
    </div>
  );
}

export default CardFood;
