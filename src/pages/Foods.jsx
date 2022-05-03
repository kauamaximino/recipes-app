import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CardFood from '../components/CardFood';
import { getFoods } from '../services/index';
import AppContext from '../contexts/AppContext';

function Foods() {
  const {
    setRecipesReturn,
  } = useContext(AppContext);

  useEffect(() => {
    const firstRender = async () => {
      const response = await getFoods();
      setRecipesReturn(response);
    };
    firstRender();
  }, []);

  return (
    <div>
      <Header title="Foods" haveSearch="true" />
      <CardFood />
      <Footer />
    </div>
  );
}

export default Foods;
