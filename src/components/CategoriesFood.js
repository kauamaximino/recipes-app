import React, { useEffect, useContext } from 'react';
import { fetchFoodsCategories, filterCategoriesFoods } from '../services/categoriesAPI';
import { getFoods } from '../services/index';
import AppContext from '../contexts/AppContext';

function CategoriesFood() {
  const {
    categoriesFood,
    setCategoriesFood,
    setRecipesReturn,
    setRedirectDetailsFoods,
    setToggleFilterFood,
    selectedCategoryFood,
    setSelectedCategoryFood,
  } = useContext(AppContext);
  const five = 5;

  useEffect(() => {
    const result = async () => {
      const { meals } = await fetchFoodsCategories();
      setCategoriesFood(meals);
    };
    result();
  }, []);

  return (
    <div>
      {categoriesFood && categoriesFood.slice(0, five).map((category, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ async () => {
            const { meals } = await filterCategoriesFoods(category.strCategory);
            setRecipesReturn(meals);
            setRedirectDetailsFoods(false);
            await setSelectedCategoryFood(category.strCategory);
            if (selectedCategoryFood === ''
            || selectedCategoryFood === category.strCategory) {
              setToggleFilterFood((prevState) => !prevState);
            }
          } }
        >
          {category.strCategory}
        </button>
      ))}
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ async () => {
          const response = await getFoods();
          setRecipesReturn(response);
        } }
      >
        All
      </button>
    </div>
  );
}

export default CategoriesFood;
