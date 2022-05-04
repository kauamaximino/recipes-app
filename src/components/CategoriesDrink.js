import React, { useEffect, useContext } from 'react';
import { fetchDrinksCategories } from '../services/categoriesAPI';
import AppContext from '../contexts/AppContext';

function CategoriesDrink() {
  const { categoriesDrink, setCategoriesDrink } = useContext(AppContext);
  const five = 5;

  useEffect(() => {
    const result = async () => {
      const response = await fetchDrinksCategories();
      setCategoriesDrink(response);
    };
    result();
  }, []);

  return (
    <div>
      {categoriesDrink && categoriesDrink.slice(0, five).map((category, index) => (
        <button
          key={ index }
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
        >
          {category.strCategory}
        </button>
      ))}

    </div>
  );
}

export default CategoriesDrink;
