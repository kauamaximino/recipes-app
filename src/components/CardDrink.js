import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../contexts/AppContext';

function CardDrink() {
  const history = useHistory();
  const { recipesReturn } = useContext(AppContext);
  const twelve = 12;

  useEffect(() => {
    if (recipesReturn && recipesReturn.length === 1) {
      history.push(`drinks/${recipesReturn[0].idDrink}`);
    }
  }, [recipesReturn, history]);

  useEffect(() => {
    if (!recipesReturn) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }, [recipesReturn]);
  return (
    <div>
      {recipesReturn && recipesReturn.slice(0, twelve).map((drink, index) => (
        <div
          data-testid={ `${index}-recipe-card` }
          key={ drink.idDrink }
        >
          <h1 data-testid={ `${index}-card-name` }>{drink.strDrink}</h1>
          <img
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ))}
    </div>
  );
}

export default CardDrink;
