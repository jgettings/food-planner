const initialState = {
  loading: false,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_TRELLO_BOARD_LABELS': {
      return { ...state, loading: true };
    }
    case 'LOADED_TRELLO_BOARD_LABELS': {
      return { ...state, loading: false, list: action.payload };
    }
    default:
      return state;
  }
};
