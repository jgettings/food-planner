import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl, Col, Row, Button,
} from 'react-bootstrap';

const leftColumnSize = 3;
const rightColumnSize = 9;

const ListForm = ({
  title, values, controlId, removeFn,
}) => (
  <div>
    <Row key={title}>
      <Col sm={leftColumnSize}>
        <FormControl
          type="text"
          id={`list-title-${controlId}`}
          placeholder="Subtitle"
          defaultValue={title}
        />
        <Button bsStyle="danger" bsSize="small" onClick={removeFn}>
          Remove List
        </Button>
      </Col>
      <Col sm={rightColumnSize}>
        <FormControl
          componentClass="textarea"
          placeholder="(newline for each)"
          id={`list-values-${controlId}`}
          defaultValue={values.reduce((value, item) => `${value}\n${item}`, '').trim()}
          rows={values.length}
        />
      </Col>
    </Row>
  </div>
);

ListForm.propTypes = {
  title: PropTypes.string.isRequired,
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  controlId: PropTypes.string.isRequired,
  removeFn: PropTypes.func.isRequired,
};

export default ListForm;
