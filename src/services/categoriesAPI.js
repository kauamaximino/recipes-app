export const fetchFoodsCategories = async () => {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list').then((res) => res.json());
  return response;
};

export const filterCategoriesFoods = async (category) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`).then((res) => res.json());
  return response;
};

export const fetchDrinksCategories = async () => {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list').then((res) => res.json());
  return response.drinks;
};

export const filterCategoriesDrinks = async (category) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`).then((res) => res.json());
  return response;
};
