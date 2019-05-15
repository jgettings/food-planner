import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'react-bootstrap';
import List from './List';
import getTrelloShoppingList from './actions';
import Error from '../Error';

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
    const { triedLoading } = this.props;
    if (triedLoading) {
      return;
    }

    const { loadingPlan, card, loadList } = this.props;
    if (!loadingPlan && card && card.idChecklists && card.idChecklists.length) {
      loadList(card.idChecklists[0]);
    }
  }

  render() {
    const { loadingPlan, loadingShoppingList, errorLoading } = this.props;
    const loading = loadingPlan || loadingShoppingList;

    return (
      <Card>
        <Card.Header>Shopping List</Card.Header>

        {loading
          && (
          <Card.Body style={{ textAlign: 'center' }}>
            <FontAwesomeIcon icon={faSpinner} spin transform="grow-30" />
          </Card.Body>
          )
        }
        {!loading && !errorLoading && <List />}
        {errorLoading && <Error message="We could not load the shopping list." />}
      </Card>
    );
  }
}

ShoppingList.propTypes = {
  loadingPlan: PropTypes.bool.isRequired,
  loadingShoppingList: PropTypes.bool.isRequired,
  triedLoading: PropTypes.bool.isRequired,
  errorLoading: PropTypes.bool.isRequired,
  card: PropTypes.shape({
    idChecklists: PropTypes.array.isRequired,
  }),
  loadList: PropTypes.func.isRequired,
};

ShoppingList.defaultProps = {
  card: { idChecklists: [] },
};

const mapStateToProps = state => ({
  loadingPlan: state.plan.loading,
  loadingShoppingList: state.shoppingList.loading,
  triedLoading: state.shoppingList.triedLoading,
  errorLoading: state.shoppingList.errorLoading,
  card: state.plan.cards.find(c => c.labels.length && c.labels.find(l => l.name === 'Shopping List')),
});

const mapDispatchToProps = dispatch => ({
  loadList: id => dispatch(getTrelloShoppingList(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingList);
