const defaultState = {
  userEmail: '',
  isReset: false,
  emailIsSaved: true,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'CLEAR_USER_PROFILE':
      return {
        ...state, userEmail: '', isReset: true, emailIsSaved: true,
      };
    case 'SET_DIRTY':
      return { ...state, isReset: false, emailIsSaved: false };
    case 'SAVE_USER_EMAIL':
      return {
        ...state, userEmail: action.value, isReset: false, emailIsSaved: true,
      };
    default:
      return state;
  }
};
