const initialState = {
  followers: ['Themms', 'Themms1', 'Themms2']
};

const ADD_FOLLOWERS = 'ADD_FOLLOWERS';

export function followerReduser(state = initialState, action) {
  switch (action.type) {
    case ADD_FOLLOWERS:
      return {
        ...state,
        followers: [...state.followers, action.payload]
      };
    default:
      return state;
  }
}

export const addFollowers = (payload) => ({ type: ADD_FOLLOWERS, payload });