import fetch from 'cross-fetch';
import config from '../config.json';

const loading = () => ({ type: 'LOADING_TRELLO_BOARD_LABELS' });

const loaded = payload => ({ type: 'LOADED_TRELLO_BOARD_LABELS', payload });

export default () => (dispatch) => {
  dispatch(loading());

  const { apiKey, token, recipeBoardId } = config.trello;

  return fetch(`https://trello.com/1/boards/${recipeBoardId}/labels?cards=none&fields=all&key=${apiKey}&token=${token}`)
    .then(response => response.json())
    .then(list => list.filter(label => label.name))
    .then(list => dispatch(loaded(list)));
};
