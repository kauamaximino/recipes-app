import React from 'react';
import propTypes from 'prop-types';

const DetailsDrink = ({ match: { params: { id } } }) => (
  <div>
    <h1>{id}</h1>
  </div>
);

DetailsDrink.propTypes = {
  id: propTypes.string,
}.isRequired;

export default DetailsDrink;
