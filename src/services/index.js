const FOOD_INGREDIENT = (ingredient) => (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
const FOOD_NAME = (name) => (`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
const FOOD_LETTER = (letter) => (`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
const DRINK_INGREDIENT = (ingredient) => (`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
const DRINK_NAME = (name) => (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
const DRINK_LETTER = (letter) => (`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);

export const getRandomMeal = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
  const data = await response.json();
  return response.ok ? Promise.resolve(data.meals) : Promise.reject(json);
};

export const getRandomDrink = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const data = await response.json();
  return response.ok ? Promise.resolve(data.drinks) : Promise.reject(json);
};

export const getFoodsCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?c=list');
  const data = await response.json();
  return response.ok ? Promise.resolve(data) : Promise.reject(json);
};

export const getDrinksCategories = async () => {
  const response = await fetch('https://ww.thecocktaildb.com/api/json/v1/1/filter.php?c=list');
  const data = await response.json();
  return response.ok ? Promise.resolve(data) : Promise.reject(json);
};

export const getFoodById = async (id) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return response.ok ? Promise.resolve(data.meals[0]) : Promise.reject(json);
};

export const getDrinkById = async (id) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  const data = await response.json();
  return response.ok ? Promise.resolve(data.drinks[0]) : Promise.reject(json);
};

export const getFoods = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return response.ok ? Promise.resolve(data.meals) : Promise.reject(json);
};

export const getDrinks = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const data = await response.json();
  return response.ok ? Promise.resolve(data.drinks) : Promise.reject(json);
};

const getFoodByIngredient = async (ingredient) => {
  const response = await fetch(FOOD_INGREDIENT(ingredient));
  const data = await response.json();
  return response.ok ? Promise.resolve(data.meals) : Promise.reject(json);
};

const getFoodByName = async (name) => {
  const response = await fetch(FOOD_NAME(name));
  const data = await response.json();
  return response.ok ? Promise.resolve(data.meals) : Promise.reject(json);
};

const getFoodByLetter = async (letter) => {
  const response = await fetch(FOOD_LETTER(letter));
  const data = await response.json();
  return response.ok ? Promise.resolve(data.meals) : Promise.reject(json);
};

const getDrinkByIngredient = async (ingredient) => {
  const response = await fetch(DRINK_INGREDIENT(ingredient));
  const data = await response.json();
  return response.ok ? Promise.resolve(data.drinks) : Promise.reject(json);
};

const getDrinkByName = async (name) => {
  const response = await fetch(DRINK_NAME(name));
  const data = await response.json();
  return response.ok ? Promise.resolve(data.drinks) : Promise.reject(json);
};

const getDrinkByLetter = async (letter) => {
  const response = await fetch(DRINK_LETTER(letter));
  const data = await response.json();
  return response.ok ? Promise.resolve(data.drinks) : Promise.reject(json);
};

const handleFoods = async (radio, input) => {
  if (radio === 'ingredient') {
    const resultFoodIngredient = await getFoodByIngredient(input);
    return resultFoodIngredient;
  }
  if (radio === 'name') {
    const resultName = await getFoodByName(input);
    return resultName;
  }
  if (radio === 'letter' && input.length === 1) {
    const resultLetter = await getFoodByLetter(input);
    return resultLetter;
  }
  if (radio === 'letter' && input.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  } else {
    global.alert('Sorry, we haven\'t found any recipes for these filters');
  }
};

const handleDrinks = async (radio, input) => {
  if (radio === 'ingredient') {
    const resultIngredient = await getDrinkByIngredient(input);
    return resultIngredient;
  }
  if (radio === 'name') {
    const resultName = await getDrinkByName(input);
    return resultName;
  }
  if (radio === 'letter' && input.length === 1) {
    const resultLetter = await getDrinkByLetter(input);
    return resultLetter;
  }
  if (radio === 'letter' && input.length > 1) {
    global.alert('Your search must have only 1 (one) character');
  } else {
    global.alert('Sorry, we haven\'t found any recipes for these filters');
  }
};

export const handleAPI = async (radio, input, title) => {
  if (title === 'Foods') {
    const response = await handleFoods(radio, input);
    return response;
  }

  if (title === 'Drinks') {
    const response = await handleDrinks(radio, input);
    return response;
  }
};
