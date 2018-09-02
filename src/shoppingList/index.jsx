import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Panel } from 'react-bootstrap';
import List from './List';
import { getTrelloShoppingList } from '../actions';

class ShoppingList extends Component {
  constructor() {
    super();
    this.tryLoadList = this.tryLoadList.bind(this);
  }

  componentDidMount() {
    this.tryLoadList();
  }

  componentDidUpdate() {
    this.tryLoadList();
  }

  tryLoadList() {
    const { triedLoadingShoppingList } = this.props;
    if (triedLoadingShoppingList) {
      return;
    }

    const { loadingPlan, card, loadList } = this.props;
    if (!loadingPlan && card && card.idChecklists && card.idChecklists.length) {
      loadList(card.idChecklists[0]);
    }
  }

  render() {
    const { loadingPlan, loadingShoppingList } = this.props;
    const loading = loadingPlan || loadingShoppingList;

    return (
      <Panel bsStyle="primary">
        <Panel.Heading>Shopping List</Panel.Heading>

        {loading && <FontAwesomeIcon icon={faSpinner} spin transform="grow-30" />}
        {!loading && <List />}
      </Panel>
    );
  }
}

ShoppingList.propTypes = {
  loadingPlan: PropTypes.bool.isRequired,
  loadingShoppingList: PropTypes.bool.isRequired,
  triedLoadingShoppingList: PropTypes.bool.isRequired,
  card: PropTypes.shape({
    idChecklists: PropTypes.array.isRequired,
  }),
  loadList: PropTypes.func.isRequired,
};

ShoppingList.defaultProps = {
  card: { idChecklists: [] },
};

const mapStateToProps = state => ({
  loadingPlan: state.trello.loadingPlan,
  loadingShoppingList: state.trello.loadingShoppingList,
  triedLoadingShoppingList: state.trello.triedLoadingShoppingList,
  card: state.trello.plan.find(c => c.labels.length && c.labels.find(l => l.name === 'Shopping List')),
});

const mapDispatchToProps = dispatch => ({
  loadList: id => dispatch(getTrelloShoppingList(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
