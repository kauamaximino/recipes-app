import React, { useState } from 'react';
import propTypes from 'prop-types';
import AppContext from './AppContext';

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
