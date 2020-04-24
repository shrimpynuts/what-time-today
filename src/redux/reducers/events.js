import { ADD_EVENT, CLEAR_ALL_EVENTS } from "../actionTypes";

const initialState = {events: []};

export default function(state = initialState, action) {
  switch (action.type) {

    case ADD_EVENT: {
      const { event } = action.payload;
      return {
        ...state,
        events: [...state.events, event],
      };
    }

    case CLEAR_ALL_EVENTS: {
      return {
          ...state,
          events: [],
        };
    }

    default:
      return state;
  }
}
