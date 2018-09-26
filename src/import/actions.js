import fetch from 'cross-fetch';
import config from '../config.json';

export const importRecipe = payload => ({ type: 'IMPORT_RECIPE', payload });
export const cancelImport = () => ({ type: 'CANCEL_IMPORT' });

const loading = () => ({ type: 'LOADING_RECIPE_IMPORT' });

// todo show loading spinner?
const loaded = () => ({ type: 'LOADED_RECIPE_IMPORT' });


export const addRecipe = recipe => (dispatch) => {
  dispatch(loading());

  const { apiKey, token } = config.trello;

  const data = {
    ...recipe,
    key: apiKey,
    token,
  };

  return fetch('https://api.trello.com/1/cards', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => response.json())
    .then(() => dispatch(loaded()));
};
