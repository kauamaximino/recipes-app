import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';
import { getFoodByIngredientList, getDrinks,
  getFoods, getAreaList, getDrinkByIngredientList } from '../services/index';

function AppProvider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [optionRadio, setOptionRadio] = useState('');
  const [inputSearch, setInputSearch] = useState('');
  const [recipesReturn, setRecipesReturn] = useState([]);
  const [cocktailsReturn, setCocktailsReturn] = useState([]);
  const [categoriesFood, setCategoriesFood] = useState([]);
  const [categoriesDrink, setCategoriesDrink] = useState([]);
  const [redirectDetailsDrinks, setRedirectDetailsDrinks] = useState(true);
  const [redirectDetailsFoods, setRedirectDetailsFoods] = useState(false);
  const [randomID, setRandomID] = useState([]);
  const [foodIngredientList, setFoodIngredientList] = useState();
  const [drinkIngredientList, setDrinkIngredientList] = useState([]);
  const [toggleFilterFood, setToggleFilterFood] = useState(true);
  const [toggleFilterDrink, setToggleFilterDrink] = useState(true);
  const [selectedCategoryFood, setSelectedCategoryFood] = useState('');
  const [selectedCategoryDrink, setSelectedCategoryDrink] = useState('');
  const [areaList, setAreaList] = useState([]);

  useEffect(() => {
    const firstRender = async () => {
      const response = await getFoods();
      if (toggleFilterFood) {
        setRecipesReturn(response);
      }
    };
    firstRender();
  }, [toggleFilterFood]);

  useEffect(() => {
    const firstRender = async () => {
      const response = await getDrinks();
      if (toggleFilterDrink) {
        setCocktailsReturn(response);
      }
    };
    firstRender();
  }, [toggleFilterDrink]);

  useEffect(() => {
    const getList = async () => {
      const response = await getAreaList();
      setAreaList(response.meals);
    };
    getList();
  }, []);

  useEffect(() => {
    const getList = async () => {
      const response = await getFoodByIngredientList();
      setFoodIngredientList(response.meals);
    };
    getList();
  }, []);

  useEffect(() => {
    const getList = async () => {
      const response = await getDrinkByIngredientList();
      setDrinkIngredientList(response.drinks);
    };
    getList();
  }, []);

  const data = {
    email,
    setEmail,
    password,
    setPassword,
    optionRadio,
    setOptionRadio,
    inputSearch,
    setInputSearch,
    recipesReturn,
    setRecipesReturn,
    cocktailsReturn,
    setCocktailsReturn,
    categoriesFood,
    setCategoriesFood,
    categoriesDrink,
    setCategoriesDrink,
    redirectDetailsDrinks,
    setRedirectDetailsDrinks,
    redirectDetailsFoods,
    setRedirectDetailsFoods,
    randomID,
    setRandomID,
    foodIngredientList,
    setFoodIngredientList,
    drinkIngredientList,
    setDrinkIngredientList,
    toggleFilterFood,
    setToggleFilterFood,
    toggleFilterDrink,
    setToggleFilterDrink,
    selectedCategoryFood,
    setSelectedCategoryFood,
    selectedCategoryDrink,
    setSelectedCategoryDrink,
    areaList,
    setAreaList,

  };

  return (
    <AppContext.Provider value={ data }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: propTypes.props,
}.isRequired;

export default AppProvider;
