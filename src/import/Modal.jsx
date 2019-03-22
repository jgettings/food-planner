import React from 'react';
import PropTypes from 'prop-types';
import { Modal as BsModal, Button, Form as BsForm } from 'react-bootstrap';
import { connect } from 'react-redux';
import { cancelImport, addRecipe } from './actions';
import Form from './Form';
import parser from './parser';
import serializeForm from './formSerializer';

const Modal = ({
  open, rawRecipe, cancel, importFn,
}) => {
  if (!rawRecipe || rawRecipe === '') {
    return <div />;
  }

  const recipe = parser(rawRecipe);

  return (
    <BsModal show={open} size="lg">
      <BsModal.Header>
        <BsModal.Title>Import Recipe</BsModal.Title>
      </BsModal.Header>

      <BsForm
        className="recipeImportForm"
        onSubmit={importFn}
      >
        <BsModal.Body>
          <Form {...recipe} />
        </BsModal.Body>

        <BsModal.Footer>
          <Button onClick={cancel}>Cancel</Button>
          <Button variant="success" type="submit">Import</Button>
        </BsModal.Footer>
      </BsForm>
    </BsModal>
  );
};

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  rawRecipe: PropTypes.string.isRequired,
  cancel: PropTypes.func.isRequired,
  importFn: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  open: state.importer.recipeToImport !== '',
  rawRecipe: state.importer.recipeToImport,
});

const mapDispatchToProps = dispatch => ({
  cancel: () => dispatch(cancelImport()),
  importFn: (e) => {
    e.preventDefault();
    const recipe = serializeForm(e.target);
    dispatch(addRecipe(recipe));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
