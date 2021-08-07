import { ADD_EVENT, CLEAR_ALL_EVENTS, CLEAR_SPECIFIC_EVENTS, STORE_EVENTS, RESTORE_EVENTS } from "../actionTypes";

const initialState = { events: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT: {
      const { event } = action.payload;
      const newState = {
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
      console.log('add event state:', newState);
      return newState;
    }

    case CLEAR_ALL_EVENTS: {
      return {
        ...state,
        events: [],
      };
    }

    case CLEAR_SPECIFIC_EVENTS: {
      const nextState = {
        ...state,
        events: state.events.filter(event => event.email != action.payload.email)
      }
      localStorage.setItem('events', JSON.stringify(nextState.events));
      return nextState;
    }

    case STORE_EVENTS: {
      localStorage.setItem('events', JSON.stringify(state.events));
      return state;
    }

    case RESTORE_EVENTS: {
      console.log('inside restore events', action.payload);
      return {
        ...state,
        events: action.payload.localEvents,
      }
    }

    default:
      return state;
  }
}
