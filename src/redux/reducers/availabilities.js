import { ADD_AVAILABILITY, REMOVE_AVAILABILITY, CLEAR_AVAILABILITIES } from "../actionTypes";

const initialState = {availabilities: []};

function dateRangeOverlaps(a_start, a_end, b_start, b_end) {
  if (a_start <= b_start && b_start <= a_end) return true; // b starts in a
  if (a_start <= b_end   && b_end   <= a_end) return true; // b ends in a
  if (b_start <  a_start && a_end   <  b_end) return true; // a in b
  return false;
}

function overlaps(a, b) {
  return dateRangeOverlaps(a.start, a.end, b.start, b.end);
} 

function isAllDay(existing) {
  return existing.start.getHours() === 0 && existing.start.getMinutes === 0 
  && existing.end.getHours() === 0 && existing.end.getMinutes === 0;
}

export default function(state = initialState, action) {
  switch (action.type) {

    case ADD_AVAILABILITY: {
      const { availability } = action.payload;

      // Handle merging events
      let remove = [];
      for (let i = 0; i < state.availabilities.length; i++) {
        let existing = state.availabilities[i];

        if (isAllDay(existing) || isAllDay(availability)) {
          continue;
        }

        if (overlaps(existing, availability)) {
          availability.start = existing.start < availability.start ? existing.start : availability.start;
          availability.end = existing.end > availability.end ? existing.end : availability.end;
          remove.push(i);
        }
      }
      let newAvailabilities = state.availabilities.filter((v, i) => !(remove.includes(i)));
      return {
        ...state,
        availabilities: [...newAvailabilities, availability],
      };
    }

    case REMOVE_AVAILABILITY: {
      const { availability } = action.payload;

      let newAvailabilities = [...state.availabilities];
      for (let i = 0; i < newAvailabilities.length; i++) {
          if (newAvailabilities[i] === availability) {
            newAvailabilities.splice(i, 1);
          }
      }
      return {
          ...state,
          availabilities: newAvailabilities,
        };
    }

    case CLEAR_AVAILABILITIES: {
        return {
            ...state,
            availabilities: [],
        }
    }

    default:
      return state;
  }
}
