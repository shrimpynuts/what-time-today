import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./todos";
import users from "./users";
import calendars from "./calendars";
import events from "./events";
import availabilities from "./availabilities";

export default combineReducers({
  availabilities,
  events,
  calendars,
  todos,
  visibilityFilter,
  users,
});
