import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardFood from '../components/CardFood';

function Foods() {
  return (
    <div>
      <Header title="Foods" haveSearch="true" />
      <CardFood />
      <Footer />
    </div>
  );
}

export default Foods;
