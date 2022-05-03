import React from 'react';
import propTypes from 'prop-types';

const DetailsReceipe = ({ match: { params: { id } } }) => (
  <div>
    <h1>
      {id}
    </h1>
  </div>
);

DetailsReceipe.propTypes = {
  id: propTypes.string,
}.isRequired;

export default DetailsReceipe;
