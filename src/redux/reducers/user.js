import { SIGNIN, SIGNOUT } from "../actionTypes";

const initialState = null;

const user = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN: {
      return action.payload.user;
    }
    case SIGNOUT: {
      return null;
    }
    default: {
      return state;
    }
  }
};

export default user;
