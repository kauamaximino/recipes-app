/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import propTypes from 'prop-types';
import { getFoodById, getDrinks } from '../services/index';
import RecomendationDrink from '../components/RecomendationDrink';
import AppContext from '../contexts/AppContext';
import '../Styles/Details.css';

function DetailsReceipe({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState({});
  const [measure, setmeasure] = useState({});
  const { setCocktailsReturn } = useContext(AppContext);

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
      setRecipe(data);
      setmeasure(filteredMea);
    };
    recipeApi();
  }, []);

  useEffect(() => {
    const firstRender = async () => {
      const response = await getDrinks();
      setCocktailsReturn(response);
      console.log(response);
    };
    firstRender();
  }, []);

  return (
    <div>
      <img
        src={ recipe.strMealThumb }
        data-testid="recipe-photo"
        alt={ recipe.strMeal }
      />
      <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
      <button data-testid="share-btn" type="button">Share</button>
      <button data-testid="favorite-btn" type="button">Favorite</button>
      <h3 data-testid="recipe-category">{recipe.strCategory}</h3>
      {Object.values(ingredients).map((ingredient, i) => (
        <p key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
          {`${ingredient} - ${measure[i]}`}
        </p>
      ))}
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <video data-testid="video" width="320" height="240" controls>
        <source src={ recipe.strYoutube } type="video/mp4" />
        <track kind="captions" src={ recipe.strYoutube } />
      </video>
      <RecomendationDrink />
      <button
        className="button-start"
        type="button"
        data-testid="start-recipe-btn"
      >
        Start Recipe
      </button>
    </div>
  );
}

DetailsReceipe.propTypes = {
  id: propTypes.string,
}.isRequired;

export default DetailsReceipe;
