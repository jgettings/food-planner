import React from 'react';
import PropTypes from 'prop-types';
import { Form as BsForm, Col } from 'react-bootstrap';
import './Form.css';
import TrelloListSelect from '../listSelector';
import TrelloLabelSelect from '../labelSelector';
import ListOfLists from './ListOfLists';

const leftColumnSize = 3;
const rightColumnSize = 9;

const Form = ({
  title,
  servings,
  totalMinutes,
  perServing,
  ingredients,
  directions,
}) => (
  <div>
    <BsForm.Group controlId="name">
      <Col sm={leftColumnSize}>
        <BsForm.Label>Title</BsForm.Label>
      </Col>
      <Col sm={rightColumnSize}>
        <BsForm.Control type="text" id="name" placeholder="Enter title" defaultValue={title} />
      </Col>
    </BsForm.Group>

    <BsForm.Group controlId="idList">
      <Col sm={leftColumnSize}>
        <BsForm.Label>Import Into...</BsForm.Label>
      </Col>
      <Col sm={rightColumnSize}>
        <TrelloListSelect />
      </Col>
    </BsForm.Group>

    <BsForm.Group controlId="source">
      <Col sm={leftColumnSize}>
        <BsForm.Label>Source</BsForm.Label>
      </Col>
      <Col sm={rightColumnSize}>
        <BsForm.Control type="text" id="source" placeholder="Enter source" />
      </Col>
    </BsForm.Group>

    <BsForm.Group controlId="labels">
      <Col sm={leftColumnSize}>
        <BsForm.Label>Labels</BsForm.Label>
      </Col>
      <Col sm={rightColumnSize}>
        <TrelloLabelSelect />
      </Col>
    </BsForm.Group>

    <hr />

    <BsForm.Group controlId="servings">
      <Col sm={leftColumnSize}>
        <BsForm.Label>Servings</BsForm.Label>
      </Col>
      <Col sm={rightColumnSize}>
        <BsForm.Control type="text" id="servings" placeholder="Enter number of servings" defaultValue={servings} />
      </Col>
    </BsForm.Group>

    <BsForm.Group controlId="amountPerServing">
      <Col sm={leftColumnSize}>
        <BsForm.Label>Serving Size</BsForm.Label>
      </Col>
      <Col sm={rightColumnSize}>
        <BsForm.Control type="text" id="amountPerServing" placeholder="Enter amount per serving" defaultValue={perServing} />
      </Col>
    </BsForm.Group>

    <BsForm.Group controlId="totalMinutes">
      <Col sm={leftColumnSize}>
        <BsForm.Label>Total Minutes</BsForm.Label>
      </Col>
      <Col sm={rightColumnSize}>
        <BsForm.Control type="text" id="totalMinutes" placeholder="How long does this take to cook?" defaultValue={totalMinutes} />
      </Col>
    </BsForm.Group>

    {/* TODO: image upload like trello does it */}
    {/* TODO: description */}

    <hr />
    <ListOfLists controlId="ingredients" title="Ingredients">
      {ingredients}
    </ListOfLists>

    <hr />
    <ListOfLists controlId="directions" title="Directions">
      {directions}
    </ListOfLists>
  </div>
);

Form.propTypes = {
  title: PropTypes.string,
  servings: PropTypes.number,
  totalMinutes: PropTypes.number,
  perServing: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    values: PropTypes.array,
  })).isRequired,
  directions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    values: PropTypes.array,
  })).isRequired,
};

Form.defaultProps = {
  title: '',
  servings: 0,
  totalMinutes: 0,
  perServing: '',
};

export default Form;
