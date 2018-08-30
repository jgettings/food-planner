import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import Grid from './Grid';
import { getTrelloCalendar } from '../actions';

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
      </div>
    );
  }
}

Calendar.propTypes = {
  loading: PropTypes.bool.isRequired,
  getCalendar: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.trello.loading,
});

const mapDispatchToProps = dispatch => ({
  getCalendar: () => dispatch(getTrelloCalendar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
