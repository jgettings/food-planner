import fetch from 'cross-fetch';
import config from '../config.json';

export const importRecipe = payload => ({ type: 'IMPORT_RECIPE', payload });
export const cancelImport = () => ({ type: 'CANCEL_IMPORT' });

const loading = () => ({ type: 'LOADING_RECIPE_IMPORT' });

// todo show loading spinner?
const loaded = () => ({ type: 'LOADED_RECIPE_IMPORT' });


const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };

const { apiKey: key, token, customFields } = config.trello;


const addCustomFieldToCard = (fieldName, cardId, value) => {
  const data = { key, token, value: {} };

  const field = customFields[fieldName];

  data.value[field.type] = value;

  return fetch(
    `https://api.trello.com/1/card/${cardId}/customField/${field.id}/item`,
    { method: 'PUT', headers, body: JSON.stringify(data) },
  );
};

const addItemToChecklist = (listId, name, pos) => fetch(
  `https://api.trello.com/1/checklists/${listId}/checkItems`,
  {
    method: 'POST',
    headers,
    body: JSON.stringify({
      key, token, name, pos,
    }),
  },
);

const addListToCard = (name, idCard, items, pos) => fetch(
  'https://api.trello.com/1/checklists',
  {
    method: 'POST',
    headers,
    body: JSON.stringify({
      key, token, idCard, name, pos,
    }),
  },
)
  .then(response => response.json())
  .then(list => items.map((item, i) => addItemToChecklist(list.id, item, i + 1)));

// TODO check to make sure we don't already have something with this name

export const addRecipe = recipe => (dispatch) => {
  dispatch(loading());

  return fetch('https://api.trello.com/1/cards', {
    method: 'POST',
    headers,
    body: JSON.stringify({ ...recipe, key, token }),
  }).then(response => response.json())
    .then(card => Promise.all([
      addCustomFieldToCard('amountPerServing', card.id, recipe.amountPerServing),
      addCustomFieldToCard('source', card.id, recipe.source),
      addCustomFieldToCard('servings', card.id, recipe.servings),
      addCustomFieldToCard('totalMinutes', card.id, recipe.totalMinutes),
      ...recipe.ingredients.map((i, idx) => addListToCard(
        i.title ? `Ingredients: ${i.title}` : 'Ingredients',
        card.id,
        i.values,
        idx + 1,
      )),
      ...recipe.directions.map((i, idx) => addListToCard(
        i.title ? `Directions: ${i.title}` : 'Directions',
        card.id,
        i.values,
        idx + recipe.ingredients.length + 1,
      )),
    ]))

    .then(() => dispatch(loaded()));
};
