import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

function CardDrink() {
  const history = useHistory();
  const { cocktailsReturn, redirectDetailsDrinks } = useContext(AppContext);
  const twelve = 12;

  useEffect(() => {
    if (redirectDetailsDrinks && cocktailsReturn && cocktailsReturn.length === 1) {
      history.push(`drinks/${cocktailsReturn[0].idDrink}`);
    }
  }, [cocktailsReturn, history, redirectDetailsDrinks]);

  useEffect(() => {
    if (!cocktailsReturn) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [cocktailsReturn]);
  return (
    <div>
      {cocktailsReturn && cocktailsReturn.slice(0, twelve).map((drink, index) => (
        <Link
          key={ drink.idDrink }
          to={ `/drinks/${drink.idDrink}` }
        >
          <div
            data-testid={ `${index}-recipe-card` }
          >
            <h1 data-testid={ `${index}-card-name` }>{drink.strDrink}</h1>
            <img
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              data-testid={ `${index}-card-img` }
            />
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CardDrink;
