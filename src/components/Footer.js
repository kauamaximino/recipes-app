import React from 'react';
import { Link } from 'react-router-dom';
import DrinkIcon from '../images/drinkIcon.svg';
import ExploreIcon from '../images/exploreIcon.svg';
import MealIcon from '../images/mealIcon.svg';
import '../Styles/Footer.css';

function Footer() {
  return (
    <footer
      className="footer"
      data-testid="footer"
    >
      <Link
        to="/drinks"
        data-testid="drinks-bottom-btn"
        src={ DrinkIcon }
      >
        <img src={ DrinkIcon } alt="ícone de bebidas" />
      </Link>

      <Link
        to="/explore"
        data-testid="explore-bottom-btn"
        src={ ExploreIcon }
      >
        <img src={ ExploreIcon } alt="ícone de explorar" />
      </Link>

      <Link
        to="/foods"
        data-testid="food-bottom-btn"
        src={ MealIcon }
      >
        <img src={ MealIcon } alt="ícone de comidas" />
      </Link>
    </footer>
  );
}

export default Footer;
