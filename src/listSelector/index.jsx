import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import loadBoardLists from './actions';
import Selector from './selector';

class TrelloListSelect extends Component {
  componentDidMount() {
    const { loadLists } = this.props;
    loadLists();
  }

  render() {
    const { loading, list } = this.props;
    if (loading) {
      return (<FontAwesomeIcon icon={faSpinner} spin transform="grow-30" />);
    }

    return (
      <Selector lists={list} />
    );
  }
}

TrelloListSelect.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadLists: PropTypes.func.isRequired,
  list: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

const mapStateToProps = state => ({
  loading: state.trelloBoardLists.loading,
  list: state.trelloBoardLists.list,
});

const mapDispatchToProps = dispatch => ({
  loadLists: id => dispatch(loadBoardLists(id)),
});


export default connect(mapStateToProps, mapDispatchToProps)(TrelloListSelect);
