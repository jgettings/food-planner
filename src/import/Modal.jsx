import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BsModal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { cancelImport } from '../actions';
import Form from './Form';
import parser from './parser';

const Modal = ({ open, rawRecipe, cancel }) => {
  parser(rawRecipe);

  return (
    <BsModal show={open}>
      <BsModal.Header>
        <BsModal.Title>Import Recipe</BsModal.Title>
      </BsModal.Header>

      <BsModal.Body>
        <Form />
      </BsModal.Body>

      <BsModal.Footer>
        <Button onClick={cancel}>Cancel</Button>
        <Button bsStyle="primary">Save</Button>
      </BsModal.Footer>
    </BsModal>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  rawRecipe: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  open: state.importer.recipeToImport !== '',
  rawRecipe: state.importer.recipeToImport,
});

const mapDispatchToProps = dispatch => ({
  cancel: () => dispatch(cancelImport()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
