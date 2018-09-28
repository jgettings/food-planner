import React from 'react';
import PropTypes from 'prop-types';
import { FormControl, Col, Row } from 'react-bootstrap';

const leftColumnSize = 3;
const rightColumnSize = 9;

// TODO: adding and removing lists

const IngredientsForm = ({ ingredients }) => (
  <div>
    {ingredients.map((list, i) => (
      <Row key={list.title}>
        <Col sm={leftColumnSize}>
          <FormControl
            type="text"
            id={`ingredients-title-${i}`}
            placeholder="Ingredients Subtitle"
            defaultValue={list.title}
          />
        </Col>
        <Col sm={rightColumnSize}>
          <FormControl
            componentClass="textarea"
            placeholder="(newline for each)"
            id={`ingredients-list-${i}`}
            defaultValue={list.list.reduce((value, item) => `${value}\n${item}`)}
            rows={list.list.length}
          />
        </Col>
      </Row>
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
