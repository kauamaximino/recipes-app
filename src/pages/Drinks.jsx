import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardDrink from '../components/CardDrink';
import { getDrinks } from '../services/index';
import AppContext from '../contexts/AppContext';

function Drinks() {
  const {
    setCocktailsReturn,
  } = useContext(AppContext);

  useEffect(() => {
    const firstRender = async () => {
      const response = await getDrinks();
      setCocktailsReturn(response);
    };
    firstRender();
  }, []);

  return (

    <div>
      <Header title="Drinks" haveSearch="true" />
      <CardDrink />
      <Footer />
    </div>
  );
}

export default Drinks;
