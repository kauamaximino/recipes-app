import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Search from './Search';
import AppContext from '../contexts/AppContext';

function Header({ title, haveSearch }) {
  const [search, setSearch] = useState(false);
  const { setRedirectDetailsFoods } = useContext(AppContext);

  return (
    <div>
      <header>
        <Link to="/profile">

          <button
            type="button"
          >
            <img src={ profileIcon } alt="ícone perfil" data-testid="profile-top-btn" />

          </button>
        </Link>
        <p data-testid="page-title">{ title }</p>
        {
          (haveSearch) && (

            <button
              type="button"
              onClick={ () => {
                setSearch((prevState) => !prevState);
                setRedirectDetailsFoods(true);
              } }

            >
              <img src={ searchIcon } alt="ícone pesquisa" data-testid="search-top-btn" />

            </button>
          )
        }

      </header>
      {(search)
        && <Search title={ title } />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  haveSearch: PropTypes.bool,
}.isRequired;

export default Header;
