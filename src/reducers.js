import { combineReducers } from 'redux';

export const importUrl = (state = {}, action) => {
  switch (action.type) {
    case 'IMPORT_URL': {
      return { urlToImport: action.payload };
    }
    default:
      return state;
  }
};


const initialTrelloState = {
  list: [],
  loading: false,
};
export const trello = (state = initialTrelloState, action) => {
  switch (action.type) {
    case 'LOADING_TRELLO': {
      return { ...state, loading: true };
    }
    case 'LOADED_TRELLO': {
      return { ...state, loading: false, list: action.payload };
    }
    default:
      return state;
  }
};


export default combineReducers({
  importUrl,
  trello,
});
