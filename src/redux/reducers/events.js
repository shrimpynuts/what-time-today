import { ADD_EVENT, CLEAR_ALL_EVENTS, CLEAR_SPECIFIC_EVENTS } from "../actionTypes";

const initialState = { events: [] };

export default function (state = initialState, action) {
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

    case CLEAR_SPECIFIC_EVENTS: {
      return {
        ...state,
        events: state.events.filter(event => event.email != action.payload.email)
      }
    }

    default:
      return state;
  }
}
