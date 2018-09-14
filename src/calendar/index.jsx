import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Grid from './Grid';
import getTrelloPlan from './actions';

class Calendar extends Component {
  componentDidMount() {
    const { getCalendar } = this.props;
    getCalendar();
  }

  render() {
    const { loading } = this.props;

    return (
      <div style={{ textAlign: 'center' }}>
        {loading && <FontAwesomeIcon icon={faSpinner} spin transform="grow-30" />}
        {!loading && <Grid />}
        <div style={{ clear: 'both' }} />
      </div>
    );
  }
}

Calendar.propTypes = {
  loading: PropTypes.bool.isRequired,
  getCalendar: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.plan.loading,
});

const mapDispatchToProps = dispatch => ({
  getCalendar: () => dispatch(getTrelloPlan()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
