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
  plan: [],
  loadingPlan: false,
  loadingShoppingList: false,
  triedLoadingShoppingList: false,
  shoppingList: [],
};
export const trello = (state = initialTrelloState, action) => {
  switch (action.type) {
    case 'LOADING_TRELLO_PLAN': {
      return { ...state, loadingPlan: true };
    }
    case 'LOADED_TRELLO_PLAN': {
      return { ...state, loadingPlan: false, plan: action.payload };
    }
    case 'LOADING_TRELLO_SHOPPING_LIST': {
      return { ...state, loadingShoppingList: true, triedLoadingShoppingList: false };
    }
    case 'LOADED_TRELLO_SHOPPING_LIST': {
      return { ...state, loadingShoppingList: false, shoppingList: action.payload, triedLoadingShoppingList: true };
    }
    default:
      return state;
  }
};


export default combineReducers({
  importUrl,
  trello,
});
