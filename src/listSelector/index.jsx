import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import loadBoardLists from './actions';

class TrelloListSelect extends Component {
  componentDidMount() {
    const { loadLists } = this.props;
    loadLists();
  }

  render() {
    const { loading } = this.props;
    if (loading) {
      return (<FontAwesomeIcon icon={faSpinner} spin transform="grow-30" />);
    }

    return (
      <FormControl componentClass="select" defaultValue="">
        <option value="" disabled>Choose a list in Trello to import into</option>
        <option value="select">select</option>
        <option value="other">...</option>
      </FormControl>
    );
  }
}

TrelloListSelect.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadLists: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  loading: state.trelloBoardLists.loading,
});

const mapDispatchToProps = dispatch => ({
  loadLists: id => dispatch(loadBoardLists(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(TrelloListSelect);
