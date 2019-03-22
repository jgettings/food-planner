import React from 'react';
import PropTypes from 'prop-types';
import { Typeahead, Token } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const trelloColors = {
  yellow: '#f2d600',
  purple: '#c377e0',
  blue: '#0079bf',
  red: '#ee5f5b',
  green: '#61bd4f',
  orange: '#ff9f1a',
  black: 'black',
  sky: '#5bc0de',
  pink: '#ff78cb',
  lime: '#51e898',
  null: '#7A8288',
};

// todo: allowNew=true to let people add labels (need to do something extra in the api?)

const Selector = ({ labels, onChange }) => (
  <Typeahead
    id="labelSelector"
    multiple
    options={labels}
    labelKey="name"
    emptyLabel="No labels selected"
    onChange={onChange}
    renderToken={(option, p) => (
      <Token
        onRemove={p.onRemove}
        key={option.id}
        style={{
          backgroundColor: trelloColors[option.color],
          color: 'white',
        }}
      >
        {option.name}
      </Token>
    )}
  />
);

Selector.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Selector;
