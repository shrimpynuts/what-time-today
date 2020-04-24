import { VISIBILITY_FILTERS } from "../constants";

export const getTodosState = store => store.todos;

export const getTodoList = store =>
  getTodosState(store) ? getTodosState(store).allIds : [];

export const getTodoById = (store, id) =>
  getTodosState(store) ? { ...getTodosState(store).byIds[id], id } : {};

export const getUser = store => store.user;

export const getEvents = store => store.events;

export const getCalendars = store => store.calendars;

export const getAvailabilities = store => store.availabilities;

export const getCalendarById = (store, id) => {
    console.log(store.calendars);
    if (!store.calendars) {
      return null;
    }
    for (let i = 0; i < store.calendars.length; i++) {
      let calendar = store.calendars[i];
      if (calendar.id === id) {
        return calendar;
      }
    }
    return null;
}

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getTodos = store =>
  getTodoList(store).map(id => getTodoById(store, id));

export const getTodosByVisibilityFilter = (store, visibilityFilter) => {
  const allTodos = getTodos(store);
  switch (visibilityFilter) {
    case VISIBILITY_FILTERS.COMPLETED:
      return allTodos.filter(todo => todo.completed);
    case VISIBILITY_FILTERS.INCOMPLETE:
      return allTodos.filter(todo => !todo.completed);
    case VISIBILITY_FILTERS.ALL:
    default:
      return allTodos;
  }
};
