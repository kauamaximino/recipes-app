import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AppContext from '../contexts/AppContext';
import { getFoodByNationality, getFoods } from '../services/index';
import CardFood from '../components/CardFood';
import '../style/FoodsNationalities.css';

function FoodsNationalities() {
  const { areaList, setRecipesReturn } = useContext(AppContext);
  const [nationality, setNationality] = useState();

  const handleChange = async ({ target: { value } }) => {
    if (value === 'All') {
      const response = await getFoods();
      setRecipesReturn(response);
      setNationality('All');
    } else {
      setNationality(value);
      const response = await getFoodByNationality(value);
      setRecipesReturn(response);
    }
  };

  return (
    <div>
      <Header title="Explore Nationalities" haveSearch="true" />
      <div className="conteiner-nacio">
        <select
          className="form-select"
          data-testid="explore-by-nationality-dropdown"
          value={ nationality }
          onChange={ handleChange }
        >
          <option
            data-testid="All-option"
          >
            {' '}
            All
            {' '}

          </option>
          {areaList && areaList.map((area, index) => {
            const { strArea: nameArea } = area;
            return (

              <option
                data-testid={ `${nameArea}-option` }
                key={ index }
                value={ nameArea }
              >
                {nameArea}

              </option>
            );
          })}
        </select>
      </div>
      <CardFood />
      <Footer />
    </div>
  );
}

export default FoodsNationalities;
