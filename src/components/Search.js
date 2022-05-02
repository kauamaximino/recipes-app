import React, { useState } from 'react';
import PropTypes from 'prop-types';
import handleAPI from '../services/index';

function Search({ title }) {
  const [optionRadio, setOptionRadio] = useState('');
  const [inputSearch, setInputSearch] = useState('');

  const handleRadioButton = ({ target: { value } }) => {
    setOptionRadio(value);
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
          onClick={ () => handleAPI(optionRadio, inputSearch, title) }
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
