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
import { importUrl } from '../actions';

class Form extends Component {
  constructor() {
    super();
    this.state = { value: '' };
    this.submit = this.submit.bind(this);
  }

  submit(e) {
    e.preventDefault();
    const { importUrlFn } = this.props;
    const { value } = this.state;
    importUrlFn(value);
  }

  render() {
    return (
      <BsForm onSubmit={this.submit}>
        <FormGroup>
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Recipe URL"
              onChange={e => this.setState({ value: e.target.value })}
            />
            <InputGroup.Button>
              <Button type="submit">Import Recipe</Button>
            </InputGroup.Button>
            [Into "New Things" - make this a dropdown with a default!]
          </InputGroup>
        </FormGroup>
      </BsForm>
    );
  }
}

Form.propTypes = {
  importUrlFn: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  importUrlFn: value => dispatch(importUrl(value)),
});

export default connect(
  null,
  mapDispatchToProps
)(Form);
