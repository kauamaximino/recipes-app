import React, { useEffect, useContext } from 'react';
import { fetchFoodsCategories, filterCategoriesFoods } from '../services/categoriesAPI';
import AppContext from '../contexts/AppContext';

function CategoriesFood() {
  const {
    categoriesFood,
    setCategoriesFood,
    setRecipesReturn,
    setRedirectDetailsFoods,
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
            console.log(meals);
            setRecipesReturn(meals);
            setRedirectDetailsFoods(false);
          } }
        >
          {category.strCategory}
        </button>
      ))}

    </div>
  );
}

export default CategoriesFood;
