import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  FormGroup,
  FormControl,
  InputGroup,
  Button,
  Form as BsForm,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { importRecipe } from '../actions';
import Modal from './Modal';

class Form extends Component {
  constructor() {
    super();
    this.state = { value: '' };
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const { importFn } = this.props;
    const { value } = this.state;
    importFn(value);
  }

  render() {
    return (
      <BsForm onSubmit={this.submit}>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Paste Recipe Here"
              onChange={e => this.setState({ value: e.target.value })}
            />
            <InputGroup.Button>
              <Button type="submit">Import Recipe</Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
        <Modal />
      </BsForm>
    );
  }
}

Form.propTypes = {
  importFn: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  importFn: value => dispatch(importRecipe(value)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Form);


/*
Add a tooltip of how to do this
Grab the element of the recipe (or potentially the entire page html) and paste that in!
 */
