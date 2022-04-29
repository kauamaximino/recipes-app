import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { getFoodByIngredient,
  getFoodByName,
  getFoodByLetter,
} from '../services/index';

function Search() {
  const [optionRadio, setOptionRadio] = useState('');
  const [inputSearch, setInputSearch] = useState('');

  const handleRadioButton = ({ target: { value } }) => {
    setOptionRadio(value);
  };

  const handleSearch = async (radio, input) => {
    if (radio === 'ingredient') {
      const result = await getFoodByIngredient(input);
      return result;
    }

    if (radio === 'name') {
      const result = await getFoodByName(input);
      return result;
    }

    if (radio === 'letter' && input.length === 1) {
      const result = await getFoodByLetter(input);
      return result;
    }
    if (radio === 'letter' && input.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      setInputSearch('');
    }
  };

  return (
    <div>
      <div>

        <input
          type="text"
          data-testid="search-input"
          onChange={ ({ target: { value } }) => setInputSearch(value) }
        />
        <div>

          <label htmlFor="radio">
            <input
              type="radio"
              data-testid="ingredient-search-radio"
              name="radio"
              value="ingredient"
              onChange={ handleRadioButton }
            />
            Ingredient
          </label>
        </div>
        <div>

          <label htmlFor="radio">
            <input
              type="radio"
              data-testid="name-search-radio"
              name="radio"
              value="name"
              onChange={ handleRadioButton }
            />
            Name
          </label>
        </div>
        <div>

          <label htmlFor="radio">
            <input
              type="radio"
              data-testid="first-letter-search-radio"
              name="radio"
              value="letter"
              onChange={ handleRadioButton }
            />
            First Letter
          </label>
        </div>

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ async () => handleSearch(optionRadio, inputSearch) }
        >
          Search

        </button>
      </div>

    </div>
  );
}

Search.propTypes = {
  title: PropTypes.string,
}.isRequired;

export default Search;
