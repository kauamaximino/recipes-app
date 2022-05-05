import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardDrink from '../components/CardDrink';
import CategoriesDrink from '../components/CategoriesDrink';

function Drinks() {
  return (

    <div>
      <Header title="Drinks" haveSearch="true" />
      <CategoriesDrink />
      <CardDrink />
      <Footer />
    </div>
  );
}

export default Drinks;
