import { SIGNIN, SIGNOUT, SIGNOUTALL } from "../actionTypes";

const initialState = [];

const users = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN: {
      return [...state, action.payload.user];
    }
    case SIGNOUT: {
      return state.filter(user => user.email != action.payload.email);
    }
    case SIGNOUTALL: {
      return []
    }
    default: {
      return state;
    }
  }
};

export default users;
