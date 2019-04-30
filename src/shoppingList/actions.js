import fetch from 'cross-fetch';
import config from '../config.json';


const loadingTrelloShoppingList = () => ({ type: 'LOADING_TRELLO_SHOPPING_LIST' });

const loadedTrelloShoppingList = payload => ({ type: 'LOADED_TRELLO_SHOPPING_LIST', payload });

const failedLoadTrelloShoppingList = error => ({ type: 'FAILED_LOAD_TRELLO_SHOPPING_LIST', error });

export default checklistId => (dispatch) => {
  dispatch(loadingTrelloShoppingList());

  const { apiKey, token } = config.trello;

  return fetch(`https://api.trello.com/1/checklists/${checklistId}?fields=all&key=${apiKey}&token=${token}`)
    .then(response => response.json())
    .then(list => dispatch(loadedTrelloShoppingList(list.checkItems)))
    .catch(error => dispatch(failedLoadTrelloShoppingList(error)));
};
