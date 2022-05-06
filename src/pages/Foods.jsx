import React from 'react';
import Header from '../components/Header';
import CategoriesFood from '../components/CategoriesFood';
import CardFood from '../components/CardFood';
import Footer from '../components/Footer';

function Foods() {
  return (
    <div>
      <Header title="Foods" haveSearch="true" />
      <CategoriesFood />
      <CardFood />
      <Footer />
    </div>
  );
}

export default Foods;
