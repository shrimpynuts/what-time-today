import { ADD_CALENDAR, TOGGLE_CALENDAR, CLEAR_CALENDARS } from "../actionTypes";

const initialState = {calendars: []};

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_CALENDAR: {
      const { calendar } = action.payload;
      return {
        ...state,
        calendars: [...state.calendars, calendar],
      };
    }
    
    case TOGGLE_CALENDAR: {
      const { calendar } = action.payload;
      let newCalendars = [...state.calendars];
      for (var i = 0; i < newCalendars.length; i++) {
        let curr_calendar = newCalendars[i];
        if (curr_calendar.id === calendar.id) {
          curr_calendar.visible = !curr_calendar.visible;
        }
      }
      return {
          ...state,
          calendars: newCalendars,
        };
    }

    case CLEAR_CALENDARS: {
      return ({
        calendars: [],
      })
    }

    default:
      return state;
  }
}
