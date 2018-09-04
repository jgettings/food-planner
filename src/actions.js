import fetch from 'cross-fetch';
import config from './config.json';


export const importRecipe = payload => ({ type: 'IMPORT_RECIPE', payload });
export const cancelImport = () => ({ type: 'CANCEL_IMPORT' });


export const loadingTrelloPlan = () => ({ type: 'LOADING_TRELLO_PLAN' });

export const loadedTrelloPlan = payload => ({ type: 'LOADED_TRELLO_PLAN', payload });

export const getTrelloPlan = () => (dispatch) => {
  dispatch(loadingTrelloPlan());

  const { apiKey, token, calendarListId } = config.trello;

  return fetch(`https://api.trello.com/1/lists/${calendarListId}/cards?fields=due,name,labels,url,idChecklists&attachments=cover&key=${apiKey}&token=${token}`)
    .then(response => response.json())
    .then(cards => dispatch(loadedTrelloPlan(cards)));
};

export const loadingTrelloShoppingList = () => ({ type: 'LOADING_TRELLO_SHOPPING_LIST ' });

export const loadedTrelloShoppingList = payload => ({ type: 'LOADED_TRELLO_SHOPPING_LIST', payload });

export const getTrelloShoppingList = checklistId => (dispatch) => {
  dispatch(loadingTrelloShoppingList());

  const { apiKey, token } = config.trello;

  return fetch(`https://api.trello.com/1/checklists/${checklistId}?fields=all&key=${apiKey}&token=${token}`)
    .then(response => response.json())
    .then(list => dispatch(loadedTrelloShoppingList(list.checkItems)));
};
