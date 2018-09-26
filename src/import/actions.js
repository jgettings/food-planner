import fetch from 'cross-fetch';
import config from '../config.json';

export const importRecipe = payload => ({ type: 'IMPORT_RECIPE', payload });
export const cancelImport = () => ({ type: 'CANCEL_IMPORT' });

const loading = () => ({ type: 'LOADING_RECIPE_IMPORT' });

// todo show loading spinner?
const loaded = () => ({ type: 'LOADED_RECIPE_IMPORT' });


const addCustomFieldToCard = (fieldName, cardId, value) => {
  const { apiKey, token, customFields } = config.trello;

  const data = { key: apiKey, token, value: {} };

  const field = customFields[fieldName];

  data.value[field.type] = value;

  return fetch(
    `https://api.trello.com/1/card/${cardId}/customField/${field.id}/item`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
};

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
    .then(card => Promise.all([
      addCustomFieldToCard('amountPerServing', card.id, recipe.amountPerServing),
      addCustomFieldToCard('source', card.id, recipe.source),
      addCustomFieldToCard('servings', card.id, recipe.servings),
      addCustomFieldToCard('totalMinutes', card.id, recipe.totalMinutes),
    ]))
    .then(() => dispatch(loaded()));
};
