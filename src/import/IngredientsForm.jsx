import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';


// TODO: adding and removing lists

const IngredientsForm = ({ ingredients }) => (
  <div>
    {ingredients.map(i => (
      <div key={i.title}>
        <b>
          {i.title}
        </b>
        <FormControl
          componentClass="textarea"
          placeholder="(newline for each)"
          defaultValue={i.list.reduce((value, item) => `${value}\n${item}`)}
          rows={i.list.length}
        />
        <br />
      </div>
    ))}
  </div>
);

IngredientsForm.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    list: PropTypes.array,
  })).isRequired,
};

export default IngredientsForm;
