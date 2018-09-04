import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

const Form = () => (
  <form>
    <FormGroup controlId="title">
      <ControlLabel>Title</ControlLabel>
      <FormControl type="text" id="title" placeholder="Enter title" />
    </FormGroup>

    <FormGroup controlId="source">
      <ControlLabel>Source</ControlLabel>
      <FormControl type="text" id="source" placeholder="Enter source" />
    </FormGroup>

    <FormGroup controlId="servings">
      <ControlLabel>Number of Servings</ControlLabel>
      <FormControl type="text" id="servings" placeholder="Enter number of servings" />
    </FormGroup>

    <FormGroup controlId="perServing">
      <ControlLabel>Amount per Serving</ControlLabel>
      <FormControl type="text" id="perServing" placeholder="Enter amount per serving" />
    </FormGroup>

    <FormGroup controlId="totalTime">
      <ControlLabel>Total Time</ControlLabel>
      <FormControl type="text" id="totalTime" placeholder="How long does this take to cook?" />
    </FormGroup>

    {/* TODO: image upload like trello does it */}
    {/* TODO: typeahead for labels */}

    <FormGroup controlId="ingredients">
      <ControlLabel>Ingredients (newline for each):</ControlLabel>
      <FormControl componentClass="textarea" placeholder="textarea" />
    </FormGroup>

    <FormGroup controlId="directions">
      <ControlLabel>Directions (use hyphens for bullets):</ControlLabel>
      <FormControl componentClass="textarea" placeholder="textarea" />
    </FormGroup>
  </form>
);

export default Form;
