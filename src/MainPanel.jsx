import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import { connect } from 'react-redux';

const Main = ({ urlToImport }) => (
  <Panel bsStyle="primary">
    <Panel.Heading>
      <Panel.Title componentClass="h3">This is some main stuff.</Panel.Title>
    </Panel.Heading>
    <Panel.Body>
      Panel content
      <br />
      {urlToImport}
    </Panel.Body>
  </Panel>
);

Main.propTypes = {
  urlToImport: PropTypes.string,
};

Main.defaultProps = {
  urlToImport: '',
};

const mapStateToProps = state => ({
  urlToImport: state.importUrl.urlToImport,
});

export default connect(mapStateToProps)(Main);
