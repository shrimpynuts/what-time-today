import { ADD_AVAILABILITY, REMOVE_AVAILABILITY, CLEAR_AVAILABILITIES } from "../actionTypes";

const initialState = {availabilities: []};

export default function(state = initialState, action) {
  switch (action.type) {

    case ADD_AVAILABILITY: {
      const { availability } = action.payload;
      return {
        ...state,
        availabilities: [...state.availabilities, availability],
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
