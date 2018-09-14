import fetch from 'cross-fetch';
import config from '../config.json';

const loadingTrelloPlan = () => ({ type: 'LOADING_TRELLO_PLAN' });

const loadedTrelloPlan = payload => ({ type: 'LOADED_TRELLO_PLAN', payload });

export default () => (dispatch) => {
  dispatch(loadingTrelloPlan());

  const { apiKey, token, calendarListId } = config.trello;

  return fetch(`https://api.trello.com/1/lists/${calendarListId}/cards?fields=due,name,labels,url,idChecklists&attachments=cover&key=${apiKey}&token=${token}`)
    .then(response => response.json())
    .then(cards => dispatch(loadedTrelloPlan(cards)));
};
