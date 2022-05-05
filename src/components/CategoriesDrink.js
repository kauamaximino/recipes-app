import React, { useEffect, useContext } from 'react';
import { fetchDrinksCategories, filterCategoriesDrinks } from '../services/categoriesAPI';
import AppContext from '../contexts/AppContext';

function CategoriesDrink() {
  const {
    categoriesDrink,
    setCategoriesDrink,
    setCocktailsReturn,
    setRedirectDetailsDrinks,
    setToggleFilterDrink,
  } = useContext(AppContext);
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
      {categoriesDrink && categoriesDrink.slice(0, five).map((category, index) => {
        let dataTest = '';
        if (category.strCategory === 'Shake') {
          dataTest = 'Milk / Float / Shake-category-filter';
        } else dataTest = `${category.strCategory}-category-filter`;
        return (
          <button
            key={ index }
            name={ index }
            type="button"
            data-testid={ dataTest }
            onClick={ async ({ target: { name } }) => {
              const { drinks } = await filterCategoriesDrinks(category.strCategory);
              console.log(name);
              setCocktailsReturn(drinks);
              setRedirectDetailsDrinks(false);
              if (name !== index) {
                setToggleFilterDrink((prevState) => !prevState);
              }
            } }
          >
            {category.strCategory}
          </button>
        );
      })}

    </div>
  );
}

export default CategoriesDrink;
