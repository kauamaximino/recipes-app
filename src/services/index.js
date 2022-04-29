const FOOD_INGREDIENT = (ingredient) => (`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
const FOOD_NAME = (name) => (`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
const FOOD_LETTER = (letter) => (`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
const DRINK_INGREDIENT = (ingredient) => (`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
const DRINK_NAME = (name) => (`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
const DRINK_LETTER = (letter) => (`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`);

export const getFoodByIngredient = async (ingredient) => {
  const response = await fetch(FOOD_INGREDIENT(ingredient));
  const data = await response.json();
  return response.ok ? Promise.resolve(data.meals) : Promise.reject(json);
};

export const getFoodByName = async (name) => {
  const response = await fetch(FOOD_NAME(name));
  const data = await response.json();
  return response.ok ? Promise.resolve(data.meals) : Promise.reject(json);
};

export const getFoodByLetter = async (letter) => {
  const response = await fetch(FOOD_LETTER(letter));
  const data = await response.json();
  return response.ok ? Promise.resolve(data.meals) : Promise.reject(json);
};

export const getDrinkByIngredient = async (ingredient) => {
  const response = await fetch(DRINK_INGREDIENT(ingredient));
  const data = await response.json();
  return response.ok ? Promise.resolve(data.meals) : Promise.reject(json);
};

export const getDrinkByName = async (name) => {
  const response = await fetch(DRINK_NAME(name));
  const data = await response.json();
  return response.ok ? Promise.resolve(data.meals) : Promise.reject(json);
};

export const getDrinkByLetter = async (letter) => {
  const response = await fetch(DRINK_LETTER(letter));
  const data = await response.json();
  return response.ok ? Promise.resolve(data.meals) : Promise.reject(json);
};
