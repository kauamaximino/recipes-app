import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import '../style/CategoriesFoods.css';

function DoneRecipes() {
  const history = useHistory();
  return (
    <div>
      <header>
        <Header title="Done Recipes" />
      </header>
      <main className="conteiner-category-food">
        <button
          className="btn-food"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => {
            history.push('*');
          } }
        >
          All

        </button>
        <button
          className="btn-food"
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => {
            history.push('*');
          } }
        >
          Foods
        </button>
        <button
          className="btn-food"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => {
            history.push('*');
          } }
        >
          Drinks
        </button>
      </main>
    </div>
  );
}

export default DoneRecipes;
