import { SIGNIN, SIGNOUT, SIGNOUTALL, STORE_USERS, RESTORE_USERS } from "../actionTypes";

const initialState = [];

const users = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN: {
      const nextState = [...state.filter(user => user.email != action.payload.user.email), action.payload.user];
      localStorage.setItem('users', JSON.stringify(nextState));
      return nextState;
    }
    case SIGNOUT: {
      const nextState = state.filter(user => user.email != action.payload.email);
      localStorage.setItem('users', JSON.stringify(nextState));
      return nextState;
    }
    case SIGNOUTALL: {
      localStorage.setItem('users', JSON.stringify([]));
      return [];
    }
    case STORE_USERS: {
      localStorage.setItem('users', JSON.stringify(state));
      return state;
    }
    case RESTORE_USERS: {
      return action.payload.localUsers;
    }
    default: {
      return state;
    }
  }
};

export default users;
