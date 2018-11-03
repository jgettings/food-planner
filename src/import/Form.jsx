import React from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup, ControlLabel, FormControl, Col,
} from 'react-bootstrap';
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
    <FormGroup controlId="name">
      <Col sm={leftColumnSize}>
        <ControlLabel>Title</ControlLabel>
      </Col>
      <Col sm={rightColumnSize}>
        <FormControl type="text" id="name" placeholder="Enter title" defaultValue={title} />
      </Col>
    </FormGroup>

    <FormGroup controlId="idList">
      <Col sm={leftColumnSize}>
        <ControlLabel>Import Into...</ControlLabel>
      </Col>
      <Col sm={rightColumnSize}>
        <TrelloListSelect />
      </Col>
    </FormGroup>

    <FormGroup controlId="source">
      <Col sm={leftColumnSize}>
        <ControlLabel>Source</ControlLabel>
      </Col>
      <Col sm={rightColumnSize}>
        <FormControl type="text" id="source" placeholder="Enter source" />
      </Col>
    </FormGroup>

    <FormGroup controlId="labels">
      <Col sm={leftColumnSize}>
        <ControlLabel>Labels</ControlLabel>
      </Col>
      <Col sm={rightColumnSize}>
        <TrelloLabelSelect />
      </Col>
    </FormGroup>

    <hr />

    <FormGroup controlId="servings">
      <Col sm={leftColumnSize}>
        <ControlLabel>Servings</ControlLabel>
      </Col>
      <Col sm={rightColumnSize}>
        <FormControl type="text" id="servings" placeholder="Enter number of servings" defaultValue={servings} />
      </Col>
    </FormGroup>

    <FormGroup controlId="amountPerServing">
      <Col sm={leftColumnSize}>
        <ControlLabel>Serving Size</ControlLabel>
      </Col>
      <Col sm={rightColumnSize}>
        <FormControl type="text" id="amountPerServing" placeholder="Enter amount per serving" defaultValue={perServing} />
      </Col>
    </FormGroup>

    <FormGroup controlId="totalMinutes">
      <Col sm={leftColumnSize}>
        <ControlLabel>Total Minutes</ControlLabel>
      </Col>
      <Col sm={rightColumnSize}>
        <FormControl type="text" id="totalMinutes" placeholder="How long does this take to cook?" defaultValue={totalMinutes} />
      </Col>
    </FormGroup>

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