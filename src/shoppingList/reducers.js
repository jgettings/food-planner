const initialState = {
  loading: false,
  triedLoading: false,
  errorLoading: false,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_TRELLO_SHOPPING_LIST': {
      return { ...state, loading: true, triedLoading: false };
    }
    case 'LOADED_TRELLO_SHOPPING_LIST': {
      return {
        ...state,
        loading: false,
        list: action.payload,
        triedLoading: true,
      };
    }
    case 'FAILED_LOAD_TRELLO_SHOPPING_LIST': {
      return {
        ...state,
        loading: false,
        triedLoading: true,
        errorLoading: true,
      }
    }
    default:
      return state;
  }
};
