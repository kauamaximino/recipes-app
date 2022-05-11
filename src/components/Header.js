import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Search from './Search';
import AppContext from '../contexts/AppContext';
import '../style/Header.css';

function Header({ title, haveSearch }) {
  const [search, setSearch] = useState(false);
  const { setRedirectDetailsFoods } = useContext(AppContext);

  return (
    <div>
      <header className="conteiner-header">
        <Link to="/profile">

          <button
            type="button"
            className="icon-profile-search"
          >
            <img
              src={ profileIcon }
              alt="ícone perfil"
              data-testid="profile-top-btn"
            />

          </button>
        </Link>

        <h1 className="display-6" data-testid="page-title">{ title }</h1>

        {
          (haveSearch) && (

            <button
              type="button"
              className="icon-profile-search"
              onClick={ () => {
                setSearch((prevState) => !prevState);
                setRedirectDetailsFoods(true);
              } }

            >
              <img
                src={ searchIcon }
                alt="ícone pesquisa"
                data-testid="search-top-btn"
              />

            </button>
          )
        }

      </header>
      <div>
        {(search)
        && <Search title={ title } />}
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  haveSearch: PropTypes.bool,
}.isRequired;

export default Header;
