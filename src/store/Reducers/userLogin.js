const initialState = {
  user: null
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
};

export const setUsers = (payload) => ({ type: 'SET_USER', payload });