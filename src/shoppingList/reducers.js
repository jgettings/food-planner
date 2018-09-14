const initialState = {
  loading: false,
  triedLoading: false,
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
    default:
      return state;
  }
};
