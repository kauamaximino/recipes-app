import React, { useContext, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AppContext from '../contexts/AppContext';
import '../style/CardFood.css';

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
    <div className="conteiner-food">
      {cocktailsReturn && cocktailsReturn.slice(0, twelve).map((drink, index) => (
        <Link
          key={ drink.idDrink }
          to={ `/drinks/${drink.idDrink}` }
          className="link-decoration"
        >
          <div
            className="shadow border food-card"
            data-testid={ `${index}-recipe-card` }
          >
            <figure className="div-img">
              <img
                className="img-food"
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
                data-testid={ `${index}-card-img` }
              />

            </figure>
            <p
              data-testid={ `${index}-card-name` }
              className="name-food"
            >
              {drink.strDrink}
            </p>
          </div>

        </Link>
      ))}
    </div>
  );
}

export default CardDrink;
