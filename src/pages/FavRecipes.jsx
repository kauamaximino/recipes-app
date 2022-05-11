import React from 'react';
import Header from '../components/Header';

function FavRecipes() {
  return (
    <div>

      <header>
        <Header title="Favorite Recipes" />
      </header>
      <main className="conteiner-category-food">
        <button
          className="btn-food"
          type="button"
          data-testid="filter-by-all-btn"
        >
          All

        </button>
        <button
          className="btn-food"
          type="button"
          data-testid="filter-by-food-btn"
        >
          Foods
        </button>
        <button
          className="btn-food"
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </main>
    </div>
  );
}

export default FavRecipes;
