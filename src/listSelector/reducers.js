const initialState = {
  loading: false,
  errorLoading: false,
  list: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING_TRELLO_BOARD_LISTS': {
      return { ...state, loading: true };
    }
    case 'LOADED_TRELLO_BOARD_LISTS': {
      return { ...state, loading: false, list: action.payload };
    }
    case 'FAILED_LOADING_TRELLO_BOARD_LISTS': {
      return { ...state, loading: false, errorLoading: true }; 
    }
    default:
      return state;
  }
};
