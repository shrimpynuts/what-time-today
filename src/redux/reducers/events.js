import { ADD_EVENT, CLEAR_ALL_EVENTS, CLEAR_SPECIFIC_EVENTS } from "../actionTypes";

const initialState = { events: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT: {
      const { event } = action.payload;
      return {
        ...state,
        events: [...state.events.filter(
          existingEvent =>
          !(
            existingEvent.title == event.title &&
            existingEvent.start == event.start &&
            existingEvent.end == event.end &&
            existingEvent.hexColor == event.hexColor &&
            existingEvent.summary == event.summary &&
            existingEvent.visible == event.visible &&
            existingEvent.calendarId == event.calendarId &&
            existingEvent.email == event.email
          )
        ), event],

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
