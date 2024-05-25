const initialState = {
  openLoginSnackbar: false
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_OPEN_LOGIN_SNACKBAR':
      return {
        ...state,
        openLoginSnackbar: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;