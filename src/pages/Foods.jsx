import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardFood from '../components/CardFood';

const Foods = () => (
  <div>
    <Header title="Foods" haveSearch="true" />
    <CardFood />
    <Footer />
  </div>
);

export default Foods;
