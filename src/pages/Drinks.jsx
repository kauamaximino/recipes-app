import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardDrink from '../components/CardDrink';

const Drinks = () => (
  <div>
    <Header title="Drinks" haveSearch="true" />
    <CardDrink />
    <Footer />
  </div>
);

export default Drinks;
