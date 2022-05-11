import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import '../style/CardFood.css';

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
    <div className="conteiner-food">
      {recipesReturn && recipesReturn.slice(0, twelve).map((recipe, index) => (
        <Link
          key={ recipe.idMeal }
          to={ `/foods/${recipe.idMeal}` }
          className="link-decoration"
        >
          <div
            className="shadow border food-card"
            data-testid={ `${index}-recipe-card` }
          >
            <figure className="div-img">

              <img
                className="img-food"
                src={ recipe.strMealThumb }
                alt={ recipe.strMeal }
                data-testid={ `${index}-card-img` }
              />
            </figure>
            <p
              className="name-food"
              data-testid={ `${index}-card-name` }
            >
              {recipe.strMeal}

            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CardFood;
