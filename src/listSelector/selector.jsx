import React from 'react';
import PropTypes from 'prop-types';
import { FormControl } from 'react-bootstrap';
import config from '../config';


let defaultValue = '';
if (config.trello.defaultNewRecipeListId) {
  defaultValue = config.trello.defaultNewRecipeListId;
}

const Selector = ({ lists }) => (
  <FormControl as="select" defaultValue={defaultValue}>
    <option value="" disabled>Choose a list in Trello to import into</option>

    {lists.map(({ id, name }) => (
      <option value={id} key={id}>
        {name}
      </option>
    ))}

  </FormControl>
);

Selector.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default Selector;
