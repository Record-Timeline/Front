export const setOpenLoginSnackbar = (isOpen) => ({
  type: 'SET_OPEN_LOGIN_SNACKBAR',
  payload: isOpen
});

export const setOpenFindSnackbar = (isOpen) => ({
  type: 'SET_OPEN_FIND_SNACKBAR',
  payload: isOpen,
});

export const setEmail = (email) => ({
  type: 'SET_EMAIL',
  payload: email,
});

export const setMemberId = (memberId) => ({
  type: 'SET_MEMBER_ID',
  payload: memberId,
});