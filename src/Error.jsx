import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

import './Error.css';


const Error = ({ message }) => (
  <div className="error">
    <h3>
      <Badge variant="danger">
        <FontAwesomeIcon icon={faExclamationTriangle} />
      </Badge>
      &nbsp;
      Error
    </h3>
    {message}
  </div>
);

Error.propTypes = {
  message: PropTypes.string
};

Error.defaultProps = {
  message: 'Something went wrong'
};

export default Error;
