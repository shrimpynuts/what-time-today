import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./todos";
import user from "./user";
import calendars from "./calendars";
import events from "./events";
import availabilities from "./availabilities";

export default combineReducers({ availabilities, events, calendars, todos, visibilityFilter, user});
