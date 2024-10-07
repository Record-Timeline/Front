const initialState = {
  email: '',
  openLoginSnackbar: false,
  openFindSnackbar: false,
  memberId: null,
  nickname: '',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return {
        ...state,
        email: action.payload,
      };
    case 'SET_OPEN_LOGIN_SNACKBAR':
      return {
        ...state,
        openLoginSnackbar: action.payload,
      };
    case 'SET_OPEN_FIND_SNACKBAR':
      return {
        ...state,
        openFindSnackbar: action.payload,
      };
    case 'SET_MEMBER_ID':
      return {
        ...state,
        memberId: action.payload,
      };
    case 'SET_NICKNAME':
        return {
          ...state,
          nickname: action.payload,
        }
    default:
      return state;
  }
};
export default rootReducer;