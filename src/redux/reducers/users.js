import { ADD_USER, REMOVE_USER, RESTORE_USERS } from "../actionTypes";

const initialState = [];

const users = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER: {
      const nextState = [...state.filter(user => user.email != action.payload.user.email), action.payload.user];
      localStorage.setItem('users', JSON.stringify(nextState));
      return nextState;
    }
    case REMOVE_USER: {
      const nextState = state.filter(user => user.email != action.payload.email);
      localStorage.setItem('users', JSON.stringify(nextState));
      return nextState;
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
