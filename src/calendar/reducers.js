const initialState = {
  cards: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_TRELLO_PLAN': {
      return { ...state, loading: true };
    }
    case 'LOADED_TRELLO_PLAN': {
      return { ...state, loading: false, cards: action.payload };
    }
    default:
      return state;
  }
};
