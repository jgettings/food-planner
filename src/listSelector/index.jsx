import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import loadBoardLists from './actions';
import Selector from './selector';
import Error from '../Error';

class TrelloListSelect extends Component {
  componentDidMount() {
    const { loadLists } = this.props;
    loadLists();
  }

  render() {
    const { loading, list, errorLoading } = this.props;
    if (loading) {
      return (<FontAwesomeIcon icon={faSpinner} spin transform="grow-30" />);
    }

    if (errorLoading) {
      return (<Error message="There was an error loading the lists" />);
    }

    if (list.length === 0) {
      return (<Error message="Please create at least one list in trello" />);
    }

    return (
      <Selector lists={list} />
    );
  }
}

TrelloListSelect.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadLists: PropTypes.func.isRequired,
  errorLoading: PropTypes.bool.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => ({
  loading: state.trelloBoardLists.loading,
  errorLoading: state.trelloBoardLists.errorLoading,
  list: state.trelloBoardLists.list,
});

const mapDispatchToProps = dispatch => ({
  loadLists: id => dispatch(loadBoardLists(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(TrelloListSelect);
