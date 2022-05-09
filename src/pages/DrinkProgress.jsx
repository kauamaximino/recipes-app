import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { getDrinkById } from '../services/index';

const DrinksProgress = ({ match: { params: { id } } }) => {
  const [drinkProgress, setDrinkProgress] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);

  useEffect(() => {
    const recipeApi = async () => {
      const data = await getDrinkById(id);
      // Consultado em:https://github.com/tryber/sd-019-c-project-recipes-app/blob/group-25-progress-screens/src/pages/DrinkDetails.jsx
      const keys = Object.entries(data);
      const filteredIng = keys
        .filter((i) => i[0].includes('strIngredient') && i[1])
        .map((i) => i[1]);
      const filteredMea = keys
        .filter((i) => i[0].includes('strMeasure') && i[1])
        .map((i) => i[1]);
      setIngredients(filteredIng);
      setDrinkProgress(data);
      setMeasure(filteredMea);
      console.log(data);
    };
    recipeApi();
  }, []);

  return (
    <div>
      <img
        src={ drinkProgress.strDrinkThumb }
        data-testid="recipe-photo"
        alt={ drinkProgress.strDrink }
      />
      <h2 data-testid="recipe-title">{drinkProgress.strDrink}</h2>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <h3 data-testid="recipe-category">{drinkProgress.strAlcoholic}</h3>
      {Object.values(ingredients).map((ingredient, i) => (
        <label
          htmlFor="checkbox"
          key={ i }
          data-testid={ `${i}-ingredient-step` }
        >
          <input
            type="checkbox"
            name="checkbox"
            key={ i }
          />
          {`${ingredient} - ${measure[i]}`}

        </label>
      ))}
      <p data-testid="instructions">{drinkProgress.strInstructions}</p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finish Receipe
      </button>
    </div>
  );
};

DrinksProgress.propTypes = {
  id: propTypes.string,
}.isRequired;

export default DrinksProgress;
