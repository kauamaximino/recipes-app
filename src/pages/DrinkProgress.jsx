import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getDrinkById } from '../services/index';
import getSavedInLocalStorage from '../helpers/getLocalStorage';
import saveLocalStorage from '../helpers/saveLocalStorage';

const copy = require('clipboard-copy');

const DrinksProgress = ({ match: { params: { id } } }) => {
  const [drinkProgress, setDrinkProgress] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);
  const [ingredientsUse, setIngredientsUse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [changeState, setChangeState] = useState(false);
  const [shared, setShared] = useState(false);
  const blackHeart = '../images/blackHeartIcon.svg';
  const whiteHeart = '../images/whiteHeartIcon.svg';
  const [handleFavorite, setHandleFavorite] = useState();
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
      setLoading(false);
      const returnLS = getSavedInLocalStorage('inProgressRecipes');
      if (returnLS) {
        const { cocktails } = JSON.parse(returnLS);
        const checks = document.querySelectorAll('input');
        checks.forEach((check) => {
          if (cocktails[id].includes(check.value)) {
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
      const { cocktails } = JSON.parse(ingredientCheck);
      if (cocktails[id] && cocktails[id].length === allInputs.length) {
        setButtonDisabled(false);
      } else {
        setButtonDisabled(true);
      }
    }
  },
  [loading, changeState, id]);
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
      const cocktails = {
        [id]: [value],
      };
      saveLocalStorage('inProgressRecipes', { cocktails });
    } else {
      const { cocktails } = JSON.parse(progressRecipes);
      const findIngre = cocktails[id].find((ing) => ing === value);
      if (cocktails[id] && !findIngre) {
        cocktails[id].push(value);
        saveLocalStorage('inProgressRecipes', { cocktails });
      }
      if (cocktails[id] && findIngre) {
        cocktails[id] = cocktails[id].filter((ing) => ing !== value);
        saveLocalStorage('inProgressRecipes', { cocktails });
      } else {
        saveLocalStorage('inProgressRecipes', { cocktails });
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
      copy(`http://localhost:3000/drinks/${id}`);
      setTimeout(() => {
        setShared(false);
      }, time);
    }
  }, [shared]);
  const favorite = () => {
    const objFavorite = {
      id,
      type: 'drink',
      nationality: '',
      category: drinkProgress.strCategory,
      alcoholicOrNot: drinkProgress.strAlcoholic,
      name: drinkProgress.strDrink,
      image: drinkProgress.strDrinkThumb,
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
    <div>
      <img
        src={ drinkProgress.strDrinkThumb }
        data-testid="recipe-photo"
        alt={ drinkProgress.strDrink }
      />
      <h2 data-testid="recipe-title">{drinkProgress.strDrink}</h2>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => setShared(true) }
      >
        Share
      </button>
      {shared && (
        <p>
          Link copied!
        </p>
      )}
      <button
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
            value={ ingredient }
            onClick={ (event) => {
              setIngredientsLocalStorage(event);
              setChangeState(!changeState);
            } }
          />
          {`${ingredient} - ${measure[i]}`}
        </label>
      ))}
      <p data-testid="instructions">{drinkProgress.strInstructions}</p>
      <Link
        to="/done-recipes"
      >
        <button
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
DrinksProgress.propTypes = {
  id: propTypes.string,
}.isRequired;
export default DrinksProgress;
