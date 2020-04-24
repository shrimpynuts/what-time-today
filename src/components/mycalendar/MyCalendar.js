import React from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import SingleCalendar from '../singlecalendar/SingleCalendar';
import { Paper, List } from '@material-ui/core';
import { useSelector, useDispatch } from "react-redux";
import { getCalendars, getEvents, getAvailabilities } from '../../redux/selectors';
import { onSelectEvent, onSelectAvailableSlot, eventStyleGetter } from './MyCalendarHelpers.js';
import './MyCalendar.scss';
import './MyCalendar.css';
 
const localizer = momentLocalizer(moment);


export default function MyCalendar() {
  const dispatch = useDispatch();
  const { calendars } = useSelector(getCalendars);
  const { events } = useSelector(getEvents);
  const { availabilities } = useSelector(getAvailabilities);

  const minTime = new Date();
  minTime.setHours(8,0,0);
  const maxTime = new Date();
  maxTime.setHours(23,59,59);


  return (
    <div className="MyCalendar">
      {
        calendars.length > 0 &&
        <Paper style={{maxHeight: 400, overflow: 'auto', marginRight: 20, width: "15%"}}>
          <List>
            {calendars.map((calendar, i) => {
              return (<SingleCalendar i={i} calendar={calendar}/>);
            })}
          </List>
        </Paper>
      }

      <Calendar
      localizer={localizer}
      events={(events.concat(availabilities)).filter((e) => {
        if (!e) {
          return false;
        }
        for (let i = 0; i < calendars.length; i++) {
          if (calendars[i].id === e.calendarId) {
            return calendars[i].visible;
          }
        }
        return true;
      })}
      selectable={true}
      onSelectSlot={(info) => onSelectAvailableSlot(dispatch, info)}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 400, flexGrow: 1, cursor: 'pointer' }}
      defaultView={'week'}
      views={['week', 'day']}
      onSelectEvent={(event, e) =>onSelectEvent(event, dispatch)}
      eventPropGetter={(eventStyleGetter)}
      // scrollToTime={props.initDate}
      min={minTime}
      max={maxTime}
      />
    </div>
  )
}

