/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import propTypes from 'prop-types';
import { getFoodById, getDrinks } from '../services/index';
import RecomendationDrink from '../components/RecomendationDrink';
import AppContext from '../contexts/AppContext';
import '../style/Details.css';
import getSavedInLocalStorage from '../helpers/getLocalStorage';
import saveLocalStorage from '../helpers/saveLocalStorage';
import shareIcon from '../images/shareIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';

const copy = require('clipboard-copy');

function DetailsReceipe({ match: { params: { id } } }) {
  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState({});
  const [measure, setmeasure] = useState({});
  const { setCocktailsReturn } = useContext(AppContext);
  const [recipeDone, setRecipeDone] = useState([]);
  const [render, setRender] = useState(true);
  const [handleEstate, setHandleEstate] = useState('StartRecipe');
  const [handleFavorite, setHandleFavorite] = useState(whiteHeart);
  const history = useHistory();
  const [shared, setShared] = useState(false);

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
      const recipesFinished = getSavedInLocalStorage('doneRecipes');
      setRecipeDone(recipesFinished);
    };
    firstRender();
  }, []);

  useEffect(() => {
    if (recipeDone === null) {
      setRender(true);
    } else {
      const findRecipe = Object.values(recipeDone).find((reci) => reci.id === id);
      setRender(findRecipe);
    }
  }, [recipeDone]);

  useEffect(() => {
    const recipesFavorite = getSavedInLocalStorage('favoriteRecipes');
    if (recipesFavorite === null || recipesFavorite === undefined) {
      setHandleFavorite(whiteHeart);
    } else if (recipesFavorite.includes(id)) {
      setHandleFavorite(blackHeart);
    } else {
      setHandleFavorite(whiteHeart);
    }
    const recipesProgress = getSavedInLocalStorage('inProgressRecipes');
    if (recipesProgress === null || recipesProgress === undefined) {
      setHandleEstate('Start Recipe');
    } else if (recipesProgress.includes(id)) {
      setHandleEstate('Continue Recipe');
    } else {
      setHandleEstate('Start Recipe');
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
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
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
        src={ recipe.strMealThumb }
        data-testid="recipe-photo"
        alt={ recipe.strMeal }
      />
      <div className="conteiner-details">
        <h2
          className="display-3 title-recipe"
          data-testid="recipe-title"
        >
          {recipe.strMeal}
        </h2>
        <div className="conteiner-button">
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
      </div>

      <div>
        <h3
          className="display-8 title-category"
          data-testid="recipe-category"
        >
          {recipe.strCategory}
        </h3>
        <p className="display-6 title-ingredients">Ingredients</p>
        <div className="conteiner-ingredients">
          {Object.values(ingredients).map((ingredient, i) => (
            <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
              {`${ingredient} - ${measure[i]}`}
            </li>
          ))}
        </div>
      </div>
      <p className="display-6 title-ingredients">Instructions</p>
      <div className="conteiner-ingredients">
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <p className="display-6 title-ingredients">Video</p>
      <video className="video" data-testid="video" width="320" height="240" controls>
        <source src={ recipe.strYoutube } type="video/mp4" />
        <track kind="captions" src={ recipe.strYoutube } />
      </video>
      <RecomendationDrink />
      {render && (
        <button
          data-testid="start-recipe-btn"
          onClick={ () => {
            history.push(`/foods/${id}/in-progress`);
          } }
          className="button-start"
          type="button"
        >
          {handleEstate}
        </button>
      )}
    </div>
  );
}
DetailsReceipe.propTypes = {
  id: propTypes.string,
}.isRequired;
export default DetailsReceipe;
