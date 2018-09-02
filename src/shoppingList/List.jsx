import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const List = ({ items }) => (
  <ListGroup>
    {items.map(i => (
      <ListGroupItem key={i.id} disabled={i.state === 'complete'}>
        {i.name}
      </ListGroupItem>
    ))}
  </ListGroup>
);


List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired,
  ).isRequired,
};

const mapStateToProps = state => ({
  items: state.trello.shoppingList,
});

export default connect(mapStateToProps)(List);
