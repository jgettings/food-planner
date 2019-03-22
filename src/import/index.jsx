import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, ButtonGroup, Form as BsForm } from 'react-bootstrap';
import { connect } from 'react-redux';
import { importRecipe } from './actions';
import Modal from './Modal';
import enchiladas from './example.html';


class Form extends Component {
  constructor() {
    super();
    this.state = { value: '' };
    this.submit = this.submit.bind(this);
    this.test = this.test.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const { importFn } = this.props;
    const { value } = this.state;
    importFn(value || ' ');
  }

  test(e) {
    e.preventDefault();
    const { importFn } = this.props;
    importFn(enchiladas);
  }

  render() {
    return (
      <BsForm onSubmit={this.submit} inline>
        <ButtonGroup>
          <BsForm.Control
            type="text"
            placeholder="Paste Recipe HTML Here or Hit Import to Enter Manually"
            onChange={e => this.setState({ value: e.target.value })}
            size="sm"
          />
          <Button type="submit" variant="success" size="sm">Import Recipe</Button>
          <Button type="button" onClick={this.test} size="sm">Test Import</Button>
        </ButtonGroup>
        <Modal />
      </BsForm>
    );
  }
}

// TODO Create recipe from empty
// TODO Save recipe to trello

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
