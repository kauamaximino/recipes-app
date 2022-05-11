import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getFoodById } from '../services/index';
import getSavedInLocalStorage from '../helpers/getLocalStorage';
import saveLocalStorage from '../helpers/saveLocalStorage';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../style/Details.css';

const copy = require('clipboard-copy');

const FoodsProgress = ({ match: { params: { id } } }) => {
  const [mealProgress, setMealProgress] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [ingredientsUse, setIngredientsUse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [changeState, setChangeState] = useState(false);
  const [shared, setShared] = useState(false);

  const [handleFavorite, setHandleFavorite] = useState();
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
      setMealProgress(data);
      setMeasure(filteredMea);
      setLoading(false);
      const returnLS = getSavedInLocalStorage('inProgressRecipes');
      if (returnLS) {
        const { meals } = JSON.parse(returnLS);
        const checks = document.querySelectorAll('input');
        checks.forEach((check) => {
          if (meals[id]?.includes(check.value)) {
            check.checked = true;
          } else {
            check.checked = false;
          }
        });
      }
    };
    recipeApi();
  }, []);

  useEffect(() => {
    const ingredientCheck = getSavedInLocalStorage('inProgressRecipes');
    if (!loading && ingredientCheck) {
      const allInputs = document.querySelectorAll('input');
      const { meals } = JSON.parse(ingredientCheck);
      if (meals[id] && meals[id].length === allInputs.length) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }
  }, [loading, changeState, id]);

  const setIngredientsLocalStorage = ({ target: { value } }) => {
    const findIng = ingredientsUse.find((ing) => ing === value);
    if (!findIng) {
      setIngredientsUse([...ingredientsUse, value]);
    } else {
      setIngredientsUse(
        ingredientsUse.filter((ing) => ing !== value),
      );
    }
    const progressRecipes = getSavedInLocalStorage('inProgressRecipes');
    if (!progressRecipes) {
      const meals = {
        [id]: [value],
      };
      saveLocalStorage('inProgressRecipes', { meals });
    } else {
      const { meals } = JSON.parse(progressRecipes);
      const findIngre = meals[id].find((ing) => ing === value);
      if (meals[id] && !findIngre) {
        meals[id].push(value);
        saveLocalStorage('inProgressRecipes', { meals });
      }
      if (meals[id] && findIngre) {
        meals[id] = meals[id].filter((ing) => ing !== value);
        saveLocalStorage('inProgressRecipes', { meals });
      } else {
        saveLocalStorage('inProgressRecipes', { meals });
      }
    }
  };
  useEffect(() => {
    const recipesFavorite = getSavedInLocalStorage('favoriteRecipes');
    if (recipesFavorite === null || recipesFavorite === undefined) {
      setHandleFavorite(whiteHeart);
    } else if (recipesFavorite.includes(id)) {
      setHandleFavorite(blackHeart);
    } else {
      setHandleFavorite(whiteHeart);
    }
  }, []);
  const time = 2000;
  useEffect(() => {
    if (shared) {
      copy(`http://localhost:3000/foods/${id}`);
      setTimeout(() => {
        setShared(false);
      }, time);
    }
  }, [shared]);
  const favorite = () => {
    const objFavorite = {
      id,
      type: 'food',
      nationality: mealProgress.strArea,
      category: mealProgress.strCategory,
      alcoholicOrNot: '',
      name: mealProgress.strMeal,
      image: mealProgress.strMealThumb,
    };
    const recipesFavorite = getSavedInLocalStorage('favoriteRecipes');
    if (recipesFavorite === null) {
      saveLocalStorage('favoriteRecipes', [objFavorite]);
      setHandleFavorite(blackHeart);
    } else if (recipesFavorite.includes(id)) {
      const PreviousFavorite = JSON.parse(recipesFavorite);
      const newFavorite = PreviousFavorite.filter((reci) => reci.id !== id);
      setHandleFavorite(whiteHeart);
      saveLocalStorage('favoriteRecipes', newFavorite);
    } else {
      const previousFavorite = JSON.parse(recipesFavorite);
      previousFavorite.push(objFavorite);
      setHandleFavorite(blackHeart);
      saveLocalStorage('favoriteRecipes', previousFavorite);
    }
  };
  return (
    <div className="conteiner-geral">
      <img
        className="img-details img-thumbnail"
        src={ mealProgress.strMealThumb }
        data-testid="recipe-photo"
        alt={ mealProgress.strMeal }
      />
      <div className="conteiner-details">
        <h2
          className="display-3 title-recipe"
          data-testid="recipe-title"
        >
          {mealProgress.strMeal}
        </h2>
        <button
          className="icon-btn"
          data-testid="share-btn"
          type="button"
          onClick={ () => setShared(true) }
        >
          <img src={ shareIcon } alt="share" />
        </button>
        {shared && (
          <p>
            Link copied!
          </p>
        )}
        <button
          className="icon-btn"
          src={ handleFavorite }
          data-testid="favorite-btn"
          type="button"
          onClick={ favorite }
        >
          <img
            src={ handleFavorite }
            alt="favorite"
          />
        </button>
      </div>
      <h3
        className="display-8 title-category"
        data-testid="recipe-category"
      >
        {mealProgress.strCategory}
      </h3>
      <p className="display-6 title-ingredients">Ingredients</p>
      <div className="form-check d-flex flex-column conteiner-ingredients">
        {Object.values(ingredients).map((ingredient, i) => (
          <label
            className="form-check-label"
            htmlFor="checkbox"
            key={ i }
            data-testid={ `${i}-ingredient-step` }
          >
            <input
              className="form-check-label me-2"
              type="checkbox"
              name="checkbox"
              value={ ingredient }
              onClick={ (event) => {
                setIngredientsLocalStorage(event);
                setChangeState(!changeState);
              } }
            />
            {`${ingredient} - ${measure[i]}`}
          </label>
        ))}
      </div>
      <p className="display-6 title-ingredients">Instructions</p>
      <div className="conteiner-ingredients">
        <p
          className="text-justify"
          data-testid="instructions"
        >
          {mealProgress.strInstructions}
        </p>
      </div>
      <Link
        to="/done-recipes"
      >
        <button
          className="button-start"
          data-testid="finish-recipe-btn"
          type="button"
          disabled={ buttonDisabled }
        >
          Finish Receipe
        </button>
      </Link>
    </div>
  );
};
FoodsProgress.propTypes = {
  id: propTypes.string,
}.isRequired;
export default FoodsProgress;
