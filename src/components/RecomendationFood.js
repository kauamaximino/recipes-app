import React, { useContext, useEffect } from 'react';
import AppContext from '../contexts/AppContext';
import '../Styles/Recomendation.css';
// import { useHistory } from 'react-router-dom';

function RecomendationFood() {
//   const history = useHistory();
//   const { recipesReturn } = useContext(AppContext);
  const six = 6;
  const { recipesReturn } = useContext(AppContext);

  useEffect(() => {
    if (!recipesReturn) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [recipesReturn]);

  return (
    <div className="div-father">
      {recipesReturn && recipesReturn.slice(0, six).map((recipe, index) => (
        <div
          className="recomendation-card"
          data-testid={ `${index}-recomendation-card` }
          key={ recipe.idMeal }
        >
          <h1 data-testid={ `${index}-recomendation-title` }>{recipe.strMeal}</h1>
          <img
            className="recomendation-card-img"
            src={ recipe.strMealThumb }
            alt={ recipe.strMeal }
          />
        </div>
      ))}
    </div>
  );
}

export default RecomendationFood;
