import { ADD_CALENDAR, TOGGLE_CALENDAR, CLEAR_CALENDARS, CLEAR_SPECIFIC_CALENDAR, STORE_CALENDARS, RESTORE_CALENDARS } from "../actionTypes";

const initialState = { calendars: [] };

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_CALENDAR: {
      const { calendar } = action.payload;
      return {
        ...state,
        calendars: [...state.calendars.filter(existingCalendar => existingCalendar.id != calendar.id), calendar],
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
      return {
        calendars: [],
      };
    }

    case CLEAR_SPECIFIC_CALENDAR: {
      const nextState = {
        ...state,
        calendars: state.calendars.filter(calendar => calendar.email != action.payload.email)
      }
      localStorage.setItem('calendars', JSON.stringify(nextState.calendars));
      return nextState;
    }

    case STORE_CALENDARS: {
      localStorage.setItem('calendars', JSON.stringify(state.calendars));
      return state;
    }

    case RESTORE_CALENDARS: {
      return {
        ...state,
        calendars: action.payload.localCalendars,
      }
    }

    default:
      return state;
  }
}
