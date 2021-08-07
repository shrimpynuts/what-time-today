import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_FILTER,
  ADD_USER,
  REMOVE_USER,
  RESTORE_USERS,
  ADD_CALENDAR,
  TOGGLE_CALENDAR,
  CLEAR_CALENDARS,
  CLEAR_USER_CALENDARS,
  STORE_CALENDARS,
  RESTORE_CALENDARS,
  ADD_EVENT,
  CLEAR_ALL_EVENTS,
  CLEAR_USER_EVENTS,
  STORE_EVENTS,
  RESTORE_EVENTS,
  ADD_AVAILABILITY,
  REMOVE_AVAILABILITY,
  CLEAR_AVAILABILITIES,
} from "./actionTypes";

let nextTodoId = 0;

export const addTodo = (content) => ({
  type: ADD_TODO,
  payload: {
    id: ++nextTodoId,
    content,
  },
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  payload: { id },
});

export const addUser = (user) => ({
  type: ADD_USER,
  payload: {
    user: user,
  },
});

export const removeUser = (email) => ({
  type: REMOVE_USER,
  payload: {
    email: email,
  },
});

export const restoreUsers = (localUsers) => ({
  type: RESTORE_USERS,
  payload: {
    localUsers: localUsers,
  }
});

export const addCalendar = (calendar) => ({
  type: ADD_CALENDAR,
  payload: {
    calendar: calendar,
  },
});

export const toggleCalendar = (calendar) => ({
  type: TOGGLE_CALENDAR,
  payload: {
    calendar: calendar,
  },
});

export const clearCalendars = () => ({
  type: CLEAR_CALENDARS,
});

export const clearUserCalendars = (email) => ({
  type: CLEAR_USER_CALENDARS,
  payload: {
    email: email,
  }
});

export const storeCalendars = () => ({
  type: STORE_CALENDARS,
});

export const restoreCalendars = (localCalendars) => ({
  type: RESTORE_CALENDARS,
  payload: {
    localCalendars: localCalendars,
  }
});

export const addEvent = (event) => ({
  type: ADD_EVENT,
  payload: {
    event: event,
  },
});

export const clearAllEvents = () => ({
  type: CLEAR_ALL_EVENTS,
});

export const clearUserEvents = (email) => ({
  type: CLEAR_USER_EVENTS,
  payload: {
    email: email,
  }
});

export const storeEvents = () => ({
  type: STORE_EVENTS,
});

export const restoreEvents = (localEvents) => ({
  type: RESTORE_EVENTS,
  payload: {
    localEvents: localEvents,
  }
});

export const addAvailability = (availability) => ({
  type: ADD_AVAILABILITY,
  payload: {
    availability: availability,
  },
});

export const removeAvailability = (availability) => ({
  type: REMOVE_AVAILABILITY,
  payload: {
    availability: availability,
  },
});

export const clearAvailabilities = () => ({
  type: CLEAR_AVAILABILITIES,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: { filter },
});
