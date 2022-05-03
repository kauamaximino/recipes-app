import React from 'react';
import propTypes from 'prop-types';

const DetailsReceipe = ({ match: { params: { id } } }) => {
  console.log(id);
  return (
    <div>
      <h1>teste</h1>
      <h1>
        {id}
      </h1>
    </div>
  );
};

DetailsReceipe.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      id: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default DetailsReceipe;
