import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { getFoodById } from '../services/index';

const FoodsProgress = ({ match: { params: { id } } }) => {
  const [foodProgress, setFoodProgress] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);

  useEffect(() => {
    const recipeApi = async () => {
      const data = await getFoodById(id);
      // Consultado em:https://github.com/tryber/sd-019-c-project-recipes-app/blob/group-25-progress-screens/src/pages/DrinkDetails.jsx
      const keys = Object.entries(data);
      const filteredIng = keys
        .filter((i) => i[0].includes('strIngredient') && i[1])
        .map((i) => i[1]);
      const filteredMea = keys
        .filter((i) => i[0].includes('strMeasure') && i[1])
        .map((i) => i[1]);
      setIngredients(filteredIng);
      setFoodProgress(data);
      setMeasure(filteredMea);
      console.log(data);
      console.log('ing', filteredIng);
      console.log('mea', filteredMea);
    };
    recipeApi();
  }, []);

  return (
    <div>
      <img
        src={ foodProgress.strMealThumb }
        data-testid="recipe-photo"
        alt={ foodProgress.strMeal }
      />
      <h2 data-testid="recipe-title">{foodProgress.strMeal}</h2>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <h3 data-testid="recipe-category">{foodProgress.strCategory}</h3>
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
      <p data-testid="instructions">{foodProgress.strInstructions}</p>
      <button
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finish Receipe
      </button>
    </div>
  );
};

FoodsProgress.propTypes = {
  id: propTypes.string,
}.isRequired;

export default FoodsProgress;
