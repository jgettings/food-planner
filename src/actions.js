import fetch from 'cross-fetch';
import config from './config.json';


export const importUrl = payload => ({ type: 'IMPORT_URL', payload });


export const loadingTrello = () => ({ type: 'LOADING_TRELLO' });

export const loadedTrello = payload => ({ type: 'LOADED_TRELLO', payload });

export const getTrelloCalendar = () => (dispatch) => {
  dispatch(loadingTrello());

  const { apiKey, token, calendarListId } = config.trello;

  return fetch(`https://api.trello.com/1/lists/${calendarListId}/cards?fields=due,name,labels,url&attachments=cover&key=${apiKey}&token=${token}`)
    .then(response => response.json())
    .then(cards => dispatch(loadedTrello(cards)));
};


export default {
  importUrl,
  getTrelloCalendar,
};
