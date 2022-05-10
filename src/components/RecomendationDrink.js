import React, { useContext, useEffect } from 'react';
import AppContext from '../contexts/AppContext';
import '../style/Recomendation.css';
// import { useHistory } from 'react-router-dom';

function RecomendationDrink() {
//   const history = useHistory();
//   const { recipesReturn } = useContext(AppContext);
  const six = 6;
  const { cocktailsReturn } = useContext(AppContext);

  useEffect(() => {
    if (!cocktailsReturn) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [cocktailsReturn]);

  return (
    <div className="div-father img-thumbnail">
      {cocktailsReturn && cocktailsReturn.slice(0, six).map((recipe, index) => (
        <div
          className="recomendation-card"
          data-testid={ `${index}-recomendation-card` }
          key={ recipe.idDrink }
        >
          <h1
            className="display-6 title-recomendation"
            data-testid={ `${index}-recomendation-title` }
          >
            {recipe.strDrink}
          </h1>
          <img
            className="recomendation-card-img"
            src={ recipe.strDrinkThumb }
            alt={ recipe.strDrink }
          />
        </div>
      ))}
    </div>
  );
}

export default RecomendationDrink;
