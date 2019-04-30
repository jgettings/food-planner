import fetch from 'cross-fetch';
import config from '../config.json';

const loading = () => ({ type: 'LOADING_TRELLO_BOARD_LISTS' });

const loaded = payload => ({ type: 'LOADED_TRELLO_BOARD_LISTS', payload });

const failed = error => ({ type: 'FAILED_LOADING_TRELLO_BOARD_LISTS', error });

export default () => (dispatch) => {
  dispatch(loading());

  const { apiKey, token, recipeBoardId } = config.trello;

  return fetch(`https://trello.com/1/boards/${recipeBoardId}/lists?cards=none&fields=all&key=${apiKey}&token=${token}`)
    .then(response => response.json())
    .then(list => dispatch(loaded(list)))
    .catch(error => dispatch(failed(error)));
};
