import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { userIsAuthorized } from '../../util/auth';
import moment from 'moment';
import SingleCalendar from '../singlecalendar/SingleCalendar';
import './MyCalendar.scss';
import './MyCalendar.css';
import { Paper, List } from '@material-ui/core';

 
const localizer = momentLocalizer(moment);

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Gets all the events from gapi
function getAndDisplayEvents(addToEvents) {

    if (!userIsAuthorized()) {
      console.log("Tried to get calendars when not signed in!");
      return;
    }

    var startDate = moment().startOf('week');

    window.gapi.client.load('calendar', 'v3', function() {
      var request = window.gapi.client.calendar.calendarList.list({});
      request.execute(function(resp) {

        var calendars = resp.items;

        if(!resp.error) {
          
          for(var i = 0; i < calendars.length; i++) {

            const calendar = calendars[i];

            window.gapi.client.calendar.events.list({
              'calendarId': calendar.id,
              'timeMin': startDate.toISOString(),
              'showDeleted': false,
              'singleEvents': true,
              'maxResults': 100,
              'orderBy': 'startTime'
            }).then(function(response) {

                var events = response.result.items;
                var calendarEvents = [];
                var i;
                var color = calendar.backgroundColor;
                for (i = 0; i < events.length; i++) {
                  var event = events[i];
                  var calendarEvent = {
                    'title': event.summary,
                    'start': new Date(event.start.dateTime),
                    'end': new Date(event.end.dateTime),
                    'hexColor': color,
                    'summary': response.result.summary,
                    'visible': true,
                  }
                  calendarEvents.push(calendarEvent);
                }

                response.result.color = color;
            
                addToEvents(response.result, calendarEvents);
              });
            } // end for all calendars
          }
          else {

            console.log("Error retrieving calendars");
            console.log(resp.error);

          }
      });
  });

}
  
// When you select an available slot, create the availability, add it to availabilities
// Also add the availability to the output for the parent component
function onSelectAvailableSlot(updateOutput, slotInfo, availabilities, setAvailabilities) {
    const newAvailability = {
        'title': 'Availability',
        'start': slotInfo.start,
        'end': slotInfo.end,
        'hexColor': "#464646",
        'visible': true,
        'availability': true,
    };
    // Update availabilities
    let newAvailabilities = [...availabilities];
    newAvailabilities.push(newAvailability);
    setAvailabilities(newAvailabilities);

    // Update parent's output
    updateOutput(newAvailabilities);
}

// Gets the style for each event rendered
function eventStyleGetter(event, start, end, isSelected) {
  let cursor;
  if (event.availability) {
    cursor = 'pointer';
  } else {
    cursor = 'auto';
  }
  const backgroundColor = event.hexColor;
  const style = {
      backgroundColor: backgroundColor,
      borderRadius: '3px',
      opacity: 1,
      color: 'white',
      border: '0px',
      display: 'block',
      cursor: cursor
  };
  return {
      style: style
  };
}

// When you select an availability event delete it
function onSelectEvent(event, e, availabilities, setAvailabilities, updateOutput) {
  if(event.availability) {
    var newAvailabilities = [...availabilities];
    newAvailabilities = newAvailabilities.filter((avail) => avail !== event);
    setAvailabilities(newAvailabilities);

    // Update parent's output
    updateOutput(newAvailabilities);

  } else {
    console.log("Selected event that is not availability, cannot delete");
  }

}

const MyCalendar = forwardRef((props, ref) => {
    const [events, setEvents] = useState([]);
    const [availabilities, setAvailabilities] = useState([]);
    const [calendars, setCalendars] = useState([]);

    const minTime = new Date();
    minTime.setHours(8,0,0);
    const maxTime = new Date();
    maxTime.setHours(23,59,59);

    const signOut = () => {
      setEvents([]);
      setCalendars([]);
    }

    const clearAvailability = () => {
      setAvailabilities([]);
      props.addToOutput([]);
    }

    const addToEvents = (newCalendar, e) => {
      newCalendar.visible = true;
      setCalendars(oldCalendars => [...oldCalendars, newCalendar])
      setEvents(oldEvents => [...oldEvents, ...e]);
    }

    useImperativeHandle(ref, () => {
        return {
            getAndDisplayEvents: () => {getAndDisplayEvents(addToEvents);},
            signOut: signOut,
            clearAvailability: clearAvailability,
        };
    });

    const toggleCalendar = (i) => {
      var newEvents = [...events];
      for (var j = 0; j < newEvents.length; j++) {
        if (newEvents[j].summary === calendars[i].summary) {
          newEvents[j].visible = !newEvents[j].visible;
        }
      }
      setEvents(newEvents);

      var newCalendars = [...calendars];
      for (j = 0; j < newCalendars.length; j++) {
        if (newCalendars[j].summary === calendars[i].summary) {
          newCalendars[j].visible = !newCalendars[j].visible;
        }
      }

      setCalendars(newCalendars);
    }

    return (
      <div className="MyCalendar">
        {
          calendars.length > 0 &&
          <Paper style={{maxHeight: 400, overflow: 'auto', marginRight: 20, width: "15%"}}>
          <List>
          {calendars.map((calendar, i) => {
            return (<SingleCalendar i={i} toggleCalendar={toggleCalendar} calendar={calendar}/>);
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
          return (e.visible === true);
        })}
        selectable={true}
        onSelectSlot={(info) => onSelectAvailableSlot(props.addToOutput, info, availabilities, setAvailabilities)}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400, flexGrow: 1, cursor: 'pointer' }}
        defaultView={'week'}
        views={['week', 'day']}
        onSelectEvent={(event, e) =>onSelectEvent(event, e, availabilities, setAvailabilities, props.addToOutput)}
        eventPropGetter={(eventStyleGetter)}
        // scrollToTime={props.initDate}
        min={minTime}
        max={maxTime}
        />
      </div>
    )
});

export default MyCalendar;